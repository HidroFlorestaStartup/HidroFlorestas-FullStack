import assert from "node:assert/strict";
import { test } from "node:test";
import { randomBytes, randomUUID } from "node:crypto";
import { EnvironmentalDraftService } from "../../src/app/api/server/environmental-data/draft.service";
import { EnvironmentalDataService, PrismaMeasurementStore, measurementAuthorization } from "../../src/app/api/server/services/environmental-data.service";
import { DRAFT_VERSION } from "../../src/types/environmental-draft";
import { selectedImp006DatabaseVariable, withImp006PostgresqlSchema } from "../fixtures/postgresql-schema-lifecycle";
import { setupIHFRDiagnosisFixtures } from "../fixtures/ihfr-diagnosis-fixtures";
import { IHFR_ACTORS, IHFR_LABORATORIES } from "../fixtures/ihfr-diagnosis-actors";
import { IHFR_CONTEXTS } from "../fixtures/ihfr-diagnosis-contexts";
import { validEnvironmentalPayload } from "../fixtures/environmental-data";
import { AccountService } from "../../src/app/api/server/accounts/service";
import { signSessionToken } from "../../src/app/api/server/auth/session";
import type { AccountPolicy } from "../../src/app/api/server/accounts/policy";

const context = { laboratoryId: IHFR_LABORATORIES.active, areaId: IHFR_CONTEXTS.activeArea, collectionId: IHFR_CONTEXTS.withoutMeasurementCollection };
const input = () => ({draftId:null,expectedRevision:0,saveKey:randomUUID(),formVersion:DRAFT_VERSION,fields:{"water.hasSpring":{kind:"value",value:false},"terrain.elevationMeters":{kind:"editing",raw:"12."}}});
const fixture = (run: (db: Parameters<Parameters<typeof withImp006PostgresqlSchema>[1]>[1], service: EnvironmentalDraftService) => Promise<void>) => withImp006PostgresqlSchema(selectedImp006DatabaseVariable(), async (client,db) => { await setupIHFRDiagnosisFixtures(client); await run(db,new EnvironmentalDraftService(db)); });

test("draft isolation, replay, two laboratories, removed membership and inactive/blocked identities", () => fixture(async(db,service) => {
  const command=input();
  const own=await service.save(IHFR_ACTORS.member,context,command);
  assert.deepEqual(await service.save(IHFR_ACTORS.member,context,command),own);
  assert.equal(await service.detail(IHFR_ACTORS.owner,context),null);
  const second=await service.save(IHFR_ACTORS.owner,context,input());
  assert.notEqual(own.id,second.id);
  await assert.rejects(service.save(IHFR_ACTORS.member,context,{...command,fields:{}}),{code:"STALE_REVISION"});
  await assert.rejects(service.detail(IHFR_ACTORS.outsider,context),{code:"NOT_FOUND"});
  await assert.rejects(service.detail(IHFR_ACTORS.member,{...context,areaId:IHFR_CONTEXTS.inactiveArea}),{code:"NOT_FOUND"});
  await assert.rejects(service.save(IHFR_ACTORS.member,{...context,collectionId:IHFR_CONTEXTS.unconfirmedCollection},input()),{code:"NOT_FOUND"});
  await db.researchersLinked.delete({where:{userId_laboratoryRoomId:{userId:IHFR_ACTORS.member,laboratoryRoomId:context.laboratoryId}}});
  await assert.rejects(service.detail(IHFR_ACTORS.member,context),{code:"NOT_FOUND"});
  await db.user.update({where:{id:IHFR_ACTORS.owner},data:{status:"BLOCKED"}});
  await assert.rejects(service.detail(IHFR_ACTORS.owner,context),{code:"UNAUTHENTICATED"});
  await db.user.update({where:{id:IHFR_ACTORS.owner},data:{status:"ACTIVE"}});
  await db.laboratoryRoom.update({where:{id:context.laboratoryId},data:{isActive:false}});
  assert.equal((await service.detail(IHFR_ACTORS.owner,context))?.id,second.id);
  await assert.rejects(service.save(IHFR_ACTORS.owner,context,{...input(),draftId:second.id,expectedRevision:second.revision}),{code:"READ_ONLY"});
  await assert.rejects(service.discard(IHFR_ACTORS.owner,context,{draftId:second.id,expectedRevision:second.revision}),{code:"READ_ONLY"});
}));

