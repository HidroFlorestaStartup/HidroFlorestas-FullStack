# Evidências — substituto local de scheduler

Base08262dc57c1ad365244f9ec6902b1e4be39e2d7d, branch
test/hf-night-local-scheduler-20261025; Windows/Node24.19.0.
Somente instrumento sob demanda, sem aplicação/servidor/schema alterados.

## Spec Kit e revisão de requisitos

Skills instaladas usadas: specify/plan/checklist/tasks/analyze/implement.
Template vigente e constituição1.0.0 aplicados; scripts reais setup-plan,
check-prerequisites --template checklist-template, setup-tasks e prerequisites
--require-spec --require-tasks --include-tasks executados em Git Bash.
Sem hooks/extensão bug; clarify dispensado por escopo M05 explícito.
Analyze:5FR/3SC,9tarefas,100%cobertura,0conflitos/ambiguidades/CRITICAL/unmapped.

Revisor `/root/fr015` apontou antes do código que abortHTTP não encerra
callbackservidor. Contrato/modelo/spec/plan passaram a exigir falha terminal
HTTP/transporte, resume recusado e teardown aguardando fake conhecido.
Reavaliação:5/5 critérios de requisitos satisfeitos; sem override.
Implement leu checklists já revisadas e seguiu tasks com testes primeiro.

## Execução própria

| Comando / momento | Resultado |
|---|---|
| Import do trigger.ts com Node strip-types | PASS, função disponível sem npm/Prisma/DB/env real |
| node --experimental-strip-types --test tests/investigations/mail/local-scheduler.test.mjs antes harness | RED,exit1,módulo ausente;1arquivo falhou,0PASS;122.11ms |
| Mesmo comando após harness | exit0,4/4PASS,0skip;1403.10ms |
| node --check no harness e no teste .mjs | exit0 para ambos |
| git diff --check | exit0 no diff rastreado |

Prova positiva:5ticks automáticos,5aceites falsos,pico1callback,3itens durante
pausa sem processamento e drenagem após retomada. Teto5atingido sem tickextra.
Negativas:origemexterna/ambígua,limites inválidos,HTTPsem bearer/incorreto401,
query/body400,callback não invocado,allowlist sem canário/segredo em resposta.
Timeout750ms com callback retido por barreira:instância terminal,não retoma,
callback servidor continua ativo até release do teste;nenhuma sobreposição.
Teardown fecha timers/requests e servidor próprio, aguardando fake conhecido.

O aviso Node MODULE_TYPELESS_PACKAGE_JSON foi observado; nenhuma política,
dependência ou package.json foi alterada para suprimi-lo. Não houve npmci.

## Limites

Guard de autorização e HTTP são reais em loopback; callback/fila/accepted são
falsos. Não comprova processMailBatch/SQL/claim/lease,SMTP,inbox,recovery ou
scheduler da plataforma. Esses mecanismos exigem recibos distintos; o baseline
tem testes SQL/mail próprios, sem transferência para este commit.
Nenhum env real ou endereço/bearer foi publicado. Nenhum SMTP/banco/provedor,
cron hospedado ou script scheduler antigo foi usado. G3/G4/G5 BLOCKED.

Revisão independente `/root/fr015`: [parecer](independent-review.md), PASS sem
finding residual; rerun4/4PASS,0skip,1378.88ms, hashes do harness/teste conferidos.
Guardas comparadas à base:27false preservados+somente branch própria,false;
outros camposJSON/workflow iguais. NegativasHTTP exercitam guard diretamente;
fail-stop após timeout foi executado; caminho HTTPnão200 do scheduler foi
inspecionado, sem alegar teste adicional dessa transição.

speckit-converge após implement/revisão:5FR,3SC,6aceites,4decisões técnicas,
7princípios;0missing/partial/contradicts/unrequested,0severidades e0tarefas
acrescentadas. Sem Git/comparação histórica na avaliação. tasks ficou inalterado
durante converge; T009 marcado depois pelo fechamento de implement.
