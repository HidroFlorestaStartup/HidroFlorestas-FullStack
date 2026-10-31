import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ExperimentalDiagnosisSummary } from "../../src/components/ihfr-diagnosis/experimental-diagnosis-summary";
import { NoCurrentDiagnosis } from "../../src/components/ihfr-diagnosis/no-current-diagnosis";
import { ihfrLabel } from "../../src/components/ihfr-diagnosis/ihfr-presentation";
import { publicDiagnosisFixture as diagnosis } from "../fixtures/ihfr-diagnosis-public";

test("frontend IHFR presents persisted values without rounding or deriving a class", () => {
  const dto = { ...diagnosis, displayScore: 12.34567, ihfrClass: "CRITICAL" as const,
    componentScores: { W: 1.23456, S: 22.22222, V: 33.33333, T: 44.44444 },
    explanation: "Explicação do servidor <script>sem execução</script>",
  };
  const html = renderToStaticMarkup(<ExperimentalDiagnosisSummary diagnosis={dto} />);
  for (const value of [dto.displayScore, ...Object.values(dto.componentScores)]) assert.ok(html.includes(String(value)));
  assert.match(html, /CRITICAL/);
  assert.match(html, /Crítico/);
  for (const name of ["Água", "Solo", "Vegetação", "Território"]) assert.ok(html.includes(name));
  assert.ok(html.includes("Explicação do servidor &lt;script&gt;sem execução&lt;/script&gt;"));
  assert.doesNotMatch(html, /<script/);
});

test("frontend IHFR keeps unknown qualifiers and metadata visible with honest fallbacks", () => {
  const html = renderToStaticMarkup(<ExperimentalDiagnosisSummary diagnosis={{ ...diagnosis,
    scientificLabels: [...diagnosis.scientificLabels, "QUALIFICADOR_FUTURO"],
    calculatedAt: "invalid-date", transitionedAt: null,
  }} />);
  for (const label of [...diagnosis.scientificLabels, "QUALIFICADOR_FUTURO"]) assert.ok(html.includes(label));
  assert.match(html, /Validação científica pendente/);
  assert.match(html, /Data indisponível/);
  assert.match(html, /Não se aplica/);
  assert.match(html, /<details/);
  assert.match(html, /<summary/);
  assert.doesNotMatch(html, /<details[^>]*\sopen/);
  assert.equal(ihfrLabel("eligibility", "FUTURE_RESULT"), "FUTURE_RESULT");
  assert.equal(ihfrLabel("eligibility", "constructor"), "constructor");
  assert.equal(ihfrLabel("eligibility", "__proto__"), "__proto__");
});

test("frontend IHFR absence explains the experimental boundary without fabricating a score", () => {
  const html = renderToStaticMarkup(<NoCurrentDiagnosis />);
  assert.match(html, /Nenhum diagnóstico IHFR vigente para esta coleta\./);
  assert.match(html, /não representa um score zero/);
  for (const label of diagnosis.scientificLabels) assert.ok(html.includes(label));
  assert.doesNotMatch(html, /Qualidade dos dados:|Score registrado|0\.00|Resultado simulado|<button/);
});
