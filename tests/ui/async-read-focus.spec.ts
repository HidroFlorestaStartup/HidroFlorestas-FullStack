import { expect, test, type Locator, type Page } from "@playwright/test";
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFile } from "node:fs/promises";
import path from "node:path";

type View = "summary" | "history" | "map";
type Reply = { status?: number; json: unknown };
type Plan = (call: number, url: URL) => Reply | Promise<Reply>;
const origin = "http://read-focus.invalid";
const lab = "00000000-0000-4000-8000-000000000411";
const otherLab = "00000000-0000-4000-8000-000000000412";
const areaId = "00000000-0000-4000-8000-000000000421";
const failure: Reply = { status: 503, json: { error: { code: "INTERNAL_ERROR", message: "Falha sintética controlada." } } };
let javascript: string;
let css: string;

function context(id = lab) {
  return { id, name: id === lab ? "Laboratório sintético ÁÇ" : "Outro laboratório sintético", status: "ACTIVE", readOnly: false, membershipRole: "MEMBER" };
}
function success(view: View, url: URL, empty = false): Reply {
  const id = url.pathname.includes(otherLab) ? otherLab : lab;
  if (view === "summary") return { json: { context: context(id), totals: { areas: empty ? 0 : 8, confirmedCollections: empty ? 0 : 8 }, links: { areas: `/dashboard/laboratories/${id}/areas` } } };
  if (view === "history") return { json: {
    context: context(id),
    items: Array.from({ length: empty ? 0 : url.search ? 2 : 20 }, (_, index) => ({
      id: `AREA_CREATED:${areaId}-${index}`, type: "AREA_CREATED", label: "Área criada", eventAt: "2026-10-25T12:00:00.000Z",
      area: { id: areaId, name: `${id === lab ? "Área sintética" : "Área do outro laboratório"} ${index} ${"Ç".repeat(60)}` },
      destination: `/dashboard/laboratories/${id}/areas/${areaId}`,
    })),
    page: { nextCursor: empty || url.search ? null : "synthetic-next" },
  } };
  return { json: { context: context(id), areas: empty ? [] : Array.from({ length: 8 }, (_, index) => ({
    id: areaId.slice(0, -1) + index, name: `Área sintética ${index} ${"Ç".repeat(60)}`,
    location: index === 7 ? null : { latitude: -3.5 + index / 100, longitude: -44.1 },
    confirmedCollections: [{ id: "00000000-0000-4000-8000-000000000431", occurredAt: "2026-10-25T09:00:00.000-03:00", confirmedAt: "2026-10-25T12:00:00.000Z" }],
  })) } };
}
function deferred() {
  let release!: () => void;
  const promise = new Promise<void>(resolve => { release = resolve; });
  return { promise, release };
}

