// Frozen coordinator contract for HF-UI-044-CLOSE-PARALLEL-02.
import type { BrowserContext, Page, CDPSession } from "@playwright/test";
export const COMPOSITION_BASE = "6c61056fe1dc2193e225d935f49b78cb6c6781ed";
export const STARTER_SHA = "cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f";
export const FULLSTACK_URL = "http://127.0.0.1:3001";
export const STARTER_URL = "http://127.0.0.1:4173";
export type Source = "fullstack" | "starter";
export type Execution = "PASS" | "FAIL" | "NOT_RUN";
export type Comparability = "COMPARABLE" | "NON_EQUIVALENT" | "INSUFFICIENT_EVIDENCE";
export type Requirement = "SATISFIED_TECHNICALLY" | "DEFECT_FOUND" | "HUMAN_DECISION_PENDING";
export type Completeness = "COMPLETE" | "PARTIAL" | "MISSING";
export type LayoutCase = { id: string; width: number; height: number; scale: 100 | 200; inset: 0 | 34 };
export type EvidenceCase = LayoutCase & { state: string; requirementIds: string[]; fixture: Record<string, unknown> };
export type Runtime = { source: Source; context: BrowserContext; page: Page; cdp: CDPSession;
  code: { sha: string; tree: string }; blocked: Map<string, object> };
export type CaptureOptions = { actualState?: string; reasons?: string[]; comparability?: Comparability;
  requirement?: Requirement; regions?: Record<string,string>; note?: string };
export type Sample = { png: string; json: string; pngSha256: string; jsonSha256: string;
  geometry: Record<string,unknown>; fonts: Record<string,unknown> };
// A exports configure(runtime,layout), sample(runtime,evidenceCase,options?),
// observeReload(runtime), createRuntime(browser,source), and registerCases(cases).
// sample writes durable PNG+JSON and appends cases.jsonl; registerCases persists
// every planned case as NOT_RUN before execution. B owns fixtures/login/navigation.
// A may add helpers without changing these signatures; coordinate changes explicitly.
