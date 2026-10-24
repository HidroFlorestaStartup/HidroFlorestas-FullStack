# Instrumentos e configuração — LOCAL01

Classificação das constatações de código: `EVIDENCIA_IMPLEMENTACAO`, inspeção estática.
Comandos abaixo foram **lidos, não executados**. Nenhuma orientação autoriza runtime nesta missão.

## Seleção real das suítes

Fontes imutáveis da base: [package.json](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/package.json),
[runner](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/scripts/imp006-test-runner.ts) e
[Playwright](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/playwright.config.ts).

| Entrada existente | Seleção efetiva | Limite |
|---|---|---|
| `npm run test:unit` | `tests/unit/*.test.ts`, `tests/unit/*.test.tsx`; depois `test:mail:unit` | Não seleciona investigations |
| `npm run test:mail:unit` | `tests/mail/*.test.ts`, condições react-server, concorrência 1 | Não prova SMTP real |
| `npm run test:integration` | runner integration → `tests/integration/*.test.ts`, react-server e concorrência 1 | Preflight readonly não torna os testes readonly; schemas podem receber escrita |
| `npm run test:contract` / `test:migration` | runner → `tests/contract/*.test.ts` / `tests/migration/*.test.ts` | Banco/fixtures isolados exigidos conforme runner |
| `npm run test:e2e` | Playwright `testDir: ./tests/e2e`, exclusões condicionais para specs com runners próprios | Não coleta automaticamente `tests/investigations/**`; usa dotenv e pode iniciar Next |
| `npm run test:e2e:ihfr` / `test:e2e:ihfr:full-ui` | runners dedicados `scripts/imp006-local-e2e.ts` / `imp006-full-ui-e2e.ts` | Fixtures, banco, sessão e servidor próprios; não são apenas leitores |
| `npm run test:e2e:https` | `tests/e2e/run-auth-https.mjs` | Certificados e servidor próprios; não é prova do destino hospedado |
| `npm run test:mail:r1` | mail-outbox e mail-smtp, nome R1 | Subconjunto; não somar novamente à contagem global |

Não há script npm denominado `test:investigations`. O glob de integração não cobre diretórios irmãos. A presença de reporter de NAV4 no diretório investigativo não transforma a suíte usual em execução desse protocolo.

## Instrumentos sob demanda da candidata

Todos os links desta seção fixam `00477e961e36416d8d602d36f7e0ee195c487148`, que é fonte separada e não development.

| Instrumento e comando existente | Pré-condições e efeitos reais | Evidência consultada |
|---|---|---|
| [NAV4 wrapper](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/scripts/hf-inv-nav4-local.ps1): `./scripts/hf-inv-nav4-local.ps1 -Phase Prepare`, depois fases Probe/Origin/Back/Navigation/Audit/Stop | Exige runtime exclusivo irmão, marker de missão/owner/root, ausência de dotenv e sem redirecionamento. Prepare gera Prisma e provisiona regressão; demais fases podem iniciar browser/servidor/PostgreSQL e criar dados sintéticos. Não copiar valores nem markers antigos. | [protocolo NAV4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/nav4/protocol.md) e [resultados](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/nav4/readme.md) |
| [Navegação pública](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/investigations/navigation/run-public.mjs): `node tests/investigations/navigation/run-public.mjs` | Inicia Next em loopback3200 e Chromium; sem banco/sessão. Cria diretórios/evidências, usa allowlist de ambiente, recusa dotenv, controla rede e encerra sua árvore de processos. Aquecimento de readiness limita alegação de servidor frio. | [protocolo C](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/navigation/protocol.md) |
| [Wrapper autenticado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/investigations/navigation/run-authenticated.ps1): `./tests/investigations/navigation/run-authenticated.ps1 -Phase Stage`, Prepare/Run/Audit/Stop | Windows, ACL privada e marker próprio; altera ambiente do processo, usa PostgreSQL sintético e chaves efêmeras. Config dedicada seleciona dois specs de mapa e authenticated.spec, mantendo workers/retries/guards do original. Não reutilizar clusters ou sessões. | [config dedicada](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/investigations/navigation/authenticated.config.ts), [relatório](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/navigation/report.md) |
| [Duas chamadas/quota](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/investigations/ihfr/two-request-quota.test.ts): seleção direta Node `--import=tsx --test --test-concurrency=1 tests/investigations/ihfr/two-request-quota.test.ts` em runner isolado autorizado | É teste do serviço **de capas**, apesar do diretório ihfr; usa AreaCoverService, FakeCoverProvider e fixtures IHFR. Dois schedules espelhados; escreve schemas sintéticos, espera 9/36→10/40 e um RATE_LIMITED/um sucesso. O trecho é seleção existente, não receita autossuficiente de provisionamento. | [protocolo B](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/ihfr/protocol.md) |
| [Verificador NAV4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/scripts/hf-inv-nav4-verify.mjs): `node scripts/hf-inv-nav4-verify.mjs` | Verifica bytes/fontes/links do pacote NAV4; flag `--write-manifest` altera o manifesto. Não é ensaio de produto, nem verificador geral desta missão. Não foi executado aqui. | Código do verificador e manifesto da candidata |

