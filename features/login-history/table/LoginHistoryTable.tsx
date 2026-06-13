"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { LoginHistoryFilterInput } from "../schemas/login-history-filter.schema";
import type {
  LoginHistoryListResult,
  LoginHistoryTableRow,
} from "../types/login-history.type";
import { createLoginHistoryColumns } from "./columns";
import { LoginHistoryTableToolbar } from "./LoginHistoryTableToolbar";

type LoginHistoryTableProps = {
  data: LoginHistoryListResult;
  filters: LoginHistoryFilterInput;
  onFiltersChange: (filters: Partial<LoginHistoryFilterInput>) => void;
  onRowClick?: (row: LoginHistoryTableRow) => void;
};

export function LoginHistoryTable({
  data,
  filters,
  onFiltersChange,
  onRowClick,
}: LoginHistoryTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createLoginHistoryColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as LoginHistoryFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
      }),
    [filters.sortBy, filters.sortOrder, onFiltersChange],
  );

  const isFiltered =
    filters.search.length > 0 || filters.status !== "all";

  return (
    <div className="flex flex-col gap-4">
      <LoginHistoryTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No login history yet"
        emptyDescription="Login attempts will appear here once users sign in."
        onRowClick={onRowClick}
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as LoginHistoryFilterInput["sortBy"],
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
