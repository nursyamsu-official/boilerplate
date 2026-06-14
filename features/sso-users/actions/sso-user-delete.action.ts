"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { ssoUserDeleteSchema } from "../schemas/sso-user-create.schema";
import { ssoUserDeleteService } from "../services/sso-user-delete.service";

export async function ssoUserDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = ssoUserDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid SSO user link id");
  }

  return ssoUserDeleteService(parsed.data.id);
}
