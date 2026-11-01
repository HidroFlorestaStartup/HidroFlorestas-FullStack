# UI-07 — extensão mínima de CEP em contrato compartilhado (proposta histórica, implementada)

**Estado vigente:** `IMPLEMENTADO_VERIFICADO` na implementação sintética do SHA `63925b3639f3eec1dd4bd737f7be7adb881c83eb`, [CI 41251980306/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306), 15/15 gates PASS. **Histórico do pedido:** antes da alocação, `PENDENTE_DE_ALOCACAO_DE_WRITER`; pedido original à PR #45 em https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6547701906; coordenação efetiva no comentário https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6550339752. O diagnóstico e o hunk abaixo são preservados como proposta anterior, **não como estado atual**.

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

## Correção implementada por writer único C — continuidade 2026-10-31

Registro de coordenação na PR #45 [comentário 6550339752](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6550339752). A instrução atual do mantenedor autoriza correções da Frente C, com checks de HEADs A/B e a reserva de hunks compartilhados focal. `area.contracts.ts` passa a aceitar `cep` opcional/nullable, valida e normaliza CEP fornecido; o DTO de resposta inclui `cep`; formulário envia CEP opcional; o service existente persiste `...parsed` na coluna nullable. O teste histórico da spec 003 preserva seu documento original, enquanto `contracts/area-optional-address.openapi.yaml` versiona o delta de UI-07. Regressões e testes em banco sintético cobrem os cenários. **Sem schema/migration/hosted DB e sem tocar os arquivos A/B.** Esta nota só passa a comprovar runtime quando os checks do SHA final forem observados.
