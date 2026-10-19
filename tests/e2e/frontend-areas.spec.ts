import { expect, test, type BrowserContext, type Locator, type Page, type Route, type TestInfo } from "@playwright/test";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

import { signSessionToken } from "../../src/app/api/server/auth/session";
import type { CoverDto, UploadTicket } from "../../src/app/api/server/images/contracts";
import type { AreaDetailDto, AreaSummaryDto } from "../../src/types/area.type";
import {
  AREA_FIXTURES as A, cleanupAreaFixtures, countAreaFixtures,
  createAreaFixtureClient, setupAreaFixtures,
} from "../fixtures/areas";
import {
  ENVIRONMENTAL_FIXTURES as E, cleanupEnvironmentalFixtures,
  countEnvironmentalFixtures, setupEnvironmentalFixtures,
} from "../fixtures/environmental-data-fixtures";

// Real sessions, capabilities, area reads and area writes use the official local
// fixture harness. Tests labelled "UI fake" control only image transport, flag,
// existence/revision and bytes. They preserve canEdit from an authenticated GET.
// No test is serial: a demonstrated RED must not skip unrelated evidence.
test.setTimeout(90_000);
test.use({ trace: "off", screenshot: "off", video: "off" });

const lab = A.laboratoryIds[0];
const root = `/dashboard/laboratories/${lab}/areas`;
const api = `/api/laboratories/${lab}/areas`;
const seedArea = "00000000-0000-4000-8000-000000000321";
const createdPrefix = `${A.prefix} Frontend021`;
const coverArea = `/dashboard/laboratories/${E.laboratoryIds[0]}/areas/${E.areaIds[0]}`;
const coverApi = coverArea.replace("/dashboard/", "/api/") + "/image";
const widths = [375, 768, 1440, 320] as const;
const privateHeaders = { "Cache-Control": "private, no-store" };

async function login(context: BrowserContext, info: TestInfo, id = A.userIds[0]) {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(id), url: String(info.project.use.baseURL) }]);
}

async function textScale(page: Page, width: number) {
  if (width !== 320) return;
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("32px");
}

async function rendered(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
}

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const content = page.locator("#application-content");
  await expect(content).toHaveCount(1);
  expect(await content.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
}

