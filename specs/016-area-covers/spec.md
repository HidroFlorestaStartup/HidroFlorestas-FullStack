# Feature Specification: Capa privada por área

**Feature Branch**: `016-area-covers` | **Created**: 2026-10-10
**Status**: Especificada; política material aprovada nesta conversa
**Input**: PD-CRI-007/008/009; uma capa privada, edição contextual e cleanup próprio.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Publicar capa para equipe autorizada (Priority: P1)

OWNER/ADMIN do laboratório ativo seleciona uma foto da área, acompanha envio e
vê a capa somente após validação. Membros autorizados consultam a imagem.
**Why this priority**: facilita reconhecer o ponto de monitoramento.
**Independent Test**: titular contextual envia arquivo válido e membro consulta;
outsider não obtém imagem nem metadados; perda de vínculo revoga nova leitura.
**Acceptance Scenarios**:
1. Given contexto autorizado, When upload válido conclui, Then há uma única capa privada por área.
2. Given acesso de outro laboratório ou vínculo removido, When lê/edita, Then recebe recusa contextual.
3. Given arquivo inválido/excessivo, When finaliza, Then não vincula capa e mostra erro recuperável.

### User Story 2 - Substituir e remover com segurança (Priority: P1)

Editor substitui a capa sem perder a anterior se o novo envio falhar; remove
explicitamente quando necessário e recebe conflito em alterações concorrentes.
**Why this priority**: mantém a referência confiável mesmo com falhas de rede/provedor.
**Independent Test**: duas substituições têm um vencedor; falha preserva antiga;
retry não duplica referência; remoção não apaga versão mais recente.
**Acceptance Scenarios**:
1. Given capa vigente, When provedor/validação falha, Then antiga permanece.
2. Given revisão obsoleta, When finaliza/remove, Then não substitui/apaga silenciosamente.
3. Given resposta perdida, When repete operação, Then reconcilia resultado com estado atual.

### User Story 3 - Limpar somente ativos próprios (Priority: P2)

Operação local identifica uploads abandonados e capas substituídas/removidas e
limpa somente ativos com ownership comprovado, nunca uma referência vigente.
**Why this priority**: limita armazenamento e créditos sem apagar ativos alheios.
**Independent Test**: limpeza fake é idempotente; ownership divergente e ativo
referenciado são preservados; erro gera retry rastreável sem revelar segredos.
**Acceptance Scenarios**:
1. Given ativo próprio elegível, When cleanup executa, Then remove aquele asset e conclui job.
2. Given ownership divergente/vínculo vigente, When cleanup tenta, Then preserva ativo.

### Edge Cases

Conta/laboratório inativo; MEMBER/global ADMIN sem role contextual; campos forjados;
assinatura expirada ou replay; erro parcial/timeout; bytes falsos/magic/MIME/dimensões;
EXIF; concorrência; remoção repetida; nova tentativa após falha; asset estrangeiro.

## Requirements *(mandatory)*

- **FR-001 / IMG-FR-001/002**: uma capa por área, leitura com autorização contextual atual; somente OWNER/ADMIN de laboratório ativo edita/remove, sem bypass por role global.
- **FR-002 / IMG-FR-003**: identificar destino/área/titular no servidor; assinatura de upload sem segredo no cliente e finalização não confia em URL/metadata do cliente.
- **FR-003 / IMG-FR-004**: aceitar apenas JPEG/PNG/WebP reais, até 10 MiB e 4096 por lado; remover EXIF e validar conteúdo no servidor antes de vincular.
- **FR-004**: originais/derivados finais authenticated; aplicação não expõe URL de entrega reutilizável e valida sessão/vínculo a cada leitura.
- **FR-005 / IMG-FR-005**: substituição transacional preserva antiga até commit; controle de revisão e retry/replay sem sobrescrita silenciosa.
- **FR-006 / IMG-FR-006**: tentativas abandonadas/substituídas/removidas têm cleanup idempotente, apenas com identidade/contexto comprovados e ausência de referência vigente.
- **FR-007 / IMG-FR-007**: selecionar/progresso/erro/retry/substituir/remover/fallback acessíveis, com teclado/mobile e nenhuma exposição de segredo.
- **FR-008**: limites/quota/prazo/timeout técnicos documentados; nenhum upload real, alteração de conta/scheduler remoto ou consumo de crédito durante esta execução.
- **FR-009**: integração local usa provedor fake determinístico para falhas/concorrência/ownership; operação real/credits ficam pendentes sem homologação fictícia.

### Key Entities

Área/laboratório/vínculo; referência vigente revisionada; tentativa contextual de
upload; asset imutável do provedor; job de limpeza com prova de ownership.

## Success Criteria *(mandatory)*

- **SC-001**: autorizado consulta; terceiro/perda de vínculo não recebe conteúdo nem metadados.
- **SC-002**: falha não perde capa anterior; concorrência não causa sobrescrita ou remoção indevida.
- **SC-003**: EXIF não persiste na capa final; inválidos não são vinculados; cleanup não toca alheios/vigentes.
- **SC-004**: jornada móvel/teclado e todos os cenários locais passam; operação remota permanece explicitamente pendente.

## Proveniência e limites

DECISAO_CONFIRMADA: resposta “1- aprovo, mas documente essa implementacao e decisoes”
à proposta completa PD-CRI-007/008/009 em 2026-10-10: capa privada por área,
OWNER/ADMIN, Cloudinary authenticated, JPEG/PNG/WebP 10MiB/4096, EXIF removido,
cleanup próprio. [Registro](../../docs/plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md).
Responsável por operação/créditos: não especificado; PENDENCIA_DE_DECISAO.
Fora: galeria, foto de coleta/perfil, imagens públicas e alterações científicas IHFR.
