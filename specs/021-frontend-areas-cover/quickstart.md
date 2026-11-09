# Quickstart: validação da fase5
1. Confirmar worktree/base e ausência de suíte concorrente; ler runbook docs/operations/rc-review-ci-runbook.md. Instalação travada/Prisma/Chromium preparados na fase4, sem nova dependência.
2. PLANcommit antes de testes/produto; SpecKit spec/plan/tasks/contracts/checklist/análise.
3. Capturas before: FRONTEND_AREAS_CAPTURE_PREFIX=before; executar ./scripts/rc-review-validation.ps1 -Gates RegressionSetup,E2E no Windows preparado. Testes novos usam fixtures oficiais e cleanup escopado; transporte de imagemfake explicitamente isolado, semprovider.
4. Registrar caracterização ou RED real e snapshot. Corrigir apenas desvios demonstrados; adaptar visual delimitado. Congelar árvore/testes.
5. Capturas after com prefixafter; executar ./scripts/rc-review-validation.ps1 para os15gates. Não usar InitializeCiCluster local nem E2E fora do ingresso completo.
6. Revisar PNG/JSON, foco/reflow, diffs/contratos e consumidores por agente separado; analisar consistênciaSpecKit. Estados de errotransporte não provam operação real deprovider.
7. Antespush: nomeexato em push.branches/if, Previewfalse e uploads focais. PRbase temporária branchfase4 se aberta; solicitarPedroVitor237 (login confirmado nosPRs anteriores). Conferir15gates do SHA final e publicar recibo noPR.
8. Aceite humano, integração/retarget e eventualoperação remota pertencem ao mantenedor; nenhummerge/deploy por esta execução.
