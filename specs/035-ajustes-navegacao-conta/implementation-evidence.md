# Evidências — frente A / Spec 035

## Estado corrente A6 — evidência auditada em 01/11/2026

`EVIDENCIA_IMPLEMENTACAO`: análise e revisão do mesmo executor, sem revisão independente ou aceite simulado. Sem defeito próprio novo causalmente reproduzido; nenhum produto/teste ativo alterado. [Plano A6](plan.md), [registro verificável](evidence/a6-review.json), [proposta visual inerte](ui06-runtime-proposal.md).

| Identidade | Valor e limite |
| --- | --- |
| CODE_SHA_TESTED_A | `6f236bbe7b5f4d7f9718efaa2c334f7d1520e0a0`, A5 isolada |
| A5 run/attempt/artifact | [41268640475/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41268640475), [13068508529](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41268640475/artifacts/13068508529) |
| A5 ZIP / journal SHA256 | `a92859386fe798f6c88d1b2e87c14b438f13e15226b19e6db87a8dd8a8de8971` / `99c4f87059b303473e322b065467501fee341548f7a1339923ec0e8b2ddb7265`; bytes baixados e CRC conferidos |
| A5 snapshot | `30c9e37b02c4eb8368dad710d82bb30ba39cdb2f88230fef6daead310280d502`; fingerprint dos testes, não commit/tree |
| A5 terminal | 13 registros: 12 PASS, Ihfr FAIL/exit1 (5 E2E IHFR PASS/1 FAIL); Bootstrap/SchemaAudit ausentes = NOT_RUN; E2E geral 228 PASS |
| CODE_SHA_TESTED_COMPOSITION | `6c61056fe1dc2193e225d935f49b78cb6c6781ed`, pai único GUARD; não descende do HEAD A |
| Produto A+B+C | árvore `a585087dbbe9294c18922e3397c2561f245446c9`, 63 paths exclusivos dos autores |
| Árvore operacional | `f40b4e8c0217311869dc5336e4fc15c7176df7a5`, dois overlays `.github/workflows/rc-review.yml` e `vercel.json`, SHA256 do overlay `b6cad811b12b22c5ea1d5fe54201336a73a2a04bd739a5063b74289810559ba3` |
| Composição run/attempt/artifact | [41275910130/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130), [13071771510](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130/artifacts/13071771510) |
| Composição ZIP / journal SHA256 | `7d1a588c60f614515b2d97169479df5b392c8cad6c160978e68225fafdc90c16` / `810a76ea02d6fefa2e9c1dbf0d168ab7dd5c50a5c104bac30e6263c5267cb8d8`; digest oficial = bytes baixados, CRC PASS, 771 entradas/468 PNG |
| Composição snapshot | `de403fffef4a88b505eada85225b785422231f7f7392bd40a56b0bc8a2ba8c40`; constante nos 15 registros únicos PASS/exit0 |
| Recibos antes/depois | `.accounts-validation/hf-ui044-composition.log`: refs, SHA, 63 paths e árvore a585/f40b; `hf-ui044-composition-after.log`: f40b e worktree/index inalterados no runner. Extraídos e lidos nesta auditoria |
| DOC_HEAD_A6 | commit documental de A identificado no recibo de publicação da PR #46; não recebe PASS de A5/composta. Qualquer run automático novo é associado ao seu próprio SHA |

Gates compostos, na ordem do journal: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Todos PASS/exit0; logs correspondentes presentes. E2E 235 e Ihfr 6 PASS, conjuntos sobrepostos, sem soma como testes únicos. O desenho de QUATRO arquivos em `hf-ui044-close-qa-actions-prepare/control-candidate.patch` é outra proposta e não foi executado por esse run. Seus comandos não foram executados por A6.

### Matriz requisito → fonte/árvore → teste → execução → resultado/limitação

