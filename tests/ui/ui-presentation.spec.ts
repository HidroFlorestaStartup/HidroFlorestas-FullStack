import { expect, test, type Page } from "@playwright/test";
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { publicDiagnosisFixture } from "../fixtures/ihfr-diagnosis-public";

const origin = "http://ui-presentation.invalid";
const laboratoryId = "60000000-0000-4000-8000-000000000021";
const diagnosis = { ...publicDiagnosisFixture, displayScore: 0.49, ihfrClass: "MODERATE", dataQuality: "HIGH",
  componentScores: { W: 0.6299999999999999, S: 0.4, V: 0.57, T: 0.35833333333333334 } };
const collection = { id: diagnosis.collectionId, occurredAt: "2026-10-30T17:26:34.664-03:00", confirmedAt: "2026-10-30T20:26:40.987Z",
  area: { id: diagnosis.areaId, name: "Área de teste" }, laboratory: { id: laboratoryId, name: "Laboratório de teste", status: "ACTIVE" }, readOnly: false };
let javascript: string;
let css: string;
let fontFamily = "Arial";

test.beforeAll(async () => {
  const result = await build({
    stdin: { resolveDir: process.cwd(), loader: "tsx", contents: `
import {createRoot} from 'react-dom/client';
import {IHFRDiagnosisManagement} from './src/components/ihfr-diagnosis/ihfr-diagnosis-management';
import {ExperimentalDiagnosisSummary} from './src/components/ihfr-diagnosis/experimental-diagnosis-summary';
import {NoCurrentDiagnosis} from './src/components/ihfr-diagnosis/no-current-diagnosis';
import {CollectionDetailLayout} from './src/components/collections/collection-detail-layout';
import {createCollectionDetailSlots} from './src/components/collections/collection-detail';
import {AreaCollections} from './src/components/areas/area-collections';
import {TerritorialMapView} from './src/components/territorial-map/territorial-map-view';
const diagnosis=${JSON.stringify(diagnosis)},collection=${JSON.stringify(collection)};
const slots=createCollectionDetailSlots({collection});
const view=location.pathname;
const reading=<ExperimentalDiagnosisSummary diagnosis={diagnosis}/>;
const content=view==='/no-diagnosis'?<NoCurrentDiagnosis/>:view==='/map'?<TerritorialMapView laboratoryId="${laboratoryId}"/>:
view==='/summary'?<AreaCollections laboratoryId="${laboratoryId}" areaId={diagnosis.areaId} rows={[{id:collection.id,occurredAt:collection.occurredAt,occurredAtUtc:'2026-10-30T20:26:34.664Z',confirmedAt:collection.confirmedAt,currentDiagnosis:{id:diagnosis.id,displayScore:'0.49',ihfrClass:'MODERATE'}}]}/>:
location.search?<CollectionDetailLayout {...slots} reading={reading}/>:
<IHFRDiagnosisManagement detailSlots={slots} context={{laboratoryId:'${laboratoryId}',areaId:diagnosis.areaId,collectionId:diagnosis.collectionId}} initialDiagnosis={diagnosis}/>;
createRoot(document.getElementById('root')).render(<main style={{padding:12,maxWidth:1280,margin:'auto'}}>{content}</main>);` },
    bundle: true, write: false, outdir: "test-results/ui-presentation/bundle", format: "iife", jsx: "automatic", loader: { ".png": "dataurl" },
    define: { "process.env.NODE_ENV": '"production"', "process.env.NEXT_PUBLIC_MAP_TILE_URL": "undefined", "process.env.NEXT_PUBLIC_MAP_ATTRIBUTION": "undefined" },
    plugins: [{ name: "offline-next", setup(builder) {
      builder.onResolve({ filter: /^next\/(link|navigation|image|dynamic)$/ }, args => ({ path: args.path, namespace: "offline-next" }));
      builder.onLoad({ filter: /.*/, namespace: "offline-next" }, args => ({ loader: "tsx", resolveDir: process.cwd(), contents:
        args.path === "next/link" ? `export default function Link({href,children,...p}){return <a href={href} {...p}>{children}</a>}` :
        args.path === "next/navigation" ? `export function usePathname(){return location.pathname} export function useRouter(){return {push(){},replace(){},refresh(){}}}` :
        args.path === "next/image" ? `export default function Image({src,priority,fill,...p}){return <img src={typeof src==='string'?src:src.src} {...p}/>} ` :
        `import {lazy,Suspense} from 'react';export default function dynamic(load,o){const C=lazy(load);return p=><Suspense fallback={o.loading?.()}><C {...p}/></Suspense>}`,
      }));
    } }],
  });
  javascript = result.outputFiles.find(file => file.path.endsWith(".js"))!.text;
  css = (await postcss([tailwind()]).process(await readFile("src/app/globals.css", "utf8"), { from: path.resolve("src/app/globals.css") })).css
    + result.outputFiles.find(file => file.path.endsWith(".css"))!.text;
  // Reuse the production Poppins files after a build; no external font requests.
  for (const file of await readdir(".next/static/chunks").catch(() => [] as string[])) {
    if (!file.endsWith(".css")) continue;
    const built = await readFile(path.join(".next/static/chunks", file), "utf8");
    for (const face of built.match(/@font-face\{[^}]*\}/g) ?? []) {
      if (!/font-family:Poppins;/.test(face) || !/font-weight:(400|500|600|700);/.test(face)) continue;
      const url = /url\(([^)]+)\)/.exec(face)?.[1];
      if (!url) continue;
      const bytes = await readFile(path.resolve(".next/static/chunks", url));
      css += face.replace(url, `data:font/woff2;base64,${bytes.toString("base64")}`);
      fontFamily = "Poppins";
    }
  }
});

