"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const {
  createSetup, resolveNpmCli, findExecutable, parseArguments,
  validDevelopmentDatabaseUrl, numericVersion, compareVersions,
} = require("../../setup.js");
const { fixture, silentLogger } = require("./fixture.cjs");
const { npmSmoke } = require("./npm-smoke.cjs");

function harness(t, overrides = {}) {
  const sandbox = fixture(t);
  const { root, write } = sandbox;
  const execPath = write("tools/node.exe", "fixture executable; never executed");
  const cli = write("tools/node_modules/npm/bin/npm-cli.js", "// fixture; never executed\n");
  write("tools/node_modules/npm/package.json", { name: "npm", version: "11.17.0", bin: { npm: "bin/npm-cli.js", npx: "bin/npx-cli.js" } });
  const git = write(`tools/git${process.platform === "win32" ? ".exe" : ""}`, "fixture executable; never executed");
  fs.chmodSync(git, 0o755);
  const env = { PATH: path.join(root, "tools"), PATHEXT: ".EXE;.CMD;.BAT;.COM" };
  const calls = [];
  const logging = silentLogger();
  const setup = createSetup({
    root, execPath, env, logger: logging.logger, nodeVersion: "24.19.0", interactive: false,
    spawnSync(command, args, options) {
      calls.push({ command, args, options });
      return { status: 0, signal: null, stdout: "git version fixture\n", stderr: "" };
    },
    ...overrides,
  });
  return { ...sandbox, ...logging, setup, calls, env, execPath, cli };
}

test("real npm ci runs without shell or .cmd from path with spaces and metacharacters", () => {
  const evidence = npmSmoke();
  assert.equal(evidence.platform, process.platform);
});

test("Windows rejects a harmless .cmd with EINVAL when invoked without a shell", { skip: process.platform !== "win32" }, (t) => {
  const h = fixture(t);
  const batch = h.write("harmless.cmd", "@echo harmless fixture\r\n");
  const result = spawnSync(batch, [], { cwd: h.root, shell: false, encoding: "utf8", windowsHide: true });
  assert.equal(result.error?.code, "EINVAL");
  assert.equal(result.status, null);
});

test("version gate preserves the supported major and minimum contract", () => {
  assert.deepEqual(numericVersion("v24.19.0"), [24, 19, 0]);
  assert.ok(compareVersions(numericVersion("24.14.0"), numericVersion("24.19.0")) < 0);
  assert.equal(numericVersion("invalid"), null);
});

test("argument validation rejects contradictory or unknown flags", () => {
  assert.throws(() => parseArguments(["--migrate", "--skip-migrations"]));
  assert.throws(() => parseArguments(["--platform=invalid"]));
  assert.throws(() => parseArguments(["--unexpected"]));
  assert.equal(parseArguments(["--dry-run"]).dryRun, true);
  assert.equal(parseArguments(["--skip-install"]).skipInstall, true);
});

test("npm resolution uses same-installation package metadata and rejects foreign npm_execpath", (t) => {
  const h = harness(t);
  assert.deepEqual(resolveNpmCli({ execPath: h.execPath, env: h.env }), { cli: h.cli, version: "11.17.0" });
  const foreign = h.write("foreign/npm-cli.js", "throw new Error('must not run');");
  const npm = resolveNpmCli({ execPath: h.execPath, env: { ...h.env, npm_execpath: foreign } });
  assert.equal(npm.cli, h.cli);
});

test("npm resolution rejects missing or invalid sibling CLI without executing fallback", (t) => {
  const h = harness(t);
  fs.unlinkSync(h.cli);
  assert.throws(() => resolveNpmCli({ execPath: h.execPath, env: h.env }));
  h.write("tools/node_modules/npm/bin/npm-cli.js", "// still never execute\n");
  h.write("tools/node_modules/npm/package.json", { name: "unexpected-package", version: "11.17.0" });
  assert.throws(() => resolveNpmCli({ execPath: h.execPath, env: h.env }));
});

test("Windows executable discovery never selects .cmd/.bat or WindowsApps launch aliases", (t) => {
  const h = harness(t);
  h.write("unsafe/npm.cmd", "@echo unexpected");
  h.write("unsafe/python.bat", "@echo unexpected");
  const unsafeEnv = { PATH: path.join(h.root, "unsafe"), PATHEXT: ".CMD;.BAT" };
  assert.equal(findExecutable("npm", { env: unsafeEnv, platform: "win32" }), null);
  assert.equal(findExecutable("python", { env: unsafeEnv, platform: "win32" }), null);
  h.write("WindowsApps/python.exe", "store launcher fixture; never execute");
  assert.equal(findExecutable("python", { env: { PATH: path.join(h.root, "WindowsApps") }, platform: "win32" }), null);
  assert.equal(findExecutable("missing", { env: unsafeEnv, platform: "win32" }), null);
});

