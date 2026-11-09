# UI06-B — correção focal dos probes em cantos arredondados

## ANALYZE — fonte e causa comprovada

`EVIDENCIA_IMPLEMENTACAO`. Fonte imutável: `a290cfc6383dc8fa0a61bd17122f95735da54ce2`, tree `4feaedc343f6c42a53b0ce410a5d94d146e46910`, PR #50. Run `41385859316/1`: 0 PASS/3 FAIL no focal, 75 casos e 15 gates posteriores NOT_RUN. Finding Codex `discussion_r4438818762`.

Artifact `13115506528`: 319404 bytes, SHA-256 `9f49e73c1f15805f5c5ab38c055285cfe110f5d3f91f7233ba8a424c497eb89c`; 24 membros, ZIP CRC PASS. Os três alvos FullStack têm ratio=1, centro atingível e caixa dentro da banda, mas quatro probes a 1px dos cantos atingem SECTION ancestral. O alvo real é DIV rounded-2xl de `src/components/areas/area-collections.tsx`, não o P retangular da primeira prova sintética. O resultado histórico permanece FAIL.

## PLAN / IMPLEMENT — patch mínimo

Alterado somente o corpo de `measureReadingExposure` em `qa/hf-ui044/domain-geometry.ts`. A medição usa os quatro raios CSS computados (px/% e raios elípticos), aplica a redução proporcional CSS quando excedem as dimensões e posiciona os quatro probes em pontos interiores às elipses; mantém o centro. A metade de cada raio fica estritamente dentro da elipse: 0.5²+0.5²<1. Raio zero preserva o comportamento retangular. Geometria não interpretável não recebe aprovação.

Os resultados incluem método e raios medidos. Não se aceita ancestral como alvo; não se testa um ponto, falha, e escolhe outro para fabricar sucesso. Pontos são definidos antes do hit-testing. `ratio:1`, faixa útil, seleção do scroll owner, clamp e regra NON_EQUIVALENT da referência continuam intocados. Não houve edição em produto, ciência, shared.ts, fixtures, workflows, runners ou guardas.

Adicionado `qa/hf-ui044/domain-hit-contour-browser.test.mjs` que importa a função de medição efetivamente utilizada pelo comparador, sem copiar a sua lógica. O DOM de teste reproduz a forma DIV, border-dashed, padding, arredondamento e fonte 16/32px; não é o Next.js em execução.

## REVIEW — execução real nesta sessão

Ambiente: Linux, Node v22.16.0, TypeScript 5.8.3, Chromium 144.0.7559.96. Isso não é o Windows/Node24.19 oficial.

- RED: helper original (blob `de7911e0b4f73df418f7c7eac9ee1d861455ae8c`) + três casos focais com card arredondado: 0 PASS/3 FAIL, exit 1, na assertiva de exposição.
- GREEN: 31 testes de navegador distintos, 31 PASS, zero skip, exit 0. Quatorze combinações de sete larguras x duas escalas; três replays DOM das geometrias oficiais; cinco raios/formatos; cinco overlays reais cobrindo os probes; clipping por ancestral/forma, referência sob sticky header e intervalo de scroll insuficiente.
- TypeScript estrito do helper completo: PASS. `git diff --check`: PASS.
- Arquivamento de JSON/PNG não é contado como teste. Reruns locais não são somados.

Comandos reproduzíveis (Chromium já instalado; não instalar ferramentas globais no host):

```text
node --experimental-strip-types --test qa/hf-ui044/domain-hit-contour-browser.test.mjs
npx tsc --target ES2022 --module nodenext --moduleResolution nodenext --strict --noEmit --skipLibCheck qa/hf-ui044/domain-geometry.ts
```

O primeiro comando exige `HF_UI044_SYNTHETIC_BROWSER=1`; `HF_UI044_SYNTHETIC_CHROMIUM` pode apontar para um Chromium já disponível. Sem a flag, os testes declaram SKIP, nunca PASS de runtime. `HF_UI044_CONTOUR_PROOF_DIR` opcional exige diretório novo para conservar as provas com escrita exclusiva.

## Convergência, limites e handoff

Recorte FR-036-004/SC-036-002: follow-up de T054/T055. Código e contraprovas locais concluídos; T044/T045/T056/T057 e UI06_B_EVIDENCE_COMPLETE não são encerrados. Não reclassificar os sete PNGs oficiais antigos como se tivessem sido executados com a correção.

`FULLSTACK_STARTER_RUNTIME=NOT_RUN`, `FINAL_75_CASES=NOT_RUN`, `FINAL_RC15=NOT_RUN`, `FULL_REPO_TYPECHECK=NOT_RUN`, `INDEPENDENT_REVIEW_NOT_PROVEN` até revisão não autora, `HUMAN_ACCEPTANCE_PENDING`. Não houve acesso ao Windows do operador nem alegação de worktrees locais limpas. Fonte local é snapshot parcial de arquivo conferido pelo Git blob; o clone completo não foi obtido por DNS. CLI Spec Kit NOT_RUN; análise/plan/implement/review equivalentes e rastreados neste recorte, sem alterar constituição nem instalar ferramentas. Subagentes nativos indisponíveis nesta sessão.

Publicação de reparo, não nova autorização de Actions: manter Draft, usar `[skip ci]` para não consumir orçamento hospedado encerrado; checks finais permanecem pendentes. Nenhum merge/deploy, banco ou serviço real. Cinco probes geométricos continuam sendo amostragem, não garantia de ausência de toda oclusão pixel a pixel; overlays com pointer-events:none e inspeção visual ampla não são qualificados por este teste.

Referências primárias: W3C CSS Backgrounds and Borders Level 3, seções 4.1/4.3/4.5 (https://www.w3.org/TR/css-backgrounds-3/); CSSOM View, elementFromPoint (https://www.w3.org/TR/cssom-view/); GitHub skip workflows (https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs).
