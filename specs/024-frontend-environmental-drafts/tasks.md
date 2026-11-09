# Tasks: Dados ambientais e drafts: apresentação sem perda

**Input**: spec.md, plan.md, research.md, data-model.md e contracts/ui-contracts.md.
**Estado**: candidata funcional ec4b06e validada; consolidação documental sujeita ao gate externo por SHA descrito abaixo. Aceite humano pendente.

- [x] T001 Projetar spec/plan/contracts desta Spec e rastrear Specs005/015.
- [x] T002 Implementar precisão/foco em src/components/environmental-data/environmental-presentation.ts e unitários.
- [x] T003 Reproduzir predicados R5 e aplicar retenção de incerteza no formulário/hook com environmental-outcome.ts.
- [x] T004 Preparar apresentação dos cinco componentes visuais e environmental.module.css, preservando controladores.
- [x] T005 Adicionar 10 unitários sobre parsers/conversores vigentes e 25 de precisão/foco/predicado.
- [x] T006 Preparar e executar E2E em tests/e2e/frontend-environmental-drafts.spec.ts; regressão integral190/190 PASS em ec4b06e, com as duas matrizes preservadas.
- [x] T007 Publicar config exata da segunda branch mantendo deploy/Preview desabilitado.
- [x] T008 Validar a fase6 funcional5f5d871 e incorporá-la sem rebase na fase7 ec4b06e, com parents/blobs conferidos; a reconciliação documental final está registrada em evidence/r3/final-documentary-incorporation.json e exige os gates externos de ambos os HEADs.
- [x] T009 Executar E2E/Pg de hidratação/primeiro PUT, R2/R3/R5, duas abas/OCC, consumo e rollback em ec4b06e;190/190 E2E e231/231 Integration, com casos PostgreSQL nominais no recibo.
- [x] T010 Executar e inspecionar as matrizes, navegação/alterações não salvas e amostras de erro em ec4b06e;53 pares de aplicativo versionados,42 alvos finais completos e limites físicos/assistivos separados.
- [x] T011 Conferir15/15 gates oficiais, revisão independente e Codex efetivo sem findings na candidata funcional `ec4b06e4b27059b1077904e0b67fde498c28b053` (receipt6297927596); o HEAD documental exige sua própria validação externa.
- [x] T012 Disponibilizar a candidata funcional ec4b06e na PR Draft #19, com dependência/limitações e sem merge; a entrega técnica do HEAD documental segue o gate externo obrigatório abaixo.

## Continuidade R3

- [x] T013 Conferir refs, merge-base, artefatos e revisão Codex; registrar em specs/024-frontend-environmental-drafts/plan.md.
- [x] T014 [P] [US3] Reproduzir e sincronizar foco/scroll na jornada de tests/e2e/frontend-environmental-drafts.spec.ts sem remover o hit test.
- [x] T020 [US3] Corrigir margem local de rolagem em src/components/environmental-data/environmental.module.css após reprodução SSR com fontes reais.
- [x] T021 [US1] Acrescentar contraprovas de handlers GET/PUT/DELETE/POST A → B → A; GREEN4/4 e dois mutantes detectados em cópias auxiliares.
- [x] T015 [US3] Verificar formulário, Salvar/rascunho, Declividade e revisão nas seis configurações de ec4b06e. Leitura confirmada validada separadamente por R2, API/reload e suíte desktop/mobile; não há matriz de leitura confirmada nas seis configurações.
- [x] T016 Incorporar a primeira correção da fase6 sem rebase e registrar os parents exatos em implementation-evidence.md (HEAD5ca5205); a continuação H4 incorpora2a047d1 com parents/única sobreposição de workflow documentados.
- [x] T017 [US1] [US2] Executar A → B → A, OCC, consumo/rollback e precisão; primeira prova em5ca5205 e regressão integral em ec4b06e. Os3P1 ambientais passam por seleção integral190/190; os casos Pg/OCC/rollback estão nomeados em Integration231/231.
- [x] T018 Conferir15/15 gates e Codex no SHA funcional ec4b06e e consolidar seus recibos em implementation-evidence.md e PR #19; qualquer HEAD posterior mantém o gate externo próprio abaixo.
- [x] T019 Consolidar evidências/revisão/tarefas da candidata funcional ec4b06e e manter os dois Drafts disponíveis. A conclusão técnica dos HEADs documentais e sua entrega para revisão dependem dos recibos externos de ambas as PRs; aceite humano não é antecipado.

- [x] T022 [US3] Incorporar sincronização finita/ResizeObserver e preservar capturas duráveis de coleta e ambiental; contraprovas compartilhadas21/21 e2PASS+1PASS.

- [x] T023 [US3] Incorporar5f5d87 com correções dos P1/P2 da revisão compartilhada e23/23 contraprovas; conferir14 blobs contra merge-tree sem conflitos. Validação oficial/revisão do novo HEAD continuam em T018.

- [x] T024 Preservar os12 gates PASS, IHFR6FAIL/404 e2NOT_RUN de85e397 e a inspeção dos54 pares PNG/JSON, sem declarar aprovação global.
- [x] T025 Acrescentar diagnóstico pós-falha404 com GETs existentes e contextosAPI isolados;3/3 unitários de privacidade/isolamento/redirect/guards, typecheck e lint aprovados. Causa histórica permanece inconclusiva.

## Gate externo obrigatório do HEAD publicado

Cada checkbox aplica-se ao SHA e ao alcance nomeados. A entrega técnica do HEAD publicado, inclusive o commit documental, exige15/15 gates PASS e Codex concluído sem achado material no SHA exato. O recibo externo na [PR #19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19) registra SHA/parents, run/tentativa/job, contagens, artifact/digest/fingerprint, inspeção visual e resposta efetiva do Codex. A dependência documental final da [PR #18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18) também precisa de seu próprio recibo aprovado. Somente a publicação dos recibos que confirmam esses critérios encerra a entrega técnica dos dois Drafts, sem alterar os commits validados. Qualquer novo commit exige nova conferência. Até essa confirmação, o HEAD de consolidação está AGUARDANDO_VALIDAÇÃO_EXATA.

- [ ] T026 Obter aceite humano de produto/acessibilidade, incluindo dispositivo real, teclado físico e tecnologia assistiva quando aplicável. Homologação científica permanece separada e pendente.

## Dependências vigentes

Um único escritor por arquivo/branch. A análise da fase7 pode avançar independentemente, mas sua integração depende da fase6 verificada. Falha material bloqueia apenas o recorte dependente. Não esperar merge humano para trabalhar no que for independente; não publicar candidata como pronta sem gates.
