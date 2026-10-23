# Matriz dos nove incidentes

Missão `HF-INV-20261023-01-LOCAL01`. Esta matriz separa resultado executável de
atribuição causal histórica. `EVIDENCIA_IMPLEMENTACAO` refere-se aos ensaios
sintéticos identificados; nenhuma observação concede aceite humano ou científico.

| ID | Evidência anterior | Experimento atual | Estado causal e limite | Patch e próximo passo |
|---|---|---|---|---|
| NAV4-LOCAL | Quatro FAIL Linux/IMP006 em b1f83cf, permanecendo em/logout; sondas403/200 posteriores, sem capturar esses códigos nos quatro casos originais | [A](nav4/readme.md): sessão real, contraste A/B/A, controle externo recusado; originalNAV4 4/4 PASS no ingresso local; Back12/12 e reloads12/12 | `CAUSA_DE_AMBIENTE_OU_HARNESS_COMPROVADA` na reprodução atual. O fallback normalizado discrimina127.0.0.1/localhost; não reconstrói causalmente o Linux antigo. | Setup correto e instrução de uso; sem ampliar CSRF ou alterar produto. Preservar4FAIL históricos e a errata do reporter v4. |
| INV-001 | Seis FAIL e seis PASS no mesmo SHA/run39300023357, tentativas1/2; faltam DOM/contextos correlacionados | [B](ihfr/results.md): dois servidores/schemas novos,6/6 cada; controles separados2FAIL deliberados JS-off e2PASS | `NAO_REPRODUZIDO` no protocolo; causa histórica `INCONCLUSIVO`. Cache de build preservado, diferente de instalação inteiramente fria. | Sem patch de cálculo. Em nova falha natural, correlacionar sessão, documento, DOM visível, inicialização e servidor. |
| INV-002 | Duas chamadas receberam INTERNAL_ERROR, três40001 agregados; Spec022 cobriu outro schedule | B: baseline original1/1, dois espelhos com exatamente2chamadas; um conflito real/cada,1sucesso+RATE_LIMITED,9/36→10/40; regressão45/45 | `NAO_REPRODUZIDO` para a assinatura histórica; causa antiga `INCONCLUSIVO`. Conflito controlado atual é comprovado, não os três antigos. | Sem duplicar Spec022 ou mudar quotas/retries/OCC. Próxima falha deve preservar operação/fase, commit observado e contagens. |
| INV-003 | Navegação fase3 e reset cartográfico fase4, sem causa encerrada | [C](navigation/report.md):11 cenários originais de mapa/lista, teclado, seleção, atribuição, contexto e navegação PASS | `NAO_REPRODUZIDO`; histórico `INCONCLUSIVO`. Abort de tiles e503 são injeções sintéticas identificadas. | Sem patch especulativo; separar reset esperado por mudança de laboratório de falha de transporte no mesmo contexto. |
| INV-004 | Sincronização anterior passou a aguardar resposta de login; isso não demonstrou a causa antiga | A:3logins reais, incluindo resposta retida500ms; resposta antes da rota, sessão e destino comprovados | `NAO_REPRODUZIDO`; causa histórica `INCONCLUSIVO`. Latência injetada não é reconstrução daquele incidente. | Sem reduzir assertion5s ou mockar sucesso; preservar eventos e readiness em próxima falha natural. |
| INV-005 | Página404 real na candidata85e397bd/run39465856665; distinto de lookupAPI404 esperado | C:2jars independentes,2documentos200 e2lookupsAPI404; B:15documentos/dashboard200 e2lookupsAPI404 por rodada IHFR | `NAO_REPRODUZIDO` nos recortes atuais; causa histórica `INCONCLUSIVO`. Não somar resultados B e C como casos distintos. Recuperação histórica adicional e seus limites constam da revisão. | Nenhum404 atual de página foi ignorado. Preservar sequência de documento/API e sondas GET somente leitura. |
| NAV-SETTLE | Timeout antigo375px/texto200, sem causa demonstrada | C:3conclusões naturais públicas e2controles sintéticos de animações; A:caso autenticado375/200 do NAV4 original PASS | `NAO_REPRODUZIDO`; causa histórica `INCONCLUSIVO`. Servidor aquecido pela readiness; guard90s intacto. | Não atribuir logout ao timeout. Em recorrência, observar animações finitas/infinitas/canceladas e transição real. |
| OBS-001 | Aviso de hidratação/caret em coleta sem contraprova temporal completa | C:formulário real doc200/me200; helper altera caret e restaura valor; campo habilitado/focável após captura, zero warnings | `INCONCLUSIVO` quanto ao aviso antigo. Controle inicial ocorreu durante transição de fonte; não é A/B geométrico puro. | Sem alterar cursor global ou suprimir warnings. O efeito atual de instrumentação não prova a causa retrospectiva. |
| OBS-002 | Máscaras/indicador/enquadramento parcial em capturas | C:controles/hit tests e amostra real de4PNG mapa+2coleta inspecionados; D:amostra independente | `INCONCLUSIVO` para pixels ocultos/histórico e aceite humano; controles atuais favoráveis. Outros19PNG de mapa não inspecionados. | Sem reformulação visual. Dispositivo físico, zoom nativo e acessibilidade humana continuam fora da prova automatizada. |

Os oito FAILs de locator e os três FAILs de URL Back da sonda A/v3 permanecem
registrados. A correção da instrumentação foi validada em v5; v4 discriminou
Back no ingresso oficial. Não são onze defeitos de produto. C preserva seus
bloqueios de preparação e três/register500 introduzidos por arquivo espúrio do
diagnóstico, removido antes da nova rodada. A origem dessa contaminação é distinta
dos históricos. Nenhum desses negativos foi apagado ou convertido em PASS.

O IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
