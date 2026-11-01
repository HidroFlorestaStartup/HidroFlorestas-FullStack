import { test, expect } from "@playwright/test";
import { archive, configure, createRuntime, observeReload, platformFonts, sample, readCaseMetadata, waitForFontScale, capturePair, withLayoutCleanup, assessFontRegions, readReferenceReloadState, observeFocus } from "./shared";
import { STARTER_SHA, type EvidenceCase } from "./contract";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { accountMenuFixture } from "./menu-fixture";
import sharp from "sharp";

test.use({ trace: "off", video: "off", screenshot: "off" });
const html = '<!doctype html><html style="font-size:100%"><head><meta charset="utf-8"><style>*{transition:.3s;font-family:Arial}body{margin:0}header,main{padding:8px}</style></head><body><header><span>Texto real sintético</span></header><main><h1>Escala e fonte</h1><p>Instrumentação sem banco</p><button>Último controle</button></main></body></html>';
for (const width of [320, 1440]) {
  test("exact 100-200-100 scale, visible text CDP and reload readback at " + width, async ({ browser }) => {
    const runtime = await createRuntime(browser, "fullstack");
    await runtime.page.route("http://127.0.0.1:3001/synthetic", route => route.fulfill({ contentType: "text/html", body: html }));
    try {
      await runtime.page.goto("http://127.0.0.1:3001/synthetic");
      for (const scale of [100, 200, 100] as const) {
        const c: EvidenceCase = { id: "smoke-" + width + "-" + scale + (scale === 100 ? "-" + Date.now() : ""), width, height: 900,
          scale, inset: 0, state: "synthetic", requirementIds: ["FR-035-003"], fixture: { synthetic: true, database: false } };
        await configure(runtime, c);
        const result = await sample(runtime, c, { regions: { header: "header", main: "main" } });
        const metadata = await readCaseMetadata(result.json);
        expect(metadata.geometry.rootFontPx).toBe(scale === 200 ? 32 : 16);
        for (const region of Object.values(metadata.fontsActuallyRendered) as Array<{ observation: string }>) expect(region.observation).toBe("OBSERVED");
      }
      await configure(runtime, { id: "reload-" + width, width, height: 900, scale: 200, inset: 0 });
      const reload = await observeReload(runtime);
      expect(reload.before.px).toBe(32); expect(reload.after.px).toBe(16);
      expect(reload.interpretation).toBe("INLINE_INSTRUMENTATION_RESET_NOT_USER_PREFERENCE");
      const absent = await platformFonts(runtime, "#missing");
      expect(absent).toMatchObject({ observation: "UNOBSERVED", elements: [], diagnostics: { regionExists: false } });
      const c: EvidenceCase = { id: "unobserved-" + width, width, height: 900, scale: 100, inset: 0, state: "no-text-region",
        requirementIds: ["FR-035-003"], fixture: { synthetic: true, database: false } };
      const missing = await sample(runtime, c, { regions: { missing: "#missing" } });
      expect((await readCaseMetadata(missing.json)).comparability).toBe("INSUFFICIENT_EVIDENCE");
    } finally { await runtime.context.close(); }
  });
}
test("scale timeout persists sampled diagnostic and rethrows", async ({ browser }) => {
  const runtime = await createRuntime(browser, "fullstack");
  try {
    await runtime.page.setContent(html);
    await expect(waitForFontScale(runtime, { id: "expected-failure", width: 320, height: 900, scale: 200, inset: 0 }, "negative-smoke")).rejects.toThrow();
    const lines = (await readFile(join(archive, "cases.jsonl"), "utf8")).trim().split("\n").map(line => JSON.parse(line));
    expect(lines.some(line => line.kind === "scale-diagnostic" && line.caseId === "expected-failure" && line.expectedPx === 32 && line.sampledPx.includes(16))).toBe(true);
  } finally { await runtime.context.close(); }
});

