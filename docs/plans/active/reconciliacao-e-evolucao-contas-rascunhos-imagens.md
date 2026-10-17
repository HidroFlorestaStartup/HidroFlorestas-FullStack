# Reconciliação e evolução de contas, rascunhos e imagens

**ID:** PLAN-CRI-002. **Estado:** `AGUARDANDO_REVISAO` (auditoria local encerrada; aceites externos continuam pendentes).
**Início:** 2026-10-10, America/Sao_Paulo (mesmo UTC−03 de America/Fortaleza nesta data); preflight 16:42:08 UTC.

## Ciclo corrente: auditoria posterior da entrega local — 2026-10-10

Origem: solicitação explícita do usuário nesta conversa, após a entrega de oito
commits. Anexo inicialmente disponível: prompt_execucao_hidrofloresta v1.0.
Após a resposta do usuário, lido o prompt focal v1.0 na raiz do checkout original:
`prompt-revisao-focal-pre-homologacao-hidrofloresta.md`, SHA-256
`3c0cb8b24423d3fad958156625e846ab6e8e83e06f783b3e8e2292010918cb28`.
Esse arquivo não rastreado foi observado durante a auditoria e preservado no
checkout original; não foi copiado/incorporado à entrega. Este ciclo do plano
transversal já é o plano focal equivalente; não criar outro plano duplicado.
As instruções atuais vedam operações remotas, inclusive fetch nesta rodada.

Preflight 19:16:05 UTC (16:16:05 America/Sao_Paulo): checkout de entrega
`C:/projetos/ifma/HidroFlorestas-cri-exec`, origem `016-area-covers`, HEAD/base
`41f33db7ca30db3f9d971999c3f8131f4fc188a0`, sem upstream. Tracked/untracked,
staged/unstaged vazios. Nova branch `audit/cri-local-20261010` criada nesse HEAD,
no mesmo worktree; todas as branches existentes preservadas. Checkout original
main permanece em beba96fb, sem integrar alterações. Apenas os dois worktrees
anteriores; recursos ignorados anteriores (.accounts-validation/node_modules/.next)
preservados, sem reescrever seus coletores ou logs.

Git2.55.0.windows.4/Node24.19.0/npm12.0.2; PostgreSQL local próprio inicialmente
STOPPED. Remote configurado conferido por leitura local, sem comunicação externa.
Não reimplementar features prontas, editar migrations aplicadas, normativas/raw
ou promover aprovação de escopo a homologação. Qualificadores IHFR preservados.

| Etapa de auditoria | Estado | Critério de conclusão |
|---|---|---|
| A0 isolamento/histórico | CONCLUIDO_LOCAL | oito SHAs/base/branches/status registrados; prompt do usuário preservado |
| A1 código/contratos/concorrência/privacidade | CONCLUIDO_LOCAL | cenários de 014/015/016 inspecionados; nenhum defeito funcional novo reproduzido |
| A2 correspondência de testes e snapshots | CONCLUIDO_COM_RESSALVA | 520 arquivos do final verificados; equivalência 7f→5f NÃO VERIFICADA e corrigida na documentação |
| A3 correções materiais | CONCLUIDO_LOCAL | ancestralidade, cortes históricos, overlap, status, rastreabilidade e propostas superadas corrigidos; sem alteração funcional |
| A4 execução dos gates locais | CONCLUIDO_LOCAL | regressão completa em 5f36eb7e; FAIL do dry-run no banco de referência preservado, PASS no alvo próprio correto |
| A5 revisão/commits/parecer | CONCLUIDO_LOCAL | série nova depois dos oito; relatório/evidências/diff/links; parecer APTO COM RESSALVAS |

Responsável pela execução: agente; aprovador operacional/humano não especificado.
Arquivos possíveis: pacote CRI, registros vivos specs014/015/016 e mail/012/013,
runbooks e registros canônicos diretamente afetados; relatório/evidências desta
auditoria. Código/testes novos somente após spec/plan/tasks correspondentes.
Critérios de parada permanecem os de PLANS.md, limitados à parte dependente;
nenhum conflito material de intenção será resolvido silenciosamente.

Verificações previstas: revisão do diff/histórico, contratos/roles/isolation/
leases/rollback, fingerprints e manifestos de bytes; suites unit/mail/R1/contract/
Pg/migration/E2E/HTTPS/exclusão/bootstrap, typecheck/lint/build conforme riscos.
Operações que compartilhem DB/porta/.next são sequenciais. Registros da auditoria
ficam em subdiretório ignorado novo, sem anexar resultados aos logs anteriores.
Relatório histórico datado será criado em docs/reports/audits/ após coletar evidências.

Achado inicial D1 (EVIDENCIA_IMPLEMENTACAO documental): texto anterior atribui os
17 R1 aos mesmos 17 Mail. package.json e nomes em integration/mail-outbox e
mail/mail-smtp mostram 14 Pg +3 SMTP, reexecutados a partir de Integration e Mail.
Omitir a soma dupla permanece correto; a explicação da correspondência precisa
ser corrigida após revalidação, preservando o relato anterior como histórico.

