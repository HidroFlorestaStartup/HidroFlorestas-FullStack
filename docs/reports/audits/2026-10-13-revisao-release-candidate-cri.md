# Revisão independente da Release Candidate CRI — 2026-10-13

Estado: FINAL — revisão técnica encerrada, relatório e reviews publicados.
Início da execução: 2026-10-12. Fechamento: 2026-10-13. Fuso: America/Fortaleza.
Mandato: pedido do usuário de revisão e testes solicitado pelo professor Thales.
Plano: [PLAN-RC-REVIEW-20261012](../../plans/completed/revisao-release-candidate-cri-20261012.md).

RECOMENDACAO: **CORREÇÕES NECESSÁRIAS** antes da integração em
development. A recarga da capa preserva o estado de falha quando a revisão não
muda; recebeu instrução de correção no PR #4 e REQUEST_CHANGES no PR #6.
A atualização focal de dependências foi publicada em commit separado na PR #7,
com evidências e limitações. Nenhuma alteração funcional de
interface ou domínio foi implementada nesta revisão.

## Candidato, pilha e alcance

| Identidade | Valor |
|---|---|
| Repositório revisado | HidroFlorestaStartup/HidroFlorestas-FullStack |
| Candidato original | ca80376e6e0f60aac9b94ec598e8e4a7c937d17c |
| Branch candidata | release/cri-rc-20261010 |
| PR final | [PR #6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) |
| development/main do fork reconferidas em 2026-10-13 | beba96fbf6bbaac8771dbb29abea2f9f8f5b0054 |
| Patch local de dependências | 99d8363fba4d13a8a02937be1ff2e606d35b3fa6 |
| Branch isolada da revisão | review/cri-rc-validation-20261012 |
| Checkpoint documental durável da retomada | ffd04a240d885cb32eb4d26d4e4881908b003443 |
| Última reconferência remota | 2026-10-13, GitHub API e git ls-remote; RC continua em ca80376 |
| Publicação da branch isolada | [PR #7](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7), base release/cri-rc-20261010; head dos registros consultável na PR |
| Checkpoint com resultados completos antes do fechamento editorial | f25b7c1f8e770531586dec9ca6bfb47a114b1707 |

FATO_DOCUMENTADO: a entrega tem seis PRs encadeados. PR #6 contém a etapa
documental final e não representa sozinho o diff funcional. A revisão aplica-se
à árvore cumulativa da RC e usa o
[guia de integração](../../releases/2026-10-10-cri-rc/integration-guide.md).
development do fork deve ser distinguida de PedroVitor237/HidroFlorestas.
Não houve merge, deploy, promoção para main nem migrations em banco hospedado.

EVIDENCIA_IMPLEMENTACAO: a inspeção Git da retomada encontrou o patch 99d8363
restrito a package.json/package-lock.json, com o componente de capa inalterado.
O checkpoint ffd04a2 acrescenta o plano, este relatório em rascunho e a proteção
de deployment da branch de revisão em vercel.json;
o runtime sob validação conserva a árvore funcional de 99d8363. Não houve avanço
do candidato remoto entre a referência anterior ca80376 e a consulta de 2026-10-13.
A árvore e alterações preexistentes do checkout principal foram preservadas.

## Proveniência após as interrupções

FATO_DOCUMENTADO: resultados executados em 2026-10-12 foram observados pela
sessão, mas logs/screenshot/rascunhos não commitados em /tmp perderam-se após o
desligamento. O commit de dependências sobreviveu. A retomada solicitada após
esse desligamento também foi interrompida pelo limite de uso; o usuário voltou
a solicitar continuação em 2026-10-13. O worktree, runtime e novos logs passaram
a usar diretório persistente no workspace; plano/relatório foram preservados
no checkpoint ffd04a2.

EVIDENCIA_IMPLEMENTACAO de ambiente: a consulta ao journal do kernel na retomada
encontrou evento OOM em 2026-10-12 às 18:00:56, no horário exibido pelo journal,
com encerramento do processo code pelo OOM killer. /tmp é tmpfs com capacidade
de aproximadamente 2,8 GiB. Isso comprova pressão de memória na execução anterior;
não identifica sozinho todos os processos que causaram o desligamento. A
retomada passou a executar cargas pesadas sequencialmente, com limite de heap,
um worker e armazenamento persistente.

EVIDENCIA_IMPLEMENTACAO nova de 2026-10-13: npm ci --no-audit --no-fund concluiu
com instalação limpa de 562 pacotes em 16 s; prisma generate gerou o Client
7.4.2 em 753 ms. Os logs npm-ci-20261013.log e prisma-generate-20261013.log estão
preservados em .accounts-validation/rc-runtime/logs e publicados com caminhos
locais redigidos: [npm ci](2026-10-13-cri-rc-evidence/npm-ci.txt) e
[Prisma generate](2026-10-13-cri-rc-evidence/prisma-generate.txt).

Este relatório separa três grupos: resultado histórico observado na sessão,
verificação nova com artefato preservado e verificação pendente. Nenhum log perdido
foi recriado como se fosse evidência original; nenhum teste interrompido é PASS.
Os resultados do pacote de 2026-10-10 são históricos distintos e não foram
promovidos a execução desta revisão.

## Achado RC-UI-001 — recarga da capa sem nova tentativa

**Conclusão anterior: CONFIRMADA, com nova coleta persistente de 2026-10-13.**
Severidade proposta: P2. Local:
[src/components/areas/area-cover.tsx](../../../src/components/areas/area-cover.tsx),
AreaCoverPreview (linhas 7–9), reload() (linha 47) e key da prévia (linha 50).
Requisito pertinente: spec 016 FR-007, feedback/retry/fallback recuperáveis.

EVIDENCIA_IMPLEMENTACAO estática: AreaCoverPreview guarda failed em estado local;
onError define true e então a imagem deixa de ser renderizada. reload() consulta
somente os metadados e mostra “Capa recarregada.”. A key da prévia depende apenas
de areaId e revision; metadados com a mesma revisão não reiniciam failed.

FATO_DOCUMENTADO no histórico da sessão de **2026-10-12**: reprodução usou o componente real
AreaCoverEditor em Next.js e Chromium 140, com respostas interceptadas para
controlar a recuperação. O comportamento foi observado tanto no original quanto
no patch de dependências; não houve componente substituto simulando o defeito.
Isso é teste de UI com rede controlada, sem alegação de jornada completa com
backend, PostgreSQL ou Cloudinary reais.

| Etapa do teste histórico | Requisições e comportamento observado |
|---|---|
| Metadados iniciais | revision=1, hasImage=true |
| Primeiro conteúdo | GET /image/content?revision=1 retorna 503; “Capa indisponível.” |
| Recuperação do endpoint | Próximo GET de conteúdo passaria a retornar imagem 200; revisão permanece 1 |
| Clique em “Recarregar capa” | +1 GET de metadados, +0 GET de conteúdo; “Capa recarregada.” com fallback ainda visível |
| Atualização da página inteira | Novo GET de conteúdo, 200, imagem visível com a mesma revisão |

Impacto observado: falha temporária de leitura deixa a capa indisponível na
prévia, embora o provedor/recurso já tenha recuperado, e o botão comunica sucesso
sem tentar recuperar a imagem. Não há evidência de perda do asset ou de alteração
indevida no banco.

RECOMENDACAO de correção, sem implementação nesta rodada: reiniciar explicitamente
a tentativa da prévia após recarga bem-sucedida, mesmo com a mesma revisão.
Pode-se usar uma identidade de tentativa local na key ou um sinal explícito de
reset do estado; garantir também uma nova tentativa do elemento de imagem quando
o src permanece igual. Não incrementar revision no banco para contornar estado
da UI. Revisão representa mudança do recurso persistido.

Critérios de aceite e teste de regressão:

1. Renderizar componente real com revision=1/hasImage=true e falhar o primeiro
   conteúdo com 503; conferir fallback.
2. Recuperar endpoint para 200 sem mudar revision; clicar “Recarregar capa”.
3. Comprovar novo GET de conteúdo com a mesma revision e imagem carregada,
   inclusive naturalWidth > 0, sem recarregar a página inteira.
4. Se a segunda tentativa também falhar, preservar feedback de falha recuperável
   e permitir nova tentativa; revisão persistida continua inalterada.

EVIDENCIA_IMPLEMENTACAO na retomada: a reprodução percorreu a **rota real de
detalhe da área**, com sessão/contexto e leitura reais no PostgreSQL local; somente
metadados/conteúdo da capa receberam respostas controladas. Next16.3.8,
Chromium140, elemento `next/image` original (`data-nimg=1`). Componente byte a byte
igual ao candidato ca80376, SHA256
`fdc0aaa42077b0a480c11429147dcb5d583fdc379c76076f603563b34d371858`.
Árvore executada: `ffd04a240d885cb32eb4d26d4e4881908b003443`, cujo runtime é99d8363;
mudanças adicionais são somente plano/relatório/proteção da branch.

O primeiro GET de conteúdo foi503. Após o clique, a contagem continuou1,
`imageCount=0`, fallback visível e status “Capa recarregada.”. Reload inteiro
elevou a contagem a2, recebeu200 e exibiu imagem30×20 com a mesma revisão1.
Após retirar a interceptação, o backend real de metadados respondeu200. Teardown
do ensaio confirmou zero fixtures ambientais. Nenhuma operação Cloudinary real.

Artefatos: [requisições e observações](2026-10-13-cri-rc-evidence/cover-reproduction.json),
[sucesso sem recuperação](2026-10-13-cri-rc-evidence/cover-after-reload.png) e
[imagem recuperada após reload](2026-10-13-cri-rc-evidence/cover-after-page-reload.png).
Comando: `node --import=tsx ../rc-runtime/browser/browser-driver.mjs general`,
no worktree, Node24, ambiente sintético injetado e Next dev local próprio.
Registro no PR #4: [REQUEST_CHANGES publicado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#pullrequestreview-5499177988),
com comentário na linha50 do head dace407. Review confirmado pela resposta da API;
nenhum registro duplicado foi criado.

## Dependências — estado original e patch focal

EVIDENCIA_IMPLEMENTACAO nova de 2026-10-13: os três JSONs de npm audit foram
recoletados e analisados sem erro de consulta. O original veio do lockfile
ca80376; o patch corresponde ao lockfile 99d8363. Todos os alertas classificados
no resultado original são high; a contagem de cinco remanescentes inclui pacote
vulnerável e propagação pela cadeia de dependentes, não cinco explorações
independentes.

| Comando/árvore auditada | High | Total | Resultado |
|---|---:|---:|---|
| npm audit --json --package-lock-only, original ca80376 | 13 | 13 | Confirmado; correções disponíveis para parte dos pacotes |
| npm audit --json, patch 99d8363 | 5 | 5 | Somente cadeia dev de braces/ESLint |
| npm audit --omit=dev --json, patch 99d8363 | 0 | 0 | Sem vulnerabilidade reportada na árvore de produção consultada |

Artefatos versionados: [audit original](2026-10-13-cri-rc-evidence/npm-audit-original.json),
[audit do patch](2026-10-13-cri-rc-evidence/npm-audit-patched.json),
[audit de produção](2026-10-13-cri-rc-evidence/npm-audit-production.json),
[npm ls next sharp source-map-js brace-expansion braces --all](2026-10-13-cri-rc-evidence/npm-ls.txt) e
[npm explain source-map-js](2026-10-13-cri-rc-evidence/npm-explain-source-map-js.txt).
Saídas da árvore instalada 99d8363, com Node24 no PATH. Alertas de pacote não
são exploração comprovada da aplicação; ausência no audit não é garantia geral
de segurança.

EVIDENCIA_IMPLEMENTACAO no diff do commit 99d8363:

| Pacote/ajuste | Original | Patch |
|---|---|---|
| next / eslint-config-next | 16.3.6 | 16.3.8 |
| sharp | 0.35.4 | 0.35.5 |
| source-map-js no lockfile | 1.2.1 | 1.2.2 |
| override brace-expansion@1 | 1.1.18 | 1.1.21 |
| override brace-expansion@5 | 5.0.9 | 5.0.12 |

A alteração foi preservada em commit próprio. Não houve audit fix --force nem
troca indiscriminada de majors. As alterações auxiliares acompanham as famílias
Next/sharp e o grafo de dependências do lockfile; source-map-js foi atualizado
transitivamente. Nenhuma mudança funcional acompanhou o patch. A auditoria
original também justificou atualizar os overrides de brace-expansion dentro
das majors 1 e 5, cobrindo os advisories de
[recursão no parser](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p),
[recursão em grupos aninhados](https://github.com/advisories/GHSA-qhr7-859c-m2p7) e
[expansão de custo quadrático](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr).

EVIDENCIA_IMPLEMENTACAO estática: next.config.ts não define images.remotePatterns.
O componente de capa usa Image unoptimized e rota same-origin. FATO_DOCUMENTADO:
o advisory oficial de SSRF diz que aplicações sem images.remotePatterns não são
afetadas por esse vetor específico. INFERENCIA de alcance: a condição do vetor
não foi localizada na configuração desta RC. Essa observação anterior foi
confirmada e não implica imunidade aos demais advisories de Next. A página
oficial exibiu o campo de patch como “16.3.?”; 16.3.8 foi selecionado pelo audit
do lockfile, cujo alerta de Next desapareceu após a atualização.
[GHSA-cjq9-62q9-8jv4, Next.js](https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4).

FATO_DOCUMENTADO: o advisory de sharp descreve possível RCE em Linux/glibc sob
condições específicas de runtime, decorrente de librsvg; sharp 0.35.5 inclui
librsvg 2.63.2 corrigido nos binários distribuídos. EVIDENCIA_IMPLEMENTACAO:
o serviço valida metadados JPEG/PNG/WebP do provedor antes do download, mas
sanitizeCover chama sharp(...).metadata() antes da allowlist do formato
decodificado. INFERENCIA: essas verificações reduzem o alcance esperado, porém
não comprovam isolamento do decoder SVG contra bytes divergentes. Não foi
demonstrada exploração; o patch evita depender dessa hipótese de proteção.
[GHSA-wq5f-xc86-pv6w, sharp](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w).

FATO_DOCUMENTADO: source-map-js até 1.2.1 permite bloqueio síncrono por offsets
malformados de source maps indexados; 1.2.2 é a versão corrigida.
EVIDENCIA_IMPLEMENTACAO: o lockfile liga source-map-js a PostCSS e
@tailwindcss/node; nenhum endpoint de ingestão de source maps foi localizado
no recorte inspecionado. INFERENCIA: o alcance observado concentra-se em
processamento/build, sem exploração remota da aplicação demonstrada.
[GHSA-68fv-2mgg-jv7q, source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

EVIDENCIA_IMPLEMENTACAO: os cinco high remanescentes são braces, micromatch,
fast-glob, @next/eslint-plugin-next e eslint-config-next. O lockfile marca essa
cadeia como dev: eslint-config-next → @next/eslint-plugin-next → fast-glob →
micromatch → braces 3.0.3. FATO_DOCUMENTADO: o advisory de braces informa ausência
de patch publicado para o problema de exaustão de stack; 3.0.3 ainda é afetado.
O audit propõe downgrade de eslint-config-next para 14.2.35, incompatível com a
linha Next 16 aqui adotada; esse contorno não foi aplicado. INFERENCIA: o risco
remanescente afeta ferramentas que processem padrões glob não confiáveis; não
foi demonstrada exposição a esses padrões via endpoint da aplicação.
[GHSA-vfj7-8cjw-p6xm, braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

RECOMENDACAO: integrar o commit focal após revisão, acompanhar o patch upstream
de braces e repetir o audit quando disponível. O residual dev está explicitado;
o candidato remoto ca80376 continua sem o patch até a integração autorizada.

## Verificações retomadas, comandos e limites

EVIDENCIA_IMPLEMENTACAO de 2026-10-13. Node24.19.0, Prisma Client7.4.2,
PostgreSQL17.10, Playwright1.55.1, Chromium140.0.7339.186. Runtime funcional
`99d8363fba4d13a8a02937be1ff2e606d35b3fa6`; árvores executadas ffd04a2 e db68cdd
acrescentam somente documentação/evidências/proteção Git. Código de UI/domínio,
SQL, scripts/testes e guards permanecem idênticos ao candidato ca80376.

| Comando/cenário executado | Resultado atual |
|---|---|
| `npm ci --no-audit --no-fund`; `npm exec -- prisma generate` | PASS562 pacotes/16s; Client7.4.2 |
| Equivalente a `npm run test:unit`, Node `--test-concurrency=1`, seguido do runner Mail original | **291 Node +17 Mail PASS**, zero fail/skipped/cancelled |
| `node --import=tsx scripts/imp006-test-runner.ts integration` | **187/187 PASS**, 15 suites, zero fail/skipped/cancelled |
| Mesmo runner `migration` | **37/37 PASS**, constraints/compatibilidade aditiva e dados legados locais |
| Mesmo runner `contract` | **6/6 PASS**; contas/OpenAPI/IHFR, incluindo cenário HTTP/PostgreSQL real |
| `scripts/imp006-clean-bootstrap.ts --with-versioned-baseline` | **14 migrations PASS**, smoke/leitura/escrita com rollback e descarte do banco próprio |
| `playwright.config.ts`, seleção geral original, workers1/retries0 | **65 PASS, 1 FAIL, 1 não executado** por sequência serial; registro integral preservado |
| Repetição isolada dos três testes originais `environmental-drafts.spec.ts` | **3/3 PASS**, assertions/timeouts/guards inalterados; não somar como casos novos |
| `scripts/account-deletion-e2e.ts`, runner dedicado | **3/3 PASS**, schema próprio e cleanup |
| `tests/e2e/run-auth-https.mjs`, runner original | **2/2 PASS**, modo production em HTTPS local, sessão/cookies; teardown zero usuários de fixture |
| `npm run build`, executado integralmente pelo runner HTTPS | **PASS padrão Turbopack/Next16.3.8**, compilação e TypeScript; nenhum checker relaxado |
| Equivalente a `npm run typecheck`, após build completo | **PASS** |
| Equivalente a `npm run lint` | **Zero erros, 3 avisos preexistentes**: ShieldCheck/useAuth/className |
| `scripts/imp006-local-e2e.ts`, runner IHFR local original | **6/6 PASS**, schema próprio: criação/substituição/revogação/replay/leitura e estados de acesso |
| `scripts/imp006-audit-schemas.ts assert-zero` | **PASS zero schemas managed**, conferido novamente após browser |
| `git diff --check` e comparação de fontes | PASS; **12 SQL históricos intactos +2 novos**, sem diff funcional após patch |

Os wrappers privados apenas injetam ambiente sintético, limitam recursos,
iniciam servidores próprios e preservam logs em disco. A suíte geral usa
Turbopack/configuração original, sem reescrever componentes, assertions ou
seleção. Warm-up de GETs locais antes da suíte está registrado nos metadados;
não alterou timeouts nem retries. Unitários executados em sequência para reduzir
memória, incluindo todos os arquivos das duas extensões e os17 Mail.

Artefatos publicados: [unit/Mail](2026-10-13-cri-rc-evidence/unit-mail-summary.json),
[PostgreSQL/contratos/migrations](2026-10-13-cri-rc-evidence/database-tests.json),
[execuções de navegador e falha inicial](2026-10-13-cri-rc-evidence/browser-results.json),
[build/typecheck/lint](2026-10-13-cri-rc-evidence/build-typecheck-lint.json) e
[hashes SQL](2026-10-13-cri-rc-evidence/migration-integrity.json).

### Falha inicial dos rascunhos: causa inconclusiva

No primeiro E2E geral, `environmental-drafts.spec.ts:32` esperava “Há nascente”
igual a `false` após reload e recebeu vazio. Salvamento perdido/retry havia
retornado200; zero e texto parcial12. permaneciam. O cenário seguinte ficou
não executado devido à sequência serial. A repetição dos três testes originais
passou, incluindo preservação de false/zero, conflito entre abas, recarga,
descarte/cancelamento, confirmação e autorização.

**Não converter a execução geral inicial em67/67 PASS.** A causa não foi comprovada.
INFERENCIA: timing de hidratação/interação do select no carregamento pode explicar
a diferença; mapper observado converte false para string corretamente. Nenhuma
correção ou alteração de assertion foi aplicada. RECOMENDACAO: investigar com
registro de seleção/hidratação e payload do primeiro save e estabilizar a prontidão
sem afrouxar o aceite; manter o caso como ressalva de confiabilidade da regressão.
As duas falhas de contas vistas antes do desligamento não reapareceram nesta suíte.

### Verificações não executadas e alcance

O runner `imp006-full-ui-e2e.ts` exige explicitamente branch remota E2E/public e
recusa `IMP006_LOCAL_POSTGRESQL`; **não foi executado nem teve guard removido**.
O runner IHFR local de seis casos cobre jornadas técnicas reais, mas não substitui
esse checkpoint remoto. Nenhuma identidade Neon de homologação foi comprovada
ou utilizada. Compatibilidade do aplicativo anterior em clone/restauração com
dados reais, ensaio de backup/locks no hospedado e browsers Firefox/Safari também
não foram executados. Migrations37 e bootstrap14 comprovam somente o ensaio local.

A tentativa histórica `build --webpack` original apresentouTS2344 na assinatura
opcional da rota logout. O build padrão passou em12/10 e novamente na retomada;
falha daquela variante preexistente não é apresentada como bloqueio do padrão.
RECOMENDACAO se Webpack for necessário: adaptar a fronteira POST ao contrato
validado e reexecutar build limpo, preservando CSRF/cookies; não ignorar tipos.

Cloudinary nas integrações é fake com decoder sharp real; as capas de E2E usam
rede interceptada para UI e backend real para autorização. Contas/SMTP automatizados
usam transportes sintéticos/local TLS. Não houve homologação real de e-mail/Cloudinary,
aceite humano, deploy ou validação científica do IHFR.

## Banco real, ambiente e isolamento

FATO_DOCUMENTADO no histórico: foi usado PostgreSQL local próprio, com runners
inspecionados antes da execução e valores sintéticos de autenticação. O ambiente
de teste precisa chegar também ao processo Next iniciado por Playwright; criar
.env.test.local isoladamente não comprova o destino desse servidor. A retomada
preservou prova do adapter/configuração efetivamente utilizada, inventário
de schemas/fixtures antes/depois e teardown.

Campos obrigatórios locais: DATABASE_URL e TEST_DATABASE_URL apontam ao destino
local isolado; TEST_DATABASE_CONFIRMATION=HIDROFLORESTAS_AUTH_TEST;
IMP006_DATABASE_VARIABLE=TEST_DATABASE_URL. NODE_ENV segue o processo apropriado;
JWT_SECRET e E2E_USER_PASSWORD são gerados sinteticamente. Configurações de
contas e runners devem seguir os guards e exemplos já versionados. Não publicar
valores privados, URLs completas de conexão, cookies, tokens ou senhas.

EVIDENCIA_IMPLEMENTACAO atual: PostgreSQL17.10 próprio, loopback55427,
owner sintético `accounts_owner`, marker `hidroflorestas:accounts-local-postgresql:v1`
e diretório persistente comprovados pelo setup oficial. Testes usam
`TEST_DATABASE_URL` direto/`accounts_regression_test`; `DATABASE_URL` dos runners
é `accounts_regression_reference` vazio. O servidor Next recebe explicitamente
`DATABASE_URL=TEST_DATABASE_URL`, `IMP006_LOCAL_REGRESSION_PUBLIC=1` e
`NODE_ENV=development`; guard foi preservado. O modo test aplica-se aos runners,
e não foi presumido para o processo Next.

[Prova do banco efetivo](2026-10-13-cri-rc-evidence/database-server-proof.json):
quatro sockets TCP do processo Next corresponderam a quatro `client_port`
observados no PostgreSQL local, todos no banco de teste esperado. Comparações
do ambiente sintético/JWT retornam somente booleanos; identidade/data_directory,
read-only e tabelas-base foram conferidos. Valores privados não foram publicados.

Setup14, integração187/187, migrations37/37, contrato6/6 e bootstrap14 passaram
na retomada, sem falhas/skips/cancelamentos. Bootstrap ensaiou uma escrita em
transação com rollback e descartou apenas seu banco próprio. Antes de E2E,
inventário/guard/reset/setup comprovaram zero linhas de domínio, 14 migrations,
zero schemas extras e referência vazia. A suite antiga de administração deixou54
usuários sintéticos e2 eventos em `public`, embora os schemas temporários estivessem
limpos. RECOMENDACAO: teardown explícito com ownership comprovado ou descarte
documentado do banco de testes; não afirmar zero fixtures a partir de zero schemas.
Nesta execução, o reset do banco próprio conferiu identidades/contagens, SQL/hashes,
marker/owner/diretório e ausência de conexões antes da recriação.

Inventário final após E2E: zero schemas extras e zero clientes ativos; `public`
conservava54 usuários IMP009,3 auditorias e27 `MailRateLimitBucket`, com todos os
demais modelos vazios. O guard de reset por linhas **recusou corretamente** os
buckets; não foi removido nem ampliado para esconder o resíduo.

A limpeza foi concluída por **descarte integral do cluster criado exclusivamente
nesta retomada**. Guard independente de recurso verificou marker/owner, datadir e
ancestrais reais, UID/proveniência13/10/setup inicialmente vazio, catálogo exato
dos três bancos locais próprios e bancos template oficiais, ausência de clientes,
tablespaces externos e symlinks. Após parada controlada, somente esse clusterRoot
foi removido. Verificação independente confirmou cluster/datadir ausentes e
nenhuma fixture física desse recurso restante. Logs/helpers e ambiente sintético
0600 fora do recurso foram preservados; produto/runners/guards permanecem intactos.
Ver [resultado de limpeza](2026-10-13-cri-rc-evidence/database-cleanup.json).

Os resíduos são uma limitação dos teardowns públicos existentes, não vazamento
de produção. RECOMENDACAO: melhorar cleanup dos fixtures/buckets com escopo
comprovado, ou manter descarte explícito do recurso de regressão após o gate.
Nenhum uso de Neon/produção, remoção de guard ou migração hospedada está autorizado.

## Registros publicados e conclusão

| Registro autorizado | Estado/URL |
|---|---|
| Relatório e evidências no repositório | [Relatório versionado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/review/cri-rc-validation-20261012/docs/reports/audits/2026-10-13-revisao-release-candidate-cri.md) e [PR #7](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7) |
| Achado de capa no PR #4 | [REQUEST_CHANGES](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#pullrequestreview-5499177988), review5499177988 |
| Parecer consolidado REQUEST_CHANGES no PR #6 | [REQUEST_CHANGES publicado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#pullrequestreview-5499467293), review5499467293, commit ca80376; sem duplicata |
| Patch de dependências | [Commit separado 99d8363](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/commit/99d8363fba4d13a8a02937be1ff2e606d35b3fa6), publicado na PR #7 |

RECOMENDACAO: corrigir RC-UI-001 em commit funcional futuro com spec,
plano/tarefas pertinentes e teste de regressão real; incluir o patch focal de
dependências após revisão; concluir ou delimitar E2E e provas de isolamento.
A decisão de integração permanece com a equipe. Quando apropriada, preservar
sequência #1→#6, merge commits e retarget de cada próximo PR para development,
conforme o guia. Os reviews acima foram confirmados pela GitHub API, sem duplicatas.

Homologações humanas Gate B012/aceite013, navegadores alvo, Cloudinary real,
e-mail/scheduler, operadores e identificação/backup/ensaio de produção continuam
pendentes. Referências operacionais:
[checklist da RC](../../releases/2026-10-10-cri-rc/review-checklist.md) e
[runbook operacional](../../releases/2026-10-10-cri-rc/production-update-runbook.md).
Nenhum valor privado foi exigido do usuário para concluir testes locais.

### Conclusões da revisão anterior e ações manuais

| Conclusão | Estado atual |
|---|---|
| Recarga de capa sem nova tentativa na mesma revisão | **CONFIRMADA**, componente real em rota real, requests/capturas preservados |
| next/sharp/source-map-js originais high | **CONFIRMADA** para os três pacotes citados; a coleta completa atual encontrou13 registros propagados |
| Ausência de remotePatterns e source-map-js via PostCSS | **CONFIRMADA**; SSRF específico inaplicável à configuração observada, sem exploração comprovada |
| 291 Node+17 Mail/typecheck/lint3 avisos/build | **CONFIRMADOS na retomada**, build padrão; variante Webpack original permanece delimitada |
| Integração PostgreSQL/migrations/contratos ausentes na revisão anterior | Lacunas cobertas localmente187/37/6 e bootstrap14, sem fingir execução passada |
| E2E integral | Geral65/1/1 e focaldrafts3/3, exclusão3, HTTPS2 e IHFR6; falha inicial e checkpoint remoto não executado permanecem explícitos |
| Ciência/provedores reais/homologação humana | **PENDENTES**, fora do alcance dos testes locais |

Correções materiais comprovadas: recuperação da prévia de capa (RC-UI-001).
Configuração/ferramentas: OOM/sandbox/instalação interrompida resolvidos;
inconsistência inicial de E2E draft sem causa comprovada; residual braces dev sem
patch publicado. Manter essas categorias distintas. O patch99d8363 está na branch
de revisão e ainda não integra o candidato remoto ca80376.

Não foi necessário receber valor privado do usuário para os testes locais.
Para as etapas humanas/remotas restantes, os campos e fontes são:

| Etapa/campos | Origem e preenchimento correto |
|---|---|
| Checkpoint remoto full-ui | Identificar primeiro project/branch/database/role **E2E isolados** no Neon Console; o destino deve coincidir com `approvedUiTargetFingerprint` de `scripts/imp006-ui-account.ts`, em schema `public`. Connection details fornece `TEST_DATABASE_URL` com endpoint direto. Preencher também `DATABASE_URL` com a referência de desenvolvimento identificada e **distinta** do banco de teste. Usar ambiente limpo, sem `IMP006_TEST_SCHEMA`, `IMP006_LOCAL_REGRESSION_PUBLIC`, `IMP006_LOCAL_POSTGRESQL` ou `PLAYWRIGHT_BASE_URL` herdadas. Se o destino aprovado não estiver disponível, registrar o bloqueio sem alterar a allowlist. Preservar `TEST_DATABASE_CONFIRMATION=HIDROFLORESTAS_AUTH_TEST`, `IMP006_DATABASE_VARIABLE=TEST_DATABASE_URL`, `NODE_ENV=test` no runner. `IMP006_UI_RUN_ID` deve ser único e corresponder a `HF007-UI-[A-Za-z0-9-]{6,50}`. Para perfil legacy, `IMP006_UI_EMAIL` deve corresponder exatamente a `identities.legacy.email` em `scripts/imp006-ui-account.ts`; `IMP006_UI_PASSWORD` vem do secret store privado da conta técnica autorizada. Perfis de reserva usam o preparo/secret próprio do runbook006. Não desativar guards para apontar esse runner ao cluster local ou à produção. |
| Cloudinary real | Dashboard do cloud aprovado→API Keys: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Upload presets: preset assinado/versionado/frozen em `CLOUDINARY_COVER_PRESET`; Obter JSON revisado do preset via Admin API, sem segredos, com nome `hfr-cover-vN`; `npx tsx scripts/area-cover-preset.ts <preset-revisado.json>` produz `sha256`, a copiar para `CLOUDINARY_COVER_PRESET_SHA256`. Manter `CLOUDINARY_IMAGE_ENABLED=0` até homologação real; somente então aprovação própria permite1. Valores no secret store, nunca NEXT_PUBLIC. Validar authenticated/EXIF/recusa de delivery público/revogação/substituição/remoção/cleanup/créditos. |
| E-mail real e GateB012 | Obter do provedor/secret store `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_REQUIRE_TLS`, `SMTP_USER`, `SMTP_APP_PASSWORD` e `MAIL_FROM`. O contrato atual exige `SMTP_HOST=smtp.gmail.com`, combinação `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_REQUIRE_TLS=true` ou `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_REQUIRE_TLS=true`; preencher `MAIL_FROM` igual a `SMTP_USER` da conta autorizada e usar sua senha de app existente; preservar keyrings/IDs ativos, `MAIL_WORKER_SECRET`, `MAIL_IDEMPOTENCY_KEY`, provas e schedulers existentes. Caixa sintética real autorizada recebe reset/reenvio; confirmar uso único e revogação em navegadorB/A. SMTP local/aceito não comprova recebimento humano. |
| Aceite013 e browsers | Humano executa cancelamento/senha/blockers/exclusão autorizada e documenta aceite. Homologar drafts/teclado/mobile em Firefox/Safari e investigar a interação inicial do select, sem afrouxar assertions. |
| Integração/operação futura | Confirmar Vercel→repositório→banco, backup restaurado/checksums/drift, janela/locks, owners mail/cleanup, scheduler/alertas/orçamento. Operador de banco e aprovador: não especificado. Não aplicar seed/bootstrap/migrations/deploy hospedados por este parecer. |

Quando a equipe corrigir e autorizar a integração, seguir **#1→#6**, merge commits
e retarget de cada próximo PR para **development deste fork**. Revisão adicional
de dependências/documentos deve ser integrada preservando seus commits e bases
corretas; não fazer squash/cherry-pick ou merges nesta execução.

O IHFR conserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
Testes locais comprovam somente os cenários executados e não validam cientificamente
o contrato experimental. docs/raw/** e registros normativos permanecem intactos.
