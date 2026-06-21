"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { ssoUserDeleteSchema } from "../schemas/sso-user-create.schema";
import { ssoUserDeleteService } from "../services/sso-user-delete.service";

export async function ssoUserDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof ssoUserDeleteService>>>> {
  await requireSessionUserId();

  const parsed = ssoUserDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid SSO user link id" };
  }

  return runAction(() => ssoUserDeleteService(parsed.data.id));
}
