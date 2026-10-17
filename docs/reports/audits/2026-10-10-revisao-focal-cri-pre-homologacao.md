# Revisão focal CRI pré-homologação — 2026-10-10

## Parecer e autoridade

RECOMENDACAO do revisor: **APTO COM RESSALVAS** para solicitar homologação
controlada. A revisão local está encerrada; nenhum P0/P1 nem defeito funcional
novo foi reproduzido no recorte avaliado. Foram realizadas correções documentais
comprovadas, sem reimplementar 014/015/016. Esse parecer não é aceite da equipe,
homologação externa, aprovação científica ou autorização de operação remota.

Origem: solicitação explícita do usuário e prompt focal v1.0
HIDROFLORESTA-CRI-REVISAO-FOCAL, indicado durante a execução. Arquivo na raiz do
checkout original: prompt-revisao-focal-pre-homologacao-hidrofloresta.md, SHA-256
`3c0cb8b24423d3fad958156625e846ab6e8e83e06f783b3e8e2292010918cb28`.
Foi preservado como não rastreado, sem copiá-lo para os commits. O anexo inicial
de execução v1.0 também foi lido; a instrução atual de não realizar operações
remotas prevalece. Não houve fetch, instalação, consulta de PR, push ou deploy.

Data civil real: 2026-10-10, America/Sao_Paulo e America/Fortaleza UTC−03 nesta
data. Preflight da revisão 19:16:05 UTC; gates novos 19:20:06–19:33:29 UTC.
Coordenação no [ciclo focal de PLAN-CRI-002](../../plans/active/reconciliacao-e-evolucao-contas-rascunhos-imagens.md),
plano equivalente já existente; não foi criado plano ou TASKS global duplicado.
Constituição, AGENTS, PLANS, fontes e decisões científicas não foram alterados.

## Git e preservação

EVIDENCIA_IMPLEMENTACAO: checkout de entrega C:/projetos/ifma/HidroFlorestas-cri-exec,
base validada `41f33db7ca30db3f9d971999c3f8131f4fc188a0`, branch nova
`audit/cri-local-20261010`, sem upstream. Tracked/untracked/staged/unstaged vazios
no preflight. Ignorados node_modules/.next/.accounts-validation anteriores
preservados; novos coletores/logs ficaram somente em subdiretório próprio.
Checkout original C:/projetos/ifma/HidroFlorestas-FullStack continua main em
`beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`; seu único não rastreado observado ao
final é o prompt indicado pelo usuário. Nenhuma alteração dele foi incorporada.

Remote conferido por configuração local:
https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git.
origin/main e origin/development são referências armazenadas em beba96fb;
não comprovam o estado remoto atual. Os dois worktrees permanecem existentes.

Comandos: git log --reverse --topo-order BASE..HEAD, log com %H/%P/%aI/%cI,
for-each-ref, show, diff --name-status/--stat e merge-base --is-ancestor.
As oito revisões têm cadeia linear e pais exatos; planejamentos antecedem suas
implementações e o fechamento documental vem por último. Datas de autor e
committer coincidem nos oito registros e crescem de 13:55:03 a 15:32:01 UTC−03.
Essa metadata é consistente com a ordem topológica; não substitui logs de execução.

| Ordem | SHA original preservado | Checkpoint/conteúdo |
|---|---|---|
| 1 | `c59a7b6eb1198e20535356934805f0b93d2e99c2` | reconciliação; branch docs/reconciliacao-cri-20261010 |
| 2 | `6bf9f2ba94698516282e482b690fbe5d812088f5` | planejamento 014 |
| 3 | `857aeab959c32e9d4fdc8fcd9ebbabba5c5f999a` | runners/checksums; branch014 preservada |
| 4 | `26f2bd77568fb7be01ae6347e08a4a2796c917a0` | planejamento 015 |
| 5 | `45da350c34f873619a81bb5b3022bf97a1d1bc7c` | drafts; branch015 preservada |
| 6 | `1ae3ca51ebb0291751a39c1b2f873431ab09da52` | planejamento 016 |
| 7 | `06fcbe005b7198b0708f280d9844f5edc0c7451d` | capas, descendente dos seis anteriores |
| 8 | `41f33db7ca30db3f9d971999c3f8131f4fc188a0` | fechamento; branch016 preservada; base da auditoria |

Diff BASE..41f33db: doze migrations anteriores intactas; somente as aditivas
20261010000100/000200 foram acrescentadas. docs/raw, políticas e constituição
intactos. Seleção dedicada de exclusão preserva os três testes e seus guards;
assertions anteriores de escopo/ordem continuam nas alterações de projeção de
áreas e do inventário de migrations. Dependências focais cloudinary2.11.0 e
sharp0.35.4 correspondem a package/lock e versões instaladas; nenhuma versão nova
foi instalada nesta revisão. A cadeia Git não impõe dependência funcional entre
drafts e capas. Histórico de merges de outro proprietário não foi promovido a
estado de PR no remote atual.

