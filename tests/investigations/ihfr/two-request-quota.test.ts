// Investigative schedules: exactly two new initiate calls, one winner per schedule.
// This is separate from Spec022's four operations in three waves.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import type { Prisma } from "../../../src/generated/prisma";
import { AreaCoverService } from "../../../src/app/api/server/images/service";
import { FakeCoverProvider } from "../../fixtures/area-cover-provider";
import { selectedImp006DatabaseVariable, withImp006PostgresqlSchema } from "../../fixtures/postgresql-schema-lifecycle";
import { setupIHFRDiagnosisFixtures } from "../../fixtures/ihfr-diagnosis-fixtures";
import { IHFR_ACTORS } from "../../fixtures/ihfr-diagnosis-actors";
import { IHFR_LABORATORIES } from "../../fixtures/ihfr-diagnosis-actors";
import { IHFR_CONTEXTS } from "../../fixtures/ihfr-diagnosis-contexts";

function barrier() {
  let arrive!: () => void;
  let release!: () => void;
  const entered = new Promise<void>(resolve => { arrive = resolve; });
  const gate = new Promise<void>(resolve => { release = resolve; });
  return { entered, release, wait: async () => { arrive(); await gate; } };
}

function errorCodes(error: unknown) {
  const value = error as { name?: string; code?: string; cause?: { originalCode?: string }; meta?: { driverAdapterError?: { cause?: { originalCode?: string } } } };
  return { name: value.name, code: value.code, sqlstate: value.cause?.originalCode ?? value.meta?.driverAdapterError?.cause?.originalCode };
}

for (const winner of ["A", "B"] as const) {
  test(`HF-INV-002 two calls: ${winner} commits before the other INSERT`, { timeout: 90_000 }, () =>
    withImp006PostgresqlSchema(selectedImp006DatabaseVariable(), async (client, db) => {
      await setupIHFRDiagnosisFixtures(client);
      let now = new Date("2026-10-10T12:00:00Z");
      const provider = new FakeCoverProvider();
      const ids = { laboratoryId: IHFR_LABORATORIES.active, areaId: IHFR_CONTEXTS.activeArea };
      const command = () => ({ expectedRevision: 0, key: randomUUID() });
      const setup = new AreaCoverService(db, () => provider, () => now, () => true);
      for (let i = 0; i < 9; i++) {
        await setup.initiate(IHFR_ACTORS.owner, ids, command());
        now = new Date(now.getTime() + 4 * 60_000);
      }
      now = new Date(now.getTime() + 11 * 60_000);
      const before = { attempts: await db.coverUploadAttempt.count(), jobs: await db.coverCleanupJob.count() };
      assert.deepEqual(before, { attempts: 9, jobs: 36 });
      const gates = { A: barrier(), B: barrier() };
      const events: Array<Record<string, unknown>> = [];
      const phases = { A: 0, B: 0 };
      const traced = (operation: "A" | "B") => new Proxy(db, {
        get: (target, property) => property === "$transaction" ?
          async (run: (tx: Prisma.TransactionClient) => Promise<unknown>, options: { isolationLevel: "Serializable"; maxWait: number; timeout: number }) => {
            const phase = ++phases[operation];
            events.push({ operation, phase, event: "begin" });
            try {
              const value = await db.$transaction(async tx => {
                const controlled = phase === 2 ? new Proxy(tx, {
                  get: (transaction, key) => key === "coverUploadAttempt" ? new Proxy(tx.coverUploadAttempt, {
                    get: (delegate, method) => method === "create" ? async (args: Prisma.CoverUploadAttemptCreateArgs) => {
                      const snapshot = await tx.$queryRawUnsafe<Array<{ tx: string; snapshot: string }>>("SELECT txid_current()::text AS tx, pg_current_snapshot()::text AS snapshot");
                      events.push({ operation, phase, event: "before-insert", snapshot: snapshot[0] });
                      await gates[operation].wait();
                      return tx.coverUploadAttempt.create(args);
                    } : Reflect.get(delegate, method, delegate),
                  }) : Reflect.get(transaction, key, transaction),
                }) : tx;
                return run(controlled);
              }, options);
              events.push({ operation, phase, event: "commit" });
              return value;
            } catch (error) {
              events.push({ operation, phase, event: "error", ...errorCodes(error) });
              throw error;
            }
          } : Reflect.get(target, property, target),
      });
      const services = {
        A: new AreaCoverService(traced("A"), () => provider, () => now, () => true),
        B: new AreaCoverService(traced("B"), () => provider, () => now, () => true),
      };
      const pending = {
        A: services.A.initiate(IHFR_ACTORS.owner, ids, command()),
        B: services.B.initiate(IHFR_ACTORS.owner, ids, command()),
      };
      const settled = Promise.allSettled([pending.A, pending.B]);
      try {
        await Promise.race([
          Promise.all([gates.A.entered, gates.B.entered]),
          settled.then(() => { throw new Error("Both operations terminated before the INSERT barriers"); }),
          ...Object.values(pending).map(promise => promise.then(() => { throw new Error("Operation committed before its INSERT barrier"); })),
        ]);
        gates[winner].release();
        await pending[winner];
        events.push({ operation: winner, event: "winner-observed-committed" });
      } finally {
        gates.A.release();
        gates.B.release();
        await settled;
      }
      const results = await settled;
      const after = { attempts: await db.coverUploadAttempt.count(), jobs: await db.coverCleanupJob.count() };
      const projection = {
        experiment: "INV-002/two-calls/v1", winner, newCalls: 2, before, after,
        outcomes: results.map((result, index) => ({ operation: index ? "B" : "A", status: result.status, ...(result.status === "rejected" ? { code: result.reason.code } : {}) })),
        events,
      };
      console.log(JSON.stringify(projection));
      assert.deepEqual(after, { attempts: 10, jobs: 40 });
      assert.equal(results[winner === "A" ? 0 : 1].status, "fulfilled");
      const rejected = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");
      assert.equal(rejected.length, 1);
      assert.equal(rejected[0].reason.code, "RATE_LIMITED");
      assert.equal(events.filter(event => event.sqlstate === "40001").length, 1);
      assert.ok(events.some(event => event.event === "winner-observed-committed"));
    }),
  );
}
