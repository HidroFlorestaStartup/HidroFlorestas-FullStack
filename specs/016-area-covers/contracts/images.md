# Contrato de imagem da área

Recurso `/api/laboratories/{laboratoryId}/areas/{areaId}/image`.
GET: `{image:{revision,hasImage,width?,height?},canEdit}` no-store, sem URL provider.
POST /uploads: JSON fechado `{expectedRevision,key}`; `{attemptId,expiresAt,upload:{url,params}}`.
URL upload tem host fixo Cloudinary; params signed com api_key público, sem api_secret.
POST /uploads/{attemptId}/confirm: JSON `{}`; não recebe client asset metadata/URL.
DELETE image: JSON `{expectedRevision}`; 204; stale 409; ausência repetida segura.
GET /content: bytes WebP de capa atual, sessão/contexto revistos, private/no-store,
sem redirect e com nosniff; erros sanitizados e ausência 404.
Mutações JSON <=16KiB e CSRF Origin/fetch-site. 401/403/404/409/429/503 sanitizados.
BODY não aceita userId/areaId/publicId/type/assetId/URLs; principal deriva da sessão.
