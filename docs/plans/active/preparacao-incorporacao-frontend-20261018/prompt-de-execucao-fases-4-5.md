# Execução autorizada — fases 4 e 5 do frontend

Execute **as duas fases completas** no clone oficial do HidroFlorestas FullStack:
**fase 4 — Laboratório, dashboard, histórico e membros** e **fase 5 — Áreas e capa**.
Este prompt é autossuficiente para o professor/outro desenvolvedor usar com seu
Codex, sem o chat de Pedro ou outra revisão preparatória.

Branch documental: `docs/handoff-frontend-fases-4-5`. O prompt pode ser usado
**diretamente desta branch, sem aguardar o merge do PR documental**. Leia o
arquivo nessa branch e crie as branches de implementação da development
verificada; não incorpore os commits documentais apenas para iniciar.

## Autoridade e conclusão das duas fases

`DECISAO_CONFIRMADA`: Pedro, no pedido “Revisão e continuação — PRs #10/#11/#12 e
fases 4/5”, anexado ao seu Codex em **19/10/2026, America/Fortaleza**, autorizou
expressamente o executor a **implementar, validar, fazer commits, push e
abrir/atualizar PRs de ambas as fases, sem confirmação adicional para operações
normais**. Conclua a fase 4, valide e prossiga à fase 5; abrir o primeiro PR
não encerra a missão e não exige nova autorização de execução.

