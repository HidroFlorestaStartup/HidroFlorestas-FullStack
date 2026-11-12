import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, type Page, type TestInfo } from "@playwright/test";
import { captureIHFRViewport, expectIHFRControl, expectIHFRScientificWords, settleIHFRViewport } from "./frontend-ihfr-evidence";
import { waitForMissionRender } from "./frontend-mission-evidence";

const noticeTitle = "Limites do diagnóstico experimental";
export type UI044DetailState = { diagnosis: boolean; actions: boolean; profile: "owner" | "admin" | "member" | "inactive-owner" | "inactive-member" };
const readingRegion = (page: Page) => page.locator('section[aria-labelledby="ihfr-diagnosis-heading"]');
const managementRegion = (page: Page) => page.locator('section[aria-labelledby="ihfr-management-heading"]');

/** Counts all DOM copies, including closed disclosure/hidden breakpoint copies. */
export async function expectUI044Notice(page: Page, state: UI044DetailState) {
  const reading = readingRegion(page);
  const management = managementRegion(page);
  await expect(reading).toHaveCount(1);
  await expect(management).toHaveCount(state.actions ? 1 : 0);
  expect(await page.getByText(noticeTitle, { exact: true }).evaluateAll(nodes => nodes.filter(node => !node.closest('[role="dialog"]')).length)).toBe(1);
  await expect(reading.getByText(noticeTitle, { exact: true })).toHaveCount(1);
  await expect(management.getByText(noticeTitle, { exact: true })).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  if (state.diagnosis) {
    await expect(reading.getByText(/Qualidade dos dados:/)).toBeVisible();
    await expect(reading.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.", { exact: true })).toHaveCount(0);
  } else {
    await expect(reading.getByText("Nenhum diagnóstico IHFR vigente para esta coleta.", { exact: true })).toBeVisible();
    await expect(reading.getByText(/Qualidade dos dados:/)).toHaveCount(0);
    await expect(reading.getByText("Escore registrado", { exact: true })).toHaveCount(0);
  }
  await expect(management.locator("fieldset")).toHaveCount(state.actions ? 1 : 0);
  await expect(page.getByLabel("Uso predominante da terra")).toHaveCount(state.actions ? 1 : 0);
  if (!state.actions) await expect(page.getByRole("button", { name: /criar diagnóstico|substituir diagnóstico|revogar diagnóstico/i, includeHidden: true })).toHaveCount(0);
  const duplicateIds = await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll("[id]"), node => node.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds).toEqual([]);
}

