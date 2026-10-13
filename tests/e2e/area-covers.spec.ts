import {expect,test} from "@playwright/test";
import sharp from "sharp";
import {signSessionToken} from "../../src/app/api/server/auth/session";
import {ENVIRONMENTAL_FIXTURES as F,setupEnvironmentalFixtures,cleanupEnvironmentalFixtures,countEnvironmentalFixtures} from "../fixtures/environmental-data-fixtures";
test.describe.configure({mode:"serial"});
test.beforeAll(async()=>setupEnvironmentalFixtures(process.env));test.afterAll(async()=>{await cleanupEnvironmentalFixtures(process.env);expect(Object.values(await countEnvironmentalFixtures(process.env)).every(n=>n===0)).toBe(true);});
const area=`/dashboard/laboratories/${F.laboratoryIds[0]}/areas/${F.areaIds[0]}`,api=area.replace("/dashboard/","/api/")+"/image";
test("cover UI fake: invalid input, lost response retry, mobile keyboard replacement/removal and private preview",async({page,context},info)=>{
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[0]),url:String(info.project.use.baseURL)}]);let revision=0,hasImage=false,failed=true;const keys:string[]=[],ids:string[]=[];
 const image=await sharp({create:{width:30,height:20,channels:3,background:"#326646"}}).png().toBuffer();
 // All Cloudinary requests are intercepted; server behavior is covered separately
 // by Pg/provider integration tests. This E2E proves the rendered UI contract.
 await page.route("https://api.cloudinary.com/**",r=>r.fulfill({status:200,contentType:"application/json",body:'{"ignored":"client metadata"}'}));
 await page.route(url=>url.pathname===api||url.pathname.startsWith(api+"/"),async r=>{
  const path=new URL(r.request().url()).pathname,method=r.request().method();
  if(path===api&&method==="GET")return r.fulfill({json:{image:{revision,hasImage},canEdit:true}});
  if(path===api&&method==="DELETE"){expect(r.request().postDataJSON()).toEqual({expectedRevision:revision});revision++;hasImage=false;return r.fulfill({status:204});}
  if(path===api+"/content")return r.fulfill({status:200,contentType:"image/png",body:image});
  if(path===api+"/uploads"){keys.push(r.request().postDataJSON().key);return r.fulfill({json:{attemptId:"00000000-0000-4000-8000-000000000991",expiresAt:new Date(Date.now()+600000).toISOString(),upload:{url:"https://api.cloudinary.com/v1_1/synthetic/image/upload",params:{signature:"synthetic-only"}}}});}
  if(path.endsWith("/confirm")){expect(r.request().postDataJSON()).toEqual({});ids.push(path);if(failed){failed=false;return r.abort("failed");}revision++;hasImage=true;return r.fulfill({json:{image:{revision,hasImage},canEdit:true}});}
  await r.continue();
 });
 await page.goto(area);const panel=page.getByRole("region",{name:"Capa da área"});await expect(panel.getByText("Área sem capa.",{exact:true})).toBeVisible();
 await panel.getByLabel("Selecionar capa",{exact:true}).setInputFiles({name:"fake.txt",mimeType:"text/plain",buffer:Buffer.from("fake")});await expect(panel.getByRole("alert")).toContainText("JPEG");
 await panel.getByLabel("Selecionar capa",{exact:true}).setInputFiles({name:"synthetic.png",mimeType:"image/png",buffer:image});await panel.getByRole("button",{name:"Enviar capa",exact:true}).click();await expect(panel.getByRole("alert")).toBeVisible();await panel.getByRole("button",{name:"Tentar envio novamente",exact:true}).click();await expect(panel.getByRole("status")).toContainText("Capa salva.");expect(keys).toHaveLength(1);expect(ids).toHaveLength(2);expect(ids[0]).toBe(ids[1]);
 await expect(panel.getByRole("img")).toBeVisible();expect(await panel.getByRole("img").getAttribute("src")).toContain(api+"/content");expect(await panel.getByRole("img").getAttribute("src")).not.toContain("res.cloudinary.com");
 await page.setViewportSize({width:390,height:844});await panel.getByLabel("Substituir capa",{exact:true}).setInputFiles({name:"synthetic-next.png",mimeType:"image/png",buffer:image});await panel.getByRole("button",{name:"Enviar capa",exact:true}).focus();await page.keyboard.press("Enter");await expect(panel.getByRole("status")).toContainText("Capa salva.");expect(revision).toBe(2);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath("area-cover-mobile.png"),fullPage:true});
 page.once("dialog",d=>d.dismiss());await panel.getByRole("button",{name:"Remover capa",exact:true}).click();expect(hasImage).toBe(true);page.once("dialog",d=>d.accept());await panel.getByRole("button",{name:"Remover capa",exact:true}).click();await expect(panel.getByRole("status")).toContainText("Capa removida.");await expect(panel.getByText("Área sem capa.",{exact:true})).toBeVisible();
});
test("member has reading/fallback only and outsider receives contextual HTTP refusal",async({page,context},info)=>{
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[2]),url:String(info.project.use.baseURL)}]);
 await page.route("**/image",r=>r.fulfill({json:{image:{revision:1,hasImage:true},canEdit:false}}));await page.route("**/image/content**",r=>r.fulfill({status:404}));await page.goto(area);const panel=page.getByRole("region",{name:"Capa da área"});await expect(panel.getByText("Capa indisponível.",{exact:true})).toBeVisible();await expect(panel.getByRole("button",{name:"Enviar capa",exact:true})).toHaveCount(0);await expect(panel.getByRole("button",{name:"Remover capa",exact:true})).toHaveCount(0);
 await page.unrouteAll({behavior:"wait"});await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[3]),url:String(info.project.use.baseURL)}]);expect((await page.request.get(api)).status()).toBe(404);expect((await page.request.get(api+"/content")).status()).toBe(404);
});

