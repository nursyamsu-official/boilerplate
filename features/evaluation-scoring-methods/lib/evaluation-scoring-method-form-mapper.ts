import type { EvaluationScoringMethodCreateInput } from "../schemas/evaluation-scoring-method-create.schema";
import type { EvaluationScoringMethodFormValues } from "../types/evaluation-scoring-method.type";

export function mapFormValuesToEvaluationScoringMethodCreateInput(
  values: EvaluationScoringMethodFormValues,
): EvaluationScoringMethodCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToEvaluationScoringMethodUpdateInput(
  id: string,
  values: EvaluationScoringMethodFormValues,
) {
  return {
    id,
    ...mapFormValuesToEvaluationScoringMethodCreateInput(values),
  };
}
