/** Pure guards/statistics for the manual local investigation; no environment loading or I/O. */
export class LocalReadinessError extends Error {
  constructor(public readonly code: string) { super(code); }
}

export function assertLocalReadinessEnvironment(env: Record<string, string | undefined>) {
  const refuse = () => { throw new LocalReadinessError("LOCAL_ENVIRONMENT_REFUSED"); };
  if (env.NODE_ENV !== "test" || env.ACCOUNTS_LOCAL_POSTGRESQL !== "1" || env.IMP006_LOCAL_POSTGRESQL !== "1" ||
      env.IMP006_DATABASE_VARIABLE !== "TEST_DATABASE_URL" || env.TEST_DATABASE_CONFIRMATION !== "HIDROFLORESTAS_AUTH_TEST" ||
      env.HF_LOCAL_READINESS_CONFIRMATION !== "HIDROFLORESTAS_LOCAL_READINESS_20261025" || !env.LOCALAPPDATA) refuse();
  for (const name of ["ACCOUNTS_LOCAL_APP", "IMP006_TEST_SCHEMA", "IMP006_LOCAL_REGRESSION_PUBLIC", "PLAYWRIGHT_BASE_URL", "DOTENV_CONFIG_PATH"]) {
    if (env[name] !== undefined) refuse();
  }
  if (env.CI || env.GITHUB_ACTIONS) refuse();
  for (const name of Object.keys(env)) {
    if ((name.startsWith("SMTP_") || name.startsWith("CLOUDINARY_") ||
        ["MAIL_FROM", "MAIL_SMOKE_CONFIRMATION", "MAIL_SMOKE_RECIPIENT", "MAIL_SMOKE_ALLOWED_RECIPIENT"].includes(name)) && env[name]) refuse();
  }
  for (const name of ["TEST_DATABASE_URL", "DATABASE_URL"]) {
    let url: URL;
    try { url = new URL(env[name] ?? ""); } catch { return refuse(); }
    if (!["postgres:", "postgresql:"].includes(url.protocol) || url.hostname !== "127.0.0.1" ||
        url.port !== "55427" || url.pathname !== "/postgres" || url.username !== "accounts_owner" || !url.password || url.search || url.hash) refuse();
  }
  let tiles: URL;
  try { tiles = new URL(env.NEXT_PUBLIC_MAP_TILE_URL ?? ""); } catch { return refuse(); }
  if (tiles.protocol !== "https:" || tiles.hostname !== "127.0.0.1" || tiles.port !== "1" || tiles.username || tiles.password) refuse();
}

export function nearestRank(samples: readonly number[], percentile: number) {
  if (!samples.length || samples.some(value => !Number.isFinite(value) || value < 0) ||
      !Number.isFinite(percentile) || percentile <= 0 || percentile > 100) throw new LocalReadinessError("INVALID_MEASUREMENT");
  const ordered = [...samples].sort((left, right) => left - right);
  return ordered[Math.ceil(percentile / 100 * ordered.length) - 1];
}

/** Verify parent associations independently of the response's own hrefs. */
export function assertExpectedCollections(
  areas: ReadonlyArray<{ id: string; confirmedCollections: ReadonlyArray<{ id: string }> }>,
  expected: ReadonlyMap<string, ReadonlySet<string>>,
) {
  if (areas.length !== expected.size || new Set(areas.map(area => area.id)).size !== expected.size) {
    throw new LocalReadinessError("COLLECTION_ASSOCIATION_MISMATCH");
  }
  for (const area of areas) {
    const collections = expected.get(area.id);
    const ids = area.confirmedCollections.map(item => item.id);
    if (!collections || ids.length !== collections.size || new Set(ids).size !== collections.size || ids.some(id => !collections.has(id))) {
      throw new LocalReadinessError("COLLECTION_ASSOCIATION_MISMATCH");
    }
  }
}

const numericPlanFields = new Set([
  "Startup Cost", "Total Cost", "Plan Rows", "Plan Width", "Actual Startup Time", "Actual Total Time", "Actual Rows", "Actual Loops",
  "Shared Hit Blocks", "Shared Read Blocks", "Shared Dirtied Blocks", "Shared Written Blocks", "Local Hit Blocks", "Local Read Blocks",
  "Local Dirtied Blocks", "Local Written Blocks", "Temp Read Blocks", "Temp Written Blocks", "I/O Read Time", "I/O Write Time",
  "Planning Time", "Execution Time", "Rows Removed by Filter", "Rows Removed by Join Filter", "Workers Planned", "Workers Launched",
  "Worker Number", "Sort Space Used", "Peak Memory Usage", "Hash Buckets", "Original Hash Buckets", "Hash Batches", "Original Hash Batches",
]);
const structuralPlanFields = new Set([
  "Node Type", "Parent Relationship", "Join Type", "Strategy", "Partial Mode", "Operation", "Relation Name", "Index Name",
  "Scan Direction", "Sort Method", "Sort Space Type",
]);
const booleanPlanFields = new Set(["Parallel Aware", "Async Capable", "Inner Unique", "Single Copy"]);

/** Closed projection: conditions, output expressions, SQL and parameters never enter the receipt. */
export function publicExplainPlan(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(publicExplainPlan);
  if (!value || typeof value !== "object") return null;
  const safe: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    if (["Plan", "Plans", "Planning", "Workers"].includes(key) && item && typeof item === "object") safe[key] = publicExplainPlan(item);
    else if (numericPlanFields.has(key) && typeof item === "number" && Number.isFinite(item)) safe[key] = item;
    else if (structuralPlanFields.has(key) && typeof item === "string") safe[key] = item;
    else if (booleanPlanFields.has(key) && typeof item === "boolean") safe[key] = item;
  }
  return safe;
}
