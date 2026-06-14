import { emailTemplateListRepository } from "../repositories/email-template-list.repository";

export async function emailTemplateGetListService(
  filters: Parameters<typeof emailTemplateListRepository>[0],
) {
  return emailTemplateListRepository(filters);
}
