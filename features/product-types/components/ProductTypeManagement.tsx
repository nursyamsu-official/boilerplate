"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { productTypeGetByIdAction } from "../actions/product-type-update.action";
import { buildProductTypeListUrl } from "../lib/product-type-filter-url";
import { mapProductTypeDetailToFormValues } from "../lib/product-type-form-defaults";
import type { ProductTypeFilterInput } from "../schemas/product-type-filter.schema";
import type {
  ProductTypeFormValues,
  ProductTypeListResult,
  ProductTypeTableRow,
} from "../types/product-type.type";
import { ProductTypeTable } from "../table/ProductTypeTable";
import { ProductTypeCreateDialog } from "./ProductTypeCreateDialog";
import { ProductTypeEditDialog } from "./ProductTypeEditDialog";

type ProductTypeManagementProps = {
  initialData: ProductTypeListResult;
  initialFilters: ProductTypeFilterInput;
};

type EditDialogState = {
  productTypeId: string;
  defaultValues: ProductTypeFormValues | null;
};

export function ProductTypeManagement({
  initialData,
  initialFilters,
}: ProductTypeManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<ProductTypeFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildProductTypeListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (productType: ProductTypeTableRow) => {
    setEditDialogState({
      productTypeId: productType.id,
      defaultValues: null,
    });

    try {
      const detail = await productTypeGetByIdAction({ id: productType.id });
      setEditDialogState({
        productTypeId: productType.id,
        defaultValues: mapProductTypeDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load product type");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Product Types</h2>
        <p className="text-sm text-muted-foreground">
          Manage product types used to classify products.
        </p>
      </div>

      <ProductTypeTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <ProductTypeCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <ProductTypeEditDialog
        open={editDialogState !== null}
        productTypeId={editDialogState?.productTypeId ?? null}
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
