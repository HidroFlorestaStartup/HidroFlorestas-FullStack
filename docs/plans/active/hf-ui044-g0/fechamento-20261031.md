# HF-UI-044 — prompts de fechamento técnico e operacional (CLOSE-01)

**Registro de preparo — 31/10/2026 (America/Fortaleza).** Publicado como complemento documental da PR Draft #45, sem alterar `GUARD_SHA` `07755822f5dc75fe2be1d924005d30ed99f64a0b` ou HEADs de A/B/C, sem merge/deploy.

## Snapshot verificado antes dos prompts

| Frente | PR | HEAD inicial, não alvo de reset | Ação validada | Estado |
|---|---|---|---|---|
| A | #46 | `e52763b8483b8a3376e3408cb04eb43b1b54370e` | [41253192621](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41253192621) | FAIL Ihfr, 12 PASS / 2 NOT_RUN; 228 E2E gerais PASS |
| B | #47 | `d7586ab95c69c45211e463516080e741bbb3931a` | [41252813575](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252813575) | 15/15 PASS; bilateral UI-06 e fechamento documental pendentes |
| C | #48 | `63925b3639f3eec1dd4bd737f7be7adb881c83eb` | [41251980306](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306) | 15/15 PASS; Spec 037 e gate operacional externo separados |

`development` observado `9b8595d232842d401ce81bbc92c54dd543aa2829`; #45 `01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2` na preparação anterior. Esses SHAs são provas históricas: todos os executores devem verificar o estado atual antes de editar.

## Fluxo recomendado: uma conversa por prompt

**Paralelo agora:**

- **[P1 — A5: recuperar IHFR e fechar UI-06 do shell](prompts/fechamento-a5-ihfr-shell.md)** — writer A na PR #46. Trata dois FAILs do run A4, executa nova CI, faz comparação bilateral real para o shell.
- **[P2 — B: comparação UI-06 da área/coleta](prompts/fechamento-b-ui06-comparacao.md)** — writer B na PR #47. CI já verde; evita recomeçar implementação; reconcilia tarefas/visual.
- **[P3 — C: fechar Spec 037 e evidências](prompts/fechamento-c-spec037.md)** — writer C na PR #48. CEP persistido; CI já verde; sem ativar serviço externo.
- **[P6 — Operações: quadro de Pedro/Luciano](prompts/fechamento-operacional-alunos.md)** — somente evidências/decisões, trilha paralela independente; não envia e-mail nem opera provedor.

**Depois dos três heads funcionais estabilizados:**

- **[P4 — QA independente e composição controlada](prompts/fechamento-qa-composicao-independente.md)** — executor diferente dos autores; revisão read-only + teste isolado de A+B+C se o ambiente permitir, sem novo Preview/merge.

**Por último:**

- **[P5 — coordenador e recibo final de prontidão](prompts/fechamento-coordenador.md)** — reconcilia Spec Kit, 15 gates finais, UI-06, findings e dependências; sem integração/aceite humano simulados.

## Invariantes

Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`; fonte #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`; [handoff completo G0](handoff-de-execucao.md); Spec 035/036/037 nas próprias branches; guards `07755822f5dc75fe2be1d924005d30ed99f64a0b`. Não modificar #44, main, development, ciência, banco hospedado, SMTP/Cloudinary, nem executar merge/deploy ou serviço externo sem autorização posterior. Os prompts são trabalho futuro, não execução nem testes já realizados.
