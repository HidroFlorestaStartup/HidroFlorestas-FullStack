-- Personal work in progress, separated from immutable confirmed science.
CREATE TABLE "EnvironmentalDraft" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "collectionDataId" TEXT NOT NULL,
  "formVersion" VARCHAR(64) NOT NULL,
  "fields" JSONB NOT NULL,
  "revision" INTEGER NOT NULL DEFAULT 1,
  "lastSaveKey" VARCHAR(36) NOT NULL,
  "lastSaveHash" VARCHAR(64) NOT NULL,
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMPTZ(3) NOT NULL,
  CONSTRAINT "EnvironmentalDraft_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "EnvironmentalDraft_revision_check" CHECK ("revision" > 0),
  CONSTRAINT "EnvironmentalDraft_fields_check" CHECK (jsonb_typeof("fields") = 'object'),
  CONSTRAINT "EnvironmentalDraft_version_check" CHECK ("formVersion" = 'environmental-draft-v1'),
  CONSTRAINT "EnvironmentalDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "EnvironmentalDraft_collectionDataId_fkey" FOREIGN KEY ("collectionDataId") REFERENCES "CollectionData"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "EnvironmentalDraft_userId_collectionDataId_key" ON "EnvironmentalDraft"("userId", "collectionDataId");
CREATE INDEX "EnvironmentalDraft_collectionDataId_idx" ON "EnvironmentalDraft"("collectionDataId");