test.beforeAll(async () => {
  const result = await build({
    stdin: { resolveDir: process.cwd(), loader: "tsx", contents: `
import {createRoot} from 'react-dom/client'; import {useState} from 'react';
import {AuthProvider} from './src/contexts/auth.context'; import {ApplicationShell} from './src/components/shell/application-shell';
import {DashboardSummary} from './src/components/dashboard/dashboard-summary'; import {DashboardHistory} from './src/components/dashboard/dashboard-history';
import {TerritorialMapView} from './src/components/territorial-map/territorial-map-view';
const view=location.pathname.split('/').pop();
function App(){const [id,setId]=useState('${lab}');const [shown,setShown]=useState(true);return <AuthProvider><ApplicationShell scope="/dashboard" canAdmin={true}><main className="grid min-w-0 gap-6">
<button type="button" data-testid="outside">Controle externo</button><button type="button" data-testid="context" onClick={()=>setId('${otherLab}')}>Trocar laboratório</button>
<button type="button" data-testid="unmount" onClick={()=>setShown(false)}>Sair da consulta</button>
<div data-testid="reader-host">{shown&&(view==='map'?<TerritorialMapView laboratoryId={id}/>:view==='history'?<DashboardHistory laboratoryId={id}/>:<DashboardSummary laboratoryId={id}/>)}</div>
</main></ApplicationShell></AuthProvider>};createRoot(document.getElementById('root')).render(<App/>);` },
    bundle: true, write: false, outdir: "test-results/async-read-focus/bundle", format: "iife", jsx: "automatic", loader: { ".png": "dataurl" },
    define: { "process.env.NODE_ENV": '"development"', "process.env.NEXT_PUBLIC_MAP_TILE_URL": "undefined", "process.env.NEXT_PUBLIC_MAP_ATTRIBUTION": "undefined" },
    plugins: [{ name: "offline-next", setup(builder) {
      builder.onResolve({ filter: /^next\/(link|navigation|image|dynamic)$/ }, args => ({ path: args.path, namespace: "offline-next" }));
      builder.onLoad({ filter: /.*/, namespace: "offline-next" }, args => ({ loader: "tsx", resolveDir: process.cwd(), contents:
        args.path === "next/link" ? `import React from 'react';export default function Link({href,children,...p}){return <a href={href} {...p}>{children}</a>}` :
        args.path === "next/navigation" ? `export function usePathname(){return location.pathname} export function useRouter(){return {push(){},replace(){},refresh(){}}}` :
        args.path === "next/image" ? `import React from 'react';export default function Image({src,priority,fill,...p}){return <img src={typeof src==='string'?src:src.src} {...p}/>} ` :
          `import React,{lazy,Suspense} from 'react';export default function dynamic(load,o){const C=lazy(load);return p=><Suspense fallback={o.loading?.()}><C {...p}/></Suspense>}`,
      }));
    } }],
  });
  javascript = result.outputFiles.find(file => file.path.endsWith(".js"))!.text;
  const global = (await postcss([tailwind()]).process(await readFile("src/app/globals.css", "utf8"), { from: path.resolve("src/app/globals.css") })).css;
  css = global + result.outputFiles.find(file => file.path.endsWith(".css"))!.text;
});

async function mount(page: Page, view: View, plan: Plan = (_call, url) => success(view, url), text = 100) {
  const requests: URL[] = [];
  const unexpected: string[] = [];
  const errors: string[] = [];
  const blockedTiles: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.route("**/*", async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin) {
      if (url.hostname === "tile.openstreetmap.org") blockedTiles.push(url.pathname);
      else unexpected.push(request.url());
      return route.abort();
    }
    if (request.method() !== "GET") { unexpected.push(request.method() + " " + url.pathname); return route.abort(); }
    if (url.pathname === "/bundle.js") return route.fulfill({ contentType: "application/javascript", body: javascript });
    if (url.pathname === "/styles.css") return route.fulfill({ contentType: "text/css", body: css });
    if (url.pathname.startsWith("/api/laboratories/")) {
      requests.push(url);
      const reply = await plan(requests.length, url);
      // An intentionally aborted request may have closed before its synthetic reply.
      if (request.failure()) return;
      return route.fulfill(reply);
    }
    if (url.pathname.startsWith("/dashboard/")) return route.fulfill({ contentType: "text/html", body:
      `<!doctype html><html lang="pt-BR" style="font-size:${text}%;--font-poppins:Arial"><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>` });
    return route.fulfill({ status: 404, body: "" });
  });
  await page.goto(`${origin}/dashboard/laboratories/${lab}/${view}`);
  const region = page.getByTestId("reader-host").locator(":scope > *");
  const assertClean = () => { expect(unexpected).toEqual([]); expect(errors).toEqual([]); };
  return { region, requests, blockedTiles, assertClean };
}

async function loaded(page: Page, view: View) {
  if (view === "history") await expect(page.getByRole("button", { name: "Mais antigos" })).toBeVisible();
  else if (view === "summary") await expect(page.getByRole("link", { name: /Áreas autorizadas/ })).toBeVisible();
  else await expect(page.getByRole("button", { name: /Área sintética 7/ })).toBeVisible();
}
async function focusRegion(region: Locator) {
  await expect(region).toBeFocused();
  await expect(region).toHaveAttribute("tabindex", "-1");
  await expect.poll(() => region.evaluate(node => {
    const style = getComputedStyle(node);
    const name = node.getAttribute("aria-label") || document.getElementById(node.getAttribute("aria-labelledby") || "")?.textContent;
    return Boolean(name) && style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2;
  })).toBe(true);
}

