# Modelo de leitura existente

`EVIDENCIA_IMPLEMENTACAO`: `LaboratoryDetailsDto` em `src/types/laboratory.type.ts` contém `members: LaboratoryMemberDto[]`; cada membro tem `name: string` e `initials: string`.

A feature029 lê essas strings. Não cria, persiste ou modifica membros. A ordem e cardinalidade recebidas são preservadas, inclusive duplicatas de nome. O parser e a allowlist existente continuam obrigatórios. Nenhum ID de membro, foto, e-mail, papel ou campo privilegiado é introduzido no popup.

`RECOMENDACAO`: trim periférico e fallbacks são somente apresentação; não mudam DTO, banco ou identidade. Não há transição de estado nova.
