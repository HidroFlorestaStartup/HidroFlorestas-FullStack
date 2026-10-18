# Evidências — workspace e shell

Estado: implementação em validação, 2026-10-18. Classificação dos resultados abaixo: EVIDENCIA_IMPLEMENTACAO. Orientações de integração: RECOMENDACAO. Nenhum resultado automatizado substitui aceite humano.

## Baseline e dependência

Worktree única reutilizada `C:/projetos/consolidados/HidroFlorestas-frontend-login`; branch `feat/frontend-workspace-shell`, base `8cacfc99ba0e2876c1036a0f67ec41375806b9ac` da fase 2. [PR11](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/11) aberto para development, sem merge. Seu [CI final39166203271](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39166203271) passou15/15; artefato12150897907 baixado/inspecionado,37 PNGs, fingerprint único `8cdade645e026efe093ab80c153100b18fd07bb7144bc721438c58eabc65e517`. SHA256 do ZIP `489a19a063894b7287246dc394dbfae2989cac0e50bdebc30714ffc60961b9c9`; expira2026-11-01. Recibo final vivo no PR11, evitando commits recursivos de recibo. Fonte do runtime da fase2 passou15 gates locais no fingerprint `24fd4f205161d7395ce31a8e0c927b22c6619af345521616eb0c15b7768e8d0e`.

origin/development `afef5db6ced1a4604a114d842bf85950ac32c69b` e main `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054` reconferidos sem avanço. RC `0f669b79a5e73a329832593229c2557d8b12bbce` e dois ZIPs preservados. Starter oficial `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` somente leitura. Branch preferida estava livre;019 confirmado livre por scan sequential. Não houve merge documental nem criação de outra worktree.

Dependência concreta: AccountShell018 no logout e configuração cumulativa CI/Vercel. Base temporária do PR: feat/frontend-account. RECOMENDACAO: revisão/merge11 pelo mantenedor; depois conferir ancestralidade/diff e redirecionar o PR desta fase para development, revalidando alteração material. Nenhum merge/rebase/force-push pelo agente.

## PLAN e revisão dos testes

Spec Kit specify → plan/setup-plan → pesquisa independente somente leitura → tasks/setup-tasks → analyze/check-prerequisites → implement/check-prerequisites. Hooks ausentes. Checklist16/16;10FR+4SC cobertos por20 tarefas, sem críticos/conflitos. Commit `23d77ed6fde8196fb1936aeb40163fa8c27b4b6f` registra planejamento; `87123c5f2a5d0d0d049bb0989e55996ba32c7739`, testes/evidências RED. Consumidores/rotas/capacidades e reversão inventariados antes de alterar shared files, em [contratos](contracts/ui-contracts.md).

Revisão independente dos testes encontrou main artificial (áreas/membros têm0; resumo/mapa1), cleanup por caso de lifecycle e restauração condicional de vínculo. Corrigidos; cópia exata da inatividade inclui OWNER, sem enfraquecer regras. Removido first() no admin em favor de header escopado. Alerts escopados ao conteúdo/diálogo para não confundir anunciador global do Next. Incluídos wrap de foco nos dois sentidos, menu por foco/clique/resize/navegação e foco livre do rodapé. Tiles OSM abortados como na suite territorial existente, mantendo APIs/roles reais.

## RED antes do código

| Rodada | Fingerprint | Resultado |
|---|---|---|
| Exploratória | Não usada como árvore estável | RegressionSetup PASS; E2E102 PASS/16 FAIL em118 casos |
| RED estável | `fa7d80a6a8ac1b62640b1b47c607d00fa661573e8697999239538ed6dbd6729e` | Typecheck/Lint PASS; E2E104 PASS/16 FAIL em120 casos; todos100 casos existentes PASS |

[Journal exploratório](evidence/red-exploratory.jsonl), [assertions exploratórias](evidence/red-exploratory.log): testes foram corrigidos durante reinícios de workers; não representa16 defeitos confirmados. Capturas parciais before-exploratory preservadas como histórico.

