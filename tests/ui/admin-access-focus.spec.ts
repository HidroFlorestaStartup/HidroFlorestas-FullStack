import { expect, test, type Page } from "@playwright/test";
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const origin = "http://admin-access-focus.invalid";
const accessMessage = "Seu acesso à administração não está mais disponível. Atualize a página para continuar.";
const missingMessage = "Esta conta não está mais disponível. Atualize a lista para continuar.";
const user = (id: string) => ({ id, firstName: id === "account-a" ? "PessoaA" : "PessoaB", lastName: "Sintética", email: `${id}@example.invalid`, role: "USER", status: "ACTIVE", revision: 0, createdAt: "2026-10-25T00:00:00.000Z", updatedAt: "2026-10-25T00:00:00.000Z" });

type ProbeEvent = { phase: string; alertPresent: boolean };
declare global {
  interface Window {
    adminFocus: {
      hold: boolean;
      held: Array<{ task: { callback: unknown }; run: () => void }>;
      pending: Array<{ pathname: string; signal: AbortSignal; resolve: (response: Response) => void }>;
      events: ProbeEvent[];
      automatic: Record<string, { status: number; body: unknown }>;
      respond: (index: number, status: number, body: unknown) => void;
      release: () => void;
      step: () => void;
      deferSelection: () => void;
      frame: () => Promise<void>;
      unmount: () => void;
    };
  }
}

let javascript: string;
let css: string;
test.beforeAll(async () => {
  const require = createRequire(path.resolve("package.json"));
  const schedulerPath = require.resolve("scheduler").replaceAll("\\", "/");
  const bundle = await build({
    stdin: {
      contents: `import { createRoot } from 'react-dom/client';
        import { startTransition } from 'react';
        import { UserAdministrationPage } from './src/components/user-administration/user-administration-page';
        const nativeFrame = window.requestAnimationFrame.bind(window);
        const control = window.adminFocus = { hold: false, held: [], pending: [], events: [], automatic: {},
          respond(index, status, body) { this.pending[index].resolve(new Response(JSON.stringify(body), {status, headers:{'content-type':'application/json'}})); },
          release() { this.hold=false; const held=this.held.splice(0); for(const item of held) if(item.task.callback) item.run(); },
          step() { const item=this.held.shift(); if(item?.task.callback) item.run(); },
          // Synthetic control: invoke the real React handler outside a discrete DOM event.
          deferSelection() { startTransition(() => {
            const button=document.querySelector('[aria-label="Ver conta de PessoaA Sintética"]');
            const key=Object.keys(button).find(name=>name.startsWith('__reactProps$'));
            if(!key) throw new Error('Synthetic React handler unavailable');
            button[key].onClick();
          }); },
          frame() { return new Promise(resolve => nativeFrame(() => resolve())); }, unmount() {} };
        window.requestAnimationFrame = callback => nativeFrame(time => {
          control.events.push({phase:'native-raf',alertPresent:!!document.querySelector('[role="alert"]')}); callback(time);
        });
        new MutationObserver(() => control.events.push({phase:'dom-mutation',alertPresent:!!document.querySelector('[role="alert"]')}))
          .observe(document.getElementById('root'), {childList:true,subtree:true});
        document.addEventListener('focusin', event => { if(event.target?.getAttribute('role')==='alert') control.events.push({phase:'focus-alert',alertPresent:true}); });
        // Fake API intentionally permits late delivery after AbortSignal cancellation.
        // This is a discard control, not a real authorization or network response.
        window.fetch = (input, options) => new Promise((resolve, reject) => {
          const url=new URL(String(input),location.origin);
          if(url.origin!==location.origin || !url.pathname.startsWith('/api/admin/users') || (options?.method && options.method!=='GET')) { reject(new Error('Unexpected synthetic API operation')); return; }
          control.events.push({phase:'read:'+url.pathname,alertPresent:!!document.querySelector('[role="alert"]')});
          control.pending.push({pathname:url.pathname,signal:options?.signal,resolve});
          const automatic=control.automatic[url.pathname];
          if(automatic) resolve(new Response(JSON.stringify(automatic.body),{status:automatic.status,headers:{'content-type':'application/json'}}));
        });
        const root=createRoot(document.getElementById('root'));
        control.unmount=()=>root.unmount();
        root.render(<UserAdministrationPage />);`,
      resolveDir: process.cwd(), loader: "tsx",
    },
    bundle: true, write: false, format: "iife", jsx: "automatic",
    define: { "process.env.NODE_ENV": '"development"' },
    plugins: [{
      name: "synthetic-boundaries",
      setup(builder) {
        builder.onResolve({ filter: /^next\/link$/ }, () => ({ path: "link", namespace: "synthetic" }));
        builder.onResolve({ filter: /^scheduler$/ }, () => ({ path: "scheduler", namespace: "synthetic" }));
        builder.onLoad({ filter: /.*/, namespace: "synthetic" }, args => args.path === "link" ? {
          loader: "js", resolveDir: process.cwd(), contents: `import {createElement} from 'react'; export default function Link({href,children,...props}){return createElement('a',{href,...props},children);}`,
        } : {
          loader: "js", resolveDir: process.cwd(),
          contents: `const original=require(${JSON.stringify(schedulerPath)});
            module.exports={...original,unstable_cancelCallback(task){
              if(task.synthetic){task.callback=null;if(task.native)original.unstable_cancelCallback(task.native);}
              else original.unstable_cancelCallback(task);
            },unstable_scheduleCallback(priority,callback,options){
              const control=window.adminFocus;
              if(control?.hold){const task={callback,synthetic:true,native:null};control.held.push({task,run:()=>{task.native=original.unstable_scheduleCallback(priority,task.callback,options);}});return task;}
              return original.unstable_scheduleCallback(priority,callback,options);
            }};`,
        });
      },
    }],
  });
  javascript = bundle.outputFiles[0].text;
  css = (await postcss([tailwind()]).process(await readFile("src/app/globals.css", "utf8"), { from: path.resolve("src/app/globals.css") })).css;
});

