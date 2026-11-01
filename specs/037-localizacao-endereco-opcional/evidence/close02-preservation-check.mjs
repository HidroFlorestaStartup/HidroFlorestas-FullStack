// Run: node --test specs/037-localizacao-endereco-opcional/evidence/close02-preservation-check.mjs
// Executes the actual extracted copy helper with synthetic bytes; does not run UI/PG.
import test from "node:test";
import assert from "node:assert/strict";
import { constants } from "node:fs";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { compileFunction } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const require = createRequire(join(root, "package.json"));
const ts = require("typescript");
const sourcePath = join(root, "tests/e2e/hf-ui037-location.spec.ts");
const source = await readFile(sourcePath, "utf8");
const ast = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true);
assert.equal(ast.parseDiagnostics.length, 0, "capture test parses");
const helper = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === "preserveUi037Capture");
assert.ok(helper, "actual persistence helper is present");
const executable = ts.transpileModule(helper.getText(ast), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
}).outputText;
const preserve = compileFunction(executable + "; return preserveUi037Capture;", ["copyFile", "mkdir", "constants", "join", "process"])
  (copyFile, mkdir, constants, join, process);

test("UI037 durable proof survives removal of a later Playwright outputDir", async () => {
  const temp = await mkdtemp(join(tmpdir(), "hf-ui037-preservation-"));
  assert.ok(resolve(temp).startsWith(resolve(tmpdir()) + sep));
  try {
    const output = join(temp, "test-results");
    const archive = join(temp, "durable", "frontend-areas");
    await mkdir(output);
    for (const label of ["mobile", "desktop"]) {
      const png = join(output, label + ".png");
      const json = join(output, label + ".json");
      // Explicit synthetic bytes, not a browser screenshot or runtime receipt.
      await writeFile(png, "synthetic-png-bytes-" + label);
      await writeFile(json, JSON.stringify({ synthetic: true, label }));
      const paths = await preserve(png, json, label, archive);
      assert.match(paths.pngPath, /ui037-frontend-areas-hf-ui037-location-(mobile|desktop)-viewport\.png$/);
      assert.match(paths.jsonPath, /-frontend-areas-.*-viewport\.json$/);
    }
    await rm(output, { recursive: true }); // Simulated later suite cleanup, owned temp path.
    for (const label of ["mobile", "desktop"]) {
      const stem = join(archive, "ui037-frontend-areas-hf-ui037-location-" + label + "-viewport");
      assert.equal(await readFile(stem + ".png", "utf8"), "synthetic-png-bytes-" + label);
      assert.deepEqual(JSON.parse(await readFile(stem + ".json", "utf8")), { synthetic: true, label });
    }
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test("UI037 rejects reused evidence instead of overwriting it", async () => {
  const temp = await mkdtemp(join(tmpdir(), "hf-ui037-exclusive-"));
  assert.ok(resolve(temp).startsWith(resolve(tmpdir()) + sep));
  try {
    const png = join(temp, "capture.png");
    const json = join(temp, "capture.json");
    const archive = join(temp, "durable");
    await writeFile(png, "first"); await writeFile(json, "{}");
    const paths = await preserve(png, json, "mobile", archive);
    await writeFile(png, "second");
    await assert.rejects(preserve(png, json, "mobile", archive), { code: "EEXIST" });
    assert.equal(await readFile(paths.pngPath, "utf8"), "first");
    await assert.rejects(preserve(png, json, "unknown", archive), /Unknown UI037/);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
