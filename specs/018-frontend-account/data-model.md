# Estados de apresentação — sem novo modelo persistido

EVIDENCIA_IMPLEMENTACAO: modelos e serviços existentes são a baseline, não intenção inferida.

| Estado | Dados em memória | Transições preservadas |
|---|---|---|
| Cadastro | nomes, e-mail, senha, chave da tentativa | pronto → envio → destino do servidor ou erro/retry; edição renova chave |
| Verificação | estado seguro, código string, cooldown, chave reenvio | loading → pendente/expirado/verificado/sem sessão; confirmar atualiza sessão |
| Recuperação | e-mail, chave da solicitação | envio → mensagem neutra/erro |
| Reset/troca | prova somente em memória, senhas, geração da prova | captura/limpeza fragmento → pronto → confirmação ou erro; sucesso limpa/revoga |
| Exclusão | impedimentos seguros, senha, confirmação | consulta → bloqueada/elegível → confirmação explícita → exclusão ou erro |

Nenhuma alteração em schema, DTO de domínio, política de sessão ou serviço. Senhas nunca normalizadas; código/prova nunca convertidos em número.
