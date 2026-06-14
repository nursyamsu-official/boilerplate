import type { SsoUserDetail, SsoUserFormValues } from "../types/sso-user.type";

export const defaultSsoUserFormValues: SsoUserFormValues = {
  userId: "",
  providerId: "",
  externalId: "",
  emailAtProvider: "",
  displayName: "",
  rawProfile: "",
};

export function mapSsoUserDetailToFormValues(
  detail: SsoUserDetail,
): SsoUserFormValues {
  return {
    userId: detail.userId,
    providerId: detail.providerId,
    externalId: detail.externalId,
    emailAtProvider: detail.emailAtProvider ?? "",
    displayName: detail.displayName ?? "",
    rawProfile: detail.rawProfile ?? "",
  };
}
