# Modelo de estado e fronteiras

Nenhuma mudança persistida. CollectionAttempt ganhou snapshot readonly de apiPath/idempotencyKey/body, recoveryPending/failureKind e fase confirmed. Editing/reviewing antes do envio permitem correção; submitting/confirmed/resultado incerto bloqueiam alteração. Repetição usa snapshot original. Erro conclusivo anterior à incerteza permite corrigir; conflito ou desconhecido conserva a tentativa. Não se acrescentou persistência após fechar/recarregar a página.
