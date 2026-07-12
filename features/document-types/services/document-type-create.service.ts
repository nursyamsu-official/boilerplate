import {
  documentTypeCreateRepository,
  documentTypeGetByCodeRepository,
} from "../repositories/document-type-create.repository";
import type { DocumentTypeCreateInput } from "../schemas/document-type-create.schema";

export async function documentTypeCreateService(input: DocumentTypeCreateInput) {
  const existing = await documentTypeGetByCodeRepository(
    input.categoryId,
    input.code,
  );
  if (existing) {
    throw new Error("Document type code already exists for this category");
  }

  return documentTypeCreateRepository(input);
}
