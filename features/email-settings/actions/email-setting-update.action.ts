"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  emailSettingDeleteSchema,
  emailSettingUpdateSchema,
} from "../schemas/email-setting-create.schema";
import { emailSettingGetByIdService } from "../services/email-setting-get-by-id.service";
import { emailSettingUpdateService } from "../services/email-setting-update.service";

export async function emailSettingUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof emailSettingUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = emailSettingUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid email setting data" };
  }

  return runAction(() => emailSettingUpdateService(parsed.data));
}

export async function emailSettingGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailSettingDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid setting id");
  }

  return emailSettingGetByIdService(parsed.data.id);
}
