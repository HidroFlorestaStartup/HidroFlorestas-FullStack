# Tasks: Coletas: apresentação e recuperação segura

**Input**: spec.md, plan.md, research.md, data-model.md e contracts/ui-contracts.md.
**Estado**: candidata funcional5f5d871 validada; consolidação documental sujeita ao gate externo por SHA descrito abaixo. Aceite humano pendente.

- [x] T001 Conferir base/fontes/skills e projetar spec/plan/contracts desta Spec.
- [x] T002 Implementar testes de estado R1 e registrar RED/GREEN auxiliar em implementation-evidence.md.
- [x] T003 Implementar snapshot/travas/erros em src/types/collection.type.ts e src/components/collections/collection-form-state.ts, collection-submission.ts, collection-form.tsx e collection-review.tsx.
- [x] T004 Preparar composição local em collection-detail.tsx e collections.module.css, sem alegar aceite visual.
- [x] T005 Preparar e executar tests/e2e/frontend-collections.spec.ts e support/frontend-mission-evidence.ts; regressão integral182/182 PASS em5f5d871.
- [x] T006 Publicar config exata da branch em vercel.json/.github/workflows/rc-review.yml, mantendo deploy desabilitado.
- [x] T007 Executar R1 com POST real, resposta perdida, mesmo ID/corpo/chave e uma única persistência no runner oficial; primeira prova6fd8066 e regressão5f5d871.
- [x] T008 Executar e inspecionar a matriz emulada, foco, reflow, safe-area emulada herdada, navegação/histórico e amostras de estados de erro em5f5d871;26 pares de aplicativo versionados, limites físicos/assistivos separados.
- [x] T009 Executar os15 gates da candidata funcional `5f5d8719e25856b59e84c053cb13d2516dbeac49` e preservar logs/artifact/fingerprint: run39469650449, tentativa1,15/15 PASS e182/182 E2E.
- [x] T010 Concluir revisão independente, corrigir P1/P2 e conferir Codex efetivo no SHA5f5d871 (receipt6297489682 sem findings); threads técnicos respondidos/resolvidos.
- [x] T011 Disponibilizar a fase6 funcionalmente verificada em5f5d871 para a incorporação não destrutiva pela fase7, sem merge; gate documental corrente permanece abaixo.

## Continuidade R3

- [x] T012 Conferir refs, reviews e artefatos originais; registrar o preflight em specs/023-frontend-collections/plan.md.
- [x] T013 [P] [US3] Corrigir o falso positivo de contorno em tests/e2e/support/frontend-mission-evidence.ts com contraprovas em tests/e2e/frontend-mission-evidence.spec.ts.
- [x] T019 [US3] Corrigir a margem local de rolagem em src/components/collections/collections.module.css após RED/GREEN no SSR dos componentes reais, preservando shell e navegação.
- [x] T014 [P] Investigar e observar a operação real de login em tests/e2e/account-verification-recovery.spec.ts sem mudar autenticação ou reduzir assertions.
- [x] T015 [US3] Executar e inspecionar os seis cenários de geometria de coleta em5f5d871, incluindo200% e paisagem;18 quadros finais com alvo inteiro.
- [x] T016 [US1] Confirmar A → B → A com mesma chave/corpo/ID no runner oficial; primeira prova6fd8066 e regressão integral5f5d871.
- [x] T017 Conferir a revisão Codex concluída e a proveniência completa da validação funcional de `5f5d8719e25856b59e84c053cb13d2516dbeac49`, sem achados no receipt6297489682, e consolidar seus recibos versionados.
- [x] T018 Consolidar evidências, revisão e tarefas da candidata funcional5f5d871; manter a PR Draft para aceite humano.

- [x] T020 [US3] Preservar PNG/JSON mascarados fora do outputDir limpo pelos gates seguintes e separar os quadros antes/depois do detalhe.
- [x] T021 [US3] Concluir a sincronização de transições finitas/ResizeObserver com RED/GREEN e contraprovas de obstrução preservadas.

- [x] T022 [US3] Tratar o P1 Codex de2a047d1 com tarefa após os callbacks, contraprova causal e teste permanente da função real; preservar o resultado3/3 GREEN do helper publicado com dois comandos.
- [x] T023 [US3] Tratar o P2 Codex de2a047d1 com captura observacional após readiness e teste de término natural;23/23 auxiliares e182/182 E2E oficiais em5f5d871; Codex concluído nesse SHA.

## Gate externo obrigatório do HEAD publicado

Cada checkbox aplica-se ao SHA nomeado. A entrega técnica do HEAD publicado, inclusive o commit documental de consolidação, exige15/15 gates PASS e revisão Codex concluída sem achado material no SHA exato. O recibo externo na [PR #18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18) registra SHA/parent, run/tentativa/job, contagens, artifact/digest/fingerprint e resposta efetiva do Codex. A publicação do recibo que confirma esses critérios encerra o gate sem alterar o commit validado. Qualquer novo commit exige nova conferência. Até o recibo confirmar os critérios acima, o HEAD de consolidação está AGUARDANDO_VALIDAÇÃO_EXATA.

- [ ] T024 Obter aceite humano de produto/acessibilidade, incluindo teclado físico, dispositivo real e tecnologia assistiva quando aplicável; fora da aprovação automatizada desta missão.

## Dependências vigentes

Um único escritor por arquivo/branch. A análise da fase7 pode avançar independentemente, mas sua integração depende da fase6 verificada. Falha material bloqueia apenas o recorte dependente. Não esperar merge humano para trabalhar no que for independente; não publicar candidata como pronta sem gates.
