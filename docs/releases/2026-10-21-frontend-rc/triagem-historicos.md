# Triagem dos históricos programados

Data: 2026-10-21. Fonte: `investigacoes-pos-consolidacao-visual.md` no [handoff de Pedro, HEAD e057105](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/e057105f4532b28662249735608e869e3814ef8c/docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md).

`FATO_DOCUMENTADO`: Pedro programou a investigação ampla após conclusão **e aceite** da fase 10/consolidação. Este documento executa a triagem C2 e define o recorte posterior; não presume que o aceite humano já ocorreu. Uma falha material atual da candidata deve ser investigada agora, mesmo antes desse gatilho.

## Critério de prioridade

`RECOMENDACAO`: P1 para perda/exposição de dados, autorização indevida ou indisponibilidade atual de jornada essencial; P2 para falha de confiabilidade/reflow comprovada ou hipótese histórica relevante à RC; P3 para observação sem impacto demonstrado. A tabela abaixo prioriza a investigação e não diagnostica uma causa.

| Item | Evidência histórica | Estado e prioridade de triagem | Reprodução/evidência necessária | Efeito sobre a RC |
|---|---|---|---|---|
| INV-001 | Seis FAILs IHFR no [run 39300023357](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357), tentativa 1; tentativa 2 do mesmo head passou. [PR #15](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/15), [recibo #16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#issuecomment-6280516630) | Causa inconclusiva; P2; aguardando gatilho da investigação ampla | Recuperar head/attempt/log; isolar startup, sessão/contexto, navegação e servidor no runner sintético, preservando probes | Qualquer FAIL atual do gate Ihfr impede fechamento técnico; novo PASS não encerra a causa antiga |
| INV-002 | Corrida histórica de capa com duas chamadas; Spec022 corrigiu outro schedule de quatro operações/três ondas. [PR #16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16) | Causa histórica não atribuída; P2, elevar se houver violação atual de quota/integridade | Reproduzir exatamente duas chamadas concorrentes; conferir autorização, revisão, idempotência, quota, três tentativas e consulta final | Não alterar limites/retries nem transportar causalidade da Spec022; defeito atual precisa de correção focal |
| INV-003 | Navegação da fase3 [#12](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12) e reset cartográfico na fase4 [#14](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14) | Causas não comprovadas; P2 | Separar navegação HTTP, sessão, resposta da API e falha de tiles; manter lista alternativa e recuperar logs originais | Testes atuais de mapa/lista/nav obrigatórios; defeitos móveis corrigidos não explicam automaticamente o reset |
| INV-004 | Incidente de conta; sincronização passou a aguardar resposta real do login e manteve URL 5s. [Recibo #18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6298927257) | Causa original inconclusiva; P2 | Correlacionar resposta de login, cookie/sessão e navegação sem reduzir assertion; controlar latência no harness pertinente | Falha atual de conta bloqueia o gate; mudança de sincronização não fecha diagnóstico histórico |
| INV-005 | Página 404 na candidata `85e397bd`, [run 39465856665](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39465856665); final `9e11eca` teve 15 navegações IHFR 200 e zero página 404 segundo [recibo #19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6299163273) | Causa inconclusiva; P2 | Distinguir navegação de página de lookup API 404 esperado; manter probe pós-falha somente leitura, jars isolados e guards sintéticos | Não ignorar página 404 atual; não chamar lookup esperado de falha de navegação |
| OBS-001 | Divergência de hidratação/caret em captura de coleta; associação ao Playwright sem contraprova temporal A/B | Hipótese de instrumentação; P3 | Comparar o mesmo cenário antes/durante/depois da captura, sem suprimir warnings, mudar cursor global ou fabricar página | Warning isolado não prova defeito geral; impacto funcional reproduzido deve ser tratado |
| OBS-002 | Máscaras/indicador Next e enquadramento parcial em paisagem nos recibos #18/#19 | Observação geométrica; P2 se ação obstruída, P3 se apenas limite da captura | Viewport real, foco, rolagem e hit tests em 320/375/768/1440, texto 200% e paisagem; abrir PNG e confrontar geometria | Obstrução atual de ação bloqueia aceite da frente; máscara ou frame parcial não basta para afirmar defeito/ausência |

## Estado de execução

- Triagem C2 e critérios: executados nesta rodada por leitura das fontes; causas históricas continuam nos estados registrados acima.
- Investigação ampla: `AGENDADO_APOS_FASE_10_E_CONSOLIDACAO_VISUAL`, conforme fonte; aceite/gatilho ainda não comprovado neste commit.
- Correções atuais da administração pertencem à Spec027 e não são atribuídas retrospectivamente a INV-001–005.
- Execuções oficiais da candidata, se concluídas após este commit, devem constar nos recibos das PRs com SHA, run, attempt, job e journal. Não reescrever os recibos antigos.
- A execução C2–C4 foi autorizada pelo usuário nesta conversa; não reabrir essa autorização. O aceite humano que dispara a investigação ampla e eventual encerramento inconclusivo continuam sem registro. A coordenação mantém a priorização dos recortes, sem inventar responsável ou parecer humano.

## Inventário dos runs históricos recuperados

`EVIDENCIA_IMPLEMENTACAO`: o coordenador releu os logs completos dos três jobs abaixo e seus metadados de artefato por API nesta sessão de 21/10/2026. A associação entre tentativa e artefato foi confirmada pelos registros de upload dos próprios jobs, não somente por timestamps. Não houve rerun histórico.

| Item / run | HEAD | Tentativa / job | Resultado registrado |
|---|---|---|---|
| INV-001 / [39300023357](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357) | `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2` | 1 / `118222466717` | 12 gates PASS; Ihfr FAIL, seis casos; Bootstrap e SchemaAudit NOT_RUN |
| INV-001 / mesmo run | Mesmo HEAD | 2 / `118232460151` | 15 gates PASS; seis casos IHFR aprovados |
| INV-005 / [39465856665](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39465856665) | `85e397bd4271ab07a197ea88db652227e6e392ce` | 1 / `118776943818` | 12 gates PASS; Ihfr FAIL, seis casos; Bootstrap e SchemaAudit NOT_RUN |

As duas tentativas de INV-001 registram o mesmo snapshot `2cb2e33ec7ac72e97b1ab695353375a3d5ea501135355a7c7459ca19798d902d`. O PASS da segunda tentativa não demonstra a causa das seis falhas da primeira.

| Tentativa | Artefato | Tamanho informado, bytes | Digest SHA-256 informado pelo GitHub |
|---|---|---:|---|
| INV-001 / 1 | `12212173104` | 17.714.543 | `9f13f31eb53c7aae476e3e77246c988c142f742c4b20aa671b601350f0154fde` |
| INV-001 / 2 | `12213157147` | 17.712.513 | `aace111409eabf2e11352d2aaed8801edee40d602c8a53efe215a8f55214d008` |
| INV-005 / 1 | `12287280647` | 20.601.581 | `c8f87eb327d5bd3a8c7235fdc84a3ef60ab01dfd7fa42bb0cf62ce4468a41e6e` |

Os três artefatos estavam com `expired:false` no momento da consulta. Após o inventário por API, a auditoria baixou os três ZIPs e conferiu tamanho e SHA-256 contra os metadados oficiais, CRC integral, segurança dos caminhos e ausência de symlinks. Foram encontrados 411, 413 e 519 membros, respectivamente nas tentativas 1 e 2 de INV-001 e na tentativa 1 de INV-005. Essa verificação comprova a integridade dos arquivos recuperados; as causas históricas permanecem indeterminadas e nenhum rerun foi executado.

### Pacote histórico preservado

O pacote durável `HidroFloresta-historicos-recibos-2026-10-21.zip` tem **144.766 bytes e 51 membros**, com SHA-256 `f43a49d589fd6c9db7e15de573b8c7f86e39361105273fc096a2a125579f59fb`. Preserva **41 logs e três journals `results.jsonl`**, byte a byte, além de manifestos e recibos de proveniência/verificação. CRC integral e hashes por membro foram conferidos. Foram excluídos 924 PNGs e 375 JSONs de evidência visual; o pacote não contém imagens, traces nem arquivos fonte do repositório.

A preservação mantém separados o FAIL da tentativa 1 e o PASS da tentativa 2 de INV-001. Não houve reprodução dos históricos nem inferência de causa; nenhum resultado histórico aprova o HEAD atual, a publicação ou a homologação C4.

## Evidências atuais separadas dos incidentes históricos

`EVIDENCIA_IMPLEMENTACAO`: os reparos e diagnósticos desta RC são registrados no [recibo agregado](regressao-agregada.md) e nos recibos das PRs, preservando os runs FAIL.

- **Regressão agregada 499e669:** o [run oficial 39596248875](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39596248875), job `119209168491`, concluiu 15/15 gates PASS, todos com exit 0; E2E teve 220 casos aprovados. Snapshot `b834c0597881ca7d61e55cc7f75dbf8b0944bc8c4b3bf5671794e517c0f6e8bc`. Artefato `12345316833`, 26.858.666 bytes e 735 membros, SHA-256 `09269b87e8acad367e7c5ac1a57851d6ad00604cadbb9a39fe2de2573ee535a3`: tamanho/digest oficial, CRC, caminhos e ausência de symlinks conferidos. O resultado pertence exclusivamente a `499e669d4afe0d79a0fd0fdc73f687917c7d3f6d`; a inspeção visual agregada segue em curso. A futura composição com a guarda de development e os documentos C4 permanece **CI NOT_RUN** até seu próprio run, e esse verde não demonstra a causa das falhas históricas.

- **Mapa / OBS-002:** o HEAD `9a2b7d451f3523e8efe3130da28c8b12c94f2cce` teve [15 gates PASS no run 39593274910](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39593274910) e [Codex concluído sem achados](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22#issuecomment-6314986128). O ZIP `12342974042`, SHA-256 `f99727023b6c4aeb1d7244f2057c920e4b49d17bb9d67718c16cd765dc9ef02f`, contém 23 PNGs e 23 metadados. Oito imagens novas/diferentes foram abertas; 15 são byte-idênticas às já inspecionadas do parent. As 21 medições de controles confirmam alvo >=44px, foco, viewport e hit tests; nenhum P1/P2 visual foi identificado nesse recorte. Texto 200% usa fonte raiz 32px, não zoom nativo, e não constitui aceite humano ou diagnóstico do reset histórico INV-003.
- **R2 ambiental:** a [sonda 39594318571](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39594318571) observou a passagem de um DD oculto fora da aplicação para dois matches globais e depois um único DD visível. O reparo aplicado em `499e669d4afe0d79a0fd0fdc73f687917c7d3f6d` amostra count global, visibilidade e texto exato atomicamente, preservando 5s e todas as provas de persistência. A evidência demonstra essa sobreposição transitória na sonda; não encerra INV-004/005 nem reconstitui retrospectivamente a causa de outros runs.
- **Navegação herdada:** a causa do FAIL de `settleTransitions` em 375px/texto200 permanece **INDETERMINADA**. Três sondas não reproduziram o bloqueio. A [terceira, run 39596425174](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39596425174), preservou os nove gates anteriores e executou o E2E completo observado do produto 9deff: navegação e R2 passaram, mas persistiu o FAIL já conhecido do alerta do mapa. Essa sonda não equivale a 15 gates e não demonstra uma correção da navegação. Vincular a regressão e as revalidações controladas ao recibo agregado, sem transportar causalidade para INV-003.

`RECOMENDACAO`: recuperar head/run/tentativa/log originais e registrar inventário disponível/indisponível já pode ser feito por leitura no chat. A reprodução ampla dos históricos conserva o gatilho de conclusão e aceite da fase 10; falhas materiais da candidata são tratadas agora em recortes sintéticos proporcionais. Novo verde não encerra investigação histórica, e qualquer mudança de produto exige causa demonstrada e regressão preservada.

## Regra de encerramento por item

Registrar causa demonstrada e regressão proporcional, ou `INCONCLUSIVO`/`NAO_REPRODUZIDO` com limites explícitos e decisão do mantenedor. Preservar falhas, contratos, assertions, guards e timeouts pertinentes. Não adicionar retries para transformar intermitência em verde. Não operar banco, e-mail ou provedor real para reproduzir esses históricos.


## Atualização vigente — integração verificada e continuação pós-consolidação — 21/10/2026

DECISAO_CONFIRMADA: pedido atual de Pedro nesta conversa autoriza integrar20, conferir brevemente os merges recentes e preparar próximas duas etapas, incluindo correções necessárias.

EVIDENCIA_IMPLEMENTACAO: #20 integrado em b1f83cfa8e52dd25c6246c584a576553c5e9e131, sem autoaprovação. #19 e frentes21–24 já constam integradas; a RC25 e44711d foi incorporada por5f6266b com árvore idêntica à candidata validada. Os heads21–24 são ancestrais da RC. Após20, apenas dez diferenças documentais; produto/testes/configuração equivalentes à RC. Development remotab1f83cf, mainremotabeba96f; máquina local não verificada.

Logs do run39600889091/tentativa1/job119224780858 conferidos:15gates únicos PASS/exit0, E2E220, Integration231, HTTPS2 e IHFR6; resposta Codex do head sem achados. Checagem breve de integração, sem nova suíte local, nova auditoria completa ou aceite humano/científico. Não foi encontrado bloqueio técnico novo nesse escopo.

RECOMENDACAO materializada no novo prompt: A—investigação/correções de defeitos demonstrados; B—homologação/preparação da entrega. As dez fases visuais têm implementação integrada; não há novas fases visuais11/12. Históricos inconclusivos continuam sem encerramento causal. O relatório25 registra403Vercel e aceites humanos/operacionais pendentes; o provedor não foi reconsultado nesta preparação. A autorização operacional relatada na RC deve ter origem/escopo comprovados no contexto que a executar, sem reabrir consentimento de rotina já comprovado nem fabricar autoridade.

O handoff prepara execução técnica posterior à consolidação e não declara aceite humano da copy/produto/acessibilidade. Não houve deploy solicitado, alteração de main, banco/provedor real ou comunicação a participantes nesta preparação. Merges futuros ficam com o mantenedor; texto anterior preservado como histórico.

Próxima execução: [prompt pós-consolidação](prompt-pos-consolidacao.md) e [recibo da conferência](verificacao-integracao-e-handoff-pos-consolidacao.json).

## Adendo factual — HF-INV local — 2026-10-23

`EVIDENCIA_IMPLEMENTACAO`: a [matriz investigativa atual](../2026-10-23-hf-inv-local01/incident-matrix.md)
registra experimentos dos nove IDs sobre c4adfb3, controles negativos, fontes
executadas e limites. NAV4 tem jornada autenticada e4/4PASS no ingresso local;
isso não apaga quatro FAILs anteriores. Duas rodadas IHFR6/6, dois schedules
de duas chamadas, regressão45/45 e13casos autenticados de mapa/coleta distinguem
prova atual de causalidade histórica. Não somar repetições/subconjuntos.

A [recuperação INV-005](../2026-10-23-hf-inv-local01/review/inv005-historical.json)
confirma seis404 originais de documento em duas famílias de rota; não são os
404 esperados de lookupAPI. As contraprovas atuais abrangem esses seis cenários,
sem demonstrar sua causa antiga. OBS/hidratação e pixels ocultos conservam os
limites descritos na matriz; nenhum aceite humano ou científico foi concedido.

O [relatório estático da candidata](../2026-10-23-hf-inv-local01/final-report.md)
e o recibo posterior da PR separam testes locais, CI/review por SHA e decisão
do mantenedor. Nenhum texto histórico acima foi apagado ou promovido a PASS.
