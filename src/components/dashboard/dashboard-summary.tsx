"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ClipboardCheck, MapPinned, RefreshCw } from "lucide-react";
import type { DashboardSummary as Summary } from "@/types/dashboard.type";
import styles from "./dashboard.module.css";

export function DashboardSummary({ laboratoryId }: { laboratoryId: string }) {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async (signal: AbortSignal) => {
    setData(null);
    setError(null);
    try {
      const response = await fetch("/api/laboratories/" + laboratoryId + "/dashboard/summary", {
        cache: "no-store",
        signal,
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error?.message ?? "Não foi possível carregar o resumo.");
      if (!signal.aborted) setData(body);
    } catch (cause) {
      if (!signal.aborted) {
        setError(cause instanceof Error ? cause.message : "Não foi possível carregar o resumo.");
      }
    }
  }, [laboratoryId]);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, attempt]);

  if (error) {
    return (
      <section aria-labelledby="summary-title" className={styles.errorState}>
        <h2 id="summary-title" className={styles.sectionTitle}>Resumo indisponível</h2>
        <p role="alert">{error}</p>
        <button onClick={() => setAttempt(value => value + 1)} className={styles.outline}>
          Tentar novamente
        </button>
      </section>
    );
  }

  if (!data) {
    return (
      <section role="status" aria-label="Carregando resumo" className={styles.loading}>
        <span className={styles.spinner} aria-hidden="true"><RefreshCw size={20} /></span>
        Carregando resumo…
      </section>
    );
  }

  return (
    <section aria-labelledby="summary-title" className={styles.summary}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Visão geral</p>
        <h1 id="summary-title" className={styles.title}>{data.context.name}</h1>
        <p className={styles.description}>Áreas e coletas confirmadas do laboratório selecionado.</p>
      </div>
      {data.context.readOnly && (
        <p className={styles.notice}>Laboratório inativo — somente leitura.</p>
      )}
      <div className={styles.stats}>
        <Link href={data.links.areas} className={styles.statCard + " " + styles.statLink}>
          <span className={styles.statContent}>
            <MapPinned className={styles.statIcon} aria-hidden="true" />
            <span className={styles.statText}>
              <span className={styles.statValue}>{data.totals.areas}</span>
              <span className={styles.statLabel}>Áreas autorizadas</span>
            </span>
          </span>
          <span className={styles.statAction}>Ver áreas <ArrowRight size={18} aria-hidden="true" /></span>
          <span className={styles.statBar} aria-hidden="true" />
        </Link>
        <div className={styles.statCard + " " + styles.statBlue}>
          <div className={styles.statContent}>
            <ClipboardCheck className={styles.statIcon} aria-hidden="true" />
            <div className={styles.statText}>
              <span className={styles.statValue}>{data.totals.confirmedCollections}</span>
              <span className={styles.statLabel}>Coletas confirmadas</span>
            </div>
          </div>
          <p className={styles.statDescription}>Registros confirmados nas áreas deste laboratório.</p>
          <span className={styles.statBar} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}