test("run passes arguments verbatim through Node and preserves npm exit status", (t) => {
  const h = harness(t);
  const args = ["ci", "--ignore-scripts", "a b", "ação & value", "%PATH%", "!x!", "^caret"];
  h.setup.run("npm", args);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].command, h.execPath);
  assert.deepEqual(h.calls[0].args, [h.cli, ...args]);
  assert.equal(h.calls[0].options.shell, false);
  assert.equal(h.calls[0].options.cwd, h.root);
});

test("real child process preserves argument boundaries and its nonzero exit code", (t) => {
  const h = harness(t, { execPath: process.execPath, spawnSync });
  const script = h.write("argument fixture á & %.cjs", "process.stdout.write(JSON.stringify(process.argv.slice(2)));\n");
  const args = ["a b", "ação & value", "%PATH%", "!x!", "^caret", "(parentheses)", "semi;colon"];
  const result = h.setup.run(process.execPath, [script, ...args], { capture: true });
  assert.deepEqual(JSON.parse(result.stdout), args);
  assert.throws(() => h.setup.run(process.execPath, ["-e", "process.exit(23)"]), (error) => error.exitCode === 23);
});

test("spawn errors, nonzero status, and signals fail in a controlled way", (t) => {
  for (const result of [
    { error: Object.assign(new Error("invalid executable"), { code: "EINVAL" }), status: null },
    { error: Object.assign(new Error("missing executable"), { code: "ENOENT" }), status: null },
    { status: 23, signal: null },
    { status: null, signal: "SIGINT" },
  ]) {
    const h = harness(t, { spawnSync: () => result });
    assert.throws(() => h.setup.run("npm", ["ci"]));
  }
});

test("allowFailure returns ordinary nonzero status but cannot swallow spawn errors", (t) => {
  const h = harness(t, { spawnSync: () => ({ status: 7, stdout: "", stderr: "" }) });
  assert.equal(h.setup.run("npm", ["ci"], { allowFailure: true }).status, 7);
  const invalid = harness(t, { spawnSync: () => ({ status: null, error: Object.assign(new Error("missing"), { code: "ENOENT" }) }) });
  assert.throws(() => invalid.setup.run("npm", ["ci"], { allowFailure: true }));
});

test(".env creation is exclusive and subsequent attempts preserve bytes without printing secrets", (t) => {
  const h = harness(t);
  h.setup.configureEnvironment({ dryRun: false });
  assert.equal(fs.readFileSync(path.join(h.root, ".env"), "utf8"), fs.readFileSync(path.join(h.root, ".env.example"), "utf8"));
  const secret = "DATABASE_URL=postgresql://private:synthetic-secret@localhost:5432/private\n";
  h.write(".env", secret);
  h.setup.configureEnvironment({ dryRun: false });
  assert.equal(fs.readFileSync(path.join(h.root, ".env"), "utf8"), secret);
  assert.equal(h.messages.join("\n").includes("synthetic-secret"), false);
});

test("dry-run creates no environment or dependency files and starts zero processes", async (t) => {
  const h = harness(t, { spawnSync() { assert.fail("dry-run must not spawn"); } });
  h.write("prisma/schema.prisma", "// fixture schema");
  const before = fs.readdirSync(h.root, { recursive: true }).sort();
  const code = await h.setup.main(["--dry-run", "--skip-migrations"]);
  assert.equal(code, 0);
  assert.deepEqual(fs.readdirSync(h.root, { recursive: true }).sort(), before);
  assert.equal(fs.existsSync(path.join(h.root, ".env")), false);
});

test("failed installation stops dependent stages and returns child exit code", async (t) => {
  const calls = [];
  const h = harness(t, { spawnSync(command, args) {
    calls.push({ command, args });
    return args.includes("ci") ? { status: 37, signal: null } : { status: 0, stdout: "git version fixture", stderr: "" };
  } });
  h.write("prisma/schema.prisma", "// fixture schema");
  const code = await h.setup.main(["--allow-scripts", "--skip-migrations"]);
  assert.equal(code, 37);
  assert.ok(calls.some(({ args }) => args.includes("ci")));
  assert.equal(calls.some(({ args }) => args.includes("generate")), false);
});

