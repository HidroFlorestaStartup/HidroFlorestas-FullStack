import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID,randomBytes } from "node:crypto";
import {AccountService} from "../../src/app/api/server/accounts/service";
import type {AccountPolicy} from "../../src/app/api/server/accounts/policy";
import {signSessionToken} from "../../src/app/api/server/auth/session";
import sharp from "sharp";
import { AreaCoverService } from "../../src/app/api/server/images/service";
import { FakeCoverProvider,coverBytes } from "../fixtures/area-cover-provider";
import { selectedImp006DatabaseVariable,withImp006PostgresqlSchema } from "../fixtures/postgresql-schema-lifecycle";
import { setupIHFRDiagnosisFixtures } from "../fixtures/ihfr-diagnosis-fixtures";
import { IHFR_ACTORS as A,IHFR_LABORATORIES as L } from "../fixtures/ihfr-diagnosis-actors";
import { IHFR_CONTEXTS as C } from "../fixtures/ihfr-diagnosis-contexts";
const context={laboratoryId:L.active,areaId:C.activeArea};
const fixture=(run:(db:Parameters<Parameters<typeof withImp006PostgresqlSchema>[1]>[1],service:AreaCoverService,p:FakeCoverProvider,advance:(ms:number)=>void)=>Promise<void>)=>withImp006PostgresqlSchema(selectedImp006DatabaseVariable(),async(client,db)=>{await setupIHFRDiagnosisFixtures(client);let now=new Date("2026-10-10T12:00:00Z");const p=new FakeCoverProvider(),service=new AreaCoverService(db,()=>p,()=>now);await run(db,service,p,ms=>{now=new Date(now.getTime()+ms);});});
test("cover authorization uses current laboratory role, validates context, strips EXIF and revokes read",()=>fixture(async(db,s,p)=>{
 await assert.rejects(s.initiate(A.member,context,{expectedRevision:0,key:randomUUID()}),{code:"FORBIDDEN"});
 await assert.rejects(s.detail(A.outsider,context),{code:"NOT_FOUND"});await assert.rejects(s.detail(A.owner,{...context,areaId:C.inactiveArea}),{code:"NOT_FOUND"});
 const command={expectedRevision:0,key:randomUUID()},ticket=await s.initiate(A.owner,context,command);assert.deepEqual(await s.initiate(A.owner,context,command),ticket);
 await p.store(ticket.upload.params.public_id,ticket.attemptId,"staging",await coverBytes());
 const cover=await s.confirm(A.owner,context,ticket.attemptId);assert.equal(cover.image.revision,1);assert.equal(cover.image.hasImage,true);
 assert.equal((await s.detail(A.member,context)).canEdit,false);const content=await s.content(A.member,context);assert.equal((await sharp(content).metadata()).exif,undefined);
 assert.equal(JSON.stringify(cover).includes("publicId"),false);assert.equal(JSON.stringify(cover).includes("cloudinary"),false);
 await db.researchersLinked.delete({where:{userId_laboratoryRoomId:{userId:A.member,laboratoryRoomId:L.active}}});await assert.rejects(s.content(A.member,context),{code:"NOT_FOUND"});
 await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:false}});assert.equal((await s.detail(A.owner,context)).canEdit,false);await assert.rejects(s.remove(A.owner,context,{expectedRevision:1}),{code:"READ_ONLY"});
}));
test("cover replacement preserves old, retries ambiguous upload, conflicts concurrent revisions and ABA removal",()=>fixture(async(db,s,p)=>{
 async function stage(revision:number){const t=await s.initiate(A.owner,context,{expectedRevision:revision,key:randomUUID()});await p.store(t.upload.params.public_id,t.attemptId,"staging",await coverBytes());return t;}
 const first=await stage(0);await s.confirm(A.owner,context,first.attemptId);const original=await db.areaCover.findUniqueOrThrow({where:{areaId:context.areaId}});
 const failed=await stage(1);p.failUpload=true;await assert.rejects(s.confirm(A.owner,context,failed.attemptId),{code:"UNAVAILABLE"});assert.equal((await db.areaCover.findUniqueOrThrow({where:{areaId:context.areaId}})).assetId,original.assetId);
 p.failUpload=false;p.loseUpload=true;await assert.rejects(s.confirm(A.owner,context,failed.attemptId),{code:"UNAVAILABLE"});assert.equal((await s.confirm(A.owner,context,failed.attemptId)).image.revision,2);
 const left=await stage(2),right=await stage(2);const outcomes=await Promise.allSettled([s.confirm(A.owner,context,left.attemptId),s.confirm(A.owner,context,right.attemptId)]);assert.equal(outcomes.filter(x=>x.status==="fulfilled").length,1);assert.equal((await s.detail(A.owner,context)).image.revision,3);
 await assert.rejects(s.remove(A.owner,context,{expectedRevision:2}),{code:"STALE_REVISION"});await s.remove(A.owner,context,{expectedRevision:3});await s.remove(A.owner,context,{expectedRevision:3});assert.equal((await s.detail(A.owner,context)).image.revision,4);
 const next=await stage(4);await s.confirm(A.owner,context,next.attemptId);await assert.rejects(s.remove(A.owner,context,{expectedRevision:3}),{code:"STALE_REVISION"});
 assert.equal((await s.confirm(A.owner,context,first.attemptId)).image.revision,5);
}));
test("cleanup proves ownership, preserves referenced assets, retries and revisits late resources including raw",()=>fixture(async(db,s,p,advance)=>{
 const live=await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});await p.store(live.upload.params.public_id,live.attemptId,"staging",await coverBytes());await s.confirm(A.owner,context,live.attemptId);
 const own=await s.initiate(A.owner,context,{expectedRevision:1,key:randomUUID()});const foreign=await s.initiate(A.owner,context,{expectedRevision:1,key:randomUUID()});
 const raw=await p.store(own.upload.params.public_id,own.attemptId,"staging",Buffer.from("synthetic raw"),"raw");const other=await p.store(foreign.upload.params.public_id,randomUUID(),"staging",await coverBytes());
 advance(71*60000);p.failDestroy=true;await s.cleanup(30);assert.ok(await p.inspect(raw.publicId,"raw"));p.failDestroy=false;advance(61*60000);await s.cleanup(30);assert.equal(await p.inspect(raw.publicId,"raw"),null);assert.ok(await p.inspect(other.publicId,"image"));assert.equal((await s.detail(A.owner,context)).image.hasImage,true);
 const late=await p.store(own.upload.params.public_id,own.attemptId,"staging",await coverBytes());advance(61*60000);await s.cleanup(30);assert.equal(await p.inspect(late.publicId,"image"),null);
 assert.ok(await db.coverCleanupJob.count({where:{state:"BLOCKED"}}));assert.ok(await db.coverCleanupJob.count({where:{state:"RECONCILE"}}));
}));

