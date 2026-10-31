import { expect, test, type BrowserContext, type Locator, type Page, type TestInfo } from "@playwright/test";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { signSessionToken } from "../../src/app/api/server/auth/session";
import type { MembershipDto } from "../../src/app/api/server/laboratories/laboratory-membership.contracts";
import type { DashboardHistoryPage, DashboardSummary } from "../../src/types/dashboard.type";
import {
  DASHBOARD_FIXTURE_CONFIRMATION,
  DASHBOARD_FIXTURES,
  DASHBOARD_FIXTURE_PREFIX,
  cleanupDashboardFixtures,
  countDashboardFixtures,
  createDashboardFixtureClient,
  setupDashboardFixtures,
  validateDashboardFixtureEnvironment,
} from "../fixtures/dashboard-history";

// Data, sessions, authorization and mutations use the official synthetic harness.
// Tests labelled "transient transport" intercept only delay/failure, then retry
// against the real endpoint. They never fabricate data or capabilities.
test.setTimeout(90_000);
test.use({ trace: "off", screenshot: "off", video: "off" });

const [laboratoryId, inactiveLaboratoryId, emptyLaboratoryId] = DASHBOARD_FIXTURES.laboratoryIds;
const base = `/dashboard/laboratories/${laboratoryId}`;
const summaryEndpoint = `/api/laboratories/${laboratoryId}/dashboard/summary`;
const historyEndpoint = `/api/laboratories/${laboratoryId}/dashboard/history`;
const membershipsEndpoint = `/api/laboratories/${laboratoryId}/memberships`;
const memberName = "Member IMP007";
const widths = [375, 768, 1440, 320] as const;

async function login(context: BrowserContext, info: TestInfo, userIndex = 0) {
  await context.addCookies([{
    name: "auth_token",
    value: signSessionToken(DASHBOARD_FIXTURES.userIds[userIndex]),
    url: String(info.project.use.baseURL),
  }]);
}

function fixtureClient() {
  const safe = validateDashboardFixtureEnvironment(process.env);
  return createDashboardFixtureClient(safe.testDatabaseUrl);
}

function summarySection(page: Page) {
  return page.locator("section[aria-labelledby='summary-title']");
}

function historySection(page: Page) {
  return page.locator("section[aria-labelledby='history-title']");
}

function membersSection(page: Page) {
  return page.locator("section").filter({
    has: page.getByRole("heading", { name: "Membros do laboratório", exact: true }),
  }).last();
}

async function textScale(page: Page, width: number) {
  if (width !== 320) return;
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("32px");
}

async function noHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const content = page.locator("#application-content");
  await expect(content).toHaveCount(1);
  const containers = [content, ...await page.locator("main").all()];
  for (const container of containers) {
    expect(await container.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
  }
}

