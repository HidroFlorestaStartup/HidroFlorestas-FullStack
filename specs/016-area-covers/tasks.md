# Tasks: Capas privadas

## Setup e execução vertical

- [x] T001 Registrar aprovação/pesquisa em spec.md/research.md (FR-001/FR-008/FR-009).
- [x] T002 Planejar modelo/contratos e gates em plan.md/data-model.md/contracts/images.md/quickstart.md.
- [x] T003 Testar primeiro parser/formatos/EXIF/limites em tests/unit/area-cover*.test.ts (FR-002/FR-003).
- [x] T004 Adicionar schema/migration de capas/tentativas/jobs e fixtures/harness em prisma/** e tests/fixtures/ihfr-diagnosis-fixtures.ts (FR-001/FR-006).
- [x] T005 Implementar contracts/provider/cloudinary/sanitize em src/app/api/server/images/*.ts; dependências focais/lockfile e env exemplo (FR-002/FR-003/FR-004).
- [x] T006 Testar primeiro serviço Pg/fake com roles/dois labs/revogação/inativo/replay/falhas em tests/integration/area-covers.test.ts (FR-001/FR-005/FR-009).
- [x] T007 Implementar iniciação/lease/finalização/CAS e rotas HTTP em images/service.ts/http.ts e rotas image/** (FR-001/FR-002/FR-005).
- [x] T008 Implementar leitura proxy autorizada sem URLs externas e DTO privado em images/service.ts/http.ts e áreas (FR-004).
- [x] T009 Implementar seleção/progresso/retry/replace/remove/fallback e integrar detalhe/lista em src/components/areas/area-cover.tsx e páginas (FR-007).
- [x] T010 Implementar cleanup durable/idempotente/ownership/leases/CLI em images/service.ts e scripts/area-cover-cleanup.ts (FR-006).
- [x] T011 Cobrir concorrência/remove/retry/rollback/cleanup estrangeiro/vigente em tests/integration/area-covers.test.ts (FR-005/FR-006).
- [x] T012 Validar migration aditiva sobre cadeia em tests/migration/area-covers.test.ts e Bootstrap (FR-001/FR-006).
- [x] T013 Cobrir E2E fake UI/mobile/keyboard/error/retry/fallback em tests/e2e/area-covers.spec.ts; distinguir fake de homologação (FR-007/FR-009).
- [x] T014 Executar regressão completa/contas/mail/IHFR/exclusão/HTTPS/schema audit; evidências com fingerprints em implementation-evidence.md (SC-001 a SC-004).
- [x] T015 Revisar independentemente/converge/diff/links/secrets/ownership e resolver achados materiais; não fechar gates remotos (FR-008/FR-009).
- [x] T016 Sincronizar pacote/matriz/decisões/PRD/contexto/runbook e commit validado; atualizar plano transversal.

## Dependencies & Execution Order

T001/T002 → T003/T004/T005 → T006/T007/T008 → T009/T010/T011/T012 → T013/T014/T015/T016.
Banco/porta/.next e arquivos compartilhados são sequenciais; leitura pode ser paralela.
MVP é US1, entrega local exige todas as histórias. Testes críticos escritos antes.

## Convergência durante validação

- [x] T017 Resolver revisão P2 do contrato Cloudinary: allowed_formats string CSV/array com fingerprint estável; prova de contexto por GET plural by_asset_ids e resposta DELETE por publicId/assetId exatos, mantendo delete imutável. Cobrir RED/green em tests/integration/area-cover-provider.test.ts; ajustar cloudinary.ts. Testes do adaptador server-only usam as condições React-server do runner de integração; não remover o guard para passar Unit. Precede T014/T015.
- [x] T018 Atualizar tests/unit/areas-service.test.ts para projeção mínima de capa autorizada na lista, mantendo filtro/contexto/ordem e verificando que assetId não integra DTO. Falha real de Unit após inclusão da relação; precede T014.
- [x] T019 Fornecer cálculo offline do fingerprint do preset em scripts/area-cover-preset.ts e documentar configuração/cleanup/tombstones/custos/smoke em docs/operations/area-covers-runbook.md, sem configuração ou execução remota. Precede T016.
- [x] T020 Completar cobertura identificada pela revisão em tests/integration/area-covers.test.ts e fake fixture: ADMIN contextual/global, ator diferente, quota3/10h/expiração, downgrade/revogação/inatividade após ticket e durante download, exclusão efetiva do uploader com rollback/leitura/cleanup da equipe restante. Precede T014/T015; nenhum novo recorte de produto.

## Correção focal RC-UI-001 (2026-10-13)

- [x] T021 [US1] Reconciliar requisito FR-007, cenário 503→200 e decisão de não alterar revision em specs/016-area-covers/{spec.md,plan.md,tasks.md}.
- [x] T022 [US1] Escrever teste E2E RED da mesma revision e segunda falha/retentativa em tests/e2e/area-covers.spec.ts.
- [x] T023 [US1] Corrigir remontagem/novo GET/feedback com contador local e onLoad/onError em src/components/areas/area-cover.tsx.
- [x] T024 Executar E2E focal, typecheck, lint e regressões pertinentes, registrando ambiente, resultados reais e snapshot em specs/016-area-covers/implementation-evidence.md.
- [x] T025 Atualizar review da PR #4 e plano de propagação da correção às branches dependentes da RC em specs/016-area-covers/rc-ui-001-propagation.md; orientar futura atualização de docs/releases/2026-10-10-cri-rc/integration-guide.md (ausente na branch #4), sem executar merge/deploy. Push fast-forward e re-review #4/#6 confirmados; não significa aprovação dos revisores.

Dependência: T021 → T022 → T023 → T024 → T025. Não reabrir migrações, autorização ou ciência fora do recorte.

## Correções CRI-REV — preparação e fundação (2026-10-15)

- [x] T026 Reconciliar achados/branches/autoridade e decisão A em specs/016-area-covers/{spec.md,plan.md,research.md,contracts/images.md}; commitar antes de código.
- [x] T027 Instrumentar presetCalls/ticketCalls/barreira determinística em tests/fixtures/area-cover-provider.ts e registrar testes RED em specs/016-area-covers/cri-rev-20261015-evidence.md.

### US1 — disponibilidade (CRI-REV-001)

- [x] T028 [US1] Escrever/executar RED de flag/config/roles/DTO/preservação e mutações fechadas em tests/integration/area-covers.test.ts e tests/integration/area-cover-provider.test.ts (FR-010/011).
- [x] T029 [US1] Escrever/executar RED Playwright de ausência/desabilitação/retorno da disponibilidade em tests/e2e/area-covers.spec.ts (SC-005).
- [x] T030 [US1] Implementar capacidade offline/DTO/guards em src/app/api/server/images/{settings,cloudinary,contracts,service}.ts e consumidores src/components/areas/{area-cover,area-list}.tsx, src/types/area.type.ts e src/app/api/server/{areas/area.contracts,services/areas.service}.ts; repetir GREEN sem reduzir assertions (FR-010/011).

### US1/US2 — preflight (CRI-REV-002)

- [x] T031 [US2] Escrever/executar RED de quotas/stale/replay/expiração antes de I/O e corridas no preset em tests/integration/area-covers.test.ts (FR-012/013).
- [x] T032 [US2] Implementar duas transações sem rede/validação compartilhada/criação atômica em src/app/api/server/images/service.ts e repetir GREEN (SC-006).
- [x] T033 [US2] Verificar quotas por ator, mesma chave concorrente, erro/retry serializável e preset sem órfãos em tests/integration/area-covers.test.ts (FR-013).

### Fechamento transversal e publicação (CRI-REV-003/004)

- [x] T034 Executar regressão oficial Unit/Integration/Migration/Contract/R1/Build/Typecheck/Lint/E2E/Https/Deletion/Ihfr/Bootstrap/SchemaAudit e registrar resultados em specs/016-area-covers/cri-rev-20261015-evidence.md.
- [x] T035 Revisar adversarialmente autorização/DTO/fail-closed/replay/quota/OCC/cleanup/compatibilidade, corrigir achados e registrar em specs/016-area-covers/cri-rev-20261015-evidence.md.
- [x] T036 Atualizar docs/operations/area-covers-runbook.md e .env.images.example; commitar/publicar 016 após fetch/status/diff/checks.
- [x] T037 Propagar via worktrees/merge commits audit→RC→validation, preservar 11 originais/99d8363 e docs/reports/audits; atualizar docs/releases/2026-10-10-cri-rc/ com prontidão/release notes/integração e conferir PR #7 sem diff funcional.
- [x] T038 Confirmar HEAD/checks/diffs remotos, responder Pedro e pedir re-review #4/#6/#7; registrar recibo em specs/016-area-covers/cri-rev-20261015-evidence.md e manter aprovação humana pendente. Fechamentos documentais subsequentes recebem checks próprios, acompanhados até conclusão no GitHub.

Dependências: T026 → T027 → T028/T029/T031 (RED) → T030/T032/T033 →
T034/T035 → T036 → T037 → T038. US1 e US2 têm aceites independentes, mas
service.ts e banco/build/E2E são sequenciais. Leitura de docs e revisão do diff
podem ocorrer em paralelo; nenhum agente adicional é necessário nesta atualização.
MVP funcional: US1/US2 corrigidas; entrega exige publicação/sincronização também.
T001–T025 não são reabertas; aprovações dos estudantes não são tarefas do agente.

### Convergência após CI materialmente reprovado

- [x] T039 [US2] Diagnosticar formato seguro do conflito ao commit Pg e registrar RED do retry do adaptador em tests/integration/area-cover-transactions.test.ts e specs/016-area-covers/cri-rev-20261015-evidence.md; preservar FAILs das runs38843869327/38843986244.
- [x] T040 [US2] Corrigir reconhecimento restrito de serialização/deadlock em src/app/api/server/images/service.ts e repetir GREEN/gates sem mudar assertions/timeouts; propagação rastreada por T036–T038.

T039 → T040 → T034/T035 revalidados → T036–T038. A cobertura anterior e os
PASSs locais são históricos; os novos HEADs exigem checks próprios.

## CRI-REV-005 — contrato da listagem (2026-10-17)

- [x] T041 Planejar paridade da listagem e distinção do detalhe em specs/016-area-covers/{spec.md,plan.md,tasks.md}; preservar opcionalidade TS e commitar antes do RED.
- [x] T042 [US1] Executar teste preparado tests/unit/area-openapi-parity.test.ts em RED com OpenAPI antigo e registrar comando/SHA/saída em specs/016-area-covers/cri-rev-005-evidence/.
- [x] T043 [US1] Atualizar specs/003-area-registration-and-viewing/{contracts/area-registration-api.openapi.yaml,data-model.md} e specs/016-area-covers/contracts/images.md; repetir GREEN fechado e proteger detalhe sem cover; corrigir os dois exemplos com status omitido demonstrado pelo Ajv.
- [x] T044 Revisar campos, autorização/flag/privacidade, testes negativos e registrar a matriz transversal e achados reais em specs/016-area-covers/cri-rev-005-evidence.md.
- [ ] T045 Executar scripts/rc-review-validation.ps1 com Node24/PostgreSQL sintético; registrar evidências em specs/016-area-covers/cri-rev-005-evidence.md, publicar origem e propagar audit→RC→validation por merges, conferir checks/HEADs/diffs e solicitar re-review. Aprovações humanas permanecem pendentes.

Sequência: T041→T042(RED)→T043(GREEN)→T044→T045. O plano atual é um pacote
candidato; não marcar tarefas como executadas antes das evidências no checkout.
