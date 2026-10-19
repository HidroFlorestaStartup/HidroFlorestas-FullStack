import { randomUUID } from "node:crypto";
import { test, expect } from "../e2e/support/ihfr-diagnostics";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import type { Page } from "@playwright/test";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing isolated IMP-006 control fixture: ${name}`);
  return value;
}

async function projection(page: Page) {
  return page.locator("section[aria-labelledby]").evaluateAll(nodes => nodes.map(node => {
    const ancestors = [];
    for (let current: Element | null = node; current && ancestors.length < 10; current = current.parentElement) {
      const style = getComputedStyle(current), rect = current.getBoundingClientRect();
      ancestors.push({ tag: current.tagName, id: current.id, hidden: current.hasAttribute("hidden"), ariaHidden: current.getAttribute("aria-hidden"), inert: current.hasAttribute("inert"), display: style.display, visibility: style.visibility, width: rect.width, height: rect.height });
    }
    return { heading: node.getAttribute("aria-labelledby"), ancestors };
  }));
}

// Explicit counterfactual experiments, excluded from the official six-test match.
// The no-JavaScript control intentionally retains its RED visibility assertion.
test.describe("IHFR without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("IHFR control distinguishes missing hydration from missing server-rendered diagnosis", async ({ page, context }, info) => {
    const baseURL = String(info.project.use.baseURL);
    await context.addCookies([{ name: "auth_token", value: signSessionToken(required("IMP006_E2E_OWNER_ID")), url: baseURL }]);
    await page.goto(baseURL + required("IMP006_E2E_COLLECTION_URL"));
    console.log(`IMP-006 no-JavaScript projection: ${JSON.stringify(await projection(page))}`);
    await expect(page.getByRole("region", { name: "Diagnóstico IHFR experimental", exact: true })).toBeVisible();
  });
  test("IHFR no-JavaScript collection control reproduces the missing occurrence selector", async ({ page, context }, info) => {
    const baseURL = String(info.project.use.baseURL);
    await context.addCookies([{ name: "auth_token", value: signSessionToken(required("IMP006_E2E_OWNER_ID")), url: baseURL }]);
    const newUrl = required("IMP006_E2E_MANAGE_URL").replace(/\/collections\/[^/]+$/, "/collections/new");
    await page.goto(baseURL + newUrl);
    console.log(`IMP-006 no-JavaScript occurrence: ${JSON.stringify({ occurrence: await page.getByLabel("Fuso da coleta").count(), preparing: await page.getByText("Preparando formulário de coleta…", { exact: true }).count() })}`);
    await expect(page.getByLabel("Fuso da coleta")).toBeVisible();
  });
});

test("IHFR JavaScript-enabled control exposes the server-rendered diagnosis", async ({ page, context }, info) => {
  const baseURL = String(info.project.use.baseURL);
  await context.addCookies([{ name: "auth_token", value: signSessionToken(required("IMP006_E2E_OWNER_ID")), url: baseURL }]);
  await page.goto(baseURL + required("IMP006_E2E_COLLECTION_URL"));
  await expect(page.getByRole("region", { name: "Diagnóstico IHFR experimental", exact: true })).toBeVisible();
  console.log(`IMP-006 JavaScript-enabled projection: ${JSON.stringify(await projection(page))}`);
});

test("IHFR control records login redirect for invalid session and absent actor", async ({ page, context }, info) => {
  const baseURL = String(info.project.use.baseURL);
  const tokens = [signSessionToken(required("IMP006_E2E_OWNER_ID"), "synthetic-invalid-signature"), signSessionToken(randomUUID())];
  for (const token of tokens) {
    await context.clearCookies();
    await context.addCookies([{ name: "auth_token", value: token, url: baseURL }]);
    await page.goto(baseURL + required("IMP006_E2E_COLLECTION_URL"));
    await expect(page).toHaveURL(baseURL + "/login");
    await expect(page.getByRole("region", { name: "Diagnóstico IHFR experimental", exact: true })).toHaveCount(0);
    console.log("IMP-006 control: invalid session/absent actor redirects to login without IHFR region.");
  }
});
