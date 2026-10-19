# Execução autorizada — fases 2 e 3 do frontend

Execute **as duas fases completas** no clone oficial do FullStack: **fase 2 —
Cadastro e conjunto de conta** e **fase 3 — Workspace e shell**. Este arquivo é
autossuficiente para o professor/outro desenvolvedor trabalhar com seu Codex,
sem o chat, o prompt antigo do login ou a análise externa de revisão dos PRs.

[PR documental10](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/10) aberto para development,
sem merge nesta preparação. O handoff pode ser usado diretamente nesta branch.

## Autoridade, autonomia e resultado esperado

`DECISAO_CONFIRMADA`: Pedro, no pedido “sincronização, merges #8/#9 e handoff das
fases 2 e 3”, fornecido ao seu Codex em **18/10/2026**, autorizou expressamente o
outro desenvolvedor a **implementar, validar, fazer commits, push e abrir/atualizar
PRs de ambas as fases, sem confirmação adicional para operações normais**.
Esta decisão substitui a proposta limitada ao cadastro e a orientação anterior
de aguardar nova aprovação de execução depois do login. Não autoriza fase 4 ou
posteriores. O [plano atualizado](plano-de-incorporacao.md) registra a mesma decisão.

Conclua a fase 2, valide tecnicamente e siga para a fase 3 sem aguardar nova
autorização de execução de Pedro. Abertura do primeiro PR não encerra a missão.
Aceite humano e **merge dos PRs de implementação permanecem com o mantenedor**;
não faça merge, push direto em development/main ou promoção para main.
Dividir commits ou sub-PRs pode facilitar a revisão, sem reduzir o escopo.

