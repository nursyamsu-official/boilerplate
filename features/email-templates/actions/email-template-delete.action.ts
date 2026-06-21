"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { emailTemplateDeleteSchema } from "../schemas/email-template-create.schema";
import { emailTemplateDeleteService } from "../services/email-template-delete.service";
import { emailTemplateToggleStatusService } from "../services/email-template-update.service";

export async function emailTemplateDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof emailTemplateDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = emailTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid template id" };
  }

  return runAction(() => emailTemplateDeleteService(parsed.data.id));
}

export async function emailTemplateToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid template id");
  }

  return emailTemplateToggleStatusService(parsed.data.id);
}
