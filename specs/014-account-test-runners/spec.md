# Feature Specification: Runners de testes de contas

**Feature Branch**: `014-account-test-runners`
**Created**: 2026-10-10
**Status**: Especificada; correção focal autorizada pelo pedido v1.0
**Input**: Reexecutar contas/exclusão com evidência real e corrigir regressões materiais.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Executar regressão geral e exclusão (Priority: P1)

O desenvolvedor executa a suíte geral sem exigir fixtures exclusivas da exclusão,
e executa a exclusão pelo runner que cria essas fixtures sintéticas.
**Why this priority**: a falha observada bloqueia validação confiável de novos incrementos.
**Independent Test**: suíte geral e runner dedicado passam, em sequência, sem operação remota.
**Acceptance Scenarios**:
1. Given suíte geral, When executa, Then casos que exigem runner próprio não são selecionados.
2. Given runner de exclusão, When executa, Then os três cenários continuam selecionados e verificam senha/vínculos/revogação.

### Edge Cases

Modo HTTPS preserva suas exclusões existentes; ausência de fixtures não é contornada
com skip dentro do teste. Guards, assertions e domínio ficam intactos.

## Requirements *(mandatory)*

- **FR-001**: selecionar testes de exclusão exclusivamente no runner dedicado existente.
- **FR-002**: manter cobertura de contas/HTTPS e executar os três casos de exclusão com fixtures próprias.
- **FR-003**: preservar falha inicial e distinguir erro de configuração local de defeito do produto.
- **FR-004**: o preparador local deve aceitar checksums de SQL idêntico com LF ou CRLF, sem alterar migrations, checksums persistidos ou aceitar alterações reais de conteúdo.

## Success Criteria *(mandatory)*

- **SC-001**: regressão geral, exclusão e HTTPS terminam sem falhas em dados sintéticos.
- **SC-002**: nenhum guard/assertion é enfraquecido e nenhum envio real ocorre.

## Proveniência e limites

EVIDENCIA_IMPLEMENTACAO: beba96f seleciona account-deletion.spec.ts na suíte geral,
mas esses casos exigem DELETION_E2E_IDS/PASSWORD/BASE_URL do runner dedicado.
Falha atual: 52 PASS/5 FAIL/8 não executados; três FAIL são dessa seleção.
As duas falhas 403 decorrem da configuração `none` do wrapper desta execução,
corrigida localmente para `local`, sem mudança do produto. CRI-T017; spec 013.

Investigação posterior: com ingresso local a suíte teve 60 PASS/1 FAIL/1 não
executado. O cadastro retornou 500 porque o banco sintético ainda não tinha a
migration de ownership do outbox. RegressionSetup recusou o histórico: as nove
primeiras migrations tinham checksum CRLF e as duas seguintes LF. A comparação
com os arquivos Git confirmou diferença exclusiva de fim de linha. A correção
do preparador precede a aplicação aditiva da migration, sem reset do banco.
