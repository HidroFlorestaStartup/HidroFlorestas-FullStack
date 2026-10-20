import Link from "next/link";
import { ArrowLeft, Leaf, LockKeyhole } from "lucide-react";
import { formatCollectionOccurrence } from "@/lib/collection-date-time";
import type { CollectionDetailDto } from "@/types/collection.type";
import styles from "./collections.module.css";

export function CollectionDetail({ collection }: { collection: CollectionDetailDto }) {
  const areaPath = `/dashboard/laboratories/${collection.laboratory.id}/areas/${collection.area.id}`;
  return (
    <article aria-labelledby="collection-detail-title" className={styles.page}>
      <header className={styles.header}>
        <Link href={areaPath} className={styles.back}><ArrowLeft size={18} aria-hidden="true" />Voltar à área</Link>
        <h1 id="collection-detail-title" className={styles.title}>Detalhe da coleta</h1>
        <p className={styles.subtitle}>{collection.area.name} · {collection.laboratory.name}</p>
      </header>
      {collection.readOnly && <p className={styles.notice}>Laboratório inativo — somente leitura.</p>}
      <div className={styles.card}>
        <div className={styles.recordHeading}><h2 className={styles.sectionTitle}>Registro</h2><span className={styles.badge}><LockKeyhole size={15} aria-hidden="true" />Imutável</span></div>
        <p className={styles.identifier}>{collection.id}</p>
        <dl className={styles.values}>
          <div><dt>Laboratório</dt><dd>{collection.laboratory.name}</dd></div>
          <div><dt>Área</dt><dd>{collection.area.name}</dd></div>
          <div><dt>Ocorrência em campo</dt><dd>{formatCollectionOccurrence(collection.occurredAt)}</dd></div>
          <div><dt>Confirmação no sistema</dt><dd><time dateTime={collection.confirmedAt}>{collection.confirmedAt}</time></dd></div>
        </dl>
      </div>
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}><Leaf size={20} aria-hidden="true" />Dados ambientais</h2>
        <p className={styles.help}>As medições são registradas e consultadas separadamente dos metadados da coleta.</p>
        <div className={styles.actions}><Link href={`${areaPath}/collections/${collection.id}/environmental-data`} className={styles.primary}>Ver dados ambientais</Link></div>
      </div>
    </article>
  );
}
