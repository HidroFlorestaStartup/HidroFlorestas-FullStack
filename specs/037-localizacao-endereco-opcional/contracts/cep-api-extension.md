# UI-07 — extensão mínima de CEP em contrato compartilhado (proposta, NÃO APLICADA)

**Estado:** PENDENTE_DE_ALOCACAO_DE_WRITER. Recorte C — PR #48; pedido enviado ao coordenador na PR #45, comentário https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6547701906.

## Diagnóstico e autoridade

A spec 003 (histórica) excluía CEP do contrato mínimo, mesmo com a coluna `CollectionArea.cep String?` persistida como campo nullable. A decisão atual e explícita UI-07 da PR #44 exige CEP opcional e editável. O parser `parseAreaInput` do HEAD atual rejeita `cep`; o service já insere `...parsed`. O formulário C exibe CEP para revisão, mas **não o envia nem o persiste**, e avisa isso. Alterações da API/DTO/schema/tests comuns exigem writer alocado pelo coordenador, sem edição concorrente nesta frente.

## Hunk mínimo a ser aplicado pelo writer designado

1. `src/app/api/server/areas/area.contracts.ts`: adicionar `cep: string|null` a `CreateAreaInput`, adicionar `cep` à allowlist; tratar `null`/ausência/`""` como `null`, permitir `NNNNNNNN` ou `NNNNN-NNN` com tamanho máximo 9 e normalizar para `NNNNN-NNN`; rejeitar tipos inválidos, campos privilegiados e CEP malformado com 400. Incluí-lo em `serializeAreaSummary` e `serializeAreaDetail` como `string|null`, sem dados pessoais legados.
2. `src/types/area.type.ts`: adicionar `cep:string|null` ao `AreaSummaryDto` (o detalhe herda). `src/app/api/server/services/areas.service.ts` usa `...parsed` e não precisa de alteração, apenas teste sintético de escrita/leitura.
3. `src/components/areas/area-form.tsx`: após o parser aceitar CEP, incluir `cep: form.get("cep")` no corpo do POST, remover aviso transitório de não persistência; manter envio de campos vazios permitido.
4. Contrato OpenAPI atual: aditivo versionado em `specs/037-localizacao-endereco-opcional/contracts/`. **Não reescrever** a fonte histórica da spec 003 sem decisão de manutenção explícita; adaptar verificações do contrato corrente.
5. Atualizar regressões pertinentes `tests/unit/area-contracts.test.ts`, `tests/unit/area-openapi-contract.test.ts`, `tests/e2e/area-registration.spec.ts` e novos casos de persistência sintética para 0/1/2/3 campos opcionais, inclusive CEP ausente, parcial, 429/timeout. Preservar exclusão de `userId`, `creator`, `isActive`, `image` e demais campos privilegiados. Validar status 201/200, DTO e banco; **nenhuma migration nova é necessária**.
6. Reinspecionar A #46/B #47 e reconciliar contratos antes de aplicar; writer único, diff e SHA documentados. Não usar Neon/migration hosted ou provedor real.

## Gate de aceite do patch

`CEP_PERSISTENCE_VERIFIED` exige teste de POST + GET + armazenamento em banco PostgreSQL sintético para CEP presente e ausente, contrato 400 para CEP inválido, CI no HEAD composto e ausência de drift em autorização/DTO. Este arquivo é uma proposta técnica, não aceite/autorização de integração.