test("retry after incomplete installation preserves environment and reattempts npm ci", async (t) => {
  let failure = true;
  const calls = [];
  const h = harness(t, { spawnSync(command, args) {
    calls.push({ command, args });
    return { status: args.includes("ci") && failure ? 9 : 0, stdout: "git version fixture", stderr: "" };
  } });
  h.write(".env", "FIXTURE_SECRET=never-echo\n");
  h.write("node_modules/partial-install-marker", "preexisting data");
  assert.equal(await h.setup.main(["--skip-migrations"]), 9);
  failure = false;
  assert.equal(await h.setup.main(["--skip-migrations"]), 0);
  assert.equal(calls.filter(({ args }) => args.includes("ci")).length, 2);
  assert.equal(fs.readFileSync(path.join(h.root, ".env"), "utf8"), "FIXTURE_SECRET=never-echo\n");
});

test("installation defaults to ignoring lifecycle scripts and skip-install starts no npm install", async (t) => {
  const h = harness(t);
  assert.equal(await h.setup.main(["--skip-migrations"]), 0);
  const install = h.calls.find(({ args }) => args.includes("ci"));
  assert.ok(install);
  assert.ok(install.args.includes("--ignore-scripts"));
  assert.ok(install.args.includes("--global=false"));
  assert.equal(install.args[install.args.indexOf("--prefix") + 1], h.root);
  const skipped = harness(t);
  assert.equal(await skipped.setup.main(["--skip-install", "--skip-migrations"]), 0);
  assert.equal(skipped.calls.some(({ args }) => args.includes("ci") || args.includes("install")), false);
});

test("without script authorization Prisma cannot execute or download its CLI", async (t) => {
  const h = harness(t);
  h.write("prisma/schema.prisma", "// fixture schema");
  assert.equal(await h.setup.main(["--skip-migrations"]), 0);
  assert.equal(h.calls.some(({ args }) => args.includes("generate") || args.includes("exec") || args.includes("npx")), false);
});

test("database validation refuses remote, malformed, and non-PostgreSQL destinations", () => {
  assert.equal(validDevelopmentDatabaseUrl("postgresql://fixture:secret@localhost:5432/localdb"), true);
  for (const value of ["", "not a url", "postgresql://fixture@prod.example.com/db", "mysql://fixture@localhost/db", "postgresql://localhost/"]) {
    assert.equal(validDevelopmentDatabaseUrl(value), false, value);
  }
});

test("migrations are never invoked without explicit authorization even with configured database", async (t) => {
  const h = harness(t);
  h.write("prisma/schema.prisma", "// fixture schema");
  h.write(".env", "DATABASE_URL=postgresql://fixture:synthetic-secret@localhost:5432/localdb\n");
  assert.equal(await h.setup.main(["--skip-install"]), 0);
  assert.equal(h.calls.some(({ args }) => args.includes("migrate")), false);
  assert.equal(h.messages.join("\n").includes("synthetic-secret"), false);
});

test("explicit migration still fails closed for missing/mismatched target", async (t) => {
  for (const flags of [["--migrate"], ["--migrate", "--database-target=localhost:5432/differentdb"]]) {
    const h = harness(t);
    h.write("prisma/schema.prisma", "// fixture schema");
    h.write(".env", "DATABASE_URL=postgresql://fixture:synthetic-secret@localhost:5432/localdb\n");
    const code = await h.setup.main(["--skip-install", ...flags]);
    assert.notEqual(code, 0);
    assert.equal(h.calls.some(({ args }) => args.includes("migrate")), false);
    assert.equal(h.messages.join("\n").includes("synthetic-secret"), false);
  }
});

test("runtime stage commands never include reboot, global installation, or configuration changes", async (t) => {
  const h = harness(t);
  assert.equal(await h.setup.main(["--skip-migrations"]), 0);
  for (const { command, args, options } of h.calls) {
    const label = [command, ...args].join(" ");
    assert.doesNotMatch(label, /shutdown|restart-computer|reboot|winget|set-executionpolicy|--global(?:=true)?(?:\s|$)|\s-g(?:\s|$)/i);
    assert.equal(options.shell, false);
  }
});

test("unsupported Node stops before writing environment or invoking any child", async (t) => {
  const h = harness(t, { nodeVersion: "24.14.0", spawnSync() { assert.fail("incompatible Node must not spawn"); } });
  assert.equal(await h.setup.main([]), 1);
  assert.equal(fs.existsSync(path.join(h.root, ".env")), false);
});

test("SIGINT during install returns 130 and prevents dependent stages", async (t) => {
  const h = harness(t, { spawnSync: () => ({ status: null, signal: "SIGINT" }) });
  h.write("prisma/schema.prisma", "// fixture");
  assert.equal(await h.setup.main(["--allow-scripts", "--skip-migrations"]), 130);
  assert.equal(h.messages.some((line) => line.includes("generate")), false);
});

