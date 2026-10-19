# Feature Specification: Áreas e capa
**Feature Branch**: feat/frontend-areas-cover
**Created**: 2026-10-19
**Status**: Planejada
**Input**: Missão local hidrofloresta-prompt-codex-fases-4-5-20261019.md e handoff oficial docs/handoff-frontend-fases-4-5@4144e12; fase5 após validação técnica da fase4.

## Objective and Authority
Adaptar listagem, formulário, detalhe e capa ao starter oficial cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f, preservando os fluxos reais do produto.
FATO_DOCUMENTADO: autorização operacional e recorte provêm da missão atual do usuário; não são novas decisões atribuídas a Pedro.
EVIDENCIA_IMPLEMENTACAO: Spec003, Spec016, contratos e código atual estabelecem campos, papéis, projeções e protocolo privado. Code-First permanece EM_REVISAO, com rastreabilidade CF-PRD-FR-005/011/012/013, CF-UC-007/008 e CF-PFLOW-004. A intenção operacional atual não altera domínio científico.
Base funcional: 7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d; PR fase4 pendente por403 do conector; branch publicada https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/feat/frontend-laboratory-dashboard. Base temporária da fase5 é a branch fase4 se ainda aberta; destino final development.

## User Scenarios & Testing *(mandatory)*
### User Story 1 — Encontrar e consultar área autorizada (Priority: P1)
A pessoa vinculada identifica áreas reais e abre ponto/dados/capa do laboratório escolhido.
**Why this priority**: a navegação contextual é a entrada dos fluxos de coleta.
**Independent Test**: lista real → detalhe → retorno/reload, comparando DTO, links e somente leitura em375/768/1440 e320texto200.
**Acceptance Scenarios**:
1. Given vínculo atual, When abre lista/detalhe, Then vê os registros daquele laboratório e os links reais de coleta.
2. Given ausência de opcionais, When consulta detalhe, Then campos ausentes continuam omitidos.
3. Given inatividade ou papel insuficiente, When navega, Then leitura e ações refletem capacidade atual; outsider recebe recusa contextual.
4. Given lista vazia, loading ou falha transitória, When consulta/retry, Then estado é distinto e recuperável, com dados reais após retry.

### User Story 2 — Revisar e confirmar um ponto (Priority: P1)
OWNER/ADMIN contextual ativo cadastra área pelos campos existentes, após revisar coordenadas e mapa.
**Why this priority**: o ponto confirmado será a origem das coletas.
**Independent Test**: cadastro real com0/0 e limites, UF livre/opcionais, mapa/manual, geolocalização negada/timeout/tardia, confirmação/cancelamento/resposta incerta.
**Acceptance Scenarios**:
1. Given coordenadas0/0 ou limites válidos, When confirma, Then valores e campos válidos persistem e detalhe corresponde ao envio.
2. Given localização pendente, When edita manualmente antes do resultado, Then a edição permanece e nada é salvo antes da confirmação.
3. Given localização negada/timeout, When continua manualmente, Then campos são conservados e há orientação recuperável.
4. Given envio incerto, When retorna à listagem, Then verifica o resultado sem sucesso presumido; cancelar preserva o contrato atual de navegação.

### User Story 3 — Ler e gerir capa privada com estados honestos (Priority: P1)
A equipe consulta a capa; editor autorizado seleciona, envia, reconcilia, substitui ou remove com revisão explícita.
**Why this priority**: estado visual não deve confundir disponibilidade, permissão ou confirmação do conteúdo.
**Independent Test**: matriz8 estados, CoverDto real como origem de canEdit, transporte fake delimitado para imagem, OCC/retry/expiração/conflito e bytes retidos.
**Acceptance Scenarios**:
1. Given cada combinação featureEnabled × canEdit × hasImage alcançável, When consulta, Then estado e ações refletem as três dimensões independentes.
2. Given resposta incerta, When repete envio da mesma seleção incerta, Then usa a mesma chave/tentativa vigente e o expectedRevision original, inclusive após reload de preview; somente resultado autoritativo de expiração/conflito permite nova tentativa, preservando seleção.
3. Given revisão stale, When tenta substituir/remover, Then mostra conflito e recarrega estado atual sem sobrescrita silenciosa.
4. Given bytes falham na revisão persistida, When recarrega, Then nova leitura usa mesma revisão e sucesso depende do onLoad atual.
5. Given nova imagem confirmada mas ainda não carregada, When bytes permanecem pendentes ou antigos terminam, Then não anuncia sucesso da tentativa atual antes do conteúdo novo.