/** One viewport observation; uses the existing capture, render and hit-test helpers. */
export async function inspectUI044Detail(page: Page, info: TestInfo, state: UI044DetailState) {
  await expectUI044Notice(page, state);
  await expect(page.locator("#collection-detail-title")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Registro", exact: true, includeHidden: true })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Dados ambientais", exact: true, includeHidden: true })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Voltar à área", exact: true, includeHidden: true })).toHaveCount(1);
  for (const block of ["header", "reading", "record", "environmental", "actions"]) {
    await expect(page.locator(`[data-collection-detail-block="${block}"]`)).toHaveCount(block === "actions" && !state.actions ? 0 : 1);
  }
  const reading = readingRegion(page);
  const limits = reading.locator("details").filter({ has: page.getByText(noticeTitle, { exact: true }) });
  if (state.diagnosis) {
    await expect(limits).toHaveCount(1);
    if (await limits.getAttribute("open") === null) {
      const summary = limits.locator("summary");
      await summary.focus();
      await expectIHFRControl(summary, page, info, "frontend-ihfr-ui044-limits");
      await summary.press("Enter");
      await expect(limits).toHaveAttribute("open", "");
    }
  }
  await expect(reading.getByText(noticeTitle, { exact: true })).toBeVisible();
  await page.evaluate(waitForMissionRender);
  const geometry = await page.evaluate(({ actions }) => {
    const block = (name: string) => document.querySelector(`[data-collection-detail-block="${name}"]`)!;
    const header = block("header");
    const reading = block("reading");
    const record = block("record");
    const environmental = block("environmental");
    const management = actions ? block("actions") : null;
    const nodes = [header, reading, environmental, record, ...(actions ? [management!] : [])];
    const rect = (node: Element) => {
      const b = node.getBoundingClientRect();
      return { x: b.x, y: b.y, width: b.width, height: b.height, right: b.right, bottom: b.bottom };
    };
    return {
      width: innerWidth, height: innerHeight, documentWidth: document.documentElement.scrollWidth,
      rootFontSizePx: parseFloat(getComputedStyle(document.documentElement).fontSize),
      domOrder: nodes.slice(1).map((node, index) => Boolean(nodes[index].compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING)),
      header: rect(header), reading: rect(reading), record: rect(record), environmental: rect(environmental), management: management ? rect(management) : null,
      hrefs: { back: header.querySelector("a")?.getAttribute("href"), environmental: Array.from(environmental.querySelectorAll("a")).map(node => node.getAttribute("href")) },
    };
  }, { actions: state.actions });
  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.width);
  const collectionPath = new URL(page.url()).pathname;
  const areaPath = collectionPath.replace(/\/collections\/[^/]+$/, "");
  expect(geometry.hrefs.back).toBe(areaPath);
  expect(geometry.hrefs.environmental).toContain(collectionPath + "/environmental-data");
  // DOM order is tested independently of visual CSS order.
  if (geometry.width < 1280) {
    expect(geometry.domOrder).toEqual(state.actions ? [true, true, true, true] : [true, true, true]);
    const blocks = [geometry.header, geometry.reading, geometry.environmental, geometry.record, ...(geometry.management ? [geometry.management] : [])];
    for (let index = 1; index < blocks.length; index++) expect(blocks[index - 1].bottom).toBeLessThanOrEqual(blocks[index].y + 1);
  } else {
    // The accepted desktop has independent left metadata and right reading/actions columns.
    expect(geometry.header.right).toBeLessThanOrEqual(geometry.reading.x + 1);
    expect(Math.abs(geometry.header.y - geometry.reading.y)).toBeLessThanOrEqual(2);
    expect(geometry.header.bottom).toBeLessThanOrEqual(geometry.environmental.y + 1);
    expect(geometry.environmental.bottom).toBeLessThanOrEqual(geometry.record.y + 1);
    expect(Math.abs(geometry.header.x - geometry.record.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(geometry.record.x - geometry.environmental.x)).toBeLessThanOrEqual(1);
    expect(geometry.record.right).toBeLessThanOrEqual(geometry.reading.x + 1);
    expect(geometry.environmental.right).toBeLessThanOrEqual(geometry.reading.x + 1);
    if (geometry.management) {
      expect(Math.abs(geometry.reading.x - geometry.management.x)).toBeLessThanOrEqual(1);
      expect(geometry.reading.bottom).toBeLessThanOrEqual(geometry.management.y + 1);
      expect(geometry.management.y - geometry.reading.bottom).toBeLessThanOrEqual(32);
    }
  }
  const scale = Math.round(geometry.rootFontSizePx / 16 * 100);
  if (scale === 200) await expectIHFRScientificWords(reading);
  const name = `frontend-ihfr-ui044-${state.profile}-${state.diagnosis ? "current" : "absent"}-${geometry.width}-${scale}`;
  const scenarioId = createHash("sha256").update(`${info.project.name}:${info.testId}`).digest("hex").slice(0, 12);
  const archive = join(process.cwd(), ".accounts-validation", "frontend-ihfr");
  await mkdir(archive, { recursive: true });
  await writeFile(join(archive, `${scenarioId}-r${info.retry}-n${info.repeatEachIndex}-${name}-layout-viewport.json`), JSON.stringify({
    head: process.env.GITHUB_SHA ?? "local-working-tree", run: process.env.GITHUB_RUN_ID ?? null,
    attempt: process.env.GITHUB_RUN_ATTEMPT ?? null, state, geometry, path: collectionPath,
    textScale: scale, scenarioId, physicalDevice: false, evidenceKind: "application-layout",
  }, null, 2));
  for (const [suffix, target] of [
    ["reading", page.locator("#ihfr-diagnosis-heading")],
    ["record", page.getByRole("heading", { name: "Registro", exact: true })],
    ["environmental", page.getByRole("heading", { name: "Dados ambientais", exact: true })],
  ] as const) {
    await target.evaluate(node => node.scrollIntoView({ block: "center" }));
    await captureIHFRViewport(page, info, `${name}-${suffix}`);
  }
  const back = page.getByRole("link", { name: "Voltar à área", exact: true });
  await back.focus();
  await expectIHFRControl(back, page, info, name);
  // Actual keyboard traversal crosses reading disclosures, then the environmental
  // destination, then the single management form in mobile DOM order.
  if (geometry.width < 1280) {
    await page.keyboard.press("Tab");
    if (state.diagnosis) {
      await expect(limits.locator("summary")).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(reading.locator("details").last().locator("summary")).toBeFocused();
      await page.keyboard.press("Tab");
    }
    await expect(page.getByRole("link", { name: "Ver dados ambientais", exact: true })).toBeFocused();
  }
  const environmentalLink = page.getByRole("link", { name: "Ver dados ambientais", exact: true });
  await expectIHFRControl(environmentalLink, page, info, name);
  if (state.actions) {
    const firstField = managementRegion(page).getByLabel("Uso predominante da terra");
    const register = page.getByRole("link", { name: "Registrar dados ambientais", exact: true });
    if (geometry.width < 1280) {
      await environmentalLink.focus();
      if (await register.count()) { await page.keyboard.press("Tab"); await expect(register).toBeFocused(); }
      await page.keyboard.press("Tab");
    } else await firstField.focus();
    await expect(firstField).toBeFocused();
    await expectIHFRControl(firstField, page, info, name);
    await captureIHFRViewport(page, info, `${name}-actions`);
  }
}

