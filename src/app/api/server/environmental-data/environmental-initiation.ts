import { createHmac, timingSafeEqual } from "node:crypto";
import { readJwtSecret } from "@/app/api/server/auth/session";

// A principal-continuity guard for server-rendered environmental forms, not an access token.
// Existing services continue checking authentication, permissions and per-user ownership.
const PURPOSE = "hidroflorestas:environmental:initiator:v1:";

export function makeEnvironmentalInitiatorProof(userId: string, secret = readJwtSecret()): string {
  if (typeof userId !== "string" || userId.length === 0) throw new Error("INVALID_ENVIRONMENTAL_INITIATOR");
  return createHmac("sha256", secret).update(PURPOSE).update(userId).digest("hex");
}

export function matchesEnvironmentalInitiatorProof(proof: string, userId: string, secret = readJwtSecret()): boolean {
  if (typeof proof !== "string" || !/^[0-9a-f]{64}$/.test(proof)) return false;
  const actual = Buffer.from(proof, "hex");
  const expected = Buffer.from(makeEnvironmentalInitiatorProof(userId, secret), "hex");
  return timingSafeEqual(actual, expected);
}
