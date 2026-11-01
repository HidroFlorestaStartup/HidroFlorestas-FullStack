# Implementation Plan: área/coletas/IHFR — preparação B

**Branch**: `feat/ajustes-area-coletas-ihfr` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: IMPLEMENTADO_EM_REVISAO; CI sintética do código B 15/15 PASS em `d7586ab95c69c45211e463516080e741bbb3931a`. Comparação bilateral Lovable × FullStack, composição com A e revisão/aceite independentes pendentes. A documentação mantém seu histórico por SHA.

## Summary and technical context

UI-02/UI-03/UI-04/UI-06 no conteúdo de área/coleta. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`; dependência de integração #45.

Next.js/App Router e TypeScript existentes; PostgreSQL apenas sintético nos testes autorizados. CI preservada Windows/Node 24.19.0/PowerShell. Ler versões locais e contratos reais antes de planejar alterações de consulta. Não redefinir o algoritmo IHFR, persistência confirmada ou autorização. Desempenho quantitativo novo: não especificado.

## Constitution Check

Recorte e decisões aprovados, spec/branch/PR separados, ciência e fonte histórica preservadas. Verificação de implementação e revisão independente pendentes; G0 é mesmo executor sequencial.

## Project Structure and ownership

Documentação exclusiva: `specs/036-ajustes-area-coletas-ihfr/`.
Pontos de entrada observados na árvore base:
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx`;
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx`;
- subrotas `environmental-data` da coleta.

Esses caminhos orientam a leitura; o executor deve seguir imports e congelar a lista exata de componentes/leituras e AGENTS aplicáveis antes de editar. Nenhuma inspeção runtime de cada componente é alegada por G0. B controla detalhe da área/coleta; não controla o formulário de localização C nem o shell/layout A.

Testes novos propostos, ainda não criados: `tests/unit/hf-ui036-area-presentation.test.ts` e `tests/e2e/hf-ui036-area-collections.spec.ts`; adequar ao harness existente. DTO/repositórios de áreas, estilos/UI compartilhada, fixtures e configuração exigem um writer alocado pelo coordenador. Vercel/workflow somente leitura.

## Sequência e dependências

1. Preflight por SHA/PR/guardas e ambiente local; completar Spec Kit na reserva 036, rastreabilidade Code-First e mapa de arquivos.
2. Testar/implementar US1: instantes de ocorrência com offsets, desempate técnico explícito e seleção/exibição correta de resultado disponível e sua origem.
3. Testar/implementar US2 e US3, sem confundir confirmado/draft, resultado válido/revogado e prova científica.
4. Comparar starter/FullStack no mesmo estado e viewport; usar fixtures sintéticas, não mocks como produto.
5. Executar testes focais e os quinze gates existentes; registrar SHA/run/tentativa, falhas e NOT_RUN; atualizar documentação/PR.

Pode iniciar sem aguardar A/C. Quando o shell A estiver pronto, validar a composição com seu contrato antes da integração futura; mudanças compartilhadas são propostas ao coordenador, não absorvidas por merge nesta missão.

## Handoff Git

Pai exato do primeiro commit B: `07755822f5dc75fe2be1d924005d30ed99f64a0b`. Usar a branch existente; não recriar de development sem os guards. Diff exclusivo `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. PR final para development, dependência #45 explícita.

Integração futura somente autorizada: guards primeiro, conciliar shell/DTO e refazer CI. Se guards sofrer squash/rebase, transportar apenas commits B posteriores à base congelada e revisar a união das configurações. Não executar merge, deploy ou alteração de branch alheia agora.

## Riscos e parada focal

Ordenação textual de datas, misturar último diagnóstico com última coleta, exibir revogado, ocultar qualificadores e alterar confirmação são riscos materiais. Bloquear somente recorte dependente de decisão não resolvida; continuar tarefas independentes. Não implementar UI-07, REV-01–REV-03, ciência ou provedores.


## Mapa real de imports, contratos e writer B

Os caminhos abaixo foram confirmados por inspeção do HEAD G0 `353a3fd00bc7d4155ab3fc2f17ad063e7108d68f` e alterados exclusivamente pelo executor B; nenhuma alteração a arquivos compartilhados de A/C foi absorvida.

