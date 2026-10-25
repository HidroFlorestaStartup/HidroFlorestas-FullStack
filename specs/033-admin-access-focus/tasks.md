# Tasks: foco após perda de acesso administrativo

Input: [spec.md](spec.md), [plan.md](plan.md), pesquisa/modelo/contrato UI.
Testes exigidos explicitamente pelo mandato M04/M07 e pela spec.

## Phase 1: Setup

- [x] T001 Registrar baseline/fontes/bootstrap e gerar spec em specs/033-admin-access-focus/spec.md.
- [x] T002 Executar plan/checklist/tasks locais e produzir design em specs/033-admin-access-focus/.

## Phase 2: Foundational

- [x] T003 Analisar consistência e obter gate root em specs/033-admin-access-focus/checklists/focus.md antes de código/testes.

## Phase 3: US1 — foco da indisponibilidade

Independent test: componente real com commit controlado e rAF nativo; seis pares status/leitura e mensagem repetida focam alerta correto sem dados anteriores.

- [x] T004 [US1] Criar harness/config em tests/ui/admin-access-focus.spec.ts e tests/ui/admin-access-focus.config.ts; provar comportamento RED no baseline se possível e registrar timing/ref/commit antes da correção (FR-001/004/006, SC-001/003).
- [x] T005 [US1] Implementar entrega de foco vinculada à ocorrência atual após materialização em src/components/user-administration/user-administration-page.tsx, preservando texto e limpeza (FR-001/002/004).

## Phase 4: US2 — descarte sem foco tardio

Independent test: conta superada, segunda leitura cancelada, re-renderização alheia e desmontagem não restauram dados nem foco antigo.

- [x] T006 [US2] Acrescentar cenários de duas leituras concorrentes, descarte, texto repetido, diálogo, interação posterior e desmontagem em tests/ui/admin-access-focus.spec.ts (FR-002/003/005, SC-002).
- [x] T007 [US2] Conferir ciclo de vida/cancelamento no componente real src/components/user-administration/user-administration-page.tsx sem modificar guards ou APIs (FR-003/005).

## Phase 5: Polish e validação

- [x] T008 Executar quickstart/typecheck/lint/testes pertinentes, registrar comandos/saídas e limites em specs/033-admin-access-focus/implementation-evidence.md (FR-006, SC-001/002/003).
- [x] T009 Obter revisão independente root/A do delta e registrar achados/tratamentos em specs/033-admin-access-focus/implementation-evidence.md.
- [x] T010 Executar speckit-converge sobre artefatos/código atuais e registrar resultado em specs/033-admin-access-focus/implementation-evidence.md; gaps viram tarefas append-only.

## Dependencies & Execution Order

T001→T002→T003→T004 antes de T005; T006→T007 depois da prova inicial. T008→T009→T010 ao final. Mesmo arquivo de teste compartilhado: execução sequencial, sem spawns novos. US1 é o MVP; US2 precisa validar a ausência de regressões antes da entrega. Não há oportunidade paralela segura de edição; leitura independente pelo revisor pode avançar sem autoria concorrente.

## Implementation Strategy

Investigar no componente real antes de selecionar mecanismo; manter todos os resultados negativos. Entregar somente o menor patch demonstrado. Sem deploy/demo, commit/push/PR pelo autor. Coordenador controla guardas/publicação posterior.
