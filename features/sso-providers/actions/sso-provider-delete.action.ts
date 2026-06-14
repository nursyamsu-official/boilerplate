"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { ssoProviderDeleteSchema } from "../schemas/sso-provider-create.schema";
import { ssoProviderDeleteService } from "../services/sso-provider-delete.service";
import { ssoProviderToggleStatusService } from "../services/sso-provider-update.service";

export async function ssoProviderDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoProviderDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid provider id");
  }

  return ssoProviderDeleteService(parsed.data.id);
}

export async function ssoProviderToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoProviderDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid provider id");
  }

  return ssoProviderToggleStatusService(parsed.data.id);
}
