import { expect,test } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { DRAFT_VERSION } from "../../src/types/environmental-draft";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { ENVIRONMENTAL_FIXTURES as F,setupEnvironmentalFixtures,cleanupEnvironmentalFixtures,countEnvironmentalFixtures } from "../fixtures/environmental-data-fixtures";
test.describe.configure({mode:"serial"});test.setTimeout(90000);
test.beforeAll(async()=>setupEnvironmentalFixtures(process.env));
test.afterAll(async()=>{await cleanupEnvironmentalFixtures(process.env);expect(Object.values(await countEnvironmentalFixtures(process.env)).every(n=>n===0)).toBe(true);});
const base=`/dashboard/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}/collections/${F.collectionIds[0]}/environmental-data`;
const api=base.replace("/dashboard/","/api/");
test("unsaved browser history cancellation preserves fields and excessive raw gives feedback",async({page,context},info)=>{
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);
 await page.goto(base);await page.getByRole("link",{name:"Registrar dados ambientais",exact:true}).click();await expect(page).toHaveURL(base+"/new");
 await page.getByLabel("Elevação").click();await page.getByLabel("Elevação").fill("25");await expect(page.getByRole("status")).toContainText("Há alterações não salvas.");
 page.once("dialog",d=>d.dismiss());await page.evaluate(()=>history.back());
 await expect(page).toHaveURL(base+"/new");await expect(page.getByLabel("Elevação")).toHaveValue("25");
 page.once("dialog",d=>d.accept());await page.getByRole("button",{name:"Recarregar rascunho",exact:true}).click();await expect(page.getByLabel("Elevação")).toHaveValue("");
 await page.getByRole("link",{name:"Cancelar",exact:true}).click();await expect(page).toHaveURL(base);await page.goBack();await expect(page).toHaveURL(base+"/new");
 await page.getByLabel("Elevação").fill("25");await expect(page.getByRole("status")).toContainText("Há alterações não salvas.");
 const index=await page.evaluate(()=>(window as unknown as {navigation:{currentEntry:{index:number}}}).navigation.currentEntry.index);
 page.once("dialog",d=>d.dismiss());await page.evaluate(()=>history.forward());await expect(page).toHaveURL(base+"/new");await expect(page.getByLabel("Elevação")).toHaveValue("25");expect(await page.evaluate(()=>(window as unknown as {navigation:{currentEntry:{index:number}}}).navigation.currentEntry.index)).toBe(index);
 const limitError=page.getByRole("alert").filter({hasText:"Cada campo do rascunho"});
 await page.getByLabel("Elevação").fill("1".repeat(1001));await page.getByRole("button",{name:"Salvar rascunho",exact:true}).click();await expect(limitError).toContainText("até 1000 caracteres");
 await page.getByLabel("Elevação").fill("25");const savedResponse=page.waitForResponse(r=>r.url().endsWith("/draft")&&r.request().method()==="PUT");await page.getByRole("button",{name:"Salvar rascunho",exact:true}).click();const saved=await savedResponse;expect(saved.status(),JSON.stringify(await saved.json())).toBe(200);await expect(page.getByRole("status")).toContainText("Rascunho salvo.");await expect(limitError).toHaveCount(0);
 page.once("dialog",d=>d.accept());await page.getByRole("button",{name:"Descartar rascunho",exact:true}).click();await expect(page.getByRole("status")).toContainText("descartado definitivamente");await page.getByRole("link",{name:"Cancelar",exact:true}).click();await expect(page).toHaveURL(base);
});
test("personal draft retries a lost save, resumes partial values, resolves two-tab conflict, discards and confirms on mobile",async({page,context},info)=>{
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);
 await page.goto(base+"/new");await page.getByLabel("Há nascente").selectOption("false");await page.getByLabel("Taxa de infiltração").fill("0");await page.getByLabel("Elevação").fill("12.");
 let lost=false;const keys:string[]=[];
 await page.route("**/draft",async route=>{if(route.request().method()!=="PUT"){await route.continue();return;}keys.push(route.request().postDataJSON().saveKey);if(!lost){lost=true;await route.fetch();await route.abort("failed");}else await route.continue();});
 await page.getByRole("button",{name:"Salvar rascunho",exact:true}).click();await expect(page.getByText("Não foi possível verificar o salvamento.")).toBeVisible();await expect(page.getByLabel("Elevação")).toBeDisabled();
 await page.getByRole("button",{name:"Repetir salvamento",exact:true}).click();await expect(page.getByRole("status")).toContainText("Rascunho salvo.");expect(keys).toHaveLength(2);expect(keys[0]).toBe(keys[1]);
 await page.reload();await expect(page.getByLabel("Há nascente")).toHaveValue("false");await expect(page.getByLabel("Taxa de infiltração")).toHaveValue("0");await expect(page.getByLabel("Elevação")).toHaveValue("12.");
 const second=await context.newPage();await second.goto(base+"/new");
 await page.getByLabel("Elevação").fill("20");await page.getByRole("button",{name:"Salvar rascunho",exact:true}).click();await expect(page.getByRole("status")).toContainText("Rascunho salvo.");
 await second.getByLabel("Elevação").fill("30");await second.getByRole("button",{name:"Salvar rascunho",exact:true}).click();await expect(second.getByRole("status")).toContainText("mudou em outra sessão");await expect(second.getByLabel("Elevação")).toHaveValue("30");
 second.once("dialog",d=>d.accept());await second.getByRole("button",{name:"Recarregar rascunho",exact:true}).click();await expect(second.getByLabel("Elevação")).toHaveValue("20");
 second.once("dialog",d=>d.dismiss());await second.getByRole("button",{name:"Descartar rascunho",exact:true}).click();expect((await (await second.request.get(api+"/draft")).json()).draft).not.toBeNull();
 second.once("dialog",d=>d.accept());await second.getByRole("button",{name:"Descartar rascunho",exact:true}).click();await expect(second.getByRole("status")).toContainText("descartado definitivamente");await expect(second.getByLabel("Elevação")).toHaveValue("");
 await second.setViewportSize({width:390,height:844});
 for(const [label,value] of [["Fonte de água","RIVER_STREAM"],["Há nascente","false"],["Disponibilidade hídrica","PERMANENT"],["Textura do solo","SANDY"],["Compactação","LOW"],["Sinais de erosão","NONE"],["Fragmentação","LOW"],["Degradação da paisagem","LOW"]])await second.getByLabel(label).selectOption(value);
 await second.getByLabel("Taxa de infiltração").fill("0");await second.getByLabel("Cobertura vegetal").fill("0");
 await second.getByRole("button",{name:"Salvar rascunho",exact:true}).focus();await second.keyboard.press("Enter");await expect(second.getByRole("status")).toContainText("Rascunho salvo.");
 expect(await second.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await second.screenshot({path:info.outputPath("draft-mobile.png"),fullPage:true});
 await second.getByRole("button",{name:"Revisar dados",exact:true}).click();await expect(second.getByRole("heading",{name:"Revisar dados ambientais"})).toBeFocused();await second.getByRole("button",{name:"Confirmar dados ambientais",exact:true}).click();
 await expect(second).toHaveURL(base);await expect(second.getByText("Conjunto confirmado e imutável.")).toBeVisible();expect((await (await second.request.get(api+"/draft")).json()).draft).toBeNull();await page.close();await second.close();
});
test("outsider cannot read draft and inactive laboratory offers only reading",async({page,context},info)=>{
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[3]),url:String(info.project.use.baseURL)}]);expect((await page.request.get(api+"/draft")).status()).toBe(404);
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[0]),url:String(info.project.use.baseURL)}]);
 await page.goto(`/dashboard/laboratories/${F.laboratoryIds[1]}/areas/${F.areaIds[1]}/collections/${F.collectionIds[1]}/environmental-data/new`);await expect(page.getByText("Laboratório inativo — somente leitura.",{exact:true})).toBeVisible();await expect(page.getByRole("button",{name:"Salvar rascunho",exact:true})).toHaveCount(0);
});

