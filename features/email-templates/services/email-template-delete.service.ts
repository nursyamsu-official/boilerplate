import { emailTemplateGetByIdRepository } from "../repositories/email-template-create.repository";
import {
  emailTemplateDeleteRepository,
  emailTemplateLogCountRepository,
} from "../repositories/email-template-delete.repository";

export async function emailTemplateDeleteService(id: string) {
  const template = await emailTemplateGetByIdRepository(id);
  if (!template) {
    throw new Error("Email template not found");
  }

  if (template.isSystem) {
    throw new Error("System templates cannot be deleted");
  }

  const logCount = await emailTemplateLogCountRepository(id);
  if (logCount > 0) {
    throw new Error("Cannot delete template with existing email logs");
  }

  return emailTemplateDeleteRepository(id);
}
