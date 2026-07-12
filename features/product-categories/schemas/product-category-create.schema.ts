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

export const productCategoryFormFieldsSchema = z.object({
  groupId: z.string().uuid("Product group is required"),
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

export const productCategoryCreateSchema = productCategoryFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }),
);

export const productCategoryUpdateSchema = productCategoryFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid product category id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const productCategoryDeleteSchema = z.object({
  id: z.string().uuid("Invalid product category id"),
});

export type ProductCategoryCreateInput = z.infer<typeof productCategoryCreateSchema>;
export type ProductCategoryUpdateInput = z.infer<typeof productCategoryUpdateSchema>;
