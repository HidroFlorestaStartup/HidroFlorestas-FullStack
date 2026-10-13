"use client";
import { useRef, useState, type RefObject } from "react";
import { createClientUuid } from "@/lib/client-uuid";
import { DRAFT_VERSION, type DraftFields, type EnvironmentalDraftDto } from "@/types/environmental-draft";
import { ENVIRONMENTAL_FIELDS } from "@/types/environmental-data.validation";
import { VALUE_LABELS } from "./environmental-data-detail";

export function useEnvironmentalDraft({apiPath,initialDraft,lock}:{apiPath:string;initialDraft:EnvironmentalDraftDto|null;lock?:RefObject<boolean>}) {
  const ownLock=useRef(false);const gate=lock??ownLock;
  const [draft,setDraft]=useState(initialDraft);const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState(initialDraft?"Rascunho pessoal retomado.":"");
  const [uncertain,setUncertain]=useState(false);
  const pending=useRef<{canonical:string;body:string}|null>(null);
  async function execute<T>(run:()=>Promise<T>):Promise<T|null> {
    if(gate.current)return null;gate.current=true;setBusy(true);
    try{return await run();}catch{setMessage("Falha de conexão. Seu preenchimento continua nesta página.");return null;}
    finally{gate.current=false;setBusy(false);}
  }
  async function save(fields:DraftFields) {
    return execute(async()=>{
      const canonical=JSON.stringify(fields);
      if(!pending.current || pending.current.canonical!==canonical) pending.current={canonical,body:JSON.stringify({draftId:draft?.id??null,expectedRevision:draft?.revision??0,saveKey:createClientUuid(),formVersion:DRAFT_VERSION,fields})};
      setMessage("Salvando rascunho…");
      try {
        const response=await fetch(`${apiPath}/draft`,{method:"PUT",headers:{"Content-Type":"application/json"},body:pending.current.body});
        const result=await response.json();
        if(!response.ok){setUncertain(response.status>=500);if(response.status<500)pending.current=null;setMessage(result.error?.message??"Não foi possível salvar.");return null;}
        if(!result.draft?.id)throw Error();
        setDraft(result.draft);pending.current=null;setUncertain(false);setMessage("Rascunho salvo.");return result.draft as EnvironmentalDraftDto;
      }catch{setUncertain(true);setMessage("Não foi possível verificar o salvamento. Repita com os mesmos campos ou recarregue o rascunho.");return null;}
    });
  }
  async function reload() {
    return execute(async()=>{
      const response=await fetch(`${apiPath}/draft`,{cache:"no-store"});const result=await response.json();
      if(!response.ok){setMessage(result.error?.message??"Não foi possível retomar.");return null;}
      setDraft(result.draft);pending.current=null;setUncertain(false);setMessage(result.draft?"Rascunho pessoal recarregado.":"Não há rascunho salvo.");return result as {draft:EnvironmentalDraftDto|null};
    });
  }
  async function discard() {
    if(!draft)return false;
    return execute(async()=>{
      const response=await fetch(`${apiPath}/draft`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({draftId:draft.id,expectedRevision:draft.revision})});
      if(!response.ok){const result=await response.json();setMessage(result.error?.message??"Não foi possível descartar.");return false;}
      setDraft(null);pending.current=null;setUncertain(false);setMessage("Rascunho descartado definitivamente.");return true;
    });
  }
  return {draft,busy,message,uncertain,save,reload,discard};
}

export function EnvironmentalDraftActions({apiPath,initialDraft,readOnly}:{apiPath:string;initialDraft:EnvironmentalDraftDto;readOnly:boolean}) {
  const state=useEnvironmentalDraft({apiPath,initialDraft});
  const labels=Object.fromEntries(Object.entries(ENVIRONMENTAL_FIELDS).flatMap(([g,fields])=>Object.entries(fields).map(([k,r])=>[`${g}.${k}`,r.label])));
  return <section aria-label="Seu rascunho pessoal" className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
    <h2 className="font-bold">Seu rascunho pessoal</h2>
    <p>As medições confirmadas serão preservadas. Você pode consultar ou descartar seu preenchimento parcial salvo.</p>
    {state.draft && <dl className="grid gap-2 text-sm sm:grid-cols-2">{Object.entries(state.draft.fields).map(([key,cell])=><div key={key}><dt>{labels[key]}</dt><dd className="break-words">{cell.kind==="editing"?(cell.raw==="false"?"Não":cell.raw==="true"?"Sim":VALUE_LABELS[cell.raw]??cell.raw)||"Não informado":cell.kind==="value"?typeof cell.value==="boolean"?(cell.value?"Sim":"Não"):VALUE_LABELS[String(cell.value)]??String(cell.value):"Não informado"}</dd></div>)}</dl>}
    <p role="status" aria-live="polite">{state.message}</p>
    <button type="button" disabled={state.busy} onClick={()=>state.reload()} className="rounded-lg border px-4 py-2">Recarregar rascunho</button>{" "}
    <button type="button" disabled={readOnly||state.busy||!state.draft} onClick={()=>{if(window.confirm("Descartar definitivamente seu rascunho pessoal? As medições confirmadas serão preservadas."))void state.discard();}} className="rounded-lg border border-red-300 px-4 py-2 text-red-800">Descartar rascunho</button>
  </section>;
}