Histórico desta fase: 2026-10-10 19:16 UTC, nova auditoria EM_ANDAMENTO; nenhum
defeito funcional comprovado até este checkpoint e nenhuma correção funcional
autorizada por inferência. Os checkpoints abaixo pertencem à execução anterior.

Fechamento: [relatório focal](../../reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md)
e [evidências novas](../../reports/audits/2026-10-10-cri-local-validation.json).
Checkpoints reais `497d2e5326ea33232bf9fbd44442162d77f0a86c` (plano anterior às
correções) e `d8a32d39572785d87744e2b10c87e79ad019ba46` (primeiras erratas).
Commit documental posterior fecha os achados específicos do prompt focal e
registra a evidência; seu SHA será informado na resposta final. Nenhuma feature
ou tarefa funcional nova foi criada, pois não foi comprovado defeito funcional.
Não houve nova revisão por subagente; revisões anteriores permanecem históricas.
Plano não arquivado: Gate B012/T025/T028, aceite013 e cloud/operador seguem abertos.

## Objetivo, escopo e autoridade

Revalidar as cinco frentes do PLAN-CRI-001, preservar a entrega documental de
2026-10-03, reconciliar evidências, planejar pelo Spec Kit e implementar somente
os comportamentos liberados por decisões identificáveis. A solicitação anexada
de execução v1.0 autoriza commits locais, worktrees, fetch, testes sintéticos e
registros canônicos relacionados. Não autoriza push, PR, deploy, migrations
remotas, envio real, upload real, mudança científica nem reforma das políticas.

