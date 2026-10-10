import assert from "node:assert/strict";
import { test } from "node:test";
import { createDraftHandlers } from "../../src/app/api/server/environmental-data/draft.http";
import { createEnvironmentalHandlers } from "../../src/app/api/server/environmental-data/environmental-data.http";
import { validEnvironmentalPayload } from "../fixtures/environmental-data";
import { AreaAccessError } from "../../src/app/api/server/areas/area.authorization";
const principal=async()=>({id:"session-owner",firstName:"Synthetic",lastName:"Test",image:"",role:"USER" as const});
const context=()=>({params:Promise.resolve({laboratoryId:crypto.randomUUID(),areaId:crypto.randomUUID(),collectionId:crypto.randomUUID()})});
const request=(body:string,headers:Record<string,string>={})=>new Request("https://app.test/draft",{method:"PUT",headers:{"Content-Type":"application/json",...headers},body});
test("draft HTTP limits bytes, rejects CSRF/malformed JSON and derives owner from session",async()=>{
 let owner="";const handlers=createDraftHandlers({requireAuth:principal,environment:{},service:{detail:async id=>{owner=id;return null;},save:async id=>{owner=id;return null as never;},discard:async id=>{owner=id;}}});
 for(const [req,status] of [[request("{}",{Origin:"https://other.test"}),403],[request("{}",{"Sec-Fetch-Site":"cross-site"}),403],[request("{"),400],[request('"'+"x".repeat(32768)+'"'),400],[request("{}",{"Content-Type":"text/plain"}),400]] as const)assert.equal((await handlers.PUT(req,context())).status,status);
 const read=await handlers.GET(request("{}"),context());assert.equal(read.status,200);assert.equal(owner,"session-owner");assert.match(read.headers.get("Cache-Control")!,/no-store/);assert.deepEqual(await read.json(),{draft:null});
 assert.equal((await handlers.DELETE(request("{}"),context())).status,204);
 const fail=createDraftHandlers({requireAuth:principal,service:{detail:async()=>{throw new AreaAccessError("NOT_FOUND");},save:async()=>{throw Error("secret");},discard:async()=>{}}});
 assert.equal((await fail.GET(request("{}"),context())).status,404);assert.ok(!(await (await fail.PUT(request("{}"),context())).text()).includes("secret"));
});
test("confirmation requires paired valid draft headers and forwards the selected revision",async()=>{
 let selected:unknown;
 const handlers=createEnvironmentalHandlers({requireAuth:principal,service:{create:async c=>{selected=c.draft;return{created:true,environmentalData:null as never};},detail:async()=>({environmentalData:null})}});
 const post=(headers:Record<string,string>)=>new Request("https://app.test/measurements",{method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":crypto.randomUUID(),...headers},body:JSON.stringify(validEnvironmentalPayload())});
 for(const headers of [{"Draft-Id":crypto.randomUUID()},{"Draft-Revision":"1"},{"Draft-Id":crypto.randomUUID(),"Draft-Revision":"01"}] as Record<string,string>[])assert.equal((await handlers.POST(post(headers),context())).status,400);
 const id=crypto.randomUUID();assert.equal((await handlers.POST(post({"Draft-Id":id,"Draft-Revision":"3"}),context())).status,201);assert.deepEqual(selected,{id,revision:3});
});
