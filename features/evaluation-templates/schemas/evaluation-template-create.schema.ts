import { z } from "zod";

const evaluationTemplateCodeSchema = z
  .string()
  .trim()
  .min(1, "Code is required")
  .max(100, "Code must be at most 100 characters")
  .regex(
    /^[a-z0-9_]+$/,
    "Code must use lowercase letters, numbers, and underscores only",
  )
  .transform((value) => value.toLowerCase());

export const evaluationTemplateFormFieldsSchema = z.object({
  code: evaluationTemplateCodeSchema,
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
  evaluationMethodId: z.string().uuid("Evaluation method is required"),
  evaluationScoringMethodId: z.string().uuid("Evaluation scoring method is required"),
  isActive: z.boolean(),
});

export const evaluationTemplateCreateSchema = evaluationTemplateFormFieldsSchema.transform(
  (values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }),
);

export const evaluationTemplateUpdateSchema = evaluationTemplateFormFieldsSchema
  .extend({
    id: z.string().uuid("Invalid evaluation template id"),
  })
  .transform((values) => ({
    ...values,
    description: values.description?.trim() ? values.description.trim() : null,
  }));

export const evaluationTemplateDeleteSchema = z.object({
  id: z.string().uuid("Invalid evaluation template id"),
});

export type EvaluationTemplateCreateInput = z.infer<
  typeof evaluationTemplateCreateSchema
>;
export type EvaluationTemplateUpdateInput = z.infer<
  typeof evaluationTemplateUpdateSchema
>;