async function openAdministration(page: Page) {
  const unexpected: string[] = [];
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.route("**/*", route => {
    const url = new URL(route.request().url());
    if (url.origin === origin && route.request().method() === "GET") {
      if (url.pathname === "/bundle.js") return route.fulfill({ contentType: "application/javascript", body: javascript });
      if (url.pathname === "/styles.css") return route.fulfill({ contentType: "text/css", body: css });
      if (url.pathname === "/admin/users") return route.fulfill({ contentType: "text/html", body: '<!doctype html><html lang="pt-BR"><head><link rel="stylesheet" href="/styles.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>' });
    }
    unexpected.push(route.request().method() + " " + url.pathname);
    return route.abort();
  });
  await page.goto(`${origin}/admin/users`);
  await expect.poll(() => page.evaluate(() => window.adminFocus.pending.length)).toBe(1);
  await respond(page, 0, 200, { items: [user("account-a"), user("account-b")], nextCursor: null });
  await expect(page.getByRole("button", { name: "Ver conta de PessoaA Sintética", exact: true })).toBeVisible();
  return () => { expect(unexpected).toEqual([]); expect(errors).toEqual([]); };
}

async function respond(page: Page, index: number, status: number, body: unknown = { error: { message: "Resposta sintética" } }) {
  await page.evaluate(({ index, status, body }) => window.adminFocus.respond(index, status, body), { index, status, body });
}

async function selectA(page: Page) {
  await page.getByRole("button", { name: "Ver conta de PessoaA Sintética", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.adminFocus.pending.length)).toBe(3);
}

