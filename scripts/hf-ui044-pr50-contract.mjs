import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

export const repository = 'HidroFlorestaStartup/HidroFlorestas-FullStack';
export const branch = 'fix/hf-ui044-ui06-b-residual-20261101';
export const ref = `refs/heads/${branch}`;
export const jobGuard = `github.repository == '${repository}' && github.ref == '${ref}' && github.event_name == 'push' && github.event.forced == false && github.event.deleted == false && github.run_attempt == 1`;
const fail = message => { throw new Error(message); };
export function assertRunnerContext(env, event) {
  for (const [key,value] of Object.entries({GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:repository,
    GITHUB_REF:ref,GITHUB_EVENT_NAME:'push',GITHUB_RUN_ATTEMPT:'1',RUNNER_OS:'Windows',RUNNER_ENVIRONMENT:'github-hosted'})) {
    if (env[key] !== value) fail(`Rejected runner context: ${key}`);
  }
  if (event?.forced !== false || event?.deleted !== false || event?.ref !== ref || event?.repository?.full_name !== repository)
    fail('Rejected forced/deleted or mismatched push payload.');
  if (!/^[a-f0-9]{40}$/.test(env.GITHUB_SHA ?? '') || event.after !== env.GITHUB_SHA || !/^\d+$/.test(env.GITHUB_RUN_ID ?? ''))
    fail('Push/SHA/run provenance mismatch.');
}
export function validateWorkflow(workflow) {
  const ids = ['b-focal-3','b-complete-75','rc-final'];
  if (JSON.stringify(workflow.on) !== JSON.stringify({push:{branches:[branch]}})) fail('Only exact branch push is authorized.');
  if (JSON.stringify(workflow.permissions) !== JSON.stringify({contents:'read'})) fail('Permissions must be contents read only.');
  if (workflow.concurrency?.['cancel-in-progress'] !== false) fail('Do not cancel an owned evidence run.');
  if (Object.keys(workflow.jobs ?? {}).join() !== ids.join()) fail('Exactly three authorized jobs required.');
  for (const [index,id] of ids.entries()) {
    const job = workflow.jobs[id];
    if (job.if?.replace(/\s+/g,' ').trim() !== jobGuard) fail(`Unsafe job guard: ${id}`);
    if (job['runs-on'] !== 'windows-latest' || job['timeout-minutes'] !== [20,35,35][index]) fail(`Runner budget differs: ${id}`);
    if (JSON.stringify(job.needs ?? null) !== JSON.stringify(index ? ids[index-1] : null)) fail(`Sequential dependency missing: ${id}`);
    if (job.defaults?.run?.shell !== 'pwsh' || job.defaults?.run?.['working-directory'] !== 'fullstack') fail('Root or shell drift.');
    if (job.env?.HF_REVERSE_GEOCODER_URL !== '' || job.env?.NEXT_PUBLIC_MAP_TILE_URL !== 'https://127.0.0.1:1/{z}/{x}/{y}.png') fail('Real provider configuration prohibited.');
    const pins = new Set(['actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803','actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38','actions/upload-artifact@b7c566a772e6b6bfb58ed0dc250532a479d7789f']);
    for (const step of job.steps) {
      if (step.uses && !pins.has(step.uses)) fail('Action must use existing reviewed SHA pin.');
      if (step['continue-on-error']) fail('Gate failures must propagate.');
      if (step.uses?.startsWith('actions/checkout@') && step.with?.['persist-credentials'] !== false) fail('Checkout credentials must not persist.');
      if (step.uses?.startsWith('actions/setup-node@') && step.with?.['node-version'] !== '24.19.0') fail('Wrong Node pin.');
    }
    const runs = job.steps.map(step=>step.run ?? '').join('\n');
    if (!runs.includes('node scripts/hf-ui044-pr50-contract.mjs --runner') || !runs.includes('node scripts/hf-ui044-pr50-contract.mjs --check')) fail('Missing preflight.');
    if (index < 2 && (!runs.includes(`./scripts/hf-ui06-visual.ps1 -Suite domain -CaseSet ${index ? 'complete-75':'focal-3'}`) || !runs.includes('bun@1.3.11'))) fail('Case selection or Bun pin missing.');
    if (index === 2 && (!runs.includes('./scripts/rc-review-validation.ps1 -InitializeCiCluster') || !runs.includes('node scripts/hf-ui044-verify.mjs'))) fail('Official RC or post-suite UI037 check missing.');
    const uploads = job.steps.filter(step=>step.uses?.startsWith('actions/upload-artifact@'));
    if (uploads.length !== 1 || uploads[0].if !== 'always()') fail('Synthetic evidence must survive failure.');
    const upload = uploads[0].with;
    if (upload['retention-days'] !== 14 || upload['if-no-files-found'] !== 'error' || upload['include-hidden-files'] !== true) fail('Artifact retention or presence check drift.');
    const paths = upload.path.trim().split(/\s+/);
    for (const path of paths) {
      if (!path.startsWith('fullstack/.accounts-validation/') && !path.startsWith('fullstack/test-results/')) fail('Artifact outside synthetic allowlist.');
      if (!/\.(?:png|json|jsonl|log)$/.test(path) || /\.\.\//.test(path)) fail('Artifact is not an allowlisted evidence extension.');
    }
    if (index < 2 && paths.some(path=>!path.startsWith(`fullstack/.accounts-validation/ui06-b-${index ? 'complete-75':'focal-3'}/`))) fail('Focal and full artifacts must be isolated.');
  }
}
export function checkFiles(root = process.cwd()) {
  const config = JSON.parse(readFileSync(join(root,'vercel.json'),'utf8'));
  if (config.git?.deploymentEnabled?.[branch] !== false) fail('Preview must be false for the exact branch.');
  const ps = readFileSync(join(root,'scripts/hf-ui06-visual.ps1'),'utf8');
  const gate = readFileSync(join(root,'qa/hf-ui044/runner-gate.ts'),'utf8');
  const fixture = readFileSync(join(root,'qa/hf-ui044/domain-fixtures.ts'),'utf8');
  if (!ps.includes('hf-ui044-pr50-contract.mjs') || !ps.includes("$env:HF_UI044_PUSH_GUARD='PASS'") || !ps.includes('$env:HF_UI044_CASE_SET=$CaseSet')) fail('Script is not linked to exact event and case guards.');
  if (!gate.includes(`'${ref}'`) || !gate.includes("env.HF_UI044_PUSH_GUARD === 'PASS'")) fail('Runner does not attest approved push.');
  if (fixture.indexOf('isApprovedFreshWindowsRunner(process.env)') < 0 || fixture.indexOf('isApprovedFreshWindowsRunner(process.env)') > fixture.indexOf('countAuthFixtureUsers(process.env)')) fail('Fixture guard must precede database inspection.');
}
export function verifyPrivateEnvironment(root, env) {
  if (existsSync(join(root,'.vercel')) || readdirSync(root).some(name=>name.startsWith('.env') && !name.endsWith('.example'))) fail('Private root configuration prohibited.');
  const prohibited = ['DATABASE_URL','TEST_DATABASE_URL','DIRECT_URL','POSTGRES_URL','PGHOST','PGPORT','PGDATABASE','PGUSER','PGPASSWORD','JWT_SECRET','SMTP_HOST','SMTP_USER','SMTP_APP_PASSWORD','MAIL_FROM','CLOUDINARY_URL','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET','ACCOUNT_REQUEST_KEY','ACCOUNT_PROOF_KEYS','MAIL_PAYLOAD_ENCRYPTION_KEYS','MAIL_IDEMPOTENCY_KEY','MAIL_WORKER_SECRET','DOTENV_CONFIG_PATH','HF_UI044_PUSH_GUARD'];
  for (const name of prohibited) if (Object.hasOwn(env,name)) fail(`Inherited private application configuration prohibited: ${name}`);
  if (env.HF_REVERSE_GEOCODER_URL) fail('Real geocoder configuration prohibited.');
}
export function runnerPreflight(root = process.cwd(), env = process.env) {
  if (!env.GITHUB_EVENT_PATH) fail('GitHub push payload path is required.');
  assertRunnerContext(env,JSON.parse(readFileSync(env.GITHUB_EVENT_PATH,'utf8')));
  const git = args=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
  if (resolve(git(['rev-parse','--show-toplevel'])).toLowerCase() !== resolve(root).toLowerCase() || git(['rev-parse','HEAD']) !== env.GITHUB_SHA) fail('Checked-out root/SHA differs from event.');
  execFileSync('git',['diff','--exit-code','--quiet'],{cwd:root});
  execFileSync('git',['diff','--cached','--exit-code','--quiet'],{cwd:root});
  verifyPrivateEnvironment(root,env);
  checkFiles(root);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv[2] === '--runner') runnerPreflight();
  else if (process.argv[2] === '--check') {
    const require = createRequire(import.meta.url);
    const workflow = require('yaml').parse(readFileSync('.github/workflows/hf-ui044-pr50-final.yml','utf8'));
    validateWorkflow(workflow); checkFiles();
  } else fail('Use --runner or --check.');
  console.log('HF UI044 PR50 contract PASS.');
}
