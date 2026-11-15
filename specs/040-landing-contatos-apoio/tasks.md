# Tasks: Contatos e apoio institucional

**Input**: [spec.md](spec.md), [plan.md](plan.md), pesquisa e contrato local.

## Phase 1: Setup

- [x] T001 Registrar base 1552348 e branch própria em specs/040-landing-contatos-apoio/validation.md; preservar worktrees anteriores.

## Phase 2: Foundational

- [x] T002 Preparar spec, plano e checklist em specs/040-landing-contatos-apoio/ e consultar os guias instalados aplicáveis.

## Phase 3: US1 — Contatos

**Teste independente**: e-mail e Instagram identificáveis com destinos corretos.

- [x] T003 [US1] Atualizar contato e incluir ícone/link Instagram em src/app/page.tsx.
- [x] T004 [US1] Acomodar os contatos em telas estreitas em src/app/landing.module.css.

## Phase 4: US2 — Identidade e apoio

**Teste independente**: apresentação e apoiadores corretos; coluna Projeto ausente.

- [x] T005 [US2] Atualizar a frase institucional, incluir AGiFMA/FAPEMA e retirar a coluna Projeto em src/app/page.tsx.
- [x] T006 [US2] Reorganizar o rodapé em três colunas no desktop em src/app/landing.module.css.

## Final Phase: Validação e entrega

- [x] T007 Atualizar a verificação existente em tests/e2e/frontend-landing.spec.ts e executar build/lint/typecheck e oito cenários públicos; registrar resultados em specs/040-landing-contatos-apoio/validation.md.
- [x] T008 Revisar diff e preparar pacote da branch/PR para development, com resultados em specs/040-landing-contatos-apoio/validation.md.

## Dependencies & Execution

T001 → T002 → US1 → US2 → T007 → T008. As histórias são verificáveis separadamente; a edição é sequencial porque compartilham os arquivos. Depois do build, lint e inspeção documental podem ser paralelos. MVP: US1, seguido da entrega editorial US2. Não há necessidade de delegação.

## Complemento — nome do mascote — 2026-11-15

- [x] T009 [US3] Exibir Hifro no canto superior direito de src/app/mascot-animation.tsx, com tipografia herdada e estilo local em src/app/landing.module.css.
- [x] T010 [US3] Validar build, lint e a suíte pública existente; conferir nome sobre vídeo/imagem e registrar resultados em specs/040-landing-contatos-apoio/validation.md.

T009 → T010. Alteração incremental na mesma feature e PR, conforme pedido atual.
