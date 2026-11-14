# Tarefas da landing institucional

## Preparação

- [x] T001 Registrar baseline e decisões em specs/039-landing-proposta-startup/spec.md.
- [x] T002 Planejar composição e validação em specs/039-landing-proposta-startup/plan.md.

## US1 — Proposta e soluções

- [x] T003 [US1] Atualizar abertura, Paradoxo e projeto em src/app/page.tsx.
- [x] T004 [US1] Adaptar estilos locais em src/app/landing.module.css.

## US2 — Plataforma e painel

- [x] T005 [US2] Reorganizar passos e painel ilustrativo com IA futura em src/app/page.tsx.

## US3 — Impacto e contato

- [x] T006 [US3] Adicionar ODS e contato, preservando equipe, em src/app/page.tsx.

## Validação e entrega

- [x] T007 Atualizar expectativas antigas da landing em tests/e2e/frontend-landing.spec.ts.
- [x] T008 Validar build, lint, tipos, navegadores e escopo; registrar em specs/039-landing-proposta-startup/validation.md.

Dependências: T001 → T002 → T003/T004 → T005 → T006 → T007 → T008. As histórias compartilham page.tsx; execução sequencial evita disputa. MVP: apresentação institucional da US1, seguida do restante da composição no mesmo recorte. Não há tarefas de novas suítes ou infraestrutura.

## Revisão após prévia

- [x] T009 [US1] Restaurar textos literais de O desafio e mover parágrafos em src/app/page.tsx.
- [x] T010 [US2] Tornar propósito/nome/textos do painel coerentes e reformular IA em src/app/page.tsx.
- [x] T011 Atualizar estilos e expectativas afetadas em src/app/landing.module.css e tests/e2e/frontend-landing.spec.ts.
- [x] T012 Conferir a nova composição em navegador e registrar resultados em specs/039-landing-proposta-startup/validation.md.
