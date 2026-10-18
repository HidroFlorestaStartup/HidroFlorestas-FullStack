import { expect, test, type BrowserContext, type Locator, type Page, type TestInfo } from "@playwright/test";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../fixtures/auth-users";
import { AREA_FIXTURES, cleanupAreaFixtures, countAreaFixtures, createAreaFixtureClient, setupAreaFixtures } from "../fixtures/areas";
import { cleanupLaboratoryFixtures, LABORATORY_FIXTURE_PREFIX } from "../fixtures/laboratories";

// Real authorization/lifecycle fixtures. Only tests explicitly labelled transient
// transport intercept failures; they never provide invented permissions or data.
test.use({ trace: "off", screenshot: "off", video: "off" });
test.beforeEach(async ({ page }) => { await page.route("https://tile.openstreetmap.org/**", route => route.abort()); });
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
test.afterEach(async ({ page }) => {
  await page.locator("input").evaluateAll(nodes => nodes.forEach(node => { if (node instanceof HTMLInputElement) { node.value = ""; node.removeAttribute("value"); } })).catch(() => {});
});

const laboratoryId = AREA_FIXTURES.laboratoryIds[0];
const laboratoryName = `${AREA_FIXTURES.prefix} 0`;
const base = `/dashboard/laboratories/${laboratoryId}`;
async function login(context: BrowserContext, info: TestInfo, userId = AREA_FIXTURES.userIds[0]) {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(userId), url: String(info.project.use.baseURL) }]);
}
function card(page: Page, name = laboratoryName) {
  return page.getByRole("listitem").filter({ has: page.getByRole("heading", { name, exact: true }) });
}
async function capture(page: Page, info: TestInfo, name: string) {
  const path = info.outputPath(`frontend-workspace-${name}.png`);
  const mask = [];
  for (const input of await page.locator('input:not([type="checkbox"])').all()) {
    if (await input.evaluate(node => (node as HTMLInputElement).value.length > 0)) mask.push(input);
  }
  const overlay = /settings|menu|focus|risk|delete-blocker/.test(name);
  await page.screenshot({ path, fullPage: !overlay, animations: "disabled", mask });
  const archive = join(process.cwd(), ".accounts-validation", "frontend-workspace");
  await mkdir(archive, { recursive: true });
  await copyFile(path, join(archive, `frontend-workspace-${name}.png`));
  await info.attach(name, { path, contentType: "image/png" });
}
async function settled(page: Page) { await page.waitForLoadState("networkidle"); }
async function enlarge(page: Page, width: number) {
  if (width === 320) {
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("32px");
  }
}
async function hasBrokenWord(target: Locator) {
  return target.evaluate(node => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT); let child: Node | null;
    while ((child = walker.nextNode())) {
      const value = child.textContent ?? ""; const words = /[A-Za-zÀ-ÿ]+/g; let match: RegExpExecArray | null;
      while ((match = words.exec(value))) {
        const range = document.createRange(); range.setStart(child, match.index); range.setEnd(child, match.index + match[0].length);
        if (range.getClientRects().length > 1) return true;
      }
    }
    return false;
  });
}

