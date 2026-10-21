# Implementation Plan: Apresentação do IHFR experimental

**Branch**: `feat/frontend-ihfr` | **Date**: 2026-10-21 | **Spec**: [spec.md](spec.md)

**Input**: `specs/025-frontend-ihfr/spec.md`; C1 conciliada fase 8.

## Summary

Adaptar o painel de diagnóstico à composição do starter: cartão de resultado, métricas, componentes, aviso científico e proveniência; gestão com campos agrupados, estados legíveis e confirmação responsiva. Manter os handlers, o DTO, permissões e o protocolo de tentativa existentes. A apresentação não calcula, classifica ou decide elegibilidade.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.3.8, Node 24.19.0.

**Primary Dependencies**: Tailwind CSS 4 e lucide-react já instalados; nenhuma dependência nova.

**Storage**: Nenhuma alteração persistente. DTO público e endpoints existentes.

**Testing**: node:test + tsx, React renderToStaticMarkup, Playwright dedicado IHFR; CI Windows oficial pelo coordenador.

**Target Platform**: Web responsiva; navegador Chromium em CI para evidência emulada.

**Project Type**: Apresentação incremental de aplicação Next App Router existente.

**Performance Goals**: Sem chamada extra, nova biblioteca, import global ou recálculo; resumo permanece renderizável no servidor.

**Constraints**: Sem alteração científica, schema, API, papéis, idempotência, layout global, dependências ou infraestrutura; sem banco real nem runner Windows local.

**Scale/Scope**: Duas regiões IHFR, dois arquivos E2E existentes, helper de evidência e testes unitários focais.

## Constitution Check

| Gate | Antes da implementação | Depois do desenho |
|---|---|---|
| Fonte técnica e decisão reconciliada identificadas | PASS | PASS |
| Spec exclusiva e branch descendente de S | PASS | PASS |
| Ciência experimental e quatro qualificadores preservados | PASS por requisito | PASS local: unitários e diff |
| Autorização e contratos de domínio intocados | PASS por limite | PASS local: auditoria de diff |
| Escopo mínimo, escritor único, sem dados reais | PASS | PASS |
| Evidência não confundida com aceite científico/operacional | PASS | PASS |

A Spec é EVIDENCIA_IMPLEMENTACAO. Nenhuma exceção constitucional é proposta.

## Project Structure

### Documentation (this feature)

`specs/025-frontend-ihfr/`: spec, plan, research, data-model, quickstart, contracts/ui-preservation.md, tasks, analysis, traceability, evidence e checklist de qualidade.

### Source Code (repository root)

- `src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx`
- `src/components/ihfr-diagnosis/no-current-diagnosis.tsx`
- `src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx`
- `src/components/ihfr-diagnosis/ihfr-presentation.ts`
- `src/components/ihfr-diagnosis/scientific-notice.tsx`
- `tests/unit/frontend-ihfr-presentation.test.tsx`
- `tests/e2e/support/frontend-ihfr-evidence.ts`
- `tests/e2e/ihfr-diagnosis-read.spec.ts`
- `tests/e2e/ihfr-diagnosis-manage.spec.ts`

**Structure Decision**: Reutilizar a fronteira cliente da gestão e a renderização pura do resumo. Helpers locais mapeiam apenas rótulos. Tailwind evita importação CSS incompatível com os testes nativos do resumo. As capturas ampliam cenários já selecionados pelo runner IHFR, sem transferir fixtures dedicadas para a suíte geral.

## Complexity Tracking

Nenhuma violação. Nenhuma camada de estado, persistência, rota, serviço ou biblioteca adicional.

## Sequência e reversibilidade

SPECIFY → PLAN → TASKS → ANALYZE → IMPLEMENT → verificações locais → REVIEW/CONVERGE externo no HEAD final. Os scripts reais `setup-plan.sh`, `setup-tasks.sh` e `check-prerequisites.sh` resolvem a Spec pelo locator local `.specify/feature.json`, que não faz parte do diff compartilhado. Reversão é por commit exclusivo desta frente; o seed S permanece responsabilidade do coordenador.

## Retorno visual da primeira candidata

O CI completo de `a724bf7` passou, porém as imagens demonstraram fragmentação de palavras em 320/200%. O reparo autorizado mantém fonte ampliada e protocolo, reduz apenas o crescimento de padding estreito e permite reflow de títulos com ícones. A prova adicional usa Range por palavra humana, com códigos/hash excluídos, e novas capturas de qualificadores finais e recuperação. T015/T016 separam correção local de revalidação oficial; o fechamento local interrompido por indisponibilidade do executor foi substituído por contingência via API autorizada, sem escrita de ref por este agente. Detalhes em `ci-review-2026-10-21.md`.
