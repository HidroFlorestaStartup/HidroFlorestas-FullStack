# Modelo efêmero

Origem validada e segredo aleatório ficam privados em memória. Substituto:
paused, failedStop, inFlight, timer, ticks, failures, statuses; até20invocações e uma em voo.
Pausa cancela o próximo timer e aguarda a requisição corrente. Retomada é
idempotente se já estiver ativo; não reinicia teto de ticks. Timeout750ms.
FalhaHTTP/transporte ativa failedStop terminal, bloqueia resume e novos ticks.
Abort HTTP não cancela fake servidor; teardown aguarda seu trabalho conhecido.
Fila falsa: pendentes/aceitos, sem destinatário, payload ou prova de conta.
Recibo: contadores, status/limites e gatesBLOCKED, sem origem/secret.
