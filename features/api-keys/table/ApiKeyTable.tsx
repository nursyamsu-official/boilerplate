"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { ApiKeyFilterInput } from "../schemas/api-key.schema";
import type { ApiKeyListResult, ApiKeyTableRow } from "../types/api-key.type";
import { createApiKeyColumns } from "./columns";
import { ApiKeyTableToolbar } from "./ApiKeyTableToolbar";

type ApiKeyTableProps = {
  data: ApiKeyListResult;
  filters: ApiKeyFilterInput;
  onFiltersChange: (filters: Partial<ApiKeyFilterInput>) => void;
  onCreateClick: () => void;
  onEdit: (row: ApiKeyTableRow) => void;
  onRefresh: () => void;
};

export function ApiKeyTable({
  data,
  filters,
  onFiltersChange,
  onCreateClick,
  onEdit,
  onRefresh,
}: ApiKeyTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createApiKeyColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as ApiKeyFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
        onEdit,
        onRefresh,
      }),
    [filters.sortBy, filters.sortOrder, onFiltersChange, onEdit, onRefresh],
  );

  const isFiltered =
    filters.search.length > 0 || filters.status !== "all";

  return (
    <div className="flex flex-col gap-4">
      <ApiKeyTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreateClick={onCreateClick}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No API keys yet"
        emptyDescription="Create an API key to get started."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as ApiKeyFilterInput["sortBy"],
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
