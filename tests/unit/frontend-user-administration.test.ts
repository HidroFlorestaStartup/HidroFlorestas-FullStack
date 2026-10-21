import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { AdminUserDto } from "../../src/app/api/server/user-administration/user-administration.contracts";
import { administrationChangeBody, createAdministrationReadScope } from "../../src/components/user-administration/user-administration-presentation";

const user: AdminUserDto = { id: "synthetic-user", firstName: "Conta", lastName: "Sintética", email: "account@test.invalid", role: "USER", status: "PENDING", revision: 7, createdAt: "2026-10-21T12:00:00Z", updatedAt: "2026-10-21T12:00:00Z" };

describe("admin presentation preserves the existing optimistic concurrency contract", () => {
  it("sends only role, expected role, observed revision and reason", () => {
    const before = structuredClone(user);
    assert.deepEqual(administrationChangeBody(user, { kind: "role", value: "ADMIN" }, "  Aprovação da conta  "), { expectedRole: "USER", expectedRevision: 7, role: "ADMIN", reason: "Aprovação da conta" });
    assert.deepEqual(user, before);
  });
  it("uses the refreshed revision and status, not an earlier account snapshot", () => {
    const refreshed = { ...user, revision: 8, status: "INACTIVE" as const };
    assert.deepEqual(administrationChangeBody(refreshed, { kind: "status", value: "ACTIVE" }, "Revisão confirmada"), { expectedStatus: "INACTIVE", expectedRevision: 8, status: "ACTIVE", reason: "Revisão confirmada" });
  });
  it("does not silently send blank or oversized justification", () => {
    for (const reason of ["   ", "x".repeat(501)]) assert.throws(() => administrationChangeBody(user, { kind: "role", value: "ADMIN" }, reason), /INVALID_REASON/);
    assert.equal(administrationChangeBody(user, { kind: "status", value: "ACTIVE" }, "x".repeat(500)).reason.length, 500);
  });
});

describe("administrative read scope excludes superseded account responses", () => {
  it("cancels A when B starts and rejects a late A response", () => {
    const scope = createAdministrationReadScope();
    const a = scope.begin("account-a"), b = scope.begin("account-b");
    assert.equal(a.signal.aborted, true);
    assert.equal(scope.isCurrent(a), false);
    assert.equal(scope.isCurrent(b), true);
  });
  it("also excludes an earlier read for the same account", () => {
    const scope = createAdministrationReadScope();
    const earlier = scope.begin("same-account"), current = scope.begin("same-account");
    assert.equal(scope.isCurrent(earlier), false);
    assert.equal(scope.isCurrent(current), true);
  });
  it("invalidates pending responses after unmount or selection reset", () => {
    const scope = createAdministrationReadScope();
    const ticket = scope.begin("account-a");
    scope.cancel();
    assert.equal(ticket.signal.aborted, true);
    assert.equal(scope.isCurrent(ticket), false);
    assert.equal(scope.isCurrent(scope.begin("account-a")), true);
  });
});
