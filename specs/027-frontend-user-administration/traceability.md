# Rastreabilidade — Spec027

| Requisito | Fonte preservada | Produto | Tarefas | Prova |
|---|---|---|---|---|
| FR-001 | IMP009 FR001–004/025–027 | Layout/API intocados; shell | T009/T012/T014 | user-administration-read + segurança existente |
| FR-002 | IMP009 FR005/006 | Lista e filtros com labels explícitos | T005/T006/T017/T018/T021 | 6a5 falhou no locator exato; prova adicional dos dois nomes acessíveis preparada, novo HEAD pendente |
| FR-003 | IMP009 FR018/024 | Gerações de leitura e alerta de indisponibilidade | T005/T006/T010/T016 | E2E audit A→B atrasado + GET401/403/404 |
| FR-004 | IMP009 FR015/021 | Atualizar dados | T007/T008 | E2E conflito real e revisão nova |
| FR-005 | IMP009 FR009–019 | Body PATCH | T004/T007/T012/T014 | Unit allowlist + regressões servidor |
| FR-006 | IMP009 FR024 | Modal | T007/T008/T011/T015 | E2E Escape/foco/controle final + retorno sem acionador conectado |
| FR-007 | IMP009 FR017/018 | Auditoria | T010/T011 | E2E audit legado + cursor preservado |
| FR-008 | Handoff F9B | Shell/overview/lista e reflow móvel | T005/T009/T011/T013/T018/T019/T020/T021 | Defeitos de 6a5 confirmados a 200%; palavras inteiras, alvo44 px e 19 capturas preparados; execução/inspeção do novo HEAD pendentes |
| FR-009 | Handoff/constituição | Composição somente | T001/T002/T003/T012 | Diff completo e fronteiras sem alteração |

SC001: T006/T017/T018/T021. SC002: T004/T008. SC003: T011/T013/T018/T019/T020/T021. SC004: T012/T014/T021. Gate humano: pendente, fora da automação.

O recibo oficial de 6a5 é 9 PASS, E2E FAIL e 5 NOT_RUN; a inspeção das imagens históricas confirmou defeitos em 320×900/200%. A revisão Codex concluída e os testes locais anteriores pertencem aos seus respectivos commits. O reparo exige CI/review e inspeção próprios; novas verificações locais são NOT_RUN por indisponibilidade do executor. Detalhes, limites da máscara e IDs de execução estão em `implementation-evidence.md`.