test("contextual ADMIN edits, global ADMIN has no bypass and live revocation/downgrade blocks finalization",()=>fixture(async(db,s,p)=>{
 await db.user.update({where:{id:A.outsider},data:{role:"ADMIN"}});await assert.rejects(s.initiate(A.outsider,context,{expectedRevision:0,key:randomUUID()}),{code:"NOT_FOUND"});
 await db.user.update({where:{id:A.member},data:{role:"ADMIN"}});await assert.rejects(s.initiate(A.member,context,{expectedRevision:0,key:randomUUID()}),{code:"FORBIDDEN"});
 const ticket=await s.initiate(A.contextualAdmin,context,{expectedRevision:0,key:randomUUID()});await p.store(ticket.upload.params.public_id,ticket.attemptId,"staging",await coverBytes());await assert.rejects(s.confirm(A.owner,context,ticket.attemptId),{code:"NOT_FOUND"});await s.confirm(A.contextualAdmin,context,ticket.attemptId);
 const later=await s.initiate(A.contextualAdmin,context,{expectedRevision:1,key:randomUUID()});await p.store(later.upload.params.public_id,later.attemptId,"staging",await coverBytes());
 const where={userId_laboratoryRoomId:{userId:A.contextualAdmin,laboratoryRoomId:L.active}};
 await db.researchersLinked.update({where,data:{role:"MEMBER"}});await assert.rejects(s.confirm(A.contextualAdmin,context,later.attemptId),{code:"FORBIDDEN"});await db.researchersLinked.update({where,data:{role:"ADMIN"}});
 await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:false}});await assert.rejects(s.confirm(A.contextualAdmin,context,later.attemptId),{code:"READ_ONLY"});await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:true}});
 await db.user.update({where:{id:A.contextualAdmin},data:{status:"BLOCKED"}});await assert.rejects(s.confirm(A.contextualAdmin,context,later.attemptId),{code:"UNAUTHENTICATED"});await db.user.update({where:{id:A.contextualAdmin},data:{status:"ACTIVE"}});
 await db.researchersLinked.delete({where});await assert.rejects(s.confirm(A.contextualAdmin,context,later.attemptId),{code:"NOT_FOUND"});assert.equal((await s.detail(A.owner,context)).image.revision,1);
 p.onDownload=async()=>{await db.researchersLinked.delete({where:{userId_laboratoryRoomId:{userId:A.member,laboratoryRoomId:L.active}}});};await assert.rejects(s.content(A.member,context),{code:"NOT_FOUND"});
 // A laboratory blocked while provider work is in progress cannot publish.
 const blocked=await s.initiate(A.owner,context,{expectedRevision:1,key:randomUUID()});await p.store(blocked.upload.params.public_id,blocked.attemptId,"staging",await coverBytes());p.onDownload=async()=>{await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:false}});};await assert.rejects(s.confirm(A.owner,context,blocked.attemptId),{code:"READ_ONLY"});assert.equal((await s.detail(A.owner,context)).image.revision,1);
}));
test("app expiry, preset changes and both active/hourly quotas cannot publish or issue unbounded signatures",()=>fixture(async(db,s,p,advance)=>{
 const first=await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});await p.store(first.upload.params.public_id,first.attemptId,"staging",await coverBytes());p.hash="b".repeat(64);await assert.rejects(s.confirm(A.owner,context,first.attemptId),{code:"UNAVAILABLE"});p.hash="a".repeat(64);
 for(let n=0;n<2;n++)await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});await assert.rejects(s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()}),{code:"RATE_LIMITED"});
 advance(11*60000);await assert.rejects(s.confirm(A.owner,context,first.attemptId),{code:"EXPIRED"});assert.equal((await s.detail(A.owner,context)).image.hasImage,false);
 for(let batch=0;batch<2;batch++){for(let n=0;n<3;n++)await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});advance(11*60000);}
 await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});assert.equal(await db.coverUploadAttempt.count({where:{userId:A.owner}}),10);await assert.rejects(s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()}),{code:"RATE_LIMITED"});
}));
test("permitted uploader account deletion rolls back safely then preserves team reading and owned cleanup",()=>fixture(async(db,s,p,advance)=>{
 const priorSecret=process.env.JWT_SECRET;process.env.JWT_SECRET=randomBytes(48).toString("base64");
 try{
  const policy:AccountPolicy={verificationTtlMs:900000,maxCodeAttempts:5,cooldownMs:60000,verificationSendsPerHour:5,resetTtlMs:1800000,resetRequestsPerHour:3,globalRequestsPerHour:100,protection:{keys:new Map([["p",randomBytes(32)]]),activeKeyId:"p",requestKey:randomBytes(32)},mail:{keys:new Map([["m",randomBytes(32)]]),activeKeyId:"m",idempotencyKey:randomBytes(32),publicUrl:"https://covers.example.invalid"},testerAllowlist:null};
  const uploader=await db.user.create({data:{email:`${randomUUID()}@covers.test.invalid`,firstName:"Synthetic",lastName:"Cover",password:"synthetic",status:"ACTIVE",verificationRequired:false}});await db.researchersLinked.create({data:{userId:uploader.id,laboratoryRoomId:L.active,role:"ADMIN"}});
  const ticket=await s.initiate(uploader.id,context,{expectedRevision:0,key:randomUUID()});await p.store(ticket.upload.params.public_id,ticket.attemptId,"staging",await coverBytes());await s.confirm(uploader.id,context,ticket.attemptId);
  await db.researchersLinked.delete({where:{userId_laboratoryRoomId:{userId:uploader.id,laboratoryRoomId:L.active}}});const token=signSessionToken(uploader.id),make=(fail=false)=>new AccountService({db,policy:()=>policy,comparePassword:async()=>true,...(fail?{beforeCommit:async()=>{throw Error("rollback");}}:{})});const body={currentPassword:"synthetic",confirmDeletion:true};
  assert.equal((await make().deletionState(token)).canDelete,true);await assert.rejects(make(true).deleteAccount(token,body,"cover-test"),/rollback/);assert.equal((await db.coverUploadAttempt.findUniqueOrThrow({where:{id:ticket.attemptId}})).userId,uploader.id);
  await make().deleteAccount(token,body,"cover-test");assert.equal((await db.coverUploadAttempt.findUniqueOrThrow({where:{id:ticket.attemptId}})).userId,null);assert.ok((await s.content(A.member,context)).length);assert.equal(await db.environmentalMeasurementSet.count(),2);
  await s.remove(A.owner,context,{expectedRevision:1});advance(71*60000);await s.cleanup(20);assert.equal(p.assets.size,0);
 }finally{if(priorSecret===undefined)delete process.env.JWT_SECRET;else process.env.JWT_SECRET=priorSecret;}
}));
