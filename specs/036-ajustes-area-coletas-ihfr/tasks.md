# Tasks: 036 — área, coletas e IHFR

**Corte atual HF-UI-044-CLOSE-B (2026-11-01):** T009/T015/T023 encerradas pela evidência de CI no `CODE_SHA_TESTED=d7586ab95c69c45211e463516080e741bbb3931a`, run `41252813575`/tentativa 1, 15/15 PASS; T017 encerrada pela publicação documental e atualização da PR Draft #47, identificadas no próprio histórico da PR. T008/T016 **não** foram marcadas: comparação bilateral executada Lovable × FullStack continua `NOT_RUN`/`B_VISUAL_EVIDENCE_PENDING`. O commit documental posterior é um HEAD novo e não recebe automaticamente o PASS do código.

Lista inicial G0; fonte #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Completar mapa de arquivos/Spec Kit antes de produto. Testes obrigatórios.

## Preparação

- [x] T001 Registrar preflight/HEAD/base/guardas/ambiente em `specs/036-ajustes-area-coletas-ihfr/implementation-evidence.md`, usando o guard `07755822f5dc75fe2be1d924005d30ed99f64a0b`.
- [x] T002 Completar `spec.md`, `plan.md` e este `tasks.md` com paths de imports reais, AGENTS, contratos e referências Code-First integrais; reservar alterações compartilhadas ao coordenador.

## US1 — descoberta e ordenação

- [x] T003 [US1] Criar casos focais em `tests/unit/hf-ui036-area-presentation.test.ts`: offsets/empates, coleta recente sem IHFR, coleta anterior com resultado e revogação/substituição; demonstrar regressões quando reproduzíveis.
- [x] T004 [US1] Implementar UI-02 a partir de `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx` e imports congelados no plano, sem editar formulário C; preservar autorização nas leituras.
- [x] T005 [US1] Cobrir ida/volta área → coleta → ambientais em `tests/e2e/hf-ui036-area-collections.spec.ts`, sem criar diagnóstico automaticamente.

## US2/US3 — composição e detalhes técnicos

- [x] T006 [US2] Implementar UI-03 no detalhe `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx` e componentes mapeados; testar confirmação, draft e responsividade no E2E próprio.
- [x] T007 [US3] Implementar UI-04 nos componentes mapeados em `plan.md`; verificar os quatro qualificadores/proveniência acessíveis por teclado e orientação humana para falta de dados confirmados.
- [ ] T008 [US2] [US3] Comparar runtimes nos viewports aprovados; registrar capturas viewport, geometria, foco e texto 200% em `implementation-evidence.md`.

## Validação e entrega

- [x] T009 Executar testes focais e os quinze gates de `scripts/rc-review-validation.ps1` em ambiente sintético; registrar evidências reais por SHA/run/tentativa, sem alterar gates ou ciência.
- [x] T010 Atualizar `spec.md`, `plan.md`, `tasks.md`, `implementation-evidence.md` e PR Draft próprio com diffs exclusivo/acumulado, ownership e pendências; sem merge/deploy.

Nenhuma tarefa de produto/teste foi marcada concluída por G0. Não paralelizar edição do mesmo arquivo com A/C.


## Checkpoint de execução B — 2026-10-31

**T001–T007 [x]** significam produção do código, dos testes e da documentação técnica correspondentes, **não** aprovação dos testes. O E2E sintético de B ainda aguarda resultado terminal no HEAD implementado.

**T008 [ ]**: as capturas viewport foram programadas no harness existente com `fullPage:false` e registros geométricos, mas a comparação real starter x FullStack no mesmo estado não foi realizada, nem se alegam provas visuais inexistentes.

**T009 [ ]**: havia run real G0 com 9 gates PASS, E2E FAIL e 5 gates posteriores NOT_RUN. Run do código B `41231960336` (SHA `9a34e1a76d75b384a87bab2093ff138b3488094f`) foi observado PENDING; o novo HEAD documental deverá ter sua própria execução verificada. Não confundir PASS de outro SHA.

**T010 [x]**: spec/plano/tarefas/evidências na reserva 036 e atualização da PR Draft #47 são parte da mesma publicação; dependências humanas não foram fechadas e seguem listadas como pendências. Nenhum merge/deploy.

## Iteração corretiva da CI — 2026-10-31

- [x] T011 [ANALYZE] Cruzar SC-036, plan/tasks, constituição, código e logs reais do run 41234289600; classificar as duas falhas `Ihfr` sem misturar PASS de outros SHAs.
- [x] T012 [PLAN] Determinar reparo de isolamento de área por API em schema descartável; manter fixtures e contracts científicos existentes.
- [x] T013 [IMPLEMENT] Ajustar a prova integrada em `tests/e2e/ihfr-diagnosis-manage.spec.ts` para dois registros próprios, identidade de origem e ausência de IHFR da mais recente.
- [x] T014 [IMPLEMENT] Recuperar largura do disclosure e aviso em `experimental-diagnosis-summary.tsx` e `scientific-notice.tsx`, sem reduzir a fonte ou enfraquecer `expectIHFRScientificWords`.
- [x] T015 [REVIEW] Coletar os resultados reais dos 15 gates no novo SHA, com evidências visuais, hashes e relatório de escopo; não declarar PASS antes do término da Action.
- [ ] T016 [REVIEW] Qualificar comparação visual executada starter/FullStack no mesmo estado; se o ambiente não permitir executar o starter, manter T008/T016 pendentes explicitamente.
- [x] T017 [HANDOFF] Atualizar PR #47 e evidências no SHA final e documentar eventuais pendências de integração/aceite, sem merge/deploy.

Os marcadores T013/T014 representam implementação versionada; os resultados de testes pertencem a T015. Validação científica, operação de provedores e aceitação humana continuam fora do recorte.

