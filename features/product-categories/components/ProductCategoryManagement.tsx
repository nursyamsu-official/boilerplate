"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { ProductGroupOption } from "@/features/product-groups";

import { productCategoryGetByIdAction } from "../actions/product-category-update.action";
import { buildProductCategoryListUrl } from "../lib/product-category-filter-url";
import { mapProductCategoryDetailToFormValues } from "../lib/product-category-form-defaults";
import type { ProductCategoryFilterInput } from "../schemas/product-category-filter.schema";
import type {
  ProductCategoryFormValues,
  ProductCategoryListResult,
  ProductCategoryTableRow,
} from "../types/product-category.type";
import { ProductCategoryTable } from "../table/ProductCategoryTable";
import { ProductCategoryCreateDialog } from "./ProductCategoryCreateDialog";
import { ProductCategoryEditDialog } from "./ProductCategoryEditDialog";

type ProductCategoryManagementProps = {
  initialData: ProductCategoryListResult;
  initialFilters: ProductCategoryFilterInput;
  groupOptions: ProductGroupOption[];
};

type EditDialogState = {
  productCategoryId: string;
  defaultValues: ProductCategoryFormValues | null;
};

export function ProductCategoryManagement({
  initialData,
  initialFilters,
  groupOptions,
}: ProductCategoryManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<ProductCategoryFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildProductCategoryListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (productCategory: ProductCategoryTableRow) => {
    setEditDialogState({
      productCategoryId: productCategory.id,
      defaultValues: null,
    });

    try {
      const detail = await productCategoryGetByIdAction({ id: productCategory.id });
      setEditDialogState({
        productCategoryId: productCategory.id,
        defaultValues: mapProductCategoryDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load product category");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Product Categories</h2>
        <p className="text-sm text-muted-foreground">
          Manage product categories within product groups.
        </p>
      </div>

      <ProductCategoryTable
        data={initialData}
        filters={initialFilters}
        groupOptions={groupOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <ProductCategoryCreateDialog
        open={isCreateOpen}
        groupOptions={groupOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <ProductCategoryEditDialog
        open={editDialogState !== null}
        productCategoryId={editDialogState?.productCategoryId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        groupOptions={groupOptions}
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
