# Reconciliação e evolução de contas, rascunhos e imagens

**ID:** PLAN-CRI-002. **Estado:** `EM_ANDAMENTO`.
**Início:** 2026-10-10, America/Sao_Paulo (mesmo UTC−03 de America/Fortaleza nesta data); preflight 16:42:08 UTC.

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
| G1 auditoria/matriz única | Em andamento | intenção/código/schema/UI/testes/histórico separados; CRI-T001 a CRI-T018 e PD-CRI-001 a PD-CRI-010 mapeados | agente executor |
| G2 reconciliação | Pendente | estado atual primeiro, histórico preservado e referências válidas | agente executor |
| G3 specs por incremento | Pendente | skill instalada, tarefas anteriores ao código, decisões materiais resolvidas | agente executor; autoridade de produto não especificada |
| G4 execução local | Pendente | cenários pertinentes, regressões e limites registrados por snapshot | agente executor |
| G5 consolidação/commits | Pendente | revisão de diff/links/segredos, série real e handoff | agente executor |

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
