# Tasks: Iniciais dos membros no popup geral

**Input**: spec.md, plan.md, research.md, data-model.md, contracts/member-popup.md e quickstart.md desta feature.
**Prerequisites**: speckit-analyze após estas tarefas e antes de implementar; revisão do checklist UX pelo coordenador.
**Tests**: regressões sintéticas solicitadas pela missão e previstas na spec. Não usar serviço/banco/SMTP real.
**Organization**: tarefas por história; somente caminhos do plano podem mudar.

## Phase 1: Setup

- [x] T001 Instalar dependências do lock se ausentes e ler guias locais Next de Client Components/CSS em node_modules/next/dist/docs; registrar versões e estado inicial em specs/029-member-popup-initials/implementation-evidence.md.

## Phase 2: Foundational

- [x] T002 Conferir DTO público em src/types/laboratory.type.ts, invariantes de SettingsDialog em src/components/workspace/settings-dialog.tsx e ignores existentes; registrar ausência de alterações de rede/schema em specs/029-member-popup-initials/implementation-evidence.md (FR-006, SC-004).
- [x] T003 Criar runner sintético sem servidor/banco em tests/ui/member-popup.config.ts, restrito a member-popup.spec.ts e saída ignorada test-results/member-popup.

## Phase 3: User Story 1 - Consulta de membros (P1 / MVP)

**Goal**: nome e iniciais na mesma linha, com fallbacks e layout limitado.
**Independent Test**: navegador com dados sintéticos a 320px/1280px verifica acentos, duplicatas, vazios, nome longo, lista longa e zero chamadas adicionais.

- [x] T004 [US1] Escrever testes de apresentação, fallback, lista vazia/longa, nomes acentuados/repetidos e ausência de egress em tests/ui/member-popup.spec.ts; demonstrar falha por avatar ausente antes de alterar aplicação (FR-001, FR-002, FR-004, FR-006; SC-001, SC-002, SC-004).
- [x] T005 [US1] Renderizar iniciais recebidas com fallback e nome textual com fallback em src/components/workspace/laboratory-workspace.tsx (FR-001, FR-002; SC-001).
- [x] T006 [US1] Definir avatar circular neutro 36px e linha com quebra de nome longo sem truncamento em src/components/workspace/workspace.module.css; obter PASS dos cenários US1 (FR-004; SC-002).

## Phase 4: User Story 2 - Teclado e acesso (P2)

**Goal**: conservar semântica e foco do popup.
**Independent Test**: abrir por Enter, verificar lista e avatar oculto de tecnologia assistiva, ciclar Tab/Shift+Tab e fechar por Escape com foco devolvido.

- [x] T007 [US2] Incluir regressão de teclado/foco, semântica de lista e avatar decorativo em tests/ui/member-popup.spec.ts (FR-003, FR-005; SC-003).
- [x] T008 [US2] Confirmar avatar aria-hidden sem foco em src/components/workspace/laboratory-workspace.tsx e validar os controles existentes em src/components/workspace/settings-dialog.tsx sem alterar o contrato do dialog (FR-003, FR-005; SC-003).

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T009 Executar Playwright focal, node:test de contratos/serviço existentes, lint focal e typecheck proporcional conforme specs/029-member-popup-initials/quickstart.md; registrar falhas/PASS e limitações em specs/029-member-popup-initials/implementation-evidence.md.
- [x] T010 Conferir diff, referências, escopo e ausência de mudanças em dados/serviços/histórico, executar speckit-converge após implement e registrar resultado em specs/029-member-popup-initials/implementation-evidence.md; deixar delta sem commit para revisão independente.

## Dependencies & Execution Order

T001 → T002 → T003 → T004 (RED) → T005/T006 → US1 PASS → T007/T008 → T009 → T010. T007 pode ser escrita junto a T004 para demonstrar o contrato antes da correção; validação final exige ambas as histórias. Não há tarefas de domínio, API ou persistência.

## Parallel Examples

US1: após T003, revisão dos dados sintéticos em tests/ui/member-popup.spec.ts pode ocorrer com revisão somente leitura do DTO. T005 e T006 tocam arquivos diferentes, mas são aplicados sequencialmente pelo autor para validar o resultado conjunto.

US2: revisão independente de requisitos em checklists/ux.md pode ocorrer enquanto o autor prepara a execução; depois da implementação, revisão independente do delta ocorre junto à verificação documental. Nenhuma escrita concorrente nos mesmos arquivos.

## Implementation Strategy

MVP é US1; US2 conserva a jornada acessível já existente. A entrega termina somente após as duas histórias validadas e converge sem lacunas. Sem deploy, push, PR ou commit pelo autor antes de revisão. O checklist customizado é de qualidade dos requisitos e não é modificado por implement.
