import { ssoUserListRepository } from "../repositories/sso-user-list.repository";
import type { SsoUserListFilters } from "../types/sso-user.type";

export async function ssoUserGetListService(filters: SsoUserListFilters) {
  return ssoUserListRepository(filters);
}
