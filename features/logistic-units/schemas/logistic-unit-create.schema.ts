import { z } from "zod";

const logisticUnitCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const logisticUnitFormFieldsSchema = z.object({
  companyId: z.string().uuid("Company is required"),
  code: logisticUnitCodeSchema,
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

export const logisticUnitCreateSchema =
  logisticUnitFormFieldsSchema.transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    parentId: values.parentId ?? null,
  }));

export const logisticUnitUpdateSchema = logisticUnitFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid Logistic Unit id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    parentId: values.parentId ?? null,
  }));

export const logisticUnitDeleteSchema = z.object({
  id: z.string().uuid("Invalid Logistic Unit id"),
});

export const logisticUnitToggleStatusSchema =
  logisticUnitDeleteSchema;

export const logisticUnitGetByIdSchema = logisticUnitDeleteSchema;

export const logisticUnitGetParentOptionsSchema = z.object({
  companyId: z.string().uuid("Invalid company id"),
  excludeUnitId: z
    .string()
    .uuid("Invalid Logistic Unit id")
    .optional(),
});

export type LogisticUnitCreateInput = z.infer<
  typeof logisticUnitCreateSchema
>;
export type LogisticUnitUpdateInput = z.infer<
  typeof logisticUnitUpdateSchema
>;
export type LogisticUnitGetParentOptionsInput = z.infer<
  typeof logisticUnitGetParentOptionsSchema
>;
