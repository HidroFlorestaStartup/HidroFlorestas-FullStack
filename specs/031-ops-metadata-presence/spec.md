# Feature Specification: presença operacional offline

**Feature Branch**: `feat/hf-night-01`
**Created**: 2026-10-25
**Status**: Draft
**Input**: HF-NIGHT-01 M05: preparar verificador de presença e checklist sanitizado,
sem ler valores, operar destinos hospedados ou conceder gates.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identificar lacunas por destino (Priority: P1)

Um operador recebe um inventário sanitizado e identifica os nomes operacionais
ausentes para um target e branch explícitos, sem manipular credenciais.

**Why this priority**: o histórico de 18 ausências precisa de reconfirmação
reproduzível; presença não demonstra formato, isolamento ou funcionamento.
**Independent Test**: inventários falsos globais e específicos de branch geram
uma matriz determinística com presentes/ausentes e G3/G4/G5 BLOCKED.

**Acceptance Scenarios**:

1. **Given** inventário vazio válido, **When** avaliado para preview/branch exata,
   **Then** os 18 nomes são ausentes e o resultado não concede aceite operacional.
2. **Given** registros globais e por branch, **When** avaliado,
   **Then** somente registros compatíveis com target/branch contam como presença.
3. **Given** todos os nomes presentes, **When** avaliado,
   **Then** declara presença completa e mantém G3/G4/G5 BLOCKED.

### User Story 2 - Recusar evidência insegura (Priority: P1)

Um operador recebe erro sanitizado se o inventário contém valores, campos
inesperados ou estrutura inválida, sem reproduzir o conteúdo rejeitado.

**Why this priority**: evidências públicas devem excluir credenciais e PII.
**Independent Test**: canários em campos extras, JSON inválido, targets inválidos
e duplicatas são rejeitados sem imprimir canários nem conteúdo do arquivo.

**Acceptance Scenarios**:

1. **Given** campo value ou desconhecido, **When** avaliado,
   **Then** recusa com erro genérico e nenhuma ecoação de entrada.
2. **Given** arquivo ausente, maior que 1 MiB ou JSON inválido, **When** lido,
   **Then** termina com código distinto de presença incompleta sem revelar path/conteúdo.

### Edge Cases

- targets production, preview e development; branch obrigatória de1–200 caracteres
  ASCII, início alfanumérico e demais alfanuméricos ou `._/-`, sem espaços/controles;
- inventário vazio; nome conhecido em target diferente; branch diferente;
- duplicata exata de nome/target/branch; campos extras, registros nulos, nomes desconhecidos;
- captura completa não demonstra configuração do deployment nem isolamento de banco.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Avaliar os 18 nomes materiais históricos exclusivamente por metadados
  sanitizados com key, target e gitBranch; não ler valores ou ambiente do processo.
- **FR-002**: Exigir target e branch explícitos e considerar escopo de cada registro;
  gitBranch não nulo só se aplica a preview e à branch idêntica.
- **FR-003**: Recusar entradas inválidas/duplicadas/campos extras e limitar leitura a
  arquivo regular de até 1 MiB; erros não devem incluir dados de entrada.
- **FR-004**: Emitir somente nomes canônicos e presença global/branch/ausência,
  contagens, target e G3/G4/G5 BLOCKED; não reproduzir branch ou metadados arbitrários.
- **FR-005**: Operar offline, sem rede, subprocessos, escrita, carregamento de env,
  operações de banco/SMTP/provedor ou mudança em configuração da aplicação.
- **FR-006**: Distinguir saída 0 (presença completa), 2 (ausências), 1 (entrada inválida);
  nenhum código significa homologação ou aceite.

### Key Entities

- Inventário sanitizado: versão 1 e registros {key, target, gitBranch}.
- Avaliação: target, contagens e estado por cada um dos 18 nomes conhecidos.

Universo fechado de saída (18): APP_PUBLIC_URL, ACCOUNT_TRUSTED_INGRESS,
ACCOUNT_POLICY_ENABLED, ACCOUNT_TESTER_ALLOWLIST, ACCOUNT_PROOF_KEYS,
ACCOUNT_PROOF_ACTIVE_KEY_ID, ACCOUNT_REQUEST_KEY, MAIL_PAYLOAD_ENCRYPTION_KEYS,
MAIL_PAYLOAD_ACTIVE_KEY_ID, MAIL_IDEMPOTENCY_KEY, MAIL_WORKER_SECRET, SMTP_HOST,
SMTP_PORT, SMTP_SECURE, SMTP_REQUIRE_TLS, SMTP_USER, SMTP_APP_PASSWORD, MAIL_FROM.
Entrada também permite cinco nomes de baseline, sem contá-los na saída:
DATABASE_URL, JWT_SECRET, ROOT_PASSWORD, NEXT_PUBLIC_MAP_TILE_URL,
NEXT_PUBLIC_MAP_ATTRIBUTION. Qualquer outro nome é inválido neste formato v1.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 18/18 nomes têm estado determinístico para cada inventário válido.
- **SC-002**: Nenhum canário privado inserido em entradas recusadas aparece em stdout/stderr.
- **SC-003**: Todos os resultados válidos mantêm os três gates BLOCKED.

## Assumptions

`FATO_DOCUMENTADO`: mandato desta sessão autoriza instrumentos locais sintéticos.
Fonte histórica: [inventário imutável](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/943e21d325e65ec210a6e6c69e311d9fded1cdfc/docs/reviews/20261024-hf-ops-g3g5-read01/evidencias-preflight.json).
Objeto acessível localmente; publicação remota desse objeto não foi demonstrada.
Specs012/013/mail-foundation e respectivos runbooks continuam regendo contas/mail.
Inventário é preparado por operador/conector autorizado com whitelist de campos;
o instrumento não consulta nem configura o provedor. Nenhuma nova regra de produto.
