import {
  ssoProviderCreateRepository,
  ssoProviderGetByCodeRepository,
} from "../repositories/sso-provider-create.repository";
import type { SsoProviderCreateInput } from "../schemas/sso-provider-create.schema";

export async function ssoProviderCreateService(input: SsoProviderCreateInput) {
  const existing = await ssoProviderGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Provider code already exists");
  }

  return ssoProviderCreateRepository(input);
}
