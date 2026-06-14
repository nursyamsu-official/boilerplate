"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { emailTemplateCreateSchema } from "../schemas/email-template-create.schema";
import { emailTemplateCreateService } from "../services/email-template-create.service";

export async function emailTemplateCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailTemplateCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid template data");
  }

  return emailTemplateCreateService(parsed.data);
}