async function capture(page: Page, info: TestInfo, name: string, target?: Locator) {
  const prefix = process.env.FRONTEND_DASHBOARD_CAPTURE_PREFIX ?? "after";
  if (!["before", "after"].includes(prefix)) throw new Error("Invalid dashboard evidence prefix");
  const filename = prefix + "-frontend-dashboard-" + name + "-viewport.png";
  const path = info.outputPath(filename);
  const scrolling = target
    ? "Element.scrollIntoView: block=center, inline=nearest, behavior=instant"
    : "Preserved viewport after focus/navigation; no screenshot scrolling";
  if (target) {
    await target.evaluate(node => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
  }
  await finishBrowserRendering(page);
  const mask = [];
  for (const input of await page.locator('input:not([type="checkbox"])').all()) {
    if (await input.evaluate(node => (node as HTMLInputElement).value.length > 0)) mask.push(input);
  }
  // A true 900px viewport, including the shell's own header/content/navigation
  // regions. These captures never compose a fullPage document screenshot.
  await page.screenshot({ path, fullPage: false, animations: "disabled", mask });
  const targetPosition = target
    ? await target.evaluate(node => {
      const box = node.getBoundingClientRect();
      return { kind: "explicit screenshot target", tag: node.tagName.toLowerCase(), x: box.x, y: box.y, width: box.width, height: box.height };
    })
    : await page.evaluate(() => {
      const node = document.activeElement;
      if (!(node instanceof HTMLElement)) return null;
      const box = node.getBoundingClientRect();
      return { kind: "active element", tag: node.tagName.toLowerCase(), x: box.x, y: box.y, width: box.width, height: box.height };
    });
  const state = await page.evaluate(() => {
    const content = document.getElementById("application-content");
    const rootFontSize = getComputedStyle(document.documentElement).fontSize;
    return {
      viewport: { width: innerWidth, height: innerHeight },
      text: { rootFontSize, percentRelativeTo16px: Number.parseFloat(rootFontSize) / 16 * 100, method: "computed html font-size; no browser zoom" },
      scroll: {
        document: { x: scrollX, y: scrollY },
        content: content ? { left: content.scrollLeft, top: content.scrollTop, height: content.clientHeight, extent: content.scrollHeight } : null,
      },
    };
  });
  const metadataName = filename.replace(/\.png$/, ".json");
  const metadataPath = info.outputPath(metadataName);
  await writeFile(metadataPath, JSON.stringify({
    name,
    screenshot: { filename, fullPage: false, browserProject: info.project.name },
    ...state,
    target: targetPosition,
    scrolling,
  }, null, 2) + "\n", "utf8");
  const archive = join(process.cwd(), ".accounts-validation", "frontend-dashboard");
  await mkdir(archive, { recursive: true });
  await copyFile(path, join(archive, filename));
  await copyFile(metadataPath, join(archive, metadataName));
  await info.attach(filename, { path, contentType: "image/png" });
  await info.attach(metadataName, { path: metadataPath, contentType: "application/json" });
}
test.beforeAll(async () => {
  expect(process.env.DASHBOARD_FIXTURE_CONFIRMATION).toBe(DASHBOARD_FIXTURE_CONFIRMATION);
  await setupDashboardFixtures(process.env);
});

test.afterAll(async () => {
  await cleanupDashboardFixtures(process.env);
  expect(await countDashboardFixtures(process.env)).toEqual({
    users: 0, laboratories: 0, memberships: 0, areas: 0, collections: 0,
  });
});

for (const width of widths) {
  test(`real dashboard, cursor, members and empty context at ${width}px${width === 320 ? " text200" : ""}`, async ({ page, context }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await login(context, info);
    const summaryRead = page.waitForResponse(response => response.url().endsWith(summaryEndpoint));
    const historyRead = page.waitForResponse(response => response.url().endsWith(historyEndpoint));
    await page.goto(base);
    const summaryResponse = await summaryRead;
    const historyResponse = await historyRead;
    expect(summaryResponse.status()).toBe(200);
    expect(historyResponse.status()).toBe(200);
    const summary: DashboardSummary = await summaryResponse.json();
    const history: DashboardHistoryPage = await historyResponse.json();
    expect(summary).toMatchObject({
      context: { id: laboratoryId, membershipRole: "OWNER", readOnly: false },
      totals: { areas: 12, confirmedCollections: 12 },
      links: { areas: `${base}/areas` },
    });
    expect(history.items).toHaveLength(20);
    const overview = summarySection(page);
    const activity = historySection(page);
    await expect(overview.getByRole("heading", { name: `${DASHBOARD_FIXTURE_PREFIX} laboratory 0`, exact: true })).toBeVisible();
    await expect(overview.getByText("12", { exact: true })).toHaveCount(2);
    await expect(overview.getByRole("link", { name: /Ver áreas/ })).toHaveAttribute("href", summary.links.areas);
    await expect(activity.locator("ol a")).toHaveCount(history.items.length);
    expect(await activity.locator("ol a").evaluateAll(links => links.map(link => link.getAttribute("href"))))
      .toEqual(history.items.map(item => item.destination));
    await textScale(page, width);
    await noHorizontalOverflow(page);
    await capture(page, info, `summary-${width}`, overview.getByRole("link", { name: /Ver áreas/ }));

    const refresh = activity.getByRole("button", { name: "Atualizar histórico", exact: true });
    await refresh.focus();
    await expect(refresh).toBeFocused();
    await capture(page, info, `history-focus-${width}`);
    const refreshed = page.waitForResponse(response => response.url().endsWith(historyEndpoint));
    await page.keyboard.press("Enter");
    expect((await refreshed).status()).toBe(200);
    await expect(activity.locator("ol a")).toHaveCount(20);
    const olderRead = page.waitForResponse(response => {
      const url = new URL(response.url());
      return url.pathname === historyEndpoint && url.searchParams.has("cursor");
    });
    await activity.getByRole("button", { name: "Mais antigos", exact: true }).click();
    const olderResponse = await olderRead;
    expect(olderResponse.status()).toBe(200);
    const older: DashboardHistoryPage = await olderResponse.json();
    expect(older.items).toHaveLength(4);
    await expect(activity.locator("ol a")).toHaveCount(4);
    expect(await activity.locator("ol a").evaluateAll(links => links.map(link => link.getAttribute("href"))))
      .toEqual(older.items.map(item => item.destination));
    expect(history.items.some(item => older.items.some(olderItem => olderItem.id === item.id))).toBe(false);
    await expect(activity.getByRole("button", { name: "Mais antigos", exact: true })).toBeDisabled();
    await activity.getByRole("button", { name: "Mais recentes", exact: true }).focus();
    await capture(page, info, `history-older-${width}`);
    const firstPageRead = page.waitForResponse(response => response.url().endsWith(historyEndpoint));
    await page.keyboard.press("Enter");
    expect((await firstPageRead).status()).toBe(200);
    await expect(activity.locator("ol a")).toHaveCount(20);

    const membersRead = page.waitForResponse(response => response.url().endsWith(membershipsEndpoint));
    await page.getByRole("navigation", { name: "Laboratório", exact: true })
      .getByRole("link", { name: "Membros", exact: true }).click();
    const membersResponse = await membersRead;
    expect(membersResponse.status()).toBe(200);
    const members: { memberships: MembershipDto[] } = await membersResponse.json();
    expect(members.memberships.map(member => member.role).sort()).toEqual(["ADMIN", "MEMBER", "OWNER"]);
    const roster = membersSection(page);
    await expect(roster.getByRole("listitem")).toHaveCount(3);
    for (const member of members.memberships) await expect(roster.getByRole("listitem").filter({ hasText: member.name })).toHaveCount(1);
    const owner = members.memberships.find(member => member.role === "OWNER")!;
    await expect(roster.getByRole("listitem").filter({ hasText: owner.name }).getByRole("button")).toHaveCount(0);
    const promote = roster.getByRole("button", { name: `Promover ${memberName}`, exact: true });
    await roster.getByRole("link", { name: "Voltar ao resumo", exact: true }).focus();
    for (let tabs = 0; tabs < 12 && !await promote.evaluate(node => document.activeElement === node); tabs += 1) {
      await page.keyboard.press("Tab");
    }
    await expect(promote).toBeFocused();
    await noHorizontalOverflow(page);
    await capture(page, info, `members-focus-${width}`);

    const emptyRead = page.waitForResponse(response => response.url().endsWith(`/api/laboratories/${emptyLaboratoryId}/dashboard/history`));
    await page.goto(`/dashboard/laboratories/${emptyLaboratoryId}`);
    expect((await emptyRead).status()).toBe(200);
    await textScale(page, width);
    await expect(summarySection(page).getByText("0", { exact: true })).toHaveCount(2);
    await expect(historySection(page).getByText("Nenhuma atividade elegível neste laboratório.", { exact: true })).toBeVisible();
    await expect(historySection(page).locator("ol a")).toHaveCount(0);
    await expect(historySection(page).getByRole("button", { name: "Mais recentes", exact: true })).toBeDisabled();
    await expect(historySection(page).getByRole("button", { name: "Mais antigos", exact: true })).toBeDisabled();
    await expect(page.getByText(`${DASHBOARD_FIXTURE_PREFIX} laboratory 0`, { exact: true })).toHaveCount(0);
    await noHorizontalOverflow(page);
    await capture(page, info, `empty-${width}`, historySection(page).getByText("Nenhuma atividade elegível neste laboratório.", { exact: true }));
  });

  test(`transient transport loading and failures retry real dashboard and members at ${width}px${width === 320 ? " text200" : ""}`, async ({ page, context }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await login(context, info);
    let releaseDashboard!: () => void;
    const dashboardHeld = new Promise<void>(resolve => { releaseDashboard = resolve; });
    let failDashboard = true;
    const dashboardPattern = `**/api/laboratories/${laboratoryId}/dashboard/*`;
    await page.route(dashboardPattern, async route => {
      if (!failDashboard || route.request().method() !== "GET") return route.continue();
      await dashboardHeld;
      await route.fulfill({ status: 503, json: { error: { code: "INTERNAL_ERROR", message: "Falha transitória sintética do transporte." } } });
    });
    let releaseMembers!: () => void;
    const membersHeld = new Promise<void>(resolve => { releaseMembers = resolve; });
    let failMembers = true;
    try {
      await page.goto(base);
      await textScale(page, width);
      await expect(page.getByRole("status", { name: "Carregando resumo", exact: true })).toBeVisible();
      await expect(page.getByRole("status", { name: "Carregando histórico", exact: true })).toBeVisible();
      await expect(page.getByText("Nenhuma atividade elegível neste laboratório.", { exact: true })).toHaveCount(0);
      await capture(page, info, `transient-dashboard-loading-${width}`, page.getByRole("status", { name: "Carregando histórico", exact: true }));
      releaseDashboard();
      await expect(summarySection(page).getByRole("alert")).toContainText("Falha transitória sintética");
      await expect(historySection(page).getByRole("alert")).toContainText("Falha transitória sintética");
      await capture(page, info, `transient-dashboard-error-${width}`, historySection(page).getByRole("alert"));
      failDashboard = false;
      const summaryRetry = page.waitForResponse(response => response.url().endsWith(summaryEndpoint));
      await summarySection(page).getByRole("button", { name: "Tentar novamente", exact: true }).click();
      expect((await summaryRetry).status()).toBe(200);
      await expect(summarySection(page).getByText("12", { exact: true })).toHaveCount(2);
      const historyRetry = page.waitForResponse(response => response.url().endsWith(historyEndpoint));
      await historySection(page).getByRole("button", { name: "Tentar novamente", exact: true }).click();
      expect((await historyRetry).status()).toBe(200);
      await expect(historySection(page).locator("ol a")).toHaveCount(20);

      await page.route(`**${membershipsEndpoint}`, async route => {
        if (!failMembers || route.request().method() !== "GET") return route.continue();
        await membersHeld;
        await route.fulfill({ status: 503, json: { error: { code: "INTERNAL_ERROR", message: "Falha transitória sintética do transporte." } } });
      });
      await page.goto(`${base}/members`);
      await textScale(page, width);
      await expect(membersSection(page).getByText(/Carregando membros/)).toBeVisible();
      await capture(page, info, `transient-members-loading-${width}`, membersSection(page).getByText(/Carregando membros/));
      releaseMembers();
      await expect(membersSection(page).getByText("Falha transitória sintética do transporte.", { exact: true })).toBeVisible();
      await expect(membersSection(page).getByRole("button", { name: `Promover ${memberName}`, exact: true })).toHaveCount(0);
      await capture(page, info, `transient-members-error-${width}`, membersSection(page).getByText("Falha transitória sintética do transporte.", { exact: true }));
      failMembers = false;
      const membersRetry = page.waitForResponse(response => response.url().endsWith(membershipsEndpoint));
      await membersSection(page).getByRole("button", { name: "Tentar novamente", exact: true }).click();
      expect((await membersRetry).status()).toBe(200);
      await expect(membersSection(page).getByRole("listitem")).toHaveCount(3);
      await expect(membersSection(page).getByRole("button", { name: `Promover ${memberName}`, exact: true })).toBeEnabled();
      await expect(membersSection(page).getByText("Falha transitória sintética do transporte.", { exact: true })).toHaveCount(0);
    } finally {
      releaseDashboard();
      releaseMembers();
      await page.unroute(dashboardPattern);
      await page.unroute(`**${membershipsEndpoint}`);
    }
  });
}

test("real membership conflict preserves expectedRole and a delayed real PATCH rejects same-turn duplicate clicks", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await login(context, info);
  await page.goto(`${base}/members`);
  const roster = membersSection(page);
  const promote = roster.getByRole("button", { name: `Promover ${memberName}`, exact: true });
  await expect(promote).toBeEnabled();
  const listResponse = await context.request.get(membershipsEndpoint);
  expect(listResponse.status()).toBe(200);
  const members: { memberships: MembershipDto[] } = await listResponse.json();
  const member = members.memberships.find(item => item.name === memberName)!;
  expect(member.role).toBe("MEMBER");
  const endpoint = `${membershipsEndpoint}/${member.id}`;
  let release!: () => void;
  const held = new Promise<void>(resolve => { release = resolve; });
  const db = fixtureClient();
  try {
    // A separate real write wins while this browser still holds MEMBER.
    const concurrent = await context.request.patch(endpoint, { data: { expectedRole: "MEMBER", role: "ADMIN" } });
    expect(concurrent.status()).toBe(200);
    const staleWrite = page.waitForResponse(response => response.url().endsWith(endpoint) && response.request().method() === "PATCH");
    await promote.click();
    const conflict = await staleWrite;
    expect(conflict.request().postDataJSON()).toEqual({ expectedRole: "MEMBER", role: "ADMIN" });
    expect(conflict.status()).toBe(409);
    const conflictBody: { error: { code: string; message: string } } = await conflict.json();
    expect(conflictBody.error.code).toBe("CONFLICT");
    await expect(roster.getByText(conflictBody.error.message, { exact: true })).toBeVisible();
    await expect(roster.getByText("Papel atualizado.", { exact: true })).toHaveCount(0);
    const demote = roster.getByRole("button", { name: `Rebaixar ${memberName}`, exact: true });
    await expect(demote).toBeEnabled();
    await capture(page, info, "members-real-conflict-375");

    const payloads: unknown[] = [];
    await page.route(`**${endpoint}`, async route => {
      if (route.request().method() !== "PATCH") return route.continue();
      payloads.push(route.request().postDataJSON());
      await held;
      await route.continue();
    });
    const changed = page.waitForResponse(response => response.url().endsWith(endpoint) && response.request().method() === "PATCH");
    await demote.evaluate(button => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await expect.poll(() => payloads.length).toBe(1);
    for (const button of await roster.getByRole("button", { name: /^(Promover|Rebaixar) / }).all()) await expect(button).toBeDisabled();
    await capture(page, info, "members-transient-transport-delay-375");
    expect(payloads).toEqual([{ expectedRole: "ADMIN", role: "MEMBER" }]);
    release();
    expect((await changed).status()).toBe(200);
    await expect(roster.getByRole("button", { name: `Promover ${memberName}`, exact: true })).toBeEnabled();
    expect(payloads).toEqual([{ expectedRole: "ADMIN", role: "MEMBER" }]);
    const persisted = await context.request.get(membershipsEndpoint);
    expect(persisted.status()).toBe(200);
    const updated: { memberships: MembershipDto[] } = await persisted.json();
    expect(updated.memberships.find(item => item.id === member.id)?.role).toBe("MEMBER");
  } finally {
    release();
    try {
      await page.unroute(`**${endpoint}`);
      await db.researchersLinked.update({
        where: { userId_laboratoryRoomId: { userId: DASHBOARD_FIXTURES.userIds[2], laboratoryRoomId: laboratoryId } },
        data: { role: "MEMBER" },
      });
    } finally {
      await db.$disconnect();
    }
  }
});

test("real redirects and global/contextual authority preserve owner-only roles and inactive readOnly", async ({ page, context }, info) => {
  await login(context, info);
  for (const path of ["/dashboard", "/dashboard/collects"]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/workspace$/);
  }
  const ownerList = await context.request.get(membershipsEndpoint);
  expect(ownerList.status()).toBe(200);
  const members: { memberships: MembershipDto[] } = await ownerList.json();
  const member = members.memberships.find(item => item.role === "MEMBER")!;
  const owner = members.memberships.find(item => item.role === "OWNER")!;
  expect((await context.request.patch(`${membershipsEndpoint}/${owner.id}`, {
    data: { expectedRole: "MEMBER", role: "ADMIN" },
  })).status()).toBe(403);
  const db = fixtureClient();
  try {
    await db.user.update({ where: { id: DASHBOARD_FIXTURES.userIds[2] }, data: { role: "ADMIN" } });
    for (const userIndex of [1, 2]) {
      await login(context, info, userIndex);
      await page.goto(base);
      await expect(summarySection(page).getByRole("link", { name: /Ver áreas/ })).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Laboratório", exact: true }).getByRole("link", { name: "Membros", exact: true })).toHaveCount(0);
      const denied = await context.request.get(membershipsEndpoint);
      expect(denied.status()).toBe(403);
      expect(denied.headers()["cache-control"]).toBe("no-store");
      expect((await context.request.patch(`${membershipsEndpoint}/${member.id}`, {
        data: { expectedRole: "MEMBER", role: "ADMIN" },
      })).status()).toBe(403);
    }
    await db.user.update({ where: { id: DASHBOARD_FIXTURES.userIds[3] }, data: { role: "ADMIN", status: "ACTIVE" } });
    await login(context, info, 3);
    for (const endpoint of [summaryEndpoint, historyEndpoint, membershipsEndpoint]) {
      const denied = await context.request.get(endpoint);
      expect(denied.status()).toBe(404);
      expect(await denied.json()).toEqual({ error: { code: "NOT_FOUND", message: "Recurso não encontrado." } });
    }

    await login(context, info);
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(`/dashboard/laboratories/${inactiveLaboratoryId}/members`);
    await textScale(page, 320);
    await expect(membersSection(page).getByText("Laboratório inativo — somente leitura.", { exact: true })).toBeVisible();
    await expect(membersSection(page).getByRole("button", { name: /^(Promover|Rebaixar) / })).toHaveCount(0);
    const inactiveEndpoint = `/api/laboratories/${inactiveLaboratoryId}/memberships`;
    const inactiveResponse = await context.request.get(inactiveEndpoint);
    expect(inactiveResponse.status()).toBe(200);
    const inactive: { context: { readOnly: boolean }; memberships: MembershipDto[] } = await inactiveResponse.json();
    expect(inactive.context.readOnly).toBe(true);
    const inactiveMember = inactive.memberships.find(item => item.role === "MEMBER")!;
    const rejected = await context.request.patch(`${inactiveEndpoint}/${inactiveMember.id}`, {
      data: { expectedRole: "MEMBER", role: "ADMIN" },
    });
    expect(rejected.status()).toBe(409);
    expect((await rejected.json()).error.code).toBe("READ_ONLY");
    await capture(page, info, "members-inactive-320", membersSection(page).getByText("Laboratório inativo — somente leitura.", { exact: true }));
  } finally {
    try {
      await db.user.update({ where: { id: DASHBOARD_FIXTURES.userIds[2] }, data: { role: "USER" } });
      await db.user.update({ where: { id: DASHBOARD_FIXTURES.userIds[3] }, data: { role: "USER", status: "BLOCKED" } });
    } finally {
      await db.$disconnect();
    }
  }
});
function responseBarrier() {
  let release!: () => void;
  const ready = new Promise<void>(resolve => { release = resolve; });
  return { ready, release };
}

