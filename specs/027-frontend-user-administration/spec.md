# Feature Specification: Administração global — apresentação e revisão de contas

**Feature Branch**: `feat/frontend-user-administration`
**Created**: 2026-10-21
**Status**: CANDIDATA_LOCAL; execução e evidências em [tasks.md](tasks.md).
**Input**: C1 conciliada, fase 9B; incorporar apresentação do starter sem substituir contratos da IMP-009.

## User Scenarios & Testing

### User Story 1 — Encontrar e consultar uma conta (Priority: P1)

Como administrador global ativo, quero pesquisar contas e reconhecer o papel global, o estado e a conta selecionada, em telas pequenas e grandes.

**Why this priority**: identificar o alvo correto precede qualquer alteração de acesso.
**Independent Test**: listar, filtrar, avançar e voltar páginas, abrir duas contas com respostas fora de ordem; nenhuma informação da primeira pode aparecer como pertencente à segunda.

**Acceptance Scenarios**:
1. **Given** contas reais autorizadas, **When** pesquisar nome/e-mail e filtrar papel/estado, **Then** a lista apresenta somente a resposta mais recente e os campos possuem rótulos persistentes.
2. **Given** mais de uma página, **When** avançar, voltar ou alterar filtro, **Then** o cursor continua opaco e a mudança de filtro reinicia a paginação.
3. **Given** consultas simultâneas de contas diferentes, **When** a resposta anterior chega por último, **Then** detalhe e auditoria continuam vinculados à seleção atual.
4. **Given** falha ou lista vazia, **When** consultar, **Then** a tela diferencia carregamento, ausência e erro com ação de repetição.

### User Story 2 — Revisar uma alteração sem perder a versão atual (Priority: P1)

Como administrador global, quero confirmar outra conta, o valor anterior, o novo valor e uma justificativa, podendo cancelar com segurança.

**Why this priority**: mudanças de acesso exigem decisão explícita e preservação de concorrência.
**Independent Test**: abrir diálogo por teclado, cancelar, provocar alteração concorrente real, atualizar dados e confirmar usando a revisão atual.

**Acceptance Scenarios**:
1. **Given** uma conta selecionada, **When** abrir uma mudança de papel ou estado, **Then** o diálogo mostra antes/depois, recebe foco e exige justificativa.
2. **Given** diálogo aberto, **When** cancelar ou pressionar Escape, **Then** não há gravação e o foco retorna ao acionador.
3. **Given** uma gravação em curso, **When** interagir repetidamente, **Then** a tela mantém uma única submissão ativa e desabilita alterações dos seus dados.
4. **Given** conflito de versão, **When** atualizar os dados, **Then** o detalhe atual é consultado e uma nova confirmação usa sua revisão atual; carregar somente a lista não satisfaz o cenário.
5. **Given** erro de proteção do último administrador ou autoalteração, **When** o servidor recusar, **Then** a tela apresenta a orientação recebida sem inventar sucesso nem contornar a restrição.

### User Story 3 — Navegar e compreender o histórico (Priority: P2)

Como administrador global, quero reencontrar a auditoria da conta e navegar sem controles cobertos em celular, paisagem ou texto ampliado.

**Why this priority**: leitura e cancelamento precisam funcionar além do desktop.
**Independent Test**: percorrer visão geral, usuários, workspace e sair; inspecionar o último controle do diálogo em 320/375/768/1440 px e texto 200%.

**Acceptance Scenarios**:
1. **Given** evento concluído, **When** consultar a conta, **Then** são apresentados tipo, antes/depois, justificativa e instante já autorizados pela auditoria existente.
2. **Given** viewport estreita ou texto ampliado, **When** navegar ou confirmar/cancelar, **Then** o conteúdo reflui, os controles permanecem alcançáveis e a navegação não depende de altura fixa.
3. **Given** usuário sem autoridade global, **When** acessar a rota ou API, **Then** os controles de servidor existentes continuam negando acesso; papel de laboratório não concede autoridade.

### Edge Cases

- Respostas atrasadas de busca, detalhe e histórico; desmontagem durante leitura.
- E-mail/nome longo; lista sem resultados; falha ao buscar mais eventos.
- Mudança concorrente já colocou a conta no valor desejado: exibir estado atual, sem exigir nova mutação fictícia.
- Falha de rede após envio: exigir releitura antes de nova confirmação, preservando a revisão observada.
- A decisão histórica sobre retornar uma conta para PENDING permanece intacta.

## Requirements

### Functional Requirements

- **FR-001**: Preservar autoridade global atual e separação de papéis de laboratório, rotas canônicas e projeções seguras da IMP-009.
- **FR-002**: Exibir busca/filtros rotulados, cursor opaco, retorno à página anterior, estados de lista e contagem apenas dos itens da página recebida.
- **FR-003**: Descartar respostas de leituras superadas e limpar a auditoria imediatamente ao trocar a conta.
- **FR-004**: Reconsultar o detalhe real para confirmar a versão da conta; após conflito, a releitura atualiza a conta selecionada antes de permitir nova confirmação.
- **FR-005**: Preservar alteração de papel/estado com versão esperada e justificativa, proteção de autoalteração e do último administrador, e auditoria atômica existente.
- **FR-006**: Confirmar em diálogo com foco, contenção de teclado, Escape/cancelamento sem mutação e feedback textual; bloquear reenvio enquanto houver gravação ativa.
- **FR-007**: Apresentar histórico real do alvo atual com paginação e erro/retry, incluindo justificativa já presente na projeção autorizada.
- **FR-008**: Oferecer visão geral, lista/detalhe e navegação responsivos, rótulos de papel global e estado em todos os tamanhos, sem números ou capacidades demonstrativas.
- **FR-009**: Preservar nome/marca/fonte e contratos reais, adaptando somente a composição visual da fonte de referência.

### Key Entities

- Conta administrativa existente: identidade, papel global, estado e revisão concorrente.
- Alteração proposta: tipo, novo valor e justificativa; não é persistida antes da confirmação.
- Evento administrativo: registro existente e imutável do resultado concluído.
- Página de consulta: itens e cursor fornecidos pela fonte existente; não é um total global.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Nenhuma resposta atrasada exibe dados de outra seleção nos cenários de corrida de leitura.
- **SC-002**: Cancelamentos produzem zero gravações; conflitos nunca produzem indicação de sucesso e a confirmação seguinte usa dados atualizados.
- **SC-003**: Todas as ações essenciais são alcançáveis por teclado nos cenários automatizados, inclusive último controle do diálogo, em 320/375/768/1440 px, paisagem e texto 200%.
- **SC-004**: Nenhum fluxo administrativo modifica autoridade, contratos, regras de negócio ou dados fora das operações existentes.

## Assumptions

- A IMP-009 e as fases anteriores integradas são o contrato de comportamento.
- Ciência, serviços, schema, autenticação, bibliotecas e infraestrutura compartilhada estão fora desta frente.
- Capturas usam contas sintéticas; automação não substitui aceite humano ou leitor de tela real.
- A fonte visual cbb954a7 é apoio de composição, sem dados fictícios no produto.
