import { ssoProviderOptionsRepository } from "../repositories/sso-provider-create.repository";

export async function ssoProviderOptionsService() {
  return ssoProviderOptionsRepository();
}

export type { SsoProviderOption } from "../types/sso-provider.type";
