# CRI-REV-005 — evidências de execução

Data de referência: 2026-10-17. Classificação dos resultados observados:
`EVIDENCIA_IMPLEMENTACAO`. Estado: EM_ANDAMENTO; revisão humana pendente.

## Reconciliação inicial

Remote: `https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git`.
Worktrees existentes, todos inicialmente limpos, preservados:

| Branch | HEAD local inicial | HEAD remoto após fetch |
|---|---|---|
| review/016-area-covers | 0b154ce1ea5b2e528c1c84227880060ce452adf7 | igual |
| review/cri-audit-20261010 | 3a514097ed027a9af4f286ff7fcf5b2d2277588d | igual |
| release/cri-rc-20261010 | c629e749692ec54ad27b223dc344b86749b73485 | 832560ac0e2b9a50671b871f077472685b1af963 |
| review/cri-rc-validation-20261012 | dc180cb258f9c9fe543a7a5815ab81ea21f8ae93 | igual |

O checkout original em `C:/projetos/ifma/HidroFlorestas-FullStack` está em
`main`, com quatro arquivos não rastreados preexistentes, inclusive o pacote.
Nenhum deles será incorporado, removido ou alterado. Nenhuma branch/worktree nova.

Pacote encontrado na raiz desse checkout original:
`hidrofloresta-cri-rev-005-patch.zip`, SHA256
`86b32ee0517e8d0c0d54923f09aaded8eff257e182f44d6f243b351eef5af139`.
Extração inspecionada fora do repositório. O aplicador passou em dry-run no HEAD
da origem, com âncoras únicas nos seis documentos e teste novo ausente.
Os resultados offline do pacote não são evidências de execução Ajv local.

Fontes: pedido atual do usuário; AGENTS.md raiz (único aplicável), PLANS.md,
PROJECT_CONTEXT.md, TECH_DECISIONS.md, constituição e política de fontes;
Spec 003/016; relatório e guia de 17/10 lidos diretamente do commit `832560a`.
Os documentos de 17/10 serão preservados na propagação da RC.
Não há conflito material de autoridade nem decisão de produto nova.

Node `v24.19.0`, Windows, Ajv `8.20.0`, tsx `4.21.0` no worktree real.
Dependências/lockfile não serão atualizados por esta correção. A RC já contém
avanços de dependências que serão preservados e revalidados na sua própria árvore.

## Planejamento e critérios

Aplicar as skills Spec Kit instaladas à feature existente, sem recomeçar artefatos.
setup-plan, setup-tasks e check-prerequisites executados com feature explícita 016.
No Git Bash, os caminhos precisam da forma `/c/...`; uma primeira invocação com
`C:/...` criou uma cópia isolada do template em diretório incorreto, removida após
conferir o caminho e conteúdo. A nova execução localizou os artefatos corretos.
Sem extensions.yml/hooks; checklist de requisitos existente completo (23/23).
Constituição antes/depois do design: PASS, sem alteração científica ou persistida.

`--plan-only` prepara spec.md/plan.md/tasks.md. Commit de planejamento antes do
teste `--red`. Aceite: RED Ajv acusa `additionalProperties/cover` com YAML antigo;
GREEN dos mesmos cenários após `--apply`, sem remover assertions/guards.
`cover` obrigatório somente na listagem; detalhe continua com projeção separada.
Preservar serializer, serviço, UI, Prisma, dependências, workflows e configuração.

Gates: Unit/Contract/Typecheck/Lint/Build, integração e concorrência de capas,
E2E e demais regressões pelo runner oficial com PostgreSQL sintético próprio.
Revisar campos transversalmente e registrar evidências sanitizadas e hashes.
Publicar origem → audit → RC → validation por merges, conferir os HEADs/checks e
pedir re-review a Pedro/Luciano. Aprovação e resolução de threads são humanas.

Limites: sem merge em development/main, deploy, migration remota, dados reais ou
operação Cloudinary. IHFR permanece CONTRATO_EXPERIMENTAL,
VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
