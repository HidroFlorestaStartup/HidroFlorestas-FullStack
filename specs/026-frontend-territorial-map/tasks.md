# Tasks: apresentação do mapa territorial

**Input**: `specs/026-frontend-territorial-map/{spec,plan,research,data-model}.md`, `contracts/ui.md`.

**Tests**: solicitados pela C1. Escrever os cenários antes da apresentação; execução E2E depende do ambiente oficial Windows. Não inventar um FAIL inicial nem contornar o guard no ambiente Linux.

## Phase 1 — Setup

- [x] T001 Registrar base/seed, autoridade e escopo em `specs/026-frontend-territorial-map/spec.md` e revisar `checklists/requirements.md`.
- [x] T002 Executar setup-plan/setup-tasks e produzir `specs/026-frontend-territorial-map/{plan,research,data-model,quickstart}.md` e `contracts/ui.md`.

## Phase 2 — Foundational

- [x] T003 Analisar requisitos/plano/tarefas sem editar código e registrar conclusão em `specs/026-frontend-territorial-map/analysis.md` ao iniciar a etapa de implementação.
- [x] T004 Criar `tests/e2e/support/frontend-territorial-map-evidence.ts` com captura fullPage:false, geometria/foco, metadados e arquivo sanitizado exclusivo.

## Phase 3 — US1: mapa/lista e registros de origem (P1)

**Teste independente**: endpoint real, mesma lista/marcadores, teclado e links da área/coleta corretos.

- [x] T005 [US1] Escrever E2E de identidade e seleção mapa/lista em `tests/e2e/frontend-territorial-map.spec.ts`, usando fixture oficial sem mock de dados.
- [x] T006 [US1] Adaptar cabeçalho, lista e painel em `src/components/territorial-map/territorial-map-view.tsx`, mantendo DTO, seleção e destinos.
- [x] T007 [US1] Adaptar cartão/fallback cartográfico em `src/components/territorial-map/territorial-map.tsx` e `.client.tsx`, preservando wrapper SSR, Marker e algoritmo atual.

## Phase 4 — US2: responsividade e teclado (P1)

**Teste independente**: percorrer a última área e a última ação na matriz de viewport/texto, sem overflow/obstrução.

- [x] T008 [US2] Escrever matriz 320/375/768/1440, texto 200% e paisagem, com foco/geometria e capturas em `tests/e2e/frontend-territorial-map.spec.ts`.
- [x] T009 [US2] Implementar estilos isolados, reflow, foco e alvos de controles em `src/components/territorial-map/territorial-map.module.css`.
- [x] T010 [US2] Provar nomes longos persistidos na fixture e controles finais acessíveis em `tests/e2e/frontend-territorial-map.spec.ts`, restaurando fixtures no teardown.

## Phase 5 — US3: estados e recuperação (P1)

**Teste independente**: falha/atraso de transporte, retry real, tiles bloqueados e laboratórios vazio/inativo.

- [x] T011 [US3] Escrever cenários loading/erro/retry, vazio/inativo e navegação entre contextos/back/forward/reload em `tests/e2e/frontend-territorial-map.spec.ts`.
- [x] T012 [US3] Adaptar estados em `src/components/territorial-map/territorial-map-view.tsx`, `territorial-map.tsx` e `territorial-map.client.tsx`, preservando abort/generation, avisos/atribuição e alternativa textual sem tiles.

## Phase 6 — revisão e entrega técnica

- [x] T013 Executar testes unitários territoriais, typecheck, lint focal e diff check; registrar resultados reais em `specs/026-frontend-territorial-map/validation.md`.
- [x] T014 Revisar React, SSR, contratos, limites e rastreabilidade em `specs/026-frontend-territorial-map/traceability.md`; convergir sem relaxar testes.
- [x] T015 Entregar candidato coeso em commit local PT-BR e informar SHA/diff/limites ao coordenador; registrar instruções em `specs/026-frontend-territorial-map/validation.md`.
- [ ] T016 Executar E2E novo/herdado e os 15 gates oficiais no HEAD final, arquivando recibo externo e artefatos `.accounts-validation/frontend-territorial-map/` — coordenador.
- [ ] T017 Inspecionar PNGs/JSON reais, obter revisão externa efetiva do HEAD e tratar achados materiais antes de fechar a PR técnica — coordenador, recibo externo vinculado ao HEAD.
- [x] T018 Corrigir a precedência dos alvos de zoom após o FAIL do run `39578551717`, preservando 44 px/assertions/timeouts, e registrar causa, digest e verificações locais em `specs/026-frontend-territorial-map/validation.md`. Reexecução oficial e inspeção visual permanecem em T016/T017.
- [x] T019 Ligar Enter/Espaço à seleção do marcador e acrescentar checagem de Espaço em marcador distinto no cenário existente; registrar o FAIL do run `39581586760`, fontes efetivas e limites de execução em `specs/026-frontend-territorial-map/validation.md`. T016/T017 permanecem abertas.
- [x] T020 Corrigir o escopo das assertions de alerta de transporte após o FAIL do run `39589899058`, distinguindo o erro da aplicação do anunciador global do Next; preservar unicidade, texto exato e ausência após recuperação. Registrar evidências e limites em `specs/026-frontend-territorial-map/validation.md`; T016/T017 permanecem abertas.

## Dependências e paralelismo

T001–T003 precedem implementação; T004 sustenta T005/T008/T011. Testes são escritos antes dos componentes, mas execução inicial E2E permanece NOT_RUN se o ambiente legítimo não estiver disponível. T006/T007/T009/T012 compartilham arquivos e são serializados por este único escritor. T013–T015 dependem do candidato completo; T016–T017 dependem de publicação protegida pelo coordenador. A frente pode correr em paralelo com IHFR/admin em arquivos distintos, sem nova fragmentação de autoria.

## Critério de conclusão

Tarefas de implementação concluídas não significam CI/aceite humano concluído. T016/T017 só podem ser marcadas por recibo efetivo do SHA final. Não há deploy nesta etapa e não há autorização inferida de merge.
