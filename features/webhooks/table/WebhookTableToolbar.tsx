"use client";

import { useEffect, useState } from "react";
import { PlusIcon, RotateCcwIcon, SearchIcon } from "lucide-react";

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

import type { WebhookFilterInput } from "../schemas/webhook-filter.schema";

type WebhookTableToolbarProps = {
  filters: WebhookFilterInput;
  onFiltersChange: (filters: Partial<WebhookFilterInput>) => void;
  onCreate: () => void;
};

export function WebhookTableToolbar({
  filters,
  onFiltersChange,
  onCreate,
}: WebhookTableToolbarProps) {
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
    filters.search.length > 0 || filters.status !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            key={filters.search}
            defaultValue={filters.search}
            placeholder="Search webhooks..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({
              status: value as WebhookFilterInput["status"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
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
                page: 1,
              })
            }
          >
            <RotateCcwIcon className="size-4" />
            Reset filters
          </Button>
        ) : null}
      </div>

      <Button type="button" onClick={onCreate}>
        <PlusIcon className="size-4" />
        Create webhook
      </Button>
    </TableToolbar>
  );
}
