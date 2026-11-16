# Feature Specification: Apresentação pública com Hifro

**Feature Branch**: `codex/apresentacao-hifro-20261116`
**Created**: 2026-11-16
**Status**: Dados criados e validados; capas ilustrativas implementadas e validadas localmente, implantação pendente
**Input**: Pedro autorizou nesta conversa criar a apresentação na produção, povoar conta/equipe/áreas/coletas e preparar capas. Confirmou Universo IF como banco de produção. Selecionou o identificador curto hifro@hf.example, sem caixa postal. Upload de capas aguarda confirmação do desenvolvedor; vídeo e Playwright de apresentação adiados.

## User Scenarios & Testing

### User Story 1 - Acessar o laboratório (Priority: P1)

Visitante acessa com Hifro, vê um laboratório organizado e uma equipe compreensível.
**Why this priority**: Entrada simples para a apresentação pública.
**Independent Test**: Login e consulta de laboratório/equipe.
**Acceptance Scenarios**:
1. Hifro está ativo, com acesso já liberado, proprietário de um laboratório próprio.
2. Há dois administradores e dois membros, todos com contas fictícias e nomes amigáveis.
3. Senha fácil de memorizar, com os quinze caracteres mínimos exigidos, sem mudar a política de autenticação.

### User Story 2 - Explorar o território e as coletas (Priority: P2)

Visitante explora três áreas com nomes locais, quatro coletas por área e resultados ilustrativos coerentes.
**Why this priority**: Oferecer conteúdo útil para conhecer o produto.
**Independent Test**: Consultar mapa, área, dados ambientais e IHFR.
**Acceptance Scenarios**:
1. Áreas fazem referência a Aviação, Trizidela e povoado Leite, em Itapecuru-Mirim/MA.
2. Dados e coordenadas são identificados nas descrições como ilustrativos; não representam pesquisas reais nessas localidades.
3. IHFRs seguem o avaliador e contrato existentes; alguns registros ficam disponíveis para posterior preenchimento/cálculo.

### User Story 3 - Apresentar as capas (Priority: P3)

A equipe encontra três fotos de uso permitido e compatíveis com o contexto regional, exibidas nas áreas Hifro sem capa real.
**Why this priority**: Completar a apresentação preservando a funcionalidade de capa.
**Independent Test**: Conferir arquivos, dimensões, fonte/licença, escopo, prioridade da capa real e controles preservados.
**Acceptance Scenarios**:
1. Fotos leves em formato aceito, com procedência e licença registradas.
2. Fotografias são ilustrativas, sem afirmar retratar as áreas locais.
3. Controles mantêm permissões e comportamento existentes; fotos estáticas não simulam upload nem substituem uma capa real.

### Edge Cases

- Conta/endereço/ID preexistentes interrompem a aplicação; nunca sobrescrever outro registro.
- Operação completa em transação atômica, com conferência do destino e do inventário resultante.
- Nome de pesquisador em conta fictícia não representa participação real ou endosso.

## Requirements

### Functional Requirements

- **FR-001**: Criar cinco contas ativas e um laboratório com OWNER, dois ADMIN e dois MEMBER contextuais; papéis globais USER.
- **FR-002**: Usar hifro@hf.example como identificador de acesso já liberado, conforme escolha de Pedro; não enviar e-mails a endereços fictícios.
- **FR-003**: Criar três áreas, doze coletas e dados ambientais/suplementos suficientes para resultados gerados pelo avaliador vigente.
- **FR-004**: Preservar todos os dados anteriores, schema e política de autenticação; limitar a alteração de apresentação às capas das três áreas Hifro.
- **FR-005**: Exibir as fotos ilustrativas preparadas quando essas áreas não têm capa enviada, mantendo seleção/envio/recarga e prioridade da capa persistida pelo serviço.
- **FR-006**: Não produzir roteiro, gravação ou script Playwright de apresentação nesta entrega.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Hifro chega ao laboratório pelo login principal; cinco vínculos nos papéis previstos.
- **SC-002**: Três áreas com quatro coletas cada; proveniência e resultados coerentes e verificáveis.
- **SC-003**: Três capas ilustrativas na lista/detalhe Hifro, com fonte/licença, sem escrita nas tabelas de capas e mantendo os controles do serviço.
- **SC-004**: Inventário anterior preservado e zero migrações ou alterações de configurações de produção.

## Assumptions

- DECISAO_CONFIRMADA: autorização de Pedro em 16/11/2026, incluindo criação de dados na produção e branch Universo IF.
- A conta de apresentação terá acesso apenas ao seu laboratório, sem administração global.
- RECOMENDACAO adotada: nomes de pesquisadores como homenagem, com caráter fictício registrado nas descrições e no pacote.
- Rastreabilidade: fluxos existentes de contas (012), laboratório (002), áreas (003), coletas (004), dados ambientais (005), IHFR (006/007), capas (016) e localização (037). Não cria ciência nem novas capacidades de produto.

## Adendo — capas ilustrativas e controles preservados — 16/11/2026

DECISAO_CONFIRMADA: após testar no próprio navegador e enviar o print de “O serviço de imagens está indisponível”, Pedro aceitou a alternativa de capas fixas e exigiu manter os botões da funcionalidade. A espera inicial foi substituída por esta alteração limitada de apresentação; vídeo e roteiro continuam adiados.

- Exibir as três fotos na lista e no detalhe, somente após a leitura autorizada dos dados e para os pares exatos laboratório/área do inventário.
- Uma capa registrada pelo serviço tem prioridade, inclusive quando sua leitura falha: a foto ilustrativa não deve esconder erros da capa real.
- Não chamar uma foto estática de upload salvo nem alterar revisões, estados ou mensagens de sucesso do serviço.
- Preservar permissões e condições existentes dos controles. Remoção continua disponível apenas para capa real e com a capacidade atual; remover uma capa real faz a área voltar à ilustração.
- Ativos livres com atribuição são públicos e ilustrativos; fotografias privadas do serviço continuam no proxy autorizado.
- SC-003 passa a incluir as três imagens na apresentação, sem escrever nas tabelas de capas. Critérios e etapas iniciais acima preservam o histórico da preparação.

DECISAO_CONFIRMADA: Pedro pediu compatibilidade com a paisagem local e apontou a inadequação da seleção genérica. Fontes atuais: duas fotos de babaçu/cultivo em Itapecuru-Mirim e uma do rio Itapecuru em Rosário, CC BY-SA, com crédito e indicação das adaptações. A seleção inicial fica somente como histórico de procedência.
