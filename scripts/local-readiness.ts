import { createHash, randomBytes, randomUUID } from "node:crypto";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { createWriteStream, existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { availableParallelism, freemem, release, totalmem } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { performance } from "node:perf_hooks";
import { setTimeout as delay } from "node:timers/promises";
import type { Browser } from "@playwright/test";
import type { TerritorialMapResponse } from "../src/types/territorial-map.type";
import { assertExpectedCollections, assertLocalReadinessEnvironment, LocalReadinessError, nearestRank, publicExplainPlan } from "./local-readiness-policy";
import { coordinateNavigationAndResponse } from "./local-readiness-navigation";

const fail = (code: string): never => { throw new LocalReadinessError(code); };
function requireThat(value: unknown, code: string): asserts value { if (!value) fail(code); }
async function exported<T>(promise: Promise<T>): Promise<T> {
  const value = await promise;
  return (value as T & { default?: T }).default ?? value;
}

function ownedCluster() {
  requireThat(process.platform === "win32" && process.argv.length === 2, "PLATFORM_OR_ARGUMENTS_REFUSED");
  for (const file of [".env", ".env.local", ".env.test", ".env.test.local", ".env.development", ".env.development.local", ".env.production", ".env.production.local"]) {
    requireThat(!existsSync(file), "DOTENV_FILE_REFUSED");
  }
  const root = resolve(process.env.LOCALAPPDATA!, "HidroFlorestas", "accounts-postgresql");
  const local = relative(resolve(".accounts-validation"), root);
  requireThat(local && !local.startsWith(".." + sep) && !isAbsolute(local) && local !== "..", "RUNTIME_OUTSIDE_WORKTREE");
  requireThat(!lstatSync(root).isSymbolicLink() && realpathSync(root).toLowerCase() === root.toLowerCase(), "RUNTIME_REDIRECTION_REFUSED");
  const markerFile = join(root, "cluster-owner.json");
  requireThat(!lstatSync(markerFile).isSymbolicLink(), "MARKER_REDIRECTION_REFUSED");
  const marker = JSON.parse(readFileSync(markerFile, "utf8").replace(/^\uFEFF/, "")) as Record<string, unknown>;
  requireThat(marker.marker === "hidroflorestas:accounts-local-postgresql:v1" && marker.owner === "accounts_owner" && marker.port === 55427 &&
    typeof marker.root === "string" && resolve(marker.root).toLowerCase() === root.toLowerCase(), "CLUSTER_MARKER_REFUSED");
  // Preserve the existing ACL/credential/path guards. Status reads ownership;
  // it neither claims a cluster nor imports its credential into this process.
  const status = spawnSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-File", join(process.cwd(), "scripts/accounts-local-postgresql.ps1"), "-Action", "Status"], {
    env: process.env, encoding: "utf8", windowsHide: true, timeout: 15_000,
  });
  requireThat(status.status === 0 && status.stdout.includes("Accounts PostgreSQL is running."), "OWNED_RUNNING_CLUSTER_REQUIRED");
  return root;
}

