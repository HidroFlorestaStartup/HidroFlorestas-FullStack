# Revisão independente da Release Candidate CRI — 2026-10-13

Estado: DRAFT / EM_ANDAMENTO; aguardando fechamento das verificações retomadas e
publicação no GitHub. Início da execução: 2026-10-12. Fuso: America/Fortaleza.
Mandato: pedido do usuário de revisão e testes solicitado pelo professor Thales.
Plano: [PLAN-RC-REVIEW-20261012](../../plans/active/revisao-release-candidate-cri-20261012.md).

RECOMENDACAO provisória: **CORREÇÕES NECESSÁRIAS** antes da integração em
development. A recarga da capa preserva o estado de falha quando a revisão não
muda; deve receber instrução de correção no PR #4 e REQUEST_CHANGES no PR #6.
A atualização focal de dependências foi feita em commit separado e ainda precisa
ter seus registros/evidências finais publicados. Nenhuma alteração funcional de
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
| Publicação da branch isolada e SHA final dos registros | Branch ainda ausente do remoto na reconferência; publicação pendente |

FATO_DOCUMENTADO: a entrega tem seis PRs encadeados. PR #6 contém a etapa
documental final e não representa sozinho o diff funcional. A revisão aplica-se
à árvore cumulativa da RC e usa o
[guia de integração](../../releases/2026-10-10-cri-rc/integration-guide.md).
development do fork deve ser distinguida de PedroVitor237/HidroFlorestas.
Não houve merge, deploy, promoção para main nem migrations em banco hospedado.

EVIDENCIA_IMPLEMENTACAO: a inspeção Git da retomada encontrou o patch 99d8363
restrito a package.json/package-lock.json, com o componente de capa inalterado.
O checkpoint ffd04a2 acrescenta somente o plano e este relatório em rascunho;
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
preservados em .accounts-validation/rc-runtime/logs; seus anexos públicos serão
vinculados no fechamento.

Este rascunho separa três grupos: resultado histórico observado na sessão,
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

FATO_DOCUMENTADO no histórico da sessão: reprodução usou o componente real
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

JSONs preservados: npm-audit-original-20261013.json,
npm-audit-patched-20261013.json e npm-audit-production-20261013.json em
.accounts-validation/rc-runtime/logs. A vinculação dos anexos versionados e
saídas npm ls/npm explain permanece para o fechamento. Alertas de pacote não
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

RECOMENDACAO: publicar o commit focal para revisão, acompanhar o patch upstream
de braces e repetir o audit quando disponível. O residual dev está explicitado;
o candidato remoto ca80376 continua sem o patch até a integração autorizada.

## Verificações e limites do resultado histórico

Resultados abaixo foram observados na sessão de 2026-10-12; os artefatos temporários
perderam-se. A execução exata por SHA/variante será conciliada com os novos logs
no fechamento. O patch modifica dependências, portanto testes pertinentes foram
repetidos nessa sessão; regressão futura deve citar o SHA correspondente.

| Verificação histórica | Resultado observado | Estado da nova coleta |
|---|---|---|
| npm ci / Prisma Client 7.4.2 | Instalação e geração executadas | npm ci retomado em worktree persistente; completar registro |
| Unidade Node + Mail | 291 + 17 PASS | Pendente |
| Integração PostgreSQL | 187 PASS | Pendente |
| Migrations/constraints | 37 PASS | Pendente |
| Contratos HTTP/provider | 6 PASS | Pendente |
| Bootstrap local controlado | 14 PASS | Pendente |
| Typecheck antes/depois do patch | PASS | Pendente |
| Build padrão pós-patch, Turbopack | PASS | Pendente de avaliação proporcional na retomada |
| Lint | Sem erros, 3 warnings preexistentes | Pendente |
| git diff --check | PASS na sessão anterior | Reexecutar antes da publicação |
| E2E geral, 67 selecionados | Interrompida; aproximadamente 13 executados, falhas iniciais e um skip serial | Não é PASS; execução nova pendente |
| HTTPS e exclusão dedicada | Histórico da release não substitui execução nesta revisão | Pendente |
| Provedores reais / homologação humana | Não executados nesta revisão | Permanecem pendentes |

A tentativa de build --webpack apresentou TS2344 na rota logout com argumento
request opcional; essa variante já falhava no candidato original. O build
padrão Turbopack passou depois do patch na sessão anterior. Resultado da variante
webpack permanece registrado como falha de compatibilidade de ferramenta/tipagem,
sem atribuí-lo automaticamente ao patch ou esconder que o comando falhou.

INFERENCIA a investigar: as falhas iniciais da E2E interrompida podem depender
de compilação a frio/timeouts. Não há evidência suficiente neste rascunho para
classificá-las como defeito funcional. O restante da suíte não foi executado.

## Banco real, ambiente e isolamento

FATO_DOCUMENTADO no histórico: foi usado PostgreSQL local próprio, com runners
inspecionados antes da execução e valores sintéticos de autenticação. O ambiente
de teste precisa chegar também ao processo Next iniciado por Playwright; criar
.env.test.local isoladamente não comprova o destino desse servidor. A retomada
deve preservar prova do adapter/configuração efetivamente utilizada, inventário
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

Inventário final após os E2E/limpeza: pendente de preenchimento.
Nenhum uso de Neon/produção, remoção de guard ou migração hospedada está autorizado.

## Registros e conclusão a fechar

| Registro autorizado | Estado/URL |
|---|---|
| Relatório e evidências no repositório | DRAFT local; URL de commit/branch pendente |
| Achado de capa no PR #4 | [REQUEST_CHANGES](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#pullrequestreview-5499177988), review5499177988 |
| Parecer consolidado REQUEST_CHANGES no PR #6 | Pendente de publicação; conferir duplicatas |
| Patch de dependências | Commit local 99d8363; URL publicada pendente |

RECOMENDACAO provisória: corrigir RC-UI-001 em commit funcional futuro com spec,
plano/tarefas pertinentes e teste de regressão real; incluir o patch focal de
dependências após revisão; concluir ou delimitar E2E e provas de isolamento.
A decisão de integração permanece com a equipe. Quando apropriada, preservar
sequência #1→#6, merge commits e retarget de cada próximo PR para development,
conforme o guia. Nenhum registro pendente acima deve ser apresentado como publicado.

Homologações humanas Gate B012/aceite013, navegadores alvo, Cloudinary real,
e-mail/scheduler, operadores e identificação/backup/ensaio de produção continuam
pendentes. Referências operacionais:
[checklist da RC](../../releases/2026-10-10-cri-rc/review-checklist.md) e
[runbook operacional](../../releases/2026-10-10-cri-rc/production-update-runbook.md).
Nenhum valor privado é exigido neste rascunho para concluir testes locais.

O IHFR conserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
Testes locais comprovam somente os cenários executados e não validam cientificamente
o contrato experimental. docs/raw/** e registros normativos permanecem intactos.
