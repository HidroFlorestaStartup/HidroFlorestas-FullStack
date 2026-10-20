import { expect, test, type BrowserContext, type TestInfo } from '@playwright/test';
import { signSessionToken } from '../../src/app/api/server/auth/session';
import { COLLECTION_FIXTURES as F, setupCollectionFixtures, cleanupCollectionFixtures, countCollectionFixtures } from '../fixtures/collections';
import { fillCollectionOccurrence } from './support/collection-occurrence';
import { captureMissionViewport, expectControlUnobstructed } from './support/frontend-mission-evidence';

test.describe.configure({ mode: 'serial' });
test.setTimeout(90_000);
test.use({ hasTouch: true, trace: 'off', video: 'off', screenshot: 'off' });
test.beforeEach(async () => { await setupCollectionFixtures(process.env); });
test.afterEach(async () => {
  await cleanupCollectionFixtures(process.env);
  expect(Object.values(await countCollectionFixtures(process.env)).every(n => n === 0)).toBe(true);
});
const area = `/dashboard/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}`;
const api = `${area.replace('/dashboard/','/api/')}/collections`;
async function login(context: BrowserContext, info: TestInfo) {
  await context.addCookies([{ name: 'auth_token', value: signSessionToken(F.userIds[0]), url: String(info.project.use.baseURL) }]);
}

test('R1 real commit with lost response recovers the original record, key and body', async ({ page, context }, info) => {
  await login(context, info);
  const before = (await countCollectionFixtures(process.env)).collections;
  const requests: {key: string; body: string | null}[] = [];
  let originalId = '';
  await page.route(`**/api/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}/collections`, async route => {
    if (route.request().method() !== 'POST') { await route.continue(); return; }
    requests.push({key: route.request().headers()['idempotency-key'], body: route.request().postData()});
    if (requests.length === 1) {
      const committed = await route.fetch();
      expect(committed.status()).toBe(201);
      originalId = (await committed.json()).collection.id;
      await route.abort('failed');
    } else await route.continue();
  });
  await page.goto(`${area}/collections/new`);
  await fillCollectionOccurrence(page, '2026-09-15T09:00:00.123-03:00');
  await captureMissionViewport(page, info, 'frontend-collections-initial-form');
  await page.getByRole('button', {name: 'Revisar coleta', exact: true}).click();
  await page.getByRole('button', {name: 'Confirmar coleta', exact: true}).click();
  const review = page.getByRole('region', {name: 'Revisão', exact: true});
  await expect(review.getByRole('alert')).toBeVisible();
  expect((await countCollectionFixtures(process.env)).collections).toBe(before + 1);
  await expect(review.getByRole('button', {name: 'Voltar e corrigir', exact: true})).toBeDisabled();
  await expect(review).toContainText('15/09/2026 09:00:00.123 (UTC-03:00)');
  await captureMissionViewport(page, info, 'frontend-collections-uncertain-result');
  await page.getByRole('button', {name: 'Tentar novamente', exact: true}).click();
  await expect(page).toHaveURL(`${area}/collections/${originalId}`);
  expect(requests).toHaveLength(2);
  expect(requests[0].key).toBeTruthy();
  expect(requests[1]).toEqual(requests[0]);
  expect((await countCollectionFixtures(process.env)).collections).toBe(before + 1);
  await expect(page.getByRole('article', {name: 'Detalhe da coleta'})).toContainText('15/09/2026 09:00:00.123 (UTC-03:00)');
  const divergent = await context.request.post(api, {headers: {'Idempotency-Key': requests[0].key}, data: {occurredAt:'2026-09-15T10:00:00.123-03:00'}});
  expect(divergent.status()).toBe(409);
  expect((await countCollectionFixtures(process.env)).collections).toBe(before + 1);
});

