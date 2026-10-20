import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID,randomBytes } from "node:crypto";
import {AccountService} from "../../src/app/api/server/accounts/service";
import type {AccountPolicy} from "../../src/app/api/server/accounts/policy";
import {signSessionToken} from "../../src/app/api/server/auth/session";
import sharp from "sharp";
import { AreaCoverService } from "../../src/app/api/server/images/service";
import { createCoverHandlers } from "../../src/app/api/server/images/http";
import type { Prisma } from "../../src/generated/prisma";
import { FakeCoverProvider,coverBytes } from "../fixtures/area-cover-provider";
import { selectedImp006DatabaseVariable,withImp006PostgresqlSchema } from "../fixtures/postgresql-schema-lifecycle";
import { setupIHFRDiagnosisFixtures } from "../fixtures/ihfr-diagnosis-fixtures";
import { IHFR_ACTORS as A,IHFR_LABORATORIES as L } from "../fixtures/ihfr-diagnosis-actors";
import { IHFR_CONTEXTS as C } from "../fixtures/ihfr-diagnosis-contexts";
const context={laboratoryId:L.active,areaId:C.activeArea};
const command=()=>({expectedRevision:0,key:randomUUID()});
function barrier(parties=1){let enteredResolve!:()=>void,release!:()=>void;let arrived=0;const entered=new Promise<void>(r=>{enteredResolve=r;}),waiting=new Promise<void>(r=>{release=r;});return{entered,release,wait:async()=>{if(++arrived===parties)enteredResolve();await waiting;}};}
function transactionDiagnostic(error:unknown,depth=0):unknown{
 if(!error||typeof error!=="object"||depth>3)return undefined;
 const row=error as Record<string,unknown>;
 // Never print SQL, parameters, stack, raw messages or connection information.
 return{...Object.fromEntries(["name","code","kind","originalCode"].filter(key=>typeof row[key]==="string").map(key=>[key,row[key]])),...Object.fromEntries(["cause","meta","driverAdapterError"].filter(key=>row[key]&&typeof row[key]==="object").map(key=>[key,transactionDiagnostic(row[key],depth+1)]))};
}
const fixture=(run:(db:Parameters<Parameters<typeof withImp006PostgresqlSchema>[1]>[1],service:AreaCoverService,p:FakeCoverProvider,advance:(ms:number)=>void,diagnostics:unknown[])=>Promise<void>)=>withImp006PostgresqlSchema(selectedImp006DatabaseVariable(),async(client,db)=>{
 await setupIHFRDiagnosisFixtures(client);let now=new Date("2026-10-10T12:00:00Z");const diagnostics:unknown[]=[];
 const transaction=async(run:(tx:Prisma.TransactionClient)=>Promise<unknown>,options:{isolationLevel:"Serializable";maxWait:number;timeout:number})=>{try{return await db.$transaction(run,options);}catch(error){diagnostics.push(transactionDiagnostic(error));throw error;}};
 const tracedDb=new Proxy(db,{get:(target,key)=>key==="$transaction"?transaction:Reflect.get(target,key,target)});
 const p=new FakeCoverProvider(),service=new AreaCoverService(tracedDb,()=>p,()=>now,()=>true);await run(db,service,p,ms=>{now=new Date(now.getTime()+ms);},diagnostics);
});
test("CRI-REV-002 stale, incompatible and expired replay reject before preset or ticket",()=>fixture(async(db,s,p,advance)=>{
 await assert.rejects(s.initiate(A.owner,context,{...command(),expectedRevision:1}),{code:"STALE_REVISION"});assert.equal(p.presetCalls,0);assert.equal(await db.areaCover.count(),0);
 const input=command(),ticket=await s.initiate(A.owner,context,input);assert.equal(p.presetCalls,1);assert.equal(p.ticketCalls,1);
 assert.deepEqual(await s.initiate(A.owner,context,input),ticket);assert.equal(p.presetCalls,2);assert.equal(await db.coverCleanupJob.count(),4);
 await assert.rejects(s.initiate(A.owner,context,{...input,expectedRevision:1}),{code:"STALE_REVISION"});assert.equal(p.presetCalls,2);assert.equal(p.ticketCalls,2);
 advance(11*60000);await assert.rejects(s.initiate(A.owner,context,input),{code:"EXPIRED"});assert.equal(p.presetCalls,2);
}));

