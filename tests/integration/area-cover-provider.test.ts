import assert from "node:assert/strict";
import {test} from "node:test";
import { randomUUID } from "node:crypto";
import { CloudinaryCoverProvider,presetFingerprint,cloudinarySettings } from "../../src/app/api/server/images/cloudinary";
import type {CoverAsset} from "../../src/app/api/server/images/provider";
const preset={name:"hfr-cover-v1",unsigned:false,settings:{type:"authenticated",overwrite:false,allowed_formats:"jpg,png,webp"}};
const config={cloudName:"synthetic",apiKey:"123456789",apiSecret:"synthetic-only-not-a-real-secret",preset:preset.name,presetHash:"a".repeat(64)};

test("CRI-REV-001 configuration fails closed for disabled, absent, invalid and incomplete settings",()=>{
 const env={CLOUDINARY_IMAGE_ENABLED:"1",CLOUDINARY_CLOUD_NAME:config.cloudName,CLOUDINARY_API_KEY:config.apiKey,CLOUDINARY_API_SECRET:config.apiSecret,CLOUDINARY_COVER_PRESET:config.preset,CLOUDINARY_COVER_PRESET_SHA256:config.presetHash};
 assert.deepEqual(cloudinarySettings(env),config);
 for(const flag of [undefined,"0","true","invalid"])assert.throws(()=>cloudinarySettings({...env,CLOUDINARY_IMAGE_ENABLED:flag}),{code:"UNAVAILABLE"});
 for(const key of Object.keys(env))assert.throws(()=>cloudinarySettings({...env,[key]:undefined}),{code:"UNAVAILABLE"});
});
test("preset accepts documented CSV/array equivalently and rejects unsigned or transforming options",()=>{
 const hash=presetFingerprint(preset,preset.name);assert.equal(hash,presetFingerprint({...preset,settings:{...preset.settings,allowed_formats:["webp","jpg","png"]}},preset.name));
 for(const value of [{...preset,unsigned:true},{...preset,settings:{incoming:"c_scale,w_1"}},{...preset,settings:{allowed_formats:"png,pdf"}}])assert.throws(()=>presetFingerprint(value,preset.name),{code:"UNAVAILABLE"});
});
test("cleanup provider proves immutable identity/context through plural API and deletes assetIds only",async()=>{
 const a:CoverAsset={assetId:randomUUID(),publicId:`hfr-cover/${randomUUID()}/${randomUUID()}/cover`,version:1,resourceType:"image",type:"authenticated",format:"webp",bytes:10,width:1,height:1,context:{hfr_attempt:randomUUID(),hfr_kind:"final"}};
 const requests:{url:string;init:RequestInit}[]=[];
 const p=new CloudinaryCoverProvider(config,async(input,init)=>{const url=String(input);requests.push({url,init:init??{}});return Response.json(init?.method==="DELETE"?{deleted:{[a.publicId]:"deleted"}}:{resources:[{asset_id:a.assetId,public_id:a.publicId,version:1,resource_type:"image",type:"authenticated",format:"webp",bytes:10,width:1,height:1,context:{custom:a.context}}]});});
 await p.destroy(a);assert.equal(requests.length,2);assert.match(requests[0].url,/resources\/by_asset_ids\?/);assert.equal(new URL(requests[0].url).searchParams.get("context"),"true");assert.equal(new URL(requests[0].url).searchParams.get("asset_ids[]"),a.assetId);
 const body=new URLSearchParams(String(requests[1].init.body));assert.equal(body.get("asset_ids[]"),a.assetId);assert.equal(body.has("prefix"),false);assert.equal(body.has("public_ids[]"),false);assert.equal(body.has("all"),false);
});
test("upload ticket signs controlled authenticated destination and preset without secret or delivery URL",()=>{
 const p=new CloudinaryCoverProvider(config),id=randomUUID(),issuedAt=new Date("2026-10-10T12:00:00Z");const ticket=p.ticket({id,stagingPublicId:`hfr-cover/${id}/staging.webp`,finalPublicId:`hfr-cover/${id}/cover`,issuedAt,expiresAt:new Date(issuedAt.getTime()+600000),presetHash:config.presetHash});
 assert.equal(ticket.upload.params.type,"authenticated");assert.equal(ticket.upload.params.overwrite,"false");assert.equal(ticket.upload.params.upload_preset,preset.name);assert.equal(ticket.upload.params.allowed_formats,"jpg,jpeg,png,webp");assert.match(ticket.upload.params.context,new RegExp(id));assert.ok(ticket.upload.params.signature);assert.equal(JSON.stringify(ticket).includes(config.apiSecret),false);assert.equal(JSON.stringify(ticket).includes("res.cloudinary.com"),false);
});
