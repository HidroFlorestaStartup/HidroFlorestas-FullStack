// Executable historical-algorithm counterexample, intentionally exits 1.
import { chromium } from "@playwright/test";
import { strict as assert } from "node:assert";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const browser = await chromium.launch({ executablePath: process.env.HF_UI044_CHROMIUM });
try {
  const page = await browser.newPage();
  await page.setContent('<html style="font-size:100%"><style>*{transition:.3s}</style><body><p>Texto sintético</p></body></html>');
  await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
  await page.evaluate(async () => {
    document.documentElement.style.setProperty("font-size", "200%", "important");
    await document.fonts.ready;
    await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
  });
  const px = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  const dir = resolve(".accounts-validation/ui06-scale-red");
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "red.json"), JSON.stringify({ algorithm: "legacy-two-frames", expectedPx: 32, observedPx: px, synthetic: true, node: process.version }, null, 2));
  assert.equal(px, 32);
} finally { await browser.close(); }
