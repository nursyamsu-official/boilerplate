import {
  ssoUserFindByProviderExternalRepository,
  ssoUserGetByIdRepository,
} from "../repositories/sso-user-create.repository";
import { ssoUserUpdateRepository } from "../repositories/sso-user-update.repository";
import type { SsoUserUpdateInput } from "../schemas/sso-user-create.schema";

export async function ssoUserUpdateService(input: SsoUserUpdateInput) {
  const existing = await ssoUserGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("SSO user link not found");
  }

  if (
    input.providerId !== existing.providerId ||
    input.externalId !== existing.externalId
  ) {
    const duplicate = await ssoUserFindByProviderExternalRepository(
      input.providerId,
      input.externalId,
    );

    if (duplicate && duplicate.id !== input.id) {
      throw new Error("This external ID is already linked to the provider");
    }
  }

  return ssoUserUpdateRepository(input);
}
