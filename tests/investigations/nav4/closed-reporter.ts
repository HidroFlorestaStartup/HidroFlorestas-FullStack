import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Closed projection: never serialize config/env/errors/stdout/attachments. */
export default class ClosedNav4Reporter implements Reporter {
  private readonly cases: Array<{ title: string; status: string; durationMs: number; retry: number }> = [];
  onTestEnd(test: TestCase, result: TestResult) {
    this.cases.push({ title: test.title, status: result.status, durationMs: result.duration, retry: result.retry });
  }
  onEnd(result: FullResult) {
    const directory = join(process.cwd(), "docs/releases/2026-10-23-hf-inv-local01/nav4");
    mkdirSync(directory, { recursive: true });
    const value = { protocolVersion: 1, endedUtc: new Date().toISOString(), status: result.status, cases: this.cases };
    writeFileSync(join(directory, "navigation-results.json"), JSON.stringify(value, null, 2) + "\n");
  }
}
