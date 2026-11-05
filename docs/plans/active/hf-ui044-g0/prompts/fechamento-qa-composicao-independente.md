# HF-UI-044-CLOSE-QA — revisão independente e composição controlada A+B+C

**Ambiente:** nova conversa com executor realmente distinto dos autores de A/B/C; ChatGPT Work/GitHub/GitHub Actions e ambiente descartável se disponível. **Início:** após A ter novo HEAD e resultado terminal, e após B/C congelarem handoffs factuais. Pode fazer inspeção estática read-only antes disso. **Ownership:** revisão e testes isolados; NÃO editar branches/PRs funcionais nem arquivos compartilhados.

**Fontes iniciais observadas**: guards `07755822f5dc75fe2be1d924005d30ed99f64a0b` (#45), A `e52763b8483b8a3376e3408cb04eb43b1b54370e` (FAIL), B `d7586ab95c69c45211e463516080e741bbb3931a` (15/15 PASS), C `63925b3639f3eec1dd4bd737f7be7adb881c83eb` (15/15 PASS). **Reconsulte HEADs antes de qualquer conclusão; não congele esses valores como os finais futuros.**

## Fontes de autoridade e preflight — obrigatório

1. Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`. Leia `AGENTS.md` aplicáveis, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, PRD Code-First e as skills `speckit-*` realmente instaladas.
2. Leia integralmente as decisões de Pedro no [handoff #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), mais `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json` nesse SHA. Os sete ajustes UI-01–UI-07 estão aprovados; REV-01–REV-03 não.
3. Consulte o [handoff G0 completo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2/docs/plans/active/hf-ui044-g0/handoff-de-execucao.md), as PRs #45–#48 e as specs 035–037 nos HEADs **novamente observados**. `GUARD_SHA=07755822f5dc75fe2be1d924005d30ed99f64a0b`, `development` histórico `9b8595d232842d401ce81bbc92c54dd543aa2829`. Não trate SHAs históricos como alvo de reset.
4. Antes de editar, examine branches/upstreams, histórico/ancestralidade, worktrees e alterações não commitadas no ambiente que realmente controla, PRs/commits concorrentes, scripts e o banco sintético permitido. Conserve todo trabalho alheio. Se não puder observar máquina local, diga `LOCAL_WORKTREES_NOT_OBSERVABLE`; não invente preflight.
5. Use Spec Kit **ANALYZE → PLAN → IMPLEMENT → REVIEW** conforme o recorte; não crie nova numeração se a spec já existe. Delegue subagentes **apenas** se houver ferramenta real; caso contrário `NATIVE_SUBAGENTS_NOT_AVAILABLE`, sem revisão independente simulada.

## Limites invariantes

Não executar merge, auto-merge, deploy, promoção, alterações em `main`/`development`/PR #44, Neon, migrations hospedadas, SMTP real, Cloudinary, ativação de geocodificador, nem mudança científica. Não absorber `feature/automated-setup`; não editar `vercel.json` ou `.github/workflows/rc-review.yml` em branches funcionais. Preservar autenticação/autorização, drafts vs confirmados, idempotência, quatro qualificadores do IHFR experimental e os quinze gates sintéticos. `PASS`, `FAIL` e `NOT_RUN` são por **SHA, run e tentativa**, nunca herdados. Sem aprovação humana fictícia.

## Independência e método

- Não se apresente como revisão humana, revisão Codex ou subagente independente se não houver agente/tool realmente distinto do autor. Um novo chat que não produziu os commits pode entregar revisão técnica de autor distinto, identificando método e limitações. Inspecione código, suites, runs, diffs e modelos reais sem confiar apenas nas descrições dos PRs.
- Verifique ancestralidade `GUARD_SHA`, `development` então atual, mudanças exclusivas por path/hunk e arquivo compartilhado; preserve `vercel.json`, workflow e `docs/raw/**`. Confira riscos de semântica apesar de ausência de arquivos em comum, especialmente shell A ↔ área/IHFR B ↔ formulário/DTO C.
- Registre findings com gravidade, arquivo/linha, prova reproduzível e responsável; compare com os testes de autorização, drafts/confirmados, IHFR CURRENT/origem/offsets, CEP opcional e respostas assíncronas obsoletas.

## Composição sem merge

- Se houver runtime local/Work com dependências e banco sintético realmente disponíveis, monte **um checkout temporário e isolado** da base guard; aplique os diffs exclusivos dos três HEADs FINALMENTE conferidos sobre a árvore descartável (por exemplo, `git diff --binary GUARD_SHA <HEAD>` + `git apply --3way`, ou método equivalente inspecionável), documentando ordem, hashes e conflitos. Não executar `git merge`, `git push`, force, rebase dos autores, ou alterar `main`/`development`; não criar branch remota de QA sem prévia guarda `deploymentEnabled:false` autorizada **antes do primeiro push**.
- Use scripts oficiais e banco PostgreSQL sintético próprio. Teste jornadas integradas: login/shell → laboratório → áreas → coleta → ambientais/IHFR; última coleta sem diagnóstico e IHFR anterior; navegação mobile 320/375/390/texto200, safe-area, foco, Back/Forward e reload; área cadastrada com CEP opcional e três origens de coordenadas, falha do provedor sem bloqueio. Não acione provedores reais.
- Quando viável, rode CI/suíte equivalente dos 15 gates sobre a **árvore composta**, sem transferir os 15/15 PASS individuais para ela. Confirme imagens UI-06 comparáveis starter↔FullStack que os autores entregaram; se faltar, sinalize gate.
- Se a composição executável for inviável no ambiente real, entregue apenas avaliação estática e `COMPOSITION_RUNTIME_NOT_RUN`; descreva a dependência concreta, sem criar PASS fictício ou montar branch Preview arriscada.

## Publicação do parecer

- Em vez de editar branches A/B/C, publique **um parecer factual único** como comentário na PR #45 (e findings focais nas PRs afetadas apenas quando necessário), com SHAs reais do conjunto, testes/limites e matriz de critérios UI-01–UI-07. Não emitir `APPROVED` em nome de pessoa, não autoaprovar, nem atribuir peer-review a agentes simulados.
- Estados possíveis: `QA_STATIC_REVIEW_ONLY`, `QA_COMPOSITION_FAIL`, `QA_COMPOSITION_TESTED_WITH_LIMITS`, ou `QA_COMPOSITION_PASS` **apenas com execução real identificada**. Separar revisão técnica, prova de integração, aceite UX e validação científica.

**Saída:** link do comentário na #45, matriz com estado por UI, evidências por SHA, mapa de conflitos e ações por owner, status para coordenador final; nunca merge/deploy.
