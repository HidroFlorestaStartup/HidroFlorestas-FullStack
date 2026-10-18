# Tasks: Workspace, navegação e shell
**Input**: spec.md, plan.md, research.md, data-model.md, contracts/ui-contracts.md e quickstart.md.
**Tests**: RED/GREEN e regressão oficial exigidos pelo usuário.
## Phase 1: Setup
- [x] T001 Reconferir branches/baselines/PR11 e registrar base empilhada em specs/019-frontend-workspace-shell/plan.md.
- [x] T002 Criar spec e checklist de qualidade em specs/019-frontend-workspace-shell/{spec,checklists/requirements}.md.
## Phase 2: Foundational
- [x] T003 Inventariar consumidores/contratos/reversão em specs/019-frontend-workspace-shell/{plan,research,data-model}.md e contracts/ui-contracts.md.
- [x] T004 Analisar consistência de specs/019-frontend-workspace-shell/{spec,plan,tasks}.md antes do código.
- [x] T005 Criar tests/e2e/frontend-workspace.spec.ts e salvar baseline/RED sanitizado em specs/019-frontend-workspace-shell/evidence/.
## Phase 3: US1 — escolher e gerir
Teste independente: vazio/criação/reload/limite e gestão real com confirmação.
- [x] T006 [US1] Provar RED/preservação de criação/risco/foco/erro/retry em tests/e2e/frontend-workspace.spec.ts (FR-001/002/005).
- [x] T007 [US1] Compactar src/app/(private)/workspace/page.tsx e src/components/workspace/laboratory-workspace.tsx usando workspace.module.css sem alterar serviços (FR-001/006/009).
- [x] T008 [US1] Criar src/components/workspace/settings-dialog.tsx e integrar foco/erro/busy/retorno em laboratory-workspace.tsx após RED; preservar confirmação/payload/roles (FR-002/005).
## Phase 4: US2 — contexto e consumidores
Teste independente: links/contexto/roles reais e páginas antigas acessíveis.
- [x] T009 [US2] Cobrir seleção/perda de vínculo/roles/legibilidade do chrome em tests/e2e/frontend-workspace.spec.ts e preservar suites contextuais existentes (FR-003/004/007).
- [x] T010 [US2] Criar src/components/shell/{application-shell.tsx,shell.module.css} e adaptar workspace/layout.tsx e dashboard/layout.tsx sem tocar guard/restorer (FR-003/004/006/009).
- [x] T011 [US2] Harmonizar src/components/sidebar/index.tsx e src/components/shell/laboratory-navigation.tsx, integrando dashboard/laboratories/[laboratoryId]/layout.tsx com capacidades server existentes (FR-003/005/007).
- [x] T012 [US2] Verificar consumidores antigos da matriz via tests/e2e e registrar em specs/019-frontend-workspace-shell/implementation-evidence.md, sem redesenhar páginas (FR-007, SC-004).
## Phase 5: US3 — menu e saída
Teste independente: menu por teclado e logout real375/1440 com histórico.
- [x] T013 [US3] Cobrir menu/foco/resize/navegação e logout real/erro/retry em tests/e2e/frontend-workspace.spec.ts (FR-005/008).
- [x] T014 [US3] Harmonizar src/components/top-bar/index.tsx e src/app/logout/page.tsx; preservar logout/contexto e um Sair visível (FR-005/008/009).
- [x] T015 [US3] Adaptar somente abertura do menu móvel em tests/e2e/account-deletion.spec.ts conservando assertions de domínio (FR-007/008).
## Phase 6: Polish e publicação
- [x] T016 Validar/capturar4 larguras, estados e foco em specs/019-frontend-workspace-shell/evidence/ e registrar GREEN15 gates em implementation-evidence.md (FR-006/010, SC-001/002/003).
- [x] T017 Revisar diff/capturas adversarialmente com revisão independente; registrar/corrigir achados demonstrados em specs/019-frontend-workspace-shell/implementation-evidence.md (SC-004).
- [x] T018 Adicionar branch exata à allowlist/if em .github/workflows/rc-review.yml e Previewfalse em vercel.json, conservando15 gates/guards/Actions (FR-010).
- [ ] T019 Fazer commits/push e PR empilhado; registrar base/HEAD/ordem em specs/019-frontend-workspace-shell/implementation-evidence.md e no PR (FR-010).
- [ ] T020 Acompanhar15 gates do SHA cumulativo publicado e inspecionar artefato; registrar recibo final no PR, preservar main/development/RC e reportar limites (FR-010, SC-001/004).
## Dependencies & Execution Order
T001–T004 → T005/RED → US1 → US2/US3 → T016–T020. MVP é US1; missão exige todas. RED antes de código; nenhum deploy.
US1, US2 e US3 testáveis com fixtures próprias/existentes, sem depender de criação manual prévia. Testes compartilham arquivo e são escritos sequencialmente. Shell/TopBar/Sidebar/layouts têm um implementador; nenhuma edição paralela desses arquivos. Pesquisa/revisão de documentação/capturas pode ser paralela e somente leitura (exemplo US1: inspecionar confirmação enquanto implementador verifica CSS; US2: matriz/review de consumidores; US3: inspeção de teclado/capturas).
## Rastreabilidade
FR-001:T005/T006/T007; FR-002:T006/T008; FR-003:T009/T010/T011; FR-004:T009/T010; FR-005:T006/T008/T011/T013/T014; FR-006:T007/T010/T016; FR-007:T009/T011/T012/T015; FR-008:T013/T014/T015; FR-009:T007/T010/T014; FR-010:T016/T018/T019/T020.
SC-001:T016/T020; SC-002:T005/T016; SC-003:T006/T008/T013/T016; SC-004:T012/T017/T020.
