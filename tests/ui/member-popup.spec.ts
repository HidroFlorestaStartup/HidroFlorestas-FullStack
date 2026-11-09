import { expect, test, type Page } from "@playwright/test";
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { LaboratoryMemberDto } from "../../src/types/laboratory.type";

const origin = "http://member-popup.invalid";
const laboratory = {
  id: "synthetic-laboratory",
  name: "Laboratório sintético",
  createdAt: "2026-10-25T12:00:00.000Z",
  status: "ACTIVE" as const,
  isOwner: true,
};
let javascript: string;
let css: string;

test.beforeAll(async () => {
  const result = await build({
    stdin: {
      contents: `import { createRoot } from 'react-dom/client';
        import { LaboratoryWorkspace } from './src/components/workspace/laboratory-workspace';
        createRoot(document.getElementById('root')).render(<LaboratoryWorkspace />);`,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    bundle: true,
    write: false,
    outdir: "test-results/member-popup/bundle",
    format: "iife",
    jsx: "automatic",
    define: { "process.env.NODE_ENV": '"development"' },
    plugins: [{
      name: "synthetic-next-link",
      setup(builder) {
        builder.onResolve({ filter: /^next\/link$/ }, args => ({ path: args.path, namespace: "synthetic-link" }));
        builder.onLoad({ filter: /.*/, namespace: "synthetic-link" }, () => ({
          loader: "js",
          resolveDir: process.cwd(),
          contents: `import { createElement } from 'react';
            export default function Link({href, children, ...props}) {
              return createElement('a', {href, ...props}, children);
            }`,
        }));
      },
    }],
  });
  javascript = result.outputFiles.find(file => file.path.endsWith(".js"))!.text;
  const moduleCss = result.outputFiles.find(file => file.path.endsWith(".css"))!.text;
  const globalCss = await readFile("src/app/globals.css", "utf8");
  css = (await postcss([tailwind()]).process(globalCss, { from: path.resolve("src/app/globals.css") })).css + moduleCss;
});

async function openWorkspace(page: Page, members: LaboratoryMemberDto[], isOwner = true) {
  const requests: string[] = [];
  const unexpected: string[] = [];
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.route("**/*", async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin || request.method() !== "GET") {
      unexpected.push(request.method() + " " + request.url());
      return route.abort();
    }
    if (url.pathname === "/bundle.js") return route.fulfill({ contentType: "application/javascript", body: javascript });
    if (url.pathname === "/styles.css") return route.fulfill({ contentType: "text/css", body: css });
    if (url.pathname === "/api/laboratories") {
      requests.push(url.pathname);
      return route.fulfill({ json: { success: true, laboratories: [{ ...laboratory, isOwner }] } });
    }
    if (url.pathname === `/api/laboratories/${laboratory.id}`) {
      requests.push(url.pathname);
      return route.fulfill({ json: { success: true, details: { ...laboratory, isOwner, members } } });
    }
    if (url.pathname === "/workspace") return route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="pt-BR"><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/styles.css"></head><body><div id="root"></div><script src="/bundle.js"></script></body></html>',
    });
    unexpected.push(request.url());
    return route.abort();
  });
  await page.goto(`${origin}/workspace`);
  const trigger = page.getByRole("button", { name: "Configurações", exact: true });
  await expect(trigger).toBeVisible();
  // Reach the actual trigger using keyboard, including the controls before it.
  for (let index = 0; index < 10 && !(await trigger.evaluate(node => node === document.activeElement)); index++) {
    await page.keyboard.press("Tab");
  }
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: laboratory.name });
  await expect(dialog.getByRole("heading", { name: "Membros", exact: true })).toBeVisible();
  return { trigger, dialog, requests, unexpected, errors };
}

