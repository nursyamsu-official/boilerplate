import { randomBytes, createHash } from "crypto";

export function hashEmailChangeToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function generateEmailChangeToken(): { raw: string; hashed: string } {
  const raw = randomBytes(32).toString("hex");
  const hashed = hashEmailChangeToken(raw);
  return { raw, hashed };
}
