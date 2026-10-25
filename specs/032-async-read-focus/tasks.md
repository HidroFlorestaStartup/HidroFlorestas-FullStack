# Tasks: Foco nas leituras assíncronas

**Input**: spec, plan, research, data-model, contracts/read-focus e quickstart desta feature.
**Prerequisites**: analyze read-only concluído antes de código e checklist revisado explicitamente pelo coordenador.
**Tests**: regressões sintéticas necessárias ao defeito demonstrado; nenhum Next/DB/SMTP/serviço externo.

## Phase 1: Setup

- [x] T001 Instalar dependências do lock em af e ler guias Next locais; registrar baseline08262dc e guarda vercel do coordenador em specs/032-async-read-focus/implementation-evidence.md.

## Phase 2: Foundational

- [x] T002 Criar runner isolado em tests/ui/async-read-focus.config.ts e harness sintético próprio em tests/ui/async-read-focus.spec.ts, com shell/CSS reais e egress bloqueado (FR-007).
- [x] T003 Reproduzir RED de foco BODY em paginação e retries antes de alterar aplicação, usando tests/ui/async-read-focus.spec.ts e registrando resultado em specs/032-async-read-focus/implementation-evidence.md (FR-001,FR-002;SC-001).

## Phase 3: User Story 1 - Continuidade da consulta (P1)

**Goal**: alvo da própria consulta mantém foco antes/durante/depois da leitura explícita.
**Independent Test**: paginação ida/volta/refresh e retry; mesma identidade DOM/nome/outline nos estados sucesso/vazio/erro.

- [x] T004 [US1] Implementar helper puro guardado de foco síncrono em src/components/async-read-focus.ts, sem estado/listeners/callbacks tardios (FR-001,FR-003).
- [x] T005 [US1] Adicionar região/ref/tabIndex em todas as ramificações e handlers explícitos em src/components/dashboard/dashboard-summary.tsx e src/components/dashboard/dashboard-history.tsx, com outline local em src/components/dashboard/dashboard.module.css (FR-001,FR-002;SC-001).
- [x] T006 [US1] Nomear região persistente e ligar retry ao helper em src/components/territorial-map/territorial-map-view.tsx, com outline próprio em src/components/territorial-map/territorial-map.module.css (FR-001,FR-002;SC-001).
- [x] T007 [US1] Validar fast/delayed, erro repetido, vazio e cursores em tests/ui/async-read-focus.spec.ts, sem mudar clearData/guards (FR-002,FR-005;SC-001,SC-004).

## Phase 4: User Story 2 - Respeito à navegação posterior (P1)

**Goal**: nenhuma resposta disputa foco/contexto.
**Independent Test**: carga inicial, ação não focada, intenção posterior, contexto trocado e resposta antiga, com layout/texto ampliado e tiles bloqueados.

- [x] T008 [US2] Acrescentar/verificar regressões de no initialfocus, acionador não focado, usuário movendo foco, abort/unmount/context replacement e resposta tardia em tests/ui/async-read-focus.spec.ts (FR-003,FR-004,FR-005;SC-002,SC-004).
- [x] T009 [US2] Validar320/375/768/1440 com texto100/200%, geometria/foco/Tab e lista sem tiles em tests/ui/async-read-focus.spec.ts; manter CSS restrito aos dois módulos locais (FR-006;SC-003,SC-004).

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T010 Executar lint focal, typecheck e revisão dos três TSX com vercel:react-best-practices; registrar resultados/limites em specs/032-async-read-focus/implementation-evidence.md (FR-007).
- [x] T011 Conferir diff/referências/ownership, concluir implement e executar converge; registrar resultado em specs/032-async-read-focus/implementation-evidence.md e entregar sem commit para revisão independente.

## Dependencies & Execution Order

T001→T002→T003RED→T004→T005/T006→T007→T008/T009→T010→T011. T005/T006 tocam arquivos diferentes e poderiam ocorrer paralelamente após helper, mas serão aplicados sequencialmente pelo autor. Nenhum outro agente é escritor destes caminhos.

## Parallel Examples

US1: revisor independente pode examinar invariantes dos SECTIONs enquanto autor executa RED. US2: revisão read-only do isolamento e referências pode ocorrer em paralelo aos cenários de navegador, sem escrita concorrente. Um só worker de browser por runner.

## Implementation Strategy

MVP é continuidade US1, seguido de US2 antes da entrega. Foco é síncrono em região persistente; se geometria reprovar, reavaliar alvo heading dentro do mesmo mandato. Não mudar produto, shell ou dados para fazer testes passarem. Sem commit/push/PR pelo autor; vercel.json pertence ao coordenador.
