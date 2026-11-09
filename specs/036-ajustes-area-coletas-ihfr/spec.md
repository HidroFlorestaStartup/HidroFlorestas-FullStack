# Feature Specification: área, coletas e apresentação IHFR

> **Ciclo atual C1–C3 (05/11/2026):** [recibo e evidências](evidence/ui044-correcoes-finais-20261105/readme.md). Os estados anteriores abaixo são checkpoints históricos; não qualificam a nova candidata.

**Feature Branch**: `feat/ajustes-area-coletas-ihfr`
**Created**: 2026-10-31
**Status**: Implementação B validada em CI no `CODE_SHA_TESTED=d7586ab95c69c45211e463516080e741bbb3931a` (15/15 gates, run 41252813575/tentativa 1); comparação bilateral UI-06 e aceite ainda pendentes. O histórico abaixo conserva checkpoints anteriores.
**Input**: UI-02, UI-03, UI-04 e UI-06 em área/coleta, aprovadas no handoff de Pedro #44; divisão confirmada na missão HF-UI-044-G0.
**Base exata**: `07755822f5dc75fe2be1d924005d30ed99f64a0b`, independente de A/C.

## Fontes e autoridade

[Decisões completas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), [critérios](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/criterios-de-aceite.md), [plano G0](../../docs/plans/active/hf-ui044-g0/plan.md). Starter somente visual: `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.

DECISAO_CONFIRMADA: os ajustes UI autorizados. As prioridades abaixo são RECOMENDACAO de execução. Preservar constituição, SOURCE_AUTHORITY e estados do PRD Code-First; apresentação não aprova nem altera o contrato científico.

## User Scenarios & Testing

### US1 — Reencontrar coletas e resultados pela área (P1)

**Teste independente**: abrir uma área com coletas em diferentes datas/offsets, navegar ao detalhe/dados ambientais e retornar.

**Aceite**: a área lista coletas pela ocorrência em campo, mais recente primeiro, e oferece acesso claro aos dados/detalhe. O último IHFR disponível aparece mesmo quando pertence a coleta anterior à mais recente, com origem e datas explícitas. Não mostrar resultado revogado como atual, não inventar resultado zero e não gerar diagnóstico automaticamente.

**INFERENCIA operacional registrada em UI-02, não nova decisão aprovada**: percorrer as coletas pela ocorrência em campo decrescente e obter o primeiro diagnóstico disponível/vigente; empates usam critério estável explicitamente documentado sem modificar o instante original. O executor deve confirmar compatibilidade com os contratos atuais. Data de confirmação ou de cálculo não pode substituir silenciosamente esse critério. Preservar Registrar coleta, acesso ao diagnóstico individual e retorno ao contexto da área.

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


## Registro de implementação — 2026-10-31

**EVIDENCIA_CODIGO**: UI-02 implementada como consulta escopada às coletas confirmadas; usa instante UTC da ocorrência e mantém o offset informado, ordenação decrescente e desempate por UUID decrescente. A seleção do primeiro ponteiro de IHFR vigente nas coletas ordenadas é **INFERENCIA** do handoff, não aprovação científica ou novo requisito normativo. Diagnósticos substituídos/revogados não são inferidos do histórico e a ausência não vira score zero.

**EVIDENCIA_CODIGO**: UI-03 reorganizada em colunas apenas em larguras desktop, mantendo rotas, confirmação imutável, ações ambientais e estados de leitura. Presença de dados ambientais é consulta de existência, independentemente de versão científica; rascunhos não passam por conjuntos confirmados.

**EVIDENCIA_CODIGO**: UI-04 mantém qualificador curto visível e detalhes nativos expansíveis por Enter/Espaço (limites, quatro códigos e proveniência). Falta de medições confirmadas informa a ação adequada e sua natureza, em vez de expor somente o código interno.

**Validação**: código e testes versionados em commits próprios; resultados de execução do HEAD final e comparação simultânea do starter com o FullStack ainda não confirmados. Consultar [evidências](implementation-evidence.md). Nenhuma mudança no contrato científico, persistência, schemas, shell A ou formulário C.

## Critérios de regressão focal após CI 41234289600

**INFERENCIA operacional UI-02 (inalterada):** o último IHFR disponível deve ser selecionado entre diagnósticos CURRENT efetivamente existentes, percorrendo coletas confirmadas ordenadas pelo instante de ocorrência em campo. O teste integrado usa área sintética própria sem diagnósticos preexistentes; a coexistência de outro CURRENT em outra área ou coleta de uma fixture global não autoriza substituir a origem exibida.

**FR-036-003 / SC-036-002:** os quatro qualificadores experimentais completos permanecem legíveis quando os detalhes são abertos por teclado; a expressão humana “Limites do diagnóstico experimental” não pode fragmentar uma palavra na largura 320px com texto a 200%. Não é autorizado reduzir a ampliação, desativar a verificação ou mudar a ciência.

**Estado:** requisito já aprovado e implementado; correções locais e regressões documentadas no plano e nas tarefas. Aceite humano e comparação executada com o starter permanecem independentes dos testes sintéticos de CI.


## Estado verificado HF-UI-044-CLOSE-B (2026-11-01)

`EVIDENCIA_IMPLEMENTACAO`: a suíte RC no **código** `d7586ab95c69c45211e463516080e741bbb3931a` terminou 15/15 PASS em [run 41252813575, tentativa 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252813575). As verificações de ocorrências/offsets, links, presença ambiental e qualificadores no cenário sintético constam dos testes e logs desse mesmo código. Capturas verificadas da execução **FullStack** não constituem a comparação bilateral solicitada por FR-036-004/SC-036-002. **T008/T016 continuam NOT_RUN**, pois o starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` não foi executado em paridade de fixtures/estado/viewport. O impedimento e o mapa de provas estão em [implementation-evidence.md](implementation-evidence.md). Não existe aceite humano, validação científica definitiva ou validação composta com o HEAD A atual.

