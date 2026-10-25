# Pesquisa focal — popup de membros

Data: 2026-10-25. Classificação das escolhas técnicas: `RECOMENDACAO`, dentro da execução autorizada de HF-NIGHT-01.

## Projeção existente

- Decision: reutilizar `LaboratoryDetailsDto.members`, sem mudar parser, serviço ou rede.
- Rationale: `EVIDENCIA_IMPLEMENTACAO` em `src/types/laboratory.type.ts` e `src/app/api/server/services/laboratories.service.ts`: cada membro contém apenas `name` e `initials`. Testes existentes comprovam o par nome/iniciais. C1 registra precisamente a ausência do avatar nesta superfície.
- Alternatives considered: derivar iniciais novamente no frontend ou carregar foto; ambas duplicam regras ou acrescentam acesso e não são necessárias.

## Apresentação acessível

- Decision: adicionar span decorativo `aria-hidden=true`, com texto escapado por React, seguido do nome visível, preservando ul/li.
- Rationale: as iniciais são redundantes com o nome; nenhum novo controle ou foco é necessário. `SettingsDialog` já usa dialog nativo, showModal, captura Tab e devolve foco ao acionador.
- Alternatives considered: imagem com texto alternativo ou button por membro criariam redundância ou ação inexistente. Avatar compartilhado não é necessário para uma única lacuna.

## Dados incompletos e limites

- Decision: usar trim periférico, `?` para iniciais vazias e `Nome não informado` para nome vazio. Não inventar iniciais nem identidade; nomes extensos quebram e não são truncados. Avatar circular 36px com tons neutros uniformes.
- Rationale: o parser aceita strings vazias, portanto o popup precisa permanecer compreensível. O scroll vertical existente do dialog mantém a lista longa acessível.
- Alternatives considered: ignorar o membro ou fabricar nome a partir de identificador afetaria a projeção; ambos rejeitados.

## Verificação isolada

- Decision: usar o padrão Playwright/esbuild de `tests/ui`, interceptando todas as requisições com dados sintéticos e proibindo egress externo.
- Rationale: o delta é de apresentação; não requer banco nem fluxo real de autenticação. O teste exercita o componente/estilos/teclado reais e conserva limites explícitos de homologação.
- Alternatives considered: E2E com fixtures persistidas exigiria infraestrutura sem ganho material para este delta; teste de texto estático não demonstra foco, rolagem ou layout.