for (const sourceCount of [0, 1]) {
  test("incomplete bilateral pair with " + sourceCount + " runtime is insufficient and fails", async ({ browser }) => {
    const c: EvidenceCase = { id: "incomplete-pair-" + sourceCount, width: 320, height: 900, scale: 100, inset: 0,
      state: "synthetic-incomplete-pair", requirementIds: ["FR-035-003"], fixture: { synthetic: true, database: false } };
    const runtime = sourceCount === 1 ? await createRuntime(browser, "fullstack") : undefined;
    try {
      if (runtime) {
        await runtime.page.route("http://127.0.0.1:3001/synthetic-pair", route => route.fulfill({ contentType: "text/html", body: html }));
        await runtime.page.goto("http://127.0.0.1:3001/synthetic-pair");
        await configure(runtime, c);
      }
      const result = await capturePair(runtime ? [runtime] : [], c, { regions: { header: "header", main: "main" } });
      expect(result.execution).toBe("FAIL");
      expect(result.comparability).toBe("INSUFFICIENT_EVIDENCE");
      expect(result.completeness).toBe("PARTIAL");
      expect(result.samples).toHaveLength(sourceCount);
      const lines = (await readFile(join(archive, "cases.jsonl"), "utf8")).trim().split("\n").map(line => JSON.parse(line));
      const persisted = lines.filter(line => line.kind === "case" && line.id === c.id).at(-1);
      expect(persisted.execution).toBe("FAIL");
      expect(persisted.comparability).toBe("INSUFFICIENT_EVIDENCE");
      expect(persisted.completeness).toBe("PARTIAL");
    } finally { if (runtime) await runtime.context.close(); }
  });
}

test("starter required label uses the accessible textbox name", async ({ page }) => {
  // Mirrors FieldShell at starter cbb954a7, including the aria-hidden required marker.
  await page.setContent('<!doctype html><meta charset="utf-8"><div role="dialog" aria-label="Criar Laboratório IHFR"><div><label for="lab-name">Nome do laboratório<span aria-hidden="true"> *</span></label><input id="lab-name" required></div></div>');
  const dialog = page.getByRole("dialog", { name: "Criar Laboratório IHFR", exact: true });
  const oldLabelMatches = await dialog.getByLabel("Nome do laboratório", { exact: true }).count();
  const accessibleTextboxMatches = await dialog.getByRole("textbox", { name: "Nome do laboratório", exact: true }).count();
  expect(oldLabelMatches).toBe(0);
  expect(accessibleTextboxMatches).toBe(1);
  await dialog.getByRole("textbox", { name: "Nome do laboratório", exact: true }).fill("Laboratório sintético");
  await mkdir(archive, { recursive: true });
  await writeFile(join(archive, "starter-required-label.json"), JSON.stringify({
    runtimeOrigin: "SYNTHETIC_SMOKE_NOT_PRODUCT", starterSha: "cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f",
    structure: "label[for] + span[aria-hidden] required marker + input", oldLabelMatches, accessibleTextboxMatches,
  }, null, 2) + "\n", { flag: "wx" });
  await expect(dialog.getByRole("textbox", { name: "Nome do laboratório", exact: true })).toHaveValue("Laboratório sintético");
});

for (const width of [320, 390, 1440]) for (const scale of [100, 200] as const) {
  test("real TopBar CSS account geometry " + width + " text" + scale, async ({ browser }) => {
    const fixture = await accountMenuFixture();
    const runtime = await createRuntime(browser, "fullstack");
    const c: EvidenceCase = { id: "menu-" + width + "-" + scale, width, height: 900, scale, inset: 0,
      state: "synthetic-render-real-topbar-account-open", requirementIds: ["FR-035-001", "FR-035-003"],
      fixture: { synthetic: true, database: false, presentationSources: fixture.sources, fontFixture: fixture.fontFixture } };
    try {
      await runtime.page.setContent(fixture.html);
      await configure(runtime, c);
      await runtime.page.locator("details").evaluate(node => { if (!(node instanceof HTMLDetailsElement)) throw new Error("Details element missing"); node.open = true; });
      const geometry = await runtime.page.evaluate(() => {
        const rect = (selector: string) => { const node = document.querySelector(selector); if (!node) throw new Error("Geometry target missing");
          const r = node.getBoundingClientRect(); return { top: r.top, right: r.right, bottom: r.bottom, left: r.left, width: r.width, height: r.height,
            scrollWidth: node.scrollWidth, clientWidth: node.clientWidth, position: getComputedStyle(node).position }; };
        return { rootFontPx: parseFloat(getComputedStyle(document.documentElement).fontSize), viewport: { width: innerWidth, height: innerHeight },
          actions: rect(".accountActions"), disclosure: rect(".accountDisclosure"), summary: rect("summary"), panel: rect("#application-account-menu"),
          name: rect("#application-account-menu p"), password: rect('a[href="/change-password"]'), deletion: rect('a[href="/delete-account"]') };
      });
      await mkdir(archive, { recursive: true });
      await writeFile(join(archive, c.id + "-geometry.json"), JSON.stringify({ runtimeOrigin: "SYNTHETIC_SMOKE_NOT_PRODUCT", ...geometry }, null, 2) + "\n", { flag: "wx" });
      await sample(runtime, c, { note: "Real presentation TSX/CSS server-rendered with synthetic session/native adapters; effects/auth/Next not executed; Arial fixture, observed fonts recorded." });
      for (const target of [geometry.panel, geometry.name, geometry.password, geometry.deletion]) {
        expect(target.left).toBeGreaterThanOrEqual(0); expect(target.right).toBeLessThanOrEqual(width);
        expect(target.scrollWidth).toBeLessThanOrEqual(target.clientWidth);
      }
      await expect(runtime.page.getByRole("link", { name: "Alterar senha", exact: true })).toBeInViewport({ ratio: 1 });
      await expect(runtime.page.getByRole("link", { name: "Excluir conta", exact: true })).toBeInViewport({ ratio: 1 });
    } finally { await runtime.context.close(); }
  });
}

