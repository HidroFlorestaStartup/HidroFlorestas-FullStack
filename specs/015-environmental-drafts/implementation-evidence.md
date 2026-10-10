# Evidências de implementação 015 — 2026-10-10

G3/G4 PASS local. DECISAO_CONFIRMADA PD-CRI-005/006 aprovada pelo usuário desta
conversa com documentação exigida; [proveniência](../../docs/plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md).
Implementação e operação em [plan.md](plan.md), [contratos](contracts/drafts.md) e
[runbook](../../docs/operations/environmental-drafts-runbook.md).

[Registro completo](validation-evidence.json): comandos reais, UTC, duração,
exit code, ambiente próprio e fingerprint dos bytes funcionais. Não equivale ao
SHA Git; documentação não integra esse fingerprint. Nenhum SMTP/upload real ou
migration remota. Não somar Mail/R1 sobrepostos nem invocações repetidas.

| Corte | Resultado |
|---|---|
| 48c6ee5f | Setup aplicou somente migration 13; Integration 174 PASS |
| 11a48/cfc494 | Migration FAIL 34/2 e depois 35/1; fixture violava guard OWNER e usava coluna inexistente; inventário de cadeia precisava incluir aditiva |
| 01ba1539 | Migration 36; Integration 176; Contract 6; Typecheck/Lint/Build; E2E 64 PASS |
| ff3e9452 | RED real: confirmação sem headers não recusava draft próprio; 1 FAIL |
| 03991fdb | focal 7 PASS; parser roundtrip 3 PASS após 2 PASS/1 FAIL |
| cba86030 | Unit 289 + Mail 17; Integration 177; Typecheck/Lint/Build PASS; E2E 62 PASS/1 FAIL/2 não rodados por histórico |
| 6cdf7d/cdf5be/0a20af/20b39f | E2E focal FAIL preservados: popstate era posterior ao router; diagnóstico removido antes da entrega |
| 00dbd4/29d3a/fd4f71 | histórico já corrigido; selector de alert duplicava announcer; coletor focal sem trusted ingress gerou 403. Corrigidos testes/coletor sem relaxar CSRF |
| fd4f71 (17:45:51–17:46:23 UTC) | 5 E2E focais PASS: histórico/campo excessivo/recuperação/retry/duas abas/discard/mobile/consume/inativo/outsider |
| 6b5c5090 | Typecheck/Lint/Build PASS; Bootstrap 13 migrations PASS; E2E geral 65 PASS; SchemaAudit zero |

Lint: zero erros e três warnings preexistentes. HTTPS e exclusão dedicada têm
registros específicos anexados no JSON de fechamento; não presumir cenário remoto.
RED inicial parser: módulo ausente; roundtrip RED focal sem timestamp capturado;
duração reportada ~0,29s, sem inventar UTC. Hipóteses de falhas anteriores foram
substituídas pelo diagnóstico observado acima, sem apagar seus registros.

Revisão independente somente leitura /root/draft_research: quatro P2 e depois
histórico forward/erro residual resolvidos e testados; revisão final sem novos
P1/P2. Convergência: requisitos 001–009 cobertos e 18 tarefas verificadas; nenhum
trabalho funcional restante neste recorte. História de navegador depende de
Navigation API cancelável, comprovada somente em Chromium; links/beforeunload
mantidos, sem garantia de interceptação de histórico SPA em outros navegadores.

Drafts são pessoais, sem expiração automática/ledger de descartados; consumo e
exclusão própria são transacionais. Medições/IHFR continuam imutáveis e com suas
classificações experimentais. Gate B remoto 012 e aceite humano 013 permanecem
pendentes; a aprovação de escopo não os encerra.
