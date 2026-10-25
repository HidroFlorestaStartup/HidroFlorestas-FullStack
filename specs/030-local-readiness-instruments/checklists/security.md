# Security Requirements Quality Checklist: instrumentos locais

**Purpose**: revisão anterior ao código sobre clareza e completude de isolamento, evidência e limites.
**Created**: 2026-10-25
**Feature**: [spec.md](../spec.md)
**Audience/Timing**: coordenador/revisor independente, pré-implementação; seis itens focais.

Reviewer ownership: `[x]` significa aprovação da qualidade do requisito pelo revisor, não teste aprovado nem implementação concluída. O gerador deixa os itens abertos; `$speckit-implement` somente lê este gate.

## Requirement Completeness and Clarity

- [x] CHK001 A exigência de ambiente sintético local, ownership e recusa anterior a efeitos cobre destinos externos, configuração herdada e provedores reais sem termos ambíguos? [Completeness/Clarity, Spec FR-001–002, US2]
- [x] CHK002 A responsabilidade por encerramento do próprio servidor, remoção apenas do schema marcado e tratamento de falha de cleanup está definida inclusive nas exceções? [Coverage, Spec FR-002, US2 cenário2, Plan Constraints]
- [x] CHK003 Os requisitos de sanitização delimitam recibo, erros, consultas e parâmetros de modo consistente com a proibição de credenciais/dados pessoais? [Consistency, Spec FR-005, SC-003, Data Model]

## Acceptance Criteria and Scope

- [x] CHK004 Volume alvo/ruído,10 aquecimentos,100 respostas, método p95 e metas500ms/2s estão quantificados e vinculados às fontes, sem confundir medição de dev com SLA? [Measurability, Spec FR-003–004/SC-001–003, Plan Performance Goals, Research]
- [x] CHK005 Falha de amostra, timeout e meta não atingida têm tratamento explícito, sem omissão de FAIL ou retries automáticos? [Exception Coverage, Spec Edge Cases, FR-005, SC-001, Plan Constraints]
- [x] CHK006 As fronteiras entre investigação, baseline, CI, acessibilidade humana, homologação e ciência estão registradas e são coerentes nas fontes da entrega? [Consistency/Scope, Spec FR-006, Assumptions and Scope, Quickstart]

## Notes

Nenhum resultado de implementação é atribuído a estes itens. A revisão independente do coordenador foi solicitada antes do código. Hooks before/after inexistentes nesta instalação.

Revisão independente de requisitos por /root em 2026-10-25:6/6 satisfeitos após leitura spec/plan/tasks/research/model/quickstart e fonte008§6.2. Metas500ms/2s confirmadas na fonte; guards e sanitização/teardown são obrigações do instrumento. Não é teste executado nem aceite humano. Gate liberado para implementação.
