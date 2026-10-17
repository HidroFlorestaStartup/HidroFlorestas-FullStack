import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { parseUpload, parseRemoval } from "../../src/app/api/server/images/contracts";
import { sanitizeCover } from "../../src/app/api/server/images/sanitize";

test("cover commands are closed and revisions cannot be forged",()=>{
 assert.equal(parseUpload({expectedRevision:0,key:randomUUID()}).expectedRevision,0);
 for(const value of [{expectedRevision:-1,key:randomUUID()},{expectedRevision:0,key:randomUUID(),publicId:"foreign"},{expectedRevision:0,key:"bad"}])assert.throws(()=>parseUpload(value),{code:"INVALID_REQUEST"});
 assert.equal(parseRemoval({expectedRevision:7}).expectedRevision,7);
 assert.throws(()=>parseRemoval({expectedRevision:7,assetId:"foreign"}),{code:"INVALID_REQUEST"});
});
test("server decodes and strips metadata, keeps bounds, rejects counterfeit and oversized input",async()=>{
 const jpeg=await sharp({create:{width:24,height:18,channels:3,background:"#326646"}}).jpeg().withMetadata().toBuffer();
 assert.ok((await sharp(jpeg).metadata()).exif);
 const output=await sanitizeCover(jpeg);const metadata=await sharp(output.bytes).metadata();
 assert.equal(metadata.format,"webp");assert.equal(metadata.exif,undefined);assert.equal(metadata.icc,undefined);assert.equal(output.width,24);assert.equal(output.height,18);
 const tooWide=await sharp({create:{width:4097,height:1,channels:3,background:"white"}}).png().toBuffer();
 for(const bytes of [Buffer.from("fake.jpg"),Buffer.alloc(10*1024*1024+1),tooWide])await assert.rejects(sanitizeCover(bytes),{code:"INVALID_IMAGE"});
 const gif=await sharp({create:{width:2,height:2,channels:3,background:"white"}}).gif().toBuffer();await assert.rejects(sanitizeCover(gif),{code:"INVALID_IMAGE"});
 const frames=Buffer.concat([Buffer.alloc(12,70),Buffer.alloc(12,190)]);
 const animated=await sharp(frames,{raw:{width:2,height:4,channels:3,pageHeight:2}}).webp({loop:0,delay:[100,100]}).toBuffer();
 assert.equal((await sharp(animated).metadata()).pages,2);
 await assert.rejects(sanitizeCover(animated),{code:"INVALID_IMAGE"});
});
