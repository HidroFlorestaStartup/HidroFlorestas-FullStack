CREATE TABLE "CoverUploadAttempt" (
 "id" TEXT PRIMARY KEY,"areaId" TEXT NOT NULL,"userId" TEXT,"key" VARCHAR(36) NOT NULL,
 "expectedRevision" INTEGER NOT NULL CHECK ("expectedRevision">=0),
 "stagingPublicId" TEXT NOT NULL UNIQUE,"finalPublicId" TEXT NOT NULL UNIQUE,
 "presetHash" VARCHAR(64) NOT NULL,"issuedAt" TIMESTAMPTZ(3) NOT NULL,"expiresAt" TIMESTAMPTZ(3) NOT NULL,
 "state" VARCHAR(16) NOT NULL DEFAULT 'ISSUED' CHECK ("state" IN ('ISSUED','PROCESSING','CONFIRMED','FAILED')),
 "leaseId" TEXT,"leaseUntil" TIMESTAMPTZ(3),"finalAssetId" TEXT,"resultRevision" INTEGER,
 CONSTRAINT "CoverUploadAttempt_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "CollectionArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT "CoverUploadAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
 CONSTRAINT "CoverUploadAttempt_lifetime" CHECK ("expiresAt">"issuedAt")
);
CREATE UNIQUE INDEX "CoverUploadAttempt_userId_key_key" ON "CoverUploadAttempt"("userId","key");
CREATE INDEX "CoverUploadAttempt_userId_issuedAt_idx" ON "CoverUploadAttempt"("userId","issuedAt");
CREATE TABLE "AreaCover" (
 "areaId" TEXT PRIMARY KEY,"revision" INTEGER NOT NULL DEFAULT 0 CHECK ("revision">=0),
 "assetId" TEXT,"publicId" TEXT,"version" INTEGER,"format" TEXT,"bytes" INTEGER,"width" INTEGER,"height" INTEGER,"attemptId" TEXT,
 "updatedAt" TIMESTAMPTZ(3) NOT NULL,
 CONSTRAINT "AreaCover_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "CollectionArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT "AreaCover_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "CoverUploadAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 CONSTRAINT "AreaCover_complete_pointer" CHECK (
  ("assetId" IS NULL AND "publicId" IS NULL AND "version" IS NULL AND "format" IS NULL AND "bytes" IS NULL AND "width" IS NULL AND "height" IS NULL AND "attemptId" IS NULL)
  OR ("assetId" IS NOT NULL AND "publicId" IS NOT NULL AND "version" IS NOT NULL AND "version">0 AND "format" IS NOT NULL AND "format"='webp' AND "bytes" IS NOT NULL AND "bytes">0 AND "bytes"<=10485760 AND "width" IS NOT NULL AND "width" BETWEEN 1 AND 4096 AND "height" IS NOT NULL AND "height" BETWEEN 1 AND 4096 AND "attemptId" IS NOT NULL AND "revision">0))
);
CREATE TABLE "CoverCleanupJob" (
 "id" TEXT PRIMARY KEY,"attemptId" TEXT NOT NULL,"publicId" TEXT NOT NULL,"resourceType" VARCHAR(8) NOT NULL CHECK ("resourceType" IN ('image','video','raw')),
 "kind" VARCHAR(8) NOT NULL CHECK ("kind" IN ('STAGING','FINAL')),"assetId" TEXT,
 "notBefore" TIMESTAMPTZ(3) NOT NULL,"nextAttemptAt" TIMESTAMPTZ(3) NOT NULL,
 "state" VARCHAR(16) NOT NULL DEFAULT 'PENDING' CHECK ("state" IN ('PENDING','PROCESSING','RECONCILE','BLOCKED')),
 "leaseId" TEXT,"leaseUntil" TIMESTAMPTZ(3),"tries" INTEGER NOT NULL DEFAULT 0 CHECK ("tries">=0),"lastError" VARCHAR(32),
 CONSTRAINT "CoverCleanupJob_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "CoverUploadAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "CoverCleanupJob_publicId_resourceType_key" ON "CoverCleanupJob"("publicId","resourceType");
CREATE INDEX "CoverCleanupJob_nextAttemptAt_state_idx" ON "CoverCleanupJob"("nextAttemptAt","state");
