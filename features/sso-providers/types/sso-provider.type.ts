import type { SsoProviderFilterInput } from "../schemas/sso-provider-filter.schema";

export type SsoProtocolValue = "OIDC" | "SAML" | "OAUTH2";

export type SsoProviderTableRow = {
  id: string;
  code: string;
  name: string;
  protocol: SsoProtocolValue;
  isActive: boolean;
  autoProvision: boolean;
  defaultRoleId: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    userLinks: number;
  };
};

export type SsoProviderListResult = {
  items: SsoProviderTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type SsoProviderDetail = {
  id: string;
  code: string;
  name: string;
  protocol: SsoProtocolValue;
  clientId: string | null;
  issuerUrl: string | null;
  authUrl: string | null;
  tokenUrl: string | null;
  userinfoUrl: string | null;
  callbackUrl: string | null;
  scopes: string | null;
  metadata: string | null;
  isActive: boolean;
  autoProvision: boolean;
  defaultRoleId: string | null;
  hasClientSecret: boolean;
};

export type SsoProviderFormValues = {
  code: string;
  name: string;
  protocol: SsoProtocolValue;
  clientId: string;
  clientSecret: string;
  issuerUrl: string;
  authUrl: string;
  tokenUrl: string;
  userinfoUrl: string;
  callbackUrl: string;
  scopes: string;
  metadata: string;
  isActive: boolean;
  autoProvision: boolean;
  defaultRoleId: string;
};

export type SsoProviderListFilters = SsoProviderFilterInput;

export type SsoProviderOption = {
  id: string;
  code: string;
  name: string;
};
