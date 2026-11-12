# Tarefas: apresentação em português

## Preparação e base
- [x] T001 Registrar baseline e requisitos em specs/038-ui-apresentacao-portugues/spec.md.
- [x] T002 Registrar plano, contratos e decisões em specs/038-ui-apresentacao-portugues/plan.md.
- [x] T003 Criar formatadores públicos em src/lib/ui-presentation.ts e src/lib/collection-date-time.ts.

## US1 — Mapa e resumo
- [x] T004 [US1] Priorizar confirmação no mapa em src/components/territorial-map/territorial-map-view.tsx.
- [x] T005 [US1] Compor resumo e escores em src/components/areas/area-collections.tsx.

## US2 — Leitura e detalhe
- [x] T006 [US2] Reordenar blocos em src/components/collections/collection-detail-layout.tsx e collection-detail.tsx.
- [x] T007 [US2] Ajustar cartões, precisão e rótulos em src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx.
- [x] T008 [US2] Atualizar expectativas de apresentação em tests/unit/frontend-ihfr-presentation.test.tsx, tests/unit/hf-ui044-final-corrections.test.tsx e tests/e2e/support/ui044-final-corrections.ts.

## US3 — Português
- [x] T009 [US3] Inventariar textos em src/app, src/components e src/lib; traduzir textos visíveis e rótulos acessíveis sem renomear enums.
- [x] T010 [US3] Verificar papéis e mensagens nos componentes reais de laboratório, conta e administração.

## Verificação e entrega
- [x] T011 Executar verificações pertinentes e registrar em specs/038-ui-apresentacao-portugues/validation.md.
- [x] T012 Revisar diff e preparar branch/PR com escopo e limites em specs/038-ui-apresentacao-portugues/validation.md. O recibo de publicação fica na descrição do PR, após esta validação.

## Dependências e estratégia

T001 → T002 → T003 → US1/US2/US3 → T011 → T012. US1 e US2 compartilham formatadores; tradução em páginas independentes pode ser revisada após a base. Execução sequencial nesta sessão, sem agentes adicionais. Não há nova API nem mudança científica.
