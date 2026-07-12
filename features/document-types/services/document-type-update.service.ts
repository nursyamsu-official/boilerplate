import {
  documentTypeGetByCodeRepository,
  documentTypeGetByIdRepository,
} from "../repositories/document-type-create.repository";
import {
  documentTypeToggleStatusRepository,
  documentTypeUpdateRepository,
} from "../repositories/document-type-update.repository";
import type { DocumentTypeUpdateInput } from "../schemas/document-type-create.schema";

export async function documentTypeUpdateService(input: DocumentTypeUpdateInput) {
  const province = await documentTypeGetByIdRepository(input.id);
  if (!province) {
    throw new Error("Document type not found");
  }

  const existing = await documentTypeGetByCodeRepository(
    input.categoryId,
    input.code,
    input.id,
  );
  if (existing) {
    throw new Error("Document type code already exists for this category");
  }

  return documentTypeUpdateRepository(input);
}

export async function documentTypeToggleStatusService(id: string) {
  const province = await documentTypeGetByIdRepository(id);
  if (!province) {
    throw new Error("Document type not found");
  }

  return documentTypeToggleStatusRepository(id);
}
