import type { DocumentTypeDetail, DocumentTypeFormValues } from "../types/document-type.type";

export const defaultDocumentTypeFormValues: DocumentTypeFormValues = {
  categoryId: "",
  code: "",
  name: "",
  description: null,
  numberPrefix: "",
  numberSeparator: "/",
  numberStart: 1,
  numberEnd: 99999,
  numberCurrent: 1,
  numberPadding: 5,
  isActive: true,
};

export function mapDocumentTypeDetailToFormValues(
  detail: DocumentTypeDetail,
): DocumentTypeFormValues {
  return {
    categoryId: detail.categoryId,
    code: detail.code,
    name: detail.name,
    description: detail.description,
    numberPrefix: detail.numberPrefix,
    numberSeparator: detail.numberSeparator,
    numberStart: detail.numberStart,
    numberEnd: detail.numberEnd,
    numberCurrent: detail.numberCurrent,
    numberPadding: detail.numberPadding,
    isActive: detail.isActive,
  };
}
