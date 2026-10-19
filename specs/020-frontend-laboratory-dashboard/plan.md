# Implementation Plan: Laboratório, dashboard, histórico e membros
**Branch**: `feat/frontend-laboratory-dashboard` | **Date**:2026-10-19 | **Spec**:[spec.md](spec.md)
## Summary
PLAN → EXECUTE → REVIEW. Primeiro reproduzir apontamento móvel no Next real e distinguir fullPage de obstrução. Só depois adaptar conteúdo contextual do starter cbb954a. Preservar comportamento e contratos.
## Technical Context
TypeScript/React19.2.4,Next16.3.8 App Router,Node24.19.0,npm/lockfile,Tailwind4,CSS Modules. PostgreSQL sintético próprio via runners existentes; sem alteração de persistência. Chromium/Playwright1.55.1 e15 gates oficiais. Plataforma web responsiva;375/768/1440 e320 texto200. Controles44px,reflow e foco verificáveis; sem meta de performance inventada.
## Constitution Check
I fontes classificadas e autoridade delimitada; II recorte vertical; III spec própria020 livre; IV rastreabilidade specs002/003/007/019 e Code-First CF-PRD-FR-010,CF-UC-014,CF-PFLOW-007 (EM_REVISAO); V sanitização/contratos/guards; VI histórico preservado; VII branch e worktree únicas. PASS antes/depois do desenho, sem exceções.
## Project Structure
specs/020-frontend-laboratory-dashboard/{spec,plan,research,data-model,quickstart,tasks,implementation-evidence,review}.md;contracts/ui-contracts.md;checklists/requirements.md;evidence/.
src/components/shell/{shell.module.css,application-shell.tsx,use-content-scroll.ts} somente se reprodução demonstrar defeito;src/components/dashboard/{dashboard-summary,dashboard-history}.tsx e dashboard.module.css;src/components/laboratories/laboratory-memberships.tsx;rota contextual dashboard page. Testes frontend-mobile-navigation.spec.ts/frontend-dashboard.spec.ts. CI e vercel.json focais.
## Preflight e preservação
RC release/cri-rc-20261010 em0f669b79a5e73a329832593229c2557d8b12bbce,dois ZIPs não rastreados preservados. Worktree frontend-login limpa emd555f9e,ancestral de origin/development c33bf50b510dd7af7ad59cde039839f56519c87e,fetch confirmado. Branch nova sobre development; sem checkout/pull na RC. Demais4 worktrees/branches preservadas. Nenhum processo HidroFlorestas ativo encontrado;porta3000 pertence a outro projeto (preservado);cluster próprio parado antes da missão. npm ci/Prisma/Chromium concluídos; scripts nativos bloqueados pelo npm serão avaliados somente se falha material ocorrer. Starter oficial limpo e fetch main sem avanço,cbb954a.
## Sequência e riscos
1. Plano/contratos/análise e commit local.
2. Testes móveis e caracterização funcional;runner RegressionSetup/E2E;capturas viewport e geometria por rolagem.
3. Commit delimitado da conclusão/correção móvel e eventual adendo019.
4. Conteúdo fase4 sem alterar autorização/API;testes de contexto/concorrência.
5.15 gates congelados,revisão adversarial,delta e evidências.
6. Allowlist/if/Previewfalse antes do push;PR development;conferir CI exato.
Fase5 será branch sequencial sobre HEAD validado desta caso ainda aberta,PR temporário contra esta,destino final development. Sem merge pelo executor.
Riscos: fullPage induzir diagnóstico falso,altura móvel variável,foco/skip,leitura tardia,cursor entre contextos,PATCH concorrente. Tratamento por evidência/regressão;sem trocar decisões de domínio.
Reversão RECOMENDACAO: commits focais revisáveis;eventual revert após merge pelo mantenedor,sem reset/force ou rollback de dados.
## Estado
PLAN em andamento. Nenhum PASS funcional novo alegado. Missão e handoff lidos integralmente;anexo local é fonte atual do usuário,não nova atribuição retroativa a Pedro.

## Ajuste focal após reprodução (EXECUTE)
EVIDENCIA_IMPLEMENTACAO: o novo contêiner móvel exige restauração própria; a geometria candidata mostrou retorno ao topo em vez da posição anterior. A solução usa cache de posição por pathname no módulo e no sessionStorage da aba, limitado a50 entradas validadas (pathname sem query/fragmento e número de pixels). Não guarda cookies, sessão de autenticação, campos ou DTOs. Não equivale a restaurar cada entrada distinta da mesmaURL; novas navegações começam no topo, Back/Forward/reload usam a última posição conhecida dessa rota. Intento/foco explícito prevalece e o cache é descartado na saída para autenticação. Desktop continua com rolagem do documento. Revisão independente cobre clamp/resize e loading.
A composição de membros recebe key por laboratoryId como fronteira de estado; callbacks de componente desmontado não populam o novo contexto. Summary/history conservam AbortController e descartam resposta abortada. Nenhum contrato de autorização é alterado.