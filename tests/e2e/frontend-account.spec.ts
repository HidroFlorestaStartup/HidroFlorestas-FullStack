import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../fixtures/auth-users";
import { signSessionToken } from "../../src/app/api/server/auth/session";

// Presentation/transient transport tests. Domain journeys remain in the real
// account-verification-recovery and dedicated account-deletion suites.
test.use({ trace: "off", screenshot: "off", video: "off" });
test.beforeAll(async () => { await runAuthFixtureCommand("teardown", process.env); await runAuthFixtureCommand("setup", process.env); });
test.afterAll(async () => { await runAuthFixtureCommand("teardown", process.env); expect(await countAuthFixtureUsers(process.env)).toBe(0); });
test.afterEach(async ({ page }) => {
  await page.locator("input").evaluateAll(nodes => nodes.forEach(node => { if (node instanceof HTMLInputElement) { node.value = ""; node.removeAttribute("value"); } })).catch(() => {});
});

async function openAccountPage(page: Page, path: string) {
  try { await page.goto(`/${path}${path === "reset-password" ? `#token=${"a".repeat(43)}` : ""}`); }
  catch { throw new Error("Synthetic account page could not open; proof details omitted."); }
}

async function capture(page: Page, info: TestInfo, name: string) {
  const path = info.outputPath(`frontend-account-${name}.png`);
  const mask = [];
  for (const input of await page.locator('input:not([type="checkbox"])').all()) {
    if (await input.evaluate(node => (node as HTMLInputElement).value.length > 0)) mask.push(input);
  }
  await page.screenshot({ path, fullPage: true, animations: "disabled", mask });
  // Dedicated later browser gates reset test-results. Keep only the explicitly
  // sanitized PNGs in an ignored directory that survives those gates.
  const archive = join(process.cwd(), ".accounts-validation", "frontend-account");
  await mkdir(archive, { recursive: true });
  await copyFile(path, join(archive, `frontend-account-${name}.png`));
  await info.attach(name, { path, contentType: "image/png" });
}

async function accountStates(page: Page) {
  await page.route("**/api/auth/email-verification", route => route.fulfill({ json: {
    success: true, status: "PENDING", challengeId: "00000000-0000-4000-8000-000000000012",
    expiresAt: new Date(Date.now() + 900_000).toISOString(), resendAvailableAt: null, attemptsRemaining: 5,
  } }));
  await page.route("**/api/auth/account-deletion", route => route.fulfill({ json: { success: true, canDelete: true, blockers: [], returnTo: "/workspace" } }));
}

for (const width of [375, 768, 1440, 320]) {
  test(`all six account screens fit ${width}px${width === 320 ? " with text200" : ""}`, async ({ page, context }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await accountStates(page);
    const overflow: string[] = [];
    for (const path of ["register", "verify-email", "forgot-password", "reset-password", "change-password", "delete-account"]) {
      if (path === "change-password") {
        await context.addCookies([{ name: "auth_token", value: signSessionToken(AUTH_FIXTURE_USERS[0].id), url: String(info.project.use.baseURL) }]);
      }
      // Synthetic proof stays out of screenshot names and is cleared by the real component.
      await openAccountPage(page, path);
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      if (path === "reset-password" || path === "change-password") await expect(page.getByLabel("Nova senha", { exact: true })).toBeVisible();
      if (path === "verify-email") await expect(page.getByLabel("Código de verificação")).toBeVisible();
      if (path === "delete-account") await expect(page.getByRole("checkbox")).toBeVisible();
      if (width === 320) {
        await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
        await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("32px");
      }
      await capture(page, info, `${path}-${width}${width === 320 ? "-text200" : ""}`);
      if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) overflow.push(path);
      if (width === 320) {
        const inputBox = await page.locator('input:not([type="checkbox"])').first().boundingBox();
        expect(inputBox !== null && inputBox.width >= 200, `${path}: useful input width with enlarged text`).toBe(true);
        const brokenWords = await page.locator('h1, button[type="submit"]').evaluateAll(nodes => nodes.flatMap(node => {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          const broken: string[] = [];
          let textNode: Node | null;
          while ((textNode = walker.nextNode())) {
            const text = textNode.textContent ?? "";
            const words = /[A-Za-zÀ-ÿ]+/g;
            let match: RegExpExecArray | null;
            while ((match = words.exec(text))) {
              const range = document.createRange();
              range.setStart(textNode, match.index); range.setEnd(textNode, match.index + match[0].length);
              if (range.getClientRects().length > 1) broken.push(match[0]);
            }
          }
          return broken;
        }));
        expect(brokenWords, `${path}: titles and submit labels keep whole words`).toEqual([]);
        if (path === "verify-email") {
          const sixDigitsFit = await page.getByLabel("Código de verificação").evaluate(node => {
            const style = getComputedStyle(node);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;
            context.font = style.font;
            return context.measureText("000000").width + 6 * parseFloat(style.letterSpacing) <= node.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
          });
          expect(sixDigitsFit).toBe(true);
        }
      }
    }
    expect(overflow).toEqual([]);
  });
}

for (const path of ["register", "forgot-password", "change-password"]) {
  test(`${path} is inert before hydration and preserves first input`, async ({ page, context }, info) => {
    if (path === "change-password") await context.addCookies([{ name: "auth_token", value: signSessionToken(AUTH_FIXTURE_USERS[0].id), url: String(info.project.use.baseURL) }]);
    let release!: () => void;
    const allowed = new Promise<void>(resolve => { release = resolve; });
    await page.route(/\/_next\/static\/.*\.js(?:\?.*)?$/, async route => { await allowed; await route.continue(); });
    try {
      await page.goto(`/${path}`, { waitUntil: "commit" });
      const input = page.locator("form input").first();
      await expect(input).toBeVisible();
      await expect(input).toBeDisabled();
      await expect(page.locator('form button[type="submit"]')).toBeDisabled();
      release();
      await expect(input).toBeEnabled();
      const expected = path === "forgot-password" ? "ui@hidroflorestas.invalid" : "Primeiro preenchimento";
      await input.fill(expected);
      expect(await input.inputValue() === expected).toBe(true);
    } finally { release(); await page.unrouteAll({ behavior: "wait" }); }
  });
}

test("signup keeps uncertain attempt, raw password and server errors without field invalidity", async ({ page }, info) => {
  const keys: string[] = [];
  const expectedPassword = `  ${process.env.E2E_USER_PASSWORD!}  `;
  let rawPreserved = true;
  let release!: () => void;
  let seen!: () => void;
  const allowed = new Promise<void>(resolve => { release = resolve; });
  const started = new Promise<void>(resolve => { seen = resolve; });
  await page.route("**/api/auth/sign-up", async route => {
    keys.push(route.request().headers()["idempotency-key"] ?? "");
    rawPreserved &&= route.request().postDataJSON().password === expectedPassword;
    if (keys.length === 1) { seen(); await allowed; await route.abort("failed"); }
    else await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Não foi possível criar a conta. Tente novamente." } });
  });
  try {
    await page.goto("/register");
    await page.getByLabel("Nome", { exact: true }).fill("Conta");
    await page.getByLabel("Sobrenome", { exact: true }).fill("Sintética");
    await page.getByLabel("E-mail", { exact: true }).fill("ui@hidroflorestas.invalid");
    await page.getByLabel("Senha", { exact: true }).fill(expectedPassword);
    // Two events in the same turn, starting idle, before a state rerender.
    await page.locator("form").evaluate(form => { form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
    await started;
    await expect(page.locator("form")).toHaveAttribute("aria-busy", "true");
    await expect(page.getByLabel("Nome", { exact: true })).toBeDisabled();
    await capture(page, info, "register-loading");
    await page.locator("form").evaluate(form => { form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
    release();
    await expect(page.locator("form").getByRole("alert")).toBeVisible();
    expect(keys.length).toBe(1);
    await page.getByRole("button", { name: /^criar conta$/i }).click();
    await expect(page.locator("form").getByRole("alert")).toContainText("Não foi possível criar");
    expect(keys.length).toBe(2); expect(keys[0].length > 0 && keys[0] === keys[1]).toBe(true);
    expect(rawPreserved).toBe(true);
    await expect(page.locator('input[aria-invalid="true"]')).toHaveCount(0);
    await capture(page, info, "register-error");
    await page.getByLabel("Nome", { exact: true }).fill("Outra conta");
    await page.getByRole("button", { name: /^criar conta$/i }).click();
    await expect.poll(() => keys.length).toBe(3);
    expect(keys[2] !== keys[1] && keys[2].length > 0).toBe(true);
  } finally { release(); }
});

test("shared password visibility has a mobile target and visible keyboard focus", async ({ page }, info) => {
  await openAccountPage(page, "reset-password");
  const password = page.getByLabel("Nova senha", { exact: true });
  await password.focus(); await page.keyboard.press("Tab");
  const toggle = page.getByRole("button", { name: "Mostrar nova senha", exact: true });
  await expect(toggle).toBeFocused();
  const box = await toggle.boundingBox();
  expect(box !== null && box.width >= 44 && box.height >= 44).toBe(true);
  expect(await toggle.evaluate(node => parseFloat(getComputedStyle(node).outlineWidth) > 0)).toBe(true);
  await capture(page, info, "password-focus");
  await page.keyboard.press("Space"); await expect(password).toHaveAttribute("type", "text");
  await expect(page.getByRole("button", { name: "Ocultar nova senha", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("verification loading and invalid-code presentation remain safe", async ({ page }, info) => {
  let release!: () => void;
  const allowed = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/auth/email-verification", async route => {
    await allowed;
    await route.fulfill({ json: { success: true, status: "PENDING", challengeId: "00000000-0000-4000-8000-000000000012", expiresAt: new Date(Date.now() + 900_000).toISOString(), resendAvailableAt: null, attemptsRemaining: 4 } });
  });
  await page.route("**/api/auth/email-verification/confirm", route => route.fulfill({ status: 400, json: { success: false, code: "INVALID_PROOF", message: "Código inválido. Confira o código mais recente." } }));
  try {
    await page.goto("/verify-email");
    await expect(page.getByRole("status")).toContainText("Consultando");
    await capture(page, info, "verify-email-loading");
    release();
    const interfaceCode = String(42).padStart(6, "0");
    await page.getByLabel("Código de verificação").fill(interfaceCode);
    await page.getByRole("button", { name: "Confirmar e-mail", exact: true }).click();
    await expect(page.locator('p[role="alert"]')).toBeFocused();
    await capture(page, info, "verify-email-error");
  } finally { release(); }
});

for (const path of ["forgot-password", "reset-password", "change-password", "delete-account"]) {
  test(`${path} processing and general error are visible without exposing fields`, async ({ page, context }, info) => {
    if (path === "change-password" || path === "delete-account") await context.addCookies([{ name: "auth_token", value: signSessionToken(AUTH_FIXTURE_USERS[0].id), url: String(info.project.use.baseURL) }]);
    const endpoint = path === "forgot-password" ? "/api/auth/password-reset/request" : path === "reset-password" ? "/api/auth/password-reset/confirm" : path === "change-password" ? "/api/auth/change-password" : "/api/auth/account-deletion";
    let release!: () => void;
    let seen!: () => void;
    const allowed = new Promise<void>(resolve => { release = resolve; });
    const started = new Promise<void>(resolve => { seen = resolve; });
    await page.route(`**${endpoint}`, async route => {
      if (route.request().method() === "GET") { await route.fulfill({ json: { success: true, canDelete: true, blockers: [], returnTo: "/workspace" } }); return; }
      seen(); await allowed;
      await route.fulfill({ status: 503, json: { success: false, code: "INTERNAL_ERROR", message: "Não foi possível concluir. Tente novamente." } });
    });
    try {
      await openAccountPage(page, path);
      const interfacePassword = process.env.E2E_USER_PASSWORD!;
      if (path === "forgot-password") await page.getByLabel("E-mail", { exact: true }).fill("ui@hidroflorestas.invalid");
      else if (path === "delete-account") {
        await page.getByLabel("Senha atual", { exact: true }).fill(interfacePassword);
        await page.getByRole("checkbox").check();
      } else {
        if (path === "change-password") await page.getByLabel("Senha atual", { exact: true }).fill(interfacePassword);
        await page.getByLabel("Nova senha", { exact: true }).fill(interfacePassword);
        await page.getByLabel("Confirmar nova senha", { exact: true }).fill(interfacePassword);
      }
      await page.locator('form button[type="submit"]').click();
      await started;
      await expect(page.locator("form")).toHaveAttribute("aria-busy", "true");
      await expect(page.locator('form button[type="submit"]')).toBeDisabled();
      await capture(page, info, `${path}-loading`);
      release();
      await expect(page.locator('p[role="alert"]')).toBeVisible();
      await expect(page.locator('input[aria-invalid="true"]')).toHaveCount(0);
      await capture(page, info, `${path}-error`);
    } finally { release(); }
  });
}
