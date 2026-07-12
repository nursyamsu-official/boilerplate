import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  DocumentCategoryManagement,
  documentCategoryGetListService,
  parseDocumentCategoryFilter,
} from "@/features/document-categories";

export const metadata: Metadata = {
  title: `Document Categories | ${appConfig.appName}`,
  description: `Document Categories | ${appConfig.description}`,
};

type DocumentCategoriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DocumentCategoriesPage({
  searchParams,
}: DocumentCategoriesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseDocumentCategoryFilter(resolvedSearchParams);
  const initialData = await documentCategoryGetListService(filters);

  return (
    <DocumentCategoryManagement
      initialData={initialData}
      initialFilters={filters}
    />
  );
}
