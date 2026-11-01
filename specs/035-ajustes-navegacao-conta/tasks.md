# Tasks: 035 — navegação, conta e shell

## Estado corrente A6

Revisões podem estar [x] com resultado FAIL: isso documenta execução/registro e não aprova o requisito. A5 isolada `41268640475/1` continua 12 PASS/Ihfr FAIL/2 NOT_RUN; composição `41275910130/1` tem 15/15 PASS somente em `6c61056fe1dc2193e225d935f49b78cb6c6781ed`. Dependência B e decisão de integração permanecem abertas. [Matriz individual](implementation-evidence.md) identifica fontes e limitações.

- [x] A6-01 ANALYZE: auditar refs/ownership, journals/logs/ZIPs A5 e composto e analisar consistência Spec Kit.
- [x] A6-02 PLAN/IMPLEMENT: reconciliar quatro documentos e preparar uma proposta visual focal inerte; publicar na branch A/#46 e recibo factual #45, identificados na PR.
- [x] A6-03 REVIEW: verificar escopo, integridade, links, estados, diff e readback; resultado de eventual CI nova permanece próprio do DOC_HEAD no recibo.
- [ ] A6-04 PENDENCIA_DE_DECISAO: mantenedor decide integração de B antes de A + revalidação na nova base, ou transporte mínimo autorizado, se exigir A isolada verde.
- [ ] A6-05 UI06_RUNTIME_PENDING: autorizar e executar proposta focal; T007/T015/T027 não encerradas por preparação. UI-06 global exige B/área/coleta/IHFR.
- [ ] A6-06 UI037_CAPTURE_PENDING: QA/C preserva e arquiva mobile/desktop PNG+JSON, conforme handoff, sem edição por A.

Não existe aceite humano/científico/operacional nesta reconciliação.

## Histórico anterior à reconciliação A6

As afirmações temporais abaixo pertencem aos respectivos checkpoints; o estado corrente é o A6 acima. Relatos antigos de CI pendente, ambiente não observável e ferramentas indisponíveis não descrevem esta sessão.

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
- [x] T008 Executar testes focais e os quinze gates preservados de `scripts/rc-review-validation.ps1` em ambiente sintético autorizado; registrar resultados, falhas e NOT_RUN, sem atribuir PASS herdado.
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
- [x] T013 [REVIEW] Reexecutar o runner oficial de 15 gates no SHA da publicação A2 e qualificar PASS/FAIL por log/artefato.
- [ ] T014 [REVIEW] Conferir capturas e geométricas móveis reais do SHA A2, checkout/layout e foco em 320/text200 e paisagem 844×390/text200.
- [ ] T015 [REVIEW] Executar comparação bilateral starter/FullStack runtime ou preservar T007 como NOT_RUN.
- [x] T016 Atualizar evidências e PR46 com SHA/attempt do resultado final e bloqueios, sem simular revisão independente.

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
- [x] T026 [REVIEW] Revalidar o SHA final da branch A nos 15 gates, observar `results.jsonl`, screenshots e produzir recibo por run/tentativa; eventual FAIL IHFR dependente de B não pode ser encerrado unilateralmente.
- [ ] T027 [UI-06] Executar de verdade os dois projetos em estados/viewport equivalentes e registrar capturas `fullPage:false` e proveniência; sem ambos runtimes, `UI06_BILATERAL_NOT_RUN`.

No checkpoint A5, T007/T008/T013–T016/T019/T022 estavam pendentes. A6 reclassifica individualmente as revisões acima; T007/T014/T015/T019/T022/T027 seguem abertas. Implementar ou revisar os arquivos não equivale a obter PASS. Sem alteração de ownership dos testes `ihfr-diagnosis-{read,manage}.spec.ts`.

## CLOSE-PARALLEL-02 — tarefas novas preservando histórico

