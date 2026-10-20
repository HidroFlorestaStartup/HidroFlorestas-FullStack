import { writeFile } from 'node:fs/promises';
import { expect, type Locator, type Page, type TestInfo } from '@playwright/test';

export async function captureMissionViewport(page: Page, info: TestInfo, name: string, textScale = 100) {
  if (!/^frontend-(collections|environmental)-[a-z0-9-]+$/.test(name)) throw new Error('UNSAFE_EVIDENCE_NAME');
  const geometry = await page.evaluate(() => ({
    width: innerWidth, height: innerHeight, scrollX, scrollY,
    documentWidth: document.documentElement.scrollWidth,
    activeTag: document.activeElement?.tagName ?? null,
  }));
  await page.screenshot({ path: info.outputPath(`${name}.png`), fullPage: false,
    animations: 'disabled', mask: [page.locator('input,select,textarea')] });
  await writeFile(info.outputPath(`${name}-viewport.json`), JSON.stringify({
    ...geometry, textScale, physicalDevice: false, fullPage: false,
    head: process.env.GITHUB_SHA ?? 'local-working-tree',
    note: 'Chromium emulation; form controls masked; not manual accessibility acceptance.',
  }, null, 2));
}

export async function expectControlUnobstructed(control: Locator, page: Page) {
  await control.evaluate(node => node.scrollIntoView({ block: 'center', inline: 'nearest' }));
  await expect(control).toBeVisible();
  await expect.poll(() => control.evaluate(node => {
    const box = node.getBoundingClientRect();
    if (box.width <= 0 || box.height <= 0 || box.left < 0 || box.top < 0 || box.right > innerWidth || box.bottom > innerHeight) return false;
    const inset = Math.min(4, box.width / 4, box.height / 4);
    return [[box.left + inset,box.top + inset],[box.right - inset,box.top + inset],
      [box.left + inset,box.bottom - inset],[box.right - inset,box.bottom - inset],
      [box.left + box.width / 2,box.top + box.height / 2]].every(([x,y]) => {
      const hit = document.elementFromPoint(x,y);
      return hit !== null && (hit === node || node.contains(hit));
    });
  })).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
