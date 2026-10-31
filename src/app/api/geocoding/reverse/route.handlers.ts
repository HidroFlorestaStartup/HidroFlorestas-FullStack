import { coordinateValue, normalizeReverseAddress } from "@/components/areas/reverse-address";

type Deps = {
  authorize: () => Promise<unknown>;
  endpoint: () => string | undefined;
  fetcher: typeof fetch;
  timeoutMs?: number; // injection for deterministic timeout test; production default remains 5 seconds
};
const noStore = { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8" };
const json = (data: unknown, status: number) =>
  new Response(JSON.stringify(data), { status, headers: noStore });

export function createReverseGeocodingHandler(deps: Deps) {
  return async function GET(request: Request): Promise<Response> {
    try {
      await deps.authorize();
    } catch {
      return json({ error: "UNAUTHORIZED" }, 401);
    }
    const query = new URL(request.url).searchParams;
    const latitude = coordinateValue(query.get("latitude") ?? "", 90);
    const longitude = coordinateValue(query.get("longitude") ?? "", 180);
    if (latitude === null || longitude === null) return json({ error: "INVALID_COORDINATES" }, 400);
    // Provider-neutral integration point: intentionally disabled until the operator
    // approves the provider, terms, attribution, privacy and aggregate rate limits.
    const configured = deps.endpoint();
    if (!configured) return json({ error: "GEOCODING_UNCONFIGURED" }, 503);
    let endpoint: URL;
    try {
      endpoint = new URL(configured);
      const host = endpoint.hostname.toLowerCase();
      if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password
        || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")
        || /^\d+\.\d+\.\d+\.\d+$/.test(host) || host.startsWith("["))
        throw new Error("Invalid configured provider");
    } catch {
      return json({ error: "GEOCODING_UNCONFIGURED" }, 503);
    }
    endpoint.searchParams.set("lat", String(latitude));
    endpoint.searchParams.set("lon", String(longitude));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), deps.timeoutMs ?? 5000);
    try {
      const response = await deps.fetcher(endpoint.toString(), {
        method: "GET", headers: { Accept: "application/json" },
        cache: "no-store", signal: controller.signal, redirect: "error",
      });
      if (!response.ok) return json({ error: "GEOCODING_UNAVAILABLE" }, 503);
      const address = normalizeReverseAddress(await response.json());
      return json({ address }, 200);
    } catch {
      return json({ error: "GEOCODING_UNAVAILABLE" }, 503);
    } finally {
      clearTimeout(timeout);
    }
  };
}

