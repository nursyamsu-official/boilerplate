import { ssoProviderListRepository } from "../repositories/sso-provider-list.repository";
import type { SsoProviderListFilters } from "../types/sso-provider.type";

export async function ssoProviderGetListService(filters: SsoProviderListFilters) {
  return ssoProviderListRepository(filters);
}
