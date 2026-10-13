# Plano de execução dos estudantes — HidroFloresta

Identificador: EST-CRI-20261013. Versão documental: 1.0. Data: 2026-10-13.
Estado da execução dos estudantes: `NAO_INICIADO`. **43 tarefas, todas PENDENTE.**
Coordenador, calendário e aprovador: não especificado; preencher na EST-001.

## Objetivo e limites

`DECISAO_CONFIRMADA`: o responsável pelo projeto, na solicitação desta conversa
de 2026-10-13, determinou que os estudantes assumam revisão, homologação dos
serviços externos, integração e atualização da aplicação já hospedada. Autorizou
ao agente apenas criar/versionar/publicar este plano. **O objetivo é atualizar
a plataforma existente**, preservando recursos, dados e histórico; não reconstruir
a infraestrutura nem criar uma segunda produção.

`FATO_DOCUMENTADO`: as specs 014, 015 e 016 estão implementadas na Release Candidate
[release/cri-rc-20261010](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/release/cri-rc-20261010).
O corte reconciliado antes deste documento é
`2995cff372a8ff173d452b87f334d03b096de50e`. Contém as correções RC-DRAFT-001
(hidratação lenta), RC-UI-001 (recarga da capa) e o commit original
`99d8363fba4d13a8a02937be1ff2e606d35b3fa6` de dependências.
[Prontidão e evidências](rc-readiness-20261013.md) registram 15 gates e 70/70 E2E
locais no candidato cumulativo. A
[run do HEAD reconciliado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38455037303)
terminou SUCCESS. Esta publicação documental avança a RC; obter seu SHA pelo
histórico do arquivo/PR #6 e conferir os checks desse novo HEAD antes de revisar.
PASS anterior não deve ser atribuído ao novo commit sem a evidência correspondente.

Continuam pendentes: pareceres dos revisores, integração principal, Gate B012,
aceite humano013, browsers alvo, Cloudinary real, operadores/agendadores,
inventário produtivo, backup restaurado, ensaio e autorização da janela.
O resultado esperado é uma versão aprovada efetivamente publicada no projeto
Vercel existente, com banco compatível, jornadas aceitas, recuperação ensaiada,
monitoramento ativo e relatório rastreável ao SHA/deployment reais.

Todo procedimento futuro deste plano é `RECOMENDACAO`. Preencher responsáveis e
autorizações não concede automaticamente permissão de banco, provedor ou deploy.
Decisões de recorte, custos, janela e risco residual são `PENDENCIA_DE_DECISAO`
até confirmação com origem registrada. Quando faltarem dados, usar
`não especificado`; classificar deduções como `INFERENCIA`.

