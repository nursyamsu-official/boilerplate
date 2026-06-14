"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  emailTemplateDeleteSchema,
  emailTemplateUpdateSchema,
} from "../schemas/email-template-create.schema";
import { emailTemplateGetByIdService } from "../services/email-template-get-by-id.service";
import { emailTemplateUpdateService } from "../services/email-template-update.service";

export async function emailTemplateUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailTemplateUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid template data");
  }

  return emailTemplateUpdateService(parsed.data);
}

export async function emailTemplateGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = emailTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid template id");
  }

  return emailTemplateGetByIdService(parsed.data.id);
}
