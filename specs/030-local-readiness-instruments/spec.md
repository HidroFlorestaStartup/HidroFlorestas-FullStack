# Feature Specification: Instrumentos locais de prontidão territorial

**Feature Branch**: `test/hf-night-baseline-20261025`
**Created**: 2026-10-25
**Status**: Implementada; validação e revisão independente concluídas
**Input**: HF-NIGHT-01: instrumentos sob demanda com PostgreSQL sintético local, custo e limites explícitos, sem CI nova, provedores reais ou alteração de requisitos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Medir o recorte territorial existente (Priority: P1)

Como mantenedor, quero medir o fluxo territorial com um conjunto sintético conhecido para avaliar a lacuna técnica da IMP-008 sem transferir resultados históricos.

**Why this priority**: C1 mantém abertas as 100 leituras reais, análise de consulta e interação sem base cartográfica; a prova unitária existente não mede essas fronteiras.

**Independent Test**: execução manual produz 10 aquecimentos, 100 medições autenticadas, planos das consultas reais e evidência da lista completa e de seus destinos com recursos externos bloqueados.

**Acceptance Scenarios**:

1. **Given** ambiente sintético próprio, **When** iniciada a medição explicitamente, **Then** são criadas 100 áreas e 1.000 coletas confirmadas no laboratório alvo, além de ruído separado, e cada leitura contém somente o conjunto alvo integral.
2. **Given** dados carregados sem base cartográfica, **When** uma área é selecionada por teclado e seus destinos são abertos, **Then** lista e destinos permanecem utilizáveis no contexto autorizado.
3. **Given** execução concluída, **When** consultado seu recibo, **Then** identifica revisão, plataforma, modo, cardinalidades, p95 e limites sem alegar homologação ou acessibilidade humana.

### User Story 2 - Recusar execução insegura e preservar evidência (Priority: P1)

Como mantenedor, quero recusar destinos externos ou de ownership ambíguo e obter teardown verificável também quando a medição falha.

**Why this priority**: o instrumento cria dados e analisa consultas; seu destino deve permanecer descartável e conhecido.

**Independent Test**: host externo, flags incompatíveis ou confirmação ausente são rejeitados antes de conexão; execução válida comprova remoção do schema criado nesta execução.

**Acceptance Scenarios**:

1. **Given** destino hospedado, contexto herdado ou confirmação ausente, **When** solicitada a execução, **Then** ela termina antes de servidor, navegador ou escrita.
2. **Given** falha após criação, **When** o instrumento termina, **Then** encerra somente seu servidor e remove somente seu schema com marcador, registrando resíduo como falha.

### Edge Cases

- Porta ocupada: selecionar porta loopback livre sem reutilizar processo.
- Timeout, resposta não 200 ou cardinalidade divergente: falha explícita, sem descartar amostras ou repetir automaticamente.
- Meta excedida: registrar meta não atingida, sem otimização automática ou mudança de contrato.
- Tiles ausentes: lista permanece integral; tecnologias assistivas reais e participantes conservam pendências próprias.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O instrumento MUST exigir execução explícita e ambiente sintético local confirmado, recusando destinos hospedados, contexto externo e configuração de SMTP/provedores reais.
- **FR-002**: O instrumento MUST criar dados em unidade descartável owned e verificar limpeza sem alterar dados preexistentes ou desativar salvaguardas da aplicação.
- **FR-003**: O instrumento MUST executar exatamente 10 aquecimentos e 100 leituras autenticadas sequenciais do fluxo territorial real sobre 100 áreas e 1.000 coletas confirmadas, incluindo ruído separado e verificação do payload integral/isolamento em cada resposta.
- **FR-004**: O instrumento MUST obter planos das consultas efetivamente executadas pela projeção e medir interação textual sem recursos externos, verificando cardinalidade e destinos.
- **FR-005**: O instrumento MUST emitir recibo sanitizado com revisão, ambiente, comando, UTC, durações, contagens e resultado, distinguir baseline de investigação e preservar falhas sem retries automáticos.
- **FR-006**: A entrega MUST documentar custo, limites, pré-requisitos e interpretação sem CI nova nem alegar aceite humano, prontidão operacional ou validade científica.

### Key Entities

- Execução: revisão, comando, timestamps e conclusão local.
- Conjunto sintético: laboratório alvo e ruído separado com cardinalidades conhecidas.
- Medição: 100 durações após aquecimento, p95 pelo posto mais próximo e bytes da resposta.
- Evidência de consulta: hash, cardinalidades e buffers, sem parâmetros ou segredos.

## Success Criteria *(mandatory)*

- **SC-001**: 100/100 respostas integrais; uma resposta inválida impede PASS.
- **SC-002**: Recibo contém 100 amostras e compara p95 com meta técnica de 500 ms e interação com 2 s, sem declarar SLA.
- **SC-003**: Consultas de projeção observadas têm plano ou erro explícito; nenhum parâmetro/segredo é publicado.
- **SC-004**: Destino externo e confirmação ausente são recusados antes de efeitos; zero schema desta execução resta após teardown bem sucedido.
- **SC-005**: Runbook permite repetição sob demanda sem alterar testes, gates, domínio ou CI.

## Assumptions and Scope

`FATO_DOCUMENTADO`: autorização HF-NIGHT-01 transmitida pelo coordenador, com pasta 030 reservada explicitamente em 2026-10-25. `EVIDENCIA_IMPLEMENTACAO`: runners owned PostgreSQL, endpoint, serviço, fixtures e lista existentes. `RECOMENDACAO`: instrumento manual para a lacuna técnica. Fontes: `specs/008-territorial-map/quickstart.md` §6.2; adendo C1 de 24/10; constituição e políticas de fontes.

Fora: produção, hospedagem, cluster preexistente de outra missão, SMTP externo, providers, nova UX, Plotly, schema persistente, matemática IHFR, CI nova e avaliação humana. IHFR preserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
