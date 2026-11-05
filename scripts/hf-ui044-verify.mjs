import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const gates = ["RegressionSetup","Unit","Integration","Migration","Contract","R1","Build","Typecheck","Lint","E2E","Https","Deletion","Ihfr","Bootstrap","SchemaAudit"];
export function assertOfficialGates(rows) {
 if (rows.length !== 15 || new Set(rows.map(r=>r.gate)).size !== 15 || gates.some((g,i)=>rows[i].gate !== g || rows[i].result !== "PASS" || rows[i].exitCode !== 0) || new Set(rows.map(r=>r.snapshot)).size !== 1 || !/^[a-f0-9]{64}$/.test(rows[0]?.snapshot ?? "")) throw new Error("15 unique official gates/snapshot not verified");
}
async function main() {
const rows = (await readFile(".accounts-validation/results.jsonl","utf8")).trim().split(/\r?\n/).map(JSON.parse);
assertOfficialGates(rows);
const snapshotPaths=execFileSync("git",["ls-files","--cached","--others","--exclude-standard","-z"],{encoding:"utf8"}).split("\0").filter(file=>
 !/\.(?:zip|log|clixml|tsbuildinfo)$/i.test(file) && !/(?:^|\/)\.env(?:\.|$)/.test(file) &&
 /^(?:src\/|tests\/|scripts\/|prisma\/|public\/|package(?:-lock)?\.json$|(?:next|prisma|postcss|tailwind|eslint|playwright)(?:\.[a-z0-9-]+)*\.config\.(?:[cm]?js|ts)$|(?:tsconfig(?:\.[a-z0-9-]+)?|components|vercel)\.json$|\.(?:gitignore|vercelignore)$)/.test(file));
const snapshotFiles=await Promise.all([...new Set(snapshotPaths)].sort().map(async path=>({path,sha256:createHash("sha256").update(await readFile(path)).digest("hex")})));
const actualSnapshot=createHash("sha256").update(JSON.stringify(snapshotFiles)).digest("hex");
if(rows[0].snapshot!==actualSnapshot) throw new Error("Official snapshot differs from final checkout inputs");
const files=[];
for (const [name,width,height] of [["mobile",390,844],["desktop",1440,900]]) {
 const stem=`.accounts-validation/frontend-areas/ui037-frontend-areas-hf-ui037-location-${name}-viewport`;
 const png=await readFile(stem+".png"), data=await readFile(stem+".json"), meta=JSON.parse(data);
 if (png.toString("hex",0,8)!=="89504e470d0a1a0a" || png.readUInt32BE(16)!==width || png.readUInt32BE(20)!==height || meta.fullPage!==false) throw new Error("UI037 dimensions/fullPage invalid");
 for (const [ext,bytes] of [["png",png],["json",data]]) files.push({path:stem+"."+ext,bytes:bytes.length,sha256:createHash("sha256").update(bytes).digest("hex")});
}
const sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(sha!==process.env.GITHUB_SHA || process.env.GITHUB_RUN_ATTEMPT!=="1" || !/^\d+$/.test(process.env.GITHUB_RUN_ID??"")) throw new Error("Final runner provenance mismatch");
const tree=execFileSync("git",["rev-parse","HEAD^{tree}"],{encoding:"utf8"}).trim();
execFileSync("git",["diff","--exit-code","--quiet"]);execFileSync("git",["diff","--cached","--exit-code","--quiet"]);
await writeFile(".accounts-validation/hf-ui044-final-verification.json",JSON.stringify({sha,tree,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,gates:rows.map(r=>({gate:r.gate,result:r.result,exitCode:r.exitCode,snapshot:r.snapshot})),ui037:"CAPTURE_PRESENT_AFTER_ALL_SUITES",files},null,2)+"\n");
console.log("15 gates and four durable UI037 files verified after all later suites.");
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) await main();
