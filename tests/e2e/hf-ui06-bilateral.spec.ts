import { test, expect, type BrowserContext, type Page, type CDPSession } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../fixtures/auth-users";
import { createAreaFixtureClient } from "../fixtures/areas";

test.describe.configure({ mode: "serial" });
test.use({ trace: "off", video: "off", screenshot: "off" });
test.setTimeout(15 * 60_000);

const BASE = "6c61056fe1dc2193e225d935f49b78cb6c6781ed";
const PRODUCT_TREE = "a585087dbbe9294c18922e3397c2561f245446c9";
const STARTER_SHA = "cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f";
const STARTER = "http://127.0.0.1:4173";
const FULLSTACK = "http://127.0.0.1:3001";
const archive = join(process.cwd(), ".accounts-validation", "ui06");
const actor = AUTH_FIXTURE_USERS[0];
const labName = "HF UI06 synthetic laboratory";
const viewports = [[320,900],[375,900],[390,844],[768,900],[1440,900],[667,375],[844,390]] as const;
const matrix = viewports.flatMap(([width,height]) =>
  [100,200].flatMap(scale => [0,34].map(inset => ({ width,height,scale,inset,
    id: [width,height,scale,inset].join("-") }))));
type MatrixCase = typeof matrix[number];
type Source = "fullstack" | "starter";
type Font = { familyName: string; isCustomFont: boolean; glyphCount: number };
type Runtime = {
  source: Source; context: BrowserContext; page: Page; cdp: CDPSession;
  code: { sha: string; tree: string }; blocked: Map<string, object>;
  labPath: string | null; laboratoryRole: "OWNER" | null; roleProof: object;
};
const runtimes: Runtime[] = [];
const db = () => createAreaFixtureClient(process.env);
const report = {
  status: "IN_PROGRESS", ui06BilateralPass: false, globalUi06: "PENDING_B_AREA_COLLECTION_IHFR",
  expected: { combinations:28, statesPerCombination:12, pairs:336, png:672, sampleJson:672 },
  operations: { fixtureSetups:0, browserContexts:0, logins:0, labCreations:0, reloads:0 },
  reloadSampling: "One actual reload per runtime, then all 28 post-reload layouts; not 28 reload operations.",
  cleanup: "NOT_RUN", pairs: [] as object[], startedUtc: new Date().toISOString(),
};
let ownsArchive = false;
let ownsFixture = false;
let fullstackLabId: string | null = null;
let completed = false;