test('a later access rejection cannot unlock a previously uncertain confirmation', async ({ page, context }, info) => {
  await login(context, info);
  let calls = 0;
  let originalId = '';
  const bodies: (string|null)[] = [];
  await page.route(`**/api/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}/collections`, async route => {
    if (route.request().method() !== 'POST') { await route.continue(); return; }
    calls++; bodies.push(route.request().postData());
    if (calls === 1) {
      const committed = await route.fetch(); expect(committed.status()).toBe(201);
      originalId = (await committed.json()).collection.id; await route.abort('failed');
    } else if (calls === 2) await route.fulfill({status:404,contentType:'application/json',body:JSON.stringify({error:{code:'NOT_FOUND'}})});
    else await route.continue();
  });
  await page.goto(`${area}/collections/new`);
  await fillCollectionOccurrence(page,'2026-09-15T10:00:00.456+05:45');
  await page.getByRole('button',{name:'Revisar coleta',exact:true}).click();
  await page.getByRole('button',{name:'Confirmar coleta',exact:true}).click();
  await expect(page.getByRole('region',{name:'Revisão'}).getByRole('alert')).toBeVisible();
  await page.getByRole('button',{name:'Tentar novamente',exact:true}).click();
  await expect(page.getByRole('region',{name:'Revisão'}).getByRole('alert')).toContainText('acesso');
  await expect(page.getByRole('button',{name:'Voltar e corrigir',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Tentar novamente',exact:true}).click();
  await expect(page).toHaveURL(`${area}/collections/${originalId}`);
  expect(bodies).toHaveLength(3); expect(new Set(bodies).size).toBe(1);
});

test('slow hydration does not expose an editable device-time form before handlers', async ({page,context},info)=>{
  await login(context,info);
  let release!:()=>void;
  const ready=new Promise<void>(resolve=>{release=resolve;});
  await page.route(url=>url.pathname.startsWith('/_next/static/')&&url.pathname.endsWith('.js'),async route=>{await ready;await route.continue();});
  try {
    await page.goto(`${area}/collections/new`,{waitUntil:'commit'});
    await expect(page.getByText('Preparando formulário de coleta…',{exact:true})).toBeVisible();
    await expect(page.getByLabel('Data e hora da coleta')).toHaveCount(0);
    await expect(page.getByRole('button',{name:'Revisar coleta',exact:true})).toHaveCount(0);
  } finally { release(); }
  await expect(page.getByLabel('Data e hora da coleta')).toBeEnabled();
});

test('viewport, text200, touch, focus and last controls remain usable',async({page,context},info)=>{
  await login(context,info);
  for(const [width,height,scale] of [[320,900,100],[375,900,100],[768,900,100],[1440,900,100],[320,900,200],[844,390,200]]){
    await page.setViewportSize({width,height});
    await page.goto(`${area}/collections/new`);
    if(scale===200)await page.addStyleTag({content:'html{font-size:200%!important}'});
    await fillCollectionOccurrence(page,'2026-09-15T09:00:00.123-03:00');
    const reviewButton=page.getByRole('button',{name:'Revisar coleta',exact:true});
    await expectControlUnobstructed(reviewButton,page);
    await captureMissionViewport(page,info,`frontend-collections-form-${width}-${height}-${scale}`,scale);
    await reviewButton.tap();
    await expect(page.getByRole('heading',{name:'Revisão',exact:true})).toBeFocused();
    const confirm=page.getByRole('button',{name:'Confirmar coleta',exact:true});
    await expectControlUnobstructed(confirm,page);
    await captureMissionViewport(page,info,`frontend-collections-review-${width}-${height}-${scale}`,scale);
    await page.getByRole('button',{name:'Voltar e corrigir',exact:true}).click();
    await expect(page.getByLabel('Data e hora da coleta')).toBeFocused();
    await expect(page.getByLabel('Data e hora da coleta')).toHaveValue('2026-09-15T09:00:00.123');
    await page.goto(`${area}/collections/${F.collectionIds[0]}`);
    if(scale===200)await page.addStyleTag({content:'html{font-size:200%!important}'});
    const read=page.getByRole('link',{name:'Ver dados ambientais',exact:true});
    await expectControlUnobstructed(read,page);
    await captureMissionViewport(page,info,`frontend-collections-detail-${width}-${height}-${scale}`,scale);
  }
});
