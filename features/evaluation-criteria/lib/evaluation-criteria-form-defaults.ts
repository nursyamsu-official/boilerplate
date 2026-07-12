import type { EvaluationCriteriaDetail, EvaluationCriteriaFormValues } from "../types/evaluation-criteria.type";

export const defaultEvaluationCriteriaFormValues: EvaluationCriteriaFormValues = {
  templateId: "",
  code: "",
  name: "",
  description: null,
  weight: 0,
  maxScore: null,
  sortOrder: 0,
  isActive: true,
};

export function mapEvaluationCriteriaDetailToFormValues(
  detail: EvaluationCriteriaDetail,
): EvaluationCriteriaFormValues {
  return {
    templateId: detail.templateId,
    code: detail.code,
    name: detail.name,
    description: detail.description,
    weight: detail.weight,
    maxScore: detail.maxScore,
    sortOrder: detail.sortOrder,
    isActive: detail.isActive,
  };
}