test("CRI-REV-002 hourly quota independently rejects without provider I/O",()=>fixture(async(db,s,p,advance)=>{
 for(let n=0;n<10;n++){await s.initiate(A.owner,context,command());advance(4*60000);}
 const before=p.presetCalls;await assert.rejects(s.initiate(A.owner,context,command()),{code:"RATE_LIMITED"});assert.equal(p.presetCalls,before);assert.equal(p.ticketCalls,10);assert.equal(await db.coverCleanupJob.count(),40);
}));

test("CRI-REV-002 failed preset leaves no pointer, attempt or cleanup job",()=>fixture(async(db,s,p)=>{
 p.failPreset=true;await assert.rejects(s.initiate(A.owner,context,command()),{code:"UNAVAILABLE"});assert.equal(p.presetCalls,1);assert.equal(p.ticketCalls,0);assert.equal(await db.areaCover.count(),0);assert.equal(await db.coverUploadAttempt.count(),0);assert.equal(await db.coverCleanupJob.count(),0);
}));

for(const mutation of ["role","membership","laboratory","account","revision"] as const)test(`CRI-REV-002 revalidates ${mutation} during preset without an open transaction`,()=>fixture(async(db,s,p)=>{
 const gate=barrier();p.onPreset=gate.wait;const issuing=s.initiate(A.contextualAdmin,context,command());
 // Attach rejection immediately; the write below must finish before releasing I/O.
 const outcome=assert.rejects(issuing,{code:{role:"FORBIDDEN",membership:"NOT_FOUND",laboratory:"READ_ONLY",account:"UNAUTHENTICATED",revision:"STALE_REVISION"}[mutation]});
 await gate.entered;
 try{
  const where={userId_laboratoryRoomId:{userId:A.contextualAdmin,laboratoryRoomId:L.active}};
  if(mutation==="role")await db.researchersLinked.update({where,data:{role:"MEMBER"}});
  if(mutation==="membership")await db.researchersLinked.delete({where});
  if(mutation==="laboratory")await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:false}});
  if(mutation==="account")await db.user.update({where:{id:A.contextualAdmin},data:{status:"BLOCKED"}});
  if(mutation==="revision")await db.areaCover.upsert({where:{areaId:context.areaId},create:{areaId:context.areaId,revision:1},update:{revision:1}});
 }finally{gate.release();}
 await outcome;assert.equal(p.ticketCalls,0);assert.equal(await db.coverUploadAttempt.count(),0);assert.equal(await db.coverCleanupJob.count(),0);
}));

test("CRI-REV-002 simultaneous eligible requests respect per-user active quota",()=>fixture(async(db,s,p,_advance,diagnostics)=>{
 await s.initiate(A.owner,context,command());await s.initiate(A.owner,context,command());
 const gate=barrier(2);p.onPreset=gate.wait;
 const results=Promise.allSettled([s.initiate(A.owner,context,command()),s.initiate(A.owner,context,command())]);await gate.entered;gate.release();
 const outcomes=await results;assert.equal(outcomes.filter(x=>x.status==="fulfilled").length,1);assert.deepEqual(outcomes.filter(x=>x.status==="rejected").map(x=>x.reason.code),["RATE_LIMITED"],JSON.stringify({transactionErrors:diagnostics}));assert.equal(await db.coverUploadAttempt.count({where:{userId:A.owner}}),3);assert.equal(await db.coverCleanupJob.count(),12);
 p.onPreset=null;await s.initiate(A.contextualAdmin,context,command());assert.equal(await db.coverUploadAttempt.count(),4);
}));

