import {
  ssoUserCreateRepository,
  ssoUserFindByProviderExternalRepository,
} from "../repositories/sso-user-create.repository";
import type { SsoUserCreateInput } from "../schemas/sso-user-create.schema";

export async function ssoUserCreateService(input: SsoUserCreateInput) {
  const existing = await ssoUserFindByProviderExternalRepository(
    input.providerId,
    input.externalId,
  );

  if (existing) {
    throw new Error("This external ID is already linked to the provider");
  }

  return ssoUserCreateRepository(input);
}
