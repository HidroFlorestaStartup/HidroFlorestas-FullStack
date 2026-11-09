import assert from "node:assert/strict";
import { test } from "node:test";
import { DRAFT_VERSION, parseDraftSave, draftFieldsToForm, formToDraftFields } from "../../src/types/environmental-draft";

const input = () => ({ draftId: null, expectedRevision: 0, saveKey: crypto.randomUUID(), formVersion: DRAFT_VERSION, fields: {
  "water.hasSpring": { kind: "value", value: false }, "soil.infiltrationRateMmPerHour": { kind: "value", value: 0 },
  "terrain.elevationMeters": { kind: "editing", raw: "12." }, "water.salinityIndicator": { kind: "absent" },
  "terrain.slopePercent": { kind: "editing", raw: "" },
}});
test("draft preserves false, zero, missing, absent, blank and incomplete text", () => {
  const parsed = parseDraftSave(input());
  const form = draftFieldsToForm(parsed.fields);
  assert.equal(form["water.hasSpring"], "false");
  assert.equal(form["soil.infiltrationRateMmPerHour"], "0");
  assert.equal(form["terrain.elevationMeters"], "12.");
  assert.equal(parsed.fields["water.salinityIndicator"].kind, "absent");
  assert.equal(Object.hasOwn(parsed.fields, "soil.soilTexture"), false);
  assert.deepEqual(formToDraftFields({"terrain.elevationMeters":"12.","water.hasSpring":"false"}), {
    "water.hasSpring": {kind:"editing",raw:"false"}, "terrain.elevationMeters": {kind:"editing",raw:"12."},
  });
});
test("draft rejects unknown version, ownership, keys, invalid typed values and bounds", () => {
  for (const value of [
    {...input(),formVersion:"v99"}, {...input(),userId:crypto.randomUUID()}, {...input(),expectedRevision:1},
    {...input(),fields:{"fake":{kind:"absent"}}}, {...input(),fields:{"water.hasSpring":{kind:"value",value:"false"}}},
    {...input(),fields:{"vegetation.vegetationCoverPercent":{kind:"value",value:101}}},
    {...input(),fields:{"terrain.elevationMeters":{kind:"editing",raw:"x".repeat(1001)}}},
    {...input(),fields:{"water.hasSpring":{kind:"absent",value:true}}},
  ]) assert.throws(() => parseDraftSave(value));
});

test("UI roundtrip preserves untouched absent, omitted, value and editing cells", () => {
  const baseline=parseDraftSave(input()).fields;
  const form=draftFieldsToForm(baseline);form["terrain.elevationMeters"]="25";
  const saved=formToDraftFields(form,baseline,new Set(["terrain.elevationMeters"]));
  assert.deepEqual(saved,{...baseline,"terrain.elevationMeters":{kind:"editing",raw:"25"}});
  const explicitBlank=formToDraftFields(draftFieldsToForm(baseline),baseline,new Set(["water.salinityIndicator"]));
  assert.deepEqual(explicitBlank["water.salinityIndicator"],{kind:"editing",raw:""});
});
