"use server";

import { executeEmailChangeVerification } from "../lib/verify-email-change";

export type VerifyEmailChangeResult =
  | { ok: true }
  | { ok: false; message: string };

export async function verifyEmailChange(
  token: string,
): Promise<VerifyEmailChangeResult> {
  return executeEmailChangeVerification(token);
}
