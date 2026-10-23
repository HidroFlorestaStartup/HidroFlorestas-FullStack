import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Installation only. Never load dotenv or forward application credentials.
const root = process.cwd();
const installationId = new Date().toISOString().replace(/[:.]/g, '-');
const privateDirectory = resolve(root, '.accounts-validation/navigation-install', installationId);
await mkdir(privateDirectory, { recursive: true });
const userConfig = resolve(privateDirectory, 'empty.npmrc');
await writeFile(userConfig, '');
const inherited = ['PATH', 'Path', 'SystemRoot', 'SYSTEMROOT', 'WINDIR', 'ComSpec', 'COMSPEC',
  'PATHEXT', 'TEMP', 'TMP', 'SYSTEMDRIVE', 'ProgramFiles', 'ProgramFiles(x86)'];
const environment = Object.fromEntries(inherited.flatMap(key =>
  process.env[key] === undefined ? [] : [[key, process.env[key]]]));
Object.assign(environment, {
  npm_config_userconfig: userConfig,
  npm_config_cache: process.env.HF_INV_NAV_NPM_CACHE ?? resolve(root, '.accounts-validation/navigation-install/cache'),
  npm_config_audit: 'false', npm_config_fund: 'false',
});
const generate = process.argv.includes('--generate');
const child = spawn(generate ? process.execPath : environment.ComSpec ?? environment.COMSPEC ?? 'cmd.exe',
  generate ? [resolve(root, 'node_modules/prisma/build/index.js'), 'generate'] :
    ['/d', '/s', '/c', `npm.cmd ci --no-audit --no-fund${process.argv.includes('--offline') ? ' --offline' : ''}`], {
    cwd: root, env: environment, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
let stdout = '', stderr = '';
child.stdout.on('data', value => { stdout += value; });
child.stderr.on('data', value => { stderr += value; });
const exitCode = await new Promise((resolveExit, reject) => {
  child.once('error', reject); child.once('close', resolveExit);
});
await writeFile(resolve(privateDirectory, 'stdout.log'), stdout);
await writeFile(resolve(privateDirectory, 'stderr.log'), stderr);
console.log(JSON.stringify({ action: generate ? 'prisma-generate-no-database' : 'npm-ci', installationId, exitCode,
  stdoutBytes: Buffer.byteLength(stdout), stderrBytes: Buffer.byteLength(stderr),
  rawOutputPublished: false, environment: 'system-allowlist-no-app-config' }));
process.exitCode = typeof exitCode === 'number' ? exitCode : 1;