Use AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md,
.specify/memory/constitution.md, docs/code-first-prd/README.md,
docs/code-first-prd/governance/source-policy.md e docs/governance/SOURCE_AUTHORITY.md.
Decisões atuais têm a autoridade do seu recorte; código/testes/configurações são
`EVIDENCIA_IMPLEMENTACAO`, sem provar intenção. Identifique `INFERENCIA` e
`RECOMENDACAO`; só registre `DECISAO_CONFIRMADA` com origem identificada.
Preserve docs/raw/** e a trilha histórica.

## Bases conferidas e login já entregue

- Destino de escrita: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git
  — **origin/development = afef5db6ced1a4604a114d842bf85950ac32c69b**,
  após os dois merges abaixo. Árvore: `0210b54b648b42e38fea853e650061463c3fd365`.
- Referência visual, **somente leitura**:
  https://github.com/HidroFlorestaStartup/hidroflorestas-frontend-starter.git
  — main `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.
- PR #8, documental: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/8
  — head `95463d5b0a29d75e916d2115765792444438db44`, merge
  `cf7f086351c952be5b7cc51f9616bc68bfd84f4d` em development. Sem autoaprovação.
- PR #9, Spec 017/login: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9
  — head `550308247d712c920dede8d96b5f1e6140767d10`, merge
  `afef5db6ced1a4604a114d842bf85950ac32c69b`. Aprovação de Pedro registrada por
  Codex com autorização explícita:
  https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9#pullrequestreview-5564336503
- Main permanece `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`, alinhada à própria
  remota. Os merges não promoveram development para main.

O login está concluído neste recorte: `useAuth().signIn({email,password})`,
payload/senha e destinos do servidor, inércia até hidratação, trava contra envio
duplicado, aria-invalid somente para validação local por campo, erros gerais
no alerta e CSS Module local. Marca institucional e Poppins preservadas.
Não refaça o login nem a gestão dos PRs #2–#9 como tarefa preparatória.

CI utilizado no SHA **550308247d712c920dede8d96b5f1e6140767d10**:
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39145086835/job/117727186936
— validate/SUCCESS, artefato `12143033430` inspecionado, **15 gates PASS**,
E2E **86**, incluindo **14** casos de login, HTTPS **2**, exclusão **3**, IHFR **6**.
O merge #8 alterou só dez documentos e não compartilha caminhos com o #9;
produto/testes/configuração da integração são idênticos ao head validado.
Não houve nova bateria local, teste manual ou homologação operacional nessa
integração. Checks/status/deploy automáticos não equivalem a essas validações.

**Ressalva preservada:** a rodada `292dd95` falhou nos seis testes IHFR; a causa
não foi demonstrada. `acba40d` e `5503082` passaram, sem provar correção da falha
antiga. Pedro recebeu essa ressalva e aceitou integrar o login revisado.
Não reabrir o mesmo aceite por sua existência isolada; registrar eventual
recorrência material, sem afrouxar testes ou atribuir causa não comprovada.

## Preparação local e Spec Kit por fase

1. Confira origin, status, worktrees, upstreams e heads antes de alterar arquivos.
   Preserve arquivos/commits não relacionados, inclusive não rastreados. Faça
   fetch dos dois oficiais. Não use o antigo upstream de outro proprietário.
   Use origin/development verificada e registre o SHA real de início de cada fase.
2. Detecte deriva desde `afef5db`: examine commits e diff. Avanço documental não
   exige repetir toda a preparação. Deriva funcional material exige revisão e
   validação pertinentes; encaminhe bloqueio concreto quando afetar os contratos
   autorizados. Não aplique reset destrutivo, force push, rebase ou stash automático.
3. Trabalhe em branch/worktree limpa, preservando o login. Este handoff fica em
   `docs/handoff-frontend-fases-2-3`; pode ser lido diretamente dessa branch antes
   do merge documental. Não integre a branch documental só para começar a fase 2.
4. Use as skills **speckit-specify → speckit-plan → speckit-tasks →
   speckit-implement** instaladas em `.agents/skills/`; esclareça o que for
   material e analise consistência quando útil. Leia cada SKILL.md aplicável.
   Use **um próximo diretório livre por fase**, com spec/plan/tasks, critérios,
   contratos e evidências próprios; **não presuma 018/019 livres**. Não crie
   TASKS.md global, artefatos OpenSpec duplicados ou nova spec para o login.
5. Leia os guias relevantes em `node_modules/next/dist/docs/` antes de escrever
   código. Registre rastreabilidade Code-First conforme o estado de cada fonte,
   sem promover documentação histórica ou claims visuais a requisito aprovado.

O FullStack permanece **Next.js 16.3.8/App Router, React, TypeScript, Tailwind,
Prisma/PostgreSQL, Node 24.19.0/npm/package-lock** no corte entregue; confira os
arquivos atuais. O starter usa **TanStack Start/Router/Query, Vite e Bun**.
Transporte apresentação para Next; mantenha serviços e contratos reais do destino.

## Fase 2 — Cadastro e conjunto de conta

Mapeie os caminhos reais e suas dependências antes de alterar apresentação:

- `src/app/register/page.tsx`;
- `src/app/verify-email/page.tsx`, `src/app/forgot-password/page.tsx` e
  `src/app/reset-password/page.tsx`;
- `src/app/(private)/change-password/page.tsx` e
  `src/app/(public)/delete-account/page.tsx`;
- `src/components/account/`: account-shell.tsx, account-client.ts,
  email-verification-form.tsx, forgot-password-form.tsx,
  password-reset-form.tsx, account-deletion-form.tsx e password-field.tsx;
  localize também os componentes de troca de senha e outros afetados de fato.

Use `src/routes/register.tsx` e partes puras de styles/primitives do starter,
mais o padrão do login incorporado. Onde não houver equivalente visual completo,
harmonize a apresentação existente sem inventar comportamento.

Preserve `useAuth().signUp`, a API e o **Idempotency-Key** real; senha como
digitada, política vigente e destino **verify-email retornado pelo servidor**.
O signup mock do starter navega para workspace: não o copie. Não mude estado da
conta ou política de acesso para adaptar um desenho.

Mantenha a tentativa idempotente na repetição do mesmo payload e a política
vigente de renovação da chave quando o payload muda. Não gere chave por retry
nem descarte tentativa incerta para mascarar falha. Evite envio duplicado,
interação prematura e perda do primeiro preenchimento na hidratação.
Erros gerais de credencial, rede ou servidor não identificam arbitrariamente um
campo inválido; aria-invalid deve refletir evidência local específica por campo.

Preserve provas e códigos **como texto, incluindo zero inicial**, expiração,
cooldown/reenvio, neutralidade das respostas, tratamento de fragmentos/tokens,
limpeza e não exposição desses valores. Preserve reset, troca de senha,
revogação/restauração de sessões, blockers e confirmação explícita da exclusão.
Mantenha o contrato real de cancelamento/retorno de cada jornada.

Entregue **cadastro + verificação + recuperação/redefinição + troca + exclusão**.
Valide cadastro → verificação → uso, provas inválidas/expiradas/reenvio,
recuperação neutra, códigos com zero inicial, reset/troca e sessões revogadas,
exclusão bloqueada/permitida e sua confirmação. Use os testes reais pertinentes
às specs 001/012/013 e aos runners 014, sem tratar e-mail sintético como Gmail real.

## Fase 3 — Workspace e shell

Mapeie `src/app/(private)/workspace/page.tsx`,
`src/components/workspace/laboratory-workspace.tsx` e laboratory-context.tsx,
`src/components/sidebar/index.tsx`, `src/components/top-bar/index.tsx`,
layouts privados, restauração de sessão, `src/app/logout/page.tsx` e demais
elementos existentes de navegação. Origem visual: `src/routes/workspace.tsx`,
`src/components/hf/AppShell.tsx`, primitives e shell contextual do starter.

Preserve seleção **explícita** de laboratório, estado sem seleção, limite de
vínculos, operações reais já expostas no workspace, papéis/permissões e laboratório
inativo. Preserve contexto global versus contextual, retorno/histórico, reload,
restauração de sessão e logout **desktop e mobile**. Guardas do servidor não
podem virar permissões simuladas no cliente. Não selecione automaticamente outro
laboratório para esconder ausência ou perda de acesso.

Adapte navegação e molduras sem implementar conteúdo das fases seguintes.
Links devem respeitar capacidades e caminhos reais; convite não implementado
não vira botão funcional, indicadores não viram dados fictícios. Preserve o
acesso existente às páginas ainda no visual anterior; não as redesenhe nesta fase.

Valide vazio, erro/retry, foco/teclado, menu móvel, alternância/ausência de
contexto, laboratório inativo e permissões distintas. Cubra reload, voltar,
acesso direto sem sessão, saída desktop/mobile e restauração sem contexto
indevido. Compare páginas existentes que compartilham sidebar/top-bar/layout.
Falha de autorização/contexto exige diagnóstico, sem ajuste de guarda por visual.

## Branches e PRs: continuar a fase 3 enquanto a fase 2 é revisada

`RECOMENDACAO`: uma branch e um PR por fase, nomes livres como
`feat/frontend-account` e `feat/frontend-workspace-shell`, commits delimitados.
Registre os nomes e SHAs realmente usados. Não pare depois do primeiro PR:

1. Se a fase 2 já estiver merged, inicie a fase 3 da development atualizada.
2. Se estiver aguardando merge e a fase 3 depender dela, crie a branch da fase 3
   **sobre o head validado da fase 2**. Abra PR empilhado temporariamente contra
   a branch da fase 2, identificando a dependência no título/descrição e o destino
   final **development**. Não duplique mudanças compartilhadas nos dois PRs.
3. Depois do merge da fase 2 pelo mantenedor, mantenedor/executor reconfere o
   diff real e redireciona o PR da fase 3 para development quando cabível,
   preservando commits e validando o resultado. Reconfira o CI do head exato;
   retarget não é prova de equivalência. Não exclua a branch-base enquanto
   necessária ao segundo PR. Não faça merge da fase 2 em nome do mantenedor.
4. Se não houver dependência de código, use branches independentes de development
   somente comprovando o resultado combinado e evitando alterações compartilhadas
   duplicadas. Registre a estratégia e a ordem dos merges na entrega.

A orientação histórica “branch de development/aguardar aceite anterior” não
impede preparar a fase 3 dentro desta autorização. Se surgir conflito material,
preserve os trabalhos e encaminhe a parte afetada com evidência.

## Estilos e limites de escopo

Preserve marca, Poppins e arquitetura. Reaproveite apresentação pura e componentes
compatíveis com Next. Troque Link/to por next/link/href e adapte navegação às APIs
Next instaladas. Examine imports transitivos: primitives do starter importa
ApiError do adapter e Link TanStack; não copie o arquivo inteiro.

Não importe adapters, mocks/personas, DemoPanel, sessão simulada, fixtures,
reporting Lovable, roteador TanStack ou pacote inteiro de dependências do starter.
Use CSS/composição delimitados; não substitua globals.css, root layout/fonte nem
redesenhe domínio/backend para adaptar visual. Evite refatoração global sem
impacto demonstrado. Biblioteca nova ou alteração funcional material exige
justificativa e tratamento próprio; encaminhe decisão de escopo que não esteja
coberta, sem bloquear partes independentes seguras.

Não ative provedores reais, mude schema/migrations, ciência IHFR, drafts,
capa/Cloudinary, mapa ou administração funcional fora dessas duas fases.
Homologações Gate B012, aceite operacional013, Cloudinary e operadores permanecem
nos seus gates próprios; não são automaticamente bloqueios da adaptação visual.
IHFR conserva **CONTRATO_EXPERIMENTAL**, **VALIDACAO_CIENTIFICA_PENDENTE**,
**SUJEITO_A_RECALIBRACAO**, **NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO**.

## CI, validação e evidências de ambas as fases

O workflow `.github/workflows/rc-review.yml` usa allowlist. **Antes do primeiro
push**, inclua cada branch efetivamente publicada em **push.branches e no if do
job validate**; mantenha os 15 gates, runners, Actions fixadas, permissões,
timeouts e guards existentes. Em `vercel.json`, aplique a mesma exclusão exata
de preview por branch usada no login. Isto é ajuste focal autorizado para as
branches das duas fases. Não habilite CI/deploy global nem altere provedores.

Use runtime/npm/lockfile atuais, `npm ci --no-audit --no-fund`,
`npx prisma generate`, `npm run typecheck`, `npm run lint` e `npm run build`
padrão. Não substitua o bundler para conseguir PASS. Execute testes pertinentes
por fase e confira **validate no SHA exato de cada PR**, inclusive o conjunto
fase 2 + fase 3 quando empilhado. Mudança funcional exige evidência nova no SHA
correspondente; teste de código anterior não é resultado do candidato atual.

Harness oficial: leia `docs/operations/rc-review-ci-runbook.md`,
`scripts/rc-review-validation.ps1`, `scripts/accounts-local-postgresql.ps1` e
os runners pertinentes antes de executar. Em Windows com o cluster sintético
próprio já preparado, o runner local é `./scripts/rc-review-validation.ps1`
(ou `-Gates` pertinentes, preservando setup e dependências). O CI executa
RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck,
Lint, E2E, Https, Deletion, Ihfr, Bootstrap e SchemaAudit.

**Não use -InitializeCiCluster numa máquina normal**: é exclusivo do runner
Windows isolado de Actions. Não execute E2E focal fora do ambiente completo
exigido pelo runner; a execução deve herdar ingresso/políticas/fixtures sintéticos
oficiais. Não improvise env, banco normal ou credenciais reais, nem remova guards.
Se o ambiente local não suportar o harness, registre o limite e use o CI oficial
da branch para as validações correspondentes; encaminhe apenas impedimento real
que reste, sem declarar teste local não realizado como PASS.

Cubra jornadas de conta da fase 2, login já entregue e contexto/navegação/logout
da fase 3, com regressão de sessões/permissões. Produza **capturas reais do Next
em 375/768/1440**, reflow **320/texto ampliado**, estados de erro/loading e
evidências de foco/teclado. Compare antes/depois; não confunda screenshot ou teste
automatizado com teste manual de leitor de tela ou certificação WCAG integral.

Publique somente evidências sintéticas/sanitizadas necessárias. O glob atual de
upload das capturas é específico do login: acrescente somente os padrões focais
necessários para as novas fases, com os mesmos limites de retenção/segurança.
Masque campos preenchidos; exclua tokens, fragmentos de recuperação, credenciais,
cookies, env e snapshots/traces sensíveis, inclusive valores sintéticos de senha.
Logs de FAIL/rerun devem ser preservados com sanitização e alcance explícitos.

## Entrega e bloqueios concretos

Conclua **ambas** com commits/push, PRs revisáveis, capturas, resultados/limites,
acompanhamento do CI e atualização dos respectivos planos/tarefas. A descrição de
cada PR deve explicar problema/resultado, origem visual, caminhos, head testado,
comandos/resultados, limites e dependência do outro PR. Não alegue aceite humano,
teste manual, e-mail real ou homologação produtiva/científica não executados.

Na entrega final liste fase 2 e fase 3, branches, SHAs publicados, URLs dos PRs,
base temporária quando houver, CI por head, capturas, pendências materiais e
**ordem dos merges pelo mantenedor: fase 2, depois fase 3** quando dependentes.
Não encerre por uma aprovação de execução que já foi concedida. Encaminhe somente
novo defeito/regressão material, conflito que ameace trabalho, regra/permissão
impeditiva ou decisão de domínio/produto/ciência necessária ao recorte afetado.

Recuperação: mantenha apresentação em commits delimitados, preserve fluxos e
evidências. Antes de merge, revise o recorte por novos commits; após merge,
eventual revert normal pertence ao mantenedor, sem reset/force push. Não há
rollback de banco previsto nesta entrega visual.

Referências de auditoria opcionais, sem necessidade de outra conversa:
[relatório atualizado](relatorio-de-prontidao.md),
[acompanhamento](plano-de-acompanhamento.md) e
[evidência da integração](integracao-login-e-handoff-fases-2-3.json).
