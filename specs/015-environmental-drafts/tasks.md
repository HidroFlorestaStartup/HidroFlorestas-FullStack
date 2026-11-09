# Tasks: Rascunhos pessoais

**Input**: spec/plan/research/modelo/contratos; testes exigidos pelo pedido.

## Phase 1: Setup

- [x] T001 Registrar aprovação PD-CRI-005/006 e pesquisa em specs/015-environmental-drafts/spec.md e research.md.
- [x] T002 Planejar contratos/modelo/validação em specs/015-environmental-drafts/plan.md, data-model.md, contracts/drafts.md e quickstart.md.

## Phase 2: Foundational

- [x] T003 Testar envelope parcial/versionamento/tipos/limites em tests/unit/environmental-draft-contracts.test.ts (FR-002).
- [x] T004 Implementar parser/form converters em src/types/environmental-draft.ts usando ENVIRONMENTAL_FIELDS (FR-002; risco: ciência não afrouxada).
- [x] T005 Adicionar EnvironmentalDraft/FKs/unique/check/revision em prisma/schema.prisma, prisma/migrations/20261010000100_environmental_drafts/migration.sql e .gitignore; incluir migration em tests/fixtures/ihfr-diagnosis-fixtures.ts (FR-001/FR-008).

## Phase 3: US1 Salvar/retomar

- [x] T006 [US1] Testar Pg isolamento/conta/vínculo/contexto/lab/save/replay em tests/integration/environmental-drafts.test.ts (FR-001/FR-004).
- [x] T007 [US1] Implementar serviço transacional e HTTP bounded/CSRF em src/app/api/server/environmental-data/draft.service.ts, draft.http.ts e rota environmental-data/draft (FR-001/FR-002/FR-004).
- [x] T008 [US1] Integrar save/retomada/unsaved/foco em src/components/environmental-data/environmental-data-form.tsx e environmental-data-page.tsx (FR-003/FR-009).

## Phase 4: US2 Conflito/descarte

- [x] T009 [US2] Cobrir concorrência, ABA e descarte Pg em tests/integration/environmental-drafts.test.ts (FR-004/FR-005).
- [x] T010 [US2] Integrar conflito/reload explícito/descarte e consulta de draft remanescente após confirmação alheia em src/components/environmental-data/environmental-data-form.tsx e environmental-draft-actions.tsx (FR-005/FR-009).

## Phase 5: US3 Confirmar/excluir

- [x] T011 [US3] Reutilizar transação IMP-005 para consumo condicionado em src/app/api/server/services/environmental-data.service.ts e environmental-data.http.ts (FR-006/FR-007).
- [x] T012 [US3] Remover drafts próprios após blockers dentro de accounts/service.ts e testar rollback/terceiros em tests/integration/environmental-drafts.test.ts (FR-008).
- [x] T013 [US3] Testar confirmação concorrente/replay/rollback e fronteiras em tests/integration/environmental-drafts.test.ts e tests/migration/environmental-drafts.test.ts (FR-006/FR-007/FR-008).

## Phase 6: Polish

- [x] T014 Executar E2E save/reload/conflito/descarte/confirm/mobile em tests/e2e/environmental-drafts.spec.ts; regressão 005/013/contas/mail/IHFR (FR-003/FR-009; SC-001 a SC-004).
- [x] T015 Executar migration/integração/unit/contrato/typecheck/lint/build, revisão independente read-only e converge; registrar specs/015-environmental-drafts/implementation-evidence.md.
- [x] T016 Sincronizar matriz/decisões/PRD/runbooks pertinentes e commit validado; preservar pendências remotas em docs/plans/active/reconciliacao-e-evolucao-contas-rascunhos-imagens.md.

## Dependencies & Execution Order

T001/T002 → T003/T004 → T005 → T006/T007/T008 → T009/T010 → T011/T012/T013 → T014/T015/T016.
UI/contratos podem ser lidos em paralelo; escrita de schema/auth/shared e testes
de Pg/porta/.next são serializados. MVP US1; aceite local requer todas as histórias.
Testes escritos antes do código correspondente; não fabricar resultado RED.

## Convergência durante validação

- [x] T017 Atualizar teste de inventário em tests/migration/ihfr-diagnosis-preflight.test.ts para preservar a ordem do segmento publicado e incluir migration aditiva 015; corrigir fixture da migration nova criando vínculo OWNER na transação exigida pelo guard existente. Falha real: 34 PASS/2 FAIL na suíte Migration; não enfraquecer invariantes. Precede T015.
- [x] T018 Resolver quatro achados P2 de revisão independente: confirmação sem headers com draft próprio vigente; preservar células omitidas/absent/blank não editadas na UI; bloquear saída pelo histórico quando cancelada; feedback para raw acima de 1000 caracteres. Testar primeiro os dois contratos críticos e acrescentar E2E de saída/limite. Arquivos: environmental-data.service.ts, environmental-draft.ts, environmental-data-form.tsx e respectivos testes. Precede T015/T016.

## RC-DRAFT-001 — hidratação lenta (2026-10-13)

- [x] T019 Reconciliar FR-002/FR-003/FR-009 e planejar prontidão/TDD em specs/015-environmental-drafts/{spec.md,plan.md,research.md,data-model.md,contracts/drafts.md,quickstart.md}.
- [x] T020 [US1] Acrescentar RED determinístico de controles SSR bloqueados, primeiro PUT false/0/ausência e retomada em tests/e2e/environmental-drafts.spec.ts; conservar testes originais.
- [x] T021 [US1] Implementar prontidão SSR/hidratação e desabilitação/feedback em src/components/environmental-data/environmental-data-form.tsx, mantendo conversores e API.
- [x] T022 [US1] Executar GREEN/focais/unit/typecheck/lint/build em runners atuais e registrar comandos/UTC/fingerprints/FAIL em specs/015-environmental-drafts/hydration-evidence.md. E2E geral67 PASS após rodada66 PASS/1 ECONNRESET preservada.
- [x] T023 Atualizar evidências/runbook em specs/015-environmental-drafts/implementation-evidence.md e docs/operations/environmental-drafts-runbook.md; commit e publicação fast-forward da branch protegida. Publicação confirmada no PR3, sem deploy.
- [x] T024 Sincronizar pilha por merges internos, resolver conflito #5, incorporar SHA99d8363 uma vez e revalidar combinação final; registrar resultado em specs/015-environmental-drafts/rc-stack-plan.md e documentação da RC nas branches que a contêm. Árvore9fe2bec:15 gates PASS, E2E70; CI015 run38452752261 SUCCESS. Aprovação/integração principal permanecem humanas.

T019 → T020 → T021 → T022 → T023 → T024. Testes DB/porta/build são sequenciais.
MVP é US1 com dois baselines; não introduzir autosave, novo modelo ou nova ciência.
