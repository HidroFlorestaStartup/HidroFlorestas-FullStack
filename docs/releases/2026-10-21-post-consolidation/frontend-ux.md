# Frente frontend e UX — execução pós-consolidação

## Resultado e identidade

`EVIDENCIA_IMPLEMENTACAO`: o agente real `/root/frontend_ux` executou **sete testes públicos originais da landing, todos PASS**, sobre o produto `b1f83cfa8e52dd25c6246c584a576553c5e9e131`, sem modificar código, testes, assertions, guards ou timeouts. Abriu e inspecionou os **21 PNGs originais** produzidos, com `fullPage:false`. Executou ainda **86 casos unitários originais**, distribuídos por dez arquivos frontend/territorial, em processos separados: todos PASS, nenhum skip. Não se encontrou defeito material novo que justificasse um patch funcional neste recorte.

Uma execução complementar do agente backend produziu **NAV4: zero PASS e quatro FAIL**, todos na saída de `/logout` para `/login`. A investigação frontend preservou o primeiro resultado e reproduziu o bloqueio `403 FORBIDDEN`, isolando uma incompatibilidade de origem no contexto local IMP006. O [adendo abaixo](#adendo--navegação-autenticada-e-contraprova-do-logout) registra essa falha, a contraprova e seus limites. Nenhum teste foi repetido para obter verde.

Esses resultados são diagnósticos locais focais. Não representam os quinze gates oficiais, aprovação das jornadas autenticadas operacionais, aceite humano, leitor de tela, dispositivo físico ou homologação do piloto. A causa histórica de INV-003 e da intermitência `settleTransitions` permanece `INCONCLUSIVO`.

| Campo | Valor verificado |
|---|---|
| Branch exclusiva | `review/hf-pos-frontend-20261021` |
| Base e produto executado | `b1f83cfa8e52dd25c6246c584a576553c5e9e131` |
| Worktree isolada | `wt-frontend`; nenhum outro escritor neste recorte |
| Estado inicial | Limpo; mesma base `origin/development` revalidada pela coordenação |
| Runtime | Linux, Node `24.19.0`, npm `11.9.0`, Playwright `1.55.1`, Chromium `140.0.7339.186` |
| Dependências | `npm ci --no-audit --no-fund`: exit 0; `npx prisma generate`: exit 0, sem conexão com banco |
| Landing | Início `2026-10-21T23:59:56.392Z`; duração 14,010 s; sete PASS, zero FAIL/skip/flaky; exit 0 |
| Unitários diretos | Concluídos `2026-10-22T00:02:29.955110Z`; dez processos exit 0, 86 casos PASS |
| Navegação autenticada complementar | Backend executou NAV4 original uma vez: zero PASS, quatro FAIL; frontend inspecionou evidências e reproduziu a falha de origem |
| Alteração de produto | Nenhuma; somente relatório e evidências de diagnóstico |

No horário de São Paulo, as execuções acima ocorreram na noite de **21/10/2026**. O carimbo UTC dos recibos é preservado.

## Escopo e método

`DECISAO_CONFIRMADA`: a missão anexada autorizou investigação de defeitos demonstráveis e preparação do piloto, com trabalho real, isolamento, preservação de históricos e sem merge, Production ou banco hospedado. A delegação do coordenador atribuiu a este agente INV-003, navegação, OBS-001/002 e a revisão frontend.

Foram lidos `AGENTS.md`, `PROJECT_CONTEXT.md`, `PLANS.md`, `TECH_DECISIONS.md`, a constituição Spec Kit, a política de fontes, a triagem histórica, o recibo agregado e os testes/componentes aplicáveis. Há somente o `AGENTS.md` da raiz no recorte. A investigação segue o plano transversal coordenado desta missão; não foi aberta feature/Spec de correção porque não houve defeito atual demonstrado.

A configuração temporária selecionou **somente** `tests/e2e/frontend-landing.spec.ts`, com um worker, zero retry e todas as assertions originais. Iniciou o Next em `127.0.0.1:3107`; removeu do ambiente do servidor nomes ligados a banco, JWT, senha administrativa, SMTP, conta e Cloudinary. Não foram criados usuário, sessão, fixture, banco ou mock de página. `/`, `/login` e `/register` foram acessadas como rotas públicas. A configuração executada foi preservada como evidência, fora dos runners oficiais.

O Chromium inicialmente ausente foi instalado a partir do pacote Playwright fixado no lockfile. A primeira CDN retornou arquivo inválido; o fallback oficial Microsoft do instalador concluiu. Execução do browser dentro do sandbox restrito foi recusada pelo sistema; a execução autorizada com escalada automática concluiu. Nenhum guard do projeto foi desabilitado.

## Cobertura pública efetivamente executada

| Cenário original | Resultado | O que foi verificado |
|---|---|---|
| 320 × 812, texto 100% | PASS | HTTP 200, h1 exato, âncoras válidas, largura documental, CTA, qualificadores IHFR |
| 375 × 812, texto 100% | PASS | Mesmas assertions, enquadramento e controles |
| 768 × 1024, texto 100% | PASS | Mesmas assertions em tablet emulado |
| 1440 × 1000, texto 100% | PASS | Mesmas assertions em desktop |
| 320 × 812, texto 200% | PASS | Fonte raiz de 32 px, nenhuma palavra fragmentada internamente, ausência de overflow horizontal, títulos e qualificadores integralmente expostos após rolagem |
| 812 × 375, texto 100% | PASS | Paisagem, rolagem real e exposição dos qualificadores |
| Teclado e rotas, 375 × 812 | PASS | Tab no skip-link, Enter e foco no main, acesso a login e cadastro pelas rotas existentes |

Os testes exigiram CTA com dimensões **pelo menos 44 × 44 px** e hit tests sem obstrução. Usaram fonte raiz ampliada; isso não é zoom nativo do navegador. Os quatro qualificadores científicos permaneceram visíveis e preservados: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`, apresentados na landing em linguagem natural correspondente.

### Inspeção das 21 capturas

`EVIDENCIA_IMPLEMENTACAO`: todos os originais foram abertos em três lotes de sete imagens, sem reconstrução ou edição. As metadatas registram `fullPage:false`, o HEAD executado, viewport e fonte raiz. Nenhum novo P1/P2 visual foi identificado nos frames da landing. Conteúdo situado além do viewport continuou acessível por rolagem; o corte de um frame de paisagem não foi classificado como corte funcional da página.

O indicador do Next em desenvolvimento está presente e encobre alguns pixels próximos ao canto inferior esquerdo. Foi preservado nas imagens e não foi tratado como defeito de Production ou justificativa para modificar a interface. A execução também emitiu aviso Next sobre proporção do logo; o CSS existente já declara `width:100%; height:auto`, e as capturas não demonstram distorção material. Não se aplicou correção cosmética por aviso isolado.

Os PNGs, metadatas e hashes estão no [manifesto](evidence/frontend-public/manifest.json). A [projeção fechada do resultado Playwright](evidence/frontend-public/playwright-results.json) preserva somente identidade, estatísticas e resultados por caso. O [snapshot da configuração executada](evidence/frontend-public/executed-config.cjs.txt) tem os caminhos absolutos normalizados e não contém valores de ambiente. Esses registros distinguem o diagnóstico público do runner integral com PostgreSQL.

**Revisão independente antes da publicação:** o agente operacional identificou que o reporter JSON bruto serializava o ambiente herdado do processo. Esse arquivo não havia sido commitado nem publicado. A evidência foi substituída por uma projeção com lista fechada de campos; `config`, ambiente, stdout/stderr, anexos e metadata arbitrária foram excluídos integralmente. Os hashes/tamanhos foram recalculados. Nenhum valor sensível faz parte do recibo versionado; o achado e a correção não alteram os resultados dos testes.

## Unitários efetivamente enumerados

| Arquivo original em `tests/unit/` | Casos PASS |
|---|---:|
| `frontend-collections-recovery.test.ts` | 7 |
| `frontend-collections-submission.test.ts` | 24 |
| `frontend-environmental-presentation.test.ts` | 25 |
| `frontend-environmental-preservation.test.ts` | 10 |
| `frontend-ihfr-presentation.test.tsx` | 3 |
| `frontend-user-administration.test.ts` | 6 |
| `territorial-map-contracts.test.ts` | 3 |
| `territorial-map-openapi-contract.test.ts` | 1 |
| `territorial-map-service.test.ts` | 4 |
| `territorial-map-state.test.ts` | 3 |
| **Total deste diagnóstico** | **86** |

Comando por arquivo: `node --import=tsx <arquivo original>`. Cada arquivo rodou em processo distinto; os nomes e as contagens constam no [log](evidence/frontend-unit-direct.log) e no [resumo estruturado](evidence/frontend-unit-direct.json). Esses casos cobrem, entre outros pontos, precisão e preservação de valores ambientais, recuperação/submissão, qualificadores e escaping IHFR, administração, coordenadas, seleção e estados independentes de tiles. Os testes unitários usam suas dependências sintéticas; não acessam o banco hospedado.

**Limite do primeiro comando:** `node --import=tsx --test ...` reportou somente dez entradas de arquivo neste ambiente. Uma contraprova focal mostrou um arquivo reportado pelo launcher versus três casos enumerados na execução direta de `territorial-map-state.test.ts`. Para não inflar evidência, as dez entradas não foram contadas como dez casos e não foram somadas aos 86; o [log inicial](evidence/frontend-unit-launcher.log) é preservado. A causa do comportamento do launcher local não foi determinada e nenhum ajuste foi transportado ao runner oficial. A CI Windows deve manter seus próprios resultados e contagens.

## Históricos e classificações atuais

| Item | Fonte recuperada e observação | Classificação / estado neste recorte | Próxima evidência necessária |
|---|---|---|---|
| INV-003, navegação fase 3 / mapa fase 4 | PR #12 e #14 e recibos lidos via conector; falhas antigas não têm causalidade encerrada. Os consertos móveis históricos são fatos distintos. | `INCONCLUSIVO`; nenhum patch funcional proposto | Log original com navegação HTTP, cookie/sessão, API e tiles correlacionados; comparação em ambiente sintético próprio |
| `settleTransitions`, 375 px/texto 200% | Recibo agregado relata três sondas sem reprodução. Leitura atual confirma filtro `playState === running` e `Number.isFinite(endTime)`; infinitas não são aguardadas. O helper também espera rejeições de animações canceladas por `Promise.allSettled`. NAV4 complementar atravessou as etapas de Back/Forward/reload e falhou posteriormente no logout. | `INCONCLUSIVO` quanto à causa histórica; timeout antigo não reproduzido nesta execução, que permanece FAIL | Executar os gates oficiais mantendo timeout de 90 s e observar animações se a falha histórica reaparecer |
| OBS-001, hidratação/caret | Histórico relata coincidência temporal com captura, sem contraprova A/B. A landing não reproduz o formulário de coleta. | `NOT_RUN` para a contraprova específica; hipótese de harness preservada | Capturar o mesmo formulário sintético antes/durante/depois, com console e DOM observados sem suprimir avisos |
| OBS-002, máscaras/indicador/enquadramento | 21 imagens públicas e 68 imagens únicas de NAV4 inspecionadas; outras 24 capturas NAV4 têm bytes idênticos. Indicador dev preservado; 56 registros de controles NAV4 visíveis e atingíveis | `PASS` no recorte público; observações pré-logout favoráveis não alteram NAV4 FAIL nem encerram o histórico | Revisar capturas e hit tests de formulário, mapa, IHFR e admin da CI própria; aceite humano por dispositivo |

Fontes históricas:

- [PR #12, recibo de integração](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12#pullrequestreview-5566567231).
- [PR #14, recibo final e tentativas preservadas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14#issuecomment-6270896754).
- [PR #25, instrumentação histórica e limites](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/25#issuecomment-6315201613).
- [Triagem vigente na base](../2026-10-21-frontend-rc/triagem-historicos.md) e [recibo agregado](../2026-10-21-frontend-rc/regressao-agregada.md).

## Adendo — navegação autenticada e contraprova do logout

### Primeiro resultado preservado

`EVIDENCIA_IMPLEMENTACAO`: `/root/backend_historicos` executou uma única vez o arquivo original `tests/e2e/frontend-mobile-navigation.spec.ts`, sobre o produto `b1f83cfa8e52dd25c6246c584a576553c5e9e131`. A configuração e as assertions do repositório permaneceram intactas: um worker, zero retry, timeout do teste de 90 s e timeout da assertion final de 5 s. A execução utilizou PostgreSQL **16.15**, cluster sintético próprio IMP006 em loopback `55426`, quatorze migrations formais e Next em `127.0.0.1:3000`. Esse contexto difere do runner oficial Windows/PostgreSQL 17 e do contexto de contas em `55427`.

Os quatro casos — 375 px e 320 px, cada um com texto 100% e 200% — falharam na mesma assertion, `await expect(page).toHaveURL(/\/login$/)`, na linha 245. A URL recebida continuou em `/logout`. Os quatro snapshots finais mostram o alerta **“Não foi possível concluir a solicitação.”** e o botão “Tentar novamente”; não mostram uma espera infinita em `settleTransitions`.

O [resultado estruturado](evidence/frontend-nav4/nav4-result.json), o [extrato redigido do primeiro log](evidence/frontend-nav4/first-failure-redacted.log) e os quatro error-contexts preservam **exit 1, zero PASS e quatro FAIL**. O log original tem 76.730 bytes e SHA256 `c5d193b7dbc2f8207cbb42fcd98ae63717da96693121da0a9d2c71f1fcc2d4f5`. Seus timestamps de filesystem são `2026-10-22T00:07:14.987072995Z` (criação) e `2026-10-22T00:08:50.433608Z` (modificação final); não foram apresentados como timestamps internos do Playwright. O original não capturou o status HTTP de logout, headers, cookies ou console do browser. Os códigos abaixo pertencem à reprodução focal posterior.

### Contraprova focal, sem nova execução de NAV4

O agente backend reiniciou somente o Next no mesmo HEAD de produto, porta e configuração efetiva IMP006. Não refez bootstrap, fixtures ou navegação. As flags de contas e `ACCOUNT_TRUSTED_INGRESS` continuaram ausentes; `IMP006_LOCAL_POSTGRESQL` e `IMP006_LOCAL_REGRESSION_PUBLIC` continuaram habilitadas. O segredo JWT efêmero foi novo, sem relevância para estes pedidos sem sessão. Nenhuma flag incompatível com o banco foi ativada para forçar sucesso.

O agente frontend realizou dois POSTs sem cookie, mudando apenas o valor de `Origin`:

| Requisição ao mesmo `/api/auth/logout` | HTTP | Envelope permitido no recibo |
|---|---:|---|
| `Origin: http://127.0.0.1:3000` | 403 | `success:false`, `code:FORBIDDEN` |
| `Origin: http://localhost:3000` | 200 | `success:true` |

O [recibo HTTP](evidence/frontend-nav4/frontend-logout-http-probe.json) foi produzido às `2026-10-22T00:17:13.092066Z`. Em seguida, um contexto Chromium novo, sem conta nem cookie, acessou `/logout` e reproduziu automaticamente **403, o mesmo alerta e a permanência em `/logout`**. O [recibo do browser](evidence/frontend-nav4/frontend-logout-browser-probe.json) registra `2026-10-22T00:18:15.050Z`, zero exceções de página e zero cookies; a [captura original](evidence/frontend-nav4/frontend-logout-browser-probe.png), 375 × 900 e `fullPage:false`, foi aberta e inspecionada. O corpo de mensagens de console, headers e cookies não foi publicado; somente contagens e campos de resultado definidos previamente foram retidos.

**Classificação sustentada para esta execução: incompatibilidade de configuração do ingresso no contexto local.** A implementação de [CSRF](../../../src/app/api/server/accounts/http.ts) usa `request.url` quando não existe ingresso confiável explícito. O [teste unitário já existente](../../../tests/unit/account-contracts.test.ts) documenta que o `NextRequest` instalado normaliza o hostname loopback `127.0.0.1` para `localhost` e cobre o ingresso local suportado. A contraprova HTTP demonstrou a consequência concreta dessa diferença de origem no servidor executado. O runner oficial usa o contexto de contas e o ingresso explícito correspondente; não se alterou esse contrato nem a proteção CSRF.

Essa evidência explica o bloqueio local observado e não demonstra uma regressão do produto no contexto oficial. **NAV4 continua FAIL**, e a contraprova HTTP de uma rota sem sessão não equivale ao sucesso da jornada autenticada. Não houve patch funcional, mudança de assertions/timeouts/guards nem repetição de NAV4. Também não encerra INV-003 ou o timeout histórico de `settleTransitions`. O servidor diagnóstico e o cluster sintético foram encerrados pelo agente responsável após a coleta.

### Geometria e inspeção visual antes da falha

O arquivo original gerou **92 capturas**, com 68 hashes distintos e 24 duplicatas por conteúdo. O agente frontend abriu e inspecionou as **68 imagens únicas**, sem editar imagens ou ocultar o indicador de desenvolvimento. O [manifesto](evidence/frontend-nav4/manifest.json) lista SHA256 e tamanho de todas as 92, a equivalência por bytes e oito originais representativos preservados no Git. As quatro geometrias completas foram copiadas sem alteração: 43 registros por caso, total de 172. Desses, 56 são registros de controles com `visible:true` e `hit:true`.

As etapas anteriores ao logout incluem foco do último controle, navegação com três e quatro links, abertura/fechamento do diálogo e retorno de foco, Tab/Shift+Tab, ida ao resumo do laboratório, Back, Forward, reload, paisagem 667 × 375 e safe area de 34 px emulada por CDP. Não há outra falha de assertion listada no primeiro reporter. A verificação do breakpoint de 768 px é funcional; não se produziu uma captura NAV4 desse breakpoint. A landing fornece as capturas públicas de 768 e 1440 px já descritas acima.

O indicador Next dev permaneceu visível junto ao canto inferior esquerdo, às vezes sobre pixels da navegação; não foi removido para obter capturas favoráveis. O ambiente também mostrou o glifo de emoji indisponível em alguns títulos, sem ocultar a informação ou os controles. Não se identificou novo defeito material de geometria que justificasse patch neste recorte. Fonte raiz de 32 px, viewport e safe area emulados não são zoom nativo, dispositivo físico, leitor de tela nem aceite humano. As observações favoráveis anteriores à falha **não transformam os quatro casos em PASS**.

## Gates e continuidade

| Critério deste agente | Estado | Limite |
|---|---|---|
| Integridade do recorte e base | PASS | Apenas a worktree e os arquivos desta frente |
| Testes públicos originais e inspeção | PASS | Sete casos, 21 imagens; produto b1f83cf |
| Unitários focais diretos | PASS | 86 casos; diagnóstico independente, não gate Unit oficial |
| Explicação causal dos históricos | BLOCKED | Evidência atual não reconstitui as falhas antigas |
| Navegação autenticada local complementar | FAIL | Backend executou NAV4 uma vez: zero PASS, quatro FAIL no logout. Frontend comprovou incompatibilidade de origem do contexto local; resultado original preservado |
| Runner oficial de jornadas autenticadas | NOT_RUN | Diagnóstico Linux/IMP006 não substitui runner Windows/PostgreSQL 17/contexto de contas; nenhum guard foi enfraquecido |
| CI dos quinze gates do HEAD de entrega | NOT_RUN | Responsabilidade da coordenação; deve ser registrada no recibo do SHA final |
| Homologação humana, leitor de tela e dispositivo físico | NOT_RUN | Não inferida a partir de Chromium emulado |

`RECOMENDACAO`: usar as capturas e logs da CI oficial própria para complementar mapa, administração, IHFR e navegação. Se uma falha voltar a ocorrer, preservar o primeiro FAIL, recuperar o estado do servidor/DOM e reproduzir o schedule antes de propor código. Não aumentar retry/timeout nem remover assertions para obter PASS. Os gates operacionais G3–G5 e a validação científica permanecem fora da aprovação deste recorte.

## Encerramento desta entrega

Estado da frente: **PARCIAL**, com execução pública e unitária focal concluída, NAV4 complementar FAIL preservado, causa do bloqueio local sustentada por contraprova e históricos sem encerramento causal. Arquivos alterados: este relatório e `evidence/frontend-*`. Código, testes, lockfile, workflows, `vercel.json`, `docs/raw/**`, `main` e `development` não foram alterados por este agente. Não houve push, merge, deploy, e-mail ou operação de dados reais pelo agente frontend; publicação e comunicação única ficam com a coordenação autorizada.
