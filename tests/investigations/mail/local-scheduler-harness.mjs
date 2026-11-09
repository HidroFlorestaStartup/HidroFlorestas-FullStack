/** Demand-only synthetic scheduler. Never wire this helper to a hosted job. */
export function createLocalSchedule({ origin, secret, intervalMs, maxTicks }) {
  const port = typeof origin === 'string' ? /^http:\/\/127\.0\.0\.1:([1-9][0-9]{0,4})$/.exec(origin)?.[1] : null;
  if (!port || Number(port) > 65535 || typeof secret !== 'string' || !/^[A-Za-z0-9_-]{32,128}$/.test(secret) ||
    !Number.isInteger(intervalMs) || intervalMs < 5 || intervalMs > 1000 ||
    !Number.isInteger(maxTicks) || maxTicks < 1 || maxTicks > 20) throw new Error('LOCAL_SCHEDULE_INVALID');

  let paused = true;
  let failedStop = false;
  let timer;
  let inFlight = Promise.resolve();
  let hasFlight = false;
  let ticks = 0;
  let failures = 0;
  const statuses = [];

  async function tick() {
    if (paused || failedStop || hasFlight || ticks >= maxTicks) return;
    hasFlight = true;
    ticks++;
    try {
      const response = await fetch(origin + '/api/internal/mail/process', {
        method: 'GET', headers: { authorization: 'Bearer ' + secret },
        redirect: 'error', signal: AbortSignal.timeout(750),
      });
      await response.arrayBuffer();
      statuses.push(response.status);
      if (response.status !== 200) { failures++; failedStop = true; paused = true; }
    } catch {
      statuses.push(0);
      failures++;
      failedStop = true;
      paused = true;
    } finally {
      hasFlight = false;
      if (ticks >= maxTicks) paused = true;
      if (!paused && !failedStop) timer = setTimeout(start, intervalMs);
    }
  }

  function start() {
    timer = undefined;
    inFlight = tick();
  }

  return Object.freeze({
    resume() {
      if (failedStop) throw new Error('LOCAL_SCHEDULE_STOPPED');
      if (ticks >= maxTicks) return;
      paused = false;
      if (!hasFlight && timer === undefined) start();
    },
    async pause() {
      paused = true;
      clearTimeout(timer);
      timer = undefined;
      await inFlight;
    },
    snapshot() { return { paused, failedStop, ticks, failures, statuses: [...statuses] }; },
  });
}