async function availablePort() {
  const server = createServer();
  await new Promise<void>((done, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", done); });
  const address = server.address();
  requireThat(address && typeof address !== "string", "PORT_UNAVAILABLE");
  await new Promise<void>((done, reject) => server.close(error => error ? reject(error) : done()));
  return address.port;
}

async function stopServer(server: ChildProcess, port: number) {
  if (server.exitCode === null && server.signalCode === null && server.pid) {
    const stopped = spawnSync("taskkill.exe", ["/PID", String(server.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
    requireThat(stopped.status === 0, "OWN_SERVER_STOP_FAILED");
  }
  if (server.exitCode === null && server.signalCode === null) {
    await Promise.race([
      new Promise<void>(done => server.once("close", () => done())),
      delay(10_000, undefined, { ref: false }).then(() => fail("OWN_SERVER_STOP_TIMEOUT")),
    ]);
  }
  // Verify that the owned listener disappeared; never kill a different process.
  const probe = createServer();
  await new Promise<void>((done, reject) => { probe.once("error", reject); probe.listen(port, "127.0.0.1", done); });
  await new Promise<void>(done => probe.close(() => done()));
}

function safeError(error: unknown) {
  if (error instanceof LocalReadinessError) return error.code;
  const code = (error as { code?: unknown } | undefined)?.code;
  return typeof code === "string" && /^[A-Z0-9_]{2,64}$/.test(code) ? code : "TECHNICAL_FAILURE";
}

async function main() {
  const started = performance.now();
  const cleanup = { server: "NOT_STARTED", browser: "NOT_STARTED", schema: "NOT_CREATED" };
  const record: Record<string, unknown> = {
    instrument: "hf-local-readiness/v1", classification: "EVIDENCIA_IMPLEMENTACAO", startedUtc: new Date().toISOString(),
    scope: "manual synthetic local investigation, separate from baseline", result: "FAIL", cleanup,
    scientificQualifiers: ["CONTRATO_EXPERIMENTAL", "VALIDACAO_CIENTIFICA_PENDENTE", "SUJEITO_A_RECALIBRACAO", "NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"],
  };
  let stage = "guard";
  let artifactRoot: string | undefined;
  let schema: string | undefined;
  let budgetTimer: ReturnType<typeof setTimeout> | undefined;
  const budget = new AbortController();
  const ensureBudget = () => requireThat(!budget.signal.aborted, "INVESTIGATION_BUDGET_EXCEEDED");
  const cleanupErrors: string[] = [];
  try {
    assertLocalReadinessEnvironment(process.env);
    const cluster = ownedCluster();
    stage = "owned artifact setup";
    const runId = `${Date.now()}-${randomBytes(4).toString("hex")}`;
    artifactRoot = join(cluster, "readiness", runId);
    await mkdir(artifactRoot, { recursive: false }).catch(async error => {
      if ((error as { code?: string }).code !== "ENOENT") throw error;
      await mkdir(join(cluster, "readiness"), { recursive: true });
      await mkdir(artifactRoot!);
    });
    record.privateIgnoredArtifact = relative(process.cwd(), join(artifactRoot, "result.json")).replaceAll("\\", "/");
    const diagnostics = await exported(import("./mail-validation-diagnostics"));
    const forwarding = await exported(import("./imp006-gate-diagnostics"));
    const source = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8", windowsHide: true, timeout: 5000 });
    requireThat(source.status === 0 && /^[0-9a-f]{40}$/.test(source.stdout.trim()), "SOURCE_IDENTITY_UNAVAILABLE");
    record.sourceSha = source.stdout.trim();
    record.functionalFingerprint = await diagnostics.mailSnapshotFingerprint();
    record.environment = { node: process.version, platform: process.platform, arch: process.arch, windowsRelease: release(),
      availableParallelism: availableParallelism(), totalMemoryBytes: totalmem(), freeMemoryBytes: freemem(), serverMode: "Next dev", postgres: "owned loopback; actual version recorded in serverVersion" };
    record.limits = { warmups: 10, measuredRequests: 100, targetAreas: 100, targetCollections: 1000, noiseAreas: 10, noiseCollections: 100,
      cooperativeBudgetMs: 300_000, cleanupBestEffort: true, readinessDeadlineMs: 60_000, requestTimeoutMs: 10_000, retries: 0,
      budgetDefinition: "checked between steps and aborts HTTP; in-flight database/browser work and cleanup can extend the budget", publicRawSqlOrParameters: false };
    budgetTimer = setTimeout(() => budget.abort(), 300_000);
    const preflight = await exported(import("./imp006-test-preflight"));
    stage = "owned preflight";
    await preflight.readOnlyImp006Preflight();
    const lifecycle = await exported(import("../tests/fixtures/postgresql-schema-lifecycle"));
    const fixtures = await exported(import("../tests/fixtures/ihfr-diagnosis-fixtures"));
    const actors = await exported(import("../tests/fixtures/ihfr-diagnosis-actors"));
    const sessions = await exported(import("../src/app/api/server/auth/session"));
    const service = await exported(import("../src/app/api/server/services/territorial-map.service"));
    const generated = await exported(import("../src/generated/prisma/index.js"));
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const { chromium } = await import("@playwright/test");
    const { Pool } = await import("pg");
    stage = "owned schema setup";
    cleanup.schema = "SETUP_STARTED_UNVERIFIED";
    try {
      await lifecycle.withImp006PostgresqlSchema(lifecycle.selectedImp006DatabaseVariable(), async (client, db) => {
        const selectedSchema = (await client.query("SELECT current_schema()::text AS schema")).rows[0].schema as string;
        requireThat(/^imp006_test_[0-9a-f]{32}$/.test(selectedSchema), "OWN_SCHEMA_REFUSED");
        schema = selectedSchema;
        record.serverVersion = (await client.query("SHOW server_version")).rows[0].server_version;
        cleanup.schema = "CREATED_OWNED";
        let server: ChildProcess | undefined;
        let browser: Browser | undefined;
        let serverPort: number | undefined;
        let queryDb: InstanceType<typeof generated.PrismaClient> | undefined;
        const log = createWriteStream(join(artifactRoot!, "server.log"));
        try {
          stage = "fixture migrations and actors";
          await fixtures.setupIHFRDiagnosisFixtures(client);
          const owner = actors.IHFR_ACTORS.owner;
          const target = randomUUID(), noise = randomUUID();
          stage = "fixture laboratories and owner memberships";
          // The existing deferred owner invariant must hold at transaction commit.
          await db.$transaction(async tx => {
            for (const [id, label] of [[target, "target"], [noise, "noise"]]) {
              await tx.laboratoryRoom.create({ data: { id, name: `HF-NIGHT readiness ${label}`, userId: owner, accessCode: randomUUID(), isActive: true } });
              await tx.researchersLinked.create({ data: { userId: owner, laboratoryRoomId: id, role: "OWNER" } });
            }
          });
          const areas = Array.from({ length: 110 }, (_, index) => ({ id: randomUUID(), name: `HF-NIGHT area ${String(index).padStart(3, "0")}`,
            userId: owner, laboratoryRoomId: index < 100 ? target : noise, latitude: -3 + index / 1000, longitude: -38 + index / 1000 }));
          const collections = areas.flatMap(area => Array.from({ length: 10 }, (_, index) => ({ id: randomUUID(), userId: owner,
            collectionAreaId: area.id, laboratoryRoomId: area.laboratoryRoomId, occurredAt: new Date(Date.UTC(2026, 9, 1, 12, index)),
            occurrenceOffset: "-03:00", confirmedAt: new Date("2026-10-02T12:00:00Z"), confirmationKey: randomUUID() })));
          stage = "fixture areas and confirmed collections";
          await db.collectionArea.createMany({ data: areas });
          await db.collectionData.createMany({ data: collections });
          const targetAreas = new Set<string>(areas.slice(0, 100).map(area => area.id));
          const targetCollections = new Set<string>(collections.filter(item => item.laboratoryRoomId === target).map(item => item.id));
          const expectedByArea = new Map<string, ReadonlySet<string>>(areas.slice(0, 100).map(area => [area.id,
            new Set(collections.filter(item => item.collectionAreaId === area.id).map(item => item.id))]));
          const analyzed = ["User", "LaboratoryRoom", "ResearchersLinked", "CollectionArea", "CollectionData"];
          for (const table of analyzed) await client.query(`ANALYZE "${schema}"."${table}"`);
          record.dataset = { targetAreas: targetAreas.size, targetCollections: targetCollections.size, noiseAreas: 10, noiseCollections: 100,
            analyzedOwnTables: analyzed, fixtureScope: "generated schema only; pre-existing regression data untouched" };
          ensureBudget();

          stage = "owned server";
          serverPort = await availablePort();
          const origin = `http://127.0.0.1:${serverPort}`;
          const key = () => randomBytes(32).toString("base64");
          const jwtSecret = randomBytes(48).toString("hex");
          const serverEnv = { ...process.env, NODE_ENV: "development" as const, DATABASE_URL: process.env.TEST_DATABASE_URL, IMP006_TEST_SCHEMA: schema,
            JWT_SECRET: jwtSecret, ACCOUNT_POLICY_ENABLED: "1", ACCOUNT_TRUSTED_INGRESS: "local", APP_PUBLIC_URL: "https://synthetic.example.invalid",
            ACCOUNT_PROOF_ACTIVE_KEY_ID: "synthetic", ACCOUNT_PROOF_KEYS: JSON.stringify({ synthetic: key() }), ACCOUNT_REQUEST_KEY: key(),
            MAIL_PAYLOAD_ACTIVE_KEY_ID: "synthetic", MAIL_PAYLOAD_ENCRYPTION_KEYS: JSON.stringify({ synthetic: key() }),
            MAIL_IDEMPOTENCY_KEY: key(), MAIL_WORKER_SECRET: key(), NEXT_TELEMETRY_DISABLED: "1" };
          const ownedServer = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(serverPort)], {
            env: serverEnv, stdio: ["ignore", "pipe", "pipe"], windowsHide: true,
          });
          server = ownedServer;
          cleanup.server = "RUNNING";
          let spawnFailed = false;
          ownedServer.once("error", () => { spawnFailed = true; });
          const safeLog = { write: (line: string) => log.write(diagnostics.redactMailValidation(line, serverEnv)) };
          forwarding.forwardImp006Diagnostics(ownedServer.stdout, serverEnv, "Next stdout", safeLog);
          forwarding.forwardImp006Diagnostics(ownedServer.stderr, serverEnv, "Next stderr", safeLog);
          let ready = false;
          const readyDeadline = performance.now() + 60_000;
          while (performance.now() < readyDeadline) {
            ensureBudget();
            requireThat(!spawnFailed && ownedServer.exitCode === null, "OWN_SERVER_EXITED");
            try {
              const remaining = Math.max(1, Math.floor(readyDeadline - performance.now()));
              const response = await fetch(origin + "/login", { signal: AbortSignal.any([budget.signal, AbortSignal.timeout(Math.min(1000, remaining))]) });
              if (response.status < 500) { ready = true; break; }
            } catch { /* Readiness is bounded and only addresses the owned loopback server. */ }
            await delay(Math.max(0, Math.min(500, readyDeadline - performance.now())));
          }
          requireThat(ready, "OWN_SERVER_NOT_READY");
          const cookie = sessions.signSessionToken(owner, jwtSecret);
          const endpoint = `/api/laboratories/${target}/territorial-map`;
          const check = (body: TerritorialMapResponse) => {
            requireThat(body?.context?.id === target && body.areas?.length === 100, "INCOMPLETE_OR_CROSSED_PAYLOAD");
            requireThat(new Set(body.areas.map(area => area.id)).size === 100, "DUPLICATE_AREA");
            assertExpectedCollections(body.areas, expectedByArea);
            for (const area of body.areas) {
              requireThat(targetAreas.has(area.id) && area.confirmedCollections.length === 10, "INCOMPLETE_OR_CROSSED_AREA");
              for (const collection of area.confirmedCollections) requireThat(targetCollections.has(collection.id), "CROSSED_COLLECTION");
            }
            requireThat(new Set(body.areas.flatMap(area => area.confirmedCollections.map(item => item.id))).size === 1000, "INCOMPLETE_COLLECTION_SET");
            requireThat(!/userId|email|confirmationKey|payload|ihfrScore/.test(JSON.stringify(body)), "PRIVATE_FIELD_IN_PAYLOAD");
          };
          const samples: number[] = [];
          const measurement = { warmupsCompleted: 0, measuredCompleted: 0, samplesMs: samples, payloadBytesUtf8: 0,
            boundary: "GET start through full UTF8 response body; validation after timer; ten warmups excluded" };
          record.http = measurement;
          stage = "HTTP measurement";
          for (let index = 0; index < 110; index++) {
            ensureBudget();
            const start = performance.now();
            const response = await fetch(origin + endpoint, { headers: { Cookie: `auth_token=${cookie}` }, cache: "no-store",
              signal: AbortSignal.any([budget.signal, AbortSignal.timeout(10_000)]) });
            const text = await response.text();
            const duration = performance.now() - start;
            if (index >= 10) samples.push(duration);
            requireThat(response.status === 200 && response.headers.get("cache-control") === "no-store", "HTTP_CONTRACT_FAILED");
            check(JSON.parse(text) as TerritorialMapResponse);
            measurement.payloadBytesUtf8 = Buffer.byteLength(text);
            if (index < 10) measurement.warmupsCompleted++; else measurement.measuredCompleted++;
          }
          requireThat(samples.length === 100, "SAMPLE_COUNT_MISMATCH");
          const p95 = nearestRank(samples, 95);
          record.http = { ...measurement, p95NearestRankMs: p95, goalMs: 500, goalMet: p95 <= 500 };

          stage = "actual projection and EXPLAIN";
          const connection = new URL(process.env.TEST_DATABASE_URL!);
          connection.searchParams.set("options", `-csearch_path=${schema} -cTimeZone=UTC`);
          const logged = new generated.PrismaClient({ adapter: new PrismaPg({ connectionString: connection.toString() }, { schema }), log: [{ level: "query", emit: "event" }] });
          queryDb = logged;
          const statements: Array<{ query: string; params: string }> = [];
          let capturing = true;
          logged.$on("query", event => { if (capturing && /^\s*SELECT\b/i.test(event.query) && /"Collection(?:Area|Data)"/.test(event.query)) statements.push({ query: event.query, params: event.params }); });
          check(await new service.TerritorialMapService(logged).read(owner, target));
          await delay(0);
          capturing = false;
          requireThat(statements.length > 0, "PROJECTION_QUERY_NOT_CAPTURED");
          const plans: Array<Record<string, unknown>> = [];
          await client.query("BEGIN READ ONLY");
          try {
            for (const statement of statements) {
              ensureBudget();
              const references = [...statement.query.matchAll(/\b(?:FROM|JOIN)\s+"([^"]+)"\."([^"]+)"/gi)];
              requireThat(!statement.query.includes(";") && references.length > 0 && references.every(item => item[1] === schema), "QUERY_OUTSIDE_OWN_SCHEMA");
              const parameters: unknown = JSON.parse(statement.params);
              requireThat(Array.isArray(parameters), "QUERY_PARAMETER_FORMAT_REFUSED");
              const explained = await client.query("EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) " + statement.query, parameters);
              plans.push({ querySha256: createHash("sha256").update(statement.query).digest("hex"), parameterCount: parameters.length,
                ownSchemaVerified: true, plan: publicExplainPlan(explained.rows[0]?.["QUERY PLAN"]) });
            }
          } finally { await client.query("ROLLBACK"); }
          record.projection = { queryCount: statements.length, actualServiceInvoked: true, rawSqlPublished: false, parametersPublished: false, plans,
            interpretation: "SQL timings differ from HTTP duration; a small sequential scan is not automatically a defect" };

          stage = "textual interface without external resources";
          browser = await chromium.launch({ headless: true });
          cleanup.browser = "RUNNING";
          const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
          let blockedExternal = 0, blockedMutations = 0, localRequests = 0, pageErrors = 0;
          await context.route("**/*", route => {
            if (new URL(route.request().url()).origin !== origin) { blockedExternal++; return route.abort("blockedbyclient"); }
            if (!["GET", "HEAD"].includes(route.request().method())) { blockedMutations++; return route.abort("blockedbyclient"); }
            localRequests++;
            return route.continue();
          });
          await context.addCookies([{ name: "auth_token", value: cookie, url: origin }]);
          const page = await context.newPage();
          page.setDefaultTimeout(10_000);
          page.on("pageerror", () => { pageErrors++; });
          const { response, ended: responseEnded } = await coordinateNavigationAndResponse(
            () => page.waitForResponse(response => new URL(response.url()).pathname === endpoint).then(async response => {
              await response.finished();
              return { response, ended: performance.now() };
            }),
            () => page.goto(origin + `/dashboard/laboratories/${target}/map`, { waitUntil: "domcontentloaded" }),
          );
          const body = await response.json() as TerritorialMapResponse;
          check(body);
          const buttons = page.locator('button[aria-controls="selected-area-panel"]');
          await page.waitForFunction(() => document.querySelectorAll('button[aria-controls="selected-area-panel"]').length === 100);
          await buttons.first().focus();
          requireThat(await buttons.first().evaluate(node => node === document.activeElement), "TEXT_CONTROL_NOT_FOCUSED");
          await buttons.first().press("Enter");
          await page.locator("#selected-area-title").waitFor({ state: "visible" });
          const interactiveMs = performance.now() - responseEnded;
          let checkedAreaHrefs = 0, checkedCollectionHrefs = 0;
          for (let index = 0; index < body.areas.length; index++) {
            ensureBudget();
            const area = body.areas[index];
            if (index) await buttons.nth(index).click();
            const panel = page.locator("#selected-area-panel");
            await page.waitForFunction(name => document.getElementById("selected-area-title")?.textContent === name, area.name);
            const base = `/dashboard/laboratories/${target}/areas/${area.id}`;
            requireThat(await panel.getByRole("link", { name: "Abrir detalhe da área", exact: true }).getAttribute("href") === base, "AREA_DESTINATION_MISMATCH");
            checkedAreaHrefs++;
            const hrefs = await panel.getByRole("link", { name: "Abrir coleta", exact: true }).evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
            const expected = new Set(area.confirmedCollections.map(item => `${base}/collections/${item.id}`));
            requireThat(hrefs.length === 10 && new Set(hrefs).size === expected.size && hrefs.every(href => href && expected.has(href)), "COLLECTION_DESTINATION_MISMATCH");
            checkedCollectionHrefs += hrefs.length;
          }
          const sampleArea = body.areas[0];
          const areaDestination = `/dashboard/laboratories/${target}/areas/${sampleArea.id}`;
          const areaResponse = await page.goto(origin + areaDestination);
          requireThat(areaResponse?.status() === 200, "AREA_NAVIGATION_FAILED");
          const collectionResponse = await page.goto(origin + areaDestination + `/collections/${sampleArea.confirmedCollections[0].id}`);
          requireThat(collectionResponse?.status() === 200, "COLLECTION_NAVIGATION_FAILED");
          await page.getByRole("heading", { name: "Detalhe da coleta", exact: true }).waitFor({ state: "visible" });
          requireThat(blockedMutations === 0 && pageErrors === 0, "UNEXPECTED_BROWSER_EFFECT");
          record.browser = { areas: 100, selectedByKeyboard: true, interactiveAfterResponseMs: interactiveMs, goalMs: 2000, goalMet: interactiveMs <= 2000,
            checkedAreaHrefs, checkedCollectionHrefs, actualNavigations: 2, blockedExternalRequests: blockedExternal, blockedMutationRequests: blockedMutations,
            localRequests, pageErrors, externalResourcesAllowed: false, tileMode: "synthetic loopback unavailable",
            limitations: "all hrefs checked; two destinations actually opened; no human assistive-technology or participant evaluation" };
          record.result = p95 <= 500 && interactiveMs <= 2000 ? "PASS" : "GOAL_NOT_MET";
        } finally {
          if (browser) { try { await browser.close(); cleanup.browser = "CLOSED"; } catch { cleanupErrors.push("BROWSER_CLOSE_FAILED"); cleanup.browser = "FAILED"; } }
          if (server && serverPort) { try { await stopServer(server, serverPort); cleanup.server = "STOPPED"; } catch { cleanupErrors.push("SERVER_STOP_FAILED"); cleanup.server = "FAILED"; } }
          await new Promise<void>(done => log.end(done));
          if (queryDb) { try { await queryDb.$disconnect(); } catch { cleanupErrors.push("QUERY_CLIENT_CLOSE_FAILED"); } }
        }
      });
    } finally {
      if (schema) {
        const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL, max: 1, connectionTimeoutMillis: 10_000 });
        try {
          const remaining = await pool.query("SELECT count(*)::int AS count FROM pg_namespace WHERE nspname=$1", [schema]);
          cleanup.schema = remaining.rows[0]?.count === 0 ? "REMOVED" : "FAILED";
          if (cleanup.schema !== "REMOVED") cleanupErrors.push("OWN_SCHEMA_REMAINS");
        } catch { cleanupErrors.push("SCHEMA_CLEANUP_NOT_VERIFIED"); cleanup.schema = "UNVERIFIED"; }
        finally { await pool.end(); }
      } else if (cleanup.schema === "SETUP_STARTED_UNVERIFIED") {
        cleanup.schema = "UNVERIFIED_BY_INSTRUMENT";
        cleanupErrors.push("SCHEMA_SETUP_LIFECYCLE_UNVERIFIED");
      }
    }
    requireThat(cleanupErrors.length === 0, "CLEANUP_FAILED");
    record.functionalFingerprintAfter = await diagnostics.mailSnapshotFingerprint();
    requireThat(record.functionalFingerprint === record.functionalFingerprintAfter, "SOURCE_CHANGED_DURING_INVESTIGATION");
  } catch (error) {
    record.result = stage === "guard" ? "REFUSED" : "FAIL";
    record.failedStage = stage;
    record.errorCode = safeError(error);
  } finally {
    if (budgetTimer) clearTimeout(budgetTimer);
    record.cleanupErrors = cleanupErrors;
    record.endedUtc = new Date().toISOString();
    record.durationMs = performance.now() - started;
    if (artifactRoot) await writeFile(join(artifactRoot, "result.json"), JSON.stringify(record, null, 2));
    process.stdout.write(JSON.stringify({ instrument: record.instrument, result: record.result, failedStage: record.failedStage,
      errorCode: record.errorCode, durationMs: record.durationMs, privateIgnoredArtifact: record.privateIgnoredArtifact }) + "\n");
  }
  process.exitCode = record.result === "PASS" ? 0 : record.result === "GOAL_NOT_MET" ? 2 : 1;
}

void main().catch(() => { process.stdout.write("Local readiness receipt could not be completed; no environment disclosed.\n"); process.exitCode = 1; });
