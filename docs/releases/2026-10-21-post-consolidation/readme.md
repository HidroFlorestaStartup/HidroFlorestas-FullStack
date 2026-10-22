# HF-POS-20261021-01 — execução pós-consolidação

**Resultado operacional: PARCIAL. O piloto não está homologado para Production.**

**Fechamento posterior:** o [relatório final](final-report.md) consolida a
[CI oficial](backend-ci.md) do candidato `131ade347258c7820c7a89989ab851769197b486`:
quinze gates PASS na primeira tentativa, artifact verificado e Codex concluído
sem findings. O [recibo de publicação](evidence/publication-receipt.json) vincula
SHA, árvore, run/attempt/job e revisão. A matriz abaixo preserva o checkpoint
anterior à primeira publicação; o estado final consta do relatório e da
[PR #27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27).
O fechamento documental posterior possui checks/revisão próprios; nele os gates
funcionais são NOT_RUN, sem herança de PASS.
A [inspeção visual oficial](frontend-ci-inspection.md) registra 54 PNGs abertos,
161 metadatas conferidas e observações P3, com aceites humanos ainda pendentes.

| Frente autorizada | Estado | Resultado atingido |
|---|---|---|
| A — investigação e defeitos | PARCIAL | Históricos recuperados, reproduções reais e contraprova local; causas antigas ainda inconclusivas, sem correção especulativa |
| B — homologação e prontidão | PARCIAL | Inventário, smoke protegido, recuperação sintética e roteiros concluídos; G3–G5 dependem de configuração e aceite humanos |

Esta entrega registra trabalho real de três agentes em paralelo, testes locais,
investigação histórica, revisão independente e verificações conectadas do ambiente.
A base executada é `b1f83cfa8e52dd25c6246c584a576553c5e9e131`, revalidada no
GitHub. Não foi demonstrado defeito atual que justifique alterar o produto. A
execução móvel adicional terminou com quatro falhas no logout, preservadas como
FAIL. A contraprova focal identificou diferença de origem no contexto local
IMP006/porta 3000; o ambiente oficial ainda exige seu próprio recibo.

**Proveniência temporal:** o arquivo é fechado antes da publicação do seu próprio
SHA. CI, resposta Codex e e-mail concluídos depois desse commit são registrados
no recibo final da PR da branch `docs/pilot-readiness-20261021`, identificados pelo
SHA exato, run/attempt/job e ID de mensagem. Isso evita atribuir a um commit o
resultado de outro ou fabricar um recibo anterior à execução. O recibo final da
PR complementa esta matriz; não reescreve os resultados históricos.

## Entregas e evidências

| Recorte | Entrega realizada | Documento |
|---|---|---|
| Backend e históricos | Logs e artefatos originais recuperados; cenários sintéticos de concorrência, IHFR e migrations; causas históricas mantidas quando não demonstradas | [Backend e banco](backend-database.md) |
| Frontend | Sete casos públicos originais PASS, 21 capturas originais inspecionadas, 86 casos unitários focais PASS; quatro casos móveis FAIL no logout e contraprova de ingresso local; sem patch especulativo | [Frontend e UX](frontend-ux.md) |
| Recuperação | Ensaio real de dump/restore exclusivamente sintético, com 14 migrations, contagens/digests e constraints comparados | [Recibo de recuperação](evidence/backend-synthetic-recovery.json) |
| Operação | Identidade Vercel, Preview/Production, 11 entradas de env por nomes/targets, quatro páginas HTTP 200 e recusa segura do worker sem configuração | [Prontidão e checklist privado](operational-readiness.md) |
| Revisão independente | Diferenças, evidências, privacidade e limites revisados por outro agente; nenhuma aprovação humana simulada | [Revisão independente](independent-review.md) |
| Coordenação | Ref/base, histórico RC, isolamento, permissões e recibo de atualização da PR #26 | [Preflight](evidence/preflight.json), [plano](../../plans/active/pos-consolidacao-execucao-20261021.md) |

Os 86 casos frontend são uma seleção focal do conjunto de testes; não devem ser
somados aos unitários gerais como se todos fossem casos distintos. Testes locais
Linux/PostgreSQL 16 e a CI oficial Windows/PostgreSQL 17 têm evidências próprias.
Nenhum resultado local é apresentado como execução dos quinze gates oficiais.

## Alterações efetivas

Produto, contratos, cálculo IHFR, API, schema, migrations, dependências e testes
existentes permanecem iguais à base. A entrega acrescenta documentação/evidência
e duas mudanças de configuração estritamente focais:

1. `vercel.json`: desabilita deployment Git somente para a branch desta entrega,
   preservando as 23 regras anteriores e `development:false`.
2. `.github/workflows/rc-review.yml`: inclui essa branch no push e no `if` do job
   existente. Preserva runner, Node 24.19.0, Actions pinadas, permissões, upload
   restrito, quinze gates, scripts, guards, assertions, retries e timeouts.

Não foi feito merge nem alteração de `main`, `development` ou da branch de Pedro.
Não houve deploy, promoção Production, mudança de DNS/env, seed ou migration em
banco hospedado. As fontes históricas e `docs/raw/**` foram preservadas.

## Matriz G0–G5 neste checkpoint de publicação

| Gate | Estado | Evidência e limite | Ação para encerrar o que falta |
|---|---|---|---|
| G0 — integridade | PASS | Ref/base/conta/worktrees e destino reconciliados. Rulesets vazio; endpoint de branch informa `protected:false`; detalhe de proteção clássica retornou 403 da integração | Mantenedor verifica política administrativa antes de decidir merge; nenhuma proteção foi alterada |
| G1 — defeitos/históricos | BLOCKED | Causalidade antiga ainda inconclusiva. Nova falha móvel preservada; contraprova associa o logout à diferença de origem no contexto local, sem demonstrar defeito de produto no ambiente oficial | Confrontar o contexto oficial; aceitar explicitamente risco histórico residual ou preservar nova reprodução instrumentada |
| G2 — CI/revisão do SHA publicado | NOT_RUN | Configuração focal validada; execução remota e Codex só podem ocorrer após criação do SHA | Vincular os quinze gates e resposta Codex do próprio SHA no recibo final desta PR |
| G3 — contas/e-mail | BLOCKED | `BLOCKED_ENV`: 18 nomes materiais ausentes; sem SMTP/caixa/scheduler operacionais do FullStack | Configuração privada, destinatário de teste autorizado e jornadas completas |
| G4 — produto hospedado | BLOCKED | Há provas sintéticas; o recorte móvel local foi FAIL 4/4. Sessões/jornadas hospedadas e decisão explícita de capas ainda não comprovadas | Confrontar a navegação oficial, identificar ambiente isolado, executar jornadas e homologar Cloudinary ou confirmar feature-off |
| G5 — ambiente e aceite | BLOCKED | Backup/restore hospedado, operadores, suporte, janela e aceites humanos não demonstrados | Operador/mantenedor completam evidências e aceites antes de Production |

`BLOCKED` operacional não transforma testes sintéticos PASS em FAIL. Histórico
`INCONCLUSIVO` não significa defeito corrigido; um novo verde não prova causa antiga.

### Falha móvel e contraprova local

Os quatro casos originais (320/375 px, texto 100/200%) chegaram às capturas de
navegação, orientação e foco, mas a asserção final de cinco segundos esperava
`/login` e observou `/logout`. Não houve retry nem alteração de timeout. No mesmo
servidor local, sem cookie, trocar somente o cabeçalho `Origin` de
`http://127.0.0.1:3000` para `http://localhost:3000` mudou o POST de logout de
403 `FORBIDDEN` para 200 `success:true`. O código e o teste unitário existentes
tratam a normalização de host do Next e o ingresso explícito de contas. O ensaio
suplementar usou o contexto IMP006; não equivale ao contexto oficial de contas.

Essa contraprova sustenta a classificação de configuração/ingresso do harness
local, não fecha INV-004 histórico nem converte os quatro FAIL em PASS. O adendo
frontend preserva os recibos HTTP, a inspeção das capturas e o limite causal.

## Ambiente observado

| Ambiente | Deployment/SHA | Estado observado |
|---|---|---|
| Preview RC | `dpl_FZkyCyfvzLVQFG5W9sVCd34ipcdj`, `5f6266b48d0f9d33571009c0c3981065630bd21e` | READY; quatro GETs de páginas por acesso autenticado Vercel HTTP 200 |
| Preview documental de Pedro | `dpl_D6LnRpT5xEMJVDRmxYKx2R5EvVji`, `f85077a6f0c229ea08fd4ce85c80a92c67c48093` | READY; não substitui CI funcional |
| Production anterior | `dpl_FEPNkC3Rg52iaBk8hs1TtutPXJoA`, `1ea3cc2552c244e1004f4f733f838e0f9ea62993` | Preservada; não é a RC nova |

O acesso via proteção da Vercel não autentica usuário dentro da aplicação. O
endpoint do worker respondeu 503 `CONFIGURATION` sem executar lote. READY,
HTTP 200, envio do relatório por Gmail e SMTP `accepted` são provas distintas
de recebimento operacional da aplicação e de homologação.

## Riscos priorizados

| Prioridade | Risco | Tratamento atual |
|---|---|---|
| P1 | Promover piloto sem política de contas/SMTP/worker | G3 bloqueado; checklist nominal e privado preparado |
| P1 | Preview e Production compartilharem dados | Nenhuma escrita hospedada; exigir identificação e isolamento verificáveis |
| P1 | Publicar evidência contendo ambiente privado do processo | Interceptado na revisão, substituído por projeção fechada antes de qualquer commit; nenhum valor publicado no Git/GitHub |
| P1 | Deployment Git incidental de branch nova | Guarda focal incluída antes da publicação; estado externo reconsultado no fechamento |
| P2 | Intermitências históricas sem causa demonstrada | Evidências e qualificações preservadas; sem retries/timeouts para mascarar |
| P2 | Logout móvel falhou no contexto local IMP006 | Quatro FAIL preservados; contraprova de origem documentada; comparar execução oficial sem enfraquecer CSRF |
| P2 | Falta de owner, suporte, aceite de copy/dispositivos/capas | Responsáveis a designar e decisões específicas enumeradas abaixo |

Nenhum P0 foi comprovado neste recorte. Não se declara auditoria exaustiva de segurança.

## Próximos passos executáveis, por ordem

As ações são `RECOMENDACAO`. Pedro e Luciano são os destinatários confirmados do
relatório, não donos presumidos de banco, SMTP ou aceite científico. Atribuições
operacionais precisam ser confirmadas pela equipe.

1. **Mantenedor:** revisar esta PR e a PR #26 separadamente; decidir integração e
   aceitação dos riscos históricos, sem interpretar o handoff documental como
   homologação. Nenhum merge é realizado automaticamente por esta missão.
2. **Operador do ambiente, a designar:** identificar banco/branch/papel de Preview,
   isolamento de Production, backup e restauração descartável. O ensaio local
   desta entrega valida um procedimento sintético, não o backup do provedor.
3. **Operador de contas/e-mail, a designar:** preencher os 18 nomes materiais em
   canal privado, com chaves independentes, origem estável e allowlist autorizada;
   verificar TLS/SMTP e vincular scheduler próprio ao FullStack. Não reutilizar
   o script hardcoded do projeto histórico de homologação.
4. **Equipe do piloto:** escolher Cloudinary homologado ou capas explicitamente
   desligadas; registrar features, participantes autorizados e canal de suporte.
   A ausência da env permite inferir o comportamento do código, mas não substitui
   decisão de rollout nem observação da interface autenticada.
5. **Testadores autorizados e operador:** executar cadastro/recebimento/verificação,
   reenvio/expiração, login/reset/revogação, exclusão, laboratório/área/coleta,
   medições/drafts/reconciliação, mapa/lista/fallback e IHFR experimental.
6. **Responsáveis humanos de produto/UX:** registrar copy, teclado, texto 200%,
   dispositivo e leitor de tela pertinente. Emulação Chromium não emite esse aceite.
7. **Após G3–G5 PASS:** definir janela, suporte e reversão compatível e submeter a
   implantação ao processo autorizado do projeto. Esta missão não promove Production.

Rollback desta entrega é documental/configuracional por commit normal. Reversão
de uma implantação futura exige compatibilidade do binário com schema/dados e
provas de recuperação; rollback de código não reverte schema ou registros.

## Comunicação final e recibos

O usuário autorizou um único e-mail real aos dois destinatários identificados na
missão. Antes do envio, a coordenação pesquisa SENT por `[HF-POS-20261021-01]` e
pelos dois endereços. O resultado `EMAIL_SENT` somente será registrado após
sucesso real do Gmail; se existir envio da mesma execução, seu recibo será usado
sem duplicação. O recibo final da PR registrará horário, IDs de mensagem/thread
e resultado, sem divulgar credenciais, valores de env ou PII de testadores.

Atualização já publicada, sem editar a branch de Pedro:
[PR #26, comentário 6329298055](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/26#issuecomment-6329298055).
Runbooks: [contas](../../operations/account-homologation-runbook.md),
[e-mail](../../operations/mail-runbook.md), [drafts](../../operations/environmental-drafts-runbook.md),
[capas](../../operations/area-covers-runbook.md),
[migrations](../2026-10-10-cri-rc/migration-runbook.md) e
[atualização/rollback](../2026-10-10-cri-rc/production-update-runbook.md).

O IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
