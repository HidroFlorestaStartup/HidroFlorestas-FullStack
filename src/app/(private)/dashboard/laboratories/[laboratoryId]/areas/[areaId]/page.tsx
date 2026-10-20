import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ClipboardPlus, MapPin } from "lucide-react";
import { requireAuth } from "@/app/api/server/middlewares/auth.middleware";
import { areasService } from "@/app/api/server/services/areas.service";
import { AreaAccessError } from "@/app/api/server/areas/area.authorization";
import { AreaMap } from "@/components/areas/area-map";
import { AreaCoverEditor } from "@/components/areas/area-cover";
import styles from "@/components/areas/areas.module.css";
export default async function AreaDetail({
  params,
}: {
  params: Promise<{ laboratoryId: string; areaId: string }>;
}) {
  const { laboratoryId, areaId } = await params;
  const principal = await requireAuth();
  const result = await areasService
    .detail(principal.id, laboratoryId, areaId)
    .catch((error) => {
      if (error instanceof AreaAccessError && error.code === "NOT_FOUND")
        notFound();
      throw new Error("Não foi possível carregar a área.");
    });
  const { area } = result;
  const optional = [
    ["Município", area.municipality],
    ["UF", area.state],
    ["Tipo do terreno", area.landType],
    ["Descrição", area.description],
  ].filter(([, value]) => value);
  return (
    <article className={styles.detail}>
      <div className={styles.heading}>
        <Link
          aria-label="Voltar às áreas"
          className={styles.back}
          href={`/dashboard/laboratories/${laboratoryId}/areas`}
        >
          <ArrowLeft aria-hidden="true" size={20} />
          <span>Voltar às áreas</span>
        </Link>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Diagnóstico hidroambiental
          </p>
          <h1 className={styles.title}>
            {area.name}
          </h1>
          <p className={styles.identifier}>
            Identificador: {area.id}
          </p>
        </div>
      </div>
      {area.readOnly && (
        <p className={styles.notice}>
          Laboratório inativo — somente leitura.
        </p>
      )}
      {!area.readOnly && (
        <Link
          className={styles.button}
          href={`/dashboard/laboratories/${laboratoryId}/areas/${areaId}/collections/new`}
        >
          <ClipboardPlus aria-hidden="true" size={20} /> Registrar coleta
        </Link>
      )}
      <AreaCoverEditor laboratoryId={laboratoryId} areaId={areaId} name={area.name}/>
      <div className={styles.detailGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.mapTitle}>
              <MapPin className="text-green-600" /> Localização monitorada
            </h2>
            <p className={styles.coordinates}>
              Latitude: {area.latitude} · Longitude: {area.longitude}
            </p>
          </div>
          <div className={styles.cardBody}>
            <AreaMap latitude={area.latitude} longitude={area.longitude} />
          </div>
        </section>
        <aside className={styles.card}>
          <div className={styles.cardBody}>
            <h2 className={styles.mapTitle}>
              Informações da área
            </h2>
            <dl className={styles.data}>
              {optional.map(([label, value]) => (
                <div key={label} className={styles.dataRow}>
                  <dt className={styles.dataLabel}>
                    {label}
                  </dt>
                  <dd className={styles.dataValue}>
                    {value}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  <CalendarDays size={15} /> Cadastrada em
                </dt>
                <dd className={styles.dataValue}>
                  {new Date(area.createdAt).toLocaleString("pt-BR", {
                    timeZone: "America/Fortaleza",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}
