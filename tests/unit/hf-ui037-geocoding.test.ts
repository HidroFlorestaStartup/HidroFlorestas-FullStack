import assert from "node:assert/strict";
import { it } from "node:test";
import { areaDraftReducer, initialAreaDraft } from "../../src/components/areas/area-geocoding-state";
import { coordinateValue, normalizeReverseAddress, lookupReverseAddress } from "../../src/components/areas/reverse-address";

it("validates coordinates rather than turning missing values into zero", () => {
  for (const raw of ["", " ", "Infinity", "NaN", "0x2", "90.001"]) assert.equal(coordinateValue(raw, 90), null);
  assert.equal(coordinateValue("-90", 90), -90);
  assert.equal(coordinateValue("180", 180), 180);
  assert.equal(coordinateValue("-180.01", 180), null);
});
it("device, map and typed coordinates independently start a new revision", () => {
  const initial = initialAreaDraft();
  const device = areaDraftReducer(initial, { type: "location", latitude: -2, longitude: -44, revision: 0 });
  const map = areaDraftReducer(device, { type: "point-edit", latitude: "-3", longitude: "-45" });
  const typed = areaDraftReducer(map, { type: "point-edit", latitude: "-3.5", longitude: "-45" });
  assert.deepEqual([device.point.revision, map.point.revision, typed.point.revision], [1, 2, 3]);
  assert.equal(typed.point.latitude, "-3.5");
  assert.equal(areaDraftReducer(typed, { type: "location", latitude: 1, longitude: 2, revision: 0 }), typed);
});
it("discards out-of-order lookup responses and clears suggestions on point changes", () => {
  const a = areaDraftReducer(initialAreaDraft(), { type: "point-edit", latitude: "-2", longitude: "-44" });
  const b = areaDraftReducer(a, { type: "point-edit", latitude: "-3", longitude: "-43" });
  const latest = areaDraftReducer(b, { type: "lookup-success", revision: 2, address: { municipality: "Atual", state: "MA", cep: null } });
  const stale = areaDraftReducer(latest, { type: "lookup-success", revision: 1, address: { municipality: "Antiga", state: "CE", cep: "60000-000" } });
  assert.deepEqual(latest, stale);
  const moved = areaDraftReducer(latest, { type: "point-edit", latitude: "-4", longitude: "-42" });
  assert.equal(moved.address.municipality, "");
  assert.equal(moved.address.state, "");
  assert.equal(moved.lookupStatus, "idle");
});
it("preserves manual corrections even when the current pending response arrives late", () => {
  let draft = areaDraftReducer(initialAreaDraft(), { type: "point-edit", latitude: "-2", longitude: "-44" });
  draft = areaDraftReducer(draft, { type: "lookup-start", revision: 1 });
  draft = areaDraftReducer(draft, { type: "address-edit", field: "municipality", value: "Corrigida" });
  draft = areaDraftReducer(draft, { type: "address-edit", field: "cep", value: "" });
  draft = areaDraftReducer(draft, { type: "lookup-success", revision: 1, address: { municipality: "Automática", state: "Maranhão", cep: "65000-000" } });
  assert.equal(draft.address.municipality, "Corrigida");
  assert.equal(draft.address.cep, "");
  assert.equal(draft.address.state, "Maranhão");
  const failed = areaDraftReducer(draft, { type: "lookup-failed", revision: 1 });
  assert.equal(failed.address.municipality, "Corrigida");
  assert.equal(failed.lookupStatus, "unavailable");
});
it("accepts partial/empty provider data and normalizes only valid Brazilian UF and CEP", () => {
  assert.deepEqual(normalizeReverseAddress({ address: { city: "São Luís", state: "Maranhão", postcode: "65000-123" } }),
    { municipality: "São Luís", state: "MA", cep: "65000-123" });
  assert.deepEqual(normalizeReverseAddress({ address: { town: "Alcântara", state: "MA" } }),
    { municipality: "Alcântara", state: "MA", cep: null });
  assert.deepEqual(normalizeReverseAddress({ address: { state: "Unknown", postcode: "garbage" } }),
    { municipality: null, state: null, cep: null });
  assert.deepEqual(normalizeReverseAddress(null), { municipality: null, state: null, cep: null });
});
it("client lookup makes an abortable same-origin request and never requires remote connectivity in tests", async () => {
  let url = "";
  const fetcher: typeof fetch = async (input, init) => {
    url = String(input);
    assert.equal(init?.cache, "no-store");
    assert.ok(init?.signal);
    return Response.json({ address: { city: "Bacabeira", state: "MA" } });
  };
  const result = await lookupReverseAddress(-2.9, -44.3, new AbortController().signal, fetcher);
  assert.match(url, /^\/api\/geocoding\/reverse\?latitude=/);
  assert.equal(result.municipality, "Bacabeira");
  assert.equal(result.cep, null);
});
