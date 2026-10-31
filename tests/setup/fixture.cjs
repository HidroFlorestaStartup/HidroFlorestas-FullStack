"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

function fixture(t) {
  const parent = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(parent, "hf-setup espaço-á & % ! ^ ("));
  const write = (name, content) => {
    const target = path.join(root, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, typeof content === "string" ? content : JSON.stringify(content));
    return target;
  };
  const cleanup = () => {
    assert.equal(path.dirname(root), parent);
    assert.ok(path.basename(root).startsWith("hf-setup espaço-á & % ! ^ ("));
    fs.rmSync(root, { recursive: true, force: true });
  };
  if (t) t.after(cleanup);
  write(".node-version", "24.19.0\n");
  write(".env.example", "DATABASE_URL=postgresql://example:placeholder@database.invalid/sample\n");
  write("package.json", { name: "hf-setup-isolated-fixture", version: "1.0.0", private: true });
  write("package-lock.json", {
    name: "hf-setup-isolated-fixture", version: "1.0.0", lockfileVersion: 3,
    requires: true, packages: { "": { name: "hf-setup-isolated-fixture", version: "1.0.0" } },
  });
  return { root, write, cleanup };
}

function silentLogger() {
  const messages = [];
  const logger = Object.fromEntries(["section", "info", "success", "warning", "error", "command"]
    .map((name) => [name, (message) => messages.push(String(message))]));
  return { logger, messages };
}

module.exports = { fixture, silentLogger };
