import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { expectControlUnobstructed, readControlGeometry } from './support/frontend-mission-evidence';

// This exercises the real browser hit test without authenticated data or a DB.
test.use({ hasTouch: true, trace: 'off', video: 'off', screenshot: 'off' });
const collectionsCss = readFileSync('src/components/collections/collections.module.css', 'utf8');

async function fixture(page: Page, textScale = 100) {
  await page.setContent(`<style>
    * { box-sizing: border-box; }
    html { font-size: ${textScale}%; font-family: Arial, sans-serif; }
    body { margin: 0; }
    main { padding: 32px; }
    ${collectionsCss}
  </style><main class="page"><button class="primary" id="target">Revisar coleta</button></main>`);
  return page.getByRole('button', { name: 'Revisar coleta', exact: true });
}

for (const radius of ['999px', '60% 15% / 40% 10%', '250px 0 130px 20px / 70px 0 200px 15px']) {
  test(`rounded hit testing respects CSS overlap reduction: ${radius}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    const target = await fixture(page, 200);
    await target.evaluate((node, value) => { (node as HTMLElement).style.borderRadius = value; }, radius);
    await expectControlUnobstructed(target, page);
  });
}

test('a control descendant remains a valid hit target', async ({ page }) => {
  const target = await fixture(page, 200);
  await target.evaluate(node => {
    node.innerHTML = '<span style="position:absolute;inset:0;border-radius:inherit;display:grid;place-items:center">Revisar coleta</span>';
    (node as HTMLElement).style.position = 'relative';
  });
  await expectControlUnobstructed(target, page);
  expect((await readControlGeometry(target)).points.some(point => point.tag === 'SPAN')).toBe(true);
});

for (const side of ['top', 'right', 'bottom', 'left', 'center', 'corner'] as const) {
  test(`a real ${side} obstruction is rejected even at text 200%`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    const target = await fixture(page, 200);
    await expectControlUnobstructed(target, page);
    await target.evaluate((node, location) => {
      const box = node.getBoundingClientRect();
      const cover = document.createElement('div');
      const edge = 8;
      let left = box.left, top = box.top, width = box.width, height = box.height;
      if (location === 'top' || location === 'bottom') height = edge;
      if (location === 'left' || location === 'right') width = edge;
      if (location === 'bottom') top = box.bottom - edge;
      if (location === 'right') left = box.right - edge;
      if (location === 'center') {
        left = box.left + box.width / 2 - edge / 2;
        top = box.top + box.height / 2 - edge / 2;
        width = height = edge;
      }
      if (location === 'corner') width = height = 20;
      cover.className = 'synthetic-obstruction';
      Object.assign(cover.style, { position: 'fixed', zIndex: '100', background: 'red',
        left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
      document.body.append(cover);
    }, side);
    const geometry = await readControlGeometry(target);
    expect(geometry.fullyInViewport).toBe(true);
    expect(geometry.unobstructed).toBe(false);
    expect(geometry.points.some(point => point.className === 'synthetic-obstruction')).toBe(true);
    // Exercise the public assertion too, not only its geometry report.
    if (side === 'center') await expect(expectControlUnobstructed(target, page)).rejects.toThrow();
  });
}

test('a partially off-viewport fixed control remains rejected', async ({ page }) => {
  const target = await fixture(page);
  await target.evaluate(node => Object.assign((node as HTMLElement).style,
    { position: 'fixed', left: '-2px', top: '100px', width: '200px' }));
  const geometry = await readControlGeometry(target);
  expect(geometry.fullyInViewport).toBe(false);
  expect(geometry.unobstructed).toBe(false);
});

test('a parent clipping the control is not accepted as a related hit target', async ({ page }) => {
  const target = await fixture(page);
  await target.evaluate(node => {
    Object.assign((node.parentElement as HTMLElement).style, { height: '80px', overflow: 'hidden' });
    (node as HTMLElement).style.marginTop = '30px';
  });
  const geometry = await readControlGeometry(target);
  expect(geometry.fullyInViewport).toBe(true);
  expect(geometry.unobstructed).toBe(false);
});

test('horizontal overflow still fails the public assertion', async ({ page }) => {
  const target = await fixture(page);
  await page.evaluate(() => {
    const wide = document.createElement('div');
    wide.style.width = `${innerWidth + 1}px`;
    wide.style.height = '1px';
    document.body.append(wide);
  });
  await expect(expectControlUnobstructed(target, page)).rejects.toThrow();
});

test('pending focus reveal finishes before the single control scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.setContent(`<style>*{box-sizing:border-box}body{margin:0}.content{height:700px;overflow:auto}
    button{height:60px;width:200px;margin-block:1600px 200px}</style>
    <div class="content"><h2 tabindex="-1">Revisão</h2><button>Confirmar coleta</button></div>`);
  const heading = page.getByRole('heading', { name: 'Revisão' });
  await heading.evaluate(node => {
    node.addEventListener('focus', () => requestAnimationFrame(() => node.scrollIntoView({ block: 'nearest', behavior: 'instant' })));
    (node as HTMLElement).focus({ preventScroll: true });
  });
  await expect(heading).toBeFocused();
  const target = page.getByRole('button', { name: 'Confirmar coleta' });
  await expectControlUnobstructed(target, page);
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  expect((await readControlGeometry(target)).unobstructed).toBe(true);
});

test('text scale transitions finish before the single scroll while input focus remains protected', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.setContent(`<style>
    * { box-sizing: border-box; transition: .3s; }
    html { font-size: 100%; font-family: Arial, sans-serif; }
    body { margin: 0; }
    .content { height: 700px; overflow: auto; }
    .surface { padding: 16px; }
    input { display: block; width: 200px; height: 3rem; }
    .spacer { height: 50rem; }
    .busy { position: fixed; left: 0; top: 0; width: 2px; height: 2px; animation: turn 1s linear infinite; }
    @keyframes turn { to { transform: rotate(360deg); } }
    ${collectionsCss}
  </style><div class="busy" aria-hidden="true"></div><div class="content"><main class="surface">
    <label for="occurrence">Data e hora da coleta</label><input id="occurrence">
    <div class="spacer" aria-hidden="true"></div><button class="primary">Revisar coleta</button>
  </main></div>`);
  await page.evaluate(() => {
    const content = document.querySelector<HTMLElement>('.content')!;
    // The shell protects active focus after a size change, in its next rAF.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const active = document.activeElement;
        if (!(active instanceof HTMLElement) || !content.contains(active)) return;
        const box = active.getBoundingClientRect();
        const region = content.getBoundingClientRect();
        if (box.top < region.top + 8 || box.bottom > region.bottom - 8) {
          active.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }
      });
    });
    observer.observe(content);
    observer.observe(content.firstElementChild!);
  });
  const input = page.getByLabel('Data e hora da coleta');
  const target = page.getByRole('button', { name: 'Revisar coleta', exact: true });
  await target.evaluate(node => {
    const scroll = node.scrollIntoView.bind(node);
    node.scrollIntoView = options => {
      node.setAttribute('data-scroll-count', String(Number(node.getAttribute('data-scroll-count') ?? 0) + 1));
      scroll(options);
    };
  });
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await input.fill('valor sintético');
  await expectControlUnobstructed(target, page);
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(input).toBeFocused();
  await expect(target).toHaveAttribute('data-scroll-count', '1');
  const geometry = await readControlGeometry(target);
  expect(geometry.points).toHaveLength(9);
  expect(geometry.unobstructed).toBe(true);
  expect(await page.evaluate(() => document.getAnimations().some(animation =>
    animation.playState === 'running' && animation.effect?.getComputedTiming().endTime === Infinity))).toBe(true);
});

for (const [width, height, scale] of [[320, 900, 100], [375, 900, 100], [768, 900, 100], [1440, 900, 100], [320, 900, 200], [844, 390, 200]]) {
  test(`rounded collection control is usable at ${width}x${height}, text ${scale}%`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const target = await fixture(page, scale);
    await expectControlUnobstructed(target, page);
    await target.evaluate(node => node.addEventListener('click', () => node.setAttribute('data-clicked', 'true')));
    await target.tap();
    await expect(target).toHaveAttribute('data-clicked', 'true');
  });
}
