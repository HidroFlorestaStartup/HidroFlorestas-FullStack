# Implementation Plan: Capas privadas

**Branch**: `016-area-covers` | **Date**: 2026-10-10 | **Spec**: [spec.md](spec.md)

## Summary

Upload direto assinado para staging authenticated; finalização server-side verifica
Admin metadata e bytes originais, reencoda com sharp sem metadata e envia asset
final privado. Referência revisionada só muda depois da validação e do upload
final. Entrega same-origin revalida autorização e transmite bytes, sem redirects.

## Technical Context

TypeScript/Next16.3.6/Prisma7.4.2/Pg17/Node24.19. Dependências focais Cloudinary SDK
para assinatura/URLs oficiais e sharp declarado diretamente (já transitivo Next),
com lockfile. Sem novos serviços externos além do Cloudinary autorizado.
10 MiB do arquivo original, 4096 cada lado; capa estática (recusa multiframe).
Sem multipart 10MiB em API Vercel, cujo teto é 4.5MB. Requests próprios JSON <=16KiB.

## Constitution Check

PASS antes/depois do design: decisão explícita, tabela segregada, autorização
servidor, histórico/ciência preservados; fake e Pg próprios; nenhum hook registrado.
Pesquisa de speckit-plan delegada somente leitura; fontes primárias na pesquisa.

## Project Structure

`src/app/api/server/images/{contracts,provider,cloudinary,sanitize,service,http}.ts`,
rotas `api/laboratories/[laboratoryId]/areas/[areaId]/image/**`, UI area-cover,
áreas list/detail, schema/migration/.gitignore, exemplo env sintético/runbook,
cleanup CLI e tests/unit/integration/migration/e2e/area-cover*.

## Design and execution

AreaCover guarda ponteiro privado e revisão monotônica, inclusive após remoção.
Tentativa contém área, ator, ids controlados, expectedRevision, issuedAt/expiresAt,
status/lease e asset final. Actor FK nullable SetNull para exclusão de conta;
ownership do ativo pertence à área/tentativa, independente da conta removida.
Init autentica/reautoriza, captura revisão e key idempotente; public IDs aleatórios
pré-registrados, overwrite=false, type=authenticated e contexto attempt UUID.
ID staging termina .webp como identificador opaco, satisfaz extensão raw explícita;
não comprova MIME. SDK de delivery acrescenta format real, podendo dar .webp.jpg.
allowed_formats assinado limita extensões jpg/jpeg/png/webp, sem substituir decoder.
Janela do app 10min; assinatura Cloudinary vale até 1h e não é revogável pelo app.
Quota técnica conservadora por ator: 3 tentativas vigentes, 10 emitidas/hora.
Finalização serializa lease, reautoriza antes do trabalho e no commit, consulta
metadata do provedor em vez de cliente, baixa só URL fixa do asset esperado,
limita bytes/timeout e usa decoder real. Reencode/auto-orient sem keepMetadata.
Upload final usa ID estável/overwrite=false; timeout/retry consulta esse destino
antes de reenviar. Compare-and-set expectedRevision e commit do novo ponteiro
antes de tornar antiga elegível. Replay retorna estado atual autorizado.
Leitura proxy original final sanitized, redimensiona localmente para WebP <=1200
e <=4MB; authenticated não permite transform on-the-fly. Sem CDN URL no DTO/DOM.
Jobs de cleanup existem antes de operações externas; staging somente após janela
da assinatura+10min. Não há bound publicado de upload iniciado antes de expirar:
reconciliação periódica mantém tombstones mesmo após ausência/deleção, detectando
ativos tardios. resource_type não integra assinatura: preparar jobs para os três
tipos image/video/raw no mesmo publicId controlado, mas só image pode virar capa.
Final sem assinatura exposta só é elegível após abandono/replacement/removal e
ausência de lease; não assumir que lease expirada prova término de upload externo.
Reconciliação posterior também cobre retorno externo tardio no destino final.
Cada job reconsulta assetId/context/publicId/type e referências vigentes antes de
deletar ID imutável exato; não usa prefix/tag/all. Lease/retry limita duplicação.
Sem invalidation garantida de signed URLs já emitidas; URLs de delivery nunca
chegam ao navegador. Usuário pode conservar cópias já baixadas, como qualquer foto.

## Configuração verificada do provedor

Não omitir upload_preset: presets default da API podem aplicar incoming sem o
parâmetro no request. Exigir preset explícito assinado/versionado, sem incoming,
eager, format/eval/scripts/add-ons; verificar Admin e hash esperado antes de
assinar, antes de validar e antes do upload final. Snapshot/hash na tentativa;
alteração do preset recusa finalize. Mesmo preset controlado é mutável no
provedor: operação exige congelá-lo enquanto houver assinaturas válidas. Isso
é dependência operacional documentada, sem configuração remota nesta execução.
RECOMENDACAO técnica: nunca modificar um preset versionado usado; criar outra
versão, pois não existe bound publicado para término de upload já aceito.
Presets não limitam file size: bytes rejeitados no staging ainda podem consumir
créditos. Quota e janela limitam exposição, mas não provarão custo zero remoto.

## Validation and rollback

Unit content/EXIF e assinaturas com bytes sintéticos; integração Pg fake cobre
dois labs/roles/revogação/inatividade/OCC/rollback/replay/falhas/cleanup; migration
aditiva sobre cadeia; E2E de UI/fallback/teclado/mobile com HTTP fake explicitado;
regressão geral/IHFR/contas/mail/exclusão/typecheck/lint/build. Sem smoke externo.
Rollback mantém tabelas/ponteiros/jobs para reconciliação; não exclui ativos reais.
Operação/créditos/configuração real aguardam responsável e autorização específica.
