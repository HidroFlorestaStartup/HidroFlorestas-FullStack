# Validação reproduzível — Spec 026

## Pré-requisitos

Node 24.19.0, dependências do lockfile e Prisma gerado pelo fluxo existente. Para bancos/E2E, exclusivamente ambiente oficial Windows, PostgreSQL sintético e confirmações do repositório; não copiar credenciais reais nem contornar guards.

## Sem banco

```bash
node --import=tsx --test tests/unit/territorial-map-state.test.ts tests/unit/territorial-map-contracts.test.ts tests/unit/territorial-map-openapi-contract.test.ts tests/unit/territorial-map-service.test.ts
npm run typecheck
npx eslint src/components/territorial-map tests/e2e/frontend-territorial-map.spec.ts tests/e2e/support/frontend-territorial-map-evidence.ts
git diff --check
```

## Ambiente oficial

Coordenador prepara o ambiente conforme `.github/workflows/rc-review.yml` e executa os 15 gates. Investigação focal somente dentro desse ambiente preparado:

```bash
npx playwright test tests/e2e/territorial-map.spec.ts tests/e2e/frontend-territorial-map.spec.ts --project=chromium
```

## Percursos esperados

1. Abrir laboratório com 12 áreas, comparar DTO/lista/marcadores e selecionar por teclado; destino da área e coleta correto.
2. Em 320×760, 375×900, 768×900, 1440×900, 320×760 a 200% de texto e 844×390 paisagem, alcançar último item/ação. Verificar overflow e obstrução. Texto 200% não representa zoom nativo.
3. Bloquear tiles: aviso e atribuição preservados; lista/destinos completos.
4. Atrasar/falhar transporte, observar loading/erro e restaurar endpoint antes de retry.
5. Abrir vazio/inativo e navegar entre contextos/back/forward/reload, sem seleção ou registro cruzado.

## Inspeção e aceite

Abrir os PNGs reais de `.accounts-validation/frontend-territorial-map/` e conferir foco, header/nav e ação final com o JSON. Não mascarar controle nem remover overlay para alegar ausência de obstrução. Registrar CI/review do SHA final externamente após congelamento; commit documental posterior muda o HEAD.

Leitor de tela, equipamento físico e aceite humano permanecem não verificados. Falha parcial, CANCELLED, SKIP ou NOT_RUN nunca equivale a PASS.
