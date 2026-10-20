import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { captureMissionViewport, expectControlUnobstructed, readControlGeometry, waitForMissionRender } from './support/frontend-mission-evidence';

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

test('render readiness drains focus queued by a late ResizeObserver before one scroll', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.setContent(`<style>
    * { box-sizing: border-box; transition: .3s; }
    html { font-size: 200%; font-family: Arial, sans-serif; }
    body { margin: 0; }
    .content { height: 700px; overflow: auto; }
    .surface { padding: 16px; }
    input { display: block; width: 200px; height: 3rem; }
    .spacer { height: 50rem; }
    ${collectionsCss}
  </style><div class="content"><main class="surface">
    <label for="field">Campo</label><input id="field">
    <div class="spacer" aria-hidden="true"></div><button class="primary">Revisar</button>
  </main></div>`);
  await page.getByLabel('Campo').fill('synthetic');
  // Install the real compiled browser function, avoiding an implementation copy.
  await page.addScriptTag({ content: `window.waitForMissionRender = ${waitForMissionRender.toString()};` });
  await page.evaluate(() => {
    const state = window as unknown as {
      pendingFocus: boolean;
      pendingAtReadiness: boolean;
      controlScrollCount: number;
      scheduleLateResize: () => void;
      waitForMissionRender: () => Promise<void>;
    };
    const content = document.querySelector<HTMLElement>('.content')!;
    const surface = content.firstElementChild!;
    const target = document.querySelector('button')!;
    state.pendingFocus = false;
    state.controlScrollCount = 0;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      state.pendingFocus = true;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement && content.contains(active)) {
          const box = active.getBoundingClientRect();
          const region = content.getBoundingClientRect();
          if (box.top < region.top + 8 || box.bottom > region.bottom - 8) {
            active.scrollIntoView({ block: 'nearest', behavior: 'instant' });
          }
        }
        state.pendingFocus = false;
      });
    });
    observer.observe(content);
    observer.observe(surface);
    const scroll = target.scrollIntoView.bind(target);
    target.scrollIntoView = options => {
      state.controlScrollCount++;
      scroll(options);
    };
    state.scheduleLateResize = () => {
      const getAnimations = document.getAnimations.bind(document);
      let scheduled = false;
      document.getAnimations = () => {
        const animations = getAnimations();
        if (!scheduled && !animations.some(animation => animation.playState === 'running' && Number.isFinite(animation.effect?.getComputedTiming().endTime))) {
          scheduled = true;
          requestAnimationFrame(() => {
            // Intrinsic height changes after this frame's rAF callbacks. The
            // real observer queues its reveal behind readiness's second rAF.
            const addition = document.createElement('div');
            addition.style.height = '1px';
            surface.append(addition);
          });
        }
        return animations;
      };
    };
  });
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  const ordering = await page.evaluate(async () => {
    const state = window as unknown as {
      pendingFocus: boolean;
      pendingAtReadiness: boolean;
      controlScrollCount: number;
      scheduleLateResize: () => void;
      waitForMissionRender: () => Promise<void>;
    };
    state.scheduleLateResize();
    await state.waitForMissionRender();
    const pendingAtReadiness = state.pendingFocus;
    document.querySelector('button')!.scrollIntoView({ block: 'center', inline: 'nearest' });
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    return { pendingAtReadiness, controlScrollCount: state.controlScrollCount };
  });
  await expect(page.getByLabel('Campo')).toBeFocused();
  const geometry = await readControlGeometry(page.getByRole('button', { name: 'Revisar', exact: true }));
  console.log(JSON.stringify({ ...ordering, unobstructed: geometry.unobstructed, points9: geometry.points.map(point => point.inside), rect: geometry.rect, activeTag: geometry.activeTag }));
  expect(ordering.pendingAtReadiness).toBe(false);
  expect(ordering.controlScrollCount).toBe(1);
  expect(geometry.points).toHaveLength(9);
  expect(geometry.unobstructed).toBe(true);
});

type MissionCaptureOrderProbe = {
  activeAtEntry: number;
  armedAt: number | null;
  deadline: number | null;
  finishedAt: number | null;
  transitionEndCount: number;
  elapsedMs: number | null;
  scrollCalls: number;
};

