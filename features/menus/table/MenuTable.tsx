"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { MenuFilterInput } from "../schemas/menu-filter.schema";
import type { MenuListResult, MenuTableRow } from "../types/menu.type";
import { createMenuColumns } from "./columns";
import { MenuTableToolbar } from "./MenuTableToolbar";

type MenuTableProps = {
  data: MenuListResult;
  filters: MenuFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<MenuFilterInput>) => void;
  onEdit: (menu: MenuTableRow) => void;
  onCreate: () => void;
  onPreview: () => void;
  onRefresh: () => void;
};

export function MenuTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onPreview,
  onRefresh,
}: MenuTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (menu: MenuTableRow) => {
      if (isEditLoading) return;
      void onEdit(menu);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createMenuColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as MenuFilterInput["sortBy"],
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
    filters.search.length > 0 || filters.isActive !== "all";

  return (
    <div className="flex flex-col gap-4">
      <MenuTableToolbar
        key={`${filters.search}-${filters.isActive}`}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
        onPreview={onPreview}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No menus yet"
        emptyDescription="Create your first menu to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as MenuFilterInput["sortBy"],
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