## Achados, ação e evidência

EVIDENCIA_IMPLEMENTACAO documental, exceto recomendações explicitamente indicadas.
P2: correção focal; P3: esclarecimento para evitar leitura indevida. Nenhum desses
achados demonstrou erro de produto; nenhuma tarefa funcional foi inventada.

| ID/severidade | Local e cenário | Risco/ação autorizada | Verificação e estado |
|---|---|---|---|
| D1/P2 | handoff e evidência016 descreviam R1 como os mesmos 17 Mail | composição errada da evidência; corrigir para 14 Pg de Integration +3 SMTP locais de Mail | package.json:17, nomes dos 17 casos nos três logs cruzados; corrigido em d8a32d3 |
| D2/P2 | spec014:5 e spec015:5 ainda diziam Especificada | implementação local parecia pendente; atualizar status preservando textos anteriores como checkpoints | commits funcionais, 6/18 tarefas concluídas, reexecução; corrigido em d8a32d3 |
| D3/P2 | proveniência spec015 ligava drafts a CF-PRD-FR-009 | domínio principal errado; relacionar a CF-PRD-FR-007, como INFERENCIA, sem aprovar taxonomia candidata | requirements.md:114/144; spec/matriz de rastreabilidade corrigidas em d8a32d3 |
| D4/P2 | matriz, checkpoint Git: 06fcbe0 dito ancestral das etapas anteriores | ordem invertida; substituir por descendente dos anteriores e ancestral de41f33db | pais completos e verificações de ancestralidade; corrigido neste fechamento |
| D5/P2 | handoff, Estado atual EM_ANDAMENTO e Estado desta entrega | cortes antigos concorriam com estado vigente; rotular reconciliação histórica e entrega documental de03/10 | foreground AGUARDANDO_REVISAO e rótulos explícitos; corrigido neste fechamento |
| D6/P2 | handoff/matriz/evidência016 afirmavam equivalência 7f→5f sem manifesto anterior | atribuição excessiva; qualificar NÃO VERIFICADO, preservar relato original e executar regressão atual | tentativa de reconstrução não recuperou7f; 520 arquivos do5f verificados e gates novos PASS; limite explícito |
| D7/P3 | documentos temáticos misturavam propostas antigas e contratos vigentes | leitura indevida de retenção30d, URL externa ou varredura de namespace; indicar o que foi superado e links diretos | decisões identificadas, spec/contrato/migration/runbook; esclarecido neste fechamento |

Investigações sem defeito funcional confirmado:

- DELETE de ativos por ID não usa o endpoint por publicId/resource_type.
  O contrato do SDK instalado, lib/api.js delete_resources_by_asset_ids, usa
  resources e asset_ids; adaptador/teste plural correspondem. Isso é evidência
  local do contrato, não validação real do provedor.
- Replay de save após confirmação por terceiro retorna só o draft pessoal
  anterior; não grava nem cria segundo conjunto, conforme o contrato de
  remanescentes. Confirmação sem referência própria vigente é recusada e rollback
  preserva draft/medição. Não foi modificado por suspeita não comprovada.
- Dry-run FAIL às19:27:28: o wrapper Regression entrega DATABASE_URL de referência
  vazia e TEST_DATABASE_URL própria. Diagnóstico readonly confirmou ausência das
  tabelas no primeiro e presença no segundo. O coletor passou a selecionar
  explicitamente o alvo próprio com guard loopback/database, antes do import do
  CLI existente. PASS às19:27:59, sem mudança no produto ou no banco de referência.

## Snapshots e alcance da evidência

Método: scripts/mail-validation-diagnostics.ts, SHA-256 dos bytes de cada arquivo
selecionado por git ls-files --cached/--others/--exclude-standard; lista ordenada
e deduplicada de {path,sha256}; SHA-256 do JSON compacto. Inclui src/tests/scripts/
prisma/public/dependências/configurações selecionadas. Exclui docs, arquivos de
ambiente, artefatos ignorados e coletores. Bytes CRLF do working tree não são os
blobs LF normalizados do Git; SHA Git e fingerprint têm significados distintos.

