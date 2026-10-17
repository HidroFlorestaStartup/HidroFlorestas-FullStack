import assert from "node:assert/strict";
import {test} from "node:test";
import {readFile} from "node:fs/promises";
import {withMigrationDatabase,applyAreaMigration,applyCollectionMigration,applyEnvironmentalMigration} from "./migration-test-harness";
test("cover migration is additive, enforces complete pointers and preserves area assets when uploader is removed",async()=>withMigrationDatabase(async client=>{
 await applyAreaMigration(client);await applyCollectionMigration(client);await applyEnvironmentalMigration(client);
 const before=await client.query('SELECT count(*)::int AS count FROM "EnvironmentalMeasurementSet"');
 await client.query(await readFile("prisma/migrations/20261010000200_area_covers/migration.sql","utf8"));assert.deepEqual((await client.query('SELECT count(*)::int AS count FROM "EnvironmentalMeasurementSet"')).rows,before.rows);
 await client.query(`INSERT INTO "User" (id,email,"firstName","lastName",password,"updatedAt") VALUES ('cover-owner','cover-owner@migration.test.invalid','Synthetic','Test','synthetic',now()),('cover-actor','cover-actor@migration.test.invalid','Synthetic','Test','synthetic',now())`);
 await client.query("BEGIN");await client.query(`INSERT INTO "LaboratoryRoom" (id,name,"userId","accessCode","updatedAt") VALUES ('cover-lab','Synthetic','cover-owner','cover-lab-code',now())`);await client.query(`INSERT INTO "ResearchersLinked" (id,"userId","laboratoryRoomId",role) VALUES ('cover-membership','cover-owner','cover-lab','OWNER')`);await client.query("COMMIT");
 await client.query(`INSERT INTO "CollectionArea" (id,name,"userId","laboratoryRoomId",latitude,longitude,"updatedAt") VALUES ('cover-area','Synthetic','cover-owner','cover-lab',0,0,now())`);
 await client.query(`INSERT INTO "CoverUploadAttempt" (id,"areaId","userId",key,"expectedRevision","stagingPublicId","finalPublicId","presetHash","issuedAt","expiresAt") VALUES ('attempt','cover-area','cover-actor','key',0,'staging.webp','final',$1,now(),now()+interval '10 minutes')`,["a".repeat(64)]);
 await client.query(`INSERT INTO "AreaCover" ("areaId","updatedAt") VALUES ('cover-area',now())`);
 for(const change of ['revision=-1',`"assetId"='partial'`,`"format"='webp'`])await assert.rejects(client.query(`UPDATE "AreaCover" SET ${change}`));
 await client.query(`UPDATE "AreaCover" SET revision=1,"assetId"='owned',"publicId"='final',version=1,format='webp',bytes=10,width=10,height=10,"attemptId"='attempt'`);
 for(const change of ['version=NULL','width=4097',`format='png'`])await assert.rejects(client.query(`UPDATE "AreaCover" SET ${change}`));
 await client.query(`DELETE FROM "User" WHERE id='cover-actor'`);assert.equal((await client.query(`SELECT "userId" FROM "CoverUploadAttempt" WHERE id='attempt'`)).rows[0].userId,null);assert.equal((await client.query(`SELECT "assetId" FROM "AreaCover"`)).rows[0].assetId,"owned");
 await assert.rejects(client.query(`DELETE FROM "CoverUploadAttempt" WHERE id='attempt'`),/AreaCover_attemptId_fkey/);await assert.rejects(client.query(`DELETE FROM "CollectionArea" WHERE id='cover-area'`),/fkey/);
}));
