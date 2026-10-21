# Feature Specification: Apresentação do IHFR experimental

**Feature Branch**: `feat/frontend-ihfr`

**Created**: 2026-10-21

**Status**: Em implementação; aceite depende do CI e da inspeção visual no HEAD final.

**Input**: C1 conciliada, fase 8. Incorporar a apresentação do starter aos contratos reais do diagnóstico IHFR, preservando ciência, autorização e idempotência. Este documento registra EVIDENCIA_IMPLEMENTACAO; não constitui validação científica.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ler um diagnóstico experimental com contexto (Priority: P1)

Como participante autorizado do laboratório, quero distinguir resultado, componentes, qualidade, estado e proveniência para reconhecer o que foi efetivamente registrado e suas limitações científicas.

**Why this priority**: O resultado não pode parecer validado nem perder a rastreabilidade ao receber uma nova apresentação.

**Independent Test**: Renderizar o DTO público e consultar a coleta como MEMBER, inclusive em laboratório inativo; conferir campos, rótulos, ausência de controles de mutação e layout responsivo.

**Acceptance Scenarios**:

1. **Given** um diagnóstico vigente, **When** abro a coleta, **Then** vejo o score persistido, classe, qualidade, estado, W/S/V/T, versões, hash, origens e datas UTC sem recálculo.
2. **Given** um resultado experimental, **When** leio o resumo, **Then** os quatro qualificadores científicos permanecem visíveis, com texto compreensível e códigos íntegros.
3. **Given** ausência de diagnóstico vigente, **When** abro a coleta, **Then** vejo ausência explícita, sem score fictício, qualidade inventada ou resultado de demonstração.

### User Story 2 - Operar o diagnóstico preservando a tentativa (Priority: P1)

Como OWNER ou ADMIN contextual autorizado, quero preparar os dados de entrada, verificar a elegibilidade e confirmar criação, substituição ou revogação, inclusive recuperar uma resposta incerta sem duplicar a operação.

**Why this priority**: A camada visual deve preservar as garantias já implementadas para operações imutáveis.

**Independent Test**: Executar os cenários dedicados de criação, substituição, conflito, revogação, incompatibilidade e recuperação com a mesma chave.

**Acceptance Scenarios**:

1. **Given** permissão contextual e laboratório ativo, **When** preencho uso da terra e proveniência e consulto elegibilidade, **Then** vejo o estado real retornado e os motivos de insuficiência, sem inferência científica local.
2. **Given** uma confirmação aberta, **When** uso Tab, Shift-Tab, Enter ou Escape, **Then** foco inicial, confinamento, confirmação e retorno ao disparador permanecem funcionais.
3. **Given** resposta incerta, **When** recupero ou repito, **Then** a mesma tentativa conserva chave, endpoint e corpo; o fluxo não cria outra identidade nem outro diagnóstico.
4. **Given** conflito ou incompatibilidade, **When** o servidor responde, **Then** feedback recebe foco e estado vigente/elegibilidade são reconciliados conforme o protocolo existente.

### User Story 3 - Usar em telas pequenas e com texto ampliado (Priority: P2)

Como usuário em campo, quero ler o diagnóstico e alcançar as ações em celular, tablet e desktop, inclusive com texto ampliado.

**Why this priority**: Hashes, códigos científicos, campos e diálogos não podem tornar o fluxo inacessível em telas pequenas.

**Independent Test**: Capturar viewports reais de Chromium em 320/375/768/1440 px, texto 200% e paisagem pertinente; verificar overflow e hit-test dos controles finais.

**Acceptance Scenarios**:

1. **Given** viewport estreita ou texto ampliado, **When** leio metadados e qualificadores, **Then** o conteúdo quebra sem overflow horizontal do documento.
2. **Given** modal ou aviso de resultado incerto, **When** alcanço os botões, **Then** permanecem visíveis, clicáveis e com foco identificável.

### Edge Cases