test("delayed commit keeps native rAF and focuses the materialized access alert", async ({ page }, info) => {
  const check = await openAdministration(page);
  await selectA(page);
  await expect(page.getByRole("heading", { name: "PessoaA Sintética", exact: true })).toBeFocused();
  await page.evaluate(() => { window.adminFocus.hold = true; window.adminFocus.events = []; });
  await respond(page, 1, 403);
  await expect.poll(() => page.evaluate(() => window.adminFocus.held.length)).toBeGreaterThan(0);
  // Native frame runs while the synthetic scheduler control holds the commit.
  await page.evaluate(() => window.adminFocus.frame());
  await expect(page.getByRole("alert")).toHaveCount(0);
  const beforeCommit = await page.evaluate(() => window.adminFocus.events);
  await page.evaluate(() => window.adminFocus.release());
  const alert = page.getByRole("alert").filter({ hasText: accessMessage });
  await expect(alert).toBeVisible();
  const timing = { control: "scheduler-held-before-commit", beforeCommit, afterCommit: await page.evaluate(() => window.adminFocus.events), alertFocused: await alert.evaluate(node => node === document.activeElement) };
  await writeFile(info.outputPath("timing.json"), JSON.stringify(timing, null, 2) + "\n");
  await info.attach("synthetic-scheduler-native-raf", { path: info.outputPath("timing.json"), contentType: "application/json" });
  await expect(alert).toBeFocused();
  await expect(page.getByRole("heading", { name: "PessoaA Sintética", exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => window.adminFocus.pending.slice(1).every(item => item.signal.aborted))).toBe(true);
  check();
});

for (const status of [401, 403, 404]) {
  for (const source of ["detail", "audit"] as const) {
    test(`${status} from ${source} clears stale state and focuses its alert`, async ({ page }) => {
      const check = await openAdministration(page);
      await selectA(page);
      await respond(page, source === "detail" ? 1 : 2, status);
      const alert = page.getByRole("alert").filter({ hasText: status === 404 ? missingMessage : accessMessage });
      await expect(alert).toBeFocused();
      await expect(page.getByRole("heading", { name: "PessoaA Sintética", exact: true })).toHaveCount(0);
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(page.getByRole("complementary", { name: "Detalhe da conta" })).toContainText("Selecione uma conta");
      await expect(page.getByRole("button", { name: "Ver conta de PessoaA Sintética", exact: true })).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Ver conta de PessoaB Sintética", exact: true })).toHaveCount(status === 404 ? 1 : 0);
      expect(await page.evaluate(() => window.adminFocus.pending.slice(1).every(item => item.signal.aborted))).toBe(true);
      check();
    });
  }
}

test("a repeated identical message focuses the new occurrence, not an unrelated list refresh", async ({ page }) => {
  const check = await openAdministration(page);
  await selectA(page);
  await respond(page, 1, 404);
  const alert = page.getByRole("alert").filter({ hasText: missingMessage });
  await expect(alert).toBeFocused();
  const search = page.getByPlaceholder("Pesquisar nome ou email");
  await search.focus();
  await page.getByRole("button", { name: "Atualizar", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.adminFocus.pending.length)).toBe(4);
  await search.focus();
  await respond(page, 3, 200, { items: [user("account-b")], nextCursor: null });
  await expect(page.getByRole("button", { name: "Ver conta de PessoaB Sintética", exact: true })).toBeVisible();
  await expect(search).toBeFocused();
  await expect(alert).toBeVisible();
  await page.getByRole("button", { name: "Ver conta de PessoaB Sintética", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.adminFocus.pending.length)).toBe(6);
  await respond(page, 4, 404);
  await expect(alert).toBeFocused();
  check();
});

test("two denied reads focus once and a discarded late result does not steal focus", async ({ page }) => {
  const check = await openAdministration(page);
  await selectA(page);
  await page.evaluate(() => {
    window.adminFocus.events = [];
    window.adminFocus.respond(1, 403, { error: {} });
    window.adminFocus.respond(2, 401, { error: {} });
  });
  await expect(page.getByRole("alert").filter({ hasText: accessMessage })).toBeFocused();
  const search = page.getByPlaceholder("Pesquisar nome ou email");
  await search.focus();
  await page.evaluate(() => window.adminFocus.frame());
  await expect(search).toBeFocused();
  expect(await page.evaluate(() => window.adminFocus.events.filter(item => item.phase === "focus-alert").length)).toBe(1);
  check();
});

test("superseded reads do not clear the current account or focus an old alert", async ({ page }) => {
  const check = await openAdministration(page);
  await selectA(page);
  await page.getByRole("button", { name: "Ver conta de PessoaB Sintética", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.adminFocus.pending.length)).toBe(5);
  await respond(page, 1, 403);
  await respond(page, 2, 404);
  await respond(page, 3, 200, user("account-b"));
  await respond(page, 4, 200, { items: [], nextCursor: null });
  await expect(page.getByRole("heading", { name: "PessoaB Sintética", exact: true })).toBeFocused();
  await expect(page.getByRole("alert")).toHaveCount(0);
  expect(await page.evaluate(() => window.adminFocus.pending.slice(1, 3).every(item => item.signal.aborted))).toBe(true);
  check();
});

test("a denied audit closes the existing dialog without a mutation", async ({ page }) => {
  const check = await openAdministration(page);
  await selectA(page);
  await respond(page, 1, 200, user("account-a"));
  await page.getByRole("button", { name: "Bloqueada", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await respond(page, 2, 403);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("alert").filter({ hasText: accessMessage })).toBeFocused();
  expect(await page.evaluate(() => window.adminFocus.pending.length)).toBe(3);
  check();
});

test("unmount cancels reads and prevents late focus or data restoration", async ({ page }) => {
  const check = await openAdministration(page);
  await selectA(page);
  await page.evaluate(() => {
    window.adminFocus.unmount();
    const control = document.createElement("button");
    control.id = "after-unmount";
    control.textContent = "Depois da desmontagem";
    document.body.append(control);
    control.focus();
    window.adminFocus.respond(1, 403, { error: {} });
    window.adminFocus.respond(2, 404, { error: {} });
  });
  await page.evaluate(() => window.adminFocus.frame());
  await expect(page.locator("#after-unmount")).toBeFocused();
  await expect(page.getByRole("alert")).toHaveCount(0);
  expect(await page.evaluate(() => window.adminFocus.pending.slice(1).every(item => item.signal.aborted))).toBe(true);
  check();
});

test("an immediate denial before a deferred selection commit still focuses its alert", async ({ page }, info) => {
  const check = await openAdministration(page);
  await page.evaluate(() => {
    window.adminFocus.events = [];
    window.adminFocus.hold = true;
    window.adminFocus.automatic["/api/admin/users/account-a"] = { status: 403, body: { error: {} } };
    window.adminFocus.deferSelection();
  });
  await expect.poll(() => page.evaluate(() => window.adminFocus.pending.length)).toBe(3);
  await expect.poll(() => page.evaluate(() => window.adminFocus.held.length)).toBeGreaterThan(0);
  await expect(page.getByRole("heading", { name: "PessoaA Sintética", exact: true })).toHaveCount(0);
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.evaluate(() => window.adminFocus.frame());
  const beforeCommit = await page.evaluate(() => window.adminFocus.events);
  await page.evaluate(() => window.adminFocus.release());
  await expect(page.getByRole("alert").filter({ hasText: accessMessage })).toBeFocused();
  await expect(page.getByRole("heading", { name: "PessoaA Sintética", exact: true })).toHaveCount(0);
  await writeFile(info.outputPath("immediate-denial.json"), JSON.stringify({ control: "real-handler-outside-discrete-event-with-selection-transition-and-held-scheduler", beforeCommit, afterCommit: await page.evaluate(() => window.adminFocus.events) }, null, 2) + "\n");
  check();
});

test("a retained passive callback does not refocus an alert after a newer selection", async ({ page }, info) => {
  const check = await openAdministration(page);
  await selectA(page);
  await expect(page.getByRole("heading", { name: "PessoaA Sintética", exact: true })).toBeFocused();
  await page.evaluate(() => { window.adminFocus.hold = true; window.adminFocus.events = []; });
  await respond(page, 1, 404);
  await expect.poll(() => page.evaluate(() => window.adminFocus.held.length)).toBeGreaterThan(0);
  // Release only the render callback; passive work requested by that commit stays held.
  await page.evaluate(() => window.adminFocus.step());
  const alert = page.getByRole("alert").filter({ hasText: missingMessage });
  await expect(alert).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.adminFocus.held.length)).toBeGreaterThan(0);
  const beforeAction = await page.evaluate(() => ({ alertFocused: document.activeElement?.getAttribute("role") === "alert", retainedCallbacks: window.adminFocus.held.length }));
  expect(beforeAction.alertFocused).toBe(false);
  await page.evaluate(() => window.adminFocus.events.push({ phase: "new-selection-action", alertPresent: true }));
  await page.getByRole("button", { name: "Ver conta de PessoaB Sintética", exact: true }).click();
  await expect(page.getByRole("heading", { name: "PessoaB Sintética", exact: true })).toBeFocused();
  await expect(alert).toHaveCount(0);
  const duringAction = await page.evaluate(() => window.adminFocus.events);
  const oldFocus = duringAction.findIndex(item => item.phase === "focus-alert");
  const newRead = duringAction.findIndex(item => item.phase === "read:/api/admin/users/account-b");
  await writeFile(info.outputPath("retained-passive-before-check.json"), JSON.stringify({ control: "single-render-step-before-new-selection", beforeAction, duringAction, oldFocus, newRead }, null, 2) + "\n");
  // React may flush pending effects before handling B. It must not refocus A
  // after choose(B) has changed selectedId and started its new detail read.
  expect(newRead).toBeGreaterThanOrEqual(0);
  if (oldFocus >= 0) expect(oldFocus).toBeLessThan(newRead);
  const search = page.getByPlaceholder("Pesquisar nome ou email");
  await search.focus();
  await page.evaluate(() => { window.adminFocus.events = []; window.adminFocus.release(); });
  await page.evaluate(() => window.adminFocus.frame());
  await expect(search).toBeFocused();
  const afterAction = await page.evaluate(() => window.adminFocus.events);
  expect(afterAction.filter(item => item.phase === "focus-alert")).toHaveLength(0);
  await writeFile(info.outputPath("retained-passive.json"), JSON.stringify({ control: "single-render-step-before-new-selection", beforeAction, duringAction, afterAction }, null, 2) + "\n");
  check();
});