function identity(cwd: string) {
  const run = (ref: string) => execFileSync("git",["rev-parse",ref],{cwd,encoding:"utf8"}).trim();
  return { sha:run("HEAD"), tree:run("HEAD^{tree}") };
}
async function saveReport() {
  if (ownsArchive) await writeFile(join(archive,"manifest.json"),JSON.stringify(report,null,2)+"\n");
}
async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}
async function configure(runtime: Runtime, c: MatrixCase) {
  await runtime.page.setViewportSize({width:c.width,height:c.height});
  await runtime.page.evaluate(scale => document.documentElement.style.setProperty("font-size",scale+"%","important"),c.scale);
  // Keep this CDP session alive: applying an inset after focus can invalidate its geometry.
  await runtime.cdp.send("Emulation.setSafeAreaInsetsOverride",{insets:{bottom:c.inset,bottomMax:c.inset}});
  await runtime.page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo({top:0,left:0,behavior:"instant"});
    for (const id of ["application-content","conteudo","application-navigation"])
      document.getElementById(id)?.scrollTo({top:0,left:0,behavior:"instant"});
  });
  await settle(runtime.page);
}
async function platformFonts(runtime: Runtime, selector: string): Promise<Font[]> {
  const {root} = await runtime.cdp.send("DOM.getDocument");
  const {nodeId} = await runtime.cdp.send("DOM.querySelector",{nodeId:root.nodeId,selector});
  if (!nodeId) return [];
  const result = await runtime.cdp.send("CSS.getPlatformFontsForNode",{nodeId});
  return result.fonts.map(({familyName,isCustomFont,glyphCount}) => ({familyName,isCustomFont,glyphCount}));
}
async function sample(runtime: Runtime, c: MatrixCase, requestedState: string, actualState = requestedState) {
  await settle(runtime.page);
  const header = runtime.source === "fullstack" ? "#application-header" : "header";
  const main = runtime.source === "fullstack" ? "#application-content" : "#conteudo";
  const fonts = { header:await platformFonts(runtime,header), main:await platformFonts(runtime,main) };
  const geometry = await runtime.page.evaluate(({header,main}) => {
    const rect = (node: Element | null) => node ? (() => {
      const r=node.getBoundingClientRect(); return {top:r.top,right:r.right,bottom:r.bottom,left:r.left,width:r.width,height:r.height};
    })() : null;
    const rail = [...document.querySelectorAll("nav")].find(node =>
      getComputedStyle(node).position === "fixed" && node.getBoundingClientRect().height > 0);
    const focus = document.activeElement;
    const box = focus?.getBoundingClientRect();
    const hit = box && box.width > 0 && box.height > 0
      ? document.elementFromPoint(box.left+box.width/2,box.top+box.height/2) : null;
    return {
      width:innerWidth,height:innerHeight,devicePixelRatio,
      rootFontPx:parseFloat(getComputedStyle(document.documentElement).fontSize),
      computedFont:getComputedStyle(document.body).fontFamily,
      overflow:document.documentElement.scrollWidth > innerWidth,
      header:rect(document.querySelector(header)),main:rect(document.querySelector(main)),rail:rect(rail ?? null),
      railPaddingBottom:rail ? parseFloat(getComputedStyle(rail).paddingBottom) : null,
      focus:{tag:focus?.tagName ?? null,rect:rect(focus),centerHit:!!focus && !!hit && (focus===hit || focus.contains(hit))},
    };
  },{header,main});
  expect(geometry.rootFontPx).toBe(c.scale===200 ? 32 : 16);
  expect(geometry.devicePixelRatio).toBe(1);
  const mask = await runtime.page.locator("input,textarea").all();
  const png = await runtime.page.screenshot({fullPage:false,animations:"disabled",mask});
  expect(png.readUInt32BE(16)).toBe(c.width);
  expect(png.readUInt32BE(20)).toBe(c.height);
  const name = runtime.source+"-"+c.id+"-"+requestedState;
  const metadata = {
    source:runtime.source,...runtime.code,frozenComposition:BASE,frozenProductTree:PRODUCT_TREE,
    run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,
    viewport:{width:c.width,height:c.height},textScale:c.scale,safeAreaBottom:c.inset,
    requestedState,actualState,fixture:{synthetic:true,globalRole:"USER",laboratoryRole:runtime.laboratoryRole,
      areas:0,collections:0,roleProof:runtime.roleProof},
    fullPage:false,maskedInputs:mask.length,...geometry,fontsActuallyRendered:fonts,
    blockedRequests:[...runtime.blocked.values()],route:new URL(runtime.page.url()).pathname,
    pngSha256:createHash("sha256").update(png).digest("hex"),
  };
  const json=Buffer.from(JSON.stringify(metadata,null,2)+"\n");
  await writeFile(join(archive,name+".png"),png,{flag:"wx"});
  await writeFile(join(archive,name+".json"),json,{flag:"wx"});
  return {png:name+".png",json:name+".json",geometry,fonts,
    pngSha256:metadata.pngSha256,jsonSha256:createHash("sha256").update(json).digest("hex")};
}
async function pair(c: MatrixCase, state: string, unavailable = false, reload = false) {
  const accountUnavailable=unavailable || state.includes("-account-");
  const samples = [];
  for (const runtime of runtimes) {
    const actual = runtime.source==="starter" && accountUnavailable ? "reference-account-UNAVAILABLE"
      : runtime.source==="starter" && reload ? "reload-resource-not-found" : state;
    samples.push(await sample(runtime,c,state,actual));
  }
  const reasons: string[] = [];
  if (accountUnavailable) reasons.push("ACCOUNT_DISCLOSURE_ABSENT_IN_PINNED_STARTER");
  if (reload) reasons.push("REFERENCE_CREATED_LAB_LOST_AFTER_RELOAD");
  for (const region of ["header","main"] as const) {
    const primary = samples.map(item => [...item.fonts[region]].sort((a,b)=>b.glyphCount-a.glyphCount)[0]?.familyName ?? "");
    if (primary.some(name=>!/poppins/i.test(name))) reasons.push("POPPINS_NOT_OBSERVED_"+region.toUpperCase());
    if (primary[0].toLowerCase()!==primary[1].toLowerCase()) reasons.push("OBSERVED_FONT_MISMATCH_"+region.toUpperCase());
  }
  report.pairs.push({case:c,state,classification:reasons.length ? "NON_EQUIVALENT" : "COMPARABLE_NOT_ACCEPTED",
    reasons:[...new Set(reasons)],samples:samples.map(({png,json,pngSha256,jsonSha256})=>({png,json,pngSha256,jsonSha256}))});
  await saveReport();
}
async function account(runtime: Runtime, open: boolean) {
  if (runtime.source==="starter") {
    await expect(runtime.page.getByRole("button",{name:"Conta",exact:true})).toHaveCount(0);
    return;
  }
  const control=runtime.page.getByRole("button",{name:"Conta",exact:true});
  if (open) {
    await control.focus(); await runtime.page.keyboard.press("Enter");
    await expect(control).toHaveAttribute("aria-expanded","true");
    await expect(runtime.page.getByRole("link",{name:"Alterar senha",exact:true})).toBeVisible();
  } else {
    await control.press("Escape");
    await expect(control).toHaveAttribute("aria-expanded","false");
    await expect(control).toBeFocused();
  }
}
async function dashboardReady(runtime: Runtime) {
  if (runtime.source==="fullstack") {
    await expect(runtime.page.locator("#summary-title")).toHaveText(labName);
    await expect(runtime.page.getByText("Nenhuma atividade elegível neste laboratório.",{exact:true})).toBeVisible();
  } else {
    await expect(runtime.page.getByRole("heading",{name:"Atividade e gerenciamento",exact:true})).toBeVisible();
    await expect(runtime.page.getByText("Nenhuma atividade ainda",{exact:true})).toBeVisible();
  }
}
async function areasReady(runtime: Runtime) {
  const heading=runtime.source==="fullstack" ? "Áreas Monitoradas" : "Áreas monitoradas";
  await expect(runtime.page.getByRole("heading",{name:heading,exact:true})).toBeVisible();
  await expect(runtime.page.getByText("Nenhuma área cadastrada",{exact:true})).toBeVisible();
}

