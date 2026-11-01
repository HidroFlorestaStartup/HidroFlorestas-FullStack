# Implementation Plan: navegação e conta — preparação A

## Plano corrente A6 — AGUARDANDO_REVISAO

**Objetivo:** publicar a reconciliação da PR #46/Spec 035 e uma proposta visual focal revisável; preservar o produto aprovado e a dependência de B. A feature completa não está encerrada.

**Origem/autorização:** pedido HF-UI-044-A6 do usuário em 01/11/2026 autoriza correções próprias em A e recibo factual em #45. Nova branch/job UI-06 exige autorização específica; a tentativa composta anterior foi consumida. Constituição 1.0.0, AGENTS, PLANS, SOURCE_AUTHORITY e PRD Code-First conforme classificação; decisões UI de Pedro no handoff #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Inspeção das specs 035–037 sem ampliar ownership.

**Estado inicial observado:** checkout `G:/projetos/ifma/HidroFlorestas-FullStack` em C, `799c00a42d7f3846c3449d3615d263ce0b0e7bd2`, um worktree registrado; C sem upstream configurado. Única entrada no status: pasta não rastreada `docs/plans/active/hf-ui044-close-qa-actions-prepare/`. Ela contém um clone/scratch com índice composto e arquivos preexistentes: somente leitura. Nenhum reset/clean/checkout, branch local, índice, configuração ou conteúdo dessa preparação alterado. Leitura de objetos Git desse clone e cópia documental própria na raiz de visualizações desta sessão; publicação via API com lease da branch A. Fetch no checkout original recusado por acesso a FETCH_HEAD; não foi necessário alterar suas permissões. Refs atuais foram consultadas na API oficial.

**Leases do corte:** GUARD `07755822f5dc75fe2be1d924005d30ed99f64a0b`; A `6f236bbe7b5f4d7f9718efaa2c334f7d1520e0a0`; B `1c44058cb45e461c719d514829a4e78d2bf7ee05`; C `799c00a42d7f3846c3449d3615d263ce0b0e7bd2`; #45 `a89feceb7fab9bff00fa16efd6e61e553fd9f50c`; development `9b8595d232842d401ce81bbc92c54dd543aa2829`; main `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`. A/B/C são descendentes de GUARD; nenhuma foi empilhada. #46/#47/#48 continuam Draft abertas para development; #44 não foi alterada. Revalidar leases antes e após publicar.

**Escopo de escrita:** quatro documentos correntes da Spec 035, `evidence/a6-review.json`, `evidence/ui06-bilateral.patch` (inerte), `ui06-runtime-proposal.md`; metadados da #46 e recibo #45. Produto/testes ativos, B/C, configurações ativas, docs/raw e registros globais somente leitura. Não há nova decisão global que exija editar TECH_DECISIONS/DOCUMENT_REGISTER/PENDING_DECISIONS neste recorte.

| Etapa | Responsável | Critério e estado |
| --- | --- | --- |
| ANALYZE | executor A6, sem subagentes | Fontes/refs/ownership e sete arquivos A inspecionados; ZIP A5 e composto auditados; pré-requisitos Spec Kit executados na cópia própria. CONCLUIDO |
| PLAN | executor A6 | Dependência B explícita; sem nova hipótese de defeito próprio A; tarefas de revisão separadas dos requisitos PASS. CONCLUIDO |
| IMPLEMENT | executor A6 | Documentos reconciliados; uma proposta de patch UI-06 inerte; publicação somente em A/#46 e recibo #45. EM_ANDAMENTO até recibo remoto |
| REVIEW | executor A6 | Diff/whitespace/links/classificações, integridade dos ZIPs, invariantes do patch e readback por SHA; observar CI automática de A6, sem rerun/dispatch. EM_ANDAMENTO até recibo remoto |
| UI-06 executada e aceite | mantenedor/QA/B | Nova autorização específica de runtime, comparação real e aceite humano. PENDENTE |

