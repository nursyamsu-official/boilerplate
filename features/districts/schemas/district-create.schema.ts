import { z } from "zod";

const districtCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const districtFormFieldsSchema = z.object({
  countryId: z.string().uuid("Country is required"),
  provinceId: z.string().uuid("Province is required"),
  code: districtCodeSchema,
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

export const districtCreateSchema = districtFormFieldsSchema
  .omit({ countryId: true })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const districtUpdateSchema = districtFormFieldsSchema
  .omit({ countryId: true })
  .extend({
    id: z.string().uuid("Invalid district id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const districtDeleteSchema = z.object({
  id: z.string().uuid("Invalid district id"),
});

export type DistrictCreateInput = z.infer<typeof districtCreateSchema>;
export type DistrictUpdateInput = z.infer<typeof districtUpdateSchema>;
