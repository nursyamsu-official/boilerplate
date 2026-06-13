import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { permissionModuleOptionsService } from "@/features/permission-modules";
import {
  PermissionManagement,
  parsePermissionFilter,
  permissionGetListService,
} from "@/features/permissions";

export const metadata: Metadata = {
  title: `Permissions | ${appConfig.appName}`,
  description: `Permissions | ${appConfig.description}`,
};

type PermissionsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PermissionsPage({
  searchParams,
}: PermissionsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parsePermissionFilter(resolvedSearchParams);
  const [initialData, moduleOptions] = await Promise.all([
    permissionGetListService(filters),
    permissionModuleOptionsService(),
  ]);

  return (
    <PermissionManagement
      initialData={initialData}
      initialFilters={filters}
      moduleOptions={moduleOptions}
    />
  );
}
