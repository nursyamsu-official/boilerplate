"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { ProductGroupOption } from "@/features/product-groups";

import type { ProductCategoryFilterInput } from "../schemas/product-category-filter.schema";
import type {
  ProductCategoryListResult,
  ProductCategoryTableRow,
} from "../types/product-category.type";
import { createProductCategoryColumns } from "./columns";
import { ProductCategoryTableToolbar } from "./ProductCategoryTableToolbar";

type ProductCategoryTableProps = {
  data: ProductCategoryListResult;
  filters: ProductCategoryFilterInput;
  groupOptions: ProductGroupOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<ProductCategoryFilterInput>) => void;
  onEdit: (country: ProductCategoryTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function ProductCategoryTable({
  data,
  filters,
  groupOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: ProductCategoryTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (country: ProductCategoryTableRow) => {
      if (isEditLoading) return;
      void onEdit(country);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createProductCategoryColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as ProductCategoryFilterInput["sortBy"],
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
    filters.groupId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <ProductCategoryTableToolbar
        filters={filters}
        groupOptions={groupOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No categories yet"
        emptyDescription="Create your first product category to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as ProductCategoryFilterInput["sortBy"],
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
        onPageSizeChange={(pageSize) =>
          onFiltersChange({ pageSize, page: 1 })
        }
      />
    </div>
  );
}
