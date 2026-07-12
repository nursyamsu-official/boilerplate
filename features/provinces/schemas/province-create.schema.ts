import { z } from "zod";

const provinceCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const provinceFormFieldsSchema = z.object({
  countryId: z.string().uuid("Country is required"),
  code: provinceCodeSchema,
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

export const provinceCreateSchema = provinceFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }),
);

export const provinceUpdateSchema = provinceFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid province id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const provinceDeleteSchema = z.object({
  id: z.string().uuid("Invalid province id"),
});

export type ProvinceCreateInput = z.infer<typeof provinceCreateSchema>;
export type ProvinceUpdateInput = z.infer<typeof provinceUpdateSchema>;
