import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { resolve } from 'node:path';
const root = process.cwd();
const destination = resolve(root, 'docs/releases/2026-10-23-hf-inv-local01/navigation/authenticated');
await mkdir(destination, { recursive: true });
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const resultBytes = await readFile(resolve(root, '.accounts-validation/navigation-auth-results-closed/results.json'));
const results = JSON.parse(resultBytes);
const observations = (await readFile(resolve(root, '.accounts-validation/navigation-auth-observations.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
await writeFile(resolve(destination, 'results.json'), resultBytes);
await writeFile(resolve(destination, 'observations.json'), JSON.stringify(observations, null, 2) + '\n');
const privateDirectory = resolve(root, '.accounts-validation/navigation-runtime');
const logs = [];
const http = [];
for (const name of (await readdir(privateDirectory)).filter(name => /^(Prepare|Run|Audit|Stop)-[0-9TZ]+\.log$/.test(name))) {
  const bytes = await readFile(resolve(privateDirectory, name));
  logs.push({ logicalPath: `private-navigation-runtime/${name}`, bytes: bytes.length, sha256: digest(bytes), rawPublished: false });
  if (!name.startsWith('Run-')) continue;
  const text = bytes.toString('utf8').replace(/\x1b\[[0-9;]*m/g, '');
  for (const match of text.matchAll(/^\s*(?:\[WebServer\]\s*)?(GET|POST|PUT|PATCH|DELETE)\s+(\/\S*)\s+(\d{3})\b/gm)) {
    const path = new URL(match[2], 'http://synthetic.invalid').pathname.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '{id}');
    if (!/^\/(api\/|dashboard\/|workspace|login|register|logout)/.test(path)) continue;
    http.push({ method: match[1], path, status: Number(match[3]), kind: path.startsWith('/api/') ? 'api' : 'document-or-rsc-server-log' });
  }
}
const imageRows = [];
const mapDirectory = resolve(root, '.accounts-validation/frontend-territorial-map');
const mapNames = (await readdir(mapDirectory)).filter(name => name.endsWith('.png'));
const selections = [
  ['map-375x900-text100-viewport.png', 'map-375.png'],
  ['final-action-focus-320x760-text200-viewport.png', 'map-final-action-320-text200.png'],
  ['transport-recovered-375-viewport.png', 'map-transport-recovered-375.png'],
  ['final-action-focus-844x390-text100-viewport.png', 'map-final-action-landscape.png'],
];
for (const [suffix, published] of selections) {
  const matches = mapNames.filter(name => name.endsWith(suffix));
  if (matches.length !== 1) throw new Error('IMAGE_SELECTION_NOT_UNIQUE');
  const source = resolve(mapDirectory, matches[0]);
  const bytes = await readFile(source);
  await copyFile(source, resolve(destination, published));
  imageRows.push({ path: published, source: `private-map-archive/${matches[0]}`, bytes: bytes.length, sha256: digest(bytes), openedWithViewImage: false });
}
const collectionDirectory = resolve(root, '.accounts-validation/frontend-collections');
const collectionNames = (await readdir(collectionDirectory)).filter(name => name.endsWith('frontend-collections-caret-counterproof.png'));
if (collectionNames.length !== 1) throw new Error('COLLECTION_IMAGE_NOT_UNIQUE');
const helperMetadata = JSON.parse(await readFile(resolve(collectionDirectory, collectionNames[0].replace('.png', '-viewport.json')), 'utf8'));
for (const [source, published] of [
  [resolve(root, '.accounts-validation/navigation-auth-artifacts/collection-caret-initial.png'), 'collection-caret-initial.png'],
  [resolve(collectionDirectory, collectionNames[0]), 'collection-caret-helper.png'],
]) {
  const bytes = await readFile(source); await copyFile(source, resolve(destination, published));
  imageRows.push({ path: published, bytes: bytes.length, sha256: digest(bytes), openedWithViewImage: false });
}
const ports = [];
for (const port of [3001, 55427]) {
  const server = createServer();
  const released = await new Promise(resolveReleased => {
    server.once('error', () => resolveReleased(false));
    server.listen(port, '127.0.0.1', () => server.close(() => resolveReleased(true)));
  });
  ports.push({ port, released });
}
const packageVersion = async name => JSON.parse(await readFile(resolve(root, `node_modules/${name}/package.json`), 'utf8')).version;
const postgres = execFileSync(resolve(privateDirectory, 'localappdata/HidroFlorestas/accounts-postgresql/node_modules/@embedded-postgres/windows-x64/native/bin/postgres.exe'), ['--version'], { encoding: 'utf8', windowsHide: true });
await writeFile(resolve(destination, 'manifest.json'), JSON.stringify({
  schemaVersion: 1, protocol: 'C-AUTH-1', status: results.status,
  results: { path: 'results.json', bytes: resultBytes.length, sha256: digest(resultBytes) },
  counts: results.tests.reduce((counts, test) => ({ ...counts, [test.status]: (counts[test.status] ?? 0) + 1 }), {}),
  versions: { node: process.version, next: await packageVersion('next'), prisma: await packageVersion('prisma'), playwright: await packageVersion('@playwright/test'),
    postgresObserved: /PostgreSQL\)\s*([0-9.]+)/.exec(postgres)?.[1] ?? /PostgreSQL\s+([0-9.]+)/.exec(postgres)?.[1] ?? 'not-parsed',
    browserExpectedFromInstalledPackage: JSON.parse(await readFile(resolve(root, 'node_modules/playwright-core/browsers.json'), 'utf8')).browsers.find(browser => browser.name === 'chromium').browserVersion },
  logs, http, images: imageRows, mapPngGenerated: mapNames.length, mapPngSelected: selections.length,
  collectionHelperGeometry: { width: helperMetadata.width, height: helperMetadata.height, rootFontSizePx: helperMetadata.rootFontSizePx,
    fullPage: helperMetadata.fullPage, animations: helperMetadata.animations },
  ports, cluster: 'mission-owned-C-stopped-data-preserved',
  limitations: ['Server logs do not distinguish document navigation from RSC fetch; use explicit browser document records for that distinction.',
    'Selected image pixels require inspection before a visual conclusion.', 'No historical cause is inferred from current PASS.'],
}, null, 2) + '\n');
await writeFile(resolve(destination, 'image-inspection.json'), JSON.stringify({
  schemaVersion: 1, recordedUtc: new Date().toISOString(), inspectedBy: 'agent-c-navigation', tool: 'view_image',
  actualImagesOpened: 6, mapImagesOpened: 4, collectionImagesOpened: 2, otherMapPngNotOpened: mapNames.length - selections.length,
  images: imageRows.map(image => ({ path: image.path, sha256: image.sha256 })),
  findings: ['Focused collection action is visible above the lower navigation in the selected 320px/text200 and landscape map frames.',
    'The development Next indicator is retained; hidden pixels are not approved.',
    'The initial-caret collection control capture occurred during text/font transition before helper readiness. Its mask leaves part of a synthetic date/time visible. It is not a geometry-matched A/B control, and no real personal data or secret is present.',
    'The original helper capture is stable at its measured geometry. No causal claim about the historical hydration warning follows from these images.'],
}, null, 2) + '\n');
console.log(JSON.stringify({ tests: results.tests.length, status: results.status, selectedImages: imageRows.length, mapImagesGenerated: mapNames.length, ports }));
