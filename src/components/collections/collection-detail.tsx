import Link from "next/link";
import { ArrowLeft, Leaf, LockKeyhole } from "lucide-react";
import { formatCollectionConfirmation, formatCollectionOccurrence } from "@/lib/collection-date-time";
import type { CollectionDetailDto } from "@/types/collection.type";
import type { CollectionDetailSlots } from "./collection-detail-layout";
import styles from "./collections.module.css";

type CollectionDetailProps = { collection: CollectionDetailDto; hasConfirmedEnvironmentalData?: boolean };

export function createCollectionDetailSlots({ collection, hasConfirmedEnvironmentalData = true }: CollectionDetailProps): CollectionDetailSlots {
  const areaPath = `/dashboard/laboratories/${collection.laboratory.id}/areas/${collection.area.id}`;
  return {
    metadataClassName: `${styles.page} !mx-0 !max-w-none`,
    header: <>
      <header className={styles.header}>
        <Link href={areaPath} className={styles.back}><ArrowLeft size={18} aria-hidden="true" />Voltar à área</Link>
        <h1 id="collection-detail-title" className={styles.title}>Detalhe da coleta</h1>
        <p className={styles.subtitle}>{collection.area.name} · {collection.laboratory.name}</p>
      </header>
      {collection.readOnly && <p className={styles.notice}>Laboratório inativo — somente leitura.</p>}
    </>,
    record: <div className={styles.card}>
        <div className={styles.recordHeading}><h2 className={styles.sectionTitle}>Registro</h2><span className={styles.badge}><LockKeyhole size={15} aria-hidden="true" />Imutável</span></div>
        <p className={styles.identifier}>{collection.id}</p>
        <dl className={styles.values}>
          <div><dt>Laboratório</dt><dd>{collection.laboratory.name}</dd></div>
          <div><dt>Área</dt><dd>{collection.area.name}</dd></div>
          <div><dt>Ocorrência em campo</dt><dd>{formatCollectionOccurrence(collection.occurredAt)}</dd></div>
          <div><dt>Confirmação no sistema</dt><dd><time dateTime={collection.confirmedAt}>{formatCollectionConfirmation(collection.confirmedAt, collection.occurredAt)}</time></dd></div>
        </dl>
      </div>,
    environmental: <div className={styles.card}>
        <h2 className={styles.sectionTitle}><Leaf size={20} aria-hidden="true" />Dados ambientais</h2>
        <p className={styles.help}>As medições são registradas e consultadas separadamente dos metadados da coleta. Rascunhos pessoais não equivalem a dados confirmados.</p>
        {!hasConfirmedEnvironmentalData ? (
          <div role="status" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            <p className="font-semibold">Não há conjunto de dados ambientais confirmado para esta coleta.</p>
            <p className="mt-2">Consulte os dados existentes ou registre e confirme as medições para permitir a avaliação experimental. A ausência de dados não significa IHFR igual a zero.</p>
          </div>
        ) : <p className="text-sm font-medium text-emerald-800">Há dados ambientais confirmados nesta coleta.</p>}
        <div className={styles.actions}>
          <Link href={areaPath + "/collections/" + collection.id + "/environmental-data"} className={styles.primary}>Ver dados ambientais</Link>
          {!hasConfirmedEnvironmentalData && !collection.readOnly && (
            <Link href={areaPath + "/collections/" + collection.id + "/environmental-data/new"} className={styles.secondary}>Registrar dados ambientais</Link>
          )}
        </div>
      </div>,
  };
}

export function CollectionDetail(props: CollectionDetailProps) {
  const { header, record, environmental, metadataClassName } = createCollectionDetailSlots(props);
  return <article aria-labelledby="collection-detail-title" className={metadataClassName}>
    {header}
    {environmental}
    {record}
  </article>;
}
