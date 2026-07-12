import { z } from "zod";

const documentTypeCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

const numberPrefixSchema = z
  .string()
  .trim()
  .min(1, "Number prefix is required")
  .max(20, "Number prefix must be at most 20 characters")
  .regex(
    /^[A-Za-z0-9/_-]+$/,
    "Number prefix may only contain letters, numbers, slashes, hyphens, and underscores",
  );

const numberSeparatorSchema = z
  .string()
  .trim()
  .min(1, "Number separator is required")
  .max(3, "Number separator must be at most 3 characters")
  .regex(/^[/._-]+$/, "Number separator may only contain / . _ -");

const numberRangeSchema = z
  .object({
    numberPrefix: numberPrefixSchema,
    numberSeparator: numberSeparatorSchema,
    numberStart: z.coerce
      .number()
      .int("Start number must be a whole number")
      .min(1, "Start number must be at least 1"),
    numberEnd: z.coerce
      .number()
      .int("End number must be a whole number")
      .min(1, "End number must be at least 1"),
    numberCurrent: z.coerce
      .number()
      .int("Current number must be a whole number")
      .min(1, "Current number must be at least 1"),
    numberPadding: z.coerce
      .number()
      .int("Padding must be a whole number")
      .min(1, "Padding must be at least 1")
      .max(10, "Padding must be at most 10"),
  })
  .superRefine((values, ctx) => {
    if (values.numberEnd < values.numberStart) {
      ctx.addIssue({
        code: "custom",
        message: "End number must be greater than or equal to start number",
        path: ["numberEnd"],
      });
    }

    if (values.numberCurrent < values.numberStart) {
      ctx.addIssue({
        code: "custom",
        message: "Current number must be at least the start number",
        path: ["numberCurrent"],
      });
    }

    if (values.numberCurrent > values.numberEnd) {
      ctx.addIssue({
        code: "custom",
        message: "Current number must not exceed the end number",
        path: ["numberCurrent"],
      });
    }
  });

export const documentTypeFormFieldsSchema = z
  .object({
    categoryId: z.string().uuid("Category is required"),
    code: documentTypeCodeSchema,
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
  })
  .merge(numberRangeSchema);

export const documentTypeCreateSchema = documentTypeFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
    numberCurrent: values.numberCurrent ?? values.numberStart,
  }),
);

export const documentTypeUpdateSchema = documentTypeFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid document type id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const documentTypeDeleteSchema = z.object({
  id: z.string().uuid("Invalid document type id"),
});

export type DocumentTypeCreateInput = z.infer<typeof documentTypeCreateSchema>;
export type DocumentTypeUpdateInput = z.infer<typeof documentTypeUpdateSchema>;
