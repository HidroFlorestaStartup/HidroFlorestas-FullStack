"use client";
import { useEffect,useRef,useState } from "react";
import Image from "next/image";
import { createClientUuid } from "@/lib/client-uuid";
import type { CoverDto,UploadTicket } from "@/app/api/server/images/contracts";

export function AreaCoverPreview({apiPath,name,hasImage,revision,featureEnabled=false,retryAttempt=0,onLoaded,onFailed}:{
 apiPath:string;name:string;hasImage:boolean;revision:number;featureEnabled?:boolean;
 retryAttempt?:number;onLoaded?:()=>void;onFailed?:()=>void;
}){
 const [failed,setFailed]=useState(false);
 // The retry counter is local to the browser; persisted revision changes only
 // when the cover asset changes. A new query prevents caching a failed response.
 const src=`${apiPath}/content?revision=${revision}${retryAttempt>0?`&retry=${retryAttempt}`:""}`;
 return hasImage&&featureEnabled&&!failed?<Image unoptimized src={src} width={1200} height={800} alt={`Capa da área ${name}`} onLoad={onLoaded} onError={()=>{setFailed(true);onFailed?.();}} className="aspect-[3/2] max-h-80 w-full object-cover"/>:<div className="flex aspect-[3/2] max-h-64 items-center justify-center bg-green-50 p-5 text-sm text-green-900">{!hasImage?"Área sem capa.":!featureEnabled?"Capa indisponível enquanto o recurso está desabilitado.":"Capa indisponível."}</div>;
}
class CoverRequestError extends Error {constructor(message:string,readonly code:string){super(message);}}
async function jsonRequest(path:string,method:string,body?:unknown){
 const response=await fetch(path,{method,cache:"no-store",...(body!==undefined?{headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}:{})});
 const value=response.status===204?null:await response.json();
 if(!response.ok)throw new CoverRequestError(value?.error?.message??"Não foi possível concluir esta operação.",value?.error?.code??"INTERNAL_ERROR");return value;
}
function directUpload(ticket:UploadTicket,file:File,onProgress:(n:number)=>void){
 const url=new URL(ticket.upload.url);if(url.protocol!=="https:"||url.hostname!=="api.cloudinary.com"||!/^\/v1_1\/[-\w]+\/image\/upload$/.test(url.pathname))throw new Error("Destino de envio inválido.");
 return new Promise<void>((resolve,reject)=>{
  const request=new XMLHttpRequest(),body=new FormData();Object.entries(ticket.upload.params).forEach(([k,v])=>body.append(k,v));body.append("file",file);request.open("POST",url.toString());request.timeout=60000;
  request.upload.onprogress=e=>{if(e.lengthComputable)onProgress(Math.round(e.loaded/e.total*100));};request.onload=()=>request.status>=200&&request.status<300?resolve():reject(new Error("Não foi possível verificar o envio."));request.onerror=()=>reject(new Error("Falha de conexão durante o envio."));request.ontimeout=()=>reject(new Error("O envio não respondeu a tempo."));request.send(body);
 });
}
export function AreaCoverEditor({laboratoryId,areaId,name}:{laboratoryId:string;areaId:string;name:string}){
 const apiPath=`/api/laboratories/${laboratoryId}/areas/${areaId}/image`;
 const [data,setData]=useState<CoverDto|null>(null),[file,setFile]=useState<File|null>(null),[busy,setBusy]=useState(false),[progress,setProgress]=useState(0),[error,setError]=useState(""),[message,setMessage]=useState("Carregando capa…");
 const lock=useRef(false),pending=useRef<{key:string;ticket:UploadTicket|null}>({key:createClientUuid(),ticket:null});
 const fileInput=useRef<HTMLInputElement>(null),selection=useRef(0);
 const [previewAttempt,setPreviewAttempt]=useState(0);
 const previewSequence=useRef(0),pendingPreviewRetry=useRef<number|null>(null);
 useEffect(()=>{const controller=new AbortController();fetch(apiPath,{cache:"no-store",signal:controller.signal}).then(async r=>{const v=await r.json();if(!r.ok)throw Error();if(!controller.signal.aborted){setData(v);setMessage("");}}).catch(()=>{if(!controller.signal.aborted){setError("Não foi possível carregar a capa.");setMessage("");}});return()=>controller.abort();},[apiPath]);
 async function select(selected:File|undefined){
  const token=++selection.current;setError("");setFile(null);pending.current={key:createClientUuid(),ticket:null};if(!selected)return;
  try{if(!["image/jpeg","image/png","image/webp"].includes(selected.type)||selected.size===0||selected.size>10*1024*1024)throw Error();const bitmap=await createImageBitmap(selected);const valid=bitmap.width<=4096&&bitmap.height<=4096;bitmap.close();if(token!==selection.current)return;if(!valid)throw Error();setFile(selected);setMessage("Imagem selecionada. Confirme o envio para salvar a capa.");}catch{if(token===selection.current)setError("Use JPEG, PNG ou WebP até 10 MiB e 4096 pixels por lado.");}
 }
 async function upload(){
  if(!file||!data?.canEdit||!data.featureEnabled||lock.current)return;lock.current=true;setBusy(true);setError("");setProgress(0);
  try{
   if(!pending.current.ticket)pending.current.ticket=await jsonRequest(`${apiPath}/uploads`,"POST",{expectedRevision:data.image.revision,key:pending.current.key}) as UploadTicket;
   const ticket=pending.current.ticket;setMessage("Enviando imagem…");
   // A lost direct-upload response can still have stored the expected asset. The
   // authoritative server confirmation reconciles it, ignoring client metadata.
   try{await directUpload(ticket,file,setProgress);}catch{setMessage("Verificando o resultado do envio…");}
   setMessage("Validando imagem…");const current=await jsonRequest(`${apiPath}/uploads/${ticket.attemptId}/confirm`,"POST",{}) as CoverDto;
   pendingPreviewRetry.current=null;setData(current);setFile(null);if(fileInput.current)fileInput.current.value="";pending.current={key:createClientUuid(),ticket:null};setMessage("Capa salva.");
  }catch(e){if(e instanceof CoverRequestError&&e.code==="EXPIRED")pending.current={key:createClientUuid(),ticket:null};setError(e instanceof Error?e.message:"Falha ao enviar imagem.");setMessage("O preenchimento foi preservado. Recarregue se a capa mudou em outra sessão.");}
  finally{lock.current=false;setBusy(false);}
 }
 async function reload(){
  if(lock.current)return;lock.current=true;setBusy(true);
  // Never let an old image event report success for a newer request.
  pendingPreviewRetry.current=null;
  try{
   const current=await jsonRequest(apiPath,"GET") as CoverDto;
   const attempt=++previewSequence.current;
   pendingPreviewRetry.current=current.image.hasImage&&current.featureEnabled?attempt:null;
   setData(current);setPreviewAttempt(attempt);
   pending.current={key:createClientUuid(),ticket:null};setError("");
   setMessage(!current.featureEnabled?"As capas de áreas estão desabilitadas neste momento.":current.image.hasImage?"Tentando recarregar a capa…":"Área sem capa.");
  }catch{setError("Não foi possível recarregar a capa.");}
  finally{lock.current=false;setBusy(false);}
 }
 async function remove(){if(!data?.canEdit||!data.featureEnabled||lock.current||!window.confirm("Remover a capa desta área?"))return;lock.current=true;setBusy(true);setError("");try{await jsonRequest(apiPath,"DELETE",{expectedRevision:data.image.revision});pendingPreviewRetry.current=null;setData(await jsonRequest(apiPath,"GET") as CoverDto);pending.current={key:createClientUuid(),ticket:null};setMessage("Capa removida.");}catch(e){setError(e instanceof Error?e.message:"Não foi possível remover.");}finally{lock.current=false;setBusy(false);}}
 return <section aria-label="Capa da área" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <AreaCoverPreview key={`${areaId}:${data?.image.revision??0}:${data?.featureEnabled??false}:${previewAttempt}`} apiPath={apiPath} name={name} hasImage={data?.image.hasImage??false} revision={data?.image.revision??0} featureEnabled={data?.featureEnabled??false} retryAttempt={previewAttempt}
   onLoaded={()=>{if(pendingPreviewRetry.current===previewAttempt){pendingPreviewRetry.current=null;setMessage("Capa recarregada.");}}}
   onFailed={()=>{if(pendingPreviewRetry.current===previewAttempt){pendingPreviewRetry.current=null;setMessage("Capa ainda indisponível. Tente novamente.");}}}/>
  <div className="space-y-3 p-5"><h2 className="text-xl font-bold">Capa da área</h2><p className="text-sm text-slate-600">Visível à equipe autorizada deste laboratório.</p>
  {data&&!data.featureEnabled&&message!=="As capas de áreas estão desabilitadas neste momento."&&<p className="text-sm text-slate-600">As capas de áreas estão desabilitadas neste momento.</p>}
  {error&&<p role="alert" className="text-red-800">{error}</p>}<p role="status" aria-live="polite">{message}</p>
  {busy&&file&&<progress aria-label="Progresso do envio da capa" value={progress} max={100} className="w-full"/>}
  {data?.canEdit&&data.featureEnabled&&<><label className="block font-medium" htmlFor={`cover-${areaId}`}>{data.image.hasImage?"Substituir capa":"Selecionar capa"}</label><input ref={fileInput} id={`cover-${areaId}`} type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>void select(e.target.files?.[0])} className="block max-w-full text-sm"/><p className="text-xs text-slate-600">JPEG, PNG ou WebP; até 10 MiB e 4096 pixels por lado. Metadados serão removidos.</p><div className="flex flex-wrap gap-2"><button type="button" disabled={busy||!file} onClick={()=>void upload()} className="min-h-11 rounded-lg bg-green-800 px-4 py-2 font-semibold text-white">{busy?"Aguarde…":error&&file?"Tentar envio novamente":"Enviar capa"}</button>{data.image.hasImage&&<button type="button" disabled={busy} onClick={()=>void remove()} className="min-h-11 rounded-lg border border-red-300 px-4 py-2 text-red-800">Remover capa</button>}</div></>}
  <button type="button" disabled={busy} onClick={()=>void reload()} className="min-h-11 rounded-lg border px-4 py-2">Recarregar capa</button></div>
 </section>;
}
