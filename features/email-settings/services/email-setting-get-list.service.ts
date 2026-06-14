import { emailSettingListRepository } from "../repositories/email-setting-list.repository";

export async function emailSettingGetListService(
  filters: Parameters<typeof emailSettingListRepository>[0],
) {
  return emailSettingListRepository(filters);
}