| Camada | Arquivo exato | Contrato / limitação |
| --- | --- | --- |
| Rota área | `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx` | `requireAuth`, `areasService.detail`; anexa o componente B, mantém mapa/capa/formulário existente |
| Leitura B de coleções | `src/app/api/server/collections/area-collections.read.ts` | `authorizeLaboratoryAccess` (READ_AREAS + READ_IHFR_DIAGNOSIS), valida laboratório/área, consulta somente registros completos com ponteiro CURRENT |
| Projeção pura B | `src/components/areas/area-collections-presentation.ts` | preservar offset RFC3339; instante UTC desc; desempate por UUID desc; primeira coleta com ponteiro vigente |
| UI B de área | `src/components/areas/area-collections.tsx` | lista, origem do IHFR, links reais para coleta/ambiental/IHFR, ausência explícita; dados de score persistido |
| Rota coleta | `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx` | `collectionsService.detail`, `ihfrDiagnosisService.readCurrent`, leitura de existência de medições e `READ_IHFR_DIAGNOSIS`; desktop duas colunas |
| Leitura presença ambiental B | `src/app/api/server/collections/collection-environmental-presence.read.ts` | `READ_ENVIRONMENTAL_DATA`, contexto completo, `environmentalMeasurementSet` sem parse do payload/versão, para não bloquear leitura de coleta legada |
| Conteúdo coleta | `src/components/collections/collection-detail.tsx` | mensagem humana, CTA de registro quando ativo; metadados confirmados imutáveis e link ambiental |
| Resultado | `src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx` | `<details>/<summary>` nativos, quatro qualificadores e proveniência preservados |
| Gestão de diagnóstico | `src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx` | feedback humano traduz razões técnicas; sem mudança de transação/idempotência |
| Unidade | `tests/unit/hf-ui036-area-presentation.test.ts`, `tests/unit/frontend-ihfr-presentation.test.tsx` | ordem/offset/corrente/ausência/teclado sem motor científico |
| E2E | `tests/e2e/hf-ui036-area-collections.spec.ts`, `tests/e2e/ihfr-diagnosis-read.spec.ts` | fixtures isoladas PostgreSQL sintético, rota completa, viewports 320/375/390/768/1440 e 200%, máscara em capturas; testes pré-existentes com asserções adaptadas ao disclosure aprovado |

Dependências **somente leitura**: `src/app/api/server/services/areas.service.ts`, `collections.service.ts`, `environmental-data.service.ts`, `ihfr-diagnosis.service.ts`, `src/app/api/server/areas/area.authorization.ts`, `src/lib/collection-date-time.ts`, `prisma/schema.prisma`, `src/types/*`, `src/components/areas/areas.module.css`, `src/components/collections/collections.module.css`. Componentes compartilhados e DTOs pertencentes ao coordenador não sofreram escrita.

Fontes Code-First relacionadas: `docs/code-first-prd/README.md` e `governance/source-policy.md` (**EM_REVISAO**, não normativos); `specs/021-frontend-areas-cover/`, `023-frontend-collections/`, `024-frontend-environmental-drafts/`, `025-frontend-ihfr/`, `docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md` (v0.1 experimental). Fonte de decisão de UI: PR #44 no SHA congelado.

`AGENTS.md` raiz e constituição Spec Kit lidos; não se localizaram `AGENTS.md` aninhados nos diretórios de escrita ou `.specify/extensions.yml`/checklist próprio de 036. `scripts/rc-review-validation.ps1` registra os 15 gates sem alterações. Execução foi via API GitHub, sem checkout atual com dependências Windows/Node 24; o ZIP local de setembro não é HEAD atual e não substitui evidência de runtime.

## Verificações de integração pendentes

1. Comparar FullStack **e starter** com mesmos dados/viewport e registrar imagens reais; fixtures sintéticas da action não constituem tal comparação automaticamente.
2. Ler conclusão dos 15 gates no SHA final, incluindo o E2E conhecido do shell com texto200, e só marcar PASS com logs. Guardar imagens e geometria criadas pelo harness E2E se o gate as produzir.
3. A revisão por segundo executor e o aceite humano continuam pendentes; nenhuma ferramenta `spawn_agent` real estava disponível nesta sessão (`NATIVE_SUBAGENTS_UNAVAILABLE`).

