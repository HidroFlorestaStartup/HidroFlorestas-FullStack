"use client";

import { formatCollectionOccurrence } from "@/lib/collection-date-time";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, List, MapPin, MapPinOff, MapPinned, RefreshCw } from "lucide-react";
import type { TerritorialArea, TerritorialMapResponse } from "@/types/territorial-map.type";
import { TerritorialMap } from "./territorial-map";
import { formatCoordinate, selectedArea } from "./territorial-map-state";
import styles from "./territorial-map.module.css";

function isResponse(value: unknown): value is TerritorialMapResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<TerritorialMapResponse>;
  return Boolean(candidate.context && Array.isArray(candidate.areas));
}

export function TerritorialMapView({ laboratoryId }: { laboratoryId: string }) {
  const [data, setData] = useState<TerritorialMapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const generation = useRef(0);
  const activeController = useRef<AbortController | null>(null);
  const load = useCallback(async () => {
    const current = ++generation.current;
    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;
    setLoading(true);
    setError(null);
    setData(null);
    setSelectedId(null);
    try {
      const response = await fetch(`/api/laboratories/${laboratoryId}/territorial-map`, {
        credentials: "include", cache: "no-store", signal: controller.signal,
      });
      const body: unknown = await response.json();
      if (current !== generation.current) return;
      if (!response.ok || !isResponse(body)) throw new Error("INVALID_RESPONSE");
      setData(body);
    } catch (caught) {
      if (current !== generation.current || (caught instanceof DOMException && caught.name === "AbortError")) return;
      setError("Não foi possível carregar a visão territorial.");
    } finally {
      if (current === generation.current) setLoading(false);
    }
  }, [laboratoryId]);
  useEffect(() => {
    void load();
    return () => {
      generation.current += 1;
      activeController.current?.abort();
    };
  }, [load]);

  const selected = selectedArea(data?.areas ?? [], selectedId);
  const available = data?.areas.filter((area) => area.location) ?? [];
  const unavailable = data?.areas.filter((area) => !area.location) ?? [];

  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <Link className={styles.back} href={`/dashboard/laboratories/${laboratoryId}`}>
          <ArrowLeft size={18} aria-hidden="true" />Voltar ao resumo
        </Link>
        <p className={styles.eyebrow}>Visão territorial</p>
        <h1 className={styles.title}>{data ? `Áreas de ${data.context.name}` : "Mapa territorial"}</h1>
        <p className={styles.description}>Consulte os pontos das áreas e acesse suas coletas confirmadas.</p>
        {data && (
          <p className={styles.context}>
            <MapPinned size={18} aria-hidden="true" />
            <span>{data.areas.length} {data.areas.length === 1 ? "área" : "áreas"} · {data.context.readOnly ? "Laboratório inativo, somente leitura" : "Laboratório ativo"}</span>
          </p>
        )}
      </header>

      {loading ? (
        <section className={styles.loading}>
          <span className={styles.spinner}><RefreshCw size={24} aria-hidden="true" /></span>
          <p role="status">Carregando visão territorial…</p>
        </section>
      ) : error || !data ? (
        <section className={styles.error}>
          <p role="alert">{error ?? "Resposta territorial inválida."}</p>
          <button type="button" onClick={() => void load()} className={styles.button}>
            <RefreshCw size={18} aria-hidden="true" />Tentar novamente
          </button>
        </section>
      ) : data.areas.length === 0 ? (
        <section className={styles.empty}>
          <MapPinned size={36} aria-hidden="true" />
          <h2 className={styles.sectionTitle}>Nenhuma área cadastrada</h2>
          <p className={styles.description}>{data.context.readOnly
            ? "Este laboratório está inativo e disponível somente para leitura."
            : "A visão territorial aparecerá quando este laboratório possuir áreas."}</p>
          {!data.context.readOnly && (
            <Link className={styles.button} href={`/dashboard/laboratories/${laboratoryId}/areas`}>Ir para áreas</Link>
          )}
        </section>
      ) : (
        <>
          <div className={styles.grid}>
            <figure className={styles.card} aria-labelledby="territorial-map-title">
              <div className={styles.cardHeader}>
                <h2 id="territorial-map-title" className={styles.sectionTitle}><MapPin size={22} aria-hidden="true" />Pontos das áreas</h2>
              </div>
              <div className={styles.mapBody}><TerritorialMap areas={data.areas} selectedAreaId={selectedId} onSelect={setSelectedId} /></div>
              <figcaption className={styles.caption}>Cada ponto representa uma área. Você também pode selecionar uma área pela lista abaixo ou ao lado do mapa.</figcaption>
            </figure>
            <section className={styles.card} aria-labelledby="area-list-title">
              <div className={styles.cardHeader}>
                <h2 id="area-list-title" className={styles.sectionTitle}><List size={22} aria-hidden="true" />Lista de áreas</h2>
                <p className={styles.description}>Selecione uma área para consultar seus detalhes e coletas. A lista permanece disponível sem a base cartográfica.</p>
              </div>
              <div className={styles.cardBody}>
                <AreaList areas={available} selectedId={selectedId} onSelect={setSelectedId} />
                {unavailable.length > 0 && (
                  <div className={styles.unlocated}>
                    <h3 className={styles.subheading}><MapPinOff size={18} aria-hidden="true" />Localização indisponível</h3>
                    <AreaList areas={unavailable} selectedId={selectedId} onSelect={setSelectedId} />
                  </div>
                )}
              </div>
            </section>
          </div>
          <p className={styles.srOnly} role="status" aria-live="polite">{selected ? `Área selecionada: ${selected.name}` : "Nenhuma área selecionada"}</p>
          {selected && <AreaPanel laboratoryId={laboratoryId} area={selected} />}
        </>
      )}
    </div>
  );
}

