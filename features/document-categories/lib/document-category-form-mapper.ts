import type { DocumentCategoryCreateInput } from "../schemas/document-category-create.schema";
import type { DocumentCategoryFormValues } from "../types/document-category.type";

export function mapFormValuesToDocumentCategoryCreateInput(
  values: DocumentCategoryFormValues,
): DocumentCategoryCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToDocumentCategoryUpdateInput(
  id: string,
  values: DocumentCategoryFormValues,
) {
  return {
    id,
    ...mapFormValuesToDocumentCategoryCreateInput(values),
  };
}
