import type { DocumentTypeCreateInput } from "../schemas/document-type-create.schema";
import type { DocumentTypeFormValues } from "../types/document-type.type";

export function mapFormValuesToDocumentTypeCreateInput(
  values: DocumentTypeFormValues,
): DocumentTypeCreateInput {
  return {
    categoryId: values.categoryId,
    code: values.code,
    name: values.name,
    description: values.description,
    numberPrefix: values.numberPrefix,
    numberSeparator: values.numberSeparator,
    numberStart: values.numberStart,
    numberEnd: values.numberEnd,
    numberCurrent: values.numberCurrent,
    numberPadding: values.numberPadding,
    isActive: values.isActive,
  };
}

export function mapFormValuesToDocumentTypeUpdateInput(
  id: string,
  values: DocumentTypeFormValues,
) {
  return {
    id,
    ...mapFormValuesToDocumentTypeCreateInput(values),
  };
}