- Valores de DTO e códigos desconhecidos são exibidos sem alteração, arredondamento local ou classificação derivada.
- Datas ausentes mostram “Não se aplica”; datas inválidas mostram “Data indisponível”.
- Uso indeterminado continua permitido como entrada, podendo resultar em insuficiência real; “Solo exposto” territorial continua distinto do percentual ambiental.
- Motivo de revogação preserva limite de 500 caracteres e validação existente.
- Usuário MEMBER e laboratório inativo mantêm somente leitura, sem controles escondidos apenas por CSS.
- Falha de rede mantém tentativa; falha terminal de contrato mantém o comportamento atual de reconciliação.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Preservar as regiões ARIA “Diagnóstico IHFR experimental” e “Gerenciar diagnóstico IHFR experimental”, seus títulos e acesso por teclado.
- **FR-002**: Exibir `displayScore`, classe, qualidade, estado científico, ciclo de vida e componentes exatamente a partir do DTO; traduções devem manter o código normativo visível.
- **FR-003**: Preservar os quatro qualificadores `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`, sem alegar ciência validada.
- **FR-004**: Manter visíveis IDs de origem, conjunto ambiental, suplemento, versões, hash e datas UTC, com quebra segura de textos extensos.
- **FR-005**: Mostrar ausência honesta sem métricas ou histórico fictícios.
- **FR-006**: Preservar elegibilidade, contexto, permissões, estados contratuais, endpoints, payloads, ID esperado, chave de idempotência e recuperação da tentativa incerta.
- **FR-007**: Preservar confirmação explícita, ciclo de foco, feedback de sucesso/erro e ações reais de criação, substituição e revogação.
- **FR-008**: Adaptar o painel visual de referência aos componentes existentes, usando dependências e estilos locais; nenhum mock, camada de dados do starter, dependência adicional ou alteração global.
- **FR-009**: Demonstrar reflow em 320/375/768/1440 px, texto 200% e paisagem, com captura `fullPage:false` e metadados sanitizados sob `.accounts-validation/frontend-ihfr/`. Em texto 200%, rótulos humanos de ação, títulos e quatro qualificações devem manter palavras inteiras; códigos, hashes e identificadores extensos podem quebrar. Refinamento causal autorizado pelo coordenador após inspeção dos PNG da primeira candidata em 2026-10-21.
- **FR-010**: Preservar os seis cenários E2E dedicados e acrescentar evidência sem enfraquecer suas assertions; distinguir PASS, FAIL e NOT_RUN por SHA.

### Key Entities *(include if feature involves data)*

- **PublicDiagnosis**: DTO imutável já existente, fonte única dos valores exibidos. Nenhuma entidade persistente nova.
- **Attempt**: tentativa de criação/substituição/revogação em memória; chave, endpoint, corpo e tipo existentes preservados.
- **EligibilityResponse**: resposta existente do servidor; o frontend apresenta o estado e os motivos sem estabelecer novas regras.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Todos os campos públicos e quatro qualificadores obrigatórios continuam identificáveis nas provas unitárias e E2E.
- **SC-002**: Os seis cenários IHFR oficiais passam no HEAD candidato; CI externo pendente não equivale a PASS local.
- **SC-003**: Os viewports definidos não apresentam overflow horizontal e os controles examinados passam no hit-test; imagens precisam ser abertas e inspecionadas para aceite visual.
- **SC-004**: O diff não altera matemática, contratos, schema, API, papéis, rotas, dependências, CSS global ou infraestrutura compartilhada.
- **SC-005**: Cada requisito possui vínculo com componentes, testes e estado da evidência no recibo da Spec.

## Assumptions

- `development` observado em `1ea3cc2552c244e1004f4f733f838e0f9ea62993`; base comum protegida S `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6` preparada pelo coordenador.
- Fonte visual `hidroflorestas-frontend` em `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` é referência de apresentação, não autoridade científica ou de segurança.
- Specs 006 e 022–024, ADR-0001 e fontes de Pedro permanecem fontes técnicas; sua semântica não é reescrita por esta Spec.
- Execução local Linux cobre verificações focais sem banco real; runner Windows, 15 gates, publicação de PR e revisão Codex são responsabilidades do coordenador.
- Nenhuma clarificação adicional é necessária: limites e invariantes estão determinados pelo plano conciliado e código real.
