import { expect, test, type BrowserContext, type Page, type TestInfo } from "@playwright/test";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import type { TerritorialMapResponse } from "../../src/types/territorial-map.type";
import {
  DASHBOARD_FIXTURE_CONFIRMATION, DASHBOARD_FIXTURES, DASHBOARD_FIXTURE_PREFIX,
  cleanupDashboardFixtures, countDashboardFixtures, createDashboardFixtureClient,
  setupDashboardFixtures, validateDashboardFixtureEnvironment,
} from "../fixtures/dashboard-history";
import { waitForMissionRender } from "./support/frontend-mission-evidence";
import { captureTerritorialViewport, expectTerritorialControl, expectTerritorialReflow } from "./support/frontend-territorial-map-evidence";

test.describe.configure({ mode: "serial" });
test.use({ trace: "off", screenshot: "off", video: "off" });

const [laboratoryId, inactiveId, emptyId] = DASHBOARD_FIXTURES.laboratoryIds;
const base = `/dashboard/laboratories/${laboratoryId}/map`;
const endpoint = `/api/laboratories/${laboratoryId}/territorial-map`;
// Within the existing 100-character area-name contract. The long unbroken word
// is persisted in the guarded fixture, not fabricated in the transport or DOM.
const longName = `${DASHBOARD_FIXTURE_PREFIX} zona ${"Territorio".repeat(8)}`;

async function login(context: BrowserContext, info: TestInfo) {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(DASHBOARD_FIXTURES.userIds[0]), url: String(info.project.use.baseURL) }]);
}

function areaButtons(page: Page) {
  return page.locator('button[aria-controls="selected-area-panel"]');
}

async function blockTiles(page: Page) {
  await page.route("https://tile.openstreetmap.org/**", route => route.abort());
}

async function openMap(page: Page): Promise<TerritorialMapResponse> {
  const read = page.waitForResponse(response => new URL(response.url()).pathname === endpoint && response.request().method() === "GET");
  await page.goto(base);
  const response = await read;
  expect(response.status()).toBe(200);
  const body: TerritorialMapResponse = await response.json();
  await expect(areaButtons(page)).toHaveCount(body.areas.length);
  return body;
}

test.beforeAll(async () => {
  expect(process.env.DASHBOARD_FIXTURE_CONFIRMATION).toBe(DASHBOARD_FIXTURE_CONFIRMATION);
  await setupDashboardFixtures(process.env);
  expect(longName.length).toBeLessThanOrEqual(100);
  const safe = validateDashboardFixtureEnvironment(process.env);
  const prisma = createDashboardFixtureClient(safe.testDatabaseUrl);
  try {
    await prisma.collectionArea.update({ where: { id: DASHBOARD_FIXTURES.areaIds[9] }, data: { name: longName } });
  } finally {
    await prisma.$disconnect();
  }
});

test.afterAll(async () => {
  await cleanupDashboardFixtures(process.env);
  expect(await countDashboardFixtures(process.env)).toEqual({ users: 0, laboratories: 0, memberships: 0, areas: 0, collections: 0 });
});

const viewports = [
  { width: 320, height: 760, text: 100 },
  { width: 375, height: 900, text: 100 },
  { width: 768, height: 900, text: 100 },
  { width: 1440, height: 900, text: 100 },
  { width: 320, height: 760, text: 200 },
  { width: 844, height: 390, text: 100 },
] as const;

