# Feature Specification: Cadastro e conjunto de contas

**Feature Branch**: `feat/frontend-account`
**Created**: 2026-10-18
**Status**: Em implementação autorizada; aceite humano pendente
**Input**: Fase 2 do handoff oficial, autorizado por Pedro em 18/10/2026 e adotado integralmente pelo pedido atual.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Criar e verificar conta (Priority: P1)

Como visitante, quero cadastrar meus dados em uma apresentação consistente e confirmar meu e-mail antes de usar o workspace.
**Why this priority**: É a entrada real de novos participantes.
**Independent Test**: Cadastro sintético completo, seguido de verificação, sem promover a sessão restrita a acesso comum.
**Acceptance Scenarios**:

1. **Given** dados válidos, **When** envio o cadastro, **Then** sigo o destino de verificação determinado pelo servidor.
2. **Given** resultado de rede incerto, **When** repito os mesmos dados, **Then** preservo a identidade da tentativa; ao editar o payload inicio outra tentativa.
3. **Given** código iniciado por zero, **When** confirmo, **Then** o código é preservado integralmente como texto.
4. **Given** expiração, limite de tentativas ou cooldown, **When** uso a tela, **Then** vejo o estado real e as ações permitidas, incluindo reenvio e saída.

### User Story 2 - Recuperar e alterar senha (Priority: P1)

Como titular, quero solicitar recuperação, redefinir ou trocar minha senha sem exposição da prova e com revogação real de sessões.
**Why this priority**: Recupera acesso com segurança.
**Independent Test**: Solicitação neutra, link inválido e válido, confirmação divergente, troca autenticada e sessão revogada.
**Acceptance Scenarios**:

1. **Given** e-mail existente ou ausente, **When** solicito recuperação, **Then** recebo a resposta neutra vigente.
2. **Given** link de recuperação, **When** abro a página, **Then** a prova é capturada e removida do endereço sem persistência.
3. **Given** senha atual e nova confirmação, **When** concluo a troca, **Then** a política vigente e a revogação de sessões continuam aplicáveis.

### User Story 3 - Excluir conta conscientemente (Priority: P1)

Como titular, quero compreender meus impedimentos e confirmar explicitamente uma exclusão permitida.
**Why this priority**: A apresentação não pode induzir ação irreversível.
**Independent Test**: Conta restrita, conta com vínculos e conta elegível com confirmação obrigatória.
**Acceptance Scenarios**:

1. **Given** vínculos impeditivos, **When** abro a exclusão, **Then** vejo impedimentos reais e retorno autorizado sem ação destrutiva disponível.
2. **Given** conta elegível, **When** ainda não confirmei, **Then** nenhuma exclusão ocorre; após confirmação e senha, o serviço determina o resultado.

### Edge Cases

Hidratação tardia; clique duplicado; falha de rede sem perda dos dados; erros gerais que não identificam um campo; prova expirada; zero inicial; sessão restrita/expirada; ampliação de texto em 320 px.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: As seis jornadas devem manter contratos, mensagens públicas, destinos e permissões vigentes.
- **FR-002**: Cadastro deve preservar senha como digitada, tentativa idempotente em retry incerto e renovação quando o payload mudar.
- **FR-003**: Verificação deve preservar código textual, expiração, tentativas, cooldown, reenvio idempotente, sessão restrita e atualização após confirmação.
- **FR-004**: Recuperação deve preservar neutralidade, prova em memória, limpeza do fragmento e rejeição de prova inválida/expirada.
- **FR-005**: Redefinição e troca devem preservar confirmação, política de senha e revogação de sessões.
- **FR-006**: Exclusão deve preservar impedimentos, confirmação explícita, senha e retorno real.
- **FR-007**: Formulários devem ficar inertes até estarem prontos, impedir duplo envio e anunciar processamento e erro; invalidade por campo exige evidência específica.
- **FR-008**: Todas as jornadas devem permitir teclado, foco visível, visibilidade de senha acessível, alvos de pelo menos 44 px e reflow com texto ampliado.
- **FR-009**: Cadastro deve adaptar o painel e cartão do starter; demais contas devem harmonizar cartão, campos e cores com o login, sem ampliar funcionalidades.

### Key Entities

Tentativa de cadastro; sessão de verificação; código textual; prova de recuperação; política de senha; impedimentos de exclusão. Nenhuma entidade persistida nova.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: As seis jornadas passam nos cenários sintéticos oficiais aplicáveis, incluindo login existente.
- **SC-002**: As seis telas permanecem legíveis e sem rolagem horizontal em 375, 768 e 1440 px e em 320 px com texto a 200%.
- **SC-003**: Tentativas duplicadas não geram dois envios simultâneos; retry incerto conserva a identidade da operação.
- **SC-004**: Evidências publicadas não contêm senhas, provas, códigos ou cookies; nenhum uso produtivo é necessário à validação.

## Assumptions

DECISAO_CONFIRMADA: escopo e autorização têm origem no pedido atual e no handoff `origin/docs/handoff-frontend-fases-2-3`, prompt de execução de 18/10/2026. Referência visual é apoio de UX; mocks não têm autoridade de domínio.
EVIDENCIA_IMPLEMENTACAO: contas já existem nas Specs 001, 012 e 013. Code-First permanece EM_REVISAO; rastreio de acesso em IMP-001/CF-UC-001 e política de fontes, sem aprovação global do PRD.
Fora de escopo: backend, schema, login entregue, ciência, provedores e fases 4–10. Aceite humano ocorre no PR, sem merge pelo executor.
