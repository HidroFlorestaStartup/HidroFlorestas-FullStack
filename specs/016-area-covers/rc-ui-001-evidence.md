# Evidências focais RC-UI-001 — 2026-10-13

EVIDENCIA_IMPLEMENTACAO da execução solicitada pelo usuário. Worktree exclusivo
`C:/projetos/ifma/HidroFlorestas-rc-ui-001`, branch `review/016-area-covers`;
checkout principal em main/beba96f preservado com seus três arquivos não rastreados.
Data civil America/Sao_Paulo; registros técnicos UTC. Não houve merge, deploy,
migration hospedada, envio de e-mail real ou operação real de Cloudinary.

## Preflight e ordem comprovada

README e 01/02/03 do ZIP lidos; fetch confirmou
`dace407e51b5034e69e22055658c651147a7caa3`. Hash-object confirmou componente
`99a6f39062ccaa09de605a5d79020c9f5420fced` e teste
`2c1096182f340107afa00a0926e9d0c794ed2beb`. As três aplicações passaram
git apply --check antes de ocorrerem. Spec Kit setup-plan/setup-tasks e
check-prerequisites executados com feature explícita 016; artefatos existentes
preservados, sem hooks/checklists aplicáveis. Constituição reconferida.

Planejamento commitado antes de qualquer alteração funcional:
[366432a](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/commit/366432acf8a0134e2c1142b64a4d5f6588b3fa42).
Em seguida 02-test.patch → RED → 03-code.patch → GREEN, sem mudar assertions,
timeouts, autorização ou guards. O patch do teste é idêntico ao anexo.

## RED e GREEN

Comando focal: Playwright atual em tests/e2e/area-covers.spec.ts, grep
“reloading a temporarily unavailable cover”, encapsulado em
accounts-local-postgresql.ps1 Run/Regression e coletor focal atual.

| Corte | Intervalo UTC | Resultado |
|---|---|---|
| Teste novo/componente original | 17:28:01.637 → 17:28:19.727 | RED esperado; 1 FAIL; exit 1; imagem não encontrada após mensagem de sucesso |
| Teste idêntico/componente corrigido | 17:28:53.076 → 17:29:00.139 | GREEN; 1 PASS; exit 0 |

Fingerprint RED `9f2804ab4622c01f091c839a719d667f1b478d2772f7dd25e1534517f6211bb4`;
fix `54d45235889147dc573f99f1577c2378f61dda335a230494b97118fa54fdb436`.
São fingerprints dos bytes funcionais do checkout conforme coletor existente;
não são SHAs Git nem prova de equivalência com snapshots históricos.

O cenário real da área usa sessão/contexto PostgreSQL sintético; somente
metadados/conteúdo da capa são interceptados. Asserts comprovam 503→200→503→200,
quatro GETs com revision=1, imagem real naturalWidth>0 nos dois sucessos,
fallback/feedback recuperável após falha e src same-origin. Nenhuma alteração
do campo revision no banco, rota API, schema, migration ou provedor foi usada.
O contador é local; key/src mudam após metadados autorizados; sucesso depende
do onLoad atual, com guarda contra evento antigo. Código server-side inalterado.

## Regressão do fix com dependências originais

Node 24.19.0/npm 12.0.2, Prisma 7.4.2, Next 16.3.6/sharp 0.35.4, PostgreSQL 17
próprio loopback 55427. Sem dotenv copiado; chaves e fixtures sintéticas; SMTP
externo ausente. Instalação limpa pelo lockfile e Prisma generate exit 0.

| Gate | Resultado efetivo |
|---|---|
| Unit/Mail | PASS; 291 Node + 17 Mail |
| Integration | PASS; 187 |
| Migration | PASS; 37 |
| Contract | PASS; 6 |
| Typecheck | PASS |
| Lint | PASS; zero erros e três avisos preexistentes |
| Build padrão | PASS |
| E2E geral | PASS; 68/68 (67 originais + RC-UI-001), incluindo três cenários de capas e três de drafts |
| HTTPS production local | PASS; 2/2; teardown sem fixtures |
| Bootstrap final | PASS; 14 migrations; rollback da escrita e descarte somente do banco sintético próprio |
| SchemaAudit | PASS; zero schemas candidatos |

Todos esses gates usam o fingerprint do fix acima. Registros, comandos, UTC,
duração, exit code e hashes dos logs estão no
[JSON da sessão](rc-ui-001-evidence/validation-records.json). Logs rotineiros são
excertos identificados, com hash do arquivo original ignorado; RED/GREEN e
diagnóstico conservam saída completa redigida. Sem promoção de PASS antigo.

Após retirar as dependências temporárias, o manifesto final retornou exatamente
ao fingerprint 54d45235. Nova conferência: capas3/3, build, typecheck pós-build,
bootstrap14 e auditoria zero PASS. Escopo, diff, links e integridade do teste anexo
conferidos; os 11 originais e suas refs preservados. O teste do anexo não foi
alterado para conseguir GREEN. A árvore testada tinha alterações não commitadas
sobre 366432a; o commit funcional posterior conserva esses bytes verificados.

## Investigação separada dos rascunhos

