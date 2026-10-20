import assert from "node:assert/strict";
import { describe,it } from "node:test";
import { makeEnvironmentalInitiatorProof,matchesEnvironmentalInitiatorProof } from "../../src/app/api/server/environmental-data/environmental-initiation";

const secret="synthetic-environmental-principal-secret";
describe("environmental form initiator proof",()=>{
  it("binds rendered form to original principal without exposing user ID",()=>{
    const a=makeEnvironmentalInitiatorProof("userA",secret);
    const b=makeEnvironmentalInitiatorProof("userB",secret);
    assert.match(a,/^[a-f0-9]{64}$/);assert.notEqual(a,b);
    assert.equal(matchesEnvironmentalInitiatorProof(a,"userA",secret),true);
    assert.equal(matchesEnvironmentalInitiatorProof(a,"userB",secret),false);
    assert.equal(a.includes("userA"),false);
  });
  it("rejects invalid/tampered proof and changed signing key",()=>{
    const a=makeEnvironmentalInitiatorProof("userA",secret);
    assert.equal(matchesEnvironmentalInitiatorProof(a,"userA","another-secret"),false);
    assert.equal(matchesEnvironmentalInitiatorProof(a.substring(1),"userA",secret),false);
    assert.equal(matchesEnvironmentalInitiatorProof("g".repeat(64),"userA",secret),false);
    assert.equal(matchesEnvironmentalInitiatorProof((a[0]==="f"?"e":"f")+a.slice(1),"userA",secret),false);
    assert.throws(()=>makeEnvironmentalInitiatorProof("",secret));
  });
});