for (const viewport of viewports) {
  const label = `${viewport.width}x${viewport.height}-text${viewport.text}`;
  test(`real map and textual alternative remain usable with keyboard at ${label}`, async ({ page, context }, info) => {
    await page.setViewportSize(viewport);
    await login(context, info);
    await blockTiles(page);
    const body = await openMap(page);
    expect(body.areas).toHaveLength(12);
    if (viewport.text === 200) {
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
      await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("32px");
    }
    await expect(page.getByRole("heading", { name: `Áreas de ${body.context.name}`, exact: true })).toBeVisible();
    await expect(page.locator(".leaflet-marker-icon")).toHaveCount(body.areas.filter(area => area.location).length);
    await expect(page.getByText("Base cartográfica indisponível. A lista permanece completa.", { exact: true })).toBeVisible();
    for (const area of body.areas) {
      await expect(areaButtons(page).filter({ has: page.getByText(area.name, { exact: true }) })).toHaveCount(1);
    }
    const zoom = page.locator(".leaflet-control-zoom-in");
    await zoom.focus();
    await expectTerritorialControl(zoom, page, info, `zoom-${label}`);
    const zoomBox = await zoom.boundingBox();
    expect(zoomBox?.width).toBeGreaterThanOrEqual(44);
    expect(zoomBox?.height).toBeGreaterThanOrEqual(44);
    await captureTerritorialViewport(page, info, `map-${label}`, zoom);
    await expect(page.locator(".leaflet-control-attribution").getByRole("link", { name: "OpenStreetMap" })).toBeVisible();

    // All fixture points coincide. Keyboard activation still identifies the
    // exact marker and opens the same record as its textual alternative.
    const firstArea = body.areas[0];
    const marker = page.locator(".leaflet-marker-icon")
      .and(page.getByTitle(`Selecionar ${firstArea.name}, área ${firstArea.id}`, { exact: true }));
    await marker.focus();
    await marker.press("Enter");
    await expect(page.locator("#selected-area-title")).toHaveText(firstArea.name);
    await expect(areaButtons(page).first()).toHaveAttribute("aria-pressed", "true");

    // Space activates another marker and updates the same selection.
    const secondArea = body.areas[1];
    const secondMarker = page.locator(".leaflet-marker-icon")
      .and(page.getByTitle(`Selecionar ${secondArea.name}, área ${secondArea.id}`, { exact: true }));
    await secondMarker.focus();
    await secondMarker.press("Space");
    await expect(page.locator("#selected-area-title")).toHaveText(secondArea.name);
    await expect(areaButtons(page).nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(areaButtons(page).first()).toHaveAttribute("aria-pressed", "false");

    // Tab through the actual complete list, then reach both final destinations.
    await areaButtons(page).first().focus();
    for (let index = 1; index < body.areas.length; index += 1) await page.keyboard.press("Tab");
    const last = areaButtons(page).last();
    await expect(last).toBeFocused();
    await expect(last).toContainText(longName);
    await expectTerritorialControl(last, page, info, `last-area-${label}`);
    await captureTerritorialViewport(page, info, `last-area-focus-${label}`, last);
    await page.keyboard.press("Enter");
    const selected = body.areas.at(-1)!;
    await expect(last).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#selected-area-title")).toHaveText(selected.name);
    await expect(page.getByText(`Área selecionada: ${selected.name}`, { exact: true })).toBeAttached();
    const panel = page.locator("#selected-area-panel");
    await expect(panel.getByRole("heading", { name: `Coletas confirmadas (${selected.confirmedCollections.length})`, exact: true })).toBeVisible();
    const areaLink = panel.getByRole("link", { name: "Abrir detalhe da área", exact: true });
    await page.keyboard.press("Tab");
    await expect(areaLink).toBeFocused();
    await expect(areaLink).toHaveAttribute("href", `/dashboard/laboratories/${laboratoryId}/areas/${selected.id}`);
    await expectTerritorialControl(areaLink, page, info, `area-link-${label}`);
    const collectionLink = panel.getByRole("link", { name: "Abrir coleta", exact: true }).last();
    await page.keyboard.press("Tab");
    await expect(collectionLink).toBeFocused();
    const destination = `/dashboard/laboratories/${laboratoryId}/areas/${selected.id}/collections/${selected.confirmedCollections.at(-1)!.id}`;
    await expect(collectionLink).toHaveAttribute("href", destination);
    await expectTerritorialControl(collectionLink, page, info, `collection-link-${label}`);
    expect(await collectionLink.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
    await captureTerritorialViewport(page, info, `final-action-focus-${label}`, collectionLink);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(destination);
  });
}

test("transient transport shows loading and error then retries the real endpoint", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await login(context, info);
  await blockTiles(page);
  let release!: () => void;
  const held = new Promise<void>(resolve => { release = resolve; });
  let fail = true;
  await page.route(`**${endpoint}`, async route => {
    if (!fail) return route.continue();
    await held;
    await route.fulfill({ status: 503, json: { error: "SYNTHETIC_TRANSPORT_FAILURE" } });
  });
  try {
    await page.goto(base);
    await expect(page.getByRole("status").filter({ hasText: "Carregando visão territorial…" })).toBeVisible();
    await expect(areaButtons(page)).toHaveCount(0);
    await page.evaluate(waitForMissionRender);
    await captureTerritorialViewport(page, info, "transport-loading-375");
    release();
    const applicationAlerts = page.locator("#application-content").getByRole("alert");
    await expect(applicationAlerts).toHaveCount(1);
    await expect(applicationAlerts).toHaveText("Não foi possível carregar a visão territorial.");
    const retry = page.getByRole("button", { name: "Tentar novamente", exact: true });
    await retry.focus();
    await expectTerritorialControl(retry, page, info, "retry-375");
    await captureTerritorialViewport(page, info, "transport-error-focus-375", retry);
    fail = false;
    const resumed = page.waitForResponse(response => new URL(response.url()).pathname === endpoint && response.status() === 200);
    await page.keyboard.press("Enter");
    const real: TerritorialMapResponse = await (await resumed).json();
    await expect(areaButtons(page)).toHaveCount(real.areas.length);
    await expect(applicationAlerts).toHaveCount(0);
    await expect(page.locator('button[aria-controls="selected-area-panel"][aria-pressed="true"]')).toHaveCount(0);
    await expect(page.locator("#selected-area-panel")).toHaveCount(0);
    await expectTerritorialReflow(page);
    await captureTerritorialViewport(page, info, "transport-recovered-375");
  } finally {
    release();
  }
});

test("empty and inactive contexts keep their real capabilities and selection resets on navigation", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await login(context, info);
  await blockTiles(page);
  await page.goto(`/dashboard/laboratories/${emptyId}/map`);
  await expect(page.getByRole("heading", { name: "Nenhuma área cadastrada", exact: true })).toBeVisible();
  const emptyAction = page.getByRole("link", { name: "Ir para áreas", exact: true });
  await emptyAction.focus();
  await expectTerritorialControl(emptyAction, page, info, "empty-action-320");
  await captureTerritorialViewport(page, info, "empty-320", emptyAction);
  await expect(areaButtons(page)).toHaveCount(0);

  await openMap(page);
  await areaButtons(page).first().press("Enter");
  await expect(page.locator("#selected-area-panel")).toBeVisible();
  await page.goto(`/dashboard/laboratories/${inactiveId}/map`);
  await expect(page.getByText(/Laboratório inativo, somente leitura/)).toBeVisible();
  await expect(areaButtons(page)).toHaveCount(1);
  await expect(page.locator("#selected-area-panel")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Ir para áreas", exact: true })).toHaveCount(0);
  await areaButtons(page).first().focus();
  await expectTerritorialControl(areaButtons(page).first(), page, info, "inactive-area-320");
  await captureTerritorialViewport(page, info, "inactive-320", areaButtons(page).first());
  await page.goBack();
  await expect(areaButtons(page)).toHaveCount(12);
  await expect(page.locator("#selected-area-panel")).toHaveCount(0);
  await expect(page.getByText(`${DASHBOARD_FIXTURE_PREFIX} inactive area`, { exact: true })).toHaveCount(0);
  await page.goForward();
  await expect(areaButtons(page)).toHaveCount(1);
  await expect(page.locator("#selected-area-panel")).toHaveCount(0);
  await areaButtons(page).first().press("Enter");
  await expect(page.locator("#selected-area-title")).toHaveText(`${DASHBOARD_FIXTURE_PREFIX} inactive area`);
  await page.reload();
  await expect(areaButtons(page)).toHaveCount(1);
  await expect(page.locator("#selected-area-panel")).toHaveCount(0);
  await expectTerritorialReflow(page);
});
