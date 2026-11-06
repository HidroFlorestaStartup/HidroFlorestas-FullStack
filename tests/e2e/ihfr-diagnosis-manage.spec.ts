import { fillCollectionOccurrence } from "./support/collection-occurrence";
import type { Locator, Page, TestInfo } from "@playwright/test";
import { expect, test } from "./support/ihfr-diagnostics";
import { captureIHFRViewport, expectIHFRControl, expectIHFRScientificWords, expectIHFRUnfragmentedWords, settleIHFRViewport } from "./support/frontend-ihfr-evidence";
import { Client } from "pg";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { captureMissionViewport } from "./support/frontend-mission-evidence";
import { expectUI044Notice, inspectUI044Detail, inspectUI044DetailMatrix } from "./support/ui044-final-corrections";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing isolated IMP-006 E2E fixture: ${name}`);
  return value;
};

async function authenticate(page: Page, actorId: string, baseURL: string) {
  await page.context().clearCookies();
  await page.context().addCookies([{ name: "auth_token", value: signSessionToken(actorId), url: baseURL }]);
}

async function operationRows(collectionUrl: string): Promise<number> {
  const schema = required("IMP006_TEST_SCHEMA");
  if (!/^imp006_test_[0-9a-f]{32}$/.test(schema)) throw new Error("IMP-006 E2E schema is not owned");
  const collectionId = collectionUrl.split("/").at(-1);
  if (!collectionId || !/^[0-9a-f-]{36}$/i.test(collectionId)) throw new Error("IMP-006 E2E collection is invalid");
  const client = new Client({ connectionString: required("TEST_DATABASE_URL") });
  await client.connect();
  try {
    await client.query(`SET search_path TO "${schema}"`);
    const selected = await client.query("SELECT current_schema() AS schema");
    if (selected.rows[0]?.schema !== schema) throw new Error("IMP-006 E2E schema isolation failed");
    const result = await client.query(`SELECT count(*)::int AS count FROM "IHFRDiagnosisOperation" WHERE "collectionDataId"=$1`, [collectionId]);
    return result.rows[0].count as number;
  } finally { await client.end(); }
}

async function confirmByKeyboard(page: Page, trigger: ReturnType<Page["getByRole"]>) {
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Cancelar" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Confirmar" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Cancelar" })).toBeFocused();
  for (let index = 0; index < 4; index++) {
    await page.keyboard.press("Tab");
    await expect(dialog.locator(":focus")).toHaveCount(1);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.press("Enter");
  await dialog.getByRole("button", { name: "Confirmar" }).click();
}

async function inspectManagementViewports(page: Page, info: TestInfo, management: Locator) {
  const create = management.getByRole("button", { name: "Criar diagnóstico", exact: true });
  const landUse = await management.getByLabel("Uso predominante da terra").inputValue();
  const observedAt = await management.getByLabel("Data e hora da observação").inputValue();
  for (const [width, height, scale] of [[320, 900, 100], [375, 900, 100], [390, 844, 100], [768, 900, 100], [1440, 900, 100], [320, 900, 200], [667, 375, 200]]) {
    const scenario = `frontend-ihfr-management-${width}-${height}-${scale}`;
    await settleIHFRViewport(page, width, height, scale);
    if (scale === 200) {
      await expectIHFRUnfragmentedWords(management.getByRole("heading", { name: "Gerenciar diagnóstico IHFR experimental", exact: true }));
      await expectIHFRScientificWords(page.getByRole("region", { name: "Diagnóstico IHFR experimental", exact: true }));
      await expectIHFRUnfragmentedWords(management.getByRole("button", { name: "Verificar elegibilidade", exact: true }));
      await expectIHFRUnfragmentedWords(create);
    }
    await management.getByLabel("Data e hora da observação").focus();
    await expectIHFRControl(management.getByLabel("Data e hora da observação"), page, info, scenario);
    await captureIHFRViewport(page, info, `${scenario}-observation`);
    await create.focus();
    await expectIHFRControl(create, page, info, scenario);
    await captureIHFRViewport(page, info, `${scenario}-actions`);
    await create.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("button", { name: "Cancelar" })).toBeFocused();
    await expectIHFRControl(dialog.getByRole("button", { name: "Confirmar" }), page, info, scenario);
    if (scale === 200) {
      await expectIHFRUnfragmentedWords(dialog.getByRole("heading"));
      await expectIHFRUnfragmentedWords(dialog.getByRole("button", { name: "Cancelar", exact: true }));
      await expectIHFRUnfragmentedWords(dialog.getByRole("button", { name: "Confirmar", exact: true }));
    }
    await captureIHFRViewport(page, info, `${scenario}-confirmation`);
    if (width === 1440) {
      // Keep the confirmation open across the desktop/mobile parent change.
      // Escape must return to the current trigger, not a detached former slot.
      await settleIHFRViewport(page, 375, 900);
      await expect(dialog).toHaveCount(1);
      await expect(dialog.getByRole("button", { name: "Cancelar" })).toBeFocused();
      await expect(management.getByLabel("Uso predominante da terra")).toHaveValue(landUse);
      await expect(management.getByLabel("Data e hora da observação")).toHaveValue(observedAt);
      await expectIHFRControl(dialog.getByRole("button", { name: "Cancelar" }), page, info, "frontend-ihfr-ui044-dialog-resize-375");
      await captureIHFRViewport(page, info, "frontend-ihfr-ui044-dialog-resize-375");
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(create).toBeFocused();
    if (width === 1440) {
      await expectIHFRControl(create, page, info, "frontend-ihfr-ui044-dialog-return-375");
      await captureIHFRViewport(page, info, "frontend-ihfr-ui044-dialog-return-375");
    }
  }
  const cdp = await page.context().newCDPSession(page);
  try {
    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 34, bottomMax: 34 } });
    await expect.poll(() => page.locator("#application-navigation").evaluate(node => parseFloat(getComputedStyle(node).paddingBottom))).toBe(42);
    await expectIHFRControl(create, page, info, "frontend-ihfr-landscape-text200-safearea34");
    await captureIHFRViewport(page, info, "frontend-ihfr-landscape-text200-safearea34", 34);
  } finally {
    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 0, bottomMax: 0 } });
    await cdp.detach();
  }
  await settleIHFRViewport(page, 1280, 900);
}

test("collection, environmental confirmation and IHFR creation work without browser randomUUID", async ({ page }, info) => {
  test.setTimeout(120_000);
  const baseURL = String(info.project.use.baseURL);
  if (new URL(baseURL).hostname === "127.0.0.1") {
    await page.addInitScript(() => {
      Object.defineProperty(window.crypto, "randomUUID", { configurable: true, value: undefined });
    });
  }
  await authenticate(page, required("IMP006_E2E_OWNER_ID"), baseURL);
  // UI-036: isolate the presentation fixture from the seeded IMP-006 diagnostic
  // whose occurredAt is the current clock time and is legitimately newer.
  // This area exists only in the runner-owned synthetic PostgreSQL schema.
  const areaRoot = required("IMP006_E2E_MANAGE_URL").replace(/\/areas\/[^/]+\/collections\/[^/]+$/, "/areas");
  if (!areaRoot.startsWith("/dashboard/laboratories/") || !areaRoot.endsWith("/areas")) {
    throw new Error("INVALID_UI036_SYNTHETIC_AREA_ROOT");
  }
  const createdArea = await page.context().request.post(areaRoot.replace(/^\/dashboard\//, "/api/"), {
    data: { name: "HF-UI036 isolated IHFR provenance", latitude: -3.12, longitude: -38.48 },
  });
  expect(createdArea.status()).toBe(201);
  const areaId = (await createdArea.json()).area.id as string;
  expect(areaId).toMatch(/^[0-9a-f-]{36}$/i);
  const collectionNewUrl = `${areaRoot}/${areaId}/collections/new`;
  await page.goto(collectionNewUrl);
  expect(await page.evaluate(() => typeof crypto.randomUUID)).toBe("undefined");
  expect(await page.evaluate(() => typeof crypto.getRandomValues)).toBe("function");
  if (new URL(baseURL).hostname !== "127.0.0.1") expect(await page.evaluate(() => window.isSecureContext)).toBe(false);
  await fillCollectionOccurrence(page, "2026-09-24T09:00:00-03:00");
  await page.getByRole("button", { name: "Revisar coleta" }).click();
  const collectionPost = page.waitForResponse((response) => response.url().endsWith("/collections") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Confirmar coleta" }).click();
  const confirmedCollection = await collectionPost;
  expect(confirmedCollection.status()).toBe(201);
  expect(confirmedCollection.request().headers()["idempotency-key"]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  const collectionId = (await confirmedCollection.json()).collection.id as string;
  const collectionUrl = collectionNewUrl.replace(/\/new$/, `/${collectionId}`);
  await expect(page).toHaveURL(`${baseURL}${collectionUrl}`);

  await page.goto(`${collectionUrl}/environmental-data/new`);
  await expect(page.locator('[name="water.waterSourceType"]')).toHaveCount(1);
  for (const [field, value] of Object.entries({
    "water.waterSourceType": "RIVER_STREAM", "water.hasSpring": "false", "water.waterAvailability": "PERMANENT",
    "soil.soilTexture": "SANDY", "soil.compactionLevel": "LOW", "soil.erosionSigns": "NONE",
    "vegetation.fragmentationLevel": "LOW", "vegetation.landscapeDegradation": "LOW",
  })) await page.locator(`[name="${field}"]`).selectOption(value);
  for (const [field, value] of Object.entries({ "soil.infiltrationRateMmPerHour": "0", "vegetation.vegetationCoverPercent": "100", "terrain.drainageDensityKmPerKm2": "1.5", "terrain.elevationMeters": "180", "terrain.slopePercent": "45" })) await page.locator(`[name="${field}"]`).fill(value);
  await page.getByRole("button", { name: "Revisar dados" }).click();
  await expect(page.getByRole("heading", { name: "Revisar dados ambientais" })).toBeVisible();
  const environmentalPost = page.waitForResponse((response) => response.url().endsWith("/environmental-data") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Confirmar dados ambientais" }).click();
  const confirmedEnvironmental = await environmentalPost;
  expect(confirmedEnvironmental.status()).toBe(201);
  expect(confirmedEnvironmental.request().headers()["idempotency-key"]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  await expect(page).toHaveURL(`${baseURL}${collectionUrl}/environmental-data`);

  await page.goto(collectionUrl);
  // Wait for the observable client desktop composition before interacting with
  // controls from the server's initial mobile tree. Do not reselect lost input.
  expect(page.viewportSize()!.width).toBeGreaterThanOrEqual(1280);
  const detail = page.getByRole("article", { name: "Detalhe da coleta", exact: true });
  await expect(detail).toHaveCount(1);
  await expect(detail.locator('[data-collection-detail-block="record"]')).toHaveCount(1);
  await expect(detail.locator('[data-collection-detail-block="reading"]')).toHaveCount(1);
  await expect.poll(() => detail.evaluate(node => {
    const record = node.querySelector('[data-collection-detail-block="record"]');
    const reading = node.querySelector('[data-collection-detail-block="reading"]');
    return Boolean(record && reading && (record.compareDocumentPosition(reading) & Node.DOCUMENT_POSITION_FOLLOWING));
  }), { message: "Client desktop composition precedes IHFR input" }).toBe(true);
  await page.getByLabel("Uso predominante da terra").selectOption("FOREST");
  await page.getByLabel("Data e hora da observação").fill("2026-09-24T12:00");
  await expect(page.getByLabel("Uso predominante da terra")).toHaveValue("FOREST");
  await expect(page.getByLabel("Data e hora da observação")).toHaveValue("2026-09-24T12:00");
  const eligibility = page.waitForResponse((response) => response.url().includes("/ihfr-diagnosis/eligibility") && response.request().method() === "GET");
  await page.getByRole("button", { name: "Verificar elegibilidade" }).click();
  const eligible = await eligibility;
  expect(eligible.status()).toBe(200);
  const eligibilityUrl = new URL(eligible.request().url());
  expect(eligibilityUrl.pathname).toBe(collectionUrl.replace(/^\/dashboard\//, "/api/") + "/ihfr-diagnosis/eligibility");
  expect(Array.from(eligibilityUrl.searchParams.entries())).toEqual([["landUseType", "FOREST"]]);
  expect((await eligible.json()).outcome).toBe("ELIGIBLE");
  const created = page.waitForResponse((response) => response.url().endsWith("/ihfr-diagnosis/diagnoses") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Criar diagnóstico" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Confirmar" }).click();
  const response = await created;
  expect(response.status()).toBe(201);
  expect(response.request().headers()["idempotency-key"]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  const createdDiagnosis = await response.json() as { diagnosis: { collectionId: string; displayScore: number } | null };
  expect(createdDiagnosis.diagnosis?.collectionId).toBe(collectionId);
  await expect(page.getByRole("status").first()).toContainText("Vigente: sim");
  await expect(page.getByRole("status").last()).toBeFocused();

  // UI036: a later field collection does not displace an older CURRENT diagnosis.
  // Explicitly inspect the first recorded CURRENT result before adding the later
  // collection. No fake diagnosis, fabricated score or science calculation.
  const areaUrl = collectionNewUrl.replace(/\/collections\/new$/, "");
  await page.goto(areaUrl);
  const currentBefore = page.getByRole("complementary", { name: "Último IHFR disponível da área" });
  await expect(currentBefore).toContainText(collectionId);
  await page.goto(collectionNewUrl);
  await fillCollectionOccurrence(page, "2026-09-25T11:00:00-03:00");
  await page.getByRole("button", { name: "Revisar coleta" }).click();
  const laterPost = page.waitForResponse(response => response.url().endsWith("/collections") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Confirmar coleta" }).click();
  const laterResponse = await laterPost;
  expect(laterResponse.status()).toBe(201);
  const laterId = (await laterResponse.json()).collection.id as string;
  // A second CURRENT diagnosis with a different real API result proves that
  // cards never reuse the area's summary. No seeded/domain fixture is modified.
  const apiCollections = collectionNewUrl.replace(/^\/dashboard\//, "/api/").replace(/\/new$/, "");
  const secondCollectionResponse = await page.request.post(apiCollections, {
    headers: { "idempotency-key": crypto.randomUUID() },
    data: { ...confirmedCollection.request().postDataJSON(), occurredAt: "2026-09-23T11:00:00-03:00" },
  });
  expect(secondCollectionResponse.status()).toBe(201);
  const secondId = (await secondCollectionResponse.json()).collection.id as string;
  const secondEnvironmental = await page.request.post(`${apiCollections}/${secondId}/environmental-data`, {
    headers: { "idempotency-key": crypto.randomUUID() }, data: confirmedEnvironmental.request().postDataJSON(),
  });
  expect(secondEnvironmental.status()).toBe(201);
  const originalDiagnosisBody = response.request().postDataJSON();
  const secondDiagnosisResponse = await page.request.post(`${apiCollections}/${secondId}/ihfr-diagnosis/diagnoses`, {
    headers: { "idempotency-key": crypto.randomUUID() },
    data: { ...originalDiagnosisBody, supplement: { ...originalDiagnosisBody.supplement, landUseType: "URBAN" } },
  });
  expect(secondDiagnosisResponse.status()).toBe(201);
  const secondDiagnosis = await secondDiagnosisResponse.json();
  expect(secondDiagnosis.diagnosis.collectionId).toBe(secondId);
  expect(secondDiagnosis.diagnosis.displayScore).not.toBe(createdDiagnosis.diagnosis!.displayScore);
  await page.goto(areaUrl);
  const entries = page.getByRole("list", { name: "Coletas ordenadas por ocorrência em campo" }).getByRole("listitem");
  // The isolated area has exactly three confirmed records, unlike the shared
  // historical IMP-006 fixture. Field occurrence, not confirmation, orders them.
  await expect(entries).toHaveCount(3);
  await expect(entries.first()).toContainText(laterId);
  await expect(entries.nth(1)).toContainText(collectionId);
  await expect(entries.nth(2)).toContainText(secondId);
  const latest = page.getByRole("complementary", { name: "Último IHFR disponível da área" });
  await expect(latest).toContainText("Coleta de origem:");
  await expect(latest).toContainText(collectionId);
  await expect(latest).not.toContainText(laterId);
  await expect(latest).toContainText("validação científica pendente");
  for (const [width, height, scale] of [[1440, 900, 100], [375, 900, 100], [390, 844, 100], [320, 900, 200]]) {
    await settleIHFRViewport(page, width, height, scale);
    for (const [id, score] of [[laterId, null], [collectionId, createdDiagnosis.diagnosis!.displayScore], [secondId, secondDiagnosis.diagnosis.displayScore]] as const) {
      const card = entries.filter({ hasText: id });
      await expect(card).toHaveCount(1);
      await expect(card.getByRole("link", { name: "IHFR", exact: true, includeHidden: true })).toHaveCount(0);
      await expect(card.getByRole("link", { includeHidden: true })).toHaveCount(2);
      await expect(card.getByRole("link", { name: "Abrir coleta", exact: true })).toHaveAttribute("href", `${areaUrl}/collections/${id}`);
      await expect(card.getByRole("link", { name: "Dados ambientais", exact: true })).toHaveAttribute("href", `${areaUrl}/collections/${id}/environmental-data`);
      if (score === null) await expect(card.getByText(/Score registrado:/)).toHaveCount(0);
      else await expect(card.getByText(`Score registrado: ${score}`, { exact: true })).toHaveCount(1);
      await card.getByRole("link", { name: "Abrir coleta", exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
      await captureMissionViewport(page, info, `frontend-collections-ui044-${score === null ? "absent" : id === collectionId ? "current-first" : "current-second"}-${width}-${scale}`, scale);
    }
  }
  await settleIHFRViewport(page, 1280, 900);
  await entries.filter({ hasText: laterId }).getByRole("link", { name: "Abrir coleta", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}${areaUrl}/collections/${laterId}`);
  await expect(page.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.")).toBeVisible();
  await page.getByRole("link", { name: "Voltar à área", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}${areaUrl}`);
  await entries.filter({ hasText: collectionId }).getByRole("link", { name: "Dados ambientais", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}${collectionUrl}/environmental-data`);
  await page.getByRole("link", { name: "Voltar à coleta", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}${collectionUrl}`);
});

test("OWNER and contextual ADMIN create, replace, revoke and recover with one stable key", async ({ page }, info) => {
  test.setTimeout(120_000);
  const actors = [
    { id: required("IMP006_E2E_OWNER_ID"), url: required("IMP006_E2E_MANAGE_URL") },
    { id: required("IMP006_E2E_ADMIN_ID"), url: required("IMP006_E2E_ADMIN_MANAGE_URL") },
  ];
  for (const actor of actors) {
    await authenticate(page, actor.id, String(info.project.use.baseURL));
    await page.goto(actor.url);
    // Retained hidden content must not compete with the current accessible form.
    const reading = page.getByRole("region", { name: "Diagnóstico IHFR experimental", exact: true });
    const management = page.getByRole("region", { name: "Gerenciar diagnóstico IHFR experimental", exact: true });
    const profile = actor === actors[0] ? "owner" as const : "admin" as const;
    await expect(reading.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.", { exact: true })).toBeVisible();
    await management.getByLabel("Uso predominante da terra").selectOption("FOREST");
    await management.getByLabel("Data e hora da observação").fill("2026-09-20T12:00");
    await expectUI044Notice(page, { diagnosis: false, actions: true, profile });
    if (actor === actors[0]) {
      await inspectUI044DetailMatrix(page, info, { diagnosis: false, actions: true, profile });
      await inspectManagementViewports(page, info, management);
    } else {
      await settleIHFRViewport(page, 375, 900);
      await inspectUI044Detail(page, info, { diagnosis: false, actions: true, profile });
    }
    await management.getByRole("button", { name: "Verificar elegibilidade" }).click();
    await expect(management.getByRole("status").first()).toContainText("ELIGIBLE");

    const create = management.getByRole("button", { name: "Criar diagnóstico" });
    const firstWrite = page.waitForResponse((response) => response.url().endsWith("/ihfr-diagnosis/diagnoses") && response.request().method() === "POST");
    await confirmByKeyboard(page, create);
    const createdResponse = await firstWrite;
    expect(createdResponse.status()).toBe(201);
    const created = await createdResponse.json();
    expect(created.outcome).toBe("SUCCEEDED");
    await expect(management.getByRole("status").last()).toBeFocused();
    await expect(management.getByRole("status").first()).toContainText("Vigente: sim");
    await expect(management.getByRole("button", { name: "Substituir diagnóstico" })).toBeVisible();
    await expect(management.getByRole("button", { name: "Revogar diagnóstico" })).toBeVisible();
    await expect(reading.getByText("Score registrado", { exact: true }).locator("..").locator("dd")).toHaveText(String(created.diagnosis.displayScore));
    await expect(reading.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.", { exact: true })).toHaveCount(0);
    if (actor === actors[0]) await inspectUI044DetailMatrix(page, info, { diagnosis: true, actions: true, profile });
    else await inspectUI044Detail(page, info, { diagnosis: true, actions: true, profile });
    const createdKey = createdResponse.request().headers()["idempotency-key"];
    const recovered = await page.request.get(`${new URL(createdResponse.url()).origin}${new URL(createdResponse.url()).pathname.replace(/\/diagnoses$/, `/operations/${createdKey}`)}`);
    expect(recovered.status()).toBe(200);
    expect((await recovered.json()).diagnosis.id).toBe(created.diagnosis.id);

    const externalBody = { ...(createdResponse.request().postDataJSON() as Record<string, unknown>), mode: "REPLACE", expectedCurrentDiagnosisId: created.diagnosis.id,
      supplement: { ...((createdResponse.request().postDataJSON() as Record<string, unknown>).supplement as Record<string, unknown>), landUseType: "URBAN" } };
    const externalResponse = await page.request.post(createdResponse.url(), { headers: { "content-type": "application/json", "idempotency-key": crypto.randomUUID() }, data: externalBody });
    expect(externalResponse.status()).toBe(201);
    const external = await externalResponse.json();
    const staleWrite = page.waitForResponse((response) => response.url().endsWith("/ihfr-diagnosis/diagnoses") && response.request().method() === "POST");
    const refreshedCurrent = page.waitForResponse((response) => response.url().endsWith("/ihfr-diagnosis/current") && response.request().method() === "GET");
    const refreshedEligibility = page.waitForResponse((response) => response.url().includes("/ihfr-diagnosis/eligibility") && response.request().method() === "GET");
    await management.getByRole("button", { name: "Substituir diagnóstico" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Confirmar" }).click();
    expect((await staleWrite).status()).toBe(409);
    expect((await (await refreshedCurrent).json()).diagnosis.id).toBe(external.diagnosis.id);
    expect((await (await refreshedEligibility).json()).currentDiagnosisId).toBe(external.diagnosis.id);
    await expect(management.getByRole("alert")).toContainText("vigente mudou");
    await expect(management.getByRole("alert")).toBeFocused();
    await expect(reading.getByText("Score registrado", { exact: true }).locator("..").locator("dd")).toHaveText(String(external.diagnosis.displayScore));
    await expectUI044Notice(page, { diagnosis: true, actions: true, profile });
    await expect(management.getByRole("status").first()).toContainText("Vigente: sim");

    let timedOutKey = "";
    let timedOutBody: unknown;
    let timedOutPath = "";
    await page.route("**/ihfr-diagnosis/diagnoses", (route) => {
      timedOutKey = route.request().headers()["idempotency-key"];
      timedOutBody = route.request().postDataJSON();
      timedOutPath = new URL(route.request().url()).pathname;
      void route.abort("timedout");
    }, { times: 1 });
    await management.getByRole("button", { name: "Substituir diagnóstico" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Confirmar" }).click();
    await expect(management.getByRole("button", { name: "Recuperar resultado" })).toBeVisible();
    await expect(management.getByLabel("Uso predominante da terra")).toBeDisabled();
    await expect(management.getByLabel("Data e hora da observação")).toBeDisabled();
    await expect(management.getByRole("button", { name: "Substituir diagnóstico" })).toBeDisabled();
    if (actor === actors[0]) {
      await settleIHFRViewport(page, 375, 900);
      await expectIHFRControl(management.getByRole("button", { name: "Repetir com a mesma chave" }), page, info, "frontend-ihfr-unknown-375");
      await captureIHFRViewport(page, info, "frontend-ihfr-unknown-375");
      await settleIHFRViewport(page, 320, 900, 200);
      for (const name of ["Verificar elegibilidade", "Substituir diagnóstico", "Revogar diagnóstico", "Recuperar resultado", "Repetir com a mesma chave"]) {
        await expectIHFRUnfragmentedWords(management.getByRole("button", { name, exact: true }));
      }
      await expectIHFRControl(management.getByRole("button", { name: "Repetir com a mesma chave" }), page, info, "frontend-ihfr-unknown-320-text200");
      await captureIHFRViewport(page, info, "frontend-ihfr-unknown-320-text200");
      await settleIHFRViewport(page, 375, 900);
    }
    await management.getByRole("button", { name: "Recuperar resultado" }).click();
    await expect(management.getByRole("alert")).toContainText("mesma chave");
    await expect(management.getByRole("alert")).toBeFocused();
    const repeated = page.waitForResponse((response) => response.url().endsWith("/ihfr-diagnosis/diagnoses") && response.request().method() === "POST");
    await management.getByRole("button", { name: "Repetir com a mesma chave" }).click();
    const replacement = await repeated;
    expect(replacement.status()).toBe(201);
    expect(replacement.request().headers()["idempotency-key"]).toBe(timedOutKey);
    expect(replacement.request().postDataJSON()).toEqual(timedOutBody);
    expect(new URL(replacement.request().url()).pathname).toBe(timedOutPath);
    const replaced = await replacement.json();
    await expect(management.getByRole("status").last()).toContainText("registrado");
    await expect(management.getByRole("status").last()).toBeFocused();
    await expect(management.getByRole("status").first()).toContainText("Vigente: sim");
    await expect(reading.getByText("Score registrado", { exact: true }).locator("..").locator("dd")).toHaveText(String(replaced.diagnosis.displayScore));
    await expectUI044Notice(page, { diagnosis: true, actions: true, profile });

    await management.getByLabel("Motivo da revogação").fill("Correção autorizada");
    const revoked = page.waitForResponse((response) => response.url().endsWith("/revocations") && response.request().method() === "POST");
    await confirmByKeyboard(page, management.getByRole("button", { name: "Revogar diagnóstico" }));
    expect((await revoked).status()).toBe(200);
    await expect(reading.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.", { exact: true })).toBeVisible();
    await expect(management.getByRole("status").last()).toBeFocused();
    await expect(management.getByRole("status").first()).toContainText("Vigente: não");
    await expectUI044Notice(page, { diagnosis: false, actions: true, profile });
    await page.setViewportSize({ width: 320, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (actor === actors[0]) await captureIHFRViewport(page, info, "frontend-ihfr-revoked-320");
    await page.setViewportSize({ width: 1280, height: 900 });
  }
});

test("MEMBER and linked OWNER in inactive laboratory have no management controls in the DOM", async ({ page }, info) => {
  test.setTimeout(90_000);
  for (const scenario of [
    { id: required("IMP006_E2E_MEMBER_ID"), url: required("IMP006_E2E_COLLECTION_URL"), diagnosis: true, profile: "member" as const },
    { id: required("IMP006_E2E_OWNER_ID"), url: required("IMP006_E2E_INACTIVE_COLLECTION_URL"), diagnosis: false, profile: "inactive-owner" as const },
  ]) {
    await authenticate(page, scenario.id, String(info.project.use.baseURL));
    await page.goto(scenario.url);
    await expect(page.getByRole("button", { name: /criar diagnóstico|substituir diagnóstico|revogar diagnóstico/i })).toHaveCount(0);
    await expect(page.getByRole("region", { name: "Diagnóstico IHFR experimental" })).toBeVisible();
    await expectUI044Notice(page, { diagnosis: scenario.diagnosis, actions: false, profile: scenario.profile });
    if (scenario.profile === "inactive-owner") {
      await inspectUI044DetailMatrix(page, info, { diagnosis: false, actions: false, profile: "inactive-owner" });
    }
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement !== document.body)).toBe(true);
  }
});

test("well-formed incompatible version reaches the real API and shows a recoverable terminal", async ({ page }, info) => {
  test.setTimeout(90_000);
  await authenticate(page, required("IMP006_E2E_OWNER_ID"), String(info.project.use.baseURL));
  const collectionUrl = required("IMP006_E2E_INCOMPATIBLE_URL");
  await page.goto(collectionUrl);
  await page.getByLabel("Uso predominante da terra").selectOption("FOREST");
  await page.getByLabel("Data e hora da observação").fill("2026-09-20T12:00");
  let sent: Record<string, unknown> | undefined;
  await page.route("**/ihfr-diagnosis/diagnoses", async (route) => {
    const original = route.request().postDataJSON() as Record<string, unknown>;
    sent = { ...original, versions: { ...(original.versions as Record<string, unknown>), mathContractVersion: "ihfr-math-experimental-v0.1.0" } };
    await route.continue({ postData: JSON.stringify(sent) });
  }, { times: 1 });
  const posted = page.waitForResponse((response) => response.url().endsWith("/ihfr-diagnosis/diagnoses") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Criar diagnóstico" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Confirmar" }).click();
  const response = await posted;
  expect(response.status()).toBe(422);
  expect((await response.json()).error.code).toBe("INCOMPATIBLE_VERSION");
  await expect(page.locator('section[aria-labelledby="ihfr-management-heading"] [role="alert"]')).toContainText("Versão incompatível");
  await expect(page.locator('section[aria-labelledby="ihfr-management-heading"] [role="alert"]')).toBeFocused();
  await expect(page.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.")).toBeVisible();
  await captureIHFRViewport(page, info, "frontend-ihfr-incompatible-version");
  const key = response.request().headers()["idempotency-key"];
  const endpoint = response.url();
  expect(await operationRows(collectionUrl)).toBe(1);
  expect(sent).toBeDefined();
  const replay = await page.request.post(endpoint, { headers: { "content-type": "application/json", "idempotency-key": key }, data: sent });
  expect(replay.status()).toBe(422);
  expect((await replay.json()).error.code).toBe("INCOMPATIBLE_VERSION");
  expect(await operationRows(collectionUrl)).toBe(1);
  const recovered = await page.request.get(endpoint.replace(/\/diagnoses$/, `/operations/${key}`));
  expect(recovered.status()).toBe(200);
  expect(await recovered.json()).toEqual({ outcome: "INCOMPATIBLE_VERSION", diagnosis: null, insufficiencyReasons: [] });
  for (const [status, code] of [[400, "INVALID_INPUT"], [500, "TECHNICAL_FAILURE"]] as const) {
    await page.route("**/ihfr-diagnosis/diagnoses", (route) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify({ error: { code, message: "Controlled E2E error" } }) }), { times: 1 });
    await page.getByRole("button", { name: "Criar diagnóstico" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Confirmar" }).click();
    await expect(page.locator('section[aria-labelledby="ihfr-management-heading"] [role="alert"]')).toBeFocused();
    if (status === 400) await expect(page.getByRole("button", { name: "Recuperar resultado" })).toHaveCount(0);
    else await expect(page.getByRole("button", { name: "Recuperar resultado" })).toBeVisible();
  }
});
