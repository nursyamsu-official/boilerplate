"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { productGroupGetByIdAction } from "../actions/product-group-update.action";
import { buildProductGroupListUrl } from "../lib/product-group-filter-url";
import { mapProductGroupDetailToFormValues } from "../lib/product-group-form-defaults";
import type { ProductGroupFilterInput } from "../schemas/product-group-filter.schema";
import type {
  ProductGroupFormValues,
  ProductGroupListResult,
  ProductGroupTableRow,
} from "../types/product-group.type";
import { ProductGroupTable } from "../table/ProductGroupTable";
import { ProductGroupCreateDialog } from "./ProductGroupCreateDialog";
import { ProductGroupEditDialog } from "./ProductGroupEditDialog";

type ProductGroupManagementProps = {
  initialData: ProductGroupListResult;
  initialFilters: ProductGroupFilterInput;
};

type EditDialogState = {
  productGroupId: string;
  defaultValues: ProductGroupFormValues | null;
};

export function ProductGroupManagement({
  initialData,
  initialFilters,
}: ProductGroupManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<ProductGroupFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildProductGroupListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (productGroup: ProductGroupTableRow) => {
    setEditDialogState({
      productGroupId: productGroup.id,
      defaultValues: null,
    });

    try {
      const detail = await productGroupGetByIdAction({ id: productGroup.id });
      setEditDialogState({
        productGroupId: productGroup.id,
        defaultValues: mapProductGroupDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load product group");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Product Groups</h2>
        <p className="text-sm text-muted-foreground">
          Manage product groups that contain categories.
        </p>
      </div>

      <ProductGroupTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <ProductGroupCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <ProductGroupEditDialog
        open={editDialogState !== null}
        productGroupId={editDialogState?.productGroupId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
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
