import { createHash } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { readControlGeometry, waitForMissionRender } from "./frontend-mission-evidence";

export async function expectTerritorialReflow(page: Page) {
  await page.evaluate(waitForMissionRender);
  const measurements = await page.evaluate(() => ({
    document: { width: document.documentElement.scrollWidth, viewport: innerWidth },
    containers: Array.from(document.querySelectorAll("#application-content, main")).map(node => ({
      width: node.scrollWidth, available: node.clientWidth,
    })),
  }));
  expect(measurements.document.width).toBeLessThanOrEqual(measurements.document.viewport);
  expect(measurements.containers.length).toBeGreaterThan(0);
  for (const container of measurements.containers) expect(container.width).toBeLessThanOrEqual(container.available);
}

// Observational capture: no focus, scrolling, removal of overlays or animation
// cancellation. Callers first perform the real interaction and readiness check.
export async function captureTerritorialViewport(page: Page, info: TestInfo, name: string, control?: Locator) {
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error("UNSAFE_TERRITORIAL_EVIDENCE_NAME");
  const phase = process.env.FRONTEND_TERRITORIAL_MAP_CAPTURE_PREFIX ?? "after";
  if (phase !== "before" && phase !== "after") throw new Error("INVALID_TERRITORIAL_EVIDENCE_PREFIX");
  const scenario = createHash("sha256").update(`${info.project.name}:${info.testId}`).digest("hex").slice(0, 12);
  const stem = `${scenario}-r${info.retry}-n${info.repeatEachIndex}-${phase}-frontend-territorial-map-${name}`;
  const screenshotName = `${stem}-viewport.png`;
  const metadataName = `${stem}-viewport.json`;
  const screenshotPath = info.outputPath(screenshotName);
  const metadataPath = info.outputPath(metadataName);
  await page.screenshot({
    path: screenshotPath,
    fullPage: false,
    animations: "allow",
    mask: [page.locator("input, textarea, select")],
  });
  const state = await page.evaluate(() => {
    const content = document.getElementById("application-content");
    const active = document.activeElement;
    const style = active ? getComputedStyle(active) : null;
    const fontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    return {
      viewport: { width: innerWidth, height: innerHeight },
      text: { rootFontSizePx: fontSize, percentRelativeTo16px: fontSize / 16 * 100, method: "root-font-size; not browser zoom" },
      document: { width: document.documentElement.scrollWidth, scrollX, scrollY },
      content: content ? { scrollTop: content.scrollTop, clientHeight: content.clientHeight, scrollHeight: content.scrollHeight } : null,
      focus: { tag: active?.tagName ?? null, outlineStyle: style?.outlineStyle, outlineWidth: style?.outlineWidth, outlineColor: style?.outlineColor },
    };
  });
  await writeFile(metadataPath, JSON.stringify({
    ...state,
    control: control ? await readControlGeometry(control) : null,
    screenshot: { filename: screenshotName, fullPage: false, animations: "allow", browser: info.project.name },
    head: process.env.GITHUB_SHA ?? "local-working-tree",
    evidenceKind: "application-viewport",
    physicalDevice: false,
    note: "Official synthetic fixture; form fields masked; no manual accessibility acceptance.",
  }, null, 2) + "\n");
  const archive = join(process.cwd(), ".accounts-validation", "frontend-territorial-map");
  await mkdir(archive, { recursive: true });
  await copyFile(screenshotPath, join(archive, screenshotName));
  await copyFile(metadataPath, join(archive, metadataName));
  await info.attach(screenshotName, { path: screenshotPath, contentType: "image/png" });
  await info.attach(metadataName, { path: metadataPath, contentType: "application/json" });
}

export async function expectTerritorialControl(control: Locator, page: Page, info: TestInfo, name: string) {
  await page.evaluate(waitForMissionRender);
  // A single user-equivalent reveal, after the shell's focus work settles.
  await control.evaluate(node => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
  await expect(control).toBeVisible();
  try {
    await expect.poll(async () => (await readControlGeometry(control)).unobstructed).toBe(true);
  } catch (error) {
    await captureTerritorialViewport(page, info, `${name}-obstructed`, control);
    throw error;
  }
  await expectTerritorialReflow(page);
}
