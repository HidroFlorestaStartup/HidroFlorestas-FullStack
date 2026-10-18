# Atualização de contexto e prontidão — 18/10/2026

**Development: PRONTO PARA PLANEJAR A INCORPORAÇÃO.**

`INFERENCIA` técnica sustentada por Git, inspeção de código, validações locais e CI
equivalente. Próximo passo: Pedro revisar o [plano](plano-de-incorporacao.md) e
entregar o [prompt](prompt-de-execucao.md) ao outro desenvolvedor para executar
somente o primeiro recorte aprovado: visual do login com autenticação real.
A incorporação não foi implementada nesta rodada.

## Autoridade, método e alcance

Mandato: pedido anexado por Pedro em 18/10/2026; escolha do login confirmada por
resposta de Pedro nesta sessão. Aplicadas as instruções raiz, contexto, decisões,
PLANS.md, constituição, política de fontes e SOURCE_AUTHORITY.md.
Fatos Git/código/testes são `EVIDENCIA_IMPLEMENTACAO`; documentos/reviews são
`FATO_DOCUMENTADO`, com seus cortes históricos. Parecer técnico assistido não é
review humano. Orientações futuras são `RECOMENDACAO`.

Foram consultados os planos de preparação da RC, reconciliação CRI, pacote
contas/rascunhos/imagens e estabilização/interface. Este acompanhamento datado
continua a etapa 5 de interface sem reescrever os planos anteriores. Não é nova
implementação por funcionalidade: a execução futura terá spec/plano/tasks pelo
Spec Kit instalado, sem TASKS.md global.

Fonte principal: [FullStack oficial](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack),
com fetch de origin e consultas REST/GraphQL de todos os seis PRs abertos,
incluindo descrições, comentários, reviews, threads e checks dos heads atuais.
As primeiras consultas de rede/instalação restritas foram repetidas com a
permissão de execução prevista pelo ambiente. Nenhum dado de ambiente foi copiado.

## Corte Git confirmado

| Ref remota | SHA completo |
|---|---|
| FullStack origin/main | beba96fbf6bbaac8771dbb29abea2f9f8f5b0054 |
| FullStack origin/development | 118a3a8b6e0f38a3e1085aad9f43e3be7f3eabed |
| Candidato aprovado | 0f669b79a5e73a329832593229c2557d8b12bbce |
| FullStack origin/release/cri-rc-20261010 | 5ea982374e787e2f9844453add317f3949be4f8a |
| FullStack origin/review/cri-rc-validation-20261012 | a01857b3d1a44fc0668054d03096d743ba0aede0 |
| Starter origin/main = upstream/main | cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f |

O merge 118a3a8 tem exatamente os pais beba96f e 0f669b7. Ambos o candidato
aprovado e development possuem a árvore **9cde83df95785cf6115d489ca6e3584268cb6fcc**:
`git diff 0f669b7 origin/development` vazio e `rev-parse <ref>^{tree}` iguais.
Isso comprova integração de conteúdo e ancestralidade, sem depender de título ou checklist.

Release e development divergem 1/1; o commit exclusivo 5ea9823 altera apenas o
parecer posterior de aprovação e o README da release. Revisão independente e
development divergem 16/1; o diff das árvores é de 26 arquivos documentais/evidências.
O candidato 0f669b7 é ancestral de ambas. Nenhum squash/cherry-pick precisa ser
invocado para explicar a entrega: os commits funcionais originais são ancestrais.

`git diff 118a3a8 5ea9823 -- . ':!docs'` e o mesmo comando contra a01857b são
vazios: código, testes, scripts, migrations, specs, dependências e configuração
são idênticos. O parecer existe somente em 5ea9823 no corte atual; foi lido nessa
ref, sem fingir que existe em development. O relatório independente foi lido na
ref a01857b. As análises/guias de 17/10 em development descrevem cortes anteriores:
seus bloqueios não prevalecem sobre correções posteriores comprovadas.

## Inventário e sincronização

FullStack: clone em `/home/pedrovitor237/Documents/Projects/ForkedHF/HidroFlorestas-FullStack`.
Origin conferido: `https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git`.
Upstream antigo `PedroVitor237/HidroFlorestas` foi identificado e não utilizado.
Branch inicial development, sem arquivos rastreados modificados nem não rastreados.
Worktree de revisão em `.accounts-validation/rc-review`, também limpa.

Starter: clone irmão `hidroflorestas-frontend-starter`; origin e upstream apontam
ambos a `https://github.com/HidroFlorestaStartup/hidroflorestas-frontend-starter.git`.
Branch inicial fix/login-http-rede-local; único arquivo preexistente não rastreado:
package-lock.json. Foi preservado; não faz parte do lockfile oficial Bun nem do commit
desta tarefa. Sua integridade foi conferida antes/depois da etapa documental.

