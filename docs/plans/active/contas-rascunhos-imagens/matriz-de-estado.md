# Matriz única de estado e evidências

**Reconciliação:** 2026-10-10. **Corte inicial histórico:** `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`.
**Base da revisão focal:** `41f33db7ca30db3f9d971999c3f8131f4fc188a0`.
**Estado:** `AGUARDANDO_REVISAO` (gates locais concluídos; aceite externo pendente). Intenção, código, teste e homologação são eixos independentes.
O [plano transversal](../reconciliacao-e-evolucao-contas-rascunhos-imagens.md) registra isolamento e cronologia.

## Revisão focal vigente — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: regressão completa reexecutada no final5f36eb7e e
manifesto de 520 arquivos verificado. Nenhuma alteração funcional foi necessária.
RECOMENDACAO: APTO COM RESSALVAS; equivalência histórica 7f→5f NÃO VERIFICADA,
capas testadas com fake, gates externos/humanos permanecem pendentes.
[Achados/escopo e parecer](../../../reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md),
[comandos novos/UTC/exit/log hashes](../../../reports/audits/2026-10-10-cri-local-validation.json).
Tabela seguinte descreve a entrega anterior, revalidada nos cenários desta revisão.

## Checkpoint Git da entrega

Funcional016 `06fcbe005b7198b0708f280d9844f5edc0c7451d`, descendente dos commits
das etapas anteriores e ancestral do fechamento `41f33db7ca30db3f9d971999c3f8131f4fc188a0`.
Errata da auditoria posterior: a redação original invertia a ancestralidade.
[Série/base/branches/status/pendências](handoff.md),
[inventário de arquivos](arquivos-da-entrega.md). G0–G5 locais atendidos; plano
global AGUARDANDO_REVISAO, preservado ativo pelos aceites externos pendentes.

## Entrega corrente integrada 014/015/016

EVIDENCIA_IMPLEMENTACAO: estado abaixo após a execução autorizada; cortes
anteriores permanecem datados e não representam código ausente no HEAD entregue.

| Frente/requisito | Intenção/fonte | Código e testes atuais | Validação desta execução | Homologação | Pendência/próximo passo |
|---|---|---|---|---|---|
| E-mail / MAIL-FR | DEC-001 e mail-foundation | transporte/outbox/worker existentes preservados; mail e Pg | 17 Mail PASS + integração187; R1 sobreposto | SMTP/scheduler históricos não reexecutados | operador contínuo PD-CRI-004; sem alteração remota |
| Verificação / EMAIL-FR | spec012 e confirmação2026-10-04 | códigos/reenvio/invalidação/consumo único existentes | integração e E2E sintéticos PASS | Gate B/T025/T028 não fechados | reenvio real: antigo recusado/novo aceito |
| Reset/troca / RESET-FR | spec012 | link/prova única/credentialVersion existentes | integração, E2E sintético, HTTPS2 PASS | recebimento real/reset remoto pendentes | runbook: navegadorB consome link, A perde sessão |
| Exclusão / 013FR | recorte aprovado2026-10-05 | blockers/rollback/outbox existentes; drafts removidos; uploader FKSetNull | Pg/rollback e dedicado3 PASS | aceite humano pendente | somente conta sintética removível/destino autorizado |
| Draft / DRAFT-FR001–006 | PD-CRI005/006 desta conversa | tabela pessoal, serviço/API/UI, OCC/consumo/descarte/exclusão; spec015 | parser/Pg/migration/browser/retry/duas abas PASS; regressão67E2E | uso humano não realizado | sem expiração; histórico SPA só comprovado Chromium/NavigationAPI |
| Capa / IMAGE-FR-001–005 e 016FR001–009 | DEC-003 + PD-CRI007/008/009 | tabela/tentativas/jobs/provider/API/proxy/UI; spec016 | 6Pg+3provider+1HTTP; migration; 2E2E fake; integração187/geral67 PASS | Cloudinary real NÃO EXECUTADO | configurar preset congelado/cloud; operador/créditos PD-CRI010; smoke/cleanup autorizado |

Local: Unit291 + Mail17, Integration187, Migration37, Contract6, E2E67, HTTPS2,
exclusão3, Bootstrap14, typecheck/lint/build PASS; auditoria zero. R1 repete 14
casos Pg de Integration e 3 SMTP locais de Mail; focais também são sobrepostos.
O registro histórico usa fingerprint completo 7f540ba4 e final5f36eb7e. A afirmação
histórica de que só mudaram assertion multiframe e exceção do exemplo env não foi
demonstrada nesta auditoria: NÃO VERIFICADO sem manifesto anterior correspondente.
[Comandos/UTC/duração/FAIL preservados](../../../../specs/016-area-covers/implementation-evidence.md).

