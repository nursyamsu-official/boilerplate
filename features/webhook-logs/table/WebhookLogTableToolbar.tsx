"use client";

import { useEffect, useState } from "react";
import { RotateCcwIcon, SearchIcon } from "lucide-react";

import { TableToolbar } from "@/components/data-table/TableToolbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WebhookOption } from "@/features/webhooks";

import type { WebhookLogFilterInput } from "../schemas/webhook-log-filter.schema";
import { webhookLogStatusFilterValues } from "../schemas/webhook-log-filter.schema";

type WebhookLogTableToolbarProps = {
  filters: WebhookLogFilterInput;
  webhookOptions: WebhookOption[];
  onFiltersChange: (filters: Partial<WebhookLogFilterInput>) => void;
};

export function WebhookLogTableToolbar({
  filters,
  webhookOptions,
  onFiltersChange,
}: WebhookLogTableToolbarProps) {
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (searchValue !== filters.search) {
        onFiltersChange({ search: searchValue, page: 1 });
      }
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchValue, filters.search, onFiltersChange]);

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.status !== "all" ||
    filters.webhookId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            key={filters.search}
            defaultValue={filters.search}
            placeholder="Search logs..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.webhookId}
          onValueChange={(value) =>
            onFiltersChange({
              webhookId: value,
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="Webhook" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All webhooks</SelectItem>
            {webhookOptions.map((webhook) => (
              <SelectItem key={webhook.id} value={webhook.id}>
                {webhook.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({
              status: value as WebhookLogFilterInput["status"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {webhookLogStatusFilterValues.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onFiltersChange({
                search: "",
                status: "all",
                webhookId: "all",
                page: 1,
              })
            }
          >
            <RotateCcwIcon className="size-4" />
            Reset filters
          </Button>
        ) : null}
      </div>
    </TableToolbar>
  );
}