[Journal estável](evidence/red-stable.jsonl), [assertions estáveis](evidence/red-stable.log):20 novos testes congelados antes do código, 21:14–21:19 UTC. Falhas demonstradas: navegação ausente; alvos contextuais menores que44px e overflow320; foco inicial/wrap/retorno após risco; menu/skip; POST/PATCH duplicados no mesmo turno; erros503,404 de vínculo revogado e409 de exclusão fora do diálogo; POST inicial duplicado no logout sob replay de effects em desenvolvimento. Quatro novos testes de preservação já passaram (roles, retry de lista e logout real em duas larguras).36 capturas before estáveis. Código só começou depois dessa coleta.

## Implementação e candidatos intermediários

CSS Modules locais em shell e workspace; layouts server continuam requireAuth/getLaboratoryContext e passam somente capacidades autorizadas para os componentes client. Nenhum novo main no shell; contagem por consumidor conservada. Navegação real com aria-current, um Sair visível por viewport, contexto explicitamente escolhido. Convite segue texto indisponível. Cards usam DTO real e preservam cinco laboratórios incluindo participações/inativos; criação1–100 e payload só name; risco exige nome exato e payload confirmationName.

Diálogo nativo modal com captura/restauração de foco, Tab/ShiftTab contidos, Escape/backdrop/cancel condicionados a busy, foco na confirmação e retorno ao título da lista se trigger foi removido. Erros/retry dentro do diálogo. Travas síncronas de create/risco corrigem duplicações demonstradas; loadFailed separa falha GET de falha de ação. Logout usa AccountShell018 e a função real; a Promise inicial é compartilhada entre subscriptions do replay, retry dispara nova tentativa real.

| Candidato | Fingerprint | Resultado e tratamento |
|---|---|---|
| UI inicial | `370a83dfd1ce915feace20b676b25b54a65f3febc1029a00ea51b8c4ba817cc3` | Unit/Build/Typecheck/Lint PASS; E2E110 PASS/4 FAIL/6 não executados |
| Reflow/confirmação | `0606870fa71e314724ee2e95c108c5c2296cc75126345ec64b7e79657e3cc132` | Build/Typecheck/Lint PASS; E2E118 PASS/2 FAIL |

[Journal UI](evidence/candidate-ui-red.jsonl), [assertions UI](evidence/candidate-ui-red.log). Quatro falhas: nome acessível da marca H1 inseria espaço e quebrava assertion antiga de restauração (seis casos seguintes da suite serial não executados); ShiftTab inicial escapava para BODY no Chromium; summary não expunha papel/estado esperado; erro de criação era interpretado como erro GET e retirava formulário. Corrigidos no componente, sem mudar assertions antigas. Papel button/aria-expanded acompanham o details nativo; trap explícito trata extremidades. Nenhum gate posterior ao E2E foi declarado PASS nessa rodada.

[Journal reflow](evidence/candidate-reflow-red.jsonl), [assertions reflow](evidence/candidate-reflow-red.log), capturas candidate-reflow preservadas. Falha real: “permanentemente” fragmentado no320/texto200. Revisão independente demonstrou também “Laboratórios”/“Configurações” no card/cabeçalho. Causa de apresentação: max-width UA do dialog calculado em em e padding aninhado estreitavam o conteúdo. Largura explícita, padding e fontes móveis corrigidos; assertions por Range verificam palavras inteiras nos controles novos. Outra falha era do teste: clique no H1 fisicamente encoberto pelo menu aberto; trocado por clique real em coordenada externa, sem force e conservando fechamento/foco/aria assertions.

Diagnóstico isolado em HTML mínimo confirmou o comportamento nativo de summary/dialog, sem aplicação, banco ou credenciais. Não é contado como E2E Next nem como gate.

## GREEN e revisão final

Primeira rodada completa estável,21:33–21:42 UTC:15/15 gates PASS no fingerprint `05116ebe207d5e24d10ecad73ffef1fa30d226a595508b08de1a266056b045be`, sem edição de fonte durante execução. [Journal](evidence/green-intermediate-all-gates.jsonl). Unit296+mail17; integração218; migration37; contrato6; R1 17; Build/Typecheck/Lint; E2E120; HTTPS2; exclusão3; IHFR6; bootstrap14 migrations com transação revertida e descarte do banco próprio; SchemaAudit0. Lint0 erros/3 avisos preexistentes.

