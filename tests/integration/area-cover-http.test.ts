import assert from "node:assert/strict";
import {test} from "node:test";
import { createCoverHandlers } from "../../src/app/api/server/images/http";
import { CoverError } from "../../src/app/api/server/images/contracts";
const principal=async()=>({id:"session-actor",firstName:"Synthetic",lastName:"Test",image:"",role:"USER" as const});
test("cover HTTP bounds CSRF/closed confirmation, hides provider failures and proxies private bytes",async()=>{
 let confirms=0;const ids={laboratoryId:crypto.randomUUID(),areaId:crypto.randomUUID(),attemptId:crypto.randomUUID()},c={params:Promise.resolve(ids)};
 const h=createCoverHandlers({requireAuth:principal,environment:{ACCOUNT_TRUSTED_INGRESS:"local",ACCOUNTS_LOCAL_POSTGRESQL:"1",IMP006_LOCAL_REGRESSION_PUBLIC:"1",NODE_ENV:"test"},service:{detail:async()=>({image:{revision:0,hasImage:false},canEdit:false}),initiate:async()=>{throw new CoverError("UNAVAILABLE");},confirm:async()=>{confirms++;return{image:{revision:1,hasImage:true},canEdit:true};},remove:async()=>{},content:async()=>Buffer.from([1,2,3])}});
 const request=(body:string,origin="http://localhost:3001")=>new Request("http://localhost:3001/api/image",{method:"POST",headers:{"Content-Type":"application/json",Origin:origin,Host:"localhost:3001","Sec-Fetch-Site":"same-origin"},body});
 assert.equal((await h.UPLOAD(request("{}","https://foreign.invalid"),c)).status,403);
 assert.equal((await h.UPLOAD(request('"'+"x".repeat(17000)+'"'),c)).status,400);
 assert.equal((await h.CONFIRM(request('{"secureUrl":"https://foreign.invalid/a.jpg"}'),c)).status,400);assert.equal(confirms,0);
 assert.equal((await h.CONFIRM(request("{}"),c)).status,200);
 const error=await h.UPLOAD(request("{}"),c);assert.equal(error.status,503);assert.equal((await error.text()).includes("api_secret"),false);
 const content=await h.CONTENT(new Request("http://localhost/api/image/content"),c);assert.equal(content.headers.get("cache-control"),"private, no-store");assert.equal(content.headers.get("x-content-type-options"),"nosniff");assert.equal(content.headers.get("location"),null);assert.equal(content.headers.get("content-type"),"image/webp");assert.deepEqual([...new Uint8Array(await content.arrayBuffer())],[1,2,3]);
});