**Análise Spec Kit (somente leitura, anterior às edições):** 5 FR, 4 SC e 27 tarefas; todos os requisitos possuem tarefas (100% cobertura de planejamento, não de aprovação). Sem violação nova da constituição ou requisito órfão. Quatro inconsistências de estado: I1 HIGH — CI final A5 ainda pendente nos topos; I2 HIGH — dependência corrigida B e PASS composto ausentes; I3 MEDIUM — revisões realizadas confundidas com aprovação; I4 HIGH — UI-06 sem pares/runtime e UI037 sem captura dedicada no ZIP. Remediação documental autorizada no pedido A6, sem mudar requisitos. T007/T015/T027 continuam abertas; T019/T022 preservam os critérios originais de PASS.

**Decisão pendente de integração:** se a política do mantenedor exigir A verde isolada, escolher B antes de A e revalidar na nova base, ou autorizar transporte mínimo do reparo compartilhado. Não foi observada uma decisão que dispense essa exigência; nenhuma das opções foi executada. Guards/#45 seguem dependência de integração. Não fazer merge/rebase/empilhamento por conta própria.

**Riscos e pontos de parada:** drift concorrente da branch recusa atualização por lease; não atribuir PASS composto a A; nenhuma alteração funcional sem RED causal novo; nova publicação/job UI-06 somente após aprovar o diff e sua guarda Preview false antes do primeiro push. A proposta shell não encerra UI-06 global. QA/C controla o arquivamento UI037. Ciência/aceite operacional/humano seguem separados.

**Validação proporcional:** não repetir quinze gates por documentação. Os ZIPs oficiais A5 e composto foram baixados, hashes/CRC/journals conferidos; fontes A/B/composta comparadas; duas capturas compostas 667×375 visualizadas. CLI de pré-requisitos passou na cópia com os caminhos Git Bash corrigidos após falhas de inicialização/caminho; sem hook `.specify/extensions.yml` no corte observado. Nenhum runtime starter/FullStack/PG foi iniciado no host. Build/typecheck/lint/testes ativos novos NOT_RUN por delta documental; CI automática decorrente da publicação terá resultado próprio no recibo da PR.

