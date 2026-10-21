import type { CollectionAttempt, CollectionContext, CollectionFailureKind } from "@/types/collection.type";
import { deviceLocalDateTime, deviceUtcOffset, deviceOffsetForLocal, localOccurrenceToRfc3339 } from "@/lib/collection-date-time";
import { createClientUuid } from "@/lib/client-uuid";
import {
  CollectionContractError,
  parseCollectionInput,
  type Clock,
} from "@/app/api/server/collections/collection.contracts";

export function createCollectionAttempt(
  context: CollectionContext,
  createKey: () => string = createClientUuid,
  clock: Clock = () => new Date(),
): CollectionAttempt {
  const now = clock();
  const localOccurredAt = deviceLocalDateTime(now);
  const occurrenceOffset = deviceUtcOffset(now);
  return {
    context: {
      laboratory: { ...context.laboratory },
      area: { ...context.area },
      readOnly: context.readOnly,
    },
    occurredAt: localOccurrenceToRfc3339(localOccurredAt, occurrenceOffset),
    localOccurredAt,
    occurrenceOffset,
    useDeviceTimeZone: true,
    phase: "editing",
    idempotencyKey: createKey(),
    error: null,
  };
}

export function updateCollectionOccurrence(
  attempt: CollectionAttempt,
  occurredAt: string,
): CollectionAttempt {
  if (collectionEditingLocked(attempt)) return attempt;
  const parts = /^(.*?)(Z|[+-]\d{2}:\d{2})$/.exec(occurredAt);
  return { ...attempt, occurredAt, localOccurredAt: parts?.[1] ?? occurredAt,
    occurrenceOffset: parts?.[2] ?? attempt.occurrenceOffset, useDeviceTimeZone: false,
    phase: "editing", error: null };
}

export function updateCollectionLocalOccurrence(
  attempt: CollectionAttempt,
  localOccurredAt: string,
  occurrenceOffset = attempt.occurrenceOffset,
  useDeviceTimeZone = attempt.useDeviceTimeZone,
): CollectionAttempt {
  if (collectionEditingLocked(attempt)) return attempt;
  if (useDeviceTimeZone && localOccurredAt) {
    try { occurrenceOffset = deviceOffsetForLocal(localOccurredAt); } catch { /* Validate at review; preserve editable input. */ }
  }
  return { ...attempt, localOccurredAt, occurrenceOffset, useDeviceTimeZone,
    occurredAt: localOccurrenceToRfc3339(localOccurredAt, occurrenceOffset), phase: "editing", error: null };
}

export function reviewCollectionAttempt(
  attempt: CollectionAttempt,
  clock: Clock = () => new Date(),
): CollectionAttempt {
  if (collectionEditingLocked(attempt)) return attempt;
  try {
    const offset = attempt.useDeviceTimeZone && attempt.localOccurredAt
      ? deviceOffsetForLocal(attempt.localOccurredAt) : attempt.occurrenceOffset;
    const occurredAt = localOccurrenceToRfc3339(attempt.localOccurredAt, offset);
    parseCollectionInput({ occurredAt }, clock);
    return { ...attempt, occurredAt, occurrenceOffset: offset, phase: "reviewing", error: null };
  } catch (error) {
    if (error instanceof CollectionContractError) {
      const message = error.reason === "REQUIRED"
        ? "Informe data, horário e fuso explícito."
        : error.reason === "FUTURE"
          ? "A ocorrência não pode estar no futuro."
          : "Informe data, horário e fuso UTC válidos, sem correção automática.";
      return { ...attempt, phase: "editing", error: message };
    }
    if (error instanceof Error) return { ...attempt, phase: "editing", error: error.message };
    throw error;
  }
}

export function collectionEditingLocked(attempt: CollectionAttempt): boolean {
  return attempt.phase === "submitting" || attempt.phase === "confirmed" || Boolean(attempt.recoveryPending);
}

export function editCollectionAttempt(attempt: CollectionAttempt): CollectionAttempt {
  if (collectionEditingLocked(attempt)) return attempt;
  return { ...attempt, phase: "editing", error: null };
}

export function beginCollectionSubmission(attempt: CollectionAttempt, initiatorProof?: string): CollectionAttempt {
  if (attempt.phase === "submitting") return attempt;
  if (attempt.phase !== "reviewing") throw new Error("REVIEW_REQUIRED");
  const submission = attempt.submission ?? Object.freeze({
    apiPath: `/api/laboratories/${attempt.context.laboratory.id}/areas/${attempt.context.area.id}/collections`,
    idempotencyKey: attempt.idempotencyKey,
    body: JSON.stringify({ occurredAt: attempt.occurredAt }),
    initiatorProof,
  });
  return { ...attempt, submission, phase: "submitting", error: null, failureKind: undefined };
}

export function failCollectionSubmission(
  attempt: CollectionAttempt,
  message: string,
  kind: CollectionFailureKind = "unknown",
): CollectionAttempt {
  // A later rejection cannot prove that an earlier unknown request did not commit.
  const recoveryPending = Boolean(attempt.recoveryPending) || kind === "unknown" || kind === "conflict";
  return {
    ...attempt, phase: "reviewing", error: message, failureKind: kind, recoveryPending,
    submission: recoveryPending ? attempt.submission : undefined,
  };
}

export function completeCollectionSubmission(attempt: CollectionAttempt): CollectionAttempt {
  if (attempt.phase !== "submitting") throw new Error("SUBMISSION_REQUIRED");
  return { ...attempt, phase: "confirmed", recoveryPending: false, failureKind: undefined, error: null };
}

export function startNewCollectionAttempt(
  attempt: CollectionAttempt,
  createKey: () => string = createClientUuid,
): CollectionAttempt {
  if (attempt.phase === "submitting" || attempt.recoveryPending) {
    throw new Error("CONFIRMATION_UNRESOLVED");
  }
  return createCollectionAttempt(attempt.context, createKey);
}
