import { z } from "zod";

const countryCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const documentCategoryFormFieldsSchema = z.object({
  code: countryCodeSchema,
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

export const documentCategoryCreateSchema = documentCategoryFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }),
);

export const documentCategoryUpdateSchema = documentCategoryFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid category id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const documentCategoryDeleteSchema = z.object({
  id: z.string().uuid("Invalid category id"),
});

export type DocumentCategoryCreateInput = z.infer<typeof documentCategoryCreateSchema>;
export type DocumentCategoryUpdateInput = z.infer<typeof documentCategoryUpdateSchema>;
