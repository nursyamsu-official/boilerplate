import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { permissionOptionsService } from "@/features/permissions";
import {
  RoleManagement,
  parseRoleFilter,
  roleGetListService,
} from "@/features/roles";

export const metadata: Metadata = {
  title: `Roles | ${appConfig.appName}`,
  description: `Roles | ${appConfig.description}`,
};

type RolesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RolesPage({ searchParams }: RolesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseRoleFilter(resolvedSearchParams);

  const [initialData, permissionOptionGroups] = await Promise.all([
    roleGetListService(filters),
    permissionOptionsService(),
  ]);

  return (
    <RoleManagement
      initialData={initialData}
      initialFilters={filters}
      permissionOptionGroups={permissionOptionGroups}
    />
  );
}
