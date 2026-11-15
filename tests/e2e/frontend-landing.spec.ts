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
  { width: 960, height: 900, textScale: 100 },
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
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Soluções Inteligentes para Segurança Hídrica e Restauração Florestal");
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
    expect(await page.locator('main > section').evaluateAll(nodes => nodes.map(node => node.id || "abertura"))).toEqual(["abertura", "desafio", "projeto", "plataforma", "impacto", "equipe"]);
    const project = page.getByRole("region", { name: "Tecnologia, diagnóstico e restauração para o território." });
    await expect(project).toContainText("A HidroFlorestas é uma startup nascida no IFMA Campus Itapecuru-Mirim, voltada à segurança hídrica, ao diagnóstico ambiental e à restauração produtiva no Maranhão.");
    await expect(project).toContainText("A proposta reúne organização de informações, observação em campo e pesquisa sobre Soluções Baseadas na Natureza. A plataforma é uma parte desse trabalho.");
    await expect(project).toContainText("Proposta de kit simplificado para apoiar o trabalho de coleta.");
    const platform = page.getByRole("region", { name: "Cada registro, no seu contexto." });
    await expect(platform.getByRole("heading", { name: "Consulte o IHFR", exact: true })).toBeVisible();
    const panel = platform.getByRole("complementary", { name: "Do diagnóstico à restauração" });
    await expect(panel).not.toContainText("Frentes do projeto");
    await expect(panel).not.toContainText("Integração futura com IA");
    await expect(page.getByRole("main")).not.toContainText(/experimental|validação científica|insuficiência fica explícita/i);
    const goals = page.getByRole("list", { name: "Objetivos de Desenvolvimento Sustentável" });
    await expect(goals.getByRole("listitem")).toHaveCount(4);
    for (const goal of ["ODS 06", "ODS 13", "ODS 15", "ODS 10"]) await expect(goals).toContainText(goal);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByText("Fábio Mesquita de Souza", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "startup.hidroflorestas.ifma@gmail.com", exact: true })).toHaveAttribute("href", "mailto:startup.hidroflorestas.ifma@gmail.com");
    if (viewport.textScale === 200) {
      const fragmentedWords = await page.locator("header, main, footer").evaluateAll(roots => {
        const fragmented: string[] = [];
        for (const root of roots) {
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          for (let text = walker.nextNode(); text; text = walker.nextNode()) {
            if (text.parentElement?.closest('a[href^="mailto:"]')) continue;
            for (const word of (text.textContent ?? "").matchAll(/[\p{L}\p{M}\p{N}]+/gu)) {
              const range = document.createRange();
              range.setStart(text, word.index);
              range.setEnd(text, word.index + word[0].length);
              if (Array.from(range.getClientRects()).filter(rect => rect.width > 0 && rect.height > 0).length > 1) fragmented.push(word[0]);
            }
          }
        }
        return fragmented;
      });
      expect(fragmentedWords, "Headings, navigation and prose retain complete words at 200% text").toEqual([]);
      const teamHeading = page.getByRole("heading", { name: "Coordenação de desenvolvimento", exact: true });
      await teamHeading.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(teamHeading).toBeInViewport({ ratio: 1 });
      await capture(page, info, `${name}-team`);
    }
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
