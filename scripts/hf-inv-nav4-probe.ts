import { spawn, type ChildProcess } from "node:child_process";
import { createWriteStream } from "node:fs";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { release } from "node:os";
import { join, resolve } from "node:path";
import { once } from "node:events";
import { createServer } from "node:net";
import bcrypt from "bcrypt";
import { chromium, expect, type BrowserContext } from "@playwright/test";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../tests/fixtures/auth-users";
import { withImp006PostgresqlSchema } from "../tests/fixtures/postgresql-schema-lifecycle";
import { setupIHFRDiagnosisFixtures } from "../tests/fixtures/ihfr-diagnosis-fixtures";

let baseURL = "";
let serverURL = "";
let applicationPort = 0;
const output = resolve("docs/releases/2026-10-23-hf-inv-local01/nav4");
const records: Record<string, unknown>[] = [];
const backOnly = process.env.HF_INV_NAV4_BACK_ONLY === "1";
const originOnly = process.env.HF_INV_NAV4_ORIGIN_ONLY === "1";
let stage = "guard";
let child: ChildProcess | undefined;

function invariant(value: unknown, label: string): asserts value { if (!value) throw new Error(label); }
async function record(value: Record<string, unknown>) {
  const entry = { atUtc: new Date().toISOString(), ...value };
  records.push(entry);
  await writeFile(join(output, backOnly ? "back-results.json" : originOnly ? "origin-results.json" : "probe-results.json"), JSON.stringify({ protocolVersion: backOnly ? 4 : originOnly ? 5 : 3, records }, null, 2) + "\n");
  process.stdout.write(JSON.stringify(entry) + "\n");
}
async function failure(error: unknown, fields: Record<string, unknown>) {
  await appendFile(join(process.env.HF_INV_PRIVATE_ROOT!, "probe-errors.log"), `${new Date().toISOString()} ${stage}\n${error instanceof Error ? error.stack : String(error)}\n`);
  await record({ ...fields, kind: "probe_failure", result: "FAIL", failedStage: stage });
  process.exitCode = 1;
}
async function stopServer() {
  if (!child || child.exitCode !== null) return;
  const pid = child.pid;
  invariant(pid, "owned_server_pid");
  // Windows taskkill acts only on the process tree spawned by this probe.
  const stopper = spawn("taskkill.exe", ["/PID", String(pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
  await once(stopper, "close");
  await Promise.race([once(child, "close"), new Promise(resolve => setTimeout(resolve, 3000))]);
  child = undefined;
}
async function startServer(phase: string, schema?: string) {
  stage = `${phase}_start`;
  const available = createServer();
  await new Promise<void>((resolve, reject) => { available.once("error", reject); available.listen(backOnly ? 3001 : 0, "127.0.0.1", resolve); });
  const address = available.address(); invariant(address && typeof address !== "string", "free_port_required");
  applicationPort = address.port;
  await new Promise<void>(resolve => available.close(() => resolve()));
  serverURL = `http://127.0.0.1:${applicationPort}`;
  const env: NodeJS.ProcessEnv = { ...process.env, NODE_ENV: "development", DATABASE_URL: process.env.TEST_DATABASE_URL!, IMP006_TEST_SCHEMA: schema };
  delete env.ACCOUNT_TRUSTED_INGRESS;
  delete env.IMP006_LOCAL_REGRESSION_PUBLIC;
  delete env.ACCOUNT_TESTER_ALLOWLIST;
  if (backOnly) { env.ACCOUNT_TRUSTED_INGRESS = "local"; env.IMP006_LOCAL_REGRESSION_PUBLIC = "1"; }
  const log = createWriteStream(join(process.env.HF_INV_PRIVATE_ROOT!, `next-${phase}.log`));
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(applicationPort)], { env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  child = server;
  server.stdout?.pipe(log, { end: false }); server.stderr?.pipe(log, { end: false });
  server.once("close", () => log.end());
  const started = Date.now();
  let ready = false;
  while (Date.now() - started < 120_000) {
    invariant(server.exitCode === null, "server_exited");
    try { if ((await fetch(`${serverURL}/login`, { signal: AbortSignal.timeout(10_000) })).status === 200) { ready = true; break; } } catch { /* readiness only */ }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  invariant(ready, "server_readiness_timeout");
  await record({ phase, kind: "readiness", result: "PASS", trustedIngress: backOnly ? "local" : "fallback", applicationPort, durationMs: Date.now() - started });
}
async function loginApi(context: BrowserContext) {
  const response = await context.request.post(`${baseURL}/api/auth/sign-in`, {
    headers: { origin: `http://localhost:${applicationPort}` },
    data: { email: AUTH_FIXTURE_USERS[0].email, password: process.env.E2E_USER_PASSWORD },
  });
  invariant(response.status() === 200, "synthetic_login_failed");
  invariant((await context.cookies()).some(cookie => cookie.name === "auth_token"), "login_cookie_missing");
}
async function originProbe(phase: string, local: boolean, width: number, textPercent: number) {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ baseURL, viewport: { width, height: 900 } });
    stage = `${phase}_login`;
    await loginApi(context);
    const page = await context.newPage();
    const workspace = await page.goto(`${baseURL}/workspace`);
    invariant(workspace?.status() === 200, "authenticated_document_status");
    await expect(page).toHaveURL(/\/workspace$/);
    await expect(page.getByRole("heading", { name: /Olá, Active!/ })).toBeVisible();
    const me = await context.request.get(`${baseURL}/api/auth/me`);
    invariant(me.status() === 200 && (await me.json()).success === true, "authenticated_session_status");
    await page.addStyleTag({ content: `html { font-size:${textPercent}% !important; }` });
    await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize))).toBe(16 * textPercent / 100);
    await record({ phase, kind: "authenticated_baseline", result: "PASS", width, textPercent, pathname: "/workspace", documentStatus: 200, sessionStatus: 200, authenticatedHeading: true, cookiePresent: true });
    stage = `${phase}_negative_origin`;
    const rejected = await context.request.post(`${baseURL}/api/auth/logout`, { headers: { origin: "https://untrusted.example.invalid" } });
    invariant(rejected.status() === 403, "negative_origin_accepted");
    invariant((await context.cookies()).some(cookie => cookie.name === "auth_token"), "negative_origin_removed_cookie");
    await record({ phase, kind: "negative_origin", result: "PASS", method: "POST", pathname: "/api/auth/logout", status: 403, cookiePresent: true });
    stage = `${phase}_logout`;
    const responsePromise = page.waitForResponse(response => new URL(response.url()).pathname === "/api/auth/logout" && response.request().method() === "POST");
    await page.goto(`${baseURL}/logout`);
    const response = await responsePromise;
    const status = response.status();
    await record({ phase, kind: "logout_response", method: "POST", status, width, textPercent, browserHostname: new URL(baseURL).hostname });
    if (local) {
      invariant(status === 200, "supported_logout_status");
      await expect(page).toHaveURL(/\/login$/);
      invariant(!(await context.cookies()).some(cookie => cookie.name === "auth_token"), "logout_cookie_retained");
      if (!originOnly) {
        await page.goBack(); await expect(page).toHaveURL(/\/login$/);
        await page.reload(); await expect(page).toHaveURL(/\/login$/);
      }
      await page.goto(`${baseURL}/workspace`); await expect(page).toHaveURL(/\/login$/);
      await page.goto(`${baseURL}/dashboard`); await expect(page).toHaveURL(/\/login$/);
    } else {
      invariant(status === 403, "fallback_did_not_reproduce");
      await expect(page).toHaveURL(/\/logout$/);
      await expect(page.getByRole("alert").filter({ has: page.getByRole("button", { name: "Tentar novamente", exact: true }) })).toBeVisible();
      invariant((await context.cookies()).some(cookie => cookie.name === "auth_token"), "fallback_cookie_removed");
    }
    await record({ phase, kind: "browser_logout", result: "PASS", expectedJourney: local ? "logout_succeeds" : "logout_refused", width, textPercent, method: "POST", status, pathname: new URL(page.url()).pathname, cookiePresent: (await context.cookies()).some(cookie => cookie.name === "auth_token") });
    await context.close();
  } finally { await browser.close(); }
}
async function loginProbe() {
  const browser = await chromium.launch();
  try {
    for (const [index, latencyMs] of [0, 0, 500].entries()) {
      stage = `INV004_${index + 1}`;
      const context = await browser.newContext({ baseURL });
      const page = await context.newPage();
      let responseObserved = 0;
      let destinationObserved = 0;
      page.on("response", response => { if (new URL(response.url()).pathname === "/api/auth/sign-in") responseObserved = performance.now(); });
      page.on("framenavigated", frame => { if (frame === page.mainFrame() && new URL(frame.url()).pathname === "/workspace") destinationObserved = performance.now(); });
      if (latencyMs) await page.route("**/api/auth/sign-in", async route => {
        const response = await route.fetch();
        await new Promise(resolve => setTimeout(resolve, latencyMs));
        await route.fulfill({ response });
      });
      await page.goto("/login");
      await page.getByLabel("E-mail").fill(AUTH_FIXTURE_USERS[0].email);
      await page.getByLabel("Senha", { exact: true }).fill(process.env.E2E_USER_PASSWORD!);
      const responsePromise = page.waitForResponse(response => new URL(response.url()).pathname === "/api/auth/sign-in");
      const started = Date.now();
      await page.getByRole("button", { name: "ENTRAR", exact: true }).click();
      const response = await responsePromise;
      invariant(response.status() === 200, "browser_login_status");
      await expect(page).toHaveURL(/\/workspace$/);
      await expect(page.getByRole("heading", { name: /Olá, Active!/ })).toBeVisible();
      invariant((await context.cookies()).some(cookie => cookie.name === "auth_token"), "browser_login_cookie");
      invariant(responseObserved > 0 && destinationObserved >= responseObserved, "login_response_route_order");
      await record({ phase: stage, kind: "browser_login", result: "PASS", status: response.status(), pathname: "/workspace", latencyMs, durationMs: Date.now() - started, responseToDestinationMs: Math.round(destinationObserved - responseObserved), responseBeforeDestination: true, authenticatedHeading: true, cookiePresent: true });
      await context.close();
    }
  } finally { await browser.close(); }
}
async function backProbe() {
  const browser = await chromium.launch();
  try {
    for (const flow of ["direct-document", "primary-link"] as const) for (const mode of ["immediate", "networkidle"] as const) for (let attempt = 1; attempt <= 3; attempt++) {
      stage = `BACK_${flow}_${mode}_${attempt}`;
      const context = await browser.newContext({ baseURL, viewport: { width: 375, height: 900 } });
      const page = await context.newPage();
      const events: Array<{ atMs: number; kind: string; pathname: string; status?: number }> = [];
      page.on("framenavigated", frame => { if (frame === page.mainFrame()) events.push({ atMs: Math.round(performance.now()), kind: "navigation", pathname: new URL(frame.url()).pathname }); });
      page.on("response", response => { const path = new URL(response.url()).pathname; if (response.request().isNavigationRequest() || ["/api/auth/me", "/api/auth/logout"].includes(path)) events.push({ atMs: Math.round(performance.now()), kind: response.request().isNavigationRequest() ? "document" : "api", pathname: path, status: response.status() }); });
      await page.addInitScript(() => {
        const key = "hf-inv-nav4-history";
        for (const event of ["pageshow", "pagehide"] as const) window.addEventListener(event, value => {
          const previous = JSON.parse(sessionStorage.getItem(key) ?? "[]");
          previous.push({ event, persisted: value.persisted, pathname: location.pathname, timeOrigin: performance.timeOrigin });
          sessionStorage.setItem(key, JSON.stringify(previous));
        });
      });
      try {
        const signin = await context.request.post(`${baseURL}/api/auth/sign-in`, { headers: { origin: baseURL }, data: { email: AUTH_FIXTURE_USERS[0].email, password: process.env.E2E_USER_PASSWORD } });
        invariant(signin.status() === 200, "back_login_status");
        const workspace = await page.goto("/workspace"); invariant(workspace?.status() === 200, "back_baseline_document_status");
        await expect(page.getByRole("heading", { name: /Olá, Active!/ })).toBeVisible();
        invariant((await context.request.get(`${baseURL}/api/auth/me`)).status() === 200, "back_baseline_session_status");
        const logoutResponse = page.waitForResponse(response => new URL(response.url()).pathname === "/api/auth/logout" && response.request().method() === "POST");
        if (flow === "primary-link") await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Sair", exact: true }).click();
        else await page.goto("/logout");
        invariant((await logoutResponse).status() === 200, "back_logout_status");
        await expect(page).toHaveURL(/\/login$/);
        invariant(!(await context.cookies()).some(cookie => cookie.name === "auth_token"), "back_cookie_retained");
        if (mode === "networkidle") await page.waitForLoadState("networkidle");
        await page.goBack();
        let returnedToLogin = true;
        try { await expect(page).toHaveURL(/\/login$/); } catch { returnedToLogin = false; }
        const me = await context.request.get(`${baseURL}/api/auth/me`);
        const privateHeadingVisible = await page.getByRole("heading", { name: /Olá, Active!/ }).isVisible();
        const loginFormVisible = await page.getByRole("button", { name: "ENTRAR", exact: true }).isVisible();
        let privateMenuInteractive = false;
        const menu = page.getByRole("button", { name: "Conta", exact: true });
        if (await menu.isVisible()) {
          await menu.click(); privateMenuInteractive = await page.getByRole("link", { name: "Alterar senha", exact: true }).isVisible(); await page.keyboard.press("Escape");
        }
        const history = await page.evaluate(() => JSON.parse(sessionStorage.getItem("hf-inv-nav4-history") ?? "[]"));
        await record({ phase: stage, kind: "back_observation", flow, mode, attempt, result: returnedToLogin && me.status() === 401 && !privateHeadingVisible ? "PASS" : "FAIL", pathname: new URL(page.url()).pathname, sessionStatus: me.status(), cookiePresent: (await context.cookies()).some(cookie => cookie.name === "auth_token"), returnedToLogin, privateHeadingVisible, privateMenuInteractive, loginFormVisible, history, events });
        if (!returnedToLogin || me.status() !== 401 || privateHeadingVisible) process.exitCode = 1;
        await page.reload(); await expect(page).toHaveURL(/\/login$/);
        await record({ phase: stage, kind: "reload_after_back", result: "PASS", pathname: "/login" });
      } catch (error) { await failure(error, { phase: stage }); }
      finally { await context.close(); }
    }
  } finally { await browser.close(); }
}
async function main() {
  invariant(process.env.ACCOUNTS_LOCAL_POSTGRESQL === "1" && process.env.IMP006_LOCAL_POSTGRESQL === "1", "accounts_guard_required");
  const database = new URL(process.env.TEST_DATABASE_URL!);
  invariant(database.hostname === "127.0.0.1" && database.port === "55427" && database.pathname === (backOnly ? "/accounts_regression_test" : "/postgres"), "database_guard_required");
  invariant(process.env.HF_INV_PRIVATE_ROOT, "private_output_required");
  await mkdir(output, { recursive: true });
  await mkdir(process.env.HF_INV_PRIVATE_ROOT!, { recursive: true });
  const git = (args: string[]) => execFileSync("git", ["-c", `safe.directory=${process.cwd().replaceAll("\\", "/")}`, ...args], { windowsHide: true });
  const sources = [];
  for (const path of ["scripts/hf-inv-nav4-probe.ts", "scripts/hf-inv-nav4-local.ps1", "docs/releases/2026-10-23-hf-inv-local01/nav4/protocol.md"]) {
    const bytes = await readFile(path); sources.push({ path, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  await record({ phase: "identity", kind: "provenance", head: git(["rev-parse", "HEAD"]).toString().trim(), tree: git(["rev-parse", "HEAD^{tree}"]).toString().trim(), trackedPatchSha256: createHash("sha256").update(git(["diff", "HEAD"])).digest("hex"), sources, node: process.version, platform: process.platform, osRelease: release(), next: JSON.parse(await readFile("node_modules/next/package.json", "utf8")).version, playwright: JSON.parse(await readFile("node_modules/@playwright/test/package.json", "utf8")).version, postgres: "17.10", applicationDelta: "none", cluster: "mission-owned-accounts" });
  if (backOnly) {
    try { await runAuthFixtureCommand("setup", process.env); await startServer("official_back"); baseURL = serverURL; await backProbe(); }
    finally { await stopServer(); await runAuthFixtureCommand("teardown", process.env); invariant((await countAuthFixtureUsers(process.env)) === 0, "back_fixture_teardown"); }
    await record({ phase: "teardown", kind: "auth_fixtures", result: "PASS" });
    return;
  }
  await withImp006PostgresqlSchema("TEST_DATABASE_URL", async (client, db) => {
    await setupIHFRDiagnosisFixtures(client);
    const schema = (await client.query("SELECT current_schema() AS schema")).rows[0].schema as string;
    await db.user.create({ data: { ...AUTH_FIXTURE_USERS[0], password: await bcrypt.hash(process.env.E2E_USER_PASSWORD!, 10), role: "USER", verificationRequired: false } });
    try {
      await startServer("same_server", schema);
      for (const [phase, local] of [["A1", false], ["B", true], ["A2", false]] as const) {
        baseURL = local ? `http://localhost:${applicationPort}` : serverURL;
        if (local && !originOnly) {
          try { await loginProbe(); }
          catch (error) { await failure(error, { phase: stage }); }
        }
        for (const [width, textPercent] of originOnly ? [[375, 100]] : [[375, 100], [375, 200], [320, 100], [320, 200]]) {
          try { await originProbe(phase, local, width, textPercent); }
          catch (error) { await failure(error, { phase, width, textPercent }); }
        }
      }
    } finally { await stopServer(); }
  });
  await record({ phase: "teardown", kind: "owned_schema", result: "PASS" });
}
void main().catch(async (error) => { await failure(error, { phase: stage }); }).finally(async () => {
  await stopServer();
});
