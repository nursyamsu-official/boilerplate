import { z } from "zod";

import { emailProviderValues } from "./email-setting-filter.schema";

const apiProviders = [
  "SENDGRID",
  "MAILGUN",
  "SES",
  "RESEND",
  "POSTMARK",
] as const;

export const emailSettingFormFieldsSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(150, "Name must be at most 150 characters"),
    provider: z.enum(emailProviderValues),
    host: z.string().trim().max(255).optional().or(z.literal("")),
    port: z.coerce.number().int().min(1).max(65535).nullable().optional(),
    username: z.string().trim().max(255).optional().or(z.literal("")),
    password: z.string().optional().or(z.literal("")),
    apiKey: z.string().optional().or(z.literal("")),
    fromEmail: z
      .string()
      .trim()
      .min(1, "From email is required")
      .email("From email must be valid"),
    fromName: z.string().trim().max(150).optional().or(z.literal("")),
    replyTo: z
      .string()
      .trim()
      .email("Reply-to must be a valid email")
      .optional()
      .or(z.literal("")),
    useTls: z.boolean(),
    isActive: z.boolean(),
    isDefault: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.provider === "SMTP") {
      if (!values.host?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Host is required for SMTP",
          path: ["host"],
        });
      }
      if (values.port == null) {
        ctx.addIssue({
          code: "custom",
          message: "Port is required for SMTP",
          path: ["port"],
        });
      }
    }

    if (apiProviders.includes(values.provider as (typeof apiProviders)[number])) {
      if (!values.apiKey?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "API key is required for this provider",
          path: ["apiKey"],
        });
      }
    }
  });

export const emailSettingCreateSchema = emailSettingFormFieldsSchema.transform(
  (values) => ({
    name: values.name,
    provider: values.provider,
    host: values.provider === "SMTP" ? values.host?.trim() || null : null,
    port: values.provider === "SMTP" ? values.port : null,
    username:
      values.provider === "SMTP" ? values.username?.trim() || null : null,
    password:
      values.provider === "SMTP" ? values.password?.trim() || null : null,
    apiKey: apiProviders.includes(
      values.provider as (typeof apiProviders)[number],
    )
      ? values.apiKey?.trim() || null
      : null,
    fromEmail: values.fromEmail,
    fromName: values.fromName?.trim() ? values.fromName.trim() : null,
    replyTo: values.replyTo?.trim() ? values.replyTo.trim() : null,
    useTls: values.useTls,
    isActive: values.isActive,
    isDefault: values.isDefault,
  }),
);

export const emailSettingUpdateFormFieldsSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(150, "Name must be at most 150 characters"),
    provider: z.enum(emailProviderValues),
    host: z.string().trim().max(255).optional().or(z.literal("")),
    port: z.coerce.number().int().min(1).max(65535).nullable().optional(),
    username: z.string().trim().max(255).optional().or(z.literal("")),
    password: z.string().optional().or(z.literal("")),
    apiKey: z.string().optional().or(z.literal("")),
    fromEmail: z
      .string()
      .trim()
      .min(1, "From email is required")
      .email("From email must be valid"),
    fromName: z.string().trim().max(150).optional().or(z.literal("")),
    replyTo: z
      .string()
      .trim()
      .email("Reply-to must be a valid email")
      .optional()
      .or(z.literal("")),
    useTls: z.boolean(),
    isActive: z.boolean(),
    isDefault: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.provider === "SMTP") {
      if (!values.host?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Host is required for SMTP",
          path: ["host"],
        });
      }
      if (values.port == null) {
        ctx.addIssue({
          code: "custom",
          message: "Port is required for SMTP",
          path: ["port"],
        });
      }
    }
  });

export const emailSettingUpdateSchema = emailSettingUpdateFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid setting id"),
  })
  .transform((values) => ({
    id: values.id,
    name: values.name,
    provider: values.provider,
    host: values.provider === "SMTP" ? values.host?.trim() || null : null,
    port: values.provider === "SMTP" ? values.port : null,
    username:
      values.provider === "SMTP" ? values.username?.trim() || null : null,
    password:
      values.provider === "SMTP" ? values.password?.trim() || null : null,
    apiKey: apiProviders.includes(
      values.provider as (typeof apiProviders)[number],
    )
      ? values.apiKey?.trim() || null
      : null,
    fromEmail: values.fromEmail,
    fromName: values.fromName?.trim() ? values.fromName.trim() : null,
    replyTo: values.replyTo?.trim() ? values.replyTo.trim() : null,
    useTls: values.useTls,
    isActive: values.isActive,
    isDefault: values.isDefault,
  }));

export const emailSettingDeleteSchema = z.object({
  id: z.string().uuid("Invalid setting id"),
});

export type EmailSettingCreateInput = z.infer<typeof emailSettingCreateSchema>;
export type EmailSettingUpdateInput = z.infer<typeof emailSettingUpdateSchema>;