test("draft concurrent save has one winner and delayed discard cannot delete a recreated draft", () => fixture(async(db,service) => {
  const first=await service.save(IHFR_ACTORS.member,context,input());
  const command={...input(),draftId:first.id,expectedRevision:first.revision};
  const results=await Promise.allSettled([service.save(IHFR_ACTORS.member,context,command),service.save(IHFR_ACTORS.member,context,{...command,saveKey:randomUUID()})]);
  assert.equal(results.filter(r=>r.status==="fulfilled").length,1);
  assert.equal((results.find(r=>r.status==="rejected") as PromiseRejectedResult).reason.code,"STALE_REVISION");
  const current=(await service.detail(IHFR_ACTORS.member,context))!;
  assert.equal(current.revision,2);
  await assert.rejects(service.discard(IHFR_ACTORS.member,context,{draftId:first.id,expectedRevision:1}),{code:"STALE_REVISION"});
  await service.discard(IHFR_ACTORS.member,context,{draftId:current.id,expectedRevision:2});
  await service.discard(IHFR_ACTORS.member,context,{draftId:current.id,expectedRevision:2});
  const recreated=await service.save(IHFR_ACTORS.member,context,input());
  await assert.rejects(service.discard(IHFR_ACTORS.member,context,{draftId:current.id,expectedRevision:2}),{code:"STALE_REVISION"});
  assert.equal((await service.detail(IHFR_ACTORS.member,context))?.id,recreated.id);
  assert.equal(await db.environmentalMeasurementSet.count({where:{collectionDataId:context.collectionId}}),0);
}));

test("confirmation consumes only current personal draft atomically, preserves rollback and replay", () => fixture(async(db,service) => {
  const first=await service.save(IHFR_ACTORS.member,context,input());
  const other=await service.save(IHFR_ACTORS.owner,context,input());
  const create = (store=new PrismaMeasurementStore(db)) => new EnvironmentalDataService({store,authorize:measurementAuthorization,clock:()=>new Date(),createId:randomUUID});
  const command={...context,userId:IHFR_ACTORS.member,confirmationKey:randomUUID(),payload:validEnvironmentalPayload(),draft:{id:first.id,revision:1}};
  await assert.rejects(create().create({...command,draft:{id:first.id,revision:2}}),{code:"CONFLICT"});
  const failingStore=new PrismaMeasurementStore(db);
  const failing=new EnvironmentalDataService({store:{transaction:fn=>failingStore.transaction(tx=>fn({...tx,create:async()=>{throw new Error("synthetic failure");}}))},authorize:measurementAuthorization,clock:()=>new Date(),createId:randomUUID});
  await assert.rejects(failing.create(command),{code:"INTERNAL_ERROR"});
  assert.equal((await service.detail(IHFR_ACTORS.member,context))?.id,first.id);
  assert.equal(await db.environmentalMeasurementSet.count({where:{collectionDataId:context.collectionId}}),0);
  const results=await Promise.all([create().create(command),create().create(command)]);
  assert.equal(results.filter(r=>r.created).length,1);
  assert.equal(await service.detail(IHFR_ACTORS.member,context),null);
  assert.equal((await service.detail(IHFR_ACTORS.owner,context))?.id,other.id);
  assert.equal((await create().create(command)).created,false);
  await assert.rejects(service.save(IHFR_ACTORS.member,context,input()),{code:"CONFLICT"});
  await service.discard(IHFR_ACTORS.owner,context,{draftId:other.id,expectedRevision:1});
  assert.equal(await db.environmentalMeasurementSet.count({where:{collectionDataId:context.collectionId}}),1);
  const measurement=await db.environmentalMeasurementSet.findUniqueOrThrow({where:{collectionDataId:context.collectionId}});
  await assert.rejects(db.environmentalMeasurementSet.update({where:{id:measurement.id},data:{payloadHash:"changed"}}));
}));

