"use client";
import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import type { TerritorialArea } from "@/types/territorial-map.type";
import styles from "./territorial-map.module.css";

const ClientMap = dynamic(() => import("./territorial-map.client"), { ssr: false, loading: () => <div className={styles.mapLoading} role="status">Carregando mapa…</div> });
class MapBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="alert" className={styles.notice}>Mapa indisponível. Use a lista de áreas.</p> : this.props.children; }
}
export function TerritorialMap({ areas, selectedAreaId, onSelect }: { areas: TerritorialArea[]; selectedAreaId: string | null; onSelect: (id: string) => void }) {
  return <MapBoundary><ClientMap areas={areas} selectedAreaId={selectedAreaId} onSelect={onSelect} /></MapBoundary>;
}
