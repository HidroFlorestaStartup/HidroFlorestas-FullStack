# Feature Specification: Coletas: apresentação e recuperação segura

**Feature Branch**: `feat/frontend-collections` (proposta, não publicada)
**Created**:2026-10-20
**Status**: CANDIDATA_LOCAL; validação oficial e publicação pendentes.
**Input**: handoff autorizado e pedido de execução no chat.

## User Scenarios & Testing

### US1 — Recuperar uma confirmação (Priority: P1)

A pessoa recupera uma confirmação cuja resposta se perdeu, mantendo o mesmo contexto, chave, corpo e identidade.

**Why this priority**: Integridade e utilização verificável do fluxo.
**Independent Test**: Persistir o primeiro POST real, perder somente a resposta, tentar voltar/corrigir e recuperar pelo reenvio idêntico.
**Acceptance Scenarios**: Given o contexto autorizado e a situação descrita, When a pessoa realiza a jornada, Then Resultado incerto impede alteração/reinício; uma resposta posterior de rejeição não prova que a primeira operação não gravou.

### US2 — Registrar e revisar a ocorrência (Priority: P2)

A pessoa confere laboratório, área, instante, offset e milissegundos antes de confirmar.

**Why this priority**: Integridade e utilização verificável do fluxo.
**Independent Test**: Preencher, revisar, corrigir antes de enviar e confirmar um instante com milissegundos e offset manual.
**Acceptance Scenarios**: Given o contexto autorizado e a situação descrita, When a pessoa realiza a jornada, Then Revisão não persiste; valores e fuso não são normalizados silenciosamente; mensagens distinguem falha de rede e campo inválido.

### US3 — Consultar o registro imutável (Priority: P3)

O membro consulta os metadados e os fluxos existentes sem ganhar permissão pela apresentação.

**Why this priority**: Integridade e utilização verificável do fluxo.
**Independent Test**: Consultar em quatro larguras, texto200, teclado e laboratório inativo.
**Acceptance Scenarios**: Given o contexto autorizado e a situação descrita, When a pessoa realiza a jornada, Then Nenhuma edição/exclusão de coleta; ocorrência e confirmação distintas; último controle não encoberto.

### Edge Cases

Hidratação lenta; resposta perdida; rejeição posterior; duplo clique; acesso revogado; laboratório inativo; contexto cruzado; dados parciais; nomes longos; grupos fechados; rolagem/teclado/texto ampliado.

## Requirements

### Functional Requirements

- **FR-001**: Preservar contexto explícito e autorização atual.
- **FR-002**: Preservar instante, offset e milissegundos durante toda a jornada.
- **FR-003**: Revisão antes da primeira persistência, preparação somente em memória.
- **FR-004**: Conservar snapshot enviado e impedir edição na incerteza.
- **FR-005**: Recuperar sem duplicação e impedir envio concorrente pela interface.
- **FR-006**: Distinguir resultado desconhecido, rejeição, conflito e sucesso.
- **FR-007**: Preservar imutabilidade e projeção pública.
- **FR-008**: Conservar consumidores IHFR existentes, sem fase8.
- **FR-009**: Garantir teclado/reflow e ações acessíveis na matriz visual.
- **FR-010**: Preservar erro, loading, leitura, inatividade e acesso negado.

### Key Entities

Coleta confirmada imutável e contexto autorizado. Tentativa de criação volátil com snapshot do envio; sem draft persistido de criação.

## Success Criteria

- **SC-001**: Todos os cenários de recuperação convergem para uma única identidade persistida, sem sobrescrita indevida.
- **SC-002**: Os valores válidos mantêm significado e precisão ao atravessar entrada, revisão e leitura.
- **SC-003**: Os controles essenciais são utilizáveis na matriz responsiva/teclado, sem obstrução.
- **SC-004**: As restrições de acesso, imutabilidade e separação entre rascunho/confirmado são preservadas.

## Assumptions

A fonte visual apoia composição, não governa domínio. Aceite humano e validação científica são separados. A candidata ainda não comprovou estes critérios em E2E/produção.
## Autoridade e escopo

DECISAO_CONFIRMADA: pedido do usuário “agora execute o prompt”, em20/10/2026, executa o handoff das fases6/7 e seus complementos R1–R4. Isso autoriza implementação, testes e publicação das branches/PRs, mas não remove restrições da integração nem autoriza merge, push direto em main/development, deploy, banco real, provedores reais ou ciência nova. O PRD Code-First continua EM_REVISAO. Código é EVIDENCIA_IMPLEMENTACAO no alcance efetivamente verificado, não intenção científica.

Preservados: docs/raw, autenticação, autorização, APIs/DTOs de domínio, schema/migrations, dependências/lockfile, layout raiz, Poppins, globals.css, shell e correção022. Os quatro qualificadores IHFR permanecem: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

R4: cabeçalhos históricos do acompanhamento/prontidão são recomendação ao mantenedor do PR17, não editados por esta candidata. Fases1–5 não serão refeitas; fases8–10 não foram antecipadas. Nenhum aceite humano é atribuído a terceiros.

Fonte: [handoff](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/03af44aeba6f092d0c082c1ac3159ba83baf495c/docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-6-7.md).
Rastreabilidade: Spec004 / CF-PRD-FR-006 / CF-UC-009 / CF-PFLOW-005.
