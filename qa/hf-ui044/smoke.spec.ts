import { test, expect } from "@playwright/test";
import { archive, configure, createRuntime, observeReload, platformFonts, sample, readCaseMetadata, waitForFontScale, capturePair } from "./shared";
import type { EvidenceCase } from "./contract";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

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
      expect(absent).toEqual({ observation: "UNOBSERVED", elements: [] });
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
