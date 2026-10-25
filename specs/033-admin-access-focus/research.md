# Pesquisa focal — foco administrativo

`FATO_DOCUMENTADO`: QA reproduziu falha real de foco em frontend-user-administration.spec.ts:183/194 com HTTP403 observado; 1FAIL/9PASS no experimento focal, sem retries. Snapshot não permite atribuir o elemento ativo a BODY. Fonte transportada pelo agente QA: docs/reports/2026-10-25-hf-night-01/qa/admin-focus-reproduction.json na worktree QA.

`EVIDENCIA_IMPLEMENTACAO`: unavailableAccount limpa seleção/cancela lista, define a mensagem e agenda rAF para ref condicional. choose também agenda rAF de foco do título. Guards de leitura atuais usam identidade de ticket/AbortSignal/selectedId.

`INFERENCIA`: rAF pode consumir a tentativa antes da materialização do alerta. Alternativas: disputa entre callbacks de seleção/erro; compromisso do modal; resposta descartada indevidamente aplicada. O experimento deve distinguir momento de callback/ref/commit e preservar o estado atual.

`RECOMENDACAO` técnica condicional: foco dependente de ocorrência comprometida, sem tarefa de frame que sobreviva a nova ação. Alternativa callback-ref estável foca montagem mas precisa lidar com texto/ocorrência repetidos; texto como única dependência pode coalescer novas ocorrências. Duplo rAF, flushSync de produção, polling, timeout maior e retries não são a correção proposta.

Harness: componente real, bundle local esbuild, NextLink substituído apenas por anchor, CSS global processado localmente. Egress bloqueado; toda API é fake explícito. Controle do scheduler pode atrasar commit enquanto rAF continua nativo. Rotular essa intervenção; não alegar equivalência de todos os timings React/Next/DB reais. Sem nova dependência ou alteração de contrato HTTP.

## Resultado da pesquisa experimental

`EVIDENCIA_IMPLEMENTACAO`: o controle retido confirmou callback rAF nativo antes
da existência do alerta e foco ausente após commit no baseline. A primeira
versão do efeito pós-commit eliminou esse caso, mas uma contraprova sugerida
pelo revisor mostrou efeito passivo antigo focando após nova seleção já ter
iniciado seus reads. O patch final combina efeito pós-commit com ref de
identidade invalidada síncronamente por seleção/limpeza/desmontagem. Ambos os
REDs e os GREENs correspondentes estão em [evidências](implementation-evidence.md).

`INFERENCIA`: essa evidência sustenta a escolha de implementação no recorte
controlado; não demonstra que o interleaving da QA real foi idêntico. O cenário
antes do primeiro commit usa handler React real disparado fora de evento DOM
discreto dentro de transition, por instrumentação sintética pinada à versão;
cliques DOM normais não forneceram esse atraso. Não houve patch nos demais rAFs.