| Requisito | Fonte/árvore | Teste / prova | Run/tentativa → artifact | Resultado e limite |
| --- | --- | --- | --- | --- |
| UI-01 / FR-035-001, US1 | A5; blobs A preservados na composta | `hf-ui035-navigation.spec.ts`, workspace/dashboard/conta | A5 `41268640475/1` → `13068508529`; composta `41275910130/1` → `13071771510` | E2E geral 228/235 PASS respectivamente; contexto/Conta/OWNER/MEMBER exercitados; sem aceite humano |
| UI-05 / FR-035-002, US2 / SC-035-002 parcial | A5 e composta | E2E 035 safearea34, último controle/foco, histórico/reload; consumidores mobile | mesmos dois runs/artifacts | safe-area A5 corrigida, IHFR manage PASS; 42px exigidos para inset34. Cobertura textual/viewport conforme testes, não dispositivo físico nem todos os pares UI-06 |
| FR-035-003, US3 / parcelas bilaterais SC-035-001/002/003 | starter fixado + FullStack composto, ainda sem runtime duplo | T007/T015/T027; patch proposto separado | nenhum run/artifact bilateral | `UI06_RUNTIME_PENDING`, `UI06_BILATERAL_NOT_RUN`; não declarar UI06_BILATERAL_PASS |
| FR-035-004 / segurança e domínio | A5 e composta | testes auth/contrato/conta e E2E; sem mudança de políticas | mesmos runs/artifacts | Gates correspondentes PASS no recorte sintético; nenhuma inferência de ausência universal de bugs |
| FR-035-005 | diff A6 vs A5, guards herdados | paths de escrita limitados à Spec 035; CI/Vercel ativos intocados | revisão estática A6; sem artifact de runtime | PASS de escopo documental; patch dentro de Markdown/evidence é proposta inerte, não workflow instalado |
| SC-035-001 | US1/US2 exercitadas; US3 pendente | testes acima + comparação futura | mesmos runs; bilateral inexistente | requisito completo permanece PARCIAL/PENDENTE |
| SC-035-003 | capturas unilaterais próprias | PNG `fullPage:false`, geometria sem overflow, safe-area | mesmos runs/artifacts | Evidência FullStack disponível; bilateral e aceite ainda pendentes |
| SC-035-004 | journal A5 separado do composto | 13 registros A5; 15 compostos | mesmos runs/artifacts | revisão/registro executados; PASS isolado 15/15 NÃO atingido; PASS composto limitado à candidata |
| Dependência UI-04 / B FR-036-003 | ScientificNotice A `sm:grid-cols-2` versus B/composta `grid-cols-1 ... lg:grid-cols-2`, demais ajustes B preservados | `ihfr-diagnosis-read.spec.ts:46`, ratio1 e qualificadores completos | A5 FAIL; composta Ihfr6 PASS nos runs/artifacts acima | A5 ratio `0.9667754173278809`; composta 667×375/text200 PASS, sem reduzir ratio/fontes. Não trocar ownership nem inventar correção shell |
| UI037 / QA-04 | fonte C e upload composto | `hf-ui037-location.spec.ts` grava PNG/JSON via outputPath; inventário ZIP | `41275910130/1` → `13071771510` | zero entradas dedicadas `frontend-areas-hf-ui037-location-*`; `UI037_CAPTURE_PENDING`, independente dos testes CEP PASS |

### Revisão individual das tarefas

| Tarefa | Trabalho executado / fonte | Marcação A6 e requisito |
| --- | --- | --- |
| T008 | A5 teve execução oficial fail-fast, journal e artefato auditados | [x] execução/registro concluídos com FAIL; sem aprovação 15/15 isolada |
| T013 | revisão A2 registrada no histórico: `41251125020/1`, SHA `68782c9b1e913841949efddcf7a671933a588146`, artifact `13061886214`, E2E 220 PASS/5 FAIL/3 NOT_RUN | [x] revisão terminal realizada; FAIL histórico preservado. A6 não baixou novamente esse ZIP histórico |
| T016 | estados finais e bloqueios reconciliados nos quatro documentos e PR #46 | [x] atualização documental; publicação identificada pelo recibo remoto |
| T019 | A3 `41252699370/1`, SHA `8b9a60c3ff36f7ab80ef58eb8d035b71a2d60822`, artifact `13062425992`: Build FAIL TS2365, E2E NOT_RUN | [ ] validação exigida no SHA A3 não atingida; PASS posterior não apaga esse evento |
| T022 | A4 `41253192621/1`, SHA `e52763b8483b8a3376e3408cb04eb43b1b54370e`, artifact `13061594715`: 12 PASS, Ihfr FAIL, 2 NOT_RUN | [ ] critério conjunto de PASS do HEAD A4 não atingido, apesar de Build/Typecheck/E2E PASS |
| T026 | A5 `41268640475/1` auditada terminalmente, incluindo dependência B e capturas; composta conferida separadamente | [x] revisão/recibo executados com FAIL isolado; requisito de PASS isolado e decisão de integração continuam pendentes |
| T007 / T015 / T027 | nenhum par starter/FullStack executado nesta missão | [ ] cada uma permanece aberta; proposta não é evidência |

