"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { PermissionModuleFilterInput } from "../schemas/permission-module-filter.schema";
import type {
  PermissionModuleListResult,
  PermissionModuleTableRow,
} from "../types/permission-module.type";
import { createPermissionModuleColumns } from "./columns";
import { PermissionModuleTableToolbar } from "./PermissionModuleTableToolbar";

type PermissionModuleTableProps = {
  data: PermissionModuleListResult;
  filters: PermissionModuleFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<PermissionModuleFilterInput>) => void;
  onEdit: (module: PermissionModuleTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function PermissionModuleTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: PermissionModuleTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (module: PermissionModuleTableRow) => {
      if (isEditLoading) return;
      void onEdit(module);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createPermissionModuleColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as PermissionModuleFilterInput["sortBy"],
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
    filters.search.length > 0 || filters.isActive !== "all";

  return (
    <div className="flex flex-col gap-4">
      <PermissionModuleTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No modules yet"
        emptyDescription="Create your first permission module to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as PermissionModuleFilterInput["sortBy"],
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
