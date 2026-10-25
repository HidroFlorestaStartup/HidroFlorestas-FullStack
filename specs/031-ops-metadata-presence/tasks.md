# Tasks: presença operacional offline

Input: [spec.md](spec.md), [plan.md](plan.md), research/data-model/contracts.
Testes explicitamente exigidos pelo mandato M05 e SC-001–003.

## Phase 1: Setup

- [x] T001 Identificar fontes e gerar spec/design em specs/031-ops-metadata-presence/.
- [x] T002 Gerar checklist de requisitos em specs/031-ops-metadata-presence/checklists/security.md.

## Phase 2: Foundational

- [x] T003 Analisar consistência spec/plan/tasks e obter revisão da checklist em specs/031-ops-metadata-presence/checklists/security.md.

## Phase 3: US1 — presença por target e branch

Independent test: vazio18 ausentes, completo18 presentes, branches/targets distintos.

- [x] T004 [US1] Criar e executar testes de presença em tests/operations/ops-metadata-presence.test.mjs antes do código (FR-001/002/004/006, SC-001/003).
- [x] T005 [US1] Implementar avaliação de inventário/escopo em scripts/ops-metadata-presence.mjs (FR-001/002/004/006).

## Phase 4: US2 — rejeição sanitizada

Independent test: canários recusados sem eco, limites/erros com exit1.

- [x] T006 [US2] Adicionar testes negativos de CLI/parser em tests/operations/ops-metadata-presence.test.mjs (FR-003/005, SC-002).
- [x] T007 [US2] Implementar whitelist/leitura limitada/CLI em scripts/ops-metadata-presence.mjs (FR-003/005/006).

## Phase 5: Polish & validação

- [x] T008 [P] Preparar snapshot sanitizado e runbook em docs/reports/2026-10-25-hf-night-01/ops/.
- [x] T009 Executar quickstart e revisão independente em specs/031-ops-metadata-presence/implementation-evidence.md.
- [x] T010 Avaliar convergência sem reescrever histórico em specs/031-ops-metadata-presence/tasks.md.

## Dependencies & Execution Order

T001→T002→T003; T004 antes T005; T006 antes T007. US2 usa a mesma implementação
e segue US1 sequencialmente. T008 pode avançar em paralelo a T004–007 por outro
autor; nenhum outro arquivo possui ownership concorrente. T009→T010 por último.
MVP US1 só é publicável junto da proteção US2. Sem deploy/demo hospedado.
