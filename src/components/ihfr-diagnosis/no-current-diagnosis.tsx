import { FlaskConical } from "lucide-react";
import { ScientificNotice } from "./scientific-notice";

export function NoCurrentDiagnosis() {
  return <section aria-labelledby="ihfr-diagnosis-heading" className="min-w-0 rounded-[1.25rem] border border-emerald-900/10 bg-white p-[16px] text-slate-900 shadow-sm sm:p-6">
    <div className="flex flex-wrap items-start gap-3">
      <span className="rounded-xl bg-amber-100 p-2.5 text-amber-800"><FlaskConical aria-hidden="true" className="size-5" /></span>
      <div className="min-w-0 flex-1 basis-48">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Leitura da coleta</p>
        <h2 id="ihfr-diagnosis-heading" className="mt-1 text-lg font-semibold leading-snug sm:text-xl">Diagnóstico IHFR experimental</h2>
      </div>
    </div>
    <div className="my-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-[12px] sm:p-4">
      <p className="text-sm font-semibold leading-relaxed">Nenhum diagnóstico IHFR vigente para esta coleta.</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">A ausência de diagnóstico não representa um score zero. Um resultado depende de dados suficientes e de uma solicitação autorizada.</p>
    </div>
    <ScientificNotice />
  </section>;
}
