"use client";

import { useEffect, useRef } from "react";
import { formatCollectionOccurrence } from "@/lib/collection-date-time";
import type { CollectionAttempt } from "@/types/collection.type";
import { collectionEditingLocked } from "./collection-form-state";
import styles from "./collections.module.css";

export function CollectionReview({ attempt, onEdit, onConfirm }: {
  attempt: CollectionAttempt; onEdit: () => void; onConfirm: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  const confirmed = attempt.phase === "confirmed";
  const busy = attempt.phase === "submitting" || confirmed;
  return (
    <section aria-labelledby="collection-review-title" className={styles.card} aria-busy={attempt.phase === "submitting"}>
      <h2 id="collection-review-title" ref={heading} tabIndex={-1} className={styles.sectionTitle}>Revisão</h2>
      <p className={styles.help}>Revise a coleta antes de confirmar.</p>
      <dl className={styles.values}>
        <div><dt>Ocorrência em campo</dt><dd>{formatCollectionOccurrence(attempt.occurredAt)}</dd></div>
        <div><dt>Laboratório</dt><dd>{attempt.context.laboratory.name}</dd></div>
        <div><dt>Área</dt><dd>{attempt.context.area.name}</dd></div>
      </dl>
      <p className={styles.authorship}>Será registrada por você</p>
      <p className={styles.help}>O identificador e a confirmação serão gerados somente após sua confirmação. Depois de confirmada, a coleta não pode ser editada nem apagada neste fluxo.</p>
      {attempt.error && <p role="alert" className={styles.error}>{attempt.error}</p>}
      {attempt.recoveryPending && <p className={styles.notice} id="collection-recovery-help">
        A tentativa original foi preservada. Enquanto o resultado não for resolvido, não altere os dados nem feche esta página.
        Repetir envia a mesma chave e os mesmos dados; uma falha não confirma que nada foi salvo.
      </p>}
      {confirmed && <p role="status">Coleta confirmada. Abrindo o detalhe…</p>}
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} disabled={collectionEditingLocked(attempt)}
          aria-describedby={attempt.recoveryPending ? "collection-recovery-help" : undefined} onClick={onEdit}>Voltar e corrigir</button>
        <button type="button" className={styles.primary} disabled={busy} onClick={onConfirm}>
          {confirmed ? "Coleta confirmada" : busy ? "Confirmando…" : attempt.error ? "Tentar novamente" : "Confirmar coleta"}
        </button>
      </div>
    </section>
  );
}
