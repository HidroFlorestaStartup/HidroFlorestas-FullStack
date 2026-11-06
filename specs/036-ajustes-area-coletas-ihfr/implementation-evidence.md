# Evidências — frente B / Spec 036

> **Ciclo atual C1–C3 (05/11/2026):** [recibo e evidências](evidence/ui044-correcoes-finais-20261105/readme.md). Os estados anteriores abaixo são checkpoints históricos; não qualificam a nova candidata.

> **Estado atual em 2026-11-01:** `CODE_IMPLEMENTED_CI_15_OF_15_PASS` no **CODE_SHA_TESTED** `d7586ab95c69c45211e463516080e741bbb3931a` (run `41252813575`, tentativa 1). `B_VISUAL_EVIDENCE_PENDING`: a comparação bilateral executada com Lovable permanece NOT_RUN. O registro G0/FAIL e as pendências históricas abaixo são preservados como cortes anteriores, não como estado atual. `DOC_HEAD` é o commit desta reconciliação, distinto do código testado; consultar a PR #47 para seu SHA e CI próprios.

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

---

## Novo ciclo de verificação — análise do run 41234289600 e patch corretivo

- **Ambiente real:** Windows/Node 24.19.0, Chromium, PostgreSQL 17 loopback sintético; run `41234289600`, tentativa 1, HEAD `6cfd15b026055566dda529e2c6964a60ce1de372`, conclusão **FAIL**.
- **Gates PASS (12):** RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion. O E2E principal terminou com sucesso; o gate `Ihfr` ficou `FAIL` (4 aprovações, 2 reprovações), `Bootstrap` e `SchemaAudit` permaneceram `NOT_RUN` por fail-fast.
- **Evidência:** [run #41234289600](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41234289600), [artefato 13056115395](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41234289600/artifacts/13056115395), log `.accounts-validation/ihfr-1793476025118.log`. Causas: fixture CURRENT em coleta de ocorrência mais recente que o par criado; palavra `experimental` fragmentada em 320px/texto200.
- **Plano implementado:** isolamento da área via API autenticada em schema descartável do próprio runner IMP-006, sem alterar as fixtures globais; redução de paddings locais e `break-normal` para o aviso científico, mantendo integralmente as qualificações e os testes responsivos.
- **Limite:** correção de código publicada **não é PASS de gate**. A revisão subsequente anotará o SHA de implementação e run final. Não houve comparação de dois runtimes, revisão independente ou aceite humano.

### Evidência visual adicional e reparo B de 200%

- Snapshot real (outro SHA): artefato [13056115395](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41234289600/artifacts/13056115395), `.accounts-validation/frontend-collections/*frontend-collections-area-320-900-200.png` + `*-viewport.json`: `width=320`, `textScale=200`, `documentWidth=320`, `fullPage=false`. Mesmo com página sem overflow, a palavra humana `ambientais` no link era fragmentada.
- Reparo: CTA ambiental mobile de largura integral e rótulo protegido de fragmentação, sem reduzir fonte nem mudar a rota; `tests/e2e/hf-ui036-area-collections.spec.ts` acrescenta `expectIHFRUnfragmentedWords` no viewport 320/200. Estado de execução: NOT_RUN neste checkpoint; a Action do novo HEAD deve confirmar.

### Run 41251345900 (HEAD anterior) — correção pontual confirmada pelos logs

- **SHA:** `013264106ef990480ae5a3963926527ee04c5e7c`, tentativa 1. **12 PASS:** RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion; `Ihfr` FAIL (4 de 6 cenários PASS), `Bootstrap`/`SchemaAudit` NOT_RUN (fail-fast).
- **Falha 1 (asserção semântica incorreta):** o teste clicou em `IHFR` e esperou rota sem hash, mas produto usa `#ihfr-diagnosis-heading`; leitura funcional correta; atualizar teste para verificar URL com fragmento e diagnóstico ausente na nova coleta.
- **Falha 2 (layout real em landscape 200%):** `Não aprovado como contrato científico definitivo` teve ratio visível 0,720 no viewport 667x375 (área central com ~197px entre header/nav), porque `sm:grid-cols-2` manteve a coluna estreita e o label cresceu em múltiplas linhas. Troca exclusivamente visual para `lg:grid-cols-2` mantém a fonte, os quatro qualificadores e o assert de razão 1.
- **Origem verificável:** [Action #41251345900](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251345900) e [artefato #13061703054](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251345900/artifacts/13061703054). Imagens/JSON `frontend-ihfr-qualifiers-667-375-text200.*` confirmam `height=375`, `textScale=200`, `content.clientHeight=197`, `fullPage=false`. Teste do botão ambiental mobile passou no gate E2E.
- **Próxima execução:** patch de B publicado, resultado ainda NOT_RUN neste registro. Sem manipulação de dados hospedados, mudanças científicas, shell, CI, package, schema, guard ou outras branches.


---

## HF-UI-044-CLOSE-B — ANALYZE → PLAN → IMPLEMENT → REVIEW (2026-11-01)

### Identidade e limites de preservação

- **CODE_SHA_TESTED:** `d7586ab95c69c45211e463516080e741bbb3931a`; branch `feat/ajustes-area-coletas-ihfr`, PR Draft [#47](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/47) aberta. **DOC_HEAD:** SHA do commit exclusivamente documental deste corte; registrado na PR após o push. Não transferir PASS automaticamente para DOC_HEAD.
- **Guard/merge-base:** `07755822f5dc75fe2be1d924005d30ed99f64a0b`; **development observado:** `9b8595d232842d401ce81bbc92c54dd543aa2829`. B está 13 commits adiante do guard e zero atrás, 19 caminhos exclusivos. #45, #46 e #48 continuam sem merge no preflight. HEAD A observado: `e52763b8483b8a3376e3408cb04eb43b1b54370e`; HEAD C: `63925b3639f3eec1dd4bd737f7be7adb881c83eb`.
- Nenhum código de produto, teste, guarda, shell A, formulário C, schema, manifesto científico, fluxo IHFR ou configuração de provider alterado por CLOSE-B. As fontes de UI #44 são decisões aprovadas; a seleção entre ocorrências é `INFERENCIA` operacional já classificada, não nova decisão científica.

### Journal oficial — todos os gates do mesmo código

- [Action 41252813575](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252813575): evento `push`, tentativa **1**, job `validate=124689691730`, status `completed`, conclusão `success`, **HEAD `d7586ab95c69c45211e463516080e741bbb3931a`**.
- [Artefato 13062377832](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252813575/artifacts/13062377832), `rc-validation-d7586ab95c69c45211e463516080e741bbb3931a`: 747 entradas ZIP; 27.538.572 bytes; digest `SHA-256=16fd7176e6fe098553a87dffd5a82192090e99f58e6c842c30bc5edbaa90f986`; auditoria local `zipfile.testzip()=None` (sem erro de integridade). O digest corresponde ao GitHub Actions.
- Fonte primária: `.accounts-validation/results.jsonl` (15 registros, nenhum FAIL/NOT_RUN, todos `exitCode=0`). Os 15 preservam o mesmo identificador de snapshot do runner `2f9985868be5ceea3e5afdc7b13a5769918904f5d187b8a2e2d7cd8e6029aee1`, **não confundir esse digest com um commit Git**.

| Nº | Gate oficial | Resultado | exitCode |
| --- | --- | --- | --- |
| 01 | RegressionSetup | PASS | 0 |
| 02 | Unit | PASS | 0 |
| 03 | Integration | PASS | 0 |
| 04 | Migration | PASS | 0 |
| 05 | Contract | PASS | 0 |
| 06 | R1 | PASS | 0 |
| 07 | Build | PASS | 0 |
| 08 | Typecheck | PASS | 0 |
| 09 | Lint | PASS | 0 |
| 10 | E2E | PASS | 0 |
| 11 | Https | PASS | 0 |
| 12 | Deletion | PASS | 0 |
| 13 | Ihfr | PASS | 0 |
| 14 | Bootstrap | PASS | 0 |
| 15 | SchemaAudit | PASS | 0 |

- Logs do mesmo run: **223 testes E2E gerais PASS; 6 testes IHFR dedicados PASS; HTTPS 2 PASS; exclusão de contas 3 PASS; Bootstrap 14 migrations no PostgreSQL17 sintético isolado e 0 falhas**. Lint: PASS com dois warnings preexistentes, sem erros. O E2E inclui rotas e teclado UI036, ordenação por instante/offset, ausência de score fictício e verificação de palavras completas em 320px/texto200; o IHFR verifica expansão por teclado, rótulos experimentais, proveniência e visibilidade integral ao rolar em 667x375/texto200.

### Inventário autenticado de viewport — **FullStack**, não Lovable

Auditadas **77 duplas PNG + `-viewport.json`** nos caminhos `.accounts-validation/frontend-collections/` (34) e `.accounts-validation/frontend-ihfr/` (43) do ZIP oficial. Em **todas as 77**: `head=CODE_SHA_TESTED`, `fullPage=false`, `physicalDevice=false`, PNG par existente, `documentWidth<=width`; 24 têm `textScale=200`. São screenshots **sintéticos do FullStack renderizado em Chromium**, com mascaramento de controles quando pertinente; não representam dispositivo físico nem comparações entre projetos. Não extrapolar os 77 estados para uma execução de leitor de tela.

| Recorte / proveniência da imagem | Viewports/estados comprovados no FullStack | Lovable com fixture/viewport equivalentes |
| --- | --- | --- |
| Área / `frontend-collections-area-*-viewport.json` | 320, 375, 390, 768, 1440; 320x900/texto200; ordens e ações próprias do teste UI036 | **NOT_RUN** |
| Detalhe / `frontend-collections-detail-*-viewport.json` | 320, 375, 768, 1440; 320x900/texto200 e 844x390/texto200, antes/depois do recorte do teste | **NOT_RUN** |
| IHFR resultado / `frontend-ihfr-result-*-viewport.json` | 320, 375, 390, 768, 1280, 1440; estado diagnóstico vigente da fixture IMP-006 | **NOT_RUN** |
| IHFR qualificadores/proveniência / `frontend-ihfr-qualifiers-*-viewport.json`, `frontend-ihfr-provenance-*-viewport.json` | 320x900/texto200, 667x375/texto200, expansão, rolagem/foco, proveniência; 667x375 tem área útil rolável de 197px entre header/nav | **NOT_RUN** |
| Gestão IHFR / `frontend-ihfr-management-*-viewport.json` | 320, 375, 667x375/texto200, 768, 1440; observação/confirmar/ações; inputs mascarados | **NOT_RUN** |

Exemplos completos de pares no ZIP:

- `.accounts-validation/frontend-collections/767ebb4efbb5-r0-n0-frontend-collections-area-320-900-200.png` e sufixo `-viewport.json` (320x900, `rootFontSizePx=32`, `textScale=200`, `documentWidth=320`; CTA “Dados ambientais” preservado sem divisão interna de palavra no E2E).
- `.accounts-validation/frontend-collections/767ebb4efbb5-r0-n0-frontend-collections-area-1440-900-100.png` + JSON (1440x900, lista de coletas por ocorrência, dois cards, resumo sem IHFR).
- `.accounts-validation/frontend-collections/5533cd23518e-r0-n0-frontend-collections-detail-1440-900-100.png` + JSON (composição de detalhe e painel IHFR; formulário protegido/mascarado).
- `.accounts-validation/frontend-ihfr/4d6210392ee8-r0-n0-frontend-ihfr-qualifiers-667-375-text200.png` + JSON; `...-qualifiers-end-667-375-text200` registra a rolagem para os rótulos finais; E2E exigiu `toBeInViewport({ratio:1})` para cada qualificador.

### Comparação de referência estática ≠ bilateral executada

- **Lovable histórico**: os PNGs `referencias/lovable-area.png` (Git blob `d69c8861d832e98572f67bc9c2fe2262d4c48b22`) e `referencias/lovable-coleta-confirmada.png` (blob `72356a9b2889a14489f926c073ad18ae2633522c`) são de Pedro na PR #44, sem SHA, viewport ou estado executado comprovados. O starter **source** `HidroFlorestaStartup/hidroflorestas-frontend-starter@cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` foi consultado estaticamente (README/package: TanStack Start/Router, Bun 1.3.11, `mockApi`/IHFR simulados); não foi executado.
- **Diferença estática observável, ainda não qualificada**: a referência histórica de área usa lista compacta de linhas, enquanto o FullStack B usa cartões responsivos com ações explícitas (Abrir coleta/Dados ambientais/IHFR) e bloco de origem do último IHFR. O detalhe usa cartões em duas colunas nos dois materiais, mas os dados, as dimensões e os estados de execução diferem; não é possível medir paridade por pixels, geometrias, foco ou ações a partir desses materiais desconexos.
- **Mapa de diferenças**: (a) arquitetura TanStack/mock versus Next.js/auth/DB: divergência **aceita de arquitetura**, sem importação de personas/scores/mocks; (b) lista compacta versus cards FullStack: **REVIEW_VISUAL_PENDING**, não classificada como defeito ou aceita por equivalência; (c) shell/nav de A versus área de B: **QA_INTEGRADA_PENDING**, sem incorporar HEAD A nem usar screenshot B para certificar composição futura; (d) ausência de evidência Lovable executada: bloqueio **ALTO** para declarar `B_VISUAL_BILATERAL_PASS`.

### Impedimento exato, QA e status por tarefa

Nesta sessão a API GitHub e o arquivo de CI estavam acessíveis; o ambiente local só continha um ZIP antigo com HEAD `007-ihfr-evolution` e não os dois repositórios nos SHAs atuais; `bun` está indisponível e a resolução DNS para `github.com` falhou. Nenhum navegador Cloud Browser/checkout do starter foi controlado aqui. Portanto **não houve execução bilateral de starter e FullStack com mesma fixture/viewport**, nem novas capturas Lovable, nem teste físico; não operar hosting/deploy para superar esse bloqueio. **`B_VISUAL_EVIDENCE_PENDING`** / T008, T016 `[ ]`, `NOT_RUN`.

T009/T015/T023 **`[x]`** pela reconciliação do journal real no **CODE_SHA_TESTED**; T017 **`[x]`** pela documentação/atualização de PR publicada. Integridade do ZIP, fonte SHA, 77 capturas e análise de ownership revisadas sequencialmente por um executor, sem revisão independente simulada. A integração do shell A requer validação futura em composição autorizada; **não se transfere** a CI verde de B a A/C ou à composição. `LOCAL_WORKTREES_NOT_OBSERVABLE`; `NATIVE_SUBAGENTS_NOT_AVAILABLE`.

**DOC_HEAD distinto:** commit que edita apenas os quatro documentos `specs/036-ajustes-area-coletas-ihfr/{spec,plan,tasks,implementation-evidence}.md`; a PR #47 registra seu SHA após push. Se um workflow disparar neste DOC_HEAD, seu resultado será reportado como execução nova (não inferido da Action 41252813575). Nenhum merge, deploy, migrations hospedadas, SMTP, Cloudinary, geocodificador, alteração científica, aprovação humana ou revisão de terceiro foi efetuado.

## CLOSE-PARALLEL-02 / B — instrumentação implementada, runtime pendente

Agente nativo real `/root/b_visual`; ownership exclusivo `qa/hf-ui044/domain{,-fixtures}.ts` e esta
reserva036. Base6c61056f, pacote22bb9c1b, startercbb954a; nenhum arquivo de produto alterado.

`B_VISUAL_READY_FOR_RUNTIME`: [grade](evidence/close02-matrix.json), [plano](plan.md),
[análise de comparação e seu estado](evidence/close02-comparison.md).75pares planejados e76testes
descobertos pelo Playwright local. Apenas sintaxe/lint/discovery executados; execução real domínio,
PNG integrado e comparação visual desta continuidade ainda NOT_RUN. Não herdar15/15 de6c61056f.

Diferenças estáticas a conferir no runtime: starter ordena pela confirmação e não possui resumo CURRENT
na área (EQ-B1); score/decomposição são demonstração predefinida (EQ-B2); referência perde registros
criados no reload. Registrar NON_EQUIVALENT por caso, sem classificar como erro do harness ou aprovação.
Fonts UNOBSERVED provocam INSUFFICIENT_EVIDENCE, não fallback assumido nem PASS de completude.

Os casos preservam texto200, ratio1, foco/hit-testing, quatro qualificadores científicos e prova de
ordem/origem/ausência reais. Não se registram payload científico, cookie, token ou segredo. Dados
sintéticos imutáveis permanecem só até descarte do runner owned; cleanup lógico e Stop físico têm
recibos separados. Sem ferramenta global instalada no host e sem provedor real/alteração científica.

### R1 — setup UI-B executado com FAIL, pares não iniciados

[Run41351237110/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41351237110),
source194e9afafc0e4dbfeb6d9ceb9ca5030565ba6920, job124982006393, artifact13101154606:
FAIL no beforeAll,75casos NOT_RUN,0PNG. ZIP local auditado por B: SHA256
fc05f5e8fcfb36a77a834a08a1cc978d273c69a49c9c3e0c3dd1d4177cb85643 eCRC PASS.
Nenhum caso recebeu PASS herdado. Causa reproduzida: label obrigatório do starter
inclui asterisco aria-hidden que impede getByLabel exato sem esse texto.
Reparo focal usa getByRole textbox/nome acessível exato; contraprova Chromium sintético
RED/GREEN em `evidence/close02-reference-label-check.json`. Sem mudança de timeout,
starter/produto ou banco local. Matriz e análise visual continuam pendentes de nova rodada.

### R2 — matriz executada com evidência parcial e sumário FAIL

[Run41353270282/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41353270282),
source d62fb08cf65aca5dc704231f88594030f49279cb, artifact13102906085. Digest
099d491c57c473222065b4ce8f3b51630f19652840a48fc46289837c8d969548/CRCverificados porB;
147entradas,71PNG;75casos,1PASS/74FAIL. Um par completo;74starterfalharam em navigateDomain;
cinco também falharam no FullStack ratio1. Sumário obrigatórioFAIL; coleta de75testes não
equivale a75PASS de requisito. Sem UI06_B_EVIDENCE_COMPLETE.

Delta mínimo paraR3: navprincipal da referência nomeado explicitamente (colisão com breadcrumb
demonstrada em Chromium), readiness oficial antes do scroll de qualificadores (mecanismo focoRAF
reproduzido sinteticamente; atribuição individualR2 aindaINFERENCIA), diagnóstico seguro de falhas.
Nenhum assert, timeout, produto, starter, sharedhelper ou configuração alterado porB.
Contraprovas e análise parcial de imagens em evidence/close02-round2-counterexamples.json e
evidence/close02-comparison.md. TSC/lint/discovery/diff locaisPASS; runtimeR3 pendente.

## Ciclo C1–C3 — 05/11/2026

O recorte vigente usa B=`7bae1f87cb8d6a708b7c4de0b990e82e5a503369`, com decisão pinada em `71b8c95b7d1d1509b7155a36d65f70289c0a39f3`. [Índice e recibo O0](evidence/ui044-correcoes-finais-20261105/readme.md). Históricos acima conservados por SHA; nenhum PASS é herdado.

O0 reconfirmado com três agentes reais, três prints por hash, governança/skills/Spec036 e guias Next16.3.8. Pré-requisitos e setups Spec Kit: exit0, estado local restaurado. P01/P02/P03 liberados com ownership/worktrees separados; P00 guarda config/spec/publicação. Resultados do produto, composição, CI15 e reviews dependem das evidências novas listadas no índice e do recibo final na PR.

O artefato histórico13451261604/run42101827226/1, código febee101aa, foi baixado e teve SHA-256 `eb191c2f7ef4655c99838be71831d484df4e124ef708cba76c1ec9ecc0606e1e` recalculado. Serve apenas de baseline equivalente quando estado/viewport correspondem. Não é prova desta correção. Merge/deploy e homologação operacional/científica continuam fora desta execução.

Onda1 composta por P00: recibos P01/P02/P03 e hashes/preimages em [composition-progress.json](evidence/ui044-correcoes-finais-20261105/composition-progress.json). Localmente, 17/17 unidades focais PASS, typecheck integral PASS e lint PASS (dois warnings anteriores), com identidade por hash de cada arquivo técnico no [recibo local](evidence/ui044-correcoes-finais-20261105/p00-local-validation.json). RED anterior dos novos testes preservado: seis falhas funcionais em B, duas situações já corretas. Não se soma a repetição desses testes por workers.

A guarda exata antes de publicar está comprovada em [p00-guard-check.json](evidence/ui044-correcoes-finais-20261105/p00-guard-check.json). As demais configurações são semanticamente idênticas a B. Browser/RC15/Codex/P04 terminal continuam pendentes e serão registrados por F/run/attempt na PR; não são inferidos dos checks locais.

F1 teve FAIL real de escopo no E2E US4; [recovery-f1.json](evidence/ui044-correcoes-finais-20261105/recovery-f1.json) preserva run/attempt, digest/CRC do ZIP e os quinze estados (9 PASS, 1 FAIL, 5 NOT_RUN). O reparo de P03 foi auditado por P04 não autora e passou em typecheck/lint local. Produto/CI/guards permanecem iguais a F1; os resultados do SHA sucessor dependem de nova RC oficial.

F2 `3a3a9cf65dd09a9cc2e1ad5c63d4c761e2a52d06` passou 12 gates, inclusive E2E geral 241/241, e falhou em Ihfr por quatro timeouts na espera do helper UI044; dois casos Ihfr passaram. Bootstrap/SchemaAudit não executaram. [Recibo F2](evidence/ui044-correcoes-finais-20261105/recovery-f2.json): artifact 13470862110 com digest/CRC verificados, matriz parcial 7/23. A investigação causal e o reparo pertencem a P03, com contra-análise de P04; não se atribui PASS geral às capturas parciais.

A instrumentação da espera F2 foi revisada sem autoria em [p04-f2-diagnostic-review.json](evidence/ui044-correcoes-finais-20261105/p04-f2-diagnostic-review.json). [Recibo P03](evidence/ui044-correcoes-finais-20261105/p03-f2-diagnostic-receipt.json), [fontes e resumo das provas sintéticas](evidence/ui044-correcoes-finais-20261105/p03-f2-diagnostic-probes.json) e [checks do integrador](evidence/ui044-correcoes-finais-20261105/p00-f2-diagnostic-local.json) qualificam somente o instrumento. A chamada oficial e os casos permanecem. A causa F2, a recuperação funcional e O3 continuam pendentes.