## Ciclo corretivo Spec Kit — 2026-10-31 (ANALYZE → PLAN → IMPLEMENT → REVIEW)

### ANALYZE (somente leitura)

- Fonte de execução: run [41234289600](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41234289600), tentativa 1, commit `6cfd15b026055566dda529e2c6964a60ce1de372`. Os 12 primeiros gates passaram; `Ihfr` falhou (4 PASS, 2 FAIL) e `Bootstrap`/`SchemaAudit` não rodaram.
- Achado UI036-R1: `tests/e2e/ihfr-diagnosis-manage.spec.ts` usava área da fixture IMP-006 com diagnóstico CURRENT preexistente em coleta de ocorrência `now()`, posterior às datas estáticas dos dois registros novos. A lista/seleção do produto estava coerente, mas a expectativa do teste confundia fonte da fixture com fonte criada pela prova.
- Achado UI036-R2: a leitura em `tests/e2e/ihfr-diagnosis-read.spec.ts` detectou fragmentação de `experimental` pelo helper `expectIHFRScientificWords` em 320px/200%; há uma sequência de paddings em `ExperimentalDiagnosisSummary` e `ScientificNotice`. O reparo anterior de ícone empilhado não recuperou largura suficiente.
- Checagem de consistência spec → plan → tasks: R1 afeta FR-036-001/SC-036-001; R2 afeta FR-036-003/SC-036-002; ambos cabem na branch B. Não há conflito com a constituição ou decisão científica. T008 (comparação real com starter) permanece pendente; análise de código/screenshot de uma só aplicação não equivale à comparação dos runtimes.

### PLAN (plano focal)

1. Em R1, criar uma nova área via `POST /api/laboratories/{laboratoryId}/areas` autenticado, **dentro do schema PostgreSQL descartável já alocado pelo runner IMP-006**. Realizar nela o fluxo real coleta → medições confirmadas → diagnóstico CURRENT → coleta de campo posterior sem diagnóstico. Comparar ambas as origens na área sem alterar, excluir ou recalibrar fixtures compartilhadas.
2. Em R2, reduzir somente paddings internos do aviso IHFR no componente da própria B, preservando font-size 200%, texto integral, rótulos científicos, `<details>/<summary>` e os asserts existentes de palavras inteiras/scrollWidth. Nenhuma mudança de layout/shell global.
3. Validar no HEAD publicado com os **15 gates originais**, banco sintético isolado e artefatos de viewport; classificação individual PASS/FAIL/NOT_RUN por SHA/tentativa. Não corrigir falhas apagando asserts, mudando timeouts ou removendo testes.
4. REVIEW: verificar diff exclusivo contra `07755822f5dc75fe2be1d924005d30ed99f64a0b`, acumulado contra development atual; confirmar nenhum arquivo de A/C/ci/provedor/ciência alterado; registrar revisão técnica sequencial (não independente por subagente) e pendências visuais/humanas.

**Ambiente:** GitHub API/Actions; sem checkout atualizado neste executor por DNS externo indisponível. Skills `speckit-analyze`, `speckit-plan`, `speckit-implement` e constituição 1.0.0 foram conferidas no repositório, sem executar seus scripts Bash locais. Não existe `.specify/extensions.yml` ou checklist 036 no HEAD inicial.

### REVIEW: achado adicional de texto 200% na UI-02

- Inspeção da captura real da execução `41234289600`, `frontend-collections-area-320-900-200.png` (320px, 200% de texto, viewport `fullPage:false`, `documentWidth=320`) identificou divisão de `ambientais` em `ambientai` + `s` no link de ação da coleta, mesmo sem overflow horizontal. Achado distinto dos dois failures em `Ihfr` e dentro do owner B.
- PLAN: usar CTA ambiental de largura integral apenas no mobile, ocultando ícone decorativo em telas estreitas, mantendo nome acessível e alinhamento/responsividade desktop. Adicionar asserção real de palavras inteiras no mesmo cenário E2E; conservar o teste de overflow. Não alterar shell A, CSS global, fontes ou harness compartilhado.
- IMPLEMENT: `src/components/areas/area-collections.tsx` e `tests/e2e/hf-ui036-area-collections.spec.ts`. Teste reportado PASS somente depois da Action no SHA que contiver esse patch.

