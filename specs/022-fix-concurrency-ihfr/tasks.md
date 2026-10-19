# Tasks: Concorrência e IHFR

**Input**: [plan.md](plan.md), [spec.md](spec.md), research/data-model/contracts/quickstart.
**Tests**: RED/GREEN determinísticos solicitados pelo usuário.

## Phase 1: Setup

- [x] T001 Registrar baseline/worktree e preservação em `plan.md`.
- [x] T002 Criar artefatos Spec Kit em `specs/022-fix-concurrency-ihfr/` e validar16critérios de requisitos.
- [x] T003 Preparar cluster próprio e dependências locais, registrando isolamento em `implementation-evidence.md`.

## Phase 2: Foundational

- [x] T004 Comparar artefatos históricos A/B em `evidence/historical-comparison.md`.
- [x] T005 Obter investigação estática independente por frente, consolidada em `research.md`.

## Phase 3: US1 — Concorrência (P1)

**Independent test**: conflitos reais sincronizados; resultado e contagens finais de quota/jobs.

- [x] T006 [US1] Criar controle em `tests/integration/area-covers.test.ts` e reprodutor correlacionado em `tests/integration/area-covers-contention.test.ts`; salvar RED/causa em `evidence/`.
- [x] T007 [US1] Corrigir causa comprovada em `src/app/api/server/images/service.ts` e demonstrar GREEN; histórico de duas chamadas inconclusivo em `implementation-evidence.md`.
- [x] T008 [US1] Verificar autorização/replay/quotas/rollback e obter revisão independente em `evidence/review-concurrency.md`.

## Phase 4: US2 — IHFR (P1)

**Independent test**: runner oficial isolado e controles discriminantes sem alterar asserções científicas.

- [x] T009 [P] [US2] Capturar diagnóstico sanitizado e controles artificiais separados em `scripts/imp006-local-e2e.ts`, `tests/experiments/` e `evidence/`.
- [x] T010 [US2] Registrar causa histórica inconclusiva em `implementation-evidence.md`; nenhuma correção funcional especulativa.
- [x] T011 [US2] Obter revisão independente em `evidence/review-ihfr.md`.

## Phase 5: Review e entrega

- [x] T012 Permitir CI somente da branch nova em `.github/workflows/rc-review.yml` e bloquear seu deploy em `vercel.json`.
- [x] T013 Executar testes oficiais e registrar `implementation-evidence.md`;15gates iniciais conferidos em `evidence/ci-initial.json`. Conferência obrigatória do último SHA no recibo externo do PR16 condiciona a entrega, sem novo commit após o journal final.
- [x] T014 Conferir diff/escopo/links/segredos/demo e concluir `plan.md`/`tasks.md`; preservar a condição de entrega do SHA final.
- [x] T015 Commit/push/PR16 próprio e `@codex review`; URLs em `implementation-evidence.md`, recibo final pendente do CI.

## Dependencies & Execution Order

Setup → T004/T005 → US1/US2 independentes → revisão/testes/PR. Reprodutor RED precede correção. T009 pode ocorrer durante análise A, sem dois runners/bancos simultâneos. Revisores não editam arquivos compartilhados.

## Implementation Strategy

MVP: reprodução A e correção só se comprovada; B investigada independentemente. Revisões A/B em paralelo após evidências. Encerramento exige declarar estados não executados/inconclusivos, sem simular sucesso.
