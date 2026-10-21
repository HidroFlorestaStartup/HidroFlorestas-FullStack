# Triagem dos históricos programados

Data: 2026-10-21. Fonte: `investigacoes-pos-consolidacao-visual.md` no [handoff de Pedro, HEAD e057105](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/e057105f4532b28662249735608e869e3814ef8c/docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md).

`FATO_DOCUMENTADO`: Pedro programou a investigação ampla após conclusão **e aceite** da fase 10/consolidação. Este documento executa a triagem C2 e define o recorte posterior; não presume que o aceite humano já ocorreu. Uma falha material atual da candidata deve ser investigada agora, mesmo antes desse gatilho.

## Critério de prioridade

`RECOMENDACAO`: P1 para perda/exposição de dados, autorização indevida ou indisponibilidade atual de jornada essencial; P2 para falha de confiabilidade/reflow comprovada ou hipótese histórica relevante à RC; P3 para observação sem impacto demonstrado. A tabela abaixo prioriza a investigação e não diagnostica uma causa.

| Item | Evidência histórica | Estado e prioridade de triagem | Reprodução/evidência necessária | Efeito sobre a RC |
|---|---|---|---|---|
| INV-001 | Seis FAILs IHFR no [run 39300023357](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357), tentativa 1; tentativa 2 do mesmo head passou. [PR #15](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/15), [recibo #16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#issuecomment-6280516630) | Causa inconclusiva; P2; aguardando gatilho da investigação ampla | Recuperar head/attempt/log; isolar startup, sessão/contexto, navegação e servidor no runner sintético, preservando probes | Qualquer FAIL atual do gate Ihfr impede fechamento técnico; novo PASS não encerra a causa antiga |
| INV-002 | Corrida histórica de capa com duas chamadas; Spec022 corrigiu outro schedule de quatro operações/três ondas. [PR #16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16) | Causa histórica não atribuída; P2, elevar se houver violação atual de quota/integridade | Reproduzir exatamente duas chamadas concorrentes; conferir autorização, revisão, idempotência, quota, três tentativas e consulta final | Não alterar limites/retries nem transportar causalidade da Spec022; defeito atual precisa de correção focal |
| INV-003 | Navegação da fase3 [#12](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12) e reset cartográfico na fase4 [#14](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14) | Causas não comprovadas; P2 | Separar navegação HTTP, sessão, resposta da API e falha de tiles; manter lista alternativa e recuperar logs originais | Testes atuais de mapa/lista/nav obrigatórios; defeitos móveis corrigidos não explicam automaticamente o reset |
| INV-004 | Incidente de conta; sincronização passou a aguardar resposta real do login e manteve URL 5s. [Recibo #18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6298927257) | Causa original inconclusiva; P2 | Correlacionar resposta de login, cookie/sessão e navegação sem reduzir assertion; controlar latência no harness pertinente | Falha atual de conta bloqueia o gate; mudança de sincronização não fecha diagnóstico histórico |
| INV-005 | Página 404 na candidata `85e397bd`, [run 39465856665](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39465856665); final `9e11eca` teve 15 navegações IHFR 200 e zero página 404 segundo [recibo #19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6299163273) | Causa inconclusiva; P2 | Distinguir navegação de página de lookup API 404 esperado; manter probe pós-falha somente leitura, jars isolados e guards sintéticos | Não ignorar página 404 atual; não chamar lookup esperado de falha de navegação |
| OBS-001 | Divergência de hidratação/caret em captura de coleta; associação ao Playwright sem contraprova temporal A/B | Hipótese de instrumentação; P3 | Comparar o mesmo cenário antes/durante/depois da captura, sem suprimir warnings, mudar cursor global ou fabricar página | Warning isolado não prova defeito geral; impacto funcional reproduzido deve ser tratado |
| OBS-002 | Máscaras/indicador Next e enquadramento parcial em paisagem nos recibos #18/#19 | Observação geométrica; P2 se ação obstruída, P3 se apenas limite da captura | Viewport real, foco, rolagem e hit tests em 320/375/768/1440, texto 200% e paisagem; abrir PNG e confrontar geometria | Obstrução atual de ação bloqueia aceite da frente; máscara ou frame parcial não basta para afirmar defeito/ausência |

## Estado de execução

- Triagem e critérios: preparados nesta rodada.
- Investigação ampla: `AGENDADO_APOS_FASE_10_E_CONSOLIDACAO_VISUAL`, conforme fonte; aceite/gatilho ainda não comprovado neste commit.
- Correções atuais da administração pertencem à Spec027 e não são atribuídas retrospectivamente a INV-001–005.
- Execuções oficiais da candidata, se concluídas após este commit, devem constar nos recibos das PRs com SHA, run, attempt, job e journal. Não reescrever os recibos antigos.
- Responsável pela priorização/aceite: mantenedor; executor da investigação posterior depende da designação/continuidade autorizada. Não inventar responsável humano.

## Regra de encerramento por item

Registrar causa demonstrada e regressão proporcional, ou `INCONCLUSIVO`/`NAO_REPRODUZIDO` com limites explícitos e decisão do mantenedor. Preservar falhas, contratos, assertions, guards e timeouts pertinentes. Não adicionar retries para transformar intermitência em verde. Não operar banco, e-mail ou provedor real para reproduzir esses históricos.
