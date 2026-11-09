import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { handleMailTrigger } from '../../../src/app/api/server/mail/trigger.ts';
import { createLocalSchedule } from './local-scheduler-harness.mjs';

async function fixture(run) {
  const secret = randomBytes(32).toString('base64url');
  const active = new Set();
  let origin;
  let closed = false;
  const server = createServer(async (request, response) => {
    try {
      if (request.url?.split('?')[0] !== '/api/internal/mail/process') {
        response.writeHead(404); response.end(); return;
      }
      const chunks = [];
      let size = 0;
      for await (const chunk of request) {
        size += chunk.length;
        if (size > 256) { response.writeHead(413); response.end(); return; }
        chunks.push(chunk);
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(request.headers)) {
        if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
      const input = new Request(origin + request.url, {
        method: request.method, headers, body: size ? Buffer.concat(chunks).toString('utf8') : undefined,
      });
      const result = await handleMailTrigger(input, () => {
        const pending = Promise.resolve().then(run);
        active.add(pending);
        void pending.then(() => active.delete(pending), () => active.delete(pending));
        return pending;
      }, secret);
      const body = await result.text();
      if (!response.destroyed) { response.writeHead(result.status, Object.fromEntries(result.headers)); response.end(body); }
    } catch {
      if (!response.destroyed) { response.writeHead(503); response.end('{"error":{"code":"SYNTHETIC_SERVER_FAILURE"}}'); }
    }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  origin = 'http://127.0.0.1:' + server.address().port;
  return { origin, secret, active,
    async close() {
      if (closed) return;
      closed = true;
      await Promise.allSettled([...active]);
      const stopped = new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
      server.closeAllConnections();
      await stopped;
      assert.equal(server.listening, false);
    },
  };
}

async function waitFor(condition) {
  const deadline = Date.now() + 3000;
  while (!condition()) {
    if (Date.now() >= deadline) assert.fail('LOCAL_SCHEDULE_CONDITION_TIMEOUT');
    await delay(5);
  }
}

test('external/ambiguous origins and invalid bounds are rejected before scheduling', () => {
  const options = { origin: 'http://127.0.0.1:12345', secret: 's'.repeat(43), intervalMs: 10, maxTicks: 2 };
  for (const origin of ['https://example.invalid', 'http://localhost:12345', 'http://127.0.0.1',
    'http://127.0.0.1:0', 'http://127.0.0.1:65536', 'http://user:CANARY@127.0.0.1:12345',
    'http://127.0.0.1:12345/', 'http://127.0.0.1:12345?CANARY', 'http://127.0.0.1:12345#CANARY']) {
    assert.throws(() => createLocalSchedule({ ...options, origin }), /^Error: LOCAL_SCHEDULE_INVALID$/);
  }
  for (const patch of [{ intervalMs: 4 }, { intervalMs: 1001 }, { maxTicks: 0 }, { maxTicks: 21 }, { secret: 'short' }]) {
    assert.throws(() => createLocalSchedule({ ...options, ...patch }), /^Error: LOCAL_SCHEDULE_INVALID$/);
  }
});

test('real HTTP guard rejects unauthorized/query/body inputs and allowlists metrics', { timeout: 10000 }, async t => {
  let calls = 0;
  const owned = await fixture(async () => { calls++; return { claimed: 1, accepted: 1, recipient: 'PRIVATE_CANARY', token: 'PRIVATE_CANARY' }; });
  t.after(() => owned.close());
  const url = owned.origin + '/api/internal/mail/process';
  for (const [suffix, init, expected] of [
    ['', {}, 401], ['', { headers: { authorization: 'Bearer wrong' } }, 401],
    ['?to=PRIVATE_CANARY', { headers: { authorization: 'Bearer ' + owned.secret } }, 400],
    ['', { method: 'POST', body: '{}', headers: { authorization: 'Bearer ' + owned.secret } }, 400],
  ]) {
    const response = await fetch(url + suffix, { ...init, signal: AbortSignal.timeout(1000) });
    const text = await response.text();
    assert.equal(response.status, expected);
    assert.equal(text.includes(owned.secret) || text.includes('PRIVATE_CANARY'), false);
  }
  assert.equal(calls, 0);
  const response = await fetch(url, { headers: { authorization: 'Bearer ' + owned.secret }, signal: AbortSignal.timeout(1000) });
  const text = await response.text();
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(calls, 1); assert.equal(JSON.parse(text).result.accepted, 1);
  assert.equal(text.includes(owned.secret) || text.includes('PRIVATE_CANARY'), false);
});

test('automatic ticks pause and resume a false backlog without overlapping callbacks', { timeout: 10000 }, async t => {
  let pending = 2, accepted = 0, active = 0, peak = 0;
  const owned = await fixture(async () => {
    active++; peak = Math.max(peak, active);
    try { await delay(30); if (pending > 0) { pending--; accepted++; } return { claimed: 1, accepted, pending }; }
    finally { active--; }
  });
  const schedule = createLocalSchedule({ ...owned, intervalMs: 5, maxTicks: 5 });
  t.after(async () => { await schedule.pause(); await owned.close(); });
  schedule.resume(); schedule.resume();
  await waitFor(() => schedule.snapshot().ticks >= 2);
  await schedule.pause();
  assert.equal(accepted, 2); assert.equal(pending, 0); assert.equal(active, 0);
  const pausedTicks = schedule.snapshot().ticks;
  pending = 3;
  await delay(40);
  assert.equal(schedule.snapshot().ticks, pausedTicks); assert.equal(pending, 3);
  schedule.resume();
  await waitFor(() => schedule.snapshot().ticks === 5 && schedule.snapshot().paused);
  await schedule.pause();
  assert.equal(accepted, 5); assert.equal(pending, 0); assert.equal(peak, 1);
  assert.equal(schedule.snapshot().failures, 0);
  const text = JSON.stringify(schedule.snapshot());
  assert.equal(text.includes(owned.secret) || text.includes(owned.origin), false);
  console.log(JSON.stringify({ proof: 'LOCAL_SCHEDULER_FAKE_QUEUE', automaticTicks: 5, fakeAccepted: 5,
    maximumConcurrentCallbacks: peak, pausedBacklog: 3, G3: 'BLOCKED', G4: 'BLOCKED', G5: 'BLOCKED' }));
});

test('client timeout is terminal and does not presume server callback cancellation', { timeout: 10000 }, async t => {
  let release;
  const barrier = new Promise(resolve => { release = resolve; });
  let callbacks = 0;
  const owned = await fixture(async () => { callbacks++; await barrier; return { claimed: 1, accepted: 1 }; });
  const schedule = createLocalSchedule({ ...owned, intervalMs: 5, maxTicks: 3 });
  t.after(async () => { release(); await schedule.pause(); await owned.close(); });
  schedule.resume();
  await waitFor(() => schedule.snapshot().failedStop);
  assert.equal(callbacks, 1); assert.equal(owned.active.size, 1);
  assert.equal(schedule.snapshot().failures, 1);
  assert.throws(() => schedule.resume(), /^Error: LOCAL_SCHEDULE_STOPPED$/);
  await delay(40);
  assert.equal(callbacks, 1); assert.equal(schedule.snapshot().ticks, 1);
  release();
});
