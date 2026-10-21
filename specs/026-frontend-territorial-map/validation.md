# Recibo local e entrega ao coordenador — Spec 026

**Data**: 2026-10-21. **Branch**: `feat/frontend-territorial-map`.

Base `development`: `1ea3cc2552c244e1004f4f733f838e0f9ea62993`. Parent planejado da candidata local: seed `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`. O SHA da candidata será informado após o commit; resultados posteriores de CI/review devem ficar vinculados ao HEAD em recibo externo, sem mudar o código/documentação apenas para transportar um verde antigo.

## Mudança entregue

- Cabeçalho contextual, cartões e hierarquia coerentes com a frente de áreas incorporada e a referência do starter.
- Lista completa com nomes sem truncamento, seleção explícita, painel com localização/instantes e links reais.
- CSS Module local para reflow, foco e controles de zoom; atribuição e avisos de tiles preservados.
- Oito E2E novos: seis combinações de viewport/texto, transporte loading/erro/retry e estados/contexto/back/forward/reload. Fixture com nome de 97 caracteres persistido no banco sintético pelo harness autorizado.
- Helper próprio de captura, reutilizando as funções de geometria/readiness existentes sem alterar o helper compartilhado.
- Nenhuma mudança em DTO, API, backend, schema, rota servidor, algoritmo cartográfico, testes territoriais herdados, CSS global, shell, dependências, CI ou proteção de Preview.

## Execuções locais da implementação inicial

| Verificação | Resultado | Observação |
|---|---|---|
| Spec Kit setup-plan/setup-tasks/check-prerequisites | PASS | Diretório explícito; metadata local não versionada |
| Primeira execução unitária | FAIL de pré-requisito | Cliente Prisma gerado ausente; arquivo de serviço não iniciou; outros três arquivos passaram |
| Primeiro typecheck | FAIL de pré-requisito | Erros de módulo Prisma ausente e derivados; nenhum erro TS identificado na nova frente |
| `npx prisma generate` | PASS | Cliente 7.4.2 gerado localmente, sem conexão a banco nem alteração de schema/lockfile |
| Unit territorial focal, repetido | PASS | Quatro arquivos passam sob node --test; execução direta confirma 11 casos (3 estado + 3 contratos + 1 OpenAPI + 4 serviço) |
| `npm run typecheck`, após geração | PASS | Exit 0, sem diagnóstico |
| ESLint dos componentes/teste/helper | PASS | Exit 0, sem diagnóstico |
| `git diff --check` | PASS | Sem erro de whitespace |
| E2E territorial existente/novo | NOT_RUN local | Runner oficial Windows/PostgreSQL não executado em Linux |
| CI de 15 gates no HEAD | NOT_RUN nesta frente | Responsabilidade do coordenador após publicação protegida |
| Capturas reais/inspeção | NOT_RUN local | Nenhum PNG demonstrativo ou resultado visual fabricado |
| Codex review independente do HEAD | NOT_RUN nesta frente | Responsabilidade do coordenador após publicar candidata |

O aviso de configuração `http-proxy` do npm foi observado sem impedir geração, typecheck ou lint. Nenhum valor de ambiente, token ou dado real foi registrado.

## Falha do CI publicado e correção focal — 2026-10-21

