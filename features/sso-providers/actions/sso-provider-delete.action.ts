"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { ssoProviderDeleteSchema } from "../schemas/sso-provider-create.schema";
import { ssoProviderDeleteService } from "../services/sso-provider-delete.service";
import { ssoProviderToggleStatusService } from "../services/sso-provider-update.service";

export async function ssoProviderDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof ssoProviderDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = ssoProviderDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid provider id" };
  }

  return runAction(() => ssoProviderDeleteService(parsed.data.id));
}

export async function ssoProviderToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoProviderDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid provider id");
  }

  return ssoProviderToggleStatusService(parsed.data.id);
}