**Histórico A6:** 01/11/2026 NAO_INICIADO → EM_ANDAMENTO (auditoria e redação) → AGUARDANDO_REVISAO (reconciliação preparada; publicação e recibo identificados na PR #46). Publicação documental não conclui a feature nem concede merge/deploy.

## Histórico anterior à reconciliação A6

As afirmações temporais abaixo pertencem aos respectivos checkpoints; o estado corrente é o A6 acima. Relatos antigos de CI pendente, ambiente não observável e ferramentas indisponíveis não descrevem esta sessão.

**Branch**: `feat/ajustes-navegacao-conta` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: EM_ANDAMENTO — mapa concretizado e código/testes preparados na própria reserva. Scripts CLI do Spec Kit não executados neste ambiente API-only; estrutura specify → plan → tasks → implement reconciliada manualmente.

## Summary and technical context

Implementar UI-01/UI-05/UI-06 no shell e conta. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`, pai development `9b8595d232842d401ce81bbc92c54dd543aa2829`. PR de guards #45 é dependência de integração, não bloqueia trabalho isolado.

Aplicação Next.js/App Router e TypeScript existente; preservar dependências e contratos. CI Windows/Node 24.19.0/PowerShell com quinze gates sintéticos. Ler package/lockfile e documentação local da versão Next antes de codificar. Não instalar ou mudar dependências por inferência do G0. Metas quantitativas de desempenho além do aceite: não especificadas.

## Constitution Check

Decisões atuais e recorte aprovados; spec/branch/PR próprios; documentação histórica imutável; auth e dados existentes preservados. Verificação de ownership e diff por paths realizada; validação funcional e revisão independente ainda pendentes. Revisão atual do mesmo coordenador não é revisão independente.

## Project Structure and ownership

Documentos exclusivamente em `specs/035-ajustes-navegacao-conta/`. O executor deve enumerar e congelar os arquivos concretos de shell, layouts privados, workspace e conta em `src/` antes de editar, após ler AGENTS aplicáveis. G0 não inspecionou cada componente para fechar esse mapa e não autoriza refatoração global.

A é writer do shell/layout; B/C não editam esses arquivos em paralelo. Estilos globais, UI compartilhada, fixtures, configuração, dependências e autenticação exigem coordenação. Configurações de deploy e workflow são somente leitura. Nenhum novo schema previsto por este recorte.

Testes próprios propostos: `tests/unit/hf-ui035-navigation.test.ts` e `tests/e2e/hf-ui035-navigation.spec.ts`, adaptando localização ao harness realmente existente sem duplicar runner. Os arquivos de testes foram criados na branch A após o G0 e submetidos à verificação do CI; não afirmar PASS antes da Actions.

## Sequência

1. Revalidar refs, ancestralidade, PRs, guardas, ambiente local e exclusividade de arquivos; preservar alterações existentes.
2. Completar specify → plan → tasks com skills `.agents/skills/speckit-*`, reutilizando esta reserva, sem criar outra branch/spec. Confirmar rastreabilidade Code-First e arquivos reais.
3. Implementar e testar US1; depois US2; comparar US3. Novos testes devem demonstrar a regressão antes da correção quando reproduzível.
4. Executar testes focais, Typecheck/Lint/Build e o runner completo quando ambiente permitir; registrar cada resultado real por SHA, run e tentativa. Não enfraquecer gates.
5. Atualizar documentos e PR próprio, revisão independente quando disponível; sem aprovação humana simulada, merge ou deploy.

## Integração e handoff exato

Trabalhar na branch existente derivada dos guards. Diff exclusivo: `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial: `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. Recalcular a base de development antes da integração futura. PR final sempre para development, mantendo dependência #45 explícita.

Nenhuma necessidade de aguardar implementação de B/C. Mudança necessária em contrato compartilhado deve ser proposta com hunks e testes ao coordenador, sem absorver suas branches. Guards devem integrar primeiro em autorização posterior; squash/rebase requer transportar apenas commits exclusivos após a base dos guards e revalidar o diff. Não executar essa integração agora.

## Riscos e pontos de parada

Sobreposição da barra mobile, foco perdido, rotas reais alteradas e concorrência em layout são riscos focais. Conflito não resolvível para somente o arquivo afetado. Sem merge/deploy/main/development/provedores, REV-01–REV-03 ou ciência. Testes/aceite final pendentes em [implementation-evidence.md](implementation-evidence.md).

## Mapa concreto de paths, contratos e regressões — implementação A

| Path sob ownership A | Mudança e contrato | Verificação |
| --- | --- | --- |
| `src/components/shell/navigation-state.ts` | Projeção de links; sem autorização client-side | `tests/unit/hf-ui035-navigation.test.ts` |
| `src/components/sidebar/index.tsx` | Só destinos globais fora de laboratório; nenhuma Área sem contexto | E2E 035/workspace/mobile |
| `src/components/shell/laboratory-navigation.tsx` | Navegação contextual única, rotas Next reais, Membros condicional ao `canManageMembers` SSR | E2E 035/workspace/dashboard |
| `src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx` | `getLaboratoryContext` preservado; trilho como irmão do cabeçalho contextual | E2E 035/consumidores |
| `src/components/top-bar/index.tsx` | Disclosure Conta para `/change-password` e `/delete-account`; Sair somente `/logout`, sem novos handlers | E2E 035/workspace/account/logout |
| `src/components/shell/shell.module.css` | Sidebar desktop, rodapé fixo mobile com safe-area, contexto compacto | captura e geometria do E2E 035 |
| `src/components/shell/use-content-scroll.ts` | Foco de controles considera o limite superior da barra fixa no mobile | E2E 035/mobile regression |
| `tests/unit/hf-ui035-navigation.test.ts` | Ausência de destino global inválido, rotas, papel e active state | `npm run test:unit` |
| `tests/e2e/hf-ui035-navigation.spec.ts` | owner/member, 320/375/390/768/1440, zoom, safe-area simulado, conta, histórico e último controle | `npm run test:e2e` |
| `tests/e2e/frontend-mobile-navigation.spec.ts`, `frontend-workspace.spec.ts`, `frontend-dashboard.spec.ts` | Atualizar apenas as expectativas de apresentação incompatíveis com UX aprovada; manter assertions de domínio | E2E oficial completo |

**Contratos inalterados:** `getLaboratoryContext` exige sessão/autorização e decide 404/redirect, não há escolha implícita de laboratório; `canManageMembers` não é expandido a ADMIN global. Sem edição em AuthContext, serviços, Prisma, API, conta, dados ou fixtures. Sem alteração no código de `logout`, troca de senha ou exclusão. Destinos visuais possuem `href` existentes. O layout protegido do laboratório continua fonte de nome/status/papel.

**Ownership compartilhado:** nenhum arquivo global, `package.json`/lockfile, `tests/fixtures`, `vercel.json`, `.github/workflows/rc-review.yml` foi alterado. A entrega B/C deve consumir os links/navegação de A sem editar o shell. Qualquer delta compartilhado novo exige coordenador e teste correspondente.

**Constituição/Spec Kit:** (I) escopo de Pedro 30/10 confirmado #44; PRD Code-First em revisão; (II) feature vertical; (III) única reserva 035; (IV) traces e estados separados; (V) autorização server-side; (VI) raw/histórico imutáveis; (VII) mesmo writer exclusivo. Não foi criado data-model porque não há entidade/campo novo. CLI Spec Kit não executado na sessão sem checkout íntegro/current Node 24; a análise/artefatos foram adaptados aos templates existentes, sem alegar uso da CLI.

**Regressão exigida:** `npm run test:unit`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:e2e`, runner sintético oficial `scripts/rc-review-validation.ps1` com 15 gates no HEAD final. Só GitHub Actions com dados próprios; nunca usar banco/provedores hospedados. Se a falha IHFR no baseline G0 persistir, manter FAIL sem editar ciência.

**Limitação visual:** starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` é somente leitura; capturas atuais de FullStack podem surgir do E2E e são claramente identificadas pelo run, mas não comprovam a comparação bilateral sem runtime starter. Visuais antigos da #44 não são tratados como execução.

## Ciclo Spec Kit ANALYZE → PLAN → IMPLEMENT → REVIEW — correção pós-CI #46 (31/10/2026)

### ANALYZE (somente leitura, executado contra o HEAD d8951199)
Reconciliados FR-035-001..005 (5), SC-035-001..004 (4) e T001..T009 (9). Sem requisitos órfãos, mas persistem lacunas de **evidência de aceite**: UI-06/T007 carece da comparação de dois runtimes; T008 não tinha suite PASS; T003/T005 estavam marcadas como escritas, não testadas; T002 não passou pela CLI Spec Kit. Constituição 1.0.0 mantida; nunca converter aprovação de UI em aprovação de código.

A fonte de diagnóstico **é o ZIP real da Actions** `41232069860` tentativa1, SHA `d8951199baa88beddb930b2ce14e33b9848cbe18`, artefato `13054207847`, SHA-256 `9979305f73e4bde6a1480dfa5849d3a86171e2c30025e27434eaa4f9eac1ba05`. Foram 9 gates PASS; `E2E` FAIL com 213 PASS/10 FAIL; os cinco gates subsequentes não rodaram (HTTPS, Deletion, IHFR, Bootstrap, SchemaAudit). Achados reproduzíveis nos logs e PNGs do próprio SHA:

| ID | Severidade | Sintoma comprovado | Origem/Risco |
| --- | --- | --- | --- |
| A-01 | HIGH | fluxo real de recuperação espera link Alterar senha no header; novo disclosure Conta não foi aberto | expectativa E2E stale; jornada ainda precisa autenticação real |
| A-02 | HIGH | em 844×390, texto200, controles de coleta/ambientais estão por trás do header sticky (175px), `elementFromPoint` atinge `headerInfo` | identidade da UI-01 pode causar wrap; teste de geometria não pode ser enfraquecido |
| A-03 | HIGH | no laboratório, três testes UI-035 falham ao focar último controle com barra fixa; PNG 320/text200 tem rótulos sobrepostos | foco e reflow inadequados |
| A-04 | HIGH | duas regressões de dashboard com respostas reais retidas chegam a timeout durante troca de laboratório | helper de teste usava navegação dentro do segmento suspenso; preservar contraprova de dados stale |
| A-05 | MEDIUM | suite mobile antiga aguarda animações continuamente no texto200 até timeout90s | proteger prontidão sem dispensar verificação de visibilidade/foco |
| A-06 | HIGH | UI-06 bilateral runtime starter/FullStack não executada | T007 e SC-035-003 continuam pendentes |
| A-07 | HIGH | 5 gates bloqueados por E2E FAIL | 15 gates precisam ser observados em HEAD final |

### PLAN / ownership preservado
- Corrigir a cadeia UX real em `TopBar` e sua regressão de conta; **nenhuma** mudança em login, sessão, POST de logout, senhas, exclusão ou mock de serviços.
- Corrigir reflow do footer em alta escala por wrapping de links sem quebrar palavras, mantendo `aria-current`, role e nomes; reservar espaço real após o último conteúdo.
- Conter altura visual do cabeçalho desktop entre 768–1023 mesmo com texto200: identidade truncada visualmente (nome completo acessível no disclosure), sem perder componente nem alterar auth.
- Fazer `use-content-scroll` deslocar apenas o scrollport dono em um passo determinístico; preservar scroll cache e sem relaxar asserts de geometria.
- No teste de dashboard com API intencionalmente bloqueada, iniciar retorno pelo link **persistente** do cabeçalho; o teste novo 035 permanece cobrindo retorno pela navegação contextual e autorização.
- Animações: limitar repetições de espera apenas no auxiliar do shell; foco/visibilidade/teclado continuam assertions funcionais.
- Executar suite preservada `rc-review-validation.ps1` no SHA final pela Actions oficial, inspecionar ZIP por gate e comparar falhas e screenshots; não tocar workflows, globais, dependências, B/C, fixtures ou ciência.

### REVIEW gates e critérios de saída
PASS somente quando o artefato final mostrar testes focais, segurança e todos os 15 gates PASS no mesmo SHA. Se houver FAIL, diagnosticar seu stack trace, não mascarar via `test.skip`, falso retorno ou timeout arbitrário. Se apenas 10 gates executarem, registrar os cinco restantes NOT_RUN. Comparação bilateral UI-06 segue independente da cobertura executável: **não dizer COMPLETO sem executar o starter**. Revalidar `GUARD_SHA`, development e ownership antes do push; manter PR #46 Draft sem merge/deploy. Se tempo/ambiente impossibilitar execução visual, registrar pendência factual.

### Ciclo A3: diagnóstico incremental e plano de verificação

O run A2 `41251125020` eliminou as 5 falhas anteriores de conta, dashboard e header em paisagem (e outras 2 de foco), mas deixou 5 falhas E2E e 3 cenários sem execução, conforme relatório real na implementação-evidence. Sem mudança de requisito, o plano incremental é: (1) corrigir scroll-padding escalado em `rem` exclusivamente no shell A e preservá-lo compatível com `env(safe-area-inset-bottom)`, (2) aguardar transições de modo limitado no auxiliar E2E sem enfraquecer as assertions de geometria, (3) selecionar controle *operável* no teste 035 e exigir foco real, (4) repetir o runner oficial no novo commit, ler PNGs/JSON e journal, (5) manter UI-06 bilateral como pendência se não for executada. O mapa e o dashboard de domínio não são modificados.

### A4 — reparo de tipo da preparação de testes

[Run A3 #41252699370](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252699370), tentativa 1, SHA `8b9a60c3ff36f7ab80ef58eb8d035b71a2d60822`: RegressionSetup, Unit, Integration, Migration, Contract e R1 **PASS**; Build **FAIL** no typecheck do Next 16.3.8 em `tests/e2e/frontend-mobile-navigation.spec.ts:74`, `TS2365 Operator '<=' cannot be applied to types CSSNumberish and number`. Typecheck separado, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit não executados pelo runner fail-fast. O valor Web Animations `endTime` é `CSSNumberish`; o reparo A4 exige `typeof endTime === 'number'` antes da comparação. A espera ainda é finita e as assertions funcionais seguintes permanecem inalteradas. Revalidar todo o runner no HEAD A4, sem invocar PASS herdado de A2.

## A5 — HF-UI-044-CLOSE-A5 (01/11/2026): ANALYZE → PLAN → IMPLEMENT → REVIEW

**Estado: EM_ANDAMENTO, validação do novo HEAD ainda não comprovada.** Fonte primária: [Actions A4 #41253192621](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41253192621), tentativa 1, SHA `e52763b8483b8a3376e3408cb04eb43b1b54370e`, artefato #13061594715 (`sha256:82b3f7942deea9be3a8665cd155a631cc43947190124d47e9a85dcef60a8b3fb`). Journal: 12 PASS até Deletion; Ihfr FAIL (4 E2E PASS/2 FAIL), Bootstrap e SchemaAudit NOT_RUN. Os 404 de G0 não se reproduzem neste corte: as rotas de coleta retornaram 200 e a criação 201 no banco sintético.

**A5-A — ownership A, safe-area:** `tests/e2e/ihfr-diagnosis-manage.spec.ts` (somente leitura, ownership B), linha 90, exige `paddingBottom === 42` após inset inferior simulado de 34px, porém o CSS próprio de A em `src/components/shell/shell.module.css` reservava `6px + 34px = 40px`. A barra global móvel já usa 8px de clearance. Reparar **apenas** o CSS de navegação contextual A para `8px + env(safe-area-inset-bottom)` e conferir o valor computado 42 no próprio teste A `hf-ui035-navigation.spec.ts`. Não modificar as assertions de B nem a altura mínima dos alvos, texto ou proteção de foco.

**A5-B — componente sob ownership B (bloqueio de composição):** `ihfr-diagnosis-read.spec.ts:46` exige `toBeInViewport({ratio:1})` e observou `0.9667754173278809` para “Não aprovado como contrato científico definitivo”, em 667×375 com texto 200%. A captura viewport A4 registra header até 74px e navegação fixa iniciando em 300,5px; conteúdo sem overflow horizontal. Na árvore A, `scientific-notice.tsx` ainda usa `sm:grid-cols-2`, impondo colunas estreitas. A Frente B já substituiu por `grid-cols-1 ... lg:grid-cols-2` no seu HEAD `d7586ab95c69c45211e463516080e741bbb3931a`, com texto e qualificadores preservados. **Não transportar essa mudança de B para A, não alterar seu teste ou relaxar ratio**. Encaminhar evidência e condicionar o PASS composto à integração de ownership autorizada; não classificar o gate isolado da A como PASS enquanto faltar tal integração.

**PLAN/escopo:** arquivos editáveis A são `src/components/shell/shell.module.css`, `tests/e2e/hf-ui035-navigation.spec.ts` e a documentação `specs/035-ajustes-navegacao-conta/{plan,tasks,implementation-evidence}.md`. Outros arquivos de B/C, fixtures, testes IHFR B, `vercel.json`, workflow, schema, cálculos e autenticação ficam intocados. Confirmar regressões de navegação, contexto/conta, foco, teclado, 320–1440px, safe-area e consumidores. As verificações oficiais permanecem sem relaxamento.

**REVIEW obrigatório:** conferir o SHA publicado, o run/tentativa do HEAD com `.accounts-validation/results.jsonl`, os quinze nomes únicos e `exitCode=0`, screenshots e log bruto. A falta de PASS em B no branch A permanece FAIL, nunca herdar 15/15 de #48 ou outro commit. UI-06 bilateral requer runtimes realmente executados de starter e FullStack; em sessão GitHub API sem checkout contemporâneo/runtime duplo, `UI06_BILATERAL_NOT_RUN` e T007/T015 permanecem abertos. Sem review independente, simulação de subagentes, merge ou deploy.

## CLOSE-PARALLEL-02 A — 2026-11-01

Estado EM_ANDAMENTO. Origem: mandato atual do usuário e PROMPT01 em22bb9c1b.
ANALYZE somente leitura: FR035-001..005 e SC035-001..004 têm tarefas; lacuna material
UI06/T007/T015/T027 permanece. Readiness de dois frames conflita com escala exata
durante transition:.3s em globals.css; query CDP em contêiner genérico não observa
TextNodes; ações Conta não existem no starter. Sem conflito normativo/científico.
RECOMENDACAO técnica autorizada: adaptar patch5e38263d, sem alterar globals.css.
Fontes: harness048de7c5, startercbb954a7, decisões972f9b00, composição6c61056f.
Sete documentos A6 transportados por blobs deff5db4f; histórico preservado.

PLAN: shared.ts espera16/32px com polling3s, estabilidade pós-layout e diagnóstico
persistido antes de FAIL; CDP em até8 TextNode owners visíveis por região, sem texto;
UNOBSERVED é evidência insuficiente. Observar reload antes de reconfigurar inline.
Contrato congelado do coordenador emqa/hf-ui044/contract.ts. Smoke sem imports DB.
Casos independentes porlayout; fixture/autenticação/cleanup owned por teste,
índice planejado e JSONL incremental duráveis, sem336pares monolíticos.
Matriz:7viewports x100/200, Conta320/390/1440 ambos contextos; inset0/34 em375/667;
foco/hit-test/Back/Forward/reload nas classes mobile/paisagem/desktop relevantes.
ratio1 e qualificadores preservados; defeito de menu só altera produto após reprodução.

ANALYZE pós-plano: T028..T033 cobremFR035-003/SC035-003 e apoio001/002;
nenhum requisito novo nem tarefa órfã. ConstituiçãoI–VII mantida. Não criar dados/modelo.
Skills lidas e aplicadas por adaptação manual; paths-only SpecKit executado sem escrita
de feature.json; setup-plan/CLI completa não invocados. Sem extensions.yml/checklists
na reserva observada. Node24.14 local serve smoke sintético, não runtime oficial24.19.

REVIEW: smoke Chromium real e contraprovaRED antes da qualificação integrada,
syntax/focal types e escopo/whitespace; typecheck completo pelo runner do coordenador.
UI06 bilateral/15gates novos/aceite humano permanecemNOT_RUN até evidência própria.

### CLOSE02 — reparo focal de pares incompletos após QA estática

ANALYZE read-only: o retorno de `some([])` permitiaCOMPARABLE sem imagens;
shared.capturePair([]) também registravaPASS sem erro de captura. SeveridadeMEDIUM,
evidência reproduzível emzero/umruntime; não muda produto, requisito ou autoridade.
PLAN/IMPLEMENT autorizado: cardinalidade diferente dedois torna execuçãoFAIL,
comparabilidadeINSUFFICIENT_EVIDENCE e completudePARTIAL emshared e shell.
O catch de shell mantém a classificação capturada emvez de sobrescrevê-la.
Adicionadosdois casos smoke semDB; caminhos completos preservam lógica anterior.
REVIEW: RED2/2FAIL antes do reparo; GREEN5/5PASS, types completos locais/lint/diffPASS.
Node24.14/Chromium existente: não éCI oficial. Código exclusivo d27a1e6,
[recibo e hashes](evidence/close02-pair-repair.json). Publicação e runtime corrigido
permanecem com o coordenador; nenhum resultado é herdado da rodada remota emcurso.
