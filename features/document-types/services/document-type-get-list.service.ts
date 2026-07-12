import { documentTypeListRepository } from "../repositories/document-type-list.repository";
import type { DocumentTypeListFilters } from "../types/document-type.type";

export async function documentTypeGetListService(filters: DocumentTypeListFilters) {
  return documentTypeListRepository(filters);
}