test("cleanup diagnostics preserve the primary failure without recording its message", async () => {
  const primary = new Error("synthetic-private-operation-detail");
  const cleanup = new TypeError("synthetic-private-cleanup-detail");
  let cleanupAttempted = false;
  await expect(withLayoutCleanup("primary-cleanup-counterexample", async () => { throw primary; }, async () => {
    cleanupAttempted = true; throw cleanup;
  })).rejects.toBe(primary);
  expect(cleanupAttempted).toBe(true);
  const journal = await readFile(join(archive, "cases.jsonl"), "utf8");
  const events = journal.trim().split("\n").map(line => JSON.parse(line)).filter(line => line.kind === "lifecycle" && line.caseId === "primary-cleanup-counterexample");
  expect(events.map(event => [event.phase, event.status, event.errorClass])).toEqual([["execution", "FAIL", "Error"], ["cleanup", "FAIL", "TypeError"]]);
  expect(journal).not.toContain(primary.message); expect(journal).not.toContain(cleanup.message);
});

test("sensitive control mask clips to its scrollport and preserves navigation pixels", async ({ browser }) => {
  const runtime = await createRuntime(browser, "fullstack");
  const c: EvidenceCase = { id: "mask-scrollport", width: 320, height: 900, scale: 100, inset: 0,
    state: "synthetic-clipped-control", requirementIds: ["FR-035-003"], fixture: { synthetic: true, database: false } };
  try {
    await runtime.page.setContent('<!doctype html><meta charset="utf-8"><style>body{margin:0;font-family:Arial}header{height:40px}main{height:100px;overflow:hidden;position:relative}input{position:absolute;left:10px;top:90px;width:240px;height:40px;box-sizing:border-box}nav{position:fixed;top:140px;left:0;width:320px;height:80px;background:rgb(0,100,0)}</style><header id="application-header">Fixture sintético</header><main id="application-content"><p>Texto público</p><input type="password" value="synthetic-secret"></main><nav aria-label="Navegação sintética"></nav>');
    await configure(runtime, c);
    const result = await sample(runtime, c);
    const { data, info } = await sharp(await readFile(join(archive, result.png))).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const pixel = (x: number, y: number) => [...data.subarray((y * info.width + x) * info.channels, (y * info.width + x) * info.channels + 3)];
    const colors = { visibleSensitiveInput: pixel(20, 135), navigationBelowScrollport: pixel(20, 160) };
    await writeFile(join(archive, "mask-clipping-pixels.json"), JSON.stringify(colors, null, 2) + "\n", { flag: "wx" });
    expect(colors.visibleSensitiveInput).toEqual([255, 0, 255]);
    expect(colors.navigationBelowScrollport).toEqual([0, 100, 0]);
  } finally { await runtime.context.close(); }
});

test("loading status DIV owns observable rendered text", async ({ browser }) => {
  const runtime = await createRuntime(browser, "fullstack");
  try {
    await runtime.page.setContent('<!doctype html><meta charset="utf-8"><header id="application-header"><span>Shell</span></header><main id="application-content"><div role="status"><svg width="20" height="20" aria-hidden="true"></svg>Carregando laboratório…</div></main>');
    const fonts = await platformFonts(runtime, "#application-content");
    expect(fonts.observation).toBe("OBSERVED");
    expect(await readReferenceReloadState(runtime.page)).toBe("NATIVE_LAB_LOADING");
    expect(fonts.elements.some(element => element.tag === "DIV" && element.role === "status")).toBe(true);
  } finally { await runtime.context.close(); }
});

