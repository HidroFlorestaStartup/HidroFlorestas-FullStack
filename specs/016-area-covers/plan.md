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

## Correção focal RC-UI-001 (revisão de 2026-10-13)

O reviewer reproduziu `GET image/content?revision=1` com 503, seguido de
recuperação 200 sem alteração de `revision`. O botão atual só atualiza os
metadados e não reinicia `AreaCoverPreview.failed` (key `areaId:revision`).

Plano de correção, limitado a FR-007:
1. Especificar o cenário 503→200 e escrever o teste Playwright RED na rota real.
2. Depois de recarga de metadados autorizada, incrementar somente um contador
   local de tentativa, remontando a prévia e adicionando um query param não
   sensível para garantir novo GET same-origin mesmo com revisão invariável.
3. Exibir "Capa recarregada." somente após `onLoad` da nova imagem; após
   `onError`, conservar o fallback e possibilitar outra tentativa. Ignorar
   eventos de tentativa obsoleta.
4. Manter inalterados revisão no banco, autorização, Cache-Control privado,
   contratos, migrations, integração Cloudinary e dados científicos.
5. Executar Playwright focal, typecheck, lint e regressões afetadas em runtime
   Node 24/Next/Prisma/PostgreSQL sintético. Registrar RED/PASS e fingerprints
   verdadeiros; sem runner local, não alegar testes não executados.

Integração: preservar PR #4 e branches dependentes. Preparar revisão sem
merge/deploy; após teste e aprovação, a equipe deverá propagar o patch à
pilha #5/#6 e revalidar os diffs antes de merge em development.

Preflight EVIDENCIA_IMPLEMENTACAO (2026-10-13): worktree dedicado
`C:/projetos/ifma/HidroFlorestas-rc-ui-001`, branch `review/016-area-covers`,
HEAD inicial `dace407e51b5034e69e22055658c651147a7caa3` confirmado por fetch/API.
Preimages: componente `99a6f39062ccaa09de605a5d79020c9f5420fced`; teste
`2c1096182f340107afa00a0926e9d0c794ed2beb`. Checkout principal preservado em
main/beba96f com ZIP e dois prompts não rastreados. Node 24.19.0 disponível.
`setup-plan.sh --json` e `check-prerequisites.sh --json --require-tasks
--include-tasks` executados via Git Bash com feature explícita 016; plano existente
preservado. Sem extensions.yml e sem checklists nesta feature. Constituição
reconferida: PASS; nenhum requisito científico, migration ou autorização alterado.

Sequência obrigatória: este planejamento commitado → patch de teste RED → patch
de código → GREEN/regressões/build → evidências e commits → push protegido.
RECOMENDACAO: banco/servidor/build/E2E sequenciais nos runners atuais, cluster
sintético próprio loopback e saída redigida; nunca copiar dotenv de outro checkout.
A instrução posterior do usuário proíbe qualquer merge nesta execução: preparar
#5/#6/#7 e revisão das dependências separadamente, sem retarget ou mudar reviews.

Progresso EVIDENCIA_IMPLEMENTACAO: T021 commitado em 366432a; T022 RED em
17:28:01.637–17:28:19.727 UTC; T023/T024 GREEN focal e regressão nova 68 E2E,
291+17 Unit/Mail, 187 Integration, 37 Migration, 6 Contract, HTTPS2, typecheck,
lint/build/schema audit. Detalhes em rc-ui-001-evidence.md; FAIL de diagnóstico
de drafts preservado separadamente. T025 depende da publicação e re-review,
sem executar propagação por merge. Testes temporários das dependências de #7
não alteram a ordem dos commits nem a versão destinada ao PR #4.
