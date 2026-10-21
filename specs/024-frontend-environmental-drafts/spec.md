# Feature Specification: Dados ambientais e drafts: apresentação sem perda

**Feature Branch**: `feat/frontend-environmental-drafts` (PR Draft #19 publicada)
**Created**:2026-10-20
**Status**: candidata funcional ec4b06e validada com15/15 gates e Codex; HEAD documental sujeito ao gate externo por SHA em tasks.md. Aceite humano pendente. Histórico e escopo preservados em plan.md.
**Input**: handoff autorizado e pedido de execução no chat.

## User Scenarios & Testing

### US1 — Salvar e retomar o rascunho pessoal (Priority: P1)

A pessoa salva explicitamente medições parciais e as retoma sem perder zero, false, vazio ou texto incompleto.

**Why this priority**: Integridade e utilização verificável do fluxo.
**Independent Test**: Salvar 0/false/12., recarregar, comparar células originais e primeiro PUT sob hidratação lenta.
**Acceptance Scenarios**: Given o contexto autorizado e a situação descrita, When a pessoa realiza a jornada, Then Baseline/touched, versão, identidade e revisão são preservados; ausência, editing e value não são confundidos.

### US2 — Resolver incerteza e concorrência (Priority: P1)

A pessoa recebe conflitos sem sobrescrita e recupera resultado desconhecido com a tentativa original.

**Why this priority**: Integridade e utilização verificável do fluxo.
**Independent Test**: Perder resposta de PUT/POST já persistido, receber um conflito posterior e recuperar; executar os cenários existentes em duas abas.
**Acceptance Scenarios**: Given o contexto autorizado e a situação descrita, When a pessoa realiza a jornada, Then Uma rejeição posterior não libera edição de uma tentativa anterior incerta; save/reload/descarte são explícitos; consumo e rollback são atômicos no backend existente.

### US3 — Revisar e ler valores fiéis (Priority: P2)

A pessoa confere os valores efetivos, inclusive números pequenos, e encontra erros em grupos recolhidos.

**Why this priority**: Integridade e utilização verificável do fluxo.
**Independent Test**: Revisar/confirmar 0.0000004 e fechar o grupo de um campo inválido antes de validar.
**Acceptance Scenarios**: Given o contexto autorizado e a situação descrita, When a pessoa realiza a jornada, Then Não zero não vira zero por arredondamento de apresentação; grupo abre antes do foco; quatro grupos, unidades e versão permanecem.

### Edge Cases

Hidratação lenta; resposta perdida; rejeição posterior; duplo clique; acesso revogado; laboratório inativo; contexto cruzado; dados parciais; nomes longos; grupos fechados; rolagem/teclado/texto ampliado.

## Requirements

### Functional Requirements

- **FR-001**: Preservar rascunho pessoal segregado por titular/coleta.
- **FR-002**: Preservar false, zero, null, ausência, string vazia e texto parcial nas representações vigentes.
- **FR-003**: Manter hidratação/prontidão, baseline/touched e primeiro PUT sem perda.
- **FR-004**: Manter salvamento explícito, identidade/revisão/chave e concorrência otimista.
- **FR-005**: Manter tentativa incerta íntegra mesmo após rejeição posterior (R5).
- **FR-006**: Preservar descarte/retomada, consumo transacional e rollback.
- **FR-007**: Exibir magnitude e valor aceito sem arredondamento silencioso para zero (R2).
- **FR-008**: Abrir grupos recolhidos e expor erro antes de focar o campo (R3).
- **FR-009**: Manter confirmação imutável, measurementContractVersion e unidades.
- **FR-010**: Não alimentar IHFR com draft nem acrescentar ciência/autosave.
- **FR-011**: Manter navegação com alterações não salvas e acessibilidade responsiva.

### Key Entities

Coleta confirmada imutável e contexto autorizado. Conjunto ambiental confirmado e draft pessoal separado com células, ID, revisão e saveKey; sem novo modelo persistido.

## Success Criteria

- **SC-001**: Todos os cenários de recuperação convergem para uma única identidade persistida, sem sobrescrita indevida.
- **SC-002**: Os valores válidos mantêm significado e precisão ao atravessar entrada, revisão e leitura.
- **SC-003**: Os controles essenciais são utilizáveis na matriz responsiva/teclado, sem obstrução.
- **SC-004**: As restrições de acesso, imutabilidade e separação entre rascunho/confirmado são preservadas.

## Assumptions

A fonte visual apoia composição, não governa domínio. Aceite humano e validação científica são separados. Historicamente, a candidata5ca5205 comprovou os cenários ambientais, incluindo os três P1 A → B → A e24 capturas; a falha herdada de coleta e cinco gates NOT_RUN exigiram nova validação integral. A candidata funcional ec4b06e concluiu essa regressão com15/15 gates e190/190 E2E; o HEAD documental posterior mantém seu gate externo próprio. Produção, aceite humano e validação científica não são inferidos desses testes.
## Autoridade e escopo

DECISAO_CONFIRMADA: pedido do usuário “agora execute o prompt”, em20/10/2026, executa o handoff das fases6/7 e seus complementos R1–R4. Isso autoriza implementação, testes e publicação das branches/PRs, mas não remove restrições da integração nem autoriza merge, push direto em main/development, deploy, banco real, provedores reais ou ciência nova. O PRD Code-First continua EM_REVISAO. Código é EVIDENCIA_IMPLEMENTACAO no alcance efetivamente verificado, não intenção científica.

Preservados: docs/raw, autenticação, autorização, APIs/DTOs de domínio, schema/migrations, dependências/lockfile, layout raiz, Poppins, globals.css, shell e correção022. Os quatro qualificadores IHFR permanecem: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

R4: cabeçalhos históricos do acompanhamento/prontidão são recomendação ao mantenedor do PR17, não editados por esta candidata. Fases1–5 não serão refeitas; fases8–10 não foram antecipadas. Nenhum aceite humano é atribuído a terceiros.

Fonte: [handoff](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/03af44aeba6f092d0c082c1ac3159ba83baf495c/docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-6-7.md).
Rastreabilidade: Specs005/015 / CF-PRD-FR-007 / CF-UC-011.