for (const width of [375, 768, 1440, 320]) {
  test(`workspace and existing consumers at ${width}px${width === 320 ? " text200" : ""}`, async ({ page, context }, info) => {
    await page.setViewportSize({ width, height: 900 });
    const issues: string[] = [];
    await login(context, info, AUTH_FIXTURE_USERS[0].id);
    await page.goto("/workspace"); await settled(page); await enlarge(page, width);
    await expect(page.getByText("Você ainda não participa de um laboratório.")).toBeVisible();
    await capture(page, info, `empty-${width}`);
    if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) issues.push("empty overflow");
    if (!await page.getByRole("navigation", { name: "Navegação principal", exact: true }).count()) issues.push("workspace navigation absent");
    await login(context, info);
    await page.goto("/workspace"); await settled(page); await enlarge(page, width);
    await expect(card(page)).toBeVisible();
    await expect(card(page, `${AREA_FIXTURES.prefix} 1`).getByText("Inativo", { exact: true })).toBeVisible();
    await capture(page, info, `list-${width}`);
    if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) issues.push("list overflow");
    if (width === 320) {
      for (const target of await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link").all()) {
        if (await hasBrokenWord(target)) issues.push(`primary navigation breaks a word: ${await target.innerText()}`);
      }
      if (await hasBrokenWord(card(page).getByRole("button", { name: "Configurações", exact: true }))) issues.push("card settings label breaks inside a word");
    }
    await card(page).getByRole("button", { name: "Configurações", exact: true }).click();
    await expect(page.getByRole("dialog").getByText("Zona de perigo", { exact: true })).toBeVisible();
    await capture(page, info, `settings-${width}`);
    if (!await page.getByRole("dialog").evaluate(node => node.scrollWidth <= node.clientWidth)) issues.push("dialog overflow");
    const dialog = page.getByRole("dialog");
    if (width === 320 && await hasBrokenWord(dialog.getByText("Configurações", { exact: true }))) issues.push("settings heading breaks inside a word");
    await dialog.getByRole("button", { name: "Excluir laboratório", exact: true }).click();
    await expect(dialog.getByRole("button", { name: "Excluir permanentemente", exact: true })).toBeDisabled();
    await capture(page, info, `settings-confirmation-${width}`);
    if (width === 320) {
      const broken = await hasBrokenWord(dialog.getByRole("button", { name: "Excluir permanentemente", exact: true }));
      if (broken) issues.push("risk confirmation label breaks inside a word");
    }
    await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
    await expect(dialog.getByRole("button", { name: "Excluir laboratório", exact: true })).toBeFocused();
    await page.getByRole("button", { name: "Fechar configurações" }).click();
    // These pages retain their existing content; inspect the new surrounding
    // chrome and keep existing domain assertions in their original suites.
    for (const suffix of ["", "/areas", "/map", "/members"]) {
      await page.goto(`${base}${suffix}`); await settled(page); await enlarge(page, width);
      await expect(page.getByRole("navigation", { name: "Laboratório", exact: true })).toBeVisible();
      await expect(page.locator("main")).toHaveCount(suffix === "" || suffix === "/map" ? 1 : 0);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await capture(page, info, `consumer-${suffix.slice(1) || "summary"}-${width}`);
      for (const target of await page.getByRole("navigation", { name: "Laboratório", exact: true }).getByRole("link").all()) {
        const box = await target.boundingBox();
        if (!box || box.width < 44 || box.height < 44) issues.push(`${suffix || "summary"}: contextual target below44px`);
      }
    }
    expect(issues).toEqual([]);
  });
}

