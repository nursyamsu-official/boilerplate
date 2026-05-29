import { z } from "zod";

import { isMenuLucideIconName } from "../lib/menu-lucide-icon";

const menuCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  );

export const menuFormFieldsSchema = z.object({
  code: menuCodeSchema,
  label: z
    .string()
    .trim()
    .min(1, "Label is required")
    .max(150, "Label must be at most 150 characters"),
  path: z
    .string()
    .trim()
    .max(255, "Path must be at most 255 characters")
    .nullable(),
  icon: z
    .string()
    .trim()
    .max(100, "Icon must be at most 100 characters")
    .nullable()
    .refine(
      (value) => value === null || isMenuLucideIconName(value),
      "Invalid Lucide icon",
    ),
  parentId: z
    .string()
    .uuid("Parent menu is invalid")
    .nullable(),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
  isActive: z.boolean(),
});

export const menuCreateSchema = menuFormFieldsSchema.transform((values) => ({
  ...values,
  path: values.path?.trim() ? values.path.trim() : null,
  icon: values.icon?.trim() ? values.icon.trim() : null,
  parentId: values.parentId ?? null,
}));

export type MenuCreateInput = z.infer<typeof menuCreateSchema>;
