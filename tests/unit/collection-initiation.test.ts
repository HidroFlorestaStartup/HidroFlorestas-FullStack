import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { makeCollectionInitiatorProof, matchesCollectionInitiatorProof } from "../../src/app/api/server/collections/collection-initiation";

const secret = "synthetic-test-key-collection-initiator";

describe("collection initiator binding", () => {
  it("binds an attempt to the server-rendered principal without exposing the user ID", () => {
    const a = makeCollectionInitiatorProof("user-A", secret);
    const b = makeCollectionInitiatorProof("user-B", secret);
    assert.match(a, /^[0-9a-f]{64}$/);
    assert.notEqual(a, b);
    assert.equal(a.includes("user-A"), false);
    assert.equal(matchesCollectionInitiatorProof(a, "user-A", secret), true);
    assert.equal(matchesCollectionInitiatorProof(a, "user-B", secret), false);
  });

  it("rejects tampering, empty proof and wrong signature key", () => {
    const a = makeCollectionInitiatorProof("user-A", secret);
    assert.equal(matchesCollectionInitiatorProof(a, "user-A", "other-secret"), false);
    assert.equal(matchesCollectionInitiatorProof(a.slice(0,63), "user-A", secret), false);
    assert.equal(matchesCollectionInitiatorProof("g".repeat(64), "user-A", secret), false);
    const changed = (a[0] === "f" ? "e" : "f") + a.slice(1);
    assert.equal(matchesCollectionInitiatorProof(changed, "user-A", secret), false);
    assert.throws(() => makeCollectionInitiatorProof("", secret));
  });
});