/** Four required viewports; layout changes preserve the live controller state,
 * logical focus and native disclosures even when presentation slots move. */
export async function inspectUI044DetailMatrix(page: Page, info: TestInfo, state: UI044DetailState) {
  const reading = readingRegion(page);
  await expect(reading).toBeVisible();
  const management = managementRegion(page);
  const content = await reading.textContent();
  const fields = async () => management.locator("input,select,textarea").evaluateAll(nodes => nodes.map(node => ({
    value: (node as HTMLInputElement).value, disabled: (node as HTMLInputElement).disabled,
  })));
  const form = state.actions ? await fields() : [];
  const feedback = state.actions ? await management.locator('[role="status"], [role="alert"]').allTextContents() : [];
  const disclosures = () => reading.locator("details").evaluateAll(nodes => nodes.map(node => ({
    summary: node.querySelector("summary")?.textContent, open: (node as HTMLDetailsElement).open,
  })));
  const focus = () => page.evaluate(() => {
    const node = document.activeElement;
    if (!node || node === document.body) return null;
    return { tag: node.tagName, id: node.id, type: node.getAttribute("type"), href: node.getAttribute("href"),
      label: node.closest("label")?.textContent ?? node.getAttribute("aria-label"),
      text: ["SUMMARY", "BUTTON"].includes(node.tagName) ? node.textContent : null };
  });
  let layoutRequests = 0;
  const countRequest = (request: { url(): string }) => { if (request.url().includes("/ihfr-diagnosis/")) layoutRequests++; };
  page.on("request", countRequest);
  try {
    for (const [width, height, scale] of [[1440, 900, 100], [375, 900, 100], [390, 844, 100], [320, 900, 200]]) {
      const beforeDisclosures = await disclosures();
      const beforeFocus = await focus();
      await settleIHFRViewport(page, width, height, scale);
      // Check before the inspection deliberately focuses controls or opens details.
      expect(await disclosures()).toEqual(beforeDisclosures);
      if (beforeFocus) expect(await focus()).toEqual(beforeFocus);
      expect(await reading.textContent()).toBe(content);
      if (state.actions) {
        expect(await fields()).toEqual(form);
        expect(await management.locator('[role="status"], [role="alert"]').allTextContents()).toEqual(feedback);
      }
      await inspectUI044Detail(page, info, state);
    }
    expect(layoutRequests, "changing layout/disclosures must not refetch or mutate IHFR").toBe(0);
  } finally {
    page.off("request", countRequest);
  }
  await settleIHFRViewport(page, 1280, 900);
}