- [x] T028 [ANALYZE/PLAN] Confrontar spec/plan/tasks e contrato comum; mapear escala/fontes/reload e ownership A.
- [x] T029 [IMPLEMENT] Implementar shared.ts com escala exata, TextNodes CDP, reload e persistência incremental conforme FR-035-003/SC-035-003.
- [x] T030 [TEST] Contraprova RED e smoke Chromium sem DB100→200→100/320/1440, CDP ausente e diagnóstico antes de FAIL.
- [x] T031 [IMPLEMENT] Particionar shell.spec.ts porlayout cobrindo workspace/laboratório/Conta/Escape/foco/histórico/insets; nenhuma equivalência inventada.
- [x] T032 [REVIEW] Revisar escopo/whitespace/sintaxe/tipos e entregar commit/handoff local exclusivo ao coordenador.
- [ ] T033 [RUNTIME] Executar candidata integrada no Windows hospedado, inspecionar pares reais e registrar achados; UI06/aceite humano separados.

## CLOSE02 — QA estática, eixos de evidência incompleta

- [x] T034 [ANALYZE/PLAN] Reproduzir MEDIUM de parsemdois samples e delimitar reparo aos helpersA/FR-035-003.
- [x] T035 [IMPLEMENT] Classificar parincompleto comoFAIL/INSUFFICIENT_EVIDENCE/PARTIAL emshared/shell e preservar essa classificação nocatch.
- [x] T036 [TEST/REVIEW] ExecutarREDzero/umruntime eGREENsmoke semDB, tipos completos locais, lint e whitespace; registrar hashes e limitações.
- [ ] T037 [RUNTIME] Coordenador executar noSHAcorrigido a próxima rodada pertinente, dentro do orçamento; semPASSherdado deR1.

## CLOSE02 — seletor acessível da referência

- [x] T038 [ANALYZE/PLAN] Inspecionar FieldShell fixado e reproduzir emChromium a estrutura label/spanaria-hidden/inputrequired semDB.
- [x] T039 [IMPLEMENT] Trocar somente o seletor do nome de laboratório nostarter por textbox/nomeacessível exato; preservarFullStack/produto/timeouts.
- [x] T040 [TEST/REVIEW] DemonstrarRED1/1 eGREEN6/6, typesfull locais/lint/diff e persistir contraprova0label/1textbox.
- [ ] T041 [RUNTIME] Verificar criação de laboratório da referência noSHAda próxima rodada pertinente docoordenador, semPASSherdado.

## CLOSE02 — reparo demonstrado do menu e qualidade da evidência

- [x] T042 [ANALYZE/PLAN] InspecionarR1real e reproduzir DOM/TSX/CSS do menuem6recortes antesdecorrigir produto; distinguirfontes/limites.
- [x] T043 [IMPLEMENT] Corrigir somente containingblock do menuemCSSA, preservando dimensões/fontes/contratos.
- [x] T044 [TEST] Escrever6regressões oficiais035 comnome/links/fontes/escalaexata/ratio1 earchivamento-geometry.json; marcaçãoautoria, nãoruntime.
- [x] T045 [IMPLEMENT/TEST] Preservarerroprimário/lifecycle e mascarar apenas a interseção visível doscontroles, comcontraprovasCPU/Chromium semDB.
- [x] T046 [REVIEW] Executar14smokes, typecheckcompleto local/lint/whitespace ehand off separado deproduto/QA/documentação.
- [ ] T047 [RUNTIME] Coordenador executar15gates eUI06sobreSHAfinalreparado, auditarZIP/JSON/PNG ecomparação real; nãoherdarR1ou6c61056f.

## CLOSE02 — reconciliação R2 e última rodada delimitada

- [x] T048 [ANALYZE] Conciliar86índice/94linhascase/14IDs e inspecionar menu/workspace/laboratório/reload/foco reais porfonte.
- [x] T049 [PLAN/IMPLEMENT] Registrar exceçãoestrita referênciaocluída semfontPASS; fonteausenteFullStack/foraescopobloqueia; focoProduto ratio1/hit intactos.
- [x] T050 [IMPLEMENT] Observar estadoLoading/notfound nativo eescalaantes/apósreload, depoisreaplicar16/32; nãoinferirpersistênciadepreferência.
- [x] T051 [TEST/REVIEW] ContraprovarLoadingDIV/300irmãosoffscreen, executar19smokes/tipos/lint/diff eentregar commitsQAexclusivos.
- [ ] T052 [RUNTIME/QA] Coordenador executar últimaR3autorizada eQA nãoautora julgar evidência/completude/limites; semaceitehumano automático.
