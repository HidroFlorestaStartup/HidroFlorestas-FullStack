import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { matchesAppliedMigration } from '../../scripts/accounts-migration-source';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');

test('migration comparison accepts exact bytes and LF/CRLF in both directions', () => {
  const lf = 'CREATE TABLE "Example" ("value" text);\n-- preserved\n';
  const crlf = lf.replace(/\n/g, '\r\n');
  assert.equal(matchesAppliedMigration(Buffer.from(lf), hash(lf)), true);
  assert.equal(matchesAppliedMigration(Buffer.from(crlf), hash(lf)), true);
  assert.equal(matchesAppliedMigration(Buffer.from(lf), hash(crlf)), true);
});

test('migration comparison rejects changes to SQL, comments and unknown checksums', () => {
  const source = 'CREATE TABLE "Example" ("value" text);\n';
  assert.equal(matchesAppliedMigration(Buffer.from(source), hash(source.replace('text', 'integer'))), false);
  assert.equal(matchesAppliedMigration(Buffer.from(source), hash(source + '-- changed\n')), false);
  assert.equal(matchesAppliedMigration(Buffer.from(source), 'invalid'), false);
});

test('migration comparison never replaces malformed UTF-8 during normalization', () => {
  const invalid = Buffer.from([0xff, 0x0d, 0x0a]);
  assert.equal(matchesAppliedMigration(invalid, hash('\ufffd\n')), false);
});