async function mount(page: Page, view: string, scale = 100) {
  const errors: string[] = [];
  const unexpected: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin || route.request().method() !== "GET") { unexpected.push(url.origin + url.pathname); return route.abort(); }
    if (url.pathname === "/bundle.js") return route.fulfill({ contentType: "application/javascript", body: javascript });
    if (url.pathname === "/styles.css") return route.fulfill({ contentType: "text/css", body: css });
    if (url.pathname.startsWith("/api/")) return route.fulfill({ json: { context: { id: laboratoryId, name: "Laboratório de teste", status: "ACTIVE", membershipRole: "OWNER", readOnly: false }, areas: [{ id: diagnosis.areaId, name: "Área de teste", location: { latitude: -3.5, longitude: -44.1 }, confirmedCollections: [collection] }] } });
    return route.fulfill({ contentType: "text/html", body: `<!doctype html><html lang="pt-BR" style="font-size:${scale}%;--font-poppins:${fontFamily}"><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>` });
  });
  await page.goto(origin + view);
  await page.locator("main").waitFor();
  await page.evaluate(() => document.fonts.ready);
  return () => { expect(errors).toEqual([]); expect(unexpected).toEqual([]); };
}

for (const width of [320, 375, 768, 1024, 1440]) for (const scale of [100, 200]) {
  test(`detail and summary: ${width}px text ${scale}%`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const clean = await mount(page, "/detail", scale);
    await expect(page.getByRole("heading", { name: "Diagnóstico IHFR experimental", exact: true })).toBeVisible();
    await expect(page.getByText("Moderado", { exact: true })).toBeVisible();
    const reading = page.getByRole("region", { name: "Diagnóstico IHFR experimental", exact: true });
    await expect(reading).toContainText("0,49");
    await expect(reading.getByText("IHFR registrado", { exact: true })).toBeVisible();
    await expect(reading).not.toContainText(/\bescore\b|\bscore\b/i);
    for (const value of ["0,63", "0,40", "0,57", "0,36"]) await expect(reading).toContainText(value);
    await expect(reading).not.toContainText(/0\.629999|MODERATE|CURRENT|HIGH/);
    await expect.poll(() => page.locator("[data-collection-detail-block]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-collection-detail-block")))).toEqual(width >= 1280 ? ["header", "environmental", "record", "reading", "actions"] : ["header", "reading", "environmental", "record", "actions"]);
    const geometry = await page.getByText("Moderado", { exact: true }).evaluate(node => {
      const r = node.getBoundingClientRect(); const range = document.createRange(); range.selectNodeContents(node); const text = range.getBoundingClientRect();
      return { right: text.right, parentRight: r.right, height: text.height, lineHeight: parseFloat(getComputedStyle(node).lineHeight), scroll: document.documentElement.scrollWidth, width: innerWidth };
    });
    expect(geometry.scroll).toBeLessThanOrEqual(width);
    expect(geometry.right).toBeLessThanOrEqual(geometry.parentRight + 1);
    expect(geometry.height).toBeLessThanOrEqual(geometry.lineHeight + 1);
    if (scale === 100 && [375, 1440].includes(width)) await page.screenshot({ path: `test-results/ui-presentation/detail-${width}.png`, fullPage: true });
    clean();
    await page.goto(origin + "/summary");
    const summary = page.getByRole("complementary", { name: "Último IHFR disponível da área" });
    await expect(summary.getByText("0,49", { exact: true })).toBeVisible();
    await expect(summary).toContainText("Último IHFR experimental disponível");
    await expect(summary).toContainText("validação científica pendente");
    const colors = await summary.evaluate(node => ({ background: getComputedStyle(node).backgroundColor, scroll: document.documentElement.scrollWidth }));
    expect(colors.scroll).toBeLessThanOrEqual(width);
    expect(colors.background).not.toBe("rgba(255, 251, 235, 0.7)");
    if (scale === 100 && [375, 1440].includes(width)) await page.screenshot({ path: `test-results/ui-presentation/summary-${width}.png`, fullPage: true });
    clean();
  });
}

