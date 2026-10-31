# Tasks: 035 — navegação, conta e shell

Entrada: [spec](spec.md), [plan](plan.md), handoff #44 fixado em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Lista inicial de G0; implementar somente após detalhar arquivos reais. Testes são obrigatórios nesta missão.

## Preparação

- [ ] T001 Conferir a branch existente e ancestralidade ao guard `07755822f5dc75fe2be1d924005d30ed99f64a0b`; registrar HEAD/base/ambiente em `specs/035-ajustes-navegacao-conta/implementation-evidence.md`.
- [ ] T002 Completar o fluxo Spec Kit usando a reserva 035; registrar caminhos concretos, AGENTS aplicáveis e rastreabilidade Code-First em `specs/035-ajustes-navegacao-conta/plan.md` e detalhar as tarefas de código antes de executá-las.

## US1 — navegação contextual e conta

- [ ] T003 [US1] Escrever testes focais de contexto/rotas/conta em `tests/unit/hf-ui035-navigation.test.ts` e cenários de jornada em `tests/e2e/hf-ui035-navigation.spec.ts`, ajustando ao harness existente e comprovando falhas prévias quando reproduzíveis.
- [ ] T004 [US1] Implementar UI-01 apenas nos arquivos de shell/workspace/conta congelados no mapa de `plan.md`; preservar autorização e ações reais de senha/exclusão.

## US2 — mobile

- [ ] T005 [US2] Ampliar `tests/e2e/hf-ui035-navigation.spec.ts` para safe-area, último controle, foco, histórico, reload e estados de sessão.
- [ ] T006 [US2] Implementar UI-05 nos mesmos arquivos exclusivos e documentar contrato do shell para B/C em `plan.md`; encaminhar deltas compartilhados ao coordenador.

## US3 — comparação visual e validação

- [ ] T007 [US3] Comparar runtimes starter/FullStack em 320, 375/390, 768 e 1440 px; registrar capturas viewport e análise em `implementation-evidence.md`, sem copiar mocks/TanStack.
- [ ] T008 Executar testes focais e os quinze gates preservados de `scripts/rc-review-validation.ps1` em ambiente sintético autorizado; registrar resultados, falhas e NOT_RUN, sem atribuir PASS herdado.
- [ ] T009 Atualizar `spec.md`, `plan.md`, `tasks.md` e `implementation-evidence.md`; publicar no PR Draft próprio com diff exclusivo/acumulado, revisão e pendências. Sem merge/deploy.

Não marcar implementação ou testes como feitos por esta preparação. Ações em arquivos compartilhados não são paralelizáveis sem ownership explícito.
