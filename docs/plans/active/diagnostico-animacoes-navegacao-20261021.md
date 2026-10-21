# Diagnóstico observacional da espera de animações — 2026-10-21

- Identificador: NAV-ANIMATION-20261021.
- Estado: EM_ANDAMENTO.
- Origem: execução C1–C4 autorizada pelo usuário na conversa atual; investigação técnica concreta de duas regressões observadas.
- Classificação: EVIDENCIA_IMPLEMENTACAO para fontes e resultados executados; INFERENCIA para hipóteses ainda sem telemetria.
- Coordenação: assistente principal; investigação independente: agente frontend_ihfr. Aceite humano e operação produtiva não são inferidos.

## Objetivo e resultado esperado

Identificar por que o cenário herdado de navegação `mobile viewport reading area 375px text200` permanece em `settleTransitions` até o timeout de 90000 ms. Registrar os handles efetivamente aguardados, seus elementos estruturais e timings sem modificar o comportamento da animação, o predicado, o loop ou o await original.

Este diagnóstico não é correção, gate E2E completo, regressão de 15 gates, homologação ou publicação. Um PASS isolado não prova a causa do FAIL anterior.

## Estado inicial e fontes

- IHFR `dfd78f695d855c4d0f0e8e4a68e9e92467cd11f4`, run `39587983294`: nove gates PASS, E2E FAIL (189 aprovados/uma falha), cinco gates NOT_RUN. Artefato `12341505222`, SHA-256 `60fec6fe72d4ec81b448b87c47664fe71cb4e9e8197e5b855c8689efd57be802`, 29.951.399 bytes/711 entradas, digest/CRC verificados. Zero PNG IHFR porque seu gate não iniciou.
- Landing `61bc4ff6e2d0dfc0fa830b89346fa2f5f79bbc15`, run `39588484339`: nove gates PASS, E2E FAIL (196 aprovados/uma falha), cinco gates NOT_RUN. Mesmo cenário e ponto de espera. Artefato `12341306145`, SHA-256 `16cca84ba910ee6fcd960d826031fde4a1da9d59c339abcf1043f1a90e0458fc`, 31.264.699 bytes/753 entradas, digest/CRC verificados.
- Ambos falharam em `page.evaluate` de `settleTransitions`, chamado por `focusAndExpose`, ainda em `/workspace`. Cinco capturas por caso terminam em `three-links-end`; nenhuma prova localiza qual animação impediu a conclusão.
- Teste base: blob `0b906b163fe876b06643373d98a167ea7ad10682`, idêntico no parent a724 que passou, nos dois HEADs falhos e na candidata agregada `9deff63ad45ab627661d480c882d20a769ac4405`.
- Outros 18 blobs do caminho montado/configuração/dependências são iguais entre a724 e dfd. Isso delimita o recorte, sem demonstrar flake ou causa.
- `AGENTS.md`, `PLANS.md`, contexto, decisões e política de fontes do repositório foram consultados. A autorização atual é posterior às restrições históricas dos handoffs.
- [Documentação oficial do grep Playwright](https://playwright.dev/docs/api/class-testconfig#test-config-grep): o título pesquisado inclui projeto/arquivo/suite. Por isso a seleção usa o arquivo exato e a expressão com término ancorado `mobile viewport reading area 375px text200$`, sem ancoragem inicial incompatível.

## Escopo e preservação

A branch isolada `review/frontend-rc-artifact-triage-20261021` já possui `git.deploymentEnabled=false`. Somente ela recebe workflow, assets de observação e este plano. Esses arquivos não integram as branches funcionais nem a candidata agregada.

O workflow lê a candidata 9deff em checkout efêmero `product/` e os assets em `probe/`, com credenciais de checkout não persistidas. Confere SHA do produto, blobs-base, hashes dos assets, aplicação exata e hash final. Na primeira sonda, o único arquivo rastreado alterado no checkout efêmero é o teste instrumentado. Nenhuma ref de produto é atualizada.

A sonda mantém literalmente o loop, predicado e `await Promise.allSettled(finite.map(animation => animation.finished))`. Não acrescenta acesso a `.finished`, não cancela/pausa/finaliza animações, não altera CSS, foco, screenshots, máscaras, fixtures, assertions ou timeout. Heartbeat de 1 segundo é observação, sem condição de saída. Limites de 256 registros só limitam telemetria e indicam itens omitidos; o guard continua observando todos os handles.

A telemetria de navegação permite nomes CSS validados, caminho tag/nth-child/shadow-host, estado e timing. Não lê conteúdo textual, valores de formulário, atributos livres, cookies, requests/responses, keyframes ou ambiente. O redator existente é aplicado ao log.

## Primeira sonda: execução e arquivos afetados (histórico)

1. Publicar os cinco arquivos desta sonda somente na branch isolada e conferir compare/conteúdos.
2. Executar Windows Actions, Node 24.19.0, dependências e Chromium travados pelo lockfile.
3. Preservar o envelope de `scripts/rc-review-validation.ps1` blob `86d2720fd6359a0971fe28f142a7a8b7ed758142`: instalação do PostgreSQL 17 próprio, ACL, marker, URL loopback, chaves sintéticas, remoção de SMTP/destinatários e finally Stop/restauração. Só o despacho dos gates é derivado em um arquivo temporário `*.local`.
4. Executar RegressionSetup, Typecheck e Lint oficiais para esse checkout instrumentado; então executar exatamente um cenário real pelo harness Regression. O coletor grava `DIAGNOSTIC_PROBE`, `officialGate:false` e `allReleaseGates:false`, sem journal E2E PASS.
5. Conferir seleção de um teste, resultado, logs de heartbeat/batches/capturas, PNGs e geometrias. Diferenciar handle retido, sucessão de novos lotes e possível falta de progresso do event loop sem promover hipótese a causa.
6. Definir reparo mínimo apenas com evidência suficiente; executar CI completo e Codex no eventual novo SHA oficial. Preservar os FAILs históricos.

Arquivos: `.github/workflows/rc-navigation-probe.yml`; três assets em `.github/diagnostics/navigation-animation/`; este plano.

## Primeira sonda: identidade dos assets (histórico)

Hashes SHA-256 sobre UTF-8 com LF normalizado para conferir checkouts Windows:

| Asset | SHA-256 |
| --- | --- |
| Patch observacional | `837ca559bd6084777f6bd248ff174a29c0e706aa680881532b4f05d3ff267154` |
| Teste resultante | `8d1240cecd09e89fbd712b185afc50e65ddc85d55212464ffcf3fd14bca449e1` |
| Envelope derivado | `58ae4525254dd346eff5c1abd46c452e4b63721254975127dde6eca2c82673b3` |
| Coletor efetivo | `4e3b6d589bbfac37a01c41a5022bef014dc333f6e7f9b675bc6cf00271a6f085` |

O coletor proposto inicialmente tinha SHA `cffd03eb12e51d9c5efe4a82e4deb49d0371c25b423bd4a7511ade4f3f4a541f`; a revisão da coordenação removeu exclusivamente o `^` inicial do grep, conforme a semântica documentada. Nenhuma assertion mudou.

## Riscos, pontos de parada e conclusão

A observação pode alterar o timing e não reproduzir o problema; nesse caso a causa permanece inconclusiva. A sonda falha se bases/hashes diferirem, se o wrapper rejeitar o ambiente, se Typecheck/Lint falharem ou se o cenário falhar. Não existe fallback para banco/provedor real.

Mudanças de produto/ciência, operação produtiva e aceite humano ficam fora deste diagnóstico. Qualquer nova necessidade material será registrada antes de executá-la. Permissões operacionais ausentes não são contornadas.

Validações já feitas: invariantes textuais e whitespace do patch; comparação do envelope fora do loop; revisão independente do coletor; correção do seletor de teste. Runtime/Typecheck/Lint Windows: NOT_RUN antes da publicação. Resultado e encerramento serão acrescentados por recibo vinculado ao run, sem atribuir PASS aos 15 gates.

Histórico: 2026-10-21 — EM_ANDAMENTO, diagnóstico preparado após repetição observada em dois HEADs distintos.

## Recibo da primeira sonda — 2026-10-21

EVIDENCIA_IMPLEMENTACAO: [run 39592158371](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39592158371), job `119195535862`, HEAD do diagnóstico `0d9bdab52b7405b52a3b1a59f56a60ed71679a5b`, produto `9deff63ad45ab627661d480c882d20a769ac4405`. RegressionSetup, Typecheck e Lint PASS no checkout instrumentado; Lint com zero erros e duas advertências preexistentes. O Playwright selecionou exatamente um teste, com um worker: `375px text200`, PASS em 26,9 segundos. Esse resultado pertence à sonda e não registra E2E oficial.

Artefato `12341912990`: SHA-256 `316ea2d7c1a90f326dfef72120a7deec0c340244b5760a5270aedfd2f2a48b4b`, 1.331.659 bytes, 30 entradas. Digest oficial, CRC e extração segura verificados. Snapshot `54296ba66990d91cf0b142622f385d99dee0af63f71ba27a3a48617e9aea61cc`. Existem 23 PNGs de navegação e uma geometria; a contagem não significa inspeção visual de todos eles.

Foram decodificados 247 registros de telemetria, sem erro de parse nem truncamento. Os 25 waits concluíram; maior espera 462,6 ms, maior lote 310,4 ms. Na primeira espera depois de `three-links-end`, correspondente ao ponto anteriormente bloqueado, havia zero animações e a espera durou 0,6 ms. Não houve heartbeat de um segundo. A amostra apresentou somente CSSTransition, sem handle selecionado pausado, desconectado ou com playbackRate zero.

**Resultado diagnóstico: INDETERMINADO quanto à causa.** A falha não foi reproduzida no caso isolado. O PASS não demonstra flake, culpa do IHFR ou eliminação do problema. A instrumentação pode alterar o timing, e o caso isolado não executou o histórico anterior do arquivo/suíte. Os 15 gates completos e a validação visual IHFR continuam NOT_RUN nesta sonda.

EVIDENCIA_IMPLEMENTACAO adicional: o [run agregado 39590338264](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39590338264), job `119189416977`, HEAD `9deff63ad45ab627661d480c882d20a769ac4405`, também relaciona `mobile viewport reading area 375px text200` entre as três falhas E2E, com 210 aprovados e sete não executados. As outras falhas são R2 e o alert do mapa. A execução individual do mapa `39589899058` falhou no alert, não constitui a terceira ocorrência de navegação.

## Segunda sonda: R2 seguido da sequência completa de navegação (histórico)

- Estado: EM_ANDAMENTO; execução preparada e revista, runtime desta revisão ainda NOT_RUN antes da publicação.
- Origem: coordenação autorizou executar o arquivo inteiro após a sonda isolada inconclusiva e observar a duplicação do R2, preservando assertions, instrumentação e guards.
- Classificação: RECOMENDACAO para a nova execução; EVIDENCIA_IMPLEMENTACAO para a contagem obtida diretamente da fonte.
- Fonte: `tests/e2e/frontend-mobile-navigation.spec.ts`, blob `0b906b163fe876b06643373d98a167ea7ad10682`. O loop `for (const width of [375, 320]) for (const percent of [100, 200])` declara quatro casos. `test.setTimeout(90_000)` permanece idêntico.

| Ordem original | Viewport | Texto |
| --- | --- | --- |
| 1 | 375 px | 100% |
| 2 | 375 px | 200% |
| 3 | 320 px | 100% |
| 4 | 320 px | 200% |

1. A coordenação publica somente os deltas de coletor, workflow, plano e um novo patch de observação R2 na branch diagnóstica. Produto e bases continuam os mesmos.
2. O workflow conserva o checkout efêmero do produto, hashes do patch/teste/envelope, ACL, marker, ambiente sintético, instalação travada, cluster owned, teardown e restauração de ambiente. Nenhuma ref de produto é alterada.
3. RegressionSetup, Typecheck e Lint oficiais precedem o diagnóstico. O comando passa os caminhos exatos `tests/e2e/frontend-environmental-drafts.spec.ts` e `tests/e2e/frontend-mobile-navigation.spec.ts`, com grep que seleciona o título completo do R2 e os quatro títulos da matriz de navegação. Não há override de timeout, retries, workers ou fixtures.
4. O coletor preserva saída sanitizada, snapshot, handlers de processo e guards. Acrescenta ao recibo a contagem anunciada pelo Playwright: exige exatamente uma declaração de seleção, cinco testes e um worker. Uma seleção ausente, ambígua ou diferente torna a sonda FAIL mesmo se o processo retornar zero; `testExitCode` continua registrado separadamente.
5. Registrar o resultado R2, os quatro resultados de navegação e as telemetrias separadas, sobretudo o caso 375/200 após 375/100. Esse recorte reproduz a ordem do arquivo, mas ainda não o histórico da suíte inteira. Não atribuir causalidade a sucesso ou falha sem examinar os handles e checkpoints.
6. Anexar recibo do novo run e preservar os resultados anteriores. Um eventual reparo de produto exigirá regressão oficial e revisão no respectivo SHA.

O patch observacional de navegação, seu teste resultante e o envelope são byte a byte idênticos aos da primeira sonda. O banner herdado do envelope ainda diz `one mobile navigation case`; é uma descrição histórica conservada, sem função de seleção. O coletor agora anuncia explicitamente um R2 e quatro casos de navegação, e comando, recibo e contagem do Playwright definem o escopo efetivo. Não há cancelamento/pausa/finalização de animações, supressão de overlay, relaxamento de assertions ou aumento de timeout.

| Asset da segunda sonda | SHA-256 (UTF-8/LF) |
| --- | --- |
| Coletor da sequência completa | `dfb3c5f2021ad993e784ea50e8c0b5977dffea5e4df23a6a8248bc89180043cc` |
| Patch observacional preservado | `837ca559bd6084777f6bd248ff174a29c0e706aa680881532b4f05d3ff267154` |
| Teste resultante preservado | `8d1240cecd09e89fbd712b185afc50e65ddc85d55212464ffcf3fd14bca449e1` |
| Envelope preservado | `58ae4525254dd346eff5c1abd46c452e4b63721254975127dde6eca2c82673b3` |
| Patch de observação R2 | `364410daab53641c55456ae668a7601bb07a1f554ade1d908cc8ad7008351311` |
| Teste R2 instrumentado | `3396945e16dcaaa48f5f5be7e75dceecdafe86a4ba96526dcda5f22f11cb00f3` |

Validação local da proposta: comparação contra os três blobs publicados, ocorrência única dos trechos substituídos, diff completo e invariantes de escopo. Runtime Windows, Typecheck/Lint e cinco casos desta revisão: NOT_RUN antes da publicação; dependências do projeto indisponíveis no executor local. O PASS de Typecheck/Lint da primeira sonda não é transferido ao novo coletor. A coordenação integrou a observação R2 na mesma sonda, com seleção explícita de cinco casos e telemetrias distintas. A execução é diagnóstica e não fecha gates de release.

Histórico: 2026-10-21 — primeira sonda PASS, causa INDETERMINADA; proposta da sequência de quatro casos preparada para revisão, sem alteração remota pelo investigador.

### Observação R2 integrada

O teste base R2 pertence ao produto `9deff63ad45ab627661d480c882d20a769ac4405`, blob `af3656fba33fa1de2f33fbf030594d494e1a746e`. No CI completo, a cardinalidade 1 passou num estágio oculto e a assertion seguinte encontrou dois DDs. O log não contém ancestrais suficientes para atribuir a duplicação; streaming/hidratação permanece hipótese.

O patch instala um observador antes do último reload. Conserva literalmente as assertions globais de cardinalidade 1, visibilidade e texto exato, a captura original e todos os checks anteriores de HTTP 201, persistência, draft nulo e valores 0.0000004/false/0. O bloco try/finally emite `ENVIRONMENTAL_R2_RELOAD_OBSERVATION` após a tentativa, inclusive no FAIL, sem mudar seu resultado.

A linha do tempo registra todos os matches globais, identidades locais WeakMap, pertencimento a application-content, tipo estrutural de IDs, hidden/inert/aria-hidden, display/visibility/content-visibility, dimensões e contagem de retângulos. Conteúdo textual aparece apenas como igualdade booleana ao valor sintético esperado. Não são emitidos HTML, texto livre, URLs, formulário, cookies, ambiente nem dados pessoais. O buffer conserva oito estados iniciais e quarenta recentes, com droppedRecords explícito; ausência de observação também é declarada. A leitura de estilo pode alterar timing, limitação inerente que impede inferir causalidade de um PASS isolado.

O runner verifica os dois blobs de origem e hashes de patches/testes, e exige exatamente os dois caminhos instrumentados no diff efêmero. Ordem selecionada: R2 e, a seguir, 375/100,375/200,320/100,320/200, com um worker e 90.000 ms por caso, conforme fontes originais. Nenhum componente, API, fixture, configuração ou branch de produto muda. O patch novo não reduz o escopo do seletor nem esconde duplicados.

## Recibo da segunda sonda — 2026-10-21

EVIDENCIA_IMPLEMENTACAO: [run 39594318571](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39594318571), job `119202739795`, HEAD do diagnóstico `51d80fc53344dae1fe2be90393bfa2e32b3feab9`, produto `9deff63ad45ab627661d480c882d20a769ac4405`. RegressionSetup, Typecheck e Lint PASS; Lint sem erros e com duas advertências preexistentes. Seleção real de cinco testes e um worker, `selectionVerified:true`, cinco PASS em 1,6 minuto. Ordem efetiva: R2, 375/100, 375/200, 320/100 e 320/200.

Artefato único `12342817947`: SHA-256 `715f2566942be14872bf5022f032711885b74eed6ad5e28e17038fab3cdd8710`, 5.002.118 bytes, 102 entradas; digest oficial, CRC e extração segura PASS. Snapshot `c97964e98bd2915399bd3ae1d5f8d3938d68cc4566cb624fd3527f4ac2c0b25d`. Materialização compartilhada entre os investigadores de navegação e R2. Inventário de 92 PNGs de navegação e quatro geometrias, sem reivindicar inspeção visual de todos os quadros.

A navegação produziu 976 registros válidos, sem truncamento. Todos os 100 waits concluíram, 25 por caso, sem heartbeat de um segundo. Maiores esperas: 379,8 ms em 375/100; 353,1 ms em 375/200; 383,5 ms em 320/100; 575,4 ms em 320/200. Após `375-text200-three-links-end`, zero animações e espera de 0,6 ms, log nas linhas 530/534/538. Somente CSSTransition nas amostras, documento visível e fontes carregadas; nenhum handle selecionado pausado, desconectado ou com velocidade zero enquanto aguardava.

**Causa da espera de navegação: INDETERMINADA.** O cenário passou após R2 e após seu predecessor 375/100, mas o histórico completo do CI foi omitido. A telemetria R2 é analisada separadamente; o PASS desta execução não elimina uma duplicação transitória nem transfere conclusões entre os dois problemas. Regressão oficial de 15 gates e validação visual IHFR: NOT_RUN nesta sonda.

## Terceira sonda: nove gates prévios e E2E completo observado

- Estado da proposta: AGUARDANDO_REVISAO; investigação permanece EM_ANDAMENTO.
- Origem: a coordenação autorizou reproduzir a sequência do CI completo de 9deff e adaptar somente o despacho do envelope diagnóstico para admitir os nove gates anteriores.
- Produto fixo: `9deff63ad45ab627661d480c882d20a769ac4405`; base diagnóstica efetiva: `81215d0fa43e59ba36cba5d122993e293810a2ca`, árvore `19ff814189527761e08f8c2f5f16cf6a088286e3`. Os quatro blobs-base são idênticos aos da proposta em `51d80fc53344dae1fe2be90393bfa2e32b3feab9`; a nova base preserva as duas adições da focal IHFR, sem sobreposição de caminhos.
- Classificação: EVIDENCIA_IMPLEMENTACAO para fontes, diferenças observadas e recibos; INFERENCIA para hipóteses de sequência, histórico, cache e carga; RECOMENDACAO para a execução proposta.

### Diferença concreta e hipóteses

O runner oficial `scripts/rc-review-validation.ps1`, blob `86d2720fd6359a0971fe28f142a7a8b7ed758142`, ordena RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck e Lint antes do E2E. As duas sondas anteriores executaram somente RegressionSetup, Typecheck e Lint. Portanto omitiram seis gates, incluindo Build, além dos demais testes E2E anteriores à navegação.

EVIDENCIA_IMPLEMENTACAO: no produto fixado, `package.json` define Build como `npx prisma generate && next build` e E2E como `playwright test`; o runner oficial chama cada gate pelo `accounts-validation.ps1`, que conserva o DatabaseMode adequado. O workflow oficial `rc-review.yml` dispõe de 35 minutos por job. A contagem esperada de 220 casos vem do run agregado `39590338264`: 210 aprovados, três falhas e sete não executados.

INFERENCIA: a execução anterior de Build, o histórico dos demais gates/testes, o estado de caches/artefatos gerados ou diferenças de carga/timing podem influenciar a reprodução. Nenhuma dessas possibilidades é causa demonstrada. Esta sonda acrescenta simultaneamente a sequência omitida e a seleção E2E completa; eventual reprodução identifica um contexto útil, mas não isola por si só qual diferença foi determinante. A observação também pode alterar timing. Não há limpeza extraordinária de cache, aquecimento adicional, retry ou repetição automática.

### Montagem e ordem

1. A coordenação publica somente quatro deltas diagnósticos: coletor, envelope, workflow e plano. Os dois patches observacionais existentes permanecem idênticos; o produto não incorpora correções posteriores.
2. O workflow conserva checkout isolado, credenciais não persistidas, bases/hashes dos dois testes, aplicação exata e diff restrito aos dois arquivos instrumentados.
3. O mesmo envelope instala e inicia uma vez o cluster owned e executa, em ordem: RegressionSetup → Unit → Integration → Migration → Contract → R1 → Build → Typecheck → Lint → E2E observado. Os primeiros nove gates usam exatamente o comando oficial `accounts-validation.ps1 -Gate $rcGate`, com seus modos de banco existentes.
4. Não há reinício do cluster nem recriação das chaves entre Build e E2E. Instalação, ACL, marker, variáveis sintéticas, ausência de SMTP/destinatários reais e todo o try/finally do envelope são preservados literalmente fora do despacho.
5. O coletor chama `node node_modules/@playwright/test/cli.js test --reporter=line`, sem filtro de arquivos nem grep. Mantém a configuração original, um worker e zero retries; exige exatamente uma seleção anunciada de 220 testes e um worker. O código do processo e a verificação da seleção continuam separados no recibo.
6. Somente o limite do job passa de 15 para 35 minutos, igual ao CI oficial. Nenhum timeout de teste muda; R2 e os quatro cenários de navegação conservam 90.000 ms. Todas as assertions, fixtures, screenshots, máscaras e o guard original de animações permanecem idênticos.
7. Se qualquer gate anterior falhar, interromper a sequência e registrar E2E como não executado. Se E2E falhar, preservar o resultado e as telemetrias; não rerodar automaticamente. A base 9deff contém as falhas históricas já conhecidas, inclusive a do mapa; este diagnóstico não valida os reparos de produto em outras refs.

O dispatcher diagnóstico anterior aceitava apenas três gates prévios. A adaptação autorizada amplia exclusivamente essa lista para nove e atualiza duas mensagens do próprio bloco. Prefixo e sufixo fora do foreach devem comparar byte a byte com o envelope anterior e com o runner oficial. O arquivo oficial do produto não é editado.

O recibo permanece `DIAGNOSTIC_PROBE`, `officialGate:false` e `allReleaseGates:false`; não é registrado PASS oficial de E2E nem fechamento dos 15 gates. Https, Deletion, Ihfr, Bootstrap e SchemaAudit ficam fora desta execução diagnóstica.

### Identidade da terceira sonda

| Asset | SHA-256 (UTF-8/LF) |
| --- | --- |
| Coletor completo | `6ccb3488e9a2e923a52b17ce43309ea6390103ae86615d1b6bc18dace1ab1d01` |
| Envelope com despacho ampliado | `6a2eb22641ee17c60e38bf6b064e0e28e3d323b96c75b187516d20958d2fb4af` |
| Patch observacional navegação preservado | `837ca559bd6084777f6bd248ff174a29c0e706aa680881532b4f05d3ff267154` |
| Teste navegação resultante preservado | `8d1240cecd09e89fbd712b185afc50e65ddc85d55212464ffcf3fd14bca449e1` |
| Patch observacional R2 preservado | `364410daab53641c55456ae668a7601bb07a1f554ade1d908cc8ad7008351311` |
| Teste R2 resultante preservado | `3396945e16dcaaa48f5f5be7e75dceecdafe86a4ba96526dcda5f22f11cb00f3` |

Validações previstas antes da publicação: bases e reconstrução determinística dos quatro deltas, diff completo, YAML e sintaxe TS, igualdade do envelope fora do despacho, ordem dos nove comandos, ausência de filtros/overrides e preservação dos hashes observacionais. Runtime Windows, PowerShell, Typecheck/Lint desta revisão e E2E completo observado: NOT_RUN antes da publicação. Resultados anteriores não são transferidos ao novo coletor/envelope.

Histórico: 2026-10-21 — segunda sonda com cinco PASS e causa da navegação INDETERMINADA; terceira proposta preparada para reproduzir nove gates anteriores e 220 casos E2E, preservando o ciclo único do cluster e as evidências históricas.
