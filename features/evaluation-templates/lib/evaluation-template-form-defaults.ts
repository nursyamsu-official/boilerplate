import type {
  EvaluationTemplateDetail,
  EvaluationTemplateFormValues,
} from "../types/evaluation-template.type";

export const defaultEvaluationTemplateFormValues: EvaluationTemplateFormValues = {
  code: "",
  name: "",
  description: null,
  evaluationMethodId: "",
  evaluationScoringMethodId: "",
  isActive: true,
};

export function mapEvaluationTemplateDetailToFormValues(
  detail: EvaluationTemplateDetail,
): EvaluationTemplateFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    evaluationMethodId: detail.evaluationMethodId,
    evaluationScoringMethodId: detail.evaluationScoringMethodId,
    isActive: detail.isActive,
  };
}
