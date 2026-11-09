import assert from "node:assert/strict";
import {test} from "node:test";
import type {Prisma,PrismaClient} from "../../src/generated/prisma";
import {AreaCoverService} from "../../src/app/api/server/images/service";
const ids={laboratoryId:"00000000-0000-4000-8000-000000000301",areaId:"00000000-0000-4000-8000-000000000302"};
const tx={user:{findUnique:async()=>({status:"ACTIVE"})},researchersLinked:{findUnique:async()=>({role:"OWNER",laboratoryRoom:{id:ids.laboratoryId,name:"Synthetic",isActive:true}})},collectionArea:{findFirst:async()=>({id:ids.areaId})},areaCover:{findUnique:async()=>null}} as unknown as Prisma.TransactionClient;
function setup(error:unknown,always=false,wait?:(retry:number)=>Promise<void>){let calls=0;const db={$transaction:async(run:(value:Prisma.TransactionClient)=>Promise<unknown>)=>{if(++calls===1||always)throw error;return run(tx);}} as unknown as PrismaClient;return{service:Reflect.construct(AreaCoverService,[db,()=>{throw Error("no provider expected");},()=>new Date(),()=>true,wait]) as AreaCoverService,calls:()=>calls};}
for(const code of ["P2034","P2002","40001","40P01"])test(`CRI-REV-002 transaction retries explicit conflict ${code}`,async()=>{const f=setup(Object.assign(new Error("synthetic conflict"),{code}));assert.equal((await f.service.detail("synthetic",ids)).featureEnabled,true);assert.equal(f.calls(),2);});
test("CRI-REV-002 transaction retries adapter commit TransactionWriteConflict",async()=>{const f=setup(Object.assign(new Error("synthetic adapter conflict"),{name:"DriverAdapterError",cause:{kind:"TransactionWriteConflict"}}));assert.equal((await f.service.detail("synthetic",ids)).featureEnabled,true);assert.equal(f.calls(),2);});
test("CRI-REV-002 transaction retries a PostgreSQL adapter deadlock",async()=>{const f=setup(Object.assign(new Error("synthetic deadlock"),{name:"DriverAdapterError",cause:{kind:"postgres",code:"40P01"}}));assert.equal((await f.service.detail("synthetic",ids)).featureEnabled,true);assert.equal(f.calls(),2);});
test("CRI-REV-002 transaction retry remains bounded to three and sanitized",async()=>{const f=setup(Object.assign(new Error("synthetic adapter conflict"),{name:"DriverAdapterError",cause:{kind:"TransactionWriteConflict"}}),true);await assert.rejects(f.service.detail("synthetic",ids),{code:"INTERNAL_ERROR",message:"INTERNAL_ERROR"});assert.equal(f.calls(),3);});
test("CRI-REV-002 transaction does not retry an arbitrary driver or connection error",async()=>{for(const error of [Object.assign(new Error("synthetic"),{code:"08006"}),Object.assign(new Error("synthetic"),{name:"DriverAdapterError",cause:{kind:"AuthenticationFailed"}})]){const f=setup(error);await assert.rejects(f.service.detail("synthetic",ids),{code:"INTERNAL_ERROR"});assert.equal(f.calls(),1);}});

test("CRI-REV-005 waits for bounded contention backoff before starting the next transaction",async()=>{
 let entered!:()=>void,release!:()=>void;const waiting=new Promise<void>(r=>{release=r;}),started=new Promise<void>(r=>{entered=r;});const retries:number[]=[];
 const f=setup(Object.assign(new Error("synthetic conflict"),{code:"P2034"}),false,async retry=>{retries.push(retry);entered();await waiting;});
 const operation=f.service.detail("synthetic",ids);
 const first=await Promise.race([started.then(()=>"waiting"),operation.then(()=>"completed",()=>"rejected")]);
 try{assert.equal(first,"waiting");assert.equal(f.calls(),1);assert.deepEqual(retries,[1]);}finally{release();}
 assert.equal((await operation).featureEnabled,true);assert.equal(f.calls(),2);
});

test("CRI-REV-005 keeps three attempts and only two backoffs on repeated supported conflicts",async()=>{
 const retries:number[]=[];const f=setup(Object.assign(new Error("synthetic conflict"),{name:"DriverAdapterError",cause:{kind:"TransactionWriteConflict",originalCode:"40001"}}),true,async retry=>{retries.push(retry);});
 await assert.rejects(f.service.detail("synthetic",ids),{code:"INTERNAL_ERROR"});assert.equal(f.calls(),3);assert.deepEqual(retries,[1,2]);
});

test("CRI-REV-005 never backs off or retries arbitrary failures",async()=>{
 const retries:number[]=[];const f=setup(Object.assign(new Error("synthetic connection failure"),{code:"08006"}),false,async retry=>{retries.push(retry);});
 await assert.rejects(f.service.detail("synthetic",ids),{code:"INTERNAL_ERROR"});assert.equal(f.calls(),1);assert.deepEqual(retries,[]);
});
