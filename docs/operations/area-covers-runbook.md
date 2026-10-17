# Capas privadas de áreas

## Correção de rollout — 15/10/2026

DECISAO_CONFIRMADA: usuário solicitante confirmou nesta conversa a política A
(origem textual em specs/016-area-covers/spec.md). Desligado/ausente/inválido ou
configuração incompleta bloqueia upload, confirmação, remoção e conteúdo, mantém
metadados/revisão/assets e usa fallback explícito. `featureEnabled` indica somente
disponibilidade validada offline; `canEdit` continua contextual. Rollout parcial
exige aprovação operacional própria e não fecha homologação de capas.
CRI-REV-002: pedidos já inelegíveis são barrados antes da Admin API; elegíveis
revalidam contexto/replay/revisão/quotas depois do preset e antes da criação.
Replay vigente ainda valida preset; quotas não prometem custo zero para corridas
que eram elegíveis no preflight. Implementação e validação desta correção serão
registradas na evidência focal da Spec 016; esta entrada registra o contrato alvo.

CRI-REV-005 / convergência do CI: conflitos transacionais reconhecidos mantêm
o teto de três tentativas e agora aguardam 100–150ms antes da segunda e
200–250ms antes da terceira, com jitter limitado. A espera ocorre após o
encerramento da transação falha, sem repetir preset/ticket, abrir transação
durante a espera, alterar quotas ou os limites maxWait15s/timeout30s.
Cada nova tentativa repete autorização, revisão, replay e quotas aplicáveis.
Esgotamento continua sanitizado como INTERNAL_ERROR; não se inventa quota excedida
sem leitura válida do banco. A paridade OpenAPI não muda o payload funcional.

DECISAO_CONFIRMADA: usuário desta conversa em 2026-10-10 aprovou PD-CRI-007/008/009
e exigiu documentação. [Origem e limites](../plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md),
[spec 016](../../specs/016-area-covers/spec.md), [contratos](../../specs/016-area-covers/contracts/images.md).
EVIDENCIA_IMPLEMENTACAO local; não é homologação Cloudinary real.

Uma capa por área. Leitura exige sessão/conta ativa e vínculo atual no laboratório;
OWNER/ADMIN contextual de laboratório ativo edita/remove. Role global não dá bypass.
Membro lê; inativo lê sem mutar. O legado CollectionArea.image não é usado como
URL confiável. Assets pertencem à área/tentativa; excluir conta não remove capas.

No detalhe, selecionar JPEG/PNG/WebP até 10 MiB e 4096 por lado; enviar explicitamente.
Progresso acompanha envio direto; confirmação aguarda validação no servidor.
Erro mantém capa anterior e arquivo selecionado para repetir. Conflito exige
recarregar explicitamente; cancelar remoção preserva capa. Imagem ausente ou falha
de leitura mostra fallback. Lista usa preview privado. Sem galeria/fotos de coleta.

## Configuração real pendente

Não realizada nesta sessão. Após aprovação específica do destino, operador deve
conferir .env.images.example e configurar CLOUDINARY_IMAGE_ENABLED=1, cloud name,
API key/secret privados e preset assinado versionado hfr-cover-v1 (ou nova versão).
Nenhuma variável de segredo pode ter NEXT_PUBLIC_. Sem configuração, APIs de
metadados/áreas continuam disponíveis; envio/conteúdo do provedor recusam de forma
sanitizada. Não registrar JSON de upload, credenciais ou URL de entrega assinada.

Preset não pode ser unsigned nem conter incoming/eager/format/eval/scripts/add-ons/
folder/naming/custom callbacks. Settings permitidos: type=authenticated,
overwrite=false, unique_filename=false, use_filename=false, disallow_public_id=false
e allowed_formats restrito a jpg/jpeg/png/webp (CSV ou array; opcionais). Settings
desconhecidos são recusados. Exportar JSON revisado do GET upload_presets/:name
(name, unsigned, settings), sem credenciais, e calcular offline:

```powershell
node --conditions=react-server --import=tsx scripts/area-cover-preset.ts caminho-do-preset-revisado.json
```

