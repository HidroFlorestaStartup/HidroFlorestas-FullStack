/** UI-036 only: a temporal projection; this module never computes an IHFR. */
export type AreaCollectionSource = {
  id: string;
  occurredAt: Date | null;
  occurrenceOffset: string | null;
  confirmedAt: Date | null;
  confirmationKey: string | null;
  currentExperimentalIHFRDiagnosis: {
    diagnosis: {
      id: string;
      displayScore: { toString(): string };
      ihfrClass: string;
      scientificState: string;
    };
  } | null;
};

export type AreaCollectionItem = {
  id: string;
  occurredAt: string;
  occurredAtUtc: string;
  confirmedAt: string;
  currentDiagnosis: { id: string; displayScore: string; ihfrClass: string } | null;
};

/** Convert UTC instant to the user's originally declared offset, never to the server's zone. */
export function occurrenceWithOriginalOffset(instant: Date, offset: string): string {
  const utc = instant.getTime();
  if (!Number.isFinite(utc) || !/^(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/.test(offset)) {
    throw new TypeError("INVALID_COLLECTION_OCCURRENCE");
  }
  if (offset === "Z") return instant.toISOString();
  const direction = offset.startsWith("+") ? 1 : -1;
  const minutes = Number(offset.slice(1, 3)) * 60 + Number(offset.slice(4, 6));
  return new Date(utc + direction * minutes * 60_000).toISOString().slice(0, -1) + offset;
}

/** Confirmed records only, UTC occurrence descending, stable ID descending on ties. */
export function projectAreaCollections(rows: readonly AreaCollectionSource[]): AreaCollectionItem[] {
  return rows.filter(row => row.occurredAt && row.confirmedAt && row.occurrenceOffset && row.confirmationKey)
    .sort((a, b) => {
      const diff = b.occurredAt!.getTime() - a.occurredAt!.getTime();
      return diff || (a.id < b.id ? 1 : a.id > b.id ? -1 : 0);
    })
    .map(row => {
      const diagnosis = row.currentExperimentalIHFRDiagnosis?.diagnosis ?? null;
      if (diagnosis && diagnosis.scientificState !== "EXPERIMENTAL") {
        throw new TypeError("INVALID_EXPERIMENTAL_DIAGNOSIS_STATE");
      }
      return {
        id: row.id,
        occurredAt: occurrenceWithOriginalOffset(row.occurredAt!, row.occurrenceOffset!),
        occurredAtUtc: row.occurredAt!.toISOString(),
        confirmedAt: row.confirmedAt!.toISOString(),
        // Only the server-owned CURRENT pointer is considered. Never infer current from calculatedAt.
        currentDiagnosis: diagnosis
          ? { id: diagnosis.id, displayScore: diagnosis.displayScore.toString(), ihfrClass: diagnosis.ihfrClass }
          : null,
      };
    });
}

/** INFERENCIA UI-02: first current diagnosis among collections ordered by field occurrence. */
export function latestAvailableDiagnosis(rows: readonly AreaCollectionItem[]): AreaCollectionItem | null {
  return rows.find(row => row.currentDiagnosis !== null) ?? null;
}
