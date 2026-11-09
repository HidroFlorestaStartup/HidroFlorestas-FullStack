import "server-only";
import { createHash } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { COVER_MAX_BYTES,CoverError } from "./contracts";
import type { CoverAsset,CoverProvider,ProviderAttempt,ResourceType } from "./provider";
import { cloudinarySettings,type Settings } from "./settings";
export { cloudinarySettings } from "./settings";

const record=(v:unknown):Record<string,unknown>=>{if(!v||typeof v!=="object"||Array.isArray(v))throw new CoverError("UNAVAILABLE");return v as Record<string,unknown>;};
function canonical(v:unknown):string {if(Array.isArray(v))return`[${v.map(canonical).join(",")}]`;if(v&&typeof v==="object")return`{${Object.entries(v).sort(([a],[b])=>a.localeCompare(b)).map(([k,x])=>`${JSON.stringify(k)}:${canonical(x)}`).join(",")}}`;return JSON.stringify(v);}
export function presetFingerprint(value:unknown,name:string):string{
 const p=record(value),s=record(p.settings);
 const allowed=["type","overwrite","allowed_formats","unique_filename","use_filename","disallow_public_id"];
 if(p.name!==name||p.unsigned!==false||Object.keys(s).some(k=>!allowed.includes(k))||("type"in s&&s.type!=="authenticated")||["overwrite","unique_filename","use_filename","disallow_public_id"].some(k=>k in s&&s[k]!==false))throw new CoverError("UNAVAILABLE");
 const normalized={...s};if("allowed_formats"in s){const formats=typeof s.allowed_formats==="string"?s.allowed_formats.split(",").map(x=>x.trim()):s.allowed_formats;if(!Array.isArray(formats)||formats.length===0||formats.some(x=>typeof x!=="string"||!["jpg","jpeg","png","webp"].includes(x)))throw new CoverError("UNAVAILABLE");normalized.allowed_formats=[...new Set(formats)].sort();}
 return createHash("sha256").update(canonical({name:p.name,unsigned:p.unsigned,settings:normalized})).digest("hex");
}
async function bounded(response:Response,limit:number):Promise<Buffer>{
 const length=response.headers.get("content-length");if(length&&Number(length)>limit)throw new CoverError("UNAVAILABLE");
 const reader=response.body?.getReader();if(!reader)throw new CoverError("UNAVAILABLE");const parts:Buffer[]=[];let size=0;
 try{for(;;){const r=await reader.read();if(r.done)break;size+=r.value.length;if(size>limit){await reader.cancel();throw new CoverError("UNAVAILABLE");}parts.push(Buffer.from(r.value));}return Buffer.concat(parts,size);}finally{reader.releaseLock();}
}
function asset(value:unknown):CoverAsset{
 const r=record(value),context=r.context?record(r.context):{},custom=context.custom?record(context.custom):{};
 if(typeof r.asset_id!=="string"||typeof r.public_id!=="string"||!Number.isSafeInteger(r.version)||Number(r.version)<=0||!["image","video","raw"].includes(String(r.resource_type))||typeof r.type!=="string"||(r.resource_type!=="raw"&&typeof r.format!=="string")||!Number.isSafeInteger(r.bytes)||Number(r.bytes)<0)throw new CoverError("UNAVAILABLE");
 return{assetId:r.asset_id,publicId:r.public_id,version:Number(r.version),resourceType:r.resource_type as ResourceType,type:r.type,format:String(r.format??""),bytes:Number(r.bytes),width:Number(r.width??0),height:Number(r.height??0),context:Object.fromEntries(Object.entries(custom).filter((entry):entry is [string,string]=>typeof entry[1]==="string"))};
}
export class CloudinaryCoverProvider implements CoverProvider{
 constructor(private readonly config:Settings,private readonly fetcher:typeof fetch=fetch){}
 private async admin(path:string,init:RequestInit={}){
  try{const response=await this.fetcher(`https://api.cloudinary.com/v1_1/${this.config.cloudName}/${path}`,{...init,headers:{...init.headers,Authorization:`Basic ${Buffer.from(`${this.config.apiKey}:${this.config.apiSecret}`).toString("base64")}`},redirect:"error",cache:"no-store",signal:AbortSignal.timeout(20000)});if(response.status===404)return null;if(!response.ok)throw Error();return JSON.parse((await bounded(response,128*1024)).toString("utf8")) as unknown;}catch{throw new CoverError("UNAVAILABLE");}
 }
 async preset(){const value=await this.admin(`upload_presets/${encodeURIComponent(this.config.preset)}`);const hash=presetFingerprint(value,this.config.preset);if(hash!==this.config.presetHash)throw new CoverError("UNAVAILABLE");return hash;}
 ticket(attempt:ProviderAttempt){const params={timestamp:String(Math.floor(attempt.issuedAt.getTime()/1000)),public_id:attempt.stagingPublicId,type:"authenticated",overwrite:"false",upload_preset:this.config.preset,allowed_formats:"jpg,jpeg,png,webp",context:`hfr_attempt=${attempt.id}|hfr_kind=staging`};return{attemptId:attempt.id,expiresAt:attempt.expiresAt.toISOString(),upload:{url:`https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/upload`,params:{...params,api_key:this.config.apiKey,signature:cloudinary.utils.api_sign_request(params,this.config.apiSecret)}}};}
 async inspect(publicId:string,resourceType:ResourceType){const value=await this.admin(`resources/${resourceType}/authenticated/${encodeURIComponent(publicId)}?context=true`);return value?asset(value):null;}
 async download(value:CoverAsset){
  try{if(value.resourceType!=="image"||value.type!=="authenticated"||!value.publicId.startsWith("hfr-cover/")||value.bytes>COVER_MAX_BYTES)throw Error();
   const url=cloudinary.url(value.publicId,{cloud_name:this.config.cloudName,api_key:this.config.apiKey,api_secret:this.config.apiSecret,secure:true,type:"authenticated",resource_type:"image",sign_url:true,version:value.version,format:value.format});
   const target=new URL(url);if(target.protocol!=="https:"||target.hostname!=="res.cloudinary.com")throw Error();
   const response=await this.fetcher(url,{redirect:"error",cache:"no-store",signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error();return await bounded(response,COVER_MAX_BYTES);
  }catch{throw new CoverError("UNAVAILABLE");}
 }
 async uploadFinal(attempt:ProviderAttempt,bytes:Buffer){
  if(bytes.length>COVER_MAX_BYTES)throw new CoverError("INVALID_IMAGE");await this.preset();
  try{return await new Promise<CoverAsset>((resolve,reject)=>{const stream=cloudinary.uploader.upload_stream({cloud_name:this.config.cloudName,api_key:this.config.apiKey,api_secret:this.config.apiSecret,resource_type:"image",type:"authenticated",public_id:attempt.finalPublicId,overwrite:false,upload_preset:this.config.preset,context:{hfr_attempt:attempt.id,hfr_kind:"final"},format:"webp",timeout:60000},(error,result)=>{if(error||!result)reject(new CoverError("UNAVAILABLE"));else{try{resolve(asset(result));}catch(e){reject(e);}}});stream.on("error",()=>reject(new CoverError("UNAVAILABLE")));stream.end(bytes);});}catch{throw new CoverError("UNAVAILABLE");}
 }
 async destroy(value:CoverAsset){
  // Lookup by immutable ID protects against public ID replacement between lookup/deletion.
  const current=record(await this.admin(`resources/by_asset_ids?asset_ids[]=${encodeURIComponent(value.assetId)}&context=true`));
  if(!Array.isArray(current.resources))throw new CoverError("UNAVAILABLE");if(current.resources.length===0)return;if(current.resources.length!==1)throw new CoverError("OWNERSHIP_MISMATCH");const found=asset(current.resources[0]);
  if(found.assetId!==value.assetId||found.publicId!==value.publicId||found.type!=="authenticated"||found.resourceType!==value.resourceType||found.context.hfr_attempt!==value.context.hfr_attempt||found.context.hfr_kind!==value.context.hfr_kind)throw new CoverError("OWNERSHIP_MISMATCH");
  const body=new URLSearchParams({"asset_ids[]":value.assetId,invalidate:"true"});
  const result=record(await this.admin("resources",{method:"DELETE",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body.toString()}));
  const deleted=record(result.deleted);if(![deleted[value.assetId],deleted[value.publicId]].some(v=>v==="deleted"||v==="not_found"))throw new CoverError("UNAVAILABLE");
 }
}
export function configuredCoverProvider(environment:Record<string,string|undefined>=process.env){return new CloudinaryCoverProvider(cloudinarySettings(environment));}
