# Tasks: Cadastro e conjunto de contas

**Input**: spec.md, plan.md, research.md, data-model.md, contracts/ui-contracts.md, quickstart.md.
**Tests**: RED/GREEN solicitado pelo usuário; suites oficiais preservadas.

## Phase 1: Setup

- [x] T001 Registrar baseline, worktree, fontes e limites em specs/018-frontend-account/plan.md.
- [x] T002 Produzir spec e qualidade em specs/018-frontend-account/spec.md e checklists/requirements.md.

## Phase 2: Foundational

- [x] T003 Mapear consumidores/estados e reversão em specs/018-frontend-account/contracts/ui-contracts.md e plan.md.
- [x] T004 Executar análise de consistência de specs/018-frontend-account/{spec,plan,tasks}.md antes do código.
- [ ] T005 Registrar RED e capturas baseline em specs/018-frontend-account/evidence/ pelo teste tests/e2e/frontend-account.spec.ts.
- [ ] T006 Harmonizar AccountShell e PasswordField e criar controles de prontidão em src/components/account/{account-shell,password-field,account-controls}.tsx e account.module.css (FR-007–FR-009).

## Phase 3: User Story 1 — cadastro e verificação

Teste independente: cadastro real e destinos/estado/cooldown preservados.

- [ ] T007 [US1] Testar hidratação, retry idempotente, payload e duplo envio antes da alteração em tests/e2e/frontend-account.spec.ts (FR-001–FR-003, FR-007).
- [ ] T008 [US1] Adaptar src/app/register/page.tsx à composição split preservando signUp e a chave (FR-002, FR-009).
- [ ] T009 [US1] Harmonizar e proteger envio em src/components/account/email-verification-form.tsx sem mudar estados/código (FR-003, FR-007).

## Phase 4: User Story 2 — recuperar e alterar senha

Teste independente: neutralidade, prova em memória, política e revogação.

- [ ] T010 [US2] Cobrir prontidão/teclado/visual em tests/e2e/frontend-account.spec.ts e preservar tests/e2e/account-verification-recovery.spec.ts (FR-004, FR-005, FR-008).
- [ ] T011 [US2] Harmonizar e proteger envio em src/components/account/{forgot-password-form,password-reset-form}.tsx (FR-004, FR-005, FR-007).

## Phase 5: User Story 3 — exclusão explícita

Teste independente: impedimentos reais e confirmação sem exclusão incidental.

- [ ] T012 [US3] Cobrir visual/ações em tests/e2e/frontend-account.spec.ts e conservar tests/e2e/account-deletion.spec.ts (FR-006, FR-008).
- [ ] T013 [US3] Harmonizar src/components/account/account-deletion-form.tsx e preservar tom destrutivo/confirmar/returnTo (FR-006, FR-009).

## Phase 6: Polish e publicação

- [ ] T014 Validar seis jornadas/teclado/foco/reflow e salvar capturas em specs/018-frontend-account/evidence/ (FR-008, SC-001–SC-004).
- [ ] T015 Executar GREEN/regressão pelo scripts/rc-review-validation.ps1, registrar resultados em specs/018-frontend-account/implementation-evidence.md.
- [ ] T016 Revisar diff adversarialmente e registrar achados em specs/018-frontend-account/implementation-evidence.md; corrigir somente riscos demonstrados.
- [ ] T017 Incluir branch exata em .github/workflows/rc-review.yml e desligar preview em vercel.json; commits/push/PR para development sem merge.
- [ ] T018 Acompanhar15 gates do SHA publicado e registrar no PR/evidências; continuar fase3 em specs/<próximo-livre>/plan.md.

## Dependencies & Execution Order

T001–T004 → T005/testes RED → T006 → US1/US2/US3 → T014–T018. Código dos formulários só após RED. Testes em arquivo compartilhado sequenciais; nenhuma edição simultânea do mesmo arquivo. Validação de artefatos independentes pode ser paralela. US2/US3 não dependem de cadastro novo para teste. MVP é US1; missão exige todas as histórias. Sem deploy.

## Rastreabilidade

FR-001:T007/T015; FR-002:T007/T008; FR-003:T007/T009; FR-004:T010/T011; FR-005:T010/T011; FR-006:T012/T013; FR-007:T005/T006/T007/T009/T011; FR-008:T010/T012/T014; FR-009:T006/T008/T013. SC-001:T015; SC-002:T014; SC-003:T007; SC-004:T014/T016.
