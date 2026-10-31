# Tasks: 036 — área, coletas e IHFR

Lista inicial G0; fonte #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Completar mapa de arquivos/Spec Kit antes de produto. Testes obrigatórios.

## Preparação

- [x] T001 Registrar preflight/HEAD/base/guardas/ambiente em `specs/036-ajustes-area-coletas-ihfr/implementation-evidence.md`, usando o guard `07755822f5dc75fe2be1d924005d30ed99f64a0b`.
- [x] T002 Completar `spec.md`, `plan.md` e este `tasks.md` com paths de imports reais, AGENTS, contratos e referências Code-First integrais; reservar alterações compartilhadas ao coordenador.

## US1 — descoberta e ordenação

- [x] T003 [US1] Criar casos focais em `tests/unit/hf-ui036-area-presentation.test.ts`: offsets/empates, coleta recente sem IHFR, coleta anterior com resultado e revogação/substituição; demonstrar regressões quando reproduzíveis.
- [x] T004 [US1] Implementar UI-02 a partir de `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx` e imports congelados no plano, sem editar formulário C; preservar autorização nas leituras.
- [x] T005 [US1] Cobrir ida/volta área → coleta → ambientais em `tests/e2e/hf-ui036-area-collections.spec.ts`, sem criar diagnóstico automaticamente.

## US2/US3 — composição e detalhes técnicos

- [x] T006 [US2] Implementar UI-03 no detalhe `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx` e componentes mapeados; testar confirmação, draft e responsividade no E2E próprio.
- [x] T007 [US3] Implementar UI-04 nos componentes mapeados em `plan.md`; verificar os quatro qualificadores/proveniência acessíveis por teclado e orientação humana para falta de dados confirmados.
- [ ] T008 [US2] [US3] Comparar runtimes nos viewports aprovados; registrar capturas viewport, geometria, foco e texto 200% em `implementation-evidence.md`.

## Validação e entrega

- [ ] T009 Executar testes focais e os quinze gates de `scripts/rc-review-validation.ps1` em ambiente sintético; registrar evidências reais por SHA/run/tentativa, sem alterar gates ou ciência.
- [x] T010 Atualizar `spec.md`, `plan.md`, `tasks.md`, `implementation-evidence.md` e PR Draft próprio com diffs exclusivo/acumulado, ownership e pendências; sem merge/deploy.

Nenhuma tarefa de produto/teste foi marcada concluída por G0. Não paralelizar edição do mesmo arquivo com A/C.


## Checkpoint de execução B — 2026-10-31

**T001–T007 [x]** significam produção do código, dos testes e da documentação técnica correspondentes, **não** aprovação dos testes. O E2E sintético de B ainda aguarda resultado terminal no HEAD implementado.

**T008 [ ]**: as capturas viewport foram programadas no harness existente com `fullPage:false` e registros geométricos, mas a comparação real starter x FullStack no mesmo estado não foi realizada, nem se alegam provas visuais inexistentes.

**T009 [ ]**: havia run real G0 com 9 gates PASS, E2E FAIL e 5 gates posteriores NOT_RUN. Run do código B `41231960336` (SHA `9a34e1a76d75b384a87bab2093ff138b3488094f`) foi observado PENDING; o novo HEAD documental deverá ter sua própria execução verificada. Não confundir PASS de outro SHA.

**T010 [x]**: spec/plano/tarefas/evidências na reserva 036 e atualização da PR Draft #47 são parte da mesma publicação; dependências humanas não foram fechadas e seguem listadas como pendências. Nenhum merge/deploy.
