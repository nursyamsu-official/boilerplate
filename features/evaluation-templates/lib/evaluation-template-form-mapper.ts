import type { EvaluationTemplateCreateInput } from "../schemas/evaluation-template-create.schema";
import type { EvaluationTemplateFormValues } from "../types/evaluation-template.type";

export function mapFormValuesToEvaluationTemplateCreateInput(
  values: EvaluationTemplateFormValues,
): EvaluationTemplateCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    evaluationMethodId: values.evaluationMethodId,
    evaluationScoringMethodId: values.evaluationScoringMethodId,
    isActive: values.isActive,
  };
}

export function mapFormValuesToEvaluationTemplateUpdateInput(
  id: string,
  values: EvaluationTemplateFormValues,
) {
  return {
    id,
    ...mapFormValuesToEvaluationTemplateCreateInput(values),
  };
}