Copiar somente sha256 para CLOUDINARY_COVER_PRESET_SHA256. Hash normaliza CSV/array,
ordem e duplicatas dos formatos; inclui settings permitidos. RECOMENDACAO: nunca
modificar um preset versionado usado; criar outra versão para mudanças. O app
consulta Admin antes de emitir assinatura, finalizar e enviar o final; hash na
tentativa recusa mudança. Isso não prova retroativamente configuração entre
consultas, portanto disciplina do operador é dependência material.
[Defaults/presets](https://cloudinary.com/documentation/upload_presets#default_upload_presets).

## Privacidade e limites técnicos

Staging e final são authenticated. Navegador recebe somente assinatura de upload
para destino controlado; nenhuma URL de delivery. Server consulta Admin e lê o
original esperado via host fixo, sem redirects, <=10MiB e timeout20s. Decoder real
recusa formato falsificado, multiframe e dimensões; rotate/reencode WebP com sharp
remove EXIF/ICC/XMP/IPTC. Final até10MiB. Staging privado pode conter EXIF até cleanup;
somente a capa final sanitizada é entregue. Não há upload multipart10MiB pela API
Next, evitando o teto4.5MB Vercel; JSON de mutação <=16KiB. Proxy entrega WebP local
até1200 pixels/4MiB, reautoriza depois de baixar; private,no-store/nosniff, sem
redirect. Next/Image usa unoptimized; optimizer não recebe sessão.

RECOMENDACAO técnica implementada contra abuso: 3 tentativas vigentes e 10 emitidas
por usuário/hora; tentativa app válida10min, lease de finalização5min; upload final
timeout60s. Quotas não são valores científicos nem promessa de custo zero. Upload
signature Cloudinary vale até1h e exclui file/resource_type: appTTL não revoga a
assinatura. Parâmetros assinados fixam type/authenticated, IDs, overwrite=false,
preset/context e formatos. Staging ID termina .webp como identificador opaco;
imagem real pode ser JPEG e delivery acrescenta seu formato. Cleanup descobre
identidades image/video/raw do mesmo ID, aceitando como capa somente image.
[Assinaturas](https://cloudinary.com/documentation/authentication_signatures),
[IDs](https://cloudinary.com/documentation/upload_parameters#public_id_naming_preferences).

Assinatura de delivery sozinha não confere identidade/expiração; não é exposta.
Não prometer revogação instantânea de caches Cloudinary ou de cópias já baixadas.
Novas requisições à aplicação revalidam autorização e referência vigente.
[Authenticated](https://cloudinary.com/documentation/control_access_to_media#authenticated_media_assets).

## Cleanup e recuperação

Jobs existem antes do upload externo. Substituição muda ponteiro/revisão e só após
commit torna antiga elegível. Remoção aumenta revisão e limpa ponteiro, preservando
monotonia/ABA. Tentativa finaliza com lease/revisão vigentes e reautoriza no commit;
erro/rollback preserva antiga. Resposta perdida usa ID final fixo/overwrite=false,
consulta Admin e valida bytes sanitizados antes de recuperar. Replay confirmado
retorna estado atual, sem restaurar capa substituída. Usuário removido torna FK da
tentativa null; prova de ownership pertence à área/tentativa, independente da conta.

Staging fica elegível70min após emissão (1h+10min). Final abandonado começa15min
após emissão; atual/lease viva/tentativa ainda válida bloqueiam cleanup. Antigas
substituídas/removidas ficam elegíveis no commit. Antes de destruir, conferir
publicId/resourceType/authenticated/context attempt+kind e ausência de referência;
Admin plural by_asset_ids com context prova identidade imutável. Delete usa somente
asset_ids[] exato, nunca prefix/tag/all. Divergência bloqueia job para revisão humana,
sem destruir; falhas têm backoff1–60min e erros sanitizados. Lease cleanup5min.
[Admin API](https://cloudinary.com/documentation/admin_api#get_resources_by_asset_ids).

INFERENCIA/RECOMENDACAO: validade da assinatura não é teto publicado de conclusão
de upload já aceito. Jobs de ausência/deleção tornam-se RECONCILE e são revisitados
após60min, sem purge automático de tombstones; assim ativos tardios próprios podem
ser reconciliados. A rotina depende de execução contínua do operador. Não declarar
garantia de limpeza total enquanto a rotina estiver parada ou houver jobs BLOCKED.

CLI abaixo foi implementado, mas execução real permanece pendente. Em ambiente
especificamente autorizado e com o banco correto, começar por dry-run (zero chamadas
ao provedor); conferir backlog/BLOCKED/créditos antes de modo execute:

```powershell
node --conditions=react-server --import=tsx scripts/area-cover-cleanup.ts --limit=20
node --conditions=react-server --import=tsx scripts/area-cover-cleanup.ts --execute --cloud-confirmation=nome-da-cloud-autorizada --limit=20
```

Execute exige cloud-confirmation igual à configuração e valida preset. Logs somente
contagens; nenhum conteúdo/segredo. Nunca rodar real nesta tarefa.

O campo eligible do dry-run conta jobs cujo prazo venceu; é uma estimativa de fila,
não autorização de exclusão. Provas de ownership, referência e lease são verificadas
somente pelo executor antes de qualquer delete.

Operador/scheduler e monitoramento de créditos: PENDENCIA_DE_DECISAO PD-CRI-010,
responsável não especificado.
Admin API/download/armazenamento/transformações e staging rejeitado podem consumir
créditos; quotas técnicas não garantem file-size no Cloudinary nem plano gratuito
suficiente. Limites e custo precisam de verificação operacional no destino escolhido.

## Roteiro de homologação futura

Após autorização explícita, registrar UTC/candidato/ambiente sem PII/segredos:
conferir preset/cloud/quotas e baseline de créditos; upload synthetic sem dado pessoal;
verificar authenticated original/final, EXIF ausente, delivery público recusado;
confirmar app OWNER/ADMIN/MEMBER/outsider, revogar vínculo e repetir leitura; substituir,
simular perda de resposta, remover e executar cleanup somente dos IDs próprios.
Verificar identidade exata raw com staging ID .webp e reconciliação tardia no provedor;
registrar custos e falhas. Confirmar jamais apagar referência vigente/ativo alheio.
E2E HTTP fake não substitui esse smoke. Rollback da aplicação conserva tabelas/jobs
e exige reconciliar pendências; não remover migrations/ativos em massa.

Sem alteração de IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
