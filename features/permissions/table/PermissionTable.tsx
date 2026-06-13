"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { PermissionModuleOption } from "@/features/permission-modules";

import type { PermissionFilterInput } from "../schemas/permission-filter.schema";
import type {
  PermissionListResult,
  PermissionTableRow,
} from "../types/permission.type";
import { createPermissionColumns } from "./columns";
import { PermissionTableToolbar } from "./PermissionTableToolbar";

type PermissionTableProps = {
  data: PermissionListResult;
  filters: PermissionFilterInput;
  moduleOptions: PermissionModuleOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<PermissionFilterInput>) => void;
  onEdit: (permission: PermissionTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function PermissionTable({
  data,
  filters,
  moduleOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: PermissionTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (permission: PermissionTableRow) => {
      if (isEditLoading) return;
      void onEdit(permission);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createPermissionColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as PermissionFilterInput["sortBy"],
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
    filters.search.length > 0 || filters.moduleId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <PermissionTableToolbar
        filters={filters}
        moduleOptions={moduleOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No permissions yet"
        emptyDescription="Create your first permission to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as PermissionFilterInput["sortBy"],
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
