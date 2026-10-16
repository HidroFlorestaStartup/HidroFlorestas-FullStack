# Correções CRI-REV — evidências da execução de 15/10/2026

EVIDENCIA_IMPLEMENTACAO, ambiente sintético local; não é homologação de provedor,
aprovação humana nem autorização de promoção. Datas dos logs são UTC; mandato
de 15/10 no fuso America/Sao_Paulo. Política A confirmada em [spec.md](spec.md).

## Estado inicial e planejamento

Repositório HidroFlorestaStartup/HidroFlorestas-FullStack; clone dedicado em
`C:/projetos/consolidados/HidroFlorestas-cri-review-20261015`. Baselines remotos e
checkout do IDE preservado em [plan.md](plan.md). Git ls-remote e conector GitHub
confirmaram HEADs/bases/permissão push/PRs abertos. Deploy desabilitado para todas
as quatro branches; workflow restrito a validação. Nenhuma branch auxiliar criada.

Planejamento anterior a código: 0d90254 (spec/plano/tarefas/contrato/runbook),
357f6fbaf679c350623451030a52297f817a9721 (preservação do checklist histórico).
Constituição antes/depois do design PASS; checklist histórico 16/16 e atualização
7/7. Sem hooks. Spec Kit setup-plan/setup-tasks/check-prerequisites executados
via Git Bash com diretório da feature explícito; plano existente preservado.

Node24.19.0/npm12.0.2; npm ci --no-audit --no-fund exit0, 553 pacotes. Prisma7.4.2
gerado exit0. Guias Next locais route.md e image.md consultados antes do código.
Nenhum dotenv/segredo copiado. Harness oficial accounts-local-postgresql.ps1:
ownership/ACL verificados; cluster pré-existente STOPPED, iniciado no loopback55427.
RegressionSetup exit0, 02:44:21.998–02:44:25.766Z de 16/10, 14 migrations locais
verificadas, sem migração pendente. Bancos exclusivamente sintéticos e próprios.

## RED antes da implementação

HEAD 357f6fb, código original e diff somente de testes/fixture. Snapshot oficial
`89febb880b7f469445e0bcf3a0ee95aa3f3bcf7d1fcdaf9305e2c8e13e391519`.
Coletor temporário ignorado em .accounts-validation/focal.ts chama os runners e
preflight/redactor oficiais sem alterar guards. Logs locais e JSONL sanitizados
preservados; o coletor não é parte do produto.

| Comando pelo harness Run/Regression | UTC início–fim (16/10) | Exit | Resultado |
|---|---|---:|---|
| node --import=tsx .accounts-validation/focal.ts cri-red-integration integration | 02:44:36.432–02:44:48.030 | 1 | 22 testes: 17 PASS / 5 FAIL |
| node --import=tsx .accounts-validation/focal.ts cri-red-e2e e2e | 02:44:59.461–02:45:16.917 | 1 | 1 FAIL / 4 não executados por serialidade existente |

Recusas stale/quota horária/ativa ainda incrementam presetCalls (1≠0, 11≠10,
5≠4). Dois testes demonstram ausência de featureEnabled no DTO. E2E falha pela
mensagem de desabilitação inexistente, timeout original5000ms. Os testes de
revogação/concorrência já passam e protegem a segunda validação existente.
Assertions/guards/timeouts não foram reduzidos. O RED serial não equivale à
execução dos quatro casos seguintes; serão exigidos no GREEN.

## GREEN, regressão, revisão e publicação

RED Unit adicional antes de código: accounts-validation.ps1 -Gate Unit,
02:45:44.613–02:45:52.037Z, exit1. A lista também não expõe disponibilidade;
assertion falhou com featureEnabled ausente. Snapshot
`5c0f31fb6c2869d21aeecae57d7315a5d14ded6eccebc1275b8109d61158d86a`.
Correção de caminho no plano: consumidor da lista é
src/components/areas/area-list.tsx, com AreaSummaryDto e serializer area.contracts.ts.

