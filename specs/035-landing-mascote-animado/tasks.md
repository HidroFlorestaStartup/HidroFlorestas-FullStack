# Tarefas: mascote animado no herói

**Entrada**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md)

## Fase 1 — Preparação

- [x] T001 Criar `codex/landing-mascote-animado` sobre `origin/development` e preservar o estado inicial em `specs/035-landing-mascote-animado/plan.md`.

## Fase 2 — US1: animação do mascote

- [x] T002 [US1] Gerar vídeo transparente reduzido em `public/media/hifro-mascote-hero.webm` e poster em `src/assets/lading-page/hifro-mascote-poster.webp`.
- [x] T003 [US1] Substituir a árvore por Hifro em `src/app/page.tsx` e aplicar o layout em `src/app/landing.module.css`.

## Fase 3 — US2: fallback e desempenho

- [x] T004 [US2] Implementar reprodução condicional, pausa e fallback em `src/app/mascot-animation.tsx`.

## Fase 4 — Validação

- [x] T005 Verificar mídia, layout, lint, typecheck, build e diff; registrar resultados e o bloqueio global em `specs/035-landing-mascote-animado/validation.md`.

## Fase 5 — US3: equipe e competências

- [x] T006 [US3] Substituir os dois blocos da equipe por três grupos e 11 nomes em `src/app/page.tsx`.
- [x] T007 [US3] Adaptar a grade da equipe em `src/app/landing.module.css` para telas largas e estreitas.
- [x] T008 [US3] Validar nomes, layout, lint e diff; registrar resultados em `specs/035-landing-mascote-animado/validation.md`.
- [x] T009 [US3] Reordenar os três grupos em `src/app/page.tsx` com coordenação científica em primeiro lugar.
- [x] T010 [US3] Aplicar três colunas no desktop em `src/app/landing.module.css` e validar a composição responsiva em `specs/035-landing-mascote-animado/validation.md`.

## Dependências

T001 → T002 → T003 → T004 → T005. A US1 pode ser observada no herói; a US2 pode ser verificada isoladamente com movimento reduzido, economia de dados ou falha de vídeo.
