"use client";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ENVIRONMENTAL_FIELDS, EnvironmentalValidationError } from "@/types/environmental-data.validation";
import { emptyEnvironmentalForm, formToPayload, prepareSubmission, type Submission } from "./environmental-data-form-state";
import { GROUPS, VALUE_LABELS } from "./environmental-data-detail";
import { EnvironmentalReview } from "./environmental-data-review";
import { draftFieldsToForm, formToDraftFields, type EnvironmentalDraftDto } from "@/types/environmental-draft";
import { useEnvironmentalDraft } from "./environmental-draft-actions";
import { ChevronDown } from "lucide-react";
import { focusEnvironmentalTarget } from "./environmental-presentation";
import { keepEnvironmentalUncertainty } from "./environmental-outcome";
import styles from "./environmental.module.css";
const subscribeToReadiness=()=>()=>{};
const clientReady=()=>true;
const serverReady=()=>false;
export function EnvironmentalForm({apiPath,basePath,initialDraft=null,initiatorProof}:{apiPath:string;basePath:string;initialDraft?:EnvironmentalDraftDto|null;initiatorProof:string}) {
 // SSR and the first hydration render stay inert; handlers are attached before
 // React switches to the client snapshot. Never accept an edit only in the DOM.
 const hydrated=useSyncExternalStore(subscribeToReadiness,clientReady,serverReady);
 // Freeze the server-rendered principal for this form lifetime, even across RSC refresh.
 const proof=useRef(initiatorProof).current;
 const router=useRouter();const [form,setForm]=useState(()=>initialDraft?draftFieldsToForm(initialDraft.fields):emptyEnvironmentalForm());const [errors,setErrors]=useState<Record<string,string>>({});const [review,setReview]=useState<Submission|null>(null);const previous=useRef<Submission|null>(null);const submitting=useRef(false);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [uncertain,setUncertain]=useState(false);
 const draftState=useEnvironmentalDraft({apiPath,initialDraft,lock:submitting,initiatorProof:proof});
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
 const focus=(id:string)=>requestAnimationFrame(()=>focusEnvironmentalTarget(id));
 function reviewForm(event:React.FormEvent){event.preventDefault();setMessage('');try{const payload=formToPayload(form);const next=prepareSubmission(payload,previous.current);previous.current=next;setReview(next);setErrors({});focus('review-title');}catch(error){if(error instanceof EnvironmentalValidationError){setErrors(error.fields);focus(Object.keys(error.fields)[0]);}}}
 async function confirm(){if(!review||submitting.current)return;submitting.current=true;setBusy(true);setMessage('');try{
  const response=await fetch(apiPath,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':review.key,'X-Environmental-Initiator-Proof':proof,...(draftState.draft?{'Draft-Id':draftState.draft.id,'Draft-Revision':String(draftState.draft.revision)}:{})},body:review.canonical});
  const body=await response.json();
  if(!response.ok){setUncertain(wasUnknown=>keepEnvironmentalUncertainty(wasUnknown,response.status));setMessage(body.error?.message??'Não foi possível confirmar. Tente novamente.');toast.error('Não foi possível confirmar os dados.');return;}
  if(!body.environmentalData?.id)throw Error('Invalid response');
  leaveAllowed.current=true;toast.success('Dados ambientais confirmados.');router.push(basePath);router.refresh();
 }catch{setUncertain(true);setMessage('Não foi possível verificar a confirmação. Tente novamente com os mesmos dados ou consulte o registro.');toast.error('Falha de conexão. Seus dados continuam nesta página.');}finally{submitting.current=false;setBusy(false);}}
 return <div className={styles.flow}>{!review&&<section aria-label="Rascunho pessoal" className={styles.draft}>
 <h2 className="font-bold">Rascunho pessoal</h2><p className="text-sm">Salve para retomar depois. O rascunho é pessoal e não entra nos dados confirmados.</p>
 <p role="status" aria-live="polite">{hydrated?draftState.message:'Preparando formulário…'} {dirty?'Há alterações não salvas.':''}</p>
 {draftState.draft&&<p className="text-sm">Último salvamento: {new Date(draftState.draft.updatedAt).toLocaleString('pt-BR')}</p>}
 <div className={styles.actions}><button type="button" disabled={!hydrated||draftState.busy} onClick={()=>void saveDraft()} className={styles.primary}>{draftState.busy?'Aguarde…':draftState.uncertain?'Repetir salvamento':'Salvar rascunho'}</button>
 <button type="button" disabled={!hydrated||draftState.busy} onClick={()=>void reloadDraft()} className={styles.secondary}>Recarregar rascunho</button>
 <button type="button" disabled={!hydrated||draftState.busy||!draftState.draft||draftState.uncertain} onClick={()=>void discardDraft()} className={styles.danger}>Descartar rascunho</button></div></section>}{message&&<div role="alert" className={styles.notice}>{message} <Link className="font-semibold underline" href={basePath}>Consultar registro</Link></div>}{review?<><EnvironmentalReview payload={review.payload} busy={busy} locked={uncertain} onBack={()=>{if(!uncertain){setReview(null);focus('form-title');}}} onConfirm={confirm}/>{uncertain&&<p className="text-sm text-slate-600">Enquanto o resultado estiver desconhecido, mantenha os mesmos dados e repita a confirmação.</p>}</>:<form noValidate onSubmit={reviewForm} className={styles.flow}><h2 id="form-title" tabIndex={-1} className={styles.sectionTitle}>Informar dados ambientais</h2><p className="text-sm text-slate-600">Preencha os quatro grupos. Campos opcionais podem ficar sem informação; zero e “Não” são valores informados.</p>{Object.keys(errors).length>0&&<p role="alert" className="text-red-700">Revise os campos indicados antes de continuar.</p>}<div className={styles.groups}>{Object.entries(ENVIRONMENTAL_FIELDS).map(([group,fields])=>{
 const style=GROUPS[group as keyof typeof GROUPS];const Icon=style.icon;
 return <details key={group} open className={styles.group} data-environmental-group={group}><summary className={styles.groupHeading}><span><Icon size={19} aria-hidden="true"/>{style.label}</span><ChevronDown size={20} className={styles.chevron} aria-hidden="true"/></summary><fieldset className={styles.groupFields}><legend className={styles.srOnly}>{style.label}</legend><div className={styles.fieldList}>{Object.entries(fields).map(([key,rule])=>{
 const id=`${group}.${key}`;const error=errors[id];const inapplicable=key==='wellDepthMeters'&&!['SHALLOW_WELL','TUBULAR_WELL'].includes(form['water.waterSourceType']);
 const common={id,name:id,value:form[id],disabled:!hydrated||draftState.busy||draftState.uncertain||(inapplicable&&!form[id]),'aria-required':!rule.optional,'aria-invalid':Boolean(error),'aria-describedby':`${id}-hint${error?` ${id}-error`:''}`,className:styles.control,onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{setTouched(old=>new Set(old).add(id));setForm(old=>({...old,[id]:e.target.value}));}};
 return <div key={id}><label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">{rule.label}{rule.unit?` (${rule.unit})`:''}{rule.optional?' — opcional':' *'}</label>{rule.type==='number'?<input {...common} type="text" inputMode="decimal"/>:<select {...common}><option value="">{rule.optional?'Não informado':'Selecione'}</option>{rule.type==='boolean'?<><option value="true">Sim</option><option value="false">Não</option></>:rule.values!.map(v=><option key={v} value={v}>{VALUE_LABELS[v]??v}</option>)}</select>}<p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">{inapplicable?'Aplicável somente a poços.':rule.type==='number'?`Use ponto como separador decimal.${rule.min!==undefined?` Mínimo: ${rule.min}.`:''}${rule.max!==undefined?` Máximo: ${rule.max}.`:''}`:rule.optional?'Deixe sem informação se não souber.':'Selecione uma opção.'}</p>{error&&<p id={`${id}-error`} className="mt-1 text-sm text-red-700">{error}</p>}</div>;
 })}</div></fieldset></details>;
 })}</div><div className={styles.actions}><Link href={basePath} className={styles.secondary}>Cancelar</Link><button disabled={!hydrated||draftState.busy||draftState.uncertain} className={styles.primary}>Revisar dados</button></div></form>}</div>;
}