async function capture(page: Page, info: TestInfo, name: string, target?: Locator) {
  const prefix = process.env.FRONTEND_AREAS_CAPTURE_PREFIX ?? "after";
  if (!["before", "after"].includes(prefix)) throw new Error("Invalid areas evidence prefix");
  if (target) await target.evaluate(node => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
  await rendered(page);
  const filename = `${prefix}-frontend-areas-${name}-viewport.png`;
  const path = info.outputPath(filename);
  const mask: Locator[] = [];
  for (const input of await page.locator("input, textarea").all()) {
    if (await input.evaluate(node => (node as HTMLInputElement).value.length > 0)) mask.push(input);
  }
  await page.screenshot({ path, fullPage: false, animations: "disabled", mask });
  const targetPosition = target ? await target.boundingBox() : null;
  const state = await page.evaluate(() => {
    const content = document.getElementById("application-content");
    const rootFontSize = getComputedStyle(document.documentElement).fontSize;
    const active = document.activeElement;
    const box = active instanceof HTMLElement ? active.getBoundingClientRect() : null;
    return {
      viewport: { width: innerWidth, height: innerHeight },
      text: { rootFontSize, percentRelativeTo16px: Number.parseFloat(rootFontSize) / 16 * 100, method: "computed html font-size; no browser zoom" },
      scroll: { document: { x: scrollX, y: scrollY }, content: content ? { left: content.scrollLeft, top: content.scrollTop, height: content.clientHeight, extent: content.scrollHeight } : null },
      active: box ? { tag: active!.tagName.toLowerCase(), x: box.x, y: box.y, width: box.width, height: box.height } : null,
    };
  });
  const metadataName = filename.replace(/\.png$/, ".json");
  const metadataPath = info.outputPath(metadataName);
  await writeFile(metadataPath, JSON.stringify({ name, screenshot: { filename, fullPage: false, browserProject: info.project.name }, ...state, target: targetPosition, scrolling: target ? "Element.scrollIntoView: block=center, inline=nearest, behavior=instant" : "Preserved viewport after focus/navigation; no screenshot scrolling" }, null, 2) + "\n", "utf8");
  const archive = join(process.cwd(), ".accounts-validation", "frontend-areas");
  await mkdir(archive, { recursive: true });
  await copyFile(path, join(archive, filename));
  await copyFile(metadataPath, join(archive, metadataName));
  await info.attach(filename, { path, contentType: "image/png" });
  await info.attach(metadataName, { path: metadataPath, contentType: "application/json" });
}

function gate() {
  let release!: () => void;
  const promise = new Promise<void>(resolve => { release = resolve; });
  return { promise, release };
}

function panel(page: Page) { return page.getByRole("region", { name: "Capa da área", exact: true }); }
function status(page: Page) { return panel(page).getByRole("status"); }
function uploadButton(page: Page) { return panel(page).getByRole("button", { name: /^(Enviar capa|Tentar envio novamente)$/ }); }
function reloadButton(page: Page) { return panel(page).getByRole("button", { name: "Recarregar capa", exact: true }); }
async function decoded(image: Locator) {
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
}
const imageBytes = () => sharp({ create: { width: 32, height: 24, channels: 3, background: "#326646" } }).png().toBuffer();

type UploadCommand = { expectedRevision: number; key: string };
type CoverTransport = {
  dto: CoverDto;
  source: CoverDto;
  bytes: Buffer;
  commands: UploadCommand[];
  confirmations: string[];
  removals: number[];
  content: string[];
  metadataReads: number;
  directUploads: number;
  onMetadata?: (route: Route, count: number) => Promise<void>;
  onContent?: (route: Route, url: URL, count: number) => Promise<void>;
  onInitiate?: (route: Route, body: UploadCommand, count: number) => Promise<void>;
  onConfirm?: (route: Route, path: string, count: number) => Promise<void>;
};

function ticket(index = 1): UploadTicket {
  return {
    attemptId: `00000000-0000-4000-8000-${String(900 + index).padStart(12, "0")}`,
    expiresAt: new Date(Date.now() + 600_000).toISOString(),
    upload: { url: "https://api.cloudinary.com/v1_1/synthetic/image/upload", params: { signature: "synthetic-only", public_id: `synthetic-${index}` } },
  };
}

async function fakeCover(page: Page, context: BrowserContext, info: TestInfo, options: { userIndex?: number; hasImage?: boolean; revision?: number; enabled?: boolean } = {}): Promise<CoverTransport> {
  const userIndex = options.userIndex ?? 0;
  await login(context, info, E.userIds[userIndex]);
  const response = await context.request.get(coverApi);
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toBe("private, no-store");
  const source: CoverDto = await response.json();
  expect(source.canEdit).toBe(userIndex === 0 || userIndex === 1);
  const transport: CoverTransport = {
    source, dto: { ...source, featureEnabled: options.enabled ?? true, image: { revision: options.revision ?? 1, hasImage: options.hasImage ?? true, ...((options.hasImage ?? true) ? { width: 32, height: 24 } : {}) } },
    bytes: await imageBytes(), commands: [], confirmations: [], removals: [], content: [], metadataReads: 0, directUploads: 0,
  };
  await page.route("https://api.cloudinary.com/**", async route => {
    transport.directUploads++;
    expect(route.request().method()).toBe("POST");
    await route.fulfill({ status: 200, json: { synthetic: "provider response is not authoritative" } });
  });
  await page.route(url => url.pathname === coverApi || url.pathname.startsWith(coverApi + "/"), async route => {
    const request = route.request(), url = new URL(request.url());
    expect(transport.dto.canEdit).toBe(source.canEdit);
    if (url.pathname === coverApi && request.method() === "GET") {
      transport.metadataReads++;
      if (transport.onMetadata) return transport.onMetadata(route, transport.metadataReads);
      return route.fulfill({ json: transport.dto, headers: privateHeaders });
    }
    if (url.pathname === coverApi + "/content") {
      transport.content.push(url.search);
      if (transport.onContent) return transport.onContent(route, url, transport.content.length);
      return route.fulfill({ status: 200, contentType: "image/png", body: transport.bytes, headers: privateHeaders });
    }
    if (url.pathname === coverApi + "/uploads") {
      const body: UploadCommand = request.postDataJSON();
      expect(Object.keys(body).sort()).toEqual(["expectedRevision", "key"]);
      transport.commands.push(body);
      if (transport.onInitiate) return transport.onInitiate(route, body, transport.commands.length);
      return route.fulfill({ json: ticket(transport.commands.length), headers: privateHeaders });
    }
    if (url.pathname.endsWith("/confirm")) {
      expect(request.postDataJSON()).toEqual({});
      transport.confirmations.push(url.pathname);
      if (transport.onConfirm) return transport.onConfirm(route, url.pathname, transport.confirmations.length);
      transport.dto = { ...transport.dto, image: { revision: transport.dto.image.revision + 1, hasImage: true, width: 32, height: 24 } };
      return route.fulfill({ json: transport.dto, headers: privateHeaders });
    }
    if (url.pathname === coverApi && request.method() === "DELETE") {
      expect(request.postDataJSON()).toEqual({ expectedRevision: transport.dto.image.revision });
      transport.removals.push(transport.dto.image.revision);
      transport.dto = { ...transport.dto, image: { revision: transport.dto.image.revision + 1, hasImage: false } };
      return route.fulfill({ status: 204, headers: privateHeaders });
    }
    throw new Error("Unexpected synthetic cover request");
  });
  return transport;
}

async function selectFile(page: Page, bytes: Buffer, name = "synthetic-area.png") {
  await panel(page).locator('input[type="file"]').setInputFiles({ name, mimeType: "image/png", buffer: bytes });
  await expect(status(page)).toContainText("Imagem selecionada.");
}

async function cleanupCreatedAreas() {
  const db = createAreaFixtureClient(process.env);
  try {
    await db.collectionArea.deleteMany({ where: { laboratoryRoomId: lab, userId: A.userIds[0], name: { startsWith: createdPrefix } } });
  } finally { await db.$disconnect(); }
}

test.beforeAll(async () => {
  await setupAreaFixtures(process.env);
  try {
    await setupEnvironmentalFixtures(process.env);
    const db = createAreaFixtureClient(process.env);
    try {
      // A dedicated, collection-free synthetic laboratory supplies a real empty
      // list. The official cleanup removes only this file's reserved fixtures.
      const removed = await db.collectionArea.deleteMany({ where: { id: "00000000-0000-4000-8000-000000000323", laboratoryRoomId: A.laboratoryIds[2], userId: A.userIds[3], name: `${A.prefix} area 2` } });
      expect(removed.count).toBe(1);
    } finally { await db.$disconnect(); }
  } catch (error) {
    try { await cleanupEnvironmentalFixtures(process.env); } finally { await cleanupAreaFixtures(process.env); }
    throw error;
  }
});

test.afterAll(async () => {
  try {
    await cleanupEnvironmentalFixtures(process.env);
    expect(Object.values(await countEnvironmentalFixtures(process.env)).every(value => value === 0)).toBe(true);
  } finally {
    await cleanupAreaFixtures(process.env);
    expect(await countAreaFixtures(process.env)).toEqual({ users: 0, laboratories: 0, memberships: 0, areas: 0 });
  }
});

test.beforeEach(async ({ page }) => {
  // Local app assets remain real; all unhandled external traffic is refused.
  // The later, exact Cloudinary handler is the only synthetic upload destination.
  await page.route("**/*", route => {
    const url = new URL(route.request().url());
    return ["127.0.0.1", "localhost"].includes(url.hostname) ? route.continue() : route.abort("blockedbyclient");
  });
});

for (const width of widths) test(`real areas, form, detail, focus and empty context at ${width}px${width === 320 ? " text200" : ""}`, async ({ page, context }, info) => {
  await page.setViewportSize({ width, height: 900 });
  await login(context, info);
  const read = page.waitForResponse(response => new URL(response.url()).pathname === api);
  await page.goto(root);
  const response = await read;
  expect(response.status()).toBe(200);
  const body: { areas: AreaSummaryDto[] } = await response.json();
  const area = body.areas.find(item => item.id === seedArea)!;
  expect(area.cover).toMatchObject({ revision: 0, hasImage: false });
  await expect(page.getByRole("link", { name: area.name, exact: true })).toBeVisible();
  await expect(page.locator(".leaflet-container")).toHaveCount(0);
  await textScale(page, width);
  const areaLink = page.getByRole("link", { name: area.name, exact: true });
  await capture(page, info, `list-${width}`, areaLink);
  await noOverflow(page);
  const create = page.getByRole("link", { name: "Nova área", exact: true });
  await create.focus(); await expect(create).toBeFocused();
  await capture(page, info, `list-focus-${width}`);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`${root}/new`);
  await textScale(page, width);
  const latitude = page.getByLabel("Latitude", { exact: true });
  await latitude.focus(); await expect(latitude).toBeFocused();
  await capture(page, info, `new-focus-${width}`, latitude);
  const map = page.getByRole("region", { name: "Mapa da área", exact: true });
  await expect(map).toBeVisible();
  const mapBox = await map.boundingBox();
  expect(mapBox!.width).toBeGreaterThan(200); expect(mapBox!.height).toBeGreaterThan(200);
  await capture(page, info, `new-map-${width}`, map);
  await noOverflow(page);
  await page.getByRole("link", { name: "Cancelar", exact: true }).click();
  await expect(page).toHaveURL(root);
  await page.getByRole("link", { name: area.name, exact: true }).click();
  await expect(page).toHaveURL(`${root}/${seedArea}`);
  await expect(page.getByRole("heading", { name: area.name, exact: true })).toBeVisible();
  await expect(page.locator(".leaflet-marker-icon")).toHaveCount(1);
  await expect(page.locator("dt").filter({ hasText: /^(Município|UF|Tipo do terreno|Descrição)$/ })).toHaveCount(0);
  const detail = await context.request.get(`${api}/${seedArea}`);
  expect(detail.status()).toBe(200);
  expect((await detail.json()).area).not.toHaveProperty("cover");
  await textScale(page, width);
  const back = page.getByRole("link", { name: "Voltar às áreas", exact: true });
  await back.focus(); await expect(back).toBeFocused();
  await capture(page, info, `detail-focus-${width}`);
  await capture(page, info, `cover-real-${width}`, panel(page));
  await noOverflow(page);
  await page.reload(); await expect(page.getByRole("heading", { name: area.name, exact: true })).toBeVisible();
  await back.click(); await expect(page).toHaveURL(root);
  await login(context, info, A.userIds[3]);
  await page.goto(`/dashboard/laboratories/${A.laboratoryIds[2]}/areas`);
  await textScale(page, width);
  const empty = page.getByRole("heading", { name: "Nenhuma área cadastrada", exact: true });
  await expect(empty).toBeVisible();
  await capture(page, info, `empty-${width}`, empty);
  await noOverflow(page);

  // The real cover above is disabled in the isolated runner. This separately
  // labelled UI transport scenario proves enabled cover reflow at the SAME
  // viewport/text profile, preserving the owner's actual contextual capability.
  const transport = await fakeCover(page, context, info, { enabled: true, hasImage: true, revision: 8 });
  const confirmation = gate();
  transport.onConfirm = async route => {
    await confirmation.promise;
    transport.dto = { ...transport.dto, image: { revision: 9, hasImage: true, width: 32, height: 24 } };
    await route.fulfill({ json: transport.dto, headers: privateHeaders });
  };
  try {
    await page.goto(coverArea);
    await textScale(page, width);
    const image = panel(page).getByRole("img");
    await decoded(image);
    await capture(page, info, `ui-fake-enabled-preview-${width}`, image);
    const file = panel(page).locator('input[type="file"]');
    await expect(file).toHaveValue("");
    await file.focus(); await expect(file).toBeFocused();
    await capture(page, info, `ui-fake-enabled-native-file-focus-${width}`, file);
    await reloadButton(page).focus(); await expect(reloadButton(page)).toBeFocused();
    await capture(page, info, `ui-fake-enabled-reload-focus-${width}`);
    await selectFile(page, transport.bytes);
    await uploadButton(page).click();
    await expect.poll(() => transport.confirmations.length).toBe(1);
    const progress = panel(page).getByRole("progressbar", { name: "Progresso do envio da capa", exact: true });
    await expect(progress).toBeVisible();
    await expect(status(page)).toHaveText("Validando imagem…");
    await capture(page, info, `ui-fake-enabled-confirmation-progress-${width}`, progress);
    await noOverflow(page);
    confirmation.release();
    await expect(image).toHaveAttribute("src", /revision=9(?:&|$)/);
    await decoded(image);
    await expect(status(page)).toContainText("Capa salva.");
  } finally { confirmation.release(); }
});

