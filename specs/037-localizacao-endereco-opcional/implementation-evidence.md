# Evidências — frente C / Spec 037

Data: 2026-10-31. Estado: PREPARACAO_G0; produto NAO_IMPLEMENTADO nesta frente.
Base exata `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`. Branch `feat/localizacao-endereco-opcional`; PR alvo development, dependência #45.

G0 acrescenta somente os quatro documentos deste diretório; guards herdados antes da primeira publicação. Não foi selecionado/ativado provedor, chamado serviço de geocodificação, alterado schema ou executada migration. Fonte de decisões #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

| Verificação | Estado deste corte |
| --- | --- |
| Guards estáticos herdados | PASS no pacote G0 |
| Implementação/testes próprios C | NAO_IMPLEMENTADO / NOT_RUN |
| Quinze gates no HEAD C | Não observado ainda neste commit; consultar run real após publicação |
| Integração real com geocodificador | NOT_RUN |
| Revisão independente / aceite humano | NÃO REALIZADOS |
| Subagentes nativos G0 | NATIVE_SUBAGENTS_UNAVAILABLE |

Recibo de publicação registra SHA e PR sem autorreferência. Acrescentar resultados reais por SHA/run/tentativa e preservar este histórico. Mock de rede pode provar tratamento das respostas, não disponibilidade/limites de serviço real. Nenhum PASS herdado certifica UI-07.
