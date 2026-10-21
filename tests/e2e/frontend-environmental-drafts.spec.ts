import { expect, test, type BrowserContext, type Page, type TestInfo } from '@playwright/test';
import { signSessionToken } from '../../src/app/api/server/auth/session';
import { ENVIRONMENTAL_FIXTURES as F, setupEnvironmentalFixtures, cleanupEnvironmentalFixtures, countEnvironmentalFixtures } from '../fixtures/environmental-data-fixtures';
import { captureMissionViewport, expectControlUnobstructed } from './support/frontend-mission-evidence';

test.describe.configure({mode:'serial'});
test.setTimeout(90_000);
test.use({hasTouch:true,trace:'off',video:'off',screenshot:'off'});
test.beforeEach(async()=>{await setupEnvironmentalFixtures(process.env);});
test.afterEach(async()=>{await cleanupEnvironmentalFixtures(process.env);expect(Object.values(await countEnvironmentalFixtures(process.env)).every(n=>n===0)).toBe(true);});
const base=`/dashboard/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}/collections/${F.collectionIds[0]}/environmental-data`;
const api=base.replace('/dashboard/','/api/');
async function login(context:BrowserContext,info:TestInfo){await context.addCookies([{name:'auth_token',value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);}
async function fillValid(page:Page){
  const selects=[['Fonte de água','RIVER_STREAM'],['Há nascente','false'],['Disponibilidade hídrica','PERMANENT'],['Textura do solo','SANDY'],['Compactação','LOW'],['Sinais de erosão','NONE'],['Fragmentação','LOW'],['Degradação da paisagem','LOW']];
  for(const [label,value] of selects)await page.getByLabel(label).selectOption(value);
  await page.getByLabel('Taxa de infiltração').fill('0');
  await page.getByLabel('Cobertura vegetal').fill('0');
}

test('R3 opens a closed group before focusing the invalid field',async({page,context},info)=>{
  await login(context,info);await page.goto(base+'/new');await fillValid(page);
  await page.getByLabel('Taxa de infiltração').fill('');
  const group=page.locator('details[data-environmental-group="soil"]');
  await group.locator('summary').click();
  await expect(group).not.toHaveAttribute('open');
  await page.getByRole('button',{name:'Revisar dados',exact:true}).click();
  await expect(group).toHaveAttribute('open','');
  await expect(page.getByLabel('Taxa de infiltração')).toBeFocused();
  await expect(page.locator('[id="soil.infiltrationRateMmPerHour-error"]')).toBeVisible();
  await expectControlUnobstructed(page.getByLabel('Taxa de infiltração'),page);
  await captureMissionViewport(page,info,'frontend-environmental-invalid-expanded');
});

test('R2 tiny measurement, false, zero and partial draft survive real save, reload and confirmation',async({page,context},info)=>{
  await login(context,info);await page.goto(base+'/new');await fillValid(page);
  await page.getByLabel('Taxa de infiltração').fill('0.0000004');
  await page.getByLabel('Elevação').fill('12.');
  const put=page.waitForRequest(r=>r.method()==='PUT'&&r.url().endsWith('/draft'));
  const saved=page.waitForResponse(r=>r.request().method()==='PUT'&&r.url().endsWith('/draft'));
  await page.getByRole('button',{name:'Salvar rascunho',exact:true}).click();
  const sent=(await put).postDataJSON();expect((await saved).status()).toBe(200);
  expect(sent.fields['terrain.elevationMeters']).toEqual({kind:'editing',raw:'12.'});
  expect(sent.fields['water.hasSpring']).toEqual({kind:'editing',raw:'false'});
  expect(sent.fields['vegetation.vegetationCoverPercent']).toEqual({kind:'editing',raw:'0'});
  await expect(page.getByRole('status')).toContainText('Rascunho salvo.');
  await page.reload();
  await expect(page.getByLabel('Elevação')).toHaveValue('12.');
  await expect(page.getByLabel('Há nascente')).toHaveValue('false');
  await expect(page.getByLabel('Cobertura vegetal')).toHaveValue('0');
  await page.getByRole('button',{name:'Revisar dados',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Revisar dados ambientais',exact:true})).toBeFocused();
  await expect(page.locator('[data-environmental-value="soil.infiltrationRateMmPerHour"]')).toHaveText('0.0000004 mm/h');
  await expect(page.locator('[data-environmental-value="water.hasSpring"]')).toHaveText('Não');
  await captureMissionViewport(page,info,'frontend-environmental-review');
  const post=page.waitForRequest(r=>r.method()==='POST'&&r.url().endsWith(api));
  const confirmed=page.waitForResponse(r=>r.request().method()==='POST'&&r.url().endsWith(api));
  await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
  expect((await post).postDataJSON().soil.infiltrationRateMmPerHour).toBe(0.0000004);
  expect((await confirmed).status()).toBe(201);
  await expect(page).toHaveURL(base);
  await expect(page.locator('[data-environmental-value="soil.infiltrationRateMmPerHour"]')).toHaveText('0.0000004 mm/h');
  const data=await (await context.request.get(api)).json();
  expect(data.environmentalData.soil.infiltrationRateMmPerHour).toBe(0.0000004);
  expect(data.environmentalData.water.hasSpring).toBe(false);
  expect(data.environmentalData.vegetation.vegetationCoverPercent).toBe(0);
  expect((await (await context.request.get(api+'/draft')).json()).draft).toBeNull();
  await page.reload();
  const confirmedInfiltrationValue = page.locator('[data-environmental-value="soil.infiltrationRateMmPerHour"]');
  await expect(confirmedInfiltrationValue).toHaveCount(1);
  await expect(confirmedInfiltrationValue).toBeVisible();
  await expect(confirmedInfiltrationValue).toHaveText('0.0000004 mm/h');
  await captureMissionViewport(page,info,'frontend-environmental-confirmed');
});

test('R5 lost draft-save response and later rejection keep original key, body and revision',async({page,context},info)=>{
  await login(context,info);await page.goto(base+'/new');
  await page.getByLabel('Elevação').fill('12.');
  let calls=0;let original:{id:string;revision:number}|undefined;
  const bodies:string[]=[];
  await page.route('**/environmental-data/draft',async route=>{
    if(route.request().method()!=='PUT'){await route.continue();return;}
    calls++;bodies.push(route.request().postData()!);
    if(calls===1){const committed=await route.fetch();expect(committed.status()).toBe(200);original=(await committed.json()).draft;await route.abort('failed');}
    else if(calls===2)await route.fulfill({status:409,contentType:'application/json',body:JSON.stringify({error:{code:'STALE_REVISION',message:'Conflito sintético posterior.'}})});
    else await route.continue();
  });
  await page.getByRole('button',{name:'Salvar rascunho',exact:true}).click();
  await expect(page.getByRole('status')).toContainText('Não foi possível verificar o salvamento.');
  await page.getByRole('button',{name:'Repetir salvamento',exact:true}).click();
  await expect(page.getByRole('status')).toContainText('Conflito sintético posterior.');
  await expect(page.getByLabel('Elevação')).toBeDisabled();
  await page.getByRole('button',{name:'Repetir salvamento',exact:true}).click();
  await expect(page.getByRole('status')).toContainText('Rascunho salvo.');
  expect(bodies).toHaveLength(3);expect(new Set(bodies).size).toBe(1);
  const recovered=(await (await context.request.get(api+'/draft')).json()).draft;
  expect(recovered.id).toBe(original?.id);expect(recovered.revision).toBe(original?.revision);
  await expect(page.getByLabel('Elevação')).toHaveValue('12.');
});

test('R5 uncertain environmental confirmation stays locked after a later conflict',async({page,context},info)=>{
  await login(context,info);await page.goto(base+'/new');await fillValid(page);
  let calls=0;let originalId='';const requests:{key:string;body:string|null}[]=[];
  await page.route(`**${api}`,async route=>{
    if(route.request().method()!=='POST'){await route.continue();return;}
    calls++;requests.push({key:route.request().headers()['idempotency-key'],body:route.request().postData()});
    if(calls===1){const committed=await route.fetch();expect(committed.status()).toBe(201);originalId=(await committed.json()).environmentalData.id;await route.abort('failed');}
    else if(calls===2)await route.fulfill({status:409,contentType:'application/json',body:JSON.stringify({error:{code:'CONFLICT',message:'Conflito sintético posterior.'}})});
    else await route.continue();
  });
  await page.getByRole('button',{name:'Revisar dados',exact:true}).click();
  await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
  await expect(page.getByRole('article',{name:'Registrar dados ambientais',exact:true}).getByRole('alert')).toContainText('Não foi possível verificar a confirmação.');
  await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
  await expect(page.getByRole('article',{name:'Registrar dados ambientais',exact:true}).getByRole('alert')).toContainText('Conflito sintético posterior.');
  await expect(page.getByRole('button',{name:'Voltar ao formulário',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
  await expect(page).toHaveURL(base);
  expect(requests).toHaveLength(3);expect(requests[1]).toEqual(requests[0]);expect(requests[2]).toEqual(requests[0]);
  expect((await (await context.request.get(api)).json()).environmentalData.id).toBe(originalId);
});

test('environmental form, draft actions and review remain usable at each viewport',async({page,context},info)=>{
  await login(context,info);
  page.on('dialog',dialog=>dialog.accept()); // Explicitly leave synthetic unsaved input between viewport cases.
  for(const [width,height,scale] of [[320,900,100],[375,900,100],[768,900,100],[1440,900,100],[320,900,200],[844,390,200]]){
    await page.setViewportSize({width,height});await page.goto(base+'/new');
    if(scale===200)await page.addStyleTag({content:'html{font-size:200%!important}'});
    await fillValid(page);
    const save=page.getByRole('button',{name:'Salvar rascunho',exact:true});
    await expectControlUnobstructed(save,page);
    await captureMissionViewport(page,info,`frontend-environmental-draft-${width}-${height}-${scale}`,scale);
    await expectControlUnobstructed(page.getByLabel('Declividade'),page);
    await captureMissionViewport(page,info,`frontend-environmental-last-field-${width}-${height}-${scale}`,scale);
    const review=page.getByRole('button',{name:'Revisar dados',exact:true});
    await expectControlUnobstructed(review,page);
    await captureMissionViewport(page,info,`frontend-environmental-form-${width}-${height}-${scale}`,scale);
    await review.tap();
    await expect(page.getByRole('heading',{name:'Revisar dados ambientais',exact:true})).toBeFocused();
    const confirm=page.getByRole('button',{name:'Confirmar dados ambientais',exact:true});
    await expectControlUnobstructed(confirm,page);
    await captureMissionViewport(page,info,`frontend-environmental-review-${width}-${height}-${scale}`,scale);
    await page.getByRole('button',{name:'Voltar ao formulário',exact:true}).click();
    await expect(page.getByRole('heading',{name:'Informar dados ambientais',exact:true})).toBeFocused();
  }
});

test('P1: retry de rascunho nao pode persistir o preenchimento de A como rascunho de B',async({page,context},info)=>{
  await login(context,info);
  await page.goto(base+'/new');
  await page.getByLabel('Elevação').fill('12.');
  const requests:Array<{body:string|null;proof:string|undefined}>=[];
  let originalId='';let originalRevision=0;
  await page.route('**/environmental-data/draft',async route=>{
    if(route.request().method()!=='PUT'){await route.continue();return;}
    requests.push({body:route.request().postData(),proof:route.request().headers()['x-environmental-initiator-proof']});
    if(requests.length===1){
      const committed=await route.fetch();expect(committed.status()).toBe(200);
      const saved=(await committed.json()).draft;originalId=saved.id;originalRevision=saved.revision;
      await route.abort('failed');
    }else await route.continue();
  });
  await page.getByRole('button',{name:'Salvar rascunho',exact:true}).click();
  await expect(page.getByRole('status')).toContainText('Não foi possível verificar o salvamento.');
  const proof=requests[0].proof;
  expect(proof).toMatch(/^[a-f0-9]{64}$/);
  const proofHeaders={'X-Environmental-Initiator-Proof':proof!};
  await context.addCookies([{name:'auth_token',value:signSessionToken(F.userIds[1]),url:String(info.project.use.baseURL)}]);
  const changedPrincipalRead=await context.request.get(api+'/draft',{headers:proofHeaders});
  expect(changedPrincipalRead.status()).toBe(403);
  expect((await changedPrincipalRead.json()).error.code).toBe('FORBIDDEN');
  const changedPrincipalDiscard=await context.request.delete(api+'/draft',{headers:proofHeaders,data:{draftId:originalId,expectedRevision:originalRevision}});
  expect(changedPrincipalDiscard.status()).toBe(403);
  const forbidden=page.waitForResponse(r=>r.request().method()==='PUT'&&r.url().endsWith('/draft'));
  await page.getByRole('button',{name:'Repetir salvamento',exact:true}).click();
  expect((await forbidden).status()).toBe(403);
  expect((await (await context.request.get(api+'/draft')).json()).draft).toBeNull();
  await expect(page.getByLabel('Elevação')).toBeDisabled();
  await context.addCookies([{name:'auth_token',value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);
  const originalPrincipalRead=await context.request.get(api+'/draft',{headers:proofHeaders});
  expect(originalPrincipalRead.status()).toBe(200);
  const originalDraft=(await originalPrincipalRead.json()).draft;
  expect(originalDraft.id).toBe(originalId);expect(originalDraft.revision).toBe(originalRevision);
  const recovered=page.waitForResponse(r=>r.request().method()==='PUT'&&r.url().endsWith('/draft'));
  await page.getByRole('button',{name:'Repetir salvamento',exact:true}).click();
  expect((await recovered).status()).toBe(200);
  const result=(await (await context.request.get(api+'/draft',{headers:proofHeaders})).json()).draft;
  expect(result.id).toBe(originalId);expect(result.revision).toBe(originalRevision);
  expect(requests).toHaveLength(3);expect(requests[1]).toEqual(requests[0]);expect(requests[2]).toEqual(requests[0]);
  const originalPrincipalDiscard=await context.request.delete(api+'/draft',{headers:proofHeaders,data:{draftId:originalId,expectedRevision:originalRevision}});
  expect(originalPrincipalDiscard.status()).toBe(204);
  expect((await (await context.request.get(api+'/draft',{headers:proofHeaders})).json()).draft).toBeNull();
});

for(const persistBeforeLoss of [false,true]){
  test('P1: tentativa de confirmar dados de A nao pode ser confirmada sob a sessao B'+(persistBeforeLoss?' apos persistencia e resposta perdida':''),async({page,context},info)=>{
    await login(context,info);
    expect((await countEnvironmentalFixtures(process.env)).measurements).toBe(0);
    await page.goto(base+'/new');await fillValid(page);
    let originalId='';const requests:Array<{body:string|null;key:string|undefined;proof:string|undefined}>=[];
    await page.route('**'+api,async route=>{
      if(route.request().method()!=='POST'){await route.continue();return;}
      requests.push({body:route.request().postData(),key:route.request().headers()['idempotency-key'],proof:route.request().headers()['x-environmental-initiator-proof']});
      if(requests.length===1){
        if(persistBeforeLoss){
          const committed=await route.fetch();expect(committed.status()).toBe(201);
          originalId=(await committed.json()).environmentalData.id;
          expect(originalId).toBeTruthy();
        }
        await route.abort('failed');
      }else await route.continue();
    });
    await page.getByRole('button',{name:'Revisar dados',exact:true}).click();
    await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
    await expect(page.getByRole('article',{name:'Registrar dados ambientais'}).getByRole('alert')).toBeVisible();
    expect((await countEnvironmentalFixtures(process.env)).measurements).toBe(persistBeforeLoss?1:0);
    await context.addCookies([{name:'auth_token',value:signSessionToken(F.userIds[1]),url:String(info.project.use.baseURL)}]);
    const forbidden=page.waitForResponse(r=>r.request().method()==='POST'&&r.url().endsWith(api));
    await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
    expect((await forbidden).status()).toBe(403);
    await expect(page.getByRole('button',{name:'Voltar ao formulário',exact:true})).toBeDisabled();
    // B may read the lab's shared dataset, but cannot replay A's frozen attempt.
    const sharedRead=await context.request.get(api);expect(sharedRead.status()).toBe(200);
    const sharedData=(await sharedRead.json()).environmentalData;
    if(persistBeforeLoss)expect(sharedData.id).toBe(originalId);
    else expect(sharedData).toBeNull();
    expect((await countEnvironmentalFixtures(process.env)).measurements).toBe(persistBeforeLoss?1:0);
    await context.addCookies([{name:'auth_token',value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);
    const confirmed=page.waitForResponse(r=>r.request().method()==='POST'&&r.url().endsWith(api));
    await page.getByRole('button',{name:'Confirmar dados ambientais',exact:true}).click();
    const response=await confirmed;expect(response.status()).toBe(persistBeforeLoss?200:201);
    if(persistBeforeLoss)expect((await response.json()).environmentalData.id).toBe(originalId);
    await expect(page).toHaveURL(base);
    expect(requests).toHaveLength(3);expect(requests[1]).toEqual(requests[0]);expect(requests[2]).toEqual(requests[0]);
    const recovered=(await (await context.request.get(api)).json()).environmentalData;
    expect(recovered.id).toBeTruthy();
    if(persistBeforeLoss)expect(recovered.id).toBe(originalId);
    expect((await countEnvironmentalFixtures(process.env)).measurements).toBe(1);
  });
}
