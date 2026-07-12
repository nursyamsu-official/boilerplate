import { z } from "zod";

const codeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

const maxScoreSchema = z
  .union([z.string(), z.number(), z.null()])
  .optional()
  .transform((value) => {
    if (value === null || value === undefined || value === "") {
      return null;
    }
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  })
  .pipe(
    z
      .number()
      .positive("Max score must be greater than 0")
      .nullable(),
  );

export const evaluationCriteriaFormFieldsSchema = z.object({
  templateId: z.string().uuid("Evaluation template is required"),
  code: codeSchema,
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
  weight: z.coerce.number().min(0, "Weight must be at least 0"),
  maxScore: maxScoreSchema,
  sortOrder: z.coerce.number().int().min(0, "Sort order must be at least 0"),
  isActive: z.boolean(),
});

export const evaluationCriteriaCreateSchema =
  evaluationCriteriaFormFieldsSchema.transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const evaluationCriteriaUpdateSchema = evaluationCriteriaFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid evaluation criterion id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const evaluationCriteriaDeleteSchema = z.object({
  id: z.string().uuid("Invalid evaluation criterion id"),
});

export type EvaluationCriteriaCreateInput = z.infer<
  typeof evaluationCriteriaCreateSchema
>;
export type EvaluationCriteriaUpdateInput = z.infer<
  typeof evaluationCriteriaUpdateSchema
>;
