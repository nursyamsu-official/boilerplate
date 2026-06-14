"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { SsoProviderFilterInput } from "../schemas/sso-provider-filter.schema";
import type {
  SsoProviderListResult,
  SsoProviderTableRow,
} from "../types/sso-provider.type";
import { createSsoProviderColumns } from "./columns";
import { SsoProviderTableToolbar } from "./SsoProviderTableToolbar";

type SsoProviderTableProps = {
  data: SsoProviderListResult;
  filters: SsoProviderFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<SsoProviderFilterInput>) => void;
  onEdit: (provider: SsoProviderTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function SsoProviderTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: SsoProviderTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (provider: SsoProviderTableRow) => {
      if (isEditLoading) return;
      void onEdit(provider);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createSsoProviderColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as SsoProviderFilterInput["sortBy"],
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
    filters.status !== "all" ||
    filters.protocol !== "all";

  return (
    <div className="flex flex-col gap-4">
      <SsoProviderTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No SSO providers yet"
        emptyDescription="Create your first SSO provider to enable external sign-in."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as SsoProviderFilterInput["sortBy"],
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
