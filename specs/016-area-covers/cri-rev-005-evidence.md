# CRI-REV-005 — evidências de execução

Data de referência: 2026-10-17. Classificação dos resultados observados:
`EVIDENCIA_IMPLEMENTACAO`. Estado: AGUARDANDO_REVISAO humana; checks do
fechamento documental acompanhados até a conclusão no GitHub.

## Reconciliação inicial

Remote: `https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git`.
Worktrees existentes, todos inicialmente limpos, preservados:

| Branch | HEAD local inicial | HEAD remoto após fetch |
|---|---|---|
| review/016-area-covers | 0b154ce1ea5b2e528c1c84227880060ce452adf7 | igual |
| review/cri-audit-20261010 | 3a514097ed027a9af4f286ff7fcf5b2d2277588d | igual |
| release/cri-rc-20261010 | c629e749692ec54ad27b223dc344b86749b73485 | 832560ac0e2b9a50671b871f077472685b1af963 |
| review/cri-rc-validation-20261012 | dc180cb258f9c9fe543a7a5815ab81ea21f8ae93 | igual |

O checkout original em `C:/projetos/ifma/HidroFlorestas-FullStack` está em
`main`, com quatro arquivos não rastreados preexistentes, inclusive o pacote.
Nenhum deles será incorporado, removido ou alterado. Nenhuma branch/worktree nova.

Pacote encontrado na raiz desse checkout original:
`hidrofloresta-cri-rev-005-patch.zip`, SHA256
`86b32ee0517e8d0c0d54923f09aaded8eff257e182f44d6f243b351eef5af139`.
Extração inspecionada fora do repositório. O aplicador passou em dry-run no HEAD
da origem, com âncoras únicas nos seis documentos e teste novo ausente.
Os resultados offline do pacote não são evidências de execução Ajv local.

Fontes: pedido atual do usuário; AGENTS.md raiz (único aplicável), PLANS.md,
PROJECT_CONTEXT.md, TECH_DECISIONS.md, constituição e política de fontes;
Spec 003/016; relatório e guia de 17/10 lidos diretamente do commit `832560a`.
Os documentos de 17/10 serão preservados na propagação da RC.
Não há conflito material de autoridade nem decisão de produto nova.

Node `v24.19.0`, Windows, Ajv `8.20.0`, tsx `4.21.0` no worktree real.
Dependências/lockfile não serão atualizados por esta correção. A RC já contém
avanços de dependências que serão preservados e revalidados na sua própria árvore.

## Planejamento e critérios

Aplicar as skills Spec Kit instaladas à feature existente, sem recomeçar artefatos.
setup-plan, setup-tasks e check-prerequisites executados com feature explícita 016.
No Git Bash, os caminhos precisam da forma `/c/...`; uma primeira invocação com
`C:/...` criou uma cópia isolada do template em diretório incorreto, removida após
conferir o caminho e conteúdo. A nova execução localizou os artefatos corretos.
Sem extensions.yml/hooks; checklist de requisitos existente completo (23/23).
Constituição antes/depois do design: PASS, sem alteração científica ou persistida.

`--plan-only` prepara spec.md/plan.md/tasks.md. Commit de planejamento antes do
teste `--red`. Aceite: RED Ajv acusa `additionalProperties/cover` com YAML antigo;
GREEN dos mesmos cenários após `--apply`, sem remover assertions/guards.
`cover` obrigatório somente na listagem; detalhe continua com projeção separada.
Preservar serializer, serviço, UI, Prisma, dependências, workflows e configuração.

Gates: Unit/Contract/Typecheck/Lint/Build, integração e concorrência de capas,
E2E e demais regressões pelo runner oficial com PostgreSQL sintético próprio.
Revisar campos transversalmente e registrar evidências sanitizadas e hashes.
Publicar origem → audit → RC → validation por merges, conferir os HEADs/checks e
pedir re-review a Pedro/Luciano. Aprovação e resolução de threads são humanas.

Limites: sem merge em development/main, deploy, migration remota, dados reais ou
operação Cloudinary. IHFR permanece CONTRATO_EXPERIMENTAL,
VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## RED/GREEN e revisão focal