// RC-UI-001: same persisted revision must allow a new content attempt after 503.
// The UI is real; only metadata/content provider responses are controlled.
test("reloading a temporarily unavailable cover retries its content at the same revision",async({page,context},info)=>{
 await context.addCookies([{name:"auth_token",value:signSessionToken(F.userIds[0]),url:String(info.project.use.baseURL)}]);
 const image=await sharp({create:{width:30,height:20,channels:3,background:"#326646"}}).png().toBuffer();
 let contentRequests=0,metadataRequests=0;const observedRevisions:string[]=[];
 await page.route(url=>url.pathname===api||url.pathname===api+"/content",async route=>{
  const url=new URL(route.request().url());
  if(url.pathname===api){metadataRequests++;return route.fulfill({json:{image:{revision:1,hasImage:true},canEdit:false},headers:{"Cache-Control":"private, no-store"}});}
  contentRequests++;observedRevisions.push(url.searchParams.get("revision")??"");
  if(contentRequests===1||contentRequests===3)return route.fulfill({status:503,headers:{"Cache-Control":"private, no-store"}});
  return route.fulfill({status:200,contentType:"image/png",body:image,headers:{"Cache-Control":"private, no-store"}});
 });
 await page.goto(area);const panel=page.getByRole("region",{name:"Capa da área"});
 await expect(panel.getByText("Capa indisponível.",{exact:true})).toBeVisible();
 expect(contentRequests).toBe(1);const reload=panel.getByRole("button",{name:"Recarregar capa",exact:true});
 await reload.click();
 await expect(panel.getByRole("status")).toHaveText("Capa recarregada.");
 await expect(panel.getByRole("img")).toBeVisible();
 expect(await panel.getByRole("img").evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 expect(contentRequests).toBe(2);
 // A new temporary failure must still permit a subsequent retry.
 await reload.click();
 await expect(panel.getByText("Capa indisponível.",{exact:true})).toBeVisible();
 await expect(panel.getByRole("status")).toContainText("Tente novamente.");
 expect(contentRequests).toBe(3);
 await reload.click();
 await expect(panel.getByRole("status")).toHaveText("Capa recarregada.");
 expect(await panel.getByRole("img").evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 expect(contentRequests).toBe(4);expect(metadataRequests).toBeGreaterThanOrEqual(4);
 expect(observedRevisions).toEqual(["1","1","1","1"]);
 expect(await panel.getByRole("img").getAttribute("src")).toContain(api+"/content?revision=1");
});
