import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  SessionManagement,
  parseSessionFilter,
  sessionGetListService,
} from "@/features/sessions";

export const metadata: Metadata = {
  title: `Sessions | ${appConfig.appName}`,
  description: `Sessions | ${appConfig.description}`,
};

type SessionsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SessionsPage({
  searchParams,
}: SessionsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseSessionFilter(resolvedSearchParams);
  const initialData = await sessionGetListService(filters);

  return (
    <SessionManagement initialData={initialData} initialFilters={filters} />
  );
}
