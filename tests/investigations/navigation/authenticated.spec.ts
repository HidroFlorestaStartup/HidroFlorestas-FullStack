import { expect, test, type Page } from '@playwright/test';
import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { signSessionToken } from '../../../src/app/api/server/auth/session';
import { COLLECTION_FIXTURES as F, setupCollectionFixtures, cleanupCollectionFixtures, countCollectionFixtures } from '../../fixtures/collections';
import { captureMissionViewport } from '../../e2e/support/frontend-mission-evidence';

test.setTimeout(90_000);
test.use({ trace: 'off', screenshot: 'off', video: 'off' });
const output = join(process.cwd(), '.accounts-validation/navigation-auth-observations.jsonl');
const area = `/dashboard/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}`;
test.beforeAll(async () => { await setupCollectionFixtures(process.env); });
test.afterAll(async () => {
  await cleanupCollectionFixtures(process.env);
  expect(Object.values(await countCollectionFixtures(process.env)).every(count => count === 0)).toBe(true);
});
async function record(value: unknown) { await appendFile(output, JSON.stringify(value) + '\n'); }
async function installObserver(page: Page) {
  await page.getByLabel('Data e hora da coleta', { exact: true }).evaluate(input => {
    const observations: unknown[] = [];
    let last = '';
    const read = (phase: string) => {
      const inline = (input as HTMLElement).style.getPropertyValue('caret-color');
      const state = { phase, inlineCaret: inline === '' ? 'absent' : inline === 'transparent' ? 'transparent' : 'other',
        stylePresent: input.hasAttribute('style'), enabled: !(input as HTMLInputElement).disabled };
      const key = `${state.inlineCaret}:${state.stylePresent}`;
      if (key !== last || phase !== 'mutation') observations.push(state);
      last = key;
    };
    read('before');
    const observer = new MutationObserver(() => read('mutation'));
    observer.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['style'] });
    (window as Window & { __navCaret?: { stop: () => unknown[] } }).__navCaret = {
      stop: () => { observer.disconnect(); read('after'); return observations; },
    };
  });
}
async function stopObserver(page: Page) {
  return page.evaluate(() => (window as Window & { __navCaret?: { stop: () => unknown[] } }).__navCaret!.stop());
}
test('OBS-001 same real collection form before during and after the existing capture helper', async ({ page, context }, info) => {
  const warnings: Array<{ type: string; category: string }> = [];
  page.on('console', event => {
    if (!['warning', 'error'].includes(event.type())) return;
    warnings.push({ type: event.type(), category: /hydrat|did not match|server rendered/i.test(event.text()) ? 'hydration' : 'other' });
  });
  await context.addCookies([{ name: 'auth_token', value: signSessionToken(F.userIds[0]), url: String(info.project.use.baseURL) }]);
  await page.setViewportSize({ width: 375, height: 900 });
  const document = await page.goto(`${area}/collections/new`);
  expect(document?.status()).toBe(200);
  const identity = await context.request.get('/api/auth/me');
  expect(identity.status()).toBe(200);
  const occurrence = page.getByLabel('Data e hora da coleta', { exact: true });
  await expect(occurrence).toBeEnabled();
  await page.addStyleTag({ content: 'html { font-size:200% !important; }' });
  await occurrence.focus();
  await installObserver(page);
  const archive = join(process.cwd(), '.accounts-validation/navigation-auth-artifacts');
  await mkdir(archive, { recursive: true });
  await page.screenshot({ path: join(archive, 'collection-caret-initial.png'), fullPage: false,
    animations: 'allow', caret: 'initial', mask: [page.locator('input,select,textarea')] });
  const control = await stopObserver(page);
  const warningCountBeforeHelper = warnings.length;
  await installObserver(page);
  await captureMissionViewport(page, info, 'frontend-collections-caret-counterproof', 200);
  const helper = await stopObserver(page);
  await expect(occurrence).toBeEnabled();
  await occurrence.focus();
  await expect(occurrence).toBeFocused();
  await record({ experiment: 'OBS-001/collection/C-AUTH-1', documentStatus: document?.status(), identityStatus: identity.status(),
    viewport: { width: 375, height: 900 }, textScale: 200, control, helper,
    warningCountBeforeHelper, warnings, inputAfter: { enabled: true, focused: true },
    hydratedFormOnly: true, historicalHydrationCause: 'INCONCLUSIVO' });
});
test('INV-005 preserves real API lookup404 separately from document200 and isolated read-only probes', async ({ browser }, info) => {
  const statuses: Array<{ phase: string; kind: string; status: number | undefined }> = [];
  for (const phase of ['journey', 'independent-read-only-probe']) {
    const context = await browser.newContext({ baseURL: String(info.project.use.baseURL) });
    try {
      // Independently issued fixture session; no cookies copied from another jar.
      await context.addCookies([{ name: 'auth_token', value: signSessionToken(F.userIds[0]), url: String(info.project.use.baseURL) }]);
      const page = await context.newPage();
      const document = await page.goto(`${area}/collections/new`);
      statuses.push({ phase, kind: 'document-navigation', status: document?.status() });
      expect(document?.status()).toBe(200);
      await expect(page.getByLabel('Data e hora da coleta', { exact: true })).toBeEnabled();
      const lookup = await context.request.get('/api/laboratories/00000000-0000-4000-8000-000000000999/territorial-map');
      statuses.push({ phase, kind: 'api-lookup-expected-missing', status: lookup.status() });
      expect(lookup.status()).toBe(404);
    } finally { await context.close(); }
  }
  await record({ experiment: 'INV-005/C-AUTH-1', separateCookieJars: true, probesReadOnly: true, statuses,
    originalSixDocument404PathsRecovered: false, historicalCause: 'INCONCLUSIVO' });
});
