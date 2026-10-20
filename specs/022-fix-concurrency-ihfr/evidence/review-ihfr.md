# Revisão independente — Frente B

**Revisor**: agente `/root/review_ihfr`, distinto do implementador, somente leitura. Não executou testes, banco ou processos.

RECOMENDACAO: sem P1/P2 material remanescente no recorte revisado, com investigação histórica **inconclusiva**. Conferiu logs originais FAIL/PASS, diff e controles.

Três achados iniciais corrigidos:

1. Capturar seções com `aria-labelledby`, resolvendo o heading; a região não usa `role` explícito.
2. Observar a página real da fixture nos controles; não criar página paralela sem diagnóstico.
3. Separar controles artificiais dos seis cenários oficiais, evitando pré-aquecimento. Configurações oficiais intactas; controles em `tests/experiments/`, somente por flag explícita.

O log oficial final comprova **6/6 PASS em29,5s**, sem alteração de asserções/readiness/retries/timeouts. Os controles separados registram **2RED deliberados e2PASS em16,2s**: região oculta em `DIV#S:1`/displaynone/retângulo0, Fuso ausente/placeholder presente, região visível com JavaScript, redirect de sessão inválida/ator ausente.

Essa evidência corrigiu a inferência inicial de independência de JavaScript por SSR. O revisor exigiu metadados de ancestrais e comparação positiva, posteriormente capturados. A seleção parcial ambígua ocorreu somente no experimento novo, corrigido para nome exato; não explica as seis falhas históricas.

Forwarding sanitiza linhas completas e possui teste de segredos divididos em chunks. Logs não capturam cookies, headers, corpos ou traces. O delta final de diagnóstico também captura scripts/documentos falhos, console e visibilidade com limites de tamanho e sem query strings. Revisor aprovou esse delta; sua rodada de controles registrou2RED/2PASS em16,0s, incluindo `hiddenAncestor: S:1` e falha de asset.

**Limite**: condições artificiais reproduzem assinaturas, não a causa do CI histórico. Sem correção funcional ou científica B. Nova falha natural requer confrontar servidor, navegação, recursos e DOM no mesmo SHA. `git diff --check` PASS no recorte B.

Revisão adicional do delta de descarte de linha longa: sem achado material remanescente. O estado `discarding` conserva o descarte até newline e retoma a linha seguinte. O revisor conferiu código e novo teste, sem executá-lo; a execução pelo implementador registrou oito testes PASS. Evidência em [logger-boundary.md](logger-boundary.md).