test("settings contains keyboard focus, Escape restores the trigger and close cancels", async ({ page, context }, info) => {
  await login(context, info); await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/workspace"); await settled(page);
  const trigger = card(page).getByRole("button", { name: "Configurações", exact: true });
  await trigger.focus(); await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Zona de perigo")).toBeVisible();
  await capture(page, info, "settings-focus");
  await expect.poll(() => dialog.evaluate(node => node.contains(document.activeElement))).toBe(true);
  await dialog.getByRole("button", { name: "Fechar configurações" }).focus(); await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Excluir laboratório", exact: true })).toBeFocused();
  await page.keyboard.press("Tab"); await expect(dialog.getByRole("button", { name: "Fechar configurações" })).toBeFocused();
  for (let index = 0; index < 7; index++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(node => node.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Shift+Tab");
  expect(await dialog.evaluate(node => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape"); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused();
  expect((await context.request.get(`/api/laboratories/${laboratoryId}`)).status()).toBe(200);
});

test("real owner creates, confirms exact name, deactivates and deletes without implicit selection", async ({ page, context }, info) => {
  await login(context, info, AUTH_FIXTURE_USERS[0].id);
  const name = `${LABORATORY_FIXTURE_PREFIX} Frontend lifecycle`;
  try {
  const created = await context.request.post("/api/laboratories", { data: { name } });
  expect(created.status()).toBe(201);
  const id = (await created.json()).laboratory.id as string;
  await page.goto("/workspace"); await settled(page);
  await card(page, name).getByRole("button", { name: "Configurações", exact: true }).click();
  let dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Desativar laboratório", exact: true }).click();
  await dialog.getByLabel("Nome do laboratório", { exact: true }).fill(`${name} incorreto`);
  await expect(dialog.getByRole("button", { name: "Desativar laboratório", exact: true })).toBeDisabled();
  await dialog.getByLabel("Nome do laboratório", { exact: true }).fill(name);
  const deactivated = page.waitForResponse(r => r.url().endsWith(`/api/laboratories/${id}`) && r.request().method() === "PATCH");
  await dialog.getByRole("button", { name: "Desativar laboratório", exact: true }).click(); expect((await deactivated).status()).toBe(200);
  await expect(card(page, name).getByText("Inativo", { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/workspace$/);
  await expect(page.getByRole("heading", { name: "Seus laboratórios", exact: true })).toBeFocused();
  await card(page, name).getByRole("button", { name: "Configurações", exact: true }).click();
  dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: "Desativar laboratório", exact: true })).toBeDisabled();
  await dialog.getByRole("button", { name: "Excluir laboratório", exact: true }).click();
  await dialog.getByLabel("Nome do laboratório", { exact: true }).fill(name);
  const deleted = page.waitForResponse(r => r.url().endsWith(`/api/laboratories/${id}`) && r.request().method() === "DELETE");
  await dialog.getByRole("button", { name: "Excluir permanentemente", exact: true }).click(); expect((await deleted).status()).toBe(200);
  await expect(card(page, name)).toHaveCount(0); await expect(page).toHaveURL(/\/workspace$/);
  await expect(page.getByRole("heading", { name: "Você ainda não participa de um laboratório.", exact: true })).toBeFocused();
  expect((await context.request.get(`/api/laboratories/${id}`)).status()).toBe(404);
  } finally { await cleanupLaboratoryFixtures(process.env); }
});

test("contextual roles, inactive access, explicit change and history stay real", async ({ page, context }, info) => {
  for (const index of [0, 1, 2]) {
    await login(context, info, AREA_FIXTURES.userIds[index]);
    await page.goto(base); await settled(page);
    const nav = page.getByRole("navigation", { name: "Laboratório", exact: true });
    await expect(nav.getByRole("link", { name: "Membros", exact: true })).toHaveCount(index === 0 ? 1 : 0);
    await nav.getByRole("link", { name: "Áreas", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${base}/areas$`)); await page.reload();
    await expect(page.getByText(laboratoryName, { exact: true })).toBeVisible();
    await page.goBack(); await expect(page).toHaveURL(new RegExp(`${base}$`));
    const membership = await context.request.get(`/api/laboratories/${laboratoryId}/memberships`);
    expect(membership.status()).toBe(index === 0 ? 200 : 403);
  }
  await login(context, info);
  await page.goto(`/dashboard/laboratories/${AREA_FIXTURES.laboratoryIds[1]}/areas`); await settled(page);
  await expect(page.getByText("OWNER · Inativo · Somente leitura", { exact: true })).toBeVisible();
  await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Laboratórios", exact: true }).click();
  await expect(page).toHaveURL(/\/workspace$/);
  await card(page).getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${base}$`));
});

test("global administration uses server capability without bypassing laboratory membership", async ({ page, context }, info) => {
  const db = createAreaFixtureClient(process.env); const id = AREA_FIXTURES.userIds[3];
  try {
    await db.user.update({ where: { id }, data: { role: "ADMIN" } });
    await login(context, info, id); await page.goto("/workspace"); await settled(page);
    await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Administração", exact: true }).click();
    await expect(page).toHaveURL(/\/admin$/);
    for (const width of [375, 768, 1440, 320]) {
      await page.setViewportSize({ width, height: 900 }); await page.goto("/admin"); await settled(page); await enlarge(page, width);
      await expect(page.locator("header").getByText("Administração global", { exact: true })).toBeVisible();
      await capture(page, info, `existing-global-admin-${width}`);
    }
    expect((await context.request.get(`/api/laboratories/${laboratoryId}/areas`)).status()).toBe(404);
  } finally { await db.user.update({ where: { id }, data: { role: "USER" } }); await db.$disconnect(); }
});

test("mobile account disclosure closes with Escape, navigation and desktop resize", async ({ page, context }, info) => {
  await login(context, info); await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/workspace"); await settled(page);
  const menu = page.getByRole("button", { name: "Conta", exact: true });
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
  await menu.focus(); await page.keyboard.press("Enter"); await page.keyboard.press("Tab");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toBeFocused();
  await capture(page, info, "mobile-menu-focus");
  await page.keyboard.press("Escape"); await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
  await menu.click(); await page.mouse.click(8, 8);
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
  await menu.click(); await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Laboratórios", exact: true }).focus();
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
  await menu.click(); await page.getByRole("link", { name: "Alterar senha", exact: true }).click();
  await expect(page).toHaveURL(/\/change-password$/); await page.goBack(); await settled(page);
  await menu.click(); await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('details[open]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "HidroFlorestas — ir ao workspace", exact: true })).toBeFocused();
  await expect(page.getByRole("link", { name: "Sair", exact: true })).toHaveCount(1);
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(page.getByRole("link", { name: "Alterar senha", exact: true })).toHaveCount(0);
});

test("transient list loading and error retry recover the real empty workspace", async ({ page, context }, info) => {
  await login(context, info, AUTH_FIXTURE_USERS[0].id); let release!: () => void;
  const held = new Promise<void>(resolve => { release = resolve; }); let failAttempt = true;
  await page.route("**/api/laboratories", async route => {
    if (route.request().method() !== "GET" || !failAttempt) return route.continue();
    await held; await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Falha transitória sintética." } });
  });
  try {
    await page.goto("/workspace"); await expect(page.getByRole("status")).toContainText("Carregando laboratórios");
    await capture(page, info, "list-loading"); release();
    await expect(page.locator("main").getByRole("alert")).toContainText("Não foi possível carregar"); await capture(page, info, "list-error");
    failAttempt = false;
    await page.getByRole("button", { name: "Tentar novamente", exact: true }).click();
    await expect(page.getByText("Você ainda não participa de um laboratório.")).toBeVisible();
  } finally { release(); }
});

test("keyboard skip link focuses content without adding a second main", async ({ page, context }, info) => {
  await login(context, info);
  for (const width of [375, 768, 1440, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/workspace"); await settled(page); await enlarge(page, width);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo", exact: true });
    await expect(skip).toBeFocused(); await capture(page, info, `skip-focus-${width}`); await page.keyboard.press("Enter");
    await expect(page.locator("#application-content")).toBeFocused(); await expect(page.locator("main")).toHaveCount(1);
    await capture(page, info, `skip-content-focus-${width}`);
    await expect.poll(async () => {
      const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
      const header = await page.locator("#application-header").boundingBox();
      const footer = width < 768 ? await page.locator("#application-navigation").boundingBox() : null;
      return Boolean(heading && header && heading.y >= header.y + header.height + 8
        && heading.y < header.y + header.height + 72 && heading.y + heading.height <= (footer?.y ?? 900) - 8);
    }).toBe(true);
  }
});

test("mobile focused content stays between sticky header and bottom navigation with text200", async ({ page, context }, info) => {
  await login(context, info); await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/workspace"); await settled(page); await enlarge(page, 320);
  const navigation = page.getByRole("navigation", { name: "Navegação principal", exact: true });
  await expect(navigation).toBeVisible();
  const target = card(page, `${AREA_FIXTURES.prefix} 1`).getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true });
  await target.focus();
  await expect.poll(async () => {
    const box = await target.boundingBox(); const header = await page.locator("#application-header").boundingBox(); const footer = await navigation.boundingBox();
    return Boolean(box && header && footer && box.y >= header.y + header.height + 8 && box.y + box.height <= footer.y - 8);
  }).toBe(true);
  await capture(page, info, "mobile-content-focus-text200");
});

test("transient create blocks same-turn duplicate requests and preserves payload", async ({ page, context }, info) => {
  await login(context, info, AUTH_FIXTURE_USERS[0].id); let release!: () => void; const held = new Promise<void>(resolve => { release = resolve; });
  const payloads: unknown[] = [];
  await page.route("**/api/laboratories", async route => {
    if (route.request().method() !== "POST") return route.continue();
    payloads.push(route.request().postDataJSON()); await held;
    await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Falha transitória sintética." } });
  });
  try {
    await page.goto("/workspace"); await settled(page);
    const name = `${LABORATORY_FIXTURE_PREFIX} Transient create`; await page.getByLabel("Nome do laboratório", { exact: true }).fill(`  ${name}  `);
    await page.locator("form").evaluate(form => { form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
    await expect.poll(() => payloads.length).toBeGreaterThan(0); await page.waitForTimeout(100);
    await capture(page, info, "create-loading"); expect(payloads).toEqual([{ name }]); release();
    await expect(page.locator("main").getByRole("alert")).toContainText("Falha transitória"); await capture(page, info, "create-error");
    expect((await (await context.request.get("/api/laboratories")).json()).laboratories).toHaveLength(0);
  } finally { release(); }
});

test("transient risk blocks same-turn duplicate PATCH and shows its error inside settings", async ({ page, context }, info) => {
  await login(context, info); let release!: () => void; const held = new Promise<void>(resolve => { release = resolve; }); const payloads: unknown[] = [];
  await page.route(`**/api/laboratories/${laboratoryId}`, async route => {
    if (route.request().method() !== "PATCH") return route.continue();
    payloads.push(route.request().postDataJSON()); await held;
    await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Falha transitória sintética." } });
  });
  try {
    await page.goto("/workspace"); await settled(page); await card(page).getByRole("button", { name: "Configurações", exact: true }).click();
    const dialog = page.getByRole("dialog"); await dialog.getByRole("button", { name: "Desativar laboratório", exact: true }).click();
    await dialog.getByLabel("Nome do laboratório", { exact: true }).fill(laboratoryName);
    await dialog.getByRole("button", { name: "Desativar laboratório", exact: true }).evaluate(button => { button.dispatchEvent(new MouseEvent("click", { bubbles: true })); button.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    await expect.poll(() => payloads.length).toBeGreaterThan(0); await page.waitForTimeout(100);
    await capture(page, info, "risk-loading"); expect(payloads).toEqual([{ confirmationName: laboratoryName }]);
    await page.keyboard.press("Escape"); await expect(dialog).toBeVisible(); release();
    await expect(dialog.getByRole("alert")).toContainText("Falha transitória"); await capture(page, info, "risk-error");
    const real = await (await context.request.get(`/api/laboratories/${laboratoryId}`)).json(); expect(real.details.status).toBe("ACTIVE");
  } finally { release(); }
});

test("transient settings read error is accessible in dialog and retry reads real details", async ({ page, context }, info) => {
  await login(context, info); let release!: () => void; const held = new Promise<void>(resolve => { release = resolve; }); let failed = false;
  await page.route(`**/api/laboratories/${laboratoryId}`, async route => {
    if (route.request().method() !== "GET" || failed) return route.continue();
    failed = true; await held; await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Falha transitória sintética." } });
  });
  try {
    await page.goto("/workspace"); await settled(page); await card(page).getByRole("button", { name: "Configurações", exact: true }).click();
    const dialog = page.getByRole("dialog"); await expect(dialog.getByRole("status")).toContainText("Carregando informações");
    await capture(page, info, "settings-loading"); release();
    await expect(page.locator("main").getByRole("alert")).toContainText("Falha transitória"); await capture(page, info, "settings-error");
    await expect(dialog.getByRole("alert")).toContainText("Falha transitória");
    await dialog.getByRole("button", { name: "Tentar novamente", exact: true }).click();
    await expect(dialog.getByText("Zona de perigo")).toBeVisible(); await expect(page).toHaveURL(/\/workspace$/);
  } finally { release(); }
});

test("lost membership between list and settings stays denied without selecting another context", async ({ page, context }, info) => {
  await login(context, info, AREA_FIXTURES.userIds[2]); const db = createAreaFixtureClient(process.env);
  const key = { userId: AREA_FIXTURES.userIds[2], laboratoryRoomId: laboratoryId };
  let removed = false;
  try {
    await page.goto("/workspace"); await settled(page); await expect(card(page)).toBeVisible();
    await db.researchersLinked.delete({ where: { userId_laboratoryRoomId: key } });
    removed = true;
    const denied = page.waitForResponse(r => r.url().endsWith(`/api/laboratories/${laboratoryId}`));
    await card(page).getByRole("button", { name: "Configurações", exact: true }).click(); expect((await denied).status()).toBe(404);
    await expect(page.getByRole("dialog").getByRole("alert")).toBeVisible(); await expect(page).toHaveURL(/\/workspace$/);
    await page.getByRole("button", { name: "Fechar configurações" }).click(); await page.reload(); await settled(page);
    await expect(card(page)).toHaveCount(0); await expect(card(page, `${AREA_FIXTURES.prefix} 1`)).toBeVisible(); await expect(page).toHaveURL(/\/workspace$/);
    expect((await context.request.get(`/api/laboratories/${laboratoryId}/areas`)).status()).toBe(404);
  } finally {
    try { if (removed) await db.researchersLinked.create({ data: { ...key, role: "MEMBER" } }); }
    finally { await db.$disconnect(); }
  }
});

test("server refuses deleting a laboratory with areas and keeps confirmation recoverable", async ({ page, context }, info) => {
  await login(context, info); await page.goto("/workspace"); await settled(page);
  await card(page).getByRole("button", { name: "Configurações", exact: true }).click(); const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Excluir laboratório", exact: true }).click();
  await dialog.getByLabel("Nome do laboratório", { exact: true }).fill(laboratoryName);
  const rejected = page.waitForResponse(r => r.url().endsWith(`/api/laboratories/${laboratoryId}`) && r.request().method() === "DELETE");
  await dialog.getByRole("button", { name: "Excluir permanentemente", exact: true }).click();
  const response = await rejected; expect(response.status()).toBe(409); expect((await response.json()).code).toBe("LABORATORY_HAS_DATA");
  await expect(dialog.getByRole("alert")).toBeVisible(); await capture(page, info, "delete-blocker");
  expect((await context.request.get(`/api/laboratories/${laboratoryId}`)).status()).toBe(200);
});

for (const width of [375, 1440]) {
  test(`real logout at ${width}px revokes session and history cannot restore workspace`, async ({ page, context }, info) => {
    await login(context, info); await page.setViewportSize({ width, height: 900 }); await page.goto("/workspace"); await settled(page);
    const exit = page.getByRole("link", { name: "Sair", exact: true }); await expect(exit).toHaveCount(1);
    const response = page.waitForResponse(r => r.url().endsWith("/api/auth/logout") && r.request().method() === "POST");
    await exit.click(); expect((await response).status()).toBe(200); await expect(page).toHaveURL(/\/login$/);
    expect((await context.request.get("/api/auth/me")).status()).toBe(401);
    expect((await context.cookies()).some(c => ["auth_token", "verification_token"].includes(c.name))).toBe(false);
    await page.goBack(); await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: laboratoryName, exact: true })).toHaveCount(0);
  });
}

test("transient logout loading and error keep retry connected to the real POST", async ({ page, context }, info) => {
  await login(context, info); let release!: () => void; const held = new Promise<void>(resolve => { release = resolve; }); let failAttempt = true; let requests = 0;
  await page.route("**/api/auth/logout", async route => {
    if (!failAttempt) return route.continue(); requests++; await held;
    await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Falha transitória sintética." } });
  });
  try {
    await page.goto("/logout"); await expect(page.getByText("Fazendo logout, aguarde...")).toBeVisible();
    await expect.poll(() => requests).toBeGreaterThan(0); await page.waitForTimeout(100);
    await capture(page, info, "logout-loading"); expect(requests).toBe(1); release();
    await expect(page.getByRole("alert").filter({ has: page.getByRole("button", { name: "Tentar novamente", exact: true }) })).toBeVisible(); await capture(page, info, "logout-error");
    failAttempt = false;
    await page.getByRole("button", { name: "Tentar novamente", exact: true }).click(); await expect(page).toHaveURL(/\/login$/);
    expect((await context.request.get("/api/auth/me")).status()).toBe(401);
  } finally { release(); }
});
