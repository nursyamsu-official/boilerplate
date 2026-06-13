import { z } from "zod";

const permissionCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  );

export const permissionFormFieldsSchema = z.object({
  code: permissionCodeSchema,
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
  moduleId: z.string().uuid("Invalid module id").nullable(),
});

export const permissionCreateSchema = permissionFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    moduleId: values.moduleId ?? null,
  }),
);

export const permissionUpdateSchema = permissionFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid permission id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    moduleId: values.moduleId ?? null,
  }));

export const permissionDeleteSchema = z.object({
  id: z.string().uuid("Invalid permission id"),
});

export type PermissionCreateInput = z.infer<typeof permissionCreateSchema>;
export type PermissionUpdateInput = z.infer<typeof permissionUpdateSchema>;
