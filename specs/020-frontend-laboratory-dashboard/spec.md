# Feature Specification: Laboratório, dashboard, histórico e membros
**Feature Branch**: `feat/frontend-laboratory-dashboard`
**Created**: 2026-10-19
**Status**: Planejada; aceite humano pendente
**Input**: Missão do usuário em hidrofloresta-prompt-codex-fases-4-5-20261019.md, 19/10/2026; handoff oficial no commit 4144e12.

## User Scenarios & Testing *(mandatory)*
### User Story 1 - Workspace móvel acessível (Priority: P1)
Como participante, opero criar, acessar e configurar laboratórios em tela pequena.
**Why this priority**: esclarecer apontamento móvel antes do conteúdo da fase4.
**Independent Test**: Next real,375/320px,texto100/200%,vazio/lista, três/quatro atalhos, início/meio/fim.
**Acceptance Scenarios**:
1. **Given** workspace móvel, **When** rolo e navego por teclado/toque, **Then** controles expostos na área útil ficam operáveis e o foco permanece visível.
2. **Given** screenshot fullPage histórica, **When** comparo com viewport real, **Then** distingo composição da captura de obstrução runtime, sem inventar correção.
3. **Given** resize/orientação/texto ampliado, **When** uso menu/atalhos/logout, **Then** contratos e contexto continuam íntegros.

### User Story 2 - Resumo e histórico contextual (Priority: P1)
Como participante autorizado, consulto contagens e eventos reais do laboratório selecionado.
**Why this priority**: atividade verificável sem indicadores inventados.
**Independent Test**: resumo/histórico, paginação e destinos via APIs sintéticas reais.
**Acceptance Scenarios**:
1. **Given** contexto autorizado, **When** abro resumo, **Then** contagens/links/readOnly correspondem aos dados atuais.
2. **Given** histórico com mais de uma página, **When** avanço/volto/atualizo, **Then** ordem e cursores são preservados.
3. **Given** troca/perda de contexto ou resposta tardia, **When** a leitura termina, **Then** dados anteriores não reaparecem.
4. **Given** vazio/loading/erro, **When** consulto ou tento novamente, **Then** há estado honesto e recuperação.

### User Story 3 - Membros e concorrência (Priority: P1)
Como OWNER autorizado, consulto vínculos e altero papéis permitidos.
**Why this priority**: preservar autoridade real ao incorporar o visual.
**Independent Test**: OWNER/ADMIN/MEMBER/globalADMIN,inativo,perda de vínculo,conflito.
**Acceptance Scenarios**:
1. **Given** OWNER ativo, **When** altero papel, **Then** envio revisão esperada, uma mutação por vez e mostro resultado real.
2. **Given** conflito/rejeição, **When** a resposta chega, **Then** não anuncio sucesso e atualizo a lista.
3. **Given** papel sem autoridade ou laboratório inativo, **When** acesso a operação, **Then** servidor e UI conservam restrições; OWNER não muda.

### Edge Cases
Texto200%,safe-area,quebra móvel,último controle,menu aberto,skip,foco,resize; leitura abortada e resposta antiga; cursor inválido,readOnly,403/404/409/503.

## Requirements *(mandatory)*
### Functional Requirements
- **FR-001**: Esclarecer o apontamento móvel por reprodução e capturas viewport; corrigir runtime somente com defeito demonstrado.
- **FR-002**: Preservar operação/foco dos controles móveis com texto ampliado, rolagem e atalhos.
- **FR-003**: Harmonizar resumo e histórico com referência visual autorizada, mantendo dados/links reais.
- **FR-004**: Preservar paginação, atualização, ordem e isolamento contextual, incluindo respostas tardias.
- **FR-005**: Exibir vazio/loading/erro/retry honestos.
- **FR-006**: Preservar autoridade contextual, readOnly e OWNER, sem equiparar ADMIN global ao contextual.
- **FR-007**: Preservar expectedRole,trava de envio e conflito concorrente sem sucesso falso.
- **FR-008**: Preservar redirects sem selecionar laboratório automaticamente e consumidores do shell.
- **FR-009**: Entregar evidências sanitizadas, regressão atual e PR próprio com CI dos15 gates.

### Key Entities
Laboratório/contexto autorizado; resumo com contagens e links; página de eventos/cursor; vínculo com papel esperado. Nenhuma entidade persistida nova.

## Success Criteria *(mandatory)*
### Measurable Outcomes
- **SC-001**: Criar/Acessar/Configurações e último controle operáveis em375/320,texto100/200%,com evidência viewport.
- **SC-002**: Resumo/histórico/membros conservam todos os cenários de autoridade,paginação e concorrência verificados.
- **SC-003**:375/768/1440 e320/texto200 sem perda de acesso nas superfícies alteradas.
- **SC-004**: PR revisável com resultado atual dos15 gates no HEAD publicado e limites explícitos.

## Assumptions
DECISAO_CONFIRMADA: autorização do usuário nesta missão; handoff de Pedro fornece recorte operacional. Starter cbb954a é apoio visual, não domínio.
Rastreabilidade: CF-PRD-FR-010, CF-UC-014, CF-PFLOW-007 e IMP-002/IMP-007 conforme specs002/003/007; Spec019 para shell. PRD Code-First permanece EM_REVISAO, sem promoção normativa.
Fase5 depende desta fase pelo shell; PR empilhado se4 aberta. Sem backend,AuthContext,globals,root,lockfile,ciência,provedores reais ou merge.