T014 permanece aberta como revisão específica do corte A2; capturas posteriores não são substituição automática da sua evidência histórica. Marcação [x] de revisão não significa requisito aprovado nem fechamento da feature.

### Capturas compostas inspecionadas e limite causal

Visualizados do ZIP composto os PNGs 667×375 `frontend-ihfr-qualifiers-end-667-375-text200` e `frontend-ihfr-landscape-text200-safearea34`, com JSON correspondente (rootFontSize32, escala200, head6c61056f e fullPage:false). O primeiro mostra o qualificador final; o teste rola cada qualificador separadamente, não exige os quatro simultâneos na foto. O segundo mostra Criar diagnóstico e foco acessível acima da barra. Fonte/teste A5 preserva padding42 para inset34. Testes IHFR A/B foram comparados somente leitura; B também ajustou fixture/rota, sem transportar arquivos para A.

`EVIDENCIA_IMPLEMENTACAO`: a falha isolada A5 é no qualificador de ScientificNotice; o teste de safe-area/gestão não falhou nessa execução. `INFERENCIA` limitada: esse conjunto é compatível com a dependência de legibilidade já corrigida por B e com a contraprova composta; não prova ausência de outros defeitos nem atribui retrospectivamente causa aos 404 G0.

### Handoff QA/C — UI037_CAPTURE_PENDING

