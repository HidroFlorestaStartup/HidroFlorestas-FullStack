import { expect, type Browser, type Page, type Locator } from "@playwright/test";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { appendFile, mkdir, writeFile, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { COMPOSITION_BASE, FULLSTACK_URL, STARTER_URL, STARTER_SHA,
  type Runtime, type Source, type LayoutCase, type EvidenceCase, type CaptureOptions, type Sample } from "./contract";

export const archive = resolve(process.env.HF_UI044_ARCHIVE ?? join(".accounts-validation", "ui06-" + (process.env.HF_UI044_SUITE ?? "shell")));
const hash = (value: Buffer | string) => createHash("sha256").update(value).digest("hex");
const planned = new Map<string, EvidenceCase>();
const outcomes = new Map<string, Record<string, unknown>>();
const identity = (cwd: string) => ({
  sha: execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim(),
  tree: execFileSync("git", ["rev-parse", "HEAD^{tree}"], { cwd, encoding: "utf8" }).trim(),
});
const safeId = (id: string) => { if (!/^[a-zA-Z0-9_-]+$/.test(id)) throw new Error("Unsafe evidence identifier"); return id; };
async function append(value: object) {
  await mkdir(archive, { recursive: true });
  await appendFile(join(archive, "cases.jsonl"), JSON.stringify(value) + "\n");
}
async function index() {
  await writeFile(join(archive, "index.json"), JSON.stringify({
    schema: "hf-ui044-close02-v1", source: identity(process.cwd()), run: process.env.GITHUB_RUN_ID ?? null,
    attempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
    cases: [...planned.values()].map(c => ({ ...c, ...(outcomes.get(c.id) ?? {
      execution: "NOT_RUN", comparability: "INSUFFICIENT_EVIDENCE", requirement: "HUMAN_DECISION_PENDING", completeness: "MISSING",
    }) })),
  }, null, 2) + "\n");
}
export async function registerCases(cases: EvidenceCase[]) {
  await mkdir(archive, { recursive: true });
  try {
    const previous = JSON.parse(await readFile(join(archive, "index.json"), "utf8"));
    if (previous.source?.sha !== identity(process.cwd()).sha || previous.run !== (process.env.GITHUB_RUN_ID ?? null)
      || previous.attempt !== (process.env.GITHUB_RUN_ATTEMPT ?? null)) throw new Error("Archive provenance mismatch");
    for (const entry of previous.cases ?? []) if (entry.execution !== "NOT_RUN") outcomes.set(entry.id, entry);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  for (const c of cases) {
    safeId(c.id);
    if (planned.has(c.id) && JSON.stringify(planned.get(c.id)) !== JSON.stringify(c)) throw new Error("Conflicting planned case");
    planned.set(c.id, c);
  }
  await index();
}
export async function recordCase(c: EvidenceCase, result: Record<string, unknown>) {
  outcomes.set(c.id, result);
  await append({ kind: "case", id: c.id, ...result });
  await index();
}
export async function finalizeCases() {
  await index();
  const failures = [...planned.keys()].filter(id => outcomes.get(id)?.execution !== "PASS" || outcomes.get(id)?.completeness !== "COMPLETE"
    || outcomes.get(id)?.comparability === "INSUFFICIENT_EVIDENCE");
  if (failures.length) throw new Error("Required UI06 cases failed or were not completed: " + failures.join(","));
}
export async function createRuntime(browser: Browser, source: Source): Promise<Runtime> {
  const code = identity(source === "fullstack" ? process.cwd() : resolve(process.env.HF_UI044_STARTER_PATH ?? "../starter"));
  if (source === "starter" && code.sha !== STARTER_SHA) throw new Error("Pinned starter SHA mismatch");
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
    timezoneId: "America/Fortaleza", locale: "pt-BR", reducedMotion: "reduce", serviceWorkers: "block" });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const runtime: Runtime = { source, code, context, page, cdp, blocked: new Map() };
  await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  await context.route("**/*", async route => {
    const url = new URL(route.request().url());
    if ([FULLSTACK_URL, STARTER_URL, "https://fonts.googleapis.com", "https://fonts.gstatic.com"].includes(url.origin)
      || ["data:", "blob:", "about:"].includes(url.protocol)) return route.continue();
    // Queries, headers, bodies and storage are never captured.
    runtime.blocked.set(url.origin, { origin: url.origin, method: route.request().method() });
    await route.abort();
  });
  return runtime;
}
async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(done => requestAnimationFrame(() => requestAnimationFrame(() => done())));
  });
}
export async function waitForFontScale(runtime: Runtime, c: LayoutCase, phase: string) {
  const expectedPx = c.scale === 200 ? 32 : 16;
  const samples: number[] = [];
  try {
    await expect.poll(async () => {
      const px = await runtime.page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
      samples.push(px); return px;
    }, { timeout: 3_000, intervals: [25, 50, 100, 150, 200] }).toBe(expectedPx);
    await settle(runtime.page);
    expect(await runtime.page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize))).toBe(expectedPx);
  } catch (error) {
    await append({ kind: "scale-diagnostic", source: runtime.source, caseId: c.id, phase, expectedPx, sampledPx: samples.slice(-20), execution: "FAIL" });
    throw error;
  }
}
export async function configure(runtime: Runtime, c: LayoutCase) {
  await runtime.page.setViewportSize({ width: c.width, height: c.height });
  await runtime.page.evaluate(scale => document.documentElement.style.setProperty("font-size", scale + "%", "important"), c.scale);
  await runtime.cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: c.inset, bottomMax: c.inset } });
  await runtime.page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    for (const id of ["application-content", "conteudo", "application-navigation"])
      document.getElementById(id)?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });
  await waitForFontScale(runtime, c, "after-configure");
}
export async function platformFonts(runtime: Runtime, selector: string) {
  const inspected = await runtime.page.evaluate(selector => {
    document.querySelectorAll("[data-hf-ui06-font]").forEach(node => node.removeAttribute("data-hf-ui06-font"));
    const region = document.querySelector(selector);
    if (!region) return { probes: [], regionExists: false, regionRect: null, regionOutsideViewport: false, visibleTextOwnerCount: 0, method: "DIRECT_VISIBLE_TEXT_OWNERS_MAX8_SCAN256" };
    const r = region.getBoundingClientRect();
    const regionRect = { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height };
    // LoadingState owns text on a DIV. A tag-name allowlist misses that real
    // TextNode even though it is visible. Inspect all HTML tags, boundedly.
    const probes = [region, ...region.querySelectorAll("*")].slice(0, 256).filter(node => {
      if (!(node instanceof HTMLElement) || ![...node.childNodes].some(child => child.nodeType === Node.TEXT_NODE && !!child.textContent?.trim())) return false;
      const style = getComputedStyle(node), box = node.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth;
    }).slice(0, 8).map((node, i) => {
      node.setAttribute("data-hf-ui06-font", String(i));
      return { selector: '[data-hf-ui06-font="' + i + '"]', tag: node.tagName, role: node.getAttribute("role") };
    });
    return { probes, regionExists: true, regionRect,
      regionOutsideViewport: r.top >= innerHeight || r.bottom <= 0 || r.left >= innerWidth || r.right <= 0,
      visibleTextOwnerCount: probes.length, method: "DIRECT_VISIBLE_TEXT_OWNERS_MAX8_SCAN256" };
  }, selector);
  const { root } = await runtime.cdp.send("DOM.getDocument");
  const elements = [];
  for (const probe of inspected.probes) {
    const { nodeId } = await runtime.cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: probe.selector });
    if (!nodeId) continue;
    const result = await runtime.cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    const fonts = result.fonts.filter(font => font.glyphCount > 0).map(({ familyName, isCustomFont, glyphCount }) => ({ familyName, isCustomFont, glyphCount }));
    if (fonts.length) elements.push({ tag: probe.tag, role: probe.role, fonts });
  }
  const diagnostics = { regionExists: inspected.regionExists, regionRect: inspected.regionRect, regionOutsideViewport: inspected.regionOutsideViewport,
    visibleTextOwnerCount: inspected.visibleTextOwnerCount, method: inspected.method };
  return { observation: elements.length ? "OBSERVED" : "UNOBSERVED", elements, diagnostics };
}
export function assessFontRegions(source: Source, sourceSha: string, c: EvidenceCase, fonts: Record<string, unknown>) {
  const regions = Object.entries(fonts) as Array<[string, Awaited<ReturnType<typeof platformFonts>>]>;
  const missing = regions.filter(([, value]) => value.observation !== "OBSERVED");
  const main = missing.find(([name]) => name === "main")?.[1];
  // This is an evidence-of-absence exception, not a successful font observation.
  // Only the pinned reference and the six R2 landscape initial states qualify;
  // both source images, exact scale, and an observed visible header remain required.
  const explainedReferenceOcclusion = source === "starter" && sourceSha === STARTER_SHA
    && c.id.startsWith("shell-") && c.width === 667 && c.height === 375 && c.scale === 200
    && ["laboratory-closed", "areas-navigation", "forward"].includes(c.state)
    && missing.length === 1 && !!main?.diagnostics.regionExists && main.diagnostics.regionOutsideViewport
    && main.diagnostics.visibleTextOwnerCount === 0 && regions.some(([name, value]) => name === "header" && value.observation === "OBSERVED");
  return { insufficient: !regions.length || missing.length > 0 && !explainedReferenceOcclusion,
    explainedReferenceOcclusion, qualification: missing.length ? "REGIONAL_FONT_UNOBSERVED" : "OBSERVED",
    reasons: explainedReferenceOcclusion ? ["REFERENCE_CONTENT_OCCLUDED"] : [],
    regionalFindings: missing.map(([region, value]) => ({ region, observation: value.observation, evidence: "INSUFFICIENT_EVIDENCE",
      explanation: explainedReferenceOcclusion ? "REFERENCE_CONTENT_OCCLUDED" : "UNEXPLAINED_REGIONAL_FONT_ABSENCE", diagnostics: value.diagnostics })) };
}
export async function readReferenceReloadState(page: Page) {
  const loading = page.getByRole("status").filter({ hasText: "Carregando laboratório…" });
  const missing = page.getByText("Recurso não encontrado", { exact: true });
  let observed = "UNOBSERVED";
  await expect.poll(async () => {
    observed = await missing.isVisible() ? "RESOURCE_NOT_FOUND" : await loading.isVisible() ? "NATIVE_LAB_LOADING" : "UNOBSERVED";
    return observed;
  }, { timeout: 3_000, intervals: [25, 50, 100, 150, 200] }).not.toBe("UNOBSERVED");
  return observed; // Do not infer a terminal outcome from native loading.
}
export async function observeFocus(target: Locator) {
  return target.evaluate(async node => {
    await new Promise<void>(done => requestAnimationFrame(() => requestAnimationFrame(() => done())));
    const box = node.getBoundingClientRect(), hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
    const rail = [...document.querySelectorAll("nav")].find(item => getComputedStyle(item).position === "fixed" && item.getBoundingClientRect().height > 0);
    const visibleArea = Math.max(0, Math.min(innerWidth, box.right) - Math.max(0, box.left)) * Math.max(0, Math.min(innerHeight, box.bottom) - Math.max(0, box.top));
    return { focused: document.activeElement === node, viewportRatio: box.width * box.height > 0 ? visibleArea / (box.width * box.height) : 0,
      centerHit: hit === node || !!hit && node.contains(hit), rect: { top: box.top, right: box.right, bottom: box.bottom, left: box.left, width: box.width, height: box.height },
      headerBottom: document.querySelector("#application-header,header")?.getBoundingClientRect().bottom ?? 0,
      railTop: rail?.getBoundingClientRect().top ?? innerHeight };
  });
}
export async function observeReload(runtime: Runtime) {
  const read = () => runtime.page.evaluate(() => ({ px: parseFloat(getComputedStyle(document.documentElement).fontSize), inlineStyle: document.documentElement.style.fontSize }));
  const before = await read();
  await runtime.page.reload({ waitUntil: "domcontentloaded" });
  const after = await read(); // Must precede configure() and any style reapplication.
  const result = { kind: "reload-scale", source: runtime.source, before, after,
    interpretation: before.inlineStyle !== after.inlineStyle ? "INLINE_INSTRUMENTATION_RESET_NOT_USER_PREFERENCE" : "INLINE_INSTRUMENTATION_UNCHANGED_NOT_USER_PREFERENCE" };
  await append(result); return result;
}
async function visibleControlMasks(page: Page) {
  return page.locator("input,textarea").evaluateAll(nodes => ({ controlsConsidered: nodes.length,
    rectangles: nodes.flatMap(node => {
      const box = node.getBoundingClientRect(), ownStyle = getComputedStyle(node);
      let left = Math.max(0, box.left), top = Math.max(0, box.top), right = Math.min(innerWidth, box.right), bottom = Math.min(innerHeight, box.bottom);
      if (ownStyle.visibility !== "visible" || box.width <= 0 || box.height <= 0) return [];
      let ancestor: Element | null = node.parentElement;
      while (ancestor) {
        const style = getComputedStyle(ancestor), bounds = ancestor.getBoundingClientRect();
        const clipLeft = bounds.left + ancestor.clientLeft, clipTop = bounds.top + ancestor.clientTop;
        if (/hidden|clip|auto|scroll/.test(style.overflowX)) { left = Math.max(left, clipLeft); right = Math.min(right, clipLeft + ancestor.clientWidth); }
        if (/hidden|clip|auto|scroll/.test(style.overflowY)) { top = Math.max(top, clipTop); bottom = Math.min(bottom, clipTop + ancestor.clientHeight); }
        const root = ancestor.getRootNode();
        ancestor = ancestor.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
      }
      return right > left && bottom > top ? [{ left, top, width: right - left, height: bottom - top }] : [];
    }),
  }));
}
export async function sample(runtime: Runtime, c: EvidenceCase, options: CaptureOptions = {}): Promise<Sample> {
  await waitForFontScale(runtime, c, "before-sample:" + c.state);
  const regions = options.regions ?? { header: runtime.source === "fullstack" ? "#application-header" : "header", main: runtime.source === "fullstack" ? "#application-content" : "#conteudo" };
  const fonts: Record<string, Awaited<ReturnType<typeof platformFonts>>> = {};
  for (const [region, selector] of Object.entries(regions)) fonts[region] = await platformFonts(runtime, selector);
  const geometry = await runtime.page.evaluate(() => {
    const rect = (node: Element | null) => { if (!node) return null; const r = node.getBoundingClientRect(); return { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height }; };
    const focus = document.activeElement, box = focus?.getBoundingClientRect();
    const hit = box && box.width > 0 && box.height > 0 ? document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2) : null;
    const rail = [...document.querySelectorAll("nav")].find(node => getComputedStyle(node).position === "fixed" && node.getBoundingClientRect().height > 0);
    return { width: innerWidth, height: innerHeight, devicePixelRatio, rootFontPx: parseFloat(getComputedStyle(document.documentElement).fontSize),
      overflow: document.documentElement.scrollWidth > innerWidth, focus: { tag: focus?.tagName ?? null, rect: rect(focus), centerHit: !!focus && !!hit && (focus === hit || focus.contains(hit)) },
      header: rect(document.querySelector("#application-header,header")), main: rect(document.querySelector("#application-content,#conteudo,main")), rail: rect(rail ?? null) };
  });
  // Playwright masks an element's full box even outside an overflow scrollport.
  // Mask only its painted rectangle, retaining every visible sensitive pixel and
  // avoiding a magenta rectangle over unrelated fixed navigation below it.
  const masking = await visibleControlMasks(runtime.page);
  const maskOwner = safeId(c.id);
  await runtime.page.evaluate(({ rectangles, owner }) => {
    for (const rect of rectangles) {
      const overlay = document.createElement("div");
      overlay.setAttribute("data-hf-ui06-mask-owner", owner); overlay.setAttribute("aria-hidden", "true");
      Object.assign(overlay.style, { position: "fixed", left: rect.left + "px", top: rect.top + "px", width: rect.width + "px", height: rect.height + "px",
        pointerEvents: "none", zIndex: "2147483647", transition: "none" });
      document.body.appendChild(overlay);
    }
  }, { rectangles: masking.rectangles, owner: maskOwner });
  const masks = await runtime.page.locator('[data-hf-ui06-mask-owner="' + maskOwner + '"]').all();
  let png: Buffer;
  try { png = await runtime.page.screenshot({ fullPage: false, animations: "disabled", mask: masks }); }
  finally { await runtime.page.locator('[data-hf-ui06-mask-owner="' + maskOwner + '"]').evaluateAll(nodes => nodes.forEach(node => node.remove())); }
  expect(png.readUInt32BE(16)).toBe(c.width); expect(png.readUInt32BE(20)).toBe(c.height);
  const stem = runtime.source + "-" + safeId(c.id);
  const fontEvidence = assessFontRegions(runtime.source, runtime.code.sha, c, fonts);
  const metadata = { schema: "hf-ui044-close02-v1", caseId: c.id, source: runtime.source, ...runtime.code,
    compositionBase: COMPOSITION_BASE, run: process.env.GITHUB_RUN_ID ?? null, attempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
    state: c.state, actualState: options.actualState ?? c.state, requirementIds: c.requirementIds, fixture: c.fixture,
    runtimeOrigin: c.fixture.database === false ? "SYNTHETIC_SMOKE_NOT_PRODUCT" : "REAL_APPLICATION_RUNTIME",
    viewport: { width: c.width, height: c.height }, textScale: c.scale, safeAreaBottom: c.inset, fullPage: false, maskedInputs: masks.length, maskPolicy: "VISIBLE_CONTROLS_CLIPPED_TO_VIEWPORT_AND_SCROLLPORT", masking,
    geometry, fontsActuallyRendered: fonts, pngSha256: hash(png), blockedRequests: [...runtime.blocked.values()],
    routeClass: c.state, // Deliberately omit actual resource IDs and URL queries.
    execution: "PASS", comparability: fontEvidence.insufficient ? "INSUFFICIENT_EVIDENCE" : fontEvidence.explainedReferenceOcclusion ? "NON_EQUIVALENT" : options.comparability ?? "COMPARABLE",
    requirement: options.requirement ?? "HUMAN_DECISION_PENDING", completeness: "COMPLETE", fontEvidence, reasons: [...(options.reasons ?? []), ...fontEvidence.reasons], note: options.note ?? null };
  const json = Buffer.from(JSON.stringify(metadata, null, 2) + "\n");
  await mkdir(archive, { recursive: true });
  await writeFile(join(archive, stem + ".png"), png, { flag: "wx" });
  await writeFile(join(archive, stem + ".json"), json, { flag: "wx" });
  const result = { png: stem + ".png", json: stem + ".json", pngSha256: hash(png), jsonSha256: hash(json), geometry, fonts };
  await append({ kind: "sample", id: c.id, ...metadata, files: result });
  return result;
}
export async function capturePair(runtimes: Runtime[], c: EvidenceCase, options: CaptureOptions = {}) {
  const samples: Sample[] = [], errors: string[] = [];
  for (const runtime of runtimes) {
    try { samples.push(await sample(runtime, c, options)); }
    catch { errors.push(runtime.source + "_CAPTURE_FAILED"); }
  }
  const incomplete = samples.length !== 2;
  const metadata = await Promise.all(samples.map(sample => readCaseMetadata(sample.json)));
  const unobserved = metadata.some(item => item.comparability === "INSUFFICIENT_EVIDENCE");
  const nonEquivalent = metadata.some(item => item.comparability === "NON_EQUIVALENT");
  const result = { execution: incomplete || errors.length ? "FAIL" : "PASS", comparability: incomplete || unobserved ? "INSUFFICIENT_EVIDENCE" : nonEquivalent ? "NON_EQUIVALENT" : options.comparability ?? "COMPARABLE",
    requirement: options.requirement ?? "HUMAN_DECISION_PENDING", completeness: incomplete ? "PARTIAL" : "COMPLETE", reasons: [...new Set([...(options.reasons ?? []), ...metadata.flatMap(item => item.reasons ?? [])]), ...(incomplete ? ["BILATERAL_PAIR_INCOMPLETE"] : [])], errors, samples };
  await recordCase(c, result); return result;
}
export async function readCaseMetadata(name: string) { return JSON.parse(await readFile(join(archive, name), "utf8")); }