test("partial .venv is preserved and blocks authorized Python installation", (t) => {
  const h = harness(t);
  h.write("requirements.txt", "# no packages\n");
  const marker = h.write(".venv/partial-marker", "preserve incomplete environment");
  assert.throws(() => h.setup.installPythonDependencies("windows", { allowScripts: true }));
  assert.equal(fs.readFileSync(marker, "utf8"), "preserve incomplete environment");
  assert.equal(h.calls.length, 0);
});

test("existing valid .venv reuses its interpreter without recreating the environment", (t) => {
  const h = harness(t);
  h.write("requirements.txt", "# no packages\n");
  h.write(".venv/pyvenv.cfg", "home = fixture\n");
  const python = h.write(process.platform === "win32" ? ".venv/Scripts/python.exe" : ".venv/bin/python", "fixture; never execute");
  fs.chmodSync(python, 0o755);
  h.setup.installPythonDependencies("windows", { allowScripts: true });
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].command, python);
  assert.ok(h.calls[0].args.includes("--require-virtualenv"));
  assert.ok(h.calls[0].args.includes("--isolated"));
  assert.equal(h.calls[0].args[0], "-I");
  assert.deepEqual(h.calls[0].args.slice(-2), ["-r", "requirements.txt"]);
});

test("Python pip cannot inherit global target/prefix/user or arbitrary config redirects", (t) => {
  const h = harness(t, { env: {
    PATH: process.env.PATH,
    PIP_TARGET: "/untrusted/global-target",
    PIP_PREFIX: "/untrusted/global-prefix",
    PIP_USER: "true",
    PIP_CONFIG_FILE: "/untrusted/pip.conf",
    pip_target: "/untrusted/lower-case-target",
  } });
  h.write("requirements.txt", "# no packages\n");
  h.write(".venv/pyvenv.cfg", "home = fixture\n");
  const python = h.write(process.platform === "win32" ? ".venv/Scripts/python.exe" : ".venv/bin/python", "fixture; never execute");
  fs.chmodSync(python, 0o755);
  h.setup.installPythonDependencies("windows", { allowScripts: true });
  assert.equal(h.calls.length, 1);
  const call = h.calls[0];
  assert.ok(call.args.includes("--require-virtualenv"));
  assert.ok(call.args.includes("--isolated"));
  assert.equal(call.args[0], "-I");
  assert.equal(call.options.env.PIP_TARGET, undefined);
  assert.equal(call.options.env.PIP_PREFIX, undefined);
  assert.equal(call.options.env.PIP_USER, undefined);
  assert.equal(call.options.env.pip_target, undefined);
  assert.equal(call.options.env.PIP_CONFIG_FILE, process.platform === "win32" ? "nul" : "/dev/null");
});

test("linked .venv is refused without modifying its target", (t) => {
  const h = harness(t);
  h.write("requirements.txt", "# no packages\n");
  const marker = h.write("outside-venv/preserved-marker", "untouched");
  fs.symlinkSync(path.dirname(marker), path.join(h.root, ".venv"), process.platform === "win32" ? "junction" : "dir");
  assert.throws(() => h.setup.installPythonDependencies("windows", { allowScripts: true }));
  assert.equal(fs.readFileSync(marker, "utf8"), "untouched");
  assert.equal(h.calls.length, 0);
});

test("Python dry-run and skip-install never execute interpreters or create .venv", (t) => {
  const h = harness(t, { spawnSync() { assert.fail("Python plan must not spawn"); } });
  h.write("requirements.txt", "# no packages\n");
  h.setup.installPythonDependencies("windows", { allowScripts: true, dryRun: true });
  h.setup.installPythonDependencies("windows", { allowScripts: true, skipInstall: true });
  assert.equal(fs.existsSync(path.join(h.root, ".venv")), false);
});

function addPrismaFixture(h) {
  h.write("prisma/schema.prisma", "// fixture; CLI always mocked\n");
  h.write("package.json", { name: "fixture", version: "1.0.0", devDependencies: { prisma: "7.4.2" } });
  h.write("node_modules/prisma/package.json", { name: "prisma", version: "7.4.2" });
  return h.write("node_modules/prisma/build/index.js", "// fixture; never executed\n");
}