test.beforeAll(async () => {
  test.setTimeout(60_000);
  if (process.env.GITHUB_ACTIONS!=="true" || process.env.RUNNER_OS!=="Windows" || process.env.GITHUB_RUN_ATTEMPT!=="1")
    throw new Error("Focal runtime is restricted to the authorized ephemeral Windows Actions attempt.");
  expect(identity(process.cwd()).sha).toBe(process.env.GITHUB_SHA);
  expect(identity(join(process.cwd(),"../starter")).sha).toBe(STARTER_SHA);
  if (existsSync(archive)) throw new Error("UI06 archive already exists; evidence must never be reused.");
  await mkdir(archive); ownsArchive=true; // Parent exists from the official RegressionSetup.
  expect(await countAuthFixtureUsers(process.env)).toBe(0);
  ownsFixture=true; // Guards passed and no official fixture IDs existed before setup.
  await runAuthFixtureCommand("setup",process.env); report.operations.fixtureSetups++;
  const client=db();
  try {
    // Match only synthetic display names to the fixed native starter persona. Never update a role.
    await client.user.update({where:{id:actor.id},data:{firstName:"Marcos",lastName:"Lima"}});
    const user=await client.user.findUniqueOrThrow({where:{id:actor.id}});
    expect(user.role).toBe("USER"); expect(user.status).toBe("ACTIVE");
    expect(await client.researchersLinked.count({where:{userId:actor.id}})).toBe(0);
  } finally { await client.$disconnect(); }
  await saveReport();
});