export async function recordLifecycle(caseId: string, phase: "setup" | "execution" | "cleanup", status: "STARTED" | "PASS" | "FAIL", stage: string, error?: unknown) {
  await append({ kind: "lifecycle", caseId: safeId(caseId), phase, status, stage,
    errorClass: error instanceof Error ? error.name.replace(/[^a-z0-9_-]/gi, "").slice(0, 40) : error === undefined ? null : "UnknownError" });
}
/** A timed-out browser can make API cleanup fail. Preserve both diagnostics and
 * rethrow the original operation failure instead of replacing it in finally. */
export async function withLayoutCleanup(caseId: string, operation: () => Promise<void>, cleanup: () => Promise<void>) {
  let primary: unknown, cleanupFailure: unknown, diagnosticFailure: unknown;
  let primaryFailed = false, cleanupFailed = false;
  const record = async (phase: "execution" | "cleanup", status: "PASS" | "FAIL", error?: unknown) => {
    try { await recordLifecycle(caseId, phase, status, phase === "execution" ? "primary-operation" : "owned-cleanup", error); }
    catch (failure) { diagnosticFailure = failure; }
  };
  try { await operation(); }
  catch (error) { primary = error; primaryFailed = true; await record("execution", "FAIL", error); }
  try { await cleanup(); await record("cleanup", "PASS"); }
  catch (error) { cleanupFailure = error; cleanupFailed = true; await record("cleanup", "FAIL", error); }
  if (primaryFailed) throw primary;
  if (cleanupFailed) throw cleanupFailure;
  if (diagnosticFailure) throw diagnosticFailure;
}
