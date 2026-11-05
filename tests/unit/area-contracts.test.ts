import assert from "node:assert/strict";
import { it } from "node:test";
import { parseAreaInput } from "../../src/app/api/server/areas/area.contracts";
it("normalizes minimal input, optional blanks, and preserves exact coordinate bounds",()=>{
 assert.deepEqual(parseAreaInput({name:"  Test  area  ",latitude:-90,longitude:180}),{name:"Test area",latitude:-90,longitude:180,municipality:null,state:null,cep:null,landType:null,description:null});
});
it("rejects invalid coordinates and any privileged or unknown key",()=>{
 for(const value of [NaN,Infinity,-Infinity,"0",null,undefined,91,-91])assert.equal(parseAreaInput({name:"Area",latitude:value,longitude:0}),null);
 for(const key of ["userId","laboratoryRoomId","laboratoryId","creator","id","isActive","image"])assert.equal(parseAreaInput({name:"Area",latitude:0,longitude:0,[key]:"forged"}),null);
 for(const name of ["", " ","x".repeat(101)])assert.equal(parseAreaInput({name,latitude:0,longitude:0}),null);
 assert.equal(parseAreaInput({name:"Area",latitude:0,longitude:181}),null);
 assert.equal(parseAreaInput({name:"Area",latitude:0,longitude:0,description:"x".repeat(2001)}),null);
});

it("accepts CEP absent/null/blank and valid 8-digit formats, normalizing consistently", () => {
 const base={name:"Área",latitude:-2.5,longitude:-44.2};
 for(const input of [{},{cep:null},{cep:""},{cep:"  "}]) {
  assert.equal(parseAreaInput({...base,...input})?.cep,null);
 }
 assert.equal(parseAreaInput({...base,cep:"65000123"})?.cep,"65000-123");
 assert.equal(parseAreaInput({...base,cep:"65000-123"})?.cep,"65000-123");
 for(const cep of ["6500-123","65000-12","65000.123","65000-1234","abcdefgh",13,{},[]]) {
  assert.equal(parseAreaInput({...base,cep}),null);
 }
});