test("history pagination, return and refresh retain the same focused region", async ({ page }) => {
  const gate = deferred();
  const { region, requests, assertClean } = await mount(page, "history", async (call, url) => { if (call === 2) await gate.promise; return success("history", url); });
  await loaded(page, "history");
  const identity = await region.elementHandle();
  const older = page.getByRole("button", { name: "Mais antigos" });
  await older.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("status", { name: "Carregando histórico" })).toBeVisible();
  await expect(region.getByRole("listitem")).toHaveCount(0);
  await focusRegion(region);
  gate.release();
  await expect(region.getByRole("listitem")).toHaveCount(2);
  expect(await region.evaluate((node, previous) => node === previous, identity)).toBe(true);
  await focusRegion(region);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Atualizar histórico" })).toBeFocused();
  await page.getByRole("button", { name: "Mais recentes" }).focus(); await page.keyboard.press("Enter");
  await expect(region.getByRole("listitem")).toHaveCount(20); await focusRegion(region);
  await page.getByRole("button", { name: "Atualizar histórico" }).focus(); await page.keyboard.press("Enter");
  await expect.poll(() => requests.length).toBe(4); await expect(region.getByRole("listitem")).toHaveCount(20); await focusRegion(region);
  expect(requests.map(url => url.search)).toEqual(["", "?cursor=synthetic-next", "", ""]);
  assertClean();
});

for (const view of ["summary", "history", "map"] as const) {
  test(`${view}: retry keeps identity and focus through repeated error then empty success`, async ({ page }) => {
    const gate = deferred();
    const { region, requests, assertClean } = await mount(page, view, async (call, url) => {
      if (call === 2) await gate.promise;
      return call < 3 ? failure : success(view, url, true);
    });
    const retry = page.getByRole("button", { name: "Tentar novamente" });
    await expect(retry).toBeVisible();
    const identity = await region.elementHandle();
    await retry.focus(); await page.keyboard.press("Enter");
    await expect(region.getByRole("alert")).toHaveCount(0); await focusRegion(region);
    gate.release();
    await expect(retry).toBeVisible(); await focusRegion(region);
    expect(await region.evaluate((node, previous) => node === previous, identity)).toBe(true);
    await page.keyboard.press("Tab");
    if (view === "map") {
      await expect(page.getByRole("link", { name: "Voltar ao resumo" })).toBeFocused();
      await page.keyboard.press("Tab");
    }
    await expect(retry).toBeFocused(); await page.keyboard.press("Enter");
    await expect.poll(() => requests.length).toBe(3);
    if (view === "summary") await loaded(page, view);
    else await expect(region.getByText(view === "history" ? "Nenhuma atividade elegível neste laboratório." : "Nenhuma área cadastrada", { exact: true })).toBeVisible();
    await focusRegion(region);
    expect(await region.evaluate((node, previous) => node === previous, identity)).toBe(true);
    assertClean();
  });

  test(`${view}: initial load and unfocused activation do not move focus`, async ({ page }) => {
    const initial = deferred(); const retryGate = deferred();
    const { region, requests, assertClean } = await mount(page, view, async (call, url) => { await (call === 1 ? initial.promise : retryGate.promise); return call === 1 ? failure : success(view, url); });
    const outside = page.getByTestId("outside"); await outside.focus(); initial.release();
    const retry = page.getByRole("button", { name: "Tentar novamente" }); await expect(retry).toBeVisible(); await expect(outside).toBeFocused();
    await retry.evaluate(node => { if (node instanceof HTMLButtonElement) node.click(); });
    await expect.poll(() => requests.length).toBe(2); await expect(outside).toBeFocused();
    retryGate.release(); await loaded(page, view); await expect(outside).toBeFocused();
    expect(await region.evaluate(node => node === document.activeElement)).toBe(false); assertClean();
  });

  for (const outcome of ["success", "error"] as const) test(`${view}: explicit user focus during a delayed ${outcome} wins`, async ({ page }) => {
    const gate = deferred();
    const { region, assertClean } = await mount(page, view, async (call, url) => { if (call === 2) await gate.promise; return call === 1 || outcome === "error" ? failure : success(view, url); });
    const retry = page.getByRole("button", { name: "Tentar novamente" }); await expect(retry).toBeVisible();
    await retry.focus(); await page.keyboard.press("Enter"); await focusRegion(region);
    const outside = page.getByTestId("outside"); await outside.focus(); gate.release();
    if (outcome === "success") await loaded(page, view);
    else await expect(retry).toBeVisible();
    await expect(outside).toBeFocused(); assertClean();
  });

  test(`${view}: context replacement aborts the old read without stale focus or data`, async ({ page }) => {
    const old = deferred();
    const { requests, assertClean } = await mount(page, view, async (_call, url) => { if (!url.pathname.includes(otherLab)) await old.promise; return success(view, url); });
    await expect.poll(() => requests.length).toBe(1);
    const aborted = page.waitForEvent("requestfailed", request => request.url().includes(`/api/laboratories/${lab}/`));
    const change = page.getByTestId("context"); await change.focus(); await page.keyboard.press("Enter");
    await loaded(page, view); await expect(change).toBeFocused();
    await aborted;
    old.release();
    await expect(page.getByText("Laboratório sintético ÁÇ", { exact: true })).toHaveCount(0);
    await expect(change).toBeFocused();
    expect(requests.every(url => url.pathname.includes(lab) || url.pathname.includes(otherLab))).toBe(true); assertClean();
  });

  test(`${view}: unmount during an explicit retry never restores focus`, async ({ page }) => {
    const gate = deferred();
    const { region, assertClean } = await mount(page, view, async (call, url) => { if (call === 2) await gate.promise; return call === 1 ? failure : success(view, url); });
    const retry = page.getByRole("button", { name: "Tentar novamente" }); await expect(retry).toBeVisible();
    await retry.focus(); await page.keyboard.press("Enter"); await focusRegion(region);
    const leave = page.getByTestId("unmount"); await leave.focus(); await page.keyboard.press("Enter");
    gate.release(); await expect(region).toHaveCount(0); await expect(leave).toBeFocused(); assertClean();
  });
}

