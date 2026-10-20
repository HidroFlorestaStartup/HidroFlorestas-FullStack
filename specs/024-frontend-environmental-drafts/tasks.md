# Tasks: Dados ambientais e drafts: apresentação sem perda

**Input**: spec.md, plan.md, research.md, data-model.md e contracts/ui-contracts.md.
**Estado**: EM_ANDAMENTO. Checkboxes abaixo distinguem preparar/implementar de validar/publicar.

- [x] T001 Projetar spec/plan/contracts desta Spec e rastrear Specs005/015.
- [x] T002 Implementar precisão/foco em src/components/environmental-data/environmental-presentation.ts e unitários.
- [x] T003 Reproduzir predicados R5 e aplicar retenção de incerteza no formulário/hook com environmental-outcome.ts.
- [x] T004 Preparar apresentação dos cinco componentes visuais e environmental.module.css, preservando controladores.
- [x] T005 Adicionar 10 unitários sobre parsers/conversores vigentes e 25 de precisão/foco/predicado.
- [x] T006 Preparar cinco E2E em tests/e2e/frontend-environmental-drafts.spec.ts (NOT_RUN).
- [x] T007 Preparar config exata da segunda branch sem publicar ou habilitar Preview.
- [ ] T008 Validar fase6 e reconciliar fase7 sobre seu HEAD tecnicamente verificado.
- [ ] T009 Executar E2E/Pg de hidratação/primeiro PUT, R2/R3/R5, duas abas/OCC, consumo e rollback.
- [ ] T010 Executar/inspecionar a matriz visual, navegação/alterações não salvas e estados de erro.
- [ ] T011 Conferir 15 gates oficiais no HEAD final, revisão independente e resposta real do @codex review.
- [ ] T012 Publicar segundo PR com dependência/limitações e entregar para revisão humana, sem merge.

## Dependencies & Execution Order

Um único escritor por arquivo/branch. A análise da fase7 pode avançar independentemente, mas sua integração depende da fase6 verificada. Falha material bloqueia apenas o recorte dependente. Não esperar merge humano para trabalhar no que for independente; não publicar candidata como pronta sem gates.
