import { emailLogListRepository } from "../repositories/email-log-list.repository";

export async function emailLogGetListService(
  filters: Parameters<typeof emailLogListRepository>[0],
) {
  return emailLogListRepository(filters);
}
