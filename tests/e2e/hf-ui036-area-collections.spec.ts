import bcrypt from "bcrypt";
import { expect, test } from "@playwright/test";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { createCollectionFixtureClient, validateCollectionFixtureEnvironment } from "../fixtures/collections";
import { captureMissionViewport } from "./support/frontend-mission-evidence";

test.describe.configure({ mode: "serial" });
test.setTimeout(90_000);
test.use({ trace: "off", video: "off", screenshot: "off" });

// Dedicated synthetic identifiers: no fixture, seeded user or provider from another suite is changed.
const id = (suffix: number) => "00000000-0000-4000-8000-" + String(suffix).padStart(12, "0");
const X = { user: id(36101), lab: id(36102), area: id(36103), empty: id(36104), newer: id(36105), older: id(36106) };
const path = "/dashboard/laboratories/" + X.lab + "/areas/" + X.area;
const emptyPath = "/dashboard/laboratories/" + X.lab + "/areas/" + X.empty;
const database = () => createCollectionFixtureClient(validateCollectionFixtureEnvironment(process.env).testDatabaseUrl);

async function cleanup() {
  const db = database();
  try {
    await db.$transaction(async tx => {
      await tx.$executeRawUnsafe('ALTER TABLE "CollectionData" DISABLE TRIGGER imp004_collection_immutable');
      try {
        await tx.collectionData.deleteMany({ where: { laboratoryRoomId: X.lab, userId: X.user } });
      } finally {
        await tx.$executeRawUnsafe('ALTER TABLE "CollectionData" ENABLE TRIGGER imp004_collection_immutable');
      }
      await tx.collectionArea.deleteMany({ where: { laboratoryRoomId: X.lab, userId: X.user } });
      await tx.researchersLinked.deleteMany({ where: { laboratoryRoomId: X.lab, userId: X.user } });
      await tx.laboratoryRoom.deleteMany({ where: { id: X.lab, userId: X.user } });
      await tx.user.deleteMany({ where: { id: X.user, email: "ui036-e2e@hidroflorestas.invalid" } });
    }, { maxWait: 15_000, timeout: 30_000 });
  } finally { await db.$disconnect(); }
}

test.beforeAll(async () => {
  await cleanup();
  const db = database();
  try {
    const password = await bcrypt.hash("synthetic-hf-ui036-never-login", 10);
    await db.$transaction(async tx => {
      await tx.user.create({ data: { id: X.user, email: "ui036-e2e@hidroflorestas.invalid",
        firstName: "UI036", lastName: "Fixture", password, status: "ACTIVE",
        role: "USER", verificationRequired: false } });
      await tx.laboratoryRoom.create({ data: { id: X.lab, name: "HF-UI036 synthetic laboratory", userId: X.user,
        isActive: true, accessCode: "hf-ui036-synthetic" } });
      await tx.researchersLinked.create({ data: { laboratoryRoomId: X.lab, userId: X.user, role: "OWNER" } });
      for (const areaId of [X.area, X.empty]) {
        await tx.collectionArea.create({ data: { id: areaId, laboratoryRoomId: X.lab,
          userId: X.user, name: areaId === X.area ? "HF-UI036 populated area" : "HF-UI036 empty area",
          latitude: -3, longitude: -38 } });
      }
      await tx.collectionData.createMany({ data: [
        { id: X.newer, collectionAreaId: X.area, laboratoryRoomId: X.lab, userId: X.user,
          occurredAt: new Date("2026-09-16T11:00:00.000Z"), occurrenceOffset: "-03:00",
          confirmedAt: new Date("2026-09-16T11:01:00.000Z"), confirmationKey: id(36205) },
        { id: X.older, collectionAreaId: X.area, laboratoryRoomId: X.lab, userId: X.user,
          occurredAt: new Date("2026-09-15T12:00:00.000Z"), occurrenceOffset: "+05:45",
          confirmedAt: new Date("2026-09-20T12:00:00.000Z"), confirmationKey: id(36206) },
      ] });
    }, { maxWait: 15_000, timeout: 30_000 });
  } catch (error) {
    await cleanup();
    throw error;
  } finally { await db.$disconnect(); }
});
test.afterAll(cleanup);

test.beforeEach(async ({ context }, info) => {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(X.user), url: String(info.project.use.baseURL) }]);
});

test("UI036 real area read: field occurrence beats confirmation; responsive viewports and experimental absence", async ({ page }, info) => {
  for (const [width, height, textScale] of [[320, 900, 100], [375, 900, 100], [390, 900, 100], [768, 900, 100], [1440, 900, 100], [320, 900, 200]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto(path);
    if (textScale === 200) await page.addStyleTag({ content: "html{font-size:200%!important}" });
    const list = page.getByRole("list", { name: "Coletas ordenadas por ocorrência em campo" });
    const cards = list.getByRole("listitem");
    await expect(cards).toHaveCount(2);
    await expect(cards.first()).toContainText(X.newer);
    await expect(cards.nth(1)).toContainText(X.older);
    await expect(cards.first()).toContainText("16/09/2026 08:00:00 (UTC-03:00)");
    await expect(cards.nth(1)).toContainText("15/09/2026 17:45:00 (UTC+05:45)");
    await expect(page.getByRole("complementary", { name: "Último IHFR disponível da área" }))
      .toContainText("Nenhum diagnóstico IHFR vigente disponível");
    await expect(page.getByRole("link", { name: "Registrar coleta" })).toBeVisible();
    await list.scrollIntoViewIfNeeded();
    await captureMissionViewport(page, info, "frontend-collections-area-" + width + "-" + height + "-" + textScale, textScale);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("UI036 keyboard route: area -> collection -> environmental form -> collection -> area", async ({ page }) => {
  await page.goto(path);
  const first = page.getByRole("list", { name: "Coletas ordenadas por ocorrência em campo" }).getByRole("listitem").first();
  const open = first.getByRole("link", { name: "Abrir coleta" });
  await open.focus();
  await expect(open).toBeFocused();
  await open.press("Enter");
  await expect(page).toHaveURL(path + "/collections/" + X.newer);
  await expect(page.getByRole("article", { name: "Detalhe da coleta" })).toBeVisible();
  await expect(page.getByRole("status").getByText("Não há conjunto de dados ambientais confirmado para esta coleta.")).toBeVisible();
  const register = page.getByRole("link", { name: "Registrar dados ambientais" });
  await expect(register).toBeVisible();
  await register.click();
  await expect(page).toHaveURL(path + "/collections/" + X.newer + "/environmental-data/new");
  await page.getByRole("link", { name: "Voltar à coleta" }).click();
  await expect(page).toHaveURL(path + "/collections/" + X.newer);
  await page.getByRole("link", { name: "Voltar à área" }).click();
  await expect(page).toHaveURL(path);
});

test("UI036 empty area is honest, maintains authorized new-collection action and never displays zero", async ({ page }) => {
  await page.goto(emptyPath);
  await expect(page.getByText("Esta área ainda não tem coletas confirmadas.")).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Último IHFR disponível da área" }))
    .toContainText("nenhum resultado será calculado automaticamente");
  await expect(page.getByRole("link", { name: "Registrar coleta" })).toBeVisible();
  await expect(page.getByText("Score registrado:")).toHaveCount(0);
});