test("Prisma generation failure stops migration and preserves private output", async (t) => {
  const calls = [];
  const h = harness(t, { spawnSync(command, args) {
    calls.push({ command, args });
    return { status: args.includes("generate") ? 31 : 0, stdout: "synthetic-private-output", stderr: "postgresql://fixture:synthetic-secret@localhost/db" };
  } });
  addPrismaFixture(h);
  h.write(".env", "DATABASE_URL=postgresql://fixture:synthetic-secret@localhost:5432/localdb\n");
  assert.equal(await h.setup.main(["--skip-install", "--allow-scripts", "--migrate", "--database-target=localhost:5432/localdb"]), 31);
  assert.equal(calls.some(({ args }) => args.includes("migrate")), false);
  assert.doesNotMatch(h.messages.join("\n"), /synthetic-private-output|synthetic-secret/);
});

test("migrations require matching effective inherited URL, not only .env", async (t) => {
  const calls = [];
  const h = harness(t, {
    env: { DATABASE_URL: "postgresql://fixture:inherited-secret@remote.example.com/production", PATH: process.env.PATH },
    spawnSync(command, args) { calls.push({ command, args }); return { status: 0 }; },
  });
  addPrismaFixture(h);
  h.write(".env", "DATABASE_URL=postgresql://fixture:file-secret@localhost:5432/localdb\n");
  assert.notEqual(await h.setup.main(["--skip-install", "--allow-scripts", "--migrate", "--database-target=localhost:5432/localdb"]), 0);
  assert.equal(calls.some(({ args }) => args.includes("migrate")), false);
  assert.doesNotMatch(h.messages.join("\n"), /inherited-secret|file-secret/);
});

test("authorized matching local migration uses local pinned CLI with deploy and never reset/dev", async (t) => {
  const h = harness(t);
  const cli = addPrismaFixture(h);
  h.write(".env", "DATABASE_URL=postgresql://fixture:synthetic-secret@localhost:5432/localdb\n");
  assert.equal(await h.setup.main(["--skip-install", "--allow-scripts", "--migrate", "--database-target=localhost:5432/localdb"]), 0);
  assert.deepEqual(h.calls.map(({ args }) => args), [[cli, "generate"], [cli, "migrate", "deploy"]]);
  assert.equal(h.calls[1].options.env.DATABASE_URL, "postgresql://fixture:synthetic-secret@localhost:5432/localdb");
  assert.doesNotMatch(h.messages.join("\n"), /synthetic-secret/);
});

test("Prisma child environment cannot redirect dotenv away from the validated inherited database", async (t) => {
  const effectiveUrl = "postgresql://fixture:inherited-secret@localhost:5432/localdb";
  const h = harness(t, { env: {
    PATH: process.env.PATH,
    DATABASE_URL: effectiveUrl,
    DOTENV_CONFIG_OVERRIDE: "true",
    DOTENV_CONFIG_PATH: "/untrusted/external.env",
    DOTENV_KEY: "synthetic-vault-secret",
    PGHOSTADDR: "198.51.100.1",
    PGSERVICE: "untrusted-service",
    PGOPTIONS: "untrusted-options",
  } });
  addPrismaFixture(h);
  h.write(".env", "DATABASE_URL=postgresql://fixture:file-secret@remote.example.com/production\n");
  assert.equal(await h.setup.main(["--skip-install", "--allow-scripts", "--migrate", "--database-target=localhost:5432/localdb"]), 0);
  assert.equal(h.calls.length, 2);
  for (const call of h.calls) {
    // dotenv 17 treats a nonempty string "false" as truthy; only empty disables override.
    assert.equal(call.options.env.DOTENV_CONFIG_OVERRIDE, "");
    assert.equal(Boolean(call.options.env.DOTENV_CONFIG_OVERRIDE), false);
    assert.equal(call.options.env.DOTENV_CONFIG_PATH, path.join(h.root, ".env"));
    assert.equal(call.options.env.DOTENV_KEY, "");
    assert.equal(call.options.env.DOTENV_CONFIG_DOTENV_KEY, "");
    assert.equal(call.options.env.PGHOSTADDR, undefined);
    assert.equal(call.options.env.PGSERVICE, undefined);
    assert.equal(call.options.env.PGOPTIONS, undefined);
  }
  assert.equal(h.calls[1].options.env.DATABASE_URL, effectiveUrl);
  assert.doesNotMatch(h.messages.join("\n"), /inherited-secret|file-secret/);
});

test("missing or mismatched local Prisma cannot trigger package download", async (t) => {
  for (const version of [null, "7.0.0"]) {
    const h = harness(t);
    addPrismaFixture(h);
    if (version) h.write("node_modules/prisma/package.json", { name: "prisma", version });
    else fs.unlinkSync(path.join(h.root, "node_modules/prisma/build/index.js"));
    assert.notEqual(await h.setup.main(["--skip-install", "--allow-scripts", "--skip-migrations"]), 0);
    assert.equal(h.calls.length, 0);
  }
});
