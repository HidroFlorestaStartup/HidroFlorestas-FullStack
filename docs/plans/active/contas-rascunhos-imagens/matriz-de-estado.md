# Matriz única de estado e evidências

**Reconciliação:** 2026-10-10. **Corte auditado:** `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`.
**Estado:** `EM_ANDAMENTO`. Intenção, código, teste e homologação são eixos independentes.
O [plano transversal](../reconciliacao-e-evolucao-contas-rascunhos-imagens.md) registra isolamento e cronologia.

## Frentes

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
