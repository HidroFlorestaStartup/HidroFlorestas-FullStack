import { expect, test, type BrowserContext, type Page, type TestInfo } from "@playwright/test";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../fixtures/auth-users";
import { AREA_FIXTURES, cleanupAreaFixtures, countAreaFixtures, setupAreaFixtures } from "../fixtures/areas";
import { cleanupLaboratoryFixtures } from "../fixtures/laboratories";

test.use({ trace: "off", screenshot: "off", video: "off" });
test.setTimeout(90_000);
test.beforeAll(async () => {
  await cleanupLaboratoryFixtures(process.env);
  await cleanupAreaFixtures(process.env);
  await runAuthFixtureCommand("teardown", process.env);
  await runAuthFixtureCommand("setup", process.env);
  await setupAreaFixtures(process.env);
});
test.afterAll(async () => {
  try { await cleanupLaboratoryFixtures(process.env); }
  finally {
    try { await cleanupAreaFixtures(process.env); }
    finally { await runAuthFixtureCommand("teardown", process.env); }
  }
  expect(await countAuthFixtureUsers(process.env)).toBe(0);
  expect(await countAreaFixtures(process.env)).toEqual({ users: 0, laboratories: 0, memberships: 0, areas: 0 });
});

const base = "/dashboard/laboratories/" + AREA_FIXTURES.laboratoryIds[0];
const archive = join(process.cwd(), ".accounts-validation", "frontend-workspace");
async function login(context: BrowserContext, info: TestInfo, userId: string) {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(userId), url: String(info.project.use.baseURL) }]);
}
async function capture(page: Page, info: TestInfo, state: string) {
  await mkdir(archive, { recursive: true });
  const output = info.outputPath("frontend-workspace-hf-ui035-" + state + ".png");
  await page.screenshot({ path: output, fullPage: false, animations: "disabled", mask: await page.locator("input:not([type=checkbox])").all() });
  await copyFile(output, join(archive, "frontend-workspace-hf-ui035-" + state + ".png"));
  const geometry = await page.evaluate(() => {
    const rect = (id: string) => { const element = document.getElementById(id); const box = element?.getBoundingClientRect();
      return box ? { top: box.top, right: box.right, bottom: box.bottom, left: box.left, height: box.height } : null; };
    return { width: innerWidth, height: innerHeight, header: rect("application-header"),
      navigation: rect("application-navigation"), content: rect("application-content"),
      documentOverflow: document.documentElement.scrollWidth > innerWidth };
  });
  await writeFile(join(archive, "hf-ui035-" + state + "-geometry.json"), JSON.stringify(geometry, null, 2) + "\n");
  await info.attach(state, { path: output, contentType: "image/png" });
  expect(geometry.documentOverflow).toBe(false);
  return geometry;
}

test("UI-01: outside laboratory hides Áreas and groups account actions without changing real routes", async ({ page, context }, info) => {
  await login(context, info, AUTH_FIXTURE_USERS[0].id);
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/workspace"); await page.waitForLoadState("networkidle");
  const nav = page.getByRole("navigation", { name: "Navegação principal", exact: true });
  await expect(nav.getByRole("link", { name: "Laboratórios", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Áreas", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Sair", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
  const account = page.getByRole("button", { name: "Conta", exact: true });
  await account.click();
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveAttribute("href", "/change-password");
  await expect(page.getByRole("link", { name: "Excluir conta", exact: true })).toHaveAttribute("href", "/delete-account");
  await capture(page, info, "workspace-375-account-open");
  await account.press("Escape");
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(account).toBeVisible();
  await expect(page.getByRole("link", { name: "Sair", exact: true })).toBeVisible();
  await capture(page, info, "workspace-1440");
});

for (const width of [320, 375, 390, 768, 1440]) {
  test("UI-05: authorised laboratory rail and last content remain reachable at " + width + "px", async ({ page, context }, info) => {
    await login(context, info, AREA_FIXTURES.userIds[0]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base); await page.waitForLoadState("networkidle");
    if (width === 320) await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    const nav = page.getByRole("navigation", { name: "Laboratório", exact: true });
    await expect(nav).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Navegação principal", exact: true })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "Laboratórios", exact: true })).toHaveAttribute("href", "/workspace");
    for (const destination of ["Resumo", "Áreas", "Mapa", "Membros"]) {
      await expect(nav.getByRole("link", { name: destination, exact: true })).toBeVisible();
    }
    const geometry = await capture(page, info, "laboratory-" + width + (width === 320 ? "-text200" : ""));
    if (width < 768) {
      expect(geometry.navigation?.bottom).toBeGreaterThanOrEqual(898);
      expect(geometry.navigation?.top).toBeGreaterThan(geometry.header?.bottom ?? 0);
      const last = page.locator("#application-content a:visible, #application-content button:visible, #application-content input:visible").last();
      await last.focus();
      await expect.poll(async () => last.evaluate(node => {
        const r = node.getBoundingClientRect();
        const rail = document.getElementById("application-navigation")!.getBoundingClientRect();
        return r.top >= 0 && r.bottom <= rail.top - 2;
      })).toBe(true);
      await capture(page, info, "laboratory-" + width + "-last-control");
    } else {
      expect(geometry.navigation?.top).toBeGreaterThanOrEqual(0);
    }
    await nav.getByRole("link", { name: "Áreas", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(base + "/areas$"));
    await expect(nav.getByRole("link", { name: "Áreas", exact: true })).toHaveAttribute("aria-current", "page");
    await page.goBack(); await expect(page).toHaveURL(new RegExp(base + "$"));
    await page.goForward(); await expect(page).toHaveURL(new RegExp(base + "/areas$"));
    await page.reload(); await expect(nav.getByRole("link", { name: "Áreas", exact: true })).toHaveAttribute("aria-current", "page");
  });
}
test("UI-01: MEMBER does not receive server-authorised Membros link", async ({ page, context }, info) => {
  await login(context, info, AREA_FIXTURES.userIds[2]);
  await page.goto(base); await page.waitForLoadState("networkidle");
  const nav = page.getByRole("navigation", { name: "Laboratório", exact: true });
  await expect(nav.getByRole("link", { name: "Membros", exact: true })).toHaveCount(0);
  for (const name of ["Resumo", "Áreas", "Mapa"]) await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
});
test("UI-05: simulated bottom safe-area increases the actual fixed rail padding", async ({ page, context }, info) => {
  await login(context, info, AREA_FIXTURES.userIds[0]);
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(base); await page.waitForLoadState("networkidle");
  const nav = page.getByRole("navigation", { name: "Laboratório", exact: true });
  const before = await nav.evaluate(el => parseFloat(getComputedStyle(el).paddingBottom));
  const cdp = await context.newCDPSession(page);
  try {
    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 34, bottomMax: 34 } });
    await expect.poll(() => nav.evaluate(el => parseFloat(getComputedStyle(el).paddingBottom))).toBeGreaterThanOrEqual(before + 34);
    await capture(page, info, "laboratory-375-safearea34");
  } finally {
    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 0, bottomMax: 0 } });
    await cdp.detach();
  }
});
