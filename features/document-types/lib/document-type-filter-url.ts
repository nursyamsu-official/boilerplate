import type { DocumentTypeFilterInput } from "../schemas/document-type-filter.schema";

export function buildDocumentTypeListUrl(filters: DocumentTypeFilterInput): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.isActive !== "all") {
    params.set("isActive", filters.isActive);
  }

  if (filters.categoryId !== "all") {
    params.set("categoryId", filters.categoryId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/document-configuration/document-types?${query}`
    : "/dashboard/admin-page/document-configuration/document-types";
}