test("UI06: shared real fixtures, 28 combinations and explicit non-equivalence",async ({browser},info) => {
  expect(matrix).toHaveLength(28);
  expect(new Set(matrix.map(c=>c.id)).size).toBe(28);
  expect(info.project.use.baseURL).toBe(FULLSTACK);
  for (const source of ["fullstack","starter"] as const) {
    const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,
      timezoneId:"America/Fortaleza",locale:"pt-BR",reducedMotion:"reduce",serviceWorkers:"block"});
    report.operations.browserContexts++;
    const page=await context.newPage();
    const cdp=await context.newCDPSession(page);
    const runtime:Runtime={source,context,page,cdp,code:identity(source==="fullstack" ? process.cwd() : join(process.cwd(),"../starter")),
      blocked:new Map(),labPath:null,laboratoryRole:null,roleProof:{globalRole:"USER",membership:"NONE_WORKSPACE_EMPTY"}};
    runtimes.push(runtime); // Ensure teardown sees the context even if login fails.
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    await context.route("**/*",async route => {
      const url=new URL(route.request().url());
      if ([FULLSTACK,STARTER,"https://fonts.googleapis.com","https://fonts.gstatic.com"].includes(url.origin))
        return route.continue();
      if (["data:","blob:","about:"].includes(url.protocol)) return route.continue();
      const record={origin:url.origin,path:url.pathname,method:route.request().method()};
      runtime.blocked.set(JSON.stringify(record),record);
      await route.abort(); // No query, fragment, body, headers or storage archived.
    });
    await page.goto((source==="fullstack" ? FULLSTACK : STARTER)+"/login");
    if (source==="fullstack") {
      if (!process.env.E2E_USER_PASSWORD) throw new Error("Official synthetic login password missing.");
      // Real native authentication contract; the bound request context receives the cookie.
      // Avoid password fill call logs and never rethrow transport details/headers/body.
      let response;
      try {
        response=await context.request.post(FULLSTACK+"/api/auth/sign-in",
          {data:{email:actor.email,password:process.env.E2E_USER_PASSWORD}});
      } catch { throw new Error("Native sign-in transport failed without exposing credentials."); }
      expect(response.status()).toBe(200);
      await page.goto(FULLSTACK+"/workspace");
    } else {
      await page.getByRole("button",{name:"Conta sem laboratório — Marcos",exact:true}).click();
      await expect(page.getByRole("status").filter({hasText:/preenchidos/})).toBeVisible();
      await page.getByRole("button",{name:"Entrar",exact:true}).click();
    }
    report.operations.logins++;
    await expect(page).toHaveURL((source==="fullstack" ? FULLSTACK : STARTER)+"/workspace");
    if (source==="fullstack") await expect(page.getByLabel("Nome do laboratório",{exact:true})).toBeVisible();
    else await expect(page.getByRole("button",{name:"Criar seu Laboratório IHFR",exact:true})).toBeVisible();
  }
  // Empty workspace stays equivalent for all 28 layout samples before either lab is created.
  for (const c of matrix) {
    for (const runtime of runtimes) await configure(runtime,c);
    await pair(c,"workspace-account-closed");
    for (const runtime of runtimes) await account(runtime,true);
    await pair(c,"workspace-account-open",true);
    for (const runtime of runtimes) await account(runtime,false);
    await pair(c,"workspace-account-closed-after-escape");
  }
  const canonical=matrix.find(c=>c.width===1440 && c.scale===100 && c.inset===0)!;
  for (const runtime of runtimes) {
    await configure(runtime,canonical);
    const page=runtime.page;
    if (runtime.source==="starter") {
      await page.getByRole("button",{name:"Criar seu Laboratório IHFR",exact:true}).click();
      const dialog=page.getByRole("dialog",{name:"Criar Laboratório IHFR",exact:true});
      await expect(dialog).toBeVisible();
      await dialog.getByLabel("Nome do laboratório",{exact:true}).fill(labName);
      await dialog.getByRole("button",{name:"Criar laboratório",exact:true}).click();
      await expect(dialog).toHaveCount(0);
    } else {
      const form=page.locator("form").filter({has:page.getByLabel("Nome do laboratório",{exact:true})});
      await form.getByLabel("Nome do laboratório",{exact:true}).fill(labName);
      const response=page.waitForResponse(r=>r.url().endsWith("/api/laboratories") && r.request().method()==="POST");
      await form.getByRole("button",{name:"Criar laboratório",exact:true}).click();
      const result=await response; expect(result.status()).toBe(201);
      const body=await result.json() as {laboratory:{id:string}};
      fullstackLabId=body.laboratory.id;
      const client=db();
      try {
        const lab=await client.laboratoryRoom.findUniqueOrThrow({where:{id:fullstackLabId}});
        const membership=await client.researchersLinked.findUniqueOrThrow({
          where:{userId_laboratoryRoomId:{userId:actor.id,laboratoryRoomId:fullstackLabId}}});
        expect(lab.userId).toBe(actor.id); expect(lab.name).toBe(labName);
        expect(membership.role).toBe("OWNER");
        if (membership.role!=="OWNER") throw new Error("Native creation did not establish OWNER membership.");
        expect(await client.collectionArea.count({where:{laboratoryRoomId:fullstackLabId}})).toBe(0);
        expect(await client.collectionData.count({where:{laboratoryRoomId:fullstackLabId}})).toBe(0);
        runtime.laboratoryRole=membership.role;
        runtime.roleProof={creationHttpStatus:201,globalRole:"USER",membershipRole:membership.role,ownerMatchesActor:true};
      } finally { await client.$disconnect(); }
    }
    report.operations.labCreations++;
    const card=page.getByRole("listitem").filter({has:page.getByRole("heading",{name:labName,exact:true})});
    const access=card.getByRole("link",{name:runtime.source==="starter" ? "Acessar" : "ACESSAR LABORATÓRIO",exact:true});
    await expect(access).toBeVisible(); await access.click();
    await expect(page).toHaveURL(/\/dashboard\/laboratories\/[^/]+\/?$/);
    runtime.labPath=new URL(page.url()).pathname.replace(/\/$/,"");
    await expect(page.locator("nav:visible").getByRole("link",{name:"Membros",exact:true})).toBeVisible();
    await dashboardReady(runtime);
    if (runtime.source==="starter") {
      runtime.laboratoryRole="OWNER";
      runtime.roleProof={globalRole:"USER",membershipRole:"OWNER",method:"native UI creation and OWNER-only Membros link; pinned AppShell contract"};
    }
  }
  for (const c of matrix) {
    for (const runtime of runtimes) await configure(runtime,c);
    await pair(c,"laboratory-account-closed");
    for (const runtime of runtimes) await account(runtime,true);
    await pair(c,"laboratory-account-open",true);
    for (const runtime of runtimes) await account(runtime,false);
    await pair(c,"laboratory-account-closed-after-escape");
    for (const runtime of runtimes) {
      const main=runtime.page.locator(runtime.source==="fullstack" ? "#application-content" : "#conteudo");
      const last=main.locator("a[href]:visible,button:enabled:visible,input:enabled:visible").last();
      await last.focus(); await expect(last).toBeFocused();
      await expect(last).toBeInViewport({ratio:1});
      if (runtime.source==="fullstack" && c.width<768)
        await expect(runtime.page.locator("#application-navigation")).toHaveCSS("padding-bottom",(8+c.inset)+"px");
    }
    await pair(c,"keyboard-last-control");
    for (const runtime of runtimes) {
      await runtime.page.keyboard.press("Tab");
      expect(await runtime.page.evaluate(()=>document.activeElement!==document.body)).toBe(true);
    }
    await pair(c,"keyboard-next-focus");
    for (const runtime of runtimes) {
      const nav=runtime.page.locator("nav:visible").filter({has:runtime.page.getByRole("link",{name:"Áreas",exact:true})});
      await nav.getByRole("link",{name:"Áreas",exact:true}).click();
      await expect(runtime.page).toHaveURL(/\/areas\/?$/);
      await areasReady(runtime);
    }
    await pair(c,"navigation-areas");
    for (const runtime of runtimes) {
      await runtime.page.goBack();
      await expect(runtime.page).toHaveURL(new RegExp(runtime.labPath!+"/?$"));
      await dashboardReady(runtime);
    }
    await pair(c,"back");
    for (const runtime of runtimes) {
      await runtime.page.goForward();
      await expect(runtime.page).toHaveURL(/\/areas\/?$/);
      await areasReady(runtime);
    }
    await pair(c,"forward");
    for (const runtime of runtimes) {
      await runtime.page.goBack(); // Return to the same fixture for the next layout, no new record.
      await dashboardReady(runtime);
    }
  }
  // Persistence is an operation, not a viewport. Reload once, then sample every required layout.
  for (const runtime of runtimes) {
    await runtime.page.reload(); report.operations.reloads++;
    if (runtime.source==="fullstack") {
      await dashboardReady(runtime);
    } else {
      await expect(runtime.page.getByText("Recurso não encontrado",{exact:true})).toBeVisible();
      runtime.laboratoryRole=null;
      runtime.roleProof={globalRole:"USER",membership:"REFERENCE_CREATED_LAB_NOT_FOUND_AFTER_REAL_RELOAD"};
    }
  }
  for (const c of matrix) {
    for (const runtime of runtimes) await configure(runtime,c);
    await pair(c,"reload",false,true);
  }
  expect(report.pairs).toHaveLength(336);
  expect(report.operations).toEqual({fixtureSetups:1,browserContexts:2,logins:2,labCreations:2,reloads:2});
  completed=true;
});

