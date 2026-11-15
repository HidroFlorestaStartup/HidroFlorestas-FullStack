# Feature Specification: Contatos e apoio institucional da landing

**Feature Branch**: `codex/landing-contatos-apoio`
**Created**: 2026-11-14
**Status**: Implementada; aceite visual pendente
**Input**: Pedido de Pedro nesta conversa: retirar Projeto do rodapé, atualizar e-mail, adicionar Instagram com ícone, incluir AGiFMA/FAPEMA e apresentar a HidroFlorestas como startup nascida no IFMA.

## User Scenarios & Testing

### User Story 1 - Encontrar os contatos atuais (Priority: P1)

Como visitante, quero acessar os canais oficiais pelo rodapé.
**Why this priority**: Evitar que o visitante use o endereço antigo.
**Independent Test**: Conferir texto e destino dos dois contatos.
**Acceptance Scenarios**:
1. Ao consultar Contato, vejo `startup.hidroflorestas.ifma@gmail.com`, que abre uma mensagem para esse endereço.
2. Vejo o ícone do Instagram antes de `@startup.hidroflorestas`, com acesso ao perfil informado.

### User Story 2 - Conhecer a startup e seus apoiadores (Priority: P2)

Como visitante, quero ler a apresentação atual e identificar o apoio institucional.
**Why this priority**: Manter a identidade institucional coerente.
**Independent Test**: Ler a apresentação e o rodapé.
**Acceptance Scenarios**:
1. A apresentação diz “A HidroFlorestas é uma startup nascida no IFMA Campus Itapecuru-Mirim, voltada à segurança hídrica, ao diagnóstico ambiental e à restauração produtiva no Maranhão.”
2. Apoio institucional mantém os nomes atuais e inclui AGiFMA e FAPEMA.
3. O rodapé não contém a coluna Projeto nem o edital/período antes exibidos nela.

### User Story 3 - Identificar o mascote (Priority: P3)

Como visitante, quero conhecer o nome do mascote apresentado na animação.
**Why this priority**: Complemento editorial solicitado por Pedro em 2026-11-15, na mesma branch.
**Independent Test**: Conferir o nome na abertura da landing.
**Acceptance Scenarios**:
1. Vejo “Hifro” no canto superior direito, dentro da animação, usando a tipografia e a paleta vigentes.
2. O nome continua visível com a imagem estática quando a animação não toca, inclusive em telas pequenas e com texto ampliado.

### Edge Cases

- O e-mail longo deve continuar legível em telas estreitas e texto ampliado.
- O Instagram deve permanecer identificável por texto quando o ícone não é anunciado.

## Requirements

### Functional Requirements

- **FR-001**: Exibir o novo e-mail e fornecer acesso à composição de mensagem para ele.
- **FR-002**: Exibir `@startup.hidroflorestas`, com ícone antes do nome, e abrir o perfil correspondente.
- **FR-003**: Retirar somente a coluna Projeto do rodapé, preservando a seção Nossa solução.
- **FR-004**: Acrescentar AGiFMA e FAPEMA ao apoio institucional, preservando os nomes existentes.
- **FR-005**: Atualizar somente a primeira frase institucional para a redação de US2.
- **FR-006**: Preservar a paleta e a leitura responsiva da landing, além dos fluxos da plataforma.

- **FR-007**: Apresentar “Hifro” dentro da animação, preferencialmente no canto superior direito, sem cobrir o rosto nem mudar a reprodução do vídeo.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Os dois canais exibem os destinos solicitados, sem o e-mail anterior no rodapé.
- **SC-002**: Os cinco ajustes solicitados estão visíveis, com zero colunas Projeto no rodapé.
- **SC-003**: A página pode ser lida sem rolagem horizontal em larguras de 320 a 1440 pixels, inclusive a 320 pixels com texto em 200%.

- **SC-004**: O nome permanece legível e contido na animação de 320 a 1440 pixels, inclusive com texto em 200%.

## Assumptions

- DECISAO_CONFIRMADA: o pedido de Pedro em 2026-11-14 é a origem das alterações editoriais.
- RECOMENDACAO adotada: usar o endereço canônico do Instagram, sem o parâmetro de compartilhamento.
- Os nomes AGiFMA e FAPEMA serão apresentados como fornecidos, sem inventar logotipos ou descrições.
- Rastreabilidade: continuação editorial da spec 039; nenhum requisito científico ou de domínio é modificado.
