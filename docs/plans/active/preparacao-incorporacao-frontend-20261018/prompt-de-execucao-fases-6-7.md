# Execução autorizada — fases 6 e 7 do frontend

Execute **ambas as próximas fases completas do planejamento existente**:
**6 — Coletas** e **7 — Dados ambientais e drafts** no clone oficial
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack. Este prompt é autossuficiente para o professor/outro desenvolvedor usar
com seu Codex. Não pare depois de publicar o primeiro PR.

## Autoridade, limites e fontes

`DECISAO_CONFIRMADA`: Pedro, no pedido anexado “Integração dos PRs 13–16 e
handoff das fases 6 e 7”, recebido em **20/10/2026, America/Fortaleza**, autorizou
expressamente este executor a **implementar as fases 6 e 7, validar, fazer
commits, push e abrir/atualizar ambos os PRs, sem confirmação adicional de rotina**.
Merge futuro e aceite humano continuam com o mantenedor. A integração #13–16 já
foi concluída por Pedro com seu Codex; não é tarefa a repetir pelo executor.

Não fazer push direto em development/main, merge das futuras entregas, promoção
para main, deploy em produção, migrations em banco real ou operações em
provedores externos. Não refazer fases 1–5 ou implementar fases 8–10; preservar
as integrações existentes. Use autonomia para escolhas reversíveis de apresentação.

Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md,
.specify/memory/constitution.md, docs/code-first-prd/README.md,
docs/code-first-prd/governance/source-policy.md e docs/governance/SOURCE_AUTHORITY.md.
O pedido atual rege a autorização. PRD Code-First permanece `EM_REVISAO`;
código/testes/configuração são `EVIDENCIA_IMPLEMENTACAO`, sem provar intenção.
Identifique `INFERENCIA` e `RECOMENDACAO`; `DECISAO_CONFIRMADA` exige origem
registrada. Não promover documentação antiga a requisito atual nem gates
históricos a bloqueios sem dependência material. Preserve docs/raw/** e o histórico.

## Base verificada e preparação segura

**Development verificada: `24be57fa0ddeb9d3da72ae80606850d428e29fbb`**, árvore
`422d4d4a0376d34e9007e622c0b26b77387d2e7a`. Main local/remota: `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`.
Esta é a integração dos PRs #13 → #14 → #15 → #16, por merge commits:

| PR | Entrega / head | Merge em development |
|---|---|---|
| [13](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/13) | handoff4/5; `4144e12bf240091ebd0a133670e5a1726d2eab78` | `28d4459c02668f461d5b03b5bbf40a39050e5e0d` |
| [14](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14) | fase4/Spec020; `c076ec17f668ee7cf632a6bff0c71df4e7cd2564` | `16aa4437d3834ff4010f4b659fc314f8f64eac79` |
| [15](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/15) | fase5/Spec021; `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2` | `1491d827921f3e13400af4f4f0d9b31ec2299b98` |
| [16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16) | correção/diagnósticos Spec022; `b85edd8482fb5a72dbc70f9978332164c190d861` | `24be57fa0ddeb9d3da72ae80606850d428e29fbb` |

Produto, testes, dependências e configuração são **idênticos** ao head validado
`b85edd8482fb5a72dbc70f9978332164c190d861`; nove diferenças exclusivamente
documentais vêm do #13. #15/#16 foram redirecionados para development depois
do merge de cada dependência, sem alterar seus heads. Branches preservadas.
APPROVED técnicos assistidos realmente registrados pela conta PedroVitor237:

- [Review #14, 5581872118](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14#pullrequestreview-5581872118) no head `c076ec17f668ee7cf632a6bff0c71df4e7cd2564`.
- [Review #15, 5581887397](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/15#pullrequestreview-5581887397) no head `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2`.
- [Review #16, 5581901183](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#pullrequestreview-5581901183) no head `b85edd8482fb5a72dbc70f9978332164c190d861`.

Não houve autoaprovação de #13 nem review criada em nome de outro desenvolvedor.
Esses reviews técnicos não são aceite visual/manual humano.

| Head | CI oficial conferido | Resultado |
|---|---|---|
| #14 `c076ec1` | [run 39295724999, tentativa 1, job 118207595454](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39295724999/job/118207595454) | 15/15 gates PASS; E2E 136 |
| #15 `3f1eba5` | [run 39300023357, tentativa 2, job 118232460151](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/job/118232460151) | 15/15 gates PASS; E2E 154 |
| #16 `b85edd8` | [run 39343103206, tentativa 1, job 118369149836](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39343103206/job/118369149836) | 15/15 gates PASS; E2E 154 |

São CIs dos **heads das features**, não CIs dos commits de merge. Seus logs
oficiais foram baixados e os 15 registros/exit0/fingerprint único conferidos
nesta integração. Não houve nova execução local de Next/build/E2E/PostgreSQL,
dispositivo físico, leitor de tela ou homologação de produção nesta preparação.
Capturas selecionadas do desenvolvedor foram inspecionadas; dados sintéticos e
transporte fake de capa não comprovam Cloudinary real. O teste focal de logging
30/30 em Linux/Node24 com transformação temporária é evidência auxiliar relatada
no pedido, não nova execução desta integração nem substituto do runner oficial.

1. Inventarie identidade autenticada, origin, branches/upstreams, arquivos
   rastreados/não rastreados, worktrees e SHAs; preserve commits, ZIPs e processos
   preexistentes. Use origin oficial; não reutilize o upstream antigo.
2. Faça fetch e sincronize apenas por FF seguro quando cabível; sem reset --hard,
   rebase/force push, exclusão de branches, limpeza ou stash automático.
   Use worktree isolada quando necessário, sem pedir autorização de rotina.
3. Compare deriva de development desde o SHA acima. Delta documental não exige
   repetir a integração; delta funcional material exige revisão e regressão.
4. Fonte visual somente leitura: starter no commit indicado abaixo. Confira seu
   Git e registre eventual avanço sem trocar silenciosamente o corte autorizado.
5. Aplique as skills **instaladas**, lendo os SKILL.md de
   `.agents/skills/speckit-specify/`, `speckit-plan/`, `speckit-tasks/` e
   `speckit-implement/`; esclarecer/analisar quando material. Use o próximo número
   livre por fase, com spec/plan/tasks/contratos/evidências próprios e
   **PLAN → EXECUTE → REVIEW**. Não criar TASKS.md global nem OpenSpec duplicado.

O prompt está disponível diretamente na branch documental
`docs/handoff-frontend-fases-6-7`, sem aguardar o merge documental. Leia-o nessa
branch e inicie as branches funcionais da base verificada conforme a sequência;
não incorpore commits documentais só para começar a implementação.

## Autorização e organização das duas entregas

O executor está autorizado a executar as fases 6 e 7 completas, validar, fazer commits, push e abrir/atualizar os PRs sem confirmação adicional de rotina. Merge futuro e aceite humano continuam com o mantenedor. Deve concluir os dois PRs, e não parar ao publicar a fase 6.

Usar branches próprias, sugeridas feat/frontend-collections e feat/frontend-environmental-drafts, e Specs nos próximos números livres pelo Spec Kit instalado; não fixar números sem conferir. Manter PLAN → EXECUTE → REVIEW por funcionalidade e rastreabilidade com o PRD Code-First.

Fase 7 parte da fase 6 verificada. Se o primeiro PR ainda estiver aberto, pode empilhar o segundo nele, declarando dependência e destino final development; não aguardar o merge do mantenedor para iniciar a segunda entrega. O mantenedor fará retarget/reconferência depois do merge da primeira. Se a fase 6 já tiver sido integrada, usar development atualizada.

Fonte visual: HidroFlorestaStartup/hidroflorestas-frontend-starter, commit cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f, conforme o plano. Starter usa TanStack Start/Router/Query; o destino usa **Next.js App Router**, React e os controladores/serviços reais existentes. Adaptar composição e estilos com next/link/next/navigation; não transplantar infraestrutura TanStack, mocks/personas/fixtures ou dados sintéticos para o produto.

Usar Node 24.19.0/npm/lockfile e as versões atuais do FullStack. Ler os guias relevantes em node_modules/next/dist/docs antes de escrever código. Preservar autenticação real, contexto do laboratório, APIs/DTOs, domínio, persistência, permissões, banco e dependências existentes.

## Fase 6 — Coletas

Origens no starter:

- src/routes/dashboard.laboratories.$laboratoryId.areas.$areaId.collections.new.tsx
- src/routes/dashboard.laboratories.$laboratoryId.areas.$areaId.collections.$collectionId.index.tsx

Destinos no FullStack:

- src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx
- src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx
- src/components/collections/collection-form.tsx
- src/components/collections/collection-form-state.ts
- src/components/collections/collection-review.tsx
- src/components/collections/collection-detail.tsx

Ler specs/004-environmental-collection-registration/ e testes existentes, em especial tests/e2e/collection-registration.spec.ts, antes de definir o recorte.

Adaptar criação, revisão/confirmação e detalhe da coleta. Preservar instante, fuso, offset e precisão em milissegundos, inclusive ao revisar/voltar/reenviar; não normalizar silenciosamente com Date/toISOString ou truncar campos. Conservar recuperação de tentativa incerta, chave de idempotência e corpo original; timeout/retry não pode criar uma coleta duplicada. Manter confirmação e registros imutáveis, destinos/contexto do servidor e papéis atuais. Preservar estados de erro, carregamento, leitura, inativo e acesso negado, sem inventar capacidades.

A presença do painel IHFR no detalhe não autoriza implementar a fase 8: manter sua integração e qualificadores atuais, sem copiar cálculo, scores ou fixtures. Uma eventual alteração compartilhada precisa de regressão dos consumidores afetados.

## Fase 7 — Dados ambientais e drafts

Origens no starter:

- src/routes/dashboard.laboratories.$laboratoryId.areas.$areaId.collections.$collectionId.environmental-data.new.tsx
- src/routes/dashboard.laboratories.$laboratoryId.areas.$areaId.collections.$collectionId.environmental-data.index.tsx
- src/features/environmental/EnvView.tsx

Destinos no FullStack:

- As rotas existentes environmental-data/new/page.tsx e environmental-data/page.tsx sob collections/[collectionId]/.
- src/components/environmental-data/environmental-data-form.tsx
- src/components/environmental-data/environmental-data-form-state.ts
- src/components/environmental-data/environmental-data-review.tsx
- src/components/environmental-data/environmental-data-detail.tsx
- src/components/environmental-data/environmental-data-page.tsx
- src/components/environmental-data/environmental-draft-actions.tsx
- src/types/environmental-draft.ts e contratos/API do draft, como fontes a preservar.

Ler specs/005-environmental-collection-data/, specs/015-environmental-drafts/, decisões vigentes e os testes tests/e2e/environmental-data-registration.spec.ts, tests/e2e/environmental-data-read.spec.ts e tests/e2e/environmental-drafts.spec.ts.

Adaptar apresentação do formulário, revisão, leitura e ações do draft pessoal. O starter não tem equivalente completo do draft persistido: manter o fluxo real do FullStack. Preservar:

- false, zero, null, ausência, string vazia e entrada numérica parcial como “12.”, sem coerção/perda silenciosa.
- Campos condicionais, parser, baseline/touched, validações e estado de edição.
- Hidratação retardada e primeiro PUT: não sobrescrever draft ou edição local com leitura tardia; controles devem respeitar a prontidão real.
- Save explícito, revisão/ID/chave, concorrência otimista em duas abas, conflito, reload, descarte explícito, retomada, consumo ao confirmar e rollback.
- Recuperação de resposta incerta com chave/corpo estáveis; confirmação imutável; histórico e navegação com alterações ainda não salvas.
- Draft pessoal segregado e dados parciais fora do IHFR. Nenhum autosave inventado, novo cálculo, regra científica ou novo contrato de domínio.

Manter controladores/parsers/serviços existentes e separar commits de apresentação de correções funcionais concretas. Qualquer perda de dado demonstrada interrompe o recorte afetado até a correção e regressão pertinente.

## Validação e evidências exigidas ao executor

Usar os runners oficiais e PostgreSQL sintético próprio, sem buscar variáveis de produção. No Windows, seguir scripts/accounts-local-postgresql.ps1 e scripts/rc-review-validation.ps1, mantendo guards/allowlists e os runners dedicados de HTTPS, exclusão e IHFR. Não usar banco normal, provedores reais ou processos/portas alheios.

Rodar build padrão, typecheck, lint e os testes unitários/contrato/PostgreSQL/E2E pertinentes aos fluxos afetados; acompanhar os 15 gates oficiais no head final de cada PR, distinguindo execução local de CI. Não reduzir assertions, guards, readiness ou timeouts existentes para obter verde; diagnosticar falhas e conservar resultados anteriores.

Antes do primeiro push das novas branches funcionais, seguir o padrão atual: Preview desabilitado para cada nome real em vercel.json e inclusão focal no push.branches **e** no if do job existente de .github/workflows/rc-review.yml, sem mudar permissões, runners, Actions fixadas ou gates. Para evidências, acrescentar apenas padrões estreitos e sanitizados; não publicar .env, cookies, tokens, dumps, traces ou snapshots preenchidos.

Verificar 320/375/768/1440px, texto ampliado 200%, foco/teclado/toque emulado, erros/loading/retry e telas longas. Revalidar o shell móvel integrado: último controle acessível acima da navegação, paisagem/safe-area emulada, menus/diálogos, Back/Forward/reload e conteúdo rolável. Usar capturas reais de viewport, fullPage:false para demonstrar obstrução/visibilidade, com indicação de zoom/rolagem; fullPage pode complementar, sem substituir essa prova. Distinguir emulação de dispositivo físico e revisão automatizada de aceite humano.

Preservar o ajuste de capas/concorrência/sanitização da Spec 022. Não usar novo CI verde como prova da causa das falhas históricas. A intermitência IHFR e o incidente antigo de duas chamadas permanecem inconclusivos; a reprodução controlada do #16 tem quatro operações/três ondas e não demonstra retrospectivamente aquela causa.

IHFR deve manter CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. Dispositivo físico, outros navegadores, tecnologias assistivas e homologação em produção só podem ser declarados quando efetivamente realizados.

## Caminhos completos, contratos e regressões a consultar

Na fase 7, o prefixo das rotas é
`src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/`;
os destinos são `environmental-data/new/page.tsx` e `environmental-data/page.tsx`.
Os contratos da Spec005 (measurement-contract-v1.md e math-contract-v1.md em
contracts/) e a decisão de captura v1 continuam separados de validação científica.
Preserve measurementContractVersion e as projeções reais. Não preencher ausência
com zero, não misturar instante da ocorrência com confirmedAt, não criar rascunho
persistido de criação da coleta. O draft015 é pessoal de **medições** da coleta
já confirmada e continua segregado do conjunto confirmado.

Além dos testes já nomeados, leia unitários de collection-form-state e
environmental-data-form-state, testes de contratos/rotas e transações de coleta,
dados ambientais e drafts localizados no repositório. Preserve os testes atuais
de áreas/capas, dashboard, contexto, shell, conta, exclusão e os seis IHFR;
mudanças compartilhadas exigem regressão dos consumidores materialmente afetados.
Rastreabilidade: Spec004 / CF-PRD-FR-006 / CF-UC-009 / CF-PFLOW-005 para coletas;
Specs005/015 / CF-PRD-FR-007 / CF-UC-011 para dados ambientais. Cada vínculo
conserva seu estado Code-First em revisão, sem nova aprovação normativa.

Leia docs/operations/rc-review-ci-runbook.md e os scripts oficiais antes de
executar. Use Node24.19.0, npm ci --no-audit --no-fund, npx prisma generate,
npm run build, npm run typecheck e npm run lint, com o lockfile existente.
O destino conferido usa Next16.3.8, React19.2.4, Prisma7.4.2 e Playwright1.55.1;
reconfira package.json/lockfile se a base avançar. Não trocar bundler/runtime ou
instalar as dependências do starter. Não substituir globals.css/layout raiz,
Poppins, sessão real, parsers ou controladores por conveniência visual.

Os **15 gates obrigatórios no head final de cada PR** são RegressionSetup,
Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E,
Https, Deletion, Ihfr, Bootstrap e SchemaAudit. No Windows, o runner oficial
rc-review-validation.ps1 pode selecionar -Gates mantendo setup/guards necessários;
**-InitializeCiCluster é exclusivo do Actions Windows isolado**, nunca da máquina
normal. Não rodar E2E focal solto fora do ambiente completo exigido. Se um gate
não puder rodar localmente, declare NOT_RUN/limitação e confira-o no CI oficial,
sem apresentar evidência antiga como teste de código novo.

Histórico a preservar: FAIL de navegação da Spec019/#12; IHFR anterior ao login
e falhas intermitentes de #14/#15; quota concorrente histórica e falhas locais
de ambiente/guard da 022. #16 demonstrou correção **somente** no schedule de quatro
operações/três ondas; não demonstrou retrospectivamente a causa das duas chamadas
nem dos seis FAILs IHFR. Não reduzir guards, readiness, asserts ou timeouts e não
chamar novo verde de explicação causal. Recibo vigente de022:
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#issuecomment-6280516630

## Entrega dos dois PRs e impedimentos

Entregue as duas implementações, commits/push e PRs revisáveis, bases/dependência,
specs/planos/tarefas atualizados, capturas antes/depois sanitizadas, resultados por
head/run/tentativa e limitações. Descreva problema e comportamento final, origem
visual, contratos preservados e correções funcionais em commits separados.
Ordem futura do mantenedor: fase6, depois retarget/reconferência da7 para
development se empilhada. Merge e aceite humano não são delegados ao executor.

Pare apenas o recorte afetado por perda de dado demonstrada, regressão material,
conflito sem autoridade, ameaça ao trabalho preexistente ou regra/permissão do
GitHub impeditiva. Registre cenário/caminho/evidência, causa comprovada ou
hipótese rotulada, resultado esperado e correção necessária; prossiga nas partes
independentes seguras. Não invente decisões de ciência/domínio/produto, revisões
de terceiros, homologação externa ou publicação que não ocorreu. Restrição de
escrita deve identificar a operação recusada e o que falta publicar.

Referências do pacote: [plano global](plano-de-incorporacao.md),
[acompanhamento](plano-de-acompanhamento.md), [relatório](relatorio-de-prontidao.md),
[plano desta preparação](plano-de-continuacao-fases-6-7.md) e
[recibo da integração](integracao-fases-4-5-correcao-022-e-handoff-fases-6-7.json).
