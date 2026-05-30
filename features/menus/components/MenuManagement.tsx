"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  menuGetByIdAction,
  menuGetParentOptionsAction,
} from "../actions/menu-delete.action";
import type { MenuFilterInput } from "../schemas/menu-filter.schema";
import { buildMenuListUrl } from "../lib/menu-filter-url";
import { mapMenuDetailToFormValues } from "../lib/menu-form-defaults";
import type {
  MenuFormValues,
  MenuListResult,
  MenuParentOption,
  MenuPreviewItem,
  MenuTableRow,
} from "../types/menu.type";
import { MenuTable } from "../table/MenuTable";
import { MenuCreateDialog } from "./MenuCreateDialog";
import { MenuEditDialog } from "./MenuEditDialog";
import { MenuPreviewDialog } from "./MenuPreviewDialog";

type MenuManagementProps = {
  initialData: MenuListResult;
  initialFilters: MenuFilterInput;
  parentOptions: MenuParentOption[];
  previewItems: MenuPreviewItem[];
};

type EditDialogState = {
  menuId: string;
  defaultValues: MenuFormValues;
  parentOptions: MenuParentOption[];
};

export function MenuManagement({
  initialData,
  initialFilters,
  parentOptions,
  previewItems,
}: MenuManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleFiltersChange = useCallback(
    (partial: Partial<MenuFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildMenuListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (menu: MenuTableRow) => {
    setIsEditLoading(true);

    try {
      const [menuDetail, options] = await Promise.all([
        menuGetByIdAction({ id: menu.id }),
        menuGetParentOptionsAction(menu.id),
      ]);

      setEditDialogState({
        menuId: menu.id,
        defaultValues: mapMenuDetailToFormValues(menuDetail),
        parentOptions: options,
      });
    } catch {
      toast.error("Failed to load menu");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage navigation menus and hierarchy for role-based access.
        </p>
      </div>

      <MenuTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onPreview={() => setIsPreviewOpen(true)}
        onRefresh={handleRefresh}
      />

      <MenuPreviewDialog
        open={isPreviewOpen}
        items={previewItems}
        onOpenChange={setIsPreviewOpen}
      />

      <MenuCreateDialog
        open={isCreateOpen}
        parentOptions={parentOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <MenuEditDialog
        open={editDialogState !== null}
        menuId={editDialogState?.menuId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        parentOptions={editDialogState?.parentOptions ?? []}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogState(null);
          }
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
