"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { SsoProviderOption } from "@/features/sso-providers";

import type { SsoUserFilterInput } from "../schemas/sso-user-filter.schema";
import type { SsoUserListResult, SsoUserTableRow } from "../types/sso-user.type";
import { createSsoUserColumns } from "./columns";
import { SsoUserTableToolbar } from "./SsoUserTableToolbar";

type SsoUserTableProps = {
  data: SsoUserListResult;
  filters: SsoUserFilterInput;
  providerOptions: SsoProviderOption[];
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<SsoUserFilterInput>) => void;
  onEdit: (link: SsoUserTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function SsoUserTable({
  data,
  filters,
  providerOptions,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: SsoUserTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (link: SsoUserTableRow) => {
      if (isEditLoading) return;
      void onEdit(link);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createSsoUserColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as SsoUserFilterInput["sortBy"],
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
    filters.search.length > 0 || filters.providerId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <SsoUserTableToolbar
        filters={filters}
        providerOptions={providerOptions}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No SSO user links yet"
        emptyDescription="Link local users to external SSO identities."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as SsoUserFilterInput["sortBy"],
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
