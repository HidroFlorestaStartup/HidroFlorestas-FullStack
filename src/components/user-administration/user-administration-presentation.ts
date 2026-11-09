import type { AdminUserDto, AdminUserRole, AdminUserStatus, RoleChangeInput, StatusChangeInput } from "@/app/api/server/user-administration/user-administration.contracts";

export type AdministrationChange = { kind: "role"; value: AdminUserRole } | { kind: "status"; value: AdminUserStatus };

export function administrationChangeBody(user: AdminUserDto, change: AdministrationChange, reason: string): RoleChangeInput | StatusChangeInput {
  const normalized = reason.trim();
  if (!normalized || normalized.length > 500) throw new Error("INVALID_REASON");
  return change.kind === "role"
    ? { expectedRole: user.role, expectedRevision: user.revision, role: change.value, reason: normalized }
    : { expectedStatus: user.status, expectedRevision: user.revision, status: change.value, reason: normalized };
}

/** A late response must never be presented under a newer search or selected account. */
export function createAdministrationReadScope() {
  let current: { target: string; signal: AbortSignal } | null = null;
  let controller: AbortController | null = null;
  return {
    begin(target: string) {
      controller?.abort();
      controller = new AbortController();
      current = { target, signal: controller.signal };
      return current;
    },
    isCurrent(ticket: { target: string; signal: AbortSignal }) {
      return current === ticket && !ticket.signal.aborted;
    },
    cancel() {
      controller?.abort();
      current = null;
    },
  };
}
