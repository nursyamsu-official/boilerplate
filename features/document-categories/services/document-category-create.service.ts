import {
  documentCategoryCreateRepository,
  documentCategoryGetByCodeRepository,
} from "../repositories/document-category-create.repository";
import type { DocumentCategoryCreateInput } from "../schemas/document-category-create.schema";

export async function documentCategoryCreateService(input: DocumentCategoryCreateInput) {
  const existing = await documentCategoryGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Category code already exists");
  }

  return documentCategoryCreateRepository(input);
}
