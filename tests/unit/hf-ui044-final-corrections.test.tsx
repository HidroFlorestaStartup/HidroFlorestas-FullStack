import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatIHFRNumber } from "../../src/lib/ui-presentation";
import { AreaCollections } from "../../src/components/areas/area-collections";
import type { AreaCollectionItem } from "../../src/components/areas/area-collections-presentation";
import { IHFRDiagnosisManagement } from "../../src/components/ihfr-diagnosis/ihfr-diagnosis-management";
import { ExperimentalDiagnosisSummary } from "../../src/components/ihfr-diagnosis/experimental-diagnosis-summary";
import { NoCurrentDiagnosis } from "../../src/components/ihfr-diagnosis/no-current-diagnosis";
import { publicDiagnosisFixture } from "../fixtures/ihfr-diagnosis-public";

const laboratoryId = "60000000-0000-4000-8000-000000000021";
const areaId = publicDiagnosisFixture.areaId;
const base = `/dashboard/laboratories/${laboratoryId}/areas/${areaId}/collections/`;
const notice = "Limites do diagnóstico experimental";
const text = (html: string) => html.replace(/<[^>]*>/g, "");
const row = (id: string, displayScore: string | null, day: number): AreaCollectionItem => ({
  id, occurredAt: `2026-09-${day}T08:00:00.000-03:00`, occurredAtUtc: `2026-09-${day}T11:00:00.000Z`,
  confirmedAt: "2026-09-30T15:00:00.000Z",
  currentDiagnosis: displayScore === null ? null : { id: `diagnosis-${id}`, displayScore, ihfrClass: "MODERATE" },
});
function renderCards(rows: AreaCollectionItem[]) {
  const html = renderToStaticMarkup(<AreaCollections laboratoryId={laboratoryId} areaId={areaId} rows={rows} />);
  const list = /<ol\b[^>]*>([\s\S]*?)<\/ol>/.exec(html)?.[1];
  assert.ok(list, "confirmed collections retain their ordered list");
  const cards = [...list.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(match => match[1]);
  assert.equal(cards.length, rows.length);
  for (const [index, card] of cards.entries()) {
    const links = [...card.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map(match => ({ href: match[1], name: text(match[2]) }));
    assert.deepEqual(links, [
      { href: base + rows[index].id, name: "Abrir coleta" },
      { href: base + rows[index].id + "/environmental-data", name: "Dados ambientais" },
    ], "each card has exactly its two contextual destinations and no standalone IHFR link");
    assert.ok(text(card).includes(`ID: ${rows[index].id}`));
    assert.ok(card.includes(`dateTime="${rows[index].occurredAt}"`));
    assert.ok(text(card).includes("Confirmação no sistema"));
    assert.ok(text(card).includes(rows[index].currentDiagnosis ? "IHFR vigente" : "Sem IHFR vigente"));
  }
  return { html, cards, summary: /<aside\b[^>]*>([\s\S]*?)<\/aside>/.exec(html)![1] };
}

test("UI044 C1: distinct persisted score strings belong to their own cards without extra interpretation", () => {
  const rows = [row("current-a", "0.123456789012345678", 25), row("current-b", "0.876543210987654321", 24)];
  const { cards, summary } = renderCards(rows);
  for (const [index, card] of cards.entries()) {
    const scores = [...card.matchAll(/<p\b[^>]*>(IHFR registrado: [\s\S]*?)<\/p>/g)].map(match => text(match[1]));
    assert.deepEqual(scores, [`IHFR registrado: ${formatIHFRNumber(rows[index].currentDiagnosis!.displayScore)}`]);
    assert.ok(!text(card).includes(rows[1 - index].currentDiagnosis!.displayScore), "another collection's score is never copied");
    assert.doesNotMatch(text(card), /MODERATE|Moderado|proveniência|experimental/i);
  }
  assert.ok(text(summary).includes("Último IHFR experimental disponível"));
  assert.ok(summary.includes(base + rows[0].id + "#ihfr-diagnosis-heading"));
  assert.ok(text(summary).includes("Consultar resultado e proveniência"));
});

test("UI044 C1: newer collection without diagnosis does not inherit the older summary score", () => {
  const { cards, summary } = renderCards([row("newest-without", null, 26), row("older-current", "0.42", 25)]);
  assert.doesNotMatch(text(cards[0]), /IHFR registrado:|0\.42/);
  assert.match(text(cards[1]), /IHFR registrado: 0,42/);
  assert.match(text(summary), /Coleta de origem: older-current/);
  assert.ok(!text(summary).includes("newest-without"));
});

test("UI044 C1: registered zero is rendered while absence remains absent (presentation fixture, not scientific evaluation)", () => {
  for (const score of ["0", "0.000000000000000000"]) {
    const { cards } = renderCards([row("registered-zero", score, 25), row("no-diagnosis", null, 24)]);
    assert.ok(text(cards[0]).includes(`IHFR registrado: ${formatIHFRNumber(score)}`));
    assert.doesNotMatch(text(cards[1]), /IHFR registrado:/);
  }
});

test("UI044 C1: absence in all cards preserves the honest summary and both destinations", () => {
  const { cards, summary } = renderCards([row("absent-a", null, 25), row("absent-b", null, 24)]);
  for (const card of cards) assert.doesNotMatch(text(card), /IHFR registrado:/);
  assert.match(text(summary), /Nenhum diagnóstico IHFR vigente disponível/);
  assert.match(text(summary), /Isso não representa IHFR igual a zero/);
});

for (const hasDiagnosis of [false, true]) {
  test(`UI044 C2: managed ${hasDiagnosis ? "current" : "absent"} reading owns the only exact scientific notice`, () => {
    const html = renderToStaticMarkup(<IHFRDiagnosisManagement
      context={{ laboratoryId, areaId, collectionId: publicDiagnosisFixture.collectionId }}
      initialDiagnosis={hasDiagnosis ? publicDiagnosisFixture : null} />);
    const sections = [...html.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)];
    const reading = sections.filter(match => match[1] === "ihfr-diagnosis-heading");
    const management = sections.filter(match => match[1] === "ihfr-management-heading");
    assert.equal(reading.length, 1);
    assert.equal(management.length, 1);
    assert.equal([...html.matchAll(new RegExp(`>${notice}<`, "g"))].length, 1);
    assert.equal([...reading[0][2].matchAll(new RegExp(`>${notice}<`, "g"))].length, 1);
    assert.ok(!text(management[0][2]).includes(notice));
    assert.doesNotMatch(reading[0][2], /<details\b[^>]*\bopen/);
    assert.equal([...html.matchAll(/<fieldset\b/g)].length, 1, "one observation form");
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size, "no duplicate IDs from responsive copies");
    assert.ok(text(management[0][2]).includes(hasDiagnosis ? "Substituir diagnóstico" : "Criar diagnóstico"));
  });

  test(`UI044 C2: read-only ${hasDiagnosis ? "current" : "absent"} reading keeps the notice without management`, () => {
    const html = renderToStaticMarkup(hasDiagnosis ? <ExperimentalDiagnosisSummary diagnosis={publicDiagnosisFixture} /> : <NoCurrentDiagnosis />);
    assert.equal([...html.matchAll(new RegExp(`>${notice}<`, "g"))].length, 1);
    assert.doesNotMatch(html, /<button\b|ihfr-management-heading/);
    if (hasDiagnosis) {
      assert.match(html, /<details\b/);
      assert.doesNotMatch(html, /<details\b[^>]*\bopen/);
    } else {
      assert.match(text(html), /Nenhum diagnóstico IHFR vigente para esta coleta/);
      assert.doesNotMatch(text(html), /IHFR registrado:/);
    }
  });
}