Ainda em execução; resultados serão acrescentados após os respectivos gates.
Aprovação humana de CRI-REV-003/004 permanece pendente; não há APPROVED do agente.

Primeiro GREEN focal, antes dos casos adicionais de revisão: integração23/23,
02:47:05.384–02:47:16.039Z, exit0; E2E5/5, 02:47:27.831–02:47:41.795Z, exit0.
Snapshot `1c49bef280aa7053948c2ad81155fbe1640a608a215692f3de5b5189836f9eea`.
Os mesmos casos RED passaram sem reduzir assertion/guard/timeout; um teste extra
de validação de configuração passou no GREEN. Mail/unit e integração gerais
foram então executados com os novos casos de quota horária concorrente/replay/
P2034/P2002/HTTP: snapshot
`53a4cfed410d842e5ab4a05bf1dd8b67a42f3cb98b6fa2994f440cb8f2e0492d`.

Primeira regressão: Unit PASS exit0, 02:48:15.292–02:48:25.359Z; Integration
206 PASS/1 FAIL, exit1, 02:48:25.667–02:52:08.845Z. Falha fora do diff em
ihfr-diagnosis-concurrency.test.ts: REPLACE distinct keys esperava STATE_CONFLICT,
recebeu P2028. Todos os novos testes CRI-REV passaram. O runner parou e preservou
dados, sem inferir PASS dos gates posteriores. INFERENCIA: pressão de I/O das
instalações simultâneas nos três worktrees pode ter contribuído ao timeout;
causa não demonstrada. Repetição da suíte integral sem instalações simultâneas
solicitada, sem mudança de código, assertions, guards ou timeouts.

Os npm ci dos três worktrees concluíram exit0/553 pacotes; prisma generate
subsequente falhou por ENOTFOUND binaries.prisma.sh. Nenhuma dependência ou
lockfile foi alterado para contornar isso; a recuperação será registrada adiante.

## Revisão adversarial do diff funcional

Revisão pelo executor, sem atribuir independência ou aprovação de estudante.
Hipóteses verificadas por leitura do diff e testes reais PostgreSQL/fake:

| Risco | Evidência/resultado |
|---|---|
| Flag conceder acesso | canEdit permanece contextual; OWNER/ADMIN/MEMBER, externo e lab inativo cobertos; autorização precede disponibilidade |
| Expor configurações | settings compartilhado só valida offline; DTO exato permite boolean e metadados públicos; HTTP não revela nomes/segredos |
| Falha aberta desligado | initiate/confirm/remove/content recusam antes de provider; referência/revisão/jobs anteriores idênticos |
| Corrida preflight/criação | ambas as transações reutilizam eligibleUpload; barreira permite alterar role/vínculo/lab/conta/revisão antes do segundo gate |
| Replay restaurar asset/reabrir quota | replay mantém tentativa/ticket/prazo e preset; precedência existente sobre revisão/quota; não cria jobs |
| Quota exceder por concorrência | corridas active e hourly com barreiras; segundo ator tem quota própria |
| Erro serializável duplicar I/O/jobs | P2034/P2002 injetados antes de cada commit; rollback Pg real, retries sem repetir preset nem criar órfãos |
| Preset falho/mudado | falha não cria AreaCover/tentativa/jobs; hash divergente de replay preserva registros |
| Referência/cleanup/ownership | código de cleanup/prove/validação final inalterado; regressores preservam atual, estrangeiros, EXIF e uploader excluído |
| UI ou lista buscar bytes desligado | DTO aditivo de detail/confirm e resumo de lista; Preview exige disponibilidade explícita; E2E verifica zero GETs e retorno na mesma revisão |
| Compatibilidade | contratos HTTP, chaves/revisões/quotas e validação anterior preservados; clientes antigos ignoram boolean aditivo; novo cliente falha fechado com DTO antigo |

