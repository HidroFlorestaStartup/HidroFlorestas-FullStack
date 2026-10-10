# Tasks: Rascunhos pessoais

**Input**: spec/plan/research/modelo/contratos; testes exigidos pelo pedido.

## Phase 1: Setup

- [x] T001 Registrar aprovação PD-CRI-005/006 e pesquisa em specs/015-environmental-drafts/spec.md e research.md.
- [x] T002 Planejar contratos/modelo/validação em specs/015-environmental-drafts/plan.md, data-model.md, contracts/drafts.md e quickstart.md.

## Phase 2: Foundational

- [ ] T003 Testar envelope parcial/versionamento/tipos/limites em tests/unit/environmental-draft-contracts.test.ts (FR-002).
- [ ] T004 Implementar parser/form converters em src/types/environmental-draft.ts usando ENVIRONMENTAL_FIELDS (FR-002; risco: ciência não afrouxada).
- [ ] T005 Adicionar EnvironmentalDraft/FKs/unique/check/revision em prisma/schema.prisma, prisma/migrations/20261010000100_environmental_drafts/migration.sql e .gitignore; incluir migration em tests/fixtures/ihfr-diagnosis-fixtures.ts (FR-001/FR-008).

## Phase 3: US1 Salvar/retomar

- [ ] T006 [US1] Testar Pg isolamento/conta/vínculo/contexto/lab/save/replay em tests/integration/environmental-drafts.test.ts (FR-001/FR-004).
- [ ] T007 [US1] Implementar serviço transacional e HTTP bounded/CSRF em src/app/api/server/environmental-data/draft.service.ts, draft.http.ts e rota environmental-data/draft (FR-001/FR-002/FR-004).
- [ ] T008 [US1] Integrar save/retomada/unsaved/foco em src/components/environmental-data/environmental-data-form.tsx e environmental-data-page.tsx (FR-003/FR-009).

## Phase 4: US2 Conflito/descarte

- [ ] T009 [US2] Cobrir concorrência, ABA e descarte Pg em tests/integration/environmental-drafts.test.ts (FR-004/FR-005).
- [ ] T010 [US2] Integrar conflito/reload explícito/descarte e consulta de draft remanescente após confirmação alheia em src/components/environmental-data/environmental-data-form.tsx e environmental-draft-actions.tsx (FR-005/FR-009).

## Phase 5: US3 Confirmar/excluir

- [ ] T011 [US3] Reutilizar transação IMP-005 para consumo condicionado em src/app/api/server/services/environmental-data.service.ts e environmental-data.http.ts (FR-006/FR-007).
- [ ] T012 [US3] Remover drafts próprios após blockers dentro de accounts/service.ts e testar rollback/terceiros em tests/integration/environmental-drafts.test.ts (FR-008).
- [ ] T013 [US3] Testar confirmação concorrente/replay/rollback e fronteiras em tests/integration/environmental-drafts.test.ts e tests/migration/environmental-drafts.test.ts (FR-006/FR-007/FR-008).

## Phase 6: Polish

- [ ] T014 Executar E2E save/reload/conflito/descarte/confirm/mobile em tests/e2e/environmental-drafts.spec.ts; regressão 005/013/contas/mail/IHFR (FR-003/FR-009; SC-001 a SC-004).
- [ ] T015 Executar migration/integração/unit/contrato/typecheck/lint/build, revisão independente read-only e converge; registrar specs/015-environmental-drafts/implementation-evidence.md.
- [ ] T016 Sincronizar matriz/decisões/PRD/runbooks pertinentes e commit validado; preservar pendências remotas em docs/plans/active/reconciliacao-e-evolucao-contas-rascunhos-imagens.md.

## Dependencies & Execution Order

T001/T002 → T003/T004 → T005 → T006/T007/T008 → T009/T010 → T011/T012/T013 → T014/T015/T016.
UI/contratos podem ser lidos em paralelo; escrita de schema/auth/shared e testes
de Pg/porta/.next são serializados. MVP US1; aceite local requer todas as histórias.
Testes escritos antes do código correspondente; não fabricar resultado RED.
