"use client";

import { useEffect, useState } from "react";
import { RotateCcwIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableToolbar } from "@/components/data-table/TableToolbar";

import type { TwoFactorFilterInput } from "../schemas/two-factor-filter.schema";

type TwoFactorTableToolbarProps = {
  filters: TwoFactorFilterInput;
  onFiltersChange: (filters: Partial<TwoFactorFilterInput>) => void;
};

export function TwoFactorTableToolbar({
  filters,
  onFiltersChange,
}: TwoFactorTableToolbarProps) {
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
            placeholder="Search by user name or email..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({
              status: value as TwoFactorFilterInput["status"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All records</SelectItem>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onFiltersChange({ search: "", status: "all", page: 1 })
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
