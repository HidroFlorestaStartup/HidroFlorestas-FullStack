# Modelo de dados — login 017

Nenhuma entidade, tabela, migration ou contrato persistido novo. A entrega altera apresentação e estados efêmeros do formulário.

Estado local: email e password (somente memória, nunca logs/capturas preenchidas); visibilidade da senha; readiness; loading; trava síncrona de envio; mensagem pública retornada pelo contexto. SSR→pronto→enviando→erro/pronto ou destino controlado pelo contexto.

Sessão/cookie HttpOnly, elegibilidade e /verify-email pertencem ao backend e ao AuthContext existentes. Validação local de vazio preserva a política do baseline; a senha enviada permanece idêntica ao valor preenchido. Nenhum armazenamento local de credenciais.