### Analyze → Plan — regressões finais do run #41251345900

**ANALYZE (evidência real):** run `41251345900`, tentativa 1, SHA `013264106ef990480ae5a3963926527ee04c5e7c`: 12 primeiros gates PASS (incluindo E2E principal e CTA 320/200), `Ihfr` FAIL com 4 passed/2 failed. Primeiro FAIL em `ihfr-diagnosis-manage.spec.ts:202`: link IHFR chegou corretamente à rota com fragmento `#ihfr-diagnosis-heading`, mas teste exigia URL sem fragmento. Segundo FAIL em `ihfr-diagnosis-read.spec.ts:55`: o qualificador longo exibiu viewport ratio 0,720 no cenário landscape 667x375/texto 200%. O conteúdo dispõe de 197px de altura útil por conta do header/nav contextual, e `sm:grid-cols-2` produzia colunas estreitas mesmo com texto ampliado. Nenhum dos FAILs exige alterar o algoritmo, o schema ou o shell.

**PLAN corretivo:** (1) validar a URL completa inclusive o anchor existente, assegurando navegação contextual e ausência de resultado para a coleta recente; (2) manter uma coluna de qualificadores até `lg` em `ScientificNotice`, promovendo duas colunas somente quando houver largura efetiva suficiente, preservando `expect(label).toBeInViewport({ratio:1})`, quatro rótulos e fonte 200%. Não retirar assertions nem alterar viewport. (3) repetir gates reais no commit final, inspeção estática e registro por SHA. Não editar helper compartilhado.

