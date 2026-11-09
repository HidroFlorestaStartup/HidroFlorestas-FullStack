import { test, expect, type BrowserContext, type Page, type TestInfo } from "@playwright/test";
import { AREA_FIXTURES, setupAreaFixtures, cleanupAreaFixtures, countAreaFixtures, createAreaFixtureClient } from "../fixtures/areas";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { signSessionToken } from "../../src/app/api/server/auth/session";

const lab = AREA_FIXTURES.laboratoryIds[0];
const root = `/dashboard/laboratories/${lab}/areas/new`;
const api = `/api/laboratories/${lab}/areas`;
async function login(context: BrowserContext, info: TestInfo) {
  await context.addCookies([{
    name: "auth_token", value: signSessionToken(AREA_FIXTURES.userIds[0]),
    url: String(info.project.use.baseURL),
  }]);
}

// Archive outside Playwright outputDir before any subsequent suite can clean it.
// COPYFILE_EXCL makes an accidental repeated attempt visible instead of replacing proof.
async function preserveUi037Capture(png: string, meta: string, label: string,
  durable = join(process.cwd(), ".accounts-validation", "frontend-areas")) {
  if (label !== "mobile" && label !== "desktop") throw new Error("Unknown UI037 capture label.");
  await mkdir(durable, { recursive: true });
  const stem = "ui037-frontend-areas-hf-ui037-location-" + label + "-viewport";
  const pngPath = join(durable, stem + ".png");
  const jsonPath = join(durable, stem + ".json");
  await copyFile(png, pngPath, constants.COPYFILE_EXCL);
  await copyFile(meta, jsonPath, constants.COPYFILE_EXCL);
  return { pngPath, jsonPath };
}

