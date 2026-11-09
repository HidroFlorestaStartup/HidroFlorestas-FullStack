import type { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

export default class ClosedReporter implements Reporter {
  private rows: Array<{ file: string; title: string; status: string; durationMs: number; retry: number }> = [];
  private provenance: unknown;
  onBegin() {
    const git = (...args: string[]) => execFileSync('git', ['-c', `safe.directory=${process.cwd()}`, ...args], { windowsHide: true });
    const paths = ['tests/investigations/navigation/authenticated.config.ts', 'tests/investigations/navigation/authenticated.spec.ts',
      'tests/investigations/navigation/closed-reporter.ts', 'tests/investigations/navigation/run-authenticated.ps1',
      'tests/e2e/frontend-territorial-map.spec.ts', 'tests/e2e/territorial-map.spec.ts', 'tests/e2e/support/frontend-mission-evidence.ts'];
    this.provenance = { head: git('rev-parse', 'HEAD').toString().trim(), tree: git('rev-parse', 'HEAD^{tree}').toString().trim(),
      trackedPatchSha256: createHash('sha256').update(git('diff', 'HEAD')).digest('hex'),
      sources: paths.map(path => { const bytes = readFileSync(path); return { path, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }; }),
      applicationDelta: 'none', untrackedInvestigationFiles: true };
  }
  onTestEnd(test: TestCase, result: TestResult) {
    this.rows.push({ file: relative(process.cwd(), test.location.file).replaceAll('\\', '/'),
      title: test.title, status: result.status, durationMs: result.duration, retry: result.retry });
  }
  onEnd(result: FullResult) {
    const directory = resolve(process.cwd(), '.accounts-validation/navigation-auth-results-closed');
    mkdirSync(directory, { recursive: true });
    writeFileSync(resolve(directory, 'results.json'), JSON.stringify({
      protocol: 'C-AUTH-1', status: result.status, startedUtc: result.startTime.toISOString(), durationMs: result.duration,
      provenance: this.provenance,
      tests: this.rows, rawErrorsPublished: false, configEnvironmentPublished: false,
    }, null, 2) + '\n');
  }
}
