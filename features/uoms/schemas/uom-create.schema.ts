import { z } from "zod";

import { UOM_TYPE_VALUES } from "../constants/uom.constants";

const uomCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const uomFormFieldsSchema = z.object({
  code: uomCodeSchema,
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must be at most 150 characters"),
  symbol: z
    .string()
    .trim()
    .max(20, "Symbol must be at most 20 characters")
    .nullable(),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .nullable(),
  uomType: z.enum(UOM_TYPE_VALUES, { message: "UOM type is required" }),
  decimalPlaces: z.coerce
    .number()
    .int("Decimal places must be a whole number")
    .min(0, "Decimal places must be at least 0")
    .max(6, "Decimal places must be at most 6"),
  isActive: z.boolean(),
});

export const uomCreateSchema = uomFormFieldsSchema.transform((values) => ({
  ...values,
  symbol: values.symbol?.trim() ? values.symbol.trim() : null,
  description: values.description?.trim() ? values.description.trim() : null,
}));

export const uomUpdateSchema = uomFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid UOM id"),
  })
  .transform((values) => ({
    ...values,
    symbol: values.symbol?.trim() ? values.symbol.trim() : null,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const uomDeleteSchema = z.object({
  id: z.string().uuid("Invalid UOM id"),
});

export type UomCreateInput = z.infer<typeof uomCreateSchema>;
export type UomUpdateInput = z.infer<typeof uomUpdateSchema>;
