import { expect, test } from "@playwright/test";

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
    await page.screenshot({ path, fullPage: true });
    await testInfo.attach(`Login ${width}px — campos vazios`, { path, contentType: "image/png" });
  });
}

test("login reflows at 320px with enlarged root text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/login");
  await expect(page.getByLabel("E-mail", { exact: true })).toBeEnabled();
  // Text resizing is not a claim of complete browser-zoom accessibility.
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByLabel("Senha", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "ENTRAR", exact: true })).toBeVisible();
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

test("login preserves the payload, prevents duplicate submission and announces an error", async ({ page }) => {
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
