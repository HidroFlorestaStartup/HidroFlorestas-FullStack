import { createHash } from "node:crypto";

/** Accept only the same SQL bytes or the platform's LF/CRLF representation. */
export function matchesAppliedMigration(source: Buffer, checksum: string): boolean {
  const hash = (value: Buffer | string) => createHash("sha256").update(value).digest("hex");
  if (hash(source) === checksum) return true;
  const text = source.toString("utf8");
  if (!Buffer.from(text, "utf8").equals(source)) return false;
  const lf = text.replace(/\r\n/g, "\n");
  return hash(lf) === checksum || hash(lf.replace(/\n/g, "\r\n")) === checksum;
}
