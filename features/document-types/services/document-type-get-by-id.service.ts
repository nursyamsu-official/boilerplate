import { documentTypeGetByIdRepository } from "../repositories/document-type-create.repository";
import type { DocumentTypeDetail } from "../types/document-type.type";

export async function documentTypeGetByIdService(id: string): Promise<DocumentTypeDetail> {
  const documentType = await documentTypeGetByIdRepository(id);
  if (!documentType) {
    throw new Error("Document type not found");
  }

  return {
    id: documentType.id,
    categoryId: documentType.categoryId,
    code: documentType.code,
    name: documentType.name,
    description: documentType.description,
    numberPrefix: documentType.numberPrefix,
    numberSeparator: documentType.numberSeparator,
    numberStart: documentType.numberStart,
    numberEnd: documentType.numberEnd,
    numberCurrent: documentType.numberCurrent,
    numberPadding: documentType.numberPadding,
    isActive: documentType.isActive,
  };
}
