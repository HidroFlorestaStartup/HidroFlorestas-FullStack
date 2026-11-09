# Contrato de apresentação — Spec 026

## Entrada e fronteiras

Rota `/dashboard/laboratories/[laboratoryId]/map` com getLaboratoryContext servidor. Leitura `GET /api/laboratories/{laboratoryId}/territorial-map`, credenciais, cache:no-store e abort atuais. Status, DTO e autorização não mudam.

Leaflet continua dinâmico/cliente sem SSR. Configuração usa somente os nomes existentes NEXT_PUBLIC_MAP_TILE_URL e NEXT_PUBLIC_MAP_ATTRIBUTION.

## Saída e interações

| Superfície | Contrato |
|---|---|
| Cabeçalho | Laboratório, estado e contagem real |
| Mapa | Um marcador por área localizável, posição e seleção por ID |
| Lista | Todas as áreas, nome completo, localização/indisponibilidade, contagem real |
| Seleção | aria-pressed, aria-controls=selected-area-panel, anúncio Área selecionada |
| Painel | selected-area-panel/selected-area-title, área, coordenadas e coletas confirmadas |
| Destinos | /dashboard/laboratories/{lab}/areas/{area} e /collections/{collection} dentro da área |
| Erro/retry | Mensagem sanitizada e nova leitura real |
| Tiles | Aviso separado, atribuição e alternativa textual completa |
| Vazio/inativo | Estados explícitos, sem CTA de escrita no inativo |

Não há formulário, mutação, nova API, filtro ou exportação.

## Evidência

Fixtures sintéticas persistidas pelo harness oficial. Capturas `after-frontend-territorial-map-<estado>-viewport.png` e JSON correspondente em `.accounts-validation/frontend-territorial-map/`, sem trace/vídeo. JSON contém geometria, viewport, escala/rolagem e descrição de captura; sem PII ou credenciais. Prefixo opcional before serve somente à comparação explícita de baseline.
