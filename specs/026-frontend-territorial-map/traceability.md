# Rastreabilidade — Spec 026

**Data**: 2026-10-21. Estado da implementação local anterior à publicação; CI/review/screenshot devem apontar para o HEAD final em recibo externo.

| Requisito | Componente/tela | Caso de teste ou revisão | Evidência/estado |
|---|---|---|---|
| FR-001 | View, DTO e rota existentes | territorial-map-service, contracts, E2E territorial-map herdado | Unit PASS; E2E NOT_RUN local |
| FR-002 | Cabeçalho, cartões e CSS Module | Matriz frontend-territorial-map; comparação com areas.module.css/starter | Implementado; inspeção PNG pendente |
| FR-003 | AreaList, estado e marcadores | State/contracts unit; nomes longos e pontos coincidentes no E2E novo | Unit PASS; E2E NOT_RUN local |
| FR-004 | AreaPanel/Marker/AreaList | E2E seleciona marcador/lista por teclado e abre coleta real | Implementado; CI pendente |
| FR-005 | Botões/links/zoom/foco local | E2E Tab/Enter, aria-pressed, hit testing e alvo zoom ≥44 px | Implementado; CI/captura pendentes |
| FR-006 | CSS Module/grid/card/texto | Seis cenários: 320/375/768/1440, 200% e paisagem, overflow e última ação | Implementado; CI/captura pendentes |
| FR-007 | View loading/error/empty e avisos | E2E transporte interrompido/retry, vazio/inativo; contrato unit de localização nula | Unit PASS; E2E pendente |
| FR-008 | MapClient/MapBoundary/config existente | Tiles abortados no E2E; atribuição visível; classificador unit | Unit PASS; E2E pendente |
| FR-009 | Rota servidor/wrapper/fetch | Inspeção de guard/dynamic/abort/generation; E2E back/forward/reload | Fronteiras preservadas; CI pendente |
| FR-010 | Diff inteiro | Revisão sem backend/schema/contrato/dependência/filtro/motor novo | Conforme na revisão local |
| FR-011 | E2E/fixture oficial | Endpoint real, nome persistido, somente falha/atraso interceptado, cleanup zero | Implementado; execução oficial pendente |
| FR-012 | Helper específico | PNG viewport e JSON com geometria/texto/foco/scroll; trace/vídeo desligados | Arquivador implementado; capturas NOT_RUN local |

## Relação com o domínio existente

- Spec 008 FR-001–024: autorização, minimização, projeção e integridade da relação não são reimplementadas nem alteradas.
- Spec 008 FR-025–030: lista equivalente, teclado, estados, reflow e atribuição orientam a apresentação e a nova prova.
- Spec 008 FR-031–035: exclusão de filtros/camadas/ciência e neutralidade de provedor preservadas.
- CF-PRD-FR-013/014/015 e CF-UC-007/008/010/015: retorno aos registros existentes, sem nova geometria/contagem persistida.
- CF-PRD-NFR-001–006: guard e minimização preservados; prova automatizada de teclado/reflow adicionada, sem declarar aceite assistivo/humano.

## Revisão/convergência local

- Hooks: nenhuma inscrição local em `.specify/extensions.yml`.
- React: estado de domínio não duplicado; seleção derivada por ID; callbacks de leitura estáveis; abort/generation preservados; ícones decorativos ocultos da árvore acessível; Leaflet lazy no cliente.
- CSS: nenhum seletor global livre; estilos do Leaflet subordinados ao contêiner do mapa; nomes/coordenadas sem truncamento essencial; o shell não é alterado.
- Controles de 44 px: botões, links de ação e zoom. Marcadores preservam representação cartográfica e possuem a alternativa textual de alvo amplo; atribuição conserva a identificação exigida da fonte.
- Não foram acrescentados filtros, recenter, armazenamento de seleção, novas consultas, dependências ou interpretação de risco.
- Nenhum teste herdado foi removido ou teve assertion relaxada. A API e a rota servidor não mudaram.

Sem lacuna local material identificada após revisão. T016/T017 permanecem abertos e são a via para achados reais de CI/inspeção/revisão externa; nenhum gate é dispensado. A localização indisponível e o fallback de erro da biblioteca têm cobertura contratual/revisão preservada, sem fabricar resposta de sucesso no E2E.