async function chooseEmptyLaboratoryThroughWorkspace(page: Page) {
  await page.getByRole("navigation", { name: "Laboratório", exact: true })
    .getByRole("link", { name: "Laboratórios", exact: true }).click();
  await expect(page).toHaveURL(/\/workspace$/);
  const laboratory = page.getByRole("listitem").filter({
    has: page.getByRole("heading", { name: DASHBOARD_FIXTURE_PREFIX + " laboratory 2", exact: true }),
  });
  await expect(laboratory).toBeVisible();
  await laboratory.getByRole("link", { name: "ACESSAR LABORATÓRIO", exact: true }).click();
  await expect(page).toHaveURL(new RegExp("/dashboard/laboratories/" + emptyLaboratoryId + "$"));
}

async function expectEmptyDashboardContext(page: Page) {
  await expect(summarySection(page).getByRole("heading", {
    name: DASHBOARD_FIXTURE_PREFIX + " laboratory 2", exact: true,
  })).toBeVisible();
  await expect(summarySection(page).getByText("0", { exact: true })).toHaveCount(2);
  const history = historySection(page);
  await expect(history.getByText("Nenhuma atividade elegível neste laboratório.", { exact: true })).toBeVisible();
  await expect(history.locator("ol a")).toHaveCount(0);
  await expect(history.getByRole("button", { name: "Mais recentes", exact: true })).toBeDisabled();
  await expect(history.getByRole("button", { name: "Mais antigos", exact: true })).toBeDisabled();
  const destinations = await page.locator("#application-content a[href]:visible")
    .evaluateAll(links => links.map(link => link.getAttribute("href")).join(" "));
  for (const sourceId of [laboratoryId, ...DASHBOARD_FIXTURES.areaIds.slice(0, 12)]) {
    expect(destinations).not.toContain(sourceId);
  }
}