test.afterAll(async () => {
  test.setTimeout(60_000);
  let cleanupFailed=false;
  if (ownsFixture) {
    const client=db();
    try {
      // Resolve partial UI creation by exact owned actor/name; never delete unrelated data.
      const labs=await client.laboratoryRoom.findMany({where:{userId:actor.id,name:labName},select:{id:true}});
      expect(labs.length).toBeLessThanOrEqual(1);
      const fullstack=runtimes.find(runtime=>runtime.source==="fullstack");
      for (const lab of labs) {
        if (!fullstack) throw new Error("Authenticated cleanup context missing.");
        const response=await fullstack.context.request.delete(FULLSTACK+"/api/laboratories/"+lab.id,
          {data:{confirmationName:labName},timeout:15_000});
        expect(response.status()).toBe(200); // Real owner/data guards and deterministic FK cleanup.
      }
      expect(await client.laboratoryRoom.count({where:{userId:actor.id}})).toBe(0);
      expect(await client.researchersLinked.count({where:{userId:actor.id}})).toBe(0);
      await runAuthFixtureCommand("teardown",process.env);
      expect(await countAuthFixtureUsers(process.env)).toBe(0);
      report.cleanup="PASS";
    } catch { cleanupFailed=true; report.cleanup="FAIL"; }
    finally { await client.$disconnect(); }
  }
  for (const runtime of runtimes) {
    try { await runtime.cdp.detach(); await runtime.context.close(); }
    catch { cleanupFailed=true; report.cleanup="FAIL"; }
  }
  report.status=completed && !cleanupFailed ? "CAPTURE_COMPLETE_NOT_ACCEPTED" : "CAPTURE_FAILED_OR_INCOMPLETE";
  await saveReport();
  if (cleanupFailed) throw new Error("UI06 cleanup failed; evidence is incomplete.");
});
