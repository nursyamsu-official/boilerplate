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
import type { SsoProviderOption } from "@/features/sso-providers";

import type { SsoUserFilterInput } from "../schemas/sso-user-filter.schema";

type SsoUserTableToolbarProps = {
  filters: SsoUserFilterInput;
  providerOptions: SsoProviderOption[];
  onFiltersChange: (filters: Partial<SsoUserFilterInput>) => void;
  onCreate: () => void;
};

export function SsoUserTableToolbar({
  filters,
  providerOptions,
  onFiltersChange,
  onCreate,
}: SsoUserTableToolbarProps) {
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
    filters.search.length > 0 || filters.providerId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            key={filters.search}
            defaultValue={filters.search}
            placeholder="Search SSO users..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.providerId}
          onValueChange={(value) =>
            onFiltersChange({
              providerId: value,
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All providers</SelectItem>
            {providerOptions.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
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
                providerId: "all",
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
        Create link
      </Button>
    </TableToolbar>
  );
}