O IHFR conserva **CONTRATO_EXPERIMENTAL**, **VALIDACAO_CIENTIFICA_PENDENTE**,
**SUJEITO_A_RECALIBRACAO** e
**NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO**, conforme
[ADR-0001](../../governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
Testes de software não validam ciência, fórmula, universalidade ou calibração.

## Como usar este ponto de entrada

Seguir as tarefas na ordem, marcar uma caixa somente com aceite e link de evidência.
O gate de saída libera apenas o trabalho que depende dele. Inventários somente
leitura podem ser antecipados para esclarecer gatilhos antes de integrar; nunca
antecipar escrita de banco, mudança de segredo ou publicação produtiva.

| Etapa | Tarefas | Entrada | Saída a registrar |
|---|---|---|---|
| Organização | EST-001–002 (2) | Leitura deste plano | G0: papéis, registros e limites definidos |
| Fase 1: revisão | EST-003–011 (9) | G0 | G1: sete pareceres e impedimentos tratados |
| Fase 2: integração | EST-012–014 (3) | G1; gatilhos/destino conferidos | G2: SHA integrado validado, sem produção antecipada |
| Fase 3: serviços existentes | EST-015–019 (5) | G2; acesso somente leitura autorizado | G3: mapa aplicação→serviços e operadores confirmado |
| Fase 4: backup/migrations | EST-020–025 (6) | G3; autorização dos destinos/backup | G4: restore, ensaio e recuperação aceitos |
| Fase 5: homologação | EST-026–034 (9) | G2/G3/G4; candidato isolado autorizado | G5: aceites do recorte aprovado |
| Fase 6: produção | EST-035–039 (5) | G1–G5 e aprovação própria | G6: atualização e reabertura aprovadas |
| Fase 7: acompanhamento | EST-040–043 (4) | G6 | G7: observação e relatório final aceitos |

Nenhuma etapa recebe PASS por ausência de teste. No rollout parcial, as caixas
Cloudinary permanecem abertas, com estado anotado `PENDENTE — FORA DO RECORTE
APROVADO`; o gate registra exatamente quais funcionalidades foram aceitas.

### Referências técnicas e autoridade

| Assunto | Documento a seguir |
|---|---|
| Instruções e fluxo por feature | [AGENTS.md](../../../AGENTS.md), [PLANS.md](../../../PLANS.md), [constituição](../../../.specify/memory/constitution.md) |
| Produto, classificação e evidência | [PRD Code-First](../../code-first-prd/README.md), [política](../../code-first-prd/governance/source-policy.md), [autoridade](../../governance/SOURCE_AUTHORITY.md) |
| Situação da RC | [Pacote](readme.md), [prontidão atual](rc-readiness-20261013.md), [checklist](review-checklist.md) |
| Git/GitHub | [Guia de integração](integration-guide.md), [runbook CI](../../operations/rc-review-ci-runbook.md), [workflow](../../../.github/workflows/rc-review.yml) |
| Projeto existente/variáveis/deploy | [Atualização de produção](production-update-runbook.md) |
| Banco, backup, restore e recuperação | [Migrations](migration-runbook.md) |
| Contas e recebimento real | [Homologação de contas](../../operations/account-homologation-runbook.md), [mail](../../operations/mail-runbook.md) |
| Rascunhos | [Runbook drafts](../../operations/environmental-drafts-runbook.md), [hidratação](../../../specs/015-environmental-drafts/hydration-evidence.md) |
| Capas | [Runbook Cloudinary](../../operations/area-covers-runbook.md), [recarga](../../../specs/016-area-covers/rc-ui-001-evidence.md) |

As continuações datadas dos runbooks atualizam os registros históricos, sem
apagar falhas anteriores. Código/configuração comprovam implementação; os
runbooks não aprovam ações externas. Não editar `docs/raw/**`.

### Reconciliação inicial de GitHub em 2026-10-13

`EVIDENCIA_IMPLEMENTACAO`: consultas autenticadas de metadados/reviews/threads e
API de check-runs confirmaram a tabela. Todos os sete PRs estão OPEN e sem merge.
Nenhuma aprovação foi encontrada. Os nomes de revisores citados nas discussões
são evidência da revisão, não designações para os papéis da equipe deste plano.

| PR e conteúdo | Base → head | HEAD antes deste plano | Checks desse HEAD | Parecer/pendência |
|---|---|---|---|---|
| [#1: reconciliação](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/1) | development → review/cri-reconciliation-20261010 | a88d846 | Sem check-runs | Sem review registrado |
| [#2: runners014](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/2) | review/cri-reconciliation-20261010 → review/014-account-test-runners | 7180209 | Sem check-runs | Sem review registrado |
| [#3: drafts015](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/3) | review/014-account-test-runners → review/015-environmental-drafts | 65516f6 | validate SUCCESS | Re-review solicitado; sem aprovação |
| [#4: capas016](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4) | review/015-environmental-drafts → review/016-area-covers | 8f18398 | validate SUCCESS | CHANGES_REQUESTED; 1 thread aberta/outdated |
| [#5: auditoria](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5) | review/016-area-covers → review/cri-audit-20261010 | 52f612f | validate SUCCESS | Re-review solicitado; sem aprovação |
| [#6: RC](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) | review/cri-audit-20261010 → release/cri-rc-20261010 | 2995cff | validate SUCCESS | CHANGES_REQUESTED; discussão de propagação histórica |
| [#7: revisão independente](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7) | release/cri-rc-20261010 → review/cri-rc-validation-20261012 | 59baff4 | validate SUCCESS | Sem aprovação; conferir base após este plano |

Em #1/#2 não há execução automática configurada nesses nomes; validar dentro da
árvore integrada e registrar a lacuna, sem chamar ausência de check de PASS.
O combined status REST retorna `pending` sem contextos mesmo nos heads com
check-run SUCCESS; examinar check-runs e workflow runs, além dos status legados.

A [thread de RC-UI-001](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#discussion_r4255042102)
permanece não resolvida; `outdated` não significa aceite. A
[review de #6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#pullrequestreview-5499467293)
e seu [comentário de propagação](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#issuecomment-6151817393)
descrevem snapshots anteriores. As correções posteriores e o patch integrado
estão documentados na prontidão atual; somente o revisor pode registrar novo
parecer/resolução. **CI positivo não equivale a aprovação humana.**

O [follow-up independente de CI](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/59baff4f5cbe44164014aaf760a0651604177abb/docs/reports/audits/2026-10-13-cri-rc-ci-followup.md)
registra, no PR #5, timeout de navegação da verificação de conta; no #7, locator
IHFR em strict mode diante de duas mensagens no DOM. Reruns nos mesmos SHAs
passaram, sem causa demonstrada. ECONNRESET em admin-read e o FAIL histórico de
drafts também permanecem nas evidências da prontidão. Não atribuir o timeout de
contas à hidratação de drafts nem o locator duplicado a erro científico de IHFR.

### Erratas, limitações e efeito desta publicação

`EVIDENCIA_IMPLEMENTACAO`: o readme e o primeiro item do checklist ainda citavam
seis PRs em instruções executáveis; esta entrega os corrige para sete. As tabelas
originais de seis etapas no guia de integração são histórico de 2026-10-10;
aplicar sua atualização de 2026-10-13 e a cadeia completa acima. O runbook de
produção também conserva a ausência histórica de consulta autenticada Vercel;
a continuação posterior confirma o vínculo Git, sem fechar o inventário restante.

A RC remota possui `git.deploymentEnabled["release/cri-rc-20261010"]=false` no
[vercel.json](../../../vercel.json), verificado pela API antes da escrita.
Não há alteração desse arquivo nesta publicação. O workflow inicia CI em push
documental, sem deploy. A consulta Vercel já registrada na prontidão confirmou
projeto `hidro-florestas-full-stack`, fork atual e produção `main`; os estudantes
devem reconfirmar o destino/domínio/banco antes de operar.

O novo commit muda o HEAD do PR #6 e a base de #7. A branch de #7 contém a RC
anterior, mas precisará receber este avanço documental antes da integração final.
**Sincronizar #7 é tarefa dos estudantes (EST-012), por merge da base na branch
de revisão, seguido de conferência de diff e checks.** Não incorporar o head de
#7 na RC para eliminar sua revisão independente; não duplicar/cherry-pick 99d8363.

## Organização da equipe e registros

### Papéis a preencher

Uma pessoa pode assumir mais de um papel conforme a capacidade da equipe;
registrar conflitos de interesse. O autor não aprova sua própria revisão.
O aprovador deve ter autoridade explicitamente designada pelo responsável do projeto.

| Papel | Principal | Substituto | Entrega e critério de aceite |
|---|---|---|---|
| Coordenador da execução | ______ | ______ | Dependências, calendário e gates atualizados; nenhuma etapa sem owner |
| Revisores de código | ______ | ______ | Parecer por PR, achados/evidências e re-review; independência do autor |
| Responsável Git/GitHub | ______ | ______ | Ordem/retarget/SHAs preservados; integrado validado e registrado |
| Responsável Vercel | ______ | ______ | Projeto/domínio/deployment anterior e candidato conferidos; recuperação ensaiada |
| Responsável PostgreSQL/Neon | ______ | ______ | Alvo/migrations/drift, backup restaurado e execução autorizada comprovados |
| Responsável SMTP/agendamento | ______ | ______ | Recebimento real, fila e invocações automáticas observados; owner contínuo |
| Responsável Cloudinary/limpeza | ______ | ______ | Preset/privacidade/ownership/custos/jobs aceitos antes de ativar |
| Responsável testes/homologação | ______ | ______ | Matriz de cenários, browsers e três tipos de evidência completos |
| Aprovador da atualização produtiva | ______ | ______ | GO/NO-GO, recorte, janela, riscos e reabertura assinados |

### Registro mínimo para cada conclusão

Usar este plano como índice: associar cada EST ao PR/issue e a um registro redigido
no pacote de release. Formato recomendado: `YYYY-MM-DD-evidencias-estudantes.md`;
relatório final `YYYY-MM-DD-relatorio-execucao-estudantes.md`. Dados privados vão
para armazenamento autorizado, com apenas referência opaca no GitHub.

| Campo | Preenchimento |
|---|---|
| Tarefa, responsável/substituto e estado atual | ______ |
| SHA completo, ambiente/fingerprint e data/hora UTC | ______ |
| Cenário/comando, resultado esperado/obtido | ______ |
| Evidência automatizada local/CI | ______ |
| Evidência com provedor real | ______ |
| Aceite humano, autoridade e link | ______ |
| Risco, bloqueio, decisão de recorte e prazo | ______ |

Não publicar PII, códigos de verificação, links de reset, senhas, cookies, bearer,
connection strings, dotenv privados, backups ou URLs assinadas. Screenshots devem
ser redigidos. `SENT`/SMTP accepted não comprovam inbox; fake não homologa provedor;
teste automatizado não registra consentimento ou parecer humano.

### Preparação — G0

- [ ] **EST-001 — Designar equipe e calendário**
  - **Objetivo:** tornar cada entrega executável por pessoas identificadas.
  - **Pré-requisitos/dependências:** leitura deste plano e mandato do responsável pelo projeto.
  - **Responsável:** coordenador; designação confirmada pelo responsável pelo projeto.
  - **Procedimento:** preencher papéis/principal/substituto, capacidade, datas, reunião de gates e autoridade do aprovador; conferir permissões mínimas sem compartilhar credenciais.
  - **Entregáveis:** tabela preenchida e calendário com dependências.
  - **Evidências:** registro da designação/autoridade e confirmação de acesso, sem valores secretos.
  - **Critério de aceite:** todas as funções cobertas e independência de revisão definida.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** falta de owner ou de autoridade impede sua operação correspondente.

- [ ] **EST-002 — Abrir registro de execução e limites**
  - **Objetivo:** acompanhar trabalho e proteger ambientes/dados.
  - **Pré-requisitos/dependências:** EST-001.
  - **Responsável:** coordenador e testes/homologação.
  - **Procedimento:** criar registro no formato acima, atribuir EST a responsáveis, registrar alvos autorizados e limites de leitura/escrita; separar provas locais, reais e humanas.
  - **Entregáveis:** índice de evidências/achados e matriz de autorizações.
  - **Evidências:** links, responsáveis e aprovação do tratamento privado de dados.
  - **Critério de aceite:** G0 registrado; nenhum teste sintético ou harness aponta à produção.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** evidência com segredos deve ser contida/redigida; destino incerto bloqueia acesso operacional.

## Fase 1 — Revisão da Release Candidate

Entrada: G0. Saída: G1 na EST-011. Consultar os diffs por etapa, as specs e o
[checklist](review-checklist.md); os títulos antigos 1/6–6/6 não excluem #7.

- [ ] **EST-003 — Atualizar snapshot da pilha e dos checks**
  - **Objetivo:** revisar o candidato remoto vigente.
  - **Pré-requisitos/dependências:** EST-002.
  - **Responsável:** Git/GitHub e revisores.
  - **Procedimento:** fetch em checkout isolado; registrar bases/heads completos de #1–#7, main/development, reviews, threads abertas e runs no SHA; confirmar proteção Vercel e diferenças do novo plano.
  - **Entregáveis:** tabela atualizada da pilha e mapa de ancestrais.
  - **Evidências:** URLs dos PRs, SHA completo, check-runs/conclusão e UTC da consulta.
  - **Critério de aceite:** snapshot atual, sem confundir checks antigos, status vazio ou mergeability com aprovação.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** mudança de head invalida parecer ainda não confrontado com o novo diff.

- [ ] **EST-004 — Revisar reconciliação e runners (#1/#2)**
  - **Objetivo:** validar base documental, proteção Git e segurança dos runners014.
  - **Pré-requisitos/dependências:** EST-003.
  - **Responsável:** revisores; Git/GitHub e banco apoiam.
  - **Procedimento:** abrir #1/#2; conferir decisões e diff, guards de loopback/ownership/ACL, runner dedicado de exclusão e tratamento de bytes LF/CRLF; comparar SQL antigo pelos blobs, conforme guia/checklist.
  - **Entregáveis:** parecer individual por PR e achados vinculados.
  - **Evidências:** linhas/diffs e comandos de conferência redigidos.
  - **Critério de aceite:** nenhuma tolerância do harness014 usada para mascarar SQL alterado ou corrigir histórico remoto.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** guard enfraquecido ou migration histórica alterada impede G1.

- [ ] **EST-005 — Revisar drafts e RC-DRAFT-001 (#3)**
  - **Objetivo:** confirmar integridade pessoal, semântica dos campos e primeira gravação.
  - **Pré-requisitos/dependências:** EST-004.
  - **Responsável:** revisores e testes/homologação.
  - **Procedimento:** seguir spec015/runbook/hydration-evidence; revisar autorização contextual, OCC/idempotência, isolamento, rollback/consumo transacional e hidratação lenta antes do primeiro PUT; distinguir false/0/vazio/ausência.
  - **Entregáveis:** parecer #3 e rastreio dos cenários relevantes.
  - **Evidências:** RED/GREEN existentes confrontados com código atual, payloads sintéticos e diff.
  - **Critério de aceite:** rascunho não alimenta IHFR confirmado e falha/conflito não perde edição nem consome draft alheio.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** perda da primeira seleção ou alteração científica exige correção planejada antes de integrar.

- [ ] **EST-006 — Revisar capas e RC-UI-001 (#4)**
  - **Objetivo:** avaliar privacidade, recuperação e integridade das referências.
  - **Pré-requisitos/dependências:** EST-005.
  - **Responsável:** revisores, Cloudinary e testes/homologação.
  - **Procedimento:** seguir spec016/runbook/rc-ui-001-evidence; revisar preset/hash, decoder/EXIF, proxy reautorizado, leases/CAS e cleanup por asset_id; conferir GET503→200 na mesma revision1 e nova falha recuperável.
  - **Entregáveis:** parecer #4 e resposta técnica à thread aberta.
  - **Evidências:** novo GET/naturalWidth>0 e revisão persistida intacta; linhas de autorização/ownership.
  - **Critério de aceite:** revisão funcional independente concluída, sem declarar Cloudinary real homologado pelo fake.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** CHANGES_REQUESTED persiste até novo parecer; asset alheio/atual elegível para delete impede G1.

- [ ] **EST-007 — Revisar auditoria, pacote e revisão independente (#5/#6/#7)**
  - **Objetivo:** aceitar documentação/evidências sem apagar falhas históricas.
  - **Pré-requisitos/dependências:** EST-006.
  - **Responsável:** revisores e Git/GitHub.
  - **Procedimento:** revisar cada diff e registro datado nos três PRs; confrontar prontidão com comentários históricos; conferir patch99d8363 já ancestral da RC e diff restante #7 documental; preservar sua revisão independente.
  - **Entregáveis:** três pareceres, lista de erratas/ressalvas e ações de re-review.
  - **Evidências:** links dos relatos originais, correções posteriores, runs e comparação Git.
  - **Critério de aceite:** nenhum FAIL reclassificado retroativamente e nenhuma dependência aplicada duas vezes.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** CHANGES_REQUESTED em #6 ou falta de parecer #7 impede G1.

- [ ] **EST-008 — Revisar segurança, concorrência e migrations em conjunto**
  - **Objetivo:** detectar riscos que atravessam a pilha.
  - **Pré-requisitos/dependências:** EST-004–007.
  - **Responsável:** revisores e banco.
  - **Procedimento:** usar seções de segurança do checklist; verificar conta/vínculo/lab atuais, OWNER/ADMIN/MEMBER, CSRF/origin, DTOs/cache, idempotência e revogação durante I/O; ler as duas migrations aditivas e FKs/locks/rollback.
  - **Entregáveis:** matriz de autorização/concorrência e parecer SQL.
  - **Evidências:** testes negativos existentes, constraints e invariantes transacionais apontados por linha.
  - **Critério de aceite:** integridade dos dados e ausência de acesso cruzado demonstradas no recorte; 12 SQL antigos intactos.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** exposição, bypass ou perda de dados bloqueia aceite técnico até correção.

- [ ] **EST-009 — Conferir regressão e investigar intermitências**
  - **Objetivo:** avaliar CI/local e as falhas de contas, IHFR e conexões.
  - **Pré-requisitos/dependências:** EST-008.
  - **Responsável:** testes/homologação e revisores.
  - **Procedimento:** seguir runbook CI e follow-up: examinar timeout de navegação de contas no #5, locator/DOM duplicado em IHFR no #7 e ECONNRESET histórico em admin-read; reproduzir em cluster próprio quando material, preservando guards/asserts/timeouts e primeiro FAIL.
  - **Entregáveis:** matriz dos 15 gates por SHA/ambiente e classificação de cada intermitência.
  - **Evidências:** run/attempt, UTC, logs redigidos, resultado original e rerun separado; arquivos de follow-up no PR #7.
  - **Critério de aceite:** PASS atual sustentado; causa inconclusiva explicitada e impacto/monitoramento aceitos pelos revisores.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** falha recorrente sem avaliação impede G1; repetição verde não prova causa histórica.

- [ ] **EST-010 — Avaliar dependências e risco residual**
  - **Objetivo:** decidir tratamento dos cinco achados high na cadeia de desenvolvimento.
  - **Pré-requisitos/dependências:** EST-009.
  - **Responsável:** revisores; aprovador decide aceitação residual.
  - **Procedimento:** comparar audits versionados com npm audit e npm audit --omit=dev no lockfile atual; identificar cadeia, uso em build/CI e patch disponível; propor remediação focal ou aceite com prazo, sem npm audit fix --force.
  - **Entregáveis:** análise de exposição e decisão registrada por autoridade, com owner/prazo.
  - **Evidências:** audit redigido, SHA/lockfile e justificativa; baseline reporta dev5 high/prod0, não promessa permanente.
  - **Critério de aceite:** risco residual tratado/aceito explicitamente; nova vulnerabilidade de runtime avaliada antes de G1.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** risco material não aceito bloqueia integração; correção funcional segue Spec Kit.

- [ ] **EST-011 — Encerrar revisão humana e registrar G1**
  - **Objetivo:** liberar integração somente do candidato revisado.
  - **Pré-requisitos/dependências:** EST-003–010.
  - **Responsável:** revisores independentes e coordenador.
  - **Procedimento:** registrar achados no PR/issue com ID, SHA, arquivo/linha, severidade, passos, esperado/obtido e aceite; correções exigem spec/plan/tasks antes do código, novo diff e re-review. Solicitar aos revisores #4/#6 novo parecer e resolução explícita da thread quando aceito.
  - **Entregáveis:** parecer por cada um dos sete PRs e registro G1.
  - **Evidências:** reviews APPROVED no head aplicável ou aceite formal equivalente conforme política dos mantenedores, sem CHANGES_REQUESTED pendente; decisões de risco e links dos achados.
  - **Critério de aceite:** G1 assinado após revisões independentes; nenhum achado bloqueante aberto, sem auto-merge e sem aprovar pelo autor.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** CI verde, mergeable=true e thread outdated não substituem revisores.

## Fase 2 — Integração controlada do código

Entrada: G1. Saída: G2. A cadeia é **#1→#2→#3→#4→#5→#6→#7**.
Não integrar um PR dependente em sua base de revisão; retargetar para development
após confirmar o merge anterior. Não apagar branches-base durante a sequência.

- [ ] **EST-012 — Preparar integração, gatilhos e sincronização de #7**
  - **Objetivo:** impedir publicação acidental e congelar heads revisados.
  - **Pré-requisitos/dependências:** EST-011; permissão de integração concedida aos operadores.
  - **Responsável:** Git/GitHub e Vercel.
  - **Procedimento:** reconferir repo conectado, branches que disparam deploy e isolamento de development/Preview antes de qualquer merge; usar guia de integração. Sincronizar o avanço documental da RC em #7 por merge commit da base no head protegido, conferir diff e novos checks/re-review.
  - **Entregáveis:** autorização da integração, mapa mínimo de triggers e SHA final de cada PR.
  - **Evidências:** config/consulta sem secrets, comparação antes/depois #7 e ancestry de 99d8363 original.
  - **Critério de aceite:** integração não aciona atualização produtiva nem Preview com dados produtivos; #7 preserva apenas sua etapa adicional e todos os SHAs.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** se development aciona deploy inseguro, parar e obter controle explícito do gatilho antes do merge; branch nova precisa bloquear deployment antes do push.

- [ ] **EST-013 — Integrar os sete PRs com merge commits**
  - **Objetivo:** preservar histórico e incorporar apenas diffs aprovados.
  - **Pré-requisitos/dependências:** EST-012; G1 atualizado para qualquer novo head.
  - **Responsável:** Git/GitHub; revisores conferem cada retarget.
  - **Procedimento:** executar sequência do guia: #1 em development; confirmar merge, mudar base de #2 para development, conferir Files changed/commits/ancestry e integrar; repetir até #7. Em conflito, preservar evidências e revisar resolução; não usar squash/rebase/cherry-pick/force nem ours/theirs global.
  - **Entregáveis:** tabela PR/base/head/merge-SHA e HEAD integrado de development.
  - **Evidências:** URLs de merge e diffs após cada retarget; 11 commits originais e 99d8363 encontrados como ancestrais.
  - **Critério de aceite:** só merges aprovados, nenhuma duplicação de patch e main preservada até a janela autorizada.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** política do destino exigir squash, diff cumulativo inesperado ou alteração não revisada exige decisão/revisão antes de prosseguir.

- [ ] **EST-014 — Validar o SHA integrado e registrar G2**
  - **Objetivo:** comprovar o artefato que seguirá para homologação.
  - **Pré-requisitos/dependências:** EST-013.
  - **Responsável:** testes/homologação e Git/GitHub.
  - **Procedimento:** checkout isolado destacado no SHA integrado; Node24.19.0, npm ci/lockfile, Prisma generate e Chromium; executar scripts/rc-review-validation.ps1 com cluster sintético próprio em Windows, serialmente, conforme runbook CI. Não usar -InitializeCiCluster fora de Actions. Conferir diff/manifesto funcional e SQL; repetir gates se houver correção.
  - **Entregáveis:** registro dos 15 gates no SHA integrado, manifesto e G2.
  - **Evidências:** SHA completo, UTC, comandos/exit codes/logs redigidos, schema audit/teardown e estado inicial/final do cluster.
  - **Critério de aceite:** validação completa do integrado aprovada; R1 não somado como casos novos. Workflow atual não dispara em development/main e dispatch nelas é recusado; usar evidência local exata, sem herdar SUCCESS da RC.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** falha interrompe gates seguintes; adaptação de CI exige entrega revisada, não renomear branch/push de validação para contornar guards.

## Fase 3 — Identificação dos serviços existentes

Entrada: G2 e acesso somente leitura autorizado; a inspeção mínima de triggers
ocorre antes de G2 pela EST-012. Saída: G3, com os cinco inventários conferidos
pelo coordenador e segundo operador. Usar o
[runbook produtivo](production-update-runbook.md); nomes históricos não bastam.
Reutilizar recursos existentes; contratar ou criar recursos requer decisão própria.

- [ ] **EST-015 — Confirmar Vercel, Git, domínio e versão publicada**
  - **Objetivo:** identificar exatamente a aplicação em funcionamento.
  - **Pré-requisitos/dependências:** EST-014; acesso somente leitura ao projeto autorizado.
  - **Responsável:** Vercel e Git/GitHub.
  - **Procedimento:** conferir equipe/projeto, Settings→Git, repo, branch produtiva, root, Node/build/install, targets, hooks/integradores, domínio/alias e deployment atendendo tráfego; registrar versão/SHA anterior e proteção das branches de revisão.
  - **Entregáveis:** mapa do projeto existente e de triggers/promotions/recuperação.
  - **Evidências:** painel/API redigido e deployment/SHA/UTC, conferidos por segundo operador.
  - **Critério de aceite:** repo/branch/domínio/deployment reconciliados; homologação de contas não confundida com produção pelo nome do target.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** divergência entre domínio e projeto ou vínculo Git não confirmado impede promoção.

- [ ] **EST-016 — Confirmar Neon/PostgreSQL e recuperação existente**
  - **Objetivo:** identificar o banco efetivamente usado pela aplicação.
  - **Pré-requisitos/dependências:** EST-015; acesso de leitura autorizado.
  - **Responsável:** banco; Vercel acompanha vínculo da aplicação.
  - **Procedimento:** inventariar organização/projeto/branch/database/role/schema/endpoint direto e pooler, região/versão/extensões/privilégios, limites do plano, backups/PITR/retention e monitoramento existente; confirmar vínculo sem revelar URLs ou senhas.
  - **Entregáveis:** inventário privado de identidades e resumo público com fingerprint/referência opaca.
  - **Evidências:** painel/API e leitura de identidade do banco; conferência por dois operadores.
  - **Critério de aceite:** destino produtivo distinto do isolado e método real de recuperação confirmado, sem presumir recursos/gratuidade.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** identidade incerta, role inadequada ou retenção desconhecida impede backup/migration.

- [ ] **EST-017 — Inventariar variáveis e credenciais por ambiente**
  - **Objetivo:** preparar comparação segura da configuração atual com a RC.
  - **Pré-requisitos/dependências:** EST-015–016.
  - **Responsável:** Vercel; banco, SMTP e Cloudinary validam seus grupos.
  - **Procedimento:** comparar apenas nomes/presença/escopo/finalidade/versão no secret store com tabela do runbook produtivo e exemplos; preservar JWT, keyrings/provas/cifra antigos e APP_PUBLIC_URL por ambiente. Confirmar ACCOUNT_TRUSTED_INGRESS e ausência de env dos harnesses na produção.
  - **Entregáveis:** matriz de presença/compatibilidade e mudanças futuras propostas com owner/aprovação.
  - **Evidências:** checklist redigido, sem exportação de valores; lista de diferenças por target.
  - **Critério de aceite:** nenhum segredo público/NEXT_PUBLIC e nenhum valor de homologação copiado automaticamente para produção.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** chave antiga perdida pode impedir decifra/consumo; não rotacionar por suposição nem registrar valores no Git.

- [ ] **EST-018 — Inventariar SMTP, fila e todos os agendadores**
  - **Objetivo:** esclarecer como mensagens e jobs rodam continuamente hoje.
  - **Pré-requisitos/dependências:** EST-017.
  - **Responsável:** SMTP/agendamento e coordenador.
  - **Procedimento:** usar runbooks contas/mail; identificar caixa/remetente autorizado, método Gmail SMTP/senha de app, elegibilidade e TLS sem coletar valores; mapear scheduler, URL/target, header via secret store, frequência/timeout, owner, últimas execuções, fila/alertas e outros jobs existentes. Designar PD-CRI-004.
  - **Entregáveis:** inventário de schedulers e plano de operação mail aprovado pela equipe.
  - **Evidências:** horários/status/contagens redigidos; histórico60s da homologação identificado como histórico, sem atestar produção.
  - **Critério de aceite:** destino/cadência dentro da validade das provas e plano/custo real conhecidos; execução automática será comprovada na EST-028.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** terminal aberto/setInterval ou envio manual não substitui scheduler; SMTP aceito não prova recebimento.

- [ ] **EST-019 — Inventariar Cloudinary, custos e observabilidade; registrar G3**
  - **Objetivo:** identificar recursos existentes e sua viabilidade operacional.
  - **Pré-requisitos/dependências:** EST-015–018.
  - **Responsável:** Cloudinary, coordenador e operadores.
  - **Procedimento:** consultar cloud/conta/preset assinado atual, plano/limites/créditos/permissões/ativos próprios e jobs; inventariar logs, alertas, métricas, backup de configuração/referências de ativos e canal de incidentes. Confirmar segundo operador e registrar G3, inclusive lacunas de capas se recorte parcial proposto.
  - **Entregáveis:** mapa completo aplicação→serviços e orçamento/limiares propostos.
  - **Evidências:** consultas somente leitura redigidas e aceites dos owners, sem API secret nem URLs delivery.
  - **Critério de aceite:** G3 confirma recursos do recorte; falta de Cloudinary impede ativação, mas pode fundamentar decisão parcial futura na EST-034/035.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** não contratar, criar preset/projeto, ativar cobrança ou excluir ativos como parte do inventário.

## Fase 4 — Backup, migrations e recuperação

Entrada: G3 e autorização específica de leitura, backup, restore e ensaio para
seus destinos. Saída: G4. Seguir o [runbook de migrations](migration-runbook.md),
que é a autoridade do procedimento técnico; o plano coordena sua execução.

Há **14 migrations versionadas**, sendo duas introduzidas pela RC:
`20261010000100_environmental_drafts` e `20261010000200_area_covers`.
Isso não prova que duas, ou todas as 14, estejam pendentes no banco real.
`migrate deploy` aplica a cadeia inteira pendente; inventariar antes.

Proibidos: `migrate dev/reset`, `db push`, `--accept-data-loss`, bootstrap/seed
no banco existente, deletes/truncates/destruição genérica, alteração de SQL
histórico/checksums e testes sintéticos contra produção. Não usar `migrate resolve`
para simular execução: exceções formais de recuperação do runbook exigem efeito
físico comprovado e aprovação do owner; jamais uma correção artificial de histórico.

- [ ] **EST-020 — Inventariar migrations aplicadas, pendências e drift**
  - **Objetivo:** determinar a mudança real necessária no banco hospedado.
  - **Pré-requisitos/dependências:** EST-019 e alvo confirmado na EST-016.
  - **Responsável:** banco; revisor SQL independente confere.
  - **Procedimento:** executar preflight somente leitura do runbook: _prisma_migrations, checksums/failed/rolled-back, migrate status, catálogo/índices/FKs/enums e contagens agregadas; comparar SQL Git/bytes efetivos LF/CRLF. Identificar colisões de email se houver migrations anteriores pendentes, sem listar PII.
  - **Entregáveis:** tabela applied/pending/failed/extra e relatório de divergências de schema/checksum.
  - **Evidências:** SHA/candidato/UTC/fingerprint e consultas/status redigidos com exit codes interpretados.
  - **Critério de aceite:** pending exatas conhecidas e todo SQL extra revisado; nenhum drift ou checksum divergente sem tratamento aprovado.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** histórico ausente/failed, objetos inesperados ou colisões exigem análise/decisão; não resolver alterando dados/histórico para fechar gate.

- [ ] **EST-021 — Gerar backup autorizado e preservar recuperação**
  - **Objetivo:** obter cópia verificável anterior à atualização.
  - **Pré-requisitos/dependências:** EST-020; autorização de backup/dados e destino privado.
  - **Responsável:** banco e aprovador dos dados.
  - **Procedimento:** seguir backup do runbook com ferramenta compatível, incluindo histórico/tabelas/constraints; conferir backup/PITR efetivo e armazenar com ACL/cifra/retention fora de Git/sync público. Preservar configuração, chaves necessárias e referências de ativos privadamente.
  - **Entregáveis:** backup identificável e inventário de recuperação/retention.
  - **Evidências:** exit code, hash/listagem, horário e referência privada; dump não inclui mídia Cloudinary ou secret store.
  - **Critério de aceite:** artefato íntegro e recuperável para o ensaio; aprovação definitiva só após restore.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** dump contém PII/ciphertext; falha/inventário incompleto impede EST-022.

- [ ] **EST-022 — Restaurar backup em destino isolado autorizado**
  - **Objetivo:** provar restauração antes de confiar no backup.
  - **Pré-requisitos/dependências:** EST-021; alvo isolado vazio/autorizado e endpoint conferido por dois operadores.
  - **Responsável:** banco e testes/homologação.
  - **Procedimento:** restaurar conforme runbook; sem --clean no banco existente. Conferir schema/histórico/contagens, role/ACL separadamente, isolamento e ausência de schedulers/SMTP/uploads produtivos; dados reais restaurados ficam privados, sem virar fixtures públicas.
  - **Entregáveis:** relatório de restore com duração e comparação.
  - **Evidências:** identidade/fingerprint do destino, exit codes, catálogo/contagens e permissões, sem payload/PII.
  - **Critério de aceite:** restore real PASS e dados/estrutura conferidos; hash/listagem sozinhos não fecham tarefa.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** identidade ambígua, restore parcial ou provedor produtivo acessível bloqueia ensaio.

- [ ] **EST-023 — Ensaiar pendências e compatibilidade antiga/nova**
  - **Objetivo:** prever locks, duração e riscos da atualização/retorno.
  - **Pré-requisitos/dependências:** EST-022 e SQL pendente revisado.
  - **Responsável:** banco, Vercel e testes/homologação.
  - **Procedimento:** aplicar apenas a cadeia real pendente no clone com env privado e candidato exato; medir locks/tempo, conferir constraints/contagens/histórico; exercitar artefato antigo e novo com dados anonimizados/sintéticos autorizados, inclusive após existir draft/capa. Serviços externos continuam isolados/desligados.
  - **Entregáveis:** ensaio de migration e matriz de compatibilidade/limitações.
  - **Evidências:** logs redigidos, antes/depois agregado, SHA antigo/novo, tempos e casos de retorno.
  - **Critério de aceite:** cadeia integral PASS e ações incompatíveis identificadas; FK RESTRICT pode impedir exclusão de conta pelo código antigo, sem presumir rollback universal.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** migrations sem transação explícita podem deixar DDL parcial; não assumir atomicidade nem remover tabela como rollback.

- [ ] **EST-024 — Ensaiar recuperação e aprovar RPO/RTO**
  - **Objetivo:** definir retorno seguro para falha de migration/aplicação.
  - **Pré-requisitos/dependências:** EST-023.
  - **Responsável:** banco e Vercel; aprovador decide perda tolerável.
  - **Procedimento:** seguir recuperação dos dois runbooks; ensaiar contenção, rollback compatível e alternativa roll-forward; definir RPO/RTO com owner, considerar dados após backup e efeitos SMTP/Cloudinary irreversíveis pelo restore SQL; registrar quem decide e para quando.
  - **Entregáveis:** plano de recuperação, contatos, limiares e tempos ensaiados.
  - **Evidências:** ensaio isolado, deployment anterior recuperável e aceite de RPO/RTO.
  - **Critério de aceite:** recuperação compatível com política de contas, schema/jobs e dados novos; restore destrutivo não é procedimento genérico autorizado.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** versão antiga que restaura bypass de verificação/revogação é proibida; incompatibilidade sem alternativa impede janela.

- [ ] **EST-025 — Consolidar prontidão de banco e registrar G4**
  - **Objetivo:** entregar plano de janela executável ao aprovador.
  - **Pré-requisitos/dependências:** EST-020–024.
  - **Responsável:** coordenador, banco e Vercel.
  - **Procedimento:** registrar sequência backup final→migrations→verificação→deploy→smoke→reabertura; definir janela, operadores/substitutos, congelamento de escrita/workers, comunicação, duração máxima de locks e critérios de parada/recuperação.
  - **Entregáveis:** registro G4 e proposta de janela, sem executar produção.
  - **Evidências:** restore/ensaio aceitos, pending exatas, compatibilidade e recuperação revisadas.
  - **Critério de aceite:** G4 assinado pelos owners; qualquer limite numérico de parada definido pela equipe antes da janela.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** falta de backup restaurado, owner ou critério de parada impede GO.

## Fase 5 — Homologação das funcionalidades

Entrada: G2/G3/G4 e autorização própria do candidato/ambiente/caixas/ativos.
Saída: G5 na EST-034. Usar ambiente autorizado e isolado; reutilizar a homologação
existente apenas depois de confirmar permissão e compatibilidade. Publicar ali um
candidato atualizado é ação futura dos estudantes, com gate próprio, nunca prova
de atualização do produto em produção.

Manter três colunas distintas: **automatizado local/CI**, **provedor real** e
**aceite humano**. Resultado parcial não fecha a coluna ausente. A matriz deve
registrar browser/versão/dispositivo/teclado, candidato, resultado e limitação.

- [ ] **EST-026 — Preparar o candidato isolado para aceite**
  - **Objetivo:** testar exatamente a versão integrada em alvos autorizados.
  - **Pré-requisitos/dependências:** EST-014, EST-019 e EST-025; autorização de deployment/configuração da homologação e dados de teste.
  - **Responsável:** testes/homologação, Vercel e banco.
  - **Procedimento:** confirmar projeto existente de homologação, banco próprio, origem HTTPS, ingress/allowlist, migrations e env; publicar SHA integrado pelo fluxo autorizado sem tocar produção; confirmar isolamento de caixa/schedulers/cloud e limpeza exclusiva dos dados de teste próprios.
  - **Entregáveis:** candidato/deployment isolado, matriz de cenários e autorização dos participantes/caixas.
  - **Evidências:** SHA/fingerprint/URL não secreta, configuração por presença e gate de entrada assinado.
  - **Critério de aceite:** alvo/candidato conferidos por segundo operador; nenhuma conta real/dado produtivo usado como descartável.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** aprovação antiga da homologação não autoriza mudanças atuais; reprodução local fake não substitui o candidato real autorizado.

- [ ] **EST-027 — Homologar cadastro, verificação, login e logout**
  - **Objetivo:** comprovar jornada de conta com recebimento efetivo.
  - **Pré-requisitos/dependências:** EST-026 e SMTP/scheduler do ambiente aprovados.
  - **Responsável:** testes/homologação e SMTP/agendamento; testador humano autorizado.
  - **Procedimento:** seguir contas/mail: visitante cadastra conta sintética autorizada, observa chegada real do código na caixa, verifica, acessa o que sua sessão permite, faz logout/login; confirmar restrição pré-verificação e recusa de estados indevidos.
  - **Entregáveis:** matriz da jornada com registro humano de recebimento e uso.
  - **Evidências:** timestamps/estados redigidos e confirmação do testador, sem código/senha/screenshot de inbox com PII.
  - **Critério de aceite:** cadastro→recebimento→verificação→login/logout comprovados no candidato, separando aceitação SMTP e observação humana.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** prova extraída do banco ou envio manual não substitui entrega automática.

- [ ] **EST-028 — Homologar reenvio, reset e revogação; fechar Gate B012**
  - **Objetivo:** concluir T025/T028 e validar operação mail contínua.
  - **Pré-requisitos/dependências:** EST-027.
  - **Responsável:** testes/homologação e SMTP/agendamento; testador humano.
  - **Procedimento:** após cooldown, reenviar e demonstrar código anterior recusado/novo aceito. Manter sessão A; solicitar reset em B/outro contexto, receber link real, consumir uma vez, trocar senha, negar sessão A/senha antiga e aceitar nova; observar aviso. Demonstrar duas invocações automáticas distintas e recuperação de backlog/interrupção no alvo isolado, considerando timeout30s versus runtime60s.
  - **Entregáveis:** aceite explícito Gate B012/T025/T028 e registro de operação do scheduler.
  - **Evidências:** confirmação humana de recebimento/jornada, HTTP/estados/horários redigidos, histórico automático e duração/backlog, sem link/token.
  - **Critério de aceite:** invalidação, consumo único e revogação observados; atraso/cadência/retry dentro da validade e PD-CRI-004 com owner.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** relato histórico de recuperação divergiu dos logs; fechar somente com novas evidências pertinentes. Timeout do scheduler não prova ausência de aceitação SMTP.

- [ ] **EST-029 — Homologar exclusão de conta sintética autorizada**
  - **Objetivo:** obter o aceite humano013 sem atingir contas reais ou ciência.
  - **Pré-requisitos/dependências:** EST-028; autorização da conta descartável/removível.
  - **Responsável:** testes/homologação e revisores; testador humano.
  - **Procedimento:** seguir checklist/spec013: cancelar, fornecer senha incorreta, verificar blockers com dados próprios isolados, concluir somente exclusão permitida com senha correta e testar revogação. Conferir drafts pessoais removidos, drafts alheios/dados científicos/capas de área preservados.
  - **Entregáveis:** aceite humano013 e inventário redigido dos efeitos.
  - **Evidências:** passos/status/contagens e confirmação humana, confrontados com testes automatizados dedicados.
  - **Critério de aceite:** blockers/cancelamento/revogação/limpeza pessoal corretos e nenhuma exclusão de conta real.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** automatizado3/3 não fecha aceite; não apagar dependências científicas para tornar conta removível.

- [ ] **EST-030 — Homologar rascunhos, conflitos e conexão lenta**
  - **Objetivo:** validar edição parcial e recuperação nos browsers alvo.
  - **Pré-requisitos/dependências:** EST-029; coleta confirmada de teste própria no ambiente isolado.
  - **Responsável:** testes/homologação e revisores.
  - **Procedimento:** seguir runbook015/hydration-evidence: salvar parcial com false,0,texto em edição,vazio explícito,campo omitido e ausência; recuperar após reload; editar em duas abas, rejeitar conflito sem perder local; interromper/repetir request com mesma key; atrasar scripts e conferir primeiro PUT/GET/reload; cancelar/confirmar descarte e confirmar medições, inclusive rollback.
  - **Entregáveis:** matriz dos cenários por browser/dispositivo e limites do aviso de saída.
  - **Evidências:** payloads sintéticos redigidos, revisões/status, primeiro save e retomada; aceite humano de uso/teclado/mobile.
  - **Critério de aceite:** edição/persistência corretas, consumo apenas do próprio draft e dados confirmados intactos; sem promessa de beforeunload universal.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** perda de edição ou semântica false/0/ausência bloqueia G5; não afrouxar parser científico nem aumentar timeout como correção presumida.

- [ ] **EST-031 — Homologar Cloudinary real, privacidade e recuperação**
  - **Objetivo:** validar a capa final com o provedor real antes de ativá-la.
  - **Pré-requisitos/dependências:** EST-030; destino/cloud/preset/credenciais e smoke isolado explicitamente autorizados, se capas incluídas no recorte.
  - **Responsável:** Cloudinary, testes/homologação e revisores.
  - **Procedimento:** seguir runbook016: configuração server-side segura, preset assinado versionado/revisado/frozen e hash; upload sintético próprio, staging/final authenticated, final sem EXIF/ICC/XMP/IPTC, delivery público recusado, proxy/headers; OWNER/ADMIN/MEMBER/externo e revogação; substituição, erro preservando antiga, perda de resposta/replay e remoção autorizada.
  - **Entregáveis:** relatório do smoke real, configuração por presença e aceite de permissões/privacidade.
  - **Evidências:** metadados sanitizados da imagem final, resultados negativos de leitura/escrita, revisões e custos/créditos, sem credenciais/URLs assinadas.
  - **Critério de aceite:** provedor real e aceites humanos comprovados; EXIF apenas no staging privado não deve ser confundido com imagem final entregue.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** cloud/preset/segredo incerto, leitura pública ou operação sem autorização impede habilitar; rollout parcial conserva tarefa PENDENTE fora do recorte aprovado.

- [ ] **EST-032 — Homologar cleanup próprio e operação de capas**
  - **Objetivo:** comprovar limpeza restrita, recuperação tardia e sustentabilidade.
  - **Pré-requisitos/dependências:** EST-031; autorização específica de execução/remoção dos ativos próprios de teste.
  - **Responsável:** Cloudinary/limpeza; aprovador confirma PD-CRI-010.
  - **Procedimento:** seguir cleanup016: começar dry-run, revisar identities/leases/refs, executar somente por asset_ids próprios comprovados; testar imagem/raw, uploads tardios e RECONCILE/BLOCKED; provar preservação do ativo corrente/alheio. Definir operador/substituto/scheduler/cadência, orçamento/limiares e alertas, observando execuções contínuas.
  - **Entregáveis:** aceite real de cleanup e decisão de operação/créditos PD-CRI-010.
  - **Evidências:** contagens/horários/créditos antes/depois e jobs reconciliados, sem IDs sensíveis desnecessários.
  - **Critério de aceite:** nenhuma remoção por prefix/tag/all; ownership imutável comprovado e execução contínua com owner antes de ativar capas.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** eligible no dry-run não autoriza delete; TTL10min não revoga assinatura1h e rotina parada não garante limpeza/custo zero. Parcial mantém pendência aberta.

- [ ] **EST-033 — Homologar jornada completa e plataformas alvo**
  - **Objetivo:** comprovar uso integrado do produto disponível.
  - **Pré-requisitos/dependências:** EST-027–030; EST-031/032 se capas forem incluídas, ou recorte parcial proposto ao aprovador.
  - **Responsável:** testes/homologação e testadores humanos.
  - **Procedimento:** cadastro→criação/acesso autorizado a laboratório→área→upload/capa ou fallback aprovado→coleta→draft→confirmação→consulta/histórico→mapas/informações disponíveis; testar mobile, navegadores/versões escolhidos pela equipe, teclado/foco e revogação. Acesso por vínculo atual; não pressupor fluxo de ingresso por código ainda indisponível.
  - **Entregáveis:** matriz da jornada por plataforma, limitações e feedback humano.
  - **Evidências:** resultados/reproduções redigidos e aceites; IHFR identificado como experimental, mapa sem capacidades futuras presumidas.
  - **Critério de aceite:** jornada do recorte concluída sem perda/bypass; diferenças de browsers aceitas ou corrigidas com planejamento prévio.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** 70 E2E em Chromium não provam Safari/Firefox/mobile nem validam ciência; regressão material bloqueia G5.

- [ ] **EST-034 — Consolidar aceites e recorte; registrar G5**
  - **Objetivo:** decidir se o candidato pode ser proposto para produção.
  - **Pré-requisitos/dependências:** EST-026–030 e EST-033; EST-031/032 para rollout completo.
  - **Responsável:** coordenador e testes/homologação; aprovador decide recorte.
  - **Procedimento:** consolidar três tipos de prova por funcionalidade; aprovar browsers/limites e tratar achados. Se Cloudinary não pronto, solicitar decisão explícita de publicação parcial com CLOUDINARY_IMAGE_ENABLED=0, fallback homologado e ausência de uploads; registrar owner/prazo para retomada de capas.
  - **Entregáveis:** G5 do recorte exato, lista de pendências e decisão completo/parcial.
  - **Evidências:** aceites humanos/Gate B012/013, provider real dos fluxos ativos e decisão com autoridade/data/origem.
  - **Critério de aceite:** nenhum gate obrigatório de fluxo ativo aberto; parcial não declara016 homologada nem dispensa mail/contas/backup/ensaio.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** sem decisão parcial, ausência de Cloudinary bloqueia rollout completo; aceite técnico não altera estado científico IHFR.

## Fase 6 — Atualização da produção existente

Entrada: G1–G5, recursos confirmados e **GO explícito para a janela**, com
autorizações separadas de banco, deploy, configuração e reabertura. Saída: G6.
Seguir [produção](production-update-runbook.md) e [migrations](migration-runbook.md).
Esta seção orienta os estudantes; nenhuma operação aqui foi executada pelo agente.

### Registro de GO/NO-GO a preencher

| Item obrigatório | Evidência/decisão |
|---|---|
| Aprovador e autoridade designada; operadores/substitutos presentes | ______ |
| SHA integrado validado, SHA de promoção e artefato/deployment candidato | ______ |
| PRs/achados/riscos dev/intermitências aceitos | ______ |
| Recorte completo ou parcial; estado real de cada feature/gate | ______ |
| Vercel/repo/branch/root/domínio/banco confirmados por dois operadores | ______ |
| Configuração mínima e schedulers/monitoramento/owners prontos | ______ |
| Backup restaurado/ensaio, pending SQL, compatibilidade, RPO/RTO | ______ |
| Janela/início/fim, congelamento, lock máximo e critérios de parada | ______ |
| Deployment anterior/recuperação/roll-forward e comunicação | ______ |
| GO ou NO-GO, data/hora UTC, origem da aprovação e condições | ______ |

NO-GO se faltar um requisito material ao recorte, houver alvo incerto, falha sem
tratamento aceito, backup não restaurado, risco de perda/exposição ou operador
ausente. Qualquer mudança de candidato após aceite exige novo diff e validação
proporcional; registrar qual SHA foi homologado e qual será realmente servido.

- [ ] **EST-035 — Aprovar GO/NO-GO e janela**
  - **Objetivo:** autorizar atualização somente com pré-requisitos demonstrados.
  - **Pré-requisitos/dependências:** EST-011, EST-014, EST-019, EST-025 e EST-034.
  - **Responsável:** aprovador da produção; coordenador reúne owners.
  - **Procedimento:** preencher tabela, revisar triggers e plano de promoção/recuperação; confirmar custos/riscos e rollout parcial com flag0 se escolhido; conceder escopo explícito a cada operador e comunicar janela à equipe/usuários pelo canal autorizado.
  - **Entregáveis:** decisão GO/NO-GO, janela e autorizações rastreáveis.
  - **Evidências:** aprovações/UTC/origem e links G1–G5; operador confirma deployment anterior e alvo.
  - **Critério de aceite:** GO humano válido para SHA/recorte/janela concretos, sem auto-merge/promover por CI sozinho.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** NO-GO mantém produção existente; não ativar capas para fechar gate ficticiamente.

- [ ] **EST-036 — Congelar escrita, fazer backup final e aplicar migrations**
  - **Objetivo:** preparar schema real com recuperação pronta antes da versão nova.
  - **Pré-requisitos/dependências:** EST-035 GO vigente, owners presentes e autorizações de banco/backup.
  - **Responsável:** banco; Vercel/SMTP coordenam tráfego/workers.
  - **Procedimento:** pelo mecanismo existente aprovado, controlar mutações/workers; reconferir identidades/pending e backup final compatível com método restaurado; executar migrate status→migrate deploy→status conforme runbook, em um único processo/endpoint direto privado. Conferir constraints/checksums/contagens e aplicação anterior antes de liberar deploy.
  - **Entregáveis:** registro da janela, backup final e migrations realmente aplicadas.
  - **Evidências:** UTC/duração/exit codes redigidos, inventário pré/pós e contagens preservadas durante congelamento.
  - **Critério de aceite:** cadeia aprovada íntegra, sem pending/failed/drift não resolvido; 14 versionadas reconciliadas sem apagar linhas extras para forçar contagem.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** erro/lock além do limiar ou DDL parcial interrompe sequência; não deployar, não repetir cegamente e seguir recuperação aprovada.

- [ ] **EST-037 — Publicar o artefato aprovado no mesmo projeto Vercel**
  - **Objetivo:** atualizar a aplicação atendida pelo domínio existente.
  - **Pré-requisitos/dependências:** EST-036 aceita; autorização de promoção/deploy/configuração.
  - **Responsável:** Vercel e Git/GitHub; segundo operador confere.
  - **Procedimento:** seguir fluxo Git/CLI existente confirmado, usando projeto/equipe atuais e SHA aprovado; completar promoção development→main apenas dentro desta janela após migrations. Conferir diff/árvore do merge final e validar seu SHA em checkout isolado antes de atender tráfego se ainda não validado. Confirmar targets/env, READY, deployment/SHA/domínio e flag de recorte, antes de alias/reabertura.
  - **Entregáveis:** versão/SHA/deployment/URL produtivos e vínculo à aprovação.
  - **Evidências:** PR de promoção/commit, validação do artefato final, Vercel READY e conferência de destino por dois operadores.
  - **Critério de aceite:** projeto/banco/domínio existentes preservados e artefato validado servido; parcial mantém CLOUDINARY_IMAGE_ENABLED=0 e upload indisponível.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** main pode disparar deploy imediato: preparar/validar a árvore final antes de promover, ou usar controle de tráfego aprovado. Não executar CLI com defaults que criem/linkem outro projeto nem migrate deploy no build de cada Preview.

- [ ] **EST-038 — Conferir pós-deploy e gate de reabertura**
  - **Objetivo:** verificar versão, saúde e autorização no destino real.
  - **Pré-requisitos/dependências:** EST-037.
  - **Responsável:** testes/homologação, Vercel e banco.
  - **Procedimento:** usar seção pós-deploy do checklist: domínio/READY/SHA, headers/cache, login/logout com testador autorizado e leituras existentes de laboratórios/áreas/coletas/histórico/mapas, isolamento e filas/contagens; verificar fallback se parcial. Não rodar harness/fixtures/seed nem criar/excluir contas/medições/imagens sintéticas na produção; cenários de escrita e falha ficam na homologação isolada.
  - **Entregáveis:** smoke produtivo limitado e parecer de reabertura ou recuperação.
  - **Evidências:** checks de leitura/status/métricas agregadas e testemunho humano, sem PII; identidade do banco/candidato intacta.
  - **Critério de aceite:** checks essenciais e contagens aceitos, sem falha de segurança; recorte parcial identificado corretamente.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** divergência de SHA/alvo, erro de autenticação/integridade ou exposição exige manter contenção e acionar plano aprovado.

- [ ] **EST-039 — Reabrir, observar schedulers e registrar G6**
  - **Objetivo:** retomar serviço com operação verificável ou recuperar com controle.
  - **Pré-requisitos/dependências:** EST-038 aceita e autorização de reabertura.
  - **Responsável:** aprovador, coordenador e todos os operadores.
  - **Procedimento:** autorizar reabertura/retomada dos schedulers e observar execução automática/fila/latência/erros; usar limites definidos na EST-025/035. Em falha, conter mutações, preservar evidência e executar recuperação previamente aprovada; não apagar tabelas/jobs/ativos ou retornar política de contas insegura.
  - **Entregáveis:** G6, horários e decisão reabertura/recuperação com incidentes/pendências.
  - **Evidências:** primeiras execuções automáticas, métricas e aprovação humana; se recuperação, seu SHA/deployment/estado real.
  - **Critério de aceite:** serviço do recorte estável e recuperação disponível; nenhum BLOCKED sem owner nem fila fora da validade sem tratamento.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** rollback de aplicação mantém schema/jobs; restore pode perder escritas posteriores e exige RPO/reconciliação aprovados.

## Fase 7 — Acompanhamento e encerramento

Entrada: G6. Saída: G7. Período de observação, cadência de revisões e limiares
devem ser definidos pela equipe na janela; não inventar SLA ou prazo garantido.
Falhas continuam no histórico mesmo quando corrigidas.

- [ ] **EST-040 — Monitorar erros e desempenho após a atualização**
  - **Objetivo:** detectar regressões de uso, autorização e disponibilidade.
  - **Pré-requisitos/dependências:** EST-039.
  - **Responsável:** Vercel e testes/homologação; coordenador acompanha.
  - **Procedimento:** observar 5xx/401/403, latência/locks/banco, jornadas/relatos dos usuários e execução nos browsers alvo; comparar baseline e limiares/cadência/período acordados, tratando sinais de conta/IHFR/conexão sem atribuir causa não demonstrada.
  - **Entregáveis:** registro periódico de saúde/limitações e alertas com owner.
  - **Evidências:** métricas agregadas/UTC/SHA/deployment e achados redigidos.
  - **Critério de aceite:** período acordado concluído sem incidente material sem tratamento; IHFR continua experimental.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** reincidência de intermitência exige investigação com evidência; não silenciar erro para fechar período.

- [ ] **EST-041 — Acompanhar filas, agendadores, cleanup e créditos**
  - **Objetivo:** manter operação contínua dentro dos limites reais dos provedores.
  - **Pré-requisitos/dependências:** EST-039; EST-032 se capas ativadas.
  - **Responsável:** SMTP/agendamento e Cloudinary/limpeza, com substitutos.
  - **Procedimento:** seguir runbooks: idade/backlog/PENDING/PROCESSING/DEAD/EXPIRED/recoveredLeases, histórico/duração do scheduler; jobs PROCESSING/RECONCILE/BLOCKED, ativos próprios tardios e créditos/armazenamento/transformações; revisar orçamento/alertas e reconciliar só ownership comprovado. Se parcial, manter pendências e flag0 até nova homologação/GO.
  - **Entregáveis:** registro operacional contínuo e previsão de consumo/alertas.
  - **Evidências:** timestamps/contagens/créditos e execuções automáticas; sem recipient/payload/URLs/segredos.
  - **Critério de aceite:** owners/cadência comprovados, filas saudáveis e BLOCKED com tratamento humano; custo do plano conhecido.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** não alongar provas, truncar outbox, reabrir DEAD ou apagar assets em massa para esconder falha/custo.

- [ ] **EST-042 — Registrar incidentes e planejar correções no Spec Kit**
  - **Objetivo:** corrigir defeitos sem perder rastreabilidade ou alterar intenção silenciosamente.
  - **Pré-requisitos/dependências:** EST-039; achados de EST-040/041 ou da equipe.
  - **Responsável:** coordenador, autor designado e revisores independentes.
  - **Procedimento:** abrir issue com EST/cenário/SHA/severidade/impacto/evidência redigida; conter pelo plano aprovado. Antes de código, usar skills instaladas speckit-specify→clarify quando material→plan→tasks→implement, em specs/<feature>; consultar constituição/PRD, revisar PR e repetir gates afetados/GO se houver nova publicação. Consultar guides Next locais antes de alterar código Next.
  - **Entregáveis:** registro de incidentes; specs/plan/tasks e PRs de correção quando necessários, ou declaração de nenhum incidente observado.
  - **Evidências:** links da investigação/decisões/testes/reviews e versões antes/depois.
  - **Critério de aceite:** defeito resolvido com evidência ou pendência aceita com owner/prazo/impacto; causa desconhecida continua rotulada.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** decisão científica/domínio conflitante vira PENDENCIA_DE_DECISAO; não modificar fórmula para obter teste verde.

- [ ] **EST-043 — Atualizar documentação, relatório final e registrar G7**
  - **Objetivo:** encerrar a execução com a versão realmente publicada e pendências honestas.
  - **Pré-requisitos/dependências:** EST-040–042; período acordado concluído e incidentes avaliados.
  - **Responsável:** coordenador e testes/homologação; aprovador aceita encerramento.
  - **Procedimento:** atualizar este índice/checklists/runbooks afetados preservando histórico; produzir relatório no formato recomendado com versão/SHA/deployment/domínio/UTC, PRs/merges, migrations reais, backup/restore/recuperação, três colunas de prova, incidentes/custos/limites e responsáveis contínuos. Catalogar novos documentos no DOCUMENT_REGISTER e atualizar decisões/pendências canônicas apenas com escopo autorizado e confirmação identificada.
  - **Entregáveis:** relatório final compartilhável, documentação/evidências atualizadas e G7.
  - **Evidências:** aprovação de encerramento, links válidos e conferência de secrets/diff/terminologia; referências privadas opacas para backups/configuração.
  - **Critério de aceite:** versão efetivamente atendida registrada, nenhum gate fictício, pendências parciais com owner/prazo e qualificação científica preservada.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** publicar plano/CI não encerra execução; funcionalidade desabilitada continua não homologada.

## Pendências que exigem decisão da equipe

| Decisão ou aceite | Quem decide | Onde acompanhar |
|---|---|---|
| Papéis/substitutos, autoridade e calendário | Responsável pelo projeto/coordenador | EST-001 |
| Re-review #4/#6/thread, sete pareceres e achados | Revisores independentes | EST-003–011 |
| Exposição dev e intermitências com causa inconclusiva | Revisores/aprovador | EST-009–010 |
| Repo/branches/triggers e sincronização documental de #7 | Git/GitHub e Vercel, com revisão | EST-012–015 |
| Banco real/pending/drift, backups, dados, RPO/RTO | Owner de banco/aprovador | EST-016, EST-020–025 |
| SMTP/scheduler contínuo PD-CRI-004 | Equipe/operador designado | EST-018, EST-028 |
| Preset, operador/créditos/cleanup PD-CRI-010 | Equipe/Cloudinary/aprovador | EST-019, EST-031–032 |
| Gate B012/aceite013/browsers/jornada | Testadores humanos e responsável pelo aceite | EST-027–034 |
| Rollout completo/parcial, janela, riscos e reabertura | Aprovador com owners | EST-034–039 |
| Validação/calibração científica IHFR | Autoridade científica designada | ADR-0001; não encerrada por este plano |

Limites desta publicação: quatro arquivos documentais no recorte de plano,
navegação/checklist e registro de execução do agente. Não modifica ciência,
funcionalidades, secrets, provedores ou branches principais. Catalogação no
registro canônico é indicada para EST-043; não altera esse caminho nesta entrega.

## Histórico deste plano e encerramento futuro

| Data | Estado | Evento/origem |
|---|---|---|
| 2026-10-13 | NAO_INICIADO | Plano criado a pedido do responsável pelo projeto; 43 tarefas PENDENTE; snapshot reconciliado antes de publicação |

Ao iniciar uma fase, registrar `EM_ANDAMENTO`; antes do aceite, usar
`AGUARDANDO_REVISAO`. Registrar bloqueio/impacto/tentativas/decisão necessária,
continuando partes independentes. Só marcar execução `CONCLUIDO` após G7;
publicação deste documento é entrega do agente, não conclusão dos estudantes.
Mudanças de recorte/candidato ou falhas acrescentam histórico, sem sobrescrever
evidência anterior. Arquivar apenas conforme PLANS.md e preservando referências.
