import {
  emailTemplateGetByCodeRepository,
  emailTemplateGetByIdRepository,
} from "../repositories/email-template-create.repository";
import {
  emailTemplateToggleStatusRepository,
  emailTemplateUpdateRepository,
} from "../repositories/email-template-update.repository";
import type { EmailTemplateUpdateInput } from "../schemas/email-template-create.schema";

export async function emailTemplateUpdateService(
  input: EmailTemplateUpdateInput,
) {
  const template = await emailTemplateGetByIdRepository(input.id);
  if (!template) {
    throw new Error("Email template not found");
  }

  if (template.isSystem && template.code !== input.code) {
    throw new Error("System template code cannot be changed");
  }

  const existing = await emailTemplateGetByCodeRepository(input.code);
  if (existing && existing.id !== input.id) {
    throw new Error("Template code already exists");
  }

  return emailTemplateUpdateRepository(input);
}

export async function emailTemplateToggleStatusService(id: string) {
  const template = await emailTemplateGetByIdRepository(id);
  if (!template) {
    throw new Error("Email template not found");
  }

  const result = await emailTemplateToggleStatusRepository(id);
  if (!result) {
    throw new Error("Email template not found");
  }

  return result;
}
