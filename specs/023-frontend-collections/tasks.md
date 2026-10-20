# Tasks: Coletas: apresentação e recuperação segura

**Input**: spec.md, plan.md, research.md, data-model.md e contracts/ui-contracts.md.
**Estado**: EM_ANDAMENTO. Checkboxes abaixo distinguem preparar/implementar de validar/publicar.

- [x] T001 Conferir base/fontes/skills e projetar spec/plan/contracts desta Spec.
- [x] T002 Implementar testes de estado R1 e registrar RED/GREEN auxiliar em implementation-evidence.md.
- [x] T003 Implementar snapshot/travas/erros em src/types/collection.type.ts e src/components/collections/collection-form-state.ts, collection-submission.ts, collection-form.tsx e collection-review.tsx.
- [x] T004 Preparar composição local em collection-detail.tsx e collections.module.css, sem alegar aceite visual.
- [x] T005 Preparar tests/e2e/frontend-collections.spec.ts e support/frontend-mission-evidence.ts (executados no checkpoint; regressão R3 pendente).
- [x] T006 Publicar config exata da branch em vercel.json/.github/workflows/rc-review.yml, mantendo deploy desabilitado.
- [ ] T007 Executar R1 com POST real, resposta perdida, mesmo ID/corpo/chave e uma única persistência via runner oficial.
- [ ] T008 Executar/inspecionar capturas antes/depois, foco, reflow, safe-area, histórico e estados de erro.
- [ ] T009 Rodar os 15 gates oficiais no HEAD final e preservar logs/fingerprint.
- [ ] T010 Realizar revisão independente, corrigir achados materiais e publicar PR com @codex review verificado.
- [ ] T011 Entregar fase6 tecnicamente verificada e liberar base da fase7 sem merge.

## Continuidade R3

- [x] T012 Conferir refs, reviews e artefatos originais; registrar o preflight em specs/023-frontend-collections/plan.md.
- [x] T013 [P] [US3] Corrigir o falso positivo de contorno em tests/e2e/support/frontend-mission-evidence.ts com contraprovas em tests/e2e/frontend-mission-evidence.spec.ts.
- [x] T019 [US3] Corrigir a margem local de rolagem em src/components/collections/collections.module.css após RED/GREEN no SSR dos componentes reais, preservando shell e navegação.
- [x] T014 [P] Investigar e observar a operação real de login em tests/e2e/account-verification-recovery.spec.ts sem mudar autenticação ou reduzir assertions.
- [ ] T015 [US3] Executar e inspecionar os seis cenários de geometria em tests/e2e/frontend-collections.spec.ts, incluindo 200% e paisagem.
- [ ] T016 [US1] Confirmar A → B → A com mesma chave/corpo/ID em tests/e2e/frontend-collections.spec.ts no runner oficial.
- [ ] T017 Validar os 15 gates e revisão Codex no HEAD final; registrar URLs/contagens/fingerprint em specs/023-frontend-collections/implementation-evidence.md e na PR #18.
- [ ] T018 Atualizar evidências, revisão e tarefas desta Spec; manter PR Draft para aceite humano.

## Dependências vigentes

Um único escritor por arquivo/branch. A análise da fase7 pode avançar independentemente, mas sua integração depende da fase6 verificada. Falha material bloqueia apenas o recorte dependente. Não esperar merge humano para trabalhar no que for independente; não publicar candidata como pronta sem gates.
