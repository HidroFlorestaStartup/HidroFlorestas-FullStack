# Continuação — fase6 integrada, fase7 pronta e fases8/9

DECISAO_CONFIRMADA: pedido de Pedro em21/10/2026 autoriza revisão/integração desta rodada, reservando o último merge funcional ao seu clique; autoriza handoff8/9 e investigação dos históricos após fase10/consolidação visual.

## Estado

- CONCLUIDO: diffs, contratos afetados, threads/respostas, capturas selecionadas e logs oficiais dos heads18/19 conferidos.
- CONCLUIDO: #17 integrado em afde5b0b7cc0c101c399030e3bcee66227d191b1, sem autoaprovação.
- CONCLUIDO: review técnico assistido5595140337 e merge18 b7401f1051435fd912592a65723a2e328c0bb313.
- CONCLUIDO: #19 retarget para development, Ready, review técnico assistido5595147901, head9e11eca preservado, diff177 caminhos, clean.
- PENDENTE_MANTENEDOR: clique de merge19. Não executá-lo nesta preparação.
- EM_PREPARACAO_PUBLICACAO: handoff documental. Publicação será confirmada no PR, evitando commits autorreferentes.
- PROGRAMADO: investigações somente após fase10/consolidação visual.

## Evidência

CI18: run39477040095/tentativa1/job118815571617;15gates PASS, E2E182, Integration229, HTTPS2, IHFR6.
CI19: run39478339091/tentativa1/job118820056540;15gates PASS, E2E190, Integration231, HTTPS2, IHFR6.
25testes focais passaram em Linux/Node24.19.0 com transformação temporária TypeScript→.mjs, ajustando somente extensões de import; não substituem runner oficial. Sem nova suíte local completa ou aceite humano.

Merge18 difere do head18 validado só em nove documentos herdados de17. O19 contém o head18; não precisa conter o novo commit de merge em development. Deltas materiais futuros exigem revisão/validação próprias.

## Publicação e recuperação

Branch docs/handoff-frontend-fases-8-9 parte da development b7401f1, só documentação. Não incluir produto19 para simular integração. PR documental aberto para development, sem autoaprovação/auto-merge; fase8 condicionada ao merge manual19. Executar integralmente8/9 conforme [prompt](prompt-de-execucao-fases-8-9.md), com recortes separados IHFR/mapa/admin.

Validar diff/escopo/JSON/referências e preservação integral dos seis textos anteriores. Não alterar docs/raw, domínio, ciência, schema, dependências, main ou provedores. Checks documentais do head publicado são distintos dos15gates das features.

Se19 mudar ou perder checks/mergeabilidade, suspender apenas a afirmação “pronto para clicar” até reconferência. Se outro colaborador já integrar19, registrar o merge real sem repetir operação. Recuperação documental por commit normal, sem reset/force.

Estado da máquina de Pedro não foi verificado. Após o clique, Codex local deve inventariar trabalho, fazer fetch/FF seguro de development; main acompanha somente origin/main.
