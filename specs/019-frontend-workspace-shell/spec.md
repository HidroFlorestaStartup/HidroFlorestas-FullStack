# Feature Specification: Workspace, navegação e shell
**Feature Branch**: `feat/frontend-workspace-shell`
**Created**: 2026-10-18
**Status**: IMPLEMENTADO_E_VALIDADO_TECNICAMENTE; aceite humano pendente.
**Input**: Fase3 do pedido atual e handoff de Pedro de18/10/2026, lido em origin/docs/handoff-frontend-fases-2-3, sem merge documental.

## User Scenarios & Testing *(mandatory)*
### User Story 1 - Escolher e gerir laboratório (Priority: P1)
Como participante, reencontro meus vínculos, escolho explicitamente um contexto e uso criação/configurações reais.
**Why this priority**: entrada para o trabalho sem contexto implícito.
**Independent Test**: conta sem laboratório vê estado vazio; criação persiste após reload e não navega automaticamente.
**Acceptance Scenarios**:
1. **Given** conta sem vínculos, **When** abre workspace, **Then** vê criação real e convite apenas indisponível.
2. **Given** vínculos ativos/inativos, **When** escolhe acessar, **Then** URL contém o laboratório escolhido; voltar ao workspace não escolhe outro.
3. **Given** cinco vínculos incluindo inativos, **When** tenta criar, **Then** interface e servidor mantêm o limite.
4. **Given** OWNER, **When** abre configurações, **Then** foco fica no diálogo; Escape/cancelamento devolve foco, e ação de risco exige nome exato e resposta do servidor.

### User Story 2 - Navegar com contexto e permissões reais (Priority: P1)
Como pessoa autenticada, navego pelo shell em desktop/mobile e reencontro as páginas existentes.
**Why this priority**: mudança transversal não pode quebrar consumidores.
**Independent Test**: abrir resumo/áreas/mapa/membros autorizados, recarregar, voltar e trocar contexto.
**Acceptance Scenarios**:
1. **Given** laboratório selecionado, **When** usa links/reload/histórico, **Then** identidade e caminhos permanecem no contexto autorizado.
2. **Given** OWNER/ADMIN/MEMBER, **When** navega, **Then** Membros segue exclusivo de OWNER; ADMIN global não ganha autoridade contextual.
3. **Given** sessão ausente, expirada ou vínculo revogado, **When** abre URL protegida, **Then** guardas atuais negam sem selecionar outro laboratório.
4. **Given** página antiga, **When** recebe o shell novo, **Then** continua acessível/legível/funcional sem redesenho do seu conteúdo.

### User Story 3 - Conta e saída acessíveis (Priority: P1)
Como participante no celular ou desktop, uso menu, teclado e logout real sem manter contexto anterior.
**Why this priority**: saída e acesso a contas são essenciais em qualquer largura.
**Independent Test**: menu por teclado com Escape/retorno de foco; logout real e histórico sem sessão.
**Acceptance Scenarios**:
1. **Given** menu móvel fechado, **When** abre por teclado, **Then** links reais ficam acessíveis, Tab funciona, Escape fecha e devolve foco.
2. **Given** desktop/mobile, **When** escolhe Sair, **Then** POST/logout e restauração atuais invalidam a sessão; há uma saída visível.
3. **Given** falha transitória, **When** tenta novamente, **Then** recupera leitura/logout sem resultado fictício.

### Edge Cases
Laboratório inativo acessível somente para leitura;5/5 inclui participações/inativos; título longo;320px/texto200; erro dentro do diálogo; fechamento bloqueado durante operação; acionador removido após exclusão; duplo envio no mesmo turno; mudança de viewport com menu aberto; sem dados científicos; convite indisponível.

## Requirements *(mandatory)*
### Functional Requirements
- **FR-001**: Workspace MUST apresentar vazio/lista/loading/erro/retry usando dados reais, criação com nome e limite5, sem seleção automática nem convite funcional.
- **FR-002**: Configurações MUST manter detalhes/isOwner reais, status e confirmação exata em PATCH/DELETE; cancelamento não altera dados e impedimentos do servidor continuam visíveis.
- **FR-003**: Navegação MUST preservar rotas/contexto explícito, identidade/papel/inatividade, reload/histórico/voltar e distinção global/contextual.
- **FR-004**: Shell MUST preservar autorização server-side, restauração de sessão e isolamento de contexto; nenhum dado/permissão mock deriva decisões.
- **FR-005**: Menu móvel, navegação, diálogo e logout MUST operar por teclado, com foco visível, Escape/retorno apropriados, alvos44px e uma saída visível por viewport.
- **FR-006**: Workspace/shell MUST adaptar-se a375/768/1440 e320px/texto200, sem overflow horizontal próprio ou conteúdo focado escondido pelo chrome.
- **FR-007**: Consumidores antigos MUST conservar acesso/legibilidade/operações; conteúdos de áreas/coletas/ambientais/drafts/capas/mapa/admin e IHFR não serão redesenhados/refatorados.
- **FR-008**: Logout MUST manter POST real, falha/retry, invalidação e proteção contra retorno ao conteúdo anterior.
- **FR-009**: Apresentação MUST usar arquitetura/dependências existentes e estilos locais; sem alterações em serviços, schema, middleware, AuthContext, contexto autorizado ou ciência.
- **FR-010**: Validação MUST preservar RED/GREEN, capturas sanitizadas, revisão e15 gates do SHA publicado; Preview desabilitado e PR próprio sem merge/deploy.
### Key Entities
Laboratório público/detalhes/contexto, principal e sessão existentes; somente estados de apresentação/menu/diálogo. Nenhuma entidade persistida nova.

## Success Criteria *(mandatory)*
### Measurable Outcomes
- **SC-001**: Todos os cenários de seleção/criação/gestão/roles/sessão e15 gates passam na árvore publicada.
- **SC-002**: Capturas antes/depois abrangem4 larguras, estados vazio/lista/loading/erro e foco; workspace e chrome próprios não transbordam em320px/texto200.
- **SC-003**: Menu e diálogo completam teclado/Escape/retorno; ações de risco mantêm confirmação e operações reais; logout passa em desktop/mobile.
- **SC-004**: Matriz de consumidores verificada sem diff nos serviços/guardas/ciência e sem redesenho de páginas antigas.

## Assumptions
DECISAO_CONFIRMADA: escopo/autorização do pedido atual e handoff de Pedro18/10/2026. EVIDENCIA_IMPLEMENTACAO: código/testes atuais, Specs001–009/012–018 e contratos existentes. Starter cbb954a somente referência visual. Code-First CF-PRD-FR-003/004, CF-US-004/005/007/008 e CF-UC-004/006/016/017 mantêm classificações/EM_REVISAO; não são promovidos a decisão nova.
RECOMENDACAO: adaptar composição do starter sem roteador/adapters/personas; menu por disclosure e diálogo nativo se RED demonstrar lacuna de foco. Sem pendência material de produto para este recorte.
