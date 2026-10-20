# Evidências da continuidade R3 — 20/10/2026

## Fechamento da candidata funcional e gate do HEAD publicado

A candidata funcional `5f5d8719e25856b59e84c053cb13d2516dbeac49` terminou com **15/15 gates PASS, 182/182 E2E PASS e Codex concluído sem findings no mesmo SHA**. Os três threads materiais da PR foram respondidos com evidência e resolvidos, preservando os comentários originais. A PR permanece Draft, com base `development`; nenhum merge ou deploy foi executado.

| Proveniência | Valor |
|---|---|
| Run / tentativa / job | [39469650449](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39469650449) /1 /118790047117 |
| Artifact |12286659078;19.261.404 bytes;469 entradas; digest e CRC conferidos |
| SHA256 do ZIP | `57748ae803485ddff742b5f43dcaaf6a8ec76f12b1788e2788cef39d0587956e` |
| Fingerprint | `232054c356319f3b990ae6dc2bef6f0ab61be1e792d55471d606519b0429504a`;556 inputs funcionais; reprodução Windows correspondente |
| Codex efetivo | [6297489682](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6297489682), completed, sem findings |

| Gate | Resultado / contagem |
|---|---|
| RegressionSetup | PASS |
| Unit | PASS,353+17 |
| Integration | PASS,229 |
| Migration | PASS,37 |
| Contract | PASS,6 |
| R1 | PASS,17 |
| Build | PASS |
| Typecheck | PASS |
| Lint | PASS;3 warnings preexistentes |
| E2E | PASS,182/182;0 FAIL/SKIP/NOT_RUN/flaky |
| Https | PASS,2/2 |
| Deletion | PASS,3/3 |
| Ihfr | PASS,6/6 |
| Bootstrap | PASS |
| SchemaAudit | PASS |

[Recibo completo](evidence/r3/third-candidate-receipt.json), [inventário](evidence/r3/third-candidate-capture-inventory.json), [galeria de todos os26 quadros de aplicativo](evidence/r3/official-v3/README.md) e [manifesto de cópias byte a byte](evidence/r3/third-candidate-versioned-captures.json). Os2 pares sintéticos estão separados e não contam como pixels do app. As capturas sobreviveram aos gates Deletion/Ihfr.

A inspeção independente cobre26 quadros de aplicação:7 vistos nesta rodada e19 com SHA256 idêntico aos pixels v2 já examinados. Os18 quadros finais têm o controle principal inteiro; os6 quadros anteriores ao posicionamento têm contexto carregado. O coordenador também examinou diretamente os quadros320×900/texto200 e detalhe antes/depois em844×390/texto200. [Parecer visual e limitações](evidence/r3/third-candidate-visual-review.md). Máscaras sobre navegação, indicador Next, ação secundária parcialmente fora em paisagem e ausência de aceite físico/assistivo continuam explícitos.

O cenário A → B → A e a jornada de conta estão incluídos na suíte integral aprovada. O reporter de pontos não enumera nominalmente cada PASS; essa inferência é declarada no recibo. A causa histórica da conta permanece inconclusiva. O sucesso da fase6 não determina a causa do404 do gate IHFR observado na fase7 v2.

### Regra de encerramento por SHA

