import assert from "node:assert/strict";
import { it } from "node:test";
import { parseAreaInput } from "../../src/app/api/server/areas/area.contracts";

const base = { name: "Área sem dependência do geocodificador", latitude: -2.5, longitude: -44.1 };

it("the current create-area contract accepts zero, one or two optional persisted address fields", () => {
  const cases = [
    [{}, null, null],
    [{ municipality: "Alcântara" }, "Alcântara", null],
    [{ state: "MA" }, null, "MA"],
    [{ municipality: "Alcântara", state: "MA" }, "Alcântara", "MA"],
    [{ municipality: "", state: "" }, null, null],
  ] as const;
  for (const [fields, municipality, state] of cases) {
    const parsed = parseAreaInput({ ...base, ...fields });
    assert.ok(parsed);
    assert.equal(parsed.municipality, municipality);
    assert.equal(parsed.state, state);
    assert.equal(parsed.latitude, -2.5);
  }
});
it("the existing privileged allowlist is unchanged by the UI037 form work", () => {
  for (const key of ["userId", "creator", "laboratoryRoomId", "image", "isActive"]) {
    assert.equal(parseAreaInput({ ...base, [key]: "forged" }), null);
  }
});
it("CEP requires the explicitly allocated shared contract writer before POST can accept it", () => {
  // Honest contract evidence: the later UI-07 decision is not yet implemented
  // in this shared parser. Never reinterpret a rejected CEP as persisted data.
  assert.equal(parseAreaInput({ ...base, cep: "65000-000" }), null);
  assert.equal(parseAreaInput({ ...base, cep: null }), null);
});
