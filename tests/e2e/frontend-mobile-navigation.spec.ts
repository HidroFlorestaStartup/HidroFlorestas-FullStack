import { expect, test, type BrowserContext, type Locator, type Page, type TestInfo } from "@playwright/test";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../fixtures/auth-users";
import { AREA_FIXTURES, cleanupAreaFixtures, countAreaFixtures, createAreaFixtureClient, setupAreaFixtures } from "../fixtures/areas";
import { cleanupLaboratoryFixtures } from "../fixtures/laboratories";

test.setTimeout(90_000);
test.use({ hasTouch: true, trace: "off", screenshot: "off", video: "off" });
test.beforeAll(async () => {
  await cleanupLaboratoryFixtures(process.env); await cleanupAreaFixtures(process.env);
  await runAuthFixtureCommand("teardown", process.env); await runAuthFixtureCommand("setup", process.env);
  await setupAreaFixtures(process.env);
});
test.afterAll(async () => {
  try { await cleanupLaboratoryFixtures(process.env); }
  finally { try { await cleanupAreaFixtures(process.env); } finally { await runAuthFixtureCommand("teardown", process.env); } }
  expect(await countAuthFixtureUsers(process.env)).toBe(0);
  expect(await countAreaFixtures(process.env)).toEqual({ users: 0, laboratories: 0, memberships: 0, areas: 0 });
});
test.afterEach(async ({ page }) => { await page.locator("input").evaluateAll(nodes => nodes.forEach(node => {
  if (node instanceof HTMLInputElement) { node.value = ""; node.removeAttribute("value"); }
})).catch(() => {}); });
async function login(context: BrowserContext, info: TestInfo, id: string) {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(id), url: String(info.project.use.baseURL) }]);
}
const archive = join(process.cwd(), ".accounts-validation", "frontend-mobile-navigation");
const prefix = process.env.FRONTEND_MOBILE_CAPTURE_PREFIX === "before" ? "before" : "after";
async function capture(page: Page, info: TestInfo, name: string, records: unknown[]) {
  await mkdir(archive, { recursive: true });
  const filename = "frontend-mobile-navigation-" + prefix + "-" + name;
  const path = info.outputPath(filename + ".png");
  await page.screenshot({ path, fullPage: false, animations: "disabled", mask: await page.locator("input").all() });
  await copyFile(path, join(archive, filename + ".png"));
  const geometry = await page.evaluate(() => {
    const box = (id: string) => { const r = document.getElementById(id)?.getBoundingClientRect(); return r ? { top: r.top, bottom: r.bottom, height: r.height } : null; };
    return { width: innerWidth, height: innerHeight, text: getComputedStyle(document.documentElement).fontSize,
      scrollY, header: box("application-header"), navigation: box("application-navigation"),
      safeAreaMethod: "Chromium emulation; no physical display inset", screenshot: "viewport/fullPage:false" };
  });
  records.push({ name, ...geometry });
  await info.attach(name, { path, contentType: "image/png" });
}
async function visibleWithinReadingArea(target: Locator) {
  return target.evaluate(node => {
    const r = node.getBoundingClientRect();
    const header = document.getElementById("application-header")!.getBoundingClientRect();
    const rail = document.getElementById("application-navigation")!.getBoundingClientRect();
    const bottom = matchMedia("(max-width:767px)").matches ? rail.top : innerHeight;
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    return { top: r.top, bottom: r.bottom, header: header.bottom, footer: bottom,
      visible: r.top >= header.bottom && r.bottom <= bottom,
      hit: node.contains(document.elementFromPoint(x, y)) };
  });
}
for (const width of [375, 320]) for (const percent of [100, 200]) {
  test("mobile viewport reading area " + width + "px text" + percent, async ({ page, context }, info) => {
    const records: unknown[] = [];
    const db = createAreaFixtureClient(process.env);
    const owner = AREA_FIXTURES.userIds[0];
    const original = await db.user.findUniqueOrThrow({ where: { id: owner }, select: { role: true } });
    const name = width + "-text" + percent;
    try {
      await page.setViewportSize({ width, height: 900 });
      await login(context, info, AUTH_FIXTURE_USERS[0].id);
      await page.goto("/workspace"); await page.waitForLoadState("networkidle");
      await page.addStyleTag({ content: "html { font-size:" + percent + "% !important; }" });
      await expect(page.getByText("Você ainda não participa de um laboratório.", { exact: true })).toBeVisible();
      await capture(page, info, name + "-empty-start", records);
      const create = page.getByRole("button", { name: "Criar laboratório", exact: true });
      await create.focus(); await page.waitForTimeout(50);
      await capture(page, info, name + "-empty-create-focus", records);
      expect.soft((await visibleWithinReadingArea(create)).visible, "Create wholly inside actual reading area after application focus handling").toBe(true);
      await page.getByLabel("Nome do laboratório", { exact: true }).fill("IMP-002 E2E Mobile viewport");
      await create.click();
      const created = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "IMP-002 E2E Mobile viewport", exact: true }) });
      await expect(created).toBeVisible();
      await cleanupLaboratoryFixtures(process.env);
      await login(context, info, owner);
      for (const isAdmin of [false, true]) {
        await db.user.update({ where: { id: owner }, data: { role: isAdmin ? "ADMIN" : original.role } });
        await page.goto("/workspace"); await page.waitForLoadState("networkidle");
        await page.addStyleTag({ content: "html { font-size:" + percent + "% !important; }" });
        const list = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: AREA_FIXTURES.prefix + " 0", exact: true }) });
        await expect(list).toBeVisible();
        const nav = page.getByRole("navigation", { name: "Navegação principal", exact: true });
        expect(await nav.getByRole("link").count()).toBe(isAdmin ? 4 : 3);
        const state = name + (isAdmin ? "-four-links" : "-three-links");
        for (const position of ["start", "middle", "end"]) {
          await page.evaluate(position => window.scrollTo(0, position === "start" ? 0 : position === "middle" ? document.documentElement.scrollHeight / 2 : document.documentElement.scrollHeight), position);
          await capture(page, info, state + "-" + position, records);
        }
        const controls = [page.getByRole("button", { name: "Criar laboratório", exact: true }),
          ...await page.getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true }).all(),
          ...await page.getByRole("button", { name: "Configurações", exact: true }).all()];
        for (const control of controls) {
          await control.focus(); await page.waitForTimeout(50);
          const result = await visibleWithinReadingArea(control);
          expect.soft(result.visible, state + ": focused " + await control.innerText() + ": " + JSON.stringify(result)).toBe(true);
          expect.soft(result.hit, "Control center receives a real pointer hit").toBe(true);
        }
        const settings = list.getByRole("button", { name: "Configurações", exact: true });
        await settings.focus(); await page.waitForTimeout(50);
        await capture(page, info, state + "-last-control-focus", records);
        await settings.tap(); await expect(page.getByRole("dialog")).toBeVisible(); await page.keyboard.press("Escape");
        await expect(settings).toBeFocused();
        await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await expect(settings).toBeFocused();
        const access = list.getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true });
        await access.click(); await expect(page).toHaveURL(new RegExp("/dashboard/laboratories/" + AREA_FIXTURES.laboratoryIds[0] + "$"));
        await expect(page.locator("#history-title")).toBeVisible(); await page.waitForLoadState("networkidle"); await page.goBack();
        await expect(list).toBeVisible(); await page.waitForLoadState("networkidle");
        await page.setViewportSize({ width: 667, height: 375 }); await capture(page, info, state + "-landscape", records);
        await page.setViewportSize({ width, height: 900 });
        await page.getByRole("button", { name: "Conta", exact: true }).click();
        await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toBeVisible(); await page.keyboard.press("Escape");
        await page.setViewportSize({ width: 768, height: 900 });
        await expect(page.getByRole("button", { name: "Conta", exact: true })).toHaveCount(0);
        await page.setViewportSize({ width, height: 900 });
      }
      await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Sair", exact: true }).click();
      await expect(page).toHaveURL(/\/login$/);
    } finally {
      await db.user.update({ where: { id: owner }, data: { role: original.role } }); await db.$disconnect();
      await cleanupLaboratoryFixtures(process.env); await mkdir(archive, { recursive: true });
      await writeFile(join(archive, "frontend-mobile-navigation-" + prefix + "-" + name + "-geometry.json"), JSON.stringify(records, null, 2) + "\n");
    }
  });
}
