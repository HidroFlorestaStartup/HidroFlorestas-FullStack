# Atualização de contexto e prontidão — 18/10/2026

## Resultado vigente — integração do login e handoff das fases 2 e 3

**Login/Spec017 integrado em development; execução completa das fases2 e3
autorizada por Pedro para o outro desenvolvedor.** A preparação documental desta
continuação está publicada na branch `docs/handoff-frontend-fases-2-3`,
criada de `afef5db6ced1a4604a114d842bf85950ac32c69b`. O [PR10](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/10) está aberto, somente
documental, para development, sem auto-merge ou merge nesta rodada. O handoff pode ser lido
diretamente da branch enquanto o mantenedor o revisa.

`DECISAO_CONFIRMADA`: origem no pedido de Pedro “sincronização, merges #8/#9 e
handoff das fases 2 e 3”, anexado ao seu Codex em18/10/2026. Autoriza esta
sincronização/revisão/aprovação cabível/merges/publicação; autoriza o outro
desenvolvedor a implementar, validar, fazer commits, push e abrir/atualizar PRs
de cadastro/conjunto de conta e workspace/shell. Substitui a proposta limitada
ao cadastro e a espera de autorização de execução após login. Fases4+ não
autorizadas. Aceite humano/merge dos futuros PRs continuam com o mantenedor.

### Operações remotas efetivamente confirmadas

| PR | Head revisado | Resultado |
|---|---|---|
| [8](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/8) | 95463d5b0a29d75e916d2115765792444438db44 | MERGED em **cf7f086351c952be5b7cc51f9616bc68bfd84f4d**, pais e17f64a/95463d5; dez documentos; sem autoaprovação de Pedro |
| [9](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9) | 550308247d712c920dede8d96b5f1e6140767d10 | MERGED em **afef5db6ced1a4604a114d842bf85950ac32c69b**, pais cf7f086/5503082; APPROVED de Pedro no head exato |

