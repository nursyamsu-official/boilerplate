import type { SsoProviderDetail, SsoProviderFormValues } from "../types/sso-provider.type";

export const defaultSsoProviderFormValues: SsoProviderFormValues = {
  code: "",
  name: "",
  protocol: "OIDC",
  clientId: "",
  clientSecret: "",
  issuerUrl: "",
  authUrl: "",
  tokenUrl: "",
  userinfoUrl: "",
  callbackUrl: "",
  scopes: "",
  metadata: "",
  isActive: true,
  autoProvision: false,
  defaultRoleId: "",
};

export function mapSsoProviderDetailToFormValues(
  detail: SsoProviderDetail,
): SsoProviderFormValues {
  return {
    code: detail.code,
    name: detail.name,
    protocol: detail.protocol,
    clientId: detail.clientId ?? "",
    clientSecret: "",
    issuerUrl: detail.issuerUrl ?? "",
    authUrl: detail.authUrl ?? "",
    tokenUrl: detail.tokenUrl ?? "",
    userinfoUrl: detail.userinfoUrl ?? "",
    callbackUrl: detail.callbackUrl ?? "",
    scopes: detail.scopes ?? "",
    metadata: detail.metadata ?? "",
    isActive: detail.isActive,
    autoProvision: detail.autoProvision,
    defaultRoleId: detail.defaultRoleId ?? "",
  };
}