Aceite humano e **merges de implementação continuam com o mantenedor**. Não
faça merge em nome dele, push direto em development/main ou promoção para main.
Fases 6 e posteriores não integram esta entrega. Não refaça fases 1–3 nem a gestão
dos PRs #10/#11/#12: essa integração já foi concluída por Pedro com seu Codex.

Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md,
.specify/memory/constitution.md, docs/code-first-prd/README.md,
docs/code-first-prd/governance/source-policy.md e docs/governance/SOURCE_AUTHORITY.md.
Use decisões atuais somente no recorte autorizado; código/configurações/testes
são `EVIDENCIA_IMPLEMENTACAO`, sem provar intenção. Identifique `INFERENCIA` e
`RECOMENDACAO`; registre `DECISAO_CONFIRMADA` somente com origem identificada.
Preserve docs/raw/** e todo histórico documental.

## Base real e entregas já integradas

Destino de escrita: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git

**Development após os três merges: `c33bf50b510dd7af7ad59cde039839f56519c87e`**.
Árvore Git: `fc61515c32c0fe2ee456e06bb39bbff0888041f7`.
Main permanece `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`; não recebeu development.

| Entrega concluída | Head revisado | Merge em development |
|---|---|---|
| PR10, handoff documental das fases2/3 | 58407b34d4f00c087b920607e79dcb21ce27956b | 1956a3e6d57a43ab13367b86fc0b4f2e7ac3b447 |
| PR11, fase2/contas, Spec018 | 8cacfc99ba0e2876c1036a0f67ec41375806b9ac | f0333fd9458d154dd6fa345c48ce0595942bf5fb |
| PR12, fase3/workspace e shell, Spec019 | d555f9e6686228f0af38ff16f66598bdd75b1f89 | c33bf50b510dd7af7ad59cde039839f56519c87e |

PRs: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/10,
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/11 e
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12.
O PR12 foi redirecionado de feat/frontend-account para **development antes do
merge**; diff próprio confirmado em165 caminhos. Head final do11 ancestral do12,
fase2 preservada. Branches originais conservadas; merge commits sem reescrita.

Reviews APPROVED de Pedro efetivamente registradas por Codex autorizado, com
transparência sobre autoria assistida e limites, sem evento em nome de Luciano:
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/11#pullrequestreview-5566561057
 e
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/12#pullrequestreview-5566567231.
PR10 é de Pedro e não recebeu autoaprovação.

CI oficial do head exato do11:
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39166203271/job/117789543612
— validate/SUCCESS,15 gates PASS/exitCode0, snapshot único, E2E100.
CI oficial do head exato do12:
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39172722118/job/117808968032
— validate/SUCCESS,15 gates PASS/exitCode0, snapshot único, E2E120 cumulativo.
Ambos incluem HTTPS2, exclusão3, IHFR6, integração218, migrations37, contratos6,
R1 17, bootstrap14 migrations e SchemaAudit0; build/typecheck/lint PASS.
Unit PASS; mail17 confirmado no stdout resumido,296 unit relatados pelos recibos
versionados. Produto/testes/configuração da integração final são idênticos ao
head validado do12; oito diferenças exclusivamente documentais vêm do10.

Não houve nova suíte local ou aceite visual manual nesta integração. Revisão
remota fornecida por Pedro leu código/logs e capturas selecionadas; não foi
homologação visual integral, teste de leitor de tela ou certificação WCAG.
Preserve duas ressalvas: **FAIL inicial do novo teste de histórico do12**, depois
reforçado para aguardar leitura/hidratação real sem remover goBack/assertions,
e **FAIL IHFR histórico anterior ao login**. PASS posterior não demonstra causa
nem correção retrospectiva; não atribua mecanismo não comprovado. Recorrência
material deve ser diagnosticada com evidência, preservando logs e guardas.

## Fonte visual, adaptação e preparação

Fonte somente leitura:
https://github.com/HidroFlorestaStartup/hidroflorestas-frontend-starter.git
— main de referência **`cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`**.
Confirme o Git atual e registre eventual avanço; não troque silenciosamente o
corte visual. O starter usa TanStack Start/Router/Query, Vite e Bun; o FullStack
usa **Next.js/App Router, React/TypeScript/Tailwind, Prisma/PostgreSQL,
Node24.19.0/npm/package-lock**. Confira versões vigentes nos arquivos do destino.

1. Inventarie origin, worktrees, status, upstreams e heads; preserve commits,
   ZIPs e arquivos não rastreados anteriores. Faça fetch dos dois oficiais;
   não use o upstream antigo de outro proprietário. Registre o SHA real de
   development e de início de cada fase. Use apenas FF seguro quando aplicável,
   sem reset/rebase/force push/stash automático.
2. Compare deriva desde c33bf50. Avanço documental não exige refazer esta revisão.
   Mudança funcional material exige verificar contratos e regressões afetados;
   registre impedimento concreto sem ignorar código/check novo.
3. Use branch/worktree limpa por fase. Aplique as skills instaladas em
   `.agents/skills/`: **speckit-specify → speckit-plan → speckit-tasks →
   speckit-implement**, lendo os SKILL.md; esclarecer quando material e analisar
   consistência quando útil. Use **o próximo diretório livre por fase**,
   sem presumir020/021 livres. Specs018/019 já entregues não serão reabertas.
   Mantenha spec/plan/tasks/contratos/evidências próprios, rastreabilidade
   Code-First e estado das fontes; sem TASKS.md global ou OpenSpec duplicado.
4. Antes de escrever código, leia os guias relevantes em
   `node_modules/next/dist/docs/`. Preserve limites server/client e autorização
   do servidor. Adapte Link/to/useNavigate/Outlet às APIs Next instaladas.

Preserve marca institucional, Poppins, runtime, npm e lockfile do FullStack.
Aproveite composição, cores, espaços e partes puras de componentes; examine
imports transitivos. `primitives.tsx` importa adapter/ApiError e Link TanStack:
não copie o arquivo inteiro. Não transporte mocks/personas, DemoPanel, fixtures
como dados do produto, sessão simulada, permissões calculadas por mock, reporting
Lovable ou o conjunto de dependências do starter. Use CSS/composição delimitados
e os padrões de conta/shell já incorporados; não substitua globals.css/root
layout/fonte para redesenhar estas telas. Não crie segundo adapter/parser ou
biblioteca por conveniência visual. Encaminhe mudança material fora do recorte;
resolva escolhas rotineiras de apresentação com autonomia.

## Fase 4 — Laboratório, dashboard, histórico e membros

Mapa confirmado no commit visual acima. Caminhos relativos ao starter:

| Origem visual | Destino real no FullStack |
|---|---|
| src/routes/dashboard.index.tsx e dashboard.collects.tsx | src/app/(private)/dashboard/page.tsx e dashboard/collects/page.tsx |
| src/routes/dashboard.laboratories.$laboratoryId.index.tsx | src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx |
| src/routes/dashboard.laboratories.$laboratoryId.members.tsx | src/app/(private)/dashboard/laboratories/[laboratoryId]/members/page.tsx |
| Partes puras de src/components/hf/primitives.tsx e componentes ui | src/components/dashboard/dashboard-summary.tsx, dashboard-history.tsx e src/components/laboratories/laboratory-memberships.tsx |

Leia os consumidores, DTOs, contextos e contratos antes de editar. **Workspace,
criação/configurações de laboratório e shell já pertencem à fase3 integrada**.
Confira seu resultado e complemente somente o conteúdo da fase4; não duplique
workspace/CRUD nem recrie seleção de laboratório. Layouts existentes conservam
requireAuth/getLaboratoryContext no servidor e capacidades autorizadas.

Preserve e demonstre:

- Resumo e contagens reais por laboratório autorizado; links retornados e
  readOnly. Representar DTOs atuais, sem indicadores/gráficos inventados.
- Histórico real com cursor/paginação, atualização, destinos, ordenação, vazio,
  loading, erro e retry; troca de laboratório não mistura dados ou cursores.
- Seleção explícita/contexto da fase3, ausência de seleção, laboratório inativo,
  perda de vínculo e retorno entre rotas; sem escolher outro laboratório para
  esconder perda de acesso ou retornar dados do contexto anterior.
- Operações de membros autorizadas no servidor: global ADMIN não equivale a
  ADMIN contextual ou OWNER. Preserve OWNER, leitura e mutação conforme contratos
  e readOnly/inatividade; não amplie acesso só porque o starter mostra um botão.
- PATCH de papel com **expectedRole**, bloqueio de envio duplicado e tratamento
  de conflito/atualização concorrente. Não calcule autorização por mock no cliente.
- Operações, limites, cancelamentos, mensagens e destinos que já existem. Convites,
  filtros de backend ou capacidades ausentes não viram ações ativas.

Valide OWNER/ADMIN/MEMBER e autoridade global/contextual, inatividade, perda de
acesso, troca de contexto e concorrência material. Exercite resumo/histórico/
membros com **APIs reais no ambiente sintético oficial**. Transporte interceptado
para visualizar loading/erro deve ser identificado separadamente desse fluxo.
Referências existentes a ler: tests/e2e/dashboard-history.spec.ts,
laboratory-context.spec.ts, laboratory-membership-roles.spec.ts,
create-laboratory.spec.ts; tests/integration/dashboard-routes.test.ts,
laboratory-memberships-route.test.ts, laboratory-context-access.test.ts,
laboratory-settings-route.test.ts e unitários/contratos correspondentes.
Não execute um arquivo focal solto sem o setup completo exigido pelos runners.

## Fase 5 — Áreas e capa

Mapa visual confirmado no mesmo corte do starter:

| Origem visual | Destino real no FullStack |
|---|---|
| src/routes/dashboard.laboratories.$laboratoryId.areas.index.tsx | src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/page.tsx; src/components/areas/area-list.tsx |
| src/routes/dashboard.laboratories.$laboratoryId.areas.new.tsx | .../[laboratoryId]/areas/new/page.tsx; src/components/areas/area-form.tsx e area-form-state.ts |
| src/routes/dashboard.laboratories.$laboratoryId.areas.$areaId.index.tsx | .../[laboratoryId]/areas/[areaId]/page.tsx, composição real de detalhe nessa page server e componentes importados |
| Cartões/partes puras do starter; sem editor privado completo de capa | src/components/areas/area-cover.tsx: AreaCoverPreview e AreaCoverEditor |

Localize as dependências reais de detalhe antes de editar; `...` na tabela
representa `src/app/(private)/dashboard/laboratories`, não um caminho literal.
Preserve APIs/DTOs atuais, autorização, somente leitura, links de detalhe,
registro de coleta e demais destinos existentes.

Formulário: preserve nome, município/UF e demais campos conforme o contrato
atual (inclusive UF livre), coordenadas/validação, revisão do ponto e proteção
contra **geolocalização tardia sobrescrever edição manual**. Não introduza novo
recorte espacial ou política de preenchimento. Preserve
src/components/areas/area-map.tsx, area-map.client.tsx e map-config.ts:
mapa de coordenadas atual deve continuar funcional com OSM/atribuição/configuração
e wrapper client/SSR. **Mapa territorial é fase9** e não será redesenhado aqui.

Capas exigem preservar as dimensões e o protocolo reais:

- **featureEnabled**, **canEdit** e **image.hasImage** são independentes;
  não deduza uma das outras. Teste combinações materiais, recurso desligado,
  fallback/ausência e papéis/readOnly.
- Lista e detalhe usam projeções/DTOs próprios; o detalhe não fornece
  automaticamente o cover completo da lista. Leia a obtenção real do CoverDto.
- Leitura privada pelo proxy autenticado, upload/confirm/reconcile, progresso,
  limites JPEG/PNG/WebP10MiB/4096px por lado, tratamento de metadados e remoção
  continuam reais. Sem URL pública alternativa ou Cloudinary real para aparência.
- Preserve **expectedRevision/OCC**, tentativa estável/chave, resposta incerta,
  expiração, conflitos e recuperação; não descarte tentativa ou incremente
  revisão persistida só para reparar preview.
- **Recarregar capa tenta novamente o conteúdo mesmo com a mesma revision**.
  Preserve key/retryAttempt/controle de eventos antigos existentes. Sucesso só
  será anunciado quando a nova imagem carregar; falha de GET de metadados ou do
  conteúdo mantém mensagem honesta. Exercite evento tardio de imagem anterior.

Edite apresentação/componentes locais conservando estes comportamentos. Execute
regressões pertinentes de áreas, capas, autorização e contratos pelos fakes e
serviços sintéticos oficiais: tests/e2e/area-registration.spec.ts,
area-viewing.spec.ts, area-covers.spec.ts; unitários area-form-state,
area-authorization, area-contracts, area-cover-contracts, OpenAPI/paridade;
integração areas-route, area-cover-http/provider/transactions, area-covers e
migrations correspondentes, dentro dos runners preparados. Não altere backend,
schema, políticas de preenchimento ou domínio científico para ajustar o visual.
Fase5 não redesenha coletas, ambientais/drafts ou IHFR; seus links e funções
existentes devem continuar acessíveis e cobertos pela regressão.

## Branches, dependências e CI antes do primeiro push

`RECOMENDACAO`: uma branch/PR por fase, nomes livres como
`feat/frontend-laboratory-dashboard` e `feat/frontend-areas-cover`.
Registre nomes e SHAs reais. Conclua e valide ambas:

1. Se fase4 já estiver merged pelo mantenedor, inicie fase5 da development atual.
2. Se fase5 depender da4 ainda em revisão, crie-a **sobre o head validado da4**;
   abra PR empilhado temporariamente contra a branch da4, declarando dependência
   e destino final **development**. Não duplique commits compartilhados e não
   exclua a branch-base enquanto necessária.
3. Após merge da4, mantenedor/executor reconfere ancestralidade/diff e retargeta
   fase5 para development antes de sua integração. Retarget isolado não prova
   equivalência: confira o código cumulativo, CI exato e eventuais conflitos.
   Não espere novo aceite de execução para iniciar fase5, nem faça merge da4.
4. Se independentes, ambas podem partir de development com comprovação do
   resultado combinado, sem mudanças compartilhadas duplicadas.

**Antes do primeiro push de cada branch**, acrescente sua entrada **exata** em
`push.branches` **e** no `if` do job validate de `.github/workflows/rc-review.yml`.
Acrescente exclusão exata de preview por branch em `vercel.json`, no padrão
vigente. Acrescente apenas uploads focais de capturas sanitizadas necessários,
preservando retenção/segurança. Esses ajustes fazem parte da entrega autorizada.
Preserve15 gates, runners, Actions fixadas, permissões, timeouts e guards;
não crie CI/deploy global, altere provedores ou opere deploy manual.
Essas exclusões não desativam os deploys automáticos existentes de development.

## Validação, evidências e limites das duas fases

Use runtime/npm/lockfile atuais, `npm ci --no-audit --no-fund`,
`npx prisma generate`, `npm run typecheck`, `npm run lint` e `npm run build`
padrão. Não substitua bundler para conseguir PASS. Leia
`docs/operations/rc-review-ci-runbook.md`, `scripts/rc-review-validation.ps1`,
`scripts/accounts-local-postgresql.ps1` e runners pertinentes antes de executar.
No Windows, com cluster sintético próprio preparado, use
`./scripts/rc-review-validation.ps1` ou `-Gates` pertinentes conservando setup.
**-InitializeCiCluster é exclusivo do Actions Windows isolado**, nunca da máquina
normal. Sem banco real, env/credenciais reais, afrouxamento de assertions,
timeouts, guardas/allowlists ou E2E focal sem ambiente completo.

Confira **15 gates no CI do head publicado de cada PR**, inclusive conjunto
cumulativo quando empilhado: RegressionSetup, Unit, Integration, Migration,
Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap e
SchemaAudit. Evidência antiga não prova resultado de código novo. Se o ambiente
local não suportar harness completo, registre o limite e use CI oficial para os
gates correspondentes; encaminhe somente impedimento real restante.

Cubra regressões de contas/login/shell/contexto/sessões já integrados e os fluxos
novos de resumo/histórico/membros/áreas/capas. Testes novos verificam comportamento
material, contratos, estado e permissões; não classes CSS. Preserve FAILs/reruns
e alcance de cada evidência; PASS posterior não apaga ocorrência ou prova causa.

Produza capturas **reais do Next em375/768/1440**, reflow **320/texto ampliado**,
antes/depois, incluindo vazio/loading/erro/conflito, foco/teclado, diálogos,
filtros/paginação **já existentes**. Não invente filtros para cumprir a lista.
Intercepção de transporte de UI não comprova autenticação/API real. Diferencie
automação/Chromium, inspeção visual do agente e aceite humano; captura não
certifica WCAG integral ou leitor de tela manual. Declare navegadores testados.
Publique só evidências sintéticas/sanitizadas: mascare campos preenchidos e
exclua senha (inclusive sintética), token/prova/fragmento, cookie, env e traces/
snapshots sensíveis. Não opere Gmail/Cloudinary/Neon reais para validar visual.

Preserve **CONTRATO_EXPERIMENTAL**, **VALIDACAO_CIENTIFICA_PENDENTE**,
**SUJEITO_A_RECALIBRACAO**, **NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO**
e ADR-0001. Adaptação visual não valida ciência. Gate B012, aceite operacional013,
Cloudinary e operadores conservam seus gates; não bloqueiam automaticamente o
recorte visual sem dependência material.

## Entrega e impedimentos concretos

Entregue **ambas as fases completas**, commits/push, PRs revisáveis, bases e
dependências, CI por SHA, capturas, resultados/limites, spec/plan/tasks atualizados
e **ordem de integração pelo mantenedor: fase4, depois fase5 quando dependentes**.
Descrições dos PRs explicam problema/resultado, origem visual, recorte, contratos,
validação, limites e base temporária quando houver; sem alegar aceite humano,
serviço real, leitor de tela ou homologação não executados. Não pare ao abrir
primeiro PR nem peça confirmação normal já concedida para commit/push/PR.

Pare somente a parte afetada por novo defeito material, perda de dados/acesso,
conflito que ameace trabalho, check/regra/permissão impeditiva ou decisão material
de produto/domínio/ciência além do recorte. Registre cenário, causa comprovada
(ou hipótese rotulada), evidência e instrução de correção; prossiga nas partes
independentes seguras. Limite de escrita deve identificar operação que falhou
e o que permaneceu sem execução, sem declarar remoto o que existe só localmente.
Recuperação por commits delimitados e revisão normal; eventual revert após merge
pertence ao mantenedor, sem reset/force. Nenhum rollback de banco está previsto.

Referências opcionais: [plano global](plano-de-incorporacao.md),
[relatório](relatorio-de-prontidao.md), [acompanhamento](plano-de-acompanhamento.md)
e [evidência desta integração](integracao-contas-workspace-e-handoff-fases-4-5.json).
