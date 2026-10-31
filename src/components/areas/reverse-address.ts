export type ReverseAddress = { municipality: string | null; state: string | null; cep: string | null };

const UF_BY_NAME: Readonly<Record<string, string>> = {
  acre: "AC", alagoas: "AL", amapa: "AP", amazonas: "AM", bahia: "BA",
  ceara: "CE", "distrito federal": "DF", "espirito santo": "ES",
  goias: "GO", maranhao: "MA", "mato grosso": "MT", "mato grosso do sul": "MS",
  "minas gerais": "MG", para: "PA", paraiba: "PB", parana: "PR",
  pernambuco: "PE", piaui: "PI", "rio de janeiro": "RJ", "rio grande do norte": "RN",
  "rio grande do sul": "RS", rondonia: "RO", roraima: "RR",
  "santa catarina": "SC", "sao paulo": "SP", sergipe: "SE", tocantins: "TO",
};
const VALID_UFS = new Set(Object.values(UF_BY_NAME));

export function coordinateValue(raw: string, max: number): number | null {
  if (!raw.trim() || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw.trim())) return null;
  const value = Number(raw);
  return Number.isFinite(value) && Math.abs(value) <= max ? value : null;
}
function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : {};
}
function text(value: unknown, limit: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/\s+/g, " ");
  return cleaned && cleaned.length <= limit ? cleaned : null;
}
function uf(value: unknown): string | null {
  const raw = text(value, 100);
  if (!raw) return null;
  const name = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const abbreviation = raw.toUpperCase();
  return VALID_UFS.has(abbreviation) ? abbreviation : UF_BY_NAME[name] ?? null;
}
function cep(value: unknown): string | null {
  const raw = text(value, 9);
  if (!raw || !/^\d{5}-?\d{3}$/.test(raw)) return null;
  const digits = raw.replace("-", "");
  return digits.slice(0, 5) + "-" + digits.slice(5);
}
export function normalizeReverseAddress(payload: unknown): ReverseAddress {
  const root = object(payload);
  const address = object(root.address);
  // Accept our normalized adapter's fields and the common reverse-geocoder
  // "address" shape; never infer a missing field from unrelated geography.
  return {
    municipality: text(root.municipality, 100)
      ?? text(address.city, 100) ?? text(address.town, 100)
      ?? text(address.municipality, 100) ?? text(address.village, 100),
    state: uf(root.state) ?? uf(address["ISO3166-2-lvl4"] && String(address["ISO3166-2-lvl4"]).split("-").at(-1))
      ?? uf(address.state),
    cep: cep(root.cep) ?? cep(address.postcode),
  };
}
export async function lookupReverseAddress(
  latitude: number, longitude: number, signal: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<ReverseAddress> {
  const query = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude) });
  const response = await fetcher("/api/geocoding/reverse?" + query, {
    method: "GET", signal, cache: "no-store", headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Geocoding unavailable");
  return normalizeReverseAddress(await response.json());
}
