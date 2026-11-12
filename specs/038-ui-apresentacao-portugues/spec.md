# Especificação: apresentação e textos em português

**Feature Branch**: `codex/ui-apresentacao-portugues-20261112`
**Created**: 2026-11-12
**Status**: Implementada e validada localmente; aceite visual pendente
**Input**: pedido de Pedro Vítor nesta conversa, com três capturas de mapa, leitura e resumo do IHFR.

## User Scenarios & Testing

### User Story 1 — Consultar coletas e diagnósticos com clareza (P1)

Visitantes autenticados encontram confirmação antes da ocorrência no painel do mapa; o último IHFR tem escore destacado à esquerda e informações à direita.

**Independent Test**: abrir uma área no mapa e uma área com IHFR vigente.

**Acceptance Scenarios**:
1. Confirmação aparece primeiro, com rótulo e data em negrito. Horários exibem horas e minutos.
2. O resumo mantém título, formato e dimensões gerais, usa a paleta verde existente e apresenta escore grande à esquerda, demais informações à direita com tipografia uniforme. Em telas estreitas, as colunas se empilham para manter o conteúdo legível.
3. A seleção da coleta mais recente com diagnóstico vigente continua idêntica, inclusive quando a coleta mais nova não tem diagnóstico.

### User Story 2 — Ler o detalhe sem quebras indevidas (P1)

**Independent Test**: consultar detalhe com classe Moderado, valores fracionários, com e sem ações permitidas, em desktop e mobile.

**Acceptance Scenarios**:
1. Dados ambientais precedem Registro no desktop e no mobile.
2. No mobile, após o cabeçalho, a sequência é Leitura da coleta → Dados ambientais → Registro → Ações autorizadas.
3. Moderado permanece uma palavra inteira, sem corte nem sobreposição.
4. Escore e componentes IHFR têm exatamente duas casas decimais na apresentação; o resultado armazenado, a classe e os dados enviados não são alterados.
5. Redimensionar mantém valores preenchidos, foco e disclosures; não duplica formulários nem controladores.

### User Story 3 — Entender a interface em português (P2)

**Independent Test**: revisar textos públicos, conta, laboratório, mapa, coletas, dados ambientais, diagnóstico e administração, inclusive rótulos acessíveis e estados dinâmicos.

**Acceptance Scenarios**:
1. OWNER/ADMIN/MEMBER recebem rótulos portugueses sem modificar enums, permissões ou nomes internos.
2. Rótulos e mensagens em inglês são traduzidos, incluindo escores, área de trabalho e mensagens de falha apresentadas pelo cliente.
3. Login, e-mail, nomes próprios, unidades, identificadores técnicos de proveniência e dados escritos pelo usuário são preservados quando aplicável.

### Edge Cases

- Zero é exibido como 0,00; ausência permanece ausência, sem resultado inventado.
- Horários de ocorrência preservam a hora civil do fuso declarado. Confirmação usa esse mesmo fuso quando disponível; metadados explicitamente UTC continuam UTC. Os atributos temporais mantêm valores integrais.
- Números são apresentados com vírgula decimal pt-BR; campos de edição não são arredondados nem reformulados.
- Textos longos e zoom não causam perda de conteúdo em 320/375/768/1024/1440 px.
- Versões, hashes, IDs e qualificadores científicos não são renomeados nem suprimidos.

## Requirements

### Functional Requirements

- **FR-001**: exibir confirmação primeiro e em negrito no mapa, com data brasileira e hora/minuto.
- **FR-002**: destacar escore no resumo IHFR à esquerda, detalhes à direita, título preservado e cores da plataforma.
- **FR-003**: aplicar a nova ordem do detalhe à ordem visual, de leitura e de teclado.
- **FR-004**: mostrar escores IHFR com duas casas, sem modificar valores, fórmulas ou classes internas.
- **FR-005**: impedir divisão de palavras da classe experimental e preservar layout responsivo.
- **FR-006**: apresentar textos da interface em português, preservando códigos e contratos internos.
- **FR-007**: preservar proveniência e os qualificadores experimentais obrigatórios do ADR-0001.

### Key Entities

Coleta e diagnóstico IHFR existentes; nenhuma entidade, campo persistido ou contrato externo novo.

## Success Criteria

- **SC-001**: as ordens e destaques solicitados são verificáveis nos componentes reais em desktop e mobile.
- **SC-002**: 0.6299999999999999 é apresentado como 0,63 e nenhuma casa adicional aparece nos resultados IHFR.
- **SC-003**: Moderado não quebra internamente nas larguras verificadas.
- **SC-004**: os dados de origem continuam idênticos após a renderização e todas as mudanças funcionais ficam restritas à apresentação.
- **SC-005**: a revisão de textos não encontra inglês editorial remanescente nos fluxos examinados.

## Assumptions

- `DECISAO_CONFIRMADA`: pedido de Pedro em 12/11/2026 governa o recorte visual e substitui as ordens/apresentações anteriores somente nesses pontos.
- `RECOMENDACAO`: usar verde esmeralda já adotado pelo sistema e formatação pt-BR com vírgula decimal.
- Rastreabilidade: CF-PRD-FR-005/FR-013 e specs 008/025/026/036/037 como baseline, sem alterar intenção científica.
- A branch independente da landing não será incorporada, editada ou sobrescrita.

## Ajustes após teste manual — 12/11/2026

DECISAO_CONFIRMADA: Pedro solicitou nesta conversa e no print image(5).png dois ajustes na mesma branch/PR: manter os limites experimentais em “Ler mais” também quando não houver IHFR gerado e usar IHFR, em vez de Escore/Score, para nomear o resultado na interface. Este adendo substitui somente a terminologia pública anterior; nomes internos e valores científicos permanecem intactos.

Aceite: limites inicialmente recolhidos com e sem diagnóstico, abrindo por teclado/clique e preservando todos os qualificadores; resultado identificado como “IHFR registrado”, inclusive nos cards e na distinção entre ausência e zero. Atualizar o Preview já autorizado para novo teste de Pedro, sem merge.
