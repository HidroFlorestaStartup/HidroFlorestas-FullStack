# Feature Specification: Capa privada por área

**Feature Branch**: `016-area-covers` | **Created**: 2026-10-10
**Status**: Implementada e validada localmente; operação real pendente
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
4. Given conteúdo indisponível com 503 e revisão 1, When o endpoint recupera e o membro usa “Recarregar capa”, Then há novo GET, imagem real visível na revisão 1 e sucesso somente após carregamento; outra falha continua permitindo nova tentativa.

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
1. Given ativo próprio elegível, When cleanup executa, Then remove aquele asset, registra resultado e mantém reconciliação para uploads tardios.
2. Given ownership divergente/vínculo vigente, When cleanup tenta, Then preserva ativo.

### Edge Cases

Conta/laboratório inativo; MEMBER/global ADMIN sem role contextual; campos forjados;
assinatura expirada ou replay; erro parcial/timeout; bytes falsos/magic/MIME/dimensões;
EXIF; concorrência; remoção repetida; nova tentativa após falha; asset estrangeiro.

## Requirements *(mandatory)*

- **FR-001 / IMAGE-FR-001/004**: uma capa por área, leitura com autorização contextual atual; somente OWNER/ADMIN de laboratório ativo edita/remove, sem bypass por role global.
- **FR-002 / IMAGE-FR-001/002/003**: identificar destino/área/titular no servidor; assinatura de upload sem segredo no cliente e finalização não confia em URL/metadata do cliente.
- **FR-003 / IMAGE-FR-003**: aceitar apenas JPEG/PNG/WebP reais, até 10 MiB e 4096 por lado; remover EXIF e validar conteúdo no servidor antes de vincular.
- **FR-004**: originais/derivados finais authenticated; aplicação não expõe URL de entrega reutilizável e valida sessão/vínculo a cada leitura.
- **FR-005 / IMAGE-FR-004**: substituição transacional preserva antiga até commit; controle de revisão e retry/replay sem sobrescrita silenciosa.
- **FR-006 / IMAGE-FR-005**: tentativas abandonadas/substituídas/removidas têm cleanup idempotente, apenas com identidade/contexto comprovados e ausência de referência vigente.
- **FR-007**: selecionar/progresso/erro/retry/substituir/remover/fallback acessíveis, com teclado/mobile e nenhuma exposição de segredo. A ação explícita de recarga DEVE tentar novamente o conteúdo da capa mesmo se a revisão persistida não mudou, inclusive após segunda falha. Mensagem de sucesso da imagem depende de onLoad real; falha conserva fallback e retry.
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

DECISAO_CONFIRMADA focal: pedido explícito do usuário em 2026-10-13 para executar
RC-UI-001, com patches anexos e revisão do PR #4 como evidência do defeito.
Não alterar revision no banco; preservar guards/assertions e executar RED antes
da correção. Publicação somente fast-forward na branch existente protegida.
Nova instrução do usuário nesta sessão: nenhum merge nem deploy; preparar a
propagação aos descendentes sem executá-la. Aprovação técnica permanece humana.

## Correções CRI-REV-001 a CRI-REV-004 — 2026-10-15

O parágrafo anterior registra o mandato histórico de 13/10. DECISAO_CONFIRMADA:
o pedido anexado de 15/10 autoriza commits, pushes e merges internos na cadeia
016 → audit → RC → validation, preservando história e sem integrar main/development.
Achados/guia de 15/10 na RC f351373 são evidências de revisão, sem aprovação automática.

### US1 — disponibilidade explícita (CRI-REV-001, P1)

DECISAO_CONFIRMADA: inicialmente PENDENCIA_DE_DECISAO no pedido; após pergunta
explícita nesta conversa de 15/10/2026, o usuário respondeu “Confirmo a política A
e autorizo sua implementação.” Responsável: usuário solicitante, em resposta à
pergunta sobre autoridade de produto. A confirmação não é aprovação dos PRs.

