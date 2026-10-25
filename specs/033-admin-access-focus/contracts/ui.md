# Contrato UI preservado

- Consultas existentes: GET detalhe e GET auditoria da seleção atual, sem novo endpoint/payload.
- 401/403 vigente: lista e seleção anteriores ausentes; texto atual de acesso perdido em role=alert/tabIndex=-1; alerta recebe foco após materializado.
- 404 vigente: remover somente o alvo da lista e seleção; texto atual de conta indisponível em alerta focado.
- Ambos cancelam leituras existentes, limpam auditoria e fecham diálogo sem mutação.
- Ocorrência nova com texto igual produz nova entrega de foco; renderizações alheias não o fazem.
- Ticket cancelado/seleção superada não controla o foco nem restaura dados.
- Desmontagem não deixa tarefa assíncrona para focar alerta antigo.

Instrumento de teste não representa autorização real: API sintética, componente/CSS reais e egress bloqueado. Testes reais existentes continuam intactos; execução QA futura por SHA é prova independente.
