# HF-INV local — índice da entrega

Missão `HF-INV-20261023-01-LOCAL01`. O diretório equivalente ao destino sugerido
`2026-10-23-intermittency-stabilization` é este pacote, sem duplicar evidências ou
manter outro plano paralelo. O plano único permanece em
[execução local multiagente](../../plans/active/investigacoes-intermitentes-20261023/execucao-local-multiagente.md).

| Artefato contratado | Caminho nesta entrega |
|---|---|
| Síntese e estado | [final-report.md](final-report.md) e recibo posterior na PR |
| Nove incidentes | [incident-matrix.md](incident-matrix.md) |
| Ambiente e protocolos | [environment-and-protocols.md](environment-and-protocols.md), [preflight.json](preflight.json) |
| Agentes reais/commits | [agent-ledger.json](agent-ledger.json) |
| Evidências por frente | [nav4](nav4/readme.md), [ihfr](ihfr/results.md), [navigation](navigation/report.md) |
| Gates e testes | [validation.md](validation.md) |
| Revisão e findings | [review.md](review.md), [INV-005 recuperado](review/inv005-historical.json), [errata HTTP obrigatória dos recibos](review/http-classification-errata.md) |
| Comunicação preparada | [operational-handoff.md](operational-handoff.md) |

Os resultados remotos só existem depois do commit: sua identidade e conclusão
ficam em comentários da PR no SHA exato, sem atribuir PASS retroativamente a
outro HEAD. As PRs #27/#28 preservam seus próprios estados e históricos.
