import {
  ssoProviderGetByCodeRepository,
  ssoProviderGetByIdRepository,
} from "../repositories/sso-provider-create.repository";
import {
  ssoProviderToggleStatusRepository,
  ssoProviderUpdateRepository,
} from "../repositories/sso-provider-update.repository";
import type { SsoProviderUpdateInput } from "../schemas/sso-provider-create.schema";

export async function ssoProviderUpdateService(input: SsoProviderUpdateInput) {
  const existing = await ssoProviderGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("SSO provider not found");
  }

  if (input.code !== existing.code) {
    const duplicate = await ssoProviderGetByCodeRepository(input.code);
    if (duplicate && duplicate.id !== input.id) {
      throw new Error("Provider code already exists");
    }
  }

  const { clientSecret, ...rest } = input;

  return ssoProviderUpdateRepository({
    ...rest,
    ...(clientSecret ? { clientSecret } : {}),
  });
}

export async function ssoProviderToggleStatusService(id: string) {
  const result = await ssoProviderToggleStatusRepository(id);
  if (!result) {
    throw new Error("SSO provider not found");
  }

  return result;
}
