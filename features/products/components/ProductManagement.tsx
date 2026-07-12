"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { ProductCategoryOption } from "@/features/product-categories";
import type { ProductGroupOption } from "@/features/product-groups";
import type { ProductTypeOption } from "@/features/product-types";
import type { UomOption } from "@/features/uoms";

import { productGetByIdAction } from "../actions/product-update.action";
import { buildProductListUrl } from "../lib/product-filter-url";
import { mapProductDetailToFormValues } from "../lib/product-form-defaults";
import type { ProductFilterInput } from "../schemas/product-filter.schema";
import type {
  ProductFormValues,
  ProductListResult,
  ProductTableRow,
} from "../types/product.type";
import { ProductTable } from "../table/ProductTable";
import { ProductCreateDialog } from "./ProductCreateDialog";
import { ProductEditDialog } from "./ProductEditDialog";

type ProductManagementProps = {
  initialData: ProductListResult;
  initialFilters: ProductFilterInput;
  typeOptions: ProductTypeOption[];
  groupOptions: ProductGroupOption[];
  categoryOptions: ProductCategoryOption[];
  uomOptions: UomOption[];
};

type EditDialogState = {
  productId: string;
  defaultValues: ProductFormValues | null;
};

export function ProductManagement({
  initialData,
  initialFilters,
  typeOptions,
  groupOptions,
  categoryOptions,
  uomOptions,
}: ProductManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(null);
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<ProductFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildProductListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (product: ProductTableRow) => {
    setEditDialogState({
      productId: product.id,
      defaultValues: null,
    });

    try {
      const detail = await productGetByIdAction({ id: product.id });
      setEditDialogState({
        productId: product.id,
        defaultValues: mapProductDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load product");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Products</h2>
        <p className="text-sm text-muted-foreground">
          Manage products with type, group, category, and base UOM.
        </p>
      </div>

      <ProductTable
        data={initialData}
        filters={initialFilters}
        typeOptions={typeOptions}
        groupOptions={groupOptions}
        categoryOptions={categoryOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <ProductCreateDialog
        open={isCreateOpen}
        typeOptions={typeOptions}
        groupOptions={groupOptions}
        categoryOptions={categoryOptions}
        uomOptions={uomOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <ProductEditDialog
        open={editDialogState !== null}
        productId={editDialogState?.productId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        typeOptions={typeOptions}
        groupOptions={groupOptions}
        categoryOptions={categoryOptions}
        uomOptions={uomOptions}
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