**Evidência de controle:** [Run #41251345900](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251345900), [artefato #13061703054](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251345900/artifacts/13061703054), `.accounts-validation/ihfr-1793489228324.log`. Qualificador não precisa ser parcialmente exibido quando 2 colunas se tornam estreitas; layout responsivo de 1 coluna melhora a legibilidade sem reinterpretação científica.


## HF-UI-044-CLOSE-B — plano executado e limites de revisão (2026-11-01)

1. **ANALYZE:** reconciliados o escopo #44, os contratos UI-02/03/04/06, os itens T008/T009/T015/T016/T017/T023, o HEAD de B e os HEADs concorrentes A/C; verificado o artefato real 13062377832. A base de comparação Lovable é TanStack com mock em memória; FullStack é Next.js com autorização e PostgreSQL sintético.
2. **PLAN:** preservar código e testes aprovados, verificar cada registro de `.accounts-validation/results.jsonl` no ZIP oficial e catalogar capturas `fullPage:false` por tela/viewport/estado. Tentar o pareamento sem usar screenshots de Pedro como runtime atual; não editar shell A, formulário C, científico, guardas ou CI.
3. **IMPLEMENT:** somente reconciliação versionada dentro da reserva `specs/036-ajustes-area-coletas-ihfr/`. Nenhum patch de produto foi justificado por captura comparável; não reexecutar 15 gates indiscriminadamente sobre o mesmo `CODE_SHA_TESTED`. Um novo HEAD documental NÃO herda o PASS da execução anterior.
4. **REVIEW:** no código `d7586ab...`, run 41252813575/1, journal 15 PASS/0 FAIL/0 NOT_RUN; ZIP íntegro; 77 pares PNG+JSON FullStack B/IHFR com `head` idêntico e `fullPage:false`, viewport documental sem overflow registrado. **Starter executado neste ambiente: NOT_RUN**; falta a mesma fixture/viewport lado a lado. T008/T016 permanecem abertos. T017: PR #47 deve conservar Draft, estado no topo e histórico de tentativas.

**Ambiente e impedimento:** acesso de leitura/escrita ao GitHub, artefato Actions local e inspeção estática da referência de Pedro; sem checkout atual dos dois repositórios neste runtime, sem Bun e sem resolução DNS do GitHub. O ZIP local disponível é histórico (`007-ihfr-evolution`), não representa nenhum dos HEADs de comparação. Não houve Cloud Browser, provedor, migration hospedada ou nova execução browser. `LOCAL_WORKTREES_NOT_OBSERVABLE`; `NATIVE_SUBAGENTS_NOT_AVAILABLE`; nenhuma revisão independente simulada. `B_VISUAL_EVIDENCE_PENDING` por ausência do runtime starter com fixtures equivalentes e da comparação bilateral executada. A validação de consumo pelo shell A requer QA composta read-only e/ou futura integração autorizada, não cherry-pick nesta branch.

## CLOSE-PARALLEL-02 / B — ANALYZE → PLAN → IMPLEMENT → REVIEW

Estado: EM_ANDAMENTO / B_VISUAL_READY_FOR_RUNTIME. Agente nativo `/root/b_visual`,
worktree própria `hf044-b`, branch `codex/hf044-b-local-20261101`; base6c61056f,
setup1b6a2d3 e helper A transportado pelo coordenador em f4d551d, sem autoria B desse helper.
Checkout principal e seu índice não foram alterados por B.

### ANALYZE somente leitura

| ID | Severidade | Fonte | Constatação / tratamento autorizado |
|---|---|---|---|
| COV-B1 | HIGH | FR-036-004, T008/T016 | Falta teste bilateral executável de domínio; acrescentar T024–T030 e casos focais. |
| EQ-B1 | MEDIUM | starter route área cbb954a | Ordena `confirmedAt`, sem resumo CURRENT da área. NON_EQUIVALENT; UI-02 posterior governa o produto. |
| EQ-B2 | MEDIUM | starter adapter/mock.ts cbb954a | Scores/decomposição predefinidos; mesmo input não prova equivalência científica/numérica. |

Inventário:5 FR,4 SC e23 tarefas prévias. Os nove requisitos têm tarefas; não há requisito
novo de produto, conflito constitucional, mudança científica ou tarefa sem recorte autorizado.
Sem `.specify/extensions.yml` ou checklist036. Skills locais analyze/plan/implement lidas;
pré-requisitos Bash executados com contexto036. O script persiste `.specify/feature.json`
ignorado na própria worktree; não foi executado setup-plan porque copiaria template sobre plano
existente. O ciclo foi adaptado manualmente com delta mínimo, sem alegar CLI Spec Kit completa.

### PLAN e reanálise de consistência

1. T024: congelar grade por requisito/estado/viewport em [close02-matrix.json](evidence/close02-matrix.json).
2. T025: fixtures oficiais de autenticação e APIs reais para laboratório/áreas/coletas/ambientais/IHFR;
   confirmar mais nova antes da anterior e preservar offsets distintos, replay por chave e origem CURRENT.
3. T026: testes independentes e coleta incremental durável via helper A. Falha visual isolada deixa recibo
   sanitizado por id/linha e não interrompe os casos seguros; sumário terminal rejeita FAIL/NOT_RUN/lacunas/fontes UNOBSERVED.
4. T027/T028: executar job ui-b do coordenador e analisar PNGs reais; comparar hierarquia, tipografia,
   densidade, navegação e ações. Não publicar aceitação antecipada.
5. T029/T030: validação estática/revisão própria/commit local, depois resultado factual de runtime
   e entrega ao revisor não autor. Infraestrutura/configs/guardas pertencem exclusivamente ao coordenador.

Reanálise: cada delta mapeia FR-036-004/SC-036-002; ordenação/origem também FR-036-001;
qualificadores FR-036-003; autorização/imutabilidade FR-036-005. Sem dependência circular de A:
B escreveu fixtures/casos contra contrato congelado, depois consumiu helpers somente leitura.

### Implementação e validação local

Grade: cinco estados ×12 layouts =60 pares;12 qualificadores (320x900,667x375/inset34,844x390,
todos200); duas jornadas teclado/histórico390/1440/200; um reload390/200. São75 pares planejados,
150 PNG/JSON potenciais, mais um teste de resumo, sem equiparar contagem à aprovação.
Layout central:320/375/390/768/1440 em100/200 e667x375/844x390 em200.

Captura de área povoada centraliza a seção Coletas confirmadas; registro mantém início da coleta;
ausência centraliza a mensagem humana; resultado centraliza IHFR. Qualificadores completos são
rolados e medidos individualmente, com `toBeInViewport({ratio:1})` preservado. Nenhum ajuste de estilo
ou scroll é aplicado depois da medição para esconder defeito. Escala após client navigation é medida.
Reload registra antes/depois antes da reconfiguração; perda da fixture em memória no starter é explícita.

Executado localmente com Node24.14 existente: sintaxe TypeScript PASS; ESLint dos dois arquivos PASS;
descoberta Playwright sem servidor/banco PASS (76 testes). Typecheck focal encontrou inicialmente
cinco erros de tipo da grade B (corrigidos) e um erro no helper A compartilhado, devolvido ao owner
(`source` duplicado, shared.ts:180), corrigido por A em6dc3bb1. Typecheck completo oficial e runtime
domínio cabem ao runner Windows Node24.19.0; não foram declarados executados localmente.

### Setup/cleanup e privacidade

Máquina ui-b exclusiva. Validar runner/ref/attempt e auth fixture vazia antes de setup; login nativo,
papéis reais USER/OWNER. Adapter de referência só no próprio browser. Não arquivar inputs científicos,
chaves idempotentes, payloads HTTP, segredos, cookies ou storage. Traces/vídeos/screenshots automáticos off;
helpers mascaram input/textarea e salvam apenas PNG/JSON sanitizados com SHA/tree/run/attempt.

DELETE laboratório recusa áreas/confirmados, conforme `laboratories.service.ts`. Não desabilitar triggers
nem falsificar cleanup lógico. Dados sintéticos imutáveis ficam somente no banco owned até Stop/descarte
do runner, procedimento confirmado pelo coordenador nesta missão. Teardown lógico de dados:
NOT_APPLICABLE_IMMUTABLE_SYNTHETIC_DATA_RETAINED_UNTIL_OWNED_RUNNER_DISPOSAL;
browser/CDP são fechados no afterAll; Stop físico é responsabilidade do orquestrador em finally.
Nenhum PostgreSQL, Bun ou provedor real foi executado/provisionado no host de B.

Critérios de término:75 casos com recibos completos, inspeção real de pares e diferenças, sem erro
técnico obrigatório ou lacuna, revisão não autora, estado do Git explícito. Até lá T008/T016/T027/T028
permanecem abertos. HUMAN_ACCEPTANCE_PENDING; qualificadores experimentais IHFR preservados.

**Checagem local adicional:** `tsc --noEmit --incremental false` PASS (exit0), Node24.14 existente, dependências e Prisma generated acessados por junctions somente de leitura. Nenhum generate/typegen ou Node24.19 foi executado aqui; geração e runtime da candidata permanecem com a CI oficial.

### Correção focal pós-revisão não autora — classificação de par incompleto

`EVIDENCIA_IMPLEMENTACAO`: o revisor não autor identificou MEDIUM em `boundedPair`:
`samples.every(...)` em array vazio retorna true e podia registrar COMPARABLE mesmo
sem par, embora execution/completeness já impedissem aprovação pelo sumário.

ANALYZE: erro técnico da classificação do recibo, sem mudança de requisito/produto.
PLAN/IMPLEMENT: exigir exatamente dois samples antes de avaliar fontes/comparabilidade;
qualquer quantidade diferente de2 acrescenta erro sanitizado e registra FAIL /
INSUFFICIENT_EVIDENCE / PARTIAL. Preservados asserts, timeouts, grade e sumário fail-closed.

REVIEW: contraprova sintética Node executou a própria declaração boundedPair extraída
por AST, com dependências de captura substituídas apenas no executor de teste local;
zero samples, somente FullStack, somente starter, dois completos, dois NON_EQUIVALENT
e fontes UNOBSERVED:6/6 PASS. Não houve browser, PG ou runtime B local. Relatório em
`evidence/close02-pair-classification-check.json`. Typecheck completo local e lint B PASS.
Nova árvore aguarda a rodada corretiva do coordenador; nenhum resultado CI foi herdado.

### R1 runtime e correção do seletor de referência — 2026-11-01

Run41351237110/attempt1, source194e9afafc0e4dbfeb6d9ceb9ca5030565ba6920:
ui-b falhou no beforeAll aguardando Nome do laboratório no diálogo do starter.
Artifact13101154606 baixado pelo coordenador e inspecionado também por B na cópia
local: SHA256 fc05f5e8fcfb36a77a834a08a1cc978d273c69a49c9c3e0c3dd1d4177cb85643,
CRC PASS,0PNG e75 casos NOT_RUN. Sem prova bilateral produzida. O fluxo chegou ao
setup de referência depois das chamadas aguardadas da fixture FullStack; isso não
constitui comparação visual, suíte B aprovada ou aceite.

ANALYZE: em startercbb954a, FieldShell/TextField coloca o asterisco obrigatório
num span aria-hidden dentro do label. getByLabel exato usa o texto do label com o
asterisco; o seletor antigo sem asterisco não encontra o controle. PLAN/IMPLEMENT:
trocar somente a referência por getByRole textbox com nome acessível exato,
que exclui aria-hidden. Nenhum timeout, assert, produto ou starter alterado.

REVIEW: Chromium sintético153.0.8010.12 local reproduziu a estrutura exata do
FieldShell/CreateLab: seletor antigo0matches/filltimeout250ms (contraprova RED);
textbox de nome acessível1match/fillGREEN. Sem Bun/PG ou servidor local dos projetos.
O limite250ms é exclusivo da contraprova negativa, não altera testes de produto.
Auditoria estática dos demais seletores e métodos/retornos/versões do adapter não
demonstrou outro descompasso; não substitui runtime. Prova e recorte em
`evidence/close02-reference-label-check.json`. Próxima rodada pertence ao coordenador.

### R2 — falhas observadas e delta focal para a última rodada

Fonte d62fb08cf65aca5dc704231f88594030f49279cb / run41353270282/1 / artifact13102906085.
ZIP auditado por B: digest099d491c57c473222065b4ce8f3b51630f19652840a48fc46289837c8d969548,
CRC PASS,147entradas/71PNG. Índice75casos:1PASS/74FAIL, um par completo,69samples
unilaterais e5casos sem sample. Os75 testes de coleta terminaram sem lançar suas falhas
preservadas; o teste obrigatório de sumário falhou corretamente. Não são75requisitosPASS.

ANALYZE B-R2-NAV:74erros starter na chamada navigateDomain; antes da primeira área o
dashboard só contém navprincipal com Áreas, mas a página da área acrescenta um breadcrumb
`nav[aria-label="Trilha de navegação"]` com o mesmo link. O filtro antigo nav:visible+Áreas
torna-se ambíguo. Contraprova Chromium em320/1440:2matches e strict-mode real; seletor
pelos nomes oficiais da navegação principal tem1match e clickPASS. IMPLEMENT: nomear
somente navprincipal desktop/celular visível e exigir count1, preservando navegação cliente
e fixture em memória, sem first/reload, mudança de produto ou timeout.

ANALYZE B-R2-FOCUS:cinco failures ratio1 FullStack (320indexes1/2,667inset34index2,
844indexes1/2). Recibos antigos omitiram a geometria do ponto da falha. `keepFocusVisible`
do shell agenda revealFocus em rAF e ResizeObserver ao abrir/focar summaries; openDetails
focava o summarydeproveniência imediatamente antes de rolar o qualificador. Contraprova
com ownScroll/revealFocus reais e waitForMissionRender oficial extraídos por AST reproduziu
nas3classes a mudança tardia: em667, labeltop182→-545 após RAF; aguardar readiness oficial
antes do único scroll mantémratio1PASS. **INFERENCIA**: mecanismo explica os5failuresR2,
mas sua atribuição individual não é prova de produto sem geometria real daquele ponto.
IMPLEMENT: aguardar waitForMissionRender oficial ao terminar openDetails e ANTES de
scroll/ratio1. Não se aplica sono fixo, blur, estilo ou rolagem corretiva depois da medição.

Diagnóstico adicional B: persistir classe de erro, localização sanitizada incluindo domain-fixtures.ts,
viewport/escala, retângulo do qualificador/foco/navs e scrollport, sem texto pessoal, URL, cookie,
payload ou mensagem bruta de exceção. Falha permanece FAIL/PARTIAL/INSUFFICIENT_EVIDENCE.
Contraprovas em evidence/close02-round2-counterexamples.json; sixcenários da função boundedPair
atual continuamPASS (close02-pair-classification-check-r3.json). TSCcompleto local24.14,
lintB, descoberta76 e whitespacePASS. Sem PG/Bun local e sem execuçãoR3 declarada.
