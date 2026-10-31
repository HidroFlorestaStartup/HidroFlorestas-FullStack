# Feature Specification: área, coletas e apresentação IHFR

**Feature Branch**: `feat/ajustes-area-coletas-ihfr`
**Created**: 2026-10-31
**Status**: Draft — preparação G0; produto NAO_IMPLEMENTADO nesta frente.
**Input**: UI-02, UI-03, UI-04 e UI-06 em área/coleta, aprovadas no handoff de Pedro #44; divisão confirmada na missão HF-UI-044-G0.
**Base exata**: `07755822f5dc75fe2be1d924005d30ed99f64a0b`, independente de A/C.

## Fontes e autoridade

[Decisões completas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), [critérios](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/criterios-de-aceite.md), [plano G0](../../docs/plans/active/hf-ui044-g0/plan.md). Starter somente visual: `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.

DECISAO_CONFIRMADA: os ajustes UI autorizados. As prioridades abaixo são RECOMENDACAO de execução. Preservar constituição, SOURCE_AUTHORITY e estados do PRD Code-First; apresentação não aprova nem altera o contrato científico.

## User Scenarios & Testing

### US1 — Reencontrar coletas e resultados pela área (P1)

**Teste independente**: abrir uma área com coletas em diferentes datas/offsets, navegar ao detalhe/dados ambientais e retornar.

**Aceite**: a área lista coletas pela ocorrência em campo, mais recente primeiro, e oferece acesso claro aos dados/detalhe. O último IHFR disponível aparece mesmo quando pertence a coleta anterior à mais recente, com origem e datas explícitas. Não mostrar resultado revogado como atual, não inventar resultado zero e não gerar diagnóstico automaticamente.

### US2 — Ler a coleta com composição clara (P1)

**Teste independente**: abrir coleta confirmada e os estados sem dados, com draft e com resultado, em desktop/mobile.

**Aceite**: composição de largura/colunas e hierarquia inspirada no starter; dados e ações reais preservados; diferenças entre ocorrência, confirmação e draft continuam visíveis. Navegação não perde o vínculo com laboratório/área/coleta nem permite editar confirmados por conveniência visual.

### US3 — Entender o resultado e consultar detalhes técnicos (P1)

**Teste independente**: com resultado, expandir/recolher detalhes por teclado; sem dados ambientais confirmados, identificar a ação necessária.

**Aceite**: rótulo experimental curto próximo do resultado e detalhes técnicos acessíveis, contendo proveniência e integralmente CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. Mensagem humana orienta a falta de dados ambientais confirmados; códigos técnicos não substituem essa orientação. Não apagar qualificadores, mudar fórmulas, manifests, hashes ou critérios científicos.

### Edge Cases

Área sem coletas; nenhuma coleta com IHFR; coleta mais recente sem diagnóstico; múltiplas coletas com datas/offsets equivalentes; resultado revogado/substituído; acesso negado; erro/loading; retorno por histórico; atualização tardia; textos longos e última ação no mobile. Critério de desempate técnico deve ser explícito e testado, sem ser apresentado como nova aprovação de produto.

## Requirements

- **FR-036-001**: aplicar UI-02 com ordenação temporal correta, links e origem do IHFR disponível.
- **FR-036-002**: aplicar UI-03 preservando estados e dados reais.
- **FR-036-003**: aplicar UI-04 sem ocultar permanentemente os qualificadores ou mudar ciência.
- **FR-036-004**: aplicar UI-06 em páginas de área/coleta, comparando os runtimes no mesmo estado.
- **FR-036-005**: preservar autorização contextual, imutabilidade, drafts pessoais, proveniência e contratos existentes.

Entidades reutilizadas: área, coleta, ocorrência, dados ambientais confirmados, draft pessoal e diagnóstico versionado. Reusar specs 021/023/024/025 conforme seus estados e completar rastreabilidade Code-First no plano, sem atribuir validade científica definitiva.

## Success Criteria

**SC-036-001**: cenários US1–US3 e contraprovas de tempo/estado/acesso passam com evidência por SHA.
**SC-036-002**: comparação atual em 320, 375/390, 768 e 1440 px, texto 200%, teclado e foco; capturas viewport `fullPage: false` e geometria sem overflow/ação oculta.
**SC-036-003**: quinze gates preservados e resultados reais registrados, sem rebaixar assertivas para adequar layout.
**SC-036-004**: diff não contém alteração de motor/fórmula/manifesto científico nem formulário de localização de C.

## Assumptions and limits

API/leituras podem exigir adaptação focal, a demonstrar pelo executor. Qualquer DTO compartilhado com C passa pelo coordenador. Shell pertence a A; não copiar sua branch. UI-07, REV-01–REV-03, provedores, deploy e ciência fora de escopo. [Plano](plan.md), [tarefas](tasks.md), [evidências](implementation-evidence.md).
