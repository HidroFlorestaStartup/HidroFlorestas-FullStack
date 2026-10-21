# Modelo de apresentação — Spec 027

Não há novos models, tabelas ou migrations. `AdminUserDto` e `AuditEventDto` de `src/app/api/server/user-administration/user-administration.contracts.ts` são importados somente como tipos no cliente.

| Estado local | Conteúdo | Regra |
|---|---|---|
| Consulta | busca, papel, estado, pilha de cursores | Alterar filtro reinicia página; cursor permanece opaco |
| Seleção | conta real e revisão | Resposta só é aplicada à mesma conta e geração de leitura |
| Auditoria | eventos e cursor | Limpeza imediata ao trocar alvo; eventos não são produzidos no cliente |
| Alteração | tipo, valor, justificativa | Envia somente contrato existente com expectedRevision |
| Confirmação | aberta, ocupada, conflito | Ocupada impede duplicata; conflito exige releitura antes de repetir |

Metadados técnicos de revisão são exibidos somente no contexto administrativo, sem expor token, senha ou autoridade do ator. Nenhum dado pessoal é necessário nas evidências: as fixtures utilizam `@test.invalid`.
