import { z } from "zod";

const permissionModuleCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  );

export const permissionModuleFormFieldsSchema = z.object({
  code: permissionModuleCodeSchema,
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
  icon: z
    .string()
    .trim()
    .max(100, "Icon must be at most 100 characters")
    .nullable(),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
  isActive: z.boolean(),
});

export const permissionModuleCreateSchema = permissionModuleFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    icon: values.icon?.trim() ? values.icon.trim() : null,
  }),
);

export const permissionModuleUpdateSchema = permissionModuleFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid module id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    icon: values.icon?.trim() ? values.icon.trim() : null,
  }));

export const permissionModuleDeleteSchema = z.object({
  id: z.string().uuid("Invalid module id"),
});

export type PermissionModuleCreateInput = z.infer<
  typeof permissionModuleCreateSchema
>;
export type PermissionModuleUpdateInput = z.infer<
  typeof permissionModuleUpdateSchema
>;
