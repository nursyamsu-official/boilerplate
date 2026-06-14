"use client";

import { useCallback, useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";

import type { WebhookFilterInput } from "../schemas/webhook-filter.schema";
import type {
  WebhookListResult,
  WebhookTableRow,
} from "../types/webhook.type";
import { createWebhookColumns } from "./columns";
import { WebhookTableToolbar } from "./WebhookTableToolbar";

type WebhookTableProps = {
  data: WebhookListResult;
  filters: WebhookFilterInput;
  isEditLoading?: boolean;
  onFiltersChange: (filters: Partial<WebhookFilterInput>) => void;
  onEdit: (webhook: WebhookTableRow) => void;
  onCreate: () => void;
  onRefresh: () => void;
};

export function WebhookTable({
  data,
  filters,
  isEditLoading = false,
  onFiltersChange,
  onEdit,
  onCreate,
  onRefresh,
}: WebhookTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const handleEdit = useCallback(
    (webhook: WebhookTableRow) => {
      if (isEditLoading) return;
      void onEdit(webhook);
    },
    [isEditLoading, onEdit],
  );

  const columns = useMemo(
    () =>
      createWebhookColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as WebhookFilterInput["sortBy"],
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
    filters.search.length > 0 || filters.status !== "all";

  return (
    <div className="flex flex-col gap-4">
      <WebhookTableToolbar
        filters={filters}
        onFiltersChange={onFiltersChange}
        onCreate={onCreate}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No webhooks yet"
        emptyDescription="Create your first webhook to receive event notifications."
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as WebhookFilterInput["sortBy"],
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