async function finishBrowserRendering(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));
}

test("real summary and refreshed history responses cannot replace an empty context after client navigation from page two", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await login(context, info);
  const releaseResponses = responseBarrier();
  const summaryFetched = responseBarrier();
  const historyFetched = responseBarrier();
  const summaryDelivered = responseBarrier();
  const historyDelivered = responseBarrier();
  const heldReads: { summary?: DashboardSummary; history?: DashboardHistoryPage; summaryStatus?: number; historyStatus?: number } = {};
  let holdHistoryRefresh = false;
  const summaryPattern = "**" + summaryEndpoint;
  const historyPattern = "**" + historyEndpoint + "*";

  // Fetch the real authorized payload first; only its delivery to this browser
  // is held. No DTO, permission or cursor is synthesized by the transport.
  await page.route(summaryPattern, async route => {
    if (route.request().method() !== "GET") return route.continue();
    const response = await route.fetch();
    heldReads.summary = await response.json();
    heldReads.summaryStatus = response.status();
    summaryFetched.release();
    await releaseResponses.ready;
    try {
      await route.fulfill({ response });
    } finally {
      summaryDelivered.release();
    }
  });
  await page.route(historyPattern, async route => {
    if (!holdHistoryRefresh || route.request().method() !== "GET") return route.continue();
    const response = await route.fetch();
    heldReads.history = await response.json();
    heldReads.historyStatus = response.status();
    historyFetched.release();
    await releaseResponses.ready;
    try {
      await route.fulfill({ response });
    } finally {
      historyDelivered.release();
    }
  });

  try {
    await page.goto(base);
    await summaryFetched.ready;
    expect(heldReads.summaryStatus).toBe(200);
    expect(heldReads.summary).toMatchObject({ context: { id: laboratoryId }, totals: { areas: 12, confirmedCollections: 12 } });
    const activity = historySection(page);
    await expect(activity.locator("ol a")).toHaveCount(20);
    const pageTwo = page.waitForResponse(response => {
      const url = new URL(response.url());
      return url.pathname === historyEndpoint && url.searchParams.has("cursor");
    });
    await activity.getByRole("button", { name: "Mais antigos", exact: true }).click();
    expect((await pageTwo).status()).toBe(200);
    await expect(activity.locator("ol a")).toHaveCount(4);

    holdHistoryRefresh = true;
    await activity.getByRole("button", { name: "Atualizar histórico", exact: true }).click();
    await historyFetched.ready;
    expect(heldReads.historyStatus).toBe(200);
    expect(heldReads.history).toMatchObject({ context: { id: laboratoryId } });
    expect(heldReads.history?.items).toHaveLength(20);
    await expect(page.getByRole("status", { name: "Carregando resumo", exact: true })).toBeVisible();
    await expect(page.getByRole("status", { name: "Carregando histórico", exact: true })).toBeVisible();

    const documentTimeOrigin = await page.evaluate(() => performance.timeOrigin);
    const targetSummaryEndpoint = "/api/laboratories/" + emptyLaboratoryId + "/dashboard/summary";
    const targetHistoryEndpoint = "/api/laboratories/" + emptyLaboratoryId + "/dashboard/history";
    const targetSummaryRead = page.waitForResponse(response => new URL(response.url()).pathname === targetSummaryEndpoint);
    const targetHistoryRead = page.waitForResponse(response => new URL(response.url()).pathname === targetHistoryEndpoint);
    await chooseEmptyLaboratoryThroughWorkspace(page);
    const targetSummary = await targetSummaryRead;
    const targetHistory = await targetHistoryRead;
    expect(targetSummary.status()).toBe(200);
    expect(targetHistory.status()).toBe(200);
    expect(new URL(targetHistory.url()).search).toBe("");
    expect(await targetSummary.json()).toMatchObject({
      context: { id: emptyLaboratoryId }, totals: { areas: 0, confirmedCollections: 0 },
    });
    expect(await targetHistory.json()).toMatchObject({
      context: { id: emptyLaboratoryId }, items: [], page: { nextCursor: null },
    });
    await expectEmptyDashboardContext(page);
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(documentTimeOrigin);

    releaseResponses.release();
    await Promise.all([summaryDelivered.ready, historyDelivered.ready]);
    await finishBrowserRendering(page);
    await expectEmptyDashboardContext(page);
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(documentTimeOrigin);
    await capture(page, info, "client-late-dashboard-context-375");
  } finally {
    releaseResponses.release();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test("real delayed members from the previous client context cannot replace the selected owner's roster", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await login(context, info);
  const releaseResponse = responseBarrier();
  const membersFetched = responseBarrier();
  const membersDelivered = responseBarrier();
  const heldRead: { status?: number; body?: { context: { id: string }; memberships: MembershipDto[] } } = {};
  const pattern = "**" + membershipsEndpoint;
  await page.route(pattern, async route => {
    if (route.request().method() !== "GET") return route.continue();
    const response = await route.fetch();
    heldRead.status = response.status();
    heldRead.body = await response.json();
    membersFetched.release();
    await releaseResponse.ready;
    try {
      await route.fulfill({ response });
    } finally {
      membersDelivered.release();
    }
  });

  try {
    await page.goto(base + "/members");
    await membersFetched.ready;
    expect(heldRead.status).toBe(200);
    expect(heldRead.body).toMatchObject({ context: { id: laboratoryId } });
    expect(heldRead.body?.memberships).toHaveLength(3);
    await expect(membersSection(page).getByText(/Carregando membros/)).toBeVisible();
    const documentTimeOrigin = await page.evaluate(() => performance.timeOrigin);
    await chooseEmptyLaboratoryThroughWorkspace(page);
    await expect(summarySection(page).getByText("0", { exact: true })).toHaveCount(2);

    const targetEndpoint = "/api/laboratories/" + emptyLaboratoryId + "/memberships";
    const targetRead = page.waitForResponse(response => new URL(response.url()).pathname === targetEndpoint);
    await page.getByRole("navigation", { name: "Laboratório", exact: true })
      .getByRole("link", { name: "Membros", exact: true }).click();
    const targetResponse = await targetRead;
    expect(targetResponse.status()).toBe(200);
    const target: { context: { id: string; membershipRole: string }; memberships: MembershipDto[] } = await targetResponse.json();
    expect(target.context).toMatchObject({ id: emptyLaboratoryId, membershipRole: "OWNER" });
    expect(target.memberships).toHaveLength(1);
    expect(target.memberships[0].role).toBe("OWNER");
    const roster = membersSection(page);
    await expect(roster.getByRole("listitem")).toHaveCount(1);
    await expect(roster.getByRole("listitem").filter({ hasText: target.memberships[0].name })).toHaveCount(1);
    await expect(roster.getByRole("button", { name: /^(Promover|Rebaixar) / })).toHaveCount(0);
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(documentTimeOrigin);

    releaseResponse.release();
    await membersDelivered.ready;
    await finishBrowserRendering(page);
    await expect(roster.getByRole("listitem")).toHaveCount(1);
    for (const previous of heldRead.body!.memberships.filter(member => member.role !== "OWNER")) {
      await expect(roster.getByRole("listitem").filter({ hasText: previous.name })).toHaveCount(0);
    }
    await expect(roster.getByText("Papel atualizado.", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Laboratório", exact: true })
      .getByRole("link", { name: "Resumo", exact: true })).toHaveAttribute("href", "/dashboard/laboratories/" + emptyLaboratoryId);
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(documentTimeOrigin);
    await capture(page, info, "client-late-members-context-375");
  } finally {
    releaseResponse.release();
    await page.unrouteAll({ behavior: "wait" });
  }
});