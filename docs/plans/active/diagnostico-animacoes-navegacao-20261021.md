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

O workflow lê a candidata 9deff em checkout efêmero `product/` e os assets em `probe/`, com credenciais de checkout não persistidas. Confere SHA do produto, blobs-base, hashes dos assets, aplicação exata e hash final. O único arquivo rastreado alterado no checkout efêmero é o teste instrumentado. Nenhuma ref de produto é atualizada.

A sonda mantém literalmente o loop, predicado e `await Promise.allSettled(finite.map(animation => animation.finished))`. Não acrescenta acesso a `.finished`, não cancela/pausa/finaliza animações, não altera CSS, foco, screenshots, máscaras, fixtures, assertions ou timeout. Heartbeat de 1 segundo é observação, sem condição de saída. Limites de 256 registros só limitam telemetria e indicam itens omitidos; o guard continua observando todos os handles.

A telemetria permite nomes CSS validados, caminho tag/nth-child/shadow-host, estado e timing. Não lê conteúdo textual, valores de formulário, atributos livres, cookies, requests/responses, keyframes ou ambiente. O redator existente é aplicado ao log.

## Execução e arquivos afetados

1. Publicar os cinco arquivos desta sonda somente na branch isolada e conferir compare/conteúdos.
2. Executar Windows Actions, Node 24.19.0, dependências e Chromium travados pelo lockfile.
3. Preservar o envelope de `scripts/rc-review-validation.ps1` blob `86d2720fd6359a0971fe28f142a7a8b7ed758142`: instalação do PostgreSQL 17 próprio, ACL, marker, URL loopback, chaves sintéticas, remoção de SMTP/destinatários e finally Stop/restauração. Só o despacho dos gates é derivado em um arquivo temporário `*.local`.
4. Executar RegressionSetup, Typecheck e Lint oficiais para esse checkout instrumentado; então executar exatamente um cenário real pelo harness Regression. O coletor grava `DIAGNOSTIC_PROBE`, `officialGate:false` e `allReleaseGates:false`, sem journal E2E PASS.
5. Conferir seleção de um teste, resultado, logs de heartbeat/batches/capturas, PNGs e geometrias. Diferenciar handle retido, sucessão de novos lotes e possível falta de progresso do event loop sem promover hipótese a causa.
6. Definir reparo mínimo apenas com evidência suficiente; executar CI completo e Codex no eventual novo SHA oficial. Preservar os FAILs históricos.

Arquivos: `.github/workflows/rc-navigation-probe.yml`; três assets em `.github/diagnostics/navigation-animation/`; este plano.

## Identidade dos assets

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
