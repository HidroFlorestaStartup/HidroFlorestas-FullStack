# Acompanhamento dos checks da RC — 2026-10-13

EVIDENCIA_IMPLEMENTACAO do executor das correções, posterior à revisão independente.
Não aprova os PRs nem substitui o parecer dos estudantes. O relatório original,
CHANGES_REQUESTED e FAILs permanecem preservados.

## Árvore e resultados distintos

RC6 `2995cff372a8ff173d452b87f334d03b096de50e`: código funcional testado9fe2bec,
snapshot f7148613de807f0d1e6912ba67f718cd78bf4362455a61d94f6b328de914d02c.
Run38455037303 SUCCESS com15 gates, incluindo E2E70, HTTPS2, Deletion3, IHFR6,
Bootstrap14 e SchemaAudit0. Local também15 gates PASS; dados próprios preservados.
Heads finais3/4 também tiveram SUCCESS nas runs38454674811/38454767804.

PR5 `52f612ff9c8aed279212ee5ba61581c3d66474cc`: run38454838652, tentativa1,
E2E68 PASS/1FAIL/1não executado. Timeout5000ms de toHaveURL em
account-verification-recovery.spec.ts:171: destino esperado/workspace,
observado/verify-email. Código/prova/payload da confirmação não foram registrados;
causa da ausência de navegação permanece INCONCLUSIVA. O formulário de verificação
mostra controles somente após estado carregado pelo efeito cliente; não atribuir
automaticamente esta falha ao defeito SSR de drafts já corrigido.

PR7 `5cbd4969ac270a440f1029f9612ed25e9024bf85`: run38455120836, tentativa1,
E2E70/HTTPS2/Deletion3 PASS; IHFR5 PASS/1FAIL. O locator getByText em
ihfr-diagnosis-manage.spec.ts:119 encontrou duas mensagens de ausência de
diagnóstico; uma foi observada oculta antes da violação strict mode. Essa é a
evidência do locator/DOM, não falha comprovada de cálculo ou persistência IHFR.
INFERENCIA: retenção/transição de rota pode produzir o DOM duplicado; origem
da duplicação ainda não demonstrada. Nenhum .first(), assert menor, retry
automático ou timeout maior foi introduzido para obter PASS.

As duas runs foram reexecutadas uma vez nos mesmos SHAs, mantendo todos os
asserts, guards e runners; a tentativa1 e seus artefatos foram preservados.
O resultado da tentativa2 deve ser conferido no recibo e na página da run;
PASS posterior não encerra a investigação nem apaga o FAIL inicial.

EVIDENCIA_IMPLEMENTACAO posterior: tentativa2 de ambas as runs concluiu SUCCESS,
15 gates PASS, mantendo exatamente os mesmos heads/inputs funcionais. Isso
comprova intermitência nos ensaios observados; não demonstra que a causa foi
corrigida. Os gates não executados após a falha da tentativa1 continuam NOT_RUN
naquela tentativa. CI do fechamento documental posterior é execução distinta.

[Recibo/UTC/SHAs/resultados e excertos das falhas](2026-10-13-cri-rc-ci-followup-evidence/ci-validation.json).
[CI cumulativo6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38455037303),
[tentativa1 do5](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38454838652/attempts/1) e
[tentativa1 do7](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38455120836/attempts/1).

## Revisão e limites

PedroVitor237/luciano-mendesz9 receberam review requests HTTP201 nos PRs3–6;
luciano-mendesz9 no7, cujo autor é Pedro. Os heads/bases da pilha e os11 originais
foram preservados, incluindo99d8363 uma vez; PR5 já mergeabletrue, sem dirty.
Revisões CHANGES_REQUESTED4/6 não foram dispensadas e nenhum PR foi aprovado.

[Prontidão cumulativa](../../releases/2026-10-10-cri-rc/rc-readiness-20261013.md)
e [runbook CI](../../operations/rc-review-ci-runbook.md). CI/check do novo head
documental deve ser conferido separadamente; esse fechamento não muda inputs
funcionais. Intermitências conhecidas, cinco achados dev, browsers alvo e gates
reais de mail/contas/cloud/operadores/inventário/backup/ensaio continuam ressalvas.
Nenhum deploy, merge principal, migration remota ou remoção de recurso real.
IHFR mantém CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
