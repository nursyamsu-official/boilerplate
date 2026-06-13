import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  PermissionModuleManagement,
  parsePermissionModuleFilter,
  permissionModuleGetListService,
} from "@/features/permission-modules";

export const metadata: Metadata = {
  title: `Permission Modules | ${appConfig.appName}`,
  description: `Permission Modules | ${appConfig.description}`,
};

type PermissionModulesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PermissionModulesPage({
  searchParams,
}: PermissionModulesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parsePermissionModuleFilter(resolvedSearchParams);
  const initialData = await permissionModuleGetListService(filters);

  return (
    <PermissionModuleManagement
      initialData={initialData}
      initialFilters={filters}
    />
  );
}
