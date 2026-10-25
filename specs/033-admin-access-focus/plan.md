# Implementation Plan: foco após perda de acesso administrativo

**Branch**: `fix/hf-night-admin-focus-20261025` | **Date**: 2026-10-25 | **Spec**: [spec.md](spec.md)

## Summary

Investigar e corrigir somente a entrega do foco ao alerta de indisponibilidade vigente no componente real de administração. A hipótese inicial é agendamento de foco antes do commit; a escolha final depende da prova controlada. Não alterar regras de acesso ou testes existentes.

## Technical Context

**Language/Version**: TypeScript/React19.2.4, Next16.3.8, Node24.19.0.
**Primary Dependencies**: dependências existentes, Playwright1.55.1, esbuild/PostCSS/Tailwind transitivos já usados pelos testes UI.
**Storage**: somente estado/refs do componente; sem banco.
**Testing**: harness do componente real e CSS real, browser com rotas sintéticas fechadas, workers1/retries0; typecheck/lint e unitários pertinentes; QA pode repetir o teste real existente em commit identificado.
**Target Platform**: navegador Chromium local, sem Next/dev server/DB no harness.
**Project Type**: correção focal de UI.
**Performance Goals**: foco entregue pelo commit do alerta, sem polling ou atraso arbitrário no produto.
**Constraints**: nenhum servidor/API/autorização/sessão/schema/dependência alterado; não enfraquecer assertions/timeouts/retries.
**Scale/Scope**: um componente e testes focais de 401/403/404, seleção repetida e leituras descartadas.

## Constitution Check

PASS pré-design: mandato atual M04/M07, requisitos IMP-009 FR-024/NFR-005 e spec027 FR-003/FR-006; evidência técnica separada de hipótese. Branch/spec próprias, entrega pequena, dados sintéticos, sem docs/raw ou contrato novo.
PASS pós-design: sem bloqueio normativo. Modelar ocorrência do alerta é decisão de implementação do agente, sem mudança de intenção; experimento não concede causalidade histórica universal nem aceite humano.

## Project Structure

- `src/components/user-administration/user-administration-page.tsx`: única alteração funcional prevista.
- `tests/ui/admin-access-focus.spec.ts` e `tests/ui/admin-access-focus.config.ts`: novos testes/config próprios, sem modificar os existentes.
- `specs/033-admin-access-focus/**`: spec, plano, pesquisa, modelo, contrato UI, quickstart, checklists, tarefas e evidências.
- `vercel.json`: alteração preexistente da guarda exata pelo coordenador; preservar e não editar.

## Phases e estratégia

1. Especificar, planejar, gerar checklist/tarefas e analisar consistência. Gate de requisitos pelo coordenador antes de escrever teste/código.
2. Construir teste do componente/CSS reais com egress bloqueado. Instrumentar rAF nativo e commit. Controle sintético permite segurar despacho do scheduler React e liberar depois do frame: não muda callback de rAF para execução síncrona nem prova a causa do ambiente real. Registrar RED comportamental reproduzível antes do patch, se observado.
3. Se confirmada a fragilidade, vincular foco ao commit de uma ocorrência atual do alerta. Avaliar efeito dependente da ocorrência versus callback ref estável; texto sozinho pode não distinguir ocorrência repetida. Evitar rAF/polling/delay tardios para esse foco.
4. Cobrir cada status em detalhe/auditoria, resultados simultâneos, respostas superadas, repetição do mesmo texto, interação posterior e desmontagem. Preservar limpeza/cancelamento/diálogo e distinção 404 versus 401/403.
5. Typecheck, lint e testes pertinentes; revisão independente. Converge após implementação; novos gaps viram tarefas append-only.

## Estado inicial, riscos e evidência

Base08262dc57c1ad365244f9ec6902b1e4be39e2d7d, worktree admin exclusiva; somente `vercel.json` modificado inicialmente pelo coordenador. `npm ci --offline --no-audit --no-fund` próprio PASS,553pacotes; políticas de install scripts preservadas.
Guia Next local `05-server-and-client-components.md` e `11-css.md` consultados antes do código. Não compartilhar client gerado; Prisma local só se typecheck exigir, com engine QA em leitura.

QA forneceu 1FAIL do cenário real403 no replay completo e 1FAIL/9PASS em10 repetições focais, sem retries. Focal isolado1PASS. Alert estava presente/tabindex-1; snapshot generic[active] não identifica activeElementTag. Esses resultados não são execução desta autoria. Causa rAF/commit permanece INFERENCIA até a prova própria; prova sintética não explica universalmente o FAIL real.

## Revisão e limites

Checklist custom é propriedade do coordenador; não marcar itens pelo autor. Sem commit/push/PR por esta autoria. Sem deploy/main/merge/SMTP/provedor/banco hospedado. Homologação assistiva/humana, piloto e ciência permanecem fora do escopo. TECH_DECISIONS/DOCUMENT_REGISTER/PENDING_DECISIONS não requerem mudança normativa para este patch focal.
