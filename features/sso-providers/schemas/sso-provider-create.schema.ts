import { z } from "zod";

import { ssoProtocolValues } from "./sso-provider-filter.schema";

function parseOptionalJson(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  JSON.parse(trimmed);
  return trimmed;
}

function optionalUrlField(message: string) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || z.string().url().safeParse(value).success, {
      message,
    })
    .optional()
    .or(z.literal(""));
}

const ssoProviderFormFieldsBase = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code is required")
    .max(100, "Code must be at most 100 characters")
    .regex(
      /^[a-z0-9_-]+$/,
      "Code must use lowercase letters, numbers, hyphens, or underscores",
    ),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),
  protocol: z.enum(ssoProtocolValues),
  clientId: z.string().trim().max(255).optional().or(z.literal("")),
  clientSecret: z.string().optional().or(z.literal("")),
  issuerUrl: optionalUrlField("Issuer URL must be valid"),
  authUrl: optionalUrlField("Auth URL must be valid"),
  tokenUrl: optionalUrlField("Token URL must be valid"),
  userinfoUrl: optionalUrlField("Userinfo URL must be valid"),
  callbackUrl: optionalUrlField("Callback URL must be valid"),
  scopes: z.string().trim().max(500).optional().or(z.literal("")),
  metadata: z.string().optional().or(z.literal("")),
  isActive: z.boolean(),
  autoProvision: z.boolean(),
  defaultRoleId: z.string().optional().or(z.literal("")),
});

function refineProtocolRequirements(
  values: z.infer<typeof ssoProviderFormFieldsBase>,
  ctx: z.RefinementCtx,
) {
  if (values.protocol === "OIDC") {
    if (!values.issuerUrl?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Issuer URL is required for OIDC",
        path: ["issuerUrl"],
      });
    }
    if (!values.clientId?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Client ID is required for OIDC",
        path: ["clientId"],
      });
    }
  }

  if (values.protocol === "OAUTH2") {
    if (!values.authUrl?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Auth URL is required for OAuth2",
        path: ["authUrl"],
      });
    }
    if (!values.tokenUrl?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Token URL is required for OAuth2",
        path: ["tokenUrl"],
      });
    }
    if (!values.clientId?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Client ID is required for OAuth2",
        path: ["clientId"],
      });
    }
  }

  if (values.protocol === "SAML") {
    if (!values.issuerUrl?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Issuer URL is required for SAML",
        path: ["issuerUrl"],
      });
    }
  }

  try {
    parseOptionalJson(values.metadata);
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Metadata must be valid JSON",
      path: ["metadata"],
    });
  }
}

export const ssoProviderFormFieldsSchema = ssoProviderFormFieldsBase.superRefine(
  refineProtocolRequirements,
);

export const ssoProviderUpdateFormFieldsSchema =
  ssoProviderFormFieldsBase.superRefine(refineProtocolRequirements);

function mapSsoProviderFormValues(
  values: z.infer<typeof ssoProviderFormFieldsBase>,
) {
  return {
    code: values.code,
    name: values.name,
    protocol: values.protocol,
    clientId: values.clientId?.trim() ? values.clientId.trim() : null,
    clientSecret: values.clientSecret?.trim()
      ? values.clientSecret.trim()
      : null,
    issuerUrl: values.issuerUrl?.trim() ? values.issuerUrl.trim() : null,
    authUrl: values.authUrl?.trim() ? values.authUrl.trim() : null,
    tokenUrl: values.tokenUrl?.trim() ? values.tokenUrl.trim() : null,
    userinfoUrl: values.userinfoUrl?.trim() ? values.userinfoUrl.trim() : null,
    callbackUrl: values.callbackUrl?.trim() ? values.callbackUrl.trim() : null,
    scopes: values.scopes?.trim() ? values.scopes.trim() : null,
    metadata: parseOptionalJson(values.metadata),
    isActive: values.isActive,
    autoProvision: values.autoProvision,
    defaultRoleId: values.defaultRoleId?.trim()
      ? values.defaultRoleId.trim()
      : null,
  };
}

export const ssoProviderCreateSchema = ssoProviderFormFieldsSchema.transform(
  (values) => mapSsoProviderFormValues(values),
);

export const ssoProviderUpdateSchema = ssoProviderUpdateFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid provider id"),
  })
  .transform((values) => ({
    id: values.id,
    ...mapSsoProviderFormValues(values),
  }));

export const ssoProviderDeleteSchema = z.object({
  id: z.string().uuid("Invalid provider id"),
});

export type SsoProviderCreateInput = z.infer<typeof ssoProviderCreateSchema>;
export type SsoProviderUpdateInput = z.infer<typeof ssoProviderUpdateSchema>;
