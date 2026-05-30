import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  MenuManagement,
  menuGetListService,
  menuGetPreviewListService,
  parseMenuFilter,
  type MenuParentOption,
} from "@/features/menus";

export const metadata: Metadata = {
  title: `Menus | ${appConfig.appName}`,
  description: `Menu Management Settings | ${appConfig.description}`,
};

type MenusPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MenusPage({ searchParams }: MenusPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseMenuFilter(resolvedSearchParams);

  const [initialData, previewItems] = await Promise.all([
    menuGetListService(filters),
    menuGetPreviewListService(),
  ]);

  const parentOptions: MenuParentOption[] = previewItems.map(
    ({ id, code, label, parentId }) => ({
      id,
      code,
      label,
      parentId,
    }),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <MenuManagement
        initialData={initialData}
        initialFilters={filters}
        parentOptions={parentOptions}
        previewItems={previewItems}
      />
    </div>
  );
}
