# Regressão da candidata agregada — 21 de outubro de 2026

## Evidência inicial

A candidata `c014442cd6fbfcda47ff4366a5c7acd24bf0b007` foi executada no [run 39580505165](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39580505165). Nove gates passaram. E2E terminou com três falhas, 204 casos aprovados e 13 não executados; os cinco gates seguintes não foram executados. Esse resultado não encerra a RC.

O artefato 12337845919 tem SHA-256 `d5e683a1d97038fc20f225862cf9d778ba02044ad7235606e3600420d4aa5be6`, tamanho de 29.854.285 bytes e 703 entradas. A leitura isolada no [run 39585137600](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39585137600) confirmou identidade do repositório, run e HEAD, digest, tamanho e CRC do ZIP. Essa execução apenas leu evidências arquivadas; não constitui nova regressão do produto.

## Destino das falhas

| Caso | Evidência | Tratamento |
| --- | --- | --- |
| Mapa territorial | Controle de zoom mediu 30 px; a assertion exige 44 px. | A frente Spec026 corrigiu a especificidade do CSS. O run posterior ultrapassou essa assertion e revelou separadamente ausência de ativação por teclado no marcador. Os dois reparos precisam integrar a candidata final. |
| Administração | O nome acessível exato do filtro de papel não correspondia ao label implícito que incluía opções do select. | A frente Spec027 separa label e controle com associação explícita e verifica o nome acessível. |
| Ambiental R2 | Após o último reload, o seletor global de infiltração encontrou dois DDs com o mesmo valor e gerou strict mode violation. | O teste mantém o seletor global e passa a exigir exatamente um resultado visível antes da assertion de texto já existente. |

## R2: alcance da conclusão

A origem da duplicação no instante da assertion permanece inconclusiva. O log identifica uma cópia em `#application-content`, mas não fornece a ancestralidade nem a visibilidade da segunda. Renderização transitória é uma hipótese, não uma causa comprovada. Não há evidência suficiente para atribuir essa ocorrência à hidratação, a um defeito persistente da interface ou a perda de dados.

No mesmo caso, as assertions anteriores verificaram o payload parcial do rascunho, recarga dos campos, submissão com HTTP 201, URL do detalhe, valor exato persistido `0.0000004`, booleano `false`, número `0` e remoção do rascunho. Todas foram ultrapassadas antes da falha.

O delta de integração acrescenta `toHaveCount(1)` e `toBeVisible()` após o último reload, preservando a comparação exata `0.0000004 mm/h`. A espera usa assertions nativas do Playwright. Duplicação persistente continua a falhar. Não se utiliza `.first()`, seleção por posição, restrição a um contêiner, espera fixa, aumento de timeout, mock ou alteração de produto. As demais assertions e os guards de evidência permanecem iguais.

## Validação exigida

Este recibo descreve o reparo preparado, sem atribuir PASS ao novo delta. O executor local ficou indisponível durante a revisão. A candidata agregada precisa executar seus próprios 15 gates, receber revisão concluída no SHA final e ter as capturas originais inspecionadas. Resultados dos ancestrais ou das branches individuais não substituem esses requisitos.

A homologação de serviços, o aceite operacional e a entrega ao piloto devem registrar evidência própria. A leitura de artefatos não publica o aplicativo e não altera dados reais.


## Composição da próxima candidata

A atualização preserva a candidata anterior como primeiro parent e incorpora os quatro HEADs funcionais abaixo como parents adicionais. Os 73 caminhos das quatro frentes formam uma união de blobs sem conflito. O teste R2 e este recibo são os dois deltas explícitos de integração, fora dessa união.

| Frente | HEAD incorporado |
| --- | --- |
| IHFR | `dfd78f695d855c4d0f0e8e4a68e9e92467cd11f4` |
| Administração | `21988e2d25b3b43d8e299502da535f7d07afba46` |
| Mapa | `19c85d43334b362a3bda540aff45da2f88682abe` |
| Landing | `61bc4ff6e2d0dfc0fa830b89346fa2f5f79bbc15` |

Os workflows temporários de leitura de artefatos e diagnóstico da landing pertencem exclusivamente à branch de diagnóstico e não integram essa árvore.

### Estado observado antes da atualização

- IHFR: o [run 39587983294](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39587983294) executou nove gates com PASS e parou no E2E geral (189 PASS, uma falha). O timeout de 90000 ms ocorreu em `settleTransitions`, chamado por `focusAndExpose`, no cenário herdado `reading-area-375px-text200` ainda em `/workspace`. O gate dedicado ao IHFR e seus PNGs não executaram. A origem de animações que impediram a conclusão ainda não foi demonstrada. Não se alterou esse guard ou timeout. O [Codex do SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/23#issuecomment-6314265873) concluiu sem achados relevantes.
- Landing: CI completo do SHA em execução. O [diagnóstico público isolado 39588727017](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39588727017), com Chromium 140.0.7339.186, confirmou largura documental de 320 px em viewport 320×812, fonte raiz de 32 px e fontes carregadas, sem palavras além dos limites. Esse diagnóstico não substitui os 15 gates. O [Codex do SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/24#issuecomment-6314323074) concluiu sem achados relevantes.
- Administração e mapa: novos reparos publicados, CI e revisões atuais em andamento.
- O executor retornou após a indisponibilidade com workspace reiniciado. Não foram atribuídos ao novo código os testes locais das candidatas anteriores.

A candidata continua Draft. Sua composição concreta permite executar a regressão transversal e investigar a falha herdada em paralelo; não constitui declaração de aprovação das frentes, fechamento técnico, homologação ou publicação.
