import { createHash } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Page, TestInfo } from "@playwright/test";

export async function captureAdministrationViewport(page: Page, info: TestInfo, name: string, textScale = 100) {
  if (!/^frontend-user-administration-[a-z0-9-]+$/.test(name)) throw new Error("UNSAFE_EVIDENCE_NAME");
  const screenshotPath = info.outputPath(`${name}.png`);
  const metadataPath = info.outputPath(`${name}-viewport.json`);
  await page.screenshot({ path: screenshotPath, fullPage: false, animations: "allow", mask: [page.locator("input,textarea,select")] });
  const geometry = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, scrollX, scrollY, documentWidth: document.documentElement.scrollWidth, rootFontSizePx: parseFloat(getComputedStyle(document.documentElement).fontSize), activeTag: document.activeElement?.tagName ?? null }));
  const scenarioId = createHash("sha256").update(`${info.project.name}:${info.testId}`).digest("hex").slice(0, 12);
  await writeFile(metadataPath, JSON.stringify({ ...geometry, textScale, physicalDevice: false, fullPage: false, animations: "allow", head: process.env.GITHUB_SHA ?? "local-working-tree", scenarioId, evidenceKind: "application-viewport", note: "Chromium emulation; synthetic accounts only; form controls masked; not human accessibility acceptance." }, null, 2));
  const archive = join(process.cwd(), ".accounts-validation", "frontend-user-administration");
  const prefix = `${scenarioId}-r${info.retry}-n${info.repeatEachIndex}`;
  await mkdir(archive, { recursive: true });
  await copyFile(screenshotPath, join(archive, `${prefix}-${name}.png`));
  await copyFile(metadataPath, join(archive, `${prefix}-${name}-viewport.json`));
}
