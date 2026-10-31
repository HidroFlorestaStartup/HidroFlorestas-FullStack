# Evidências — frente B / Spec 036

Data: 2026-10-31. Estado: PREPARACAO_G0; produto NAO_IMPLEMENTADO nesta frente.
Base exata: `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`. Branch `feat/ajustes-area-coletas-ihfr`; PR alvo development, dependência #45.

G0 acrescenta somente os quatro documentos deste diretório, herdando os guards antes da primeira publicação. Nenhum produto, teste funcional, schema ou contrato científico alterado. Fonte #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

| Verificação | Estado deste corte |
| --- | --- |
| Guards estáticos herdados | PASS no pacote G0 |
| Implementação/testes próprios B | NAO_IMPLEMENTADO / NOT_RUN |
| Quinze gates no HEAD B | Não observado ainda neste commit; consultar run real após publicação |
| Comparação visual atual | NOT_RUN |
| Revisão independente / aceite humano/científico | NÃO REALIZADOS |
| Subagentes nativos G0 | NATIVE_SUBAGENTS_UNAVAILABLE |

Recibo de publicação registra SHA e PR sem autorreferência. Acrescentar eventos por SHA/run/tentativa e manter este histórico. Resultado dos guards ou de outro HEAD não certifica B. Os quatro qualificadores experimentais permanecem obrigatórios.


---

## Execução B — fatos posteriores à preparação G0 (2026-10-31)

### Preflight e proveniência

- Repositório e branch: `HidroFlorestaStartup/HidroFlorestas-FullStack` / `feat/ajustes-area-coletas-ihfr` (PR Draft #47). HEAD inicial B `353a3fd00bc7d4155ab3fc2f17ad063e7108d68f`; ancestral guard `07755822f5dc75fe2be1d924005d30ed99f64a0b`; `development` observado `9b8595d232842d401ce81bbc92c54dd543aa2829`.
- Fonte confirmada: PR #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f` mais spec 036/G0. PR #45 Draft, HEAD observado `01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2`. Checkpoints são observações, nunca alvos de reset.
- Publicações por `create_tree` + `create_commit` + `update_ref` **sem force e com `expected_sha`**, todos na branch B:
  - `bc18f3022cabf8986af5f250be5fb7a3af10d7a8`: listagem da área, projeção temporal/seleção IHFR, teste unitário.
  - `c0da896b7b57be620fac62d86277706619a7363f`: composição da coleta, disclosure IHFR, mensagens humanas, correção dos testes de leitura relativos à UX.
  - `3db7e42445a3046cc2e3d605a119977d41e5cfe5`: E2E próprio com PostgreSQL sintético isolado e captures de viewport.
  - `9a34e1a76d75b384a87bab2093ff138b3488094f`: consulta independente de existência ambiental sem parse/versionamento científico no detalhe.
- Comparação GitHub no código `3db7e42445a3046cc2e3d605a119977d41e5cfe5`: guard...B `ahead_by=5 behind_by=0`, acumulado contra development de origem `ahead_by=6 behind_by=0`. Apenas caminhos da spec 036, páginas/componentes B, leitores novos B e testes B foram alterados além dos guards herdados. Recalcular contra SHA final.
- Não houve escrita no shell A, formulário C, DTO/repositórios compartilhados, `prisma/schema.prisma`, científico IHFR, `vercel.json`, workflow, branches alheias ou provedores. Worktrees e upstreams da máquina do usuário: **NAO_OBSERVAVEIS** via API. `NATIVE_SUBAGENTS_UNAVAILABLE`; nenhuma revisão independente/aceite simulado.

### CI realmente inspecionada, sem herança indevida de PASS

**Baseline G0**: [Action #41216396078](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216396078) / tentativa 1 / job `124581763018`, SHA `353a3fd00bc7d4155ab3fc2f17ad063e7108d68f`, **FAIL terminal**. Logs reais do ambiente Windows/Node 24.19/loopback PostgreSQL17:

| Gate | Baseline G0 (outro SHA) |
| --- | --- |
| RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint | PASS individual; 9/15 |
| E2E | FAIL; 218 testes passaram e 2 falharam em `tests/e2e/frontend-mobile-navigation.spec.ts:95`, largura 320/375 com texto 200%; ownership shell A |
| Https, Deletion, Ihfr, Bootstrap, SchemaAudit | NOT_RUN; runner abortou após E2E |
| Lint | PASS com 2 warnings preexistentes (`user-profile/index.tsx`, `white-box/index.tsx`) |

**Executado no código B**: os commits de produto foram publicados e acionaram Actions; a action de `9a34e1a76d75b384a87bab2093ff138b3488094f`, [run #41231960336](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41231960336), foi observada **PENDING**, sem afirmar conclusão. Runs intermediárias #41231580461 (bc18), #41231697010 (c0da) e #41231814876 (3db) foram canceladas após novos pushes; não são provas de sucesso. Registrar conclusão do HEAD documental final na PR #47, sem substituir por status de commit anterior.

**Testes B publicados, resultados ainda não comprovados**: `tests/unit/hf-ui036-area-presentation.test.ts` (offsets, UTC, empate, não confirmado, ponteiro atual/ausente); `tests/e2e/hf-ui036-area-collections.spec.ts` (duas ocorrências com confirmação invertida, navegação teclado área/coleta/ambiente, vazio, 320/375/390/768/1440 + texto200; snapshots com `fullPage:false` e máscara conforme helper existente); ajuste `tests/unit/frontend-ihfr-presentation.test.tsx` e `tests/e2e/ihfr-diagnosis-read.spec.ts` para disclosures expansíveis. Novas falhas precisam ser corrigidas no próprio recorte e requalificadas; não se deve reduzir asserts.

### Pendências para encerramento de gate

- Verificar os quinze resultados no **SHA final**, imagens e metadados geométricos capturados. Até lá: `CI_FINAL_NOT_VERIFIED`.
- Comparação visual starter/FullStack com mesmo estado e revisões independente/humana: `NOT_RUN` / `PENDENTE`.
- Conciliar com shell A e guard #45 apenas em futura integração autorizada; não executar merge/deploy ou promover ciência.