O FAIL histórico de environmental-drafts.spec.ts:32 continua sendo 65 PASS,
1 FAIL e 1 não executado no PR #7, mesmo que os 68 casos passem nesta sessão.
Investigação não implementa uma correção adicional no formulário.

EVIDENCIA_IMPLEMENTACAO nova: diagnóstico na mesma rota, mesmas fixtures e
configuração/guards, retardando somente scripts /_next/static. Antes da
hidratação, water.hasSpring tinha valor vazio e nenhum handler React observado;
selectOption(false) mudou o DOM para false; após hidratação e preenchimento dos
campos numéricos, voltou a vazio. O primeiro PUT continha apenas
soil.infiltrationRateMmPerHour=0 e terrain.elevationMeters=12.; hasSpring ausente.
Reload manteve o campo vazio. Assertion exigindo false falhou, exit 1, em
17:36:29.641→17:36:39.204 UTC. Teardown das fixtures passou.

[Observações/payload](rc-ui-001-evidence/drafts-hydration-diagnostic.json) e fontes
reexecutáveis do [diagnóstico](rc-ui-001-evidence/drafts-diagnostic.spec.txt) e
[configuração](rc-ui-001-evidence/drafts-diagnostic.config.txt) estão preservadas;
para repetir, copiar as fontes com extensão .ts para .accounts-validation e usar
o runner Run/Regression/Playwright atual. Esse diagnóstico negativo não foi
incluído no total de 68 testes originais, nem interpretado como PASS do produto.

INFERENCIA: a perda anterior ao primeiro save é compatível com a intermitência
histórica. Não há trace da rodada histórica para confirmar seu timing exato.
O guia [Playwright/hidratação](https://playwright.dev/docs/navigations#hydration)
documenta a diferença entre um controle visível/habilitado e seus listeners
prontos. RECOMENDACAO: recorte próprio para impedir interação prematura e validar
hidratação lenta; não mascarar com waits/timeouts/assertions mais fracos.

## Dependências do PR #7

Patch separado 99d8363 inspecionado integralmente: só package.json/lockfile,
versões patch conhecidas e registry.npmjs.org. Preimages do patch conferidos.
Aplicação temporária no mesmo worktree para testes; sem commit duplicado, merge
ou promoção ao candidato. Fingerprint de fix+dependências:
`c2b49d2ddf1e9bd94aa5814368c87881eb98d863ef18c87b25b83a8fb5e64064`.

Audit original: 13 high/exit 1; patch: 5 high/exit 1 na cadeia dev de braces;
omit=dev: zero/exit 0. Nenhum audit fix force/atualização global. Os JSONs
[original](rc-ui-001-evidence/dependency-audit-original.json),
[patch](rc-ui-001-evidence/dependency-audit-patched.json),
[produção](rc-ui-001-evidence/dependency-audit-patched-production.json) e
[revisão das versões](rc-ui-001-evidence/dependency-review.json) são evidências
distintas da integração. Nesta combinação passaram Unit291+Mail17,
Integration187, typecheck/lint/build, E2E68, HTTPS2, bootstrap14, exclusão3 e
SchemaAudit zero. São novas execuções locais, não aprovação/integração do PR #7.
Em seguida, o patch foi revertido e os bytes originais de package.json/lockfile
foram recuperados e conferidos por SHA256; reinstalação pelo lockfile original.

## Publicação e limites

Consulta Vercel read-only inicialmente HTTP 403; autenticação renovada pelo
usuário. Nova consulta confirmou projeto hidro-florestas-full-stack ligado ao
fork HidroFlorestaStartup/HidroFlorestas-FullStack, produção main, sem Deploy Hooks.
vercel.json bloqueia exatamente review/016-area-covers; sem workflows versionados
e sem deployments dessa branch na consulta de três deployments existentes.
[Preflight remoto redigido](rc-ui-001-evidence/vercel-preflight.json).
[Contrato oficial do bloqueio](https://vercel.com/docs/project-configuration/git-configuration).
Nenhum setting remoto foi alterado pelo agente.

Push fast-forward dace407→c317271 concluído; API do PR #4 confirmou o novo head
com planejamento 366432a e correção/evidências
[c317271](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/commit/c3172718011ee70d3613387c61b3774601010a85).
Novo manifesto no commit publicado confirmou fingerprint 54d45235, idêntico aos
gates. PostgreSQL próprio voltou STOPPED, dados preservados e porta3001 sem servidor.

Conector GitHub recusou as quatro escritas com HTTP403 Resource not accessible
by integration. Autenticação local já usada pelo Git executou os pedidos
autorizados, com credencial somente em memória: re-review #4/#6 e comentários
HTTP201. [Recibos](rc-ui-001-evidence/rereview-publication.json),
[resposta no thread #4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#discussion_r4262167643) e
[atualização #6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#issuecomment-6151817393).
CHANGES_REQUESTED de PedroVitor237 reconferido e preservado em ambos; nenhuma
aprovação, dispensa de review, resolução do thread ou retarget foi executada.

[Propagação preparada e pendências](rc-ui-001-propagation.md) preservam estados e
ordem da pilha. Integração das dependências e propagação ficam pendentes porque
a instrução posterior do usuário proíbe merges. Aprovações/homologações e ciência
não são substituídas pelos testes locais.