### Correspondência CRI-T atual (IDs históricos preservados abaixo)

| IDs | Spec/estado atual | Limite |
|---|---|---|
| CRI-T001–002 | reconciliação/matriz/decisões atuais registradas | T002 mantém operação/autoridade pendente, sem fechar globalmente |
| CRI-T003–006 | mail-foundation existente revalidada; 014 corrige harness | não reenvia SMTP nem muda scheduler |
| CRI-T007–010 | 012 existente revalidada; 013 regressão dedicada | Gate B012/aceite013 pendentes |
| CRI-T011–013 | 015FR001–009/T001–T018 implementados/validados | recorte pessoal aprovado; sem expiry |
| CRI-T014–016 | 016FR001–009/T001–T020 implementados/validados | uma capa privada, fake local; sem ativação Cloudinary |
| CRI-T017 | regressão integrada e runbooks entregues | smoke/monitoramento remoto ainda não executados |
| CRI-T018 | documentos, evidências e série local reconciliados | handoff distingue aceite remoto do gate local |

PD-CRI005–009 resolvidas pela aprovação do usuário2026-10-10, não pela existência
do código. PD-CRI003 tem configuração histórica por ambiente, sem designar novo destino;
PD-CRI004/010 mantêm responsabilidade operacional não especificada. T025/T028012
permanecem abertos. [Decisões/proveniência](decisoes-e-pendencias.md).

## Frentes no corte inicial beba96f (registro preservado)


