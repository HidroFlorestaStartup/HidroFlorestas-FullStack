# Tasks: 035 — navegação, conta e shell

Entrada: [spec](spec.md), [plan](plan.md), handoff #44 fixado em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Lista inicial de G0; implementar somente após detalhar arquivos reais. Testes são obrigatórios nesta missão.

## Preparação

- [x] T001 Conferir a branch existente e ancestralidade ao guard `07755822f5dc75fe2be1d924005d30ed99f64a0b`; registrar HEAD/base/ambiente em `specs/035-ajustes-navegacao-conta/implementation-evidence.md`.
- [x] T002 Completar o fluxo Spec Kit usando a reserva 035; registrar caminhos concretos, AGENTS aplicáveis e rastreabilidade Code-First em `specs/035-ajustes-navegacao-conta/plan.md` e detalhar as tarefas de código antes de executá-las.

## US1 — navegação contextual e conta

- [x] T003 [US1] Escrever testes focais de contexto/rotas/conta em `tests/unit/hf-ui035-navigation.test.ts` e cenários de jornada em `tests/e2e/hf-ui035-navigation.spec.ts`, ajustando ao harness existente e comprovando falhas prévias quando reproduzíveis.
- [x] T004 [US1] Implementar UI-01 apenas nos arquivos de shell/workspace/conta congelados no mapa de `plan.md`; preservar autorização e ações reais de senha/exclusão.

## US2 — mobile

- [x] T005 [US2] Ampliar `tests/e2e/hf-ui035-navigation.spec.ts` para safe-area, último controle, foco, histórico, reload e estados de sessão.
- [x] T006 [US2] Implementar UI-05 nos mesmos arquivos exclusivos e documentar contrato do shell para B/C em `plan.md`; encaminhar deltas compartilhados ao coordenador.

## US3 — comparação visual e validação

- [ ] T007 [US3] Comparar runtimes starter/FullStack em 320, 375/390, 768 e 1440 px; registrar capturas viewport e análise em `implementation-evidence.md`, sem copiar mocks/TanStack.
- [ ] T008 Executar testes focais e os quinze gates preservados de `scripts/rc-review-validation.ps1` em ambiente sintético autorizado; registrar resultados, falhas e NOT_RUN, sem atribuir PASS herdado.
- [x] T009 Atualizar `spec.md`, `plan.md`, `tasks.md` e `implementation-evidence.md`; publicar no PR Draft próprio com diff exclusivo/acumulado, revisão e pendências. Sem merge/deploy.

Não marcar implementação ou testes como feitos por esta preparação. Ações em arquivos compartilhados não são paralelizáveis sem ownership explícito.

## Status factual de execução

- T001–T002: documentação/refs conferidos; `development` G0 `9b8595d...`, GUARD_SHA `07755822...`, A G0 `55e00b...`; não se afirma inspeção da máquina do usuário ou CLI Spec Kit.
- T003–T006: arquivos de implementação e testes escritos nos commits descendentes de G0; **marcação de trabalho de autoria, não PASS do runner**. T005 contempla casos de viewport/safe-area/teclado e foco, cuja execução fica para CI.
- T007: pendente comparação executada bilateral starter/FullStack nos mesmos estados; não substituir screenshot histórica por screenshot de teste.
- T008: a execução G0 41216365650 teve FAIL IHFR, apesar de Build/Typecheck/Lint/E2E/HTTPS/Deletion PASS até aquela etapa. A execução final será examinada por run/SHA/tentativa.
- T009: pacote próprio de código, testes, specs e PR preparada/publicação; concluir somente após commit e atualização na PR, sem atribuir aceite humano ou CI verde.
