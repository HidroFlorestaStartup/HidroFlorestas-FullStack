# Modelo preservado — Spec 026

Nenhuma tabela, migration, campo persistido ou enum de domínio é criado.

| Entidade | Campos usados | Regra preservada |
|---|---|---|
| TerritorialMapResponse | context, areas | Uma resposta autorizada para mapa/lista/painel |
| LaboratoryContext | identidade, nome, readOnly | Guard servidor, sem ampliação de capacidade |
| TerritorialArea | id, name, location, confirmedCollections | Identidade estável; nulo não vira ponto fictício |
| TerritorialLocation | latitude, longitude | Ponto persistido; texto até seis casas |
| TerritorialCollection | id, occurredAt, confirmedAt | Somente confirmadas e destinos contextuais |

## Estado transitório

- data/loading/error: iniciar leitura limpa projeção anterior; somente geração vigente é aceita.
- selectedId: pertence à resposta atual, limpo por nova leitura; nenhuma gravação em URL/storage.
- generation/activeController: abortam leitura anterior e descartam resposta tardia/desmontagem.
- tileState: UNCONFIGURED/LOADING/AVAILABLE/DEGRADED/UNAVAILABLE; nunca altera áreas.
- Fronteira de erro cartográfico: fallback local preserva lista externa.

Fontes: `src/types/territorial-map.type.ts`, `territorial-map-state.ts`, serviço/rota existentes da Spec 008. Descrição da implementação observada; contratos canônicos continuam prevalecendo.
