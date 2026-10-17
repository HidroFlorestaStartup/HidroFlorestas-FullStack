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

Fechamento T025: c317271 publicado fast-forward após os gates; head do PR #4
conferido. Re-review #4/#6 e comentários HTTP201 usando autenticação local do Git
após HTTP403 do conector; CHANGES_REQUESTED anteriores preservados. Propagação
e integração de #7 preparadas, não executadas. PostgreSQL voltou STOPPED com
dados preservados. Fechamento documental não altera o fingerprint testado.

## Plano focal CRI-REV-001/002/003/004 — 2026-10-15

Estado: EM_ANDAMENTO. Resultado: correções testadas/publicadas na origem e
propagadas por merges até #7; aprovações humanas explicitamente abertas.
Mandato atual substitui a proibição histórica de merges internos de 13/10 somente
na cadeia de revisão. Main/development/produção permanecem fora do escopo.

### Reconciliação e estado inicial

Clone independente `C:/projetos/consolidados/HidroFlorestas-cri-review-20261015`,
016 inicialmente limpo em 8f183983e9134efd651e15fd872209faf4503468.
Remotos iniciais: audit 52f612ff9c8aed279212ee5ba61581c3d66474cc;
RC f351373ab19eab7d4331d5d72d988f34a621e337;
validation 59baff4f5cbe44164014aaf760a0651604177abb;
main/development beba96fbf6bbaac8771dbb29abea2f9f8f5b0054.
Checkout do IDE preservado em feat/mail-foundation/80ff1cf, outro remoto,
AGENTS.md modificado e arquivos não rastreados preexistentes, sem incorporação.
Somente AGENTS.md raiz aplicável; instruções estruturais não serão alteradas.
As quatro branches já estão bloqueadas em vercel.json; workflow somente CI.

Fontes: pedido atual e confirmação explícita da política A na spec prevalecem;
achados/guia/integration-guide da RC são evidências/instruções operacionais;
Spec 016, contratos e código são baseline. Histórico/docs/raw intactos.
Constituição: PASS antes do design; nenhuma mudança científica ou de schema.
Skills specify/plan/tasks/implement atualizam a feature existente; scripts
setup-plan/setup-tasks/check-prerequisites com feature explícita 016 executados;
sem extensions.yml/hooks. Checklist de requisitos existente: 16/16; atualização
focal de qualidade: 7/7, mantida por specify. Dependências pelo lockfile.

### Design

1. DTO aditivo `featureEnabled:boolean`: validação offline da mesma configuração
   do provider, sem rede/instanciação. `canEdit` contextual inalterado.
   Disponibilidade injetável no serviço para fake; padrão fechado.
2. Política A protege initiate/confirm/remove/content após autorização;
   detail continua disponível. UI/preview/lista não buscam bytes desabilitados;
   fallback distingue capa ausente de capa persistida indisponível.
3. Uma validação local reutilizada em duas transações Serializable:
   contexto → replay compatível/vigente → revisão (ausência = 0) → quotas do ator.
   Preflight não cria registros. Preset fora da transação. Segunda transação
   repete tudo e cria ponteiro/tentativa/quatro jobs atomicamente.
4. Replay vigente preserva precedência anterior sobre revisão/quota e revalida
   preset antes do ticket. Mesma chave criada durante I/O converge no mesmo registro.
   Retries P2034/P2002 preservados; nenhuma assinatura antes do commit.
5. Fake conta preset/ticket e oferece hook aguardável, com barreiras sem sleep.
   Testar quotas/stale/replay/expiração, role/vínculo/lab/conta/revisão durante
   rede, concorrência e preset falho/divergente sem órfãos.

### Ordem, riscos e gates

Planejamento commitado → RED registrado → implementação → mesmos testes GREEN →
regressão oficial → revisão adversarial/diff → commit → fetch/reconferência →
push origem → worktrees por descendente/merges → gates/push/HEAD/checks/diff →
docs/PRs/re-review/handoff. T026–T038 detalham arquivos e dependências.
Banco/build/E2E sequenciais no harness oficial com ownership/ACL preservados.
Registrar SHA, tree/diff, UTC, ambiente, comandos, exit codes e contagens sanitizadas.
Riscos: consumidores de DTO/preview da lista, replay após confirmação, corrida
preflight/criação, revogação na rede, quota por ator e conflitos documentais.
Gate adversarial cobre cada risco antes de push funcional. Sem novas dependências,
guards/timeouts/assertions reduzidos ou chamadas Cloudinary reais.

