import "server-only";
import { randomInt,randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import sharp from "sharp";
import type { AreaCover,CoverUploadAttempt,Prisma,PrismaClient } from "@/generated/prisma";
import { prisma } from "../lib/prisma";
import { AreaAccessError,authorizeLaboratoryAccess,validResourceId } from "../areas/area.authorization";
import { configuredCoverProvider } from "./cloudinary";
import { COVER_MAX_BYTES,CoverError,parseUpload,parseRemoval,type CoverContext,type CoverDto } from "./contracts";
import type { CoverAsset,CoverProvider,ResourceType } from "./provider";
import { sanitizeCover,previewCover } from "./sanitize";
import { coverFeatureEnabled } from "./settings";
const minute=60000;
export class AreaCoverService {
 constructor(private readonly db:PrismaClient=prisma,private readonly provider:()=>CoverProvider=()=>configuredCoverProvider(),private readonly clock:()=>Date=()=>new Date(),private readonly featureEnabled:()=>boolean=coverFeatureEnabled,private readonly retryWait:(retry:number)=>Promise<void>=retry=>delay(100*retry+randomInt(0,51))){}
 private requireEnabled(){if(!this.featureEnabled())throw new CoverError("UNAVAILABLE");}
 private async transaction<T>(run:(tx:Prisma.TransactionClient)=>Promise<T>,afterContention?:(tx:Prisma.TransactionClient)=>Promise<T>):Promise<T>{
  const options={isolationLevel:"Serializable" as const,maxWait:15000,timeout:30000};
  for(let i=0;i<3;i++){
   try{return await this.db.$transaction(run,options);}
   catch(e){
    if(e instanceof CoverError||e instanceof AreaAccessError)throw e;
    if(retryableConflict(e)){
     if(i<2){await this.retryWait(i+1);continue;}
     // No fourth write attempt. Resolve only persisted replay or a current
     // eligibility rejection in one fresh read transaction, without retry.
     if(afterContention){try{return await this.db.$transaction(afterContention,options);}catch(last){if(last instanceof CoverError||last instanceof AreaAccessError)throw last;}}
    }
    throw new CoverError("INTERNAL_ERROR");
   }
  }
  throw new CoverError("INTERNAL_ERROR");
 }
 private async context(tx:Prisma.TransactionClient,userId:string,ids:CoverContext,write=false){const context=await authorizeLaboratoryAccess({id:userId},ids.laboratoryId,write?"MANAGE_AREA_IMAGE":"READ_AREAS",tx,write);if(!validResourceId(ids.areaId)||!await tx.collectionArea.findFirst({where:{id:ids.areaId,laboratoryRoomId:ids.laboratoryId},select:{id:true}}))throw new AreaAccessError("NOT_FOUND");return context;}
 async detail(userId:string,ids:CoverContext):Promise<CoverDto>{return this.transaction(async tx=>{const c=await this.context(tx,userId,ids);return project(await tx.areaCover.findUnique({where:{areaId:ids.areaId}}),!c.readOnly&&c.membershipRole!=="MEMBER",this.featureEnabled());});}
 // CRI-REV-002: identical local gates before and after network I/O. Replay
 // keeps its original precedence over current cover revision and new quotas.
 private async eligibleUpload(tx:Prisma.TransactionClient,userId:string,ids:CoverContext,command:ReturnType<typeof parseUpload>){
  await this.context(tx,userId,ids,true);this.requireEnabled();const now=this.clock();
  const previous=await tx.coverUploadAttempt.findUnique({where:{userId_key:{userId,key:command.key}}});
  if(previous){if(previous.areaId!==ids.areaId||previous.expectedRevision!==command.expectedRevision)throw new CoverError("STALE_REVISION");if(previous.expiresAt<=now||previous.state==="FAILED")throw new CoverError("EXPIRED");return{previous,now};}
  const cover=await tx.areaCover.findUnique({where:{areaId:ids.areaId}});
  if((cover?.revision??0)!==command.expectedRevision)throw new CoverError("STALE_REVISION");
  const active=await tx.coverUploadAttempt.count({where:{userId,state:{in:["ISSUED","PROCESSING"]},expiresAt:{gt:now}}}),hourly=await tx.coverUploadAttempt.count({where:{userId,issuedAt:{gt:new Date(now.getTime()-60*minute)}}});
  if(active>=3||hourly>=10)throw new CoverError("RATE_LIMITED");
  return{previous:null,now};
 }
 async initiate(userId:string,ids:CoverContext,input:unknown){
  const command=parseUpload(input);
  await this.transaction(async tx=>{await this.eligibleUpload(tx,userId,ids,command);});
  // No open DB transaction while the provider validates its preset.
  const p=this.provider(),presetHash=await p.preset();
  const attempt=await this.transaction(async tx=>{
   const {previous,now}=await this.eligibleUpload(tx,userId,ids,command);
   if(previous){if(previous.presetHash!==presetHash)throw new CoverError("UNAVAILABLE");return previous;}
   await tx.areaCover.upsert({where:{areaId:ids.areaId},create:{areaId:ids.areaId},update:{}});
   const id=randomUUID(),prefix=`hfr-cover/${ids.areaId}/${id}`;
   const created=await tx.coverUploadAttempt.create({data:{id,areaId:ids.areaId,userId,key:command.key,expectedRevision:command.expectedRevision,stagingPublicId:`${prefix}/staging.webp`,finalPublicId:`${prefix}/cover`,presetHash,issuedAt:now,expiresAt:new Date(now.getTime()+10*minute)}});
   const jobs=(["image","video","raw"] as const).map(resourceType=>({id:randomUUID(),attemptId:id,publicId:created.stagingPublicId,resourceType,kind:"STAGING",notBefore:new Date(now.getTime()+70*minute),nextAttemptAt:new Date(now.getTime()+70*minute)}));
   await tx.coverCleanupJob.createMany({data:[...jobs,{id:randomUUID(),attemptId:id,publicId:created.finalPublicId,resourceType:"image",kind:"FINAL",notBefore:new Date(now.getTime()+15*minute),nextAttemptAt:new Date(now.getTime()+15*minute)}]});return created;
  },async tx=>{
   const {previous}=await this.eligibleUpload(tx,userId,ids,command);
   if(previous){if(previous.presetHash!==presetHash)throw new CoverError("UNAVAILABLE");return previous;}
   // Eligibility alone cannot prove that this uncommitted operation succeeded.
   throw new CoverError("INTERNAL_ERROR");
  });return p.ticket(attempt);
 }
 async confirm(userId:string,ids:CoverContext,attemptId:string):Promise<CoverDto>{
  if(!validResourceId(attemptId))throw new CoverError("NOT_FOUND");const leaseId=randomUUID();
  const claim=await this.transaction(async tx=>{
   await this.context(tx,userId,ids,true);this.requireEnabled();const now=this.clock(),a=await tx.coverUploadAttempt.findFirst({where:{id:attemptId,areaId:ids.areaId,userId}});if(!a)throw new CoverError("NOT_FOUND");
   if(a.state==="CONFIRMED")return{attempt:a,replay:true};
   if(a.state==="FAILED"||a.expiresAt<=now)throw new CoverError("EXPIRED");if(a.leaseUntil&&a.leaseUntil>now)throw new CoverError("IN_PROGRESS");
   const cover=await tx.areaCover.findUniqueOrThrow({where:{areaId:ids.areaId}});if(cover.revision!==a.expectedRevision)throw new CoverError("STALE_REVISION");
   const attempt=await tx.coverUploadAttempt.update({where:{id:a.id},data:{state:"PROCESSING",leaseId,leaseUntil:new Date(now.getTime()+5*minute)}});return{attempt,replay:false};
  });if(claim.replay)return this.detail(userId,ids);
  const a=claim.attempt;
  try{
   const p=this.provider();if(await p.preset()!==a.presetHash)throw new CoverError("UNAVAILABLE");
   let final=await p.inspect(a.finalPublicId,"image");
   if(final){prove(final,a,"FINAL","image");validateImage(final);if(final.format!=="webp")throw new CoverError("INVALID_IMAGE");}
   else{
    const staging=await p.inspect(a.stagingPublicId,"image");if(!staging)throw new CoverError("NOT_FOUND");prove(staging,a,"STAGING","image");validateImage(staging);
    const clean=await sanitizeCover(await p.download(staging));
    await p.uploadFinal(a,clean.bytes);final=await p.inspect(a.finalPublicId,"image");if(!final)throw new CoverError("UNAVAILABLE");prove(final,a,"FINAL","image");validateImage(final);if(final.format!=="webp"||final.width!==clean.width||final.height!==clean.height)throw new CoverError("INVALID_IMAGE");
   }
   // Even an ambiguous upload recovered by its fixed ID must contain sanitized bytes.
   const checkedBytes=await p.download(final);const check=await sharp(checkedBytes,{limitInputPixels:4096*4096,failOn:"warning"}).metadata();if(check.exif||check.icc||check.xmp||check.iptc||check.format!=="webp"||(check.pages??1)>1||check.width!==final.width||check.height!==final.height)throw new CoverError("INVALID_IMAGE");await sanitizeCover(checkedBytes);
   const accepted=final;
   return await this.transaction(async tx=>{
    await this.context(tx,userId,ids,true);this.requireEnabled();const now=this.clock();const current=await tx.coverUploadAttempt.findUniqueOrThrow({where:{id:a.id}});
    if(current.leaseId!==leaseId||!current.leaseUntil||current.leaseUntil<=now||current.expiresAt<=now||current.state!=="PROCESSING")throw new CoverError("EXPIRED");
    const previous=await tx.areaCover.findUniqueOrThrow({where:{areaId:ids.areaId}});if(previous.revision!==a.expectedRevision)throw new CoverError("STALE_REVISION");
    const updated=await tx.areaCover.update({where:{areaId:ids.areaId},data:{revision:{increment:1},assetId:accepted.assetId,publicId:accepted.publicId,version:accepted.version,format:accepted.format,bytes:accepted.bytes,width:accepted.width,height:accepted.height,attemptId:a.id}});
    await tx.coverUploadAttempt.update({where:{id:a.id},data:{state:"CONFIRMED",leaseId:null,leaseUntil:null,finalAssetId:accepted.assetId,resultRevision:updated.revision}});
    await tx.coverCleanupJob.update({where:{publicId_resourceType:{publicId:accepted.publicId,resourceType:"image"}},data:{assetId:accepted.assetId}});
    if(previous.assetId&&previous.publicId)await tx.coverCleanupJob.update({where:{publicId_resourceType:{publicId:previous.publicId,resourceType:"image"}},data:{assetId:previous.assetId,notBefore:now,nextAttemptAt:now,state:"PENDING"}});
    return project(updated,true,this.featureEnabled());
   });
  }catch(error){
   const fatal=error instanceof AreaAccessError||(error instanceof CoverError&&["INVALID_IMAGE","OWNERSHIP_MISMATCH","STALE_REVISION","EXPIRED"].includes(error.code));
   await this.db.coverUploadAttempt.updateMany({where:{id:a.id,leaseId,state:"PROCESSING"},data:{state:fatal?"FAILED":"ISSUED",leaseId:null,leaseUntil:null}});
   if(error instanceof CoverError||error instanceof AreaAccessError)throw error;throw new CoverError("UNAVAILABLE");
  }
 }
 async remove(userId:string,ids:CoverContext,input:unknown){const command=parseRemoval(input);await this.transaction(async tx=>{
  await this.context(tx,userId,ids,true);this.requireEnabled();const cover=await tx.areaCover.findUnique({where:{areaId:ids.areaId}});if(!cover?.assetId)return;
  if(cover.revision!==command.expectedRevision)throw new CoverError("STALE_REVISION");const now=this.clock();
  await tx.areaCover.update({where:{areaId:ids.areaId},data:{revision:{increment:1},assetId:null,publicId:null,version:null,format:null,bytes:null,width:null,height:null,attemptId:null}});
  await tx.coverCleanupJob.update({where:{publicId_resourceType:{publicId:cover.publicId!,resourceType:"image"}},data:{assetId:cover.assetId,notBefore:now,nextAttemptAt:now,state:"PENDING"}});
 });}
 async content(userId:string,ids:CoverContext){
  const snapshot=await this.transaction(async tx=>{await this.context(tx,userId,ids);this.requireEnabled();const c=await tx.areaCover.findUnique({where:{areaId:ids.areaId}});if(!c?.assetId||!c.attemptId)throw new CoverError("NOT_FOUND");return{cover:c,attempt:await tx.coverUploadAttempt.findUniqueOrThrow({where:{id:c.attemptId}})};});
  const p=this.provider(),a=await p.inspect(snapshot.cover.publicId!,"image");if(!a)throw new CoverError("NOT_FOUND");prove(a,snapshot.attempt,"FINAL","image");if(a.assetId!==snapshot.cover.assetId||a.version!==snapshot.cover.version)throw new CoverError("OWNERSHIP_MISMATCH");validateImage(a);
  const bytes=await previewCover(await p.download(a));
  await this.transaction(async tx=>{await this.context(tx,userId,ids);this.requireEnabled();const current=await tx.areaCover.findUnique({where:{areaId:ids.areaId}});if(current?.assetId!==a.assetId||current.revision!==snapshot.cover.revision)throw new CoverError("STALE_REVISION");});return bytes;
 }
 async cleanup(limit=20){
  if(!Number.isInteger(limit)||limit<1||limit>100)throw new CoverError("INVALID_REQUEST");
  const stats={checked:0,removed:0,blocked:0,retry:0,deferred:0};const seen:string[]=[];
  for(let i=0;i<limit;i++){
   const leaseId=randomUUID(),now=this.clock();
   const job=await this.transaction(async tx=>{
    const row=await tx.coverCleanupJob.findFirst({where:{id:{notIn:seen},notBefore:{lte:now},nextAttemptAt:{lte:now},state:{not:"BLOCKED"},OR:[{leaseUntil:null},{leaseUntil:{lte:now}}]},orderBy:[{nextAttemptAt:"asc"},{id:"asc"}],include:{attempt:true}});if(!row)return null;
    await tx.coverCleanupJob.update({where:{id:row.id},data:{state:"PROCESSING",leaseId,leaseUntil:new Date(now.getTime()+5*minute),tries:{increment:1}}});return row;
   });if(!job)break;seen.push(job.id);stats.checked++;
   const finish=async(state:string,lastError:string|null,delay:number,assetId?:string|null)=>this.db.coverCleanupJob.updateMany({where:{id:job.id,leaseId},data:{state,lastError,leaseId:null,leaseUntil:null,nextAttemptAt:new Date(this.clock().getTime()+delay),...(assetId!==undefined?{assetId}:{})}});
   try{
    const eligible=()=>this.transaction(async tx=>{
     const a=await tx.coverUploadAttempt.findUniqueOrThrow({where:{id:job.attemptId}});
     if(job.kind==="FINAL"&&((a.leaseUntil&&a.leaseUntil>this.clock())||(["ISSUED","PROCESSING"].includes(a.state)&&a.expiresAt>this.clock())))return false;
     return !await tx.areaCover.findFirst({where:{OR:[{publicId:job.publicId},...(job.assetId?[{assetId:job.assetId}]:[])]},select:{areaId:true}});
    });
    if(!await eligible()){stats.deferred++;await finish("RECONCILE",null,60*minute);continue;}
    const p=this.provider(),asset=await p.inspect(job.publicId,job.resourceType as ResourceType);
    if(asset){prove(asset,job.attempt,job.kind as "FINAL"|"STAGING",job.resourceType as ResourceType);if(job.assetId&&asset.assetId!==job.assetId)throw new CoverError("OWNERSHIP_MISMATCH");
     if(!await eligible()){stats.deferred++;await finish("RECONCILE",null,60*minute);continue;}
     await p.destroy(asset);stats.removed++;
    }
    await finish("RECONCILE",null,60*minute,null);
   }catch(error){const blocked=error instanceof CoverError&&error.code==="OWNERSHIP_MISMATCH";if(blocked)stats.blocked++;else stats.retry++;await finish(blocked?"BLOCKED":"PENDING",blocked?"OWNERSHIP_MISMATCH":"PROVIDER_UNAVAILABLE",Math.min(60,2**Math.min(job.tries,6))*minute);}
  }return stats;
 }
}
function retryableConflict(error:unknown):boolean{
 if(!error||typeof error!=="object")return false;
 if("code"in error&&["P2034","P2002","40001","40P01"].includes(String(error.code)))return true;
 // Prisma's PostgreSQL adapter can surface a commit failure before it is
 // wrapped as P2034. Retry only these known transaction-conflict shapes.
 if(!("name"in error)||error.name!=="DriverAdapterError"||!("cause"in error)||!error.cause||typeof error.cause!=="object")return false;
 const cause=error.cause as {kind?:unknown;code?:unknown;originalCode?:unknown};
 return cause.kind==="TransactionWriteConflict"||(cause.kind==="postgres"&&[cause.code,cause.originalCode].some(code=>["40001","40P01"].includes(String(code))));
}
function project(cover:AreaCover|null,canEdit:boolean,featureEnabled:boolean):CoverDto{return{image:{revision:cover?.revision??0,hasImage:Boolean(cover?.assetId),...(cover?.assetId?{width:cover.width!,height:cover.height!}:{})},canEdit,featureEnabled};}
function prove(asset:CoverAsset,attempt:CoverUploadAttempt,kind:"STAGING"|"FINAL",resourceType:ResourceType){if(asset.publicId!==(kind==="STAGING"?attempt.stagingPublicId:attempt.finalPublicId)||asset.type!=="authenticated"||asset.resourceType!==resourceType||asset.context.hfr_attempt!==attempt.id||asset.context.hfr_kind!==kind.toLowerCase())throw new CoverError("OWNERSHIP_MISMATCH");}
function validateImage(asset:CoverAsset){if(asset.resourceType!=="image"||!["jpg","jpeg","png","webp"].includes(asset.format)||!Number.isInteger(asset.bytes)||asset.bytes<=0||asset.bytes>COVER_MAX_BYTES||![asset.width,asset.height].every(x=>Number.isInteger(x)&&x>0&&x<=4096))throw new CoverError("INVALID_IMAGE");}
export const areaCoverService=new AreaCoverService();
