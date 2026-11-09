# Topologia e conteúdo exclusivo — HF-DOC-20261024-LOCAL01

Autoria nativa L-B; inspeção local de24/10/2026 na worktree documental exclusiva. Classes: `EVIDENCIA_IMPLEMENTACAO` para Git/código/configuração inspecionados; `FATO_DOCUMENTADO` para declarações/recibos identificados; `INFERENCIA` para conclusões de cobertura; `RECOMENDACAO` para caminhos futuros. Nenhuma recomendação é decisão de integrar/fechar PR. Não foram alteradas refs, checkouts alheios ou configuração, nem executados app, testes, build, npm ou provedores.

## Identidades e denominadores

| Identidade | SHA completo | Relação observada |
|---|---|---|
| Development observado, B | `c4adfb379e5dc78f27f31b91edbd13f43228d9f9` | Base do checkout documental, da #28 e da #29 |
| Base própria da #27, B27 | `b1f83cfa8e52dd25c6246c584a576553c5e9e131` | Ancestral de B; B tem dois commits posteriores |
| #27, P27 | `223839c9ae91591ded8de387144d8c1ee84b5c20` | Dois commits próprios sobre B27; B...P27 =2/2 |
| #28, P28 | `f56f73fda1d7bd459a1415bf02df25edc9120674` | Dois commits próprios sobre B |
| #29, P29 | `00477e961e36416d8d602d36f7e0ee195c487148` | Doze commits próprios sobre B; árvore `c980346ef3044e0da79d36c42f3cd0da0a4839c2` |
| Revisão dos alunos, A | `d2168c840937a6120e32467f24cb46383e8dcd29` | Descendente de P29; P29...A =0/2 |

Comandos de leitura executados: `git log --graph --oneline --boundary`, `git merge-base <SHA1> <SHA2>`, `git rev-list --left-right --count <SHA1>...<SHA2>`, `git diff --name-only <base> <head>`, `git diff --name-status <base> <head>` e `git show <SHA>:<path>`. A comparação usa nomes completos acima; nenhuma comparação é contra branch móvel.

`EVIDENCIA_IMPLEMENTACAO`: merge-base(P29,P27)=B27; merge-base(P29,P28)=B. P29...P27=14/2 e P29...P28=12/2. PR27 não contém B; inferir sua cobertura por diff de árvores B→P27 inclui reversões aparentes do que B acrescentou. Seu delta próprio B27→P27 tem208 paths; B→P27 tem220. Os12 paths extras são divergência de base, não doze entregas próprias novas.

`EVIDENCIA_IMPLEMENTACAO`: os deltas próprios de P27 e P28 não compartilham paths. P27 e P29 compartilham apenas `.github/workflows/rc-review.yml` e `vercel.json`; P28 e P29 compartilham três paths canônicos listados abaixo. Esse denominador confirma a afirmação dos alunos sobre #27/#28 e evita transformar uma comparação de árvores em atribuição autoral errada.

## Mapa por grupos e exclusividade

“Exclusivo” significa path alterado/criado no delta próprio e ausente do delta próprio de P29. Não significa funcionalidade inexistente no produto. “Coberto” significa assunto tratado pela execução29, sem igualdade de bytes, de ambiente, de conclusão causal ou de aceite humano.

| Grupo | Paths no delta próprio | Exclusividade / cobertura por P29 |
|---|---:|---|
| P27: `docs/releases/2026-10-21-post-consolidation/**` |205 | Todos fora do delta de29; pacote histórico próprio e não descartável por inferência |
| P27: `docs/plans/active/pos-consolidacao-execucao-20261021.md` |1 | Plano/retomada da missão anterior, exclusivo |
| P27: workflow e Vercel |2 | Mesmos paths de29, entradas de branch diferentes, conflitos textuais reais |
| P28: três apontadores canônicos |3 | Sobreposição textual com29; a preparação e a execução têm tempos/estados diferentes |
| P28: cinco paths de preparação abaixo |5 | Exclusivos como paths; preparação da investigação está semanticamente sucedida pela execução29 |
| P29: `docs/releases/2026-10-23-hf-inv-local01/**` |68 | Recibos/protocolos/limites próprios; não substituem por identidade o corpus27 |
| P29: `scripts/hf-inv-nav4-*` |4 | Instrumentos investigativos novos |
| P29: `tests/investigations/**` |11 | Instrumentos/apoios novos; fora dos globs usuais |
| P29: apontadores/plano/runbook/workflow/Vercel |8 | Sete paths listados abaixo maisVercel; não há patch de produto |
| Alunos após29 |6 | Só documentação; inventário no final |