test("CRI-REV-002 simultaneous same-key requests converge and changed preset preserves jobs",()=>fixture(async(db,s,p)=>{
 const input=command(),gate=barrier(2);p.onPreset=gate.wait;
 const results=Promise.all([s.initiate(A.owner,context,input),s.initiate(A.owner,context,input)]);await gate.entered;gate.release();const tickets=await results;
 assert.deepEqual(tickets[0],tickets[1]);assert.equal(await db.coverUploadAttempt.count(),1);assert.equal(await db.coverCleanupJob.count(),4);
 p.onPreset=null;p.hash="b".repeat(64);await assert.rejects(s.initiate(A.owner,context,input),{code:"UNAVAILABLE"});assert.equal(await db.coverUploadAttempt.count(),1);assert.equal(await db.coverCleanupJob.count(),4);
}));

test("CRI-REV-002 concurrent hourly quota is checked again after preset",()=>fixture(async(db,s,p,advance,diagnostics)=>{
 for(let n=0;n<9;n++){await s.initiate(A.owner,context,command());advance(4*60000);}advance(11*60000);
 const gate=barrier(2);p.onPreset=gate.wait;const pending=Promise.allSettled([s.initiate(A.owner,context,command()),s.initiate(A.owner,context,command())]);await gate.entered;gate.release();const results=await pending;
 assert.equal(results.filter(x=>x.status==="fulfilled").length,1);assert.deepEqual(results.filter(x=>x.status==="rejected").map(x=>x.reason.code),["RATE_LIMITED"],JSON.stringify({transactionErrors:diagnostics}));assert.equal(await db.coverUploadAttempt.count(),10);assert.equal(await db.coverCleanupJob.count(),40);
}));

test("FIX-022 committed winner is visible after a real Serializable commit conflict",()=>fixture(async(db,s,p,advance)=>{
 for(let n=0;n<9;n++){await s.initiate(A.owner,context,command());advance(4*60000);}advance(11*60000);
 const ready=barrier(2),leftCommit=barrier(),rightCommit=barrier();const events:unknown[]=[];
 const traced=(label:string,commit:ReturnType<typeof barrier>)=>{
  let phase=0;
  return new Proxy(db,{get:(target,key)=>key==="$transaction"?async(run:(tx:Prisma.TransactionClient)=>Promise<unknown>,options:{isolationLevel:"Serializable";maxWait:number;timeout:number})=>{
   const current=++phase;events.push({label,phase:current,event:"begin"});
   try{const result=await db.$transaction(async tx=>{
    const value=await run(tx);
    events.push({label,phase:current,event:"body-complete"});
    if(current===2){await ready.wait();await commit.wait();}
    return value;
   },options);events.push({label,phase:current,event:"commit"});return result;
   }catch(error){events.push({label,phase:current,event:"error",error:transactionDiagnostic(error)});throw error;}
  }:Reflect.get(target,key,target)});
 };
 const clock=()=>new Date("2026-10-10T12:47:00Z");
 const left=new AreaCoverService(traced("left",leftCommit),()=>p,clock,()=>true,async()=>{});
 const right=new AreaCoverService(traced("right",rightCommit),()=>p,clock,()=>true,async()=>{});
 const preset=barrier(2);p.onPreset=preset.wait;
 const leftResult=left.initiate(A.owner,context,command()),rightResult=right.initiate(A.owner,context,command());
 const outcomes=Promise.allSettled([leftResult,rightResult]);
 try{
  await Promise.race([preset.entered,leftResult.then(()=>{throw new Error("left completed before the preset barrier");}),rightResult.then(()=>{throw new Error("right completed before the preset barrier");})]);
  preset.release();
  await Promise.race([ready.entered,leftResult.then(()=>{throw new Error("left completed before the commit barrier");}),rightResult.then(()=>{throw new Error("right completed before the commit barrier");})]);
  ready.release();leftCommit.release();await leftResult;
 }
 finally{preset.release();ready.release();leftCommit.release();rightCommit.release();await outcomes;}
 const results=await outcomes;
 const counts={attempts:await db.coverUploadAttempt.count(),jobs:await db.coverCleanupJob.count()};
 const diagnostic=JSON.stringify({events,counts});console.log(`FIX-022 schedule ${diagnostic}`);
 assert.deepEqual(counts,{attempts:10,jobs:40},diagnostic);
 assert.equal(results.filter(x=>x.status==="fulfilled").length,1,diagnostic);
 assert.deepEqual(results.filter(x=>x.status==="rejected").map(x=>x.reason.code),["RATE_LIMITED"],diagnostic);
 assert.ok(events.some(e=>JSON.stringify(e).includes("40001")),diagnostic);
}));

