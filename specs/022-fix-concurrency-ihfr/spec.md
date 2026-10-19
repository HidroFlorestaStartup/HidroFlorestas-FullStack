# Feature Specification: Concorrência de capas e intermitência IHFR

**Feature Branch**: `022-fix-concurrency-ihfr`
**Created**: 2026-10-19
**Status**: Em investigação
**Input**: Missão do usuário de 19/10/2026: PLAN → EXECUTE → REVIEW, duas pendências técnicas, reprodução antes de correção; preservar demo, PRs 14/15 e contratos; sem merge, deploy ou produção.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Emitir tentativas concorrentes respeitando quotas (Priority: P1)

Como usuário autorizado, quero que solicitações simultâneas de capa respeitem os limites existentes e retornem o resultado contratual da quota quando ela for atingida.

**Why this priority**: O incidente observado retornou erro interno onde se esperava limite atingido.
**Independent Test**: Sincronizar solicitações em banco sintético próprio, observar conflitos e verificar tentativas/jobs após todos os resultados, inclusive falhas.
**Acceptance Scenarios**:

1. **Given** duas solicitações elegíveis e uma vaga horária, **When** competem, **Then** exatamente uma emite ticket e a outra recebe limite atingido, mantendo dez tentativas/quarenta jobs.
2. **Given** chave já persistida, **When** repetida simultaneamente, **Then** converge sem duplicar tentativas/jobs.
3. **Given** autorização revogada durante validação do provedor, **When** retoma, **Then** rejeita sem ticket nem persistência nova.
4. **Given** conflitos técnicos sem quota atingida, **When** esgotam o orçamento existente, **Then** não são disfarçados de limite atingido.

### User Story 2 - Diagnosticar a execução IHFR intermitente (Priority: P1)

Como mantenedor, quero distinguir falha de fixture, rota, autenticação, inicialização, hidratação ou seleção antes de corrigir uma execução IHFR.

**Why this priority**: Seis falhas anteriores no mesmo código não têm causa demonstrada.
**Independent Test**: Comparar artefatos FAIL/PASS, repetir execução isolada e aplicar controles discriminantes mantendo asserções e regras científicas.
**Acceptance Scenarios**:

1. **Given** FAIL/PASS no mesmo SHA, **When** comparados, **Then** registrar identidade, assinatura e lacunas de evidência separadamente.
2. **Given** reprodução controlada, **When** causa comprovada, **Then** corrigir minimamente e comprovar RED/GREEN sem alterar expectativas científicas ou limites para obter verde.
3. **Given** falha não reproduzida, **When** encerrada a investigação, **Then** classificá-la explicitamente inconclusiva, sem correção especulativa.

### Edge Cases

- Quotas por usuário em áreas diferentes; usuários distintos; replay com quota cheia; rollback e erro não reconhecido.
- Banco/rota indisponível, ator ausente, hidratação incompleta e processos próprios remanescentes.
- Logs podem conter credenciais: reter somente evidência sanitizada.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Reproduzir e identificar causa antes de alterar comportamento.
- **FR-002**: Preservar autorização contextual, quotas, idempotência, atomicidade e respostas existentes.
- **FR-003**: Preservar timeouts e orçamento de retries; qualquer mudança exige evidência específica.
- **FR-004**: Preservar demo, seus processos, arquivos e banco; usar ambiente descartável distinto.
- **FR-005**: Manter regras, dados e qualificadores científicos experimentais IHFR.
- **FR-006**: Obter revisão independente de cada frente e solicitar `@codex review` se disponível.
- **FR-007**: Conferir os quinze gates oficiais no SHA final, com estados PASS/FAIL/NOT_RUN explícitos.
- **FR-008**: Entregar branch e PR próprios, sem modificar PRs 14/15, merge, deploy ou produção.

### Key Entities

- Tentativa de capa e jobs de limpeza: persistência atômica e quotas existentes.
- Execução de validação: SHA, snapshot, tentativa, logs sanitizados e resultado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Cada correção tem um reprodutor que falha antes e passa depois com as mesmas expectativas.
- **SC-002**: Zero duplicação ou excesso de quota nos cenários controlados; autorização preservada.
- **SC-003**: Quinze resultados oficiais associados ao mesmo SHA final, sem inferir sucesso de gates omitidos.
- **SC-004**: Zero alteração da demonstração e dos PRs 14/15; nenhuma operação produtiva.
- **SC-005**: Toda falha sem reprodução permanece explicitamente inconclusiva.

## Assumptions

- DECISAO_CONFIRMADA: autorização operacional deste pedido permite branch, testes, commits e PR; não permite merge/deploy. Responsável nominal não especificado.
- EVIDENCIA_IMPLEMENTACAO: baseline cumulativo `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2`; PR14 `c076ec17f668ee7cf632a6bff0c71df4e7cd2564` preservado.
- Rastreabilidade: specs 016 (protocolo de capas), 006 (IHFR) e 020/021 (recibos de CI); Code-First CF-UC-010, CF-UC-011 e CF-UC-012 são contexto candidato, sem nova intenção normativa.
- IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
