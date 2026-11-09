# Inspeção frontend da CI oficial — pós-consolidação

## Resultado e alcance

`EVIDENCIA_IMPLEMENTACAO`: o journal oficial do candidato **`131ade347258c7820c7a89989ab851769197b486`** registra **15 gates PASS**. O log compacto de E2E registra **220 testes executados e 220 PASS**, com um worker; o gate IHFR registra **seis testes executados e seis PASS**. Esses resultados pertencem somente ao SHA indicado e não são transportados ao commit documental que acrescenta este relatório.

Os agentes reais abriram **54 arquivos PNG originais**, correspondentes a **53 conteúdos de imagem distintos**: `/root/frontend_ux` abriu 44 e `/root/operacao_vercel` abriu dez. São **52 telas do aplicativo e duas contraprovas sintéticas de helpers**, explicitamente separadas. Foram conferidas mecanicamente as **161 metadatas de viewport das seis famílias com esse formato**, além das **quatro geometrias completas de NAV4**. A amostra não representa inspeção visual de todas as 253 imagens dessas famílias, nem das demais famílias presentes no ZIP.

Há limitações visuais preservadas, incluindo fragmentação de palavras em alguns controles com texto ampliado, sobreposição do indicador Next dev e máscaras de screenshot sobre partes do enquadramento. **Não se declara ausência geral de problemas, conformidade integral de acessibilidade ou aceite humano.** Não foi demonstrado novo defeito material que justificasse patch de produto no alcance desta triagem. Não houve nova execução de suítes ou interação com a aplicação durante esta inspeção de artefatos.

## Proveniência da execução e recuperação documental

