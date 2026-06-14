import { z } from "zod";

function parseOptionalJson(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  JSON.parse(trimmed);
  return trimmed;
}

export const ssoUserFormFieldsSchema = z
  .object({
    userId: z.string().min(1, "User is required"),
    providerId: z.string().uuid("Provider is required"),
    externalId: z
      .string()
      .trim()
      .min(1, "External ID is required")
      .max(255, "External ID must be at most 255 characters"),
    emailAtProvider: z
      .string()
      .trim()
      .email("Email must be valid")
      .optional()
      .or(z.literal("")),
    displayName: z.string().trim().max(150).optional().or(z.literal("")),
    rawProfile: z.string().optional().or(z.literal("")),
  })
  .superRefine((values, ctx) => {
    try {
      parseOptionalJson(values.rawProfile);
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Raw profile must be valid JSON",
        path: ["rawProfile"],
      });
    }
  });

function mapSsoUserFormValues(values: z.infer<typeof ssoUserFormFieldsSchema>) {
  return {
    userId: values.userId,
    providerId: values.providerId,
    externalId: values.externalId,
    emailAtProvider: values.emailAtProvider?.trim()
      ? values.emailAtProvider.trim()
      : null,
    displayName: values.displayName?.trim() ? values.displayName.trim() : null,
    rawProfile: parseOptionalJson(values.rawProfile),
  };
}

export const ssoUserCreateSchema = ssoUserFormFieldsSchema.transform((values) =>
  mapSsoUserFormValues(values),
);

export const ssoUserUpdateSchema = ssoUserFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid SSO user link id"),
  })
  .transform((values) => ({
    id: values.id,
    ...mapSsoUserFormValues(values),
  }));

export const ssoUserDeleteSchema = z.object({
  id: z.string().uuid("Invalid SSO user link id"),
});

export type SsoUserCreateInput = z.infer<typeof ssoUserCreateSchema>;
export type SsoUserUpdateInput = z.infer<typeof ssoUserUpdateSchema>;
