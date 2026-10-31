"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { createSetup, resolveNpmCli } = require("../../setup.js");
const { fixture, silentLogger } = require("./fixture.cjs");

function npmSmoke() {
  const sandbox = fixture();
  try {
    const { root, write } = sandbox;
    const marker = path.join(root, "lifecycle-must-not-run");
    const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
    manifest.scripts = { postinstall: "node -e \"require('node:fs').writeFileSync('lifecycle-must-not-run','unsafe')\"" };
    write("package.json", manifest);
    write("user.npmrc", "");
    write("global.npmrc", "");
    const env = {
      ...process.env,
      npm_config_userconfig: path.join(root, "user.npmrc"),
      npm_config_globalconfig: path.join(root, "global.npmrc"),
      npm_config_cache: path.join(root, "cache"),
      npm_config_prefix: path.join(root, "prefix"),
      npm_config_update_notifier: "false",
      npm_config_logs_max: "0",
    };
    const npm = resolveNpmCli({ execPath: process.execPath, env });
    assert.ok(path.isAbsolute(npm.cli));
    if (process.env.HF_SETUP_EXPECT_NODE_VERSION) assert.equal(process.versions.node, process.env.HF_SETUP_EXPECT_NODE_VERSION);
    if (process.env.HF_SETUP_EXPECT_NPM_VERSION) assert.equal(npm.version, process.env.HF_SETUP_EXPECT_NPM_VERSION);
    const calls = [];
    const { logger } = silentLogger();
    const setup = createSetup({
      root, env, logger,
      spawnSync(command, args, options) {
        calls.push({ command, args, options });
        return spawnSync(command, args, options);
      },
    });
    const result = setup.run("npm", ["ci", "--ignore-scripts", "--offline", "--no-audit", "--no-fund"], { capture: true });
    assert.equal(result.status, 0, "offline empty npm fixture must install successfully");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].command, process.execPath);
    assert.equal(calls[0].args[0], npm.cli);
    assert.deepEqual(calls[0].args.slice(1), ["ci", "--ignore-scripts", "--offline", "--no-audit", "--no-fund"]);
    assert.equal(calls[0].options.shell, false);
    assert.equal(calls[0].options.cwd, root);
    assert.equal(fs.existsSync(marker), false, "postinstall must remain disabled");
    return { platform: process.platform, node: process.version, npm: npm.version };
  } finally {
    sandbox.cleanup();
  }
}

if (require.main === module) {
  const evidence = npmSmoke();
  process.stdout.write(`Isolated npm ci PASS: ${JSON.stringify(evidence)}\n`);
}

module.exports = { npmSmoke };
