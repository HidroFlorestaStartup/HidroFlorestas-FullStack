# Implementation Plan: Instrumentos locais de prontidão territorial

**Branch**: `test/hf-night-baseline-20261025` | **Date**: 2026-10-25 | **Spec**: [spec.md](spec.md)
**Estado**: implementação concluída; execução real e revisão independente PASS, fechamento documental concluído.

## Summary

Instrumento manual isolado, sem package script/CI automática. Reutilizar guards e lifecycle PostgreSQL existentes, gerar conjunto sintético alvo100/1000 e ruído10/100, iniciar Next próprio em porta livre, autenticar leituras reais, capturar SQL da projeção por Prisma para EXPLAIN parametrizado e verificar lista/teclado/destinos com tráfego externo bloqueado no browser. Recibo sanitizado e teardown com erro explícito.

## Technical Context

**Language/Version**: TypeScript, Node24.19.0; PowerShell existente.
**Primary Dependencies**: Next16.3.8, Prisma7.4.2, pg8, Playwright1.55.1, node:assert/perf_hooks/crypto; nenhuma dependência nova.
**Storage**: schema descartável imp006_test_<UUID> no PostgreSQL17.10 owned loopback55427, criado e removido pelo lifecycle existente.
**Testing**: testes node:test focais do guard e estatística, execução real sob demanda, typecheck/lint focais.
**Target Platform**: Windowsx64; registrar incompatibilidade de token sandbox separadamente.
**Project Type**: ferramenta de QA manual; aplicação não muda.
**Performance Goals**: 10 warmups +100 leituras sequenciais; p95 posto95/100 comparado a500ms; lista interativa comparada a2s após resposta.
**Constraints**: executar somente via wrapper owned, sem dotenv/provedor/SMTP, sem retries, sem portas ou servidores herdados. Encerrar somente processo filho criado; schema removido apenas com marcador e createdThisRun.
**Scale/Scope**: alvo100 áreas/1000 coletas confirmadas, ruído10 áreas/100 coletas em outro laboratório; orçamento cooperativo de5min (operações em curso e cleanup podem estender), readiness60s, request10s.

## Constitution Check

Pré-design PASS: hierarquia preservada, lacuna técnica C1/008 explícita; entrega vertical para QA; spec própria030; evidência separada de intenção; guard e teardown obrigatórios; docs/raw intacto; worktree/branch próprias sem concorrência em código compartilhado. Pós-design PASS: nenhum contrato, schema/migration persistente, UX, matemática ou CI alterado. Ferramenta não encerra acessibilidade humana, homologação ou ciência.

## Project Structure

- `scripts/local-readiness.ts`: runner sob demanda, fixtures próprias, servidor/navegador, captura de consulta e recibo.
- `scripts/local-readiness-policy.ts`: validação pura do ambiente e estatística para testes de recusa antes de efeitos.
- `tests/investigations/readiness/local-readiness-policy.test.ts`: negativos guard e estatística, fora das suítes baseline automáticas.
- `specs/030-local-readiness-instruments/**`: desenho, tarefas, runbook e evidência da entrega.
- `<LOCALAPPDATA próprio>/HidroFlorestas/accounts-postgresql/readiness/<run-id>/*`: artefatos privados/ignorados; dumps e parâmetros não publicados.
- `docs/reports/2026-10-25-hf-night-01/qa/**`: resultados sanitizados datados, separados do baseline.

**Structure Decision**: reutilizar runners, serialização e fixtures existentes sem modificar suas salvaguardas; código de medição não entra em `src/` nem em workflow.

## Complexity Tracking

Nenhuma violação constitucional. Captura de consultas efetivas evita SQL copiado divergir do serviço; publicação restringe plano a campos estruturais/numéricos e hash, conservando parâmetros apenas em memória.

## Sequência e revisão

1. Spec/template/checklist; 2. setup-plan real e desenho; 3. setup-tasks real e tasks; 4. revisão coordenador antes de código; 5. implementação guiada por tasks; 6. execução fora do baseline, teardown e evidência; 7. revisão independente final antes de commit.

Metas e limites têm fonte em `specs/008-territorial-map/quickstart.md` linhas190–193 da base:100leituras/p95≤500ms,EXPLAIN e lista≤2s após resposta. Refinamentos de segurança/estatística/cleanup estão em research.md; sem mudança de requisito de produto. Regra de saída0PASS/2GOAL_NOT_MET/1FAIL será registrada no quickstart final. Revisão de requisitos root6/6 e análise read-only sem findings concluídas antes do código.
