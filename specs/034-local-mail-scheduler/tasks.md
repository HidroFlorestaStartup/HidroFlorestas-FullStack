# Tasks: ensaio local de agendamento de mail

Input: spec/plan/research/model/contrato. Testes exigidos por M05.

## Phase 1: Setup

- [x] T001 Gerar spec/design e resolver templates em specs/034-local-mail-scheduler/.
- [x] T002 Gerar checklist em specs/034-local-mail-scheduler/checklists/safety.md.

## Phase 2: Foundational

- [x] T003 Executar analyze e obter revisão dos cinco critérios em specs/034-local-mail-scheduler/checklists/safety.md.

## Phase 3: US1 — agendamento e backlog falso

Independent test: duas chamadas automáticas, pausa, retomada de três itens e pico1.

- [x] T004 [US1] Escrever teste RED com guard HTTP real em tests/investigations/mail/local-scheduler.test.mjs (FR-002/003,SC-001).
- [x] T005 [US1] Implementar substituto sequencial limitado em tests/investigations/mail/local-scheduler-harness.mjs (FR-001/002).

## Phase 4: US2 — negativas e contenção

Independent test: entradas externas recusadas, negativasHTTP sem callback/segredos,
servidor próprio e timers encerrados.

- [x] T006 [US2] Cobrir origem/guard/timeout/teto/teardown em tests/investigations/mail/local-scheduler.test.mjs (FR-001/003/004,SC-002/003).
- [x] T007 [US2] Validar pausas com chamada em voo e snapshot sanitizado em tests/investigations/mail/local-scheduler-harness.mjs (FR-002/004/005).

## Phase 5: Polish & validação

- [x] T008 Registrar comandos/contagens/limites e revisão independente em specs/034-local-mail-scheduler/implementation-evidence.md.
- [x] T009 Executar converge e fechar tasks em specs/034-local-mail-scheduler/tasks.md.

## Dependencies & Execution Order

T001→T002→T003→T004RED→T005→T006→T007→T008→T009. Nenhuma edição paralela
no mesmo arquivo; revisor pode examinar desenho independentemente. US1 é MVP,
negativasUS2 obrigatórias antes da publicação. Sem CI/deploy/job permanente.