for(const withBaseline of [false,true])test(`slow hydration preserves the first draft save and reload (${withBaseline?"absent and blank baseline":"new draft"})`,async({page,context},info)=>{
 await setupEnvironmentalFixtures(process.env);
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);
 const baseline=withBaseline?{"water.salinityIndicator":{kind:"absent"},"vegetation.hasRiparianApp":{kind:"editing",raw:""}}:{};
 if(withBaseline){
  const seeded=await page.request.put(api+"/draft",{headers:{Origin:String(info.project.use.baseURL),"Sec-Fetch-Site":"same-origin"},data:{draftId:null,expectedRevision:0,saveKey:randomUUID(),formVersion:DRAFT_VERSION,fields:baseline}});
  expect(seeded.status()).toBe(200);
 }
 let release!:()=>void;const scriptsReady=new Promise<void>(resolve=>{release=resolve;});let blockedScripts=0;
 await page.route(url=>url.pathname.startsWith("/_next/static/")&&url.pathname.endsWith(".js"),async route=>{blockedScripts++;await scriptsReady;await route.continue();});
 const spring=page.getByLabel("Há nascente"),infiltration=page.getByLabel("Taxa de infiltração"),elevation=page.getByLabel("Elevação");
 const save=page.getByRole("button",{name:"Salvar rascunho",exact:true});
 try{
  await page.goto(base+"/new",{waitUntil:"commit"});await expect(spring).toBeVisible();
  expect(blockedScripts).toBeGreaterThan(0);
  await expect(spring).toBeDisabled();await expect(infiltration).toBeDisabled();await expect(elevation).toBeDisabled();
  await expect(save).toBeDisabled();await expect(page.getByRole("button",{name:"Recarregar rascunho",exact:true})).toBeDisabled();
  await expect(page.getByRole("button",{name:"Revisar dados",exact:true})).toBeDisabled();
  await expect(spring).toHaveValue("");
 }finally{release();}
 await expect(spring).toBeEnabled();await spring.selectOption("false");await infiltration.fill("0");await elevation.fill("12.");
 const requested=page.waitForRequest(r=>r.url().endsWith("/draft")&&r.method()==="PUT");
 const responded=page.waitForResponse(r=>r.url().endsWith("/draft")&&r.request().method()==="PUT");
 await save.click();const body=(await requested).postDataJSON(),response=await responded;
 const fields={...baseline,"water.hasSpring":{kind:"editing",raw:"false"},"soil.infiltrationRateMmPerHour":{kind:"editing",raw:"0"},"terrain.elevationMeters":{kind:"editing",raw:"12."}};
 expect(body.formVersion).toBe(DRAFT_VERSION);expect(body.expectedRevision).toBe(withBaseline?1:0);expect(body.fields).toEqual(fields);
 if(!withBaseline)expect(body.draftId).toBeNull();
 expect(response.status()).toBe(200);const result=await response.json();expect(result.draft.fields).toEqual(fields);expect(result.draft.revision).toBe(withBaseline?2:1);
 await expect(page.getByRole("status")).toContainText("Rascunho salvo.");
 const persisted=await page.request.get(api+"/draft");expect(persisted.status()).toBe(200);expect((await persisted.json()).draft.fields).toEqual(fields);
 await page.reload();await expect(spring).toBeEnabled();await expect(spring).toHaveValue("false");await expect(infiltration).toHaveValue("0");await expect(elevation).toHaveValue("12.");
 await expect(page.getByLabel("Indicador de salinidade")).toHaveValue("");await expect(page.getByLabel("Presença de APP ripária")).toHaveValue("");
 const resumed=await page.request.get(api+"/draft");expect((await resumed.json()).draft.fields).toEqual(fields);
 await info.attach("first-save-payload",{body:Buffer.from(JSON.stringify({fields:body.fields,expectedRevision:body.expectedRevision,persistedRevision:result.draft.revision})),contentType:"application/json"});
});
