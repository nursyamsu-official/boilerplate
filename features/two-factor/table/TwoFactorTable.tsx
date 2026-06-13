"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { TwoFactorFilterInput } from "../schemas/two-factor-filter.schema";
import type {
  TwoFactorListResult,
  TwoFactorTableRow,
} from "../types/two-factor.type";
import { createTwoFactorColumns } from "./columns";
import { TwoFactorTableToolbar } from "./TwoFactorTableToolbar";

type TwoFactorTableProps = {
  data: TwoFactorListResult;
  filters: TwoFactorFilterInput;
  onFiltersChange: (filters: Partial<TwoFactorFilterInput>) => void;
  onRowView: (row: TwoFactorTableRow) => void;
  onRefresh: () => void;
};

export function TwoFactorTable({
  data,
  filters,
  onFiltersChange,
  onRowView,
  onRefresh,
}: TwoFactorTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createTwoFactorColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as TwoFactorFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
        onRefresh,
        onView: onRowView,
      }),
    [filters.sortBy, filters.sortOrder, onFiltersChange, onRefresh, onRowView],
  );

  const isFiltered =
    filters.search.length > 0 || filters.status !== "all";

  return (
    <div className="flex flex-col gap-4">
      <TwoFactorTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No two-factor records"
        emptyDescription="Users with two-factor authentication enabled will appear here."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as TwoFactorFilterInput["sortBy"],
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
