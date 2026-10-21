# Execução autorizada — fases 8 e 9 do frontend

Execute as próximas duas fases completas do plano do HidroFlorestas: **8 — IHFR** e **9 — Mapa e administração**. Repositório oficial: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.

## Autorização e base

DECISAO_CONFIRMADA: Pedro, no pedido desta continuação em21/10/2026, autorizou preparar as duas fases e reservou o último merge funcional anterior ao seu clique. Este prompt autoriza implementar ambas, validar, fazer commits, push e abrir/atualizar todos os PRs necessários, sem confirmação adicional de rotina. Não pare após o primeiro PR. Merges futuros e aceite humano ficam com o mantenedor.

Estado desta preparação:
- #17 documental integrado em afde5b0b7cc0c101c399030e3bcee66227d191b1.
- #18 / fase6 / Spec023 integrado em b7401f1051435fd912592a65723a2e328c0bb313, head64332e0feedeabdf78bbce7d402367c266bef838.
- **#19 / fase7 / Spec024 permanece Ready e aberto para o merge manual de Pedro**, head9e11eca367321f19ccc6ad7aa7ccc5e43555dbe8, base development, review técnico assistido registrado. Não o mescle pelo executor.
- Development remota: b7401f1051435fd912592a65723a2e328c0bb313. Main remota: beba96fbf6bbaac8771dbb29abea2f9f8f5b0054. Estado da máquina local não foi comprovado.
- Prompt disponível na branch docs/handoff-frontend-fases-8-9 antes do merge documental.

