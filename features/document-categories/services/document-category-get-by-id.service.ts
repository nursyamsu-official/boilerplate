import { documentCategoryGetByIdRepository } from "../repositories/document-category-create.repository";
import type { DocumentCategoryDetail } from "../types/document-category.type";

export async function documentCategoryGetByIdService(id: string): Promise<DocumentCategoryDetail> {
  const country = await documentCategoryGetByIdRepository(id);
  if (!country) {
    throw new Error("Category not found");
  }

  return {
    id: country.id,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