function AreaList({ areas, selectedId, onSelect }: {
  areas: TerritorialArea[]; selectedId: string | null; onSelect: (id: string) => void;
}) {
  return (
    <ul className={styles.areaList}>
      {areas.map((area) => (
        <li key={area.id}>
          <button type="button" onClick={() => onSelect(area.id)} aria-pressed={selectedId === area.id} aria-controls="selected-area-panel" className={styles.areaButton}>
            <span className={styles.areaLabel}>
              <span className={styles.areaName}>{area.name}</span>
              {selectedId === area.id && <Check size={18} aria-hidden="true" />}
            </span>
            <span className={styles.areaMeta}>{area.location
              ? `${formatCoordinate(area.location.latitude)}, ${formatCoordinate(area.location.longitude)}`
              : "Localização indisponível"}</span>
            <span className={styles.areaMeta}>{area.confirmedCollections.length} {area.confirmedCollections.length === 1 ? "coleta confirmada" : "coletas confirmadas"}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function AreaPanel({ laboratoryId, area }: { laboratoryId: string; area: TerritorialArea }) {
  return (
    <section id="selected-area-panel" className={styles.card} aria-labelledby="selected-area-title">
      <div className={styles.cardHeader}>
        <p className={styles.eyebrow}>Área selecionada</p>
        <h2 id="selected-area-title" className={styles.sectionTitle}>{area.name}</h2>
        <p className={styles.description}>{area.location
          ? `Coordenadas: ${formatCoordinate(area.location.latitude)}, ${formatCoordinate(area.location.longitude)}`
          : "Localização indisponível"}</p>
      </div>
      <div className={styles.panelBody}>
        <Link className={styles.button} href={`/dashboard/laboratories/${laboratoryId}/areas/${area.id}`}>
          Abrir detalhe da área<ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <div className={styles.collections}>
          <h3 className={styles.subheading}>Coletas confirmadas ({area.confirmedCollections.length})</h3>
          {area.confirmedCollections.length === 0 ? (
            <p className={styles.description}>Nenhuma coleta confirmada nesta área.</p>
          ) : (
            <ul className={styles.collectionList}>
              {area.confirmedCollections.map((collection) => (
                <li key={collection.id} className={styles.collection}>
                  <p className={styles.description}>Ocorrência: <time dateTime={collection.occurredAt}>{formatCollectionOccurrence(collection.occurredAt)}</time></p>
                  <p className={styles.description}>Confirmação: <time dateTime={collection.confirmedAt}>{new Date(collection.confirmedAt).toLocaleString("pt-BR")}</time></p>
                  <Link className={styles.textLink} href={`/dashboard/laboratories/${laboratoryId}/areas/${area.id}/collections/${collection.id}`}>
                    Abrir coleta<ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
