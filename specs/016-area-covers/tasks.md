# Tasks: Capas privadas

## Setup e execução vertical

- [x] T001 Registrar aprovação/pesquisa em spec.md/research.md (FR-001/FR-008/FR-009).
- [x] T002 Planejar modelo/contratos e gates em plan.md/data-model.md/contracts/images.md/quickstart.md.
- [ ] T003 Testar primeiro parser/formatos/EXIF/limites em tests/unit/area-cover*.test.ts (FR-002/FR-003).
- [ ] T004 Adicionar schema/migration de capas/tentativas/jobs e fixtures/harness em prisma/** e tests/fixtures/ihfr-diagnosis-fixtures.ts (FR-001/FR-006).
- [ ] T005 Implementar contracts/provider/cloudinary/sanitize em src/app/api/server/images/*.ts; dependências focais/lockfile e env exemplo (FR-002/FR-003/FR-004).
- [ ] T006 Testar primeiro serviço Pg/fake com roles/dois labs/revogação/inativo/replay/falhas em tests/integration/area-covers.test.ts (FR-001/FR-005/FR-009).
- [ ] T007 Implementar iniciação/lease/finalização/CAS e rotas HTTP em images/service.ts/http.ts e rotas image/** (FR-001/FR-002/FR-005).
- [ ] T008 Implementar leitura proxy autorizada sem URLs externas e DTO privado em images/service.ts/http.ts e áreas (FR-004).
- [ ] T009 Implementar seleção/progresso/retry/replace/remove/fallback e integrar detalhe/lista em src/components/areas/area-cover.tsx e páginas (FR-007).
- [ ] T010 Implementar cleanup durable/idempotente/ownership/leases/CLI em images/service.ts e scripts/area-cover-cleanup.ts (FR-006).
- [ ] T011 Cobrir concorrência/remove/retry/rollback/cleanup estrangeiro/vigente em tests/integration/area-covers.test.ts (FR-005/FR-006).
- [ ] T012 Validar migration aditiva sobre cadeia em tests/migration/area-covers.test.ts e Bootstrap (FR-001/FR-006).
- [ ] T013 Cobrir E2E fake UI/mobile/keyboard/error/retry/fallback em tests/e2e/area-covers.spec.ts; distinguir fake de homologação (FR-007/FR-009).
- [ ] T014 Executar regressão completa/contas/mail/IHFR/exclusão/HTTPS/schema audit; evidências com fingerprints em implementation-evidence.md (SC-001 a SC-004).
- [ ] T015 Revisar independentemente/converge/diff/links/secrets/ownership e resolver achados materiais; não fechar gates remotos (FR-008/FR-009).
- [ ] T016 Sincronizar pacote/matriz/decisões/PRD/contexto/runbook e commit validado; atualizar plano transversal.

## Dependencies & Execution Order

T001/T002 → T003/T004/T005 → T006/T007/T008 → T009/T010/T011/T012 → T013/T014/T015/T016.
Banco/porta/.next e arquivos compartilhados são sequenciais; leitura pode ser paralela.
MVP é US1, entrega local exige todas as histórias. Testes críticos escritos antes.
