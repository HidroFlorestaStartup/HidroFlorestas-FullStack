# Modelo de capas

AreaCover: areaId PK/FK Restrict; revision Int >=0; publicId/assetId/version/format/
bytes/width/height nullable conjuntamente; attemptId UUID nullable; updatedAt.
Sem URL pública. CoverUploadAttempt: id UUID; areaId FK Restrict; userId FK SetNull;
key UUID unique(userId,key); expectedRevision; staging/finalPublicId unique;
issuedAt/expiresAt; state ISSUED/PROCESSING/CONFIRMED/FAILED; leaseId/leaseUntil;
finalAssetId e resultRevision nullable. Metadados finais ficam somente em AreaCover,
sem JSON duplicado na tentativa. Não guardar arquivo nem assinatura secret no banco.
Preset SHA256 esperado e observado registrado na tentativa, sem segredo.
CoverCleanupJob: id; attemptId FK Restrict; publicId/resourceType unique;
assetId nullable; notBefore; state; leaseId/leaseUntil; tries; nextAttemptAt;
lastError seguro; estados PENDING/PROCESSING/RECONCILE/BLOCKED. Tombstones não são purgados automaticamente; revisita periódica
de ausências/deleções só nas identidades controladas, nunca prefix/tag/all.
IDs/contextos esperados gerados antes do upload; final aponta asset sanitizado.
Nenhuma FK para medições/diagnóstico; CollectionArea.image legado não vira intenção.