test("real point registration preserves zero, both bounds, free-text UF, uncertain response and cancel", async ({ page, context }, info) => {
  await login(context, info);
  try {
    for (const [index, latitude, longitude] of [[0, 0, 0], [1, -90, 180], [2, 90, -180]] as const) {
      const name = `${createdPrefix} point ${index}`;
      await page.goto(`${root}/new`);
      await page.getByLabel("Nome da área", { exact: true }).fill(name);
      await page.getByLabel("Latitude", { exact: true }).fill(String(latitude));
      await page.getByLabel("Longitude", { exact: true }).fill(String(longitude));
      await page.getByLabel("UF").fill("Região experimental livre");
      await page.getByLabel("Tipo de terreno").fill("Texto de campo");
      const before = (await (await context.request.get(api)).json()).areas.length;
      await expect(page.locator(".leaflet-marker-icon")).toHaveCount(1);
      expect((await (await context.request.get(api)).json()).areas.length).toBe(before);
      const saved = page.waitForResponse(response => new URL(response.url()).pathname === api && response.request().method() === "POST");
      await page.getByRole("button", { name: "Confirmar ponto e cadastrar", exact: true }).click();
      const response = await saved; expect(response.status()).toBe(201);
      const area: AreaDetailDto = (await response.json()).area;
      expect(area).toMatchObject({ name, latitude, longitude, state: "Região experimental livre", landType: "Texto de campo", municipality: null, description: null });
      await expect(page).toHaveURL(`${root}/${area.id}`);
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
      const persisted = await context.request.get(`${api}/${area.id}`);
      expect((await persisted.json()).area).toMatchObject(area);
    }
    const uncertainName = `${createdPrefix} uncertain`;
    let lostWrite = false;
    await page.route(url => url.pathname === api, async route => {
      if (route.request().method() !== "POST") return route.continue();
      const response = await route.fetch(); expect(response.status()).toBe(201); lostWrite = true;
      await route.abort("failed");
    });
    await page.goto(`${root}/new`);
    await page.getByLabel("Nome da área", { exact: true }).fill(uncertainName);
    await page.getByLabel("Latitude", { exact: true }).fill("-3.1234567");
    await page.getByLabel("Longitude", { exact: true }).fill("-38.6");
    await page.getByRole("button", { name: "Confirmar ponto e cadastrar", exact: true }).click();
    await expect(page.getByRole("status")).toContainText("Confira a listagem antes de tentar novamente.");
    expect(lostWrite).toBe(true); await expect(page).toHaveURL(`${root}/new`);
    await expect(page.getByLabel("Nome da área", { exact: true })).toHaveValue(uncertainName);
    await page.getByRole("link", { name: "Cancelar", exact: true }).click();
    await expect(page.getByRole("link", { name: uncertainName, exact: true })).toBeVisible();
    const rows: AreaSummaryDto[] = (await (await context.request.get(api)).json()).areas;
    expect(rows.filter(item => item.name === uncertainName)).toHaveLength(1);
    expect(rows.find(item => item.name === uncertainName)).toMatchObject({ latitude: -3.123457, longitude: -38.6 });
    await page.goto(`${root}/new`);
    await page.getByLabel("Nome da área", { exact: true }).fill(`${createdPrefix} canceled`);
    await page.getByRole("link", { name: "Cancelar", exact: true }).click();
    expect((await (await context.request.get(api)).json()).areas.some((item: AreaSummaryDto) => item.name.endsWith(" canceled"))).toBe(false);
  } finally { await cleanupCreatedAreas(); }
});