async function ui037ObservedFonts(page: Page) {
  const cdp = await page.context().newCDPSession(page);
  try {
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument");
    // Text-bearing headings/labels only; never serialize text or sample SVG icons.
    const { nodeIds } = await cdp.send("DOM.querySelectorAll", {
      nodeId: root.nodeId, selector: "h1,h2,label",
    });
    const samples = [];
    const visibleIndexes = await page.locator("h1,h2,label").evaluateAll(nodes => nodes
      .map((node, index) => ({ index, rect: node.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight)
      .map(({ index }) => index));
    for (const index of visibleIndexes.slice(0, 12)) {
      const nodeId = nodeIds[index];
      if (!nodeId) continue;
      const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
      const rendered = fonts.filter(font => font.glyphCount > 0)
        .map(({ familyName, isCustomFont, glyphCount }) => ({ familyName, isCustomFont, glyphCount }));
      if (rendered.length) samples.push({ sampleIndex: samples.length, fonts: rendered });
    }
    return { status: samples.length ? "OBSERVED" : "UNOBSERVED", samples };
  } finally { await cdp.detach(); }
}

test.describe.configure({ mode: "serial" });
test.setTimeout(90_000);
test.beforeAll(async () => { await setupAreaFixtures(process.env); });
test.afterAll(async () => {
  await cleanupAreaFixtures(process.env);
  expect(await countAreaFixtures(process.env)).toEqual({
    users: 0, laboratories: 0, memberships: 0, areas: 0,
  });
});
test.beforeEach(async ({ context }) => {
  await context.route("https://tile.openstreetmap.org/**", (route) => route.abort());
});

test("three coordinate sources display partial address suggestions without requiring CEP", async ({ page, context }, info) => {
  await login(context, info);
  let calls = 0;
  await page.route("**/api/geocoding/reverse?**", async (route) => {
    calls++;
    await route.fulfill({ status: 200, json: {
      address: { municipality: "São Luís", state: "MA", cep: "65000-000" },
    } });
  });
  await page.goto(root);
  await page.getByLabel("Latitude", { exact: true }).fill("-2.53073");
  await page.getByLabel("Longitude", { exact: true }).fill("-44.30682");
  await expect(page.getByLabel("Município")).toHaveValue("São Luís");
  await expect(page.getByLabel("UF")).toHaveValue("MA");
  await expect(page.getByLabel("CEP")).toHaveValue("65000-000");

  await page.addInitScript(() => {
    Object.defineProperty(navigator, "geolocation", { configurable: true, value: {
      getCurrentPosition: (success: (position: unknown) => void) =>
        success({ coords: { latitude: -2.9, longitude: -44.2 } }),
    } });
  });
  await page.goto(root);
  await page.getByRole("button", { name: "Usar minha localização" }).click();
  await expect(page.getByLabel("Latitude", { exact: true })).toHaveValue("-2.9");
  await expect(page.getByLabel("Município")).toHaveValue("São Luís");

  await page.goto(root);
  await page.locator(".leaflet-container").click({ position: { x: 150, y: 130 } });
  await expect(page.getByLabel("Latitude", { exact: true })).not.toHaveValue("");
  await expect(page.getByLabel("Município")).toHaveValue("São Luís");
  expect(calls).toBeGreaterThanOrEqual(3);
  for (const [width, height, label] of [[390, 844, "mobile"], [1440, 900, "desktop"]] as const) {
    await page.setViewportSize({ width, height });
    const name = "frontend-areas-hf-ui037-location-" + label;
    const png = info.outputPath(name + ".png");
    const meta = info.outputPath(name + ".json");
    const mask = await page.locator("input,textarea").all();
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const measured = await page.evaluate(() => ({
      width: innerWidth, height: innerHeight, devicePixelRatio,
      rootFontSize: parseFloat(getComputedStyle(document.documentElement).fontSize),
      computedBodyFont: getComputedStyle(document.body).fontFamily,
    }));
    expect(measured.width).toBe(width);
    expect(measured.height).toBe(height);
    expect(Number.isFinite(measured.rootFontSize)).toBe(true);
    const fontsActuallyRendered = await ui037ObservedFonts(page);
    const screenshot = await page.screenshot({ path: png, fullPage: false, animations: "disabled", mask });
    expect(screenshot.readUInt32BE(16)).toBe(width);
    expect(screenshot.readUInt32BE(20)).toBe(height);
    const identity = (ref: string) => execFileSync("git", ["rev-parse", ref], { encoding: "utf8" }).trim();
    const sourceSha = identity("HEAD");
    if (process.env.GITHUB_SHA) expect(sourceSha).toBe(process.env.GITHUB_SHA);
    await writeFile(meta, JSON.stringify({
      case: "geocoded-map", source: "FullStack", sourceSha, sourceTree: identity("HEAD^{tree}"),
      runId: process.env.GITHUB_RUN_ID ?? null, attempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
      state: "map-geocoded-address-present-masked", fixture: { synthetic: true, name: "AREA_FIXTURES" },
      viewport: { width, height }, fullPage: false, maskedInputs: mask.length,
      textScale: measured.rootFontSize / 16 * 100, ...measured, fontsActuallyRendered,
      pngSha256: createHash("sha256").update(screenshot).digest("hex"),
      execution: "PASS", comparability: "INSUFFICIENT_EVIDENCE",
      requirement: "HUMAN_DECISION_PENDING", completeness: "PARTIAL",
      note: "Single-project synthetic UI037 capture; final archive and visual review remain pending.",
    }, null, 2) + "\n");
    await preserveUi037Capture(png, meta, label);
    await info.attach(name, { path: png, contentType: "image/png" });
    await info.attach(name + "-viewport", { path: meta, contentType: "application/json" });
  }
  await page.getByLabel("Nome da área").fill(`${AREA_FIXTURES.prefix} UI037 automatic CEP`);
  const savedResponse=page.waitForResponse(response=>response.url().endsWith(api)&&response.request().method()==="POST");
  await page.getByRole("button", {name:"Confirmar ponto e cadastrar"}).click();
  const saved=await savedResponse;
  expect(saved.status()).toBe(201);
  expect(saved.request().postDataJSON().cep).toBe("65000-000");
  expect((await saved.json()).area.cep).toBe("65000-000");
});

test("manual corrections survive a late suggestion and changing point clears only inferred values", async ({ page, context }, info) => {
  await login(context, info);
  await page.route("**/api/geocoding/reverse?**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    try {
      await route.fulfill({ status: 200, json: {
        address: { municipality: "Sugerida", state: "MA", cep: "65000-000" },
      } });
    } catch { /* request may have been cancelled following another edit */ }
  });
  await page.goto(root);
  await page.getByLabel("Latitude", { exact: true }).fill("-2");
  await page.getByLabel("Longitude", { exact: true }).fill("-44");
  await page.getByLabel("Município").fill("Cidade corrigida");
  await expect(page.getByLabel("UF")).toHaveValue("MA");
  await expect(page.getByLabel("Município")).toHaveValue("Cidade corrigida");
  await page.getByLabel("Longitude", { exact: true }).fill("-43");
  await expect(page.getByLabel("UF")).toHaveValue("");
  await expect(page.getByLabel("Município")).toHaveValue("Cidade corrigida");
});

