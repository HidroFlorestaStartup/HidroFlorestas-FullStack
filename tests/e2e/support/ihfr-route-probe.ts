import { request, type APIRequestContext, type BrowserContext } from "@playwright/test";

type Cookies = Awaited<ReturnType<BrowserContext["cookies"]>>;
type Probe = "authentication" | "laboratories" | "area";
const knownCodes = new Set(["UNAUTHENTICATED", "NOT_FOUND", "FORBIDDEN", "READ_ONLY", "CONFLICT", "INVALID_INPUT", "INTERNAL_ERROR"]);
const object = (value: unknown): Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : {};

// Failure-only observation. Each GET has a separate disposable cookie jar so an
// expired cookie response cannot change the browser or contaminate another GET.
// Only fixed enums, statuses and booleans leave this function; never raw bodies,
// headers, credentials, names or exception messages.
export async function probeIHFRRouteContext(input: { baseURL: string; navigationURL: string; cookies: Cookies; ownedSchema: string | undefined }) {
  let base: URL, navigation: URL;
  try { base = new URL(input.baseURL); navigation = new URL(input.navigationURL); }
  catch { return { outcome: "SKIPPED_GUARD" as const }; }
  const match = /^\/dashboard\/laboratories\/([0-9a-f-]{36})\/areas\/([0-9a-f-]{36})\/collections\/(?:[0-9a-f-]{36}|new)(?:\/|$)/i.exec(navigation.pathname);
  if (!/^imp006_test_[0-9a-f]{32}$/.test(input.ownedSchema ?? "") ||
      !["http:", "https:"].includes(base.protocol) || !["127.0.0.1", "localhost", "[::1]"].includes(base.hostname) ||
      base.username || base.password || base.pathname !== "/" || base.search || base.hash ||
      navigation.origin !== base.origin || !match) return { outcome: "SKIPPED_GUARD" as const };
  const [, laboratoryId, areaId] = match;
  const cookies = input.cookies.filter(cookie => cookie.name === "auth_token");
  const targets: Array<{ probe: Probe; path: string }> = [
    { probe: "authentication", path: "/api/auth/me" },
    { probe: "laboratories", path: "/api/laboratories" },
    { probe: "area", path: `/api/laboratories/${laboratoryId}/areas/${areaId}` },
  ];
  const probes = await Promise.all(targets.map(async ({ probe, path }) => {
    let context: APIRequestContext | undefined;
    try {
      context = await request.newContext({ baseURL: base.origin, storageState: { cookies, origins: [] } });
      const response = await context.get(path, { timeout: 5_000, maxRedirects: 0, maxRetries: 0, failOnStatusCode: false });
      const contentType = response.headers()["content-type"] ?? "";
      const representation = contentType.includes("application/json") ? "json" : contentType.includes("text/html") ? "html" : "other";
      const body = representation === "json" ? object(await response.json().catch(() => null)) : {};
      const rawCode = body.code ?? object(body.error).code;
      const code = typeof rawCode === "string" ? knownCodes.has(rawCode) ? rawCode : "OTHER" : undefined;
      return {
        probe, status: response.status(), representation, code,
        ...(probe === "authentication" ? { authenticated: response.status() === 200 && body.success === true } : {}),
        ...(probe === "laboratories" ? { containsExpectedLaboratory: Array.isArray(body.laboratories) && body.laboratories.some(item => object(item).id === laboratoryId) } : {}),
        ...(probe === "area" ? { containsExpectedArea: object(body.area).id === areaId } : {}),
      };
    } catch { return { probe, unavailable: true }; }
    finally { await context?.dispose().catch(() => undefined); }
  }));
  // False means not observed in this response, not proof a resource is absent.
  return { outcome: "RECORDED" as const, sessionObservation: "CURRENT_COOKIES_AFTER_FAILURE" as const, probes };
}