## Continuidade CLOSE-PARALLEL-02 / B — 2026-11-01

`EVIDENCIA_IMPLEMENTACAO` estática: nova instrumentação focal em `qa/hf-ui044/domain.spec.ts`
e `domain-fixtures.ts`, fora do testDir oficial. Nenhum arquivo de produto, contrato científico,
schema, shell A ou formulário C alterado. Base funcional composta `6c61056f`, pacote `22bb9c1b`.

FR-036-004/SC-036-002 são exercitados por75 casos pareados planejados:60 recortes centrais,
12 capturas individuais de qualificadores, duas jornadas teclado/histórico e uma observação
de reload. O índice registra também NOT_RUN. A referência preserva seu adapter/mock no próprio
browser; o FullStack recebe chamadas HTTP nativas autenticadas sobre PostgreSQL owned do runner.

As fontes do starter `cbb954a` mostram ordenação por confirmação e ausência do resumo CURRENT
na área; scores são predefinidos para demonstração. São diferenças de modelo explicitadas como
NON_EQUIVALENT, sem alterar a decisão posterior UI-02 ou importar resultados simulados.
Área vazia/registro/ausência possuem estados semanticamente pareados; a avaliação visual depende
dos PNG reais. Execução, comparabilidade, requisito e completude são eixos independentes.

Runtime bilateral desta continuidade e inspeção de imagens: NOT_RUN no corte de implementação.
T008/T016 e novos itens de runtime continuam abertos. `B_VISUAL_READY_FOR_RUNTIME` descreve
o preparo do código, não `UI06_B_EVIDENCE_COMPLETE`. Aceite humano permanece pendente.

## Ciclo vigente C1–C3 — correções finais UI044, 05/11/2026

**DECISAO_CONFIRMADA:** [handoff de Pedro pinado em 71b8c95](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/71b8c95b7d1d1509b7155a36d65f70289c0a39f3/docs/plans/active/correcoes-finais-ui044-20261105/prompt-de-execucao.md) e [aceite com três ressalvas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/51#issuecomment-6671722605). O restante aprovado permanece preservado. A base desta correção é development `7bae1f87cb8d6a708b7c4de0b990e82e5a503369`, tree `0c836da964c377a7d1e6bc8b2331524e931ea901`, que contém o merge51. Os estados anteriores desta spec são históricos, não resultados desta candidata. [O0 e acompanhamento do ciclo](evidence/ui044-correcoes-finais-20261105/readme.md).

| Correção | Requisito existente | Critério focal de aceite |
|---|---|---|
| C1 | US1; FR-036-001; FR-036-005 | Em cada card, remover o link de nome exato IHFR e preservar Abrir coleta/Dados ambientais com destinos reais. Exibir somente Score registrado: valor de `row.currentDiagnosis.displayScore` daquela coleta, quando há diagnóstico vigente. Preservar precisão textual e zero registrado; ausência não vira zero nem recebe o resultado de outra coleta. Resumo superior, metadata e ordem por ocorrência permanecem. |
| C2 | US3; FR-036-003; FR-036-005 | Uma ocorrência exata de Limites do diagnóstico experimental no DOM da leitura e zero nas ações, fora de diálogos transitórios. Com diagnóstico, abrir o disclosure por teclado; sem diagnóstico, preservar ausência honesta e qualificadores. Cobrir gerenciamento permitido, MEMBER e laboratório inativo. |
| C3 | US2; FR-036-002; FR-036-005 | Mobile: título/retorno, Leitura, Registro, Dados ambientais, Ações quando permitidas, em ordem DOM, visual e de foco coerente. Desktop1440 mantém colunas e posições relativas. Um controlador de gerenciamento e uma instância de cada bloco, formulário e ID; leitura atualizada nas mutações, conflitos e recuperação. |

A alternativa C1 sem score continua autorizada somente diante de complexidade material comprovada e registrada. A implementação observada já fornece o score; o ciclo adota a preferência com score, sem novo cálculo, query, API ou arredondamento. Prop zero em unidade comprova rendering, nunca cálculo científico.

SC-036-001/SC-036-002 exigem regressões significativas e capturas da aplicação Next real nos estados alterados:1440,375,390 e320 com texto200%, sem overflow/obstrução, com/sem diagnóstico e com/sem ações. Reutilizar provas existentes de criar/substituir/revogar,409,unknown/recovery/replay. SC-036-003 exige os quinze gates do F e SC-036-004 preserva o escopo. FR-036-004 e caixas históricas permanecem registradas; não reabrir toda a comparação Lovable nesta correção focal.

Sem alteração de ciência, API, schema, migrations, autenticação, dependências, provedores ou shell. Permanecem CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. O aceite das novas correções e o merge são de Pedro; não atribuídos a Luciano.