- **FR-010 / IMAGE-FR-001/004**: autorização contextual, disponibilidade do recurso,
  existência da capa e leitura de conteúdo são estados distintos. `canEdit`
  conserva exclusivamente autorização contextual; disponibilidade nunca concede
  acesso nem revela configuração, nomes internos ou segredos.
- **FR-011**: política A: flag desligado, ausente, inválido ou configuração
  incompleta tornam upload, confirmação, remoção e conteúdo indisponíveis.
  Metadados, revisão e assets persistidos permanecem intactos. A interface informa
  que capas estão desabilitadas, não oferece mutações operáveis e não busca conteúdo.
  Sem capa exibe “Área sem capa.”; capa existente desabilitada tem fallback distinto.
- **SC-005**: OWNER/ADMIN/MEMBER, laboratório inativo e externo mantêm as permissões
  anteriores nos estados ligado/desligado; nenhum byte nem mutação passa desligado.

### US1/US2 — elegibilidade antes de integração (CRI-REV-002, P2)

- **FR-012 / FR-005/008**: requisição já inelegível por contexto, replay,
  expiração, revisão ou quotas não consulta o provedor. Pedido elegível faz
  preflight, validação externa sem transação aberta e revalidação atômica antes
  de criar tentativa e seus quatro jobs. Mudanças durante a rede são respeitadas.
- **FR-013**: replay compatível vigente revalida preset e reutiliza tentativa,
  expiração, IDs e jobs, mesmo após mudança da revisão vigente, conforme contrato
  anterior. Replay incompatível/expirado recusa antes de I/O. Preset divergente
  recusa sem criar registros; concorrência não excede 3 ativas/10 por hora por ator.
- **SC-006**: contador de preset não cresce nas recusas locais; barreiras
  determinísticas comprovam reautorização, OCC e quotas após rede, sem órfãos.

### Integração/revisão (CRI-REV-003/004)

SC-007: HEAD da RC é ancestral da revisão independente; diff de #7 conserva
somente evidências pretendidas; checks novos referem-se aos HEADs publicados.
SC-008: resposta técnica e re-review publicados; CHANGES_REQUESTED e aprovação
continuam sob controle dos estudantes. Implementado/validado/publicado/aprovado
são estados independentes. Aprovação humana permanece pendente até novo parecer.

Fora do recorte: novas migrations, outros fluxos, ciência, produção, Cloudinary
real, mudanças de autorização, redução de guards/assertions/timeouts e integração
nas principais. As tarefas concluídas T001–T025 permanecem históricas.

## Correção CRI-REV-005 — paridade de área (2026-10-17)

**Achado independente:** a listagem da Spec003 serializa
`cover: {revision,hasImage,featureEnabled}` mesmo quando não há capa, mas
`AreaSummary` do OpenAPI fechado não reconhece a propriedade. Esta correção
reconcilia **contrato e documentação**, sem mudar o payload já consumido pela UI.

- **FR-014 (interface da Spec003):** cada item da listagem autenticada deve
  conter `cover` com `revision >= 0`, `hasImage:boolean` e
  `featureEnabled:boolean`, sem expor `assetId`, public ID, URL, bytes ou
  configuração do provedor. O schema fechado `AreaSummary` e os exemplos da
  Spec003 devem refletir essa projeção real. `AreaDetail` continua sem exigência
  de `cover`, pois é outra projeção; TypeScript permite `cover?` na interface
  compartilhada, mas a **listagem** o exige.
- **SC-009:** uma saída de `serializeAreaSummary()` validada com Ajv2020 contra
  `AreaListResponse` passa com capa/sem capa, flag ligada/desligada e exemplo
  OpenAPI. Propriedades extras, sobretudo privadas, são rejeitadas por schemas
  fechados. Teste RED pré-YAML e GREEN pós-correção devem ser registrados.

Fonte: relatório independente
`docs/releases/2026-10-10-cri-rc/2026-10-17-analise-pos-correcoes-thalles.md`.
Nenhuma alteração de banco, autorização, ciência ou comportamento funcional é
introduzida por este requisito contratual; a revisão e aprovação seguem humanas.