Revisão independente somente leitura do diff e51 capturas confirmou correção visual dos três P2 de reflow; sem novos achados em autoridade, payloads, logout, diálogo ou cleanup. Dois P2 de evidência foram demonstrados: glob de tiles exigia subdomínio e não bloqueava o host bare usado pelo mapa; captura list-loading já mostrava vazio porque só primeiro GET era retido e o replay do effect permitia segundo GET real. Corrigidos no teste: mesmo padrão exato de territorial-map para tiles, e todos GETs iniciais retidos/falhos até o retry, que segue real. A [captura incorreta](evidence/candidate-list-loading-miscaptured.png) permanece identificada como tal; não prova loading nem defeito produtivo.

A revisão também levantou INFERENCIA sobre centralizar o wrapper inteiro ao focar o skip link. A conferência de geometria/captura após Enter confirmou P2 no Next real: foco correto, porém início/H1 fora da tela. Rodada afetada `dd0b0ef70cd9379d0efd595b01bc68bfde88f6d7c715819b10d57ed00f8f4ab0`: Typecheck/Lint PASS, E2E119 PASS/1 FAIL (somente skip). [Journal](evidence/skip-red.jsonl), [assertions](evidence/skip-red.log), [captura375](evidence/skip-content-red-375.png). Tiles e captura loading corrigidos nessa rodada; nenhuma outra falha. A consequência antes inferida passou a EVIDENCIA_IMPLEMENTACAO com esse resultado, sem tratar inferência como decisão da equipe.

Corrigido só o alvo do skip: guardar currentTarget antes do RAF e alinhar o início do container abaixo do header via scrollBy. Controles individuais continuam centralizados quando obscurecidos. Teste verifica foco, geometria e captura após Enter nas quatro larguras.

Rodada final completa,21:47–21:55 UTC:15/15 gates PASS no fingerprint único `ccc293328f12b906f1cc8166f5befcede53dec831567bb02cad354620916ecb8`, sem edição de fonte durante execução. [Journal final](evidence/green-final-all-gates.jsonl). Unit296+mail17, integração218, migration37, contrato6, R1 17; Build/Typecheck/Lint PASS (0 erros/3 avisos preexistentes); E2E120/120, HTTPS2/2, exclusão3/3, IHFR6/6; bootstrap14 migrations, zero falhas, transação revertida e descarte do banco próprio; SchemaAudit0. Cluster próprio parado ao término.

Revisão independente final do diff e conjunto visual: todos os achados demonstrados resolvidos, sem bloqueios remanescentes. As oito capturas de skip antes/depois de Enter confirmam início/H1 sob o header em375/768/1440/320, inclusive acima do rodapé com texto200. Loading/erro agora coerentes; palavras inteiras/foco confirmados no320. Revisor não executou testes próprios, leitor de tela ou outros navegadores; resultado dos gates vem do runner oficial, sem confundir as fontes.

Capturas finais:58 arquivos `evidence/after-frontend-workspace-*.png`, selecionados pela data UTC a partir do início do E2E final (21:49:52.867), sem incluir o skip-focus.png antigo do archive ignorado. Esse arquivo foi preservado localmente como histórico; CI limpo não o produz. Conjunto cobre vazio/lista/configurações/confirmação nas quatro larguras,16 consumidores,4 admin, menu/skip/foco, loading/erro de leitura/criação/risco/logout e impedimento real de exclusão. Antes36 estáveis, parciais exploratórios e candidatos RED permanecem identificados. Nenhum trace/prova/senha/cookie publicado.

## Publicação

Allowlist/if da branch e Previewfalse preparados antes do push;15 gates e guardas conservados. Commits de planejamento e testes precedem a implementação. Commits próprios publicados:

- `23d77ed6fde8196fb1936aeb40163fa8c27b4b6f` — plano/contratos/qualidade.
- `87123c5f2a5d0d0d049bb0989e55996ba32c7739` — testes e baseline RED.
- `cb506a74d33b8a8c72d456bc327510fcef69f911` — implementação e correções demonstradas.
- `90d60e3dedcb918a1585ccc7bd21a9ec6439f983` —15 gates locais, revisão e capturas finais.