- [x] T018 [REVIEW → IMPLEMENT] Corrigir divisão interna da palavra `ambientais` no CTA UI-02 vista no snapshot 320px/texto200, sem reduzir a escala ou duplicar controles.
- [x] T019 [TEST] Acrescentar verificação real de palavras inteiras no E2E de área e preservar teste de overflow; exigir PASS no HEAD final antes de encerrar T015.

## Iteração de convergência corretiva — run 41251345900

- [x] T020 [ANALYZE/PLAN] Isolar os dois novos failures do IHFR do SHA `013264106ef990480ae5a3963926527ee04c5e7c`, sem confundir resultado dos 12 gates anteriores.
- [x] T021 [IMPLEMENT] Preservar o fragmento intencional da URL em `tests/e2e/ihfr-diagnosis-manage.spec.ts` e testar a navegação contextual completa.
- [x] T022 [IMPLEMENT] Ajustar a grade de qualificadores de `ScientificNotice` para uma coluna abaixo de `lg`, mantendo texto 200% e o assert de 100% da qualificação visível em paisagem 667x375.
- [x] T023 [REVIEW] Observar terminalmente todos os 15 gates no novo HEAD, atualizar PR própria e a classificação dos itens 015–017; a comparação executada do starter e a revisão humana continuam pendentes.

Os itens T021/T022 apenas confirmam a publicação do patch, não validam o gate terminal por antecipação.


## Fechamento factual de tarefas — HF-UI-044-CLOSE-B

| Tarefa | Estado terminal neste corte | Base verificável / limite |
| --- | --- | --- |
| T008 | `[ ]` / `NOT_RUN` bilateral | Starter cbb954a não executado com FullStack d7586a nas mesmas fixtures e condições; capturas da PR #44 são históricas. |
| T009 | `[x]` / `PASS` no `CODE_SHA_TESTED` | 15/15 gates no run 41252813575, tentativa 1, `results.jsonl`; E2E geral 223 PASS e IHFR 6 PASS. |
| T015 | `[x]` / `PASS` journal + visual unilateral | ZIP artefato 13062377832, integridade verificada, provas de viewport FullStack; sem equivalência do starter. |
| T016 | `[ ]` / `NOT_RUN` bilateral | Sem execução pareada dos dois projetos; não classificar `B_VISUAL_BILATERAL_PASS`. |
| T017 | `[x]` / `HANDOFF_DOCUMENTED` | Documento e PR #47 atualizados com SHA de código e novo HEAD documental, mantendo Draft e histórico. Não é aceite externo. |
| T023 | `[x]` / `PASS` somente no código B | 15 linhas PASS/`exitCode=0`, SHA exato, run/tentativa, zero gates reprovados; novo SHA documental deve receber checagem independente. |

`CODE_SHA_TESTED=d7586ab95c69c45211e463516080e741bbb3931a`. `DOC_HEAD=commit documental desta revisão (identificar pelo HEAD da PR #47 publicada)`. Sem patch de produto, não se reinterpretam os 15 gates ou se reexecuta a suíte sem causa. Revisão bilateral e QA da composição A/B ainda pendentes.

## CLOSE-PARALLEL-02 / B — novos IDs, histórico preservado

- [x] T024 [ANALYZE/PLAN] Analisar5FR/4SC e fontes fixadas, classificar COV-B1/EQ-B1/EQ-B2 e congelar grade em `evidence/close02-matrix.json`.
- [x] T025 [IMPLEMENT] Criar `qa/hf-ui044/domain-fixtures.ts` com autenticação oficial, APIs reais owned, offsets/ordem de confirmação inversa, anterior CURRENT e adapter só referência; cleanup sem enfraquecer imutabilidade.
- [x] T026 [IMPLEMENT] Criar `qa/hf-ui044/domain.spec.ts`:75 casos pareados planejados,60recortes centrais/12qualificadores/2teclado+histórico/1reload, índice incremental e sumário fail-closed.
- [ ] T027 [RUNTIME] Executar ui-b Windows/Node24.19 na candidata final, registrar SHA/run/attempt/artifact, execução/comparabilidade/requisito/completude individuais. Descoberta local não cumpre esta tarefa.
- [ ] T028 [REVIEW] Inspecionar os PNGs reais dos dois projetos e todas as diferenças bloqueantes; produzir análise de hierarquia/tipografia/densidade/navegação/ações em `evidence/close02-comparison.md`.
- [x] T029 [REVIEW/COMMIT] Verificar sintaxe/lint/descoberta/escopo/whitespace e entregar commit local/handoff exclusivo, sem push de worker.
- [ ] T030 [HANDOFF] Reconciliar resultado terminal da candidata/artefatos com T008/T016, encaminhar revisão não autora e preservar aceite humano/ciência pendentes.

T025/T026 assinalam implementação do harness e fixtures, não execução runtime. T029 é revisão própria,
sem substituir executor não autor. Typecheck oficial completo permanece dependente do coordenador.

- [x] T031 [CORREÇÃO/REVIEW] Após finding MEDIUM não autor, impedir COMPARABLE/NON_EQUIVALENT sem dois samples em `domain.spec.ts`; contraprova da função real para zero/um/dois samples (6cenários), typecheck/lint locais PASS. Runtime da correção permanece NOT_RUN até nova candidata do coordenador.

- [x] T032 [R1 ANALYZE/PLAN/IMPLEMENT/REVIEW] Corrigir somente o seletor do textbox Nome do laboratório no starter após timeout real de setup; contraprova Chromium sintético da estrutura required/aria-hidden RED/GREEN e auditoria estática dos demais seletores/adapter. Runtime bilateral da correção ainda NOT_RUN.
