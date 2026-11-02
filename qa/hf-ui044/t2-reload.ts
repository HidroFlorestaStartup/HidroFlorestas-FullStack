import type { Page } from "@playwright/test";

export type ReloadState = "INITIAL_LOADING" | "RESOURCE_NOT_FOUND" | "AUTH_REDIRECT" |
  "OTHER_TERMINAL_STATE" | "NON_TERMINAL_TIMEOUT" | "UNOBSERVED";
export type ReloadTransition = { elapsedMs: number; state: ReloadState; rootFontPx: number; path: string };
export type ReloadObservation = { state: ReloadState; elapsedMs: number; timeoutMs: number; transitions: ReloadTransition[] };

// Pinned adapter slow read1600ms, four React Query attempts with1s+2s+4s
// retry backoff, session read1600ms and2s hydration margin =17000ms.
// This stays inside the existing40s owned-source budget. It never re-seeds data.
export const STARTER_RELOAD_TERMINAL_BUDGET_MS = 17_000;

/** Observe the reference's real DOM until a terminal state or the bounded deadline. */
export async function observeStarterReloadTerminal(page: Page,
  timeoutMs = STARTER_RELOAD_TERMINAL_BUDGET_MS): Promise<ReloadObservation> {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0 || timeoutMs > STARTER_RELOAD_TERMINAL_BUDGET_MS)
    throw new Error("INVALID_REFERENCE_RELOAD_BUDGET");
  return page.evaluate(async ({ timeoutMs }) => {
    const started = performance.now();
    const transitions: ReloadTransition[] = [];
    const visible = (node: Element) => {
      const box = node.getBoundingClientRect(), style = getComputedStyle(node);
      return box.width > 0 && box.height > 0 && style.display !== "none" && style.visibility === "visible";
    };
    const read = (): ReloadState => {
      if (/^\/login\/?$/.test(location.pathname)) return "AUTH_REDIRECT";
      if (/^\/workspace\/?$/.test(location.pathname)) return "OTHER_TERMINAL_STATE";
      const status = [...document.querySelectorAll('[role="status"]')].filter(visible);
      const missing = status.some(node => [...node.querySelectorAll("p")].some(p => visible(p) && p.innerText.trim() === "Recurso não encontrado"));
      const loading = status.some(node => node.textContent?.includes("Carregando laboratório"));
      const alert = [...document.querySelectorAll('[role="alert"]')].some(visible);
      if (alert || missing && loading) return "OTHER_TERMINAL_STATE";
      if (missing) return "RESOURCE_NOT_FOUND";
      if (loading) return "INITIAL_LOADING";
      return "UNOBSERVED";
    };
    return new Promise<ReloadObservation>(resolve => {
      let done = false;
      const record = () => {
        const state = read();
        if (transitions.at(-1)?.state !== state) transitions.push({ elapsedMs: Math.round(performance.now() - started), state,
          rootFontPx: parseFloat(getComputedStyle(document.documentElement).fontSize), path: location.pathname });
        return state;
      };
      const finish = (state: ReloadState) => {
        if (done) return;
        done = true; observer.disconnect(); clearTimeout(timer);
        removeEventListener("popstate", changed);
        resolve({ state, elapsedMs: Math.round(performance.now() - started), timeoutMs, transitions });
      };
      const changed = () => {
        const state = record();
        if (state === "RESOURCE_NOT_FOUND" || state === "AUTH_REDIRECT" || state === "OTHER_TERMINAL_STATE") finish(state);
      };
      const observer = new MutationObserver(changed);
      observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
      addEventListener("popstate", changed);
      const timer = setTimeout(() => {
        const state = record();
        finish(state === "INITIAL_LOADING" ? "NON_TERMINAL_TIMEOUT" : state);
      }, timeoutMs);
      changed();
    });
  }, { timeoutMs });
}
