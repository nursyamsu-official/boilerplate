"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { ssoUserCreateSchema } from "../schemas/sso-user-create.schema";
import { ssoUserCreateService } from "../services/sso-user-create.service";

export async function ssoUserCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof ssoUserCreateService>>>> {
  await requireSessionUserId();

  const parsed = ssoUserCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid SSO user data" };
  }

  return runAction(() => ssoUserCreateService(parsed.data));
}
