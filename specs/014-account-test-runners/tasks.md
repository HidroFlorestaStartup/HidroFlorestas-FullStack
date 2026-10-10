# Tasks: Runners de contas

## Phase 1: Setup

- [x] T001 Registrar falha anterior e limites em specs/014-account-test-runners/spec.md e research.md (FR-003).
- [x] T002 Planejar correção e critérios em specs/014-account-test-runners/plan.md (FR-001/FR-002).

## Phase 2: US1 Regressão

- [ ] T003 [US1] Ajustar seleção em playwright.config.ts sem alterar runner dedicado/assertions (FR-001).
- [ ] T004 [US1] Executar E2E geral, scripts/account-deletion-e2e.ts e HTTPS sequencialmente; registrar specs/014-account-test-runners/implementation-evidence.md (FR-002/FR-003).

## Phase 3: Polish

- [ ] T005 Revisar diff/links/escopo e atualizar plano transversal/matriz em docs/plans/active/; commit funcional somente após validação (SC-001/SC-002).

## Dependencies & Execution Order

T001/T002 → T003 → T004 → T005. Sem paralelismo de banco/.next/porta.
MVP é US1; não amplia domínio de contas nem altera gates humanos remotos.