**Antes de implementar a fase8, confirme o merge real do #19 em development**, o head integrado e sua ancestralidade. Aprovação técnica não prova merge. Faça fetch e parta da development então verificada; se Pedro ainda não clicou, mantenha a preparação pronta e informe essa dependência concreta. Não repita merges anteriores nem contorne a reserva do mantenedor.

Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md, constituição e skills speckit-* realmente instaladas, docs/code-first-prd/README.md e políticas de autoridade. PRD Code-First conserva seu estado em revisão. Use PLAN → EXECUTE → REVIEW, próxima numeração Spec Kit livre por recorte, contratos/evidências/tarefas rastreáveis. Preserve docs/raw/**.

Inventarie origin, autenticação, branches/upstreams, worktrees, arquivos rastreados/não rastreados e divergências. Faça sincronização por FF seguro, preservando trabalho e branches; sem reset --hard, force push, rebase destrutivo, stash automático ou limpeza. Use worktree isolada quando necessário. Main acompanha somente origin/main; não promover development a main.

## Arquitetura e entregas

Fonte visual somente leitura: HidroFlorestaStartup/hidroflorestas-frontend-starter, commit cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f. Starter usa TanStack Start/Router/Query; destino usa Next.js App Router. Adaptar composição/estilos aos componentes e contratos reais, next/link e next/navigation. Não incorporar TanStack, mocks/personas, cálculo de demonstração, fixtures ou números sintéticos ao produto.

Usar Node24.19.0/npm/lockfile e versões atuais conferidas do FullStack. Ler node_modules/next/dist/docs pertinentes antes de escrever código. Manter Poppins, marca e autenticação reais; não substituir globals.css/layout raiz, controladores, serviços ou dependências por conveniência visual.

Branches sugeridas: feat/frontend-ihfr, feat/frontend-territorial-map e feat/frontend-user-administration. O plano prevê **um PR de IHFR e recortes separados de mapa e administração**: duas fases, normalmente três PRs. Concluir todos. Empilhar dependências somente quando necessário e declará-las; recortes independentes podem partir da mesma development verificada. Não esperar o merge do primeiro PR para executar os demais. Retarget/reconferência ficam com o mantenedor.

## Fase8 — apresentação do IHFR real

Origem principal no starter: src/features/ihfr/IhfrPanel.tsx; labels/tipos apenas quando compatíveis com contratos atuais.

Destinos principais:
- src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx
- src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx
- src/components/ihfr-diagnosis/no-current-diagnosis.tsx
- src/components/ihfr-diagnosis/land-use-labels.ts
- Integração existente no detalhe da coleta, com seus contratos preservados.

Ler specs/006-ihfr-diagnosis/ e docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md. Preservar elegibilidade, contexto/autorização, suficiente/insuficiente/incompatível, vigente/substituído/revogado, CREATE/REPLACE/REVOKE, suplemento, versões/hashes, revisão/ID esperado, resultados imutáveis e recuperação incerta com mesma chave/corpo. Drafts e dados parciais permanecem fora do cálculo.

A apresentação não autoriza alterar matemática, scores/faixas/categorias, manifesto ou intenção científica. Não importar resultados do starter como reais. Manter visíveis e compreensíveis CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

Preservar as duas regiões ARIA usadas pelos fluxos reais; não escondê-las para satisfazer capturas. Revalidar tests/e2e/ihfr-diagnosis-read.spec.ts e ihfr-diagnosis-manage.spec.ts, os seis cenários dedicados e regressões pertinentes de conta/coleta/ambientais. Não afrouxar readiness, seletores ou assertions.

## Fase9 — mapa e administração

### Mapa

Origens no starter: src/components/hf/map/MapView.tsx, LeafletMap.tsx e rota existente de mapa do laboratório.

Destinos:
- src/app/(private)/dashboard/laboratories/[laboratoryId]/map/page.tsx
- src/components/territorial-map/territorial-map.tsx
- src/components/territorial-map/territorial-map.client.tsx
- src/components/territorial-map/territorial-map-view.tsx
- src/components/territorial-map/territorial-map-state.ts
- src/components/areas/area-map* somente quando materialmente necessário.

Consultar specs/008-territorial-map/ e tests/e2e/territorial-map.spec.ts. Preservar contexto autorizado, ponto/coordenadas reais, filtros/seleção/destinos existentes, wrapper cliente/servidor seguro para SSR, carregamento/erro/retry, atribuição, tiles configurados e alternativa em lista. Conservar NEXT_PUBLIC_MAP_TILE_URL e NEXT_PUBLIC_MAP_ATTRIBUTION conforme configuração existente, sem divulgar outros valores de ambiente. Não criar segundo motor/adapter, Plotly/Python, polígono ou contrato espacial novo.

### Administração

Origens no starter: src/routes/admin.tsx, admin.index.tsx, admin.users.tsx e dashboard.admin.users.tsx.

Destinos:
- src/app/(private)/admin/page.tsx e admin/users/page.tsx
- src/app/(private)/dashboard/admin/users/page.tsx
- src/components/user-administration/user-administration-page.tsx
- src/components/user-administration/user-list-state.ts
- src/components/admin-shell/admin-shell.tsx

Consultar specs/009-user-administration/ e E2E user-administration-read, -role, -status e -audit. Preservar administrador global separado dos papéis do laboratório, autorização do servidor, busca/filtros/cursor, revisão/concorrência/conflito, operações existentes, envelopes de erro e auditoria. Manter diálogos/foco/cancelamentos/loading/erro/retry e navegação móvel/desktop. Não transformar placeholders em novas capacidades.

## Validação e evidências

Usar runners oficiais, Node/npm/lockfile, build padrão, typecheck/lint e testes pertinentes; PostgreSQL somente sintético próprio com guards/allowlists. No Windows, seguir scripts/accounts-local-postgresql.ps1, scripts/rc-review-validation.ps1 e runbook. -InitializeCiCluster é exclusivo do Actions Windows isolado. Manter runners dedicados HTTPS/exclusão/IHFR. Não usar banco normal, migrar banco real ou operar provedores.

Antes do primeiro push funcional, manter Preview desabilitado para cada nome real de branch em vercel.json e incluir cada branch no push.branches **e** no if do job existente de .github/workflows/rc-review.yml, sem trocar runners/Actions fixadas/permissões/gates. Upload de evidências com padrões estreitos e sanitizados; sem .env, tokens, cookies, dumps, traces ou snapshots preenchidos.

Conferir no head final de cada PR os15 gates: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap e SchemaAudit. Diferenciar CI do head, CI do merge e execução local; não transportar resultados entre SHAs. Se um gate não puder rodar localmente, declarar NOT_RUN e conferir o CI oficial pertinente.

Verificar 320/375/768/1440px e texto200%, teclado/foco, menus/diálogos, paisagem/safe-area emulada, Back/Forward/reload, último controle acessível e rolagem do shell. Capturas para provar visibilidade devem ser fullPage:false, com zoom/rolagem e procedência; fullPage pode complementar. Máscaras/indicador Next encobrindo pixels impedem atestar esses pixels. Não usar foto recortada como prova de defeito nem alegar dispositivo físico, aceite humano ou WCAG integral sem execução correspondente.

Preservar Specs022–024: concorrência/capa/sanitização, recuperação idempotente, principal HMAC A→B→A, precisão temporal/numérica, false/0/null/ausência/vazio/entrada parcial, save explícito, OCC, consumo/rollback e confirmação imutável. Mudanças compartilhadas exigem regressão dos consumidores afetados.

## Investigações posteriores e limites

Pedro determinou investigar e, se necessário, corrigir as falhas históricas inconclusivas **após a fase10 e a consolidação visual**. Consultar [registro](investigacoes-pos-consolidacao-visual.md). Não iniciar investigação ampla nas fases8/9 nem declarar causa/resolução definitiva por novo CI verde. Manter evidências e diagnósticos existentes.

Essa programação cobre históricos: perda de dados, regressão material, exposição indevida ou falha obrigatória atual não fica adiada. Tratar defeito concreto no recorte afetado, com evidência e validação, sem reimplementar o sistema por hipótese.

Não implementar fase10 nesta rodada, solicitar deploy/Preview, promover main, realizar migrations reais ou alterar provedores/ciência. Entregar todos os PRs das duas fases com descrição final, contratos preservados, Specs/planos/tarefas, resultados por head/run/tentativa, capturas sanitizadas e limitações reais. Merges e aceite humano ficam com o mantenedor.

Referências: [plano global](plano-de-incorporacao.md), [continuação](plano-de-continuacao-fases-8-9.md), [acompanhamento](plano-de-acompanhamento.md), [prontidão](relatorio-de-prontidao.md) e [recibo](integracao-fase-6-e-prontidao-fase-7-handoff-fases-8-9.json).
