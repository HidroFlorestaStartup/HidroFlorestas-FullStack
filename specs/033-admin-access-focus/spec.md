# Feature Specification: foco após perda de acesso administrativo

**Feature Branch**: `fix/hf-night-admin-focus-20261025`
**Created**: 2026-10-25
**Status**: Draft
**Input**: HF-NIGHT-01 M04/M07: corrigir a perda reproduzida de foco no alerta administrativo, preservando os contratos existentes.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Perceber a indisponibilidade da conta (Priority: P1)

Como pessoa que consulta uma conta na administração, quero receber foco no alerta quando a conta ou meu acesso deixam de estar disponíveis, sem permanecer nos dados anteriores.

**Why this priority**: QA observou alerta presente sem foco após uma resposta real 403. A comunicação por teclado integra IMP-009 FR-024/NFR-005 e spec027 FR-003/FR-006.
**Independent Test**: uma consulta negada de detalhe ou auditoria remove a seleção e entrega foco ao alerta já materializado, inclusive quando a resposta chega antes da apresentação da seleção.

**Acceptance Scenarios**:

1. **Given** conta selecionada e consulta de detalhe ou auditoria em andamento, **When** chega resposta 401 ou 403 vigente, **Then** lista, seleção, auditoria e diálogo anteriores são retirados, as leituras são canceladas e o alerta de acesso perdido recebe foco.
2. **Given** consulta vigente para uma conta que não existe mais, **When** chega resposta 404, **Then** essa conta é retirada da lista, detalhe/auditoria/diálogo são limpos e o alerta de conta indisponível recebe foco.
3. **Given** a mensagem de indisponibilidade já mostrada, **When** uma nova seleção permitida resulta novamente na mesma indisponibilidade, **Then** o novo resultado recebe foco sem depender de mudança do texto.

### User Story 2 - Preservar o foco após descartar trabalho antigo (Priority: P1)

Como pessoa que segue navegando, quero que respostas descartadas e tarefas antigas não voltem a mover o foco ou expor dados anteriores.

**Why this priority**: a correção de foco não deve reintroduzir disputa entre leituras ou roubar foco em atualizações não relacionadas.
**Independent Test**: responder leituras simultâneas ou superadas não restaura seleção/dados e não cria foco tardio após nova ação ou desmontagem.

**Acceptance Scenarios**:

1. **Given** detalhe e auditoria concorrentes, **When** a primeira resposta vigente nega acesso, **Then** a outra leitura cancelada não restaura dados nem produz outra ação tardia de foco.
2. **Given** uma seleção superada ou componente desmontado, **When** chega resposta antiga, **Then** ela não altera a superfície atual nem seu foco.
3. **Given** alerta existente e uma atualização que não representa nova indisponibilidade, **When** o usuário move o foco para outro controle, **Then** essa atualização não devolve foco ao alerta antigo.

### Edge Cases

- 401/403/404 vindos de cada uma das duas leituras; respostas simultâneas e fora de ordem.
- Resposta rápida antes da apresentação da seleção; foco da seleção anteriormente agendado.
- Texto idêntico em duas ocorrências válidas; estado limpo e reconstruído no mesmo ciclo.
- Alerta persistente, atualização de lista, troca de conta e desmontagem.
- Falha sintética de timing é contraprova local, sem provar causalidade universal do FAIL real.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Toda indisponibilidade vigente de detalhe/auditoria MUST entregar foco ao alerta correspondente após sua materialização, mantendo texto e tabulação atuais.
- **FR-002**: Uma nova ocorrência válida de indisponibilidade MUST receber foco mesmo com texto idêntico; renderizações não relacionadas MUST NOT repetir esse foco.
- **FR-003**: A correção MUST preservar cancelamento das leituras e remoção de seleção, auditoria, diálogo e dados anteriores, sem permitir restauração por resposta descartada.
- **FR-004**: 401/403 MUST retirar a lista e comunicar acesso perdido; 404 MUST retirar somente a conta indisponível da lista e comunicar sua ausência, preservando a distinção existente.
- **FR-005**: Respostas superadas e desmontagem MUST NOT gerar foco tardio; a correção MUST NOT alterar servidor, autorização, API, sessão, schema ou operações de dados.
- **FR-006**: A prova MUST preservar os testes existentes, suas assertions, timeouts e retries; cenários sintéticos MUST ser identificados separadamente da execução real e do aceite humano.

### Key Entities

- Indisponibilidade vigente: resultado de uma leitura ainda associada à seleção atual.
- Ocorrência do alerta: comunicação correspondente a um novo resultado aceito, independente de repetir seu texto.
- Leitura descartada: consulta cancelada ou associada a seleção anterior, sem autoridade para alterar apresentação/foco.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Todos os cenários dirigidos de indisponibilidade vigente entregam foco ao alerta e retiram os dados esperados, inclusive mensagem repetida e timing controlado.
- **SC-002**: Zero cenários dirigidos de resposta descartada, desmontagem ou atualização não relacionada restauram dados ou movem foco para alerta antigo.
- **SC-003**: Nenhum teste existente é enfraquecido; validação local e eventual repetição real são atribuídas ao código/ambiente executado, com falhas preservadas e sem declarar homologação.

## Assumptions

`FATO_DOCUMENTADO`: mandato M04/M07 recebido do coordenador nesta sessão. Fontes de intenção: specs009/027 e respectivos testes vigentes; QA forneceu reprodução real no baseline08262dc, 1FAIL/9PASS no experimento focal sem retries. A hipótese sobre agendamento de foco ainda é `INFERENCIA`, a investigar antes da escolha final. Nenhuma nova regra de produto, ciência ou autoridade é criada.
