import type { EvaluationScoringMethodDetail, EvaluationScoringMethodFormValues } from "../types/evaluation-scoring-method.type";

export const defaultEvaluationScoringMethodFormValues: EvaluationScoringMethodFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapEvaluationScoringMethodDetailToFormValues(
  detail: EvaluationScoringMethodDetail,
): EvaluationScoringMethodFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
