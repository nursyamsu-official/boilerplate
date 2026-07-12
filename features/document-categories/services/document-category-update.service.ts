import {
  documentCategoryGetByCodeRepository,
  documentCategoryGetByIdRepository,
} from "../repositories/document-category-create.repository";
import {
  documentCategoryToggleStatusRepository,
  documentCategoryUpdateRepository,
} from "../repositories/document-category-update.repository";
import type { DocumentCategoryUpdateInput } from "../schemas/document-category-create.schema";

export async function documentCategoryUpdateService(input: DocumentCategoryUpdateInput) {
  const country = await documentCategoryGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Category not found");
  }

  const existing = await documentCategoryGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Category code already exists");
  }

  return documentCategoryUpdateRepository(input);
}

export async function documentCategoryToggleStatusService(id: string) {
  const country = await documentCategoryGetByIdRepository(id);
  if (!country) {
    throw new Error("Category not found");
  }

  return documentCategoryToggleStatusRepository(id);
}
