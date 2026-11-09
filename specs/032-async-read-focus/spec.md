# Feature Specification: Foco nas leituras assíncronas

**Feature Branch**: `fix/hf-night-async-focus-20261025`

**Created**: 2026-10-25

**Status**: Especificada para correção focal

**Input**: Continuação HF-NIGHT-01, M04/M07: corrigir perda reproduzida de foco na paginação/atualização do histórico e nas novas tentativas de resumo e mapa, sem alterar dados, contexto ou contratos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conservar orientação ao solicitar leitura (Priority: P1)

Como pessoa que usa teclado, quero conservar um foco visível na região consultada enquanto avanço, retorno, atualizo o histórico ou tento novamente resumo/mapa.

**Why this priority**: A investigação reproduziu perda do foco para o corpo da página quando o controle acionado desaparece durante a carga.

**Independent Test**: Em respostas sintéticas atrasadas, ativar por Enter cada ação e observar foco na mesma região durante loading, erro, sucesso e lista vazia.

**Acceptance Scenarios**:

1. **Given** histórico com mais de uma página, **When** aciono Mais antigos, Mais recentes ou Atualizar histórico por teclado, **Then** o foco fica na região do histórico, permanece perceptível enquanto os dados são substituídos e não cai no corpo da página ao concluir.
2. **Given** falha de resumo, histórico ou mapa, **When** aciono Tentar novamente, **Then** a região consultada conserva foco perceptível durante a carga e no resultado de sucesso, vazio ou nova falha.
3. **Given** tela estreita com texto ampliado, **When** solicito a leitura e volto a usar Tab, **Then** alcanço os controles/destinos dessa região sem obstrução do shell nem rolagem horizontal.

### User Story 2 - Respeitar foco posterior e mudança de contexto (Priority: P1)

Como participante, quero continuar navegando durante uma leitura sem que sua resposta mova meu foco ou reintroduza dados de outro laboratório.

**Why this priority**: Recuperar orientação não pode criar disputa de foco nem regressão no isolamento já existente.

**Independent Test**: Mover foco para controle externo durante await; abortar/trocar contexto e liberar respostas antigas; confirmar foco e dados do contexto atual.

**Acceptance Scenarios**:

1. **Given** leitura solicitada por mim, **When** movo foco para outro controle antes da resposta, **Then** sucesso ou falha posterior mantém meu novo foco.
2. **Given** carga inicial sem ação explícita, **When** chegam dados ou erro, **Then** nenhum foco é movido automaticamente.
3. **Given** requisição abortada ou laboratório trocado, **When** a resposta antiga termina, **Then** ela não altera foco nem publica dados antigos; o contexto novo preserva os guards existentes.

### Edge Cases

- Resposta rápida que não chega a desenhar loading; resposta atrasada; erro repetido com a mesma mensagem.
- Histórico sem registros, última página e retorno/atualização com cursores atuais.
- Acionador não possui foco, incluindo ativação programática: não iniciar transferência de foco.
- Usuário move foco ou interage durante a carga: não recuperar foco no fim da resposta.
- Requisição abortada, componente desmontado ou contexto trocado: sem foco tardio.
- Texto a 100/200% em 320,375,768,1440px; foco visível e navegação vertical mantidos.
- Falha de tiles independente dos dados: lista e destinos permanecem disponíveis; não adicionar provedor.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A ação explícita de paginação/atualização/retry MUST transferir o foco do controle acionador focado para uma região estável da própria consulta antes de o controle desaparecer. A região MUST manter nome acessível, foco perceptível e acesso por Tab aos controles existentes.
- **FR-002**: A região MUST preservar sua identidade e foco através dos estados de carregamento, erro, sucesso e vazio; o corpo da página MUST NOT tornar-se o destino de foco devido à substituição dos controles.
- **FR-003**: Carga inicial ou ação cujo acionador não está focado MUST NOT mover foco. Resposta, falha, abort ou conclusão tardia MUST NOT executar recuperação automática de foco.
- **FR-004**: Se a pessoa mover o foco após solicitar a leitura, o resultado MUST preservar essa escolha, inclusive quando a escolha posterior é sair da região consultada.
- **FR-005**: Dados anteriores MUST continuar sendo limpos na nova leitura; autorização, abort, descarte de respostas antigas, cursores e isolamento por laboratório MUST ser preservados. Não reter dados antigos para conservar controles.
- **FR-006**: Foco e controles MUST permanecer alcançáveis sem obstrução ou rolagem horizontal nas quatro larguras definidas e com texto a 200%, mantendo os estados textuais existentes e a alternativa da lista sem tiles.
- **FR-007**: O incremento MUST limitar-se à apresentação local dos três leitores e regressões sintéticas, sem alterar shell, autenticação, API, schema, contratos científicos, tiles ou operação externa.

### Key Entities

- **Região de leitura**: resumo, histórico ou visão territorial existente; alvo transitório de foco, sem persistência nova.
- **Solicitação explícita**: ativação de controle já focado para paginação, atualização ou retry.
- **Contexto atual**: laboratório selecionado e projeção já autorizada; identidade e política de acesso permanecem existentes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em todos os cenários sintéticos de ação explícita focada, o mesmo alvo de região conserva foco perceptível na carga e na conclusão, com zero perda para o corpo da página.
- **SC-002**: Em todos os cenários de foco movido pelo usuário, carga inicial, abort e contexto substituído, ocorrem zero movimentos de foco provocados por resposta tardia.
- **SC-003**: Em 320,375,768,1440px com texto100/200%, a região e os destinos seguintes mantêm acesso, sem overflow horizontal nem ação encoberta.
- **SC-004**: A matriz de paginação/retry conserva cursores, estados e isolamento; mapa sem tiles mantém lista e destinos, sem consulta ou escrita adicional.

## Assumptions

- `FATO_DOCUMENTADO`: o coordenador autorizou a correção em nova branch/spec032 na continuidade de HF-NIGHT-01, 2026-10-25, após triagem das fontes. Nenhuma homologação ou ciência foi concedida.
- `EVIDENCIA_IMPLEMENTACAO`: investigação offline em `daebd71fef7168d4266ea9a6bb7c928ddc295e9b`, cujo código dos três leitores coincide com baseline `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`: oito combinações de paginação e dois retries perderam foco para BODY; dois cenários de mapa sem tiles mantiveram lista/reflow. Revisão independente `/root/fr015/focus_review` analisou as fontes e recibos, sem executar cenários próprios.
- `INFERENCIA`: a perda reproduzida é lacuna MEDIUM/P2 de continuidade frente a [spec007 FR-018](../007-dashboard-history/spec.md), [spec020 FR-002](../020-frontend-laboratory-dashboard/spec.md), [spec008 FR-027](../008-territorial-map/spec.md) e [spec026 FR-005](../026-frontend-territorial-map/spec.md). Não implica bloqueio total ou reprovação universal de acessibilidade.
- `RECOMENDACAO`: região estável focada sincronamente antes da carga é a menor estratégia para conservar orientação sem callbacks que disputem foco. O alvo exato é escolha técnica local, sujeita à validação de geometria e revisão.
- C1 registra IMP-007/IMP-008 presentes com acessibilidade real e aceite humano pendentes. Esta feature não encerra esses eixos globais, não altera CF-PRD-FR-010/CF-PRD-FR-015 ou ciência, e preserva documentação histórica.
