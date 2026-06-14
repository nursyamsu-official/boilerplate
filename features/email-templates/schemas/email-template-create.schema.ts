import { z } from "zod";

const emailTemplateCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  );

export const emailTemplateFormFieldsSchema = z.object({
  code: emailTemplateCodeSchema,
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(255, "Subject must be at most 255 characters"),
  bodyHtml: z.string().trim().min(1, "HTML body is required"),
  bodyText: z.string().trim().optional().or(z.literal("")),
  variables: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  isActive: z.boolean(),
});

export const emailTemplateCreateSchema = emailTemplateFormFieldsSchema.transform(
  (values) => ({
    code: values.code,
    name: values.name,
    subject: values.subject,
    bodyHtml: values.bodyHtml,
    bodyText: values.bodyText?.trim() ? values.bodyText.trim() : null,
    variables: values.variables?.trim() ? values.variables.trim() : null,
    description: values.description?.trim() ? values.description.trim() : null,
    isActive: values.isActive,
  }),
);

export const emailTemplateUpdateSchema = emailTemplateFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid template id"),
  })
  .transform((values) => ({
    id: values.id,
    code: values.code,
    name: values.name,
    subject: values.subject,
    bodyHtml: values.bodyHtml,
    bodyText: values.bodyText?.trim() ? values.bodyText.trim() : null,
    variables: values.variables?.trim() ? values.variables.trim() : null,
    description: values.description?.trim() ? values.description.trim() : null,
    isActive: values.isActive,
  }));

export const emailTemplateDeleteSchema = z.object({
  id: z.string().uuid("Invalid template id"),
});

export type EmailTemplateCreateInput = z.infer<typeof emailTemplateCreateSchema>;
export type EmailTemplateUpdateInput = z.infer<typeof emailTemplateUpdateSchema>;
