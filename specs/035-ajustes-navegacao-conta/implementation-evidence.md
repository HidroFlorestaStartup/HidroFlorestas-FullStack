# Evidências — frente A / Spec 035

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
