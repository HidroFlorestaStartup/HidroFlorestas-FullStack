# Evidências da continuidade R3 — 20/10/2026

## Fechamento da candidata funcional e gate do HEAD publicado

EVIDENCIA_IMPLEMENTACAO: a candidata `ec4b06e4b27059b1077904e0b67fde498c28b053` concluiu **15/15 gates PASS,190/190 E2E PASS e Codex sem findings no mesmo SHA**. O P1 de continuidade de identidade foi respondido com a evidência oficial e resolvido. A PR #19 permanece Draft, empilhada sobre `feat/frontend-collections`; nenhum merge ou deploy foi executado.

| Proveniência | Valor |
|---|---|
| Run / tentativa / job | [39472759694](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39472759694) /1 /118800800378 |
| Artifact |12288662735;20.691.926 bytes;523 entradas; digest e CRC conferidos |
| SHA256 do ZIP | `fc88413bfde9e5af9c43e08c1de11a4de59dd9eccce343b74d00ab3b45df843f` |
| Fingerprint | `18b1bbb56ff663c8cf1915e3ce582dfbaba4edb832e2b618c06e3fa06152b5c1`;566 inputs funcionais; reprodução com filtros Windows correspondente |
| Codex efetivo | [6297927596](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6297927596), completed, sem findings |
| P1 resolvido | [Resposta4328737531](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#discussion_r4328737531); [recibo](evidence/r3/third-candidate-review-resolution.json) |

| Gate | Resultado / contagem |
|---|---|
| RegressionSetup | PASS |
| Unit | PASS,393+17=410 |
| Integration | PASS,231 |
| Migration | PASS,37 |
| Contract | PASS,6 |
| R1 | PASS,17 |
| Build | PASS |
| Typecheck | PASS |
| Lint | PASS;3 warnings preexistentes |
| E2E | PASS,190/190;0 FAIL/SKIP/NOT_RUN/flaky |
| Https | PASS,2/2 |
| Deletion | PASS,3/3 |
| Ihfr | PASS,6/6 |
| Bootstrap | PASS |
| SchemaAudit | PASS |

[Recibo completo](evidence/r3/third-candidate-receipt.json), [inventário](evidence/r3/third-candidate-capture-inventory.json), [galeria dos53 pares de aplicativo](evidence/r3/official-v3/README.md) e [manifesto de cópias byte a byte](evidence/r3/third-candidate-versioned-captures.json). Os2 pares sintéticos são separados da aceitação do aplicativo. PNG/JSON sobreviveram aos gates Deletion/Ihfr.

A inspeção independente cobriu48 quadros de matriz e5 de fluxos;42 quadros finais têm o controle principal inteiro. Cinco imagens de aplicativo foram abertas nesta rodada;48 têm SHA256 idêntico a pixels já examinados. Os27 ambientais são idênticos à fase7 v2;25 quadros de aplicativo de coleta e2 sintéticos são idênticos à fase6 v3. O coordenador abriu também formulário320×900/texto200, Declividade e revisão844×390/texto200. [Parecer visual e limites](evidence/r3/third-candidate-visual-review.md). Permanecem máscaras/indicador Next sobre partes da navegação, navegação elevada/espaço branco em alguns quadros móveis e label de Declividade parcialmente fora em paisagem; isso não equivale a aceite físico ou assistivo.

A matriz de seis configurações cobre formulário, Salvar/rascunho, Declividade e revisão. Leitura confirmada é exercitada separadamente por R2, API/reload e suíte desktop/mobile; não há seis capturas de leitura confirmada. Precisão, false/zero/null/ausência/textos parciais e persistência não são inferidos apenas dos pixels.

O log Integration nomeia os casos de OCC save/discard, consumo atômico com rollback/replay, exclusão de drafts com rollback e concorrência save-versus-confirm, além dos dois testes de handlers com continuidade de principal. Os três P1 ambientais A → B → A estão incluídos na seleção integral190/190; o reporter de pontos não enumera cada PASS, e essa inferência está explicitada no recibo. O POST cobre tanto resposta perdida antes da persistência quanto depois, com retorno ao mesmo ID/chave/corpo e uma única persistência. PUT/GET/DELETE preservam a revisão e o isolamento pessoal. Testes de handlers com mocks permanecem distintos dos casos PostgreSQL oficiais.

O resultado atual de Ihfr6/6 não determina a causa dos seis404 históricos de85e397. O diagnóstico pós-falha não foi acionado neste run verde; não há routeContext nem respostas auth/API observadas a inferir. A causa histórica e a hipótese de cache permanecem **INCONCLUSIVAS**, com logs e ensaios preservados abaixo. A causa histórica da falha de conta também permanece inconclusiva.

O diff de produto R3 desde3d803829 contém somente os dois CSS Modules locais (coleta herdada e ambiental). Não houve alteração R3 em schema, serviços, autorização, provas HMAC, contratos ou cálculo IHFR. Permanecem CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

A reconciliação documental final conserva ec4b06e como primeiro parent e a fase6 corrigida como segundo; a referência exata, merge-tree e igualdade dos blobs estão no [recibo de incorporação](evidence/r3/final-documentary-incorporation.json). A validação funcional de um parent não substitui o gate do novo HEAD. A consolidação foi conferida em [parecer independente](evidence/r3/documentation-consolidation-review.md) e [auditoria dos arquivos congelados](evidence/r3/documentation-consolidation-review.json); os hashes excluem o próprio recibo.

### Regra de encerramento por SHA

Este commit consolida documentação e evidências da candidata funcional nomeada, com incorporação não destrutiva da documentação final da fase6; não muda inputs funcionais. **A entrega técnica do HEAD documental exige seus próprios15/15 gates PASS e Codex concluído sem achado material no SHA exato**, além da dependência final da fase6 verificada. O resultado posterior será registrado em recibo externo na [PR #19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19), com SHA/parents, run/tentativa/job, contagens, artifact/digest/fingerprint, inspeção visual e Codex efetivo. Somente o recibo que confirma os critérios encerra o gate, sem outro commit. Qualquer commit posterior exige nova conferência. Até a confirmação, o HEAD documental está **AGUARDANDO_VALIDAÇÃO_EXATA**. Os checkboxes aplicam-se ao SHA e alcance que nomeiam; aceite humano e homologação científica permanecem pendentes.

## Histórico — preparação e validação das candidatas anteriores

# Evidências da continuidade R3 — 20/10/2026

## Terceira candidata: correções de revisão herdadas da fase6

Esta candidata preserva `85e397bd4271ab07a197ea88db652227e6e392ce` como primeiro parent e incorpora `5f5d8719e25856b59e84c053cb13d2516dbeac49` como segundo parent. O merge-tree automático `97743377d688512f261111d5d011518ae04b3393` não teve conflitos; os14 arquivos herdados conferem por blob com a árvore automática e a fase6 publicada. [Recibo da incorporação](evidence/r3/third-candidate-incorporation.json). A igualdade de blobs refere-se aos14 arquivos herdados; ec4b06e também acrescentou o diagnóstico pós-falha404 e seus três testes unitários. A frase de escopo do recibo foi esclarecida nesta consolidação, com o texto original preservado no próprio registro e no histórico Git. A base da PR permanece `feat/frontend-collections`, sem merge de PR, rebase ou force-push.

A revisão Codex da segunda candidata ambiental `85e397bd4271ab07a197ea88db652227e6e392ce` terminou [sem novos achados](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6296990762). Isso não elimina os dois achados encontrados na revisão da fase6 sobre o helper herdado: P1 de resolução prematura de callbacks e P2 de screenshot que concluía transições antes da espera. A nova incorporação contém as correções e duas regressões permanentes, com **23/23 PASS auxiliares independentes**. [Triagem, limites e contraprovas compartilhadas](../023-frontend-collections/implementation-evidence.md).

A função real aguarda uma tarefa após os callbacks do segundo frame, conserva foco e uma única rolagem, e reavalia animações finitas. A captura antes da rolagem ocorre após readiness, com animações permitidas. Os9 hit tests, bounds, matriz de viewports, texto200, navegação e timeouts foram preservados. O produto e os cenários ambientais/handlers permanecem byte a byte iguais aos da segunda candidata; nesta terceira incorporação não há nova mudança em `src`.

A contagem esperada da próxima seleção integral é190 E2E, incluindo23 testes do helper. Não é resultado observado. O novo HEAD exige seu próprio CI15/15, artifact, inspeção de pixels e Codex; o PASS de um parent ou de um SHA anterior não é transportado.

## Resultado observado da segunda candidata — falha IHFR preservada

HEAD `85e397bd4271ab07a197ea88db652227e6e392ce`, [run39465856665](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39465856665), tentativa1, job `118776943818`: **12 gates PASS; Ihfr FAIL; Bootstrap e SchemaAudit NOT_RUN**. Unit407, Integration231, Migration37, Contract6, R1 17, E2E188, Https2 e Deletion3 passaram integralmente. E2E teve188/188 PASS, sem FAIL, SKIP ou NOT_RUN. Não há aprovação global desta candidata. [Recibo completo](evidence/r3/second-candidate-receipt.json).

O primeiro desvio é HTTP404 na navegação de criação de coleta, antes de procurar o campo de fuso. As seis navegações IHFR retornam404 e os seis testes falham. O gate iniciou um servidor Next próprio em porta aleatória e registrou schema pertencente à execução. O artifact não contém screenshot/contexto de erro desse gate. A causa permanece **INCONCLUSIVA**; não foi atribuída a H4, geometria, flakiness ou cálculo científico. A rota de criação, autorização, fixtures e harness não diferem entre a fase6 v2 aprovada e esta fase7 v2; esse fato restringe a investigação, mas não demonstra equivalência de estado em runtime.

Artifact `12287280647`, SHA256 do ZIP `c8f87eb327d5bd3a8c7235fdc84a3ef60ab01dfd7fa42bb0cf62ce4468a41e6e`, conferido com o digest remoto. Fingerprint `20cb2e17a3a9e66241a9057a2eda0d8a08d143239958a23a2941bc6b0230224c`, reproduzido sobre564 arquivos funcionais com filtros Windows, idêntico nos13 registros executados. Os ZIPs e logs da falha foram preservados.

A [inspeção visual independente](evidence/r3/second-candidate-visual-review.md) conferiu54 pares duráveis:53 capturas de aplicativo e1 contraprova sintética separada. As matrizes cobrem48/48 quadros e42/42 quadros finais têm o alvo inteiro. Foram vistos27 ambientais e6 de coleta; os outros20 de coleta e o sintético têm pixels SHA256 idênticos aos já examinados na fase6 v2. Os metadados de todos os54 pares conferem HEAD, dimensões e escala. Limites reais permanecem: máscaras/indicador Next sobre parte da navegação, navegação elevada e espaço branco em alguns formulários móveis, label parcialmente acima do header em paisagem, e ausência de aceite humano. Esses pixels antecedem a correção P1/P2 do helper e não substituem a captura da próxima candidata.

## Investigação focal do gate IHFR404

EVIDENCIA_IMPLEMENTACAO: a segunda candidata passou12 gates, mas falhou nos6 testes IHFR por navegações404; E2E188/188 foi integralmente aprovado. Rotas presentes no build, fixtures e código de autorização iguais aos da fase6 aprovada não revelam a causa em runtime. Causa **INCONCLUSIVA**; o histórico não é classificado como flakiness.

RECOMENDACAO executada no escopo de diagnóstico: somente após um teste já falhar e registrar404, observar GETs existentes de autenticação, laboratórios e área. `ihfr-route-probe.ts` exige origem loopback igual à navegação, schema sintético válido e caminho reconhecido. Cada GET recebe uma cópia em memória do cookie em contextoAPI descartável distinto; assim401 de `/me` não apaga o cookie do teste nem altera os demais probes. A saída contém apenas status, classe JSON/HTML/outro, códigos enumerados e booleans de presença. Não salva corpos, headers, cookies, nomes ou exceções. Não segue redirects nem repete requests; os5s limitam apenas cada observação posterior à falha, sem ampliar timeout de testes ou readiness.

A leitura independente confirmou isolamento e ausência de saída privada. O contexto observado é o da última navegação404, com cookies correntes após a falha. Booleano false significa apenas não observado naquela resposta, não prova de ausência real. O ensaio auxiliar de cache permaneceu [inconclusivo](evidence/r3/ihfr404-cache-assessment.json): a conclusão inicialmente excessiva sobre cache foi corrigida após constatar somente CURRENT/seq0 sem dados persistidos; o complemento abortou antes de B.

Três testes focais sintéticos passaram; typecheck passou e lint manteve somente os3 warnings preexistentes. [Recibo e hashes](evidence/r3/ihfr-route-probe-local-validation.json). Não foi alterado produto, gate, fixture, cálculo científico ou asserção. A candidata incorpora as correções P1/P2 já revisadas e acrescenta observabilidade para a falha ainda inconclusiva. O novo run integral é necessário tanto à regressão das correções herdadas quanto à observação da falha, caso ela se repita. Nenhum resultado anterior é reaproveitado como aprovação do novo HEAD.

## Histórico da segunda candidata: incorporação complementar

A segunda candidata preserva como primeiro parent `5ca520500298a2066f2072290998754a4a62d42e` e incorpora como segundo parent a fase6 `2a047d10360803517ff6bf64b38754cd0f07f5ba`. O merge-tree encontrou uma única sobreposição textual em `.github/workflows/rc-review.yml`: os dois lados acrescentavam capturas no mesmo trecho. A resolução preserva a união dos caminhos sanitizados de coleta/ambiental e todas as allowlists da branch ambiental. Os demais arquivos herdados conferem byte a byte com o merge-tree automático. [Registro da incorporação](evidence/r3/second-candidate-incorporation.json). Não houve rebase, force-push ou merge de PR.

A sincronização agora aguarda todas as gerações de transições finitas, conclui o ciclo ResizeObserver/foco em dois frames e reavalia antes da única rolagem. O helper final passou21/21 contraprovas independentes e3/3 reproduções focais, preservando foco,9hit tests e animação infinita. A pausa pendente foi excluída porque sua promise `finished` pode não resolver. [Evidência compartilhada da fase6](../023-frontend-collections/implementation-evidence.md).

O workflow preserva PNG/JSON mascarados de ambas as fases em diretórios duráveis. C comprovou2PASS+1PASS em duas execuções Playwright com o helper de captura exato; o bloco de captura continuou idêntico após a correção de sincronização. A suíte oficial esperada passa a188 testes, mas essa expectativa não é resultado. A candidata seguinte exige seu próprio run completo, fingerprint, inspeção dos artifacts e revisão Codex.

## Primeira candidata R3 publicada e resultado oficial

HEAD `5ca520500298a2066f2072290998754a4a62d42e`, [run 39461576673](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39461576673), tentativa1, job `118762102005`: **9 gates PASS; E2E185 PASS / 1 FAIL / 0 SKIP / 1 NOT_RUN; cinco gates posteriores NOT_RUN**. Unit390+17 e Integration231 passaram, incluindo resultados nominais dos dois novos testes de handlers. O fingerprint `bc1b4a11b6aacf578512d946cbe96e5e0d2c06ed3096bf34cfe7514e9782c625` foi reproduzido exatamente sobre564 arquivos funcionais com filtros de checkout CRLF.

O commit tem parents ordenados `3d8038294e3d5383b0b3536b8ded275f2f85e884` e `6fd80667f4270ce43536963762444f6893f0c347`: incorporação não destrutiva da fase6, sem rebase ou merge de PR. A árvore local conferida foi `987bdddd50c64b5ef2d41eacc3d2443a63b7a79f`.

- Artifact `12283507803`, SHA-256 verificado `a7eeae056a0bd2225a2044c2e11e06b23c4310abfa0c28595af927477c6dd11e`.
- Única falha: coleta herdada, botão Revisar coleta em320×900/texto200, y1726..1860,9/9 hits ausentes, INPUT focado. O P1 de coleta seguinte ficou NOT_RUN pelo modo serial; isso não apaga o PASS dele no run anterior da fase6, mas tampouco aprova este HEAD.
- Os três P1 ambientais passaram: PUT/GET/DELETE do draft, POST antes de persistir e POST já persistido com resposta perdida, sempre A → B → A. A inferência individual está explicitada no [recibo](evidence/r3/first-candidate-receipt.json):187 selecionados,185 aprovados, somente a falha e a interrupção de coleta acima, sem filtros/skips.
- [Codex concluído no mesmo HEAD](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6296404441), sem achados materiais. A revisão será renovada após o próximo commit.
- [Inspeção dos24 pares PNG/JSON ambientais](evidence/r3/first-candidate-visual-review.md): Salvar,Declividade,Revisar eConfirmar visíveis em todas as seis combinações; HEAD/escala/dimensões consistentes. Limites documentados incluem máscaras sobre pixels da navegação, rolagem do documento em alguns quadros, rótulo de Declividade parcialmente fora em paisagem e indicador Next de desenvolvimento. Não se declara aceite humano ou navegação sempre ancorada.

A causa restante H4 foi reproduzida com React/CSS reais: transições globais acionam ResizeObserver e revelam novamente o input focado após a rolagem do teste. A correção compartilhada deverá aguardar transições finitas e concluir o ciclo de resize/foco antes de uma única rolagem, mantendo as contraprovas de obstrução. PNG/JSON da coleta e do ambiental serão preservados fora do outputDir que os gates posteriores limpam. O novo HEAD requer seus próprios15 gates, captura durável e Codex.

## Checkpoint original e dependência

PR [#19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19), branch `feat/frontend-environmental-drafts`, HEAD `3d8038294e3d5383b0b3536b8ded275f2f85e884`, base `feat/frontend-collections`.

- [Run39452650036](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39452650036), tentativa 1, job `118731460561`, artifact `12281000723`.
- SHA-256 conferido do ZIP: `f7ce01106aae683fb562f4bbf8bebeb2d573f116e70f72130bbd12f9156d8d5c`.
- Fingerprint: `d70740daeced33e017aac2f5a564ed4ac08ce6810b4ef79ba8237c62c685521c`.
- 9 gates PASS; E2E **161 PASS / 2 FAIL / 3 NOT_RUN**. Https/Deletion/Ihfr/Bootstrap/SchemaAudit não executados. Os três casos NOT_RUN eram as recuperações P1 de coleta, draft e POST ambiental.
- Primeira falha ambiental na confirmação375×900/texto 100%, antes da captura de revisão375. Não pode ser atribuída a cantos em200%. Traces/error-context não constavam no artifact.

Merge-base histórico: `e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`. A incorporação R3 usa dois parents, preservando `3d8038294e3d5383b0b3536b8ded275f2f85e884` como primeiro parent e o candidato fase6 `6fd80667f4270ce43536963762444f6893f0c347` como segundo. `git merge-tree --write-tree` produziu árvore sem conflito `5d103bd3fe572355f1a1cd5ee194fa8505c1b0d0`; os 15 arquivos incorporados da fase6 foram conferidos por blob. Este registro não declara a fase6 aprovada antes de seu CI. Nenhuma PR foi mesclada, nenhuma branch base foi alterada e não houve rebase.

## Diagnósticos e contraprovas auxiliares

Node24.19.0, Playwright1.55.1 do lockfile, Chromium153.0.8010.0. Alcance auxiliar explicitamente distinto do Windows/PostgreSQL oficial.

| Risco | RED | GREEN / preservação |
|---|---|---|
| H4: foco/scroll | DOM sintético com CSS e algoritmo relevante:12/12 falhas; scrollTop1281→0; confirmação y751,875→2032,875 após callback tardio | Foco esperado + frame causal:12/12 PASS; y751,875 estável; sem elevar timeout ou repetir scroll |
| H1: margem assimétrica | SSR dos componentes reais+CSS/Tailwind:844×390/texto 200%, Salvar y37,188..129,188 e Declividade y34,313..132,313, header até 82;3/9 pontos interceptados | Margem local 1rem: y149,188..241,188 e y146,313..244,313;9/9 pontos livres; controles móveis preservados |
| Continuidade HTTP | Mutante sem guard draft:3 PASS / 1 FAIL; sem guard POST:3 PASS / 1 FAIL | Handlers vigentes4/4 PASS; guard antes de qualquer acesso ao serviço |

O SSR usa adaptadores mínimos Next/contexto sintético, Arial de fallback e controles desabilitados no estado inicial. O ensaio comprova a geometria, não a hidratação ou persistência. Os cinco controles de formulário/revisão têm 9/9 pontos livres após a correção nas combinações844×390/texto 200%,320×900/texto 200% e375×900/texto 100%. `summary` é um alvo distinto: raio próprio 0 com recorte arredondado do ancestral causa dois cantos externos ao contorno a 200%; não há asserção desse alvo na suíte atual, e a matriz auxiliar completa não foi declarada integralmente verde.

Evidências sanitizadas: [geometria SSR](evidence/r3/environmental-landscape.json), Salvar [antes](evidence/r3/environmental-save-original.png)/[depois](evidence/r3/environmental-save-symmetric.png), Declividade [antes](evidence/r3/environmental-last-field-original.png)/[depois](evidence/r3/environmental-last-field-symmetric.png); handlers [GREEN](evidence/r3/handler-green.tap), [REDdraft](evidence/r3/handler-red-draft-guard.tap) e [REDPOST](evidence/r3/handler-red-post-guard.tap).

`npm run typecheck`: PASS local integral. `npm run lint`: exit0, somente os três warnings preexistentes em page/user-profile/white-box. `git diff --check`: PASS. Esses resultados auxiliares não substituem os gates oficiais.

Os recibos TAP sanitizam apenas o prefixo de caminho auxiliar e espaços finais; preservam testes, falhas, status e contagens.

## Regressão do candidato

O E2E conserva todos os viewports, texto 200%, toque, foco e checks de obstrução. Acrescenta o último campo e espera foco da revisão; a barreira causal fica no helper compartilhado. O cenário de draft confere GET/DELETE sob B → 403 com proof de A, recuperação A com mesmo ID/revisão e descarte autorizado → 204 após o replay. A confirmação POST foi parametrizada para cobrir tanto ausência de persistência inicial quanto persistência com resposta perdida, preservando chave/corpo/proof e mesmo ID no retorno a A. O caso anterior conserva B403, GETnull e A201; a nova variante exige primeiro201, B403, GET legítimo compartilhado com mesmoID e A200. O contador das fixtures exige uma única medição após o replay e nenhuma inserção sob B. A execução real permanece pendente do CI.

Os 15 gates e o Codex precisam ser conferidos no HEAD final. Não transportar o resultado de um parent ou checkpoint. Os recibos oficiais serão consolidados nesta Spec e na PR sem marcar tarefa apenas planejada como executada.

---

## Histórico preservado — preparação anterior à continuidade R3

> **Estado de publicação atualizado, 20/10/2026:** branch provisória `feat/frontend-environmental-drafts` publicada e empilhada sobre a fase6 em `e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`, sem merge/deploy. Este texto abaixo registra a preparação local histórica; a validação do HEAD da fase7, a reconciliação com eventuais mudanças da fase6 e a revisão Codex permanecem pendentes. CI será rastreado pelo SHA e run no PR. O antigo erro 403 de escrita foi resolvido selecionando a conexão GitHub do projeto.

# Evidências de implementação candidata

| Verificação | Resultado e alcance |
|---|---|
| Predicados R5 extraídos literalmente da base | RED: 4 testes, 2 PASS / 2 FAIL; exit1 |
| Precisão, protocolo de foco e retenção de incerteza | 25 PASS auxiliares |
| Parsers/células/conversões reais preservados | 10 PASS auxiliares |
| Suíte cumulativa fase7 | 74 PASS, incluindo os 39 da fase6; não somar novamente |
| Cinco E2E novos | Escritos, NOT_RUN |
| Pg/OCC/rollback/CI/browser | NOT_RUN nesta candidata |

Os 74 testes não substituem as suítes históricas integrais nem o CI oficial. O predicado corrigido preserva a incerteza no código, mas sua integração com React, rede e banco ainda exige os E2E reais preparados e a regressão vigente.

Checagens adicionais: typecheck estrito dos módulos puros e unitários, análise de sintaxe TS/TSX e consistência de patches. Não chamar essas verificações de Build/Typecheck/Lint oficiais. Logs auxiliares e manifesto ficam no pacote entregue no chat.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
