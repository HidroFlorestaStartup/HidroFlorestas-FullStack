import { createHash } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readControlGeometry, waitForMissionRender } from "./frontend-mission-evidence";

export async function settleIHFRViewport(page: Page, width: number, height: number, textScale = 100) {
  await page.setViewportSize({ width, height });
  await page.evaluate(scale => document.documentElement.style.setProperty("font-size", `${scale}%`, "important"), textScale);
  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize))).toBe(16 * textScale / 100);
  await page.evaluate(waitForMissionRender);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

export async function captureIHFRViewport(page: Page, info: TestInfo, name: string, safeAreaBottom = 0) {
  if (!/^frontend-ihfr-[a-z0-9-]+$/.test(name)) throw new Error("UNSAFE_IHFR_EVIDENCE_NAME");
  if (!/^imp006_test_[0-9a-f]{32}$/.test(process.env.IMP006_TEST_SCHEMA ?? "")) throw new Error("IHFR_EVIDENCE_REQUIRES_SYNTHETIC_FIXTURE");
  await page.evaluate(waitForMissionRender);
  const screenshotPath = info.outputPath(`${name}.png`);
  const metadataPath = info.outputPath(`${name}-viewport.json`);
  const scenarioId = createHash("sha256").update(`${info.project.name}:${info.testId}`).digest("hex").slice(0, 12);
  await page.screenshot({ path: screenshotPath, fullPage: false, animations: "allow", mask: [page.locator("input,select,textarea")] });
  const geometry = await page.evaluate(() => {
    const rect = (id: string) => {
      const element = document.getElementById(id);
      return element ? { rect: element.getBoundingClientRect().toJSON(), scrollTop: element.scrollTop, clientHeight: element.clientHeight } : null;
    };
    return {
      width: innerWidth, height: innerHeight, scrollX, scrollY,
      documentWidth: document.documentElement.scrollWidth,
      activeTag: document.activeElement?.tagName ?? null,
      rootFontSizePx: parseFloat(getComputedStyle(document.documentElement).fontSize),
      header: rect("application-header"), content: rect("application-content"), navigation: rect("application-navigation"),
    };
  });
  await writeFile(metadataPath, JSON.stringify({
    ...geometry, textScale: geometry.rootFontSizePx / 16 * 100,
    textScaleSource: "measured-root-font-relative-to-16px-fixture-baseline",
    physicalDevice: false, safeAreaBottom, safeAreaMethod: safeAreaBottom ? "Chromium CDP override" : "none",
    fullPage: false, animations: "allow", head: process.env.GITHUB_SHA ?? "local-working-tree", scenarioId,
    evidenceKind: "application-viewport", note: "Synthetic IHFR fixture; form controls masked; viewport may show one part of a long region; not manual accessibility acceptance.",
  }, null, 2));
  const archive = join(process.cwd(), ".accounts-validation", "frontend-ihfr");
  const prefix = `${scenarioId}-r${info.retry}-n${info.repeatEachIndex}`;
  await mkdir(archive, { recursive: true });
  await copyFile(screenshotPath, join(archive, `${prefix}-${name}.png`));
  await copyFile(metadataPath, join(archive, `${prefix}-${name}-viewport.json`));
}

export async function expectIHFRControl(control: Locator, page: Page, info: TestInfo, scenario: string) {
  await page.evaluate(waitForMissionRender);
  await control.evaluate(node => node.scrollIntoView({ block: "center", inline: "nearest" }));
  await expect(control).toBeVisible();
  try {
    await expect.poll(async () => (await readControlGeometry(control)).unobstructed).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  } catch (error) {
    console.error("IHFR_CONTROL_GEOMETRY", JSON.stringify(await readControlGeometry(control)));
    await captureIHFRViewport(page, info, `${scenario}-obstructed`);
    throw error;
  }
}
