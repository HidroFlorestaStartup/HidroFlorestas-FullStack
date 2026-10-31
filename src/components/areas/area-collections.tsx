import Link from "next/link";
import { ArrowUpRight, CalendarDays, ClipboardList, FlaskConical, Leaf } from "lucide-react";
import { formatCollectionOccurrence } from "@/lib/collection-date-time";
import type { AreaCollectionItem } from "./area-collections-presentation";
import { latestAvailableDiagnosis } from "./area-collections-presentation";
import { ihfrLabel } from "@/components/ihfr-diagnosis/ihfr-presentation";

export function AreaCollections({
  laboratoryId, areaId, rows,
}: { laboratoryId: string; areaId: string; rows: readonly AreaCollectionItem[] }) {
  const base = "/dashboard/laboratories/" + laboratoryId + "/areas/" + areaId + "/collections/";
  const selected = latestAvailableDiagnosis(rows);
  const current = selected?.currentDiagnosis;
  return (
    <section aria-labelledby="area-collections-title" className="min-w-0 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Histórico da área</p>
          <h2 id="area-collections-title" className="mt-1 text-xl font-bold text-slate-900">Coletas confirmadas</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Da ocorrência em campo mais recente para a mais antiga, independentemente da confirmação.</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900">{rows.length} {rows.length === 1 ? "coleta" : "coletas"}</span>
      </div>
      <aside aria-label="Último IHFR disponível da área" className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
        <div className="flex items-center gap-2 font-semibold text-amber-950"><FlaskConical size={19} aria-hidden="true" />Último IHFR experimental disponível</div>
        {selected && current ? (
          <div className="mt-3 space-y-2">
            <p className="text-base font-semibold text-slate-900">Score registrado: {current.displayScore} · {ihfrLabel("class", current.ihfrClass)} (experimental)</p>
            <p className="break-words text-sm text-slate-700">Coleta de origem: <span className="break-all font-medium">{selected.id}</span></p>
            <p className="text-sm text-slate-700">Ocorrência em campo: <time dateTime={selected.occurredAt}>{formatCollectionOccurrence(selected.occurredAt)}</time></p>
            <p className="text-xs text-amber-900">Diagnóstico vigente desta coleta. Pode ser anterior à coleta mais recente; validação científica pendente.</p>
            <Link className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-emerald-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800" href={base + selected.id + "#ihfr-diagnosis-heading"}>Consultar resultado e proveniência <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-slate-700">Nenhum diagnóstico IHFR vigente disponível para as coletas desta área. Isso não representa score zero; nenhum resultado será calculado automaticamente.</p>
        )}
      </aside>
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600" role="status">Esta área ainda não tem coletas confirmadas. Utilize Registrar coleta para iniciar um registro.</div>
      ) : (
        <ol aria-label="Coletas ordenadas por ocorrência em campo" className="grid min-w-0 gap-3 lg:grid-cols-2">
          {rows.map(row => (
            <li key={row.id} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
                <h3 className="flex min-w-0 items-center gap-2 font-semibold text-slate-900"><ClipboardList size={18} aria-hidden="true" />Coleta confirmada</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{row.currentDiagnosis ? "IHFR vigente" : "Sem IHFR vigente"}</span>
              </div>
              <p className="mt-2 break-all text-xs text-slate-500">ID: {row.id}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div><dt className="flex items-center gap-2 text-slate-600"><CalendarDays size={15} aria-hidden="true" />Ocorrência em campo</dt><dd className="mt-1 font-semibold text-slate-900"><time dateTime={row.occurredAt}>{formatCollectionOccurrence(row.occurredAt)}</time></dd></div>
                <div><dt className="text-slate-600">Confirmação no sistema</dt><dd className="mt-1 text-slate-800"><time dateTime={row.confirmedAt}>{new Date(row.confirmedAt).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })}</time></dd></div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <Link className="inline-flex min-h-11 items-center rounded-xl bg-emerald-800 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800" href={base + row.id}>Abrir coleta</Link>
                <Link className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800" href={base + row.id + "/environmental-data"}><Leaf size={16} aria-hidden="true" />Dados ambientais</Link>
                <Link className="inline-flex min-h-11 items-center rounded-xl px-2 py-2 text-sm font-semibold text-emerald-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800" href={base + row.id + "#ihfr-diagnosis-heading"}>IHFR</Link>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
