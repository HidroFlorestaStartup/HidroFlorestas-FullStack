# Plano HF-NIGHT-01 — documentação dos estudantes

- **Identificador:** `HF-NIGHT-STUDENTS-20261025`.
- **Estado:** `AGUARDANDO_REVISAO`.
- **Data:** 2026-10-25, America/Sao_Paulo.
- **Execução:** agente C, documentação, por delegação do coordenador HF-NIGHT-01.

## Objetivo e resultado

Preservar os quatro originais da revisão destinada a Thales e registrar o
tratamento atual dos quatro achados RTH, com proveniência verificável, sem
reescrever as fontes ou duplicar a conciliação C1. Entrega em
[students](../../reports/2026-10-25-hf-night-01/students/readme.md).

## Escopo e limites

`FATO_DOCUMENTADO`: o mandato M01/M06 recebido nesta sessão autoriza restaurar,
somente se ausentes, os três arquivos de
`docs/reviews/20261024-revisao-thales/` e
`docs/plans/active/revisao-thales-20261024.md`, diretamente dos blobs de
`d2168c840937a6120e32467f24cb46383e8dcd29`. Autoriza plano, relatório, evidência e
apontador navegacional aditivo. Não autoriza importar a ancestralidade inteira,
materializar a #28, operar PRs, commit/push, deploy, banco, SMTP ou provedores.

Nenhum arquivo de `docs/raw/**`, código, teste, spec, dependência, workflow ou
Vercel será alterado nesta frente. Não há nova funcionalidade ou número de spec.
FR-015 permanece parcial na base; sua revisão funcional pertence à outra frente.

## Fontes, autoridade e método

Aplicam-se [AGENTS](../../../AGENTS.md), [contexto](../../../PROJECT_CONTEXT.md),
[decisões](../../../TECH_DECISIONS.md), [política de planos](../../../PLANS.md),
[constituição](../../../.specify/memory/constitution.md),
[política Code-First](../../code-first-prd/governance/source-policy.md) e
[autoridade](../../governance/SOURCE_AUTHORITY.md). Foram consultados C1,
inventários, originais e protocolos HF-INV nos respectivos cortes.

`EVIDENCIA_IMPLEMENTACAO` identifica objetos/configuração/código inspecionados;
`FATO_DOCUMENTADO` identifica declarações com fonte; `INFERENCIA`,
`RECOMENDACAO`, `PROPOSTA` e `PENDENCIA_DE_DECISAO` conservam seus limites.
Foram lidos os critérios de consistência de
[`speckit-analyze`](../../../.agents/skills/speckit-analyze/SKILL.md).
O comando de feature não foi executado: esta preservação transversal não gera
`spec.md`/`tasks.md` funcional. As tarefas abaixo aplicam rastreabilidade,
consistência e aderência constitucional em escala proporcional.

## Estado inicial e preservação

`EVIDENCIA_IMPLEMENTACAO`: worktree exclusiva `.worktrees/students`, branch
`docs/hf-night-students-20261025`, HEAD/base
`08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, sem alterações locais iniciais.
Os quatro originais estavam ausentes; C1, seus quatro apontadores e os documentos
#27 preservados pela #32 já estavam presentes. Nenhuma alteração alheia foi
incluída. O checkout principal não é alvo de escrita desta autoria.

## Tarefas, ordem e critérios de conclusão

- [x] C01 — Conferir estado inicial, regras, fontes originais e C1.
- [x] C02 — Restaurar os quatro arquivos ausentes por bytes brutos; registrar
  blob, tamanho e SHA-256, preservando o crédito original sem inferir identidade.
- [x] C03 — Confrontar RTH-P2-001/RTH-P2-002 com a base integrada; distinguir
  preparação #28, composição #32 e estados de produto/operação.
- [x] C04 — Documentar entradas sob demanda e proposta faseada de limpeza, com
  consumidores/risco e guardas preservadas.
- [x] C05 — Conferir links, JSON, hashes, escopo, bytes históricos e whitespace;
  solicitar revisão independente do delta antes de qualquer commit/publicação.

## Dependências, riscos e paradas

`PENDENCIA_DE_DECISAO`: o destino futuro das PRs #27/#28 e a limpeza de
configuração dependem do mantenedor e do inventário de consumidores/reruns.
`RECOMENDACAO`: preservar referências por SHA e preparar encerramento futuro
da #28 somente após conferir dependentes, conteúdo único e decisão explícita.
Não executar esse encerramento nesta missão.

QA produz os protocolos detalhados próprios; apenas apontar sua saída depois
de existir. Testes/CI históricos não são execução desta frente. Mudança de
contrato, conflito de autoridade ou operação externa suspende a parte afetada,
mantendo independente o trabalho documental autorizado. Revisão independente
do coordenador antecede commit/publicação; não se presume aceite humano.

## Validação e encerramento

Previstos: identidade binária dos quatro originais, JSON, links relativos,
`git diff --check`, whitelist de paths e inspeção do diff. Testes funcionais,
typecheck, lint e build não são pertinentes ao delta documental e ficam
`NOT_RUN` nesta frente. Os resultados e limitações serão registrados no
[recibo](../../reports/2026-10-25-hf-night-01/students/evidencias.json).
TECH_DECISIONS, DOCUMENT_REGISTER e PENDING_DECISIONS não recebem nova decisão:
a origem é preservação histórica, com inventário local e apontador de contexto.

| Data | Estado | Registro |
|---|---|---|
| 2026-10-25 | `EM_ANDAMENTO` | Baseline limpo e ausência dos quatro originais conferidos; fontes lidas. |
| 2026-10-25 | `EM_ANDAMENTO` | Quatro blobs restaurados com igualdade binária; síntese e checklist em composição. |
| 2026-10-25 | `AGUARDANDO_REVISAO` | Síntese, inventário e apontador concluídos; quatro originais e 206 blobs documentais #27 conferidos. Validação documental PASS; revisão independente do delta ainda pendente. Guarda de branch adicionada pelo coordenador, preservada e discriminada. |

Entrega documental preparada para revisão; sem commit/publicação por esta
autoria. Permanecem fora do fechamento o destino de #27/#28, a proposta de
limpeza, FR-015 na base, QA detalhado, operação, aceites e ciência. Uma revisão
independente posterior deve ser registrada pelo próprio revisor ou coordenador.

IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
