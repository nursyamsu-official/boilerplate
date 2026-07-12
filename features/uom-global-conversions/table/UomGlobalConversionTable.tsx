"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { UomOption } from "@/features/uoms";

import type { UomGlobalConversionFilterInput } from "../schemas/uom-global-conversion-filter.schema";
import type {
  UomGlobalConversionListResult,
  UomGlobalConversionTableRow,
} from "../types/uom-global-conversion.type";
import { createUomGlobalConversionColumns } from "./columns";
import { UomGlobalConversionTableToolbar } from "./UomGlobalConversionTableToolbar";

type UomGlobalConversionTableProps = {
  data: UomGlobalConversionListResult;
  filters: UomGlobalConversionFilterInput;
  uomOptions: UomOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<UomGlobalConversionFilterInput>) => void;
  onEdit: (conversion: UomGlobalConversionTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function UomGlobalConversionTable({
  data,
  filters,
  uomOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: UomGlobalConversionTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (conversion: UomGlobalConversionTableRow) => {
      if (isEditLoading) return;
      void onEdit(conversion);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createUomGlobalConversionColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as UomGlobalConversionFilterInput["sortBy"],
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
    filters.fromUomId !== "all" ||
    filters.toUomId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <UomGlobalConversionTableToolbar
        filters={filters}
        uomOptions={uomOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No global conversions yet"
        emptyDescription="Create your first UOM conversion to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as UomGlobalConversionFilterInput["sortBy"],
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
