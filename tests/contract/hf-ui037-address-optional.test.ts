import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import { parse } from "yaml";
import { parseAreaInput } from "../../src/app/api/server/areas/area.contracts";

const base={name:"Área sem CEP obrigatório",latitude:-2.5,longitude:-44.1};
const entries=[
  ["municipality","Alcântara"],["state","MA"],["cep","65000123"],
] as const;

it("permits every subset of municipality, state and CEP (0/1/2/3 optional fields)",()=>{
 for(let mask=0;mask<8;mask++){
  const data:Record<string,unknown>={...base};
  for(let index=0;index<entries.length;index++){
   const [field,value]=entries[index];
   if(mask&(1<<index))data[field]=value;
  }
  const parsed=parseAreaInput(data);
  assert.ok(parsed,"Accepted optional mask "+mask);
  assert.equal(parsed.municipality,mask&1?"Alcântara":null);
  assert.equal(parsed.state,mask&2?"MA":null);
  assert.equal(parsed.cep,mask&4?"65000-123":null);
 }
});
it("accepts null/blank values and rejects supplied malformed postcode",()=>{
 for(const cep of [null,"","   "])assert.equal(parseAreaInput({...base,cep})?.cep,null);
 for(const cep of ["65000-12","65000-1234","0000-000",7,[],{}]){
  assert.equal(parseAreaInput({...base,cep}),null);
 }
});
it("maintains the closed input and privilege protection",()=>{
 for(const key of ["userId","creator","laboratoryRoomId","image","isActive","laboratoryId","id"]){
  assert.equal(parseAreaInput({...base,[key]:"forged"}),null);
 }
 assert.equal(parseAreaInput({...base,cep:"65000-123",unknown:"forged"}),null);
});
it("keeps the historical IMP-003 contract intact and versioned 037 extension explicit",()=>{
 const current=parse(readFileSync("specs/037-localizacao-endereco-opcional/contracts/area-optional-address.openapi.yaml","utf8"));
 const old=parse(readFileSync("specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml","utf8"));
 assert.equal(current.openapi,"3.1.0");
 assert.equal(current.info.version,"0.2.0");
 const schemas=current.components.schemas;
 assert.equal(schemas.CreateAreaInput.additionalProperties,false);
 for(const field of ["municipality","state","cep"]) {
  assert.ok(field in schemas.CreateAreaInput.properties);
  assert.ok(!schemas.CreateAreaInput.required.includes(field));
  assert.ok(field in schemas.AreaSummary.properties);
  assert.ok(field in schemas.AreaDetail.properties);
 }
 const inputPattern=new RegExp(schemas.CreateAreaInput.properties.cep.pattern);
 assert.equal(inputPattern.test("65000123"),true);
 assert.equal(inputPattern.test("65000-123"),true);
 assert.equal(inputPattern.test("6500-123"),false);
 const responsePattern=new RegExp(schemas.Cep.pattern);
 assert.equal(responsePattern.test("65000-123"),true);
 assert.equal(responsePattern.test("65000123"),false);
 assert.equal("cep" in old.components.schemas.CreateAreaInput.properties,false);
});
