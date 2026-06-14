import type { SsoProviderFormValues } from "../types/sso-provider.type";

export function mapFormValuesToSsoProviderCreateInput(
  values: SsoProviderFormValues,
) {
  return values;
}

export function mapFormValuesToSsoProviderUpdateInput(
  id: string,
  values: SsoProviderFormValues,
) {
  return { id, ...values };
}
