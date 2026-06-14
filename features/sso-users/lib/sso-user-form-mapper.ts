import type { SsoUserFormValues } from "../types/sso-user.type";

export function mapFormValuesToSsoUserCreateInput(values: SsoUserFormValues) {
  return values;
}

export function mapFormValuesToSsoUserUpdateInput(
  id: string,
  values: SsoUserFormValues,
) {
  return { id, ...values };
}
