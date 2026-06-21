"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  emailTemplateDeleteSchema,
  emailTemplateUpdateSchema,
} from "../schemas/email-template-create.schema";
import { emailTemplateGetByIdService } from "../services/email-template-get-by-id.service";
import { emailTemplateUpdateService } from "../services/email-template-update.service";

export async function emailTemplateUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof emailTemplateUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = emailTemplateUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid template data" };
  }

  return runAction(() => emailTemplateUpdateService(parsed.data));
}

export async function emailTemplateGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid template id");
  }

  return emailTemplateGetByIdService(parsed.data.id);
}
