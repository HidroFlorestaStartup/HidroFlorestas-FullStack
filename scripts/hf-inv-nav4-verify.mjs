import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir, stat, access } from 'node:fs/promises';
import { resolve, join, relative, dirname } from 'node:path';

// Static evidence verification only. Execution receipts are never regenerated.
const directory = resolve(process.cwd(), 'docs/releases/2026-10-23-hf-inv-local01/nav4');
const hash = value => createHash('sha256').update(value).digest('hex');
const json = async path => JSON.parse(await readFile(path, 'utf8'));
for (const [name, prefix] of [['probe-results.json', 'v3'], ['back-results.json', 'v4'], ['origin-results.json', 'v5']]) {
  const identity = (await json(join(directory, name))).records.find(row => row.phase === 'identity');
  for (const source of identity.sources) {
    const suffix = source.path.endsWith('.ts') ? 'probe.ts.txt' : source.path.endsWith('.ps1') ? 'local.ps1.txt' : 'protocol.md.txt';
    const bytes = await readFile(join(directory, 'executed-sources', `${prefix}-${suffix}`));
    if (hash(bytes) !== source.sha256 || bytes.length !== source.bytes) throw new Error('EXECUTED_SOURCE_INTEGRITY_FAILED');
  }
}
const files = [];
async function inspect(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const target = join(path, entry.name);
    if (entry.isSymbolicLink()) throw new Error('EVIDENCE_SYMLINK_REFUSED');
    if (entry.isDirectory()) { await inspect(target); continue; }
    if (entry.name === 'manifest.json') continue;
    const bytes = await readFile(target);
    const text = bytes.toString('utf8');
    if (/C:[\\/]|\\Users\\|\/root\//.test(text)) throw new Error('INTERNAL_ABSOLUTE_PATH_REFUSED');
    if (/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+|auth_token=[A-Za-z0-9._-]+/.test(text)) throw new Error('SESSION_VALUE_REFUSED');
    if (entry.name.endsWith('.json')) JSON.parse(text);
    if (entry.name.endsWith('.md')) for (const match of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const link = match[1];
      if (/^https?:\/\//.test(link) || link.startsWith('#')) continue;
      const destination = resolve(dirname(target), link.split('#')[0]);
      if (destination !== join(directory, 'manifest.json')) await access(destination);
    }
    files.push({ path: relative(directory, target).replaceAll('\\', '/'), bytes: (await stat(target)).size, sha256: hash(bytes) });
  }
}
await inspect(directory);
files.sort((a, b) => a.path.localeCompare(b.path));
if (process.argv.includes('--write-manifest')) {
  await writeFile(join(directory, 'manifest.json'), JSON.stringify({ schemaVersion: 1, mission: 'HF-INV-20261023-01-LOCAL01',
    generatedUtc: new Date().toISOString(), hashAlgorithm: 'sha256', selfHashIncluded: false,
    validation: { jsonParse: 'PASS', localMarkdownReferences: 'PASS', executedSourceHashes: 'PASS',
      closedEvidencePathAndSessionScan: 'PASS', rawEnvironmentOrReporterJsonPublished: false }, files,
  }, null, 2) + '\n');
} else {
  const manifest = await json(join(directory, 'manifest.json'));
  if (JSON.stringify(manifest.files) !== JSON.stringify(files)) throw new Error('EVIDENCE_MANIFEST_MISMATCH');
}
await access(join(directory, 'manifest.json'));
console.log(JSON.stringify({ evidenceFilesVerified: files.length, json: 'PASS', links: 'PASS', executedSources: 9, pathAndSessionScan: 'PASS' }));
