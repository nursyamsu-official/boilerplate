import { emailTemplateGetByIdRepository } from "../repositories/email-template-create.repository";
import type { EmailTemplateDetail } from "../types/email-template.type";

export async function emailTemplateGetByIdService(
  id: string,
): Promise<EmailTemplateDetail> {
  const template = await emailTemplateGetByIdRepository(id);
  if (!template) {
    throw new Error("Email template not found");
  }

  return template;
}