Planejamento registrado em `7a5681a` antes de `--red`.
Comando: `node --import=tsx --test tests/unit/area-openapi-parity.test.ts`.
O teste original do pacote produziu 0/3 PASS, exit 1; o Ajv apontou
`/areas/0`, `AreaSummary/additionalProperties`, `additionalProperty: cover`.
[Saída completa RED](cri-rev-005-evidence/red.txt) e
[SHA, horário, hash do teste e blob YAML anterior](cri-rev-005-evidence/red.json).
Após `--apply`, o mesmo teste original passou 3/3, exit 0, sem mudar assertions:
[GREEN original](cri-rev-005-evidence/green.txt).

O teste preparado foi mantido e ampliado para verificar a allowlist da área,
configuração privada injetada, campos obrigatórios da capa, revisão inteira
não negativa e a projeção real de detalhe sem carregar `cover`.

Achado adicional comprovado, sem mudança de produto: os exemplos de
`AreaDetailResponse` e `AreaMutationResponse` omitiam `laboratory.status`,
obrigatório em `LaboratoryPublicReference` e presente no serializer real.
O teste de detalhe falhou em Ajv por `missingProperty: status`:
[RED adicional](cri-rev-005-evidence/detail-example-red.txt).
Correção limitada a acrescentar `status: ACTIVE` nos dois exemplos existentes;
nenhuma mudança ao schema do detalhe, serializer, serviço ou comportamento.
O teste passa a validar também esses exemplos contra os respectivos schemas.
A frase sobre valores opcionais do modelo foi delimitada aos campos textuais
anuláveis para não contradizer a projeção compartilhada `cover?`.

## Revisão adversarial dos campos e fronteiras

Revisão estática conforme o guia de 17/10, complementada pelos gates abaixo.
Esta matriz registra o recorte contratual anterior à convergência T047; a revisão
do helper adicional e o resultado cumulativo atual estão no encerramento abaixo.

