# Inspeção visual oficial — fase7, candidato R3

## Proveniência e escopo

- Run `39461576673`, attempt1, job `118762102005`, artifact `12283507803`, proveniência conferida na API e no ZIP por agentes independentes.
- HEAD presente em todos os JSONs: `5ca520500298a2066f2072290998754a4a62d42e`.
- ZIP do artifact, 27.285.027 bytes; SHA-256 `a7eeae056a0bd2225a2044c2e11e06b23c4310abfa0c28595af927477c6dd11e`.
- Fonte dos24 pares: diretório `test-results/frontend-environmental-dra-34d55-ain-usable-at-each-viewport-chromium` dentro do artifact.
- Foram inspecionados visualmente os24 PNGs, sem montar, editar ou substituir imagens. Não houve alteração de repositório.

O CI deste candidato não foi integralmente verde: conforme o recibo sanitizado,9 gates PASS; E2E185PASS/1FAIL/1NOT_RUN, com falha no viewport de coleta e P1 de coleta não executado por serialização; os5 gates seguintes não foram executados. O fluxo ambiental passou, mas este parecer não converte o resultado parcial em aprovação do HEAD completo.

## Integridade dos24 pares de evidência

As quatro famílias `draft`, `last-field`, `form` e `review` existem nas seis combinações esperadas. Nomes, width/height dos JSONs e dimensões IHDR dos PNGs concordam em24/24. Todos registram o HEAD acima, `fullPage:false`, `physicalDevice:false`, `textScaleSource:scenario`, `scrollX:0` e `documentWidth` igual à largura do viewport. A fonte calculada é16px em100% e32px em200%, coerente com a escala declarada.

`activeTag` é INPUT nas capturas de rascunho/campo/formulário e H2 nas seis revisões, compatível com a preservação de foco enquanto o teste posiciona o alvo de leitura. Uma fotografia não demonstra por si só navegação de teclado ou toque.

## Observações visuais por cenário

| Viewport/escala | Salvar rascunho | Declividade | Revisar dados | Confirmar dados ambientais | Navegação/limites |
|---|---|---|---|---|---|
|320×900/100%|Botão inteiro e legível|Campo e rótulo inteiros; acima da barra|Botão inteiro e legível|Botão inteiro e legível|A máscara de campo cruza parcialmente a barra no quadro draft; nos outros ela é visível. Em last-field/form, header está fora e barra elevada, acompanhando scrollY106/287.|
|375×900/100%|Botão inteiro e legível|Campo e rótulo inteiros; acima da barra|Botão inteiro e legível|Botão inteiro e legível|Máscara cruza parcialmente a barra no draft. Em last-field/form, barra visível elevada e header fora, com scrollY122/287.|
|768×900/100%|Botão inteiro e legível|Campo e rótulo inteiros|Botão inteiro e legível|Botão inteiro e legível|Navegação lateral e ações de conta visíveis. last-field/form capturam o mesmo limite inferior de rolagem.|
|1440×900/100%|Botão inteiro e legível|Campo e rótulo inteiros|Botão inteiro e legível|Botão inteiro e legível|Navegação lateral e ações de conta visíveis; layout em duas colunas.|
|320×900/200%|Botão inteiro em duas linhas|Campo e rótulo inteiros; acima da barra|Botão inteiro e legível|Botão inteiro em três linhas|Barra visível nos quatro quadros; em form ela aparece elevada e o header sai do quadro, com scrollY217. “Recarregar rascunho” quebra dentro da palavra, sem sobreposição do alvo Salvar.|
|844×390/200%|Botão inteiro, abaixo do header|Campo inteiro, mas rótulo parcialmente acima do header|Botão inteiro, ao lado de Cancelar|Botão inteiro, abaixo do header|Navegação lateral e ações de conta visíveis nos quatro quadros. A captura de review concentra-se no botão de confirmar, não mostra todos os dados revisados.|

As oito capturas em200% foram priorizadas. Em844×390, o recorte superior que antes atingia Salvar/Declividade na reprodução com margem assimétrica não aparece sobre os controles-alvo oficiais. O rótulo de Declividade ainda pode estar fora do recorte quando o teste centraliza apenas o input; esta imagem comprova o campo acessível, não a apresentação simultânea de todo o bloco.

## Limites importantes da evidência

1. As máscaras rosa são sobreposições produzidas pelo screenshot do Playwright. Em draft320/375/100%, elas cobrem parte dos pixels da navegação inferior porque um campo subjacente ocupa essa região geométrica. Isso limita a inspeção visual da barra nesses dois quadros e não demonstra que o campo da aplicação esteja sobre a navegação. As outras capturas dos mesmos viewports permitem ver os links.
2. A barra móvel elevada e o header fora do quadro em capturas form/last-field são observações reais dos pixels e dos valores scrollY. Os alvos continuam visíveis e a navegação também; não há prova neste recorte de que o documento mantenha sempre a barra junto à borda inferior. Não foi executada uma nova interação para avaliar esse comportamento.
3. O indicador de desenvolvimento Next aparece no canto inferior esquerdo e em alguns quadros se sobrepõe parcialmente ao texto de Laboratórios. É uma característica do ambiente de captura; a imagem isolada não comprova a apresentação de produção.
4. Os valores dos controles são deliberadamente mascarados. Estas24 imagens não verificam sozinhas fidelidade numérica, idempotência, autorização ou persistência; tais propriedades pertencem às asserções de testes e à auditoria de CI.
5. Trata-se de emulação Chromium com mudança de fonte raiz, sem dispositivo físico, teclado virtual, leitor de tela ou aceite humano de acessibilidade. A revisão visual não equivale a homologação humana ou científica.

## Conclusão do recorte

As24 capturas sustentam a visibilidade dos quatro alvos específicos do fluxo ambiental nas seis combinações, com identificação consistente de viewport, escala e HEAD. Elas não sustentam uma declaração de todos os controles sempre visíveis, navegação inferior sempre ancorada ou aceite integral de acessibilidade. A fase6 continua sem capturas oficiais no artifact anterior; seu parecer separado registra essa ausência. A preservação durável e a resolução da falha herdada de coleta exigem novo HEAD/CI/artifact.