| Frente/requisito | Intenção e fonte | Código observado no corte | Testes existentes | Validação histórica | Validação desta execução | Homologação | Pendências/próximo passo |
|---|---|---|---|---|---|---|---|
| E-mail / MAIL-FR-001 a MAIL-FR-004 | DEC-001 e spec mail-foundation | mail/{contracts,crypto,outbox,worker,transport,templates}.ts; rota internal/mail/process; migrations mail_foundation | tests/mail/*; integration/mail-outbox; migration/mail-foundation | fundação: 15 gates/smoke recebimento em 2026-10-04, snapshot aedd43d9 | Unit inclui 17 mail; R1 17; integração 170; migration 35; contratos 6 PASS no fingerprint a14fd935 (registro abaixo) | recebimento/SMTP históricos; não revalidado remotamente | nenhuma reimplementação; manter fencing e runbook |
| Verificação / EMAIL-FR-001 a EMAIL-FR-006 | spec 012 e checkpoint aprovado 2026-10-04 | accounts/service.ts; auth/session.ts; guards; rotas auth/email-verification; register/verify-email | account-proof/contracts/session; integration/account-verification-recovery; E2E correspondente | candidato 012 cc77f24e: 15 gates locais; envio automático/parte das jornadas em 2026-10-05 | integração/contratos PASS; navegador em execução | Gate B pendente de reenvio/código antigo | manter T025 e fechamento T028 abertos; roteiro abaixo |
| Recuperação/troca / RESET-FR-001 a RESET-FR-005 | spec 012, checkpoint aprovado | requestReset/confirmReset/changePassword; fragmento reset-password; credentialVersion/JWT | integração de consumo/reset/reset/rollback/login-reset; E2E local transporte IPC | UI12 7/7 e E2E 62/62 antigos; relato humano reset sem consumo/envio comprovados | integração/contratos PASS; navegador em execução | reset por link real pendente | ausência de aceite não prova defeito; testar somente sintético |
| Exclusão / spec 013 FR-001 a FR-011 | escolhas explícitas 2026-10-05: próprio titular/senha, bloquear vínculos | AccountService.deleteAccount; auth/account-deletion; delete-account; ownership MailOutbox | integration/account-deletion; migration; E2E/account-deletion | 283+17 unit, 170 integração, 35 migration, 3 E2E; publicação 38811a1 histórica | regressão DB PASS; navegador em execução | aceite humano de exclusão permanece pendente | integrar remoção de drafts pessoais sem remover vínculos científicos |
| Rascunhos / DRAFT-FR-001 a DRAFT-FR-006 | aprovação nesta conversa 2026-10-10, PD-CRI-005/006 | sem entidade/migration/API/serviço persistente; formulário apenas memória; MeasurementSet não é draft | round-trip form atual e IMP-005; novos casos a escrever | não havia feature entregue em 2026-10-03 | inspeção schema+serviço+rotas+form confirma ausência nesse corte | não aplicável até implementação | spec própria; save/reload/OCC/descarte/confirm transacional/cleanup conta |
| Capa / IMAGE-FR-001 a IMAGE-FR-005 | DEC-003 e aprovação atual PD-CRI-007/008/009 | CollectionArea.image String? legado; DTO/serviço/UI não fazem upload nem entregam capa; Cloudinary não é dependência | área/contexto existentes; fake de provedor a escrever | proposta documental 2026-10-03 | inspeção schema+contratos+serviço+UI+dependências confirma ausência nesse corte | smoke externo não autorizado | spec própria; entrega same-origin autenticada, sem URL CDN pública |

`EVIDENCIA_IMPLEMENTACAO`: os candidatos `80ff1cfbe7799fccdde5be923530e3a6edf62010`
(fundação), `d341fe402323ddfda705b8546e9aa55886815502` (012) e
`38811a16058a78d51f3422cbf28f8c586e7cc8b8` (013) são ancestrais do corte:
três `git merge-base --is-ancestor <candidato> HEAD` retornaram 0.
Conteúdo também foi inspecionado; os merges citam PedroVitor237, enquanto o
remote atual é HidroFlorestaStartup. Não foi consultada nem presumida a existência
ou estado desses PRs no destino atual.

## Correspondência de tarefas preservadas

| ID | Correspondência/evidência | Estado atual e próximo passo |
|---|---|---|
| CRI-T001 | 012 spec/checkpoint/research | políticas pré-verificação/legado aprovadas; não reabrir |
| CRI-T002 | mail-foundation, 012 e 013 spec/plan/tasks | artefatos existentes; criar specs próprias para novas frentes |
| CRI-T003 | mail/contracts/config; accounts/contracts/policy/http/proof | contratos e limites presentes; preservar |
| CRI-T004 | migrations 20261004000100/000200/000300; schema | persistência mail/contas presente; migration suite atual PASS |
| CRI-T005 | mail/transport/templates; tests/mail | Nodemailer e TLS presentes; Unit/Mail atual PASS |
| CRI-T006 | mail/worker; internal/mail/process; mail-runbook | leases/fencing/retry presentes; R1 atual PASS; operação remota não reexecutada |
| CRI-T007 | 012 T009 a T011; AccountService signup/confirm/resend | backend presente e integração local atual PASS |
| CRI-T008 | 012 T012/T013; verify-email/register/context | UI presente; regressão navegador pendente nesta execução |
| CRI-T009 | 012 T014/T015/T019/T020 | reset/revogação/troca presentes; DB/contratos atuais PASS |
| CRI-T010 | 012 T017/T018/T021 | páginas presentes; reset real Gate B pendente |
| CRI-T011 | aprovação atual; nova spec de drafts | decisão resolvida; planejar antes de código |
| CRI-T012 | nova spec de drafts | persistência/API ausentes no corte; implementação autorizada |
| CRI-T013 | nova spec de drafts | UI persistente ausente no corte; implementação autorizada |
| CRI-T014 | aprovação atual; nova spec de capas | privacidade/limites resolvidos; pesquisa oficial necessária |
| CRI-T015 | nova spec de capas | modelo/adaptador/validação/cleanup ausentes; operação real vedada |
| CRI-T016 | nova spec de capas | UI de capa ausente; implementar fallback/progresso/remover |
| CRI-T017 | testes atuais e novos; runbooks | regressão local em andamento; smoke/monitoramento remoto não autorizados |
| CRI-T018 | PLAN-CRI-002, esta matriz e registros vivos | reconciliação atual em andamento; histórico preservado |

Não marcar CRI-T002/T017/T018 integralmente concluídas só pelas frentes anteriores.
Spec 012 T025 continua aberta; T028 possui commits históricos, mas depende de
fechamento do Gate B. Não alterar seus checkboxes para transformar testes locais
em aceite humano remoto.

## Correspondência de pendências preservadas

| ID | Fonte posterior identificada | Estado/impacto nesta execução |
|---|---|---|
| PD-CRI-001 | 012 remote-checkpoint/spec; aprovação 2026-10-04 | resolvida: sessão restrita, ACTIVE independente |
| PD-CRI-002 | mesma aprovação e migration 012 | resolvida: coorte explícita; não inventar verificação factual |
| PD-CRI-003 | 012 evidência/runbook, setup isolado 2026-10-05 | configuração histórica existente; não copiar secrets nem inferir destino futuro |
| PD-CRI-004 | 012 evidência envio automático/scheduler 2026-10-05 | mecanismo histórico verificado; responsável operacional contínuo não especificado; sem alteração remota |
| PD-CRI-005 | resposta atual à pergunta de recorte de drafts | DECISAO_CONFIRMADA: pessoal por usuário/coleta confirmada |
| PD-CRI-006 | mesma resposta | DECISAO_CONFIRMADA: descarte definitivo/sem expiração/consumir ao confirmar/remover drafts na exclusão permitida |
| PD-CRI-007 | resposta atual à pergunta de capas | DECISAO_CONFIRMADA: leitura somente autorizada/Cloudinary authenticated |
| PD-CRI-008 | mesma resposta | DECISAO_CONFIRMADA: uma capa por área, sem galeria |
| PD-CRI-009 | mesma resposta | DECISAO_CONFIRMADA: JPEG/PNG/WebP, 10 MiB, 4096 px/lado, remover EXIF |
| PD-CRI-010 | nenhum responsável atual identificado | PENDENCIA_DE_DECISAO operacional; nomear acompanhamento de créditos antes de ativação real |

## Evidência atual e limites

Baseline funcional: HEAD beba96f, fingerprint
`a14fd935c8602803c9043d8330813f17fd791f3acea3c0aacd8655e1767477b7`.
Runner existente `scripts/accounts-validation.ps1`, ambiente sintético local
Windows/Node24.19/PostgreSQL17 loopback 55427 com ownership/ACL verificados.
Sem arquivo .env copiado, sem transporte real; chaves sintéticas só no processo.
Resultados brutos redigidos em `.accounts-validation/results.jsonl`; resumo
durável e contagens serão registrados no fechamento. Unit inclui Mail; R1 é
reexecução focal e não aumenta o total exclusivo de casos.

## Baseline de navegador — falha preservada

`npm run test:e2e` via runner em 16:49:28.892–16:51:47.174 UTC,
exit 1: 52 PASS, 5 FAIL, 8 não executados. Três falhas de exclusão
ocorreram porque a suíte geral incluiu `account-deletion.spec.ts`, que exige
IDs/senha/origin fornecidos exclusivamente pelo runner dedicado existente
`scripts/account-deletion-e2e.ts`/`playwright.account-deletion.config.ts`.
É uma lacuna preexistente de seleção da suíte geral, a planejar antes da correção.
As outras duas falhas 403 usam configuração inadequada do wrapper sintético
(`ACCOUNT_TRUSTED_INGRESS=none`); o wrapper local será corrigido para `local`
sem alterar guards de produção. Não atribuir essas falhas a defeito de reset.
HTTPS/SchemaAudit não executados nessa sequência porque o runner parou no FAIL.
Unit: 283+17 PASS; integração 170; migration 35; contrato 6; R1 17;
typecheck/build PASS; lint PASS com três warnings preexistentes.

## Fechamento remoto exato ainda necessário

Fora da autorização atual. Após autorização específica do destino/candidato,
executar o [runbook de contas](../../../operations/account-homologation-runbook.md)
e [roteiro da spec 012](../../../../specs/012-account-verification-recovery/handoff.md):
reset no navegador B, verificar link recebido/consumo único/nova senha e revogação
no navegador A; reenvio após cooldown, recusar código anterior e aceitar somente
o novo. Registrar UTC/candidato e recebimento sem reproduzir provas/PII.
Para exclusão, titular de conta sintética removível confirma senha e vê bloqueios
antes de uma operação real autorizada. Para Cloudinary, verificar configuração,
credits/limites, smoke e cleanup próprios em destino explicitamente aprovado.

### Checkpoint funcional 014 — 2026-10-10

Correção focal planejada/implementada e validada: seleção de exclusão dedicada;
checksums LF/CRLF íntegros no preparador local, sem alteração de SQL histórico.
E2E geral 62, HTTPS 2, exclusão dedicada 3 PASS; Unit 286 + Mail 17 PASS;
Bootstrap 12 migrations PASS; Typecheck/Lint PASS, três warnings anteriores;
auditoria zero schemas próprios. Falhas anteriores preservadas em
[evidências 014](../../../../specs/014-account-test-runners/implementation-evidence.md).
Pendências remotas/humanas permanecem abertas. Próximo incremento: rascunhos 015.