`RECOMENDACAO`: manter os diagnósticos sob demanda, com runbooks versionados e preflight exclusivo. Motivo: possuem recursos/efeitos e limites causais distintos dos gates usuais. Alternativa relevante: promover somente casos determinísticos e independentes da máquina a uma futura suíte suportada. Condições: owner explicitamente designado, orçamento/tempo, isolamento, negativos, teardown e revisão da seleção. Efeito: preservar reprodutibilidade sem prometer cobertura recorrente que não existe. Reversão: se o subconjunto gerar instabilidade ou custo não aceito, retirá-lo por commit normal da seleção automática, preservando instrumentos e recibos. Esta missão não conecta nada à CI.

## Filtros temporários versus contenção de deployment

A [base Vercel](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/vercel.json) possui 23 regras false por branch, incluindo development; não inclui `docs/hf-doc-local01-20261024`. O [workflow base](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/.github/workflows/rc-review.yml) possui filtros push e if explícitos, workflow_dispatch e nenhuma ativação por PR nesse arquivo; única workflow rastreada encontrada. Configuração remota de provedores não foi revalidada.

Na [candidata workflow](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/.github/workflows/rc-review.yml) há a inclusão específica de `fix/investigacoes-intermitentes-20261023-local01` em push/if; na [candidata Vercel](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/vercel.json), sua regra false é adicionada às 23 anteriores. #27 tem sua inclusão própria, com conflito textual quando composta com #29; ver topologia.

`RECOMENDACAO`: avaliar a limpeza dos filtros temporários da CI apenas após a última necessidade de rerun; **conservar separadamente as regras false da Vercel enquanto houver risco de novas escritas**. Motivo: remover uma seleção de teste não contém deploy; remover uma regra false pode reativá-lo. Alternativa: futura política global de deployment explicitamente aprovada e comprovada. Condições: inventário de branches/consumidores, autorização específica, prova do comportamento de Git deployment e novo SHA revisado. Efeito: reduz configuração obsoleta sem perder contenção. Reversão: restaurar regra/filtro por commit normal e interromper publicação se a contenção deixar de ser comprovável. A recomendação ampla dos alunos de remover/generalizar entradas não deve ser aplicada indistintamente aos dois mecanismos.

## Gate desta publicação

Estado: `PUBLICACAO_BLOQUEADA_POR_GATILHO`. Não existe contenção já comprovada para a branch nova; o mandato exige parar somente esta parte. Histórico de [Preview automático #28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28#issuecomment-6358788903) reforça o risco; não é uma consulta nova ao Vercel. Conta GitHub observada HidroFlorestaStartup com permissão admin via leitura; permissão não equivale a autorização de deploy. Busca exata da própria branch nas PRs não encontrou PR. Sem push/ref remoto/PR/comentário ou solicitação remota de review. Draft e skip-ci não comprovariam contenção.

Não foram alterados workflow, hooks, secrets, vercel.json, scripts ou configuração global. Core.hooksPath não apresentou valor; isso não audita hooks externos. O commit local será limitado aos paths documentais e não publica refs.

## Validação própria e fontes históricas

CI funcional/build/runtime desta missão: `NOT_RUN`. Job histórico120676307853 foi consultado pelo conector e suas etapas concluíram success; o [recibo6375857925](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375857925) registra run40030207450/tentativa1/00477e9, 15 gates únicos e ambiente Windows/Node24.19/PostgreSQL sintético. Não foi baixado novamente o artifact nem revalidado seu digest nesta missão; não transferir PASS para development ou para o commit documental.

G3–G5 e aceites humanos permanecem dependentes de suas próprias provas; [handoff histórico](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/operational-handoff.md) e [prontidão #27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/operational-readiness.md) não são inventários operacionais atuais.
IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
