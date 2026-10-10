"use client";
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ENVIRONMENTAL_FIELDS, EnvironmentalValidationError } from "@/types/environmental-data.validation";
import { emptyEnvironmentalForm, formToPayload, prepareSubmission, type Submission } from "./environmental-data-form-state";
import { GROUPS, VALUE_LABELS } from "./environmental-data-detail";
import { EnvironmentalReview } from "./environmental-data-review";
import { draftFieldsToForm, formToDraftFields, type EnvironmentalDraftDto } from "@/types/environmental-draft";
import { useEnvironmentalDraft } from "./environmental-draft-actions";
export function EnvironmentalForm({apiPath,basePath,initialDraft=null}:{apiPath:string;basePath:string;initialDraft?:EnvironmentalDraftDto|null}) {
 const router=useRouter();const [form,setForm]=useState(()=>initialDraft?draftFieldsToForm(initialDraft.fields):emptyEnvironmentalForm());const [errors,setErrors]=useState<Record<string,string>>({});const [review,setReview]=useState<Submission|null>(null);const previous=useRef<Submission|null>(null);const submitting=useRef(false);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [uncertain,setUncertain]=useState(false);
 const draftState=useEnvironmentalDraft({apiPath,initialDraft,lock:submitting});
 const [savedForm,setSavedForm]=useState(()=>JSON.stringify(initialDraft?draftFieldsToForm(initialDraft.fields):emptyEnvironmentalForm()));
 const dirty=JSON.stringify(form)!==savedForm;const leaveAllowed=useRef(false);
 const [touched,setTouched]=useState<Set<string>>(()=>new Set());
 useLayoutEffect(()=>{
  if(!dirty)return;
  const unload=(event:BeforeUnloadEvent)=>{if(!leaveAllowed.current){event.preventDefault();event.returnValue='';}};
  const navigation=(event:MouseEvent)=>{const link=(event.target as Element)?.closest('a');if(!leaveAllowed.current&&link&&link.href!==location.href&&!event.defaultPrevented&&!event.ctrlKey&&!event.metaKey&&link.target!=='_blank'&&!window.confirm('Há alterações não salvas. Sair e perder este preenchimento?')){event.preventDefault();event.stopPropagation();}};
  const navigationEntries=(window as unknown as {navigation?:EventTarget}).navigation;
  const beforeTraversal=(event:Event)=>{if((event as Event & {navigationType?:string}).navigationType==='traverse'&&event.cancelable&&!leaveAllowed.current&&!window.confirm('Há alterações não salvas. Sair e perder este preenchimento?'))event.preventDefault();};
  window.addEventListener('beforeunload',unload);document.addEventListener('click',navigation,true);navigationEntries?.addEventListener('navigate',beforeTraversal);
  return()=>{window.removeEventListener('beforeunload',unload);document.removeEventListener('click',navigation,true);navigationEntries?.removeEventListener('navigate',beforeTraversal);};
 },[dirty]);
 async function saveDraft(){setMessage('');try{const result=await draftState.save(formToDraftFields(form,draftState.draft?.fields??{},touched));if(result){setSavedForm(JSON.stringify(form));setTouched(new Set());}}catch{setMessage('Cada campo do rascunho aceita até 1000 caracteres. Reduza o texto antes de salvar.');}}
 async function reloadDraft(){if(dirty&&!window.confirm('Recarregar o rascunho salvo e substituir alterações locais não salvas?'))return;const result=await draftState.reload();if(result){const next=result.draft?draftFieldsToForm(result.draft.fields):emptyEnvironmentalForm();setForm(next);setSavedForm(JSON.stringify(next));setTouched(new Set());setErrors({});}}
 async function discardDraft(){if(!window.confirm('Descartar definitivamente seu rascunho salvo e limpar este preenchimento?'))return;if(await draftState.discard()){const next=emptyEnvironmentalForm();setForm(next);setSavedForm(JSON.stringify(next));setTouched(new Set());setErrors({});}}
 const focus=(id:string)=>requestAnimationFrame(()=>document.getElementById(id)?.focus());
 function reviewForm(event:React.FormEvent){event.preventDefault();setMessage('');try{const payload=formToPayload(form);const next=prepareSubmission(payload,previous.current);previous.current=next;setReview(next);setErrors({});focus('review-title');}catch(error){if(error instanceof EnvironmentalValidationError){setErrors(error.fields);focus(Object.keys(error.fields)[0]);}}}
 async function confirm(){if(!review||submitting.current)return;submitting.current=true;setBusy(true);setMessage('');try{
  const response=await fetch(apiPath,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':review.key,...(draftState.draft?{'Draft-Id':draftState.draft.id,'Draft-Revision':String(draftState.draft.revision)}:{})},body:review.canonical});
  const body=await response.json();
  if(!response.ok){setUncertain(response.status>=500);setMessage(body.error?.message??'Não foi possível confirmar. Tente novamente.');toast.error('Não foi possível confirmar os dados.');return;}
  if(!body.environmentalData?.id)throw Error('Invalid response');
  leaveAllowed.current=true;toast.success('Dados ambientais confirmados.');router.push(basePath);router.refresh();
 }catch{setUncertain(true);setMessage('Não foi possível verificar a confirmação. Tente novamente com os mesmos dados ou consulte o registro.');toast.error('Falha de conexão. Seus dados continuam nesta página.');}finally{submitting.current=false;setBusy(false);}}
 return <div className="space-y-5">{!review&&<section aria-label="Rascunho pessoal" className="space-y-3 rounded-xl border border-green-200 bg-green-50 p-4">
 <h2 className="font-bold">Rascunho pessoal</h2><p className="text-sm">Salve para retomar depois. O rascunho é pessoal e não entra nos dados confirmados.</p>
 <p role="status" aria-live="polite">{draftState.message} {dirty?'Há alterações não salvas.':''}</p>
 {draftState.draft&&<p className="text-sm">Último salvamento: {new Date(draftState.draft.updatedAt).toLocaleString('pt-BR')}</p>}
 <div className="flex flex-wrap gap-2"><button type="button" disabled={draftState.busy} onClick={()=>void saveDraft()} className="rounded-lg bg-green-800 px-4 py-2 font-semibold text-white">{draftState.busy?'Aguarde…':draftState.uncertain?'Repetir salvamento':'Salvar rascunho'}</button>
 <button type="button" disabled={draftState.busy} onClick={()=>void reloadDraft()} className="rounded-lg border border-green-700 px-4 py-2">Recarregar rascunho</button>
 <button type="button" disabled={draftState.busy||!draftState.draft||draftState.uncertain} onClick={()=>void discardDraft()} className="rounded-lg border border-red-300 px-4 py-2 text-red-800">Descartar rascunho</button></div></section>}{message&&<div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">{message} <Link className="font-semibold underline" href={basePath}>Consultar registro</Link></div>}{review?<><EnvironmentalReview payload={review.payload} busy={busy} locked={uncertain} onBack={()=>{if(!uncertain){setReview(null);focus('form-title');}}} onConfirm={confirm}/>{uncertain&&<p className="text-sm text-slate-600">Enquanto o resultado estiver desconhecido, mantenha os mesmos dados e repita a confirmação.</p>}</>:<form noValidate onSubmit={reviewForm} className="space-y-6"><h2 id="form-title" tabIndex={-1} className="text-xl font-bold outline-none">Informar dados ambientais</h2><p className="text-sm text-slate-600">Preencha os quatro grupos. Campos opcionais podem ficar sem informação; zero e “Não” são valores informados.</p>{Object.keys(errors).length>0&&<p role="alert" className="text-red-700">Revise os campos indicados antes de continuar.</p>}<div className="grid items-start gap-5 lg:grid-cols-2">{Object.entries(ENVIRONMENTAL_FIELDS).map(([group,fields])=>{
 const style=GROUPS[group as keyof typeof GROUPS];const Icon=style.icon;
 return <fieldset key={group} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white"><legend className={`${style.color} float-left flex w-full items-center gap-2 px-5 py-3 font-semibold text-white`}><Icon size={19} aria-hidden="true"/>{style.label}</legend><div className="clear-both space-y-4 p-5">{Object.entries(fields).map(([key,rule])=>{
 const id=`${group}.${key}`;const error=errors[id];const inapplicable=key==='wellDepthMeters'&&!['SHALLOW_WELL','TUBULAR_WELL'].includes(form['water.waterSourceType']);
 const common={id,name:id,value:form[id],disabled:draftState.busy||draftState.uncertain||(inapplicable&&!form[id]),'aria-required':!rule.optional,'aria-invalid':Boolean(error),'aria-describedby':`${id}-hint${error?` ${id}-error`:''}`,className:'w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 disabled:bg-slate-100',onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{setTouched(old=>new Set(old).add(id));setForm(old=>({...old,[id]:e.target.value}));}};
 return <div key={id}><label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">{rule.label}{rule.unit?` (${rule.unit})`:''}{rule.optional?' — opcional':' *'}</label>{rule.type==='number'?<input {...common} type="text" inputMode="decimal"/>:<select {...common}><option value="">{rule.optional?'Não informado':'Selecione'}</option>{rule.type==='boolean'?<><option value="true">Sim</option><option value="false">Não</option></>:rule.values!.map(v=><option key={v} value={v}>{VALUE_LABELS[v]??v}</option>)}</select>}<p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">{inapplicable?'Aplicável somente a poços.':rule.type==='number'?`Use ponto como separador decimal.${rule.min!==undefined?` Mínimo: ${rule.min}.`:''}${rule.max!==undefined?` Máximo: ${rule.max}.`:''}`:rule.optional?'Deixe sem informação se não souber.':'Selecione uma opção.'}</p>{error&&<p id={`${id}-error`} className="mt-1 text-sm text-red-700">{error}</p>}</div>;
 })}</div></fieldset>;
 })}</div><div className="flex flex-wrap justify-end gap-3"><Link href={basePath} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">Cancelar</Link><button disabled={draftState.busy||draftState.uncertain} className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800">Revisar dados</button></div></form>}</div>;
}
