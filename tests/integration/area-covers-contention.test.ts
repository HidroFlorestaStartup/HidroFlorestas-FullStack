// Four operations, two active writers per wave. This schedule is deliberately
// distinguished from the historical two-request incident, whose cause is unknown.
import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import type { Prisma } from "../../src/generated/prisma";
import { AreaCoverService } from "../../src/app/api/server/images/service";
import { FakeCoverProvider } from "../fixtures/area-cover-provider";
import { selectedImp006DatabaseVariable, withImp006PostgresqlSchema } from "../fixtures/postgresql-schema-lifecycle";
import { setupIHFRDiagnosisFixtures } from "../fixtures/ihfr-diagnosis-fixtures";
import { IHFR_ACTORS as A, IHFR_LABORATORIES as L } from "../fixtures/ihfr-diagnosis-actors";
import { IHFR_CONTEXTS as C } from "../fixtures/ihfr-diagnosis-contexts";

function barrier() {
  let enter!: () => void, release!: () => void;
  const entered = new Promise<void>(resolve => { enter = resolve; });
  const waiting = new Promise<void>(resolve => { release = resolve; });
  return { entered, release, wait: async () => { enter(); await waiting; } };
}

for (const conflictPoint of ["commit", "write"] as const)
test(`three real Serializable ${conflictPoint} conflicts resolve the resulting hourly quota`, () =>
  withImp006PostgresqlSchema(selectedImp006DatabaseVariable(), async (client, db) => {
    await setupIHFRDiagnosisFixtures(client);
    let now = new Date("2026-10-10T12:00:00Z");
    const clock = () => now, provider = new FakeCoverProvider();
    const ids = { laboratoryId: L.active, areaId: C.activeArea };
    const command = () => ({ expectedRevision: 0, key: randomUUID() });
    const service = new AreaCoverService(db, () => provider, clock, () => true);
    for (let i = 0; i < 7; i++) {
      await service.initiate(A.owner, ids, command());
      now = new Date(now.getTime() + 4 * 60_000);
    }
    now = new Date(now.getTime() + 11 * 60_000);
    const gates = [barrier(), barrier(), barrier()];
    const events: Array<Record<string, unknown>> = [];
    let phase = 0;
    const traced = new Proxy(db, { get: (target, key) => key === "$transaction" ?
      async (run: (tx: Prisma.TransactionClient) => Promise<unknown>, options: { isolationLevel: "Serializable"; maxWait: number; timeout: number }) => {
        const current = ++phase;
        events.push({ operation: "victim", phase: current, event: "begin" });
        try {
          const value = await db.$transaction(async tx => {
            const controlled = current >= 2 && current <= 4;
            const stop = async () => {
              const snapshot = await tx.$queryRawUnsafe("SELECT txid_current()::text AS tx, pg_current_snapshot()::text AS snapshot, pg_backend_pid() AS pid");
              events.push({ operation: "victim", phase: current, event: `before-${conflictPoint}`, snapshot });
              await gates[current - 2].wait();
            };
            const view = controlled && conflictPoint === "write" ? new Proxy(tx, { get: (target, key) => key === "coverUploadAttempt" ?
              new Proxy(tx.coverUploadAttempt, { get: (delegate, key) => key === "create" ? async (args: Prisma.CoverUploadAttemptCreateArgs) => {
                await stop();return tx.coverUploadAttempt.create(args);
              } : Reflect.get(delegate, key, delegate) }) : Reflect.get(target, key, target) }) : tx;
            const value = await run(view);
            if (controlled && conflictPoint === "commit") await stop();
            return value;
          }, options);
          events.push({ operation: "victim", phase: current, event: "commit" });
          return value;
        } catch (error) {
          const row = error as { name?: string; code?: string; cause?: { originalCode?: string }; meta?: { driverAdapterError?: { cause?: { originalCode?: string } } } };
          events.push({ operation: "victim", phase: current, event: "error", name: row.name, code: row.code, sqlstate: row.cause?.originalCode ?? row.meta?.driverAdapterError?.cause?.originalCode });
          throw error;
        }
      } : Reflect.get(target, key, target) });
    const victim = new AreaCoverService(traced, () => provider, clock, () => true, async () => {});
    const result = Promise.allSettled([victim.initiate(A.owner, ids, command())]);
    try {
      for (let i = 0; i < 3; i++) {
        await Promise.race([gates[i].entered, result.then(() => { throw new Error("Victim terminated before its controlled wave"); })]);
        await service.initiate(A.owner, ids, command());
        events.push({ operation: `competitor-${i + 1}`, event: "commit" });
        gates[i].release();
      }
    } finally {
      for (const gate of gates) gate.release();
      await result;
      console.log(JSON.stringify({ events, attempts: await db.coverUploadAttempt.count(), jobs: await db.coverCleanupJob.count() }));
    }
    const [outcome] = await result;
    assert.equal(await db.coverUploadAttempt.count(), 10);
    assert.equal(await db.coverCleanupJob.count(), 40);
    const conflicts = events.filter(event => event.event === "error" && event.sqlstate === "40001");
    assert.equal(conflicts.length, 3);
    if (conflictPoint === "write") assert.ok(conflicts.every(event => event.code === "P2034"));
    assert.equal(outcome.status, "rejected");
    if (outcome.status === "rejected") assert.equal(outcome.reason.code, "RATE_LIMITED");
    assert.equal(phase, 5, "three writes plus one final eligibility read after the preflight");
  }),
);
