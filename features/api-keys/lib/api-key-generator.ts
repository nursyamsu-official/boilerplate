import { createHash, randomBytes } from "crypto";

export function slugifyApiKeyPrefix(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return slug.slice(0, 20) || "abn";
}

export function generateApiKey(name: string) {
  const prefix = slugifyApiKeyPrefix(name);
  const randomPart = randomBytes(32).toString("hex");
  const rawKey = `${prefix}_${randomPart}`;
  const hashedKey = createHash("sha256").update(rawKey).digest("hex");

  return { rawKey, hashedKey, prefix };
}

export function hashApiKey(rawKey: string) {
  return createHash("sha256").update(rawKey).digest("hex");
}
