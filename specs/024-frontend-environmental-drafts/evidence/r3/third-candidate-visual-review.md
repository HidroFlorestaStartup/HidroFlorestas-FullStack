# Fase 7 v3 — inspeção visual oficial

## Conclusão do recorte

As matrizes oficiais de coleta e ambiental estão completas: **48/48 pares da matriz**, mais cinco pares de fluxos. Os **42 quadros finais** mostram inteiro o controle alvo: 18 de coleta e 24 ambientais. Há ainda duas capturas sintéticas, separadas da aceitação visual do aplicativo.

Os logs desta candidata registram **15 gates PASS, 190 E2E PASS e seis IHFR PASS**. O recibo Codex do SHA exato terminou sem achados. Isso comprova o resultado observado nesta execução; não determina a causa do 404 histórico e não aprova antecipadamente o futuro HEAD documental.

## Proveniência

| Item | Valor |
| --- | --- |
| HEAD | `ec4b06e4b27059b1077904e0b67fde498c28b053` |
| Run / tentativa | `39472759694` / `1` |
| Job | `118800800378` |
| Artifact | `12288662735` |
| ZIP SHA-256 | `fc88413bfde9e5af9c43e08c1de11a4de59dd9eccce343b74d00ab3b45df843f` |
| ZIP / entradas | 20.691.926 bytes / 523 |
| Recibo Codex no SHA exato | `6297927596` — sem achados |
| Download, digest e extração | agente `ux_collections` |

O relatório leu os logs locais `e2e-1792520308833.log` e `ihfr-1792520929406.log`, além dos 15 registros de gates. O responsável pelo monitoramento fornece a proveniência externa completa e o fingerprint. Nenhum teste foi repetido nesta inspeção.

## Inventário e método de revisão

São **55 pares PNG/JSON duráveis**: 26 de aplicativo de coleta, 27 ambientais e dois sintéticos. Todos os HEADs, nomes seguros, namespaces, dimensões de PNG, escalas e tipos de evidência conferem. Todos registram `animations: allow`, `physicalDevice: false` e `fullPage: false`. Não há overflow horizontal registrado. As cópias permaneceram após os gates posteriores Deletion e Ihfr.

A comparação de SHA-256 mostrou que os 27 PNGs ambientais são idênticos aos da fase 7 v2 já inspecionados; 25 PNGs de aplicativo de coleta e os dois sintéticos são idênticos aos da fase 6 v3. O único arquivo diferente é o fluxo de formulário inicial de coleta, visto diretamente e sem novo desvio visual. Foram reabertos também os quatro quadros ambientais representativos em texto200. Assim, a revisão cobre 53 imagens de aplicativo com cinco aberturas diretas nesta rodada e 48 imagens por identidade exata com pixels previamente vistos, sem alegar uma nova abertura de todos os arquivos.

## Matriz ambiental

| Viewport / texto | Alvos finais | Limites observados |
| --- | --- | --- |
| 320×900 / 100% | Salvar, Declividade, Revisar e Confirmar completos | Máscara cruza a navegação no rascunho; formulário e último campo têm rolagem do documento, cabeçalho fora do viewport e navegação elevada com espaço branco inferior. |
| 375×900 / 100% | Os quatro alvos completos | Mesmas qualificações de máscara e deslocamento de navegação; revisão mantém o enquadramento normal. |
| 768×900 / 100% | Os quatro alvos completos | Cabeçalho e navegação lateral presentes; máscaras atravessam parte do cabeçalho. Último campo e formulário compartilham pixels por caberem no mesmo enquadramento. |
| 1440×900 / 100% | Os quatro alvos completos | Cabeçalho e navegação lateral presentes. Revisão distingue zeros de campos não informados. |
| 320×900 / 200% | Os quatro alvos completos | Declividade e seu rótulo acima da navegação. Formulário tem scrollY217, cabeçalho fora e navegação elevada; não normalizamos esse estado na evidência. |
| 844×390 / 200% | Os quatro alvos completos abaixo do cabeçalho | O campo Declividade inteiro está visível, mas parte de seu rótulo fica acima da borda do cabeçalho. Confirmação está inteira. |

A matriz de coleta é pixel a pixel equivalente à já inspecionada na fase 6 v3, exceto o fluxo inicial mencionado. Os seis detalhes “antes” estão carregados; os links finais ficam inteiros após o posicionamento. Máscara em parte da navegação móvel e indicador de desenvolvimento continuam limitando a comprovação desses pixels. “Antes” significa antes da rolagem na mesma execução, após readiness, e não antes de uma correção de produto.

## Fluxos e limites de inferência

O fluxo de erro mostra o campo requerido focado após abertura do grupo, com erro inline. A revisão distingue “Não” de “Não informado”. A captura de confirmado mostra o contexto superior e não todo o conjunto de medições. `false`, zero, null, ausência, texto parcial e precisão dependem dos asserts HTTP/PostgreSQL e dos testes de leitura, além das imagens.

A matriz de seis configurações cobre formulário, ações de rascunho, último campo e revisão. A leitura confirmada é exercitada separadamente por R2, API/reload e testes desktop/mobile; não há seis capturas de leitura confirmada. Não ampliar o texto de T015 além desse alcance.

Máscaras são intervenções de captura; quando cruzam navegação ou cabeçalho, não demonstram que um campo real os cobre nem que os pixels mascarados estão livres. O indicador Next sobre parte do primeiro item móvel permanece visível. Dispositivo real, teclado físico, leitor de tela, outros navegadores e aceite manual continuam fora desta comprovação.

`animations: allow` registra a política de captura. O término natural e a ordem de callbacks são demonstrados pelos testes temporais associados ao código, não por uma imagem estática isolada.

## Causa histórica preservada

A execução de `85e397`, run39465856665, continua registrada com 12 gates PASS, IHFR0/6 por seis navegações404 e dois gates NOT_RUN. Sua causa permanece **INCONCLUSIVA**. O sucesso dos seis IHFR em `ec4b06e` não comprova uma correção causal, flakiness, problema de cache, autorização ou cálculo científico.

Não há `IMP-006 browser diagnostic` no log IHFR atual. Os probes só executam após falha404, portanto esta execução verde não produziu observações `routeContext`. Não inferir respostas auth/API ou presença de contexto que não foram observadas.

## Quadros ambientais representativos para versionar

1. `frontend-environmental-last-field-320-900-200`: rótulo e campo final mascarado inteiros acima da navegação.
2. `frontend-environmental-review-844-390-200`: confirmação inteira abaixo do cabeçalho em paisagem.
3. `frontend-environmental-form-320-900-200`: revisão inteira, preservando a limitação visível de navegação elevada e espaço inferior.
4. `frontend-environmental-last-field-844-390-200`: campo final inteiro, com o limite explícito do rótulo parcialmente acima do cabeçalho.

Nomes completos e hashes de PNG e JSON estão em `phase7-v3-official-visual-summary.json`. `phase7-v3-viewport-metadata-audit.json` contém o inventário completo; `phase7-v3-reviewed-pixel-comparison.json` registra a identidade por imagem e a fonte previamente revisada. Todos são sanitizados e não dependem de paths absolutos. O integrador é responsável por copiar pixels ou documentos para o repositório.

O fechamento técnico do futuro SHA documental ainda requer seus próprios 15 gates e Codex no recibo externo da PR #19. Nenhum aceite humano ou científico foi concedido por este parecer.