O [manifesto final](2026-10-10-cri-local-manifest.json) contém 520 entradas;
todos os hashes foram recalculados, antes/depois dos gates e na consolidação:
`5f36eb7e02e465741c85e5b3706276d9d153417037dce1193f7b03510d6c286d`.
Não houve mudança funcional em relação a41f33db. Gates completos têm HEAD
`497d2e5326ea33232bf9fbd44442162d77f0a86c`; lint final/CLI/audit de recursos têm
`d8a32d39572785d87744e2b10c87e79ad019ba46`, com os mesmos bytes funcionais.
O fechamento posterior altera apenas documentos; não se afirma que seu SHA
tenha sido usado como HEAD em testes anteriores.

O manifesto de `7f540ba4160402d710bbe164dbba630a41f80e58c267dc9a46820446e853b8ce`
não foi encontrado. Remover em memória a exceção exata do exemplo env e o bloco
de quatro linhas de animação, variando somente LF/CRLF desses dois arquivos,
não recuperou esse fingerprint. Nenhum arquivo histórico foi modificado.
**NÃO VERIFICADO** que essas sejam as únicas diferenças ou que a implementação
dos dois cortes seja idêntica. Não há base para identificar todos os bytes/hunks
históricos; o manifest atual e a regressão nova resolvem a validação do candidato
presente, preservando a limitação histórica. Resultado do método no JSON novo.

A exceção .gitignore permite exatamente .env.images.example, não .env,
.env.local, .env.images.example.local ou backups. O exemplo foi revisado:
desabilitado por padrão, credenciais vazias, apenas nome de preset proposto.
Embora versionado, é excluído pelo filtro de fingerprint; seu SHA-256 e essa
limitação estão registrados separadamente na evidência. Não é inventário de
segredos nem validação de credenciais reais.

Os JSON históricos014/015/016 (21/37/31 registros) continuam intactos. Foi
conferida coerência de UTC/duração e PASS/FAIL/exit quando disponíveis, sem
anomalia encontrada; hashes históricos estão no JSON novo. Isso não reconstrói
snapshots intermediários nem comprova independentemente antigos logs sem hash.
Revisões por draft_research/image_research continuam históricas; nenhum subagente
executou uma nova revisão nesta rodada.

## Verificações desta revisão

Ambiente: Windows, Git2.55.0.windows.4, Node24.19.0, npm12.0.2, PostgreSQL17
próprio loopback55427; testes sintéticos e fake. Runners existentes, sem instalar
outro runner. Execução sequencial para DB/.next/porta. Detalhes de comando,
ambiente, UTC/duração/exit/HEAD/fingerprint e SHA-256 dos logs redigidos em
[evidências novas](2026-10-10-cri-local-validation.json); os logs permanecem
locais no subdiretório ignorado audit-20261010-1916, sem dados privados anexados.

| Comando efetivo | Resultado desta rodada |
|---|---|
| npm run test:unit | PASS, 291 Node +17 Mail |
| npm run test:integration | PASS, 187 PostgreSQL |
| npm run test:migration | PASS, 37 |
| npm run test:contract | PASS, 6 |
| npm run test:mail:r1 | PASS,17; repete14 Integration +3 Mail |
| npm run test:e2e | PASS,67 Chromium |
| npm run test:e2e:https | PASS,2; teardown usuários0 |
| node --import=tsx scripts/account-deletion-e2e.ts | PASS,3; fixtures próprias |
| npm run typecheck / npm run build | PASS, exit0 |
| npm run lint | PASS; primeira execução4 warnings, um do coletor; após retirar import ocioso do coletor,0 erros/3 warnings anteriores |
| node --import=tsx scripts/imp006-clean-bootstrap.ts --with-versioned-baseline | PASS,14 migrations; escrita revertida; somente DB novo próprio descartado |
| node --conditions=react-server --import=tsx scripts/area-cover-preset.ts <fixture sintética> | PASS, providerCalls0; nenhum Admin API real |
| CLI area-cover-cleanup.ts via coletor de alvo próprio, sem --execute | primeiro FAIL de alvo incorreto preservado; PASS posterior, eligible0/providerCalls0 |
| npm run test:ihfr:audit:assert-zero | PASS nas duas execuções; final19:33:29, zero schemas candidatos |

R1 e repetições focais não aumentam total exclusivo. Não foi calculado total
global pela soma de suites. Os 18 registros novos incluem 17 PASS e o FAIL
ambiental preservado; isso é quantidade de execuções, não de casos distintos.
Checks de manifesto, hashes de logs, snapshots antes/depois, contagens e overlap
dos nomes passaram. Diff e links do checkout completo foram revisados: 49
documentos/223 links relativos, sem destino, case ou âncora ausente. Escopo:
pacote CRI, specs014/015/016, Markdown alterado e relatório novo; não é alegação
de validação de toda a documentação histórica do repositório.

