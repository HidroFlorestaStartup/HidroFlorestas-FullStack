# Contrato do substituto

createLocalSchedule({origin,secret,intervalMs,maxTicks}) valida antes de fetch;
somente origem literal http://127.0.0.1:porta sem outros componentes.
Path fixo /api/internal/mail/process; GET sem query/body, bearer privado.
Retorna resume(), pause() assíncrono e snapshot() com contadores/copias de status.
Erros de parâmetros são genéricos. Falhas HTTP/transporte são contadas e tornam
a instância terminal, com resume recusado e sem novo tick. Timeout/abort do
cliente não prova cancelamento do callback servidor; teardown aguarda o fake.
Até20ticks ao longo de todas as retomadas, sem chamadas simultâneas.
Nenhuma entrada de env, rede externa, payload de e-mail ou execução SQL.
