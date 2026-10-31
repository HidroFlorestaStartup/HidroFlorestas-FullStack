import assert from "node:assert/strict";
import { test } from "node:test";
import {
  occurrenceWithOriginalOffset,
  projectAreaCollections,
  latestAvailableDiagnosis,
  type AreaCollectionSource,
} from "../../src/components/areas/area-collections-presentation";

const row = (id: string, instant: string, offset: string, confirmed: string, score: string | null = null): AreaCollectionSource => ({
  id, occurredAt: new Date(instant), occurrenceOffset: offset,
  confirmedAt: new Date(confirmed), confirmationKey: id,
  currentExperimentalIHFRDiagnosis: score === null ? null : {
    diagnosis: { id: "diag-" + id, displayScore: { toString: () => score }, ihfrClass: "MODERATE", scientificState: "EXPERIMENTAL" },
  },
});

test("UI036 sorts by absolute field occurrence, not confirmation or offset text", () => {
  const rows = projectAreaCollections([
    row("older", "2026-09-15T10:00:00.000Z", "+05:45", "2026-10-20T18:00:00Z", "0.42"),
    row("newer", "2026-09-15T10:30:00.000Z", "-03:00", "2026-09-16T10:00:00Z"),
  ]);
  assert.deepEqual(rows.map(item => item.id), ["newer", "older"]);
  assert.match(rows[0].occurredAt, /-03:00$/);
  assert.equal(rows[0].occurredAtUtc, "2026-09-15T10:30:00.000Z");
  assert.match(rows[1].occurredAt, /\+05:45$/);
  assert.equal(latestAvailableDiagnosis(rows)?.id, "older");
  assert.equal(latestAvailableDiagnosis(rows)?.currentDiagnosis?.displayScore, "0.42");
});

test("UI036 tie is deterministic by id, zero is not invented and history pointer is ignored", () => {
  const time = "2026-09-15T13:00:00.000Z";
  const rows = projectAreaCollections([row("a", time, "Z", time), row("c", time, "-03:00", time), row("b", time, "+01:30", time)]);
  assert.deepEqual(rows.map(item => item.id), ["c", "b", "a"]);
  assert.equal(latestAvailableDiagnosis(rows), null);
  assert.ok(rows.every(item => item.currentDiagnosis === null));
});

test("UI036 filters drafts/legacy incomplete records, preserves declared civil time and rejects invalid source", () => {
  const time = "2026-09-15T13:00:00.123Z";
  const confirmed = row("confirmed", time, "+05:45", time);
  const draft = { ...row("draft", time, "Z", time), confirmedAt: null };
  assert.deepEqual(projectAreaCollections([draft, confirmed]).map(item => item.id), ["confirmed"]);
  assert.equal(occurrenceWithOriginalOffset(new Date(time), "+05:45"), "2026-09-15T18:45:00.123+05:45");
  assert.equal(occurrenceWithOriginalOffset(new Date(time), "-03:00"), "2026-09-15T10:00:00.123-03:00");
  assert.throws(() => occurrenceWithOriginalOffset(new Date(time), "bad"), /INVALID_COLLECTION_OCCURRENCE/);
  const bad = row("bad", time, "Z", time, "0.80");
  bad.currentExperimentalIHFRDiagnosis!.diagnosis.scientificState = "UNVERIFIED";
  assert.throws(() => projectAreaCollections([bad]), /INVALID_EXPERIMENTAL_DIAGNOSIS_STATE/);
});

test("UI036 current-pointer result, revocation or supersession absence does not reuse history", () => {
  const rows = projectAreaCollections([row("new", "2026-09-19T00:00:00Z", "Z", "2026-09-20T00:00:00Z"),
    row("old", "2026-09-18T00:00:00Z", "Z", "2026-09-22T00:00:00Z", "0.75")]);
  assert.equal(latestAvailableDiagnosis(rows)?.id, "old");
  assert.equal(rows[0].currentDiagnosis, null);
  assert.equal(rows[1].currentDiagnosis?.displayScore, "0.75");
});
