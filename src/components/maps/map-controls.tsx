"use client";

import { AttributionControl, ZoomControl } from "react-leaflet";

export function MapControls() {
  return <>
    <ZoomControl zoomInTitle="Aproximar" zoomOutTitle="Afastar" />
    <AttributionControl prefix={'<a href="https://leafletjs.com" title="Biblioteca para mapas interativos">Leaflet</a>'} />
  </>;
}

/** Preserve attribution links and names; translate only its editorial credit. */
export function mapAttributionLabel(attribution: string): string {
  return attribution.split(/(<[^>]*>)/g).map((part, index) => index % 2 ? part : part.replace(/\bcontributors\b/gi, "colaboradores")).join("");
}
