# Rastreabilidade — Spec027

| Requisito | Fonte preservada | Produto | Tarefas | Prova |
|---|---|---|---|---|
| FR-001 | IMP009 FR001–004/025–027 | Layout/API intocados; shell | T009/T012/T014 | user-administration-read + segurança existente |
| FR-002 | IMP009 FR005/006 | Lista e filtros | T005/T006 | E2E consulta + unit query |
| FR-003 | IMP009 FR018/024 | Gerações de leitura | T005/T006/T010 | E2E audit A→B atrasado |
| FR-004 | IMP009 FR015/021 | Atualizar dados | T007/T008 | E2E conflito real e revisão nova |
| FR-005 | IMP009 FR009–019 | Body PATCH | T004/T007/T012/T014 | Unit allowlist + regressões servidor |
| FR-006 | IMP009 FR024 | Modal | T007/T008/T011 | E2E Escape/foco/controle final |
| FR-007 | IMP009 FR017/018 | Auditoria | T010/T011 | E2E audit legado + cursor preservado |
| FR-008 | Handoff F9B | Shell/overview/lista | T005/T009/T011/T013 | Viewports/200% preparados; inspeção das imagens pendente |
| FR-009 | Handoff/constituição | Composição somente | T001/T002/T003/T012 | Diff completo e fronteiras sem alteração |

SC001: T006. SC002: T004/T008. SC003: T011/T013. SC004: T012/T014. Gate humano: pendente, fora da automação.