for (const width of [320, 375, 768, 1440]) for (const text of [100, 200]) {
  test(`history and map focus/reflow at ${width}px with text ${text}% and missing tiles`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 720 });
    let current = await mount(page, "history", undefined, text);
    await loaded(page, "history");
    await page.getByRole("button", { name: "Mais antigos" }).focus(); await page.keyboard.press("Enter");
    await expect(current.region.getByRole("listitem")).toHaveCount(2); await focusRegion(current.region);
    await page.keyboard.press("Tab"); await expect(page.getByRole("button", { name: "Atualizar histórico" })).toBeFocused();
    await visibleFocus(page);
    current.assertClean(); await page.screenshot({ path: info.outputPath("history-viewport.png"), fullPage: false });
    await page.unrouteAll({ behavior: "wait" });
    current = await mount(page, "map", (call, url) => call === 1 ? failure : success("map", url), text);
    const retry = page.getByRole("button", { name: "Tentar novamente" }); await expect(retry).toBeVisible();
    await retry.focus(); await page.keyboard.press("Enter"); await loaded(page, "map"); await focusRegion(current.region);
    await expect(page.getByText("Base cartográfica indisponível. A lista permanece completa.")).toBeVisible();
    expect(current.blockedTiles.length).toBeGreaterThan(0);
    const last = page.getByRole("button", { name: /Área sintética 7/ }); await last.focus(); await page.keyboard.press("Enter");
    const destination = page.getByRole("link", { name: "Abrir coleta", exact: true }); await destination.focus(); await expect(destination).toBeFocused(); await visibleFocus(page);
    current.assertClean(); await page.screenshot({ path: info.outputPath("map-viewport.png"), fullPage: false });
  });
}

async function visibleFocus(page: Page) {
  await expect.poll(() => page.evaluate(() => {
    const content = document.getElementById("application-content")!;
    const region = content.getBoundingClientRect();
    const focused = document.activeElement!.getBoundingClientRect();
    const header = document.getElementById("application-header")?.getBoundingClientRect().bottom ?? 0;
    const ownScroll = getComputedStyle(content).overflowY === "auto";
    return document.documentElement.scrollWidth <= innerWidth && content.scrollWidth <= content.clientWidth &&
      focused.top >= (ownScroll ? region.top : header) && focused.bottom <= (ownScroll ? region.bottom : innerHeight);
  })).toBe(true);
}
