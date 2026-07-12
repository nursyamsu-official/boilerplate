"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { UomFilterInput } from "../schemas/uom-filter.schema";
import type { UomListResult, UomTableRow } from "../types/uom.type";
import { createUomColumns } from "./columns";
import { UomTableToolbar } from "./UomTableToolbar";

type UomTableProps = {
  data: UomListResult;
  filters: UomFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<UomFilterInput>) => void;
  onEdit: (uom: UomTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function UomTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: UomTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (uom: UomTableRow) => {
      if (isEditLoading) return;
      void onEdit(uom);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createUomColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as UomFilterInput["sortBy"],
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
    filters.uomType !== "all";

  return (
    <div className="flex flex-col gap-4">
      <UomTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No UOMs yet"
        emptyDescription="Create your first unit of measure to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as UomFilterInput["sortBy"],
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
