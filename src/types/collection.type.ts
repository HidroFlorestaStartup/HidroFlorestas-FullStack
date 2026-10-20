export type CollectionContext = {
  laboratory: { id: string; name: string; status: "ACTIVE" | "INACTIVE" };
  area: { id: string; name: string };
  readOnly: boolean;
};

export type CollectionOccurrenceInput = { occurredAt: string };

export type CollectionTemporalProjection = {
  occurredAt: string;
  occurredAtUtc: Date;
  occurrenceOffset: string;
};

export type CollectionAttemptError =
  | "OCCURRENCE_REQUIRED"
  | "OCCURRENCE_FORMAT"
  | "OCCURRENCE_FUTURE";

/** Volatile snapshot of the exact operation sent; never persisted or exposed in the UI. */
export type CollectionSubmissionSnapshot = Readonly<{
  apiPath: string;
  idempotencyKey: string;
  body: string;
}>;

export type CollectionFailureKind = "unknown" | "invalid" | "access" | "read-only" | "conflict";

export type CollectionAttempt = {
  context: CollectionContext;
  occurredAt: string;
  localOccurredAt: string;
  occurrenceOffset: string;
  useDeviceTimeZone: boolean;
  phase: "editing" | "reviewing" | "submitting" | "confirmed";
  idempotencyKey: string;
  error: string | null;
  submission?: CollectionSubmissionSnapshot;
  recoveryPending?: boolean;
  failureKind?: CollectionFailureKind;
};

export type CollectionDetailDto = {
  id: string;
  occurredAt: string;
  confirmedAt: string;
  area: { id: string; name: string };
  laboratory: { id: string; name: string; status: "ACTIVE" | "INACTIVE" };
  readOnly: boolean;
};
