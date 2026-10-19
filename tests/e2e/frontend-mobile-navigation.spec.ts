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
  const mask = [];
  for (const input of await page.locator("input").all()) {
    if (await input.evaluate(node => (node as HTMLInputElement).value.length > 0)) mask.push(input);
  }
  await page.screenshot({ path, fullPage: false, animations: "disabled", mask });
  await copyFile(path, join(archive, filename + ".png"));
  const geometry = await page.evaluate(() => {
    const box = (id: string) => { const node = document.getElementById(id); const r = node?.getBoundingClientRect(); return r && node ? { top: r.top, bottom: r.bottom, height: r.height, scrollTop: node.scrollTop, scrollHeight: node.scrollHeight, clientHeight: node.clientHeight } : null; };
    return { width: innerWidth, height: innerHeight, text: getComputedStyle(document.documentElement).fontSize,
      scrollY, content: box("application-content"), header: box("application-header"), navigation: box("application-navigation"),
      active: { tag: document.activeElement?.tagName, id: document.activeElement?.id },
      safeAreaMethod: "Chromium; labelled safe-area34 frames use CDP, no physical device", screenshot: "viewport/fullPage:false" };
  });
  records.push({ name, ...geometry });
  await info.attach(name, { path, contentType: "image/png" });
}
async function scrollPosition(page: Page) {
  return page.evaluate(() => {
    const content = document.getElementById("application-content")!;
    return getComputedStyle(content).overflowY === "auto" ? content.scrollTop : scrollY;
  });
}
async function focusAndExpose(target: Locator) {
  await target.focus();
  await expect.poll(async () => (await visibleWithinReadingArea(target)).visible).toBe(true);
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
      await focusAndExpose(create);
      await capture(page, info, name + "-empty-create-focus", records);
      expect.soft((await visibleWithinReadingArea(create)).visible, "Create wholly inside actual reading area after application focus handling").toBe(true);
      await page.getByLabel("Nome do laboratório", { exact: true }).fill("IMP-002 E2E Mobile viewport");
      await create.tap();
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
        for (const link of await nav.getByRole("link").all()) {
          const broken = await link.evaluate(node => {
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT); let child: Node | null;
            while ((child = walker.nextNode())) {
              const words = /[A-Za-zÀ-ÿ]+/g; let match: RegExpExecArray | null;
              while ((match = words.exec(child.textContent ?? ""))) {
                const range = document.createRange(); range.setStart(child, match.index); range.setEnd(child, match.index + match[0].length);
                if (range.getClientRects().length > 1) return true;
              }
            }
            return false;
          });
          expect.soft(broken, "Navigation labels keep whole words: " + await link.innerText()).toBe(false);
        }
        const state = name + (isAdmin ? "-four-links" : "-three-links");
        for (const position of ["start", "middle", "end"]) {
          await page.evaluate(position => {
            const content = document.getElementById("application-content")!;
            const root = getComputedStyle(content).overflowY === "auto" ? content : document.scrollingElement!;
            const maximum = root.scrollHeight - root.clientHeight;
            root.scrollTo(0, position === "start" ? 0 : position === "middle" ? maximum / 2 : maximum);
          }, position);
          await capture(page, info, state + "-" + position, records);
        }
        const controls = [page.getByRole("button", { name: "Criar laboratório", exact: true }),
          ...await page.getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true }).all(),
          ...await page.getByRole("button", { name: "Configurações", exact: true }).all()];
        for (const control of controls) {
          await focusAndExpose(control);
          const result = await visibleWithinReadingArea(control);
          records.push({ name: state + "-focused-control", label: await control.innerText(), ...result });
          expect.soft(result.visible, state + ": focused " + await control.innerText() + ": " + JSON.stringify(result)).toBe(true);
          expect.soft(result.hit, "Control center receives a real pointer hit").toBe(true);
        }
        const lastControl = page.locator("#application-content").locator("a:visible,button:visible,input:visible,textarea:visible,select:visible").last();
        await focusAndExpose(lastControl);
        records.push({ name: state + "-actual-last-control", label: await lastControl.innerText(), ...await visibleWithinReadingArea(lastControl) });
        expect.soft((await visibleWithinReadingArea(lastControl)).visible, "The actual final DOM control is exposed").toBe(true);
        await capture(page, info, state + "-actual-last-control", records);
        const settings = list.getByRole("button", { name: "Configurações", exact: true });
        await focusAndExpose(settings);
        await capture(page, info, state + "-last-control-focus", records);
        await settings.tap(); await expect(page.getByRole("dialog").getByText("Zona de perigo", { exact: true })).toBeVisible(); await page.keyboard.press("Escape");
        await expect(settings).toBeFocused();
        await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await expect(settings).toBeFocused();
        const access = list.getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true });
        await focusAndExpose(access);
        const originScroll = await scrollPosition(page);
        records.push({ name: state + "-before-push", scroll: originScroll });
        await access.click(); await expect(page).toHaveURL(new RegExp("/dashboard/laboratories/" + AREA_FIXTURES.laboratoryIds[0] + "$"));
        await expect(page.locator("#history-title")).toBeVisible(); await page.waitForLoadState("networkidle");
        records.push({ name: state + "-native-destination-heading", bounds: await page.getByRole("heading", { level: 1 }).boundingBox() });
        await capture(page, info, state + "-destination-summary-native", records);
        await page.goBack();
        await expect(list).toBeVisible(); await page.waitForLoadState("networkidle");
        records.push({ name: state + "-back-cache", positions: await page.evaluate(base => {
          try {
            const values: unknown = JSON.parse(sessionStorage.getItem("hidroflorestas.content-scroll.v1") ?? "[]");
            return Array.isArray(values) ? values.filter(entry => Array.isArray(entry) && (entry[0] === "/workspace" || entry[0] === base)) : [];
          } catch { return []; }
        }, "/dashboard/laboratories/" + AREA_FIXTURES.laboratoryIds[0]) });
        await capture(page, info, state + "-back-workspace-initial", records);
        await expect.poll(async () => Math.abs((await scrollPosition(page)) - originScroll)).toBeLessThanOrEqual(2);
        await capture(page, info, state + "-back-workspace", records);
        if (!isAdmin) {
          await page.goForward(); await expect(page.locator("#history-title")).toBeVisible();
          await page.waitForLoadState("networkidle"); await page.reload();
          await expect(page.locator("#history-title")).toBeVisible(); await page.waitForLoadState("networkidle");
          await page.addStyleTag({ content: "html { font-size:" + percent + "% !important; }" });
          await page.goBack(); await expect(list).toBeVisible(); await page.waitForLoadState("networkidle");
          await expect.poll(async () => Math.abs((await scrollPosition(page)) - originScroll)).toBeLessThanOrEqual(2);
          await capture(page, info, state + "-back-after-forward-reload", records);
        }
        await page.setViewportSize({ width: 667, height: 375 });
        await page.addStyleTag({ content: "html { font-size:" + percent + "% !important; }" });
        await focusAndExpose(settings);
        expect.soft((await visibleWithinReadingArea(settings)).visible, "Focused control exposed in landscape").toBe(true);
        await capture(page, info, state + "-landscape", records);
        const cdp = await context.newCDPSession(page);
        try {
          await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 34, bottomMax: 34 } });
          await expect.poll(() => nav.evaluate(node => parseFloat(getComputedStyle(node).paddingBottom))).toBe(42);
          await focusAndExpose(settings);
          const insetResult = await visibleWithinReadingArea(settings);
          records.push({ name: state + "-landscape-safe-area34-control", ...insetResult });
          expect.soft(insetResult.visible, "Focused control exposed with emulated 34px inset").toBe(true);
          await capture(page, info, state + "-landscape-safe-area34", records);
        } finally {
          await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 0, bottomMax: 0 } });
          await cdp.detach();
        }
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
