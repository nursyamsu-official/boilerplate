import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { documentCategoryOptionsService } from "@/features/document-categories";
import {
  DocumentTypeManagement,
  documentTypeGetListService,
  parseDocumentTypeFilter,
} from "@/features/document-types";

export const metadata: Metadata = {
  title: `Document Types | ${appConfig.appName}`,
  description: `Document Types | ${appConfig.description}`,
};

type DocumentTypesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DocumentTypesPage({
  searchParams,
}: DocumentTypesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseDocumentTypeFilter(resolvedSearchParams);

  const [initialData, categoryOptions] = await Promise.all([
    documentTypeGetListService(filters),
    documentCategoryOptionsService(),
  ]);

  return (
    <DocumentTypeManagement
      initialData={initialData}
      initialFilters={filters}
      categoryOptions={categoryOptions}
    />
  );
}
