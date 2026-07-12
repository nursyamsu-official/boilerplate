import { z } from "zod";

const purchasingGroupCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const purchasingGroupFormFieldsSchema = z.object({
  companyId: z.string().uuid("Company is required"),
  code: purchasingGroupCodeSchema,
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
  parentId: z.string().uuid("Parent unit is invalid").nullable(),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
  isActive: z.boolean(),
});

export const purchasingGroupCreateSchema =
  purchasingGroupFormFieldsSchema.transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    parentId: values.parentId ?? null,
  }));

export const purchasingGroupUpdateSchema = purchasingGroupFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid Purchasing Group id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    parentId: values.parentId ?? null,
  }));

export const purchasingGroupDeleteSchema = z.object({
  id: z.string().uuid("Invalid Purchasing Group id"),
});

export const purchasingGroupToggleStatusSchema =
  purchasingGroupDeleteSchema;

export const purchasingGroupGetByIdSchema = purchasingGroupDeleteSchema;

export const purchasingGroupGetParentOptionsSchema = z.object({
  companyId: z.string().uuid("Invalid company id"),
  excludeUnitId: z
    .string()
    .uuid("Invalid Purchasing Group id")
    .optional(),
});

export type PurchasingGroupCreateInput = z.infer<
  typeof purchasingGroupCreateSchema
>;
export type PurchasingGroupUpdateInput = z.infer<
  typeof purchasingGroupUpdateSchema
>;
export type PurchasingGroupGetParentOptionsInput = z.infer<
  typeof purchasingGroupGetParentOptionsSchema
>;
