"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { emailSettingDeleteSchema } from "../schemas/email-setting-create.schema";
import { emailSettingDeleteService } from "../services/email-setting-delete.service";
import {
  emailSettingSetDefaultService,
  emailSettingToggleStatusService,
} from "../services/email-setting-update.service";

export async function emailSettingDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof emailSettingDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = emailSettingDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid setting id" };
  }

  return runAction(() => emailSettingDeleteService(parsed.data.id));
}

export async function emailSettingToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailSettingDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid setting id");
  }

  return emailSettingToggleStatusService(parsed.data.id);
}

export async function emailSettingSetDefaultAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailSettingDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid setting id");
  }

  return emailSettingSetDefaultService(parsed.data.id);
}
