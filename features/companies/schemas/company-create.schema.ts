import { z } from "zod";

const companyCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const companyFormFieldsSchema = z.object({
  code: companyCodeSchema,
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .nullable(),
  isActive: z.boolean(),
});

export const companyCreateSchema = companyFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }),
);

export const companyUpdateSchema = companyFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid company id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const companyDeleteSchema = z.object({
  id: z.string().uuid("Invalid company id"),
});

export type CompanyCreateInput = z.infer<typeof companyCreateSchema>;
export type CompanyUpdateInput = z.infer<typeof companyUpdateSchema>;
