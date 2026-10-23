# Investigações após a fase10 e a consolidação visual

DECISAO_CONFIRMADA — origem: pedido de Pedro nesta conversa em21/10/2026. Documentar as falhas para investigar e, se necessário, resolver depois da fase10/consolidação visual. Estado: **AGENDADO_APOS_FASE_10_E_CONSOLIDACAO_VISUAL**. Não significa falha resolvida nem autoriza ignorar defeitos atuais.

Priorização pelo mantenedor; executor ainda não designado. Gatilho: conclusão e aceite da fase10/consolidação visual, com plano específico e recortes de correção para defeitos comprovados. Não incluir esta investigação ampla nas fases8/9.

## Itens

| ID local | Observação e fontes | Estado causal / ação posterior |
|---|---|---|
| INV-001 | IHFR intermitente: seis FAILs no run39300023357/tentativa1 do #15; tentativa2 do mesmo head passou. [PR15](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/15), [recibo16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#issuecomment-6280516630). | Causa inconclusiva. Investigar inicialização, navegação, sessão/contexto e servidor, separando produto/harness/ambiente. Novo verde não prova correção. |
| INV-002 | Quota/concorrência histórica com duas chamadas. Spec022 corrigiu outro schedule, quatro operações/três ondas, com conflitos PostgreSQL reais. [PR16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16). | Não atribuir retrospectivamente a mesma causa. Reproduzir a hipótese histórica; preservar quotas, três tentativas de escrita, consulta final e idempotência. |
| INV-003 | Navegação histórica da fase3/#12 e reset de conexão de mapa registrado na fase4/#14. [PR12](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12), [PR14](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14). | Causas não comprovadas. Recuperar cenários/logs originais; distinguir dos defeitos móveis de sobreposição e restauração efetivamente tratados. |
| INV-004 | Incidente de conta na fase6; teste passou a aguardar resposta real do login, mantendo asserção de URL5s. [Recibo18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6298927257). | Sincronização de teste não demonstra a causa original. Reproduzir latência/resposta/navegação sem reduzir exigência funcional. |
| INV-005 | Navegações404 da candidata85e397bd, run39465856665 da fase7. Head final9e11eca teve15 navegações IHFR200 e zero404 de página conforme [recibo19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6299163273). | Causa inconclusiva. Distinguir404 de página de404 esperado de lookup de API; preservar probe pós-falha somente leitura, cookie jars isolados e guards de loopback/schema sintético. |

## Observações ainda sem defeito comprovado

- OBS-001: aviso de hidratação/caret em captura de coleta. Atributo divergente coincide com ocultação temporária do cursor pelo Playwright; atribuição forte à instrumentação, sem contraprova temporal A/B. Manter hipótese rotulada, sem concluir falha geral nem ausência universal de avisos.
- OBS-002: máscaras/indicador Next encobrem pixels da navegação; ação secundária/rótulo parcialmente fora do enquadramento em paisagem e navegação elevada em formulários são limites dos recibos18/19. Revalidar na consolidação com viewport/interação; captura isolada não comprova obstrução nem aceite de toda a navegação.

Os defeitos de identidade A→B→A, render/captura, margem local e hashes foram tratados nas Specs023/024; não atribuir a eles automaticamente a causa dos incidentes históricos.

## Encerramento posterior

Por item: recuperar head/run/tentativa/log originais; separar fato e hipótese; definir reprodução sintética mínima e repetir em ambiente controlado; classificar produto/harness/infra; corrigir defeito demonstrado com regressão RED/GREEN proporcional, contratos e guards preservados. Registrar também inconclusivo/não reproduzido, sem chamá-lo de resolvido.

Não apagar falhas, diminuir assertions, aumentar indiscriminadamente timeouts, excluir testes ou mascarar intermitência com retries. Não operar banco/provedor real. Encerramento exige evidência causal/correção comprovada ou limitação explícita e decisão do mantenedor.

Heads64332e0 e9e11eca passaram nos15gates oficiais nesta rodada, com journals conferidos. Isso valida essas execuções, sem solucionar automaticamente os históricos.


## Atualização vigente — integração verificada e continuação pós-consolidação — 21/10/2026

DECISAO_CONFIRMADA: pedido atual de Pedro nesta conversa autoriza integrar20, conferir brevemente os merges recentes e preparar próximas duas etapas, incluindo correções necessárias.

EVIDENCIA_IMPLEMENTACAO: #20 integrado em b1f83cfa8e52dd25c6246c584a576553c5e9e131, sem autoaprovação. #19 e frentes21–24 já constam integradas; a RC25 e44711d foi incorporada por5f6266b com árvore idêntica à candidata validada. Os heads21–24 são ancestrais da RC. Após20, apenas dez diferenças documentais; produto/testes/configuração equivalentes à RC. Development remotab1f83cf, mainremotabeba96f; máquina local não verificada.

Logs do run39600889091/tentativa1/job119224780858 conferidos:15gates únicos PASS/exit0, E2E220, Integration231, HTTPS2 e IHFR6; resposta Codex do head sem achados. Checagem breve de integração, sem nova suíte local, nova auditoria completa ou aceite humano/científico. Não foi encontrado bloqueio técnico novo nesse escopo.

RECOMENDACAO materializada no novo prompt: A—investigação/correções de defeitos demonstrados; B—homologação/preparação da entrega. As dez fases visuais têm implementação integrada; não há novas fases visuais11/12. Históricos inconclusivos continuam sem encerramento causal. O relatório25 registra403Vercel e aceites humanos/operacionais pendentes; o provedor não foi reconsultado nesta preparação. A autorização operacional relatada na RC deve ter origem/escopo comprovados no contexto que a executar, sem reabrir consentimento de rotina já comprovado nem fabricar autoridade.

O handoff prepara execução técnica posterior à consolidação e não declara aceite humano da copy/produto/acessibilidade. Não houve deploy solicitado, alteração de main, banco/provedor real ou comunicação a participantes nesta preparação. Merges futuros ficam com o mantenedor; texto anterior preservado como histórico.

Próxima execução: [prompt pós-consolidação](../../../releases/2026-10-21-frontend-rc/prompt-pos-consolidacao.md) e [recibo da conferência](../../../releases/2026-10-21-frontend-rc/verificacao-integracao-e-handoff-pos-consolidacao.json).
