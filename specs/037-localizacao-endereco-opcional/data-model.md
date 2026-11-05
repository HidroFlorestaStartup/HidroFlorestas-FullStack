# Modelo de dados focal — Spec 037

Entidade existente: `CollectionArea` no Prisma.

| Campo | Persistência existente | Novo contrato UI-07 |
| --- | --- | --- |
| `id`, `laboratoryRoomId`, `userId` | Identificadores/relacionamentos existentes | Derivados no backend; proibidos no payload |
| `latitude`, `longitude` | Decimal(8,6) / Decimal(9,6) obrigatórios | Coordenadas válidas obrigatórias; 3 formas de origem |
| `municipality` | String? | `string|null`, opcional |
| `state` | String? | `string|null`, opcional |
| `cep` | **String? já existente** | `string|null`, opcional; quando fornecido, 8 dígitos com hífen normalizado |
| `landType`, `description` | String? | Não alterados |

**Transição de endereço sugerido:** `unset -> suggested` ou `manual`; mudar ponto remove apenas valor sugerido e preserva edição manual. `lookupStatus` exibe idle/loading/ready/empty/unavailable. Resposta assíncrona com revision obsoleta é descartada.

Sem tabela, migration, upload, mudança de índice, dados científicos, alterações em membros/autorização ou provider externo.
