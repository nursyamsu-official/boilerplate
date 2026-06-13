import { z } from "zod";

const roleCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  );

export const roleFormFieldsSchema = z.object({
  code: roleCodeSchema,
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
  permissionIds: z.array(z.string().uuid("Invalid permission id")),
});

export const roleCreateSchema = roleFormFieldsSchema.transform((values) => ({
  ...values,
  code: values.code.toLowerCase(),
  description: values.description?.trim() ? values.description.trim() : null,
}));

export const roleUpdateSchema = roleFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid role id"),
  })
  .transform((values) => ({
    ...values,
    code: values.code.toLowerCase(),
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const roleDeleteSchema = z.object({
  id: z.string().uuid("Invalid role id"),
});

export type RoleCreateInput = z.infer<typeof roleCreateSchema>;
export type RoleUpdateInput = z.infer<typeof roleUpdateSchema>;
