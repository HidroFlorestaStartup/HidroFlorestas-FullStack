import { test, expect } from "@playwright/test";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../../tests/fixtures/auth-users";
import { createAreaFixtureClient } from "../../tests/fixtures/areas";
import { FULLSTACK_URL, STARTER_URL, STARTER_SHA, type Source, type CaptureOptions, type Runtime, type LayoutCase, type EvidenceCase } from "./contract";
import { configure, createRuntime, sample, observeReload, registerCases, recordCase, finalizeCases, readCaseMetadata, recordLifecycle, withLayoutCleanup, observeFocus, readReferenceReloadState } from "./shared";

test.use({ trace: "off", video: "off", screenshot: "off" });
test.setTimeout(180_000);
const actor = AUTH_FIXTURE_USERS[0];
const viewports = [[320, 900], [375, 900], [390, 844], [768, 900], [1440, 900], [667, 375], [844, 390]] as const;
const layouts: LayoutCase[] = viewports.flatMap(([width, height]) => ([100, 200] as const).map(scale => ({
  id: [width, height, scale, 0].join("-"), width, height, scale, inset: 0,
})));
for (const [width, height] of [[375, 900], [667, 375]]) layouts.push({ id: [width, height, 200, 34].join("-"), width, height, scale: 200, inset: 34 });
const accountCase = (c: LayoutCase) => [320, 390, 1440].includes(c.width) && c.inset === 0;
const navigationCase = (c: LayoutCase) => (c.width === 375 && c.scale === 100) || (c.width === 390 && c.scale === 200)
  || (c.width === 667 && c.scale === 200) || c.width === 1440;
const states = (c: LayoutCase) => ["workspace-closed", "laboratory-closed",
  ...(accountCase(c) ? ["workspace-account-open", "workspace-account-escape", "laboratory-account-open", "laboratory-account-escape"] : []),
  ...(navigationCase(c) ? ["last-control-focus", "areas-navigation", "back", "forward", "reload"] : [])];
const evidence = (c: LayoutCase, state: string): EvidenceCase => ({ ...c, id: "shell-" + c.id + "-" + state, state,
  requirementIds: ["UI-01", "UI-05", "UI-06", "FR-035-001", "FR-035-002", "FR-035-003"],
  fixture: { synthetic: true, globalRole: "USER", laboratoryRole: state.startsWith("workspace") ? null : "OWNER", areas: 0, collections: 0 } });
const allCases = layouts.flatMap(c => states(c).map(state => evidence(c, state)));
test.beforeAll(async () => {
  if (process.env.GITHUB_ACTIONS !== "true" || process.env.RUNNER_OS !== "Windows" || process.env.GITHUB_RUN_ATTEMPT !== "1")
    throw new Error("Shell runtime requires the authorized hosted Windows attempt");
  await registerCases(allCases);
});

type SourceObservation = { actualState?: string; reasons?: string[]; requirement?: CaptureOptions["requirement"];
  focus?: Awaited<ReturnType<typeof observeFocus>>; reloadScale?: Awaited<ReturnType<typeof observeReload>>; nativeReloadState?: string };
