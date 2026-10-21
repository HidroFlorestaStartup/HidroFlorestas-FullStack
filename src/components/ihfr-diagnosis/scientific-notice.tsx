import { FlaskConical } from "lucide-react";
import { IHFR_CONTRACT } from "@/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { ihfrLabel } from "./ihfr-presentation";

export function ScientificNotice({ labels = IHFR_CONTRACT.labels }: { labels?: readonly string[] }) {
  return <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-950">
    <p className="flex items-start gap-2 text-sm font-semibold">
      <FlaskConical aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      Limites do diagnóstico experimental
    </p>
    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
      {labels.map((label) => <li key={label} className="min-w-0 text-sm">
        <span className="block leading-relaxed">{ihfrLabel("scientific", label)}</span>
        <span className="mt-1 block break-all text-xs leading-relaxed text-amber-900">{label}</span>
      </li>)}
    </ul>
  </div>;
}
