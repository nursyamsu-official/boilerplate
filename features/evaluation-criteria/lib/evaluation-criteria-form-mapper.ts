import type { EvaluationCriteriaCreateInput } from "../schemas/evaluation-criteria-create.schema";
import type { EvaluationCriteriaFormValues } from "../types/evaluation-criteria.type";

export function mapFormValuesToEvaluationCriteriaCreateInput(
  values: EvaluationCriteriaFormValues,
): EvaluationCriteriaCreateInput {
  return {
    templateId: values.templateId,
    code: values.code,
    name: values.name,
    description: values.description,
    weight: values.weight,
    maxScore: values.maxScore,
    sortOrder: values.sortOrder,
    isActive: values.isActive,
  };
}

export function mapFormValuesToEvaluationCriteriaUpdateInput(
  id: string,
  values: EvaluationCriteriaFormValues,
) {
  return {
    id,
    ...mapFormValuesToEvaluationCriteriaCreateInput(values),
  };
}
