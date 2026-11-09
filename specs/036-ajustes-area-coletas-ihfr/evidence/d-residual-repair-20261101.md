# D: correção residual UI06-B — comprovantes e limites

**Estado:** `STATIC_AND_SYNTHETIC_PASS_RUNTIME_NOT_RUN`; classificação `EVIDENCIA_IMPLEMENTACAO` para execução local, `INFERENCIA` para efeitos esperados no produto.

## Base

- Candidata QA R3: `ebf7e9707d5beba949ae932cdffeb3f9068f8a73`; [Actions 41356318087/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41356318087) = FAILURE.
- B: 75 casos planejados, 9 PASS/3 FAIL/63 NOT_RUN. Caso 320 reference overflow, 667 FullStack ratio0.888403, 844 reference timeout e worker abort/restart com 4 fixtures owned preexistentes e receipt EEXIST.
- R2 `d62fb08` RC oficial 15/15 PASS **somente em seu SHA**; UI037 preservado. Frente C isolada `641be73` 15/15 no próprio SHA. A isolada `e5d0309` IHFR FAIL. Sem transportes silenciosos.

## Código implementado

1. Medir horizontal overflow em cada origem antes da amostra. Erro na **referência** gera `NON_EQUIVALENT` com `documentWidth`, viewport e até 6 elementos excedentes, mas preserva a fotografia e não aprova a UX. Overflow no **FullStack** continua falha técnica e é arquivado como diagnóstico.
2. Preservar inicial e final da faixa de leitura. Alinhar uma única rolagem nativa à zona não obstruída por header/nav, usando o scrollport real e limites de scroll; manter `toBeInViewport({ratio:1})` e hit-testing quando o alvo cabe. Não alterar CSS, fontes ou limiares.
3. Navegação da fixture Lovable usa1440×900/100% antes do estado de comparação; estado/caso é configurado nas dimensões exigidas ANTES da captura. O teste específico Back/Forward/foco continua no viewport solicitado. `click` e `goto` com timeout finito, sem `.force()` ou aumento cego de timeout.
4. Falha de `beforeAll` após hard worker restart continua fail-closed. Recibos de `afterAll` por `workerIndex` não colidem e preservam `wx`; fixture pré-existente de outro trabalhador não é excluída ou tratada falsamente como nova. Não declarar recuperação automática do worker.
5. Falha de captura, assertiva ou referência é `execution:FAIL/completeness:PARTIAL`, mas `requirement:HUMAN_DECISION_PENDING` até prova específica de defeito do produto. Resultado histórico R3 permanece intocado.

## Contraprovas locais executadas

- Node 22.16 `node --experimental-strip-types --test qa/hf-ui044/domain-geometry.test.mjs` — **10/10 PASS** (geometria R3, clamp, alvo grande, falha geométrica, classificações de overflow).
- TSC 5.8 `tsc --target ES2022 --module nodenext --moduleResolution nodenext --strict --noEmit --skipLibCheck qa/hf-ui044/domain-geometry.ts` — **PASS**.
- `typescript.transpileModule` de `domain.spec.ts`, `domain-fixtures.ts`, `domain-geometry.ts` — **PASS sintático**, não equivale a typecheck integrado.
- Chromium sintético: scroll antigo posicionou target em y49 com razão0.885; rolagem planejada na faixa produziu target y77–295, razão **1**; cenário modela viewport667×375, header74 e barra76.5 com scroll-padding8/140. **Não é a aplicação real.**

## NOT_RUN e gates remanescentes

`FULLSTACK_STARTER_INTEGRATED_RUNTIME=NOT_RUN`, `OFFICIAL_CI_NEW_SHA=NOT_RUN`, `75_CASES_COVERAGE=NOT_RUN`, `INDEPENDENT_REVIEW=NOT_PROVEN`, `HUMAN_VISUAL_ACCEPTANCE=PENDING`. 3/3 runs anteriores não são reproduzidas nem reclassificadas. O workflow da nova branch não deve disparar Actions nem Preview; inspeção de guard antes da publicação. Não há autorização para merge/deploy nem operação de geocodificador/Neon/SMTP real.
