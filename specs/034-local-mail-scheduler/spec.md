# Feature Specification: ensaio local de agendamento de mail

**Feature Branch**: `test/hf-night-local-scheduler-20261025`
**Created**: 2026-10-25
**Status**: Draft
**Input**: HF-NIGHT-01 M05 autoriza scheduler substituto em localhost, fakes e
guard real, sem operar SMTP, banco ou scheduler hospedado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ensaiar disparos e pausa (Priority: P1)

Como operador futuro, quero uma prova limitada de duas chamadas automáticas,
pausa e retomada de backlog falso pelo guard HTTP real, antes de propor job real.
**Why this priority**: o harness de contas existente é acionado manualmente por
IPC; não demonstra sozinho um substituto periódico de scheduler em localhost.
**Independent Test**: serviço HTTP exclusivamente loopback usa handleMailTrigger
real e callback falso, sem SQL/SMTP. Duas chamadas automáticas, pausa sem novas
chamadas e retomada drenam cinco itens falsos com callback sem sobreposição.

**Acceptance Scenarios**:

1. **Given** duas tarefas falsas, **When** o substituto inicia,
   **Then** há pelo menos duas invocações automáticas autorizadas e dois aceites falsos.
2. **Given** substituto pausado, **When** três tarefas falsas são acrescentadas,
   **Then** não há processamento durante a pausa; ao retomar todas são processadas.
3. **Given** callback lento, **When** mais de um período decorre,
   **Then** o substituto mantém no máximo uma chamada em andamento.

### User Story 2 - Recusar acesso e conter efeitos (Priority: P1)

Como mantenedor, quero impedir destino externo e comprovar negativa do guard,
sem expor bearer ou conteúdo no recibo nem iniciar outro serviço.
**Independent Test**: origem externa rejeitada antes de fetch; HTTP sem bearer,
bearer incorreto, query e body são recusados pelo guard real, callback não executado.

**Acceptance Scenarios**:

1. **Given** destino externo ou origem ambígua, **When** o substituto é construído,
   **Then** recusa antes de rede, sem repetir dados de entrada no erro.
2. **Given** chamada não autorizada ou entrada imprópria, **When** recebida,
   **Then** o guard real responde401/400 sem chamar callback ou divulgar campos extras.
3. **Given** conclusão/falha do teste, **When** ocorre teardown,
   **Then** timers/requisições e somente o servidor próprio são encerrados.

### Edge Cases

- Pausa com chamada em voo; retomada repetida; limite de invocações alcançado.
- Callback retorna campos privados falsos: resposta contém só métricas permitidas.
- Porta efêmera própria; nenhuma descoberta/reutilização de listener alheio.
- Falha/timeout do transporte termina como contador sanitizado, sem erro bruto.
- Falha HTTP/transporte é terminal para a instância; não há resume/retry após
  falha. Abort de HTTP não cancela callback no servidor: teardown aguarda o fake.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Instrumento MUST aceitar somente origem HTTP literal127.0.0.1 com
  porta explícita, sem path/query/fragment/credenciais; destino de chamada é fixo.
- **FR-002**: Substituto MUST realizar chamadas automáticas sequenciais, com
  pausa que aguarda voo corrente, retomada e teto explícito de até20invocações.
  Falha HTTP/transporte MUST parar definitivamente a instância e recusar resume;
  timeout do cliente não é tratado como cancelamento do callback servidor.
- **FR-003**: Prova MUST usar handleMailTrigger real e callback/fila inteiramente
  falsos, testar negativas401/400 e allowlist de métricas sem valores privados.
- **FR-004**: Teardown MUST fechar somente servidor/timers próprios, inclusive
  falhas; nenhum acesso a env real, DB, SMTP, provedor ou scheduler hospedado.
  O teste MUST aguardar callbacks falsos conhecidos antes de encerrar seu servidor.
- **FR-005**: Evidência MUST distinguir agendamento/guard real de outbox/worker
  falso e de SMTP/inbox/recuperação hospedados; G3/G4/G5 continuam BLOCKED.

### Key Entities

Substituto de agendamento efêmero; servidor loopback próprio; tarefas falsas;
recibo contendo contadores, resultado e limites, sem segredo/URL privada.

## Success Criteria *(mandatory)*

- **SC-001**: Duas chamadas automáticas e cinco aceites falsos após retomada,
  sem callback concorrente e sem processamento durante pausa.
- **SC-002**: Todas as negativas dirigidas impedem callback; nenhum canário
  ou bearer aparece na resposta/recibo público.
- **SC-003**: Teste termina com teardown e não concede nenhum dos três gates.

## Assumptions

`FATO_DOCUMENTADO`: mandato M05 desta sessão. Fonte técnica atual:
specs/mail-foundation SEC-NFR-002/MAIL-NFR-001 e
src/app/api/server/mail/trigger.ts. Trigger é importado com segredo sintético
explícito, sem avaliar default process.env. Nenhum código de produto muda.
Há testes SQL/worker separados no baseline; não são reproduzidos pelo fake.
