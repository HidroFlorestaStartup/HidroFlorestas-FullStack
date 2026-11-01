import { test, expect } from "@playwright/test";
import { archive, configure, createRuntime, observeReload, platformFonts, sample, readCaseMetadata, waitForFontScale } from "./shared";
import type { EvidenceCase } from "./contract";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

test.use({ trace: "off", video: "off", screenshot: "off" });
const html = '<!doctype html><html style="font-size:100%"><head><style>*{transition:.3s;font-family:Arial}body{margin:0}header,main{padding:8px}</style></head><body><header><span>Texto real sintético</span></header><main><h1>Escala e fonte</h1><p>Instrumentação sem banco</p><button>Último controle</button></main></body></html>';
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
