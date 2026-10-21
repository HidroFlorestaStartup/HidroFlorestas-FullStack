import { expect, test, type Page } from "@playwright/test";
import { administrationFixtureId, createAdministrationClient } from "../fixtures/user-administration";
import { authenticateAs, setupUsers } from "./user-administration.helper";
import { captureAdministrationViewport } from "./frontend-user-administration.helper";
import { expectControlUnobstructed } from "./support/frontend-mission-evidence";

const target = administrationFixtureId(8);
const otherTarget = administrationFixtureId(9);
const api = (id: string) => `/api/admin/users/${id}`;

test.beforeEach(async ({ context }, info) => {
  await setupUsers();
  await authenticateAs(context, info, 1);
});

async function selectAccount(page: Page, index = 8) {
  const name = `Fixture${String(index).padStart(2, "0")}`;
  await page.getByPlaceholder("Pesquisar nome ou email").fill(name);
  await page.getByRole("button", { name: `Ver conta de ${name} IMP009`, exact: true }).click();
  await expect(page.getByRole("heading", { name: `${name} IMP009`, exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Bloqueada", exact: true })).toBeEnabled();
}

test("admin list keeps opaque cursor navigation and resets filters", async ({ page }) => {
  await page.goto("/admin/users");
  await page.getByPlaceholder("Pesquisar nome ou email").fill("Fixture");
  const list = page.getByRole("region", { name: "Lista de usuários" });
  await expect(list.getByRole("status")).toContainText("Página 1 · 25 conta(s)");
  const first = await list.getByRole("button", { name: /^Ver conta de/ }).first().getAttribute("aria-label");
  const nextRequest = page.waitForRequest(request => request.url().includes("/api/admin/users?") && new URL(request.url()).searchParams.has("cursor"));
  await page.getByRole("button", { name: "Carregar próxima página" }).click();
  await nextRequest;
  await expect(list.getByRole("status")).toContainText("Página 2");
  await expect(list.getByRole("button", { name: /^Ver conta de/ }).first()).not.toHaveAttribute("aria-label", first!);
  await page.getByRole("button", { name: "Página anterior" }).click();
  await expect(list.getByRole("button", { name: /^Ver conta de/ }).first()).toHaveAttribute("aria-label", first!);
  await page.getByRole("button", { name: "Carregar próxima página" }).click();
  await expect(list.getByRole("status")).toContainText("Página 2");
  const filtered = page.waitForRequest(request => request.url().includes("/api/admin/users?") && new URL(request.url()).searchParams.get("role") === "ADMIN");
  await page.getByLabel("Filtrar por papel", { exact: true }).selectOption("ADMIN");
  expect(new URL((await filtered).url()).searchParams.has("cursor")).toBe(false);
  await expect(list.getByRole("status")).toContainText("Página 1 · 2 conta(s)");
  await expect(page.getByRole("button", { name: "Página anterior" })).toBeDisabled();
});

test("admin modal cancels without a mutation and restores keyboard focus", async ({ page }) => {
  let writes = 0;
  page.on("request", request => { if (request.method() === "PATCH" && request.url().includes("/api/admin/users/")) writes++; });
  await page.goto("/admin/users");
  await selectAccount(page);
  const trigger = page.getByRole("button", { name: "Bloqueada", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("textbox", { name: "Justificativa" })).toBeFocused();
  await expect(dialog.getByRole("button", { name: "Confirmar alteração" })).toBeDisabled();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Cancelar" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("textbox", { name: "Justificativa" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("textbox", { name: "Justificativa" }).fill("Revisão sintética cancelada");
  await dialog.getByRole("button", { name: "Cancelar" }).click();
  await expect(trigger).toBeFocused();
  expect(writes).toBe(0);
});

test("admin conflict refresh reads the current target revision before a new confirmation", async ({ page, context }) => {
  await page.goto("/admin/users");
  await selectAccount(page);
  await page.getByRole("button", { name: "Bloqueada", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("textbox", { name: "Justificativa" }).fill("Spec027 revisão confirmada");
  const concurrent = await context.request.patch(`${api(target)}/status`, { data: { expectedStatus: "ACTIVE", expectedRevision: 0, status: "INACTIVE", reason: "Spec027 alteração concorrente" } });
  expect(concurrent.status()).toBe(200);
  const conflict = page.waitForResponse(response => response.url().endsWith(`${api(target)}/status`) && response.request().method() === "PATCH");
  await dialog.getByRole("button", { name: "Confirmar alteração" }).click();
  expect((await conflict).status()).toBe(409);
  await expect(dialog.getByRole("alert")).toBeFocused();
  await expect(dialog.getByRole("button", { name: "Confirmar alteração" })).toBeDisabled();
  const detail = page.waitForResponse(response => response.url().endsWith(api(target)) && response.request().method() === "GET");
  await dialog.getByRole("button", { name: "Atualizar dados", exact: true }).click();
  expect((await detail).status()).toBe(200);
  await expect(dialog).toContainText("Revisão consultada: 1");
  await expect(dialog.getByRole("heading")).toBeFocused();
  const request = page.waitForRequest(item => item.url().endsWith(`${api(target)}/status`) && item.method() === "PATCH");
  const completed = page.waitForResponse(item => item.url().endsWith(`${api(target)}/status`) && item.request().method() === "PATCH");
  await dialog.getByRole("button", { name: "Confirmar alteração" }).click();
  expect((await request).postDataJSON()).toEqual({ expectedStatus: "INACTIVE", expectedRevision: 1, status: "BLOCKED", reason: "Spec027 revisão confirmada" });
  expect((await completed).status()).toBe(200);
  await expect(page.getByRole("status").filter({ hasText: "Estado de Fixture08 atualizado com segurança." })).toBeFocused();
  await expect(page.getByText("Justificativa: Spec027 revisão confirmada", { exact: true })).toBeVisible();
});

test("late audit response for A never appears under selected B", async ({ page, context }) => {
  const changed = await context.request.patch(`${api(target)}/role`, { data: { expectedRole: "USER", expectedRevision: 0, role: "MODERATOR", reason: "Spec027 evento exclusivo da conta A" } });
  expect(changed.status()).toBe(200);
  let release!: () => void;
  let reached!: () => void;
  let delivered!: () => void;
  const barrier = new Promise<void>(resolve => { release = resolve; });
  const requested = new Promise<void>(resolve => { reached = resolve; });
  const delivery = new Promise<void>(resolve => { delivered = resolve; });
  await page.route(`**${api(target)}/audit`, async route => {
    const response = await route.fetch();
    reached();
    await barrier;
    try { await route.fulfill({ response }); } catch { /* AbortController deliberately cancels the superseded browser request. */ }
    finally { delivered(); }
  });
  try {
    await page.goto("/admin/users");
    await page.getByPlaceholder("Pesquisar nome ou email").fill("Fixture0");
    await page.getByRole("button", { name: "Ver conta de Fixture08 IMP009", exact: true }).click();
    await requested;
    await expect(page.getByText("Carregando histórico…", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Ver conta de Fixture09 IMP009", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Fixture09 IMP009", exact: true })).toBeVisible();
    release();
    await delivery;
    await expect(page.getByRole("complementary", { name: "Detalhe da conta" })).not.toContainText("Spec027 evento exclusivo da conta A");
    await expect(page.getByText("Carregando histórico…", { exact: true })).toHaveCount(0);
  } finally { release(); }
});

test("cancel after conflict refresh already has the requested value restores focus to the account heading", async ({ page, context }) => {
  await page.goto("/admin/users");
  await selectAccount(page);
  await page.getByRole("button", { name: "Bloqueada", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("textbox", { name: "Justificativa" }).fill("Spec027 revisão sem nova alteração");
  const concurrent = await context.request.patch(`${api(target)}/status`, { data: { expectedStatus: "ACTIVE", expectedRevision: 0, status: "BLOCKED", reason: "Spec027 valor aplicado por outro administrador" } });
  expect(concurrent.status()).toBe(200);
  const conflict = page.waitForResponse(response => response.url().endsWith(`${api(target)}/status`) && response.request().method() === "PATCH");
  await dialog.getByRole("button", { name: "Confirmar alteração" }).click();
  expect((await conflict).status()).toBe(409);
  await dialog.getByRole("button", { name: "Atualizar dados", exact: true }).click();
  await expect(dialog.getByText("A conta já possui esse valor. Nenhuma nova alteração é necessária.", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Confirmar alteração" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Bloqueada", exact: true, includeHidden: true })).toHaveCount(0);
  await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Fixture08 IMP009", exact: true })).toBeFocused();
});

test("a real missing-account response clears selection and keeps an actionable focused alert", async ({ page }) => {
  const missingId = administrationFixtureId(54);
  await page.goto("/admin/users");
  await page.getByPlaceholder("Pesquisar nome ou email").fill("Fixture54");
  const row = page.getByRole("button", { name: "Ver conta de Fixture54 IMP009", exact: true });
  await expect(row).toBeVisible();
  // Delete only this guarded synthetic account after its list snapshot was read.
  // The application's detail GET then receives the real server's 404 response.
  const db = createAdministrationClient();
  try { await db.user.delete({ where: { id: missingId } }); }
  finally { await db.$disconnect(); }
  let releaseAudit!: () => void;
  const auditBarrier = new Promise<void>(resolve => { releaseAudit = resolve; });
  await page.route(`**${api(missingId)}/audit`, async route => {
    await auditBarrier;
    try { await route.continue(); } catch { /* Selection cleanup aborts this superseded audit read. */ }
  });
  try {
    const detail = page.waitForResponse(response => response.url().endsWith(api(missingId)) && response.request().method() === "GET");
    await row.click();
    expect((await detail).status()).toBe(404);
    const alert = page.getByRole("alert").filter({ hasText: "Esta conta não está mais disponível. Atualize a lista para continuar." });
    await expect(alert).toBeFocused();
    await expect(row).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Fixture54 IMP009", exact: true })).toHaveCount(0);
    await expect(page.getByRole("complementary", { name: "Detalhe da conta" })).toContainText("Selecione uma conta para ver detalhes e ações seguras.");
    await page.getByRole("button", { name: "Atualizar", exact: true }).click();
    await expect(page.getByText("Nenhum usuário corresponde aos filtros.", { exact: true })).toBeVisible();
    await expect(alert).toBeVisible();
  } finally { releaseAudit(); }
});

for (const responseStatus of [401, 403]) {
  test(`a real ${responseStatus} from either account read clears stale data and announces lost access`, async ({ page, context }, info) => {
    await page.goto("/admin/users");
    await page.getByPlaceholder("Pesquisar nome ou email").fill("Fixture08");
    const row = page.getByRole("button", { name: "Ver conta de Fixture08 IMP009", exact: true });
    await expect(row).toBeVisible();
    await context.clearCookies();
    if (responseStatus === 403) await authenticateAs(context, info, 3);
    const denied = page.waitForResponse(response => response.url().includes(api(target)) && response.request().method() === "GET" && response.status() === responseStatus);
    await row.click();
    await denied;
    const alert = page.getByRole("alert").filter({ hasText: "Seu acesso à administração não está mais disponível. Atualize a página para continuar." });
    await expect(alert).toBeFocused();
    await expect(row).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Fixture08 IMP009", exact: true })).toHaveCount(0);
    await expect(page.getByRole("complementary", { name: "Detalhe da conta" })).toContainText("Selecione uma conta para ver detalhes e ações seguras.");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
}

test("admin in-flight mutation locks editable controls and does not resubmit", async ({ page }) => {
  let release!: () => void;
  let committed!: () => void;
  const barrier = new Promise<void>(resolve => { release = resolve; });
  const reached = new Promise<void>(resolve => { committed = resolve; });
  let writes = 0;
  await page.route(`**${api(otherTarget)}/status`, async route => {
    if (route.request().method() !== "PATCH") { await route.continue(); return; }
    writes++;
    const response = await route.fetch();
    expect(response.status()).toBe(200);
    committed();
    await barrier;
    await route.fulfill({ response });
  });
  try {
    await page.goto("/admin/users");
    await selectAccount(page, 9);
    await page.getByRole("button", { name: "Bloqueada", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("textbox", { name: "Justificativa" }).fill("Spec027 gravação única");
    await dialog.getByRole("button", { name: "Confirmar alteração" }).click();
    await reached;
    await expect(dialog.getByRole("textbox", { name: "Justificativa" })).toBeDisabled();
    await expect(dialog.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    await expect(dialog.getByRole("button", { name: "Confirmar alteração" })).toBeDisabled();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();
    release();
    await expect(page.getByText("Estado de Fixture09 atualizado com segurança.", { exact: true })).toBeVisible();
    expect(writes).toBe(1);
  } finally { release(); }
});

for (const [width, height, scale] of [[320, 900, 100], [375, 900, 100], [768, 900, 100], [1440, 900, 100], [320, 900, 200], [844, 390, 200]]) {
  test(`admin overview, details and modal reflow: ${width}x${height}, text ${scale}%`, async ({ page }, info) => {
    await page.setViewportSize({ width, height });
    await page.goto("/admin");
    if (scale === 200) await page.addStyleTag({ content: "html{font-size:200%!important}" });
    const overview = page.getByRole("link", { name: "Gerenciar usuários", exact: true });
    await expectControlUnobstructed(overview, page);
    await captureAdministrationViewport(page, info, `frontend-user-administration-overview-${width}-${height}-${scale}`, scale);
    await page.goto("/admin/users");
    if (scale === 200) await page.addStyleTag({ content: "html{font-size:200%!important}" });
    await selectAccount(page);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const trigger = page.getByRole("button", { name: "Bloqueada", exact: true });
    await expectControlUnobstructed(trigger, page);
    await captureAdministrationViewport(page, info, `frontend-user-administration-detail-${width}-${height}-${scale}`, scale);
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("textbox", { name: "Justificativa" }).fill("Spec027 revisão sintética de viewport");
    const confirm = dialog.getByRole("button", { name: "Confirmar alteração" });
    await expectControlUnobstructed(confirm, page);
    await captureAdministrationViewport(page, info, `frontend-user-administration-dialog-${width}-${height}-${scale}`, scale);
    await expectControlUnobstructed(dialog.getByRole("button", { name: "Cancelar" }), page);
    await dialog.getByRole("button", { name: "Cancelar" }).click();
    await expect(trigger).toBeFocused();
  });
}
