# Estado de apresentação

Nenhuma entidade persistida, migration ou contrato HTTP muda.

- Seleção/tickets de leitura existentes continuam sendo autoridade para aceitar uma resposta.
- Ocorrência do alerta: texto público atual e identidade de uma nova indisponibilidade aceita. Duas ocorrências podem ter texto igual.
- Transições: seleção válida limpa aviso; resposta vigente indisponível limpa seleção/dados e cria ocorrência; commit dessa ocorrência entrega foco; re-render não relacionado não cria ocorrência; resposta descartada não produz transição.
- Após desmontagem não fica tarefa de foco pendente. Cancelamento de detalhe/auditoria/lista e fechamento de diálogo permanecem como na base.