Ahead/behind abaixo compara a branch local com **sua própria remota após fetch,
antes do FF**. Não compara main local com development.

| Repositório/branch | Local inicial | Remoto atual | Ahead/behind inicial → final | Ação e estado final |
|---|---|---|---|---|
| FullStack main | beba96f | beba96f | 0/0 → 0/0 | Já alinhada; preservada |
| FullStack development | beba96f | 118a3a8 | 0/88 → 0/0 | FF no checkout original limpo; 118a3a8 |
| FullStack review/cri-rc-validation-20261012 | b20143a | a01857b | 0/80 → 0/0 | FF na sua própria worktree limpa; a01857b |
| FullStack release/cri-rc-20261010 | inexistente | 5ea9823 | não aplicável | Ref remota inspecionada; tracking local desnecessário |
| FullStack demais review/* | inexistentes localmente | heads na tabela de PRs | não aplicável | Fetch/inspeção; sem distribuir development por elas |
| Starter main, tracking upstream/main | 8984bb8 | cbb954a | 0/6 → 0/0 | Worktree isolada em /tmp/hidro-starter-main-20261018; FF de upstream/main, igual a origin/main |
| Starter feat/incorporacao-frontend-hidroflorestas | 1472166 | 1472166 | 0/0 → 0/0 | Histórica e incorporada em main; preservada |
| Starter fix/login-http-rede-local | 2267250 | 2267250 | 0/0 → 0/0 | Branch atual e lockfile não rastreado preservados |
| FullStack docs/preparacao-frontend-20261018 | inexistente | sem branch remota própria | não aplicável | Criada de origin/development em /tmp/hidro-preparacao-frontend-20261018; somente documentação e commit local |

Não havia commits locais exclusivos em relação aos upstreams das branches
preexistentes. Não houve stash/reset/rebase, integração entre branches, alteração
de URLs ou exclusão de refs. Os FFs acima alinham cada branch à sua remota.
Main permanece legitimamente atrás de development no histórico do produto.

## Matriz da entrega efetivamente integrada

Os caminhos desta tabela são relativos à raiz. Asserções e implementações foram
inspecionadas; checklists concluídos serviram apenas como navegação.

| Frente/achado | Comportamento esperado | Evidência em development | Evidência fora dela | Validação e conclusão |
|---|---|---|---|---|
| Runners/014 | Exclusão apenas no runner dedicado; mesmo SQL UTF-8 LF/CRLF aceito, alteração real recusada | 857aeab; playwright.config.ts; scripts/mail-gate-runner.ts, accounts-migration-source.ts e accounts-database-setup.ts; unit/account-migration-source.test.ts | Relatório independente conserva limitações históricas de fixtures | Unit nova e CI Deletion/HTTPS/Bootstrap; implementado, sem relaxar ownership/checksum persistido |
| Drafts/015 | Save/retomada/descarte explícitos, sem perda semântica | 45da350; src/types/environmental-draft.ts; draft.service.ts; environmental-draft-actions.tsx; células value/absent/editing e baseline/touched | Captura histórica do primeiro save em PR7; não é defeito atual por si | Unit de roundtrip nova; integration/environmental-drafts.test.ts e E2E no CI; implementado |
| RC-DRAFT-001 | Não aceitar interação antes da hidratação; primeiro PUT preserva false/zero/ausente/vazio/texto parcial | fc82ecc; environmental-data-form.tsx usa useSyncExternalStore, snapshot SSR false e controles disabled; dois E2E retardam scripts reais | Diagnóstico original do PR7/RC-UI-001 preservado sem atribuir timing à falha histórica | RED/GREEN da 015 + CI geral 72; corrigido em development |
| Isolamento/consumo/rollback de drafts | Titular/coleta/lab, OCC/replay, consumo junto ao confirmado, nenhuma entrada parcial no IHFR | draft.service.ts chave userId_collectionDataId; environmental-data.service.ts usa consumeDraft/hasDraft na mesma transação; accounts/service.ts remove apenas drafts próprios após blockers; tabela própria na migration 20261010000100 | Documentos de operação/limites adicionais em PR7 | Integration 218/Migration 37 e E2E equivalentes; implementado; sem expiração automática/colaboração |
| RC-UI-001 | Retentar conteúdo com a mesma revisão; só anunciar recarga após onLoad real | c317271; area-cover.tsx: contador local em key/src, pendingPreviewRetry e onLoad/onError | Imagens/requests da reprodução inicial em PR7 | E2E cobre 503→200→503→200, quatro GETs, revision=1 e naturalWidth>0; corrigido |
| CRI-REV-001 | Separar disponibilidade, autorização e existência; política A desligada preserva ponteiro e bloqueia bytes/mutações | d93124e; images/settings.ts; project em images/service.ts; area.contracts.ts; UI verifica hasImage && featureEnabled | Reviews antigos em #4/#6 seguem históricos | Provider/config nova + testes HTTP/Pg/UI no CI; implementado; canEdit não substitui featureEnabled |
| Upload, confirmação, leitura privada, remoção e cleanup | Autorização contextual atual, sanitização, revisão, substituição segura e exclusão só por identidade comprovada | 06fcbe0; images/service.ts, cloudinary.ts, sanitize.ts e http.ts; migration 20261010000200; área incorpora editor; cleanup protege referência vigente, assetId/contexto e leases | Homologação Cloudinary real segue pendente | Testes focais novos usam fakes; CI cobre Pg/HTTP/EXIF/revogação/cleanup/concorrência; não prova operação real |
| CRI-REV-002 | Preflight antes da rede, preset fora da transação, reautorização/revisão/replay/quotas após rede, tentativa+quatro jobs atômicos | d93124e e 247fe5e; eligibleUpload antes/depois do preset; retry estrito reconhece P2034/P2002/40001/40P01 e formas do adapter | FAILs históricos de quota/commit preservados nos registros | CI de Pg cobre mudanças durante rede, quotas ativa/horária e mesma chave; implementado |
| Retry sob contenção | Três tentativas, recuo limitado fora da transação; não repetir preset nem fingir quota | bf7a2b1; transaction em images/service.ts, recuos 100–150/200–250ms | Campanha/diagnóstico de conflitos e FAILs nas evidências 016 | Focais novos provider/transações 15/15; CI 218; corrigido no alcance testado, contenção ilimitada não garantida |
| CRI-REV-005/contratos | AreaSummary exige capa sanitizada na lista; detalhe mantém projeção própria; exemplos válidos | f38d439; OpenAPI/modelo 003, contrato 016, area.type.ts/serializer/list include; tests/unit/area-openapi-parity.test.ts usa serializer real/Ajv, negativos e detalhe; exemplos incluem laboratory.status | Parecer de aprovação está no commit documental 5ea9823 | Cinco testes Ajv na Unit nova; CI Contract 6; coerência demonstrada, sem alterar serializer para esconder campo |
| Dependências | Preservar patch original e lockfile testado | 99d8363 ancestral; Next/eslint-config-next 16.3.8, sharp 0.35.5 e source-map-js 1.2.2; overrides brace-expansion | Audit histórico em PR7, sem alegação de audit atualizado | npm ci novo com Node 24.19.0; patch incorporado. Não executado novo npm audit; resultados antigos não são estado atual de segurança |
| Seletores IHFR | Alvos nas regiões ARIA visíveis de leitura/gerenciamento, mesmas assertions/guards/timeouts | 8f1f927 e 9412e9a; ihfr-diagnosis-manage.spec.ts; nenhum algoritmo/manifesto científico mudou | Um CI histórico com ausência de controles tem causa INCONCLUSIVA; attempt2 e heads posteriores passam | CI Ihfr 6/6; estabilidade corrigida para ambiguidade observada, sem declarar toda intermitência extinta |
| CI e documentação | Runners protegidos em cluster sintético, guards e FAILs históricos preservados | c65265f/bc3a751; workflow windows/Node24, ACL privada; release/runbooks/specs | Parecer posterior (#6) e 26 documentos/evidências independentes (#7) ainda exclusivos | Conteúdo funcional completo; preservação documental deve ser decidida antes de encerrar #6/#7 |

## Verificações novas e evidência reaproveitada

Worktree documental Linux, fonte 118a3a8, Node **24.19.0**, npm com
package-lock.json do FullStack; instalação congelada via npm ci e geração Prisma
7.4.2. Node padrão do host 20 não foi usado como prova. Uma primeira instalação
iniciada com runtime 22 foi interrompida; a instalação válida foi refeita do zero
com Node 24. Nenhum lockfile foi atualizado. Logs novos ficam em /tmp/hidro-prep-*;
comandos, resumos e hashes estão em [evidencias.json](evidencias.json).

| Verificação nova | Resultado |
|---|---|
| npm ci --no-audit --no-fund; prisma generate | PASS; 562 pacotes, client 7.4.2 |
| npm run typecheck | PASS |
| npm run lint | PASS; 0 erros, 3 avisos em page.tsx, user-profile/index.tsx e white-box/index.tsx |
| npm run test:unit | PASS fora do ambiente restrito: 296 Node + 17 Mail sintético; primeira tentativa restrita falhou em três arquivos, sem contagem equivalente; preservada, não contada como PASS |
| Provider + transações de capas, node --conditions=react-server --import=tsx --test, dois arquivos | PASS fora do ambiente restrito: 15/15; versão restrita só reportava dois processos/arquivos e não foi usada como prova dos cenários |
| npm run build, padrão Turbopack | **FAIL local de ambiente**: primeira tentativa não obteve Poppins/Google Fonts; repetição autorizada falhou em binding de porta/processo ao transformar leaflet.css (Operation not permitted). Nenhum contorno/alteração de aplicação aplicado |

Não se atribui causa exata às três falhas unitárias restritas, cujos logs não
expõem o diagnóstico interno. A repetição sem editar arquivos passou os 313 casos.
O build local **não é PASS**. Sua cobertura é reaproveitada do CI comprovadamente
equivalente, o que permite a conclusão técnica de planejamento sem fingir teste local.

CI do candidato exato 0f669b7:
[run 39064686503](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39064686503),
SUCCESS, tentativa 1, 17/10/2026. A árvore inteira é idêntica a development.
Conferência adicional da RC atual 5ea9823:
[run 39071712863](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39071712863),
SUCCESS, tentativa 1; artefato 12116150353 baixado e inspecionado, com **15/15 gates
PASS, exitCode 0**, entre 21:38:59Z e 21:48:42Z de 17/10.

Os 15 registros são preservados no JSON deste pacote, sem duplicar manifests/logs
inteiros. Unit 296+Mail17; Integration218; Migration37; Contract6; R1 17
(subconjunto, não somar); Build/Typecheck/Lint; E2E72; HTTPS2; Deletion3; Ihfr6;
Bootstrap14 migrations; SchemaAudit0; RegressionSetup. Provedores fake/SMTP
sintético e PostgreSQL17 próprio; não há prova de Cloudinary/Gmail reais.
Igualdade de todos os arquivos fora de docs entre 5ea9823 e 118a3a8 delimita o
reaproveitamento, incluindo specs/contratos, que não entram em todo fingerprint histórico.

Development não tem o workflow RC próprio: o workflow exclui essa branch e o
único check observado no merge é Vercel Preview Comments. Esse check não é prova
de build/testes. Não foi disparada nova run. Não repetidos localmente: integração
com banco, migrations/bootstrap, E2E/HTTPS/contas/IHFR, porque não há mudança
funcional em relação às árvores validadas nem lacuna residual que exija nova bateria.
O banco normal e o harness antigo local não foram iniciados ou modificados.

## Prontidão e pendências separadas

1. **Técnica para planejar:** pronta no corte identificado; nenhuma correção
   esperada foi encontrada apenas fora de development. Build local limitado,
   sustentado por CI equivalente; nenhuma nova regressão material demonstrada.
2. **Documentação/PRs:** #2–#5 candidatos comprovados; #6/#7 têm conteúdo exclusivo.
   Há preservação atual em SHAs acessíveis, não perda de conteúdo. A
   [análise individual e sequência proposta](revisao-dos-prs.md) ficam com Pedro.
   Esse trabalho não foi transferido ao futuro executor do visual.
3. **Serviços reais/produção:** e-mail Gate B012, aceite humano 013, browsers
   adicionais, Cloudinary/preset/cleanup/custos, operadores, migrations hospedadas,
   backup/ensaio e autorização de deploy continuam pendentes. Não bloqueiam o
   planejamento/login local; tornam-se dependências de seus respectivos testes
   reais e de qualquer publicação. Fakes não homologam o provedor.

O IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

`PENDENCIA_DE_DECISAO`: mantenedor escolher como incorporar/preservar o parecer
posterior e os 26 arquivos de revisão antes de encerrar #6/#7. O plano visual é
uma proposta de etapas; só o primeiro recorte/login foi escolhido por Pedro nesta
sessão. Aprovação das etapas seguintes, marca/copy definitivos e eventuais
dependências de UI novas não foram inventadas.

## Preservação e encerramento

Nenhum arquivo de aplicação, dependência, migration, assertion, guard, docs/raw
ou documento histórico foi alterado pela tarefa. Sem push, PR/comentário/review
publicado, fechamento/retarget/resolução de thread, merge entre branches, deploy
ou acesso a dados/provedores reais. Só os FFs locais autorizados e documentos novos
com apontadores datados no contexto e inventário canônicos.

Rechecagem final de refs, integridade, links, diff e commit local: registrada no
[acompanhamento](plano-de-acompanhamento.md) e no JSON de evidências. A branch
documental permanece separada de development; sua entrega é local, sem push.
