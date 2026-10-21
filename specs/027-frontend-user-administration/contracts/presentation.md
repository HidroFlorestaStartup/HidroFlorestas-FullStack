# Contratos preservados — Spec 027

A fonte normativa continua [IMP-009](../../009-user-administration/spec.md) e seu OpenAPI. Este documento não cria endpoint.

| Operação existente | Uso de apresentação |
|---|---|
| GET /api/admin/users | search/role/status/limit/cursor; itens + nextCursor |
| GET /api/admin/users/{id} | Releitura do alvo, inclusive depois de conflito |
| PATCH /api/admin/users/{id}/role | expectedRole, expectedRevision, role, reason |
| PATCH /api/admin/users/{id}/status | expectedStatus, expectedRevision, status, reason |
| GET /api/admin/users/{id}/audit | Eventos minimizados do alvo e nextCursor |

Autoridade `ACTIVE + ADMIN` continua reavaliada no servidor. Leituras usam no-store. Falhas nunca viram dados demonstrativos. `REFRESH_TARGET` exige GET do detalhe; `ENSURE_ANOTHER_ACTIVE_ADMIN` mantém a orientação existente. `User.role` é global, `ResearchersLinked.role` é contextual.

Diálogo: título e descrição acessíveis, justificativa rotulada, Cancelar, Confirmar alteração, bloqueio durante request, foco no erro/resultado e retorno ao acionador ao cancelar. Textos de contrato já usados nos E2E são preservados.
