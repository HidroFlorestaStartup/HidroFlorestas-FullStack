# Feature Specification: Iniciais dos membros no popup geral

**Feature Branch**: `fix/hf-night-fr015-20261025`

**Created**: 2026-10-25

**Status**: Especificada para implementação focal

**Input**: Missão HF-NIGHT-01: corrigir a menor lacuna de FR-015 no popup geral de membros, reutilizando os dados atuais, com acessibilidade, teclado, foco e responsividade.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identificar membros na consulta geral (Priority: P1)

Como pessoa vinculada ao laboratório, quero consultar seus membros com nome e avatar neutro de iniciais no popup de configurações acessível pelo workspace.

**Why this priority**: Fecha a lacuna C02 localizada na conciliação C1, sem ampliar a gestão de vínculos.

**Independent Test**: Com membros sintéticos, abrir Configurações e conferir nome e iniciais lado a lado, inclusive nomes acentuados, longos ou ausentes.

**Acceptance Scenarios**:

1. **Given** uma lista com `Ágata Çedro` e iniciais `ÁÇ`, **When** as informações são abertas, **Then** o nome completo e o avatar com `ÁÇ` aparecem juntos.
2. **Given** nome longo sem espaços ou nome vazio, **When** a lista é apresentada a 320px, **Then** o nome longo quebra dentro do popup; nome vazio apresenta `Nome não informado`; iniciais vazias apresentam `?` sem inventar identidade.
3. **Given** vários membros, inclusive nomes repetidos, **When** a lista ultrapassa a altura disponível, **Then** todos continuam acessíveis pela rolagem do popup e a ordem recebida é preservada.

### User Story 2 - Consultar por teclado e tecnologia assistiva (Priority: P2)

Como pessoa que usa teclado ou leitor de tela, quero consultar os nomes e sair do popup conservando a navegação e o foco existentes.

**Why this priority**: O novo avatar não deve criar parada de foco nem repetir desnecessariamente a identidade anunciada.

**Independent Test**: Abrir Configurações por Enter, percorrer controles com Tab/Shift+Tab, fechar por Escape e confirmar retorno do foco ao acionador.

**Acceptance Scenarios**:

1. **Given** o popup aberto por teclado, **When** os membros são apresentados, **Then** a lista conserva semântica de lista e nome em texto, enquanto os avatares são decorativos e não recebem foco.
2. **Given** o popup carregado, **When** Tab/Shift+Tab ou Escape são usados, **Then** o foco permanece nos controles do popup durante sua abertura e retorna a Configurações ao fechar, sem parada adicional nos avatares.

### Edge Cases

- Nome composto, acentuado ou com conteúdo semelhante a marcação permanece texto literal.
- Iniciais recebidas são exibidas como fornecidas após remover espaços nas extremidades; nenhuma derivação de identidade por nome é necessária.
- Nome e iniciais vazios ou compostos apenas de espaços têm os fallbacks definidos em US1/AC2.
- Lista vazia continua vazia, sem fabricar membros ou alterar estados de carga/erro.
- Nomes longos e muitos membros não causam rolagem horizontal a 320px e 1280px; avatares permanecem reconhecíveis e os textos não são truncados.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A consulta geral MUST mostrar, para cada membro recebido, apenas o nome e um avatar neutro com suas iniciais; manter a ordem e permitir nomes repetidos. Referência de origem: IMP-002/spec002 FR-015.
- **FR-002**: Nome e iniciais MUST preservar caracteres acentuados e ser tratados como texto. Campos vazios após remoção de espaços periféricos MUST usar `Nome não informado` e `?`, respectivamente, sem derivar outros dados pessoais.
- **FR-003**: Avatares MUST ser decorativos, sem papel interativo ou parada de teclado, mantendo os nomes na semântica de lista e sem duplicar seu anúncio.
- **FR-004**: A lista MUST acomodar nomes longos sem truncamento nem rolagem horizontal nas larguras de 320px e 1280px e manter todos os membros acessíveis pela rolagem vertical existente.
- **FR-005**: Abrir e fechar por teclado, confinamento de foco e retorno ao acionador MUST ser preservados.
- **FR-006**: A mudança MUST reutilizar exclusivamente os dados da consulta atual, sem alterar autorização, papéis, vínculo, ingresso, convites, persistência ou necessidade de comunicação externa.

### Key Entities

- **Membro consultável**: par de nome e iniciais já fornecido pela consulta geral; não introduz entidade persistida nem campos privados.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em todas as linhas do conjunto sintético, nome e avatar aparecem juntos, com acentos preservados e fallbacks determinísticos.
- **SC-002**: Nos dois tamanhos definidos, nenhuma linha ultrapassa a largura interna do popup; todos os membros permanecem alcançáveis na lista longa.
- **SC-003**: Abrir por Enter, ciclar o foco com Tab/Shift+Tab e fechar com Escape retorna ao acionador, sem foco nos avatares.
- **SC-004**: A consulta continua apresentando somente nome e iniciais dos membros e não acrescenta comunicação externa para construir avatares.

## Assumptions

- `FATO_DOCUMENTADO`: o pedido HF-NIGHT-01 de 2026-10-25 autoriza esta correção focal. Não concede aceite humano, homologa operação nem altera ciência.
- `FATO_DOCUMENTADO`: [C1](../../docs/code-first-prd/implementation/estado-conciliado-20261024.md) identifica C02 como parcial nas iniciais do popup; a gestão OWNER é outra superfície.
- `EVIDENCIA_IMPLEMENTACAO`: baseline `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, com árvore inicialmente limpa; a consulta já entrega nome/iniciais. [Spec002 FR-015](../002-criar-laboratorio/spec.md), `CF-PRD-FR-003` e IMP-002 são referências de rastreabilidade; `CF-PRD-FR-015` refere-se a território e não é este requisito.
- `RECOMENDACAO`: os fallbacks, avatar decorativo e limites visuais são escolhas técnicas mínimas para dados incompletos e acesso, dentro do mandato; não representam ampliação de UX/produto.
- Não há dependência material de serviços reais, banco, SMTP ou decisões científicas. Fontes históricas e `docs/raw/**` permanecem imutáveis.
