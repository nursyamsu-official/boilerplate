import { documentTypeGetByIdRepository } from "../repositories/document-type-create.repository";
import { documentTypeDeleteRepository } from "../repositories/document-type-delete.repository";

export async function documentTypeDeleteService(id: string) {
  const documentType = await documentTypeGetByIdRepository(id);
  if (!documentType) {
    throw new Error("Document type not found");
  }

  return documentTypeDeleteRepository(id);
}
