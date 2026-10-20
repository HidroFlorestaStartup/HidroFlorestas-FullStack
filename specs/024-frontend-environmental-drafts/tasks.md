# Tasks: Dados ambientais e drafts: apresentação sem perda

**Input**: spec.md, plan.md, research.md, data-model.md e contracts/ui-contracts.md.
**Estado**: EM_ANDAMENTO. Checkboxes abaixo distinguem preparar/implementar de validar/publicar.

- [x] T001 Projetar spec/plan/contracts desta Spec e rastrear Specs005/015.
- [x] T002 Implementar precisão/foco em src/components/environmental-data/environmental-presentation.ts e unitários.
- [x] T003 Reproduzir predicados R5 e aplicar retenção de incerteza no formulário/hook com environmental-outcome.ts.
- [x] T004 Preparar apresentação dos cinco componentes visuais e environmental.module.css, preservando controladores.
- [x] T005 Adicionar 10 unitários sobre parsers/conversores vigentes e 25 de precisão/foco/predicado.
- [x] T006 Preparar E2E em tests/e2e/frontend-environmental-drafts.spec.ts (executados no checkpoint; regressão R3 pendente).
- [x] T007 Publicar config exata da segunda branch mantendo deploy/Preview desabilitado.
- [ ] T008 Validar fase6 e reconciliar fase7 sobre seu HEAD tecnicamente verificado.
- [ ] T009 Executar E2E/Pg de hidratação/primeiro PUT, R2/R3/R5, duas abas/OCC, consumo e rollback.
- [ ] T010 Executar/inspecionar a matriz visual, navegação/alterações não salvas e estados de erro.
- [ ] T011 Conferir 15 gates oficiais no HEAD final, revisão independente e resposta real do @codex review.
- [ ] T012 Publicar segundo PR com dependência/limitações e entregar para revisão humana, sem merge.

## Continuidade R3

- [x] T013 Conferir refs, merge-base, artefatos e revisão Codex; registrar em specs/024-frontend-environmental-drafts/plan.md.
- [x] T014 [P] [US3] Reproduzir e sincronizar foco/scroll na jornada de tests/e2e/frontend-environmental-drafts.spec.ts sem remover o hit test.
- [x] T020 [US3] Corrigir margem local de rolagem em src/components/environmental-data/environmental.module.css após reprodução SSR com fontes reais.
- [x] T021 [US1] Acrescentar contraprovas de handlers GET/PUT/DELETE/POST A → B → A; GREEN4/4 e dois mutantes detectados em cópias auxiliares.
- [ ] T015 [US3] Verificar campo final, quatro grupos, revisão e leitura na matriz de viewports em tests/e2e/frontend-environmental-drafts.spec.ts.
- [x] T016 Incorporar a primeira correção da fase6 sem rebase e registrar os parents exatos em implementation-evidence.md (HEAD5ca5205); a continuação H4 incorpora2a047d1 com parents/única sobreposição de workflow documentados.
- [x] T017 [US1] [US2] Executar os cenários A → B → A, OCC, consumo/rollback e precisão nos testes existentes de drafts/ambiental (HEAD5ca5205; regressão integral final exigida em T018).
- [ ] T018 Conferir 15 gates e Codex no HEAD final e registrar recibos em specs/024-frontend-environmental-drafts/implementation-evidence.md e PR #19.
- [ ] T019 Atualizar evidências/revisão/tarefas e entregar os dois Drafts para aceite humano, sem merge ou deploy.

- [x] T022 [US3] Incorporar sincronização finita/ResizeObserver e preservar capturas duráveis de coleta e ambiental; contraprovas compartilhadas21/21 e2PASS+1PASS.

## Dependências vigentes

Um único escritor por arquivo/branch. A análise da fase7 pode avançar independentemente, mas sua integração depende da fase6 verificada. Falha material bloqueia apenas o recorte dependente. Não esperar merge humano para trabalhar no que for independente; não publicar candidata como pronta sem gates.
