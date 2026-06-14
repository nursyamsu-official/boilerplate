"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  ssoUserDeleteSchema,
  ssoUserUpdateSchema,
} from "../schemas/sso-user-create.schema";
import { ssoUserGetByIdService } from "../services/sso-user-get-by-id.service";
import { ssoUserUpdateService } from "../services/sso-user-update.service";

export async function ssoUserUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoUserUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid SSO user data");
  }

  return ssoUserUpdateService(parsed.data);
}

export async function ssoUserGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoUserDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid SSO user link id");
  }

  return ssoUserGetByIdService(parsed.data.id);
}
