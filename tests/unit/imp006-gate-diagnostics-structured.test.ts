import assert from "node:assert/strict";
import { ChildProcess } from "node:child_process";
import { once } from "node:events";
import { writeFileSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import { test } from "node:test";
import { redactImp006Diagnostics as redact, forwardImp006Diagnostics as forward, runImp006Gate } from "../../scripts/imp006-gate-diagnostics";

// Sentinels only: none of these values are credentials. Booleans in assertions
// avoid echoing a diagnostic payload if the redactor regresses.
type Case = { id: string; text: string; markers: string[]; env?: Record<string, string>; preserve?: string[] };
const cases: Case[] = [
  { id: "known-environment", text: "error SYNTH_ONLY_ENV_VALUE", env: { JWT_SECRET: "SYNTH_ONLY_ENV_VALUE" }, markers: ["SYNTH_ONLY_ENV_VALUE"] },
  { id: "database-uri", text: "db=postgresql://fixture:SYNTH_ONLY_DB@127.0.0.1/test", markers: ["SYNTH_ONLY_DB"] },
  { id: "plain-header", text: "Authorization: Basic SYNTH_ONLY_HEADER", markers: ["SYNTH_ONLY_HEADER"] },
  { id: "plain-token", text: "token=SYNTH_ONLY_TOKEN other=ok", markers: ["SYNTH_ONLY_TOKEN"] },
  { id: "json-password", text: JSON.stringify({ password: "SYNTH_ONLY_PASSWORD", status: 500 }), markers: ["SYNTH_ONLY_PASSWORD"] },
  { id: "json-cookie", text: JSON.stringify({ Cookie: "session=SYNTH_ONLY_COOKIE", status: 500 }), markers: ["SYNTH_ONLY_COOKIE"] },
  { id: "json-basic-authorization", text: JSON.stringify({ Authorization: "Basic SYNTH_ONLY_BASIC", status: 500 }), markers: ["SYNTH_ONLY_BASIC"] },
  { id: "json-api-key", text: JSON.stringify({ "X-Api-Key": "SYNTH_ONLY_APIKEY", status: 500 }), markers: ["SYNTH_ONLY_APIKEY"] },
  { id: "quoted-object-token", text: "failure {token: 'SYNTH_ONLY_OBJECT'}", markers: ["SYNTH_ONLY_OBJECT"] },
  { id: "verification-cookie", text: "verification_token=SYNTH_ONLY_VERIFICATION; Path=/", markers: ["SYNTH_ONLY_VERIFICATION"] },
  { id: "escaped-known-secret", text: JSON.stringify({ message: 'SYNTH_ONLY_"ESCAPED"_VALUE' }), env: { JWT_SECRET: 'SYNTH_ONLY_"ESCAPED"_VALUE' }, markers: ['SYNTH_ONLY_\\"ESCAPED\\"_VALUE'] },
  { id: "non-sensitive-context", text: JSON.stringify({ tokenCount: 3, status: 503, code: "P2034", sqlstate: "40001", path: "/dashboard", attempt: 3 }), markers: [], preserve: ["tokenCount", "P2034", "40001", "/dashboard"] },
  { id: "token-colon-bearer", text: "token: Bearer SYNTH_BEARER_SENTINEL", markers: ["SYNTH_BEARER_SENTINEL"] },
  { id: "message-bearer", text: "message: Bearer SYNTH_BEARER_MESSAGE", markers: ["SYNTH_BEARER_MESSAGE"] },
  { id: "json-whitespace", text: '{ "newPassword" : "SYNTH_NEW_PASSWORD" , "code": "P2034" }', markers: ["SYNTH_NEW_PASSWORD"], preserve: ["P2034"] },
  { id: "json-escaped-quote", text: JSON.stringify({ password: 'SYNTH_PWD_"QUOTE"_TAIL' }), markers: ["SYNTH_PWD_"] },
  { id: "json-escaped-slash", text: JSON.stringify({ token: "SYNTH_TOK_\\path" }), markers: ["SYNTH_TOK_"] },
  { id: "terminal-unclosed-value", text: '{"password":"SYNTH_UNCLOSED', markers: ["SYNTH_UNCLOSED"] },
];
for (const entry of cases) test(`PRO-022 diagnostic scalar ${entry.id}`, () => {
  const safe = redact(entry.text, entry.env ?? {});
  assert.equal(entry.markers.every(marker => !safe.includes(marker)), true, "Synthetic sentinel must be removed");
  assert.equal((entry.preserve ?? []).every(marker => safe.includes(marker)), true, "Diagnostic metadata must remain");
});

test("PRO-022 non-sensitive scalar keys remain byte-identical", () => {
  const value = JSON.stringify({ tokenCount: 2, secretNames: ["placeholder"], httpStatus: 503, code: "P2034", sqlstate: "40001" });
  assert.equal(redact(value, {}), value);
});

test("PRO-022 forwarding removes structured scalars across chunks", async () => {
  const input = new PassThrough();
  let output = "";
  forward(input, {}, "Next", { write(chunk: string) { output += chunk; return true; } });
  const ended = once(input, "end");
  input.write('server error {"pass');
  input.end('word":"SYNTH_ONLY_STREAM","code":"P2034"}\n');
  await ended;
  assert.equal(output.includes("SYNTH_ONLY_STREAM"), false);
  assert.equal(output.includes("P2034"), true);
});

test("PRO-022 forwarding discards a complete oversized continuation", async () => {
  const input = new PassThrough();
  let output = "";
  forward(input, { JWT_SECRET: "hidden-secret-complete-tail" }, "Next", { write(chunk: string) { output += chunk; return true; } });
  const ended = once(input, "end");
  input.write("x".repeat(1_048_570) + "hidden");
  input.write("-secret-");
  input.end("complete-tail\nsafe next line");
  await ended;
  assert.equal(output, "Next: OUTPUT_LINE_LIMIT_EXCEEDED\nNext: safe next line\n");
});

test("PRO-022 gate discards pending output after requesting termination", { timeout: 15_000 }, async t => {
  const directory = await mkdtemp(join(tmpdir(), "hf-pro-gate-continuation-"));
  const marker = join(directory, "kill-requested");
  const prefix = "SYNTHETIC_ONLY_PREFIX";
  const tail = "SYNTHETIC_ONLY_SENSITIVE_TAIL";
  const originalKill = ChildProcess.prototype.kill;
  let killRequests = 0;
  // Deterministic transport control, not an assertion about OS signal timing:
  // after kill is requested, the child releases one final buffered continuation.
  const killMock = t.mock.method(ChildProcess.prototype, "kill", function (this: ChildProcess, signal?: NodeJS.Signals | number) {
    if (!this.spawnargs.some(arg => arg.includes("PRO022_OVERFLOW_MARKER"))) return originalKill.call(this, signal);
    killRequests++;
    writeFileSync(marker, "release");
    return true;
  });
  const childCode = [
    "const fs = require('node:fs');",
    "const marker = process.env.PRO022_OVERFLOW_MARKER;",
    `const tail = ${JSON.stringify(tail)};`,
    "const deadline = setTimeout(() => process.exit(9), 5000);",
    "const poll = setInterval(() => {",
    "  if (fs.existsSync(marker)) { clearInterval(poll); clearTimeout(deadline);",
    "    process.stdout.write(tail + '\\nsafe line\\n', () => process.exit(7)); }",
    "}, 5);",
    `process.stdout.write('x'.repeat(1048577) + ${JSON.stringify(prefix)});`,
  ].join("\n");
  const originalStdout = process.stdout.write;
  let captured = "";
  // Capture synthetic gate output rather than printing even a failed sentinel.
  process.stdout.write = function (chunk: string | Uint8Array) { captured += String(chunk); return true; } as typeof process.stdout.write;
  try {
    const result = await runImp006Gate("continuation-control", ["-e", childCode],
      { ...process.env, PRO022_OVERFLOW_MARKER: marker, JWT_SECRET: prefix + tail }, { logDirectory: directory });
    const log = await readFile(result.logPath, "utf8");
    assert.equal(result.exitCode, 7, "Child completion must preserve failure status");
    assert.equal(killRequests > 0, true, "The output limit must still request termination");
    assert.equal(log.includes("OUTPUT_LINE_LIMIT_EXCEEDED"), true);
    assert.equal(log.includes(tail) || captured.includes(tail), false, "Discarded line tail must not escape redaction");
    assert.equal(log.includes("safe line"), true);
  } finally {
    process.stdout.write = originalStdout;
    killMock.mock.restore();
    await rm(directory, { recursive: true, force: true });
  }
});
