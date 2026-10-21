import { FileCheck2, FlaskConical } from "lucide-react";
import type { PublicDiagnosis } from "@/types/ihfr-diagnosis.type";
import { COMPONENT_LABELS, ihfrLabel } from "./ihfr-presentation";
import { ScientificNotice } from "./scientific-notice";

function dateUTC(value: string | null | undefined) {
  if (!value) return "Não se aplica";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Data indisponível" : date.toISOString().replace("T", " ").replace(".000Z", " UTC").replace("Z", " UTC");
}

function Detail({ label, value, wide = false }: { label: string; value: string | number; wide?: boolean }) {
  return <div className={`min-w-0 space-y-1 ${wide ? "sm:col-span-2" : ""}`}>
    <dt className="text-xs font-medium leading-relaxed text-slate-600">{label}</dt>
    <dd className="break-all text-sm leading-relaxed text-slate-900">{value}</dd>
  </div>;
}

export function ExperimentalDiagnosisSummary({ diagnosis }: { diagnosis: PublicDiagnosis }) {
  return <section aria-labelledby="ihfr-diagnosis-heading" className="min-w-0 overflow-hidden rounded-[1.25rem] border border-emerald-900/10 bg-white text-slate-900 shadow-sm">
    <div className="border-b border-slate-100 p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2.5 text-amber-800"><FlaskConical aria-hidden="true" className="size-5" /></span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Leitura da coleta</p>
          <h2 id="ihfr-diagnosis-heading" className="mt-1 text-lg font-semibold leading-snug sm:text-xl">Diagnóstico IHFR experimental</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Resultado registrado e sua proveniência, conforme o contrato experimental indicado abaixo.</p>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 rounded-2xl bg-emerald-950 p-4 text-white">
          <dt className="text-xs font-medium text-emerald-100">Score registrado</dt>
          <dd className="mt-2 break-all text-3xl font-semibold tabular-nums">{diagnosis.displayScore}</dd>
        </div>
        <div className="min-w-0 rounded-2xl bg-slate-50 p-4">
          <dt className="text-xs font-medium text-slate-600">Classe experimental</dt>
          <dd className="mt-2 text-lg font-semibold">{ihfrLabel("class", diagnosis.ihfrClass)}<span className="mt-1 block break-all text-xs font-normal text-slate-600">{diagnosis.ihfrClass}</span></dd>
        </div>
        <div className="min-w-0 rounded-2xl bg-slate-50 p-4">
          <dt className="text-xs font-medium text-slate-600">Qualidade dos dados:</dt>
          <dd className="mt-2 text-lg font-semibold">{ihfrLabel("quality", diagnosis.dataQuality)}<span className="mt-1 block break-all text-xs font-normal text-slate-600">{diagnosis.dataQuality}</span></dd>
        </div>
        <div className="min-w-0 rounded-2xl bg-slate-50 p-4">
          <dt className="text-xs font-medium text-slate-600">Estado do diagnóstico</dt>
          <dd className="mt-2 text-lg font-semibold">{ihfrLabel("lifecycle", diagnosis.lifecycleState)}<span className="mt-1 block break-all text-xs font-normal text-slate-600">{diagnosis.lifecycleState}</span></dd>
        </div>
      </dl>
      <div className="mt-5">
        <h3 className="text-sm font-semibold">Componentes registrados</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(diagnosis.componentScores).map(([name, value]) => <div key={name} className="min-w-0 rounded-xl border border-emerald-900/10 bg-emerald-50/60 p-3">
            <dt className="text-sm"><span className="font-semibold text-emerald-900">{name}</span><span className="mt-1 block break-words text-xs text-slate-600">{COMPONENT_LABELS[name as keyof typeof COMPONENT_LABELS] ?? name}</span></dt>
            <dd className="mt-2 break-all text-lg font-semibold tabular-nums">{value}</dd>
          </div>)}
        </dl>
      </div>
      {diagnosis.explanation && <p className="mt-4 break-words text-sm leading-relaxed text-slate-700">{diagnosis.explanation}</p>}
      <p className="mt-4 break-all text-xs text-slate-600">Estado científico: {diagnosis.scientificState}</p>
      <div className="mt-4"><ScientificNotice labels={diagnosis.scientificLabels} /></div>
    </div>
    <div className="bg-slate-50/60 p-4 sm:p-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold"><FileCheck2 aria-hidden="true" className="size-4 shrink-0 text-emerald-800" />Proveniência e contrato</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">Identificadores e versões preservados para rastrear este resultado.</p>
      <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <Detail label="Área de origem" value={diagnosis.areaId} />
        <Detail label="Coleta de origem" value={diagnosis.collectionId} />
        <Detail label="Conjunto de medições ambientais" value={diagnosis.environmentalMeasurementSetId} />
        <Detail label="Suplemento de entrada IHFR" value={diagnosis.inputSupplementId} />
        <Detail label="Contrato de medição" value={diagnosis.versions.measurementContractVersion} />
        <Detail label="Contrato de entrada" value={diagnosis.versions.inputContractVersion} />
        <Detail label="Contrato matemático" value={diagnosis.versions.mathContractVersion} />
        <Detail label="Algoritmo" value={diagnosis.versions.algorithmVersion} />
        <Detail label="Hash do contrato" value={diagnosis.versions.contractHash} wide />
        <Detail label="Calculado em (UTC)" value={dateUTC(diagnosis.calculatedAt)} />
        <Detail label="Vigente desde (UTC)" value={dateUTC(diagnosis.validFrom)} />
        <Detail label="Transição de estado em (UTC)" value={dateUTC(diagnosis.transitionedAt)} />
      </dl>
    </div>
  </section>;
}
