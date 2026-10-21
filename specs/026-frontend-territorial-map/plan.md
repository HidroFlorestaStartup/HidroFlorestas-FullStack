# Implementation Plan: apresentação do mapa territorial

**Branch**: `feat/frontend-territorial-map` | **Date**: 2026-10-21 | **Spec**: [spec.md](spec.md)

**Input**: `specs/026-frontend-territorial-map/spec.md`. Gerado após `setup-plan.sh --json` com diretório explícito; o campo BRANCH do script é o identificador da feature, não a branch Git efetiva.

## Summary

Adaptar cabeçalho, cartões, lista e estados à referência visual, usando CSS Module local. Preservar fetch/abort/generation, DTO, guard, wrapper cliente com `ssr:false`, Marker acessível, enquadramento e classificador de tiles. Acrescentar E2E real responsivo, de teclado, recuperação e navegação, com captura própria.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Node 24.19.0.

**Primary Dependencies**: Next 16.3.8, Leaflet 1.9.4, React-Leaflet 5.0.0 e Lucide existentes; nenhuma dependência nova.

**Storage**: nenhuma persistência nova; projeção real existente.

**Testing**: Node/tsx, TypeScript, ESLint, Playwright 1.55.1 e CI Windows oficial.

**Target Platform**: aplicação web autenticada; matriz Chromium e aceite humano próprio.

**Project Type**: Next App Router, incremento de apresentação.

**Performance Goals**: preservar leitura por ciclo e carregamento Leaflet somente cliente; sem polling ou consulta nova.

**Constraints**: não editar backend, schema, contratos, shell/CSS global, lockfile, CI ou vercel.json; sem produção, merge ou deploy.

**Scale/Scope**: uma rota, três componentes existentes, um CSS Module, E2E focal e Spec 026.

## Constitution Check

| Gate | Antes da pesquisa | Após desenho |
|---|---|---|
| Autoridade | C1/handoff/Spec 008 identificados | Starter limitado à apresentação |
| Ciência/domínio | Nenhuma mudança proposta | Sem score/camada/contrato |
| Segurança | Guard/DTO existentes | Abort/generation/minimização preservados |
| Incremento focal | Escritor/caminhos definidos | Sem dependência ou arquivo comum |
| Evidência | Plano verificável | Gates finais explícitos, sem PASS antecipado |
| Histórico | docs/raw imutável | Spec nova com rastreabilidade |

Gates conformes; nenhuma exceção. `.specify/extensions.yml` ausente: sem hooks locais adicionais.

## Phase 0 — pesquisa

Resultados em [research.md](research.md). Documentação instalada de Next consultada antes do código: lazy loading, CSS Modules e fronteira servidor/cliente. Comparados starter, aplicação, Spec 008 e helpers reais. Sem esclarecimento técnico pendente.

## Phase 1 — desenho

1. Reorganizar apresentação com cabeçalho contextual, cartão cartográfico, lista completa e painel da área; preservar responsabilidades de dados.
2. Aplicar CSS Module com `minmax(0, ...)`, quebra de texto, foco e controles locais de 44 px. Seletores Leaflet ficam subordinados à classe local; atribuição nunca é ocultada.
3. Preservar seleção, mensagens contratuais, ordem/destinos, enquadramento e descarte de resposta tardia. Não criar filtro, persistência ou reset novo.
4. Reusar fixtures e funções de geometria; arquivador específico porque helper compartilhado aceita somente frentes anteriores.
5. Matriz: 320×760, 375×900, 768×900, 1440×900, 320×760 a 200% de texto, 844×390 paisagem. Capturas reais `fullPage:false`.

Modelo/interfaces em [data-model.md](data-model.md) e [contracts/ui.md](contracts/ui.md); execução em [quickstart.md](quickstart.md).

## Phase 2 — implementação e validação

Especificar → planejar → tarefas → análise somente leitura → implementar → revisão/convergência → CI/review pelo coordenador. Rastreabilidade em `traceability.md`; recibo em `validation.md`. CI oficial, inspeção de screenshots e aceite humano ficam pendentes até execução real.

## Project Structure

| Caminho | Responsabilidade |
|---|---|
| src/components/territorial-map/territorial-map-view.tsx | Contexto, estados, lista e painel |
| src/components/territorial-map/territorial-map.tsx | Fronteira cliente/dinâmica e fallback |
| src/components/territorial-map/territorial-map.client.tsx | Leaflet/tiles/atribuição atuais |
| src/components/territorial-map/territorial-map.module.css | Apresentação local |
| tests/e2e/frontend-territorial-map.spec.ts | E2E real da frente |
| tests/e2e/support/frontend-territorial-map-evidence.ts | Capturas específicas |
| specs/026-frontend-territorial-map/** | Documentação e evidência |

**Structure Decision**: preservar arquitetura existente. A rota servidor e os arquivos comuns não requerem alteração.

## Complexity Tracking

Sem exceções ou abstrações de domínio novas. Helper específico evita alterar contrato compartilhado em paralelo.