for (const width of [375, 1440]) test(`absent diagnosis keeps scientific limits collapsed and keyboard accessible: ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  const clean = await mount(page, "/no-diagnosis");
  const disclosure = page.locator("details");
  const toggle = disclosure.locator("summary");
  const notice = disclosure.getByText("Limites do diagnóstico experimental", { exact: true });
  await expect(toggle).toHaveText("Ler mais: limites do diagnóstico experimental");
  await expect(disclosure).not.toHaveAttribute("open");
  await expect(notice).not.toBeVisible();
  await expect(page.getByRole("region")).not.toContainText(/\bescore\b|\bscore\b/i);
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(notice).toBeVisible();
  for (const label of diagnosis.scientificLabels) await expect(disclosure.getByText(label, { exact: true })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(notice).not.toBeVisible();
  clean();
});

test("map confirmation is first, bold, concise and keeps complete timestamps", async ({ page }) => {
  const clean = await mount(page, "/map");
  await page.locator('button[aria-controls="selected-area-panel"]').click();
  const item = page.locator("#selected-area-panel li").first();
  await expect(item.locator("p").nth(0)).toHaveText("Confirmação: 30/10/2026 às 17:26");
  await expect(item.locator("p").nth(1)).toHaveText("Ocorrência: 30/10/2026 às 17:26");
  await expect(item.locator("strong time")).toHaveAttribute("datetime", collection.confirmedAt);
  expect(await item.locator("strong").evaluate(node => Number(getComputedStyle(node).fontWeight))).toBeGreaterThanOrEqual(600);
  await expect(page.getByRole("button", { name: "Aproximar", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Afastar", exact: true })).toBeVisible();
  await expect(page.getByTitle("Biblioteca para mapas interativos")).toBeVisible();
  clean();
});

test("responsive order keeps inputs, focus, disclosures and one controller", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const clean = await mount(page, "/detail");
  const input = page.getByLabel("Data e hora da observação", { exact: true });
  await input.fill("2026-10-30T15:45");
  await page.getByText("Ler mais: limites do diagnóstico experimental", { exact: true }).click();
  await input.focus();
  await page.setViewportSize({ width: 375, height: 844 });
  await expect(input).toHaveValue("2026-10-30T15:45");
  await expect(input).toBeFocused();
  await expect(page.locator("details").filter({ hasText: "Ler mais: limites" })).toHaveAttribute("open", "");
  await expect(page.locator("fieldset")).toHaveCount(1);
  await expect.poll(() => page.locator("[data-collection-detail-block]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-collection-detail-block")))).toEqual(["header", "reading", "environmental", "record", "actions"]);
  clean();
  await page.goto(origin + "/detail?readonly=1");
  await expect(page.locator('[data-collection-detail-block="actions"]')).toHaveCount(0);
  await expect(page.locator("fieldset")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Registro", exact: true })).toBeVisible();
  clean();
});
