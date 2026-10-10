import { randomUUID } from "node:crypto";
import sharp, { type Metadata } from "sharp";
import { CoverError } from "../../src/app/api/server/images/contracts";
import type { CoverProvider,CoverAsset,ProviderAttempt,ResourceType } from "../../src/app/api/server/images/provider";
export class FakeCoverProvider implements CoverProvider {
 assets=new Map<string,{asset:CoverAsset;bytes:Buffer}>();deleted:string[]=[];failUpload=false;loseUpload=false;failDestroy=false;hash="a".repeat(64);
 onDownload:(()=>Promise<void>)|null=null;
 async preset(){return this.hash;}
 ticket(a:ProviderAttempt){return{attemptId:a.id,expiresAt:a.expiresAt.toISOString(),upload:{url:"https://cloudinary.invalid/image/upload",params:{public_id:a.stagingPublicId,signature:"synthetic-signature",context:`hfr_attempt=${a.id}|hfr_kind=staging`}}};}
 async inspect(id:string,type:ResourceType){return this.assets.get(`${type}:${id}`)?.asset??null;}
 async download(a:CoverAsset){const entry=this.assets.get(`${a.resourceType}:${a.publicId}`);if(!entry)throw new CoverError("UNAVAILABLE");const run=this.onDownload;this.onDownload=null;await run?.();return entry.bytes;}
 async uploadFinal(a:ProviderAttempt,bytes:Buffer){if(this.failUpload)throw new CoverError("UNAVAILABLE");const result=await this.store(a.finalPublicId,a.id,"final",bytes);if(this.loseUpload){this.loseUpload=false;throw new CoverError("UNAVAILABLE");}return result;}
 async destroy(a:CoverAsset){if(this.failDestroy)throw new CoverError("UNAVAILABLE");const current=await this.inspect(a.publicId,a.resourceType);if(current&&current.assetId!==a.assetId)throw new CoverError("OWNERSHIP_MISMATCH");this.deleted.push(a.assetId);this.assets.delete(`${a.resourceType}:${a.publicId}`);}
 async store(publicId:string,attemptId:string,kind:string,bytes:Buffer,type:ResourceType="image"){
  const meta:Partial<Metadata>=type==="image"?await sharp(bytes).metadata():{};
  const asset:CoverAsset={assetId:randomUUID(),publicId,version:1,resourceType:type,type:"authenticated",format:meta.format==="jpeg"?"jpg":meta.format??"webp",bytes:bytes.length,width:meta.width??0,height:meta.height??0,context:{hfr_attempt:attemptId,hfr_kind:kind}};
  this.assets.set(`${type}:${publicId}`,{asset,bytes});return asset;
 }
}
export const coverBytes=()=>sharp({create:{width:32,height:24,channels:3,background:"#326646"}}).jpeg().withMetadata().toBuffer();