test("real contextual roles and inactive state preserve reads and reject unauthorized area writes", async ({ page, context }, info) => {
  for (const index of [0, 1, 2]) {
    await login(context, info, A.userIds[index]);
    await page.goto(root);
    await expect(page.getByRole("link", { name: `${A.prefix} area 0`, exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Nova área", exact: true })).toHaveCount(index === 2 ? 0 : 1);
    await page.goto(`${root}/${seedArea}`);
    await expect(page.getByRole("link", { name: "Registrar coleta", exact: true })).toHaveCount(1);
  }
  const memberWrite = await context.request.post(api, { data: { name: `${createdPrefix} refused`, latitude: 0, longitude: 0 } });
  expect(memberWrite.status()).toBe(403);
  await login(context, info);
  const inactiveRoot = `/dashboard/laboratories/${A.laboratoryIds[1]}/areas`;
  await page.goto(inactiveRoot);
  await expect(page.getByText("Laboratório inativo — somente leitura.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Nova área", exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: `${A.prefix} area 1`, exact: true }).click();
  await expect(page.getByRole("link", { name: "Registrar coleta", exact: true })).toHaveCount(0);
  const inactive = await context.request.post(`/api/laboratories/${A.laboratoryIds[1]}/areas`, { data: { name: `${createdPrefix} inactive`, latitude: 0, longitude: 0 } });
  expect(inactive.status()).toBe(409);
  const db = createAreaFixtureClient(process.env);
  try {
    await db.user.update({ where: { id: A.userIds[3] }, data: { role: "ADMIN" } });
    await login(context, info, A.userIds[3]);
    expect((await context.request.get(api)).status()).toBe(404);
    expect((await context.request.get(`${api}/${seedArea}`)).status()).toBe(404);
    expect((await context.request.post(api, { data: { name: `${createdPrefix} outsider`, latitude: 0, longitude: 0 } })).status()).toBe(404);
  } finally { await db.user.update({ where: { id: A.userIds[3] }, data: { role: "USER" } }); await db.$disconnect(); }
});

test("real form preserves fields on denied, timeout and late geolocation without premature persistence", async ({ page, context }, info) => {
  await login(context, info);
  await page.addInitScript(() => {
    const state = window as unknown as { areaGeoSuccess?: PositionCallback; areaGeoFailure?: PositionErrorCallback; areaGeoOptions?: PositionOptions };
    Object.defineProperty(navigator, "geolocation", { configurable: true, value: { getCurrentPosition: (success: PositionCallback, failure: PositionErrorCallback, options: PositionOptions) => { state.areaGeoSuccess = success; state.areaGeoFailure = failure; state.areaGeoOptions = options; } } });
  });
  const before = (await (await context.request.get(api)).json()).areas.length;
  await page.goto(`${root}/new`);
  await page.getByLabel("Nome da área", { exact: true }).fill(`${createdPrefix} geolocation`);
  await page.getByLabel("Latitude", { exact: true }).fill("-5"); await page.getByLabel("Longitude", { exact: true }).fill("-40");
  for (const code of [1, 3]) {
    await page.getByRole("button", { name: "Usar minha localização", exact: true }).click();
    expect(await page.evaluate(() => (window as unknown as { areaGeoOptions: PositionOptions }).areaGeoOptions)).toEqual({ timeout: 10000, maximumAge: 0 });
    await page.evaluate(errorCode => (window as unknown as { areaGeoFailure: (error: { code: number }) => void }).areaGeoFailure({ code: errorCode }), code);
    await expect(page.getByRole("status")).toContainText("Seus dados foram preservados");
    await expect(page.getByLabel("Latitude", { exact: true })).toHaveValue("-5"); await expect(page.getByLabel("Longitude", { exact: true })).toHaveValue("-40");
  }
  await page.getByRole("button", { name: "Usar minha localização", exact: true }).click();
  await page.locator(".leaflet-container").click({ position: { x: 120, y: 120 } });
  await page.getByLabel("Latitude", { exact: true }).fill("0"); await page.getByLabel("Longitude", { exact: true }).fill("0");
  await page.evaluate(() => (window as unknown as { areaGeoSuccess: (position: { coords: { latitude: number; longitude: number } }) => void }).areaGeoSuccess({ coords: { latitude: 12, longitude: 13 } }));
  await expect(page.getByRole("button", { name: "Usar minha localização", exact: true })).toBeEnabled();
  await expect(page.getByLabel("Latitude", { exact: true })).toHaveValue("0"); await expect(page.getByLabel("Longitude", { exact: true })).toHaveValue("0");
  expect((await (await context.request.get(api)).json()).areas.length).toBe(before);
});

test("transient list transport keeps loading and failure distinct and retries the real endpoint", async ({ page, context }, info) => {
  await login(context, info);
  const held = gate(); let fail = true;
  await page.route(url => url.pathname === api, async route => {
    if (!fail || route.request().method() !== "GET") return route.continue();
    await held.promise;
    await route.fulfill({ status: 503, json: { error: { code: "INTERNAL_ERROR", message: "Falha transitória sintética do transporte de áreas." } } });
  });
  try {
    await page.goto(root);
    const loading = page.getByRole("status").filter({ hasText: "Carregando áreas" });
    await expect(loading).toBeVisible(); await capture(page, info, "transient-list-loading", loading);
    held.release();
    const alert = page.getByRole("alert").filter({ hasText: "Falha transitória sintética do transporte de áreas." });
    await expect(alert).toContainText("Falha transitória sintética"); await capture(page, info, "transient-list-error", alert);
    fail = false;
    const recovered = page.waitForResponse(response => new URL(response.url()).pathname === api);
    await page.getByRole("button", { name: "Tentar novamente", exact: true }).click();
    expect((await recovered).status()).toBe(200);
    await expect(page.getByRole("link", { name: `${A.prefix} area 0`, exact: true })).toBeVisible();
  } finally { held.release(); }
});

test("UI fake cover matrix preserves real contextual canEdit across all eight availability and existence states", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 900 });
  for (const canEdit of [false, true]) for (const enabled of [false, true]) for (const hasImage of [false, true]) {
    const transport = await fakeCover(page, context, info, { userIndex: canEdit ? 0 : 2, enabled, hasImage, revision: hasImage ? 8 : 7 });
    await page.goto(coverArea);
    await expect(status(page)).toHaveText("");
    const region = panel(page);
    await expect(region.locator('input[type="file"]')).toHaveCount(canEdit && enabled ? 1 : 0);
    await expect(region.getByRole("button", { name: "Enviar capa", exact: true })).toHaveCount(canEdit && enabled ? 1 : 0);
    await expect(region.getByRole("button", { name: "Remover capa", exact: true })).toHaveCount(canEdit && enabled && hasImage ? 1 : 0);
    if (enabled && hasImage) {
      await decoded(region.getByRole("img"));
      expect(await region.getByRole("img").getAttribute("src")).toContain(coverApi + "/content?revision=8");
      expect(await region.getByRole("img").getAttribute("src")).not.toContain("res.cloudinary.com");
    } else {
      await expect(region.getByRole("img")).toHaveCount(0);
      await expect(region.getByText(!hasImage ? "Área sem capa." : "Capa indisponível enquanto o recurso está desabilitado.", { exact: true })).toBeVisible();
      expect(transport.content).toHaveLength(0);
    }
    await capture(page, info, `ui-fake-cover-enabled${enabled}-edit${canEdit}-image${hasImage}`, region);
    await noOverflow(page);
    await reloadButton(page).click();
    if (enabled && hasImage) {
      await expect(status(page)).toHaveText("Capa recarregada.");
      await decoded(region.getByRole("img")); expect(transport.content).toHaveLength(2);
    } else {
      await expect(status(page)).toHaveText(enabled ? "Área sem capa." : "As capas de áreas estão desabilitadas neste momento.");
      expect(transport.content).toHaveLength(0);
    }
    expect(transport.source.canEdit).toBe(canEdit);
    expect(transport.commands).toHaveLength(0); expect(transport.confirmations).toHaveLength(0);
    expect(transport.removals).toHaveLength(0); expect(transport.directUploads).toBe(0);
  }
});