### #27: conteúdo exclusivo material

Os oito documentos de `docs/releases/2026-10-21-post-consolidation/` são: `readme.md`, `final-report.md`, `backend-ci.md`, `backend-database.md`, `frontend-ci-inspection.md`, `frontend-ux.md`, `independent-review.md` e `operational-readiness.md`. Somados ao plano exclusivo acima, guardam fechamento/retomada da missão, execuções complementares Linux, estado operacional e recomendações de gates que29 não reexecuta.

Os197 paths em `docs/releases/2026-10-21-post-consolidation/evidence/` formam estes grupos exatos, conferidos por inventário Git:

| Grupo relativo a evidence/ | Quantidade | Conteúdo exclusivo e limite |
|---|---:|---|
| `frontend-ci/**` |109 | Capturas/metadata e manifestos da candidata oficial anterior; não são as novas capturas locais29 |
| `frontend-nav4/**` |23 | FAILs e sondas históricas preservados;29 usa proveniência/contraprovas, sem apagar esses bytes |
| `frontend-public/**` |45 | Evidência pública/visual e inspeção próprias do recorte anterior |
| `backend-ci-131ade3.json` |1 | Recibo CI de131ade3, não do head223839c9 |
| `backend-covers-results.txt`, `backend-ihfr-results.txt`, `backend-migration-results.txt`, `backend-unit-results.txt` |4 | Resultados sintéticos locais daquela execução, não PASS desta missão |
| `backend-execution.json`, `backend-historical.json`, `backend-migrations-source.json`, `backend-review-operations.json`, `backend-synthetic-recovery.json`, `backend-upload-provenance.json` |6 | Fontes/reconstruções/restore e limites materiais |
| `frontend-unit-direct.json`, `frontend-unit-direct.log`, `frontend-unit-launcher.log` |3 | Lançamento direto e diagnósticos de ambiente anteriores |
| `operations-final-verification.json`, `operations-resumption-verification.json`, `operations-vercel-metadata.json` |3 | Snapshot operacional; não prova ambiente atual |
| `preflight.json`, `publication-receipt.json`, `recovery-receipt.json` |3 | Proveniência, publicação e recuperação do pacote anterior |
| Total |197 | Escopo fechado do inventário |

`FATO_DOCUMENTADO`: [backend-database.md emP27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/backend-database.md) relata um dump/restore sintético real e coincidência de contagens/históricos, mas FAIL da igualdade textual de oito CHECKs e ausência de prova de equivalência semântica total, ACLs/roles/PITR e restore hospedado. A #29 não executa outra recuperação para substituir essa evidência.

`FATO_DOCUMENTADO`: [operational-readiness.md emP27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/operational-readiness.md) registra snapshot Vercel, páginas públicas acessadas via proteção, worker recusado503 e ausência de configuração material de contas/mail/Cloudinary naquele momento. HTTP200 da proteção não é sessão de participante; ausência de configuração não é homologação de capas off. A #29 não faz operação hospedada para atualizar esse snapshot.

`INFERENCIA`: esses grupos são materialmente únicos como evidência e devem ser preservados mesmo se o mantenedor escolher não integrar a branch inteira. O corpus29 cobre parte dos incidentes por novas provas, mas não cobre a recuperação e a operação que27 registra, nem aceita riscos G1–G5.

### #28: cinco paths exclusivos e três sobrepostos

Exclusivos como paths no delta próprio, todos emP28:

- `docs/plans/active/investigacoes-intermitentes-20261023/plano-de-execucao.md`;
- `docs/plans/active/investigacoes-intermitentes-20261023/preparacao-evidencias.json`;
- `docs/plans/active/investigacoes-intermitentes-20261023/prompt-de-execucao.md`;
- `docs/plans/active/pos-consolidacao-frontend-20261021/plano-de-execucao.md`;
- `docs/releases/2026-10-21-frontend-rc/prompt-pos-consolidacao.md`.

Sobrepostos com29: `PROJECT_CONTEXT.md`, `docs/governance/DOCUMENT_REGISTER.md` e `docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md`.

`FATO_DOCUMENTADO`: [preparacao-evidencias.json emP28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/preparacao-evidencias.json) mantém snapshot original `finalReviewObserved:running` e `investigationExecution:NAO_INICIADO`, mas acrescenta `finalReviewUpdate` com conclusão da revisão27 no head223839c9. [plano-de-execucao.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/plano-de-execucao.md) preserva autoridade e protocolo para o executor seguinte. Esses estados são temporais, não conflitos de autoridade resolvidos por apagar o registro antigo.

`INFERENCIA`: o objetivo executável da preparação foi coberto pela missão29 e sua execução local, mas os cinco paths e a origem da preparação não estão automaticamente incorporados no checkout29. “Preparação sucedida” é uma leitura de sequência de trabalho; não autoriza excluir histórico, fechar28 ou declarar todos os incidentes resolvidos.

### #29: conteúdo novo e limites

Além dos68 paths do release investigativo, os outros23 são:

- `.github/workflows/rc-review.yml`;
- `PROJECT_CONTEXT.md`;
- `docs/governance/DOCUMENT_REGISTER.md`;
- `docs/operations/rc-review-ci-runbook.md`;
- `docs/plans/active/investigacoes-intermitentes-20261023/execucao-local-multiagente.md`;
- `docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md`;
- `docs/releases/2026-10-21-frontend-rc/triagem-historicos.md`;
- `vercel.json`;
- `scripts/hf-inv-nav4-browser-version.mjs`, `scripts/hf-inv-nav4-local.ps1`, `scripts/hf-inv-nav4-probe.ts`, `scripts/hf-inv-nav4-verify.mjs`;
- `tests/investigations/ihfr/two-request-quota.test.ts` (AreaCoverService.initiate/FakeCoverProvider: INV-002 de CAPAS; o diretório não torna esse teste evidência IHFR);
- `tests/investigations/nav4/closed-reporter.ts`;
- `tests/investigations/navigation/authenticated.config.ts`, `authenticated.spec.ts`, `closed-reporter.ts`, `copy-postgres.mjs`, `prepare.mjs`, `run-authenticated.ps1`, `run-public.mjs`, `summarize-authenticated.mjs`, `summarize-public.mjs` no mesmo diretório.

`EVIDENCIA_IMPLEMENTACAO`: `git diff B P29 -- src prisma package.json package-lock.json` é vazio; os mesmos grupos são vazios no delta próprio27 e28. Logo29 acrescenta instrumentos, evidências, apontadores e duas entradas de configuração; não implementa novamente capacidades006–009 ou CRI que já estão emB.

`FATO_DOCUMENTADO`: [final-report.md emP29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/final-report.md) e [incident-matrix.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/incident-matrix.md) distinguem NAV4 atual demonstrado de causas históricas não encerradas; INV-001–005/NAV-SETTLE/OBS não se tornam defeitos corrigidos apenas por novos PASS. A errata de classificação HTTP conserva recibos originais e distingue GET de rota, RSC e documento. A linha investigativa não equivale a regressão padrão.

IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Simulações merge-tree revalidadas

As três chamadas iniciais no sandbox terminaram com exit128: object store compartilhado fora da raiz gravável, sem árvore produzida. Foi solicitada e obtida escalada estritamente para objetos Git temporários do `merge-tree --write-tree`; a repetição foi executada sequencialmente e não atualizou índice/ref/checkout. As árvores de conflito são objetos de simulação, não candidatas prontas.

