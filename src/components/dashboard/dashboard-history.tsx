"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ClipboardCheck, MapPinned, RefreshCw } from "lucide-react";
import type { DashboardHistoryPage } from "@/types/dashboard.type";
import styles from "./dashboard.module.css";

const eventDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" });

export function DashboardHistory({ laboratoryId }: { laboratoryId: string }) {
  const [data, setData] = useState<DashboardHistoryPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stack, setStack] = useState<(string | null)[]>([null]);
  const [index, setIndex] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const cursor = stack[index];

  const load = useCallback(async (signal: AbortSignal) => {
    setData(null);
    setError(null);
    try {
      const query = cursor ? "?cursor=" + encodeURIComponent(cursor) : "";
      const response = await fetch("/api/laboratories/" + laboratoryId + "/dashboard/history" + query, {
        cache: "no-store",
        signal,
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error?.message ?? "Não foi possível carregar o histórico.");
      if (!signal.aborted) setData(body);
    } catch (cause) {
      if (!signal.aborted) {
        setError(cause instanceof Error ? cause.message : "Não foi possível carregar o histórico.");
      }
    }
  }, [cursor, laboratoryId]);

  useEffect(() => {
    setStack([null]);
    setIndex(0);
  }, [laboratoryId]);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, attempt]);

  if (error) {
    return (
      <section aria-labelledby="history-title" className={styles.errorState}>
        <h2 id="history-title" className={styles.sectionTitle}>Histórico indisponível</h2>
        <p role="alert">{error}</p>
        <button onClick={() => setAttempt(value => value + 1)} className={styles.outline}>
          Tentar novamente
        </button>
      </section>
    );
  }

  if (!data) {
    return (
      <section role="status" aria-label="Carregando histórico" className={styles.loading}>
        <span className={styles.spinner} aria-hidden="true"><RefreshCw size={20} /></span>
        Carregando histórico…
      </section>
    );
  }

  return (
    <section aria-labelledby="history-title" className={styles.history}>
      <div className={styles.historyHeader}>
        <div className={styles.heading}>
          <p className={styles.eyebrow + " " + styles.water}>Registros reais</p>
          <h2 id="history-title" className={styles.sectionTitle}>Histórico</h2>
          <p className={styles.description}>Áreas criadas e coletas confirmadas, das mais recentes às mais antigas.</p>
        </div>
        <button
          onClick={() => {
            setStack([null]);
            setIndex(0);
            setAttempt(value => value + 1);
          }}
          className={styles.outline + " " + styles.refresh}
          aria-label="Atualizar histórico"
        >
          <RefreshCw size={18} aria-hidden="true" />
        </button>
      </div>
      {data.items.length === 0 ? (
        <p className={styles.empty}>Nenhuma atividade elegível neste laboratório.</p>
      ) : (
        <ol className={styles.historyList}>
          {data.items.map(item => (
            <li key={item.id}>
              <Link href={item.destination} className={styles.historyLink}>
                <span
                  className={styles.eventIcon + " " + (item.type === "AREA_CREATED" ? styles.eventArea : styles.eventCollection)}
                  aria-hidden="true"
                >
                  {item.type === "AREA_CREATED" ? <MapPinned size={20} /> : <ClipboardCheck size={20} />}
                </span>
                <span className={styles.eventBody}>
                  <span className={styles.eventLabel}>{item.label}</span>
                  <span className={styles.eventAreaName}>{item.area.name}</span>
                  <time dateTime={item.eventAt} className={styles.eventTime}>
                    {eventDate.format(new Date(item.eventAt))}
                  </time>
                </span>
                <span className={styles.destination}>{item.type === "AREA_CREATED" ? "Ver área" : "Ver coleta"}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
      <nav aria-label="Paginação do histórico" className={styles.pagination}>
        <button
          disabled={index === 0}
          onClick={() => setIndex(value => value - 1)}
          className={styles.outline}
        >
          <ChevronLeft size={18} aria-hidden="true" /><span>Mais recentes</span>
        </button>
        <button
          disabled={!data.page.nextCursor}
          onClick={() => {
            if (!data.page.nextCursor) return;
            setStack(current => [...current.slice(0, index + 1), data.page.nextCursor]);
            setIndex(value => value + 1);
          }}
          className={styles.button}
        >
          <span>Mais antigos</span><ChevronRight size={18} aria-hidden="true" />
        </button>
      </nav>
    </section>
  );
}