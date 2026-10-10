# Handoff da entrega local CRI — 2026-10-10

## Estado entregue e limites

EVIDENCIA_IMPLEMENTACAO: entrega local das specs014/015/016 concluída, com
decisões aprovadas pelo usuário documentadas. Contas/mail/012/013 já presentes
foram preservados e revalidados; nenhuma reimplementação desnecessária.
Estado global AGUARDANDO_REVISAO: Gate B012/T025/T028, aceite humano013,
operação Cloudinary/créditos continuam pendentes. Não arquivar o pacote nem
interpretar aprovação de escopo como autorização operacional remota.

[Matriz única](matriz-de-estado.md) contém as frentes e mapeamento CRI-T/PD-CRI;
[decisões](decisoes-e-pendencias.md) têm origem na conversa2026-10-10.
[Inventário de arquivos](arquivos-da-entrega.md) lista caminhos alterados.
Planos de feature permanecem nas specs; este handoff não é TASKS global.

Rascunhos pessoais por usuário/coleta confirmada: save explícito, retomada,
OCC/idempotência, descarte definitivo, sem expiração; confirmação consome
atomicamente e exclusão permitida remove só drafts pessoais. Ciência preservada.
[Operação/limites](../../../operations/environmental-drafts-runbook.md).
Histórico SPA só comprovado em Chromium com Navigation API cancelável; não
prometer interceptação equivalente em outros navegadores.

Capa privada única por área: OWNER/ADMIN contextual em lab ativo; JPEG/PNG/WebP
10MiB/4096 por lado, static only, decoder/EXIF, proxy sem URL CDN, revisão/lease,
preservação da antiga e cleanup por identidade imutável/contexto comprovado.
EXIF pode permanecer no staging privado até cleanup; a capa final é sanitizada.
[Runbook](../../../operations/area-covers-runbook.md) descreve assinatura1h versus
appTTL10min, preset congelado, quotas e tombstones sem purge. Dependência de Git
no encadeamento abaixo não é dependência funcional entre drafts e capas.

## Verificações desta execução

Ambiente próprio Windows/Git2.55/Node24.19/npm12/Pg17 loopback55427, fixtures
sintéticas. Sem credenciais copiadas/env real, SMTP externo ou upload/delete real.
Evidências técnicas UTC; data civil2026-10-10 em America/Fortaleza, UTC−03.
Snapshots anteriores não foram promovidos ao HEAD final.

| Comandos/cenários | Resultado local |
|---|---|
| npm run test:unit | 291 Node + 17 Mail PASS |
| npm run test:integration | 187 PASS |
| npm run test:migration / test:contract | 37 / 6 PASS |
| npm run test:e2e / test:e2e:https | 67 / 2 PASS |
| node --import=tsx scripts/account-deletion-e2e.ts | 3 PASS |
| npm run typecheck / lint / build | PASS; lint0erros/3warnings anteriores |
| imp006-clean-bootstrap.ts --with-versioned-baseline | 14 migrations PASS; DB próprio descartado |
| test:ihfr:audit:assert-zero | zero schemas candidatos |
| area-cover-preset.ts / area-cover-cleanup.ts dry-run | PASS; zero providerCalls; eligible0 |

R1 reexecuta 14 casos de Integration/Pg e 3 SMTP locais de Mail, sem soma dupla.
Errata da auditoria posterior de 2026-10-10: o texto original “R1 reexecuta os
17 Mail” confundia a composição; os 17 PASS históricos continuam registrados.
Focais são subconjuntos/repetições.
Regressão completa fingerprint `7f540ba4160402d710bbe164dbba630a41f80e58c267dc9a46820446e853b8ce`;
final `5f36eb7e02e465741c85e5b3706276d9d153417037dce1193f7b03510d6c286d` difere
somente pela assertion multiframe e exceção do exemplo env; implementação igual.
Focal2, CLI, exclusão3, typecheck/audit foram reexecutados no final. Comandos,
UTC/duração/exit code, ambiente, FAIL e PASS em [evidências016](../../../../specs/016-area-covers/implementation-evidence.md)
e [JSON](../../../../specs/016-area-covers/validation-evidence.json).
[Evidências014](../../../../specs/014-account-test-runners/implementation-evidence.md) e
[015](../../../../specs/015-environmental-drafts/implementation-evidence.md) preservam
baseline, RED e correções intermediárias. Revisões independentes somente leitura
/root/draft_research e /root/image_research ocorreram; achados materiais resolvidos.
Convergência: 014quatroFR/seis tarefas, 015noveFR/18tarefas, 016noveFR/20tarefas.
Não configura auditoria WCAG universal nem validação humana/científica.

Revisão final da série: 180 links relativos adicionados conferidos, nenhum alvo
ausente; git diff --check BASE aprovado. Diff staged, escopo, contratos, segredos
e preservação de políticas/raw revisados; exemplo do provedor sem credenciais.

## Série real de commits locais

