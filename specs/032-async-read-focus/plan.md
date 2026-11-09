# Implementation Plan: Foco nas leituras assíncronas

**Branch**: `fix/hf-night-async-focus-20261025` | **Date**: 2026-10-25 | **Spec**: [spec.md](spec.md)

**Input**: Continuidade HF-NIGHT-01 M04/M07, spec032.

## Summary

`RECOMENDACAO`: foco síncrono no handler de ação explícita para a região raiz persistente antes de limpar os dados. Summary/history usam o mesmo SECTION raiz nas ramificações de loading/erro/sucesso; adicionar ref e tabIndex=-1 em todas, nome acessível e outline próprio. O mapa já tem DIV raiz permanente, que receberá role=region e rótulo ligado ao h1 persistente. Não mover foco em callbacks/effects de resposta. Helper puro pequeno compartilhado verifica trigger===document.activeElement antes de focar.

## Technical Context

**Language/Version**: TypeScript5, React19.2.4, Node24.19.0.
**Primary Dependencies**: Next16.3.8, CSS Modules, Playwright1.55.1/esbuild existentes; nenhuma dependência nova.
**Storage**: nenhuma alteração/acesso.
**Testing**: navegador offline com componente/shell/CSS reais, respostas sintéticas, egress bloqueado, captura viewport; lint/TypeScript e revisão React.
**Target Platform**: Chromium desktop/móvel;320,375,768,1440px com texto100/200%.
**Project Type**: incremento local de apresentação em Next App Router.
**Performance Goals**: zero leituras extras, timers/listeners globais ou ciclos de foco por resposta.
**Constraints**: não alterar shell/auth/API/schema/contratos/tiles/globals/deps/vercel; não reter dados anteriores; preservação de abort/contexto/cursores.
**Scale/Scope**: três leitores, dois CSS Modules, um helper puro e regressões offline.

## Constitution Check

Pré-pesquisa e pós-design: sete princípios PASS. I: pedido atual e specs007/020/008/026 sustentam foco; II: correção de defeito reproduzido, sem infraestrutura futura; III: artefatos somente spec032; IV: evidência/INFERENCIA/RECOMENDACAO separadas; V: dados sintéticos e sem acesso externo; VI: histórico e docs/raw preservados; VII: branch/worktree exclusiva af, sem arquivos do PR34 ou outros autores. Nenhum desvio ou decisão científica.

## Project Structure

### Documentation (this feature)

```text
specs/032-async-read-focus/
  spec.md
  plan.md
  research.md
  data-model.md
  contracts/read-focus.md
  quickstart.md
  checklists/requirements.md
  checklists/accessibility.md
  tasks.md
  implementation-evidence.md
```

### Source Code (repository root)

```text
src/components/async-read-focus.ts
src/components/dashboard/dashboard-summary.tsx
src/components/dashboard/dashboard-history.tsx
src/components/dashboard/dashboard.module.css
src/components/territorial-map/territorial-map-view.tsx
src/components/territorial-map/territorial-map.module.css
tests/ui/async-read-focus.spec.ts
tests/ui/async-read-focus.config.ts
```

**Structure Decision**: helper de DOM sem estado, sem hook genérico ou infraestrutura. Único autor destes caminhos. Testes reaproveitam somente o harness sintético investigado pelo autor, com Next/link/dynamic/navigation/image substituídos apenas para montagem offline e fonte de fallback local; aplicação/shell/CSS/Leaflet reais. Não é Next/DB end-to-end.

## Phase 0: Research

[research.md](research.md) registra identidade React de root, padrões de foco locais e crítica independente de /root/fr015/focus_review. Sem perguntas materiais pendentes. Ler os guias Next locais antes do código. Estratégia alternativa de heading persistente somente se testes demonstrarem geometria inadequada da região; nenhum hook de recuperação tardia é previsto.

## Phase 1: Design & Contracts

[data-model.md](data-model.md) não altera DTO; [contracts/read-focus.md](contracts/read-focus.md) define transição de foco independente da resposta. [quickstart.md](quickstart.md) orienta testes RED/GREEN. Cada teste deve provar mesma identidade da região, nome e outline após ciclo, além de usuário livre para sair durante await.

## Phases and Validation

Spec→plan→checklist→tasks→analyze somente leitura→revisão explícita root→implement→converge. Aplicar primeiro testes e confirmar RED no baseline. Verificar success/zero/repeatederror/fast/delayed/abort/context replacement/no initialfocus/no steal. Matriz de reflow com texto200% e tiles bloqueados mantém lista. Review React obrigatório após três TSX editados. Sem commit/push/PR pelo autor.