for (const width of [320, 1280]) {
  test(`initials, text, fallbacks and keyboard focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    const members = [
      { name: "Ágata Çedro", initials: "ÁÇ" },
      { name: "João", initials: "J" },
      { name: "Ágata Çedro", initials: "AC" },
      { name: "   ", initials: "  " },
      { name: "", initials: "" },
      { name: "  Nome sintético  ", initials: " NS " },
      { name: "<img src=x onerror=alert(1)>", initials: "<>" },
    ];
    const { trigger, dialog, requests, unexpected, errors } = await openWorkspace(page, members);
    const list = dialog.getByRole("list");
    const rows = list.getByRole("listitem");
    await expect(rows).toHaveCount(members.length);
    const avatars = rows.locator('[aria-hidden="true"]');
    await expect(avatars).toHaveText(["ÁÇ", "J", "AC", "?", "?", "NS", "<>"]);
    await expect(rows.locator("span:not([aria-hidden])")).toHaveText(members.map(member => member.name.trim() || "Nome não informado"));
    expect(await list.ariaSnapshot()).not.toMatch(/ÁÇ|NS|\?|<>/);
    await expect(list.locator("img,button,a,input,[tabindex]")).toHaveCount(0);
    const close = dialog.getByRole("button", { name: "Fechar configurações" });
    // While loading, all controls are disabled and SettingsDialog focuses itself.
    if (await dialog.evaluate(node => node === document.activeElement)) await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "Excluir laboratório", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(requests).toEqual(["/api/laboratories", `/api/laboratories/${laboratory.id}`]);
    expect(unexpected).toEqual([]);
    expect(errors).toEqual([]);
  });

  test(`long names remain inside the scrolling popup at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 600 });
    const members = Array.from({ length: 40 }, (_, index) => ({
      name: index === 0 ? "Á".repeat(240) : `Membro sintético ${index} com nome composto`,
      initials: "MS",
    }));
    const { dialog, requests, unexpected, errors } = await openWorkspace(page, members, false);
    const rows = dialog.getByRole("listitem");
    await expect(rows).toHaveCount(40);
    await expect(rows.locator('[aria-hidden="true"]')).toHaveCount(40);
    const dimensions = await dialog.evaluate(node => {
      const box = node.getBoundingClientRect();
      return {
        scrolls: node.scrollHeight > node.clientHeight,
        horizontal: node.scrollWidth > node.clientWidth,
        rowsInside: Array.from(node.querySelectorAll("li")).every(row => {
          const rect = row.getBoundingClientRect();
          return rect.left >= box.left && rect.right <= box.right;
        }),
      };
    });
    expect(dimensions).toEqual({ scrolls: true, horizontal: false, rowsInside: true });
    await expect(rows.first()).toContainText(members[0].name);
    await rows.last().scrollIntoViewIfNeeded();
    await expect(rows.last()).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(requests).toEqual(["/api/laboratories", `/api/laboratories/${laboratory.id}`]);
    expect(unexpected).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("empty member list does not invent a member or request an avatar", async ({ page }) => {
  const { dialog, requests, unexpected, errors } = await openWorkspace(page, [], false);
  await expect(dialog.getByRole("listitem")).toHaveCount(0);
  await expect(dialog.getByRole("list")).toHaveCount(1);
  expect(requests).toEqual(["/api/laboratories", `/api/laboratories/${laboratory.id}`]);
  expect(unexpected).toEqual([]);
  expect(errors).toEqual([]);
});

test("reflow equivalent to 200% at a 640px physical viewport keeps members reachable", async ({ browser }) => {
  // 640 physical pixels / 2 = 320 CSS pixels: emulated reflow, not browser zoom UI.
  const context = await browser.newContext({ viewport: { width: 320, height: 600 }, deviceScaleFactor: 2, serviceWorkers: "block" });
  try {
    const page = await context.newPage();
    const members = Array.from({ length: 30 }, (_, index) => ({ name: `Membro acentuado ÁÇ ${index} ${"extenso".repeat(15)}`, initials: "ÁÇ" }));
    const { dialog, trigger, requests, unexpected, errors } = await openWorkspace(page, members, false);
    expect(await page.evaluate(() => window.devicePixelRatio)).toBe(2);
    expect(await dialog.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
    await expect(dialog.getByRole("listitem")).toHaveCount(30);
    await dialog.getByRole("listitem").last().scrollIntoViewIfNeeded();
    await expect(dialog.getByRole("listitem").last()).toBeInViewport();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    expect(requests).toEqual(["/api/laboratories", `/api/laboratories/${laboratory.id}`]);
    expect(unexpected).toEqual([]);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