| SHA | Branch | Mensagem/finalidade | Verificação correspondente |
|---|---|---|---|
| `c59a7b6eb1198e20535356934805f0b93d2e99c2` | `docs/reconciliacao-cri-20261010` | docs(plans): reconcilia contas e registra evolução autorizada | G0/G1/G2 documental; matriz/baseline por snapshot |
| `6bf9f2ba94698516282e482b690fbe5d812088f5` | `014-account-test-runners` | docs(specs): planeja correção dos runners de contas | análise spec/plan/tasks anterior à correção |
| `857aeab959c32e9d4fdc8fcd9ebbabba5c5f999a` | `014-account-test-runners` | fix(accounts): corrige runners e checksums locais de migrations | E2E62/HTTPS2/exclusão3/Bootstrap12; helper UTF8/Unit |
| `26f2bd77568fb7be01ae6347e08a4a2796c917a0` | `015-environmental-drafts` | docs(specs): planeja rascunhos pessoais de medições | análise spec/plan/tasks; decisão PD005/006 |
| `45da350c34f873619a81bb5b3022bf97a1d1bc7c` | `015-environmental-drafts` | feat(drafts): salva medições parciais pessoais com consumo transacional | Pg/OCC/rollback/consume; E2E65/Bootstrap13; revisão |
| `1ae3ca51ebb0291751a39c1b2f873431ab09da52` | `016-area-covers` | docs(specs): planeja capas privadas com ownership e reconciliação | análise spec/plan/tasks; pesquisa Cloudinary; decisão PD007–009 |
| `06fcbe005b7198b0708f280d9844f5edc0c7451d` | `016-area-covers` | feat(images): integra capas privadas com validação e cleanup próprio | Unit291+Mail17/Integration187/Migration37/Contract6/E2E67/HTTPS2/exclusão3/Bootstrap14 |

O commit documental final registra esses SHAs, sem inserir seu próprio SHA.
Seu identificador será informado na resposta da entrega; obter HEAD completo
com git rev-parse HEAD e série real com git log --reverse --topo-order BASE..HEAD.
Não houve amend/rebase, autoria inventada, hooks desativados ou commit vazio.

## Bases, branches e recursos preservados

BASE `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`: origin/development e origin/main
iguais no fetch conferido; conteúdo/ancestralidade de mail/012/013 verificados.
Remote https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git.
Checkout original C:/projetos/ifma/HidroFlorestas-FullStack permanece main/base,
Git limpo, sem alteração preexistente. Entrega C:/projetos/ifma/HidroFlorestas-cri-exec;
branch atual016-area-covers, checkpoint funcional `06fcbe005b7198b0708f280d9844f5edc0c7451d`.

| Branch | Branch-base/SHA-base | Checkpoint de entrega |
|---|---|---|
| docs/reconciliacao-cri-20261010 | origin/development / beba96fb | c59a7b6 |
| 014-account-test-runners | docs/reconciliacao-cri-20261010 / c59a7b6 | 857aeab |
| 015-environmental-drafts | 014-account-test-runners / 857aeab | 45da350 |
| 016-area-covers | 015-environmental-drafts / 45da350 | 06fcbe0 + fechamento documental |

Git limpo no checkpoint funcional e após fechamento a conferir. Todos os commits
anteriores são ancestrais do016. Ordem futura de integração: reconciliação →014→015→016,
somente após revisão e autorização próprias; nenhuma branch principal foi integrada.
Dois worktrees preservados. node_modules/.next e .accounts-validation são locais
ignorados; diagnósticos temporários não integram commits. PostgreSQL que estava
STOPPED foi iniciado para testes e voltou STOPPED; dados prévios preservados.
Bootstrap descartou somente DB novo com ownership; audit final zero schemas.

## Próximos passos e não executados

1. Autorizar especificamente destino/candidato de homologação de contas. Pelo
   [runbook](../../../operations/account-homologation-runbook.md), navegadorB solicita
   e recebe link real, confirma nova senha/uso único; navegadorA perde sessão.
   Após cooldown, reenviar código: antigo recusado/novo aceito. Registrar UTC,
   candidato e resultado sem tokens/PII; somente então avaliar T025/T028/GateB.
2. Autorizar candidato/conta sintética removível para aceite humano013; verificar
   cancelamento/senha/blockers/revogação. Automação local não fecha esse aceite.
3. Designar operador de cleanup e acompanhamento de créditos (PD-CRI010) e
   mail contínuo(PD-CRI004). Sem designação registrada, responsável não especificado.
4. Autorizar cloud/ambiente e configurar preset versionado congelado, credenciais
   privadas/hash. Executar smoke/cleanup só de IDs próprios conforme runbook de
   capas; verificar privacidade/EXIF/quotas/preset/raw/late uploads/custos no destino.
   Nenhum recurso do plano gratuito ou gratuidade permanente foi presumido.
5. Revisar a série local antes de autorizar push/PR/deploy/migrations remotas.
   Essas operações NÃO EXECUTADAS nesta sessão e não são requisito de commit local.

IHFR preserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Histórico do handoff anterior preservado

# Handoff para implementação futura