type SourceObservations = Partial<Record<Source, SourceObservation>>;
async function capture(runtimes: Runtime[], c: EvidenceCase, unavailable = false, reload = false, observations: SourceObservations = {}) {
  const samples = [], errors: string[] = [], reasons: string[] = [];
  if (unavailable) reasons.push("ACCOUNT_DISCLOSURE_ABSENT_IN_PINNED_STARTER");
  if (reload) reasons.push("REFERENCE_RELOAD_STATE_NON_EQUIVALENT");
  for (const runtime of runtimes) {
    try {
      const observation = observations[runtime.source];
      samples.push(await sample(runtime, c, { actualState: observation?.actualState ?? ( runtime.source === "starter" && unavailable ? "reference-account-unavailable"
        : runtime.source === "starter" && reload ? "reference-reload-state-unobserved" : c.state),
        comparability: reasons.length || observation?.reasons?.length ? "NON_EQUIVALENT" : "COMPARABLE", requirement: observation?.requirement, reasons: [...reasons, ...(observation?.reasons ?? [])] }));
    } catch { errors.push(runtime.source + "_CAPTURE_FAILED"); }
  }
  const metadata = await Promise.all(samples.map(s => readCaseMetadata(s.json)));
  for (const item of metadata) reasons.push(...(item.reasons ?? []));
  const incomplete = samples.length !== 2;
  if (incomplete) reasons.push("BILATERAL_PAIR_INCOMPLETE");
  const missingFonts = metadata.some(m => m.comparability === "INSUFFICIENT_EVIDENCE");
  for (const region of ["header", "main"]) {
    const primary = metadata.map(m => (m.fontsActuallyRendered[region]?.elements ?? []).flatMap((e: { fonts: { familyName: string; glyphCount: number }[] }) => e.fonts)
      .sort((a: { glyphCount: number }, b: { glyphCount: number }) => b.glyphCount - a.glyphCount)[0]?.familyName as string | undefined);
    if (primary.length === 2 && primary.every(Boolean) && primary[0]!.toLowerCase() !== primary[1]!.toLowerCase()) reasons.push("OBSERVED_FONT_MISMATCH_" + region);
  }
  const result = { execution: incomplete || errors.length ? "FAIL" : "PASS", comparability: incomplete || missingFonts ? "INSUFFICIENT_EVIDENCE" : reasons.length ? "NON_EQUIVALENT" : "COMPARABLE",
    requirement: "HUMAN_DECISION_PENDING", completeness: incomplete ? "PARTIAL" : "COMPLETE", reasons: [...new Set(reasons)], samples, errors, sourceObservations: observations };
  await recordCase(c, result);
  return result;
}
async function account(runtime: Runtime, open: boolean) {
  const control = runtime.page.getByRole("button", { name: "Conta", exact: true });
  if (runtime.source === "starter") { await expect(control).toHaveCount(0); return; }
  if (open) {
    await control.focus(); await control.press("Enter");
    await expect(control).toHaveAttribute("aria-expanded", "true");
    for (const name of ["Alterar senha", "Excluir conta"]) await expect(runtime.page.getByRole("link", { name, exact: true })).toBeInViewport({ ratio: 1 });
    // Measure the actual account panel/name before attributing truncation to product.
    const geometry = await runtime.page.locator("#application-account-menu").evaluate(node => {
      const panel = node.getBoundingClientRect(), name = node.querySelector("p"), box = name?.getBoundingClientRect();
      return { panelInside: panel.left >= 0 && panel.right <= innerWidth, nameClipped: !!name && name.scrollWidth > name.clientWidth,
        nameInside: !!box && box.left >= 0 && box.right <= innerWidth };
    });
    expect(geometry.panelInside).toBe(true); expect(geometry.nameClipped).toBe(false); expect(geometry.nameInside).toBe(true);
  } else {
    await control.press("Escape"); await expect(control).toHaveAttribute("aria-expanded", "false"); await expect(control).toBeFocused();
  }
}
async function workspaceLogin(runtime: Runtime) {
  const { page } = runtime;
  await page.goto((runtime.source === "fullstack" ? FULLSTACK_URL : STARTER_URL) + "/login");
  if (runtime.source === "fullstack") {
    if (!process.env.E2E_USER_PASSWORD) throw new Error("Synthetic credential unavailable");
    let response;
    try { response = await runtime.context.request.post(FULLSTACK_URL + "/api/auth/sign-in", { data: { email: actor.email, password: process.env.E2E_USER_PASSWORD } }); }
    catch { throw new Error("Native authentication transport failed"); }
    expect(response.status()).toBe(200); await page.goto(FULLSTACK_URL + "/workspace");
    await expect(page.getByLabel("Nome do laboratório", { exact: true })).toBeVisible();
  } else {
    await page.getByRole("button", { name: "Conta sem laboratório — Marcos", exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: /preenchidos/ })).toBeVisible();
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page.getByRole("button", { name: "Criar seu Laboratório IHFR", exact: true })).toBeVisible();
  }
  await expect(page).toHaveURL((runtime.source === "fullstack" ? FULLSTACK_URL : STARTER_URL) + "/workspace");
}
async function createLab(runtime: Runtime, labName: string) {
  const { page } = runtime;
  if (runtime.source === "starter") {
    await page.getByRole("button", { name: "Criar seu Laboratório IHFR", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Criar Laboratório IHFR", exact: true });
    await dialog.getByRole("textbox", { name: "Nome do laboratório", exact: true }).fill(labName);
    await dialog.getByRole("button", { name: "Criar laboratório", exact: true }).click();
    await expect(dialog).toHaveCount(0);
  } else {
    const form = page.locator("form").filter({ has: page.getByLabel("Nome do laboratório", { exact: true }) });
    await form.getByLabel("Nome do laboratório", { exact: true }).fill(labName);
    const response = page.waitForResponse(r => r.url().endsWith("/api/laboratories") && r.request().method() === "POST");
    await form.getByRole("button", { name: "Criar laboratório", exact: true }).click();
    expect((await response).status()).toBe(201);
  }
  const card = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: labName, exact: true }) });
  await card.getByRole("link", { name: runtime.source === "starter" ? "Acessar" : "ACESSAR LABORATÓRIO", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/laboratories\/[^/]+\/?$/);
  await expect(page.locator("nav:visible").getByRole("link", { name: "Membros", exact: true })).toBeVisible();
  return new URL(page.url()).pathname.replace(/\/$/, "");
}
for (const layout of layouts) {
  test("independent shell layout " + layout.id, async ({ browser }) => {
    const runtimes: Runtime[] = [], failed: string[] = [], paths = new Map<Runtime, string>();
    const labName = "HF UI06 synthetic " + layout.id;
    let fixtureOwned = false;
    const db = createAreaFixtureClient(process.env);
    const run = async (state: string, action?: (observations: SourceObservations) => Promise<void>, unavailable = false, reload = false) => {
      const c = evidence(layout, state);
      const observations: SourceObservations = {};
      try {
        if (action) await action(observations);
        const result = await capture(runtimes, c, unavailable, reload, observations);
        if (result.execution !== "PASS" || result.completeness !== "COMPLETE") failed.push(state);
      } catch {
        failed.push(state);
        // Capture valid states even if a visual assertion failed, and keep independent cases running.
        const captured = await capture(runtimes, c, unavailable, reload, observations);
        await recordCase(c, { ...captured, execution: "FAIL", comparability: captured.comparability,
          requirement: "DEFECT_FOUND", completeness: "PARTIAL", reason: "STATE_OR_GEOMETRY_ASSERTION_FAILED" });
      }
    };
    await withLayoutCleanup(layout.id, async () => {
      await recordLifecycle(layout.id, "setup", "STARTED", "fixture-guard");
      expect(await countAuthFixtureUsers(process.env)).toBe(0);
      fixtureOwned = true;
      await recordLifecycle(layout.id, "setup", "STARTED", "fixture-setup");
      await runAuthFixtureCommand("setup", process.env);
      await db.user.update({ where: { id: actor.id }, data: { firstName: "Marcos", lastName: "Lima" } });
      expect(await db.researchersLinked.count({ where: { userId: actor.id } })).toBe(0);
      for (const source of ["fullstack", "starter"] as const) {
        const runtime = await createRuntime(browser, source); runtimes.push(runtime);
        await recordLifecycle(layout.id, "setup", "STARTED", runtime.source + "-workspace-login");
        await workspaceLogin(runtime); await configure(runtime, layout);
        await recordLifecycle(layout.id, "setup", "PASS", runtime.source + "-workspace-login");
      }
      await run("workspace-closed");
      if (accountCase(layout)) {
        await run("workspace-account-open", async () => { for (const r of runtimes) await account(r, true); }, true);
        await run("workspace-account-escape", async () => { for (const r of runtimes) await account(r, false); }, true);
      }
      for (const runtime of runtimes) {
        await configure(runtime, { ...layout, width: 1440, height: 900, scale: 100, inset: 0 });
        await recordLifecycle(layout.id, "setup", "STARTED", runtime.source + "-create-lab");
        paths.set(runtime, await createLab(runtime, labName)); await configure(runtime, layout);
        await recordLifecycle(layout.id, "setup", "PASS", runtime.source + "-create-lab");
      }
      await run("laboratory-closed");
      if (accountCase(layout)) {
        await run("laboratory-account-open", async () => { for (const r of runtimes) await account(r, true); }, true);
        await run("laboratory-account-escape", async () => { for (const r of runtimes) await account(r, false); }, true);
      }
      if (navigationCase(layout)) {
        await run("last-control-focus", async observations => {
          for (const r of runtimes) {
            const main = r.page.locator(r.source === "fullstack" ? "#application-content" : "#conteudo");
            const last = main.locator("a[href]:visible,button:enabled:visible,input:enabled:visible").last();
            await last.focus(); await expect(last).toBeFocused();
            const focus = await observeFocus(last);
            const referenceOccluded = r.source === "starter" && r.code.sha === STARTER_SHA && layout.width === 667 && layout.height === 375 && layout.scale === 200
              && focus.headerBottom >= focus.railTop && !focus.centerHit;
            observations[r.source] = { focus, requirement: referenceOccluded ? "DEFECT_FOUND" : "SATISFIED_TECHNICALLY",
              reasons: referenceOccluded ? ["REFERENCE_FOCUS_OBSCURED"] : [] };
            if (!referenceOccluded) { await expect(last).toBeInViewport({ ratio: 1 }); expect(focus.centerHit).toBe(true); }
            // The pinned reference's observed obstruction is recorded literally;
            // it is not a qualification claim about either source's accessibility.
          }
        });
        await run("areas-navigation", async () => { for (const r of runtimes) {
          await r.page.locator("nav:visible").getByRole("link", { name: "Áreas", exact: true }).click();
          await expect(r.page.getByRole("heading", { name: r.source === "fullstack" ? "Áreas Monitoradas" : "Áreas monitoradas", exact: true })).toBeVisible();
        } });
        await run("back", async () => { for (const r of runtimes) { await r.page.goBack(); await expect(r.page).toHaveURL(new RegExp(paths.get(r)! + "/?$")); } });
        await run("forward", async () => { for (const r of runtimes) { await r.page.goForward(); await expect(r.page).toHaveURL(/\/areas\/?$/); } });
        await run("reload", async observations => { for (const r of runtimes) {
          const reloadScale = await observeReload(r);
          if (r.source === "starter") {
            const nativeReloadState = await readReferenceReloadState(r.page);
            observations[r.source] = { reloadScale, nativeReloadState, actualState: "reference-" + nativeReloadState.toLowerCase() + "-after-reload",
              reasons: ["REFERENCE_RELOAD_STATE_NON_EQUIVALENT"] };
          } else { await expect(r.page.getByRole("heading", { name: "Áreas Monitoradas", exact: true })).toBeVisible(); observations[r.source] = { reloadScale }; }
          // Only after the before/after readback and native state observation.
          await configure(r, layout);
        } }, false, true);
      }
    }, async () => {
      await recordLifecycle(layout.id, "cleanup", "STARTED", "owned-fixture-cleanup");
      try {
        if (fixtureOwned) {
          const labs = await db.laboratoryRoom.findMany({ where: { userId: actor.id, name: labName }, select: { id: true } });
          expect(labs.length).toBeLessThanOrEqual(1);
          for (const lab of labs) {
            const runtime = runtimes.find(r => r.source === "fullstack");
            if (!runtime) throw new Error("Owned cleanup authentication unavailable");
            expect((await runtime.context.request.delete(FULLSTACK_URL + "/api/laboratories/" + lab.id, { data: { confirmationName: labName } })).status()).toBe(200);
          }
          await runAuthFixtureCommand("teardown", process.env);
          expect(await countAuthFixtureUsers(process.env)).toBe(0);
        }
      } finally {
        await db.$disconnect();
        for (const r of runtimes) await r.context.close();
      }
    });
    expect(failed, "Captured failing cases remain in durable evidence").toEqual([]);
  });
}
test("shell completeness summary", async () => { await finalizeCases(); });
