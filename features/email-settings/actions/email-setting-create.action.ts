"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { emailSettingCreateSchema } from "../schemas/email-setting-create.schema";
import { emailSettingCreateService } from "../services/email-setting-create.service";

export async function emailSettingCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof emailSettingCreateService>>>> {
  await requireSessionUserId();

  const parsed = emailSettingCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid email setting data" };
  }

  return runAction(() => emailSettingCreateService(parsed.data));
}
