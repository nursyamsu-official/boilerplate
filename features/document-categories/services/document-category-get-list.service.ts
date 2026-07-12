import { documentCategoryListRepository } from "../repositories/document-category-list.repository";
import type { DocumentCategoryListFilters } from "../types/document-category.type";

export async function documentCategoryGetListService(filters: DocumentCategoryListFilters) {
  return documentCategoryListRepository(filters);
}
