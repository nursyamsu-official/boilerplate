import type { DocumentCategoryDetail, DocumentCategoryFormValues } from "../types/document-category.type";

export const defaultDocumentCategoryFormValues: DocumentCategoryFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapDocumentCategoryDetailToFormValues(
  detail: DocumentCategoryDetail,
): DocumentCategoryFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
