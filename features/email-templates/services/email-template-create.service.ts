import {
  emailTemplateCreateRepository,
  emailTemplateGetByCodeRepository,
} from "../repositories/email-template-create.repository";
import type { EmailTemplateCreateInput } from "../schemas/email-template-create.schema";

export async function emailTemplateCreateService(
  input: EmailTemplateCreateInput,
) {
  const existing = await emailTemplateGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Template code already exists");
  }

  return emailTemplateCreateRepository(input);
}
