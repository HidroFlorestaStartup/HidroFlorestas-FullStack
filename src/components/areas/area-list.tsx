"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Plus, RefreshCw, Trees } from "lucide-react";
import type { LaboratoryContext } from "@/app/api/server/areas/area.authorization";
import type { AreaSummaryDto } from "@/types/area.type";
import { AreaCoverPreview } from "./area-cover";
import styles from "./areas.module.css";
export function AreaList({ laboratoryId }: { laboratoryId: string }) {
  const [data, setData] = useState<{
    context: LaboratoryContext;
    areas: AreaSummaryDto[];
  } | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/laboratories/${laboratoryId}/areas`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => ({
        ok: response.ok,
        body: await response.json(),
      }))
      .then(({ ok, body }) => {
        if (controller.signal.aborted) return;
        if (!ok) {
          setData(null);
          setError(body.error?.message ?? "Não foi possível carregar áreas.");
          return;
        }
        setData(body);
        setError("");
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setData(null);
          setError("Falha de conexão. Tente novamente.");
        }
      });
    return (
    <section className={styles.page} aria-labelledby="areas-title">
      <div className={styles.listHeader}>
        <div className={styles.pageIntro}>
          <Link
            aria-label="Voltar ao resumo"
            href={`/dashboard/laboratories/${laboratoryId}`}
            className={styles.back}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </Link>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Monitoramento ambiental</p>
            <h1 id="areas-title" className={styles.title}>Áreas Monitoradas</h1>
            <p className={styles.description}>
              Gerencie os pontos de monitoramento e consulte as informações registradas pela equipe.
            </p>
          </div>
        </div>
        {data &&
          !data.context.readOnly &&
          data.context.membershipRole !== "MEMBER" && (
            <Link className={styles.button} href={`/dashboard/laboratories/${laboratoryId}/areas/new`}>
              <Plus aria-hidden="true" size={20} /> Nova área
            </Link>
          )}
      </div>
      {error ? (
        <div role="alert" className={styles.error}>
          <p>{error}</p>
          <button
            onClick={() => {
              setError("");
              setData(null);
              setAttempt((v) => v + 1);
            }}
            className={styles.outline}
          >
            <RefreshCw size={16} aria-hidden="true" /> Tentar novamente
          </button>
        </div>
      ) : !data ? (
        <div role="status" className={styles.loading}>
          <span className={styles.spinner} aria-hidden="true"><RefreshCw size={20} /></span>
          Carregando áreas…
        </div>
      ) : (
        <>
          {data.context.readOnly && (
            <p className={styles.notice}>Laboratório inativo — somente leitura.</p>
          )}
          {data.areas.length === 0 ? (
            <div className={styles.empty}>
              <MapPin size={42} aria-hidden="true" />
              <h2 className={styles.sectionTitle}>Nenhuma área cadastrada</h2>
              <p className={styles.description}>
                Cadastre o primeiro ponto de monitoramento deste laboratório.
              </p>
            </div>
          ) : (
            <ul className={styles.areaGrid}>
              {data.areas.map((area) => (
                <li key={area.id} className={styles.card + " " + styles.areaCard}>
                  <div className={styles.cover}>
                    {area.cover?.hasImage ? (
                      <AreaCoverPreview
                        key={`${area.id}:${area.cover.revision}:${area.cover.featureEnabled}`}
                        apiPath={`/api/laboratories/${laboratoryId}/areas/${area.id}/image`}
                        name={area.name}
                        hasImage
                        revision={area.cover.revision}
                        featureEnabled={area.cover.featureEnabled}
                      />
                    ) : (
                      <div className={styles.placeholder} aria-hidden="true"><Trees size={40} /></div>
                    )}
                  </div>
                  <div className={styles.cardBody + " " + styles.areaBody}>
                    <h2 className={styles.areaName}>
                      <Link href={`/dashboard/laboratories/${laboratoryId}/areas/${area.id}`}>
                        {area.name}
                      </Link>
                    </h2>
                    <p className={styles.areaMeta}>Ponto de monitoramento</p>
                    {(area.municipality || area.state) && (
                      <p className={styles.areaMeta}>
                        {[area.municipality, area.state].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className={styles.coordinates + " " + styles.coordinateBadge}>
                      <MapPin size={16} aria-hidden="true" />
                      <span>Latitude: {area.latitude} · Longitude: {area.longitude}</span>
                    </p>
                    <p className={styles.identifier}>Identificador: {area.id}</p>
                    <Link
                      href={`/dashboard/laboratories/${laboratoryId}/areas/${area.id}`}
                      className={styles.button + " " + styles.detailsLink}
                    >
                      Ver detalhes <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}