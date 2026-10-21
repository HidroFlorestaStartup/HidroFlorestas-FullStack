"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, RotateCcw, Settings2, ShieldAlert } from "lucide-react";
import type { IHFRLandUseType, IHFRRouteContext, PublicDiagnosis } from "@/types/ihfr-diagnosis.type";
import { IHFR_CONTRACT } from "@/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { ExperimentalDiagnosisSummary } from "./experimental-diagnosis-summary";
import { NoCurrentDiagnosis } from "./no-current-diagnosis";
import { ScientificNotice } from "./scientific-notice";
import { ihfrLabel } from "./ihfr-presentation";
import { LAND_USE_LABELS } from "./land-use-labels";
import { createClientUuid } from "@/lib/client-uuid";

type OperationResponse = { outcome: "SUCCEEDED" | "INSUFFICIENT_DATA" | "INCOMPATIBLE_VERSION"; diagnosis: PublicDiagnosis | null; insufficiencyReasons: string[] };
type EligibilityResponse = { eligible: boolean; outcome: "ELIGIBLE" | "INSUFFICIENT_DATA" | "INCOMPATIBLE_VERSION"; reasons: string[]; hasCurrentDiagnosis: boolean; currentDiagnosisId: string | null };
type Attempt = { key: string; endpoint: string; body: object; kind: "DIAGNOSE" | "REVOKE" };
type Feedback = { text: string; kind: "status" | "alert" };
const landUseTypes = Object.keys(LAND_USE_LABELS) as IHFRLandUseType[];
const controlClass = "mt-2 min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus-visible:border-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-700/30 disabled:bg-slate-100 disabled:text-slate-600";
const buttonClass = "min-h-11 max-w-full rounded-xl px-[16px] py-2.5 text-sm font-semibold leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 disabled:cursor-not-allowed disabled:opacity-50";

