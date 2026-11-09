import assert from "node:assert/strict";
import { test } from "node:test";
import { createDraftHandlers } from "../../src/app/api/server/environmental-data/draft.http";
import { createEnvironmentalHandlers } from "../../src/app/api/server/environmental-data/environmental-data.http";
import { validEnvironmentalPayload } from "../fixtures/environmental-data";
import { AreaAccessError } from "../../src/app/api/server/areas/area.authorization";
import { makeEnvironmentalInitiatorProof } from "../../src/app/api/server/environmental-data/environmental-initiation";
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

test("draft GET, PUT and DELETE reject a changed principal before service access and allow the original principal again",async()=>{
 const owner="synthetic-principal-A";let actor=owner;
 const proof=makeEnvironmentalInitiatorProof(owner);
 const calls:Array<{method:string;userId:string}>=[];
 const draft={id:crypto.randomUUID(),revision:1,formVersion:"environmental-draft-v1" as const,fields:{"terrain.elevationMeters":{kind:"editing" as const,raw:"private-synthetic-input-A"}},updatedAt:"2026-10-20T00:00:00.000Z"};
 const handlers=createDraftHandlers({requireAuth:async()=>({...await principal(),id:actor}),environment:{},service:{
  detail:async userId=>{calls.push({method:"GET",userId});return draft;},
  save:async userId=>{calls.push({method:"PUT",userId});return draft;},
  discard:async userId=>{calls.push({method:"DELETE",userId});},
 }});
 for(const method of ["GET","PUT","DELETE"] as const){
  const send=()=>handlers[method](new Request("https://app.test/draft",{method,headers:{"Content-Type":"application/json","X-Environmental-Initiator-Proof":proof},...(method==="GET"?{}:{body:"{}"})}),context());
  actor=owner;const before=calls.length;
  assert.equal((await send()).status,method==="DELETE"?204:200);assert.equal(calls.length,before+1);
  actor="synthetic-principal-B";
  const rejected=await send();assert.equal(rejected.status,403);assert.equal(calls.length,before+1);
  const body=await rejected.json();assert.equal(body.error.code,"FORBIDDEN");assert.equal(JSON.stringify(body).includes("private-synthetic-input-A"),false);
  actor=owner;
  assert.equal((await send()).status,method==="DELETE"?204:200);assert.equal(calls.length,before+2);
 }
 assert.ok(calls.every(call=>call.userId===owner));
 assert.deepEqual(calls.map(call=>call.method),["GET","GET","PUT","PUT","DELETE","DELETE"]);
});

test("environmental POST rejects a changed principal before persistence and retains the original key and body on return",async()=>{
 const owner="synthetic-principal-A";let actor=owner;
 const proof=makeEnvironmentalInitiatorProof(owner);const key=crypto.randomUUID();const payload=validEnvironmentalPayload();
 const calls:Array<{userId:string;key:string;payload:unknown}>=[];
 const handlers=createEnvironmentalHandlers({requireAuth:async()=>({...await principal(),id:actor}),service:{
  create:async command=>{calls.push({userId:command.userId,key:command.confirmationKey,payload:command.payload});return{created:calls.length===1,environmentalData:null as never};},
  detail:async()=>({environmentalData:null}),
 }});
 const send=()=>handlers.POST(new Request("https://app.test/environmental-data",{method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":key,"X-Environmental-Initiator-Proof":proof},body:JSON.stringify(payload)}),context());
 assert.equal((await send()).status,201);assert.equal(calls.length,1);
 actor="synthetic-principal-B";
 const rejected=await send();assert.equal(rejected.status,403);assert.equal((await rejected.json()).error.code,"FORBIDDEN");assert.equal(calls.length,1);
 actor=owner;
 assert.equal((await send()).status,200);assert.equal(calls.length,2);assert.deepEqual(calls[1],calls[0]);
 assert.equal(calls[1].userId,owner);assert.equal(calls[1].key,key);assert.deepEqual(calls[1].payload,payload);
});
