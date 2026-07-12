import type { EvaluationMethodDetail, EvaluationMethodFormValues } from "../types/evaluation-method.type";

export const defaultEvaluationMethodFormValues: EvaluationMethodFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapEvaluationMethodDetailToFormValues(
  detail: EvaluationMethodDetail,
): EvaluationMethodFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
