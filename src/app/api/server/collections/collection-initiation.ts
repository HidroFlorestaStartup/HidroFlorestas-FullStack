import { createHmac, timingSafeEqual } from "node:crypto";
import { readJwtSecret } from "@/app/api/server/auth/session";

// A presentation-level principal continuity guard, not an authorization token.
// The API continues to authorize and scope idempotency by its current principal.
const PURPOSE = "hidroflorestas:collections:initiator:v1:";

export function makeCollectionInitiatorProof(userId: string, secret = readJwtSecret()): string {
  if (typeof userId !== "string" || userId.length === 0) throw new Error("INVALID_COLLECTION_INITIATOR");
  return createHmac("sha256", secret).update(PURPOSE).update(userId).digest("hex");
}

export function matchesCollectionInitiatorProof(proof: string, userId: string, secret = readJwtSecret()): boolean {
  if (typeof proof !== "string" || !/^[0-9a-f]{64}$/.test(proof)) return false;
  const actual = Buffer.from(proof, "hex");
  const expected = Buffer.from(makeCollectionInitiatorProof(userId, secret), "hex");
  return timingSafeEqual(actual, expected);
}