Este commit consolida documentação e evidência da candidata funcional nomeada; não muda inputs funcionais. **A entrega técnica do HEAD publicado, inclusive este commit documental, exige novamente15/15 gates e Codex concluído sem achado material no SHA exato.** O resultado será registrado após a execução em recibo externo na [PR #18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18), com SHA/parent, run/tentativa/job, contagens, artifact/digest/fingerprint e recibo efetivo do Codex. Publicar o recibo que confirma esses critérios encerra o gate sem alterar o commit validado. Qualquer novo commit exige nova conferência; até o recibo confirmar os critérios acima, o HEAD de consolidação está **AGUARDANDO_VALIDAÇÃO_EXATA**. Checkboxes desta Spec aplicam-se somente ao SHA que nomeiam.

## Histórico — preparação da terceira candidata: tratamento dos achados Codex da segunda

A revisão externa do HEAD `2a047d10360803517ff6bf64b38754cd0f07f5ba` terminou com dois achados materiais: [P1 — callback de ResizeObserver ainda pendente](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#discussion_r4328054767) e [P2 — screenshot anterior à espera concluía transições](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#discussion_r4328054781). O [recibo histórico com triagem](evidence/r3/second-candidate-codex-findings.json) preserva o estado externo `completed_with_findings`; correção local não equivale a fechamento da revisão.

| Contraprova focal | Resultado observado | Correção preparada |
|---|---|---|
| P1: continuar no mesmo turno do renderer após dois frames | 3/3 RED: a espera resolvia com foco pendente; a rolagem do botão era desfeita de y591 para y1696. O helper publicado com dois comandos Playwright separados permaneceu GREEN em 3/3: o segundo roundtrip chegou depois do callback. Não se atribui a ele um FAIL que não foi observado. | A função real `waitForMissionRender` resolve em uma tarefa de `MessageChannel` após os callbacks do segundo frame; ambas as portas são fechadas. Remover apenas essa tarefa da função real produziu 3/3 RED; a função corrigida teve 3/3 GREEN. |
| P2: captura antes da espera com `animations: disabled` | O screenshot concluiu a transição 266,7ms antes do término natural, e a espera entrou sem animação ativa. | A captura antes da rolagem acontece depois da espera; todas as capturas usam `animations: allow`. A transição real de300ms estava ativa na entrada, terminou naturalmente antes da captura, e houve zero rolagens antes/uma depois. Helper real 1PASS; inversão isolada da ordem 1FAIL esperado. |

As contraprovas completas estão em [ResizeObserver tardio](evidence/r3/late-resize-observer-counterproof.json) e [ordem de captura natural](evidence/r3/natural-capture-order-counterproof.json). A suíte permanente chama a função de navegador real, sem copiar seu algoritmo. A fixture de captura inicia a transição na primeira consulta nativa de animações, no mesmo turno, para não depender da velocidade de roundtrips. Nenhum teste amplia timeout, usa sleep, desfoca o input ou repete a rolagem do controle.

D executou a suíte final independente: **23/23 PASS**, zero fail/skip/flaky, Playwright1.55.1/Chromium153 no Linux, sem Next ou banco. O helper tem SHA-256 `1f42fdaceba56e7251036018f68ebcc2fc1aa3bb85821ea99d6228670d8dfb6f`. O núcleo geométrico, com9 pontos e bounds estritos, permanece inalterado. `npm run typecheck` passou; lint exit0, com os mesmos três warnings anteriores fora do delta. [Recibo independente](evidence/r3/third-candidate-independent-review.json).

O bloco de cópia durável não mudou desde a prova de duas invocações; o digest antigo da função completa de captura é histórico, pois sua política de animação mudou. O novo trecho tem2324bytes, SHA-256 `310a3c38e0401bf58b8fa196c67ea28116b94b282f05305bb359ba420c6f9e80`. As matrizes do aplicativo permanecem iguais; a nova suíte acrescenta um par PNG/JSON classificado como contraprova sintética. A seleção esperada passa a182 E2E na fase6 e190 na fase7; essas contagens só serão resultado após o runner oficial.

A segunda candidata `2a047d10360803517ff6bf64b38754cd0f07f5ba` terminou o [run39465489762](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39465489762), tentativa1/job118775663664, com **15/15 PASS e180/180 E2E**, zero fail/skip/not_run/flaky. Unit353+17, Integration229, Migration37, Contract6, R1 17, Https2, Deletion3 e Ihfr6 passaram. Fingerprint `3c6ce0de33c449bd47ebae526af8be011a08f46b8e5f5b4a9213ad268393618c`, reproduzido dos556 inputs do checkout Windows. Artifact12285318854:19.259.628bytes,467 entradas; ZIP SHA-256 `9f03b69123144f461f36a42a1aaf13680f6fd314b322aac26aa57bdab2b56e43` e CRC conferidos.

Os27 pares PNG/JSON sobreviveram a Deletion/Ihfr:26 do aplicativo (24 da matriz,2 de fluxos) e1 negativo sintético. Todos os metadados conferem HEAD, viewport, escala e fullPage:false. [Recibo oficial](evidence/r3/second-candidate-receipt.json) e [inventário com hashes](evidence/r3/second-candidate-capture-inventory.json). O coordenador inspecionou o botão em320×900/texto200 e o detalhe antes/depois da rolagem em844×390/texto200. C inspecionou todos os26 PNGs de aplicativo:18/18 quadros finais mostram os alvos inteiros. [Parecer visual completo](evidence/r3/second-candidate-visual-review.md), [resumo](evidence/r3/second-candidate-visual-summary.json) e [metadata/hashes](evidence/r3/second-candidate-visual-metadata.json) registram também máscaras sobre navegação, indicador de desenvolvimento e ação secundária parcialmente fora do enquadramento em paisagem. Os quadros antes/depois mostram posições de rolagem no mesmo código, não uma comparação anterior/posterior à correção de CSS.

Classificação: `RUNTIME_PASS_CODE_REVIEW_FINDINGS`, pois os P1/P2 acima pertencem a esse SHA. Os novos commits exigem novamente15 gates, inspeção de capturas e Codex no SHA exato. Resultados das candidatas anteriores não aprovam o novo HEAD; aceite humano permanece pendente.

## Primeira candidata publicada: runtime verde, capturas ausentes

HEAD `6fd80667f4270ce43536963762444f6893f0c347`, [run 39460675003](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39460675003), tentativa 1, job `118759009196`: **15/15 gates PASS**, todos exit0; E2E **179 PASS / 0 FAIL / 0 SKIP / 0 NOT_RUN**. Unit353+17, Integration229, Migration37, Contract6, R1 17, Https2, Deletion3 e Ihfr6 passaram. O reporter `dot` não imprime títulos aprovados; a atribuição dos cenários críticos deriva da seleção integral de179 testes, sem filtros ou skips, conferida no código do SHA executado. Inclui conta, POST real com resposta perdida e coleta A → B → A com uma única persistência.

- Fingerprint único dos15 gates: `a9e5ee3e5f13df55548388eba36f032eda36a2cc720ff4634ddd4163d8fe97c9`. Reproduzido exatamente dos556 arquivos funcionais usando filtros de checkout Git `core.autocrlf=true`; a diferença do snapshot Linux foi explicada por conversão de finais de linha.
- Artifact `12283368091`, SHA-256 verificado `0339585f8fdcdc85173276c1465bc9ab3232f9d628cb3869fe5a5ad9911e4c66`,413 entradas. **Nenhum PNG/JSON de coleta sobreviveu.** Deletion/Ihfr iniciam outras execuções Playwright, que limpam o mesmo `test-results`; o upload só acontece depois.
- [Codex concluído nesse SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6296267275), sem findings ou pendências materiais. Isso não aprova um commit posterior.
- [Recibo sanitizado completo](evidence/r3/first-candidate-receipt.json). Classificação: `RUNTIME_PASS_VISUAL_EVIDENCE_INCOMPLETE`; não é aceite visual.

A fase7 herdou o mesmo helper no HEAD `5ca520500298a2066f2072290998754a4a62d42e`. No [run 39461576673](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39461576673), o botão Revisar coleta em320×900/texto200 ficou em y1726..1860, fora do viewport:9/9 probes sem hit, INPUT ainda focado. A transição global de300ms aciona ResizeObserver/revealFocus depois da barreira de um frame. O foco retorna ao campo e desfaz a rolagem do teste. Essa nova evidência mantém o achado H4 aberto até sua correção, embora a primeira candidata fase6 tenha passado; não se classifica como flakiness.

A continuação preserva PNGs mascarados e JSONs em `.accounts-validation/frontend-collections`, com namespace por teste/retry/repetição e tipo de evidência. O detalhe passa a ter quadros separados antes da rolagem e depois da asserção completa. A sincronização complementar abaixo conclui transições finitas e callbacks de foco sem repetição de scroll, blur, aumento de timeout ou alteração do shell. A nova candidata exige novo CI e Codex no próprio HEAD.

## Histórico da segunda candidata: correção H4 e preservação de capturas

A reprodução auxiliar de B usa cliente React real (`ApplicationShell`, `useContentScroll`, `CollectionForm`), CSS Modules, Tailwind e `globals.css`; Next/router/autenticação são adaptados, Arial é fallback e não há backend ou banco. Em24 ensaios, um frame, dois frames sem aguardar animações e uma única rodada de `animations.finished` falharam6/6 cada. Aguardar todas as gerações finitas passou6/6, mas a fixture mínima permanente revelou que ainda faltava drenar a última entrega de ResizeObserver: sem rechecagem pós-frame, a versão com um frame adicional teve2FAIL/1PASS; com dois frames causais teve3PASS.

A versão integrada aguarda somente animações `running` com término finito, repete a enumeração após cancelamento/substituição, conclui o ciclo de render em dois `requestAnimationFrame` e reavalia antes da **única** rolagem. Não desativa animações, não remove foco e não eleva timeout. A contraprova independente de `pending pause` evita aguardar uma promise `finished` que não terminaria; `pending play` já é `running`. O núcleo geométrico permanece byte a byte igual ao de6fd8066, com9 probes e bounds estritos.

- Helper final: SHA-256 `c1b80896798fbab2ec42eed9bb76978606a071b88b970e826e7b5c0db330ade1`; B executou a nova fixture3/3 PASS, sem instrumentação entre barreira e scroll. INPUT focado, exatamente1scroll,9hits e animação infinita preservados.
- D executou **21/21 PASS**, zero fail/skip/flaky, incluindo obstrução real em bordas/centro/canto, clipping, overflow, foco e a matriz de seis viewports. [Revisão independente](evidence/r3/transition-focus-independent-review.json) e [contraprova de pausa](evidence/r3/animation-pause-counterproof.json).
- [Resumo das contraprovas](evidence/r3/transition-focus-summary.json), [antes](evidence/r3/transition-focus-before.png) e [depois](evidence/r3/transition-focus-after.png) da sincronização no cliente React auxiliar; ambos fullPage:false, valores mascarados. Estes pixels não são capturas do runner oficial.
- C importou o helper integrado e executou duas invocações Playwright: **2PASS +1PASS**. A segunda removeu4 arquivos temporários, mas preservou os4 duráveis byte a byte, com nomes de teste distintos e classificação de jornada/negativo. Os globs do workflow encontram ambos os pares. [Recibo](evidence/r3/capture-preservation.json).
- O trecho de captura exercitado permaneceu idêntico após a última mudança de sincronização: SHA-256 `b014a7de2dd82ee1ef89437640e735fcea3e77264c0ceaa606652c9997bb2d98`. A cópia não prova o upload oficial; isso será conferido no próximo artifact.

A suíte focal passa a conter21 testes; a seleção oficial esperada é180 na fase6 e188 na fase7. Expectativa de contagem não é resultado. O novo HEAD ainda exige15 gates, inspeção das capturas duráveis e revisão Codex exata. O PASS de179/179 do candidato anterior não é transportado.

## Checkpoint original efetivamente inspecionado

PR [#18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18), branch `feat/frontend-collections`, HEAD `9a5254a8e6bb060c7767231a38370c073b2bdb78`.

- [Run 39453181573](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39453181573), tentativa 1, job `118733100849`.
- Artifact `12280945790`; SHA-256 do ZIP conferido: `96ccebf4719a441e4eaba07d102c4cf388cc150c27c9e5a7d66d29bffdf2d1bc`.
- Fingerprint: `75cfc33722df43ecc4085976dd64a1796dc7d2d8867861a81a9733aec010277e`.
- 9 gates PASS; E2E **155 PASS / 2 FAIL / 2 NOT_RUN**; Https, Deletion, Ihfr, Bootstrap e SchemaAudit não executados nesse HEAD.
- Primeira falha de geometria após os quatro viewports a 100%: botão da coleta em 320×900/texto200. A falha de conta ocorreu na URL após login, antes da leitura do e-mail sintético. O artifact não contém os traces/error-context citados; não se inventou evidência ausente.

## RED → GREEN auxiliar e alcance

Todos os ensaios abaixo usam dados sintéticos. Browser auxiliar: Chromium 153.0.8010.0, Playwright 1.55.1 do lockfile, Node 24.19.0. Não representam o gate oficial Windows/PostgreSQL.

| Ensaio | RED / contraprova negativa | GREEN / contraprova positiva |
|---|---|---|
| Contorno arredondado | Helper anterior: 4 PASS / 2 FAIL; quatro probes fora do raio de 20px a texto200 atingiam MAIN, centro atingia BUTTON | Helper corrigido: 20/20 PASS; execução independente D também 20/20, retries0 |
| Obstrução real | Cobertura das quatro bordas, centro/canto, clipping, controle fora do viewport e overflow são rejeitados | Descendente legítimo, raios elípticos/percentuais/sobrepostos e seis viewports preservados |
| Margem de rolagem da coleta (H1 real) | SSR dos componentes reais ApplicationShell + CollectionDetail + painel IHFR, CSS/Tailwind/logo reais: em 844×390/texto200, link em y37,45..129,45 sob header até82;3/9 probes interceptados | Margem local simétrica1rem: y149,45..241,45 e9/9 livres;320/375×900/texto200 e844×390/texto100 continuam PASS; sem alteração do shell |
| Foco da revisão ambiental | Sem barreira: 12/12 reproduções falham; callback tardio desfaz a rolagem até Confirmar | Foco observado + frame causal: 12/12 PASS; um único scroll, sem elevar timeout |
| Resposta de login | Helper antigo falha com HTTP200 em 5,6s; novo rejeita401 inesperado e200 sem navegação | Novo aguarda a mesma resposta e passa;401 explícito para senha antiga passa;1POST/caso |

O ensaio H1 usa SSR estático com hooks/Link/Image adaptados e Arial de fallback, sem servidor Next ou DB. Demonstra a obstrução com a estrutura fonte, mas não substitui as capturas oficiais. A única mudança de produto nesta R3 é `scroll-margin-block:1rem 8rem` → `1rem` no CSS Module local de coleta; a navegação permanece intacta.

A causa histórica do incidente de conta continua **INCONCLUSIVA**. O ensaio prova a lacuna de sincronização do teste, não que a latência foi a causa daquele run. Teste, autenticação e componentes relevantes eram iguais ao baseline integrado examinado; isso não autoriza chamar a falha de flakiness.

`npm run typecheck`: PASS local integral. `npm run lint`: exit0, três warnings preexistentes fora do delta (page, user-profile, white-box). Esses comandos auxiliares não substituem os gates oficiais por HEAD. `git diff --check`: PASS.

Recibos sanitizados persistidos: [geometria SSR](evidence/r3/collection-landscape.json), [antes](evidence/r3/collection-landscape-original.png), [depois](evidence/r3/collection-landscape-symmetric.png) e [contraprova de login](evidence/r3/account-login-counterproof.json).

## Proteções e evidência futura

O helper preserva bounds, `elementFromPoint`, navegação móvel, todos os cenários e texto200. Só probes que caíam fora do contorno real são deslocados até dentro dele; quatro pontos de eixo ampliam a detecção. Em falha, registra geometria/scroll/viewport/header/nav e captura mascarada `fullPage:false`, com HEAD e escala. Os negativos sintéticos da suíte `frontend-mission-evidence.spec.ts` geram capturas de obstrução esperada em diretório próprio; não são falhas do aplicativo.

A candidata deve executar os 15 gates e os dois cenários antes NOT_RUN (conta ativa não verificada após reset e recuperação da coleta sob outro membro). Resultados finais, URLs, fingerprint e revisão Codex precisam corresponder ao HEAD final, e não apenas ao checkpoint acima.

---

## Histórico preservado — preparação anterior à continuidade R3

> **Atualização de publicação, 20/10/2026:** O texto histórico abaixo descreve a preparação anterior à publicação. A fase 6 foi publicada na branch `feat/frontend-collections`; RED oficial no run [39444967220](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39444967220): RegressionSetup PASS, Unit FAIL esperado no teste de estado R1. GREEN integral e homologação ainda pendentes desta atualização. O registro final de CI por HEAD deve constar no PR.

# Evidências de implementação candidata

| Verificação | Resultado e alcance |
|---|---|
| R1 em sete testes novos de estado na base | RED: 2 PASS / 5 FAIL; exit1 |
| Mesmos sete testes após correção | GREEN: 7 PASS; exit0 |
| Unitários fase6 | 39 PASS: 8 existentes (um cenário atualizado pontualmente), 7 R1, 24 submissão |
| Quatro E2E novos | Escritos, NOT_RUN |
| UI/Pg/CI/15 gates | NOT_RUN; publicação recusada |

O teste existente que antes permitia iniciar outra tentativa após falha desconhecida foi ajustado à regra segura: agora exige recusa na incerteza e mantém as asserções de nova tentativa após rejeição inicial definitiva. Nenhuma asserção do backend ou E2E anterior foi reduzida. A validação de idempotência no banco ainda precisa do runner oficial.

Checagens adicionais: typecheck estrito dos módulos puros e unitários, análise de sintaxe TS/TSX e consistência de patches. Não chamar essas verificações de Build/Typecheck/Lint oficiais. Logs auxiliares e manifesto ficam no pacote entregue no chat.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
