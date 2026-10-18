# Tasks — 017 Frontend login

Reconciliadas com a skill instalada em 2026-10-18. As oito tarefas do pacote parcial registravam preparação estática; os checks abaixo medem execução no checkout oficial, sem promover aquela preparação a runtime PASS.

## Fase 1 — Setup

- [x] T001 Conferir baseline, ZIP/hashes e preservação das worktrees em specs/017-frontend-login/plan.md.
- [x] T002 Reconciliar Spec Kit, contrato, pesquisa e checklist em specs/017-frontend-login/ e consultar os guias Next locais antes do código.
- [ ] T003 Revisar e commitar localmente specs/017-frontend-login/ antes da implementação, sem push.

## Fase 2 — Fundação: teste antes do código

- [ ] T004 Aplicar tests/e2e/frontend-login.spec.ts e registrar RED real de hidratação contra a página anterior em specs/017-frontend-login/implementation-evidence.md.

## Fase 3 — US1 (P1): autenticação preservada

Aceite independente: login real válido/inválido/inelegível, destino verify-email, rede, payload sem transformação, duplicidade e teclado.

- [ ] T005 [US1] Aplicar src/app/login/page.tsx preservando signIn/contexto/API e erro/loading.
- [ ] T006 [US1] Validar payload/duplicidade/teclado/rede em tests/e2e/frontend-login.spec.ts e auth real nas suítes tests/e2e/authenticated-access.spec.ts e tests/e2e/account-verification-recovery.spec.ts.

## Fase 4 — US2 (P1): responsividade e hidratação

Aceite independente: 375/768/1440px, reflow320/texto200%, foco e inércia antes da hidratação; capturas reais antes/depois.

- [ ] T007 [US2] Aplicar src/app/login/login.module.css e readiness em src/app/login/page.tsx, preservando logo/Poppins e usando preload conforme guia Next.
- [ ] T008 [US2] Executar larguras/reflow/hidratação/foco em tests/e2e/frontend-login.spec.ts e preservar capturas em specs/017-frontend-login/evidence/.

## Fase 5 — US3 (P2): publicação controlada

Aceite independente: job executado no HEAD e Preview bloqueado, com regras anteriores preservadas.

- [ ] T009 [US3] Acrescentar somente feat/frontend-login=false em vercel.json e a branch no trigger/if em .github/workflows/rc-review.yml.
- [ ] T010 [US3] Publicar somente feat/frontend-login; registrar PR para development e CI do SHA exato em specs/017-frontend-login/implementation-evidence.md.

## Fase 6 — Qualidade e revisão

- [ ] T011 Executar runners oficiais de unit/build/typecheck/lint/E2E/HTTPS e regressões pertinentes em specs/017-frontend-login/implementation-evidence.md.
- [ ] T012 Aplicar histórico do pacote em specs/017-frontend-login/implementation-evidence.md e acrescentar resultados oficiais sem apagar limitações anteriores.
- [ ] T013 Executar análise Spec Kit e revisão adversarial do diff; registrar cobertura/achados/limitações em specs/017-frontend-login/review.md.
- [ ] T014 Solicitar revisão humana no PR e registrar aceite pendente em specs/017-frontend-login/implementation-evidence.md; sem merge/deploy ou próxima tela.

Dependências: T001→T002→T003→T004→T005/T007/T009→T006/T008/T011→T012/T013→T010→T014. T009 deve estar no commit publicado antes do primeiro push. Análise preliminar antes de T003; T013 é repetida após a implementação.

Oportunidades de paralelismo: CSS/revisão de configuração têm paths distintos; executar sequencialmente nesta worktree para preservar a trilha RED/GREEN. Estratégia: US1+US2 como incremento de login e US3 como condição de publicação. Aceite humano de composição/contraste permanece pendente.
