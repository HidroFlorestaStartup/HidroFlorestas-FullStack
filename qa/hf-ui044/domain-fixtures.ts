import { expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { AUTH_FIXTURE_USERS, countAuthFixtureUsers, runAuthFixtureCommand } from "../../tests/fixtures/auth-users";
import { createAreaFixtureClient } from "../../tests/fixtures/areas";
import { validEnvironmentalPayload } from "../../tests/fixtures/environmental-data";
import { IHFR_CONTRACT } from "../../src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { FULLSTACK_URL, STARTER_URL, type Runtime } from "./contract";

export const LAB_NAME = "HF UI06 domain synthetic laboratory";
export const AREA_NAME = "HF UI06 domain populated area";
export const EMPTY_NAME = "HF UI06 domain empty area";
export const OCCURRENCES = { newer: "2026-09-16T08:00:00-03:00", older: "2026-09-15T17:45:00+05:45" } as const;
export type DomainFixture = {
  laboratoryId: string; areaId: string; emptyAreaId: string; newerId: string; olderId: string;
  diagnosisId: string; base: string; areaPath: string; emptyPath: string; newerPath: string; olderPath: string;
  synthetic: true; globalRole: "USER"; laboratoryRole: "OWNER"; creation: string;
};
type CreatedCollection = { collection: { id: string } };
type CreatedDiagnosis = { outcome: string; diagnosis: { id: string; collectionId: string } | null };

export function domainPayload() {
  const payload = validEnvironmentalPayload();
  payload.vegetation.vegetationCoverPercent = 100;
  payload.terrain = { drainageDensityKmPerKm2: 1.5, elevationMeters: 180, slopePercent: 45 };
  return payload;
}
export function diagnosisRequest() {
  return { mode: "CREATE" as const, expectedCurrentDiagnosisId: null,
    supplement: { inputContractVersion: IHFR_CONTRACT.inputVersion, landUseType: "FOREST" as const,
      provenance: { kind: "FIELD_OBSERVATION" as const, observedAt: "2026-09-15T12:00:00.000Z" } },
    versions: { measurementContractVersion: IHFR_CONTRACT.measurementVersion,
      mathContractVersion: IHFR_CONTRACT.activeMathVersion,
      algorithmVersion: IHFR_CONTRACT.algorithmVersion, contractHash: IHFR_CONTRACT.contractHash } };
}
function fixturePaths(values: Omit<DomainFixture, "base" | "areaPath" | "emptyPath" | "newerPath" | "olderPath" | "synthetic" | "globalRole" | "laboratoryRole">): DomainFixture {
  const base = "/dashboard/laboratories/" + values.laboratoryId;
  const areaPath = base + "/areas/" + values.areaId;
  return { ...values, base, areaPath, emptyPath: base + "/areas/" + values.emptyAreaId,
    newerPath: areaPath + "/collections/" + values.newerId,
    olderPath: areaPath + "/collections/" + values.olderId,
    synthetic: true, globalRole: "USER", laboratoryRole: "OWNER" };
}

/** Official auth fixture, native HTTP writes, only the fresh runner-owned database. */
export async function setupFullstackDomain(runtime: Runtime): Promise<DomainFixture> {
  if (runtime.source !== "fullstack" || process.env.GITHUB_ACTIONS !== "true" || process.env.RUNNER_OS !== "Windows" ||
      process.env.GITHUB_REF !== "refs/heads/codex/hf-ui044-close-20261101" || process.env.GITHUB_RUN_ATTEMPT !== "1")
    throw new Error("DOMAIN_FIXTURE_REQUIRES_AUTHORIZED_FRESH_WINDOWS_RUNNER");
  expect(await countAuthFixtureUsers(process.env)).toBe(0);
  await runAuthFixtureCommand("setup", process.env);
  const db = createAreaFixtureClient(process.env);
  try {
    const actor = await db.user.update({ where: { id: AUTH_FIXTURE_USERS[0].id }, data: { firstName: "Marcos", lastName: "Lima" } });
    expect(actor.role).toBe("USER");
    expect(await db.researchersLinked.count({ where: { userId: actor.id } })).toBe(0);
  } finally { await db.$disconnect(); }
  let signedIn;
  try {
    signedIn = await runtime.context.request.post(FULLSTACK_URL + "/api/auth/sign-in", {
      data: { email: AUTH_FIXTURE_USERS[0].email, password: process.env.E2E_USER_PASSWORD },
    });
  } catch { throw new Error("DOMAIN_NATIVE_SIGN_IN_TRANSPORT_FAILED_REDACTED"); }
  expect(signedIn.status()).toBe(200);
  const post = async <T>(path: string, body: unknown, status: number, key?: string): Promise<T> => {
    const response = await runtime.context.request.post(FULLSTACK_URL + path, {
      data: body, ...(key ? { headers: { "idempotency-key": key } } : {}),
    });
    if (response.status() !== status) throw new Error("DOMAIN_FIXTURE_HTTP_" + response.status() + "_EXPECTED_" + status);
    return response.json() as Promise<T>;
  };
  const laboratory = await post<{ laboratory: { id: string } }>("/api/laboratories", { name: LAB_NAME }, 201);
  const laboratoryId = laboratory.laboratory.id;
  const roleDb = createAreaFixtureClient(process.env);
  try {
    const membership = await roleDb.researchersLinked.findUniqueOrThrow({
      where: { userId_laboratoryRoomId: { userId: AUTH_FIXTURE_USERS[0].id, laboratoryRoomId: laboratoryId } },
    });
    expect(membership.role).toBe("OWNER");
    expect((await roleDb.laboratoryRoom.findUniqueOrThrow({ where: { id:laboratoryId } })).userId).toBe(AUTH_FIXTURE_USERS[0].id);
  } finally { await roleDb.$disconnect(); }
  const areaRoot = "/api/laboratories/" + laboratoryId + "/areas";
  const areaInput = (name: string) => ({ name, latitude: -3, longitude: -38, municipality: null, state: null, landType: null, description: null });
  const { area } = await post<{ area: { id: string } }>(areaRoot, areaInput(AREA_NAME), 201);
  const empty = await post<{ area: { id: string } }>(areaRoot, areaInput(EMPTY_NAME), 201);
  const collections = areaRoot + "/" + area.id + "/collections";
  // Confirm newest first, then older: field order must beat confirmation order.
  const newerKey = randomUUID(), olderKey = randomUUID();
  const newer = await post<CreatedCollection>(collections, { occurredAt: OCCURRENCES.newer }, 201, newerKey);
  const older = await post<CreatedCollection>(collections, { occurredAt: OCCURRENCES.older }, 201, olderKey);
  const replay = await post<CreatedCollection>(collections, { occurredAt: OCCURRENCES.older }, 200, olderKey);
  expect(replay.collection.id).toBe(older.collection.id);
  const environmentPath = collections + "/" + older.collection.id + "/environmental-data";
  const environmentKey = randomUUID();
  const environmental = await post<{ environmentalData: { id: string } }>(environmentPath, domainPayload(), 201, environmentKey);
  expect((await post<{ environmentalData: { id: string } }>(environmentPath, domainPayload(), 200, environmentKey)).environmentalData.id).toBe(environmental.environmentalData.id);
  const diagnosisPath = collections + "/" + older.collection.id + "/ihfr-diagnosis/diagnoses";
  const diagnosisKey = randomUUID();
  const diagnosis = await post<CreatedDiagnosis>(diagnosisPath, diagnosisRequest(), 201, diagnosisKey);
  expect(diagnosis.outcome).toBe("SUCCEEDED");
  expect(diagnosis.diagnosis?.collectionId).toBe(older.collection.id);
  if (!diagnosis.diagnosis) throw new Error("DOMAIN_NATIVE_DIAGNOSIS_ABSENT");
  const current = await runtime.context.request.get(FULLSTACK_URL + collections + "/" + older.collection.id + "/ihfr-diagnosis/current");
  expect(current.status()).toBe(200);
  expect((await current.json() as CreatedDiagnosis).diagnosis?.id).toBe(diagnosis.diagnosis.id);
  return fixturePaths({ laboratoryId, areaId: area.id, emptyAreaId: empty.area.id,
    newerId: newer.collection.id, olderId: older.collection.id, diagnosisId: diagnosis.diagnosis.id,
    creation: "Official auth fixture; native authenticated laboratory/area/collection/environmental/IHFR APIs; collection and environmental same-key replay verified" });
}

/** The reference adapter stays inside its own browser, never in FullStack. */
export async function setupStarterDomain(runtime: Runtime): Promise<DomainFixture> {
  if (runtime.source !== "starter") throw new Error("REFERENCE_ADAPTER_SOURCE_GUARD");
  const page = runtime.page;
  await page.goto(STARTER_URL + "/login");
  await page.getByRole("button", { name: "Conta sem laboratório — Marcos", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: /preenchidos/ })).toBeVisible();
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(STARTER_URL + "/workspace");
  await page.getByRole("button", { name: "Criar seu Laboratório IHFR", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Criar Laboratório IHFR", exact: true });
  await dialog.getByRole("textbox", { name: "Nome do laboratório", exact: true }).fill(LAB_NAME);
  await dialog.getByRole("button", { name: "Criar laboratório", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const card = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: LAB_NAME, exact: true }) });
  await card.getByRole("link", { name: "Acessar", exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/laboratories\/[^/]+\/?$/);
  const laboratoryId = new URL(page.url()).pathname.split("/").filter(Boolean).at(-1)!;
  const result = await page.evaluate(async ({ laboratoryId, payload, request, occurrences, areaName, emptyName }) => {
    const modulePath = "/src/adapter/index.ts";
    const { api } = await import(modulePath);
    const areaInput = (name: string) => ({ name, latitude: -3, longitude: -38, municipality: null, state: null, landType: null, description: null });
    const populated = await api.createArea(laboratoryId, areaInput(areaName));
    const empty = await api.createArea(laboratoryId, areaInput(emptyName));
    const newer = await api.createCollection(laboratoryId, populated.area.id, occurrences.newer, crypto.randomUUID());
    const olderKey = crypto.randomUUID();
    const older = await api.createCollection(laboratoryId, populated.area.id, occurrences.older, olderKey);
    const replay = await api.createCollection(laboratoryId, populated.area.id, occurrences.older, olderKey);
    if (replay.collection.id !== older.collection.id) throw new Error("REFERENCE_REPLAY_MISMATCH");
    await api.createEnvironmental(laboratoryId, populated.area.id, older.collection.id, payload, crypto.randomUUID());
    const diagnosis = await api.createDiagnosis(laboratoryId, populated.area.id, older.collection.id, request, crypto.randomUUID());
    if (diagnosis.outcome !== "SUCCEEDED" || !diagnosis.diagnosis) throw new Error("REFERENCE_DIAGNOSIS_FIXTURE_FAILED");
    return { areaId: populated.area.id as string, emptyAreaId: empty.area.id as string,
      newerId: newer.collection.id as string, olderId: older.collection.id as string, diagnosisId: diagnosis.diagnosis.id as string };
  }, { laboratoryId, payload: domainPayload(), request: diagnosisRequest(), occurrences: OCCURRENCES, areaName: AREA_NAME, emptyName: EMPTY_NAME });
  return fixturePaths({ laboratoryId, ...result, creation: "Native reference UI login/laboratory creation, then pinned starter adapter called only inside reference browser; synthetic demo scores remain reference-only" });
}

export async function navigateDomain(runtime: Runtime, fixture: DomainFixture, target: "empty" | "area" | "newer" | "older") {
  const path = target === "empty" ? fixture.emptyPath : target === "area" ? fixture.areaPath : target === "newer" ? fixture.newerPath : fixture.olderPath;
  if (runtime.source === "fullstack") {
    await runtime.page.goto(FULLSTACK_URL + path);
  } else {
    // Real client links preserve the reference's in-memory fixture. Hard reload
    // is deliberately reserved for the terminal reload case, not hidden here.
    const nav = runtime.page.locator("nav:visible").filter({ has: runtime.page.getByRole("link", { name: "Áreas", exact: true }) });
    await nav.getByRole("link", { name: "Áreas", exact: true }).click();
    const areaPath = target === "empty" ? fixture.emptyPath : fixture.areaPath;
    await runtime.page.locator('a[href="' + areaPath + '"]').first().click();
    if (target === "newer" || target === "older") await runtime.page.locator('a[href="' + path + '"]').first().click();
  }
  await expect(runtime.page).toHaveURL(new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/?$"));
}
