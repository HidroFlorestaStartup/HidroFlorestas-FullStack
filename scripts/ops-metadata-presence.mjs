import { closeSync, fstatSync, lstatSync, openSync, readSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const OPERATIONAL_NAMES = Object.freeze([
  'APP_PUBLIC_URL', 'ACCOUNT_TRUSTED_INGRESS', 'ACCOUNT_POLICY_ENABLED',
  'ACCOUNT_TESTER_ALLOWLIST', 'ACCOUNT_PROOF_KEYS', 'ACCOUNT_PROOF_ACTIVE_KEY_ID',
  'ACCOUNT_REQUEST_KEY', 'MAIL_PAYLOAD_ENCRYPTION_KEYS', 'MAIL_PAYLOAD_ACTIVE_KEY_ID',
  'MAIL_IDEMPOTENCY_KEY', 'MAIL_WORKER_SECRET', 'SMTP_HOST', 'SMTP_PORT',
  'SMTP_SECURE', 'SMTP_REQUIRE_TLS', 'SMTP_USER', 'SMTP_APP_PASSWORD', 'MAIL_FROM',
]);
const allowedNames = new Set([...OPERATIONAL_NAMES, 'DATABASE_URL', 'JWT_SECRET',
  'ROOT_PASSWORD', 'NEXT_PUBLIC_MAP_TILE_URL', 'NEXT_PUBLIC_MAP_ATTRIBUTION']);
const targets = new Set(['production', 'preview', 'development']);
const maxBytes = 1024 * 1024;
const invalid = () => { throw new Error('OPS_METADATA_INVALID_INPUT'); };
const validBranch = value => typeof value === 'string' && !/\s/.test(value) &&
  /^[A-Za-z0-9][A-Za-z0-9._/-]{0,199}$/.test(value);

function closedObject(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) invalid();
  const own = Object.keys(value);
  if (own.length !== keys.length || !own.every(key => keys.includes(key))) invalid();
}

export function evaluateInventory(input, target, branch) {
  if (!targets.has(target) || !validBranch(branch)) invalid();
  closedObject(input, ['schemaVersion', 'records']);
  if (input.schemaVersion !== 1 || !Array.isArray(input.records) || input.records.length > 1000) invalid();
  const seen = new Set();
  for (const item of input.records) {
    closedObject(item, ['key', 'target', 'gitBranch']);
    if (!allowedNames.has(item.key) || !Array.isArray(item.target) || item.target.length === 0 ||
      item.target.length > 3 || new Set(item.target).size !== item.target.length ||
      !item.target.every(value => targets.has(value))) invalid();
    if (item.gitBranch !== null && (!validBranch(item.gitBranch) ||
      item.target.length !== 1 || item.target[0] !== 'preview')) invalid();
    for (const scope of item.target) {
      const identity = JSON.stringify([item.key, scope, item.gitBranch]);
      if (seen.has(identity)) invalid();
      seen.add(identity);
    }
  }
  const entries = OPERATIONAL_NAMES.map(key => {
    const scoped = input.records.filter(item => item.key === key && item.target.includes(target));
    const status = scoped.some(item => item.gitBranch === null) ? 'PRESENT_GLOBAL' :
      scoped.some(item => target === 'preview' && item.gitBranch === branch) ? 'PRESENT_BRANCH' : 'MISSING';
    return { key, status };
  });
  const presentCount = entries.filter(item => item.status !== 'MISSING').length;
  return { target, total: OPERATIONAL_NAMES.length, presentCount,
    missingCount: OPERATIONAL_NAMES.length - presentCount, entries,
    gates: { G3: 'BLOCKED', G4: 'BLOCKED', G5: 'BLOCKED' } };
}

function readInventory(file) {
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.size > maxBytes) invalid();
  const descriptor = openSync(file, 'r');
  try {
    const opened = fstatSync(descriptor);
    if (!opened.isFile() || opened.size > maxBytes) invalid();
    const buffer = Buffer.alloc(maxBytes + 1);
    let count = 0;
    while (count < buffer.length) {
      const bytes = readSync(descriptor, buffer, count, buffer.length - count, null);
      if (bytes === 0) break;
      count += bytes;
    }
    if (count > maxBytes) invalid();
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(buffer.subarray(0, count)));
  } finally { closeSync(descriptor); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length !== 5) invalid();
    const result = evaluateInventory(readInventory(process.argv[2]), process.argv[3], process.argv[4]);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = result.missingCount === 0 ? 0 : 2;
  } catch {
    process.stderr.write('OPS_METADATA_INVALID_INPUT\n');
    process.exitCode = 1;
  }
}