[Review5564336503](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9#pullrequestreview-5564336503):
conta autenticada **PedroVitor237**, APPROVED no SHA5503082, registro transparente
por Codex autorizado por Pedro, sem alegar teste manual ou revisão de terceiros.
Horários GitHub: merge8 2026-10-18T18:42:36Z; review9 18:44:27Z; merge9 18:44:44Z
(15:42:36/15:44:27/15:44:44 em America/Fortaleza).

Mergeabilidade CLEAN, sem conflitos; sem reviews/threads anteriores nos dois
PRs. Conta tem push, merge commit habilitado, delete_branch_on_merge=false;
development protected=false, rulesets e regras efetivas vazios. Nenhum bypass,
alteração de proteção ou exclusão de branch. Merges via API com sha esperado;
estados MERGED e pais/árvore conferidos depois por Git/API.

### Revisão material e equivalência

Leitura do diff contra a development e do AuthContext: login continua por
`useAuth().signIn({email,password})`; senha e payload não transformados, destinos
continuam no servidor/contexto. Readiness via useSyncExternalStore, fieldset
inerte antes de hidratar e useRef de envio duplicado; aria-invalid deriva apenas
dos campos localmente vazios, erros gerais permanecem no alerta. CSS Module
local, marca e Poppins preservadas. Sem mocks/TanStack no produto.

AuthContext/API/banco/prisma/globals/layout/package/lockfile sem diff. Workflow
inclui feat/frontend-login em push.branches **e** if do validate; ajuste de upload
somente para screenshots focais. vercel.json exclui preview dessa branch.
Runners,15 gates, Actions/permissões/guards preservados. Ausência de status Vercel
no head9 não é ausência de CI: validate oficial foi consultado diretamente.

PR8 alterou dez documentos; PR9 tem43 caminhos: dois de produto, um teste, dois
de configuração e38 de specs/evidências. Nenhum caminho comum. Merge-tree antes
da integração produziu **0210b54b648b42e38fea853e650061463c3fd365**, exatamente
a árvore do merge9 real. Diff merge9 versus head9 contém somente os dez arquivos
documentais de8; **todos os blobs de produto/testes/configuração são iguais**.
Não atribuímos CI do head a uma árvore funcional diferente.

### CI utilizado e ressalva histórica

[validate/SUCCESS](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39145086835/job/117727186936),
run39145086835, attempt1, evento push, SHA exato5503082. Artefato12143033430,
rc-validation-550308247d712c920dede8d96b5f1e6140767d10, baixado e inspecionado.
Seu results.jsonl contém **15 gates PASS/exit0**, um único snapshot funcional
21b7d67392dea33fc4721f07abe8392afce4624fd4b26f6913b70c6200cf81a5:
RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck,
Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Logs confirmam E2E86,
HTTPS2, exclusão3 e IHFR6;14 casos de login integram a suíte atual.
Ambiente: Windows/Node24.19/PostgreSQL17 próprio em loopback.

Ressalva aceita por Pedro na autorização atual: **292dd95 falhou nos seis IHFR,
causa não demonstrada**. acba40d e5503082 passaram; PASS posterior não prova
correção nem elimina o FAIL anterior. Arquivos históricos da017 preservados.
Nenhuma investigação paralela, relaxamento de teste/assertion/guard ou alteração
científica foi introduzida. Registrar eventual recorrência material nas fases.

Não se repetiu bateria funcional local apenas por merge documental, conforme
autorização e equivalência demonstrada. Não se executaram teste manual de
leitor de tela, homologação de e-mail/Cloudinary, migração remota ou deploy manual.
Workflow RC não roda em development nem na nova branch documental. Checks/status
automáticos da integração conectada são observações separadas, não nova bateria,
aceite operacional ou promoção para main.

Consulta posterior confirmou status **Vercel/SUCCESS** nos merges cf7f086 e
afef5db e **Vercel Preview Comments/SUCCESS** em afef5db. São efeitos automáticos
da integração Git conectada; nenhum comando/API de deploy foi executado e
nenhum novo validate foi atribuído a esses merges.

### Sincronização e handoff

Checkout principal inicialmente limpo em developmente17f64a; fetch pós-merges e
`git merge --ff-only origin/development` para **afef5db**, agora0/0. Main local/
remota **beba96fbf6bbaac8771dbb29abea2f9f8f5b0054**,0/0, sem promoção. Branch
docs/preparacao-frontend-20261018 continua95463d5,0/0; feat/frontend-login criada
localmente como tracking5503082,0/0; review/cri-rc-validation-20261012 continua
a01857b,0/0 e worktree limpa. Registro da worktree documental antiga ausente
preservado, sem prune. Nenhuma divergência local ou mudança preexistente descartada.
Origin oficial FullStack e starter conferidos; upstream antigo não utilizado.
Fetch do starter realizado para consulta; main visual continua cbb954a.

No clone visual oficial, origin foi atualizado por fetch; maincbb954a e branch
atual fix/login-http-rede-local2267250 já estão0/0; a branch histórica1472166
foi somente registrada, também0/0. package-lock.json não rastreado preservado,
SHA256 e3e1790a8eec7dcb26780cd57ec870783dc41877a56ade101f3e165e0c7f26cb
antes/depois. Nenhum código alterado, troca de checkout ou prune de worktree
ausente no starter. Instruções AGENTS locais consultadas, sem reescrita de histórico.

O [novo prompt](prompt-de-execucao-fases-2-3.md) contém autorização, bases reais,
mapa completo de contas e shell, contratos/idempotência/hidratação/contexto,
Spec Kit por fase sem presumir IDs, CI/preview por branch e evidências sanitizadas.
Fase3 pode usar PR empilhado sobre o head validado da2 enquanto aguarda merge,
com dependência/base temporária explícita e futuro retarget/revalidação; o merge
não foi delegado. Fases4+ continuam propostas. A análise externa anterior não é
pré-requisito nem foi copiada para o repositório.

Verificações documentais/resultados e encerramento registrados no
[acompanhamento](plano-de-acompanhamento.md) e no
[JSON sanitizado](integracao-login-e-handoff-fases-2-3.json).
Pendências reais: revisão/merge do PR documental pelo mantenedor; implementação
e validação das fases2/3 pelo outro desenvolvedor; respectivos aceites/merges;
gates operacionais/científicos anteriores nos próprios alcances. Nenhuma nova
autorização normal de execução das fases2/3 é pendente. TECH_DECISIONS e
PENDING_DECISIONS não requerem alteração global nesta preparação.

Publicação remota conferida: commit inicial **7ff421c9f560b8846a1b5d782eb6432324afd782**,
branch com upstream próprio e PR10 OPEN/MERGEABLE, oito caminhos documentais.
Validação nova desta preparação: diff/check/escopo,75 links locais, JSONs,
preservação dos corpos históricos e padrões sensíveis PASS. O commit posterior
de encerramento registra esses fatos; seu head final é conferido separadamente.
Vercel inicial do head7ff421c PENDING e Preview Comments SUCCESS, sem confundir
esse status automático com validate funcional ou homologação.

## Registro histórico de prontidão e da continuação anterior

Tudo abaixo conserva os cortes anteriores. Afirmações de PR8 aberto, login
futuro ou espera de autorização depois dele foram superadas nos pontos acima.

**Development: PRONTO PARA PLANEJAR A INCORPORAÇÃO.**

**Atualização posterior, 18/10/2026:** a base atual é
`e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`. A continuação expressamente autorizada
por Pedro integrou o #6 por `ebbd9cb707ac2db98c56ad1ba5f344802233057c` e o #7
por `e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`, ambos em development, com merge
commits e head esperado. #2–#5 foram encerrados sem novo merge, com comentários.
Somente 28 caminhos em docs/** mudaram em development; código, dependências,
tests, specs, migrations e configuração continuam iguais ao corte inicial.
A conclusão técnica e os limites dos testes permanecem válidos. Evidência desta
continuação em [conclusao-dos-prs.json](conclusao-dos-prs.json) e na seção final.

`INFERENCIA` técnica sustentada por Git, inspeção de código, validações locais e CI
equivalente. Próximo passo: Pedro revisar o [plano](plano-de-incorporacao.md) e
entregar o [prompt](prompt-de-execucao.md) ao outro desenvolvedor para executar
somente o primeiro recorte aprovado: visual do login com autenticação real.
A incorporação não foi implementada nesta rodada.

## Autoridade, método e alcance

As seções até “Preservação e encerramento” abaixo preservam o **snapshot da
preparação anterior aos merges documentais desta continuação**. Afirmações ali
sobre conteúdo exclusivo, recomendações e ausência de ações remotas pertencem
àquele corte; a seção final registra o estado posterior efetivamente observado.

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

## Continuação autorizada — estado posterior dos PRs

`DECISAO_CONFIRMADA`: novo pedido de Pedro nesta sessão de 18/10/2026 autorizou
retarget, aprovação de Pedro no #6, merges documentais #6/#7, encerramentos #2–#5
e publicação da preparação em branch/PR próprios, sem merge do novo PR.
`FATO_DOCUMENTADO`: Pedro declarou que Luciano já revisou. A origem dessa
informação é a declaração de Pedro; não foi criado APPROVED, comentário ou
resolução de thread em nome de Luciano.

| Operação | Resultado efetivamente confirmado |
|---|---|
| #6 | Base development; head5ea9823; [APPROVED de Pedro](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#pullrequestreview-5561665473), review5561665473, explicitamente registrada por assistente autorizado. Review CHANGES_REQUESTED antiga preservada. MERGED em ebbd9cb, pais118a3a8/5ea9823, árvore8885a1cf75a3bc134518b2197c3e828002fd8d53; somente parecer130 linhas e README+8 |
| #7 | Base development atualizada; heada01857b; MERGED em e17f64a, paisebbd9cb/a01857b, árvore178f0e468aee4f38444a9d1370876987d4243738. Sem autoaprovação: zero reviews; [comentário contextual](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7#issuecomment-6246335720). Os26 blobs exclusivos iguais à fonte, dois documentos de #6 intactos |
| #5 → #4 → #3 → #2 | CLOSED sem novo merge, heads originais reconferidos ancestrais da development final e zero commits exclusivos. Comentários/URLs na revisão dos PRs; sem excluir branches ou alterar reviews/threads |

Descrições anteriores de #6/#7 preservadas integralmente sob histórico; conferência
por comparação do sufixo exato e SHA256 do texto original. Retarget/título/resumo
descrevem agora a diferença documental real. Antes dos merges: conta
PedroVitor237 com push; merge commit habilitado; delete_branch_on_merge=false;
development protected=false, rulesets/regras aplicáveis vazios e
branchProtectionRule=null. Endpoint de proteção detalhada retornou404. Nenhum
bypass foi solicitado, nenhuma regra alterada. Mergeabilidade CLEAN e SUCCESS dos
checks dos heads exatos foram reconferidos após retarget; nenhum novo check falho.

Checks reaproveitados: validate/SUCCESS de 5ea9823 (run39071712863) e a01857b
(run39064689472). Novo Vercel Preview Comments/SUCCESS nos dois merges;
status automático Vercel/SUCCESS também observado nos dois commits.
Não foi solicitado deploy por comando/API nem operado o provedor; o status
Vercel resulta da integração Git já conectada e não é homologação operacional,
autorização de produção ou nova execução dos15 gates. O workflow RC não inclui
development. Não houve nova bateria funcional por mudanças documentais; os
296+17/15 focais locais e CI equivalente conservam seu alcance anterior. O build
local continua registrado como FAIL por restrições do ambiente.

Sincronização: development local118a3a8 estava0/19 frente à remota final; FF seguro
para e17f64a, agora0/0. Main local/remota continuam beba96f,0/0. Revisão local
a01857b segue alinhada à própria remota, preservada. Branch documental preserva
dcc54e1 e seus nove arquivos, mais commit80e5ac1 e merge local e70d8d6 com
development; sem reescrever histórico. Conflito aditivo em DOCUMENT_REGISTER
resolvido conservando integralmente ambas as seções13/10 e18/10, comprovadas
contra os estágios Git. O novo PR da preparação contém só essa documentação e
permanece para revisão; o frontend não foi implementado.

Plano e prompt atualizados para a base e17f64a. Gestão da pilha concluída por
Pedro com seu Codex; não há encerramento/revisão preparatória delegado ao futuro
executor do login. Próximo passo: Pedro revisar o plano com o ChatGPT.

Publicação da preparação: branch `docs/preparacao-frontend-20261018`, primeiro
head publicado c2adb40 e [PR8 aberto para development](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/8),
sem auto-merge. Dez arquivos documentais: nove da entrega inicial preservados e
novo JSON de conclusão. O commit posterior deste registro mantém o histórico;
o SHA final é informado na entrega. A consulta inicial do PR8 observou Vercel
Preview Comments/SUCCESS e status automático Vercel/PENDING; resultado do head
final deve ser lido separadamente, sem confundir status com teste funcional novo.

### Caminhos alterados em development nesta continuação

Diff completo de 118a3a8 até e17f64a: **28 caminhos, exclusivamente docs/**.
Lista exata também preservada no JSON, com verificação de ausência de mudanças
fora desse diretório. A relação abaixo é saída do Git, não inventário inferido.

```text
M	docs/governance/DOCUMENT_REGISTER.md
A	docs/plans/completed/revisao-release-candidate-cri-20261012.md
A	docs/releases/2026-10-10-cri-rc/2026-10-17-parecer-aprovacao-integracao-development.md
A	docs/releases/2026-10-10-cri-rc/cri-rev-publication-20261015.json
A	docs/releases/2026-10-10-cri-rc/cri-rev-validation-handoff-20261015.md
M	docs/releases/2026-10-10-cri-rc/readme.md
A	docs/reports/audits/2026-10-13-cri-rc-ci-followup-evidence/ci-validation.json
A	docs/reports/audits/2026-10-13-cri-rc-ci-followup-evidence/pr5-attempt1-e2e-failure.txt
A	docs/reports/audits/2026-10-13-cri-rc-ci-followup-evidence/pr7-attempt1-ihfr-failure.txt
A	docs/reports/audits/2026-10-13-cri-rc-ci-followup.md
A	docs/reports/audits/2026-10-13-cri-rc-evidence/browser-results.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/build-typecheck-lint.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/cover-after-page-reload.png
A	docs/reports/audits/2026-10-13-cri-rc-evidence/cover-after-reload.png
A	docs/reports/audits/2026-10-13-cri-rc-evidence/cover-reproduction.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/database-cleanup.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/database-server-proof.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/database-tests.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/migration-integrity.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/npm-audit-original.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/npm-audit-patched.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/npm-audit-production.json
A	docs/reports/audits/2026-10-13-cri-rc-evidence/npm-ci.txt
A	docs/reports/audits/2026-10-13-cri-rc-evidence/npm-explain-source-map-js.txt
A	docs/reports/audits/2026-10-13-cri-rc-evidence/npm-ls.txt
A	docs/reports/audits/2026-10-13-cri-rc-evidence/prisma-generate.txt
A	docs/reports/audits/2026-10-13-cri-rc-evidence/unit-mail-summary.json
A	docs/reports/audits/2026-10-13-revisao-release-candidate-cri.md
```
