import assert from "node:assert/strict";
import { test } from "node:test";
import { assertExpectedCollections, assertLocalReadinessEnvironment, nearestRank, publicExplainPlan } from "../../../scripts/local-readiness-policy";

const environment = () => ({
  NODE_ENV: "test", ACCOUNTS_LOCAL_POSTGRESQL: "1", IMP006_LOCAL_POSTGRESQL: "1",
  IMP006_DATABASE_VARIABLE: "TEST_DATABASE_URL", TEST_DATABASE_CONFIRMATION: "HIDROFLORESTAS_AUTH_TEST",
  HF_LOCAL_READINESS_CONFIRMATION: "HIDROFLORESTAS_LOCAL_READINESS_20261025",
  TEST_DATABASE_URL: "postgresql://accounts_owner:unused-fixture@127.0.0.1:55427/postgres",
  DATABASE_URL: "postgresql://accounts_owner:unused-fixture@127.0.0.1:55427/postgres",
  LOCALAPPDATA: "C:/qa/.accounts-validation/runtime/localappdata",
  NEXT_PUBLIC_MAP_TILE_URL: "https://127.0.0.1:1/{z}/{x}/{y}.png",
});

test("accepts only the explicit synthetic Schema runner context", () => {
  assert.doesNotThrow(() => assertLocalReadinessEnvironment(environment()));
});

test("refuses absent confirmation before any effect without echoing input", () => {
  assert.throws(() => assertLocalReadinessEnvironment({ ...environment(), HF_LOCAL_READINESS_CONFIRMATION: undefined }),
    (error: Error) => error.message === "LOCAL_ENVIRONMENT_REFUSED");
});

test("refuses hosted, alternate port/database/principal and startup options", () => {
  for (const target of ["postgresql://accounts_owner:unused-fixture@host.invalid:55427/postgres",
    "postgresql://accounts_owner:unused-fixture@localhost:55427/postgres",
    "postgresql://accounts_owner:unused-fixture@127.0.0.1:5432/postgres",
    "postgresql://accounts_owner:unused-fixture@127.0.0.1:55427/other",
    "postgresql://other:unused-fixture@127.0.0.1:55427/postgres",
    "postgresql://accounts_owner:unused-fixture@127.0.0.1:55427/postgres?options=other"]) {
    assert.throws(() => assertLocalReadinessEnvironment({ ...environment(), TEST_DATABASE_URL: target }),
      (error: Error) => error.message === "LOCAL_ENVIRONMENT_REFUSED");
  }
});

test("refuses inherited application, schema, public regression and external server flags", () => {
  for (const name of ["ACCOUNTS_LOCAL_APP", "IMP006_TEST_SCHEMA", "IMP006_LOCAL_REGRESSION_PUBLIC", "PLAYWRIGHT_BASE_URL"]) {
    assert.throws(() => assertLocalReadinessEnvironment({ ...environment(), [name]: "inherited" }));
  }
});

test("refuses provider/SMTP/dotenv/CI and public tile configuration", () => {
  for (const change of [{ SMTP_USER: "unused-fixture" }, { CLOUDINARY_API_KEY: "unused-fixture" },
    { DOTENV_CONFIG_PATH: "unused.env" }, { GITHUB_ACTIONS: "true" },
    { NEXT_PUBLIC_MAP_TILE_URL: "https://external.invalid/{z}/{x}/{y}.png" }]) {
    assert.throws(() => assertLocalReadinessEnvironment({ ...environment(), ...change }));
  }
});

test("nearest-rank p95 uses the 95th of 100 observations without mutating samples", () => {
  const values = Array.from({ length: 100 }, (_, index) => 100 - index);
  assert.equal(nearestRank(values, 95), 95);
  assert.equal(values[0], 100);
  assert.equal(nearestRank([2, 2, 9], 100), 9);
});

test("rejects empty, nonfinite or negative samples and invalid percentiles", () => {
  for (const values of [[], [NaN], [Infinity], [-1]]) assert.throws(() => nearestRank(values, 95));
  for (const percentile of [0, -1, 101, NaN]) assert.throws(() => nearestRank([1], percentile));
});

test("rejects a same-laboratory collection permutation even with complete global cardinality", () => {
  const expected = new Map([["a", new Set(["a1", "a2"])], ["b", new Set(["b1", "b2"])]]);
  assert.doesNotThrow(() => assertExpectedCollections([
    { id: "a", confirmedCollections: [{ id: "a1" }, { id: "a2" }] },
    { id: "b", confirmedCollections: [{ id: "b1" }, { id: "b2" }] },
  ], expected));
  assert.throws(() => assertExpectedCollections([
    { id: "a", confirmedCollections: [{ id: "a1" }, { id: "b2" }] },
    { id: "b", confirmedCollections: [{ id: "b1" }, { id: "a2" }] },
  ], expected), (error: Error) => error.message === "COLLECTION_ASSOCIATION_MISMATCH");
});

test("published EXPLAIN preserves numeric structure and excludes conditions, output and parameters recursively", () => {
  const safe = publicExplainPlan([{ Plan: { "Node Type": "Seq Scan", "Relation Name": "CollectionArea",
    "Actual Rows": 100, Filter: "private-fixture", Output: ["private-fixture"], parameters: ["private-fixture"],
    Plans: [{ "Node Type": "Index Scan", "Actual Rows": 1000, "Index Cond": "private-fixture", "Secret Numeric": 42 }] },
    "Planning Time": 0.2, "Execution Time": 1.4 }]);
  assert.equal(JSON.stringify(safe).includes("private-fixture"), false);
  assert.equal(JSON.stringify(safe).includes("Secret Numeric"), false);
  assert.deepEqual(safe, [{ Plan: { "Node Type": "Seq Scan", "Relation Name": "CollectionArea", "Actual Rows": 100,
    Plans: [{ "Node Type": "Index Scan", "Actual Rows": 1000 }] }, "Planning Time": 0.2, "Execution Time": 1.4 }]);
});
