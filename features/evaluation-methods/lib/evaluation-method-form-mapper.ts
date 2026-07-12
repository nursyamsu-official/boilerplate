import type { EvaluationMethodCreateInput } from "../schemas/evaluation-method-create.schema";
import type { EvaluationMethodFormValues } from "../types/evaluation-method.type";

export function mapFormValuesToEvaluationMethodCreateInput(
  values: EvaluationMethodFormValues,
): EvaluationMethodCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToEvaluationMethodUpdateInput(
  id: string,
  values: EvaluationMethodFormValues,
) {
  return {
    id,
    ...mapFormValuesToEvaluationMethodCreateInput(values),
  };
}
