"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { ProductCategoryOption } from "@/features/product-categories";
import type { ProductGroupOption } from "@/features/product-groups";
import type { ProductTypeOption } from "@/features/product-types";

import type { ProductFilterInput } from "../schemas/product-filter.schema";
import type { ProductListResult, ProductTableRow } from "../types/product.type";
import { createProductColumns } from "./columns";
import { ProductTableToolbar } from "./ProductTableToolbar";

type ProductTableProps = {
  data: ProductListResult;
  filters: ProductFilterInput;
  typeOptions: ProductTypeOption[];
  groupOptions: ProductGroupOption[];
  categoryOptions: ProductCategoryOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<ProductFilterInput>) => void;
  onEdit: (product: ProductTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function ProductTable({
  data,
  filters,
  typeOptions,
  groupOptions,
  categoryOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: ProductTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (product: ProductTableRow) => {
      if (isEditLoading) return;
      void onEdit(product);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createProductColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as ProductFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
        onEdit: handleEdit,
        onRefresh,
      }),
    [filters.sortBy, filters.sortOrder, handleEdit, onRefresh, onFiltersChange],
  );

  const isFiltered =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.productTypeId !== "all" ||
    filters.productGroupId !== "all" ||
    filters.productCategoryId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <ProductTableToolbar
        filters={filters}
        typeOptions={typeOptions}
        groupOptions={groupOptions}
        categoryOptions={categoryOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No products yet"
        emptyDescription="Create your first product to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as ProductFilterInput["sortBy"],
            sortOrder: first.desc ? "desc" : "asc",
            page: 1,
          });
        }}
      />

      <TablePagination
        page={data.page}
        pageSize={data.pageSize}
        total={data.total}
        onPageChange={(page) => onFiltersChange({ page })}
        onPageSizeChange={(pageSize) => onFiltersChange({ pageSize, page: 1 })}
      />
    </div>
  );
}
