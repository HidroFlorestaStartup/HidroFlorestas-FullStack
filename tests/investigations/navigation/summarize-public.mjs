import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const directory = resolve('docs/releases/2026-10-23-hf-inv-local01/navigation');
const ids = ['2026-10-23T20-45-41-274Z', '2026-10-23T20-49-36-815Z', '2026-10-23T20-53-17-567Z', '2026-10-23T20-56-58-846Z'];
const runs = [];
const images = [];
for (const id of ids) {
  const bytes = await readFile(resolve(directory, id, 'results.json'));
  const result = JSON.parse(bytes);
  runs.push({ id, receipt: `${id}/results.json`, bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    status: result.status, blocker: result.blocker,
    browserAttempts: result.attempts.length, outcomes: result.attempts.map(attempt => ({ id: attempt.id, status: attempt.status, failure: attempt.failure })),
    syntheticControls: result.syntheticControls,
    cleanup: result.serverCleanup,
    limitation: id.includes('20-45') || id.includes('20-49') ? 'No browser executed; Node Response.status was incorrectly called as a method. Readiness TypeError rows are instrumentation failures, not established transport failures. First run additionally lacked generated Prisma Client.' :
      id.includes('20-53') ? 'Register500 caused by an accidental investigator-created filename with malformed glob extension. This is a contaminated setup, not historical/product evidence.' :
        'Fresh contexts after readiness; public login/register only. Does not replace authenticated collection or map evidence.' });
  for (const file of result.files) {
    const imageBytes = await readFile(resolve(directory, id, file.path));
    const hash = createHash('sha256').update(imageBytes).digest('hex');
    if (hash !== file.sha256) throw new Error('IMAGE_DIGEST_MISMATCH');
    const equalInspected = images.find(image => image.sha256 === hash && image.openedWithViewImage);
    images.push({ path: `${id}/${file.path}`, bytes: imageBytes.length, sha256: hash,
      openedWithViewImage: id.includes('20-53'),
      inspectionReusedFrom: equalInspected?.path ?? null,
      note: 'viewport screenshot, form controls masked; hidden pixels not approved' });
  }
}
// Preserve the exact pre-auth protocol bytes when the recorded hash verifies.
const final = JSON.parse(await readFile(resolve(directory, ids.at(-1), 'results.json'), 'utf8'));
const recorded = final.executedSources.find(source => source.path.endsWith('/protocol.md'));
const current = await readFile(resolve(directory, 'protocol.md'), 'utf8');
const prefix = current.split('## Protocolo autenticado C-AUTH-1, antes do runtime')[0];
const candidates = [prefix, prefix.trimEnd() + '\n'];
let snapshot;
for (const candidate of candidates) {
  if (createHash('sha256').update(candidate).digest('hex') === recorded.sha256) {
    const path = 'public-protocol-executed.snapshot.md';
    await writeFile(resolve(directory, path), candidate);
    snapshot = { path, sha256: recorded.sha256, reconstructedFromUnchangedPrefixAndHashVerified: true };
    break;
  }
}
await writeFile(resolve(directory, 'public-evidence-summary.json'), JSON.stringify({
  schemaVersion: 1, protocol: 'C-1', sourceProtocolSnapshot: snapshot ?? { preserved: false, limitation: 'Original protocol hash captured; bytes were extended before snapshot preservation.' },
  preflight: { gitIdentityFailure: 'Read-only metadata stopped before server; per-command safe.directory fixed without global changes.',
    installationAttempts: ['default-network EACCES', 'escalated-network ECONNRESET', 'shared verified cache offline exit0'],
    prismaGenerate: 'isolated/no database URL, exit0',
    earlySourceLimitation: 'Exact run-public source bytes of the two readiness-BLOCKED receipts were not preserved before edits. Their recorded hashes do not match the final source, and no source reconstruction is claimed. These are invalid setup attempts, not product evidence. Browser FAIL/PASS source is available and verifiable.',
    accidentalOutput: 'One file created by a malformed Windows inline diagnostic command; exact owned file removed, no recursive cleanup.' },
  runs, images, actualImagesOpened: images.filter(image => image.openedWithViewImage).length,
  historicalClaims: { INV003: 'INCONCLUSIVO', NAV_SETTLE: 'Public narrow protocol not reproduced; authenticated original remains separate.',
    OBS001: 'Public caret mutation demonstrated; historical hydration cause remains INCONCLUSIVO.', OBS002: 'Two original public images opened; no claim for masked pixels or all controls.' },
}, null, 2) + '\n');
console.log(JSON.stringify({ summarizedRuns: runs.length, images: images.length, sourceProtocolSnapshotVerified: !!snapshot }));
