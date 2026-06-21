"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { emailTemplateCreateSchema } from "../schemas/email-template-create.schema";
import { emailTemplateCreateService } from "../services/email-template-create.service";

export async function emailTemplateCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof emailTemplateCreateService>>>
> {
  await requireSessionUserId();

  const parsed = emailTemplateCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid template data" };
  }

  return runAction(() => emailTemplateCreateService(parsed.data));
}
