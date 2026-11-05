/** Collection is one Playwright test: a case rejection never restarts its worker. */
export const FOCAL_DOMAIN_IDS = [
  "domain-area-empty-320-900-200", "domain-area-empty-667-375-200", "domain-area-empty-844-390-200",
] as const;
export function selectDomainCases<T extends { id: string }>(cases: T[], caseSet: string | undefined): T[] {
  if (caseSet !== "focal-3" && caseSet !== "complete-75") throw new Error("DOMAIN_EXPLICIT_CASE_SET_REQUIRED");
  if (cases.length !== 75 || new Set(cases.map(c => c.id)).size !== 75) throw new Error("DOMAIN_MATRIX_REQUIRES_75_UNIQUE_IDS");
  if (!FOCAL_DOMAIN_IDS.every(id => cases.some(c => c.id === id))) throw new Error("DOMAIN_FOCAL_CASE_MISSING");
  return caseSet === "complete-75" ? [...cases] : FOCAL_DOMAIN_IDS.map(id => cases.find(c => c.id === id)!);
}

/** Await owned cancellation before another source/case starts. No detached retry. */
export async function withOwnedSourceBudget<T>(operation: () => Promise<T>, milliseconds: number, closeOwnedContext: () => Promise<void>, cleanupMilliseconds = 5_000): Promise<T> {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) throw new Error("DOMAIN_INVALID_SOURCE_BUDGET");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("DOMAIN_SOURCE_BUDGET_EXHAUSTED")), milliseconds);
  });
  try { return await Promise.race([Promise.resolve().then(operation), deadline]); }
  catch (error) {
    if (error instanceof Error && error.message === "DOMAIN_SOURCE_BUDGET_EXHAUSTED") {
      let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
      try {
        await Promise.race([Promise.resolve().then(closeOwnedContext),new Promise<never>((_,reject)=>{
          cleanupTimer=setTimeout(()=>reject(new Error("DOMAIN_OWNED_CONTEXT_CLOSE_TIMEOUT")),cleanupMilliseconds);
        })]);
      } catch { throw new Error("DOMAIN_OWNED_CONTEXT_CLOSE_FAILED"); }
      finally { clearTimeout(cleanupTimer); }
    }
    throw error;
  } finally { clearTimeout(timer); }
}

export async function collectDomainCases<T>(cases: T[], execute: (c: T) => Promise<void>, recordUnexpectedFailure: (c: T) => Promise<void>) {
  for (const c of cases) {
    try { await execute(c); }
    catch { await recordUnexpectedFailure(c); }
  }
}

/** Source metadata, never raw font presence alone, governs evidence qualification. */
export function classifyDomainPair(sampleCount: number, errors: string[], metadata: Array<{ comparability?: string }>, requested = "COMPARABLE") {
  const pairComplete = sampleCount === 2 && metadata.length === 2;
  const insufficient = !pairComplete || metadata.some(entry=>!["COMPARABLE","NON_EQUIVALENT"].includes(entry.comparability??""));
  const nonEquivalent = metadata.some(entry=>entry.comparability === "NON_EQUIVALENT");
  return {execution: !pairComplete || errors.length ? "FAIL" : "PASS",
    comparability: insufficient ? "INSUFFICIENT_EVIDENCE" : nonEquivalent ? "NON_EQUIVALENT" : requested,
    completeness: !pairComplete || errors.length ? "PARTIAL" : "COMPLETE"};
}
