# Tasks: Instrumentos locais de prontidão territorial

**Input**: [spec.md](spec.md), [plan.md](plan.md), pesquisa/modelo/quickstart.
**Estado**: implementação, execução real e revisão independente concluídas; fechamento documental concluído. Testes de guard e percentil exigidos pelo recorte de segurança/reprodutibilidade.

## Phase 1: Setup

- [X] T001 Resolver template e registrar fontes/recorte em `specs/030-local-readiness-instruments/spec.md` e checklist próprio.
- [X] T002 Executar setup-plan/setup-tasks instalados e registrar desenho em `specs/030-local-readiness-instruments/plan.md`, `research.md`, `data-model.md` e `quickstart.md`.
- [X] T003 Registrar revisão independente anterior à implementação em `specs/030-local-readiness-instruments/implementation-evidence.md`.

## Phase 2: Foundational

- [X] T004 Definir guard puro local e p95 em `scripts/local-readiness-policy.ts`, com testes primeiro em `tests/investigations/readiness/local-readiness-policy.test.ts`.
- [X] T005 Integrar somente ciclo owned de schema/processo e sanitização em `scripts/local-readiness.ts`, com orçamento cooperativo5min e teardown explícito.

## Phase 3: US1 - Medição real (Priority: P1)

**Independent Test**: execução manual mede exatamente100 respostas integrais após10 aquecimentos, planos efetivos e lista100 sem tiles.

- [X] T006 [US1] Criar fixtures target100/1000 e ruído10/100 no schema próprio em `scripts/local-readiness.ts`.
- [X] T007 [US1] Medir100 leituras autenticadas e capturar/explicar consultas efetivas com projeção sanitizada em `scripts/local-readiness.ts`.
- [X] T008 [US1] Exercitar lista100, seleção por teclado, destinos e latência após resposta com recursos externos bloqueados em `scripts/local-readiness.ts`.

## Phase 4: US2 - Recusa e limpeza (Priority: P1)

**Independent Test**: testes puros recusam externo/configuração ambígua antes de efeitos; execução real verifica teardown owned.

- [X] T009 [US2] Validar negativos host/porta/confirmação/contexto/provedor e cálculos de percentil em `tests/investigations/readiness/local-readiness-policy.test.ts`.
- [X] T010 [US2] Produzir recibo inclusive de falha e conferir teardown no fluxo completo em `scripts/local-readiness.ts`.

## Phase 5: Polish & Cross-Cutting

- [X] T011 Executar testes focais/typecheck/lint e instrumento sob demanda, registrar comandos/contagens/limites em `specs/030-local-readiness-instruments/implementation-evidence.md`.
- [X] T012 [P] Finalizar runbook e evidências sanitizadas em `docs/reports/2026-10-25-hf-night-01/qa/` e revisar escopo/diff/referências antes de commit.

## Dependencies & Execution Order

T001→T002→T003→T004→T005; T006→T007→T008; T009 depende T004 e pode ocorrer antes da medição; T010 depende T005/T009; T011 depende T006–T010; T012 depende dos resultados. US2 guard é fundação de segurança antes de efeitos da US1. Recursos PostgreSQL/Next serializados; não executar carga junto ao baseline. T012 documental é paralelizável após resultados disponíveis. Sem novo workflow/package script.

## Implementation Strategy

MVP: guard/estatística e lifecycle primeiro; medição em incremento único; evidência de falhas preservada. Não publicar nem integrar antes da revisão independente final. Nenhum checkbox representa aceite humano de produto ou ciência.
