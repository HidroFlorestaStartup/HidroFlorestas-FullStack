import Link from "next/link";
import { ChevronDown, Droplets, Mountain, Sprout, Layers } from "lucide-react";
import type { EnvironmentalPayload, PublicEnvironmentalData } from "@/types/environmental-data.type";
import { ENVIRONMENTAL_FIELDS } from "@/types/environmental-data.validation";
import { formatEnvironmentalNumber } from "./environmental-presentation";
import styles from "./environmental.module.css";

export const GROUPS = {
  water: { label: "Água", color: "bg-sky-700", icon: Droplets },
  soil: { label: "Solo", color: "bg-amber-800", icon: Layers },
  vegetation: { label: "Vegetação", color: "bg-green-700", icon: Sprout },
  terrain: { label: "Terreno", color: "bg-orange-800", icon: Mountain },
};
export const VALUE_LABELS: Record<string, string> = {
  RIVER_STREAM: "Rio ou riacho", SPRING: "Nascente", SHALLOW_WELL: "Poço raso",
  TUBULAR_WELL: "Poço tubular", CISTERN: "Cisterna", OTHER: "Outra", PERMANENT: "Permanente",
  SEASONAL: "Sazonal", SCARCE: "Escassa", NONE: "Nenhum", SUSPECTED: "Suspeita",
  CONFIRMED: "Confirmada", SANDY: "Arenosa", MEDIUM: "Média", CLAYEY: "Argilosa",
  LOW: "Baixo", HIGH: "Alto", LAMINAR: "Laminar", RILLS_GULLIES: "Sulcos ou ravinas",
};

export function EnvironmentalValues({ payload }: { payload: EnvironmentalPayload }) {
  return <div className={styles.groups}>
    {Object.entries(ENVIRONMENTAL_FIELDS).map(([group, fields]) => {
      const style = GROUPS[group as keyof typeof GROUPS];
      const Icon = style.icon;
      return <section key={group} aria-label={style.label}>
        <details open className={styles.group} data-environmental-group={group}>
          <summary className={styles.groupHeading}>
            <h3><span><Icon size={19} aria-hidden="true" />{style.label}</span><ChevronDown size={20} className={styles.chevron} aria-hidden="true" /></h3>
          </summary>
          <dl className={styles.values}>
            {Object.entries(fields).map(([key, rule]) => {
              const value = (payload[group as keyof EnvironmentalPayload] as Record<string, unknown>)[key];
              const text = value === null ? "Não informado"
                : typeof value === "boolean" ? (value ? "Sim" : "Não")
                : typeof value === "number" ? `${formatEnvironmentalNumber(value)}${rule.unit ? ` ${rule.unit}` : ""}`
                : VALUE_LABELS[String(value)] ?? String(value);
              return <div key={key}><dt>{rule.label}</dt><dd data-environmental-value={`${group}.${key}`}>{text}</dd></div>;
            })}
          </dl>
        </details>
      </section>;
    })}
  </div>;
}

export function EnvironmentalDetail({ data, readOnly, basePath }: {
  data: PublicEnvironmentalData | null; readOnly: boolean; basePath: string;
}) {
  if (!data) return <div className={styles.empty}>
    <h2 className={styles.sectionTitle}>Nenhum dado ambiental registrado</h2>
    <p>Esta coleta ainda não possui um conjunto ambiental confirmado.</p>
    {!readOnly && <Link href={`${basePath}/new`} className={styles.primary}>Registrar dados ambientais</Link>}
  </div>;
  return <div className={styles.flow}>
    <p className={styles.confirmed}>Conjunto confirmado e imutável. Os valores abaixo foram registrados para esta coleta.</p>
    <EnvironmentalValues payload={data} />
    <p className={styles.help}>Contrato de captura: {data.measurementContractVersion} · Confirmado em {new Date(data.confirmedAt).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })} (UTC−03:00)</p>
  </div>;
}
