import { z } from "zod";

export const uomGlobalConversionFormFieldsSchema = z
  .object({
    fromUomId: z.string().uuid("From UOM is required"),
    toUomId: z.string().uuid("To UOM is required"),
    conversionFactor: z.coerce
      .number()
      .positive("Conversion factor must be greater than 0"),
    description: z
      .string()
      .trim()
      .max(500, "Description must be at most 500 characters")
      .nullable(),
    isActive: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (values.fromUomId === values.toUomId) {
      ctx.addIssue({
        code: "custom",
        message: "From and to UOM must be different",
        path: ["toUomId"],
      });
    }
  });

export const uomGlobalConversionCreateSchema =
  uomGlobalConversionFormFieldsSchema.transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const uomGlobalConversionUpdateSchema =
  uomGlobalConversionFormFieldsSchema
    .extend({
      id: z.string().uuid("Invalid conversion id"),
    })
    .transform((values) => ({
      ...values,
      description: values.description?.trim() ? values.description.trim() : null,
    }));

export const uomGlobalConversionDeleteSchema = z.object({
  id: z.string().uuid("Invalid conversion id"),
});

export type UomGlobalConversionCreateInput = z.infer<
  typeof uomGlobalConversionCreateSchema
>;
export type UomGlobalConversionUpdateInput = z.infer<
  typeof uomGlobalConversionUpdateSchema
>;
