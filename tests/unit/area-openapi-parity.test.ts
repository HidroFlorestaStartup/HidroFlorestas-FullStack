import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse } from "yaml";
import { serializeAreaDetail, serializeAreaSummary } from "../../src/app/api/server/areas/area.contracts";

// Exercise the real serializer. Do not duplicate the expected DTO as a hand-written fixture.
const document = parse(readFileSync(
  "specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml",
  "utf8",
));
const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);
const contractId = "https://hidroflorestas.invalid/contracts/areas.openapi.yaml";
ajv.addSchema({ ...document, $id: contractId });
const validates = ajv.compile({
  $ref: `${contractId}#/components/schemas/AreaListResponse`,
});

const laboratoryId = "11111111-1111-4111-8111-111111111111";
const areaId = "22222222-2222-4222-8222-222222222222";
const context = {
  id: laboratoryId,
  name: "Laboratório de teste",
  status: "ACTIVE",
  membershipRole: "ADMIN",
  readOnly: false,
} as const;

type Source = Parameters<typeof serializeAreaSummary>[0];
function source(cover: { revision: number; assetId: string | null } | null): Source {
  // Structural test fixture: extra internal fields must never reach the serializer output.
  return {
    id: areaId,
    name: "Área sintética",
    latitude: -3.123456,
    longitude: -44.123456,
    municipality: null,
    state: null,
    cover,
    userId: "internal-user-id",
    image: "https://private-provider.example.invalid/should-not-leak",
    publicId: "synthetic-private-public-id",
    providerConfig: { apiSecret: "synthetic-private-config" },
  } as unknown as Source;
}
function list(cover: { revision: number; assetId: string | null } | null, enabled: boolean) {
  return { context, areas: [serializeAreaSummary(source(cover), enabled)] };
}
function assertConforms(value: unknown) {
  assert.equal(validates(value), true, JSON.stringify(validates.errors));
}

test("CRI-REV-005 RED/GREEN: real area serializer matches the closed AreaListResponse schema", () => {
  for (const [enabled, cover] of [
    [true, { revision: 2, assetId: "synthetic-private-asset" }],
    [false, { revision: 2, assetId: "synthetic-private-asset" }],
    [true, null],
    [false, null],
  ] as const) {
    const result = list(cover, enabled);
    assertConforms(result);
    const output = result.areas[0];
    assert.ok(output?.cover);
    assert.deepEqual(Object.keys(output).sort(), ["cover", "id", "latitude", "longitude", "municipality", "name", "state"]);
    assert.deepEqual(Object.keys(output.cover).sort(), ["featureEnabled", "hasImage", "revision"]);
    assert.equal(output.cover.featureEnabled, enabled);
    assert.equal(output.cover.hasImage, Boolean(cover?.assetId));
    assert.equal(output.cover.revision, cover?.revision ?? 0);
    const serialized = JSON.stringify(result);
    assert.doesNotMatch(serialized, /synthetic-private|internal-user-id|should-not-leak|assetId|publicId|public_id|api_secret|providerConfig/);
  }
});

test("CRI-REV-005: OpenAPI published example is valid and cover is required on area list", () => {
  const examples = document.components.schemas.AreaListResponse.examples;
  assert.ok(Array.isArray(examples) && examples.length > 0);
  for (const example of examples) assertConforms(example);
  const withoutCover = list(null, false);
  const first = withoutCover.areas[0];
  assert.ok(first);
  const onlyArea = { ...first } as Record<string, unknown>;
  delete onlyArea.cover;
  assert.equal(validates({ ...withoutCover, areas: [onlyArea] }), false);
});

test("CRI-REV-005: unexpected or private fields are rejected at both object levels", () => {
  const valid = list({ revision: 1, assetId: "synthetic-private-asset" }, true);
  assertConforms(valid);
  const area = valid.areas[0];
  assert.ok(area?.cover);
  assert.equal(validates({ ...valid, areas: [{ ...area, unexpected: 1 }] }), false);
  assert.equal(validates({ ...valid, areas: [{ ...area, cover: { ...area.cover, assetId: "private" } }] }), false);
  assert.equal(validates({ ...valid, areas: [{ ...area, cover: { ...area.cover, url: "https://private.invalid" } }] }), false);
  assert.equal(validates({ ...valid, areas: [{ ...area, cover: { ...area.cover, featureEnabled: "false" } }] }), false);
  for (const key of ["publicId", "public_id", "apiKey", "apiSecret", "cloudName", "providerConfig", "unexpected"]) {
    assert.equal(validates({ ...valid, areas: [{ ...area, cover: { ...area.cover, [key]: "private" } }] }), false, key);
  }
});

test("CRI-REV-005: cover fields are required, correctly typed and revision is a nonnegative integer", () => {
  const valid = list(null, false);
  const area = valid.areas[0];
  assert.ok(area?.cover);
  for (const key of ["revision", "hasImage", "featureEnabled"]) {
    const incomplete = { ...area.cover } as Record<string, unknown>;
    delete incomplete[key];
    assert.equal(validates({ ...valid, areas: [{ ...area, cover: incomplete }] }), false, key);
  }
  for (const cover of [null, { ...area.cover, revision: -1 }, { ...area.cover, revision: 0.5 }, { ...area.cover, hasImage: "false" }]) {
    assert.equal(validates({ ...valid, areas: [{ ...area, cover }] }), false);
  }
});

test("CRI-REV-005: real detail projection and its published examples remain valid without cover", () => {
  const validatesDetail = ajv.compile({ $ref: `${contractId}#/components/schemas/AreaDetailResponse` });
  const detailSource = { ...source(null), landType: null, description: null, createdAt: new Date("2026-10-17T00:00:00Z") };
  delete detailSource.cover;
  const result = { area: serializeAreaDetail(detailSource, context) };
  assert.equal("cover" in result.area, false);
  assert.equal(validatesDetail(result), true, JSON.stringify(validatesDetail.errors));
  for (const example of document.components.schemas.AreaDetailResponse.examples) {
    assert.equal(validatesDetail(example), true, JSON.stringify(validatesDetail.errors));
  }
  const validatesMutation = ajv.compile({ $ref: `${contractId}#/components/schemas/AreaMutationResponse` });
  for (const example of document.components.schemas.AreaMutationResponse.examples) {
    assert.equal(validatesMutation(example), true, JSON.stringify(validatesMutation.errors));
  }
});
