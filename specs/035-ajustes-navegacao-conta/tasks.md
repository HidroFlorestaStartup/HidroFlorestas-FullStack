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

## Ciclo de reparo pós-RED — execução da rodada A2

- [x] T010 [ANALYZE] Inventariar 10 falhas reais do artefato `41232069860/13054207847`, por arquivo/linha/geometry, mantendo G0 e d8951199 separados.
- [x] T011 [PLAN] Confrontar achados com FR-035, SC-035, constituição, Code-First e ownership; fixar reparos de conta, header, foco, footer e dashboard sem editar B/C.
- [x] T012 [IMPLEMENT] Corrigir apenas shell/TopBar e suites consumidoras A, preservando verificações de autorização e asserts de geometria, com novo commit candidato.
- [ ] T013 [REVIEW] Reexecutar o runner oficial de 15 gates no SHA da publicação A2 e qualificar PASS/FAIL por log/artefato.
- [ ] T014 [REVIEW] Conferir capturas e geométricas móveis reais do SHA A2, checkout/layout e foco em 320/text200 e paisagem 844×390/text200.
- [ ] T015 [REVIEW] Executar comparação bilateral starter/FullStack runtime ou preservar T007 como NOT_RUN.
- [ ] T016 Atualizar evidências e PR46 com SHA/attempt do resultado final e bloqueios, sem simular revisão independente.

- [x] T017 [ANALYZE/PLAN] Reconciliar 5 falhas E2E A2 com artefato 13061886214 e retificar plano de foco, scrollport e timing.
- [x] T018 [IMPLEMENT] Corrigir scroll-padding no shell, espera com limite por animação e seleção do último controle habilitado, preservando todas as contraprovas funcionais.
- [ ] T019 [REVIEW] Validar no SHA A3 o mapa 320x760/text200, mobile 320/text200, último controle 320/375/390 e restantes suites de domínio com journal dos 15 gates.

- [x] T020 [ANALYZE] Classificar BUILD FAIL A3 por stack TypeScript (CSSNumberish), sem atribuir a E2E.
- [x] T021 [IMPLEMENT] Estreitar `endTime` para número no auxiliar E2E, preservando timeout limitado e assertions reais.
- [ ] T022 [REVIEW] Confirmar Typecheck/Build, E2E e 15 gates do HEAD A4 na Actions oficial, com journal e artefatos.

## Continuidade A5 — ownership e evidências do gate IHFR

- [x] T023 [ANALYZE] Identificar pelos logs e journal do run A4 `41253192621`/1 as duas falhas reais e distingui-las dos 404 G0; registrar limites de viewport 667×375/text200 e cópia do SHA.
- [x] T024 [PLAN] Conferir as specs 035/036 e ownership: safe-area é A; `ScientificNotice` e assertions IHFR são B; congelar alterações somente A.
- [x] T025 [IMPLEMENT] Corrigir o padding contextual para 8px + inset e adicionar contraprova de 42px no próprio E2E de shell, sem alterar componentes/testes B.
- [ ] T026 [REVIEW] Revalidar o SHA final da branch A nos 15 gates, observar `results.jsonl`, screenshots e produzir recibo por run/tentativa; eventual FAIL IHFR dependente de B não pode ser encerrado unilateralmente.
- [ ] T027 [UI-06] Executar de verdade os dois projetos em estados/viewport equivalentes e registrar capturas `fullPage:false` e proveniência; sem ambos runtimes, `UI06_BILATERAL_NOT_RUN`.

T007/T008/T013–T016/T019/T022 permanecem pendentes enquanto o SHA final não possuir prova completa. Implementar os arquivos não equivale a obter PASS. Sem alteração de ownership dos testes `ihfr-diagnosis-{read,manage}.spec.ts`.
