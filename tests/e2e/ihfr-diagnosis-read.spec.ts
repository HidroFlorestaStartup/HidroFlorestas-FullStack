import { expect, test } from "./support/ihfr-diagnostics";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import { IHFR_CONTEXTS } from "../fixtures/ihfr-diagnosis-contexts";
import { IHFR_DOMAIN } from "../fixtures/ihfr-diagnosis-domain";
import { IHFR_CONTRACT } from "../../src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { captureIHFRViewport, expectIHFRScientificWords, expectIHFRUnfragmentedWords, IHFR_SCIENTIFIC_QUALIFICATIONS, settleIHFRViewport } from "./support/frontend-ihfr-evidence";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing isolated IMP-006 E2E fixture: ${name}`);
  return value;
};

test.beforeEach(async ({ context }, info) => {
  await context.addCookies([{ name: "auth_token", value: signSessionToken(required("IMP006_E2E_ACTOR_ID")), url: String(info.project.use.baseURL) }]);
});

test("member reads the current experimental DTO with labels, keyboard access and responsive layout", async ({ page }, info) => {
  await page.goto(required("IMP006_E2E_COLLECTION_URL"));
  const diagnosis = page.getByRole("region", { name: "Diagnóstico IHFR experimental" });
  await expect(diagnosis).toBeVisible();
  await expect(diagnosis.getByText(/Qualidade dos dados:/)).toBeVisible();
  for (const component of ["W", "S", "V", "T"]) await expect(diagnosis.getByText(component, { exact: true })).toBeVisible();
  for (const label of ["CONTRATO_EXPERIMENTAL", "VALIDACAO_CIENTIFICA_PENDENTE", "SUJEITO_A_RECALIBRACAO", "NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"]) await expect(diagnosis.getByText(label, { exact: true })).toBeVisible();
  for (const value of [IHFR_CONTEXTS.measurement, IHFR_DOMAIN.supplement, IHFR_CONTRACT.measurementVersion, IHFR_CONTRACT.inputVersion, IHFR_CONTRACT.activeMathVersion, IHFR_CONTRACT.algorithmVersion, IHFR_CONTRACT.contractHash, "CURRENT", "2026-09-20 12:03:00 UTC", "Não se aplica"]) await expect(diagnosis).toContainText(value);
  await expect(page.getByRole("button", { name: /criar diagnóstico|substituir diagnóstico|revogar diagnóstico/i })).toHaveCount(0);
  const text = await diagnosis.textContent();
  for (const restricted of ["actorUserId", "idempotencyKey", "requestHash", "payloadHash", "evidence", "lifecycleEvents"]) expect(text).not.toContain(restricted);
  for (const width of [320, 375, 390, 768, 1280, 1440]) {
    await settleIHFRViewport(page, width, width === 390 ? 844 : 900);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await diagnosis.getByRole("heading", { name: "Diagnóstico IHFR experimental", exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
    await captureIHFRViewport(page, info, `frontend-ihfr-result-${width}`);
    await diagnosis.getByText("Hash do contrato", { exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
    await captureIHFRViewport(page, info, `frontend-ihfr-provenance-${width}`);
  }
  for (const [width, height] of [[320, 900], [667, 375]]) {
    await settleIHFRViewport(page, width, height, 200);
    await expectIHFRUnfragmentedWords(diagnosis.getByRole("heading", { name: "Diagnóstico IHFR experimental", exact: true }));
    await expectIHFRScientificWords(diagnosis);
    await diagnosis.getByText("Limites do diagnóstico experimental", { exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
    await captureIHFRViewport(page, info, `frontend-ihfr-qualifiers-${width}-${height}-text200`);
    for (const qualification of IHFR_SCIENTIFIC_QUALIFICATIONS) {
      const label = diagnosis.getByText(qualification, { exact: true });
      await label.evaluate(node => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(label).toBeInViewport({ ratio: 1 });
    }
    await captureIHFRViewport(page, info, `frontend-ihfr-qualifiers-end-${width}-${height}-text200`);
    await diagnosis.getByText("Hash do contrato", { exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
    await captureIHFRViewport(page, info, `frontend-ihfr-provenance-${width}-${height}-text200`);
  }
  await settleIHFRViewport(page, 1280, 900);
  await page.reload();
  await expect(diagnosis).toContainText(IHFR_CONTEXTS.measurement);
  await expect(diagnosis).toContainText("2026-09-20 12:03:00 UTC");
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement !== document.body)).toBe(true);
});

test("member sees honest absence and inactive laboratory stays read only", async ({ page }, info) => {
  await page.goto(required("IMP006_E2E_ABSENT_COLLECTION_URL"));
  await expect(page.getByRole("region", { name: "Diagnóstico IHFR experimental" }).getByText("Nenhum diagnóstico IHFR vigente para esta coleta.")).toBeVisible();
  await expect(page.getByText(/Qualidade dos dados:/)).toHaveCount(0);
  await settleIHFRViewport(page, 375, 900);
  await page.getByRole("heading", { name: "Diagnóstico IHFR experimental", exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
  await captureIHFRViewport(page, info, "frontend-ihfr-absence-375");
  await page.goto(required("IMP006_E2E_INACTIVE_COLLECTION_URL"));
  await expect(page.getByText(/Laboratório inativo.*somente leitura/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /criar diagnóstico|substituir diagnóstico|revogar diagnóstico/i })).toHaveCount(0);
  await page.getByRole("heading", { name: "Diagnóstico IHFR experimental", exact: true }).evaluate(node => node.scrollIntoView({ block: "center" }));
  await captureIHFRViewport(page, info, "frontend-ihfr-inactive-375");
});