for(const mode of ["eligible","read-error","revoked","disabled","stale","replay","preset-changed","arbitrary"] as const)
test(`FIX-022 final eligibility read preserves ${mode} after bounded contention`,()=>fixture(async(db,base,p)=>{
 const actor=A.contextualAdmin;
 const input=command(),waits:number[]=[];let calls=0,writes=0,enabled=true;
 let original:Awaited<ReturnType<AreaCoverService["initiate"]>>|undefined;
 const beforeRead=async()=>{
  if(mode==="revoked")await db.researchersLinked.update({where:{userId_laboratoryRoomId:{userId:actor,laboratoryRoomId:L.active}},data:{role:"MEMBER"}});
  if(mode==="disabled")enabled=false;
  if(mode==="stale")await db.areaCover.upsert({where:{areaId:context.areaId},create:{areaId:context.areaId,revision:1},update:{revision:1}});
  if(mode==="replay"||mode==="preset-changed"){
   if(mode==="preset-changed")p.hash="b".repeat(64);
   original=await base.initiate(actor,context,input);
   p.hash="a".repeat(64);
  }
 };
 const traced=new Proxy(db,{get:(target,key)=>key==="$transaction"?async(run:(tx:Prisma.TransactionClient)=>Promise<unknown>,options:{isolationLevel:"Serializable";maxWait:number;timeout:number})=>{
  const current=++calls;
  if(current>=2&&current<=4){
   writes++;
   try{return await db.$transaction(async tx=>{await run(tx);throw Object.assign(new Error("synthetic write conflict"),{code:mode==="arbitrary"?"08006":"P2034"});},options);}
   catch(error){if(current===4)await beforeRead();throw error;}
  }
  if(current===5&&mode==="read-error")throw Object.assign(new Error("private technical error"),{code:"P2034"});
  return db.$transaction(run,options);
 }:Reflect.get(target,key,target)});
 const service=new AreaCoverService(traced,()=>p,()=>new Date("2026-10-10T12:00:00Z"),()=>enabled,async retry=>{waits.push(retry);});
 if(mode==="replay")assert.deepEqual(await service.initiate(actor,context,input),original);
 else await assert.rejects(service.initiate(actor,context,input),{code:{eligible:"INTERNAL_ERROR","read-error":"INTERNAL_ERROR",revoked:"FORBIDDEN",disabled:"UNAVAILABLE",stale:"STALE_REVISION","preset-changed":"UNAVAILABLE",arbitrary:"INTERNAL_ERROR"}[mode]});
 assert.equal(calls,mode==="arbitrary"?2:5);assert.equal(writes,mode==="arbitrary"?1:3);
 assert.deepEqual(waits,mode==="arbitrary"?[]:[1,2]);
 const replay=mode==="replay"||mode==="preset-changed";
 assert.equal(p.presetCalls,replay?2:1);assert.equal(p.ticketCalls,mode==="replay"?2:mode==="preset-changed"?1:0);
 assert.equal(await db.coverUploadAttempt.count(),replay?1:0);assert.equal(await db.coverCleanupJob.count(),replay?4:0);
}));

