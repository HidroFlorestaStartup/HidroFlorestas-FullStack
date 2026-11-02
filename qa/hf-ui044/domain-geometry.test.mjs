import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { planReadableScroll, classifyHorizontalOverflow } from './domain-geometry.ts';

const observedR3 = {
  targetTop: 3703.671875, targetHeight: 218,
  readingTop: 74, readingBottom: 298.5,
  scrollTop: 0, maxScrollTop: 4000,
};

test('R3 red: old scrollIntoView(center) leaves the native target behind the header', () => {
  const oldTop = 49.671875; // R3 screenshot/JSON: 0.888403 ratio
  assert.ok(oldTop < observedR3.readingTop);
  assert.equal(oldTop + observedR3.targetHeight, 267.671875);
});
test('R3 corrective: one planned scroll fits the actual unobscured 224.5px band', () => {
  const plan = planReadableScroll(observedR3);
  assert.equal(plan.delta, 3626.421875);
  assert.equal(plan.desiredTop, 77.25);
  assert.equal(plan.predictedTop, 77.25);
  assert.equal(plan.predictedBottom, 295.25);
  assert.equal(plan.predictedFullExposure, true);
  assert.equal(plan.clamped, false);
});
test('scroll range is binding: do not manufacture full exposure', () => {
  const plan = planReadableScroll({ ...observedR3, maxScrollTop: 2000 });
  assert.equal(plan.clamped, true);
  assert.equal(plan.predictedFullExposure, false);
});
test('too-tall target cannot be labelled fully exposed', () => {
  const plan = planReadableScroll({ ...observedR3, targetHeight: 250 });
  assert.equal(plan.fitsBand, false);
  assert.equal(plan.predictedFullExposure, false);
});
test('invalid geometry fails closed', () => {
  assert.throws(() => planReadableScroll({ ...observedR3, scrollTop: 5000 }), /INVALID_READING_SCROLL_GEOMETRY/);
});
test('320px overflow in starter is NON_EQUIVALENT, not native failure', () => {
  assert.deepEqual(classifyHorizontalOverflow('starter', 334, 320), {
    excessPx: 14, nativeFailure: false, referenceNonEquivalent: true,
  });
});
test('FullStack overflow remains a native failure', () => {
  assert.deepEqual(classifyHorizontalOverflow('fullstack', 334, 320), {
    excessPx: 14, nativeFailure: true, referenceNonEquivalent: false,
  });
});
test('zero overflow stays comparable', () => {
  assert.equal(classifyHorizontalOverflow('starter', 320, 320).referenceNonEquivalent, false);
  assert.equal(classifyHorizontalOverflow('fullstack', 320, 320).nativeFailure, false);
});

const here = dirname(fileURLToPath(import.meta.url));
test('B runtime retains ratio1, immutable fixtures, and separate worker receipts', () => {
  const spec = readFileSync(join(here, 'domain.spec.ts'), 'utf8');
  const fixture = readFileSync(join(here, 'domain-fixtures.ts'), 'utf8');
  assert.match(spec, /toBeInViewport\(\{ratio:1\}\)/);
  assert.match(spec, /DOMAIN_BROWSER_CLEANUP_FAILED/);
  assert.match(spec, /workerInfo\.workerIndex/);
  assert.match(spec, /flag:"wx"/);
  assert.doesNotMatch(spec, /requirement:errors\.length\?"DEFECT_FOUND"/);
  assert.match(fixture, /countAuthFixtureUsers\(process\.env\)/);
  assert.match(fixture, /1440, height: 900/);
  assert.match(fixture, /timeout: 12_000/);
});
test('existing R3 failure receipts are immutable inputs, not reclassified as PASS', () => {
  const spec = readFileSync(join(here, 'domain.spec.ts'), 'utf8');
  assert.match(spec, /execution:"FAIL",comparability:"INSUFFICIENT_EVIDENCE",requirement:"HUMAN_DECISION_PENDING"/);
  assert.match(spec, /requirement:options\.requirement\?\?"HUMAN_DECISION_PENDING"/);
  assert.match(spec, /NATIVE_HORIZONTAL_OVERFLOW/);
  assert.match(spec, /PINNED_REFERENCE_HORIZONTAL_OVERFLOW/);
});
