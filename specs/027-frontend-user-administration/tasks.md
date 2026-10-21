# Tasks: Administração global — apresentação

**Estado**: REPARO_PREPARADO sobre 6a5, cujo CI teve 9 PASS, E2E FAIL e 5 NOT_RUN; a inspeção real confirmou defeitos a 200%. Labels, reflow e provas adicionais estão preparados. Nova validação local NOT_RUN por indisponibilidade do executor; CI, review e inspeção do novo HEAD permanecem pendentes. Itens marcados abaixo registram implementação, não aprovação do runtime futuro.

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

- [x] T012 Executar e registrar os testes focais/typecheck/lint e revisão de diff das árvores anteriores em `specs/027-frontend-user-administration/implementation-evidence.md`; esses resultados históricos não cobrem o novo reparo.
- [ ] T013 Executar E2E real e inspecionar screenshots em `.accounts-validation/frontend-user-administration/`; registrar recibos de execução e inspeção na PR do mesmo SHA, sem commit apenas de recibo.
- [ ] T014 Conferir 15 gates oficiais e review Codex no SHA final publicado; registrar recibo pela coordenação, sem transportar PASS de ancestral.
- [x] T015 [US2] Corrigir retorno de foco quando o botão original desaparece após refresh409 e preparar a contraprova real em `tests/e2e/frontend-user-administration.spec.ts`.
- [x] T016 [US1] Manter alerta sanitizado fora da seleção para401/403/404 de detalhe/auditoria, retirar dados indisponíveis e preparar três contraprovas reais de acesso/conta.
- [x] T017 [US1] Separar label e select dos dois filtros, com `htmlFor`/`id` via `useId`, preservando os locators exatos.
- [x] T018 [US3] Preparar assertions de nome acessível, palavras inteiras e limites horizontais, fonte raiz de 32 px nos casos de 200%, alvo de 44 px e captura adicional do título do overview inteiro em viewport.
- [x] T019 [US3] Reparar o padding móvel aninhado do shell, detalhe e cartões e a quebra arbitrária de botões, a partir dos defeitos confirmados em 320×900/200%.
- [x] T020 [US3] Corrigir a nota de metadata sobre a limitação observada da máscara no diálogo, preservando a chamada de máscara e os guards das fixtures sintéticas.
- [ ] T021 Executar CI/review no novo HEAD e inspecionar as 19 capturas previstas. Novos lint/typecheck/unitários/E2E/diff-check locais são NOT_RUN enquanto o executor está indisponível; não transportar os PASS históricos.

## Dependências e paralelismo

T001→T002→T003→T004; US1 antecede US2 porque fixa alvo e leitura; US3 pode avançar no shell exclusivo (T009) sem editar o arquivo de US1/US2 simultaneamente. T012 registra a validação histórica. T021 depende de T017–T020 e do runtime/CI da coordenação, assim como o fechamento de T013/T014. O agente entrega substituições estritas sobre 6a5 e a coordenação é responsável pela publicação; não há edição concorrente da worktree. MVP apenas visual não representa fechamento de RC.