### Edge Cases
Zero coordenada;±90/±180; precisão decimal; opcionais vazios; nome100/descrição2000; UF livre; erro de localização code1/code3; edição durante localização; resposta incerta; conta/vínculo inativo/revogado; global ADMIN sem privilégio contextual; flag desligada com capa existente; revisão positiva sem imagem após remoção; inválidos MIME/tamanho/dimensão; confirmação expirada/stale; bytes temporariamente indisponíveis; evento de imagem anterior; texto200/reflow/foco.

## Requirements *(mandatory)*
### Functional Requirements
- FR-001: Adotar apresentação delimitada coerente com starter/marca/Poppins, preservando Next real e os contratos integrados.
- FR-002: Manter DTOs/lista/detalhe, opcionais omitidos, links e contexto explícito; sem dashboard global, novo filtro, galeria ou operação sem contrato.
- FR-003: Conservar campos, UF livre, opcionalidade, limites e coordenadas obrigatórias válidas, incluindo zero e extremos.
- FR-004: Manter revisão do ponto, mapa/manual/localização, timeout10s, edição tardia protegida e ausência de persistência antes de confirmar.
- FR-005: Preservar lock/submissão, orientação de resposta incerta, cancelamento e destino após criação.
- FR-006: Representar separadamente featureEnabled, canEdit e image.hasImage; conservar projeções diferentes de lista e detalhe.
- FR-007: Conservar proxy privado, Image unoptimized, JPEG/PNG/WebP10MiB/4096px e remoção de metadados no contrato existente; sem provider real.
- FR-008: Preservar expectedRevision/OCC, chave/ticket/expectedRevision originais estáveis durante incerteza e reload de preview, reconciliação, expiração, conflito e remoção; falha não descarta capa anterior.
- FR-009: Retry de bytes conserva revisão persistida; metadados/conteúdo têm falhas distintas; sucesso de visualização aguarda onLoad atual e evento anterior não conclui tentativa nova.
- FR-010: Conservar autorização atual, papéis contextuais e readOnly sem bypass global, com guards server e recusa de recurso alheio.
- FR-011: Permitir reflow/foco/teclado nos quatro perfis de evidência, mantendo mapa OSM/atribuição/config/clientSSR e shell aprovado.
- FR-012: Executar regressões proporcionais e CI15gates do HEAD final, revisar diffs/testes/capturas por revisor separado e publicar PR dependente, sem merge/deploy.

### Key Entities
Área-ponto/DTO autorizado; estado do ponto com revisão de edição; contexto/vínculo; projeção de capa da lista; CoverDto; ticket/tentativa; revisão persistida e tentativa local de preview. Nenhuma nova entidade persistida.

## Success Criteria *(mandatory)*
### Measurable Outcomes
- SC-001: Todas as jornadas de consulta conservam dados/destinos/contexto nos quatro perfis e os casos de autorização recusam acesso indevido.
- SC-002: Zero, limites e geolocalização tardia/negada/timeout preservam o ponto revisado; nenhuma criação ocorre antes de confirmar.
- SC-003: As oito combinações e os casos de OCC/retry/expiração/carregamento mostram estados corretos, sem falso sucesso.
- SC-004: PR publicado com evidências reais e15gates do HEAD final conferidos; aceite humano permanece identificado.

## Assumptions and Boundaries
Ambiente sintético próprio preparado e runners existentes. Fakes de transporte provam UI, não operação de Cloudinary. Nenhum backend/API/AuthContext/schema/migration/dependência/lockfile/globals/layout-fonte raiz alterado. Mapa territorial, coletas, ambientais/drafts/IHFR recebem regressão, sem redesenho. Qualificadores IHFR/ADR0001 preservados.
