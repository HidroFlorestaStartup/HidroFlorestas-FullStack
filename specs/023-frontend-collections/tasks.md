# Tasks: Coletas: apresentação e recuperação segura

**Input**: spec.md, plan.md, research.md, data-model.md e contracts/ui-contracts.md.
**Estado**: EM_ANDAMENTO. Checkboxes abaixo distinguem preparar/implementar de validar/publicar.

- [x] T001 Conferir base/fontes/skills e projetar spec/plan/contracts desta Spec.
- [x] T002 Implementar testes de estado R1 e registrar RED/GREEN auxiliar em implementation-evidence.md.
- [x] T003 Implementar snapshot/travas/erros em src/types/collection.type.ts e src/components/collections/collection-form-state.ts, collection-submission.ts, collection-form.tsx e collection-review.tsx.
- [x] T004 Preparar composição local em collection-detail.tsx e collections.module.css, sem alegar aceite visual.
- [x] T005 Preparar tests/e2e/frontend-collections.spec.ts e support/frontend-mission-evidence.ts (NOT_RUN).
- [x] T006 Preparar config exata da branch em vercel.json/.github/workflows/rc-review.yml, não publicada.
- [ ] T007 Executar R1 com POST real, resposta perdida, mesmo ID/corpo/chave e uma única persistência via runner oficial.
- [ ] T008 Executar/inspecionar capturas antes/depois, foco, reflow, safe-area, histórico e estados de erro.
- [ ] T009 Rodar os 15 gates oficiais no HEAD final e preservar logs/fingerprint.
- [ ] T010 Realizar revisão independente, corrigir achados materiais e publicar PR com @codex review verificado.
- [ ] T011 Entregar fase6 tecnicamente verificada e liberar base da fase7 sem merge.

## Dependencies & Execution Order

Um único escritor por arquivo/branch. A análise da fase7 pode avançar independentemente, mas sua integração depende da fase6 verificada. Falha material bloqueia apenas o recorte dependente. Não esperar merge humano para trabalhar no que for independente; não publicar candidata como pronta sem gates.