Parada humana: decisão A inicialmente pendente, confirmada nesta conversa antes
da implementação. Aprovação dos estudantes/homologação real permanecem abertas;
não impedem publicação autorizada e não serão declaradas concluídas pelo agente.
Histórico: 15/10 reconciliação e decisão A registradas; testes/publicação ainda
não executados nesta entrada. Evidências em cri-rev-20261015-evidence.md.

### Ajuste após o primeiro CI — 16/10/2026

As runs38843869327 (origem036f54a) e38843986244 (audit98d8aac) falharam em
concorrência, embora as regressões locais tenham passado. Artefato da origem:
207 testes/205PASS/2FAIL, nas corridas ativa/horária; perdedor recebeu INTERNAL_ERROR
em vez de RATE_LIMITED em menos de1s, sem evidência de timeout nessa rodada.
Não enfraquecer o aceite nem presumir falha ambiental. Publicação da RC fica
suspensa até diagnosticar e corrigir; sua regressão local anterior pode terminar
sem alterar sua árvore durante a coleta.

EVIDENCIA_CODIGO: adapter-pg7.4.2 converte SQLSTATE40001 em DriverAdapterError
com cause.kind=TransactionWriteConflict. O helper atual de imagens só reconhece
e.code P2034/P2002; o serviço IHFR também trata SQLSTATE40001/40P01 direto.
INFERENCIA a confirmar: conflito ao commit pode escapar no formato do adaptador.
T039 deve capturar somente nome/códigos/kind seguros em conflito Pg real e produzir
RED determinístico dos formatos suportados. T040 implementa reconhecimento
restrito de conflitos (sem retry de erros arbitrários), mantém teto3 e timeouts,
e repete testes/gates/propagação. Não repetir preset em retry transacional.

### Handoff técnico e revisão — 16/10/2026

Estado: AGUARDANDO_REVISAO humana. T026–T040 executadas; código/testes/runbook
publicados e propagados. Recibo de heads, merges, CI observado e comunicações em
cri-rev-20261015-evidence.md. Os fechamentos documentais são propagados pela mesma
cadeia sem mudar o snapshot funcional; seus Actions são conferidos separadamente
e a conclusão final fica também nos comentários/descrições dos PRs atuais.
Não há decisão A pendente: confirmação registrada. CHANGES_REQUESTED de #4/#6 e
novo parecer independente de #7 continuam abertos sob controle dos revisores.
Operação real/homologação/produção e ciência mantêm limites anteriores.

## Plano focal CRI-REV-005 — paridade de contrato (2026-10-17)

**Origem do achado:** revisão independente de 17/10, na RC `832560a`.
`AreasService.list()` consulta `include.cover` e serializa `cover` com
`featureEnabled`, mas `AreaSummary` do OpenAPI fechado não o declara.
**Escopo:** reconciliação dos contratos da Spec003/016 e teste Ajv da saída real
de `serializeAreaSummary()`; não alterar implementação, migration, Cloudinary,
permissões, testes científicos ou produção.

1. RED: executar o novo `tests/unit/area-openapi-parity.test.ts` **antes** da
   mudança no YAML. Registrar a falha por `additionalProperties: false` em
   `AreaSummary`, guardando comando, SHA e output.
2. GREEN: acrescentar `AreaCoverSummary` fechado, tornar `cover` obrigatório
   **somente no schema de listagem** `AreaSummary`, atualizar o exemplo e
   documentar que `AreaDetail` continua sem `cover`. Preservar a projeção
   TypeScript opcional porque também é usada no detalhe.
3. Exercitar lista com e sem asset, flag ligada/desligada, rejeição de extras,
   ausência de assetId/URL/segredos, exemplo OpenAPI e serialização real.
4. Validar com Node24, dependências versionadas, Unit/Contract/Typecheck/Lint/Build
   e regressão afetada conforme runbook. Nenhum `npm ci` ou banco remoto no teste
   isolado entregue nesta tarefa.
5. Revisar adversarialmente cada campo transversal, documentar RED/GREEN e
   preparar commits na origem `review/016-area-covers`, com propagação por merge
   audit→RC→validation. CI dos novos HEADs e reviews humanos ficam pendentes
   até a publicação no ambiente Git autenticado.

