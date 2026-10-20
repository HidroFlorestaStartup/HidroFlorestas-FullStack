# Implementation Plan: Dados ambientais e drafts: apresentação sem perda

**Branch**: `feat/frontend-environmental-drafts` | **Date**:2026-10-20 | **Spec**:[spec.md](spec.md)
**Estado**: EM_ANDAMENTO; PR Draft #19 publicada e empilhada; continuidade R3 para corrigir E2E e validar o HEAD final.

## Continuidade R3 — 20/10/2026

DECISAO_CONFIRMADA: missão R3 anexada e comando `execute` autorizam continuidade das duas fases, publicação nas branches existentes e revisão Codex, sem merge, deploy, banco/provedor real ou mudança científica.

EVIDENCIA_IMPLEMENTACAO: preflight remoto confirmou `feat/frontend-environmental-drafts@3d8038294e3d5383b0b3536b8ded275f2f85e884`, PR Draft #19 e merge-base com fase 6 em `e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`. A PR #18 avançou somente no diagnóstico do teste de coletas desde essa base. Run 39452650036, tentativa 1, job 118731460561: nove gates PASS, E2E 161 PASS / 2 FAIL / 3 NOT_RUN; cinco gates posteriores NOT_RUN. A revisão Codex do HEAD `3d803829` concluiu sem novos achados materiais, mas não substitui a revisão do futuro candidato.

Plano executável: (1) analisar artefatos da falha e reproduzir foco/scroll; (2) sincronizar a jornada com o foco realmente programado, preservando a validação de obstrução e ampliando a prova do último campo; (3) incorporar a correção da fase 6 por commit com ancestralidade preservada e referência exata, sem rebase ou merge de PR; (4) validar drafts, precisão, grupos, sessão A → B → A e todo o runner oficial; (5) revisar e entregar os dois Drafts com evidências por SHA.

Um agente é escritor do teste ambiental, outro revisa geometria compartilhada na fase 6, e QA revisa conta/segurança. O coordenador é o único integrador/publicador. Specs existentes reutilizadas pelos scripts Spec Kit; não há hooks. O checklist histórico de runtime e aceite não impede o trabalho já autorizado; aceite humano permanece externo. Registros anteriores abaixo são históricos e não prevalecem sobre este estado ou os novos recibos por HEAD.

## Summary

Incorporar apresentação do starter cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f aos controladores reais. Base funcional: `24be57fa0ddeb9d3da72ae80606850d428e29fbb`. Manter domínio/serviços, separar correções funcionais e apresentação em patches revisáveis. A fase7 só pode ser considerada concluída sobre uma fase6 tecnicamente verificada; preparar e publicar um PR Draft provisoriamente empilhado não antecipa o aceite nem dispensa reconciliação posterior.

## Technical Context

Language: TypeScript. Runtime oficial: Node24.19.0. Dependências preservadas: Next16.3.8/React19.2.4/Prisma7.4.2/Playwright1.55.1. CSS Modules locais; sem nova biblioteca. PostgreSQL oficial sintético, não executado aqui. Escopo: componentes de coletas/ambientais e testes; sem alteração das rotas de autoridade, schema ou banco.

## Constitution Check

Fontes classificadas, entrega vertical, Spec própria, testes/evidências separados por alcance, preservação de domínio/segredos e histórico, ausência de operações não autorizadas. Revisão documental própria: compatível. Validação oficial e revisão independente: pendentes. Guias Next empacotados não puderam ser lidos no node_modules ausente; documentação oficial foi consultada e APIs existentes foram preservadas. Reconfirmação no ambiente completo permanece tarefa.

## Project Structure

spec.md / plan.md / tasks.md / research.md / data-model.md / quickstart.md / contracts/ui-contracts.md / checklists/requirements.md / analysis.md / implementation-evidence.md / review.md.

Produto: src/components/collections e src/types/collection.type.ts na fase6; src/components/environmental-data na fase7. Testes novos: tests/unit/frontend-* e tests/e2e/frontend-collections.spec.ts, frontend-environmental-drafts.spec.ts e support/frontend-mission-evidence.ts. Configuração: adições focais de nomes das branches e uploads sanitizados em vercel.json/.github/workflows/rc-review.yml.

## Execution order

Preflight/PLAN → testes auxiliares RED → correção focal → GREEN auxiliar → candidata visual → checagens estáticas → revisão própria → pacote. As etapas seguintes exigem clone/runtime completo e autorização efetiva da integração: E2E/PostgreSQL e capturas reais, revisão independente, commits/push, CI do SHA exato e PR. Não marcar como concluídas etapas que só foram preparadas.
## Histórico — estado e limites da preparação inicial

A publicação foi retomada após selecionar explicitamente a conexão GitHub `HidroFlorestaStartup`, autorizada pelo usuário. A branch provisória foi criada sobre `feat/frontend-collections@e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`; a fase6 permanece em CI e a validação final/aceite continua pendente. O histórico do erro 403 está documentado no handoff de origem; esta entrada substitui aquele status de publicação.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. A preparação PLAN/RED/GREEN local foi preservada, mas a publicação remota ocorrerá por commits distintos. Não confundir os testes locais Node22 com CI Node24.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
## Validação obrigatória antes da conclusão

Executar no clone completo, com Node24.19.0 e lockfile: instalação travada, Prisma, build/typecheck/lint e runners oficiais. Ler docs/operations/rc-review-ci-runbook.md e os scripts antes de rodar. Utilizar somente PostgreSQL sintético próprio, guards/allowlists vigentes. `-InitializeCiCluster` é exclusivo do Actions Windows isolado, nunca da máquina normal. E2E focal também exige o ambiente completo oficial.

No HEAD final de cada PR verificar individualmente: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Não reduzir asserts, guards, readiness, permissões, runners, pins ou timeouts para obter verde. Preservar falhas históricas e novos FAILs. Falhas antigas de IHFR/navegação/duas chamadas continuam inconclusivas; novo verde não demonstra causa retrospectiva.

Inspecionar capturas de viewport reais e sanitizadas, fullPage:false, 320/375/768/1440 px, texto200, paisagem, safe-area emulada, teclado/foco/toque, controles finais, conteúdo longo, erro/retry e Back/Forward/reload. Os testes novos cobrem parte dessa matriz; o restante e os testes existentes de contexto, conta, shell, áreas/capas, drafts/OCC/rollback e seis IHFR precisam ser executados. Emulação não prova dispositivo físico ou conformidade WCAG integral.

## Incorporação complementar R3

Parents confirmados da candidata seguinte:5ca520500298a2066f2072290998754a4a62d42e e2a047d10360803517ff6bf64b38754cd0f07f5ba. Uma sobreposição textual no workflow foi resolvida preservando os dois conjuntos de capturas sanitizadas; demais arquivos herdados conferidos com merge-tree. H4 e perda de evidência possuem RED/GREEN auxiliar e recibos independentes. A próxima publicação agrupa a correção compartilhada e a evidência desta Spec, para um único CI coeso.15 gates/Codex/capturas do próprio HEAD continuam condições de conclusão.
