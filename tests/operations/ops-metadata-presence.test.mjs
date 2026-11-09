import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { spawnSync } from 'node:child_process';
import { evaluateInventory, OPERATIONAL_NAMES } from '../../scripts/ops-metadata-presence.mjs';

const branch = 'synthetic/local-branch';
const inventory = (records = []) => ({ schemaVersion: 1, records });
const record = (key, target = ['preview'], gitBranch = null) => ({ key, target, gitBranch });

test('empty and complete inventories keep all operational gates blocked', () => {
  const empty = evaluateInventory(inventory(), 'preview', branch);
  assert.equal(empty.total, 18);
  assert.equal(empty.missingCount, 18);
  assert.equal(empty.presentCount, 0);
  assert.equal(new Set(OPERATIONAL_NAMES).size, 18);
  assert.deepEqual(empty.gates, { G3: 'BLOCKED', G4: 'BLOCKED', G5: 'BLOCKED' });
  const complete = evaluateInventory(inventory(OPERATIONAL_NAMES.map(key => record(key))), 'preview', branch);
  assert.equal(complete.presentCount, 18);
  assert.equal(complete.missingCount, 0);
  assert.deepEqual(complete.gates, empty.gates);
  assert.equal(JSON.stringify(complete).includes(branch), false);
});

test('target and exact preview branch determine scope; global has reporting precedence', () => {
  const records = [record('SMTP_HOST', ['preview'], branch), record('SMTP_PORT', ['production']),
    record('SMTP_USER', ['preview'], 'another/branch'), record('MAIL_FROM'), record('MAIL_FROM', ['preview'], branch)];
  const result = evaluateInventory(inventory(records), 'preview', branch);
  assert.equal(result.entries.find(x => x.key === 'SMTP_HOST').status, 'PRESENT_BRANCH');
  assert.equal(result.entries.find(x => x.key === 'SMTP_PORT').status, 'MISSING');
  assert.equal(result.entries.find(x => x.key === 'SMTP_USER').status, 'MISSING');
  assert.equal(result.entries.find(x => x.key === 'MAIL_FROM').status, 'PRESENT_GLOBAL');
  assert.equal(evaluateInventory(inventory(records), 'production', branch).presentCount, 1);
});

test('baseline metadata is accepted without inflating the 18 operational names', () => {
  const result = evaluateInventory(inventory(['DATABASE_URL','JWT_SECRET','ROOT_PASSWORD',
    'NEXT_PUBLIC_MAP_TILE_URL','NEXT_PUBLIC_MAP_ATTRIBUTION'].map(key => record(key, ['development']))), 'development', branch);
  assert.equal(result.total, 18);
  assert.equal(result.presentCount, 0);
});

test('rejects malformed structures, unexpected fields/names, duplicate scopes and invalid selectors', () => {
  const invalid = [null, [], {}, { ...inventory(), value: 'PRIVATE_CANARY' },
    inventory([null]), inventory([{ ...record('SMTP_HOST'), value: 'PRIVATE_CANARY' }]),
    inventory([record('PRIVATE_CANARY')]), inventory([record('SMTP_HOST', [])]),
    inventory([record('SMTP_HOST', ['other'])]), inventory([record('SMTP_HOST', ['preview','preview'])]),
    inventory([record('SMTP_HOST', ['production'], branch)]),
    inventory([record('SMTP_HOST'), record('SMTP_HOST')]),
    inventory([record('SMTP_HOST', ['production','preview']), record('SMTP_HOST')]),
    inventory(Array.from({ length:1001 }, () => record('SMTP_HOST')))];
  for (const input of invalid) assert.throws(() => evaluateInventory(input, 'preview', branch), /^Error: OPS_METADATA_INVALID_INPUT$/);
  for (const target of ['other', null, 'preview\n']) assert.throws(() => evaluateInventory(inventory(), target, branch));
  for (const value of ['', 'two words', 'line\nbreak', 'valid\n', 'valid\r\n', '--flag', null]) assert.throws(() => evaluateInventory(inventory(), 'preview', value));
});

test('CLI exit codes and errors are sanitized, including file/size/JSON failures', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hf-ops-synthetic-'));
  const file = join(dir, 'inventory.json');
  const cli = resolve('scripts/ops-metadata-presence.mjs');
  const run = (args = [file, 'preview', branch]) => spawnSync(process.execPath, [cli, ...args], { encoding:'utf8', timeout:10000 });
  try {
    writeFileSync(file, JSON.stringify(inventory()));
    let r = run(); assert.equal(r.status,2); assert.equal(JSON.parse(r.stdout).missingCount,18); assert.equal(r.stderr,'');
    writeFileSync(file, JSON.stringify(inventory(OPERATIONAL_NAMES.map(key => record(key)))));
    r = run(); assert.equal(r.status,0); assert.equal(JSON.parse(r.stdout).presentCount,18);
    for (const text of ['PRIVATE_CANARY', '{"PRIVATE_CANARY":', JSON.stringify({ ...inventory(), value:'PRIVATE_CANARY' }), ' '.repeat(1048577)]) {
      writeFileSync(file,text); r = run(); assert.equal(r.status,1); assert.equal(r.stdout,'');
      assert.equal(r.stderr,'OPS_METADATA_INVALID_INPUT\n');
    }
    const folder = join(dir, 'folder'); mkdirSync(folder);
    for (const args of [[], [join(dir,'PRIVATE_CANARY'), 'preview', branch], [folder,'preview',branch], [file,'preview',branch,'PRIVATE_CANARY']]) {
      r = run(args); assert.equal(r.status,1); assert.equal(r.stdout,''); assert.equal(r.stderr,'OPS_METADATA_INVALID_INPUT\n');
    }
  } finally {
    assert.equal(dirname(resolve(dir)), resolve(tmpdir()));
    assert.ok(basename(dir).startsWith('hf-ops-synthetic-'));
    rmSync(dir, { recursive:true, force:true });
  }
});
