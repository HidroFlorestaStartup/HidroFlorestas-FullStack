import { createHash } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, type Locator, type Page, type TestInfo } from "@playwright/test";
import { waitForMissionRender } from "./support/frontend-mission-evidence";

export async function captureAdministrationViewport(page: Page, info: TestInfo, name: string, textScale = 100) {
  if (!/^frontend-user-administration-[a-z0-9-]+$/.test(name)) throw new Error("UNSAFE_EVIDENCE_NAME");
  const screenshotPath = info.outputPath(`${name}.png`);
  const metadataPath = info.outputPath(`${name}-viewport.json`);
  await page.screenshot({ path: screenshotPath, fullPage: false, animations: "allow", mask: [page.locator("input,textarea,select")] });
  const geometry = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, scrollX, scrollY, documentWidth: document.documentElement.scrollWidth, rootFontSizePx: parseFloat(getComputedStyle(document.documentElement).fontSize), activeTag: document.activeElement?.tagName ?? null }));
  const scenarioId = createHash("sha256").update(`${info.project.name}:${info.testId}`).digest("hex").slice(0, 12);
  await writeFile(metadataPath, JSON.stringify({ ...geometry, textScale, physicalDevice: false, fullPage: false, animations: "allow", head: process.env.GITHUB_SHA ?? "local-working-tree", scenarioId, evidenceKind: "application-viewport", note: "Chromium emulation; synthetic accounts only; input/textarea/select masking requested, but native-dialog controls may remain visible; not human accessibility acceptance." }, null, 2));
  const archive = join(process.cwd(), ".accounts-validation", "frontend-user-administration");
  const prefix = `${scenarioId}-r${info.retry}-n${info.repeatEachIndex}`;
  await mkdir(archive, { recursive: true });
  await copyFile(screenshotPath, join(archive, `${prefix}-${name}.png`));
  await copyFile(metadataPath, join(archive, `${prefix}-${name}-viewport.json`));
}

export async function expectAdministrationWordsWhole(locator: Locator) {
  await expect(locator).toBeVisible();
  await locator.evaluate(waitForMissionRender);
  const result = await locator.evaluate(async element => {
    await document.fonts.ready;
    const bounds = element.getBoundingClientRect();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const issues: Array<{ word: string; reason: string }> = [];
    let checkedWords = 0;
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent ?? "";
      const pattern = /\S+/g;
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(text))) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const rects = Array.from(range.getClientRects()).filter(rect => rect.width > 0 && rect.height > 0);
        checkedWords++;
        if (rects.length !== 1) issues.push({ word: match[0], reason: "word must occupy one line" });
        if (rects.some(rect => rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) {
          issues.push({ word: match[0], reason: "word exceeds its element width" });
        }
      }
    }
    return { issues, checkedWords, width: bounds.width, height: bounds.height, control: element.matches("button,a") };
  });
  expect(result.checkedWords).toBeGreaterThan(0);
  expect(result.issues).toEqual([]);
  if (result.control) {
    expect(result.width).toBeGreaterThanOrEqual(44);
    expect(result.height).toBeGreaterThanOrEqual(44);
  }
}
