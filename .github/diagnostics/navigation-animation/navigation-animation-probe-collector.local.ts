import { execFileSync, spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import dotenv from "dotenv";
import { mailSnapshotFingerprint, redactMailValidation } from "./mail-validation-diagnostics";

async function main() {
  if (process.platform !== "win32" || process.env.ACCOUNTS_LOCAL_POSTGRESQL !== "1" ||
      process.env.IMP006_LOCAL_POSTGRESQL !== "1") {
    throw new Error("The diagnostic requires the existing owned Windows PostgreSQL harness.");
  }
  dotenv.config({ path: process.env.DOTENV_CONFIG_PATH ?? ".env", quiet: true, override: false });
  const outputRoot = ".accounts-validation";
  await mkdir(outputRoot, { recursive: true });
  const outputFile = join(outputRoot, "navigation-animation-probe.log");
  const output = createWriteStream(outputFile);
  const startedUtc = new Date().toISOString();
  const snapshot = await mailSnapshotFingerprint();
  const sourceHead = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  if (!/^[0-9a-f]{40}$/.test(sourceHead)) throw new Error("Invalid checkout commit.");
  const args = [
    "node_modules/@playwright/test/cli.js", "test",
    "--reporter=line",
  ];
  process.stdout.write("DIAGNOSTIC SCOPE: the complete 220-test E2E selection after the nine official preceding gates; all original test timeouts preserved.\n");
  const env = { ...process.env };
  const child = spawn(process.execPath, args, { env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  for (const stream of [child.stdout, child.stderr]) {
    let pending = "";
    stream.setEncoding("utf8");
    stream.on("data", (chunk: string) => {
      pending += chunk;
      if (pending.length > 1_048_576) {
        child.kill(); pending = "";
        output.write("Output line too large; diagnostic collector stopped child.\n");
        return;
      }
      const lines = pending.split("\n"); pending = lines.pop() ?? "";
      for (const line of lines) output.write(redactMailValidation(line, env) + "\n");
    });
    stream.on("end", () => { if (pending) output.write(redactMailValidation(pending, env)); });
  }
  const testExitCode = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", code => resolve(code ?? 1));
  });
  await new Promise<void>(resolve => output.end(resolve));
  const log = await readFile(outputFile, "utf8");
  const selections = [...log.matchAll(/Running (\d+) tests? using (\d+) workers?/g)];
  const selectedTests = selections.length === 1 ? Number(selections[0][1]) : null;
  const selectedWorkers = selections.length === 1 ? Number(selections[0][2]) : null;
  const selectionVerified = selectedTests === 220 && selectedWorkers === 1;
  const exitCode = testExitCode !== 0 ? testExitCode : selectionVerified ? 0 : 1;
  const record = {
    kind: "DIAGNOSTIC_PROBE", officialGate: false, allReleaseGates: false,
    command: "node " + args.join(" "), sourceHead, snapshot,
    startedUtc, endedUtc: new Date().toISOString(),
    expectedTests: 220, expectedWorkers: 1, selectedTests, selectedWorkers, selectionVerified,
    testExitCode, exitCode, result: exitCode === 0 ? "PASS" : "FAIL",
    environment: "Windows/Node24.19/owned-loopback-PostgreSQL17",
    log: outputFile,
    note: "Complete E2E selection after RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck and Lint, with unchanged R2/navigation observation and original test timeouts; diagnostic execution, not an official E2E gate or 15-gate release validation.",
  };
  await writeFile(join(outputRoot, "navigation-animation-probe-result.json"), JSON.stringify(record, null, 2) + "\n");
  process.stdout.write(JSON.stringify(record) + "\n");
  const lines = log.trimEnd().split(/\r?\n/);
  process.stdout.write(lines.slice(-18).join("\n") + "\n");
  process.exitCode = exitCode;
}
void main().catch(() => {
  process.stderr.write("Navigation diagnostic failed without disclosing environment.\n");
  process.exitCode = 1;
});
