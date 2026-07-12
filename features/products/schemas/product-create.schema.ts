import { z } from "zod";

const productCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

const baseUomIdSchema = z
  .string()
  .uuid("Invalid base UOM id")
  .nullable()
  .optional()
  .transform((value) => value ?? null);

export const productFormFieldsSchema = z.object({
  code: productCodeSchema,
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
  productTypeId: z.string().uuid("Product type is required"),
  productGroupId: z.string().uuid("Product group is required"),
  productCategoryId: z.string().uuid("Product category is required"),
  baseUomId: baseUomIdSchema,
  isActive: z.boolean(),
});

export const productCreateSchema = productFormFieldsSchema.transform((values) => ({
  ...values,
  description: values.description?.trim() ? values.description.trim() : null,
}));

export const productUpdateSchema = productFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid product id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const productDeleteSchema = z.object({
  id: z.string().uuid("Invalid product id"),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
