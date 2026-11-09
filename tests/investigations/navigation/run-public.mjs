import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { release } from 'node:os';
import { resolve } from 'node:path';

async function main() {
const root = process.cwd();
const port = 3200;
const origin = `http://127.0.0.1:${port}`;
const id = new Date().toISOString().replace(/[:.]/g, '-');
const evidence = resolve(root, 'docs/releases/2026-10-23-hf-inv-local01/navigation', id);
const privateDirectory = resolve(root, '.accounts-validation/navigation', id);
await mkdir(evidence, { recursive: true });
await mkdir(privateDirectory, { recursive: true });
// Names only: never open preexisting environment files or their values.
for (const name of ['.env', '.env.local', '.env.development', '.env.development.local']) {
  if (existsSync(resolve(root, name))) throw new Error('UNEXPECTED_ENV_FILE');
}
const inherited = ['PATH', 'Path', 'SystemRoot', 'SYSTEMROOT', 'WINDIR', 'ComSpec', 'COMSPEC',
  'PATHEXT', 'TEMP', 'TMP', 'SYSTEMDRIVE', 'ProgramFiles', 'ProgramFiles(x86)'];
const environment = Object.fromEntries(inherited.flatMap(key =>
  process.env[key] === undefined ? [] : [[key, process.env[key]]]));
Object.assign(environment, { NODE_ENV: 'development', NEXT_TELEMETRY_DISABLED: '1' });
const gitBytes = (...args) => execFileSync('git', ['-c', `safe.directory=${root}`, ...args],
  { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
const git = (...args) => gitBytes(...args).toString('utf8').trim();
const result = { schemaVersion: 1, protocol: 'C-1', mission: 'HF-INV-20261023-01-LOCAL01',
  startedUtc: new Date().toISOString(), timezone: 'America/Fortaleza',
  base: 'c4adfb379e5dc78f27f31b91edbd13f43228d9f9', head: git('rev-parse', 'HEAD'),
  tree: git('rev-parse', 'HEAD^{tree}'), dirtyTrackedPatchSha256: createHash('sha256').update(gitBytes('diff', 'HEAD')).digest('hex'),
  untrackedInvestigation: true, node: process.version, platform: process.platform, osRelease: release(),
  applicationDelta: 'none', database: 'none', session: 'none', environment: 'system-allowlist-no-app-config',
  attempts: [], syntheticControls: [], files: [], status: 'NOT_RUN' };
result.executedSources = [];
for (const path of ['tests/investigations/navigation/run-public.mjs',
  'tests/e2e/frontend-mobile-navigation.spec.ts',
  'docs/releases/2026-10-23-hf-inv-local01/navigation/protocol.md']) {
  const bytes = await readFile(resolve(root, path));
  result.executedSources.push({ path, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
}
const probe = createServer();
await new Promise((resolveListen, reject) => {
  probe.once('error', reject); probe.listen(port, '127.0.0.1', resolveListen);
});
await new Promise(resolveClose => probe.close(resolveClose));
const child = spawn(process.execPath, [resolve(root, 'node_modules/next/dist/bin/next'), 'dev',
  '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: root, env: environment, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
let serverOutput = '';
child.stdout.on('data', value => { serverOutput += value; });
child.stderr.on('data', value => { serverOutput += value; });
let browser;
const routeClass = raw => {
  const url = new URL(raw);
  if (url.origin !== origin) return 'external';
  if (['/', '/login', '/register'].includes(url.pathname)) return url.pathname;
  if (url.pathname.startsWith('/api/')) return 'api-other';
  if (url.pathname.startsWith('/_next/')) return 'next-asset';
  return 'other-local';
};
// Equivalent to the original mobile helper; its guard remains 90 seconds.
async function settleTransitions() {
  for (;;) {
    const finite = document.getAnimations().filter(animation =>
      animation.playState === 'running' && Number.isFinite(animation.effect?.getComputedTiming().endTime));
    if (!finite.length) return;
    await Promise.allSettled(finite.map(animation => animation.finished));
  }
}
const sample = () => ({
  width: innerWidth, height: innerHeight, font: getComputedStyle(document.documentElement).fontSize,
  animations: document.getAnimations().map(animation => ({ state: animation.playState,
    finite: Number.isFinite(animation.effect?.getComputedTiming().endTime) })),
  inputsEnabled: [...document.querySelectorAll('input')].every(input => !input.disabled),
  documentWidth: document.documentElement.scrollWidth,
});
async function guarded(promise) {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('ORIGINAL_90S_GUARD')), 90_000);
  })]); } finally { clearTimeout(timer); }
}
async function snapshot(page, filename, caret) {
  const path = resolve(evidence, filename);
  await page.screenshot({ path, fullPage: false, animations: 'allow', caret,
    mask: [page.locator('input,select,textarea')] });
  const bytes = await readFile(path);
  result.files.push({ path: filename, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), inspected: false });
}
try {
  const deadline = Date.now() + 120_000;
  let ready = false;
  result.readiness = [];
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error('SERVER_EXIT_BEFORE_READY');
    try {
      const response = await fetch(`${origin}/login`, { signal: AbortSignal.timeout(10_000), redirect: 'manual' });
      result.readiness.push({ t: Date.now(), status: response.status });
      if (response.status === 200) { ready = true; break; }
    } catch (error) { result.readiness.push({ t: Date.now(), status: 'transport-not-ready',
      kind: ['AbortError', 'TimeoutError', 'TypeError'].includes(error.name) ? error.name : 'other',
      code: typeof error.cause?.code === 'string' && /^[A-Z0-9_]{1,60}$/.test(error.cause.code) ? error.cause.code : null }); }
    await new Promise(resolvePoll => setTimeout(resolvePoll, 250));
  }
  if (!ready) throw new Error('SERVER_READINESS_TIMEOUT');
  const { chromium } = await import('@playwright/test');
  browser = await chromium.launch({ headless: true, env: environment });
  result.browserVersion = browser.version();
  result.playwrightVersion = JSON.parse(await readFile(resolve(root, 'node_modules/@playwright/test/package.json'), 'utf8')).version;
  result.nextVersion = JSON.parse(await readFile(resolve(root, 'node_modules/next/package.json'), 'utf8')).version;
  for (const [index, caret] of ['none', 'initial', 'hide'].entries()) {
    const attempt = { id: `C-PUBLIC-${index + 1}`, phase: 'server-after-readiness-fresh-browser-context',
      screenshotCaret: caret, startedUtc: new Date().toISOString(), responses: [], warnings: [], errors: [], status: 'NOT_RUN' };
    result.attempts.push(attempt);
    const context = await browser.newContext({ viewport: { width: 375, height: 900 } });
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page = await context.newPage();
    const attemptDeadline = Date.now() + 90_000;
    const attemptGuard = setTimeout(() => { void context.close(); }, 90_000);
    page.on('response', response => {
      if (response.request().isNavigationRequest() || ['/', '/login', '/register'].includes(new URL(response.url()).pathname) || new URL(response.url()).pathname.startsWith('/api/')) {
        attempt.responses.push({ t: Date.now(), method: response.request().method(), status: response.status(),
          route: routeClass(response.url()), resourceType: response.request().resourceType(),
          documentNavigation: response.request().isNavigationRequest() });
      }
    });
    page.on('console', message => {
      if (!['warning', 'error'].includes(message.type())) return;
      const text = message.text();
      attempt.warnings.push({ type: message.type(), category: /hydrat|did not match|server rendered/i.test(text) ? 'hydration' : /image|aspect|width|height/i.test(text) ? 'image' : 'other' });
    });
    page.on('pageerror', error => attempt.errors.push({ category: /hydrat/i.test(error.message) ? 'hydration' : 'page-error' }));
    try {
      const response = await page.goto(`${origin}/login`);
      if (response?.status() !== 200) throw new Error('LOGIN_DOCUMENT_NOT_200');
      await page.getByLabel('E-mail', { exact: true }).waitFor({ state: 'visible' });
      await page.waitForFunction(() => !document.querySelector('#email')?.disabled);
      await page.addStyleTag({ content: 'html { font-size:200% !important; }' });
      attempt.beforeSettle = await page.evaluate(sample);
      const start = performance.now();
      await guarded(page.evaluate(settleTransitions));
      attempt.settleMs = Math.round(performance.now() - start);
      attempt.afterSettle = await page.evaluate(sample);
      if (attempt.afterSettle.font !== '32px') throw new Error('TEXT_SCALE_NOT_200');
      await page.locator('#email').focus();
      await page.evaluate(() => {
        const input = document.querySelector('#email');
        const observations = [];
        let last;
        let running = true;
        const read = phase => {
          const caret = getComputedStyle(input).caretColor === 'rgba(0, 0, 0, 0)' || getComputedStyle(input).caretColor === 'transparent' ? 'transparent' : 'visible-color';
          const inlineCaret = input.style.getPropertyValue('caret-color') === '' ? 'absent' : input.style.getPropertyValue('caret-color') === 'transparent' ? 'transparent' : 'other';
          const stylePresent = input.hasAttribute('style');
          const key = `${caret}:${inlineCaret}:${stylePresent}`;
          if (last !== key || phase !== 'frame') observations.push({ phase, caret, inlineCaret, stylePresent, focused: document.activeElement === input });
          last = key;
        };
        read('before');
        const observer = new MutationObserver(() => read('mutation'));
        observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] });
        const frame = () => { if (!running) return; read('frame'); requestAnimationFrame(frame); };
        requestAnimationFrame(frame);
        window.__navigationCaret = { observations, stop: () => { running = false; observer.disconnect(); read('after'); } };
      });
      if (caret !== 'none') await snapshot(page, `public-caret-${caret}.png`, caret);
      else await page.evaluate(() => new Promise(resolveFrame => requestAnimationFrame(() => requestAnimationFrame(resolveFrame))));
      attempt.caret = await page.evaluate(() => { window.__navigationCaret.stop(); return window.__navigationCaret.observations; });
      const input = page.locator('#email');
      attempt.control = await input.evaluate(node => {
        node.scrollIntoView({ block: 'center', behavior: 'instant' });
        const box = node.getBoundingClientRect();
        const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
        return { width: box.width, height: box.height, visible: box.top >= 0 && box.bottom <= innerHeight,
          hit: hit === node || node.contains(hit), focused: document.activeElement === node, disabled: node.disabled };
      });
      if (!attempt.control.visible || !attempt.control.hit || !attempt.control.focused || attempt.control.disabled) throw new Error('CONTROL_STATE_FAILED');
      await page.getByRole('link', { name: 'Cadastrar-se', exact: true }).click();
      await page.waitForURL('**/register', { timeout: 5000 });
      await page.goBack(); await page.waitForURL('**/login', { timeout: 5000 });
      await page.goForward(); await page.waitForURL('**/register', { timeout: 5000 });
      const reload = await page.reload();
      if (reload?.status() !== 200) throw new Error('RELOAD_DOCUMENT_NOT_200');
      if (attempt.responses.some(response => response.documentNavigation && response.status === 404)) throw new Error('DOCUMENT_404');
      if (attempt.errors.length) throw new Error('PAGE_ERROR');
      attempt.status = 'PASS';
    } catch (error) {
      attempt.status = 'FAIL';
      attempt.failure = Date.now() >= attemptDeadline ? 'ORIGINAL_90S_GUARD' :
        ['ORIGINAL_90S_GUARD', 'LOGIN_DOCUMENT_NOT_200', 'RELOAD_DOCUMENT_NOT_200', 'DOCUMENT_404', 'PAGE_ERROR', 'TEXT_SCALE_NOT_200', 'CONTROL_STATE_FAILED'].includes(error.message) ? error.message : 'ACTION_OR_ASSERTION_FAILED';
    } finally {
      clearTimeout(attemptGuard);
      attempt.endedUtc = new Date().toISOString();
      await context.close();
    }
  }
  for (const kind of ['finite-with-infinite', 'finite-cancelled']) {
    const context = await browser.newContext(); const page = await context.newPage();
    try {
      const proof = await guarded(page.evaluate(async ({ kind, helper }) => {
        // Explicitly synthetic document: no application markup or historical claim.
        document.body.replaceChildren(document.createElement('div'));
        const finite = document.body.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 30_000 });
        const infinite = kind === 'finite-with-infinite' ? document.body.animate([{ transform: 'none' }, { transform: 'translateX(1px)' }], { duration: 1000, iterations: Infinity }) : null;
        await finite.ready;
        let resolved = false;
        const waiting = (0, eval)(`(${helper})`)().then(() => { resolved = true; });
        await new Promise(resolveFrame => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
        const waitedForFinite = !resolved;
        if (kind === 'finite-cancelled') finite.cancel(); else finite.finish();
        await waiting;
        const ignoredInfinite = infinite ? infinite.playState === 'running' : null;
        infinite?.cancel();
        return { waitedForFinite, resolvedAfterBarrier: resolved, ignoredInfinite };
      }, { kind, helper: settleTransitions.toString() }));
      result.syntheticControls.push({ id: `C-ANIMATION-${kind}`, explicitlySynthetic: true, ...proof,
        status: proof.waitedForFinite && proof.resolvedAfterBarrier && proof.ignoredInfinite !== false ? 'PASS' : 'FAIL' });
    } finally { await context.close(); }
  }
  result.status = [...result.attempts, ...result.syntheticControls].every(attempt => attempt.status === 'PASS') ? 'PASS' : 'FAIL';
} catch (error) {
  result.status = 'BLOCKED';
  result.blocker = /executable doesn't exist/i.test(error.message) ? 'PLAYWRIGHT_BROWSER_ABSENT' :
    /SERVER_/.test(error.message) ? error.message : 'RUNTIME_SETUP_FAILED';
  await writeFile(resolve(privateDirectory, 'runtime-error.log'), String(error.stack));
} finally {
  await browser?.close();
  if (child.exitCode === null) {
    if (process.platform === 'win32') {
      // PID belongs to the child spawned above; never enumerate/kill other servers.
      const stop = spawn('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
      const stopExitCode = await new Promise(resolveStop => stop.once('close', resolveStop));
      result.serverCleanup = { method: 'owned-child-tree-only', stopExitCode };
    } else child.kill('SIGTERM');
  }
  await writeFile(resolve(privateDirectory, 'next.log'), serverOutput);
  result.endedUtc = new Date().toISOString();
  result.serverCleanup ??= { method: 'child-already-exited', exitCode: child.exitCode };
  const released = createServer();
  result.serverCleanup.portReleased = await new Promise(resolveReleased => {
    released.once('error', () => resolveReleased(false));
    released.listen(port, '127.0.0.1', () => released.close(() => resolveReleased(true)));
  });
  if (!result.serverCleanup.portReleased) { result.status = 'FAIL'; result.cleanupFailure = 'OWNED_PORT_NOT_RELEASED'; }
  await writeFile(resolve(evidence, 'results.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ id, status: result.status, blocker: result.blocker,
    attempts: result.attempts.map(attempt => ({ id: attempt.id, status: attempt.status, failure: attempt.failure })),
    syntheticControls: result.syntheticControls.map(control => ({ id: control.id, status: control.status })) }));
}
process.exitCode = result.status === 'PASS' ? 0 : 1;
}
await main().catch(async () => {
  const id = new Date().toISOString().replace(/[:.]/g, '-');
  const directory = resolve(process.cwd(), 'docs/releases/2026-10-23-hf-inv-local01/navigation', id);
  await mkdir(directory, { recursive: true });
  const receipt = { schemaVersion: 1, status: 'BLOCKED', blocker: 'UNEXPECTED_PREFLIGHT_FAILURE',
    capturedUtc: new Date().toISOString(), rawErrorPublished: false, runtimeState: 'UNCONFIRMED_CHECK_OWNED_RESOURCES' };
  await writeFile(resolve(directory, 'preflight.json'), JSON.stringify(receipt, null, 2) + '\n');
  console.error(JSON.stringify(receipt)); process.exitCode = 1;
});