test("unavailable geocoder and all empty optional fields do not block area creation", async ({ page, context }, info) => {
  await login(context, info);
  await page.route("**/api/geocoding/reverse?**", async (route) => {
    await route.fulfill({ status: 429, json: { error: "RATE_LIMIT" } });
  });
  await page.goto(root);
  await page.getByLabel("Nome da área").fill(`${AREA_FIXTURES.prefix} UI037 sem endereço`);
  await page.getByLabel("Latitude", { exact: true }).fill("-2.5");
  await page.getByLabel("Longitude", { exact: true }).fill("-44.1");
  await expect(page.getByText(/Serviço de endereço indisponível/)).toBeVisible();
  await expect(page.getByLabel("Município")).toHaveValue("");
  await expect(page.getByLabel("UF")).toHaveValue("");
  await expect(page.getByLabel("CEP")).toHaveValue("");
  const saved = page.waitForResponse((response) =>
    response.url().endsWith(api) && response.request().method() === "POST");
  await page.getByRole("button", { name: "Confirmar ponto e cadastrar" }).click();
  const response = await saved;
  expect(response.status()).toBe(201);
  const submitted = response.request().postDataJSON() as Record<string, unknown>;
  expect(submitted.municipality).toBe("");
  expect(submitted.state).toBe("");
  expect(submitted.cep).toBe(""); // absent is accepted and normalized to null
  expect((await response.json()).area.cep).toBeNull();
  await expect(page).toHaveURL(/\/areas\/[^/]+$/);
});

test("persists all 8 optional address combinations in synthetic PostgreSQL with POST/GET",async({context},info)=>{
 await login(context,info);
 const options=[
  ["municipality","Alcântara"],["state","MA"],["cep","65000123"],
 ] as const;
 const db=createAreaFixtureClient(process.env);
 try {
  for(let mask=0;mask<8;mask++){
   const name=`${AREA_FIXTURES.prefix} UI037 subset ${mask}`;
   const data:Record<string,unknown>={name,latitude:-2.5,longitude:-44.1};
   for(let bit=0;bit<options.length;bit++){
    if(mask&(1<<bit)){const [key,value]=options[bit];data[key]=value;}
   }
   const response=await context.request.post(api,{data});
   expect(response.status(),`POST subset ${mask}`).toBe(201);
   const {area}=await response.json();
   const expectedCep=(mask&4)?"65000-123":null;
   expect(area.cep).toBe(expectedCep);
   expect(area.municipality).toBe((mask&1)?"Alcântara":null);
   expect(area.state).toBe((mask&2)?"MA":null);
   const detail=await context.request.get(`${api}/${area.id}`);
   expect(detail.status()).toBe(200);
   expect((await detail.json()).area.cep).toBe(expectedCep);
   const persisted=await db.collectionArea.findUniqueOrThrow({where:{id:area.id}});
   expect(persisted.cep).toBe(expectedCep);
   expect(persisted.municipality).toBe((mask&1)?"Alcântara":null);
   expect(persisted.state).toBe((mask&2)?"MA":null);
  }
  for(const invalid of ["6500-123","65000-12","65000-1234","ABCDEF12",7,{}]){
   const bad=await context.request.post(api,{data:{
    name:`${AREA_FIXTURES.prefix} UI037 invalid`,latitude:0,longitude:0,cep:invalid,
   }});
   expect(bad.status()).toBe(400);
  }
 }finally{await db.$disconnect();}
});
