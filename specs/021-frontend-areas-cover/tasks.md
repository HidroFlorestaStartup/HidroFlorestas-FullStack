# Tasks: Áreas e capa
**Input**: spec/plan/research/data-model/contracts. Testes solicitados. PLAN → EXECUTE → REVIEW.

## Phase 1: Setup / PLAN
- [x] T001 Conferir base/ref/worktree/processos/número livre e registrar em specs/021-frontend-areas-cover/plan.md.
- [x] T002 Gerar artefatos com SpecKit e checklist em specs/021-frontend-areas-cover/.
- [x] T003 Analisar consistência e commitar PLAN antes do código em specs/021-frontend-areas-cover/review.md.

## Phase 2: Foundation / testes antes do produto
- [x] T004 Criar testes reais de lista/form/detail e estado responsivo em tests/e2e/frontend-areas.spec.ts.
- [x] T005 Criar testes matriz8/protocolo privado de capa com GETreal/canEdit e fake explícito em tests/e2e/frontend-areas.spec.ts.
- [x] T006 Executar baseline oficial congelada; registrar RED real/caracterização e capturas before em specs/021-frontend-areas-cover/evidence/.

## Phase 3: US1 — lista e detalhe
- [x] T007 [US1] Adaptar AreaList em src/components/areas/area-list.tsx e areas.module.css sem alterar efeito/DTO/projeções.
- [x] T008 [US1] Adaptar composiçãoSSR do detalhe em src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx.
- [x] T009 [US1] Validar navegação/dados/readOnly/recusas e opcionais em tests/e2e/frontend-areas.spec.ts.

## Phase 4: US2 — formulário e ponto
- [x] T010 [US2] Adaptar somente apresentação em src/components/areas/area-form.tsx e areas.module.css.
- [x] T011 [US2] Validar0/limites/UF/opcionais/geo negada/timeout/tardia/mapa/confirmação/uncerto/cancelar, preservando testes existentes e src/components/areas/area-form-state.ts.

## Phase 5: US3 — capa
- [x] T012 [US3] Adaptar AreaCoverPreview/Editor em src/components/areas/area-cover.tsx e novo cover.module.css preservando proxy/keys/unoptimized/validadores/protocolo.
- [x] T013 [US3] Se RED demonstrar falso sucesso/evento anterior ou descarte de tentativa incerta, separar status local e preservar chave/ticket/expectedRevision originais em src/components/areas/area-cover.tsx; EXPIRED/STALE_REVISION autoritativos permitem nova tentativa, sem alterar backend.
- [x] T014 [US3] Validar matriz8, OCC/retryestável/EXPIRED/STALE_REVISION/removal/metadata vsbytes eeventotardio em tests/e2e/frontend-areas.spec.ts e suítes atuais.

## Phase 6: REVIEW / publicação
- [ ] T015 Conferir375/768/1440/320texto200, campos mascarados, mapa/foco/viewport e consumidores em specs/021-frontend-areas-cover/evidence/.
- [x] T016 Incluir nomeexato/if/uploadfocal em .github/workflows/rc-review.yml e Previewfalse em vercel.json antespush.
- [ ] T017 Executar15gates congelados e guardar journal/fingerprint em specs/021-frontend-areas-cover/implementation-evidence.md.
- [ ] T018 Revisar diff/testes/capturas e consistênciaSpecKit com revisor separado; corrigir achados materiais e validar delta em specs/021-frontend-areas-cover/review.md.
- [ ] T019 Publicarbranch/PR dependente, solicitarrevisor confirmado e conferirCI do HEADexato; recibofinal noPR e referência em specs/021-frontend-areas-cover/implementation-evidence.md.

## Dependencies & Parallel Opportunities
T001→T003 antesT004/005. T004 eT005 no mesmoarquivo têm um escritor. T006 antesT007/008/010/012/013. T007/T010 podem ser um escritor eT008/T012 outro, sem compartilharCSSna mesmahora. T009/011/014 usam suites oficiais sequenciais, nunca clusters concorrentes. T016 antesprimeiropush. T017→T018→T019; mudança material após revisão exige novosgates afetados/CI atual. As três histórias fazem parte da missão, semencerrarnoMVP.
