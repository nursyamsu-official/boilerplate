"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  ssoUserDeleteSchema,
  ssoUserUpdateSchema,
} from "../schemas/sso-user-create.schema";
import { ssoUserGetByIdService } from "../services/sso-user-get-by-id.service";
import { ssoUserUpdateService } from "../services/sso-user-update.service";

export async function ssoUserUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof ssoUserUpdateService>>>> {
  await requireSessionUserId();

  const parsed = ssoUserUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid SSO user data" };
  }

  return runAction(() => ssoUserUpdateService(parsed.data));
}

export async function ssoUserGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoUserDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid SSO user link id");
  }

  return ssoUserGetByIdService(parsed.data.id);
}
