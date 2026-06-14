"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { ssoProviderCreateSchema } from "../schemas/sso-provider-create.schema";
import { ssoProviderCreateService } from "../services/sso-provider-create.service";

export async function ssoProviderCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoProviderCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid SSO provider data");
  }

  return ssoProviderCreateService(parsed.data);
}
