import { expect, test } from "@playwright/test";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../fixtures/auth-users";

// Runs under the existing Playwright configuration and its database guards.
// Authentication correctness is covered by the existing authenticated-access
// and account-verification-recovery suites; this file covers the new UI states.
for (const width of [375, 768, 1440]) {
  test(`login presentation fits ${width}px without horizontal overflow`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/login");
    await expect(page.getByLabel("E-mail", { exact: true })).toBeEnabled();
    await expect(page.getByRole("heading", { name: "FAÇA SEU LOGIN", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "ENTRAR", exact: true })).toBeEnabled();
    await expect(page.getByRole("link", { name: "Esqueceu sua senha?", exact: true })).toHaveAttribute("href", "/forgot-password");
    await expect(page.getByRole("link", { name: "Cadastrar-se", exact: true })).toHaveAttribute("href", "/register");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const path = testInfo.outputPath(`frontend-login-${width}.png`);
    await page.screenshot({ path, fullPage: true, animations: "disabled" });
    await testInfo.attach(`Login ${width}px — campos vazios`, { path, contentType: "image/png" });
  });
}

test("login reflows at 320px with enlarged root text", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/login");
  await expect(page.getByLabel("E-mail", { exact: true })).toBeEnabled();
  // Text resizing is not a claim of complete browser-zoom accessibility.
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  // The existing global CSS transitions font size. Inspect the final 200% state.
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe("32px");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByLabel("Senha", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "ENTRAR", exact: true })).toBeVisible();
  const submitLabelLines = await page.getByRole("button", { name: "ENTRAR", exact: true }).evaluate((button) => {
    const label = document.createRange();
    label.selectNodeContents(button);
    return label.getClientRects().length;
  });
  expect(submitLabelLines).toBe(1);
  const path = testInfo.outputPath("frontend-login-320-text200.png");
  await page.screenshot({ path, fullPage: true, animations: "disabled" });
  await testInfo.attach("Login 320px — texto 200%", { path, contentType: "image/png" });
});

test("login preserves password visibility controls and keyboard order", async ({ page }) => {
  await page.goto("/login");
  const email = page.getByLabel("E-mail", { exact: true });
  const password = page.getByLabel("Senha", { exact: true });
  await expect(email).toBeEnabled();
  await email.focus();
  await page.keyboard.press("Tab");
  await expect(password).toBeFocused();
  await page.keyboard.press("Tab");
  const toggle = page.getByRole("button", { name: "Mostrar senha", exact: true });
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Space");
  await expect(password).toHaveAttribute("type", "text");
  await expect(page.getByRole("button", { name: "Ocultar senha", exact: true })).toHaveAttribute("aria-pressed", "true");
  const checkbox = page.getByRole("checkbox", { name: "Mostrar senha", exact: true });
  await expect(checkbox).toBeChecked();
  await page.keyboard.press("Tab");
  await expect(checkbox).toBeFocused();
  await page.keyboard.press("Space");
  await expect(password).toHaveAttribute("type", "password");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Mostrar senha", exact: true })).toBeFocused();
  const outline = await page.getByRole("button", { name: "Mostrar senha", exact: true }).evaluate((node) => {
    const style = getComputedStyle(node);
    return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
  });
  expect(outline.width).toBeGreaterThan(0);
  expect(outline.style).not.toBe("none");
});

