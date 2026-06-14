"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { emailSettingCreateSchema } from "../schemas/email-setting-create.schema";
import { emailSettingCreateService } from "../services/email-setting-create.service";

export async function emailSettingCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailSettingCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid email setting data");
  }

  return emailSettingCreateService(parsed.data);
}
