import { writeFile } from 'node:fs/promises';
import { expect, test, type Locator, type Page, type TestInfo } from '@playwright/test';

export async function captureMissionViewport(page: Page, info: TestInfo, name: string, textScale?: number) {
  if (!/^frontend-(collections|environmental)-[a-z0-9-]+$/.test(name)) throw new Error('UNSAFE_EVIDENCE_NAME');
  await page.screenshot({ path: info.outputPath(`${name}.png`), fullPage: false,
    animations: 'disabled', mask: [page.locator('input,select,textarea')] });
  // Read after screenshot has finished finite transitions, matching its pixels.
  const geometry = await page.evaluate(() => ({
    width: innerWidth, height: innerHeight, scrollX, scrollY,
    documentWidth: document.documentElement.scrollWidth,
    activeTag: document.activeElement?.tagName ?? null,
    rootFontSizePx: parseFloat(getComputedStyle(document.documentElement).fontSize),
  }));
  await writeFile(info.outputPath(`${name}-viewport.json`), JSON.stringify({
    ...geometry, textScale: textScale ?? geometry.rootFontSizePx / 16 * 100,
    textScaleSource: textScale === undefined ? 'measured-root-font-relative-to-16px-fixture-baseline' : 'scenario',
    physicalDevice: false, fullPage: false,
    head: process.env.GITHUB_SHA ?? 'local-working-tree',
    note: 'Chromium emulation; form controls masked; not manual accessibility acceptance.',
  }, null, 2));
}

export async function readControlGeometry(control: Locator) {
  return control.evaluate(node => {
    const box = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    const inset = Math.min(4, box.width / 4, box.height / 4);
    const length = (value: string, extent: number) => parseFloat(value) * (value.endsWith('%') ? extent / 100 : 1);
    const radii = [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius].map(value => {
      const [horizontal, vertical = horizontal] = value.split(/\s+/);
      return { x: length(horizontal, box.width), y: length(vertical, box.height) };
    });
    // CSS reduces ALL radii together when adjacent arcs would overlap.
    // https://www.w3.org/TR/css-backgrounds-3/#corner-overlap
    const ratio = (extent: number, sum: number) => sum > 0 ? extent / sum : 1;
    const factor = Math.min(1,
      ratio(box.width, radii[0].x + radii[1].x), ratio(box.width, radii[3].x + radii[2].x),
      ratio(box.height, radii[0].y + radii[3].y), ratio(box.height, radii[1].y + radii[2].y));
    for (const radius of radii) { radius.x *= factor; radius.y *= factor; }
    const inShape = (x: number, y: number) => radii.every((radius, index) => {
      if (radius.x === 0 || radius.y === 0) return true;
      const dx = (index === 0 || index === 3) ? x : box.width - x;
      const dy = index < 2 ? y : box.height - y;
      return dx >= radius.x || dy >= radius.y ||
        ((dx - radius.x) / radius.x) ** 2 + ((dy - radius.y) / radius.y) ** 2 <= 1;
    });
    const center = [box.width / 2, box.height / 2];
    // Retain the original four corner probes and center. Only move a probe if
    // its rectangle corner is outside the control's rounded hit area; then
    // find that same corner's visible boundary and step one CSS pixel inside.
    // Edge midpoints additionally detect thin bars covering a straight edge.
    const candidates = [[inset, inset], [box.width - inset, inset],
      [inset, box.height - inset], [box.width - inset, box.height - inset], center,
      [center[0], inset], [box.width - inset, center[1]],
      [center[0], box.height - inset], [inset, center[1]]];
    const points = candidates.map(([startX, startY]) => {
      let x = startX, y = startY;
      if (!inShape(x, y)) {
        let low = 0, high = 1;
        for (let iteration = 0; iteration < 20; iteration++) {
          const middle = (low + high) / 2;
          if (inShape(startX + (center[0] - startX) * middle, startY + (center[1] - startY) * middle)) high = middle;
          else low = middle;
        }
        const distance = Math.hypot(center[0] - startX, center[1] - startY);
        const fraction = Math.min(1, high + (distance > 0 ? 1 / distance : 0));
        x += (center[0] - startX) * fraction;
        y += (center[1] - startY) * fraction;
      }
      x += box.left; y += box.top;
      const hit = document.elementFromPoint(x,y);
      return { x, y, tag: hit?.tagName ?? null,
        className: typeof hit?.className === 'string' ? hit.className.slice(0, 120) : null,
        inside: hit !== null && (hit === node || node.contains(hit)) };
    });
    const describe = (element: Element | null) => {
      if (!element) return null;
      const computed = getComputedStyle(element);
      return { tag: element.tagName, rect: element.getBoundingClientRect().toJSON(),
        scrollTop: element.scrollTop, scrollHeight: element.scrollHeight, clientHeight: element.clientHeight,
        overflow: computed.overflow, position: computed.position, zIndex: computed.zIndex,
        padding: computed.padding, scrollPadding: computed.scrollPadding };
    };
    const scrollContainers = [];
    for (let ancestor = node.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(ancestor).overflow)) scrollContainers.push(describe(ancestor));
    }
    const fullyInViewport = box.width > 0 && box.height > 0 && box.left >= 0 && box.top >= 0 && box.right <= innerWidth && box.bottom <= innerHeight;
    return { fullyInViewport, unobstructed: fullyInViewport && points.every(point => point.inside),
      rect: box.toJSON(), radii, points, scrollContainers,
      viewport: { width: innerWidth, height: innerHeight, scrollX, scrollY,
        visualViewport: visualViewport ? { width: visualViewport.width, height: visualViewport.height,
          offsetLeft: visualViewport.offsetLeft, offsetTop: visualViewport.offsetTop, scale: visualViewport.scale } : null },
      activeTag: document.activeElement?.tagName ?? null,
      control: describe(node), header: describe(document.getElementById('application-header')),
      navigation: describe(document.getElementById('application-navigation')) };
  });
}

export async function expectControlUnobstructed(control: Locator, page: Page) {
  // After the caller observes review-heading focus, the shell's focus handler
  // still has one revealFocus rAF queued. Let that causal callback finish before
  // our one scroll operation, so it cannot undo the viewport being measured.
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
  await control.evaluate(node => node.scrollIntoView({ block: 'center', inline: 'nearest' }));
  await expect(control).toBeVisible();
  try {
    await expect.poll(async () => (await readControlGeometry(control)).unobstructed).toBe(true);
  } catch (error) {
    // Geometry only: no text, input values, hrefs, tokens or dynamic element IDs.
    console.error('MISSION_CONTROL_GEOMETRY', JSON.stringify(await readControlGeometry(control)));
    const info = test.info();
    const phase = info.file.includes('environmental') ? 'environmental' : 'collections';
    try { await captureMissionViewport(page, info, `frontend-${phase}-control-obstructed`); }
    catch { console.error('MISSION_CONTROL_SCREENSHOT_UNAVAILABLE'); }
    throw error;
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
