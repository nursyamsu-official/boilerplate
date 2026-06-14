"use client";

import { useMemo } from "react";
import type { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { TablePagination } from "@/components/data-table/TablePagination";
import type { WebhookOption } from "@/features/webhooks";

import type { WebhookLogFilterInput } from "../schemas/webhook-log-filter.schema";
import type {
  WebhookLogListResult,
  WebhookLogTableRow,
} from "../types/webhook-log.type";
import { createWebhookLogColumns } from "./columns";
import { WebhookLogTableToolbar } from "./WebhookLogTableToolbar";

type WebhookLogTableProps = {
  data: WebhookLogListResult;
  filters: WebhookLogFilterInput;
  webhookOptions: WebhookOption[];
  onFiltersChange: (filters: Partial<WebhookLogFilterInput>) => void;
  onRowClick?: (row: WebhookLogTableRow) => void;
};

export function WebhookLogTable({
  data,
  filters,
  webhookOptions,
  onFiltersChange,
  onRowClick,
}: WebhookLogTableProps) {
  const sorting: SortingState = useMemo(
    () => [{ id: filters.sortBy, desc: filters.sortOrder === "desc" }],
    [filters.sortBy, filters.sortOrder],
  );

  const columns = useMemo(
    () =>
      createWebhookLogColumns({
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSortChange: (sortBy) => {
          const nextSortOrder =
            filters.sortBy === sortBy && filters.sortOrder === "asc"
              ? "desc"
              : "asc";

          onFiltersChange({
            sortBy: sortBy as WebhookLogFilterInput["sortBy"],
            sortOrder: nextSortOrder,
            page: 1,
          });
        },
      }),
    [filters.sortBy, filters.sortOrder, onFiltersChange],
  );

  const isFiltered =
    filters.search.length > 0 ||
    filters.status !== "all" ||
    filters.webhookId !== "all";

  return (
    <div className="flex flex-col gap-4">
      <WebhookLogTableToolbar
        filters={filters}
        webhookOptions={webhookOptions}
        onFiltersChange={onFiltersChange}
      />

      <DataTable
        columns={columns}
        data={data.items}
        sorting={sorting}
        isFiltered={isFiltered}
        emptyTitle="No webhook logs yet"
        emptyDescription="Webhook delivery records will appear here."
        onRowClick={onRowClick}
        onSortingChange={(nextSorting) => {
          const first = nextSorting[0];
          if (!first) return;

          onFiltersChange({
            sortBy: first.id as WebhookLogFilterInput["sortBy"],
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