| Campo/fronteira | Rastro e conclusão |
|---|---|
| `cover` e opcionalidade | `area.type.ts` compartilha o tipo opcional com detalhe; `areas.service.ts:list` sempre inclui a relação; serializer usa a presença da chave; OpenAPI exige somente na lista. Teste real de detalhe sem a relação permanece válido. |
| `revision` | Prisma Int/default 0; serializer preserva revisão ou usa 0 sem registro; schema exige inteiro >=0; teste recusa negativo/fracionário/ausente. UI usa revisão para identificar a prévia, sem alterar o banco. |
| `hasImage` | Derivado exclusivamente de `Boolean(assetId)`; não é disponibilidade nem autorização. Capa ausente retorna false; flag desligada com capa conserva true. |
| `featureEnabled` | `settings.ts` valida offline e falha fechado; listagem avalia uma vez por resposta, sem provider/rede. Teste cobre true/false; UI só busca bytes com hasImage && featureEnabled. |
| Privacidade | Serializer possui allowlist explícita; teste injeta ID interno, URL e configuração sintéticos e exige somente sete chaves da área/três da capa. Schemas recusam campos extras, IDs, URL e configuração; nenhum bytes, largura ou canEdit é acrescentado ao resumo. |
| Contexto, HTTP e cache | Guard reconsulta conta/vínculo/lab; GET passa a identidade autenticada ao serviço. `areaJson` conserva no-store; recursos de imagem mantêm private/no-store/nosniff, CSRF e reautorização. Guia Next local de Route Handlers consultado; nenhuma rota alterada. |
| Disponibilidade versus permissão | canEdit continua contextual; política A conserva metadados e bloqueia mutações/conteúdo. Testes existentes cobrem membro, outsider, papel global, laboratório errado/inativo e revogação após I/O. |
| I/O, replay, quota e concorrência | `initiate` mantém preflight → preset sem transação → segunda transação/tentativa+4jobs → ticket após commit. Retry restrito/teto3 não repete preset; testes Pg existentes cobrem corridas ativa/horária/mesma chave e revogação. Cleanup verifica identidade imutável/referência vigente. |
| Contratos e exemplos | Listagem, capa fechada, detalhe real e exemplos de lista/detalhe/criação validados por Ajv. Único achado adicional real: status ausente nos exemplos, corrigido e com RED preservado. |
| Persistência e ciência | Diff de src/**, prisma/**, dependências, workflow, env/deploy e AGENTS.md vazio nesta correção. Migrations existentes mantidas; bootstrap/migrations/audit executados somente no harness sintético. Nenhuma regra IHFR alterada. |

O fingerprint oficial não inclui specs/**. Por isso o registro desta execução
acrescenta SHA256 do OpenAPI e SHA/tree Git ao manifesto funcional do runner.
As saídas RED preservam mensagens/resultado; somente espaços no fim das linhas
foram normalizados para permitir `git diff --check`.

## FAIL de regressão preservado — IHFR dedicado

A primeira execução do runner oficial em `f38d439` parou no gate Ihfr,
18:03:51.137–18:04:29.413Z: 5/6 PASS, exit 1. O Playwright encontrou **dois**
elementos com a mensagem de ausência em `ihfr-diagnosis-manage.spec.ts:119`
(`strict mode violation`), depois de observar um elemento oculto. O snapshot
de erro mostrou o contexto do ADMIN e a mensagem correta na região de leitura.
[Log integral sanitizado](cri-rev-005-evidence/ihfr-initial-failure.txt).

`EVIDENCIA_IMPLEMENTACAO`: o mesmo erro, seletor, linha e dois elementos estão
documentados no PR7 em
`docs/reports/audits/2026-10-13-cri-rc-ci-followup-evidence/pr7-attempt1-ihfr-failure.txt`
(consultado em `dc180cb`). O patch não altera src/**, esse teste nem seu runner.
`INFERENCIA`: há uma condição intermitente preexistente de seleção/visibilidade;
a causa de dois elementos no DOM não foi demonstrada nesta correção.

Nova execução justificada para medir reprodutibilidade no mesmo snapshot, sem
alterar assertions, waits, timeouts, fixtures, ciência ou código. Comando:
`./scripts/rc-review-validation.ps1 -Gates Ihfr,Bootstrap,SchemaAudit`.
Um eventual PASS não será apresentado como correção dessa intermitência nem
apagará o FAIL; os registros de ambas as tentativas ficam no mesmo recibo.
`RECOMENDACAO`: tratar a estabilidade desse seletor em entrega separada.

## Gates locais da origem

Comando integral: `./scripts/rc-review-validation.ps1`, seguido somente dos gates
Ihfr/Bootstrap/SchemaAudit após o diagnóstico acima. HEAD funcional `f38d439`;
snapshot `71d6a8f92d76c7131cdae6817c5715ed12a54284f4b3b45e8ec1d5c939d32e13`.
Execuções: 17:53:43.799–18:05:50.058Z. Todos os gates alcançaram PASS; não se
trata de um único pipeline sem falhas. O gate Ihfr teve FAIL preservado e PASS
no mesmo snapshot às 18:05:08.354–18:05:44.532Z, sem causa corrigida pelo patch.

| Verificação | Resultado |
|---|---|
| Paridade Ajv preparada/ampliada | GREEN 3/3 e 5/5; REDs preservados |
| Unit / Mail | 296/296 + 17/17 |
| Integration / Migration / Contract | 215/215 / 37/37 / 6/6 |
| R1 | 17/17 |
| Build / Typecheck / Lint | PASS / PASS / 0 erros, 3 avisos preexistentes |
| E2E / HTTPS / Deletion | 72/72 / 2/2 / 3/3 |
| Ihfr dedicado | 5/6 FAIL inicial; 6/6 PASS na nova execução |
| Bootstrap / SchemaAudit | 14 migrations / zero schemas de teste remanescentes |
| Dependências instaladas | npm ls: 43 dependências, zero inconsistências |
| Diff / escopo | PASS; código funcional e dependências preservados |

[Registros de 16 execuções, comandos, UTC, resultados e hashes dos logs](cri-rev-005-evidence/origin/validation-records.json).
[Manifesto funcional](cri-rev-005-evidence/origin/functional-manifest.json).
O manifesto também prova ausência de mudanças posteriores em código/testes;
o registro inclui separadamente o hash do OpenAPI. Logs completos sanitizados
permanecem no coletor local; o CI preserva seus próprios artefatos por SHA.
PostgreSQL restaurado STOPPED, dados sintéticos preservados.
T041–T044 executadas; T045 segue aberta até publicação, sincronização e re-review.

## FAIL material do primeiro CI publicado

Origem publicada `60eaa4224c7cbd7d28a591e8a295b31022e4859a`,
[run39056678227](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39056678227):
RegressionSetup e Unit PASS; Integration 214/215, FAIL no cenário de quota ativa
simultânea (`area-covers.test.ts:57`): INTERNAL_ERROR, esperado RATE_LIMITED,
819.5017ms. Artefato `12109288704` baixado para inspeção. Nenhuma relação causal
com a mudança contratual foi demonstrada; o erro original é sanitizado pelo
serviço e ainda precisa ser capturado. A nova paridade Ajv passou no Unit do CI.
Auditoria publicada `10980f13fb52877972fbcec25aff462affdc0c44`; RC local
`06842809377343473bfa8c82432af3224160552d` ainda não publicada. A propagação da
RC está suspensa para diagnóstico T046/T047; os PASSs locais não substituem CI.

### Diagnóstico local e captura adicional, sem alteração de produção

O CI da auditoria `10980f1`, run39056714955, terminou SUCCESS com o mesmo serviço.
Sessenta repetições locais do cenário de quota ativa em schemas sintéticos
independentes não reproduziram INTERNAL_ERROR: 60/60 tiveram um vencedor e uma
recusa RATE_LIMITED. Foram observados 57 conflitos P2034 e 3 conflitos de commit
DriverAdapterError/TransactionWriteConflict/originalCode40001, todos reconhecidos
pelo retry existente. [Formas seguras e contagens](cri-rev-005-evidence/transaction-diagnostic.json).
Isso não demonstra a causa do FAIL remoto nem permite declarar o serviço corrigido.

Para uma nova ocorrência revelar o erro original, a fixture de integração passa
a interceptar somente `$transaction`, preservando callback/options/relógio e
delegando o restante do Prisma sem alteração. As duas asserções de quota mantêm
seus valores e incluem apenas name/code/kind/originalCode e causas estruturadas
na mensagem de falha. Mensagem bruta, SQL, parâmetros e stack não são registrados.
Esse é diagnóstico de teste, sem alteração de src/**, serializer, quota ou retry.
Validação focal: 30/30 Pg/provider/HTTP, typecheck e lint do arquivo PASS,
18:22:39.805–18:22:54.973Z; snapshot
`7a95946320a8f6b15155d5603963ba35670ba628c28c15eef2ed064f5615f9ff`.

A primeira coleta cumulativa local da RC `0684280` passou Unit296+Mail17,
Integration215/Migration37/Contract6/R117/Build/Typecheck/Lint/E2E72/Https2/
Deletion3 e falhou no mesmo seletor IHFR preexistente. Bootstrap/SchemaAudit
não foram executados nessa tentativa. [Registros preservados](cri-rev-005-evidence/rc-initial/validation-records.json).
Nenhum PASS posterior será apresentado como reparo da causa dessas intermitências.

### T048 — correção comprovada do alvo do seletor, sem mudança científica

A recomendação inicial de tratar o seletor separadamente foi reavaliada após
ele bloquear também a coleta cumulativa da RC. Planejamento `6e03872` precede
a mudança de uma linha no teste: o mesmo texto exato é exigido **visível** na
região com nome exato `Diagnóstico IHFR experimental`. A API local instalada
do Playwright documenta que getByRole exclui conteúdo oculto por padrão; isso
distingue o alvo atual das duas correspondências observadas pelo getByText global.
Nenhum first(), sleep, novo retry, timeout ou relaxamento de aceite foi adicionado.
O RED real está preservado nos dois registros locais e no relatório histórico.

GREEN: seis cenários dedicados, incluindo OWNER e ADMIN no fluxo original,
18:25:20.401–18:25:57.659Z. Bootstrap14/SchemaAudit0 passaram em seguida.
Snapshot após os dois ajustes exclusivamente de teste:
`06d2697efb8cc324c1f8dbe8512a20d255058d391911ae05527e288147549165`.
Typecheck e lint dos dois arquivos de teste PASS. Não há alteração em src/**,
regras IHFR, contratos científicos, dependências ou configuração.
[Registros e manifesto dessa validação](cri-rev-005-evidence/diagnostic/validation-records.json);
[30 testes focais de capas com diagnóstico sanitizado](cri-rev-005-evidence/diagnostic/focal-validation.json).

A causa do INTERNAL_ERROR remoto continua não demonstrada; o diagnóstico de
quota não é apresentado como correção desse erro. A publicação nos ramos de
revisão autorizados pode prosseguir para coletar CI e avaliação independente,
mantendo esse achado explícito. Isso não declara a RC pronta para integração
em development/main nem substitui decisão humana sobre qualquer risco residual.

### Nova captura do CI: teto de retry atingido com conflitos reconhecidos

[Run39058159071](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39058159071),
origem8f1f927, artefato12110417253: Integration214/215; quota horária recusou
INTERNAL_ERROR. A instrumentação preservou um DriverAdapterError/40001 seguido
de dois P2034/40001; todos com kind TransactionWriteConflict. Portanto o código
reconhece os formatos, mas atinge o teto3. Não se trata da omissão de adapter
anterior nem de timeout demonstrado (794.1628ms no cenário).

Planejamento de T047 atualizado antes de código: introduzir recuo assíncrono
limitado entre os mesmos retries reconhecidos, preservando teto e fronteiras.
INFERENCIA sobre contenção foi registrada no plano; não se muda contrato de
quota nem se inventa RATE_LIMITED quando o banco não confirma esse estado.

T047 RED determinístico no HEAD de planejamento `4a3ce49`, 18:37:45.441–
18:37:46.322Z: 11 testes, 9 PASS/2 FAIL. Sem espera, o resultado era completed
antes da barreira de backoff e a lista de esperas permanecia vazia.
[RED](cri-rev-005-evidence/retry-red.txt).
O mesmo teste, sem mudar assertions, ficou GREEN11/11 às 18:38:41.497–
18:38:43.415Z; [GREEN](cri-rev-005-evidence/retry-green.txt).
Comando dos dois: Node24, condições react-server, --import=tsx --test
--test-concurrency=1 tests/integration/area-cover-transactions.test.ts,
via accounts-local-postgresql.ps1/focal.ts em ambiente sintético guardado.

Mudança adicional autorizada pela incompatibilidade demonstrada: somente o helper
transacional do serviço recebe espera injetável, com padrão100–150ms/200–250ms.
Não se alteram serializer, DTO, payload, decisão A, quotas, timeout/maxWait,
allowlist de conflitos, teto3, assinatura/ticket ou a ordem de transações/I/O.
Esperar fora da transação permite nova tentativa reautorizar e reler o estado;
não é garantia de sucesso sob contenção ilimitada. Runbook atualizado nesse recorte.
Typecheck e lint dos arquivos alterados PASS; Unit/Integration/Contract/audit
serão registrados no snapshot novo, seguido da revalidação cumulativa da RC.

Após o recuo limitado: Unit296+Mail17, Integration218/218 (incluindo os três
casos novos de agendamento), Contract6/6 e SchemaAudit0 PASS, 18:38:50.101–
18:40:28.851Z. [Recibo do novo snapshot e manifesto](cri-rev-005-evidence/retry/validation-records.json)
e [registros RED/GREEN com hash do mesmo teste](cri-rev-005-evidence/retry/red-green-records.json).
A conclusão local justifica publicar a correção complementar e revalidar a
árvore cumulativa da RC; os CI anteriores permanecem históricos, sem atribuir
SUCCESS de pai ao novo HEAD.

## Encerramento técnico e publicação

Correção contratual implementada em `f38d439`, após planejamento `7a5681a`,
aproveitando o aplicador e o teste do pacote. `cover` obrigatório somente no
schema de listagem, três campos fechados; detalhe e serializer preservados.
Exemplos de detalhe/criação receberam o status já exigido e emitido pelo código.
O seletor de regressão foi corrigido em `8f1f927` sem mudar regras científicas.
Convergência adicional do serviço em `bf7a2b1`, após planejamento `4a3ce49` e
RED/GREEN11 casos: recuo limitado entre os três retries existentes, motivado
pelas duas falhas reais de CI, sem repetir provider ou alterar critérios de quota.
`RECOMENDACAO` técnica implementada sob o mandato de corrigir incompatibilidade
real demonstrada; não é nova decisão da equipe sobre produto ou ciência.

### Regressão cumulativa com o serviço final

HEAD RC testado `4b03798f8d35c5bb3756afc54494661681e4bb59`, Node24.19.0,
Next16.3.8/sharp0.35.5, PostgreSQL sintético próprio. Comando integral
`./scripts/rc-review-validation.ps1`, 18:43:06.722–18:49:57.419Z:
**15 gates PASS em uma única execução**, sem rerun dessa rodada.
Unit296+Mail17; Integration218; Migration37; Contract6; R117; Build/Typecheck/
Lint PASS (0 erros, 3 avisos anteriores); E2E72; Https2; Deletion3; Ihfr6;
Bootstrap14 migrations; SchemaAudit0. Não somar subconjuntos como testes únicos.
[Registros, comandos, tempos, SHA/tree, hash OpenAPI e hashes dos logs](cri-rev-005-evidence/rc-retry/validation-records.json)
e [manifesto do candidato cumulativo](cri-rev-005-evidence/rc-retry/functional-manifest.json).
Os CI oficiais do runtime final também concluíram SUCCESS:
[origem bf7a2b1 / run39059264824](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39059264824)
e [auditoria25d014c / run39059318548](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39059318548).
Os commits documentais subsequentes recebem checks próprios conforme o recibo.
As pastas rc-initial/rc-final preservam checkpoints anteriores ao recuo; a rodada
integral posterior está em rc-retry. Todos os FAILs anteriores continuam visíveis.
PostgreSQL retornou STOPPED; dados preservados e zero schemas de teste.

### Conferência adversarial final

- O único delta de produção em relação à RC832560a é o helper de retry de
  imagens. A espera está no catch após a transação, somente para conflitos já
  permitidos e antes da próxima tentativa; não há espera com callback transacional
  aberto, I/O externo repetido ou quarto retry. Uma nova tentativa reautoriza e
  relê o estado. Falha arbitrária recusa sem backoff; esgotamento continua genérico.
- Campos públicos, privacidade, flags, revisão, OCC, idempotência, quotas,
  transações, cleanup e UI foram revalidados pelos testes antigos e novos.
  A revisão não identificou outro bloqueio material no recorte após esses ajustes;
  isso não substitui revisão independente nem promete eliminar toda contenção.
- Nenhuma migration, dependência, configuração de deploy, workflow, arquivo
  imutável ou regra científica foi alterada. Os11 originais,99d8363 e832560a
  permanecem ancestrais da RC/validação. Propagação somente por merge commits.
- O PR7 contém a RC atual como ancestral e preserva exatamente seu diff
  independente de26 arquivos: SHA256
  `d94966767b272cae0294cceb2cbe91b62a5f61f4b08d7236771c69333e7b067c`.

### Recibo, arquivos e revisão humana

[Relação completa dos arquivos alterados](cri-rev-005-evidence/changed-files.json).
[Commits, pais dos merges, HEADs publicados, checks realmente observados e pedidos de revisão](cri-rev-005-evidence/publication.json).
O recibo registra o corte anterior ao seu próprio commit de fechamento; não
atribui o PASS de um pai a um novo SHA. Os quatro checks desse fechamento e das
sincronizações são acompanhados até a conclusão e o recibo final é atualizado nos
comentários estáveis:
[PR4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#issuecomment-6238618015),
[PR5](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5#issuecomment-6238618626),
[PR6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#issuecomment-6238619301),
[PR7](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7#issuecomment-6238619960).

PedroVitor237 e luciano-mendesz9 receberam solicitação formal de re-review4/5/6;
Luciano em7 (Pedro é autor e foi chamado à conferência de sincronização).
CHANGES_REQUESTED e thread antiga não foram dispensados/resolvidos pelo executor;
aprovação humana no candidato atual permanece pendente. Nenhum APPROVED criado.
Houve correção da codificação dos próprios comentários e do payload de lista
unitária do pedido7; todos os pedidos/comentários foram reconferidos no GitHub.

T041–T048 executadas no recorte técnico. Sem merge em development/main, deploy,
dados reais, migration remota ou operação Neon/Vercel/Cloudinary. Homologação real,
GateB012, aceite humano013 e operador continuam pendentes. O IHFR conserva as
quatro qualificações experimentais já registradas, sem validação científica nova.

### Convergência final do teste de formulário

O fechamento anterior não encerrou o acompanhamento: a run
[39060376048](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39060376048),
HEAD RC `2e4576b`, falhou em Ihfr5/6 no seletor global de uso da terra, que
encontrou dois selects. A mensagem escopada passou, mas o primeiro ajuste
de seletor era incompleto. Integration218/E2E72 e os demais gates até Deletion
passaram. Origem `aa9d2ce`, auditoria `97957a0` e validação `7e55d0f` concluíram
SUCCESS em seus próprios SHAs. [Falha preservada](cri-rev-005-evidence/ci-selector-field-failure.txt).
T048/T045 foram reabertas em `1d9fb68` antes de modificar o teste.

O cenário OWNER/ADMIN agora delimita todos os campos, mensagens, status e ações
às regiões ARIA visíveis de leitura/gerenciamento com nomes exatos. Dialog
continua selecionado por role. Valores, HTTP, scores, idempotência, foco, teclado,
viewport e todas as asserções foram mantidos; sem aumentar timeout/retry.
O mesmo candidato passou **Ihfr6/6 + SchemaAudit0 na origem e na RC**, pelo runner
oficial, 19:17:18.555–19:21:52.078Z. Typecheck/lint PASS. Na RC, cópia temporária
restaurada byte a byte e worktree limpa.
[Hashes, comandos e registros dos dois snapshots](cri-rev-005-evidence/selector-validation.json).
Serviço permanece exatamente em `bf7a2b1`; nenhuma regra científica mudou.

O recibo de publicação preserva o checkpoint anterior e acrescenta esse FAIL e
a revalidação focal. A sincronização segue origem→auditoria→RC→validação, por
merge commits. Os checks dos novos HEADs são acompanhados até o fim nos
comentários estáveis ligados acima; nenhum SUCCESS anterior os substitui.

### Checkpoint dos quatro CI e ocorrência inconclusiva

Conferência em 17/10 às19:54Z: os quatro HEADs abaixo concluíram seus próprios
**15 gates PASS**, confirmados nos artefatos, sem somar snapshots diferentes:

| PR | HEAD | Actions | Tentativa aprovada |
|---|---|---|---|
|4|9412e9a0d2c56ad1f2feba86bb7326d454d8fda0|[39062361014](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39062361014)|1|
|5|806c87ef20676e78886d69cc4df71d96d2fdf784|[39062363513](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39062363513/attempts/2)|2|
|6|9f89a2def8c26183375560c9d829ce0961cc833c|[39062367739](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39062367739)|1|
|7|4b33a34a9576ea7186993324a47a0ba8a25e24df|[39062371460](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39062371460)|1|

Unit296+Mail17, Integration218, Migration37, Contract6, R117, Build, Typecheck,
Lint (0 erros/3 avisos anteriores), E2E72, Https2, Deletion3, Ihfr6, Bootstrap14,
SchemaAudit0. [Registros, tempos, hashes dos logs e recibos](cri-rev-005-evidence/ci-published-checkpoint.json).

A primeira tentativa do PR5 passou os12 gates até Deletion e falhou **Ihfr0/6**:
controles ausentes em todos os cenários. Causa **INCONCLUSIVA**; o artefato não
incluiu a página/error-context ou a saída do servidor, portanto não se atribui
causa a produto, seletores ou infraestrutura. A reprodução controlada do mesmo
SHA, sem mudar código/assertions/timeouts/guards, passou todos15. Isso não
explica a primeira falha nem a apaga. [Saída preservada](cri-rev-005-evidence/ci-audit-attempt1-failure.txt)
e [recibo durável com hashes e limites](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5#issuecomment-6239782988).
Ocorrência encaminhada a Pedro/Luciano; aprovação e causa continuam pendentes.

A leitura de conferência detectou perda de acentuação em três trechos de
fechamento inseridos via pipe PowerShell/Python; corrigidos para UTF-8 neste
recibo. Nenhum input funcional foi alterado. Este novo commit documental e suas
sincronizações recebem checks próprios, acompanhados até a conclusão e
registrados nos quatro comentários estáveis acima. O checkpoint desta tabela
é histórico e não atribui seu SUCCESS aos próximos SHAs.
