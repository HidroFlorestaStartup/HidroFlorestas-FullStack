# Evidências de implementação — 2026-10-10

## Revisão focal posterior — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: 014 revalidada na regressão final5f36eb7e, com E2E67,
HTTPS2, exclusão3, Bootstrap14 e contratos de checksum presentes na Unit291.
[Relatório e limites novos](../../docs/reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md)
e [comandos/UTC/HEAD/fingerprint](../../docs/reports/audits/2026-10-10-cri-local-validation.json).
Nenhuma alteração funcional nesta rodada; registros seguintes são históricos.

G3/G4 PASS local. Seleção de exclusão corrigida sem alterar suas assertions;
preparador aceita representação LF/CRLF com UTF-8 íntegro, mantendo SQL/checksums
históricos e guards de ownership. Setup aplicou somente migration 12 pendente.
Bootstrap passou com cadeia completa e rollback de escrita sintética; recurso
novo próprio removido. Não houve envio SMTP externo nem operação remota.

Resultados completos, comandos, UTC, duração, exit code e fingerprints em
[validation-evidence.json](validation-evidence.json). Fingerprint considera bytes
reais do checkout, incluindo arquivos novos; não equivale a SHA Git com LF.

| Corte | Verificação | Resultado |
|---|---|---|
| beba96f/a14fd935 | Unit 283 + Mail 17; Integration 170; Migration 35; Contract 6; R1 17 sobrepostos | PASS |
| beba96f/a14fd935 | Typecheck/Lint/Build | PASS; três warnings preexistentes |
| beba96f/a14fd935 | E2E geral | FAIL: 52 PASS/5 FAIL/8 não executados |
| dea4e0b3 | E2E/RegressionSetup | FAIL por banco sem migration 12/checksums de EOL; preservados |
| cae0c0e3 | RegressionSetup; E2E 62; HTTPS 2; SchemaAudit zero | PASS |
| f493971e | Unit 286 + Mail 17; Typecheck/Lint; Bootstrap 12 migrations; exclusão E2E 3; SchemaAudit zero | PASS |

RED inicial do helper: módulo ausente (1 FAIL); depois 2 PASS. Revisão independente
somente leitura /root/draft_research identificou UTF-8 permissivo, reproduzido
com 2 PASS/1 FAIL e resolvido com 3 PASS. Tempos dessas invocações focais não foram
capturados; duração reportada pelo node ~0,29s. Não somar Unit/Mail/R1 duplicados.

Analyze/converge: quatro requisitos, seis tarefas, cobertura completa; nenhum
trabalho funcional restante neste recorte. Revisão P2/P3 resolvida, sem P1;
diff/links/escopo revistos. Gate B remoto da 012 e aceite humano da 013 continuam
pendentes; aprovação local não os fecha. Regressão E2E/HTTPS antecede somente o
reforço do helper UTF-8, testado posteriormente em Unit/Bootstrap.


## Regressão integrada CRI — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: suites pertinentes desta feature passaram novamente
na regressão integrada após 014/015/016. [Comandos, UTC, snapshots e resultados](../016-area-covers/implementation-evidence.md).
O corte anterior e seus resultados permanecem históricos. Transporte sintético
e provedor fake não fecham Gate B012/aceite humano013 ou smoke Cloudinary real.
Não houve operação remota nesta execução.
