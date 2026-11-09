# Evidências — presença operacional offline

Base:08262dc57c1ad365244f9ec6902b1e4be39e2d7d; branch feat/hf-night-01;
Windows/Node24.19.0. Alterações posteriores serão atribuídas ao commit publicado.

## Spec Kit real

Instalação1.0.4, skills mode Codex em `.agents/skills/`, sem extensions/hooks.
$speckit-specify gerou spec/checklist e `.specify/feature.json` local ignorado;
$speckit-plan executou setup-plan.sh --json e produziu design;
$speckit-checklist executou check-prerequisites --template checklist-template;
$speckit-tasks executou setup-tasks.sh --json e produziu10 tarefas.
Scripts executados com Git Bash instalado (sem simular comando de shell `$skill`).
Constituição1.0.0 aplicada, sem emenda; clarify dispensado por escopo inequívoco.

$speckit-analyze: check-prerequisites --json --require-spec --require-tasks
--include-tasks;6FR/3SC, cobertura100%,10 tarefas,0CRITICAL/sem tarefas sem requisito.
Revisão independente de requisitos `/root/students` apontou universo de nomes
ambíguo; spec/model corrigidos para18 saída+5 baseline entrada antes do código.
Reavaliação:6/6 itens security satisfeitos,5/5 qualidade spec. Nenhum override.

$speckit-implement: check-prerequisites --json --require-tasks --include-tasks;
gate checklists PASS. Código/testes seguiram tasks. Ignores existentes para
env/node_modules/logs mantidos; `.worktrees/` local deliberadamente não staged.

## Testes e limites

| Comando / momento | Exit | Resultado |
|---|---|---|
| node --test tests/operations/ops-metadata-presence.test.mjs antes implementação |1| RED por módulo ausente,1 arquivo falhou,0pass;65.05ms |
| mesmo comando após implementação |0|5testes PASS,0fail/skip;578.57ms |
| node --check scripts/ops-metadata-presence.mjs |0| sintaxe PASS |
| node --check tests/operations/ops-metadata-presence.test.mjs |0| sintaxe PASS |
| CLI snapshot preview feat/hf-night-01 |2|18missing/0present; saída esperada; arquivo presence-preview.json |
| git diff --check |0| sem whitespace errors no diff rastreado |

Casos: vazio/completo,18nomes, baseline sem contagem, target/branch exata,
precedência de relato global, duplicatas/estrutura/campos extras/valores/nomes
desconhecidos, JSON/canários/arquivo ausente/diretório/limite1MiB/argumentos.
CLI não importa env/rede/subprocesso; testes usam processos Node locais e
diretório temporário próprio com destino validado antes de remoção.
Não é auditoria geral, teste hospedado, validação de valores ou aceite humano.
Build/unit da aplicação pertencem à frente QA na base, sem transferência de PASS.

## Revisão e convergência

Revisão independente `/root/students`: APTO_TECNICAMENTE_NO_RECORTE_OFFLINE,
zero achados abertos. [Parecer](../../docs/reports/2026-10-25-hf-night-01/ops/independent-review.md)
inclui hashes do código/teste finais, rerun5/5PASS680.47ms, sintaxe e8links do runbook.
P3 OPS-DOC-001 tratado: contrato agora explicita subconjunto ASCII1–200 da
branch; whitespace/negativas LF/CRLF explícitos. Esses novos casos passaram
também antes do pequeno reforço; nenhum RED ou bug reproduzido foi alegado.
Rerun do autor após delta final:5/5PASS850.88ms,0skip.

$speckit-converge executado após implement e revisão:6FR,3SC,5cenários,
4decisões de plano,7princípios;0missing/partial/contradicts/unrequested;
0CRITICAL/HIGH/MEDIUM/LOW;0tarefas acrescentadas. Avaliação limitada aos
arquivos do plano, sem Git/comparação histórica durante converge. tasks.md
permaneceu inalterado na avaliação; T010 marcado depois em implement.
G3/G4/G5 BLOCKED em todos os resultados.