test("CRI-REV-002 confirmed replay keeps original ticket despite current revision and full active quota",()=>fixture(async(db,s,p)=>{
 const input=command(),ticket=await s.initiate(A.owner,context,input);await p.store(ticket.upload.params.public_id,ticket.attemptId,"staging",await coverBytes());await s.confirm(A.owner,context,ticket.attemptId);
 for(let n=0;n<3;n++)await s.initiate(A.owner,context,{...command(),expectedRevision:1});const before=p.presetCalls;
 assert.deepEqual(await s.initiate(A.owner,context,input),ticket);assert.equal(p.presetCalls,before+1);assert.equal(await db.coverUploadAttempt.count(),4);assert.equal(await db.coverCleanupJob.count(),16);
 const other=await db.collectionArea.create({data:{name:"Synthetic second area",laboratoryRoomId:L.active,userId:A.owner,latitude:0,longitude:0}});
 await assert.rejects(s.initiate(A.owner,{...context,areaId:other.id},input),{code:"STALE_REVISION"});assert.equal(p.presetCalls,before+1);
}));

for(const phase of [1,2])for(const code of ["P2034","P2002"])test(`CRI-REV-002 retries ${code} in transaction ${phase} without duplicate jobs or repeated I/O`,()=>fixture(async(db,_s,p)=>{
 let calls=0;
 const retryDb={$transaction:async(run:(tx:Prisma.TransactionClient)=>Promise<unknown>,options:{isolationLevel:"Serializable";maxWait:number;timeout:number})=>db.$transaction(async tx=>{calls++;const result=await run(tx);if(calls===phase)throw Object.assign(new Error("synthetic serialization conflict"),{code});return result;},options)} as unknown as typeof db;
 const service=new AreaCoverService(retryDb,()=>p,()=>new Date("2026-10-10T12:00:00Z"),()=>true);
 await service.initiate(A.owner,context,command());assert.equal(calls,3);assert.equal(p.presetCalls,1);assert.equal(p.ticketCalls,1);assert.equal(await db.coverUploadAttempt.count(),1);assert.equal(await db.coverCleanupJob.count(),4);
}));

test("CRI-REV-001 config matrix preserves contextual canEdit and exposes only safe availability",()=>fixture(async(db,_s,p)=>{
 const names=["CLOUDINARY_IMAGE_ENABLED","CLOUDINARY_CLOUD_NAME","CLOUDINARY_API_KEY","CLOUDINARY_API_SECRET","CLOUDINARY_COVER_PRESET","CLOUDINARY_COVER_PRESET_SHA256"];
 const saved=names.map(name=>process.env[name]);
 try{
  Object.assign(process.env,{CLOUDINARY_CLOUD_NAME:"synthetic",CLOUDINARY_API_KEY:"123456789",CLOUDINARY_API_SECRET:"synthetic-only",CLOUDINARY_COVER_PRESET:"hfr-cover-v1",CLOUDINARY_COVER_PRESET_SHA256:"a".repeat(64)});
  const service=new AreaCoverService(db,()=>p);
  for(const flag of ["0",undefined,"invalid","1"]){
   if(flag===undefined)delete process.env.CLOUDINARY_IMAGE_ENABLED;else process.env.CLOUDINARY_IMAGE_ENABLED=flag;
   for(const [actor,canEdit] of [[A.owner,true],[A.contextualAdmin,true],[A.member,false]] as const){const dto=await service.detail(actor,context);assert.deepEqual(dto,{image:{revision:0,hasImage:false},canEdit,featureEnabled:flag==="1"});}
   await assert.rejects(service.detail(A.outsider,context),{code:"NOT_FOUND"});await assert.rejects(service.initiate(A.member,context,command()),{code:"FORBIDDEN"});
   await assert.rejects(service.initiate(A.outsider,context,command()),{code:"NOT_FOUND"});
   if(flag!=="1"){await assert.rejects(service.initiate(A.owner,context,command()),{code:"UNAVAILABLE"});await assert.rejects(service.remove(A.owner,context,{expectedRevision:0}),{code:"UNAVAILABLE"});await assert.rejects(service.confirm(A.owner,context,randomUUID()),{code:"UNAVAILABLE"});await assert.rejects(service.content(A.member,context),{code:"UNAVAILABLE"});}
   await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:false}});assert.equal((await service.detail(A.owner,context)).canEdit,false);await assert.rejects(service.remove(A.owner,context,{expectedRevision:0}),{code:"READ_ONLY"});await db.laboratoryRoom.update({where:{id:L.active},data:{isActive:true}});
  }
  delete process.env.CLOUDINARY_API_SECRET;assert.equal((await service.detail(A.owner,context)).featureEnabled,false);assert.equal(p.presetCalls,0);
 }finally{names.forEach((name,i)=>{if(saved[i]===undefined)delete process.env[name];else process.env[name]=saved[i];});}
}));