test("UI fake RED/GREEN confirmed upload does not announce success before its new image bytes load", async ({ page, context }, info) => {
  const transport = await fakeCover(page, context, info);
  const held = gate();
  transport.onContent = async (route, url) => {
    if (url.searchParams.get("revision") === "2") await held.promise;
    await route.fulfill({ status: 200, contentType: "image/png", body: transport.bytes, headers: privateHeaders });
  };
  try {
    await page.goto(coverArea); await decoded(panel(page).getByRole("img"));
    await selectFile(page, transport.bytes);
    await uploadButton(page).click();
    await expect.poll(() => transport.confirmations.length).toBe(1);
    await expect.poll(() => transport.content.some(query => new URLSearchParams(query).get("revision") === "2")).toBe(true);
    await expect(panel(page).getByRole("img")).toHaveAttribute("src", /revision=2(?:&|$)/);
    expect(await panel(page).getByRole("img").evaluate(node => (node as HTMLImageElement).naturalWidth)).toBe(0);
    await capture(page, info, "ui-fake-confirmed-new-bytes-pending", status(page));
    // A successful server confirmation and a loaded preview are distinct facts.
    await expect(status(page)).not.toContainText("Capa salva.");
    held.release();
    await decoded(panel(page).getByRole("img"));
    await expect(status(page)).toContainText("Capa salva.");
    expect(transport.commands).toHaveLength(1); expect(transport.commands[0].expectedRevision).toBe(1);
  } finally { held.release(); }
});

