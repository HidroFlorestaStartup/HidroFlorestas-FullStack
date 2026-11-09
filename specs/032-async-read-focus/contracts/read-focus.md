# Contrato de foco local

Origem: [spec.md](../spec.md), FR-001 a FR-007. Classificação: `RECOMENDACAO` técnica autorizada.

| Evento | Dados | Foco |
|---|---|---|
| Montagem/carga inicial | loading atual; dados nulos | não mover |
| Ação explícita com acionador focado | clearData/cursor/retry atuais | focar região persistente imediatamente antes da leitura |
| Acionador não focado | fluxo atual | não mover |
| Loading | dados anteriores limpos | mesma região, nome acessível e outline |
| Sucesso/vazio/nova falha | resultado atual | não executar foco; região preservada mantém foco se usuário não saiu |
| Usuário move foco durante leitura | fluxo atual | escolha do usuário mantida |
| Abort/unmount/contexto substituído | guards atuais descartam resposta antiga | sem recuperação tardia |

Resumo/histórico: SECTION raiz é o mesmo elemento entre ramificações; ter ref/tabIndex=-1 em todos os estados, nome acessível atual e CSS de foco na própria região. Mapa: DIV raiz persistente recebe role=region e vínculo ao título existente. TabIndex=-1 permite alvo programático sem parada nova na ordem Tab. Nenhum callback de resposta chama focus.

Tab a partir da região alcança seu primeiro controle/destino existente. No erro do resumo/histórico, esse controle é retry; no mapa, o link existente Voltar ao resumo precede retry. A ordem não muda. Nenhum dado anterior é conservado por causa do foco.
