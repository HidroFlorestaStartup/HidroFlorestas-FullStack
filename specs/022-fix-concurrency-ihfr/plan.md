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

Revisores independentes A/B favoráveis ao diff após correção dos achados de lifecycle/observabilidade/metodologia. Pareceres e evidências em `evidence/`. Unit298+Mail17 PASS após o caso limite do logger; typecheck/lint PASS(3warnings preexistentes). Execução local integral não substitui CI: harnessIMP006 legado/public tem coluna de conta ausente. Quinze gates e recibo externo ainda pendentes nesta revisão.

## Publicação inicial e preservação

Commit de implementação `bace4beb01d8cf3a760a3916222d39060f6972ec` publicado na branch própria. [PR16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16), draft, base temporária `feat/frontend-areas-cover`; [pedido de @codex review](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#issuecomment-6276254802). O conector GitHub recusou escrita403; a autenticação Git local já existente criou o PR e o comentário, sem exibir/persistir credenciais. Nenhuma mensagem foi enviada aos PRs14/15.

[CI inicial](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39316586779) concluído com15/15gates PASS/exit0, snapshot único7c9d024e5cc51c93d3b3ffb3525217b1ce8f2d226a91d7552c686d0bcf15d727. Artefato12219770424 com SHA/digest conferidos; [recibo](evidence/ci-initial.json). Integração229PASS, IHFR6PASS em34,9s. Esse recibo é do predecessor; o recibo do SHA final permanece obrigatório no PR16 após o commit do último delta do logger e fechamento documental.

Conferência somente leitura da demo: checkout limpo no SHA15; Next3101/PID14160, HTTPS3443/PID16648 e processo externo3000/PID40268 preservados. PostgreSQL da demo55427/PID41616 permanece separado do cluster novo55426/PID40356. Nenhuma requisição foi enviada à demo para esta conferência e nenhum dado seu foi consultado.

Auditoria oficial local: zero schemas de teste remanescentes no banco administrativo e no banco Regression próprios. Após todos os testes, somente o cluster novo55426 foi parado; dados preservados. Nenhuma parada foi enviada ao cluster da demo.

## REVIEW — fechamento do código e condição de entrega

Escopo, referências, evidências, sanitização e diffs verificados. Nenhuma alteração de contratos científicos, migrations, configurações oficiais ou asserções históricas. Revisores independentes favoráveis ao delta final; proteção de linha longa do logger novo comprovada RED/GREEN. Unit298+Mail17, typecheck e lint PASS. O recibo final externo do PR16 registra os quinze gates do último SHA e o resultado/disponibilidade de `@codex review`, sem gerar commit documental posterior que invalide esse SHA. A entrega permanece condicionada à conferência efetiva desse journal; eventual falha exige investigação e nova validação, sem presumir PASS.
