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

### Retorno entre layouts ? delta focal
Os consumidores reais s?o workspace/layout.tsx e dashboard/layout.tsx, com inst?ncias separadas. Ambos recebem somente scope de UI expl?cito, sem alterar requireAuth/canAdmin. Pend?ncia de restore passa a ser local por inst?ncia; posi??es e inten??o POP sequenciada s?o compartilhadas. O listener POP em captura publica a inten??o antes da atualiza??o dos layouts pelo Next. A revis?o do desenho n?o equivale a provar qual callback causou o FAIL hist?rico; o teste comprova o comportamento de retorno. O reset de topo ? restrito ao avan?o para destino novo, n?o usado para ocultar Back nem para fabricar foto nativa.


### Inten??o POP com ciclo de vida da aba
Reprodu??o focal confirmou que a assinatura da inst?ncia sa?a antes de observar o evento de retorno. Um listener ?nico da aba publica inten??o e notifica assinantes locais; setup/update do destino reivindicam a sequ?ncia. Cleanup de layout remove apenas sua assinatura e observers. O listener n?o ret?m DOM e o cache continua limitado a paths/offsets; sa?da para autentica??o limpa posi??es. Marcador de outra rota ativa ? invalidado. Sem patch de history/router nem altera??o de Auth.
Valida??o de retorno aceita clamp ao m?ximo atual, pois dados/layout podem encurtar; aguarda estados reais carregados e transi??es finitas existentes. N?o aumentar toler?ncia para esconder retorno ao topo.

### REVIEW: consumidor público e entrada documental na exclusão

EVIDENCIA_IMPLEMENTACAO: a candidata f8c5e7114ebc86ca55f5d0690120bd608f280c0e concluiu os15gates locais no snapshot f6225ec0aa48a15e4120d82195cba99d3a7d02b683106edd59008ed04b710894 (2026-10-19T14:02:40Z–14:12:29Z): E2E136, HTTPS2, exclusão3, IHFR6 PASS. Não é ainda o HEAD final publicado.

RECOMENDACAO do revisor separado: caracterizar também a entrada documental em /delete-account após cache produzido por interação real no workspace. O cleanup de uma instância React não cobre necessariamente essa entrada. Trata-se de hipótese até a execução; não atribuir novo RED antes dela.

Plano focal autorizado pela preservação dos consumidores do shell: ampliar tests/e2e/account-deletion.spec.ts mantendo todos os passos/assertions existentes; comprovar precondição de storage não vazio sem ler/semear valores e navegar por documento. Se RED, exportar limpeza exclusiva do cache de UI em use-content-scroll.ts e chamá-la em src/components/account/account-deletion-form.tsx somente após o sucesso HTTP/DTO já estritamente confirmado. Sem mudar AuthContext, backend, autorização, mensagens/contrato de exclusão ou limpar chaves alheias. Cancelar, senha incorreta e resultado incerto não autorizam essa limpeza de sucesso. Revisar delta e repetir gate oficial afetado, build/typecheck/lint e CI15gates no HEAD final. Reversão por commit delimitado, sem reset.
## PLAN focal OBS-UI-01 — 2026-10-19
FATO_DOCUMENTADO: missão atual/PROMPT-CODEX.md lido integralmente. EVIDENCIA_IMPLEMENTACAO: baseline local/remota PR14=7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d; PR15=33e3e5bd2a3265e9dc47d723db7a80693cf7c0f5; development=c33bf50b510dd7af7ad59cde039839f56519c87e. Worktree frontend-login limpa reutilizada, sem novas branches/worktrees. RC=0f669b79a5e73a329832593229c2557d8b12bbce e três ZIPs não rastreados preservados. Cluster próprio parado; processos alheios preservados.
A captura histórica do CI run39267705060/tentativa3,375-text200-three-links-landscape-safe-area34, foi inspecionada: Configuraçõe + s visível. Isso é evidência histórica; o RED novo ainda será executado.
Sequência: commit deste PLAN → aplicador somente teste e commit → rc-review-validation.ps1 -Gates RegressionSetup,E2E (Next oficial completo, prefix before) → preservar FAIL/capturas → aplicador somente workspace.module.css e commit → GREEN oficial e Build/Typecheck/Lint → revisão adversarial somente leitura → evidências/tarefas e commit → push existente → conferir15gates do SHA exato e atualizar PR14. Só então sincronizar PR15 por merge Git não destrutivo da feature14, sem rebase/reset/force.
Constitution Check I–VII PASS; sem nova entidade, contrato, pesquisa pendente ou mudança de fonte global. Skills speckit-plan/implement aplicadas como adendos, sem regenerar/substituir os artefatos existentes. Pré-requisitos Spec Kit conferidos; checklist requirements8/8; hooks inexistentes. Guia Next instalado de CSS/fontes lido. Sem API/AuthContext/ciência/provedores reais/merge em development/main/deploy.

### Ajuste de sequência após CI funcional confirmado
EVIDENCIA_IMPLEMENTACAO: CI15PASS conferido no HEAD9b0806e, sem alteração funcional posterior; apenas um parágrafo documental recebeu correção de UTF-8. RECOMENDACAO operacional adotada pelo executor dentro da missão: a execução local sequencial da Spec021 pode avançar após essa validação funcional enquanto o CI do último HEAD documental de020 roda. Não haverá suíte local concorrente nem push da fase5 antes de confirmar os15gates do novo HEAD final de014. Bases/branches existentes, commits/pushes cronológicos e resultadoCI exato de ambos os PRs permanecem obrigatórios. O recibo remoto final encerra a publicação.