test("UI fake RED/GREEN uncertain confirmation survives preview reload and canceled removal with the same ticket", async ({ page, context }, info) => {
  for (const removedAfterConfirmation of [false, true]) {
    const transport = await fakeCover(page, context, info);
    transport.onConfirm = async (route, _path, count) => {
      if (count === 1) {
        // The server may have stored the image before its response was lost.
        transport.dto = { ...transport.dto, image: { revision: 2, hasImage: true, width: 32, height: 24 } };
        return route.abort("failed");
      }
      // Confirmed replay projects the CURRENT DTO, even after a later removal.
      return route.fulfill({ json: transport.dto, headers: privateHeaders });
    };
    await page.goto(coverArea); await decoded(panel(page).getByRole("img"));
    await selectFile(page, transport.bytes);
    await uploadButton(page).click();
    await expect(panel(page).getByRole("alert")).toBeVisible();
    expect(transport.commands).toHaveLength(1); expect(transport.confirmations).toHaveLength(1);
    if (removedAfterConfirmation) transport.dto = { ...transport.dto, image: { revision: 3, hasImage: false } };
    await reloadButton(page).click();
    if (removedAfterConfirmation) {
      await expect(status(page)).toHaveText("Área sem capa.");
    } else {
      await expect(status(page)).toHaveText("Capa recarregada.");
      page.once("dialog", dialog => dialog.dismiss());
      await panel(page).getByRole("button", { name: "Remover capa", exact: true }).click();
      expect(transport.removals).toHaveLength(0);
    }
    await uploadButton(page).click();
    await expect.poll(() => transport.confirmations.length).toBe(2);
    expect(transport.commands).toHaveLength(1);
    expect(transport.confirmations[1]).toBe(transport.confirmations[0]);
    // Confirmation retry may reconcile the original asset without sending its bytes again.
    expect(transport.directUploads).toBeGreaterThanOrEqual(1); expect(transport.directUploads).toBeLessThanOrEqual(2);
    await expect(panel(page).locator('input[type="file"]')).toHaveValue("");
    if (removedAfterConfirmation) {
      await expect(panel(page).getByRole("img")).toHaveCount(0);
      await expect(panel(page).getByText("Área sem capa.", { exact: true }).first()).toBeVisible();
      await expect(status(page)).not.toContainText(/Carregando|Tentando|Validando/);
    } else {
      await decoded(panel(page).getByRole("img"));
      await expect(status(page)).toContainText("Capa salva.");
    }
  }
});

test("UI fake RED/GREEN uncertain initiation reuses its original expectedRevision and key after newer preview metadata", async ({ page, context }, info) => {
  const transport = await fakeCover(page, context, info);
  transport.onInitiate = async (route, _body, count) => {
    if (count === 1) return route.abort("failed");
    return route.fulfill({ json: ticket(1), headers: privateHeaders });
  };
  transport.onConfirm = async route => {
    // Another actor changed revision after the original attempt was issued.
    // Compatible initiate replay is allowed; stale finalization is not.
    await route.fulfill({ status: 409, json: { error: { code: "STALE_REVISION", message: "A capa mudou em outra sessão. Recarregue antes de tentar novamente." } }, headers: privateHeaders });
  };
  await page.goto(coverArea); await decoded(panel(page).getByRole("img"));
  await selectFile(page, transport.bytes);
  await uploadButton(page).click(); await expect(panel(page).getByRole("alert")).toBeVisible();
  expect(transport.commands).toHaveLength(1); expect(transport.commands[0].expectedRevision).toBe(1);
  const original = { ...transport.commands[0] };
  transport.dto = { ...transport.dto, image: { revision: 2, hasImage: true, width: 32, height: 24 } };
  await reloadButton(page).click(); await expect(status(page)).toHaveText("Capa recarregada.");
  await uploadButton(page).click();
  await expect.poll(() => transport.commands.length).toBe(2);
  expect(transport.commands[1]).toEqual(original);
  await expect(panel(page).getByRole("alert")).toContainText("A capa mudou em outra sessão.");
  await expect(panel(page).locator('input[type="file"]')).not.toHaveValue("");
  expect(transport.dto.image.revision).toBe(2);
  await expect(status(page)).not.toContainText("Capa salva.");
});

