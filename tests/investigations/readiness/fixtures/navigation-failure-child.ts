/** Synthetic failure lifecycle only: no browser, server, database or network. */
import { existsSync, lstatSync, realpathSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { coordinateNavigationAndResponse } from "../../../../scripts/local-readiness-navigation";

const [implementation, scenario, directory] = process.argv.slice(2);
const scenarios = ["waiter-late", "finished-late", "navigation-sync", "response-sync", "response-first", "finished-first"];
if (!["legacy", "fixed"].includes(implementation) || !scenarios.includes(scenario) || !directory ||
    dirname(resolve(directory)) !== resolve(".accounts-validation") || !basename(directory).startsWith("nav-rejection-") ||
    lstatSync(directory).isSymbolicLink() || realpathSync(directory).toLowerCase() !== resolve(directory).toLowerCase()) {
  throw new Error("SYNTHETIC_FIXTURE_ARGUMENTS_REFUSED");
}
const resource = join(directory, "resource.marker");
const receiptFile = join(directory, "result.json");
if (existsSync(resource) || existsSync(receiptFile)) throw new Error("SYNTHETIC_FIXTURE_NOT_FRESH");
writeFileSync(resource, "synthetic resource owned by this subprocess\n");
const lateRejects: Array<() => void> = [];
const pending = (code: string) => new Promise<never>((_resolve, reject) => lateRejects.push(() => reject(new Error(code))));
const receipt = { synthetic: true, scenario, result: "FAIL", causalError: "NOT_CAPTURED", cleanupCompleted: false, receiptWritten: false };

function startResponse() {
  if (scenario === "response-sync") throw new Error("RESPONSE_SYNC_FAILURE");
  const response = scenario === "response-first" ? Promise.reject(new Error("WAITER_FAILURE")) :
    ["waiter-late", "navigation-sync"].includes(scenario) ? pending("WAITER_FAILURE") :
      Promise.resolve({ finished: () => scenario === "finished-first" ? Promise.reject(new Error("FINISHED_FAILURE")) : pending("FINISHED_FAILURE") });
  // This fulfilled callback has its own asynchronous rejection boundary.
  return response.then(async value => { await value.finished(); return { syntheticResponse: true }; });
}

function startNavigation() {
  if (scenario === "navigation-sync") throw new Error("NAVIGATION_SYNC_FAILURE");
  return ["waiter-late", "finished-late"].includes(scenario) ? Promise.reject(new Error("NAVIGATION_FAILURE")) : pending("NAVIGATION_LATE_FAILURE");
}

async function run() {
  try {
    if (implementation === "legacy") {
      // Equivalent to the reviewed runner before the fix, retained as a negative control.
      const incoming = startResponse();
      await startNavigation();
      await incoming;
    } else {
      await coordinateNavigationAndResponse(startResponse, startNavigation);
    }
  } catch (error) {
    receipt.causalError = error instanceof Error ? error.message : "UNEXPECTED_FAILURE";
  } finally {
    // Reject the other branch while asynchronous finalization is in progress.
    for (const rejectLate of lateRejects) queueMicrotask(rejectLate);
    await delay(30);
    unlinkSync(resource);
    receipt.cleanupCompleted = true;
    receipt.receiptWritten = true;
    writeFileSync(receiptFile, JSON.stringify(receipt));
    process.stdout.write(JSON.stringify(receipt) + "\n");
  }
}

void run().catch(() => { process.stderr.write("SYNTHETIC_FINALIZATION_FAILED\n"); process.exitCode = 1; });
