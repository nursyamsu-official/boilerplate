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

import type { SsoProviderFilterInput } from "../schemas/sso-provider-filter.schema";
import {
  ssoProtocolValues,
  ssoProviderStatusFilterValues,
} from "../schemas/sso-provider-filter.schema";

type SsoProviderTableToolbarProps = {
  filters: SsoProviderFilterInput;
  onFiltersChange: (filters: Partial<SsoProviderFilterInput>) => void;
  onCreate: () => void;
};

export function SsoProviderTableToolbar({
  filters,
  onFiltersChange,
  onCreate,
}: SsoProviderTableToolbarProps) {
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
    filters.protocol !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            key={filters.search}
            defaultValue={filters.search}
            placeholder="Search providers..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({
              status: value as SsoProviderFilterInput["status"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {ssoProviderStatusFilterValues.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all"
                  ? "All statuses"
                  : status === "active"
                    ? "Active"
                    : "Inactive"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.protocol}
          onValueChange={(value) =>
            onFiltersChange({
              protocol: value as SsoProviderFilterInput["protocol"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All protocols</SelectItem>
            {ssoProtocolValues.map((protocol) => (
              <SelectItem key={protocol} value={protocol}>
                {protocol}
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
                protocol: "all",
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
        Create provider
      </Button>
    </TableToolbar>
  );
}
