import {
  ssoProviderGetByIdRepository,
} from "../repositories/sso-provider-create.repository";
import type { SsoProviderDetail } from "../types/sso-provider.type";

export async function ssoProviderGetByIdService(
  id: string,
): Promise<SsoProviderDetail> {
  const provider = await ssoProviderGetByIdRepository(id);
  if (!provider) {
    throw new Error("SSO provider not found");
  }

  const { clientSecret, ...rest } = provider;

  return {
    ...rest,
    hasClientSecret: Boolean(clientSecret),
  };
}
