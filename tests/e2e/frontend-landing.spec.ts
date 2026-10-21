import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { createHash } from "node:crypto";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readControlGeometry, waitForMissionRender } from "./support/frontend-mission-evidence";

// Public application only. No mocked page, session, domain data or fixture writes.
test.use({ trace: "off", screenshot: "off", video: "off" });

async function capture(page: Page, info: TestInfo, name: string) {
  if (!/^frontend-landing-[a-z0-9-]+$/.test(name)) throw new Error("UNSAFE_EVIDENCE_NAME");
  await page.evaluate(waitForMissionRender);
  const screenshotPath = info.outputPath(`${name}.png`);
  const metadataPath = info.outputPath(`${name}-viewport.json`);
  const scenarioId = createHash("sha256").update(`${info.project.name}:${info.testId}`).digest("hex").slice(0, 12);
  await page.screenshot({ path: screenshotPath, fullPage: false, animations: "allow", mask: [page.locator("input,select,textarea")] });
  const geometry = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, scrollX, scrollY,
    documentWidth: document.documentElement.scrollWidth, activeTag: document.activeElement?.tagName ?? null,
    rootFontSizePx: parseFloat(getComputedStyle(document.documentElement).fontSize) }));
  await writeFile(metadataPath, JSON.stringify({ ...geometry, physicalDevice: false, fullPage: false, animations: "allow",
    head: process.env.GITHUB_SHA ?? "local-working-tree", scenarioId, evidenceKind: "application-viewport",
    textScale: geometry.rootFontSizePx / 16 * 100,
    note: "Public application, Chromium emulation; not manual accessibility acceptance." }, null, 2));
  const archive = join(process.cwd(), ".accounts-validation", "frontend-landing");
  await mkdir(archive, { recursive: true });
  const prefix = `${scenarioId}-r${info.retry}-n${info.repeatEachIndex}`;
  await copyFile(screenshotPath, join(archive, `${prefix}-${name}.png`));
  await copyFile(metadataPath, join(archive, `${prefix}-${name}-viewport.json`));
}

const viewports = [
  { width: 320, height: 812, textScale: 100 },
  { width: 375, height: 812, textScale: 100 },
  { width: 768, height: 1024, textScale: 100 },
  { width: 1440, height: 1000, textScale: 100 },
  { width: 320, height: 812, textScale: 200 },
  { width: 812, height: 375, textScale: 100 },
];

for (const viewport of viewports) {
  test(`public landing at ${viewport.width}x${viewport.height} text ${viewport.textScale}%`, async ({ page }, info) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    if (viewport.textScale === 200) await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Conhecer o território começa com bons registros.");
    const missingAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links
      .map(link => link.getAttribute("href")!.slice(1)).filter(id => !document.getElementById(id)));
    expect(missingAnchors).toEqual([]);
    const name = `frontend-landing-${viewport.width}x${viewport.height}-text${viewport.textScale}`;
    await capture(page, info, `${name}-hero`);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const control of [page.getByRole("link", { name: "Acessar plataforma", exact: true }),
      page.getByRole("link", { name: "Criar conta", exact: true })]) {
      await control.evaluate(node => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
      await page.evaluate(waitForMissionRender);
      await expect.poll(async () => {
        const geometry = await readControlGeometry(control);
        return geometry.unobstructed;
      }).toBe(true);
      const box = await control.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
      expect(box?.width).toBeGreaterThanOrEqual(44);
    }
    const science = page.getByRole("region", { name: "IHFR experimental: informação com limites claros." });
    const qualifications = ["Contrato experimental", "Validação científica pendente", "Sujeito a recalibração", "Não aprovado como contrato científico definitivo"];
    for (const [index, text] of qualifications.entries()) {
      const qualification = science.getByText(text, { exact: true });
      await qualification.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await page.evaluate(waitForMissionRender);
      await expect(qualification).toBeInViewport({ ratio: 1 });
      if (index === 0 || index === qualifications.length - 1) await capture(page, info, `${name}-ihfr-${index === 0 ? "start" : "end"}`);
    }
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByText("Fabio Mesquita de Souza", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "fabio.souza@ifma.edu.br", exact: true })).toHaveAttribute("href", "mailto:fabio.souza@ifma.edu.br");
  });
}

test("public landing supports keyboard access and existing account routes", async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
  await capture(page, info, "frontend-landing-keyboard-skip");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const access = page.getByRole("link", { name: "Acessar plataforma", exact: true });
  await access.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByLabel("E-mail", { exact: true })).toBeVisible();
  await page.goto("/");
  await page.getByRole("link", { name: "Criar conta", exact: true }).click();
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: "Criar conta", exact: true })).toBeVisible();
});