test("login is inert until hydration and then accepts the first input", async ({ page }) => {
  let releaseScripts!: () => void;
  const scriptsAllowed = new Promise<void>((resolve) => { releaseScripts = resolve; });
  let authRequests = 0;
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/auth/sign-in") authRequests++;
  });
  await page.route(/\/_next\/static\/.*\.js(?:\?.*)?$/, async (route) => {
    await scriptsAllowed;
    await route.continue();
  });
  try {
    await page.goto("/login", { waitUntil: "commit" });
    const email = page.getByLabel("E-mail", { exact: true });
    await expect(email).toBeVisible();
    await expect(email).toBeDisabled();
    await expect(page.getByLabel("Senha", { exact: true })).toBeDisabled();
    await expect(page.getByRole("button", { name: "ENTRAR", exact: true })).toBeDisabled();
    expect(authRequests).toBe(0);
    releaseScripts();
    await expect(email).toBeEnabled();
    await email.fill("login-ui@hidroflorestas.invalid");
    await expect(email).toHaveValue("login-ui@hidroflorestas.invalid");
    expect(authRequests).toBe(0);
  } finally {
    releaseScripts();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test("login preserves the payload, prevents duplicate submission and announces an error", async ({ page }, testInfo) => {
  // Only this 401 response is intercepted. It tests UI/context interaction,
  // NOT credential verification or successful login against a real server.
  let releaseResponse!: () => void;
  let requestStarted!: () => void;
  const responseAllowed = new Promise<void>((resolve) => { releaseResponse = resolve; });
  const requestSeen = new Promise<void>((resolve) => { requestStarted = resolve; });
  const payloads: unknown[] = [];
  await page.route("**/api/auth/sign-in", async (route) => {
    payloads.push(route.request().postDataJSON());
    requestStarted();
    await responseAllowed;
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ success: false, code: "INVALID_CREDENTIALS", message: "Email ou senha inválidos." }),
    });
  });
  try {
    await page.goto("/login");
    const email = page.getByLabel("E-mail", { exact: true });
    const password = page.getByLabel("Senha", { exact: true });
    await expect(email).toBeEnabled();
    await email.fill("login-ui@hidroflorestas.invalid");
    await password.fill("  senha-sintetica-com-espacos  ");
    await page.getByRole("button", { name: "ENTRAR", exact: true }).click();
    await requestSeen;
    await expect(page.getByRole("button", { name: "ENTRANDO...", exact: true })).toBeDisabled();
    await expect(page.locator("form")).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("main").getByRole("status")).toHaveText("Entrando…");
    await expect(email).toBeDisabled();
    await expect(password).toBeDisabled();
    const loadingPath = testInfo.outputPath("frontend-login-loading.png");
    await page.screenshot({ path: loadingPath, fullPage: true, mask: [email, password], animations: "disabled" });
    await testInfo.attach("Login em envio — campos mascarados", { path: loadingPath, contentType: "image/png" });
    await page.locator("form").evaluate((form) => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    releaseResponse();
    await expect(page.locator("form").getByRole("alert")).toBeVisible();
    await expect(page.locator("form").getByRole("alert")).toHaveText("Email ou senha inválidos.");
    expect(payloads).toEqual([{ email: "login-ui@hidroflorestas.invalid", password: "  senha-sintetica-com-espacos  " }]);
    await expect(password).toHaveValue("  senha-sintetica-com-espacos  ");
    await expect(page.getByRole("button", { name: "ENTRAR", exact: true })).toBeEnabled();
    await expect(page).toHaveURL(/\/login$/);
  } finally {
    releaseResponse();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test("login submits with Enter and announces a network failure without navigating", async ({ page }, testInfo) => {
  // Transport failure exercises the real AuthContext error handling, not auth success.
  let attempts = 0;
  await page.route("**/api/auth/sign-in", async (route) => {
    attempts++;
    await route.abort("failed");
  });
  await page.goto("/login");
  const email = page.getByLabel("E-mail", { exact: true });
  const password = page.getByLabel("Senha", { exact: true });
  await expect(email).toBeEnabled();
  await email.fill("login-ui@hidroflorestas.invalid");
  await password.fill("senha-sintetica-de-transporte");
  await password.press("Enter");
  const error = page.locator("form").getByRole("alert");
  await expect(error).toHaveText("Não foi possível conectar ao servidor.");
  await expect(email).toHaveAttribute("aria-describedby", "login-error");
  await expect(password).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("form")).toHaveAttribute("aria-busy", "false");
  await expect(page.getByRole("button", { name: "ENTRAR", exact: true })).toBeEnabled();
  await expect(page).toHaveURL(/\/login$/);
  expect(attempts).toBe(1);
  const path = testInfo.outputPath("frontend-login-network-error.png");
  await page.screenshot({ path, fullPage: true, mask: [email, password], animations: "disabled" });
  await testInfo.attach("Erro de rede — campos mascarados", { path, contentType: "image/png" });
});

test.describe("login with real ineligible credentials", () => {
  test.beforeAll(async () => {
    await runAuthFixtureCommand("teardown", process.env);
    await runAuthFixtureCommand("setup", process.env);
  });
  test.afterAll(async () => {
    await runAuthFixtureCommand("teardown", process.env);
    expect(await countAuthFixtureUsers(process.env)).toBe(0);
  });
  for (const scenario of ["incorrect password", "blocked account"] as const) {
    test(`login rejects ${scenario} through the real backend`, async ({ page, context }) => {
      const password = process.env.E2E_USER_PASSWORD;
      if (!password) throw new Error("Owned auth fixture password is required");
      const user = scenario === "blocked account" ? AUTH_FIXTURE_USERS[2] : AUTH_FIXTURE_USERS[0];
      await page.goto("/login");
      await page.getByLabel("E-mail", { exact: true }).fill(user.email);
      await page.getByLabel("Senha", { exact: true }).fill(scenario === "incorrect password" ? `${password}-wrong` : password);
      const responsePromise = page.waitForResponse(response => response.url().endsWith("/api/auth/sign-in") && response.request().method() === "POST");
      await page.getByRole("button", { name: "ENTRAR", exact: true }).click();
      const response = await responsePromise;
      expect(response.status()).toBe(401);
      expect(response.headers()["set-cookie"]).toBeUndefined();
      await expect(page.locator("form").getByRole("alert")).toHaveText("Email ou senha inválidos.");
      await expect(page).toHaveURL(/\/login$/);
      expect((await context.cookies()).some(cookie => cookie.name === "auth_token")).toBe(false);
    });
  }
});
