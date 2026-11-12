import assert from "node:assert/strict";
import test from "node:test";
import { formatIHFRNumber, formatUiDateTime, laboratoryRoleLabel, uiErrorMessage } from "../../src/lib/ui-presentation";
import { formatCollectionConfirmation, formatCollectionOccurrence } from "../../src/lib/collection-date-time";
import { ihfrLabel, ihfrOperationMessage } from "../../src/components/ihfr-diagnosis/ihfr-presentation";

test("IHFR output uses two decimal places and pt-BR without changing inputs", () => {
  const values = [0.6299999999999999, 0.4, 0, -0, "0.123456789012345678", "0.876543210987654321", "0.000000000000000000"];
  const before = JSON.stringify(values);
  assert.deepEqual(values.map(formatIHFRNumber), ["0,63", "0,40", "0,00", "0,00", "0,12", "0,88", "0,00"]);
  assert.equal(JSON.stringify(values), before);
  for (const value of ["", "invalid", NaN, Infinity]) assert.equal(formatIHFRNumber(value), "Indisponível");
});

test("confirmation and occurrence preserve the declared civil zone across midnight", () => {
  const occurredAt = "2026-10-30T23:59:34.664-03:00";
  const confirmedAt = "2026-10-31T03:00:40.987Z";
  const previous = process.env.TZ;
  try {
    for (const zone of ["UTC", "Pacific/Honolulu", "Asia/Kathmandu"]) {
      process.env.TZ = zone;
      assert.equal(formatCollectionOccurrence(occurredAt), "30/10/2026 às 23:59");
      assert.equal(formatCollectionConfirmation(confirmedAt, occurredAt), "31/10/2026 às 00:00");
      assert.equal(formatCollectionConfirmation("2026-10-30T20:26:40Z", "2026-10-30T17:26:34.664-03:00"), "30/10/2026 às 17:26");
      assert.equal(formatCollectionConfirmation("2026-10-30T23:00:00Z", "2026-10-30T12:00:00+05:45"), "31/10/2026 às 04:45");
    }
  } finally { if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous; }
  assert.equal(occurredAt, "2026-10-30T23:59:34.664-03:00");
  assert.equal(confirmedAt, "2026-10-31T03:00:40.987Z");
  assert.equal(formatCollectionConfirmation("invalid", occurredAt), "Data indisponível");
  assert.equal(formatCollectionOccurrence("invalid"), "Data indisponível");
});

test("provenance dates keep explicit UTC semantics and honest missing states", () => {
  assert.equal(formatUiDateTime("2026-10-30T20:26:34.664Z"), "30/10/2026 às 20:26");
  assert.equal(formatUiDateTime(null), "Não se aplica");
  assert.equal(formatUiDateTime("invalid"), "Data indisponível");
});

test("public role and state labels are Portuguese while internal codes remain usable", () => {
  assert.deepEqual(["OWNER", "ADMIN", "MEMBER"].map(laboratoryRoleLabel), ["Proprietário", "Administrador", "Membro"]);
  assert.equal(laboratoryRoleLabel("constructor"), "Papel não identificado");
  assert.equal(ihfrLabel("scientific", "EXPERIMENTAL"), "Experimental");
  assert.match(ihfrLabel("reason", "INCOMPATIBLE_VERSION"), /incompatível/);
  assert.match(ihfrOperationMessage("FORBIDDEN"), /permissão/);
  assert.doesNotMatch(ihfrOperationMessage("INTERNAL_ERROR"), /INTERNAL_ERROR/);
});

test("technical browser errors do not become English interface messages", () => {
  for (const value of [new TypeError("Failed to fetch"), "Load failed", "NetworkError when attempting to fetch resource.", "Unexpected token '<', response is not valid JSON", "FORBIDDEN"]) {
    assert.equal(uiErrorMessage(value, "Não foi possível carregar."), "Não foi possível carregar.");
  }
  assert.equal(uiErrorMessage(new Error("Falha sintética controlada."), "Falha"), "Falha sintética controlada.");
});
