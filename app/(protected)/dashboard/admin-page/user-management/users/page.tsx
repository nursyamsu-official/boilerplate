import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { roleOptionsService } from "@/features/roles";
import {
  UserManagement,
  parseUserFilter,
  userGetListService,
} from "@/features/users";

export const metadata: Metadata = {
  title: `Users | ${appConfig.appName}`,
  description: `Users | ${appConfig.description}`,
};

type UsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseUserFilter(resolvedSearchParams);

  const [initialData, roleOptions] = await Promise.all([
    userGetListService(filters),
    roleOptionsService(),
  ]);

  return (
    <UserManagement
      initialData={initialData}
      initialFilters={filters}
      roleOptions={roleOptions}
    />
  );
}
