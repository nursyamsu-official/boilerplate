import { ssoProviderDeleteRepository } from "../repositories/sso-provider-delete.repository";
import { ssoProviderGetByIdRepository } from "../repositories/sso-provider-create.repository";

export async function ssoProviderDeleteService(id: string) {
  const existing = await ssoProviderGetByIdRepository(id);
  if (!existing) {
    throw new Error("SSO provider not found");
  }

  return ssoProviderDeleteRepository(id);
}