test('the before-scroll capture observes natural transition completion without scrolling', async ({ page }, info) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.setContent(`<style>
    html { font-size: 16px; font-family: Arial, sans-serif; }
    body { margin: 8px; }
    #content { height: 320px; overflow: auto; border: 1px solid #888; }
    #changing { height: 20px; transition: height .3s linear; }
    #spacer { height: 500px; }
    #target { width: 240px; height: 60px; border: 0; border-radius: 20px; }
  </style><main id="content"><div id="changing"></div><div id="spacer"></div>
    <button id="target">Synthetic final control</button></main>`);
  await page.evaluate(() => {
    const state: MissionCaptureOrderProbe = {
      activeAtEntry: 0, armedAt: null, deadline: null, finishedAt: null,
      transitionEndCount: 0, elapsedMs: null, scrollCalls: 0,
    };
    (window as unknown as { missionCaptureOrder: MissionCaptureOrderProbe }).missionCaptureOrder = state;
    const changing = document.getElementById('changing')!;
    const target = document.getElementById('target')!;
    changing.addEventListener('transitionend', event => {
      if (event.propertyName !== 'height') return;
      state.transitionEndCount++;
      state.finishedAt = Number(document.timeline.currentTime);
      state.elapsedMs = event.elapsedTime * 1000;
    });
    const scroll = target.scrollIntoView.bind(target);
    target.scrollIntoView = options => {
      state.scrollCalls++;
      scroll(options);
    };
    const nativeGetAnimations = document.getAnimations.bind(document);
    document.getAnimations = () => {
      if (state.armedAt === null) {
        // Start at readiness's first native observation, in the same browser
        // turn. Protocol delays cannot let the transition finish before entry.
        changing.getBoundingClientRect();
        state.armedAt = Number(document.timeline.currentTime);
        state.deadline = state.armedAt + 300;
        changing.style.height = '120px';
        const animations = nativeGetAnimations();
        state.activeAtEntry = animations.filter(animation =>
          animation.playState === 'running' &&
          (animation.effect as KeyframeEffect | null)?.target === changing).length;
        return animations;
      }
      return nativeGetAnimations();
    };
  });
  const target = page.getByRole('button', { name: 'Synthetic final control', exact: true });
  let captures = 0;
  await expectControlUnobstructed(target, page, async () => {
    captures++;
    const before = await page.evaluate(() => ({
      ...(window as unknown as { missionCaptureOrder: MissionCaptureOrderProbe }).missionCaptureOrder,
      scrollTop: document.getElementById('content')!.scrollTop,
    }));
    expect(before.activeAtEntry).toBe(1);
    expect(before.transitionEndCount).toBe(1);
    expect(before.deadline).not.toBeNull();
    expect(before.finishedAt).not.toBeNull();
    expect(before.finishedAt!).toBeGreaterThanOrEqual(before.deadline!);
    expect(before.elapsedMs).toBe(300);
    expect(before.scrollCalls).toBe(0);
    expect(before.scrollTop).toBe(0);
    await captureMissionViewport(page, info, 'frontend-collections-capture-order-before', 100);
  });
  expect(captures).toBe(1);
  const after = await page.evaluate(() => ({
    ...(window as unknown as { missionCaptureOrder: MissionCaptureOrderProbe }).missionCaptureOrder,
    scrollTop: document.getElementById('content')!.scrollTop,
  }));
  expect(after.scrollCalls).toBe(1);
  expect(after.scrollTop).toBeGreaterThan(0);
  const geometry = await readControlGeometry(target);
  expect(geometry.points).toHaveLength(9);
  expect(geometry.points.every(point => point.inside)).toBe(true);
  expect(geometry.unobstructed).toBe(true);
  const metadata = JSON.parse(readFileSync(info.outputPath('frontend-collections-capture-order-before-viewport.json'), 'utf8'));
  expect(metadata.animations).toBe('allow');
  expect(metadata.evidenceKind).toBe('synthetic-helper-counterproof');
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
