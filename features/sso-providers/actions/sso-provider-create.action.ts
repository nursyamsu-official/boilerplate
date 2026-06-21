"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { ssoProviderCreateSchema } from "../schemas/sso-provider-create.schema";
import { ssoProviderCreateService } from "../services/sso-provider-create.service";

export async function ssoProviderCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof ssoProviderCreateService>>>> {
  await requireSessionUserId();

  const parsed = ssoProviderCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid SSO provider data" };
  }

  return runAction(() => ssoProviderCreateService(parsed.data));
}
