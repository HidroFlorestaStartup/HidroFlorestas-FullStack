"use strict";

// Real application dependency extraction is authorized only on disposable
// GitHub runners. Never invoke this integration helper on the affected host.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");

assert.equal(process.env.GITHUB_ACTIONS, "true", "This integration requires a disposable GitHub Actions runner");
const root = path.resolve(__dirname, "../..");
assert.equal(path.resolve(process.env.GITHUB_WORKSPACE), root, "Installer must run in the checked-out CI workspace");
const environmentPath = path.join(root, ".env");
assert.equal(fs.existsSync(environmentPath), false, "CI checkout must not contain a preconfigured environment");

function run(args) {
  const result = spawnSync(process.execPath, [path.join(root, "setup.js"), ...args], {
    cwd: root, env: process.env, shell: false, windowsHide: true, stdio: "inherit",
  });
  assert.equal(result.error, undefined, "Installer process must start successfully");
  assert.equal(result.signal, null, "Installer must not be interrupted");
  assert.equal(result.status, 0, "Installer must return success for partial preparation");
}
function fingerprint() {
  return crypto.createHash("sha256").update(fs.readFileSync(environmentPath)).digest("hex");
}

run(["--skip-migrations"]);
assert.ok(fs.existsSync(path.join(root, "node_modules")), "Locked dependencies must be extracted");
assert.ok(fs.existsSync(environmentPath), "Environment example must be copied");
const before = fingerprint();
run(["--skip-install", "--skip-migrations"]);
assert.equal(fingerprint(), before, "Repeated setup must preserve .env bytes");
process.stdout.write("CI installer partial preparation and repeated-run preservation PASS; application runtime and database were not qualified.\n");
