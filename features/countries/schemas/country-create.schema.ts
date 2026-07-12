import { z } from "zod";

const countryCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const countryFormFieldsSchema = z.object({
  code: countryCodeSchema,
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

export const countryCreateSchema = countryFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }),
);

export const countryUpdateSchema = countryFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid country id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const countryDeleteSchema = z.object({
  id: z.string().uuid("Invalid country id"),
});

export type CountryCreateInput = z.infer<typeof countryCreateSchema>;
export type CountryUpdateInput = z.infer<typeof countryUpdateSchema>;
