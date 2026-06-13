"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { RoleFilterInput } from "../schemas/role-filter.schema";
import type { RoleListResult, RoleTableRow } from "../types/role.type";
import { createRoleColumns } from "./columns";
import { RoleTableToolbar } from "./RoleTableToolbar";

type RoleTableProps = {
  data: RoleListResult;
  filters: RoleFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<RoleFilterInput>) => void;
  onEdit: (role: RoleTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function RoleTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: RoleTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (role: RoleTableRow) => {
      if (isEditLoading) return;
      void onEdit(role);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createRoleColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as RoleFilterInput["sortBy"],
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
      <RoleTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No roles yet"
        emptyDescription="Create your first role to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as RoleFilterInput["sortBy"],
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