for (const operation of ["selection", "upload"] as const) test(`UI fake RED/GREEN an older preview load cannot replace the current ${operation} message`, async ({ page, context }, info) => {
  const transport = await fakeCover(page, context, info);
  const oldBytes = gate(), confirmation = gate();
  transport.onContent = async (route, _url, count) => {
    if (count === 1) return route.fulfill({ status: 503, headers: privateHeaders });
    if (count === 2) await oldBytes.promise;
    await route.fulfill({ status: 200, contentType: "image/png", body: transport.bytes, headers: privateHeaders });
  };
  transport.onConfirm = async route => {
    await confirmation.promise;
    transport.dto = { ...transport.dto, image: { revision: 2, hasImage: true, width: 32, height: 24 } };
    await route.fulfill({ json: transport.dto, headers: privateHeaders });
  };
  try {
    await page.goto(coverArea);
    await expect(panel(page).getByText("Capa indisponível.", { exact: true })).toBeVisible();
    await reloadButton(page).click();
    await expect.poll(() => transport.content.length).toBe(2);
    await expect(status(page)).toHaveText("Tentando recarregar a capa…");
    const olderImage = await panel(page).getByRole("img").elementHandle();
    expect(olderImage).not.toBeNull();
    await olderImage!.evaluate(node => node.addEventListener("load", () => node.setAttribute("data-frontend-areas-observed-load", "yes"), { once: true }));
    await selectFile(page, transport.bytes);
    if (operation === "upload") {
      await uploadButton(page).click();
      await expect.poll(() => transport.confirmations.length).toBe(1);
      await expect(status(page)).toHaveText("Validando imagem…");
    }
    // Observe the actual browser event on the image whose request preceded the
    // selection/upload. Do not claim an old event was delivered if it canceled.
    // This is an observer, not a synthetic event or a production test hook.
    oldBytes.release();
    await expect.poll(() => olderImage!.getAttribute("data-frontend-areas-observed-load")).toBe("yes");
    await decoded(panel(page).getByRole("img"));
    await expect(status(page)).toContainText(operation === "selection" ? "Imagem selecionada." : "Validando imagem…");
    await expect(status(page)).not.toContainText("Capa recarregada.");
    expect(transport.commands).toHaveLength(operation === "selection" ? 0 : 1);
    if (operation === "upload") {
      confirmation.release(); await expect(status(page)).toContainText("Capa salva.");
      await decoded(panel(page).getByRole("img"));
    }
  } finally { oldBytes.release(); confirmation.release(); }
});

test("UI fake metadata failure and byte retry remain distinct while the persisted revision stays unchanged", async ({ page, context }, info) => {
  const transport = await fakeCover(page, context, info, { userIndex: 2 });
  let failMetadataNext = false;
  transport.onMetadata = async route => {
    if (failMetadataNext) {
      failMetadataNext = false;
      return route.fulfill({ status: 503, json: { error: { code: "UNAVAILABLE", message: "Metadados temporariamente indisponíveis." } }, headers: privateHeaders });
    }
    return route.fulfill({ json: transport.dto, headers: privateHeaders });
  };
  transport.onContent = async (route, _url, count) => {
    if (count === 1 || count === 3) return route.fulfill({ status: 503, headers: privateHeaders });
    return route.fulfill({ status: 200, contentType: "image/png", body: transport.bytes, headers: privateHeaders });
  };
  await page.goto(coverArea);
  await expect(panel(page).getByText("Capa indisponível.", { exact: true })).toBeVisible();
  expect(transport.content).toHaveLength(1);
  // Arm a deliberate reload failure only AFTER hydration/initial read. React
  // Strict Mode may issue multiple initial effect requests in the dev server.
  failMetadataNext = true;
  await reloadButton(page).click();
  await expect(panel(page).getByRole("alert")).toHaveText("Não foi possível recarregar a capa.");
  expect(transport.content).toHaveLength(1);
  await reloadButton(page).click();
  await expect(status(page)).toHaveText("Capa recarregada."); await decoded(panel(page).getByRole("img"));
  await reloadButton(page).click();
  await expect(status(page)).toContainText("Tente novamente.");
  await expect(panel(page).getByText("Capa indisponível.", { exact: true })).toBeVisible();
  await reloadButton(page).click();
  await expect(status(page)).toHaveText("Capa recarregada."); await decoded(panel(page).getByRole("img"));
  expect(transport.content).toHaveLength(4);
  expect(transport.content.map(query => new URLSearchParams(query).get("revision"))).toEqual(["1", "1", "1", "1"]);
  expect(new Set(transport.content).size).toBe(4);
  expect(transport.commands).toHaveLength(0); expect(transport.directUploads).toBe(0);
});

