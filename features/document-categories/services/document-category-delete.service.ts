import {
  documentCategoryCountDocumentTypesRepository,
  documentCategoryGetByIdRepository,
} from "../repositories/document-category-create.repository";
import { documentCategoryDeleteRepository } from "../repositories/document-category-delete.repository";

export async function documentCategoryDeleteService(id: string) {
  const country = await documentCategoryGetByIdRepository(id);
  if (!country) {
    throw new Error("Category not found");
  }

  const documentTypeCount = await documentCategoryCountDocumentTypesRepository(id);
  if (documentTypeCount > 0) {
    throw new Error("Cannot delete category with document types");
  }

  return documentCategoryDeleteRepository(id);
}