A tabela anterior preserva o recibo da implementação inicial. O coordenador publicou a mesma árvore `846f4887e83557318f85753caae7bc9e23ced1f2` no HEAD `39cbf99f588022ac35926a135387133b6f10516c`, PR [#22](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22).

- [Run 39578551717](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39578551717), tentativa 1, evento `push`, job `119150115017`: `FAIL` em E2E.
- Artefato `12336228091`, `rc-validation-39cbf99f588022ac35926a135387133b6f10516c`, 30.741.731 bytes. SHA-256: `12c71465152867b1c7b42ce61810820ea55e3d7230c8cb99c8a610b22cc847f8`.
- Download conferido contra o digest oficial, CRC válido e 729 entradas sem caminhos inseguros ou links simbólicos. Recibo e extração preservados em `ci-artifacts/map-39578551717/` no workspace do coordenador, fora do repositório versionado.

| Gate | Resultado observado |
|---|---|
| RegressionSetup | PASS |
| Unit | PASS |
| Integration | PASS |
| Migration | PASS |
| Contract | PASS |
| R1 | PASS |
| Build | PASS |
| Typecheck | PASS |
| Lint | PASS; zero erros e três avisos preexistentes |
| E2E | FAIL; 190 testes passaram, um falhou e sete não executaram |
| Https | NOT_RUN após interrupção no E2E |
| Deletion | NOT_RUN após interrupção no E2E |
| Ihfr | NOT_RUN após interrupção no E2E |
| Bootstrap | NOT_RUN após interrupção no E2E |
| SchemaAudit | NOT_RUN após interrupção no E2E |

**Falha observada**: o primeiro cenário novo, `320x760-text100`, mediu largura de 30 px no zoom, contra a assertion de pelo menos 44 px em `tests/e2e/frontend-territorial-map.spec.ts`. A falha ocorreu antes da primeira captura; o ZIP não contém PNGs/JSONs territoriais. Os sete cenários restantes da suíte serial não executaram. Esses estados não são promovidos a PASS nem a inspeção visual concluída.

**Diagnóstico e reparo**: `leaflet/dist/leaflet.css` contém `.leaflet-touch .leaflet-bar a` com largura, altura e line-height de 30 px. A regra local `.mapFrame :global(.leaflet-control-zoom a)` tinha a mesma especificidade `(0,2,1)`. **INFERENCIA** sustentada pelo valor observado e pelas regras: a ordem de carregamento permitiu à regra externa vencer o empate. A correção acrescenta o ancestral local `.mapCanvas`, elevando a especificidade para `(0,3,1)` e tornando os 44 px independentes dessa ordem. `territorial-map.client.tsx` aplica `.mapCanvas` ao `MapContainer`, filho direto de `.mapFrame`; o seletor mantém correspondência com a estrutura real. Nenhum `!important`, CSS global, handler, teste, assertion ou timeout foi alterado.

**Validação desta correção**: `npm run typecheck` passou. `npm run lint` passou com zero erros e os mesmos três avisos preexistentes em arquivos fora da frente. E2E/browser, novos 15 gates e capturas da correção permanecem **NOT_RUN**, aguardando a publicação do novo SHA pelo coordenador. T016/T017 continuam abertas.

O Codex concluiu a revisão de código do HEAD anterior `39cbf99f588022ac35926a135387133b6f10516c` sem findings, com [recibo efetivo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22#issuecomment-6312911243). Esse recibo não constitui aprovação humana nem revisão do próximo SHA corrigido.

## Falha de seleção pelo teclado e reparo — 2026-10-21

O segundo CI executou o HEAD `f472d5910322837ad9cf9a942a99581a7ffff3f1`, árvore `01ef3e9828f7c382443c283a52970efedfc6eaa8`, com a correção dos alvos de zoom.

- [Run 39581586760](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39581586760), tentativa 1, job `119160229579`: `FAIL` em E2E.
- Os registros do job confirmam PASS em RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck e Lint. E2E: 190 testes passaram, um falhou e sete não executaram. Https, Deletion, Ihfr, Bootstrap e SchemaAudit permanecem NOT_RUN após a interrupção.
- Artefato `12338417029`, `rc-validation-f472d5910322837ad9cf9a942a99581a7ffff3f1`, 30.769.960 bytes. SHA-256: `853a0100eb7574a14635153eecd40c19cb87109cfaedb4b89e5eb90310d6b1b3`. O coordenador recuperou o log completo e conferiu SHA/CRC do ZIP pelo [diagnóstico 39585137600](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39585137600), job `119172054218`.
- A falha exata é `frontend-territorial-map.spec.ts:105:56`, na assertion `expect(page.locator("#selected-area-title")).toHaveText(firstArea.name)` após foco e Enter: esperado `IMP-007 E2E area 0`, recebido `<element(s) not found>`, timeout de 5000 ms.
- O único PNG do mapa nesse run é `ca7865c511da-r0-n0-after-frontend-territorial-map-map-320x760-text100-viewport.png`, gerado após as assertions de 44 px. O coordenador abriu a imagem pelo [leitor 39586266847](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39586266847), job `119175821627`, e observou controles ampliados, foco no zoom `+`, ponto central e navegação inferior dentro do viewport. SHA-256 do PNG: `c4a2867bb53ac0922dc95535ebdcf356e28c2958a171de8105ec9362f24f7e7f`. A imagem não comprova seleção nem os cenários posteriores.

### Lacuna demonstrável na implementação

O [lockfile do SHA executado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f472d5910322837ad9cf9a942a99581a7ffff3f1/package-lock.json) fixa Leaflet `1.9.4`, React Leaflet `5.0.0` e `@react-leaflet/core` `3.0.0`. A leitura dos fontes oficiais dessas versões mostrou:

- [DivIcon](https://github.com/Leaflet/Leaflet/blob/v1.9.4/src/layer/marker/DivIcon.js) cria um `div`; [Marker](https://github.com/Leaflet/Leaflet/blob/v1.9.4/src/layer/marker/Marker.js) aplica `tabIndex` e `role="button"` quando `keyboard` está ativo e registra o alvo interativo.
- [Map](https://github.com/Leaflet/Leaflet/blob/v1.9.4/src/map/Map.js) encaminha `keydown`, `keypress` e `keyup` com seu tipo original. [Map.Keyboard](https://github.com/Leaflet/Leaflet/blob/v1.9.4/src/map/handler/Map.Keyboard.js) trata deslocamento, zoom e Escape, sem converter Enter/Espaço em clique.
- [Popup](https://github.com/Leaflet/Leaflet/blob/v1.9.4/src/layer/Popup.js) liga seu tratamento de Enter ao registro feito por `bindPopup`. O marcador territorial não tem popup.
- O [adaptador de eventos do React Leaflet](https://github.com/PaulLeCam/react-leaflet/blob/v5.0.0/packages/core/src/events.ts) registra os handlers fornecidos na instância Leaflet. O componente territorial fornecia somente `click`, sem handler de ativação pelo teclado.

A ausência de ligação entre o evento de teclado e `onSelect` é demonstrável nos fontes e é consistente com a ausência do painel observada no diagnóstico do CI. O comportamento corrigido ainda precisa ser validado no novo SHA.

### Reparo preparado e limites

Foi acrescentado `keydown` ao mesmo `Marker`, chamando `onSelect(area.id)` para Enter ou Espaço e prevenindo a ação padrão dessas teclas. O clique mantém o mesmo handler; não há ref, mudança de motor, DTO, coordenadas ou cálculo.

O cenário de teclado existente agora também ativa um segundo marcador com Espaço, confirma seu título e `aria-pressed=true` e confirma `aria-pressed=false` no primeiro. As assertions de Enter e de 44 px continuam preservadas. Não foram criados cenários, capturas, esperas arbitrárias ou overrides de timeout.

Este reparo foi preparado contra parent `f472d5910322837ad9cf9a942a99581a7ffff3f1`, sem atualizar referências por esta frente. Typecheck, lint, unitários, build e E2E locais deste novo código: **NOT_RUN**, pois o serviço de execução estava indisponível durante a preparação. A comparação de conteúdo/blobs por API deve constar do recibo externo; ela não substitui esses testes. T016/T017 permanecem abertas.

O [recibo do Codex](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22#issuecomment-6313351413) concluiu sem findings a revisão do HEAD anterior `f472d5910322837ad9cf9a942a99581a7ffff3f1`. A candidata de teclado requer nova CI e revisão do próprio SHA antes do fechamento técnico.

## Colisão do alerta de transporte com o anunciador de rotas — 2026-10-21

O [run 39589899058](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39589899058), tentativa 1, job `119187960234`, executou o HEAD `19c85d43334b362a3bda540aff45da2f88682abe`, árvore `3ae307be6fba35113328ef5b9c16ede406786484`.

- PASS em RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck e Lint. E2E: **FAIL**, com 196 testes aprovados, um reprovado e um não executado. Https, Deletion, Ihfr, Bootstrap e SchemaAudit ficaram NOT_RUN.
- Os seis cenários da matriz territorial passaram: 320×760, 375×900, 768×900, 1440×900, 320×760 com texto a 200% e 844×390. Incluem Enter no primeiro marcador, Espaço em outro marcador localizado, estado da seleção na lista, navegação por Tab e acesso à coleta real. O único FAIL ocorreu no cenário seguinte de transporte; o último cenário de contextos vazio/inativo e reset ficou NOT_RUN.
- Artefato `12342307910`, `rc-validation-19c85d43334b362a3bda540aff45da2f88682abe`, 31.646.199 bytes; SHA-256 `6521c47721a0bd3e4c4d581bc863c4030fc22acb701a912028d1feee7ab8c533`. O download foi conferido contra o digest oficial, com CRC válido, 767 entradas, caminhos seguros e nenhum link simbólico.
- O log completo `e2e-1792581351902.log`, linhas 179–197, registra `strict mode violation` em `frontend-territorial-map.spec.ts:170:43`. `page.getByRole("alert")` resolveu dois elementos: o `p` com a mensagem correta `Não foi possível carregar a visão territorial.` e o `div` vazio `#__next-route-announcer__`, também com `role="alert"`. O timeout existente de 5000 ms permaneceu inalterado.

### Causa e reparo focal do teste

A cadeia de componentes no SHA executado confirma que `DashboardLayout` fornece suas páginas como children de `ApplicationShell`, e o shell as coloca dentro de `#application-content`. A página do mapa renderiza `TerritorialMapView` nesse conteúdo; o parágrafo de erro pertence a essa árvore.

O lockfile fixa Next `16.3.8`. Seu [AppRouterAnnouncer oficial](https://github.com/vercel/next.js/blob/v16.3.8/packages/next/src/client/components/app-router-announcer.tsx), blob `d2d5415aa332889220baad787d2d02c4541c292e`, cria o anunciador em shadow root de `next-route-announcer` e anexa esse host diretamente a `document.body`. Ele fica fora de `#application-content`, e seu ID corresponde ao segundo elemento do log. A colisão é entre o seletor global do teste e a infraestrutura de anúncio de rotas; a mensagem de erro do produto foi renderizada corretamente.

As duas assertions do cenário passam a usar `page.locator("#application-content").getByRole("alert")`. Antes da comparação do texto exato, exige-se explicitamente `toHaveCount(1)`; após a resposta real bem-sucedida, mantém-se `toHaveCount(0)`. Não há seleção da primeira ocorrência, filtro pelo próprio texto esperado, aumento de timeout ou alteração do produto. As assertions de Enter/Espaço, alvos de 44 px, retry, seleção vazia e resposta real permanecem preservadas.

### Capturas inspecionadas e limites

Foram produzidos e abertos os 19 PNG originais: três frames por cenário da matriz (18), mais o carregamento de transporte a 375 px. Os 19 JSON correspondem ao HEAD executado, às dimensões reais dos PNG e a `fullPage:false`. Não registram rolagem horizontal; os 18 controles capturados têm foco visível, alvo mínimo de 44 px, geometria inteiramente no viewport e nove pontos sem obstrução.

A inspeção visual não identificou achados P1/P2 do mapa nesses frames: zoom, seleção, nomes longos, painel e ação final permanecem legíveis nos enquadramentos pertinentes. O identificador sintético longo quebra em linhas sem truncamento. Recortes nas bordas do viewport acompanham o scroll da captura. Texto a 200% foi obtido com `root-font-size:32px`, conforme os metadados; não representa zoom nativo nem teste em dispositivo físico.

As capturas de erro e recuperação de transporte não foram alcançadas. As de contexto vazio/inativo também não foram produzidas, pois o último cenário ficou NOT_RUN. A evidência parcial não fecha a frente nem substitui homologação humana.

O [recibo efetivo do Codex](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22#issuecomment-6314518379) revisou `19c85d43334b362a3bda540aff45da2f88682abe` sem findings; foram confirmadas ausência de reviews formais e de threads inline.

O reparo do seletor foi preparado contra esse HEAD. Seus novos testes locais e sua nova CI permanecem **NOT_RUN** até execução do próximo SHA. T016/T017 continuam abertas para os 15 gates, as capturas restantes e a revisão efetiva da nova candidata.

## Evidências esperadas no CI

`.accounts-validation/frontend-territorial-map/*-frontend-territorial-map-*-viewport.png` e `*-viewport.json`, também anexados ao resultado do Playwright. Nomes incluem identificador de cenário/repetição para não sobrescrever tentativas. Capturas `fullPage:false`, animações observadas, campos de formulário mascarados, sem trace/vídeo, geometria sem texto/URLs/valores.

Matriz: 320×760, 375×900, 768×900, 1440×900, 320×760 com fonte raiz a 200% e 844×390 paisagem. A escala de fonte é registrada como tal, sem alegar zoom nativo. Capturas cobrem mapa, último item focado e última ação focada, além de loading/erro/retry/vazio/inativo. Um controle obstruído gera evidência diagnóstica e falha o teste.

## Próximos passos e limites

1. Coordenador publica somente um HEAD descendente do seed protegido; cria PR Draft contra development.
2. Executa 15 gates/E2E e inspeciona PNG/JSON da candidata; trata FAIL com logs e causalidade, sem reclassificar cancelamento/skip como PASS.
3. Obtém review efetivo do HEAD publicado, corrige achados e revalida cada novo SHA; aceite de mantenedor não é simulado.
4. Registra no recibo externo SHA/parent/tree, run/attempt/job, artifact/digest, resultados individuais, capturas e review.

Leitor de tela, equipamento físico, UX humano e homologação operacional continuam não verificados. Históricos inconclusivos de reset/navegação não são declarados resolvidos. Nenhum merge, push remoto ou deploy foi realizado por esta frente.
