"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  emailSettingDeleteSchema,
  emailSettingUpdateSchema,
} from "../schemas/email-setting-create.schema";
import { emailSettingGetByIdService } from "../services/email-setting-get-by-id.service";
import { emailSettingUpdateService } from "../services/email-setting-update.service";

export async function emailSettingUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailSettingUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid email setting data");
  }

  return emailSettingUpdateService(parsed.data);
}

export async function emailSettingGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailSettingDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid setting id");
  }

  return emailSettingGetByIdService(parsed.data.id);
}
