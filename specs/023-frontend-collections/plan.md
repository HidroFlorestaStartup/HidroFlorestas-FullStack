# Implementation Plan: Coletas: apresentação e recuperação segura

**Branch**: `feat/frontend-collections` | **Date**:2026-10-20 | **Spec**:[spec.md](spec.md)
**Estado**: EM_ANDAMENTO; código candidato local; gates/publicação BLOCKED ou NOT_RUN.

## Summary

Incorporar apresentação do starter cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f aos controladores reais. Base funcional: `24be57fa0ddeb9d3da72ae80606850d428e29fbb`. Manter domínio/serviços, separar correções funcionais e apresentação em patches revisáveis. A fase7 só pode ser publicada sobre uma fase6 tecnicamente verificada; sua preparação local independente não antecipa esse aceite.

## Technical Context

Language: TypeScript. Runtime oficial: Node24.19.0. Dependências preservadas: Next16.3.8/React19.2.4/Prisma7.4.2/Playwright1.55.1. CSS Modules locais; sem nova biblioteca. PostgreSQL oficial sintético, não executado aqui. Escopo: componentes de coletas/ambientais e testes; sem alteração das rotas de autoridade, schema ou banco.

## Constitution Check

Fontes classificadas, entrega vertical, Spec própria, testes/evidências separados por alcance, preservação de domínio/segredos e histórico, ausência de operações não autorizadas. Revisão documental própria: compatível. Validação oficial e revisão independente: pendentes. Guias Next empacotados não puderam ser lidos no node_modules ausente; documentação oficial foi consultada e APIs existentes foram preservadas. Reconfirmação no ambiente completo permanece tarefa.

## Project Structure

spec.md / plan.md / tasks.md / research.md / data-model.md / quickstart.md / contracts/ui-contracts.md / checklists/requirements.md / analysis.md / implementation-evidence.md / review.md.

Produto: src/components/collections e src/types/collection.type.ts na fase6; src/components/environmental-data na fase7. Testes novos: tests/unit/frontend-* e tests/e2e/frontend-collections.spec.ts, frontend-environmental-drafts.spec.ts e support/frontend-mission-evidence.ts. Configuração: adições focais de nomes das branches e uploads sanitizados em vercel.json/.github/workflows/rc-review.yml.

## Execution order

Preflight/PLAN → testes auxiliares RED → correção focal → GREEN auxiliar → candidata visual → checagens estáticas → revisão própria → pacote. As etapas seguintes exigem clone/runtime completo e autorização efetiva da integração: E2E/PostgreSQL e capturas reais, revisão independente, commits/push, CI do SHA exato e PR. Não marcar como concluídas etapas que só foram preparadas.
## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
## Validação obrigatória antes da conclusão

Executar no clone completo, com Node24.19.0 e lockfile: instalação travada, Prisma, build/typecheck/lint e runners oficiais. Ler docs/operations/rc-review-ci-runbook.md e os scripts antes de rodar. Utilizar somente PostgreSQL sintético próprio, guards/allowlists vigentes. `-InitializeCiCluster` é exclusivo do Actions Windows isolado, nunca da máquina normal. E2E focal também exige o ambiente completo oficial.

No HEAD final de cada PR verificar individualmente: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Não reduzir asserts, guards, readiness, permissões, runners, pins ou timeouts para obter verde. Preservar falhas históricas e novos FAILs. Falhas antigas de IHFR/navegação/duas chamadas continuam inconclusivas; novo verde não demonstra causa retrospectiva.

Inspecionar capturas de viewport reais e sanitizadas, fullPage:false, 320/375/768/1440 px, texto200, paisagem, safe-area emulada, teclado/foco/toque, controles finais, conteúdo longo, erro/retry e Back/Forward/reload. Os testes novos cobrem parte dessa matriz; o restante e os testes existentes de contexto, conta, shell, áreas/capas, drafts/OCC/rollback e seis IHFR precisam ser executados. Emulação não prova dispositivo físico ou conformidade WCAG integral.
