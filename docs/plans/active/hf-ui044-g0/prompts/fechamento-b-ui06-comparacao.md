# HF-UI-044-CLOSE-B — comparação bilateral UI-06 e reconciliação da Spec 036

**Ambiente:** ChatGPT Work/Pro com GitHub e, se disponível, navegador/runtime de dois projetos. **Owner exclusivo:** Frente B, PR Draft #47, `feat/ajustes-area-coletas-ihfr`, Spec 036. **Pode iniciar paralelamente ao reparo A5.**

**Checkpoint observado:** `d7586ab95c69c45211e463516080e741bbb3931a`. [Actions #41252813575](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252813575), tentativa 1, `completed/success`, **15/15 PASS** (223 E2E gerais, seis IHFR dedicados). Preserve essa evidência; não reimplemente o que passou.

## Fontes de autoridade e preflight — obrigatório

1. Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`. Leia `AGENTS.md` aplicáveis, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, PRD Code-First e as skills `speckit-*` realmente instaladas.
2. Leia integralmente as decisões de Pedro no [handoff #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), mais `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json` nesse SHA. Os sete ajustes UI-01–UI-07 estão aprovados; REV-01–REV-03 não.
3. Consulte o [handoff G0 completo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2/docs/plans/active/hf-ui044-g0/handoff-de-execucao.md), as PRs #45–#48 e as specs 035–037 nos HEADs **novamente observados**. `GUARD_SHA=07755822f5dc75fe2be1d924005d30ed99f64a0b`, `development` histórico `9b8595d232842d401ce81bbc92c54dd543aa2829`. Não trate SHAs históricos como alvo de reset.
4. Antes de editar, examine branches/upstreams, histórico/ancestralidade, worktrees e alterações não commitadas no ambiente que realmente controla, PRs/commits concorrentes, scripts e o banco sintético permitido. Conserve todo trabalho alheio. Se não puder observar máquina local, diga `LOCAL_WORKTREES_NOT_OBSERVABLE`; não invente preflight.
5. Use Spec Kit **ANALYZE → PLAN → IMPLEMENT → REVIEW** conforme o recorte; não crie nova numeração se a spec já existe. Delegue subagentes **apenas** se houver ferramenta real; caso contrário `NATIVE_SUBAGENTS_NOT_AVAILABLE`, sem revisão independente simulada.

## Limites invariantes

Não executar merge, auto-merge, deploy, promoção, alterações em `main`/`development`/PR #44, Neon, migrations hospedadas, SMTP real, Cloudinary, ativação de geocodificador, nem mudança científica. Não absorber `feature/automated-setup`; não editar `vercel.json` ou `.github/workflows/rc-review.yml` em branches funcionais. Preservar autenticação/autorização, drafts vs confirmados, idempotência, quatro qualificadores do IHFR experimental e os quinze gates sintéticos. `PASS`, `FAIL` e `NOT_RUN` são por **SHA, run e tentativa**, nunca herdados. Sem aprovação humana fictícia.

## ANALYZE

- Inspecione `specs/036-ajustes-area-coletas-ihfr/{spec,plan,tasks,implementation-evidence}.md`, especialmente T008/T009/T015/T016/T017/T023, e artefato Actions `13062377832`. Distinguir capturas reais do FullStack dos screenshots de Pedro e do starter; a CI passada não comprova comparação bilateral.
- Reinspecione o HEAD A (#46) e sua condição no momento da execução, somente leitura, para prever impacto do shell na composição futura; não incorpore o código A na branch B.
- Reconcilie os critérios UI-02/03/04 (ordem por instante de campo, último IHFR vigente com origem, estados revogado/substituído, environmental draft/confirmado, qualificadores e acesso via teclado) com a matriz de aceitação da #44.

## PLAN / EXECUTE — foco em evidências reais

- Execute o starter em `HidroFlorestaStartup/hidroflorestas-frontend-starter@cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` somente leitura, e o FullStack na revisão B exata, com fixtures equivalentes; registre divergências entre TanStack e Next.js sem importar mocks, resultados simulados nem fazer migração de framework.
- Compare **área, lista de coletas, detalhe e painel IHFR** em 320, 375/390, 768, 1440 px; texto a 200%, paisagem (incluindo 667×375), foco/teclado, expansão/recolhimento, ações finais e ausência de overflow. Capture `fullPage:false`, mais metadados SHA, viewport, escala, estado e origem de cada imagem.
- Investigue diferenças com severidade e teste regressivo focal. Não altere A/shell, formulário C, schema, matemática/manifestos IHFR, guards ou workflows. Se a evidência exigir mudança funcional B, faça patch/teste em ownership B, rode suíte proporcional e CI oficial do novo HEAD antes de atribuir PASS; caso contrário **não reexecute** indiscriminadamente 15 gates já aprovados no mesmo código.
- Atualize `tasks.md` e `implementation-evidence.md` com o resultado terminal real de T009/T015/T017/T023, sem marcar T008/T016 se faltar execução bilateral. Marque apenas fatos comprovados. Atualize a PR #47 com estado atual no topo e histórico preservado, diffs e dependência dos guards.

## REVIEW / HANDOFF

- Confira integridade/proveniência dos arquivos de imagem e outputs, consumo de B pelo shell atual apenas como verificação read-only ou encaminhe à QA integrada. Nunca apresente screenshot do starter como comportamento do produto.
- Se executar somente documentação, identifique **`CODE_SHA_TESTED`** e **`DOC_HEAD`** distintos; se push documental disparar CI, leia resultado real do novo SHA e não atribua automaticamente sucesso anterior ao commit.
- Sem revisão humana simulada. Entregue `B_VISUAL_BILATERAL_PASS` apenas com provas completas; caso contrário `B_VISUAL_EVIDENCE_PENDING`, especificando precisamente o impedimento.

**Saída:** PR #47 atualizada, estado SpecKit por tarefa, mapa de capturas comparáveis, lista de diferenças aceitas/abertas, identidade de execução, SHA e CI (sem regressão de gates).