export function IHFRDiagnosisManagement({ context, initialDiagnosis }: { context: IHFRRouteContext; initialDiagnosis: PublicDiagnosis | null }) {
  const [diagnosis, setDiagnosis] = useState(initialDiagnosis);
  const [landUseType, setLandUseType] = useState<IHFRLandUseType | "">("");
  const [provenanceKind, setProvenanceKind] = useState<"FIELD_OBSERVATION" | "AUTHORIZED_RECORD">("FIELD_OBSERVATION");
  const [observedAt, setObservedAt] = useState("");
  const [reason, setReason] = useState("");
  const [eligibility, setEligibility] = useState<EligibilityResponse | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [unknown, setUnknown] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [confirmation, setConfirmation] = useState<"DIAGNOSE" | "REVOKE" | null>(null);
  const dialogButton = useRef<HTMLButtonElement>(null);
  const confirmButton = useRef<HTMLButtonElement>(null);
  const dialogTrigger = useRef<HTMLElement | null>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const base = `/api/laboratories/${context.laboratoryId}/areas/${context.areaId}/collections/${context.collectionId}/ihfr-diagnosis`;

  useEffect(() => { if (confirmation) dialogButton.current?.focus(); }, [confirmation]);
  useEffect(() => { if (feedback) feedbackRef.current?.focus(); }, [feedback]);

  function announce(text: string, kind: Feedback["kind"] = "status") { setFeedback({ text, kind }); }

  async function reconcileCurrentAndEligibility() {
    const query = landUseType ? `?landUseType=${encodeURIComponent(landUseType)}` : "";
    const [currentResponse, eligibilityResponse] = await Promise.all([
      fetch(`${base}/current`, { cache: "no-store" }),
      fetch(`${base}/eligibility${query}`, { cache: "no-store" }),
    ]);
    if (!currentResponse.ok || !eligibilityResponse.ok) throw new Error("Não foi possível atualizar o diagnóstico e a elegibilidade.");
    const current = await currentResponse.json() as { diagnosis: PublicDiagnosis | null };
    const nextEligibility = await eligibilityResponse.json() as EligibilityResponse;
    setDiagnosis(current.diagnosis);
    setEligibility(nextEligibility);
  }

  async function refreshEligibility() {
    setBusy(true);
    setFeedback(null);
    try {
      const query = landUseType ? `?landUseType=${encodeURIComponent(landUseType)}` : "";
      const response = await fetch(`${base}/eligibility${query}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Não foi possível verificar a elegibilidade.");
      setEligibility(await response.json() as EligibilityResponse);
    } catch (error) { announce(error instanceof Error ? error.message : "Falha ao verificar a elegibilidade.", "alert"); }
    finally { setBusy(false); }
  }

  async function send(current: Attempt) {
    setBusy(true);
    setFeedback(null);
    try {
      const response = await fetch(current.endpoint, { method: "POST", headers: { "content-type": "application/json", "idempotency-key": current.key }, body: JSON.stringify(current.body), cache: "no-store" });
      const body = await response.json();
      if (response.ok) {
        const operation = body as OperationResponse;
        setAttempt(null);
        setUnknown(false);
        try {
          await reconcileCurrentAndEligibility();
          if (operation.outcome === "SUCCEEDED") announce(current.kind === "REVOKE" ? "Diagnóstico revogado." : "Diagnóstico experimental registrado.");
          else if (operation.outcome === "INSUFFICIENT_DATA") announce(`Dados insuficientes: ${operation.insufficiencyReasons.join(", ")}.`);
          else announce("Versão incompatível com o contrato experimental ativo.", "alert");
        } catch { announce("Operação terminal registrada, mas não foi possível atualizar o diagnóstico e a elegibilidade.", "alert"); }
        return;
      }
      const code = typeof body?.error?.code === "string" ? body.error.code : "TECHNICAL_FAILURE";
      if (code === "TECHNICAL_FAILURE") { setUnknown(true); announce("Resultado desconhecido. Recupere a operação com a mesma chave.", "alert"); return; }
      setAttempt(null);
      setUnknown(false);
      if (code === "STATE_CONFLICT" || code === "IDEMPOTENCY_CONFLICT" || code === "INCOMPATIBLE_VERSION") {
        try {
          await reconcileCurrentAndEligibility();
          announce(code === "INCOMPATIBLE_VERSION" ? "Versão incompatível com o contrato experimental ativo." : "O diagnóstico vigente mudou. Estado e elegibilidade atualizados.", "alert");
        } catch { announce("Operação não concluída; não foi possível atualizar o diagnóstico e a elegibilidade.", "alert"); }
      } else announce(`Operação não concluída: ${code}.`, "alert");
    } catch { setUnknown(true); announce("Resultado desconhecido. Recupere a operação com a mesma chave.", "alert"); }
    finally { setBusy(false); }
  }

  async function recover() {
    if (!attempt) return;
    setBusy(true);
    try {
      const response = await fetch(`${base}/operations/${attempt.key}`, { cache: "no-store" });
      if (response.ok) {
        const operation = await response.json() as OperationResponse;
        setUnknown(false);
        setAttempt(null);
        try {
          await reconcileCurrentAndEligibility();
          announce(operation.outcome === "SUCCEEDED" ? "Resultado recuperado." : operation.outcome === "INSUFFICIENT_DATA" ? `Dados insuficientes: ${operation.insufficiencyReasons.join(", ")}.` : "Versão incompatível com o contrato experimental ativo.", operation.outcome === "INCOMPATIBLE_VERSION" ? "alert" : "status");
        } catch { announce("Resultado recuperado, mas não foi possível atualizar o diagnóstico e a elegibilidade.", "alert"); }
      } else if (response.status === 404) announce("Não há operação terminal recuperável. Se tentar novamente, use a mesma chave.", "alert");
      else announce("Não foi possível recuperar a operação agora. A chave foi preservada.", "alert");
    } catch { announce("Não foi possível recuperar a operação agora. A chave foi preservada.", "alert"); }
    finally { setBusy(false); }
  }

  function prepare(kind: "DIAGNOSE" | "REVOKE") {
    if (attempt) { announce("Recupere ou repita a tentativa pendente antes de iniciar outra operação.", "alert"); return; }
    if (kind === "DIAGNOSE" && (!observedAt || Number.isNaN(Date.parse(observedAt)))) { announce("Informe a data da observação.", "alert"); return; }
    if (kind === "REVOKE" && (reason.trim().length < 1 || reason.length > 500)) { announce("Informe um motivo de 1 a 500 caracteres.", "alert"); return; }
    dialogTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setConfirmation(kind);
  }

  function closeConfirmation(restoreTrigger = true) {
    setConfirmation(null);
    if (restoreTrigger) requestAnimationFrame(() => dialogTrigger.current?.focus());
  }

  function confirm() {
    const kind = confirmation;
    closeConfirmation(false);
    if (!kind) return;
    const key = createClientUuid();
    const current: Attempt = kind === "DIAGNOSE" ? {
      key, kind, endpoint: `${base}/diagnoses`, body: {
        mode: diagnosis ? "REPLACE" : "CREATE",
        ...(diagnosis ? { expectedCurrentDiagnosisId: diagnosis.id } : {}),
        supplement: { inputContractVersion: IHFR_CONTRACT.inputVersion, ...(landUseType ? { landUseType } : {}), provenance: { kind: provenanceKind, observedAt: new Date(observedAt).toISOString() } },
        versions: { measurementContractVersion: IHFR_CONTRACT.measurementVersion, mathContractVersion: IHFR_CONTRACT.activeMathVersion, algorithmVersion: IHFR_CONTRACT.algorithmVersion, contractHash: IHFR_CONTRACT.contractHash },
      },
    } : { key, kind, endpoint: `${base}/diagnoses/${diagnosis?.id}/revocations`, body: { expectedCurrentDiagnosisId: diagnosis?.id, reason: reason.trim() } };
    setAttempt(current);
    void send(current);
  }

  return <div className="mx-auto min-w-0 max-w-4xl space-y-6">
    {diagnosis ? <ExperimentalDiagnosisSummary diagnosis={diagnosis} /> : <NoCurrentDiagnosis />}
    <section aria-labelledby="ihfr-management-heading" aria-busy={busy} className="min-w-0 rounded-[1.25rem] border border-emerald-900/10 bg-white p-[16px] text-slate-900 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start gap-3">
        <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800"><Settings2 aria-hidden="true" className="size-5" /></span>
        <div className="min-w-0 flex-1 basis-48">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Ações autorizadas</p>
          <h2 id="ihfr-management-heading" className="mt-1 text-lg font-semibold leading-snug sm:text-xl">Gerenciar diagnóstico IHFR experimental</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Informe o contexto da observação, confira a elegibilidade e revise a ação antes de confirmar.</p>
        </div>
      </div>
      <div className="mt-5"><ScientificNotice /></div>
      <fieldset disabled={busy || Boolean(attempt)} className="mt-6 min-w-0">
        <legend className="text-sm font-semibold">Dados da observação</legend>
        <div className="mt-3 grid min-w-0 gap-4 sm:grid-cols-2">
          <label className="block min-w-0 text-sm font-medium sm:col-span-2">Uso predominante da terra
            <select aria-describedby="land-use-help" value={landUseType} onChange={(event) => setLandUseType(event.target.value as IHFRLandUseType | "")} className={controlClass}>
              <option value="">Indeterminado ou ausente</option>
              {landUseTypes.map((value) => <option key={value} value={value}>{LAND_USE_LABELS[value]}</option>)}
            </select>
          </label>
          <label className="block min-w-0 text-sm font-medium">Origem da observação
            <select value={provenanceKind} onChange={(event) => setProvenanceKind(event.target.value as typeof provenanceKind)} className={controlClass}>
              <option value="FIELD_OBSERVATION">Observação em campo</option><option value="AUTHORIZED_RECORD">Registro autorizado</option>
            </select>
          </label>
          <label className="block min-w-0 text-sm font-medium">Data e hora da observação
            <input type="datetime-local" value={observedAt} onChange={(event) => setObservedAt(event.target.value)} className={controlClass} />
          </label>
        </div>
      </fieldset>
      <p id="land-use-help" className="mt-3 text-xs leading-relaxed text-slate-600">Selecione um único uso predominante. Se não puder determinar, mantenha indeterminado; pode haver insuficiência de dados. Solo exposto aqui é uma categoria territorial, diferente do percentual de solo exposto nos dados ambientais.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" disabled={busy} onClick={() => void refreshEligibility()} className={`${buttonClass} border border-emerald-800/30 bg-white text-emerald-900 hover:bg-emerald-50`}>Verificar elegibilidade</button>
        <button type="button" disabled={busy || Boolean(attempt)} onClick={() => prepare("DIAGNOSE")} className={`${buttonClass} bg-emerald-800 text-white hover:bg-emerald-900`}>{diagnosis ? "Substituir diagnóstico" : "Criar diagnóstico"}</button>
      </div>
      {busy && <p className="mt-3 text-sm text-slate-600">Operação em andamento…</p>}
      {eligibility && <div role="status" aria-atomic="true" className={`mt-4 min-w-0 rounded-2xl border p-4 text-sm ${eligibility.eligible ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
        <p className="flex items-start gap-2 font-semibold"><ClipboardCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />{ihfrLabel("eligibility", eligibility.outcome)}</p>
        <p className="mt-2 break-all text-xs">{eligibility.outcome} · Vigente: {eligibility.hasCurrentDiagnosis ? "sim" : "não"}</p>
        {eligibility.reasons.length > 0 && <ul className="mt-3 space-y-2">{eligibility.reasons.map((item, index) => <li key={`${item}-${index}`} className="min-w-0 leading-relaxed">{ihfrLabel("reason", item)}<span className="block break-all text-xs">{item}</span></li>)}</ul>}
      </div>}
      {diagnosis && <div className="mt-6 min-w-0 rounded-2xl border border-amber-200 bg-amber-50/40 p-[12px] sm:p-4">
        <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-amber-950"><ShieldAlert aria-hidden="true" className="size-4 shrink-0" /><span className="min-w-0 flex-1 basis-40">Revogação do diagnóstico vigente</span></h3>
        <p id="ihfr-revocation-help" className="mt-2 text-xs leading-relaxed text-slate-600">A revogação preserva o registro e sua proveniência. Descreva o motivo em até 500 caracteres.</p>
        <label className="mt-4 block min-w-0 text-sm font-medium">Motivo da revogação
          <textarea value={reason} onChange={(event) => setReason(event.target.value)} disabled={busy || Boolean(attempt)} aria-describedby="ihfr-revocation-help" maxLength={500} rows={3} className={`${controlClass} resize-y`} />
        </label>
        <button type="button" disabled={busy || Boolean(attempt)} onClick={() => prepare("REVOKE")} className={`${buttonClass} mt-3 border border-amber-800/30 bg-white text-amber-900 hover:bg-amber-100`}>Revogar diagnóstico</button>
      </div>}
      {feedback && <p ref={feedbackRef} tabIndex={-1} role={feedback.kind} aria-live={feedback.kind === "alert" ? "assertive" : "polite"} className={`mt-5 break-words rounded-2xl border p-4 text-sm leading-relaxed outline-offset-4 focus:outline-2 focus:outline-emerald-800 ${feedback.kind === "alert" ? "border-amber-300 bg-amber-50 text-amber-950" : "border-emerald-200 bg-emerald-50 text-emerald-950"}`}>{feedback.text}</p>}
      {attempt && unknown && <div className="mt-4 min-w-0 rounded-2xl border border-amber-300 bg-amber-50 p-[12px] sm:p-4">
        <h3 className="flex flex-wrap items-start gap-2 text-sm font-semibold text-amber-950"><RotateCcw aria-hidden="true" className="mt-0.5 size-4 shrink-0" /><span className="min-w-0 flex-1 basis-40">Resultado ainda não confirmado</span></h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">A tentativa foi preservada. Recupere o resultado ou repita a mesma operação antes de iniciar outra.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" disabled={busy} onClick={() => void recover()} className={`${buttonClass} bg-emerald-800 text-white hover:bg-emerald-900`}>Recuperar resultado</button>
          <button type="button" disabled={busy} onClick={() => void send(attempt)} className={`${buttonClass} border border-amber-800/30 bg-white text-amber-950 hover:bg-amber-100`}>Repetir com a mesma chave</button>
        </div>
      </div>}
    </section>
    {confirmation && <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-[12px] sm:p-[16px]">
      <div role="dialog" aria-modal="true" aria-labelledby="ihfr-confirm-title" aria-describedby="ihfr-confirm-description" onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closeConfirmation(); } else if (event.key === "Tab" && event.shiftKey && document.activeElement === dialogButton.current) { event.preventDefault(); confirmButton.current?.focus(); } else if (event.key === "Tab" && !event.shiftKey && document.activeElement === confirmButton.current) { event.preventDefault(); dialogButton.current?.focus(); } }} className="max-h-[calc(100dvh-24px)] w-full min-w-0 max-w-md overflow-y-auto overscroll-contain rounded-[1.25rem] bg-white p-[20px] text-slate-900 shadow-xl sm:p-[24px]">
        <h2 id="ihfr-confirm-title" className="text-lg font-semibold">Confirmar {confirmation === "REVOKE" ? "revogação" : diagnosis ? "substituição" : "criação"}</h2>
        <div id="ihfr-confirm-description" className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
          <p>Esta ação registrará uma operação IHFR experimental imutável.</p>
          <p>{confirmation === "REVOKE" ? "O diagnóstico deixará de ser vigente. O registro e sua proveniência serão preservados." : diagnosis ? "A substituição preserva o histórico registrado. O resultado será confirmado pelo servidor." : "O servidor verificará os dados e as versões informadas antes de registrar um resultado."}</p>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button ref={dialogButton} type="button" onClick={() => closeConfirmation()} className={`${buttonClass} border border-slate-300 bg-white hover:bg-slate-50`}>Cancelar</button>
          <button ref={confirmButton} type="button" onClick={confirm} className={`${buttonClass} bg-emerald-800 text-white hover:bg-emerald-900`}>Confirmar</button>
        </div>
      </div>
    </div>}
  </div>;
}
