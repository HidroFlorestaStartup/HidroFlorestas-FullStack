# Implementation Plan: Concorrência e IHFR

**Branch**: `022-fix-concurrency-ihfr` | **Date**: 2026-10-19 | **Spec**: [spec.md](spec.md)
**Input**: Pedido atual do usuário; PLAN → EXECUTE → REVIEW.

## Summary

Investigar duas falhas antes de corrigir; causa demonstrada e reprodução controlada como pré-requisitos. Falha não reproduzida permanece inconclusiva. Preservar contratos/retries/timeouts/ciência e demo.

## Technical Context

**Language/Version**: TypeScript, Node24.19.0.
**Primary Dependencies**: Next16.3.8, React19.2.4, Prisma/adapter-pg7.4.2, Playwright1.55.1.
**Storage**: PostgreSQL17.10 próprio na55426, contexto IMP006 oficial, sem alteração de guards.
**Testing**: node:test/integração PostgreSQL/Playwright; quinze gates RC em Windows Actions.
**Target Platform**: Windows local/CI.
**Project Type**: Web full-stack.
**Performance Goals**: Eliminar contenção evitável comprovada sem ampliar orçamento.
**Constraints**: Demo Next3101/HTTPS3443/PG55427 preservada. Sem merge/deploy/produção/alteração científica/PR14/15.
**Scale/Scope**: Emissão concorrente de capas e investigação IHFR; nenhuma auditoria geral.

## Constitution Check

PASS inicial: pedido atual autoriza escopo; specs006/016 preservam contratos. Ciência não muda; branch/spec próprios, evidências sanitizadas e revisão independente por frente. Sem migration planejada. Reavaliar desenho/diff final. Extensões: `.specify/extensions.yml` ausente, sem hooks.

## Project Structure

```text
specs/022-fix-concurrency-ihfr/{spec,plan,research,data-model,quickstart,tasks}.md
specs/022-fix-concurrency-ihfr/contracts/preserved-contracts.md
specs/022-fix-concurrency-ihfr/evidence/
src/app/api/server/images/service.ts
tests/integration/area-covers.test.ts
scripts/imp006-local-e2e.ts
tests/e2e/ihfr-diagnosis-{manage,read}.spec.ts
.github/workflows/rc-review.yml
vercel.json
```

## PLAN

1. Preservar baseline e arquivos preexistentes; worktree própria no SHA15.
2. Confrontar artefatos originais FAIL/PASS, SHA/snapshot e assinaturas.
3. A: correlacionar chamadas/fases/tentativas/commit, barreiras determinísticas e conflitos reais; sempre conferir contagens finais. Escolher correção somente após causa.
4. B: executar runner original em cluster próprio; observar URL/DOM/logs sanitizados e controles de fixture/hidratação. Sem causa reproduzida, manter inconclusivo.
5. RED/GREEN com expectativas idênticas; testes oficiais focais locais e quinze gates no SHA final remoto. Habilitar somente branch nova no workflow e desabilitar deploy antes de push.
6. Revisores independentes A/B e `@codex review`; resolver achados, commit/PR empilhado sobre PR15 sem modificá-lo.

## EXECUTE — diário

- EVIDENCIA_IMPLEMENTACAO: RC inicial0f669b7, atrás1; zero alteração rastreada. Preservados `.demo-runtime/`, plano/relatório da demo e três ZIPs.
- EVIDENCIA_IMPLEMENTACAO: worktree própria `.worktrees/022-fix-concurrency-ihfr`, baseline3f1eba566a1f4f01e469f75a6c174fd2e602a9d2. Metadados Git exigiram escalonamento; nenhuma branch existente foi movida.
- EVIDENCIA_IMPLEMENTACAO: npm ci do lockfile/client Prisma apenas na worktree nova.
- Revisores independentes `review_concurrency`/`review_ihfr` concluíram investigação estática; causas históricas ainda não demonstradas.

## REVIEW

Exigir causa versus hipótese, reprodutor, contratos e evidência RED/GREEN. Conferir15gates no mesmo SHA; reexecução verde não prova causa. Registrar riscos e demo preservada.

## EXECUTE — atualização após experimentos

EVIDENCIA_IMPLEMENTACAO: quatro operações em três ondas reproduziram esgotamento real tanto no COMMIT(DriverAdapterError/40001) quanto no INSERT(P2034/40001), com snapshots novos. RED2FAIL contra serviço original e GREEN2PASS com as mesmas expectativas.47regressões PASS. Histórico de duas chamadas não foi reproduzido em30rodadas e continua inconclusivo.

Correção mínima: uma transação final apenas de consultas após terceiro conflito reconhecido do pós-preset. Não é nova tentativa de escrita; não repete preset/backoff. Consulta elegibilidade ou replay real; mantém erro técnico quando não pode decidir. Pode acrescentar latência excepcional com os mesmos limites por transação.

IHFR: seis originais PASS; controles artificiais separados2RED/2PASS mostram conteúdo SSR oculto sem JavaScript e redirect por sessão inválida. Causa histórica continua inconclusiva. Apenas observabilidade acrescentada; ciência/asserts/readiness/limites intactos.

Revisores independentes A/B favoráveis ao diff após correção dos achados de lifecycle/observabilidade/metodologia. Pareceres e evidências em `evidence/`. Unit297+Mail17 PASS; typecheck/lint PASS(3warnings preexistentes). Execução local integral não substitui CI: harnessIMP006 legado/public tem coluna de conta ausente. Quinze gates e recibo externo ainda pendentes nesta revisão.