### Execução focal e reconciliação do pacote

Estado em 17/10: EM_ANDAMENTO. Planejamento commitado em `7a5681a`;
RED original 0/3 e GREEN original 3/3 registrados em cri-rev-005-evidence.md.
Dry-run confirmou todas as âncoras no HEAD real `0b154ce`.
Sem nova decisão de produto nem dependência; constituição e checklist PASS.
Durante a revisão, o Ajv demonstrou que os exemplos de detalhe/criação omitem
`laboratory.status`, já obrigatório e emitido pelo serializer. T043 inclui a
correção desses dois exemplos no mesmo YAML e a proteção do detalhe sem capa.
Esse desvio comprovado e seu RED são registrados na evidência focal.
T041–T045 seguem dependências do pacote; publicação/re-review ainda pendentes.
Os dados e HEADs iniciais, restrições, riscos e gates estão na evidência focal.

17/10, 18:05:50Z: T041–T044 executadas; gates locais concluídos no snapshot
funcional f38d439, com 15 gates em PASS e FAIL inicial do IHFR preservado.
Nova execução do mesmo gate passou sem mudanças; erro idêntico está documentado
desde 13/10. Não se declara a intermitência corrigida. Detalhes/comandos/hashes
na evidência focal. Estado EM_ANDAMENTO para T045: publicação autorizada na
origem, merges cumulativos, CI dos novos HEADs e solicitação de revisão humana.

### Reabertura após CI da correção contratual

Run `39056678227`, origem `60eaa42`: Unit PASS, Integration 214/215, corrida de
quota ativa rejeitou com INTERNAL_ERROR em vez de RATE_LIMITED. O teste e o
serviço são idênticos aos anteriores ao patch; os PASSs locais não explicam o
FAIL remoto. Não repetir até obter verde nem atribuir causa ambiental sem prova.
T045 tem publicação da RC suspensa enquanto T046 diagnostica o erro original,
antes da sanitização, em PostgreSQL sintético e com somente códigos/kinds seguros.
Se houver incompatibilidade real comprovada, T047 fará o ajuste mínimo permitido
pelo mandato atual, com RED/GREEN e nova regressão, sem mudar quota/asserts/teto3,
timeouts, sem reintroduzir rede em transação e sem tocar regras científicas.
O runner cumulativo da RC já iniciado pode concluir no snapshot anterior; seus
resultados serão históricos caso haja ajuste adicional. Nenhum arquivo da RC
será alterado enquanto essa coleta estiver em execução.

