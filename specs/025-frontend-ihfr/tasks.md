# Tasks: Apresentação do IHFR experimental

**Input**: `specs/025-frontend-ihfr/`; spec, plan, research, data-model e contracts completos.

## Phase 1: Setup

- [x] T001 Confirmar ownership, D/S e fonte visual; registrar em `specs/025-frontend-ihfr/spec.md`.
- [x] T002 Aplicar SPECIFY/PLAN reais; registrar decisões e contrato de preservação em `specs/025-frontend-ihfr/`.
- [x] T003 Gerar tarefas com `setup-tasks.sh` e analisar cobertura/consistência antes de implementar.

## Phase 2: User Story 1 — Leitura (P1)

- [x] T004 [US1] Escrever contraprovas em `tests/unit/frontend-ihfr-presentation.test.tsx` e observar falha antes da implementação.
- [x] T005 [US1] Implementar rótulos textuais e aviso em `src/components/ihfr-diagnosis/ihfr-presentation.ts` e `scientific-notice.tsx`.
- [x] T006 [US1] Compor resultado, componentes, proveniência e ausência em `experimental-diagnosis-summary.tsx` e `no-current-diagnosis.tsx` sem recálculo.

## Phase 3: User Story 2 — Gestão (P1)

- [x] T007 [US2] Renovar apenas apresentação em `ihfr-diagnosis-management.tsx`, preservando funções e protocolo.
- [x] T008 [US2] Ampliar provas de foco e capturas de confirmação/recuperação em `tests/e2e/ihfr-diagnosis-manage.spec.ts` sem afrouxar cenários existentes.

## Phase 4: User Story 3 — Responsividade e evidência (P2)

- [x] T009 [US3] Criar helper sanitizado em `tests/e2e/support/frontend-ihfr-evidence.ts`, reutilizando geometria existente sem editar helper compartilhado.
- [x] T010 [US3] Acrescentar viewports, texto 200%, paisagem e capturas de leitura em `tests/e2e/ihfr-diagnosis-read.spec.ts`.

## Phase 5: Verificação e handoff

- [x] T011 Executar testes unitários focais, typecheck, lint e auditoria do diff; registrar em `specs/025-frontend-ihfr/evidence.md`.
- [x] T012 Atualizar `traceability.md`, análise final e tarefas; realizar revisão local e commit PT-BR para o coordenador.
- [x] T013 Executar primeira rodada dos 15 gates e revisão Codex no HEAD `a724bf7`: 15/15 PASS, Codex sem findings; recibo em `ci-review-2026-10-21.md`.
- [x] T014 Abrir 40 PNG e conferir 40 metadados da primeira rodada; registrar FAIL visual P2 de fragmentação a 320/200% em `ci-review-2026-10-21.md`.
- [x] T015 Corrigir padding/reflow focal e acrescentar Range por palavra para qualificações e ações, sem mudar handlers/ciência; unitários/typecheck/lint locais PASS; fechamento local indisponível, contingência autorizada por API.
- [ ] T016 Revalidar CI, Codex e imagens no novo HEAD publicado do reparo; nenhum resultado da primeira candidata vale automaticamente para este HEAD.

## Dependencies & Execution Order

T001–T003 precedem implementação. T004 antes de T005/T006. T007 preserva US1 e pode ser revisado independentemente. T009 precede T008/T010. T011–T012 só após código/testes. T013–T014 dependem do SHA final publicado pelo coordenador. Um único escritor nesta frente; as outras frentes IHFR/mapa/admin já estão paralelizadas pelo coordenador.

## Implementation Strategy

Validar invariantes de leitura primeiro; alterar JSX da gestão sem reescrever handlers; ampliar o runner dedicado por seus testes existentes; distinguir verificações executadas de evidência futura. Nenhuma publicação/merge/deploy é feita por este agente.
