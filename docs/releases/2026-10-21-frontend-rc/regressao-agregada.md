# Regressão da candidata agregada — 21 de outubro de 2026

Registro cumulativo. Os recibos iniciais abaixo preservam o histórico; a seção final descreve a atualização preparada sobre 9deff com o reparo do mapa e a prontidão atômica de R2.

## Evidência inicial

A candidata `c014442cd6fbfcda47ff4366a5c7acd24bf0b007` foi executada no [run 39580505165](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39580505165). Nove gates passaram. E2E terminou com três falhas, 204 casos aprovados e 13 não executados; os cinco gates seguintes não foram executados. Esse resultado não encerra a RC.

O artefato 12337845919 tem SHA-256 `d5e683a1d97038fc20f225862cf9d778ba02044ad7235606e3600420d4aa5be6`, tamanho de 29.854.285 bytes e 703 entradas. A leitura isolada no [run 39585137600](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39585137600) confirmou identidade do repositório, run e HEAD, digest, tamanho e CRC do ZIP. Essa execução apenas leu evidências arquivadas; não constitui nova regressão do produto.

## Destino das falhas da candidata c014

| Caso | Evidência | Tratamento |
| --- | --- | --- |
| Mapa territorial | Controle de zoom mediu 30 px; a assertion exige 44 px. | A frente Spec026 corrigiu a especificidade do CSS. O run posterior ultrapassou essa assertion e revelou separadamente ausência de ativação por teclado no marcador. Os dois reparos precisam integrar a candidata final. |
| Administração | O nome acessível exato do filtro de papel não correspondia ao label implícito que incluía opções do select. | A frente Spec027 separa label e controle com associação explícita e verifica o nome acessível. |
| Ambiental R2 | Após o último reload, o seletor global de infiltração encontrou dois DDs com o mesmo valor e gerou strict mode violation. | O teste mantém o seletor global e passa a exigir exatamente um resultado visível antes da assertion de texto já existente. |

## R2: primeiro tratamento em 9deff (histórico; insuficiente)

A origem da duplicação no instante da assertion permanece inconclusiva. O log identifica uma cópia em `#application-content`, mas não fornece a ancestralidade nem a visibilidade da segunda. Renderização transitória é uma hipótese, não uma causa comprovada. Não há evidência suficiente para atribuir essa ocorrência à hidratação, a um defeito persistente da interface ou a perda de dados.

No mesmo caso, as assertions anteriores verificaram o payload parcial do rascunho, recarga dos campos, submissão com HTTP 201, URL do detalhe, valor exato persistido `0.0000004`, booleano `false`, número `0` e remoção do rascunho. Todas foram ultrapassadas antes da falha.

O delta de integração acrescenta `toHaveCount(1)` e `toBeVisible()` após o último reload, preservando a comparação exata `0.0000004 mm/h`. A espera usa assertions nativas do Playwright. Duplicação persistente continua a falhar. Não se utiliza `.first()`, seleção por posição, restrição a um contêiner, espera fixa, aumento de timeout, mock ou alteração de produto. As demais assertions e os guards de evidência permanecem iguais.

## Validação exigida

Este recibo descreve o reparo preparado, sem atribuir PASS ao novo delta. O executor local ficou indisponível durante a revisão. A candidata agregada precisa executar seus próprios 15 gates, receber revisão concluída no SHA final e ter as capturas originais inspecionadas. Resultados dos ancestrais ou das branches individuais não substituem esses requisitos.

A homologação de serviços, o aceite operacional e a entrega ao piloto devem registrar evidência própria. A leitura de artefatos não publica o aplicativo e não altera dados reais.


## Composição histórica da candidata 9deff

A atualização preserva a candidata anterior como primeiro parent e incorpora os quatro HEADs funcionais abaixo como parents adicionais. Os 73 caminhos das quatro frentes formam uma união de blobs sem conflito. O teste R2 e este recibo são os dois deltas explícitos de integração, fora dessa união.

| Frente | HEAD incorporado |
| --- | --- |
| IHFR | `dfd78f695d855c4d0f0e8e4a68e9e92467cd11f4` |
| Administração | `21988e2d25b3b43d8e299502da535f7d07afba46` |
| Mapa | `19c85d43334b362a3bda540aff45da2f88682abe` |
| Landing | `61bc4ff6e2d0dfc0fa830b89346fa2f5f79bbc15` |

Os workflows temporários de leitura de artefatos e diagnóstico da landing pertencem exclusivamente à branch de diagnóstico e não integram essa árvore.

### Estado observado antes de publicar 9deff (histórico)