## Estado corrente após entrega local — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: correção focal de runners 014, drafts pessoais 015 e
capas privadas 016 implementados e validados localmente. Contas/mail existentes
foram preservados e revalidados. [Matriz única](matriz-de-estado.md) concentra
requisitos, decisões, cenários, snapshots e pendências; [evidências 016](../../../../specs/016-area-covers/implementation-evidence.md)
registram a regressão integrada. Gate B012, aceite humano013 e operação/créditos
Cloudinary continuam pendentes. Estado global AGUARDANDO_REVISAO; entrega local
não equivale a homologação externa. Seções seguintes preservam os cortes anteriores.

## Reconciliação de 2026-10-10

Estado atual: `EM_ANDAMENTO`. O corte auditado já contém implementação de e-mail/contas/exclusão; não reexecutar a lista abaixo como se tudo estivesse ausente. Os recortes de drafts e imagens foram aprovados nesta conversa; acompanhe a matriz única e o plano transversal para branches, snapshots, verificações e limites. Operações remotas não realizadas nesta execução.

Fonte única de estado/evidências: [matriz de estado](matriz-de-estado.md). Coordenação: [PLAN-CRI-002](../reconciliacao-e-evolucao-contas-rascunhos-imagens.md). Contratos de contas: [spec 012](../../../../specs/012-account-verification-recovery/contracts/accounts.md).

## Registro histórico preservado — 2026-10-03

## Antes de começar

1. Leia este pacote na ordem do [readme](readme.md), depois `AGENTS.md`, contexto, decisões, constituição e política de fontes atuais.
2. Atualize referências e registre branch, HEAD, upstream, worktree e alterações preexistentes. Não presuma que `cfda9df` ainda seja a base adequada.
3. Reconfira código, schema, migrations, dependências, versões, deploy e contratos consumidos pelo frontend/Lovable.
4. Resolva somente a pendência que bloqueia a etapa corrente, com origem, data, autoridade e recorte. Não promova recomendações deste pacote.
5. Crie/reconcilie spec, plano e tasks por funcionalidade usando as skills instaladas; não use este pacote como substituto nem crie requisito divergente.

## Decisões necessárias por início

- Verificação: `PD-CRI-001`, `PD-CRI-002` e normalização de e-mail.
- E-mail real: `PD-CRI-003/004`, conta Gmail de teste/operação, cron e secrets.
- Recuperação: política de senha, elegibilidade de não verificados e comunicação.
- Draft: `PD-CRI-005/006`, retenção e ownership.
- Imagem: `PD-CRI-007–010`, especialmente exposição pública e limites/quota.

## Checklist de implementação

- [ ] Baseline e preflight sem PII/secrets.
- [ ] Threat model e DTOs allowlisted.
- [ ] Migrations aditivas testadas em PostgreSQL isolado.
- [ ] Autoridade revalidada server-side dentro das transações.
- [ ] Idempotência, concorrência e efeitos externos reconciliáveis.
- [ ] Fakes determinísticos; smoke real só em contas de teste.
- [ ] UI mínima com recuperação, teclado, foco, mobile e `aria-live`.
- [ ] Build/testes registrados por SHA/ambiente/data, sem reaproveitar PASS histórico.
- [ ] Nenhuma conta real, e-mail real ou asset existente removido para facilitar fixture.
- [ ] Registros canônicos atualizados somente quando autorizados.

## Reconciliação da base

Se o cadastro, JWT, autoridade, modelo ambiental ou campo `CollectionArea.image` mudarem, refaça o baseline e ajuste os contratos. Preserve:

- estado/papel/vínculo atuais como autoridade, não claims antigos;
- dados ambientais confirmados imutáveis e separados de drafts;
- no máximo um conjunto ambiental confirmado por coleta;
- idempotência e isolamento entre laboratórios;
- diagnósticos apenas a partir de dados confirmados;
- IHFR `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Critérios de conclusão futuros

Uma frente só termina quando comportamento, dados, autorização, concorrência, migrations, operação, UI mínima, testes e documentação correspondem à decisão aprovada. Cloudinary “subiu arquivo”, SMTP “aceitou mensagem” e build verde são evidências parciais, não conclusão isolada.

Integração Lovable deve adaptar a estrutura visual aos contratos implementados, nunca criar upload, sessão, estado ou permissão apenas no cliente. Qualquer nova exigência visual volta à spec/decisão correspondente.

## Estado desta entrega

Os 14 arquivos deste pacote são documentação de planejamento. Nenhuma funcionalidade, teste executável, migration, dependência, variável, envio real, upload real, banco, merge, deploy, push ou PR foi realizado. A branch documental contém somente commits locais do pacote e deve ser revisada antes de qualquer publicação futura.


### Entrega local 015 — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: draft pessoal aprovado implementado e validado. [Spec/evidências](../../../../specs/015-environmental-drafts/implementation-evidence.md), [runbook](../../../operations/environmental-drafts-runbook.md). Sem expiração; rollback e consumo preservam ciência; limitação de histórico fora de Chromium documentada.
