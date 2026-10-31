import { test, expect, type BrowserContext, type TestInfo } from "@playwright/test";
import { AREA_FIXTURES, setupAreaFixtures, cleanupAreaFixtures, countAreaFixtures } from "../fixtures/areas";
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
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/frontend-areas-hf-ui037-location-mobile.png", fullPage: false });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: "test-results/frontend-areas-hf-ui037-location-desktop.png", fullPage: false });
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
  expect("cep" in submitted).toBe(false); // shared write contract is not yet allocated
  await expect(page).toHaveURL(/\/areas\/[^/]+$/);
});
