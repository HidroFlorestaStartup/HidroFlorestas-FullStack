# Reconciliação histórica HF-UI-044

2026-11-01, America/Fortaleza. Missão HF-UI-044-WORKTREE-RECONCILE-01.
Estado do pacote antigo: **SUBSTITUIDO**. Desenho original: RECOMENDACAO histórica.

## Preparação e execução são registros diferentes

FATO_DOCUMENTADO: o pedido atual identifica a run 41275910130/1 como a composição
efetivamente validada e autoriza organizar o pacote local, com commit documental
local. A proposta hf-ui044-close-qa-actions-prepare é anterior e foi substituída.
Seus candidatos, comandos e recibos não representam o workflow executado.

EVIDENCIA_IMPLEMENTACAO: a [API da tentativa](https://api.github.com/repos/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130/attempts/1)
confirma completed/success, SHA de controle 6c61056fe1dc2193e225d935f49b78cb6c6781ed,
branch codex/hf-ui044-composition-qa-20261101 e workflow .github/workflows/rc-review.yml.
A [run](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130)
é uma fonte separada. Esta missão leu somente seus metadados; não reauditou
journals, quinze gates, capturas ou artefatos e não transfere PASS para candidatos.

O manifesto original registra candidateCommit=null e árvore de controle
0c4401e543c3e1312b2d27c5ba0dda8d002973b1, propondo outro workflow e a branch
codex/hf-ui044-close-qa-actions-20261101. Os recibos locais registram runtime
NOT_RUN. Esses estados históricos continuam preservados sem regeneração.

## Destinação dos 21 arquivos

O [inventário](inventory.json) contém caminhos relativos, classificação individual,
justificativa, tamanho, SHA-256 e destino de cada original. Somente readme.md e
plan.md forneceram conteúdo para esta síntese sanitizada; os dois originais também
foram preservados fora do Git. Nenhum dos 21 originais brutos integra o commit.

| Arquivo original | Classificação para destinação |
| --- | --- |
| `.gitignore` | EVIDENCIA_HISTORICA_LOCAL |
| `build-control-tree.py` | EVIDENCIA_HISTORICA_LOCAL |
| `candidate-manifest.json` | EVIDENCIA_HISTORICA_LOCAL |
| `candidates/.github/workflows/hf-ui044-composition-qa.yml` | EVIDENCIA_HISTORICA_LOCAL |
| `candidates/scripts/hf-ui044-compose.ps1` | EVIDENCIA_HISTORICA_LOCAL |
| `candidates/scripts/hf-ui044-evidence.ps1` | EVIDENCIA_HISTORICA_LOCAL |
| `candidates/vercel.json` | EVIDENCIA_HISTORICA_LOCAL |
| `commands-after-authorization.ps1.txt` | EVIDENCIA_HISTORICA_LOCAL |
| `composition-local.json` | EVIDENCIA_HISTORICA_LOCAL |
| `control-candidate.patch` | EVIDENCIA_HISTORICA_LOCAL |
| `gates-not-run.json` | EVIDENCIA_HISTORICA_LOCAL |
| `negative-verification.json` | EVIDENCIA_HISTORICA_LOCAL |
| `package-manifest.json` | EVIDENCIA_HISTORICA_LOCAL |
| `plan.md` | DOCUMENTACAO_UTIL_PUBLICAVEL_SANITIZADA |
| `prepare-candidates.py` | EVIDENCIA_HISTORICA_LOCAL |
| `readme.md` | DOCUMENTACAO_UTIL_PUBLICAVEL_SANITIZADA |
| `sources/github-readback.json` | CONTEUDO_PRIVADO_NAO_PUBLICAVEL |
| `sources/vercel-guard-applicability.json` | CONTEUDO_PRIVADO_NAO_PUBLICAVEL |
| `static-review.json` | EVIDENCIA_HISTORICA_LOCAL |
| `validate-candidates.py` | EVIDENCIA_HISTORICA_LOCAL |
| `verification-summary.json` | EVIDENCIA_HISTORICA_LOCAL |

A categoria CONTEUDO_PRIVADO_NAO_PUBLICAVEL é um critério conservador do agente de
destinação para respostas brutas de fontes/conectores, sem afirmar que segredos
foram encontrados. Os demais scripts, patch e recibos ficam como evidência
histórica local porque a proposta foi substituída.

## Integridade e isolamento

EVIDENCIA_IMPLEMENTACAO: todos os originais foram copiados para
`.accounts-validation/hf-ui044-worktree-reconcile-01/original-package/`, relativo
ao checkout da Frente C. Essa área já está excluída por `.gitignore`, regra
`/.accounts-validation/`; nenhuma regra de ignore foi criada ou alterada.
Os 21 arquivos e a .scratch preexistente totalizam 3272 arquivos,
147382464 bytes e 476 diretórios. Nomes, tamanhos e SHA-256
da cópia foram comparados ao original, que permaneceu estável durante a cópia.
O manifesto de transporte de todos os bytes fica somente na área local,
em `receipts/preservation-file-manifest.json`; seu SHA-256 é
`4258767006781daf8285b02c43a211307795344827a6ab71ff5230b9cbf6d2f9`.
Esse manifesto de transporte não amplia o inventário Git dos 21 arquivos.

O [recibo sanitizado](verification.json) separa a comprovação da cópia, os
metadados públicos selecionados e os limites de validação. O manifesto original
de 20 entradas foi conferido sem alteração; seu próprio hash é a 21ª entrada.

A [PR #48](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/48)
e o fetch seguro confirmam C em 799c00a42d7f3846c3449d3615d263ce0b0e7bd2.
A branch documental docs/hf-ui044-worktree-reconcile-01 parte de development
9b8595d232842d401ce81bbc92c54dd543aa2829, em worktree isolada. Seu diff acrescenta
apenas este relatório, inventário, recibo e o
[plano concluído](../../plans/completed/hf-ui044-worktree-reconcile-01.md).
Nenhuma mudança de produto da C foi transportada.

Após a revisão documental, todos os bytes da fonte e da cópia foram reconferidos.
Somente então o diretório original da preparação foi retirado da Frente C, e a
cópia integral foi novamente conferida. Estado final da C: CLEAN, na mesma branch
e no mesmo HEAD; nenhum dos 21 arquivos permaneceu no local original. Não houve
mudança de regra ignore para esconder a pendência. A revisão foi feita pelo
próprio agente; seu recibo e o estado Git final estão no verification.json.

## Limites e encaminhamento

Organização e commit local autorizados pelo pedido atual. Publicação remota,
merge, deploy e alterações em A/B/C exigem autorização posterior. Nenhuma nova
execução UI-06 ou teste funcional foi iniciada. A revisão desta missão é do
próprio agente, sem representar revisão ou aceite humano.

Nenhuma decisão normativa de produto, técnica ou científica foi modificada;
TECH_DECISIONS.md, DOCUMENT_REGISTER.md e PENDING_DECISIONS.md não precisam de
alteração material para esta destinação histórica local e permanecem intactos.
Os qualificadores CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO permanecem.
