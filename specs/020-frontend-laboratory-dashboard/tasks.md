# Tasks: Laboratório, dashboard, histórico e membros
**Input**: spec/plan/research/data-model/contracts. Testes explicitamente solicitados. PLAN → EXECUTE → REVIEW.

## Phase 1: Setup
- [x] T001 Conferir Git/worktrees/refs/processos e fontes;registrar baseline em specs/020-frontend-laboratory-dashboard/plan.md.
- [x] T002 Gerar spec/plano/contratos/matriz pelos templates Spec Kit em specs/020-frontend-laboratory-dashboard/.
- [x] T003 Analisar consistência e commitar planejamento antes de testes em specs/020-frontend-laboratory-dashboard/review.md.

## Phase 2: Foundational
- [x] T004 Preparar npm ci,Prisma e Chromium;ler runners/guias e registrar estado em specs/020-frontend-laboratory-dashboard/implementation-evidence.md.

## Phase 3: US1 — diagnóstico móvel primeiro
**Independent Test**: Next real375/320,texto100/200%,vazio/lista,3/4 links,início/meio/fim,controles/foco/toque/resize.
- [x] T005 [US1] Escrever regressão de geometria/operação e captura viewport em tests/e2e/frontend-mobile-navigation.spec.ts.
- [x] T006 [US1] Executar baseline oficial RegressionSetup/E2E;preservar resultados/capturas em specs/020-frontend-laboratory-dashboard/evidence/.
- [x] T007 [US1] Corrigir shell somente se defeito demonstrado em src/components/shell/shell.module.css e application-shell.tsx;caso captura apenas,documentar sem mudança runtime.
- [x] T008 [US1] Validar controles/skip/menu/histórico/consumidores e registrar conclusão móvel em commit delimitado e specs/020-frontend-laboratory-dashboard/implementation-evidence.md.

## Phase 4: US2 — resumo/histórico
**Independent Test**: APIs reais,totais/destinos,cursor/refresh/retorno,vazio/erro/contexto/tardia.
- [x] T009 [P] [US2] Escrever caracterização e estados responsivos em tests/e2e/frontend-dashboard.spec.ts antes do código.
- [x] T010 [US2] Adaptar cards/estados/linhas em src/components/dashboard/dashboard-summary.tsx,dashboard-history.tsx,dashboard.module.css.
- [x] T011 [US2] Conferir redirects/layout/contextos e isolamento em src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx.
- [x] T012 [US2] Validar paginação/contexto/reflow e registrar evidências em specs/020-frontend-laboratory-dashboard/evidence/.

## Phase 5: US3 — membros
**Independent Test**: OWNER/ADMIN/MEMBER/globalADMIN/readOnly/perda de vínculo/concorrência.
- [x] T013 [US3] Testar expectedRole,conflito e bloqueio duplicado em tests/e2e/frontend-dashboard.spec.ts.
- [x] T014 [US3] Adaptar lista/estados/papéis e proteger leituras tardias em src/components/laboratories/laboratory-memberships.tsx.
- [x] T015 [US3] Validar matriz contextual/readOnly e evidências em specs/020-frontend-laboratory-dashboard/evidence/.

## Phase 6: REVIEW/publicação
- [x] T016 Ajustar allowlist/if/upload focal de .github/workflows/rc-review.yml e Previewfalse exato em vercel.json antes do push.
- [x] T017 Executar15 gates congelados e registrar journal/resultados em specs/020-frontend-laboratory-dashboard/implementation-evidence.md.
- [x] T018 Revisar diff/testes/capturas e consistência com revisor separado;corrigir achados demonstrados em specs/020-frontend-laboratory-dashboard/review.md.
- [ ] T019 Commit/push/PR para development e conferir CI HEAD exato;recibo final no PR e referência em specs/020-frontend-laboratory-dashboard/implementation-evidence.md.

## Dependencies & Parallel Opportunities
T001→T004→T005→T008 antes do conteúdo.T009/T013 podem ser preparados junto de T005 em arquivos distintos;T006 caracteriza todos os testes novos antes de T010/T014 (RED somente quando defeito real).T016 antes de push.T017→T018→T019;se T018 alterar fonte/testes,voltar aos gates afetados e rodada final estável T017. MVP verificável US1,mas missão inclui US2/US3 e fase5 posterior.Sem deploy.
