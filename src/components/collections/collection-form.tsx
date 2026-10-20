"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import {
  beginCollectionSubmission, completeCollectionSubmission, createCollectionAttempt,
  editCollectionAttempt, failCollectionSubmission, reviewCollectionAttempt,
  updateCollectionLocalOccurrence,
} from "./collection-form-state";
import { collectionSubmissionFailure, readCollectionConfirmation } from "./collection-submission";
import { CollectionReview } from "./collection-review";
import type { CollectionContext } from "@/types/collection.type";
import styles from "./collections.module.css";

// The server must not initialize device-local time using its own zone.
const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function CollectionForm({ context }: { context: CollectionContext }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  return hydrated ? <DeviceCollectionForm context={context} /> : <p role="status">Preparando formulário de coleta…</p>;
}

function DeviceCollectionForm({ context }: { context: CollectionContext }) {
  const router = useRouter();
  const [attempt, setAttempt] = useState(() => createCollectionAttempt(context));
  const inFlight = useRef(false);
  const areaPath = `/dashboard/laboratories/${context.laboratory.id}/areas/${context.area.id}`;
  const confirm = async () => {
    if (inFlight.current || attempt.phase !== "reviewing" || context.readOnly) return;
    inFlight.current = true;
    const next = beginCollectionSubmission(attempt);
    setAttempt(next);
    let id: string;
    try {
      const snapshot = next.submission;
      if (!snapshot) throw new Error("SUBMISSION_REQUIRED");
      const response = await fetch(snapshot.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": snapshot.idempotencyKey },
        body: snapshot.body,
      });
      id = await readCollectionConfirmation(response, snapshot.apiPath);
    } catch (error) {
      const failure = collectionSubmissionFailure(error);
      setAttempt((current) => failCollectionSubmission(current, failure.message, failure.kind));
      inFlight.current = false;
      return;
    }
    // Keep the synchronous gate closed after success until navigation unmounts this form.
    setAttempt((current) => completeCollectionSubmission(current));
    router.push(`${areaPath}/collections/${id}`);
  };

  return (
    <section aria-labelledby="collection-title" className={styles.page}>
      <header className={styles.header}>
        {!attempt.recoveryPending && attempt.phase === "editing" && (
          <Link href={areaPath} className={styles.back}><ArrowLeft size={18} aria-hidden="true" />Voltar à área</Link>
        )}
        <h1 id="collection-title" className={styles.title}>Registrar coleta</h1>
        <p className={styles.subtitle}>Confira a ocorrência em campo. As medições ambientais são registradas separadamente.</p>
      </header>
      {context.readOnly ? (
        <p className={styles.notice}>Laboratório inativo — somente leitura. Não é possível registrar uma coleta.</p>
      ) : <>
        <dl className={`${styles.card} ${styles.context}`}>
          <div><dt>Laboratório</dt><dd>{context.laboratory.name}</dd></div>
          <div><dt>Área</dt><dd>{context.area.name}</dd></div>
        </dl>
        {attempt.phase === "editing" ? (
          <form className={styles.card} onSubmit={(event) => {
            event.preventDefault();
            setAttempt((current) => reviewCollectionAttempt(current));
          }}>
            <h2 className={styles.sectionTitle}><CalendarDays size={20} aria-hidden="true" />Ocorrência em campo</h2>
            <p className={styles.help}>A autoria é registrada pelo sistema. A revisão ainda não salva a coleta.</p>
            <div className={styles.field}>
              <label htmlFor="occurredAt">Data e hora da coleta</label>
              <input id="occurredAt" type="datetime-local" step="0.001" required
                aria-describedby={`occurredAt-help${attempt.error ? " occurredAt-error" : ""}`}
                aria-invalid={attempt.error ? true : undefined} className={styles.control}
                value={attempt.localOccurredAt}
                onChange={(event) => setAttempt((current) => updateCollectionLocalOccurrence(current, event.target.value))} />
            </div>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="collection-time-zone">Fuso da coleta</label>
                <select id="collection-time-zone" className={styles.control}
                  value={attempt.useDeviceTimeZone ? "device" : "manual"}
                  onChange={(event) => setAttempt((current) => updateCollectionLocalOccurrence(current, current.localOccurredAt, current.occurrenceOffset, event.target.value === "device"))}>
                  <option value="device">Fuso do dispositivo</option>
                  <option value="manual">Fuso UTC manual</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="collection-offset">Offset UTC</label>
                <input id="collection-offset" className={styles.control} value={attempt.occurrenceOffset}
                  readOnly={attempt.useDeviceTimeZone} required aria-describedby="occurredAt-help"
                  placeholder="-03:00" pattern="[+-][0-9]{2}:[0-9]{2}"
                  onChange={(event) => setAttempt((current) => updateCollectionLocalOccurrence(current, current.localOccurredAt, event.target.value, false))} />
              </div>
            </div>
            <p id="occurredAt-help" className={styles.help}>
              Sugestão inicial: agora no dispositivo. Segundos e milissegundos são preservados.
              O offset acompanha a data no fuso do dispositivo. Para outro fuso ou horário repetido,
              selecione Fuso UTC manual (ex.: -03:00). Confira o horário e o fuso na revisão.
            </p>
            {attempt.error && <p id="occurredAt-error" role="alert" className={styles.error}>{attempt.error}</p>}
            <div className={styles.actions}><button type="submit" className={styles.primary}>Revisar coleta</button></div>
          </form>
        ) : <CollectionReview attempt={attempt} onEdit={() => {
          setAttempt((current) => editCollectionAttempt(current));
          requestAnimationFrame(() => document.getElementById("occurredAt")?.focus());
        }} onConfirm={confirm} />}
      </>}
    </section>
  );
}
