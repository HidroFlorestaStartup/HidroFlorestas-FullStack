# Pesquisa e escolhas — Spec 026

As escolhas abaixo são decisões técnicas da implementação autorizada, apoiadas em `EVIDENCIA_IMPLEMENTACAO`; não constituem nova decisão científica/de produto.

## Projeção e composição

**Decisão**: manter DTO, guard, fetch no-store, abort/generation e identidade. Adaptar o cabeçalho/cartões do starter e `src/components/areas/areas.module.css` com nomes completos.
**Razão**: uma fonte real mantém autorização e lista/mapa equivalentes; o truncamento demonstrativo não deve perder informação.
**Alternativas consideradas**: query/provider/mock do starter ou tema global rejeitados por escopo e risco de regressão.

## SSR e motor

**Decisão**: preservar `next/dynamic` em Client Component com `ssr:false`, fronteira de erro e Marker com teclado/nome acessível.
**Razão**: Leaflet requer navegador; a documentação instalada em `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md` confirma o limite cliente. CSS Modules e composição servidor/cliente também foram consultados na versão 16.3.8.
**Alternativas consideradas**: CircleMarker demonstrativo, import no servidor e segundo motor rejeitados por perder comportamento existente ou ampliar escopo.

## Atribuição e controles

**Decisão**: estilos Leaflet somente sob contêiner local, alvos de zoom ampliados e atribuição com quebra de texto.
**Razão**: fonte e controles precisam permanecer legíveis em 320 px/texto ampliado, com lista sempre independente.
**Alternativas consideradas**: esconder atribuição/controles ou mudar provedor rejeitados.

## Evidência

**Decisão**: fixtures oficiais dashboard-history e endpoint real; interceptar somente atraso/falha de transporte. Reusar readControlGeometry/waitForMissionRender e acrescentar arquivador próprio.
**Razão**: captureMissionViewport restringe nomes a collections/environmental; não alterar contrato compartilhado nem fabricar sucesso.
**Alternativas consideradas**: demo isolada, screenshots fullPage, remover overlays ou contornar guard Windows rejeitados. E2E/15 gates executados pelo coordenador no ambiente oficial.

## Filtros/reset

**Decisão**: nenhum filtro novo, recenter em seleção ou persistência/reset novo.
**Razão**: Spec 008 FR-031 exclui filtros e a investigação histórica ampla fica após fase 10. O novo E2E prova troca de contexto, retorno e reload sem atribuir causa ao incidente antigo.
**Alternativas consideradas**: corrigir hipótese sem reprodução ou reabrir o domínio cartográfico rejeitados.

Não há esclarecimento de requisitos pendente. CI e aceite humano são gates de verificação ainda necessários.
