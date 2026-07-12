"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { CompanyOption } from "@/features/companies";

import type { PurchasingGroupFilterInput } from "../schemas/purchasing-group-filter.schema";
import type {
  PurchasingGroupListResult,
  PurchasingGroupTableRow,
} from "../types/purchasing-group.type";
import { createPurchasingGroupColumns } from "./columns";
import { PurchasingGroupTableToolbar } from "./PurchasingGroupTableToolbar";

type PurchasingGroupTableProps = {
  data: PurchasingGroupListResult;
  filters: PurchasingGroupFilterInput;
  companyOptions: CompanyOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<PurchasingGroupFilterInput>) => void;
  onEdit: (unit: PurchasingGroupTableRow) => void;
  onCreate: () => void;
  onPreview: () => void;
  onRefresh: () => void;
};

export function PurchasingGroupTable({
  data,
  filters,
  companyOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onPreview,
  onRefresh,
}: PurchasingGroupTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (unit: PurchasingGroupTableRow) => {
      if (isEditLoading) return;
      void onEdit(unit);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createPurchasingGroupColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as PurchasingGroupFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
        onEdit: handleEdit,
        onRefresh,
      }),
    [
      filters.sortBy,
      filters.sortOrder,
      handleEdit,
      onRefresh,
      onFiltersChange,
    ],
  );

  const isFiltered =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.companyId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <PurchasingGroupTableToolbar
        filters={filters}
        companyOptions={companyOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
        onPreview={onPreview}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No Purchasing Groups yet"
        emptyDescription="Create your first Purchasing Group to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as PurchasingGroupFilterInput["sortBy"],
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