test("allowed account deletion removes only personal drafts and rolls back them on failure", () => fixture(async(db,service) => {
  process.env.JWT_SECRET=randomBytes(48).toString("base64");
  const policy:AccountPolicy={verificationTtlMs:900000,maxCodeAttempts:5,cooldownMs:60000,verificationSendsPerHour:5,resetTtlMs:1800000,resetRequestsPerHour:3,globalRequestsPerHour:100,
    protection:{keys:new Map([["p",randomBytes(32)]]),activeKeyId:"p",requestKey:randomBytes(32)},mail:{keys:new Map([["m",randomBytes(32)]]),activeKeyId:"m",idempotencyKey:randomBytes(32),publicUrl:"https://drafts.example.invalid"},testerAllowlist:null};
  const user=await db.user.create({data:{email:"draft-only@drafts.test.invalid",firstName:"Synthetic",lastName:"Draft",password:"synthetic",status:"ACTIVE",verificationRequired:false}});
  const others=await service.save(IHFR_ACTORS.owner,context,input());
  const personal=await db.environmentalDraft.create({data:{userId:user.id,collectionDataId:context.collectionId,formVersion:DRAFT_VERSION,fields:{},lastSaveKey:randomUUID(),lastSaveHash:"a".repeat(64)}});
  const token=signSessionToken(user.id);
  const make=(fail=false)=>new AccountService({db,policy:()=>policy,comparePassword:async()=>true,...(fail?{beforeCommit:async()=>{throw Error("rollback");}}:{})});
  assert.equal((await make().deletionState(token)).canDelete,true);
  const body={currentPassword:"synthetic",confirmDeletion:true};
  await assert.rejects(make(true).deleteAccount(token,body,"draft-test"),/rollback/);
  assert.ok(await db.environmentalDraft.findUnique({where:{id:personal.id}}));
  await make().deleteAccount(token,body,"draft-test");
  assert.equal(await db.user.findUnique({where:{id:user.id}}),null);
  assert.equal(await db.environmentalDraft.findUnique({where:{id:personal.id}}),null);
  assert.ok(await db.environmentalDraft.findUnique({where:{id:others.id}}));
  assert.equal(await db.environmentalMeasurementSet.count(),2);
}));

test("confirmation requires current personal draft reference and save versus confirm has a consistent winner",()=>fixture(async(db,service)=>{
 const measurement=new EnvironmentalDataService({store:new PrismaMeasurementStore(db),authorize:measurementAuthorization,clock:()=>new Date(),createId:randomUUID});
 const command={...context,userId:IHFR_ACTORS.member,confirmationKey:randomUUID(),payload:validEnvironmentalPayload()};
 const first=await service.save(IHFR_ACTORS.member,context,input());
 await assert.rejects(measurement.create(command),{code:"CONFLICT"});
 assert.equal((await service.detail(IHFR_ACTORS.member,context))?.id,first.id);
 const changed={...input(),draftId:first.id,expectedRevision:1};
 const results=await Promise.allSettled([service.save(IHFR_ACTORS.member,context,changed),measurement.create({...command,draft:{id:first.id,revision:1}})]);
 assert.equal(results.filter(r=>r.status==="fulfilled").length,1);
 const stored=await db.environmentalMeasurementSet.findUnique({where:{collectionDataId:context.collectionId}});
 const draft=await service.detail(IHFR_ACTORS.member,context);
 if(stored)assert.equal(draft,null);else assert.equal(draft?.revision,2);
}));
