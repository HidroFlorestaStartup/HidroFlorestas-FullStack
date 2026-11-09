import { FlaskConical } from "lucide-react";
import { IHFR_CONTRACT } from "@/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { ihfrLabel } from "./ihfr-presentation";

export function ScientificNotice({ labels = IHFR_CONTRACT.labels }: { labels?: readonly string[] }) {
  return <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50/80 p-2 text-amber-950 sm:p-4">
    <p className="flex min-w-0 flex-col items-start gap-2 text-sm font-semibold sm:flex-row sm:flex-wrap">
      <FlaskConical aria-hidden="true" className="size-4 shrink-0 sm:mt-0.5" />
      <span className="block w-full min-w-0 break-normal [hyphens:none] sm:w-auto sm:flex-1 sm:basis-40">Limites do diagnóstico experimental</span>
    </p>
    <ul className="mt-3 grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
      {labels.map((label) => <li key={label} className="min-w-0 text-sm">
        <span className="block break-normal leading-relaxed [hyphens:none]">{ihfrLabel("scientific", label)}</span>
        <span className="mt-1 block break-all text-xs leading-relaxed text-amber-900">{label}</span>
      </li>)}
    </ul>
  </div>;
}