Fontes: AGENTS.md, PLANS.md, PROJECT_CONTEXT.md, TECH_DECISIONS.md,
constituição 1.0.0, PRD Code-First/source-policy, SOURCE_AUTHORITY.md,
pacote contas-rascunhos-imagens e specs mail-foundation/012/013. Decisões atuais
com origem prevalecem para intenção; código/schema comprovam implementação;
testes só comprovam cenários executados no snapshot informado. Usar
`DECISAO_CONFIRMADA`, `FATO_DOCUMENTADO`, `EVIDENCIA_IMPLEMENTACAO`,
`INFERENCIA`, `RECOMENDACAO` e `PENDENCIA_DE_DECISAO` segundo a governança.
docs/raw/** permanece imutável. IHFR preserva CONTRATO_EXPERIMENTAL,
VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Estado inicial e isolamento

- Origem: `C:/projetos/ifma/HidroFlorestas-FullStack`, branch `main`, upstream
  `origin/main`, HEAD `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`.
- Tracked/untracked, staged/unstaged: vazios no preflight; nada a incorporar.
- Remote conferido: `https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git`.
  Fetch executado sem pull/merge/rebase. origin/main e origin/development
  apontam para o mesmo SHA; branch base escolhida: origin/development,
  coerente com o baseline de integração do pacote, sem trocar main.
- Worktree de entrega: `C:/projetos/ifma/HidroFlorestas-cri-exec`, branch
  `docs/reconciliacao-cri-20261010`, criada desse SHA. Único outro worktree:
  checkout original. Branches funcionais serão encadeadas de checkpoints
  validados e registradas aqui; dependência Git não prova dependência funcional.
- Ferramentas observadas: Git 2.55.0.windows.4, Node 24.19.0, npm 12.0.2,
  PowerShell e Python disponíveis. node_modules ausente; Docker/psql/pg_ctl
  não encontrados no PATH. Investigar harness PostgreSQL local antes de
  classificar integração como bloqueada. Nenhum segredo/env copiado.

## Etapas, riscos e critérios

| Etapa | Estado | Critério | Responsável |
|---|---|---|---|
| G0 preflight/isolamento/plano | Concluída | base atual, escopo e alterações preservadas | agente executor |
| G1 auditoria/matriz única | Concluída no recorte | intenção/código/schema/UI/testes/histórico separados; CRI-T001 a CRI-T018 e PD-CRI-001 a PD-CRI-010 mapeados | agente executor |
| G2 reconciliação | Concluída no recorte | estado atual primeiro, histórico preservado e referências válidas | agente executor |
| G3 specs por incremento | Concluída | skill instalada, tarefas anteriores ao código, decisões materiais resolvidas | agente executor; autoridade de produto não especificada |
| G4 execução local | Concluída | cenários pertinentes, regressões e limites registrados por snapshot | agente executor |
| G5 consolidação/commits | Concluída localmente | revisão de diff/links/segredos, série real e handoff | agente executor |

Riscos: aprovações históricas confundidas com autorização operacional atual;
pendências de ownership/retention/privacy de drafts/imagens; bootstrap Pg não
trivial; hooks e recursos compartilhados; gates de homologação remota.
Parar somente comportamentos dependentes de decisão material não comprovada;
avançar pesquisa, contratos e verificações independentes. Perguntas necessárias
serão mínimas e terão origem na pendência específica. Nenhuma limpeza automática
de dados será criada para preencher política ausente.

## Verificações e arquivos previstos

Baseline proporcional: scripts reais de unit/mail/contract/integration/migration,
UI12/HTTPS quando o harness permitir, typecheck/lint/build; execução sequencial
quando compartilhar Pg, porta ou .next. Instalação pelo lockfile, guias locais
Next.js antes de escrever código. Evidências registrarão comando, UTC, duração,
exit code, contagem sem soma duplicada, ambiente sintético redigido e snapshot.
Revisão final: status/diff completo e staged, diff --check, links, classificações,
ownership/concorrência/rollback, segredos e preservação de docs/raw/AGENTS/PLANS.

Arquivos previstos: os 14 documentos do pacote, matriz única de estado,
registros vivos das specs afetadas, runbooks, visão/backlog/rastreabilidade
Code-First e registros canônicos materialmente relacionados. Código/schema/testes
somente após a tarefa correspondente em spec própria. Não criar TASKS.md global.

## Bloqueios, decisões e histórico

| Data | Evento | Estado |
|---|---|---|
| 2026-10-10 | Preflight/fetch/worktree; plano registrado antes de alterações funcionais | EM_ANDAMENTO |

Nenhum gate remoto fechado nesta execução. Encerramento, SHA dos checkpoints,
ordem futura de integração e resultados serão acrescentados após verificação.

### Checkpoint documental e decisões — 2026-10-10

G1/G2 concluídos para o corte auditado: matriz única com CRI-T/PD-CRI,
14 documentos revisados, estado atual primeiro/histórico preservado e registros
vivos afetados sincronizados. Recortes drafts e capas aprovados explicitamente
nesta conversa; proveniência no pacote. Baseline local até build PASS; E2E geral
52 PASS/5 FAIL/8 não executados. Lacuna de seleção de suíte de exclusão e erro
de configuração do wrapper local identificados; ver matriz. Antes de implementar
drafts, planejar correção focal do runner; sem regressão de produto demonstrada.

### Checkpoint funcional 014 — 2026-10-10

Correção focal planejada/implementada e validada: seleção de exclusão dedicada;
checksums LF/CRLF íntegros no preparador local, sem alteração de SQL histórico.
E2E geral 62, HTTPS 2, exclusão dedicada 3 PASS; Unit 286 + Mail 17 PASS;
Bootstrap 12 migrations PASS; Typecheck/Lint PASS, três warnings anteriores;
auditoria zero schemas próprios. Falhas anteriores preservadas em
[evidências 014](../../../specs/014-account-test-runners/implementation-evidence.md).
Pendências remotas/humanas permanecem abertas. Próximo incremento: rascunhos 015.


### Checkpoint 015 — 2026-10-10

G1/G2 concluídos para corte inicial; G3/G4 de rascunhos concluídos. 65 E2E gerais,
Bootstrap 13, Typecheck/Lint/Build PASS; migração 36 e integração 177 PASS no corte
registrado. Revisão independente resolvida; sem expiração; operação remota não
executada. [Evidências](../../../specs/015-environmental-drafts/implementation-evidence.md).
Próxima etapa autorizada: spec/implementação 016 de capas privadas.


### Checkpoint 016 — 2026-10-10

G3/G4 local de capas PASS. Unit291+Mail17, Integration187, Migration37, Contract6,
E2E67, HTTPS2, exclusão3, Bootstrap14, typecheck/lint/build PASS; auditoria zero.
Revisão independente /root/image_research: P2 do adaptador resolvidos com RED/green;
lacunas de cobertura T020 resolvidas. CLI offline/dry-run PASS, providerCalls0.
[Evidências](../../../specs/016-area-covers/implementation-evidence.md).
Operação/créditos, Gate B012 e aceite013 continuam pendentes; não arquivar pacote.
Consolidação/commit final em andamento; os checkpoints anteriores são históricos.


### Encerramento local e aceite externo — 2026-10-10

G0–G5 locais atendidos. Resultado/validações/arquivos/série/recursos e pendências
no [handoff](contas-rascunhos-imagens/handoff.md). Todos os incrementos liberados
foram entregues em commits reais; nenhuma alteração preexistente incorporada,
raw/políticas/ciência preservados. Base/branches/SHAs e fases anteriores continuam
no histórico. Plano permanece AGUARDANDO_REVISAO, sem arquivamento: Gate B012,
aceite humano013 e operação/créditos Cloudinary exigem destino/autoridade próprios.
Isso não reabre G3/G4 locais nem transforma ciência experimental em validada.
PostgreSQL voltou ao STOPPED inicial, dados preservados. Sem push/PR/deploy/envio
real/upload real/migration remota. Último checkpoint funcional06fcbe0; fechamento
documental posterior registra a série, com seu SHA informado na resposta final.