| Identidade | Valor verificado |
|---|---|
| Repositório | `HidroFlorestaStartup/HidroFlorestas-FullStack` |
| PR | [#27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27) |
| Candidato executado | `131ade347258c7820c7a89989ab851769197b486` |
| Run / tentativa | [39699435699](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39699435699), attempt 1 |
| Job | `119564787181` |
| Artifact | `12392364807` |
| ZIP | 26.854.109 bytes; 735 arquivos |
| SHA-256 do ZIP | `b4fe1d31a3f59d3c4c329d6099dfc95d887c9c09a8c4349119d86bd1e2c0225e` |
| Janela do journal | `2026-10-22T00:25:33.030Z` a `2026-10-22T00:45:47.901Z` |
| Ambiente de execução | Runner oficial Windows, Node 24.19.0, PostgreSQL 17 próprio em loopback e fixtures sintéticas |

O [recibo fechado](evidence/frontend-ci/ci-receipt.json) preserva os gates, as contagens, os hashes das fontes e os limites de atribuição. Logs brutos, variáveis de ambiente, configurações privadas, cookies e corpos de requisição não integram esse recibo. O fingerprint funcional do runner não é um SHA Git e permanece identificado como tal.

`FATO_DOCUMENTADO`: a inspeção visual acima ocorreu antes da reinicialização do executor. O último relatório local, corrigido e revisado, estava no commit `9eadc2e98ecc07bd792330643e2f6b4296d71f75`; a seleção foi criada em `1a30dc9d799daafd44ccdf7df887d017df05eaae`. Esses commits não chegaram à branch remota antes da perda do scratch. Em **2026-10-22**, a coordenação autorizou recuperar os arquivos a partir do mesmo artifact e dos registros preservados da execução.

Esta versão **reconstitui o relatório e as quatro projeções JSON, e refaz o manifesto**. Não alega identidade de bytes com os seis documentos gerados que se perderam. Seus hashes anteriores, obtidos do inventário de fechamento conservado pela coordenação, são registrados no manifesto para comparação. Os **54 PNGs e 50 JSONs originais** foram recuperados do artifact e comparados ao inventário anterior, por tamanho, SHA-256 e identidade de blob Git. Sua identidade de bytes é preservada; nenhuma imagem foi recortada, montada, retocada ou substituída.

Os 44 registros de inspeção frontend sobreviveram no store da execução com caminho e estado `opened:true`; a mensagem da revisão independente identifica os outros dez caminhos e observações. A recuperação não contou novas aberturas de imagens nem simulou nova inspeção. A revisão anterior de privacidade/integridade de `/root/backend_historicos`, comunicada após `9eadc2e`, também permanece um registro histórico; o delta de recuperação tem sua própria verificação focal.

### Plano e critérios da recuperação

O trabalho permanece subordinado ao [plano transversal](../../plans/active/pos-consolidacao-execucao-20261021.md). Estado inicial: branch exclusiva derivada de `131ade3`, sem alterações preexistentes. O recorte autorizado compreende este relatório e `evidence/frontend-ci/`; produto, testes, configuração, documentos históricos imutáveis, GitHub e e-mail ficam sob seus responsáveis originais.

As etapas foram: recuperar a seleção e o inventário anterior; conferir o ZIP e recuperar os 104 arquivos originais; regenerar somente projeções fechadas e manifesto; conferir hashes, JSONs, links, privacidade e escopo; entregar commit local à coordenação para revisão e publicação. Nenhuma suite funcional foi repetida para reconstruir arquivos. Aceite humano, decisão de merge e qualificação científica não são critérios que este trabalho documental possa satisfazer.

## Seleção proporcional e persistência

| Família | PNGs disponíveis no recorte | PNGs realmente abertos e preservados | Responsável pela inspeção |
|---|---:|---:|---|
| Navegação móvel NAV4 | 92 | 8 | Frontend |
| Mapa territorial | 23 | 10 | Frontend |
| Administração de usuários | 19 | 4 | Revisão independente |
| IHFR | 43 | 6 | Revisão independente |
| Dados ambientais e rascunhos | 27 | 7 | Frontend |
| Coletas — telas do aplicativo | 26 | 9 | Frontend |
| Coletas — contraprovas de helpers | 2 | 2 | Frontend |
| Landing pública | 21 | 8 | Frontend |
| **Total** | **253** | **54** | **44 frontend + 10 revisão** |

A seleção prioriza 320/375 px, texto 200%, paisagem, controles finais, foco, retorno de histórico, mapa com recuperação de transporte, confirmação administrativa, qualificadores IHFR e os estados ambientais/coletas. Também inclui exemplos de 768 e 1440 px. As dimensões específicas pertencem às capturas; não se presume que todos os fluxos foram visualmente examinados em todas as combinações.

O [manifesto](evidence/frontend-ci/manifest.json) identifica os arquivos, origem no artifact, hash, tamanho, dimensões, agente que abriu cada PNG e metadatas relacionadas. São 54 arquivos de imagem e 53 hashes de conteúdo distintos. O inventário por SHA-256 cobre as **253 imagens do recorte**, com 227 conteúdos distintos; imagens não selecionadas não são apresentadas como abertas nem como arquivos preservados no Git.

O Git preserva os 54 PNGs, as **46 metadatas originais correspondentes às imagens selecionadas fora de NAV4**, as **quatro geometrias NAV4 completas**, a projeção das 161 metadatas conferidas e os recibos. O manifesto contém 108 entradas de arquivos, sem incluir o próprio manifesto. A seleção permite consulta durável após a retenção de 14 dias do artifact, sem versionar todos os arquivos do ZIP.

## Integridade e geometria

`EVIDENCIA_IMPLEMENTACAO`: a [projeção de metadatas](evidence/frontend-ci/metadata-review.json) relaciona 161 registros das seis famílias com esse formato. Todos declaram o candidato correto, `fullPage:false`, `physicalDevice:false` e dimensões compatíveis com o IHDR dos respectivos PNGs. A largura do documento não excede a largura declarada do viewport. A ampliação é por fonte raiz: 16 px em 100% e 32 px em 200% nos registros correspondentes; não representa zoom nativo do navegador ou ajuste de acessibilidade em dispositivo físico.

As quatro geometrias NAV4 contêm **43 registros cada, totalizando 172**, incluindo **56 controles com `visible:true` e `hit:true`**. Esses campos medem os controles específicos no enquadramento registrado; não comprovam todos os pixels da navegação livres de overlays. Os arquivos NAV4 não possuem o mesmo formato de metadata das seis famílias acima, nem um campo HEAD próprio.

No mapa, os 21 controles medidos nas metadatas completas têm `fullyInViewport:true` e `unobstructed:true`, com nove pontos de hit-test por controle. Em coletas, o log conserva 12 medições do controle final: seis anteriores e seis posteriores ao único scroll do alvo. A [projeção de geometria de coletas](evidence/frontend-ci/collection-control-geometry.json) distingue esses estágios; não trata as seis medições anteriores fora do viewport como falhas finais do teste.

## Navegação, foco, Back/Forward e reload

O resultado diretamente disponível é **E2E 220 PASS**, registrado no log compacto. Esse log não contém um recibo nominal por caso com o nome de `frontend-mobile-navigation.spec.ts`. Por isso, este relatório não publica uma linha independente de “NAV4 4 PASS” como se houvesse um resultado nominal individual disponível.

A cadeia de evidência é: [configuração Playwright](../../../playwright.config.ts) inclui `tests/e2e`; a [spec original NAV4](../../../tests/e2e/frontend-mobile-navigation.spec.ts) define quatro combinações de 320/375 px e 100/200%; o runner oficial executa esse conjunto; o artifact do mesmo run contém as quatro geometrias completas e 92 capturas; o agregado encerra com 220 testes executados e 220 aprovados.

`INFERENCIA`: essa cadeia sustenta a conclusão de que os quatro cenários incluídos concluíram no contexto oficial, inclusive a assertion final de retorno a `/login`. Não equivale a ter um evento nominal individual, trace da resposta de logout ou screenshot da URL final. A identidade dos PNGs NAV4 vem do artifact/run e da configuração, não de um campo HEAD inexistente.

O [FAIL local anterior](frontend-ux.md#adendo--navegação-autenticada-e-contraprova-do-logout), **zero PASS e quatro FAIL** no contexto Linux/IMP006/porta 3000 sem ingresso explícito, continua preservado. **A contraprova com sondas posteriores sustenta a incompatibilidade do ingresso local; seus códigos HTTP 403/200 não foram capturados nos quatro FAIL originais.** A CI oficial usa o contexto de contas e o ingresso correspondente. Não foi apagado o primeiro FAIL nem repetida a suíte local para obter verde.

Os novos resultados não determinam retrospectivamente a causa de INV-003 ou do timeout histórico em `settleTransitions`. A versão atual filtra animações finitas em execução; a ausência de timeout nesta execução não demonstra a causa do histórico. As capturas selecionadas mostram controles expostos e conteúdo nos momentos registrados de foco, paisagem, destino e retorno de histórico. A verificação de interação pertence às asserções da execução original, e não a cliques novos desta inspeção documental.

As imagens também preservam o indicador de desenvolvimento Next. Em um frame de resumo ele se expande sobre parte de “Administração”; em outros aparece junto a “Laboratórios”. Isso limita a inspeção visual da barra, mesmo com as geometrias dos controles de conteúdo aprovadas. Não há evidência de dispositivo físico, teclado virtual ou leitor de tela.

## Mapa territorial e administração

Foram abertos dez PNGs originais do mapa, contemplando 320 px/texto 200%, 375, 768 e 1440 px/texto 100%, paisagem, foco na última área e na ação final, estado inativo e recuperação após erro de transporte. Os controles selecionados e a atribuição Leaflet/OpenStreetMap permanecem identificáveis nos enquadramentos examinados. O nome sintético longo de território quebra linha; esse token de teste não é uma palavra humana ordinária sujeita à regra específica de IHFR.

Os tiles são bloqueados deliberadamente pela fixture do teste. A superfície cinza é parte desse cenário sintético, não comprovação de falha do provedor real. As capturas de erro e recuperação mostram estados distintos do teste; não provam disponibilidade de um serviço externo em produção.

A revisão independente abriu quatro originais de administração: visão geral/copy, detalhe e diálogo em 320×900/200%, além do diálogo em 844×390/200%. Seus respectivos JSONs foram lidos. Os estados, papéis e controles de confirmação/cancelamento estão legíveis nos trechos selecionados, sem novo achado material P0–P2 demonstrado nessa amostra. O textarea do diálogo contém fixture sintética, coerente com a nota do helper sobre o diálogo nativo; não foi interpretado como dado real.

## IHFR e qualificações científicas

A revisão independente abriu seis PNGs originais de IHFR: início e fim dos qualificadores, proveniência e confirmação em 320 px/texto 200%, mais o fim dos qualificadores e ações de gestão em paisagem 667×375/200%. Foram lidas as seis metadatas correspondentes, com fonte raiz de 32 px, largura do documento igual ao viewport e `scrollX:0`.

As qualificações experimentais, ações e limites de aprovação permanecem legíveis nos trechos capturados. Proveniência e hashes quebram linha sem extrapolar a largura. A região longa exige rolagem: não se afirma que os quatro qualificadores estejam simultaneamente visíveis por inteiro em um único PNG. O título parcialmente mostrado no diálogo pertence a um enquadramento já rolado.

O resultado funcional IHFR de seis testes PASS é o do gate oficial, separado da amostra visual. Nenhuma dessas evidências altera os qualificadores **CONTRATO_EXPERIMENTAL**, **VALIDACAO_CIENTIFICA_PENDENTE**, **SUJEITO_A_RECALIBRACAO** e **NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO**. A [Spec 025](../../../specs/025-frontend-ihfr/spec.md) exige palavras humanas inteiras em seu FR-009; esse refinamento é específico desse recorte e não foi promovido silenciosamente a requisito universal de todas as telas.

## Dados ambientais, rascunhos e observações de apresentação

Os sete PNGs ambientais selecionados incluem rascunho, último campo e revisão em 320 px/texto 200%; revisão em paisagem 844×390/200%; formulário em 375×900/100%; rascunho desktop e confirmação. Os alvos essenciais estão disponíveis nos trechos registrados, com máscaras e limites de rolagem preservados.

**P3 / observação visual preservada:** em `18947fae877f-r0-n0-frontend-environmental-draft-320-900-200.png`, “Recarregar rascunho” quebra dentro de “Recarregar”. O [registro anterior da Spec 024](../../../specs/024-frontend-environmental-drafts/evidence/r3/first-candidate-visual-review.md) documenta explicitamente a mesma fragmentação em 320×900/200%, sem sobreposição do alvo Salvar. O coordenador também abriu a captura atual e confirmou a classificação focal como P3/observação conhecida.

O FR-011 e o SC-003 da [Spec 024](../../../specs/024-frontend-environmental-drafts/spec.md) exigem navegação/acessibilidade responsiva e controles essenciais utilizáveis sem obstrução. Não estabelecem a regra específica de palavras inteiras introduzida depois para IHFR. `INFERENCIA`: o `overflow-wrap:anywhere` e o espaço interno definidos no [CSS ambiental](../../../src/components/environmental-data/environmental.module.css) são compatíveis com a quebra observada. Não houve novo experimento de isolamento de CSS ou clique em 200% nesta inspeção; não se registra um defeito corrigido nem se propõe patch especulativo.

No formulário de 375 px, o header está fora do enquadramento e a navegação aparece elevada, com espaço abaixo. Em paisagem, trechos superiores podem ficar acima do header quando o controle-alvo é centralizado. Essas limitações visíveis não foram ocultadas. Máscaras rosa podem cruzar pixels da barra porque são sobreposições da captura; isso não prova, por si só, que o input da aplicação esteja sobre a navegação em uso real.

## Coletas e contraprovas dos helpers

Foram abertos nove PNGs de telas de coletas, incluindo formulário, revisão, detalhe anterior/posterior ao scroll, desktop e resultado incerto. As seis combinações instrumentadas no log colocam o alvo final dentro do viewport após o scroll, com nove pontos de hit-test positivos. O estágio anterior permanece registrado como anterior, mesmo quando o link ainda está fora do viewport.

**P3 / observações nesta amostra:** o detalhe em 320×900/200% fragmenta “ambientais” no link de dados ambientais. Sua geometria posterior registra o alvo inteiro de 222×176 px e nove pontos positivos. Na barra lateral de um enquadramento em paisagem/texto 200%, “Laboratórios” também fragmenta. A inspeção não demonstrou perda funcional desses alvos; o enquadramento e os overlays limitam a leitura de outras regiões. Para essas duas observações não se atribui um registro histórico específico não comprovado. A evidência histórica explícita citada acima refere-se à quebra em rascunhos.

Os outros dois PNGs selecionados nesta pasta são **contraprovas sintéticas de helpers**: `control-obstructed`, com obstrução deliberada, e `capture-order-before`, que preserva o estado anterior de uma caixa de teste. Seus JSONs declaram `synthetic-helper-counterproof`. Eles não são telas defeituosas do produto e não entram na contagem de 52 telas do aplicativo.

## Landing pública

Os oito PNGs oficiais selecionados cobrem o hero em 320 px/texto 200%, 375, 768 e 1440 px/texto 100%, foco do skip link e três enquadramentos do bloco IHFR em 320 px/texto 200%. A leitura dos quatro qualificadores depende desses quadros separados. Não se afirma que toda a landing esteja simultaneamente visível, nem que a seleção seja uma auditoria integral de acessibilidade.

Essa amostra oficial é distinta dos [sete casos públicos locais e suas 21 capturas](frontend-ux.md), já preservados. Não se somam os dois conjuntos como execuções nominalmente independentes de todos os mesmos cenários. Não surgiu novo defeito material demonstrado no subconjunto público examinado.

## Estado dos históricos e aceite humano

| Questão | Estado deste recorte | Limite |
|---|---|---|
| INV-003 / mapa e rotas | INCONCLUSIVE quanto à causa histórica | A execução atual e sua amostra não identificam retrospectivamente a causa antiga |
| Timeout histórico em `settleTransitions` | INCONCLUSIVE | Código atual e execução sem esse timeout não provam correção causal do histórico |
| Quatro FAIL locais de logout | FAIL preservado; contraprova posterior de ingresso | HTTP 403/200 são das sondas posteriores, não dos quatro FAIL originais |
| Navegação no conjunto oficial | Inferência sustentada pela cadeia do agregado | Não há recibo nominal individual NAV4 no log compacto |
| OBS-001 / caret e hidratação | NOT_RUN para contraprova focal específica | Agregado verde não substitui reprodução dirigida do comportamento histórico |
| OBS-002 / limites visuais | Observações preservadas | Não há aprovação universal de todas as regiões, escalas ou overlays |
| Zoom nativo, dispositivo físico e leitor de tela | NOT_RUN | Fonte raiz e Chromium emulado têm escopo próprio |
| Aceite humano de produto/acessibilidade/piloto | PENDENTE | Revisão por agente não substitui participante autorizado |
| Validação científica IHFR | PENDENTE | Contrato continua experimental |

## Verificação proporcional e encerramento

A recuperação conferiu os 104 arquivos originais contra o artifact e os hashes anteriores, os pares de dimensões PNG/metadata, as 161 projeções, as quatro geometrias NAV4, o inventário de 253 PNGs, os hashes do manifesto, o parse dos JSONs, os links locais e o diff documental. A verificação de privacidade restringe a saída aos campos necessários às provas; logs/configuração brutos não foram copiados. Os resultados dessas verificações aparecem nos recibos e no manifesto regenerados, com data de recuperação distinta da execução de CI.

Não foram iniciados servidor, navegador, banco ou suíte nesta recuperação. A fase anterior já havia encerrado seus processos próprios. Nenhuma mudança de código de produto, teste, timeout, retry ou guard foi feita por esta frente. O commit local é entregue à coordenação para revisão e publicação; não equivale a merge, deploy, homologação hospedada ou aprovação científica.

Fontes duráveis deste recorte: [recibo CI](evidence/frontend-ci/ci-receipt.json), [manifesto completo](evidence/frontend-ci/manifest.json), [projeção de metadatas](evidence/frontend-ci/metadata-review.json), [geometria de coletas](evidence/frontend-ci/collection-control-geometry.json), [registro da revisão independente](evidence/frontend-ci/independent-inspection.json) e [execuções locais anteriores](frontend-ux.md).