test("regional source occlusion preserves UNOBSERVED without approving a font", async ({ browser }) => {
  const runtime = await createRuntime(browser, "fullstack");
  const c: EvidenceCase = { id: "shell-667-375-200-0-laboratory-closed", width: 667, height: 375, scale: 200, inset: 0,
    state: "laboratory-closed", requirementIds: ["FR-035-003"], fixture: { synthetic: true, database: false } };
  try {
    await runtime.page.setContent('<!doctype html><header id="application-header"><span>Reference shell model</span></header><main id="application-content" style="position:absolute;top:459px"><p>Offscreen text model</p></main>');
    await configure(runtime, c);
    const fonts = { header: await platformFonts(runtime, "#application-header"), main: await platformFonts(runtime, "#application-content") };
    expect(fonts.header.observation).toBe("OBSERVED"); expect(fonts.main.observation).toBe("UNOBSERVED");
    expect(fonts.main.diagnostics).toMatchObject({ regionExists: true, regionOutsideViewport: true, visibleTextOwnerCount: 0 });
    // Decision-rule inputs only: this synthetic fixture is not a starter image.
    const reference = assessFontRegions("starter", STARTER_SHA, c, fonts);
    expect(reference).toMatchObject({ insufficient: false, explainedReferenceOcclusion: true, qualification: "REGIONAL_FONT_UNOBSERVED", reasons: ["REFERENCE_CONTENT_OCCLUDED"] });
    expect(reference.regionalFindings[0]).toMatchObject({ observation: "UNOBSERVED", evidence: "INSUFFICIENT_EVIDENCE" });
    expect(assessFontRegions("fullstack", runtime.code.sha, c, fonts).insufficient).toBe(true);
    expect(assessFontRegions("starter", "wrong-pin", c, fonts).insufficient).toBe(true);
    expect(assessFontRegions("starter", STARTER_SHA, { ...c, width: 390 }, fonts).insufficient).toBe(true);
    const sampleResult = await sample(runtime, { ...c, id: "font-absence-fullstack-blocked" });
    expect((await readCaseMetadata(sampleResult.json)).comparability).toBe("INSUFFICIENT_EVIDENCE");
  } finally { await runtime.context.close(); }
});
test("reload observes native loading before exact scale reapplication", async ({ browser }) => {
  const runtime = await createRuntime(browser, "fullstack");
  try {
    await runtime.page.route("http://127.0.0.1:3001/reload-loading", route => route.fulfill({ contentType: "text/html", body: '<!doctype html><meta charset="utf-8"><header id="application-header"><span>Shell</span></header><main id="application-content"><div role="status">Carregando laboratório…</div></main>' }));
    await runtime.page.goto("http://127.0.0.1:3001/reload-loading");
    const c: EvidenceCase = { id: "reload-native-loading", width: 390, height: 844, scale: 200, inset: 0, state: "synthetic-reload-loading", requirementIds: ["FR-035-003"], fixture: { synthetic: true, database: false } };
    await configure(runtime, c); const readback = await observeReload(runtime);
    expect(readback.before.px).toBe(32); expect(readback.after.px).toBe(16);
    expect(await readReferenceReloadState(runtime.page)).toBe("NATIVE_LAB_LOADING");
    expect(await runtime.page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize))).toBe(16);
    await configure(runtime, c); const result = await sample(runtime, c);
    expect((await readCaseMetadata(result.json)).geometry.rootFontPx).toBe(32);
  } finally { await runtime.context.close(); }
});
test("reference focus obstruction is measurable without claiming a product pass", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.setContent('<!doctype html><style>body{margin:0}header{position:fixed;top:0;height:290px;width:100%;background:white;z-index:2}nav{position:fixed;bottom:0;height:129px;width:100%;background:white;z-index:3}a{position:absolute;top:35px;left:349px;width:269px;height:304px}</style><header>Reference header model</header><main><a href="#target">Synthetic focus</a></main><nav>Reference navigation model</nav>');
  const target = page.getByRole("link", { name: "Synthetic focus", exact: true });
  await target.focus(); const focus = await observeFocus(target);
  expect(focus.focused).toBe(true); expect(focus.centerHit).toBe(false); expect(focus.headerBottom).toBeGreaterThan(focus.railTop);
});
