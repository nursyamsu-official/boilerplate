"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  ssoProviderDeleteSchema,
  ssoProviderUpdateSchema,
} from "../schemas/sso-provider-create.schema";
import { ssoProviderGetByIdService } from "../services/sso-provider-get-by-id.service";
import { ssoProviderUpdateService } from "../services/sso-provider-update.service";

export async function ssoProviderUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoProviderUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid SSO provider data");
  }

  return ssoProviderUpdateService(parsed.data);
}

export async function ssoProviderGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoProviderDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid provider id");
  }

  return ssoProviderGetByIdService(parsed.data.id);
}