Após a coleta da RC, o mesmo seletor global de IHFR falhou novamente (5/6),
com dois elementos para a mensagem de ausência. T048 limita a busca à região
de leitura acessível, visível e nomeada exatamente, preservando a exigência de
mesmo texto visível. Isso distingue a página atual do conteúdo oculto observado
pelo locator; não adiciona first()/sleep, retry, timeout ou tolerância de domínio.
Trata-se de correção do alvo do teste com RED real preservado, sem mudança em
src/**, ciência ou produto. O teste com novo alvo deve passar pelo fluxo real
de OWNER e ADMIN e todos os seis cenários dedicados antes da propagação.

18:26:02Z: T048 GREEN6/6, bootstrap14 e audit0; typecheck/lint focais PASS.
T046: 60 corridas locais sem reproduzir o erro remoto; formas P2034/40001
comprovadas são tratadas pelo código atual. Fixtures agora preservam somente
códigos/kinds para uma próxima ocorrência no CI, sem mudar valores das asserções.
T047 não é acionada por hipótese: serviço/serializer permanecem intactos.
Prosseguir publicação nos ramos de revisão conforme autorização do usuário,
mantendo o achado de quota aberto para CI/avaliação humana; sem parecer de pronto
para integração. A suspensão anterior permitiu investigar e preservar a falha,
não constitui proibição de publicar evidências nos PRs de revisão autorizados.

### Causa adicional demonstrada pelo diagnóstico do CI

Run39058159071 em 8f1f927: quota horária214/215, mesma resposta INTERNAL_ERROR.
A nova asserção capturou exatamente três conflitos suportados: um
DriverAdapterError/TransactionWriteConflict/40001 e dois P2034 com a mesma causa.
O helper atual repete imediatamente e devolve INTERNAL_ERROR quando esgota três
tentativas. A captura afasta a hipótese anterior de tipo de erro desconhecido.
INFERENCIA: retries imediatos sob contenção podem competir novamente antes que
o outro commit esteja disponível; a causa de cada conflito não é extrapolada.

T047 passa a ter implementação justificada: espera assíncrona entre conflitos
reconhecidos, de 100–150ms antes da segunda tentativa e 200–250ms antes da terceira.
Teto3, maxWait15000, timeout30000, allowlist de conflitos, quotas e I/O preservados.
Espera injetável só para testes determinísticos; padrão usa timer Node e jitter
criptográfico. RED deve provar que a próxima transação não começa antes da
espera autorizada, que são somente duas esperas em três tentativas e que erro
arbitrário não espera/reexecuta. Revalidar os cenários Pg/provider, Unit, tipos,
lint/build/E2E afetados e CI dos quatro HEADs. Não declarar todo conflito sob
contenção ilimitada resolvido; não aumentar tentativas nem retornar quota falsa.

### Fechamento técnico — aguardando revisão humana

Estado: AGUARDANDO_REVISAO. T041–T048 executadas; paridade do pacote, exemplos,
teste de seletor e recuo de retries comprovados por RED/GREEN e regressão.
RC4b03798: 15 gates PASS em uma única rodada, 18:43:06.722–18:49:57.419Z,
Integration218/E2E72/Ihfr6, três avisos de lint anteriores, zero schemas e cluster
STOPPED. Serviço só recebeu o ajuste de retry justificado pelo CI; serializer,
regras científicas, dependências e schema persistido preservados.

Branches publicadas na ordem autorizada; pais dos merges, preservação dos11
originais/99d8363/832560a e diff independente do PR7 conferidos. Pedidos de revisão
e comentários publicados. Fechamento documental subsequente mantém inputs
funcionais e exige seus próprios checks, acompanhados até a conclusão no GitHub;
o recibo final dos HEADs/checks está nos comentários ligados na evidência focal.
Não há aprovação humana concedida pelo executor nem operação produtiva autorizada
por este plano. Os checkpoints e FAILs anteriores permanecem históricos.

### Reabertura focal do seletor após o CI do fechamento

Run39060376048, RC2e4576b: todos os gates até Deletion passaram, inclusive
Integration218/E2E72. Ihfr5/6 falhou na linha120: getByLabel global de uso da
terra encontrou dois selects. A mensagem da linha119, já escopada, passou.
O ajuste anterior de T048 foi insuficiente para os demais seletores do mesmo
formulário. T048/T045 reabertas; não é regressão da paridade ou dos retries.
Origemaa9d2ce/auditoria97957a0/validação7e55d0f concluíram SUCCESS no mesmo runtime.

Recorte comprovado: no cenário OWNER/ADMIN, obter as regiões visíveis de leitura
e gestão por nomes ARIA exatos e escopar campos, mensagens e ações a seus alvos.
Manter respostas HTTP, scores, idempotência, foco, teclado e viewport esperados;
não mudar timeouts, retries ou dados/guardas científicos. A seleção do dialog
continua por role visível. RED do CI preservado; executar os seis cenários e
typecheck/lint do teste antes de propagar. Nenhuma alteração de produção adicional.

### Conclus?o focal dos seletores

Planejamento complementar registrado em 1d9fb68 antes do ajuste. O cen?rio
OWNER/ADMIN usa agora as regi?es ARIA exatas de leitura e gerenciamento para
todos os seus campos/mensagens/a??es; dialog continua por role na p?gina.
Asser??es e resultados esperados foram preservados. Typecheck/lint PASS;
runner oficial Ihfr6/6 e SchemaAudit0 PASS na origem e na RC cumulativa,
19:17?19:21Z. RC restaurada byte a byte ap?s a valida??o tempor?ria do candidato.
Nenhuma mudan?a adicional no servi?o ou nas regras IHFR. Recibo focal em
cri-rev-005-evidence/selector-validation.json; FAIL39060376048 preservado.
Os pr?ximos HEADs exigem CI pr?prio e seu resultado final ? registrado nos
coment?rios est?veis dos PRs; aprova??o humana permanece pendente.
