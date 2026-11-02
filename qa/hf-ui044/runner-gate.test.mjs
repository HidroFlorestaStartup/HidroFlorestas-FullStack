import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { isApprovedFreshWindowsRunner } from './runner-gate.ts';

const baseline = {
  GITHUB_ACTIONS: 'true',
  GITHUB_REPOSITORY: 'HidroFlorestaStartup/HidroFlorestas-FullStack',
  RUNNER_OS: 'Windows',
  GITHUB_RUN_ATTEMPT: '1',
  GITHUB_REF: 'refs/heads/codex/hf-ui044-close-20261101',
};

test('original QA R3 branch retains the synthetic runner gate', () => {
  assert.equal(isApprovedFreshWindowsRunner(baseline), true);
});
test('new residual PR50 branch is accepted by the exact same protections', () => {
  assert.equal(isApprovedFreshWindowsRunner({
    ...baseline, GITHUB_REF: 'refs/heads/fix/hf-ui044-ui06-b-residual-20261101',
  }), true);
});
test('rejects unlisted branches and pull request merge refs', () => {
  for (const GITHUB_REF of [
    'refs/heads/main',
    'refs/heads/development',
    'refs/heads/fix/hf-ui044-ui06-b-residual-20261101-extra',
    'refs/pull/50/merge',
    '',
  ]) assert.equal(isApprovedFreshWindowsRunner({ ...baseline, GITHUB_REF }), false, GITHUB_REF);
});
test('rejects wrong or missing repository identity', () => {
  assert.equal(isApprovedFreshWindowsRunner({ ...baseline, GITHUB_REPOSITORY:'outsider/HidroFlorestas-FullStack' }), false);
  assert.equal(isApprovedFreshWindowsRunner({ ...baseline, GITHUB_REPOSITORY:undefined }), false);
});
test('rejects local, Linux or missing runner attestations', () => {
  for(const patch of [
    { GITHUB_ACTIONS:'false' }, { GITHUB_ACTIONS:undefined },
    { RUNNER_OS:'Linux' }, { RUNNER_OS:undefined },
  ]) assert.equal(isApprovedFreshWindowsRunner({ ...baseline, ...patch }), false);
});
test('rejects reruns rather than silently consuming an unauthorized attempt', () => {
  assert.equal(isApprovedFreshWindowsRunner({ ...baseline, GITHUB_RUN_ATTEMPT:'2' }), false);
  assert.equal(isApprovedFreshWindowsRunner({ ...baseline, GITHUB_RUN_ATTEMPT:undefined }), false);
});
test('fixture must actually invoke gate before touching synthetic database', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const fixture = readFileSync(join(here, 'domain-fixtures.ts'), 'utf8');
  const invokedAt = fixture.indexOf('isApprovedFreshWindowsRunner(process.env)');
  const databaseAt = fixture.indexOf('countAuthFixtureUsers(process.env)');
  assert.ok(invokedAt > 0 && databaseAt > invokedAt,
    'authorization predicate must precede database fixture setup');
});
