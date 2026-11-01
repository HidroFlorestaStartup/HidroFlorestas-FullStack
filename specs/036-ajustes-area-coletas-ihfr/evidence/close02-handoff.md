# Handoff B — HF-UI-044-CLOSE-PARALLEL-02

**B_VISUAL_READY_FOR_RUNTIME**. Agente nativo real `/root/b_visual`, worktree managed `hf044-b`,
branch `codex/hf044-b-local-20261101`. Base funcional6c61056f; setup1b6a2d3;
helpers A importados pelo coordenador em f4d551d/51b9733, sem autoria B.

Commit de implementação exclusivo: `f42408310b9135ba7075be7452bedac02ae97cd2`; tree `36299c935705e04bdea76d86d4dfda003600bdb7`.
SHA256 do patch exclusivo desde51b9733: `baef29cd3e87624e08a3b550b9d3994d1ce8aa3f51e2b3929cff27d6f5f7173b`.
O commit que contém este recibo acrescenta somente handoff e corrige uma linha/blankEOF do próprio plano.
Sem push do worker ou edição de produto. Manifesto completo em [close02-handoff.json](close02-handoff.json).

75 pares planejados/76 testes descobertos:60 recortes centrais (área vazia/povoada, registro/ausência/resultado),
12 qualificadores individuais (320x900,667x375/inset34,844x390 em200), duas jornadas teclado/Back/Forward
e uma observação de reload antes da reconfiguração. Índice de todos os casos e cases.jsonl duráveis;
falha visual preserva receipt e segue casos seguros, sumário final rejeita erro/lacuna/fontes UNOBSERVED.

Executado: sintaxe TypeScript PASS; `tsc --noEmit --incremental false` local PASS/exit0 com Node24.14
existente e junctions de leitura; ESLint dos dois arquivos PASS/exit0; Playwright discovery PASS/76testes,
sem webServer/banco. Cinco erros iniciais de tipos de grade B corrigidos; helper source duplicado devolvido
a A e corrigido por A. Um blankEOF documental do primeiro commit é corrigido neste recibo.
Typegen/Prisma generation, Node24.19 runner, runtime domínio e imagens bilaterais: NOT_RUN por B.

Comando focal oficial: `HF_UI044_SUITE=domain` e
`node node_modules/@playwright/test/cli.js test --config qa/hf-ui044/playwright.visual.config.ts domain.spec.ts --workers=1 --retries=0`,
somente via orquestrador Windows/owned Regression do coordenador. Setup oficial de autenticação;
laboratório/áreas/coletas/ambientais/IHFR por APIs reais; referência usa UI/adapter só no próprio browser.
Nenhum mock, score ou router de referência entra no produto. Nenhuma chave/payload científico bruto
entra no artifact. Dados sintéticos imutáveis ficam até Stop/descarte do runner; browser/CDP têm afterAll.

Publicação ownerB mínima: somente documentos036 listados no JSON. `domain.spec.ts`/`domain-fixtures.ts`
dependem de contract/shared/configs dos outros owners e permanecem executáveis na candidata composta QA.
Não transportar composição para B. Não há delta de produto B.

T008/T016/T027/T028/T030 seguem abertos até execução, inspeção real dos PNGs e reconciliação.
EQ-B1 (ordem por confirmação/sem resumo CURRENT), EQ-B2 (score/decomposição demo) e EQ-B3 (memória/reload)
ficam NON_EQUIVALENT com causa de fonte explícita, sem herdar PASS ou aprovar UX.
HUMAN_ACCEPTANCE_PENDING, revisão não autora pendente e quatro qualificadores IHFR preservados.

## Delta corretivo B após revisão não autora

Base exclusiva `091924cf9feef25c273d99159a73e6ed86af18d2`. `boundedPair` agora exige samples.length===2;
zero/um sample resulta FAIL / INSUFFICIENT_EVIDENCE / PARTIAL e erro explícito,
preservando todos os asserts, timeouts e sumário obrigatório.
Patch de código SHA256 `33eca2553ce1427ae770ccb6f77c25820e001954e637c1be1813e5cff7f134cc`. Relatório local:
[close02-pair-classification-check.json](close02-pair-classification-check.json),6/6 PASS
na declaração real extraída por AST. Typecheck completo local e lint B PASS/exit0.
Sem PG/browser local, push ou runtime de CI da correção; A/coord mantêm seus próprios writers.

## Delta R1 — seletor required-label da referência

Base `89666f0b1bb78de476a53e19987b25beba26fd14`. Reparo único de código em domain-fixtures.ts: getByRole textbox
com nome acessível exato, preservando timeout e produto/starter. Patch SHA256
`8062e43a06e7a0967d8d3cdc3b50e89fa664ecae70568036b844427d7bbaf4e9`. Prova Chromium sintéticoRED/GREEN e auditoria de outros seletores:
[close02-reference-label-check.json](close02-reference-label-check.json).
R1 real: source194e9afafc0e4dbfeb6d9ceb9ca5030565ba6920/run41351237110/1,
artifact13101154606,setupFAIL/75NOT_RUN/0PNG; digestfc05f5e8... eCRC verificados.
Sem bilateralPASS; nova correção permanece sem runtime da candidata até R2.