[PR12](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12) aberto com base temporária feat/frontend-account, SHA-base8cacfc99ba0e2876c1036a0f67ec41375806b9ac. GitHub confirmou4 commits/161 arquivos próprios na publicação inicial, ancestralidade verificada e zero caminhos inesperados. Fetch anterior ao push reconfirmou main/development/PR11 sem avanço. PR11 também aponta para12 e preserva a ordem de integração; nenhum merge/deploy.

[CI inicial39170036587](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39170036587), HEAD `90d60e3dedcb918a1585ccc7bd21a9ec6439f983`: **FAIL**. Nove gates PASS; E2E119 PASS/1 FAIL; cinco gates posteriores não executados. Fingerprint único `2f7ff2f05d953a5e545013698336fb8ea101ef2e97866a76baecdbcdc43cc6d8`. [Journal](evidence/ci-initial-red.jsonl), [erro completo](evidence/ci-initial-red.log). Artefato12151584361 baixado/inspecionado,196 PNGs: contém duplicatas do archive e test-results, pois o gate falhou antes da limpeza dos posteriores;58 capturas únicas do workspace. Digest do ZIP `f9c023db11c954b314379ff1eb242a2f3807a9c2e4731faa21638065c66b40e9`, conferido localmente; expira2026-11-01. Download parcial de entradas e arquivo completo produziram journals idênticos. Nenhuma falha foi atribuída ao IHFR nem ocultada por retry.

Falha do novo teste de histórico: goBack terminou, mas URL permaneceu em /areas durante5s. A pré-condição anterior aguardava apenas URL e nome do laboratório do layout SSR; não comprovava leitura/hidratação da página de áreas. Correção somente no teste: aguardar cartão exato da área fixture, carregado pelo useEffect/GET real, antes e depois de reload, e estabilizar navegação; conservar um goBack e URL exata, acrescentando título e papel após retorno e mantendo API200/403. Fonte da aplicação, AuthContext, AuthSessionRestorer e guardas intactos. INFERENCIA: uma corrida durante conclusão da navegação pode explicar a intermitência; não houve prova de histórico duplicado nem de defeito da aplicação. A conclusão remota dependerá de nova execução completa, sem presumir PASS.

Validação local afetada22:11–22:16 UTC: Typecheck/Lint PASS (0 erros/3 avisos preexistentes), E2E120/120 PASS, fingerprint único `5a64846a138ba3b225272b8409e79429a87443ed7ab2f6b6d2262255a5a21e62`. [Journal](evidence/green-history-sync.jsonl). Revisão independente do diff mínimo sem achados: todas as assertions anteriores conservadas, pré-condição comprova leitura/hidratação real, sem alterar src. As58 capturas finais continuam representando a mesma fonte de apresentação; somente sincronização/assertions do teste de histórico mudaram após a rodada completa local. O CI do próximo SHA executará novamente15 gates. Após PASS e inspeção, um recibo documental será publicado; o HEAD desse recibo também será validado, com resultado final vivo no PR para evitar recursão de commits.

## Limites

Somente PostgreSQL sintético próprio em loopback/runner oficial, sem InitializeCiCluster local. Sem .env produtivo, Neon/Gmail/Cloudinary reais; guards/fixtures/origens/ACL preservados. Capturas mascaram campos preenchidos; trace/video/autoscreenshot desligados nos novos testes e inputs limpos no teardown. Nenhuma prova/token/cookie é publicada.

Testes automatizados/Chromium e revisão do agente não equivalem a aceite humano, leitor de tela manual, WCAG integral ou homologação produtiva. Ciência IHFR permanece inalterada e experimental conforme ADR0001 (`CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`); intermitência histórica não é apagada.

Páginas antigas não foram redesenhadas; reflow difícil já presente em conteúdo legado320, observado antes/depois, permanece fora do recorte. Revisão visual verifica novo chrome e acesso/função por suites oficiais; não certifica acessibilidade integral dessas páginas.