| Comando executado | Exit | Árvore resultante | Paths conflitantes |
|---|---:|---|---|
| `git merge-tree --write-tree c4adfb379e5dc78f27f31b91edbd13f43228d9f9 00477e961e36416d8d602d36f7e0ee195c487148` |0 | `c980346ef3044e0da79d36c42f3cd0da0a4839c2` | Nenhum; igual à árvore P29 |
| `git merge-tree --write-tree 00477e961e36416d8d602d36f7e0ee195c487148 f56f73fda1d7bd459a1415bf02df25edc9120674` |1 | `f6a3ec6b2f18fe86f2cf0c12d9448b264be301f9` | `PROJECT_CONTEXT.md`; `docs/governance/DOCUMENT_REGISTER.md`; `docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md` |
| `git merge-tree --write-tree 00477e961e36416d8d602d36f7e0ee195c487148 223839c9ae91591ded8de387144d8c1ee84b5c20` |1 | `f21502b736183de63f8f9b4dc0fba153ddb067ed` | `.github/workflows/rc-review.yml`; `vercel.json` |

Exit0 prova composição textual neste par fixo; não prova mérito, execução, ciência, autorização de deploy ou decisão humana de merge. Exit1 prova conflito textual, não impossibilidade de preservar ambos os conteúdos. Não foi executado merge real.

## Conflitos textuais, semânticos e dependências

| Recorte | Tipo | Evidência / condição material |
|---|---|---|
| P29+P28 | Textual | Três apontadores canônicos evoluídos em paralelo; resolver preservando preparação e execução por data/SHA |
| P29+P27 | Textual | Mesmo ponto de workflow/Vercel ganha branches distintas; preservar todos os guards necessários |
| P28→P29 | Semântico temporal | NAO_INICIADO/running originais não descrevem execução posterior; adendos específicos e timelines resolvem a cronologia sem falsificar o snapshot |
| P27→P29 | Semântico de evidência | CI131ade3, CI223839c9 NOT_RUN, CI00477e9 e execuções locais são quatro atribuições distintas |
| Todos | Dependência de operação | G1/G3/G4/G5 pendentes não proíbem consolidar documentação independente; impedem conclusões operacionais que dependem dessas provas |
| Todos | Dependência de ciência | Nenhum aceite técnico/investigativo encerra validação científica do IHFR |
| Alunos→LOCAL | Semântico de autorização | Sua recomendação de “remover ou generalizar” workflow/Vercel não autoriza remover contenção de deploy; tratar filtros de CI e `enabled:false` separadamente |