test("UI fake authoritative expiry and stale revision preserve selection and allow a fresh attempt, replacement and removal", async ({ page, context }, info) => {
  for (const code of ["EXPIRED", "STALE_REVISION"] as const) {
    const transport = await fakeCover(page, context, info);
    transport.onConfirm = async (route, _path, count) => {
      if (count === 1) {
        if (code === "STALE_REVISION") transport.dto = { ...transport.dto, image: { revision: 2, hasImage: true, width: 32, height: 24 } };
        return route.fulfill({ status: code === "EXPIRED" ? 410 : 409, json: { error: { code, message: code === "EXPIRED" ? "O envio expirou. Selecione a imagem novamente." : "A capa mudou em outra sessão. Recarregue antes de tentar novamente." } }, headers: privateHeaders });
      }
      transport.dto = { ...transport.dto, image: { revision: transport.dto.image.revision + 1, hasImage: true, width: 32, height: 24 } };
      return route.fulfill({ json: transport.dto, headers: privateHeaders });
    };
    await page.goto(coverArea); await decoded(panel(page).getByRole("img"));
    await panel(page).locator('input[type="file"]').setInputFiles({ name: "invalid.txt", mimeType: "text/plain", buffer: Buffer.from("synthetic invalid input") });
    await expect(panel(page).getByRole("alert")).toContainText("JPEG, PNG ou WebP");
    expect(transport.commands).toHaveLength(0);
    await selectFile(page, transport.bytes);
    await uploadButton(page).focus(); await page.keyboard.press("Enter");
    await expect(panel(page).getByRole("alert")).toContainText(code === "EXPIRED" ? "O envio expirou." : "A capa mudou em outra sessão.");
    await expect(panel(page).locator('input[type="file"]')).not.toHaveValue("");
    await expect(panel(page).getByRole("img")).toHaveAttribute("src", /revision=1(?:&|$)/);
    expect(transport.commands).toHaveLength(1);
    await reloadButton(page).click(); await expect(status(page)).toHaveText("Capa recarregada.");
    await uploadButton(page).click();
    await expect(status(page)).toContainText("Capa salva."); await decoded(panel(page).getByRole("img"));
    expect(transport.commands).toHaveLength(2);
    expect(transport.commands[1].key).not.toBe(transport.commands[0].key);
    expect(transport.commands[1].expectedRevision).toBe(code === "EXPIRED" ? 1 : 2);
    expect(transport.confirmations[1]).not.toBe(transport.confirmations[0]);
    page.once("dialog", dialog => dialog.dismiss());
    await panel(page).getByRole("button", { name: "Remover capa", exact: true }).click();
    expect(transport.removals).toHaveLength(0);
    page.once("dialog", dialog => dialog.accept());
    await panel(page).getByRole("button", { name: "Remover capa", exact: true }).click();
    await expect(status(page)).toHaveText("Capa removida.");
    await expect(panel(page).getByText("Área sem capa.", { exact: true })).toBeVisible();
    expect(transport.dto.image.revision).toBeGreaterThan(0);
    expect(transport.removals).toHaveLength(1);
  }
});

test("UI fake RED/GREEN failed metadata reload cannot leave a completed older preview announced as pending", async ({ page, context }, info) => {
  const transport = await fakeCover(page, context, info, { userIndex: 2 });
  expect(transport.source.canEdit).toBe(false);
  const olderBytes = gate();
  let failMetadataNext = false;
  transport.onMetadata = async route => {
    if (failMetadataNext) {
      failMetadataNext = false;
      return route.fulfill({ status: 503, json: { error: { code: "UNAVAILABLE", message: "Metadados temporariamente indisponíveis." } }, headers: privateHeaders });
    }
    return route.fulfill({ json: transport.dto, headers: privateHeaders });
  };
  transport.onContent = async (route, _url, count) => {
    if (count === 2) await olderBytes.promise;
    await route.fulfill({ status: 200, contentType: "image/png", body: transport.bytes, headers: privateHeaders });
  };
  try {
    await page.goto(coverArea);
    await decoded(panel(page).getByRole("img"));
    expect(transport.content).toHaveLength(1);
    await reloadButton(page).click();
    await expect.poll(() => transport.content.length).toBe(2);
    await expect(status(page)).toHaveText("Tentando recarregar a capa…");
    const olderImage = await panel(page).getByRole("img").elementHandle();
    expect(olderImage).not.toBeNull();
    await olderImage!.evaluate(node => node.addEventListener("load", () => node.setAttribute("data-frontend-areas-observed-load", "yes"), { once: true }));
    expect(await olderImage!.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBe(0);
    // Arm the failure at this action boundary, never by an initial effect count.
    failMetadataNext = true;
    await reloadButton(page).click();
    const alert = panel(page).getByRole("alert");
    await expect(alert).toHaveText("Não foi possível recarregar a capa.");
    expect(transport.content).toHaveLength(2);
    olderBytes.release();
    await expect.poll(() => olderImage!.getAttribute("data-frontend-areas-observed-load")).toBe("yes");
    await decoded(panel(page).getByRole("img"));
    expect(transport.content.map(query => new URLSearchParams(query).get("revision"))).toEqual(["1", "1"]);
    expect(transport.commands).toHaveLength(0); expect(transport.confirmations).toHaveLength(0);
    expect(transport.removals).toHaveLength(0); expect(transport.directUploads).toBe(0);
    await capture(page, info, "ui-fake-metadata-error-after-pending-preview", alert);
    // The metadata error remains recoverable. The earlier byte request actually
    // completed, so its obsolete loading announcement must not remain forever.
    await expect(status(page)).not.toContainText(/Tentando|Carregando|Validando/);
    await expect(alert).toHaveText("Não foi possível recarregar a capa.");
  } finally { olderBytes.release(); }
});
