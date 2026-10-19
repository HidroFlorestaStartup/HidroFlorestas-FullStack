# Interaction contracts and consumer matrix
## Authority
Preservar specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml, specs/016-area-covers/contracts/images.md, src/app/api/server/images/contracts.ts e src/types/area.type.ts. Não flexibilizar paridade/OpenAPI para aparência.

## Consumers
| Consumidor | Dados/guardas | Estados e regressão |
|---|---|---|
| AreaList e rota areas | GETreal, contexto/keylab, projeção cover independente | loading/erro/retry/vazio/cards/destinos; semautoseleção |
| AreaForm e rota new | capacidade CREATE_AREA server, POSTreal | campos/reducer/mapa/revisão/submitlock/uncerto/cancelar |
| AreaMap/client/config | ponto/onSelect, Leaflet dynamic ssr:false, OSMatribuição | zero/extremos/clique/manual/geo; semmotor novo |
| DetalheSSR | requireAuth/service/notFound, opcionais existentes | linksRegistrarcoleta/readOnly/mapa; semnova lista/coleta |
| AreaCoverPreview na lista/editor | hasImage efeatureEnabled independentes; proxycontent/revision/retry | ausência/desligado/fallback/load; unoptimized/keys |
| AreaCoverEditor | GETreal CoverDto/capacidade contextual | selecionar/envio/progresso/confirmação/reconciliação/remover/recarregar |
| Shell e fluxos de coleta/ambientais/drafts/IHFR | fonte fase4, contexto/guards atuais | reflow/foco/scroll/histórico e15gates; semredesenho |

## featureEnabled × canEdit × image.hasImage
Todas as8 combinações são alcançáveis sob contrato; canEdittrue usa OWNER/ADMIN contextual ativo, canEditfalse usa MEMBER ou owner/readOnly. GlobalADMIN sozinho não altera capacidade.
| featureEnabled | canEdit | hasImage | Apresentação/ações |
|---|---|---|---|
|false|false|false|semcapa; semconteúdo/edição; recarga metadados permitida|
|false|false|true|existência preservada; indisponível; sembytes/edição|
|false|true|false|autorização contextual preservada; edição indisponível pela flag|
|false|true|true|capa existente preservada; semconteúdo/mutação pela flag|
|true|false|false|semcapa emleitura; semseleção/upload/remove|
|true|false|true|preview/fallback privado; recarga; semedição|
|true|true|false|seleção/envio; semremove; pode ter revisionpositiva|
|true|true|true|preview/substituição/upload/remove/recarga comOCC|
Não deduzir capacidade da flag ou existência. Sem requisição de bytes se !featureEnabled ou !hasImage. Recarga não concede acesso.

## Upload and Content
Somente JPEG/PNG/WebP, arquivo não vazio≤10MiB, lados≤4096. Validatebitmap local conserva validação server e remoção de metadados.
Initiate{expectedRevision,key}; tentativa/key vigentes reutilizadas após resposta incerta; confirm{} e provider metadata não são confiados ao cliente. EXPIRED reseta tentativa/chave para retry, preserva arquivo; STALE_REVISION mantémseleção/capa anterior e orientação de recarga; remoção explícita usa revisão atual.
CoverDto é obtido pelo endpoint real; fakes alteram somente transporte/flag/existência/revisão/bytes nos testes, canEdit permanece da capacidade real.
Retry de conteúdo usa revisão persistida + contador local não sensível; sucesso da visualização depende de onLoad da tentativa atual. Evento antigo e seleção posterior não podem concluir/alterar a tentativa atual. Confirmação persistida não vira falha deupload se somente preview falhar.
Falha de metadados e falha de conteúdo são recuperáveis e distintas. SemURL pública/CDN alternativa/provider real.

## Evidence
ViewportfullPage:false, altura900,375/768/1440 e320htmlfont200% (emulaçãoCSS, semzoom físico); Chromium/Playwright. Alvo/rolagem de conteúdo declarado; fotosde posição nativa separadas se necessárias. Campos preenchidos mascarados; semcookies/token/env/provas/senhas/traces. Fakes rotulados e APIs reais identificadas.

Resultado incerto + reload de metadados/conteúdo: retry conserva chave, ticket vigente e expectedRevision original. Resposta autoritativa EXPIRED/STALE_REVISION é tratada separadamente, preservando seleção para nova tentativa. onLoad anterior não troca mensagem após seleção ou início de envio atual. Esses candidatos serão demonstrados em RED antes de correção; não são novas garantias atribuídas a backend.
