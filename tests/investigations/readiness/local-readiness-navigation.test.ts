import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmdirSync, unlinkSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { coordinateNavigationAndResponse } from "../../../scripts/local-readiness-navigation";

const root = resolve(".accounts-validation");
const fixture = "tests/investigations/readiness/fixtures/navigation-failure-child.ts";

function subprocess(implementation: "legacy" | "fixed", scenario: string, check: (result: ReturnType<typeof spawnSync>, directory: string) => void) {
  mkdirSync(root, { recursive: true });
  const directory = mkdtempSync(join(root, "nav-rejection-"));
  const env = { ...Object.fromEntries(["PATH", "SystemRoot", "WINDIR", "TEMP", "TMP"].flatMap(name => process.env[name] ? [[name, process.env[name]]] : [])), NODE_ENV: "test" as const };
  try {
    const result = spawnSync(process.execPath, ["--unhandled-rejections=strict", "--import=tsx", fixture, implementation, scenario, directory],
      { cwd: process.cwd(), env, encoding: "utf8", windowsHide: true, timeout: 5000, maxBuffer: 256 * 1024 });
    assert.equal(result.error, undefined, "subprocess must start and finish within its finite timeout");
    check(result, directory);
  } finally {
    // Only the two fixed files under this fresh owned directory; no recursive deletion.
    assert.equal(dirname(resolve(directory)), root);
    assert.ok(basename(directory).startsWith("nav-rejection-"));
    for (const name of ["resource.marker", "result.json"]) if (existsSync(join(directory, name))) unlinkSync(join(directory, name));
    rmdirSync(directory);
  }
}

for (const scenario of ["waiter-late", "finished-late"]) {
  test(`strict negative control: legacy ${scenario} terminates before cleanup and receipt`, () => {
    subprocess("legacy", scenario, (result, directory) => {
      assert.equal(result.status, 1);
      assert.match(String(result.stderr), new RegExp(scenario === "waiter-late" ? "WAITER_FAILURE" : "FINISHED_FAILURE"));
      assert.ok(existsSync(join(directory, "resource.marker")));
      assert.equal(existsSync(join(directory, "result.json")), false);
    });
  });
}

const failures = [
  ["waiter-late", "NAVIGATION_FAILURE"],
  ["finished-late", "NAVIGATION_FAILURE"],
  ["navigation-sync", "NAVIGATION_SYNC_FAILURE"],
  ["response-sync", "RESPONSE_SYNC_FAILURE"],
  ["response-first", "WAITER_FAILURE"],
  ["finished-first", "FINISHED_FAILURE"],
];
for (const [scenario, causalError] of failures) {
  test(`strict helper regression: ${scenario} preserves causal error, cleanup and receipt`, () => {
    subprocess("fixed", scenario, (result, directory) => {
      assert.equal(result.status, 0, "late branch rejection must remain handled throughout finalization");
      assert.equal(String(result.stderr), "");
      assert.equal(existsSync(join(directory, "resource.marker")), false);
      const receipt = JSON.parse(readFileSync(join(directory, "result.json"), "utf8"));
      assert.deepEqual(receipt, { synthetic: true, scenario, result: "FAIL", causalError, cleanupCompleted: true, receiptWritten: true });
    });
  });
}

test("helper registers response before navigation, returns its typed value and waits for both", async () => {
  const events: string[] = [];
  const value = { ended: 17, payload: "synthetic response" };
  const actual = await coordinateNavigationAndResponse(
    () => { events.push("response registered"); return Promise.resolve(value); },
    async () => { events.push("navigation started"); await delay(5); events.push("navigation finished"); },
  );
  assert.equal(actual, value);
  assert.deepEqual(events, ["response registered", "navigation started", "navigation finished"]);
});