| Frente | Código/cenários efetivamente avaliados | Homologação/limite |
|---|---|---|
| 014 | seleção dedicada, guards, UTF-8/LF/CRLF e rejeição de conteúdo real; bootstrap14 | nenhum gate humano de contas fechado |
| 015 | parser parcial, zero/false/ausência, isolamento/dois labs/revogação/inativo, OCC/replay/ABA, consumo/rollback, exclusão pessoal, UI móvel/teclado/saída | Chromium com Navigation API cancelável; outros navegadores NÃO EXECUTADOS |
| 016 | Pg/fake roles contextuais, revogação, quotas/expiry/preset, EXIF/bytes reais/static, proxy privado, CAS/retry/antiga, ownership/late/raw/cleanup, exclusão do uploader | UI HTTP fake e integração fake separados; não é upload autorizado completo end-to-end no provedor real |
| 012/mail/013 | reset/reenvio/consumo único/revogação, outbox/fencing/leases, blockers/rollback/exclusão e sessões HTTPS | SMTP real, Gate B012 e aceite humano013 NÃO EXECUTADOS |
| Ciência/IHFR | testes de integração/migration e contratos atuais; nenhum dado ou algoritmo alterado | E2E IHFR dedicado NÃO EXECUTADO nesta revisão; nenhuma validação científica |

PostgreSQL inicialmente STOPPED foi restaurado a STOPPED em19:33 UTC, com
dados anteriores preservados. Não foram removidos bancos pré-existentes; somente
o bootstrap descartou seu banco recém-criado com ownership. Recursos remotos,
contas reais, SMTP, upload/delete real e scheduler não foram acessados.

## Alterações e commits novos

Mudanças exclusivamente documentais: ciclo de plano focal; status de specs014/015;
errata R1/equivalência em evidência016; matriz/handoff/readme e documentos temáticos;
rastreabilidade de drafts; referências de contexto/registro/estado PRD; este
relatório, manifesto e JSON de validação. Histórico, JSON antigos, src/tests/
scripts/schema/migrations/dependências e políticas permanecem intactos.

| Ordem após os oito | SHA real / branch audit/cri-local-20261010 | Mensagem e validação |
|---|---|---|
| 9 | `497d2e5326ea33232bf9fbd44442162d77f0a86c` | docs(audit): registra revisão técnica da entrega local; plano/diff antes das correções |
| 10 | `d8a32d39572785d87744e2b10c87e79ad019ba46` | docs(audit): corrige estados e rastreabilidade das evidências; fontes/diff/gates locais |
| 11 | SHA informado na resposta final, não dentro do próprio commit | docs(audit): reconcilia revisão focal e prontidão local; achados restantes/evidências/links/preservação |

Não houve amend/rebase, autoria nova, hook suprimido ou commit vazio. Não foi
necessário novo incremento Spec Kit: nenhum defeito funcional novo comprovado;
as specs/plan/tasks existentes foram confrontadas com implementação e testes.
Uma futura correção funcional exige spec/plan/tasks anteriores à escrita.

## Pendências e roteiro de homologação futura

RECOMENDACAO: solicitar revisão do candidato local e definir destino/autorização
próprios antes de qualquer operação externa. O plano fica AGUARDANDO_REVISAO,
sem arquivamento. Responsável humano/operacional não especificado.

1. Gate B012/T025/T028: no destino autorizado, navegadorB recebe e consome link
   real de reset, verifica uso único e revogação de A; após cooldown, código
   antigo recusado e novo aceito. Registrar UTC/candidato/resultados sem provas
   ou PII, conforme [runbook de contas](../../operations/account-homologation-runbook.md).
2. Aceite013: conta sintética removível autorizada; cancelamento, senha, blockers,
   exclusão e revogação observados por humano. Testes locais não encerram aceite.
3. Cloudinary: aprovar destino/configuração e operador/créditos PD-CRI-010;
   preset versionado congelado e hash, credenciais privadas, smoke de privacidade/
   EXIF/substituição/late/raw/cleanup e custos somente em IDs próprios, conforme
   [runbook de capas](../../operations/area-covers-runbook.md). Assinatura1h não
   é revogada por appTTL10min; tombstones e EXIF de staging exigem operação.
4. Validar a UI de drafts em uso humano e navegadores alvo antes de alegar suporte
   amplo; [runbook de drafts](../../operations/environmental-drafts-runbook.md).
5. Revisar e autorizar separadamente qualquer push/PR/deploy/migration remota.
   Nada disso foi executado nesta revisão. Operação contínua de mail PD-CRI-004
   e todas as pendências científicas continuam sob suas autoridades.

IHFR permanece CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
