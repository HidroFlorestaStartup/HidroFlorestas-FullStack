# Tarefas: landing e consolidação visual

**Entrada**: spec.md, plan.md, research.md, data-model.md, contracts/navigation.md, quickstart.md.

## Preparação

- [x] T001 Registrar baseline real e fontes em `spec.md`; separar fontes antigas e aprovações humanas.
- [x] T002 Executar os setups do Spec Kit e preencher `plan.md`, `research.md`, `data-model.md` e `contracts/navigation.md`.
- [x] T003 Analisar consistência spec/plano/tarefas e registrar em `validation.md`.

## US1 — Acesso e compreensão

- [x] T004 [US1] Criar cenários públicos reais de âncoras, acesso e teclado em `tests/e2e/frontend-landing.spec.ts`.
- [x] T005 [US1] Implementar marca, landmarks, navegação e jornadas em `src/app/page.tsx`.

## US2 — Limites e contexto

- [x] T006 [US2] Apresentar as quatro qualificações científicas e separar contexto institucional em `src/app/page.tsx`.
- [x] T007 [US2] Documentar alterações de copy e sua origem em `docs/releases/2026-10-21-frontend-rc/estado-e-decisoes.md`.

## US3 — Responsividade e evidência

- [x] T008 [US3] Implementar reflow/foco/movimento reduzido em `src/app/landing.module.css`.
- [ ] T009 [US3] Validar 320/375/768/1440 px, texto 200% e paisagem; preservar e abrir capturas reais, registrando execução em `validation.md`.

## Consolidação e entrega

- [x] T010 Proteger branches landing/agregada e allowlists de CI/artefatos em `vercel.json` e `.github/workflows/rc-review.yml`.
- [x] T011 Registrar triagem INV001–005/OBS001–002 em `docs/releases/2026-10-21-frontend-rc/triagem-historicos.md`.
- [x] T012 Executar validações locais proporcionais e revisar diff/escopo; registrar resultados em `validation.md`.
- [ ] T013 Publicar PR candidata e obter 15 gates oficiais no HEAD publicado, com revisão independente real.
- [ ] T014 Compor candidata agregada e vincular regressão ao SHA exato; registrar handoff operacional com pendências e responsáveis.
- [ ] T015 Obter aceite institucional/humano e homologação operacional/publicação conforme autoridades e acesso reais.

## Dependências

T003 antes de T004–T008. T005/T006 usam somente a página pública; T008 isola CSS. T009/T012 verificam a implementação. T010 deve anteceder qualquer referência remota. T013 depende do CI/revisor; T014 depende também das frentes C1. T015 é gate humano/operacional: não se marca por inferência, documento ou sucesso local.

As frentes C1 possuem branches, specs e agentes próprios e não editam os arquivos compartilhados desta lista.
