"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { SessionFilterInput } from "../schemas/session-filter.schema";
import type { SessionListResult, SessionTableRow } from "../types/session.type";
import { createSessionColumns } from "./columns";
import { SessionTableToolbar } from "./SessionTableToolbar";

type SessionTableProps = {
  data: SessionListResult;
  filters: SessionFilterInput;
  onFiltersChange: (filters: Partial<SessionFilterInput>) => void;
  onRowView: (row: SessionTableRow) => void;
  onRefresh: () => void;
};

export function SessionTable({
  data,
  filters,
  onFiltersChange,
  onRowView,
  onRefresh,
}: SessionTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createSessionColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as SessionFilterInput["sortBy"],
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
      <SessionTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No sessions found"
        emptyDescription="Active user sessions will appear here."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as SessionFilterInput["sortBy"],
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
