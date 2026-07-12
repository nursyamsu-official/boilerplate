import { z } from "zod";

const organizationalUnitCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const organizationalUnitFormFieldsSchema = z.object({
  companyId: z.string().uuid("Company is required"),
  code: organizationalUnitCodeSchema,
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

export const organizationalUnitCreateSchema =
  organizationalUnitFormFieldsSchema.transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    parentId: values.parentId ?? null,
  }));

export const organizationalUnitUpdateSchema = organizationalUnitFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid organizational unit id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    parentId: values.parentId ?? null,
  }));

export const organizationalUnitDeleteSchema = z.object({
  id: z.string().uuid("Invalid organizational unit id"),
});

export const organizationalUnitToggleStatusSchema =
  organizationalUnitDeleteSchema;

export const organizationalUnitGetByIdSchema = organizationalUnitDeleteSchema;

export const organizationalUnitGetParentOptionsSchema = z.object({
  companyId: z.string().uuid("Invalid company id"),
  excludeUnitId: z
    .string()
    .uuid("Invalid organizational unit id")
    .optional(),
});

export type OrganizationalUnitCreateInput = z.infer<
  typeof organizationalUnitCreateSchema
>;
export type OrganizationalUnitUpdateInput = z.infer<
  typeof organizationalUnitUpdateSchema
>;
export type OrganizationalUnitGetParentOptionsInput = z.infer<
  typeof organizationalUnitGetParentOptionsSchema
>;