Sem achado material conhecido no diff após esses controles. Build/typecheck,
regressão final e revisão humana ainda exigem resultados próprios.

## Regressão concluída na origem

16/10/2026 UTC, HEAD-base 357f6fbaf679c350623451030a52297f817a9721 mais diff
funcional registrado no manifesto. Snapshot final
`53a4cfed410d842e5ab4a05bf1dd8b67a42f3cb98b6fa2994f440cb8f2e0492d`.
Repetição da integração 02:58:33.499–02:59:53.241Z: 207/207 PASS exit0, sem
nenhuma alteração entre FAIL e rerun. Demais gates terminaram 03:05:20.506Z.
O FAIL inicial permanece documentado e não foi convertido em PASS retroativo.

| Gate | Resultado final (exit0) |
|---|---|
| Unit/Mail | 291/291 + 17/17 |
| Integration | 207/207, incluindo 20 casos novos |
| Migration / Contract | 37/37 / 6/6 |
| R1 | 17/17, subconjunto já contado em outras suítes |
| Build / Typecheck | PASS |
| Lint | 0 erros, 3 avisos preexistentes |
| E2E geral | 72/72 |
| HTTPS / Deletion / IHFR local | 2/2 / 3/3 / 6/6 |
| Bootstrap | 14 migrations, zero falhas, transação sintética revertida |
| SchemaAudit | zero schemas gerenciados residuais |

[Registros com UTC, comandos, exit codes, hashes e resumos](cri-rev-20261015-evidence/validation-records.json),
[manifesto funcional](cri-rev-20261015-evidence/functional-manifest.json),
[RED integração](cri-rev-20261015-evidence/red-integration.txt),
[RED navegador](cri-rev-20261015-evidence/red-e2e.txt),
[FAIL inicial da regressão](cri-rev-20261015-evidence/regression-initial-failure.txt).
Bundle cliente inspecionado: sem identificadores CLOUDINARY de configuração.
Diff check PASS; AGENTS/instruções, migrations e docs/raw sem alteração.
Cluster voltou STOPPED, dados preservados. Nenhuma operação de provedor real.

Recuperação de setup nos três worktrees: cópia do schema-engine-windows.exe
da mesma instalação Prisma7.4.2 local, SHA256
`ea573556bf8a813f9921fdc313e7bd37cefc8e77e973bd2252f41a275c231083`.
Prisma generate executado com caminho local explícito exit0 em todos, depois
removido o override de processo. Sem modificar lockfile, guards ou configurações.
Instruções AGENTS/PLANS/constituição são idênticas nas quatro branches.

Pendentes nesta etapa: publicação na origem, merges autorizados, revalidação da
RC com dependências99d8363 e checks nos HEADs finais. Aprovação humana permanece aberta.

Commit funcional d93124e21974c0e571ad30f28fd04010a399e757. Antes do push,
normalizados somente espaços finais das três cópias textuais de evidência para
git diff --check; logs originais/JSONL e seus hashes continuam preservados em
.accounts-validation. Conteúdo de assertions, erros, contagens e tempos intacto.

## CI reprovado e convergência adicional

Push inicial origem036f54a529b5097c3b8c787b7e598a8af3c76a44 confirmado por
ls-remote e PR4. Audit98d8aaca7e3938fed60677c54b14846d4e234c2f publicado após
merge limpo, igualdade funcional com origem e typegen/typecheck PASS.
RC merge local b842b292bc4cd2580770abda408d6be16eb17a92, ainda sem push.

[Run origem38843869327](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38843869327)
FAIL: Integration205/207, falhas de quota ativa/horária concorrente em473/820ms;
rejeição INTERNAL_ERROR, esperado RATE_LIMITED. Unit e setup PASS; gates posteriores
não executados. Artefato12022396819 baixado para inspeção; sem suprimir FAIL.
Run audit38843986244 também FAIL. T039/T040 adicionadas ao plano antes da correção
adicional. Os PASSs locais não validam esses HEADs no ambiente do CI.