test("CRI-REV-001 real service HTTP contract has safe availability and preserves disabled content refusal",()=>fixture(async(db,_s,p)=>{
 const service=new AreaCoverService(db,()=>p,()=>new Date(),()=>false),handlers=createCoverHandlers({requireAuth:async()=>({id:A.owner,firstName:"Synthetic",lastName:"Test",image:"",role:"USER" as const}),service});
 const c={params:Promise.resolve(context)},response=await handlers.GET(new Request("http://localhost/api/image"),c);
 assert.equal(response.status,200);assert.equal(response.headers.get("cache-control"),"private, no-store");assert.deepEqual(await response.json(),{image:{revision:0,hasImage:false},canEdit:true,featureEnabled:false});
 const content=await handlers.CONTENT(new Request("http://localhost/api/image/content"),c);assert.equal(content.status,503);const body=await content.text();for(const word of ["CLOUDINARY","apiSecret","apiKey","presetHash"])assert.equal(body.includes(word),false);assert.equal(p.presetCalls,0);
}));

test("CRI-REV-001 policy A preserves persisted cover and blocks all provider operations",()=>fixture(async(db,s,p)=>{
 const ticket=await s.initiate(A.owner,context,command());await p.store(ticket.upload.params.public_id,ticket.attemptId,"staging",await coverBytes());await s.confirm(A.owner,context,ticket.attemptId);
 const prior=await db.areaCover.findUniqueOrThrow({where:{areaId:context.areaId}}),jobs=await db.coverCleanupJob.findMany({orderBy:{id:"asc"}}),before=p.presetCalls;
 const disabled=new AreaCoverService(db,()=>{throw Error("disabled must not construct provider");},()=>new Date("2026-10-10T12:01:00Z"),()=>false);
 assert.deepEqual(await disabled.detail(A.owner,context),{image:{revision:1,hasImage:true,width:32,height:24},canEdit:true,featureEnabled:false});
 await assert.rejects(disabled.initiate(A.owner,context,{...command(),expectedRevision:1}),{code:"UNAVAILABLE"});await assert.rejects(disabled.confirm(A.owner,context,ticket.attemptId),{code:"UNAVAILABLE"});await assert.rejects(disabled.remove(A.owner,context,{expectedRevision:1}),{code:"UNAVAILABLE"});await assert.rejects(disabled.content(A.member,context),{code:"UNAVAILABLE"});
 await assert.rejects(disabled.content(A.outsider,context),{code:"NOT_FOUND"});assert.deepEqual(await db.areaCover.findUniqueOrThrow({where:{areaId:context.areaId}}),prior);assert.deepEqual(await db.coverCleanupJob.findMany({orderBy:{id:"asc"}}),jobs);assert.equal(p.presetCalls,before);
}));

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
 for(let n=0;n<2;n++)await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});const beforeActive=p.presetCalls;await assert.rejects(s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()}),{code:"RATE_LIMITED"});assert.equal(p.presetCalls,beforeActive,"CRI-REV-002 active quota must precede provider I/O");
 advance(11*60000);await assert.rejects(s.confirm(A.owner,context,first.attemptId),{code:"EXPIRED"});assert.equal((await s.detail(A.owner,context)).image.hasImage,false);
 for(let batch=0;batch<2;batch++){for(let n=0;n<3;n++)await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});advance(11*60000);}
 await s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()});assert.equal(await db.coverUploadAttempt.count({where:{userId:A.owner}}),10);const beforeHourly=p.presetCalls;await assert.rejects(s.initiate(A.owner,context,{expectedRevision:0,key:randomUUID()}),{code:"RATE_LIMITED"});assert.equal(p.presetCalls,beforeHourly,"CRI-REV-002 hourly quota must precede provider I/O");
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
