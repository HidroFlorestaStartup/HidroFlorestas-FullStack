# Feature Specification: Rascunhos pessoais de medições

**Feature Branch**: `015-environmental-drafts`
**Created**: 2026-10-10
**Status**: Especificada; decisão material confirmada
**Input**: Aprovação explícita do recorte pessoal e política de descarte/retenção nesta conversa.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Salvar e retomar preenchimento (Priority: P1)

Pesquisador salva explicitamente medições parciais de coleta já confirmada e
retoma depois de recarregar, sem perder zero, Não ou texto ainda incompleto.
**Why this priority**: permite continuar a coleta de medições em outra sessão.
**Independent Test**: salvar parcial, recarregar e obter os mesmos campos em duas sessões do titular.
**Acceptance Scenarios**:
1. Given coleta confirmada e permissão atual, When salva conteúdo parcial, Then só o titular consegue retomá-lo.
2. Given valor zero, Não, ausência e texto `12.`, When salva e recarrega, Then todos mantêm sua semântica.
3. Given acesso a outro laboratório ou usuário, When consulta/escreve, Then não obtém o rascunho alheio.

### User Story 2 - Resolver conflito e descartar (Priority: P1)

Pesquisador recebe conflito entre abas sem sobrescrita silenciosa e pode descartar
seu rascunho definitivamente mediante confirmação clara.
**Why this priority**: previne perda de trabalho e atende o controle do titular.
**Independent Test**: duas revisões concorrentes têm um vencedor; outra recebe conflito; descarte não remove versão recriada.
**Acceptance Scenarios**:
1. Given duas abas da mesma versão, When ambas salvam, Then uma vence e a outra preserva sua tentativa local.
2. Given falha de rede, When repete o mesmo save, Then recupera resultado sem nova revisão.
3. Given descarte confirmado, When recarrega, Then rascunho desaparece; dados confirmados permanecem intactos.

### User Story 3 - Confirmar e encerrar rascunho (Priority: P1)

Após revisão integral, pesquisador confirma as medições e consome o próprio
rascunho na mesma operação. Exclusão permitida da conta remove seus drafts.
**Why this priority**: mantém a fronteira entre trabalho parcial e registro científico.
**Independent Test**: confirmação válida cria um único conjunto e remove a versão pessoal; rollback preserva ambos.
**Acceptance Scenarios**:
1. Given preenchimento completo válido e revisão vigente, When confirma, Then conjunto imutável e consumo do draft ocorrem juntos.
2. Given resposta perdida ou duas confirmações, When repete, Then não duplica conjunto nem altera dados confirmados.
3. Given conta sem vínculos impeditivos, When exclusão autorizada conclui, Then seus drafts somem e os de terceiros permanecem.

### Edge Cases

Perda de vínculo/conta ativa; laboratório inativo somente leitura; coleta contextual
inexistente; versão desconhecida; corpo excessivo; save versus confirmar;
delete atrasado versus rascunho recriado; medições já confirmadas por outro usuário;
falha transacional ou de rede. Drafts remanescentes após confirmação alheia podem
ser consultados/descartados pelo titular, sem gerar segundo conjunto.

## Requirements *(mandatory)*

- **FR-001 / DRAFT-FR-001/002**: um draft pessoal por titular/coleta confirmada, com autorização atual no servidor e isolamento entre usuários/laboratórios.
- **FR-002 / DRAFT-FR-003**: conteúdo parcial versionado preserva zero, false, ausência, vazio explícito e texto incompleto; versão desconhecida falha sem reinterpretação silenciosa.
- **FR-003 / DRAFT-FR-004**: save explícito, retomada persistida, estados salvo/ocupado/erro/conflito e aviso de trabalho não salvo; nada persistido só por sair.
- **FR-004**: revisão otimista e replay de save idêntico sem incremento; revisão obsoleta/chave divergente conflitam sem sobrescrita.
- **FR-005**: descarte definitivo explícito do próprio draft, condicionado à identidade/revisão; repetição não apaga draft recriado.
- **FR-006 / DRAFT-FR-005**: confirmação integral valida contrato vigente e consome draft atomicamente junto ao conjunto único imutável/idempotente.
- **FR-007 / DRAFT-FR-006**: drafts ficam fora de dashboard/mapa/histórico confirmado/IHFR; nenhum dado científico confirmado é modificado.
- **FR-008**: sem expiração/cleanup automático; exclusão de conta remove drafts pessoais somente quando os demais vínculos permitirem, no mesmo commit.
- **FR-009 / UX-NFR-001**: teclado/foco/mobile/feedback acessível e recuperação de rede/conflito sem apagar tentativa local silenciosamente.

### Key Entities

Titular; coleta confirmada; rascunho pessoal com conteúdo/versionamento/revisão;
conjunto ambiental confirmado e operação idempotente já existentes.

## Success Criteria *(mandatory)*

- **SC-001**: todos os estados suportados retornam idênticos após save/reload e nenhum terceiro acessa drafts.
- **SC-002**: disputas de versão detectadas; nenhuma confirmação duplicada ou perda silenciosa.
- **SC-003**: descarte/exclusão/confirm não alteram dados científicos confirmados; fronteiras IHFR preservadas.
- **SC-004**: jornadas explícitas de save/reload/conflito/descarte funcionam por teclado em tela móvel.

## Proveniência e limites

DECISAO_CONFIRMADA: usuário respondeu “1 Aprovo, masdeixe essa decisao e implementacao documentadas” à pergunta completa de PD-CRI-005/006 em 2026-10-10. [Registro](../../docs/plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md).
CRI-T011/012/013; CF-PRD-FR-009, IMP-005 e spec 013 são referências do domínio
implementado. Fora: rascunho de criação da coleta, autosave, colaboração,
offline, galeria e qualquer alteração de regra científica IHFR.
