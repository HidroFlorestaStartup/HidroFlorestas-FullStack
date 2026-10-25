# UX Checklist: Iniciais dos membros no popup geral

**Purpose**: Revisão de qualidade dos requisitos de apresentação, acesso e limites por revisor técnico antes da implementação.
**Created**: 2026-10-25
**Feature**: [spec.md](../spec.md)

**Note**: Checklist customizado gerado por speckit-checklist; profundidade padrão, foco em UX/acessibilidade e projeção mínima.
**Review Ownership**: Pertence ao revisor; somente avaliação explícita de qualidade dos requisitos permite marcar `[x]`.
**Marker Semantics**: `[x]` significa requisito claro e completo para o revisor, não implementação concluída ou teste executado.

## Requirement Completeness and Clarity

- [x] CHK001 A superfície geral e a origem FR-015 da spec002 estão distinguidas da gestão OWNER e de CF-PRD-FR-015 territorial? [Clarity, Spec §Assumptions, FR-001]
- [x] CHK002 Nome, iniciais, ordem, cardinalidade e nomes repetidos estão definidos sem novos dados pessoais? [Completeness, Spec §FR-001, FR-006]
- [x] CHK003 Os fallbacks de nome/iniciais vazios e a preservação de acentos estão definidos de forma determinística? [Clarity, Spec §FR-002]

## Accessibility and Scenario Coverage

- [x] CHK004 A natureza decorativa, ausência de interação/foco e semântica textual da lista estão explícitas? [Coverage, Spec §FR-003, US2/AC1]
- [x] CHK005 Os requisitos abrangem abertura por teclado, Tab/Shift+Tab, Escape e devolução de foco ao acionador? [Completeness, Spec §FR-005, US2/AC2]
- [x] CHK006 As larguras, nomes longos e acesso vertical de todos os membros têm critérios objetivos de aceite? [Measurability, Spec §FR-004, SC-002]

## Scope and Consistency

- [x] CHK007 Lista vazia, strings só com espaços e nomes como marcação estão cobertos sem fabricar membros ou identidade? [Edge Cases, Spec §Edge Cases, FR-002]
- [x] CHK008 A exclusão de novos vínculos, convites, persistência e comunicação externa está consistente entre spec e plano? [Consistency, Spec §FR-006, Plan §Constraints]

## Notes

Gerados 8 itens, todos sem marcação; aguardam revisor. speckit-implement lê este estado e não modifica os marcadores. O checklist embutido requirements.md segue seu ciclo próprio de validação da especificação.

Revisão independente de requisitos: /root, 2026-10-25. Oito critérios satisfeitos por spec/plan/contrato. Isso não é teste nem aceite humano. Gate liberado para implementação autorizada.