- IHFR: o [run 39587983294](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39587983294) executou nove gates com PASS e parou no E2E geral (189 PASS, uma falha). O timeout de 90000 ms ocorreu em `settleTransitions`, chamado por `focusAndExpose`, no cenário herdado `reading-area-375px-text200` ainda em `/workspace`. O gate dedicado ao IHFR e seus PNGs não executaram. A origem de animações que impediram a conclusão ainda não foi demonstrada. Não se alterou esse guard ou timeout. O [Codex do SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/23#issuecomment-6314265873) concluiu sem achados relevantes.
- Landing: CI completo do SHA em execução. O [diagnóstico público isolado 39588727017](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39588727017), com Chromium 140.0.7339.186, confirmou largura documental de 320 px em viewport 320×812, fonte raiz de 32 px e fontes carregadas, sem palavras além dos limites. Esse diagnóstico não substitui os 15 gates. O [Codex do SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/24#issuecomment-6314323074) concluiu sem achados relevantes.
- Administração e mapa: novos reparos publicados, CI e revisões atuais em andamento.
- O executor retornou após a indisponibilidade com workspace reiniciado. Não foram atribuídos ao novo código os testes locais das candidatas anteriores.

A candidata continua Draft. Sua composição concreta permite executar a regressão transversal e investigar a falha herdada em paralelo; não constitui declaração de aprovação das frentes, fechamento técnico, homologação ou publicação.

## Atualização sobre 9deff: mapa e prontidão atômica do R2

### Resultado efetivo do parent

O [run 39590338264](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39590338264), tentativa 1, job `119189416977`, executou `9deff63ad45ab627661d480c882d20a769ac4405`: nove gates PASS; E2E FAIL com 210 aprovados, três falhas e sete não executados; cinco gates posteriores NOT_RUN. Snapshot `a5c6cf22e03ff0963bfed02791528a1c29d25021a50681e0397d5d7903c1d138`.

Artefato `12341712762`: 29.934.688 bytes, SHA-256 `d51cac1d62a7fd2998ebff0d96b31826102a3644840a533d9089f51fa191bb18`; tamanho/digest/CRC e extração segura verificados. As falhas foram o R2, a navegação 375/200 e o alerta do mapa. A revisão [Codex 6314618403](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/25#issuecomment-6314618403) concluiu sem findings; não substitui a regressão reprovada.

No R2, `toHaveCount(1)` passou antes de o único DD estar visível. Durante a assertion seguinte, o log mostrou um nó oculto e depois dois nós. O primeiro reparo usava observações separadas e, portanto, não assegurava uma amostra única do estado esperado.

### Observação do DOM com assertions preservadas

A [sonda 39594318571](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39594318571), job `119202739795`, workflow `51d80fc53344dae1fe2be90393bfa2e32b3feab9`, executou o mesmo produto 9deff com instrumentação apenas na cópia efêmera. RegressionSetup, Typecheck e Lint passaram. Os cinco casos selecionados (R2 e quatro de navegação) passaram em 1,6 minuto; não constituem E2E geral ou 15 gates.

Artefato `12342817947`: 5.002.118 bytes, 102 entradas, SHA-256 `715f2566942be14872bf5022f032711885b74eed6ad5e28e17038fab3cdd8710`; digest oficial, CRC e extração segura conferidos.

A observação R2 contém oito estados, nenhum descarte e zero eventos window.error capturados. Não registra HTML ou texto livre; a igualdade ao valor sintético é booleana. Identidades locais por WeakMap distinguiram os nós:

| Tempo relativo da página | Matches globais | Estado observado |
| --- | ---: | --- |
| 691ms | 1 | Identidade 1 oculta, fora de application-content, dentro de DIV hidden/display:none com ID de formato S:. |
| 710ms (DOMContentLoaded) | 1 | Mesmo nó oculto. |
| 868ms (load) | 1 | Mesmo nó oculto. |
| 974ms | 2 | Identidade 2 visível sob application-content; identidade 1 ainda oculta no segmento externo. |
| 995ms | 1 | Segmento antigo removido; identidade 2 visível. |
| 1172ms (final) | 1 | Identidade 2 permanece única e visível. |

A sonda demonstra uma sobreposição transitória entre um segmento oculto e o detalhe visível no mesmo produto. As amostras com dois e um match estão separadas por 21 ms; esse intervalo não mede a duração total da sobreposição. O R2 passou sem alteração das assertions nessa execução porque o polling não reprovou durante a sobreposição. Não houve duas cópias visíveis ou duplicação persistente nessa amostra. O histórico dos runs anteriores não contém a mesma timeline e não é reescrito como reprodução exata desses tempos.

### Reparo mínimo de prontidão

O seletor global permanece `[data-environmental-value="soil.infiltrationRateMmPerHour"]`. As três assertions separadas são substituídas por `expect.poll` de uma única `evaluateAll`, com limite de 5000 ms, o mesmo limite anterior. Cada amostra inclui **todos** os matches, inclusive ocultos, sem restrição a contêiner, seleção por posição ou filtro pelo texto esperado.

O resultado exigido tem count 1 e exatamente uma entrada com visibilidade real (checkVisibility CSS e dimensões positivas) e igualdade textual a `0.0000004 mm/h`. Ausência, nó oculto, duplicação global ou texto incorreto continuam reprovando. A espera não altera DOM/CSS, não cancela animação e não aumenta timeout. A captura original segue depois da assertion.

As verificações anteriores de payload parcial, campos após reload, HTTP 201, URL, persistência exata de 0.0000004, false, zero e draft nulo permanecem literalmente iguais. Não há alteração de componente, API, banco, contrato ou matemática.

### Composição preparada

Primeiro parent: `9deff63ad45ab627661d480c882d20a769ac4405`. Parent adicional novo: `9a2b7d451f3523e8efe3130da28c8b12c94f2cce`, preservando o histórico do mapa. A composição funcional contém:

| Frente | HEAD incorporado |
| --- | --- |
| IHFR | `dfd78f695d855c4d0f0e8e4a68e9e92467cd11f4` |
| Administração | `21988e2d25b3b43d8e299502da535f7d07afba46` |
| Mapa | `9a2b7d451f3523e8efe3130da28c8b12c94f2cce` |
| Landing | `61bc4ff6e2d0dfc0fa830b89346fa2f5f79bbc15` |

O mapa acrescenta somente teste/Spec: o alerta da aplicação é verificado dentro de application-content, com count 1 antes do texto exato e count 0 após recuperação. O anunciador global Next permanece intacto. Os 73 caminhos das quatro frentes conservam blobs/modos iguais aos HEADs incorporados; R2 e este recibo continuam os dois arquivos próprios de integração. O compare desta atualização contém cinco caminhos: três do mapa e dois de integração. Nenhum workflow diagnóstico integra a candidata.

### Estado e validação ainda necessária

- Administração 21988: 15/15 gates PASS e 19 PNGs originais/metadatas inspecionados; Codex concluído sem findings.
- Mapa 9a2b: [CI próprio 39593274910](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39593274910), job `119199269511`, concluiu 15/15 gates PASS; E2E 198 casos aprovados. Snapshot `c82ce10a050243f3ea258fc593c8fafeb2c8c205e2087f406bf19d50b6fea99b`. Codex concluído sem findings. A inspeção das 23 capturas do HEAD atual está em andamento; as 19 do parent não a substituem.
- Landing 61bc: sete cenários próprios passaram e 21 PNGs foram inspecionados; CI geral reprovou na navegação herdada.
- IHFR dfd: gate dedicado não foi alcançado no CI geral. A [focal 39594839701](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39594839701), job `119204483205`, concluiu RegressionSetup e Ihfr PASS, seis casos dedicados; os outros 13 gates ficam NOT_RUN nessa focal. Runner original e checkout rastreado intactos. Workflow `81215d0fa43e59ba36cba5d122993e293810a2ca`, produto `dfd78f695d855c4d0f0e8e4a68e9e92467cd11f4`, snapshot `c660f5241b6624036e40ce65b6b66660c80efb67f9367e65b020aa6b888e09e2`. Artefato `12343732080`, 2.810.075 bytes, SHA-256 `3ed58e4698a9a5ca1c4cb64207628ac8103d93aa9ac9e4ed28ea45119b04a0aa`; as 43 capturas ainda aguardam inspeção. O GITHUB_SHA preservado nas metadatas identifica o workflow; o recibo de origem distingue o produto.
- Navegação: duas sondas não reproduziram o bloqueio. A segunda concluiu 100 esperas, sem heartbeat de 1 s; no ponto anteriormente bloqueado não havia animações e a espera terminou em 0,6 ms. Causa permanece INDETERMINADA. A investigação seguinte preserva a sequência dos nove gates anteriores, inclusive Build, e executa o E2E completo observado. Não se alterou o guard ou os 90 s.
- Reparo atômico R2: revisão estática e aplicação do patch conferidas. Runtime local/CI do novo delta: NOT_RUN antes da publicação. Esta candidata requer seus próprios 15 gates, resposta Codex efetiva e inspeção das capturas do SHA final.

Nenhuma autorização é reaberta por este reparo técnico. Homologação operacional, identificação do destino e acesso Vercel ainda exigem evidência própria; esta atualização não declara esses resultados concluídos.
