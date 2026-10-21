# Tasks: Administração global — apresentação

**Estado**: CANDIDATA_LOCAL; implementação e validação focal concluídas. E2E real, inspeção visual e gates oficiais aguardam execução na coordenação.

## Phase 1 — Setup

- [x] T001 Registrar base, autorização, fontes e escritor exclusivo em `specs/027-frontend-user-administration/research.md`.
- [x] T002 Executar SPECIFY/PLAN e gerar `specs/027-frontend-user-administration/spec.md`, `plan.md`, `data-model.md`, `contracts/presentation.md`, `quickstart.md` e checklist.

## Phase 2 — Fundação

- [x] T003 Gerar tarefas e analisar consistência em `specs/027-frontend-user-administration/tasks.md`, `analysis.md` e `traceability.md`.
- [x] T004 Preparar contraprovas de revisão e corpo allowlisted em `tests/unit/frontend-user-administration.test.ts`.

## Phase 3 — US1 Consulta correta

**Independent test**: listagem/filtros/cursor, conta e histórico sem resposta cruzada.

- [x] T005 [US1] Adaptar lista/filtros/paginação e leituras canceláveis em `src/components/user-administration/user-administration-page.tsx`.
- [x] T006 [US1] Cobrir busca/paginação, alvo e resposta atrasada em `tests/e2e/frontend-user-administration.spec.ts`.

## Phase 4 — US2 Revisão e confirmação

**Independent test**: cancelar sem mutação; conflito seguido de GET atual e nova confirmação.

- [x] T007 [US2] Implementar confirmação modal, bloqueio de duplicata e atualização real de versão em `src/components/user-administration/user-administration-page.tsx` e `user-administration-presentation.ts`.
- [x] T008 [US2] Cobrir Escape/foco/conflito atual em `tests/e2e/frontend-user-administration.spec.ts`.

## Phase 5 — US3 Histórico e navegação

**Independent test**: auditoria do alvo, reflow e último controle em todas as viewports previstas.

- [x] T009 [P] [US3] Consolidar navegação e overview sem métricas demonstrativas em `src/components/admin-shell/admin-shell.tsx` e `src/app/(private)/admin/page.tsx`.
- [x] T010 [US3] Exibir auditoria com justificativa, erro/retry e cursor em `src/components/user-administration/user-administration-page.tsx`.
- [x] T011 [US3] Preparar capturas sanitizadas e geometria em `tests/e2e/frontend-user-administration.helper.ts` e `frontend-user-administration.spec.ts`.

## Phase 6 — Validação e revisão

- [x] T012 Executar testes focais/typecheck/lint, revisar diff e registrar resultados em `specs/027-frontend-user-administration/implementation-evidence.md`.
- [ ] T013 Executar E2E real e inspecionar screenshots em `.accounts-validation/frontend-user-administration/`; registrar recibos de execução e inspeção na PR do mesmo SHA, sem commit apenas de recibo.
- [ ] T014 Conferir 15 gates oficiais e review Codex no SHA final publicado; registrar recibo pela coordenação, sem transportar PASS de ancestral.

## Dependências e paralelismo

T001→T002→T003→T004; US1 antecede US2 porque fixa alvo e leitura; US3 pode avançar no shell exclusivo (T009) sem editar o arquivo de US1/US2 simultaneamente. T012 depende de todas as alterações; T013/T014 dependem do runtime/CI da coordenação. Não há segundo escritor nesta worktree. MVP apenas visual não representa fechamento de RC.