`FATO_DOCUMENTADO`, timeline consultada pelo coordenador nesta missão: as três PRs tinham zero formal review submissions; comentários automáticos não equivalem a APPROVED humano. [Resumo27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6329614420) foi atualizado para completed em223839c9; [adendo27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6375179339) corrige o running histórico. [Comentário28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28#issuecomment-6359764701) confirma headf56f73f e conclusão da revisão27; [reconciliação28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28#issuecomment-6374225844) distingue execução posterior. [Resumo29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375564800) refere completed00477e9; [reciboCI29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375857925) atribui quinzePASS ao run40030207450/attempt1/job120676307853. Esses recibos foram consultados; não executados novamente por L-B.

## Recomendações para decisão do mantenedor

`RECOMENDACAO` principal: usar P29 como referência documental imediata do estado investigativo atual, manter a reconciliação Code-First em branch própria e submeter qualquer incorporação das PRs à decisão humana por SHA. Havendo escolha de integração, a ordem proposta é avaliar29 primeiro e tratar27/28 separadamente. Motivo:29 está adiante deB, tem composição textual limpa comB e agrega execução atual; misturar seus recibos com preparação28 ou com o pacote27 tornaria a atribuição de evidências ambígua. Esta recomendação não realiza nem aprova integração ou fechamento.

| Item | Caminho principal recomendado | Alternativa | Condições / efeitos / reversão |
|---|---|---|---|
| #29 | Referenciar/consolidar sua execução e limites antes de derivar novo backlog | Manter sem integrar e citar blobs imutáveis deP29 | Decisão humana e drift de base/head reavaliados; novo SHA requer validação aplicável. Até integrar, documentação independente pode prosseguir. Reversão documental por commit normal, preservando proveniência |
| #28 | Preservar origem/protocolo e marcar por adendo que a preparação foi sucedida; reaproveitar só conteúdo material ainda único | Integrar a branch por decisão própria, resolvendo três conflitos com cronologia explícita | Cinco paths exclusivos continuam inspecionáveis porP28; “sucedida” não significa fechar PR nem apagar esses arquivos. Extração precisa de diff por conteúdo, links/identidade e validação documental. Reversão do adendo por commit, sem reescrever história |
| #27 | Preservar pacote205 e plano como evidência própria; avaliar necessidade documental separada dos gates de operação | Integrar o pacote inteiro após decisão humana, reconciliando workflow/Vercel e base divergente | CI131ade3 não é CI223839c9; G1–G5 permanecem em seus estados. Não exigir homologação operacional para arquivar documentos independentes. Extração/integração cria SHA novo. Reversão de documentação/configuração por commit, sem alegar restaurar dados/provedor |
| Configuração | Manter `development:false` e contenções existentes de deployment Git; tratar eventual limpeza de filtros temporários de CI em recorte separado | Conservar também filtros de CI até encerrar reruns, com owner explícito | Não generalizar/remover bloqueios Vercel como “higiene”. Bloqueio da branchLOCAL não existe emB; publicaçãoLOCAL segue bloqueada e a tarefa não autoriza corrigir config. Reversão de config requer revisão de efeito de deploy; não executar nesta missão |
| Instrumentos | Manter protocolos sob demanda com limites e owner/custo | Promover subconjunto estável a regressão oficial, por feature própria | Fora dos globs atuais; requer contrato, determinismo, fixtures/guard e validação próprios. Reverter seleção futura não deve apagar recibos negativos |

`INFERENCIA`: publicação documental pode acionar Vercel mesmo sem mudança funcional; o [histórico28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28#issuecomment-6358788903) é evidência concreta do risco. A restriçãoLOCAL continua material. Nada nesta recomendação modifica as regras do projeto para publicar este pacote.

## Delta da revisão dos alunos depois da #29

`EVIDENCIA_IMPLEMENTACAO`: `git diff --name-status P29 A` retornou exatamente:

| Estado | Path | Efeito material |
|---|---|---|
| M | `PROJECT_CONTEXT.md` | Adendo da revisão e recomendação de sequência; não atualiza produto |
| M | `docs/governance/DOCUMENT_REGISTER.md` | Registro dos novos documentos e limites |
| A | `docs/plans/active/revisao-thales-20261024.md` | Plano transversal da revisão |
| A | `docs/reviews/20261024-revisao-thales/evidencias.json` | Recibos/SHAs/gates/simulações daquela revisão |
| A | `docs/reviews/20261024-revisao-thales/proximos-passos.md` | Recomendação de continuidade porThales |
| A | `docs/reviews/20261024-revisao-thales/relatorio-de-revisao.md` | Achados/parecer técnico e limites |

Commits novos: `1c36174` (revisão/handoff) e `d2168c8` (alinhamento de nome da branch). Não há delta novo em `src/**`, schema/migrations, testes, dependências, workflow ouVercel depoisP29. Seus unitários/typecheck/lint/build relatados não viram execuçãoLOCAL; sua nova documentação não herda automaticamente os quinze gates do SHA00477e9.

`RECOMENDACAO`: aproveitar o achado documental P2 e a distinção entre técnico/humano/operacional/científico. Delimitar a sugestão ampla de higiene: filtros deCI são distintos de bloqueio de deploy; preservar `false` necessário. A proposta de sequência dos alunos continua recomendação e não torna o merge29 pré-condição da reconciliação documental independente autorizada nesta missão.

## Verificação e limites desta autoria

Simulações executadas conforme tabela; status/diffs e inventários Git conferidos porSHA. Paths de fontes dos fragmentos validados com `git cat-file -e`; testes/globs/migrations lidos estaticamente. Nenhum script do repositório, app, build, teste ou provedor foi executado. A revisão de links/JSON/whitespace/escopo final é documental, coordenada com o pacoteLOCAL. Pendências humanas/científicas/operacionais permanecem abertas; nenhuma PR foi aprovada, integrada, comentada ou fechada por L-B.