`EVIDENCIA_IMPLEMENTACAO`: `hf-ui037-location.spec.ts` escreve `frontend-areas-hf-ui037-location-{mobile,desktop}.png` e JSON em `TestInfo.outputPath`, sem cópia persistente; o upload executado em rc-review.yml cobre `.accounts-validation/frontend-areas/*`, mas não `test-results/**/frontend-areas-*`. O runner inicia outras suítes Playwright depois do E2E principal (Https/Deletion/Ihfr). A [documentação Playwright](https://playwright.dev/docs/api/class-testconfig#test-config-output-dir) confirma limpeza de outputDir no início de execução. A cadeia torna um glob tardio potencialmente insuficiente; não foi observada diretamente a remoção dos arquivos entre suítes e não se afirma que ela ocorreu.

**RECOMENDACAO de patch à QA/C, sem editar seus arquivos por A:** copiar PNG+JSON para `.accounts-validation/frontend-areas/` imediatamente após cada captura (ou preservar entre E2E e a próxima suíte), manter upload dos dois tipos a partir do arquivo persistente e conferir o ZIP final. Critério obrigatório: mobile390×844 e desktop1440×900, PNG e JSON presentes, `fullPage:false`, mascaramento, estado sintético, SHA/tree/run/attempt, escala/fonte e hashes. Preservar as mesmas provas após outra execução Playwright. Um glob acrescentado apenas ao upload final não encerra QA-04. Encaminhamento factual publicado em #45 para coordenador/QA/C; sem alegar resposta ou aceite desses owners.

Hunk mínimo de arquivamento encaminhado ao writer C/QA (não aplicado por A); os nomes duráveis abaixo já casam com os globs executados de PNG e `*-frontend-areas-*-viewport.json`:

```diff
--- a/tests/e2e/hf-ui037-location.spec.ts
+++ b/tests/e2e/hf-ui037-location.spec.ts
@@
-import { writeFile } from "node:fs/promises";
+import { copyFile, mkdir, writeFile } from "node:fs/promises";
+import { join } from "node:path";
@@
     await writeFile(meta, JSON.stringify({ case: "geocoded-map", viewport: { width, height }, fullPage: false, maskedInputs: mask.length, source: "Playwright-synthetic-UI037" }, null, 2) + "\n");
+    const durable = join(process.cwd(), ".accounts-validation", "frontend-areas");
+    await mkdir(durable, { recursive: true });
+    await copyFile(png, join(durable, "ui037-" + name + "-viewport.png"));
+    await copyFile(meta, join(durable, "ui037-" + name + "-viewport.json"));
```

O owner deve ainda completar a proveniência JSON exigida acima (o JSON atual não contém SHA/tree/fontes) e comprovar os quatro arquivos no ZIP posterior à próxima suíte. Este hunk isolado não concede VERIFIED.

Referências técnicas conferidas: [ratio da interseção](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-be-in-viewport) (ratio1 preservado) e [breakpoints mobile-first](https://tailwindcss.com/docs/responsive-design). Não enfraquecer fonte, qualificadores, asserts ou segurança.

**Estados finais separados:** `UI06_RUNTIME_PENDING`; `UI06_BILATERAL_NOT_RUN`; `UI037_CAPTURE_PENDING`; `HUMAN_ACCEPTANCE_PENDING`; `GEOCODER_OPERATIONAL_PENDING`. IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`. Sem merge/deploy/release, B/C/main/development/#44, banco hospedado, SMTP/Cloudinary/geocoder reais, ciência ou REV-01–REV-03.

## Histórico anterior à reconciliação A6

As afirmações temporais abaixo pertencem aos respectivos checkpoints; o estado corrente é o A6 acima. Relatos antigos de CI pendente, ambiente não observável e ferramentas indisponíveis não descrevem esta sessão.

Data: 2026-10-31. Estado histórico: PREPARACAO_G0; adendo abaixo: código e testes da frente A preparados, validação funcional ainda pendente do HEAD final.

Base exata: `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem: `9b8595d232842d401ce81bbc92c54dd543aa2829`. Branch: `feat/ajustes-navegacao-conta`. Guards herdados antes da primeira publicação. PR alvo: development; dependência de integração #45.

G0 adiciona somente spec.md, plan.md, tasks.md e este registro no diretório 035. Nenhum arquivo de produto/teste funcional modificado. Fonte de decisões: #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

| Verificação | Estado deste corte |
| --- | --- |
| Guardas estáticas | PASS no pacote G0, mesmos blobs herdados |
| Implementação e testes próprios A | NOT_RUN / NAO_IMPLEMENTADO |
| Quinze gates no HEAD A | Não observado ainda neste commit; consultar run real após publicação |
| Comparação visual atual | NOT_RUN |
| Revisão independente / aceite humano | NÃO REALIZADOS |
| Native subagents no G0 | NATIVE_SUBAGENTS_UNAVAILABLE |

O SHA deste commit e o número do PR são registrados no recibo de publicação, evitando hash autorreferente. O executor deve acrescentar eventos por SHA/run/tentativa, preservando este histórico. Capturas históricas e PASS de outros HEADs não validam a implementação futura.

## Adendo de execução A — fatos e limites

**EVIDENCIA_IMPLEMENTACAO / autoria de código:** os commits próprios A contêm o novo modelo de rotas, a remoção de Áreas sem laboratório, a substituição da navegação horizontal contextual por trilho lateral/rodapé móvel, o agrupamento Conta e o tratamento de foco sob a barra fixa. Os arquivos de teste contêm asserts de renderização/rotas/papel/viewport/safe-area. Nenhuma mudança em autenticação, serviços, persistência, ciência ou provedores.

**Baseline G0 real**, não herdado como validação do código novo:
- GitHub Actions [run 41216365650](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216365650), tentativa 1, `head_sha=55e00b531c9691c1b568fc83e86c0ccf176430fd`, `status=completed`, `conclusion=failure`.
- Job validate 124581672069: checkout/install PASS; validação FAIL; upload do artefato `rc-validation-55e00b531c9691c1b568fc83e86c0ccf176430fd` (ID 13048962053, ZIP digest `ec6ff3ba3bf0a600a771ab5599651cc6706ed5a87066aa045377c71895e79925`) PASS.
- Logs do baseline: Build PASS, Typecheck PASS, Lint PASS (dois avisos preexistentes), E2E 220 PASS, HTTPS 2 PASS, Deletion 3 PASS, IHFR **FAIL: seis E2E** de `ihfr-diagnosis-manage.spec.ts` e `ihfr-diagnosis-read.spec.ts`. O runner parou com exitCode 1. Causa dessas falhas não determinada; não foram reparadas nesta frente de shell.
- Nenhum desses PASS valida o código A, pois precede os commits próprios.

**Autoridade dos estados:** checagem do código GitHub é evidência da edição, não da execução. No momento deste adendo, testes de A, Typecheck, Lint, Build, E2E atual e fifteen-gate final: NOT_RUN; a PR será atualizada com run/tentativa/resultado real após o push. Nenhuma screenshot produzida pela presente sessão de navegador foi afirmada; `tests/e2e/hf-ui035-navigation.spec.ts` captura `fullPage:false` em execução sintética real, com geometria e mascaramento, e o artefato de CI deve ser conferido antes de rotular PASS.

**Ambiente/custódia:** leitura e autoria realizadas via GitHub API, sem checkout fiel do HEAD/sem Node 24 + docs `node_modules/next/dist/docs` locais. Worktrees/upstreams/sujeira da máquina do usuário não observáveis. Não foi executado runtime do frontend starter. `NATIVE_SUBAGENTS_NOT_AVAILABLE` (nenhuma ferramenta de delegação nativa exposta nesta sessão); não se afirma revisão independente. Pré-validação estática de path/ownership e base via GitHub; hashes de commit final serão informados na PR.

**Diff pretendido:** exclusivo A contra `07755822f5dc75fe2be1d924005d30ed99f64a0b`; acumulado contra `development` observado em `9b8595d232842d401ce81bbc92c54dd543aa2829`. Reconciliar SHA atual antes da publicação. Dependência #45, sem merge.

### Contraprova estática de referência, distinta de runtime

`FATO_DOCUMENTADO`: inspecionado em `HidroFlorestaStartup/hidroflorestas-frontend-starter@cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`, `src/components/hf/AppShell.tsx` e `src/styles.css`: estrutura de header sticky, navegação lateral desktop, mobile fixed, foco adaptado ao rodapé e rótulos Resumo/Áreas/Mapa/Membros condicionados ao contexto. O starter usa `@tanstack/react-router` e um adapter de dados, cuja implementação não foi transportada. FullStack continua usando Next 16.3.8/App Router com autorização própria. Essa leitura **não é** screenshot nem teste visual executado; UI-06 T007 permanece pendente.

**Prova gerada pelo E2E novo:** PNG de viewport mascarada em `.accounts-validation/frontend-workspace/frontend-workspace-hf-ui035-*.png` e arquivo geométrico em `.accounts-validation/frontend-mobile-navigation/hf-ui035-*-geometry.json` (caminhos incluídos no upload dos artefatos do workflow). Evidência só é real após run concluído e arquivos observados, nunca por existência da instrução.

## Rodada de correção Spec Kit A2 — RED do HEAD d8951199

- **Fonte primária**: [Actions 41232069860](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41232069860), tentativa 1, `head_sha=d8951199baa88beddb930b2ce14e33b9848cbe18`, `conclusion=failure`; job `124628246334` validou 9 gates PASS (RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint), `E2E FAIL` (213 passed, 10 failed). Os outros 5: NOT_RUN pelo fail-fast.
- Artefato real `rc-validation-d8951199baa88beddb930b2ce14e33b9848cbe18`, ID `13054207847`, ZIP SHA-256 `9979305f73e4bde6a1480dfa5849d3a86171e2c30025e27434eaa4f9eac1ba05`; log `.accounts-validation/e2e-1793473472503.log`, journal `results.jsonl`, PNGs e geometria próprios.
- Falhas E2E: `account-verification-recovery.spec.ts` (1, disclosure Conta), `frontend-collections.spec.ts` (1, header intercepta hit tests em 844×390/text200), `frontend-dashboard.spec.ts` (2, transição com resposta pendente), `frontend-environmental-drafts.spec.ts` (1, mesma geometria header), `frontend-mobile-navigation.spec.ts` (2, wait de animações indefinido a 200%), `hf-ui035-navigation.spec.ts` (3, foco do último controle no mobile). Screenshots 320/text200 e 375 demonstraram sobreposição de rótulos no rodapé antes do reparo. Testes não foram reduzidos para obter verde.
- Código A2 e ajustes dos testes preparados no commit posterior a `d8951199`: contar como `EVIDENCIA_IMPLEMENTACAO` em repositório, **não** como validação passada. Novo run/screenshot não observado até publicação. A revisão independente por outro executor e execução do starter continuam NOT_RUN.

## Ciclo A3 — resultado A2 e reparos condicionados a nova prova

O [run 41251125020](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251125020), tentativa 1, HEAD `68782c9b1e913841949efddcf7a671933a588146`, concluiu `failure`. Artefato ZIP `13061886214`, SHA256 `e31022c2a51c031144d3172234a7d3d7f163f34d9bf42f42efea5f90272d0eee`. Journal: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck e Lint **PASS**; E2E **FAIL: 220 passaram, 5 falharam, 3 não executados**; Https, Deletion, Ihfr, Bootstrap e SchemaAudit **NOT_RUN**. A melhora em relação ao RED anterior (213 passou/10 falhou) não constitui aceite.

Achados A3, diretamente reproduzidos de log/geometria do artefato:

- `frontend-mobile-navigation.spec.ts` 320px/text200: `settleTransitions()` aguarda `Animation.finished` que pode ser substituído e não resolver; embora o loop tivesse limite, cada await individual era ilimitado. Reparado com uma janela finita de animação e dois frames, **preservando** as assertions de foco/visibilidade e leitura até o último controle.
- `frontend-territorial-map.spec.ts` 320x760/text200: JSON `df289a519daa-...last-area...obstructed-viewport.json` registra controle real `top=29.84`, `bottom=492.59`, header `bottom=74`, barra `top=629`, scrollport `scrollTop=5515`, `scrollPaddingBottom=320px`. O cartão estava *sob o cabeçalho* após `scrollIntoView({block:'center'})`, por espaçamento `10rem` inflado em 200%. Corrigido no **shell A** para padding calculado em px + safe-area, sem mudar o mapa nem seu teste de hit real.
- `hf-ui035-navigation.spec.ts` 320/375/390: diagnóstico `focus:false`, `scrollTop=0` na tentativa de `last.focus()`. A seleção anterior incluía o último botão desabilitado `Mais antigos`; controles desabilitados não são foco operável. O teste agora verifica último link/botão/campo **habilitado**, exige `toBeFocused()` e mantém teste de cabeçalho/rodapé sem sobreposição. A condição disabled da página não foi alterada.

Os reparos são autoria de código/testes, **não PASS**: é indispensável a Actions no novo HEAD com artefatos/geométricas. UI-06 bilateral starter x FullStack, revisão independente e aceite humano seguem NOT_RUN. Segurança, autorização, dados, fixtures, provedores, ciência e workflow não foram alterados.

## Red A3 → correção A4 de tipagem

**Prova real**: [Actions 41252699370](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252699370), tentativa1, HEAD `8b9a60c3ff36f7ab80ef58eb8d035b71a2d60822`, status `completed/failure`. Journal: seis gates PASS (`RegressionSetup`, `Unit`, `Integration`, `Migration`, `Contract`, `R1`); `Build FAIL` após compilação Next bem-sucedida, na etapa TypeScript: `tests/e2e/frontend-mobile-navigation.spec.ts(74,7): TS2365 Operator '<=' cannot be applied to types CSSNumberish and number`. Oito gates posteriores NOT_RUN. ZIP Actions `13062425992` SHA256 `5d5c032f30e94259e91866463dcbc150b1fa015e7c87b853b0b86b1fca39a124`.

**Reparo:** uso de variável `endTime` guardada por `typeof endTime === 'number'` antes de `Number.isFinite` e `<=1000` no teste de frontend mobile. Sem alterações em CSS, API, permissões, testes de domínio, fixtures ou CI. Este texto não comprova Build/E2E verdes da A4; requer novo run por SHA.

## Recibo factual A5 — diagnóstico e reparo de shell (01/11/2026)

- **Baseline bruto observado:** GitHub Actions run [41253192621](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41253192621), tentativa1, SHA `e52763b8483b8a3376e3408cb04eb43b1b54370e`, `completed/failure`; artefato `13061594715`, digest `sha256:82b3f7942deea9be3a8665cd155a631cc43947190124d47e9a85dcef60a8b3fb`. O arquivo `.accounts-validation/results.jsonl` tem doze `PASS/exitCode=0` (RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion) e `Ihfr FAIL/exitCode=1`. `Bootstrap`/`SchemaAudit` não constam: `NOT_RUN`. O E2E geral teve 228 cenários PASS; o IHFR teve 4 PASS e 2 FAIL, sem conclusão bem-sucedida.
- **Falha A, read-only teste B:** `ihfr-diagnosis-manage.spec.ts:90` reporta `expected=42/received=40` após override 34px. Causa CSS no shell A: `paddingBottom = 6px + 34px`. Patch A: mudar para `8px + env(...)`, compatível com o clearance já usado na barra global, mantendo toque/foco e fonte. Novo assert A em `hf-ui035-navigation.spec.ts` exige 42px com CDP real; resultado pós-patch ainda depende da Actions do SHA novo.
- **Falha B, não transferível:** `ihfr-diagnosis-read.spec.ts:46` reporta `ratio=0.9667754173278809` para qualificador de texto completo a 667×375/rootFont32px. Evidência própria do A4: `.accounts-validation/frontend-ihfr/*qualifiers-667-375-text200-viewport.json` com header bottom 74, `#application-content` top74/bottom375, `#application-navigation` top300.5/bottom375, sem overflow horizontal; PNG `fullPage:false` da mesma cena. Na árvore A, `ScientificNotice` ainda está em duas colunas `sm:grid-cols-2`; a Frente B já publicou ajuste para uma coluna em telas inferiores a `lg` em seu HEAD `d7586ab95c69c45211e463516080e741bbb3931a`, sem relaxar `ratio:1`. O shell A **não** edita `src/components/ihfr-diagnosis/**` nem `tests/e2e/ihfr-diagnosis-*.spec.ts`. Encaminhamento a #47 para revisão coordenada de composição.
- **Segurança/limites:** a reprodução original foi em PostgreSQL17 sintético de CI, Windows/Node24.19; sem ação em banco hospedado. `LOCAL_WORKTREES_NOT_OBSERVABLE`, `NATIVE_SUBAGENTS_NOT_AVAILABLE`; a execução de starter e FullStack no mesmo ambiente **não foi possível** nesta sessão GitHub API, portanto `UI06_BILATERAL_NOT_RUN`, T007/T015 não PASS. Sem aprovação humana, revisão independente, merge ou deploy.
- **Estado deste adendo antes do novo run:** apenas autoria de patch e assert A; todos os resultados do SHA novo são `NOT_RUN` até observação terminal por run/tentativa. A descrição/recibo da PR #46 será atualizada sem alterar mais o HEAD quando houver informação.

## CLOSE-PARALLEL-02 A — autoria executada, runtime integrado pendente

`A_HARNESS_READY_FOR_RUNTIME`: [handoff](evidence/close02-handoff.md),
[manifesto](evidence/close02-handoff.json) e [smoke real sintético](evidence/close02-local-smoke.json).
ContraprovaRED antiga16.2348px≠32; smoke3/3PASS no código9283f31, comNode24.14 local
eChromium153 existente, semDB. Tipo completo local e lintPASS após correçãoTS2783.
16layouts/86pares planejados (nãoexecutados) substituem monólito sem remover dimensões.
Todo o código novo está emqa/hf-ui044; nenhum produto/infra/B/C alterado porA.
CodeSHA do smoke9283f31 não herda15/15 da composição6c61056f. CI hospedada,
comparação bilateral, inspeção de imagens reais do produto e aceite humano permanecem
NOT_RUN/PENDING. T033 e tarefas bilaterais históricas seguem abertas.

### Adendo CLOSE02 — par incompleto tem evidência insuficiente

Correção local d27a1e6 deMEDIUM da QA: zero/um sample não é par comparável.
RED2/2FAIL provouPASS/COMPARABLE/PARTIAL anterior; GREEN5/5PASS provou
FAIL/INSUFFICIENT_EVIDENCE/PARTIAL no retorno eJSONL, com3smokes anteriores intactos.
Typecheckcompleto local/lint/whitespacePASS. [Recibo combytes testados e archives](evidence/close02-pair-repair.json).
Runtime hospedado corrigidoNOT_RUN; nenhum produto/config/push ou aceite afetado.

### Adendo CLOSE02 — nome acessível do laboratório da referência

Código local885b474 corrige exclusivamente o seletorA da criação delaboratório
nostarter; requiredmarkeraria-hidden impedegetByLabel exact no modelo observado.
ContraprovaChromiumRED1/1FAIL, GREEN6/6PASS, oldLabelMatches0 e
accessibleTextboxMatches1. Typesfull locais/lint/whitespacePASS.
[Recibo comfontes/hashes](evidence/close02-starter-label-repair.json).
Sem mudarprodutos/timeouts/config oupublicar; runtimeoficial corrigidoNOT_RUN.

### Adendo CLOSE02 — menuR1 reproduzido e reparado, runtime novo pendente

R1UIA41351237110/1/194e9af, artifact13101369298,ZIPdigestb9c5471d...:
3parescoletados/86 (2PASS/1FAIL),83NOT_RUN. PNGreal mostra menucortadoàesquerda.
DOMrealTSX/CSS emfixturesemNext/DB,Arialexplicitamenteobservado: RED3/6FAIL;
reparo containingblock deConta para grupoConta+Sair deuGREEN6/6.
Produto97204d7 efilename236f824 trazem6regressões oficiais035 executáveisnaAisolada.
HelperQA9ecfa5f: lifecyclepreservaerroprimário; máscara clippa ao scrollport sem
excluirinputstexto/senha.14smokesPASS12s, typesfull locais/lint/diffPASS.
[Recibo integral/geometrias/fontes/hashes](evidence/close02-menu-cleanup-mask-repair.json).
FonteArial sintética não éruntimePoppins; R1nãoqualificaárvorecorrigida. O histórico
contextclosed/cleanup permanece inconclusivo quantoàcausaprimária exataA.
Runtimecorrigido15gates/UI06oficial, imagemrealbarra eaceitehumano continuamNOT_RUN/PENDING.

### Adendo CLOSE02 — UI-A R2 real e instrumentação R3

UIA-R2/d62fb08:78PASS8FAIL/86;14IDs summary=uniãoFAIL+INSUFF, não14falhasdeproduto.
Menu corrigido real320/text200 inspecionado. Referênciaoculta main/foco em667/text200;
reloadcapturouLoadingnativo eassertnot-foundfixo impediareconfiguração. [Análise visual](evidence/close02-r2-visual-analysis.md).
ReparosQA86b6fd0+58440f7 preservamUNOBSERVED/INSUFFregional comqualificação explícita,
produto ratio1/hit, nativeLoading eescala16/32.19smokesPASS12.9s/tiposfulllocais/lint/diffPASS.
[Recibo/hashes/casos](evidence/close02-r2-analysis-r3-repair.json). R3hostedcorrigidoNOT_RUN;
CI/UI06completa/QA nãoautora/aceitehumano permanecem estadosdistintos.
