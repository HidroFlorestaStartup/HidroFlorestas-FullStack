# HF-UI-044-CLOSE-A5 — recuperar a CI da Frente A e finalizar a evidência UI-06

**Ambiente:** ChatGPT Work/Pro com GitHub/GitHub Actions e, para comparação visual, execução real dos dois projetos. **Owner exclusivo:** Frente A, Spec 035, PR Draft #46, branch `feat/ajustes-navegacao-conta`. **Começar agora.**

**Checkpoint observado:** `e52763b8483b8a3376e3408cb04eb43b1b54370e`. [Actions #41253192621](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41253192621), tentativa 1, `completed/failure`. Doze gates iniciais PASS até Deletion (inclui 228 E2E gerais); `Ihfr=FAIL` (2 cenários), `Bootstrap/SchemaAudit=NOT_RUN`. Este é o estado comprovado, não um comando para repetir ou reverter commits.

## Fontes de autoridade e preflight — obrigatório

1. Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`. Leia `AGENTS.md` aplicáveis, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, PRD Code-First e as skills `speckit-*` realmente instaladas.
2. Leia integralmente as decisões de Pedro no [handoff #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), mais `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json` nesse SHA. Os sete ajustes UI-01–UI-07 estão aprovados; REV-01–REV-03 não.
3. Consulte o [handoff G0 completo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2/docs/plans/active/hf-ui044-g0/handoff-de-execucao.md), as PRs #45–#48 e as specs 035–037 nos HEADs **novamente observados**. `GUARD_SHA=07755822f5dc75fe2be1d924005d30ed99f64a0b`, `development` histórico `9b8595d232842d401ce81bbc92c54dd543aa2829`. Não trate SHAs históricos como alvo de reset.
4. Antes de editar, examine branches/upstreams, histórico/ancestralidade, worktrees e alterações não commitadas no ambiente que realmente controla, PRs/commits concorrentes, scripts e o banco sintético permitido. Conserve todo trabalho alheio. Se não puder observar máquina local, diga `LOCAL_WORKTREES_NOT_OBSERVABLE`; não invente preflight.
5. Use Spec Kit **ANALYZE → PLAN → IMPLEMENT → REVIEW** conforme o recorte; não crie nova numeração se a spec já existe. Delegue subagentes **apenas** se houver ferramenta real; caso contrário `NATIVE_SUBAGENTS_NOT_AVAILABLE`, sem revisão independente simulada.

## Limites invariantes

Não executar merge, auto-merge, deploy, promoção, alterações em `main`/`development`/PR #44, Neon, migrations hospedadas, SMTP real, Cloudinary, ativação de geocodificador, nem mudança científica. Não absorber `feature/automated-setup`; não editar `vercel.json` ou `.github/workflows/rc-review.yml` em branches funcionais. Preservar autenticação/autorização, drafts vs confirmados, idempotência, quatro qualificadores do IHFR experimental e os quinze gates sintéticos. `PASS`, `FAIL` e `NOT_RUN` são por **SHA, run e tentativa**, nunca herdados. Sem aprovação humana fictícia.

## ANALYZE

- Releia o journal, o log de IHFR e o artefato `13061594715` do run A4. Separe os achados atuais dos HTTP 404 históricos do G0; não atribua automaticamente a causa à ciência/fixture.
- Reprodução **1:** `tests/e2e/ihfr-diagnosis-manage.spec.ts` apresenta divergência de `paddingBottom` no cenário de navegação/safe-area (valor relatado esperado 42, observado 40; confirmar no artefato bruto). Determine a regra visual correta pela geometria efetiva, viewport, texto a 200%, footer, safe-area, hit-testing e elemento focalizável; **não** altere o esperado para obter verde sem prova.
- Reprodução **2:** `tests/e2e/ihfr-diagnosis-read.spec.ts:46` exige `toBeInViewport({ratio:1})` dos qualificadores; pelo menos um ficou parcialmente visível (~0,967). Investigue scrollport, foco, altura do cabeçalho/barra inferior e geometria do disclosure em 667×375 com texto 200%.
- Reproduza em banco PostgreSQL sintético controlado, com caso focal RED antes de patch quando viável. Investigue códigos/capturas por SHA, não relatos de outra branch.

## PLAN e ownership

- Fixe hipóteses, causas demonstradas, arquivos de escrita e testes, com regressões do shell (mobile, conta, IAM, foco, teclado e consumidores), no `specs/035-ajustes-navegacao-conta/plan.md`.
- Writer A: `src/components/shell/**`, UI/estilos do shell já alocados à A, e seus testes, além dos documentos da 035. **B é writer da apresentação IHFR e do detalhe de coleta**; não edite `scientific-notice.tsx`, `experimental-diagnosis-summary.tsx`, testes ou arquivos exclusivos B sem acordo e alocação explícita do coordenador. Se a correção necessária for B, publique evidência reproduzível na #47 e deixe esse hunk bloqueado, avançando no restante.

## IMPLEMENT

- Corrija a causa verificada de reflow/scroll/foco/safe-area sem diminuir texto, ocultar conteúdo, relaxar `ratio:1`, inventar score/diagnóstico ou alterar contrato científico. Ajuste testes **somente** para uma expectativa funcional demonstravelmente correta, com contraprovas e justificativa.
- Atualize o checklist 035 (T007–T008, T013–T016, T019, T022 e dependentes), evidências e descrição/recibo do próprio PR. Preserve a trilha de FAIL anteriores.

## REVIEW e UI-06

- Execute testes focais sob ambiente sintético e **a suíte oficial de quinze gates no HEAD final** via runner original, sem mudar gates, permissões, timeouts, runner ou proteção de banco. Recolha `results.jsonl`, logs/PNG, run ID/tentativa e confira 15 registros únicos `PASS/exitCode=0`; se falhar, registre e continue reparos próprios seguros, não declare PASS.
- Execute **de verdade** o [starter Lovable](https://github.com/HidroFlorestaStartup/hidroflorestas-frontend-starter/tree/cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f) (somente leitura) e o FullStack A em estados/telas correspondentes, 320, 375/390, 768, 1440 px, zoom de texto 200%, paisagem 667×375/844×390, teclado/foco, Back/Forward/reload, com capturas `fullPage:false` e proveniência SHA/viewport/fixture/escala. Compare UX real, não screenshots históricas ou mocks como produto. Se não houver ambiente para rodar ambos, marque `UI06_BILATERAL_NOT_RUN` e não encerre T007 como PASS.
- Reconfirme ausência de mudanças alheias e diff exclusivo `GUARD_SHA...HEAD`/acumulado vs development atual. PR #46 permanece Draft.

**Saída obrigatória:** tabela de achados e reparos por arquivo; HEAD exato e PR; run/tentativa e 15 gates; provas reais de UI-06 ou bloqueio; checklist 035 reconciliado; status `A_CI_15_15_PASS` somente se comprovado e `A_UI06_EVIDENCE_PASS` separado; handoff explícito para QA de composição, sem merge/deploy.
