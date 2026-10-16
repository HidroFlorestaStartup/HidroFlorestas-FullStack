# Contrato de imagem da área

Recurso `/api/laboratories/{laboratoryId}/areas/{areaId}/image`.
GET: `{image:{revision,hasImage,width?,height?},canEdit}` no-store, sem URL provider.
Atualização CRI-REV-001 (15/10/2026): GET e confirmação acrescentam
`featureEnabled:boolean`. `canEdit` continua autorização contextual, independente
da configuração. `hasImage` continua existência persistida. Conteúdo só é
solicitável com featureEnabled && hasImage e autorização atual no endpoint.
Política A confirmada pelo usuário nesta conversa: flag diferente de `1` ou
configuração inválida desabilita initiate/confirm/DELETE/content (503 UNAVAILABLE
após autorização), sem alterar ponteiro, revisão, tentativa ou jobs. GET de
metadados permanece autorizado. DTO não expõe configuração nem motivo interno.
POST /uploads: JSON fechado `{expectedRevision,key}`; `{attemptId,expiresAt,upload:{url,params}}`.
URL upload tem host fixo Cloudinary; params signed com api_key público, sem api_secret.
POST /uploads/{attemptId}/confirm: JSON `{}`; não recebe client asset metadata/URL.
DELETE image: JSON `{expectedRevision}`; 204; stale 409; ausência repetida segura.
GET /content: bytes WebP de capa atual, sessão/contexto revistos, private/no-store,
sem redirect e com nosniff; erros sanitizados e ausência 404.
Mutações JSON <=16KiB e CSRF Origin/fetch-site. 401/403/404/409/429/503 sanitizados.
BODY não aceita userId/areaId/publicId/type/assetId/URLs; principal deriva da sessão.

CRI-REV-002: preflight Serializable verifica contexto, replay vigente compatível,
revisão e quotas antes do provider. Preset externo sem transação aberta; segunda
transação repete contexto/replay/revisão/quotas e cria tentativa+4 jobs em conjunto.
Replay vigente compatível revalida preset e devolve o mesmo ticket, sem renovar
expiresAt nem criar jobs, com precedência sobre revisão/quota atuais. Replay
incompatível (409), expirado/falho e pedido novo stale/limitado recusam sem preset.
Uma mesma chave criada durante I/O converge no registro existente; hash diferente
recusa 503. Retries serializáveis não repetem I/O; nenhum ticket antes do commit.

RC-UI-001: a prévia pode acrescentar retry inteiro local não sensível à query de
conteúdo, preservando revision. Cada GET continua same-origin autorizado e
private/no-store; retry não altera revisão nem concede acesso. O status “Capa
recarregada.” exige onLoad da tentativa atual; onError conserva fallback/retry.
