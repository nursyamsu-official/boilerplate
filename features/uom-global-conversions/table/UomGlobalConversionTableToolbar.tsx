"use client";

import { PlusIcon, RotateCcwIcon, SearchIcon } from "lucide-react";

import { useDebouncedFilterValue } from "@/components/data-table/use-debounced-filter-value";
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
import type { UomOption } from "@/features/uoms";

import type { UomGlobalConversionFilterInput } from "../schemas/uom-global-conversion-filter.schema";

type UomGlobalConversionTableToolbarProps = {
  filters: UomGlobalConversionFilterInput;
  uomOptions: UomOption[];
  onFiltersChange: (filters: Partial<UomGlobalConversionFilterInput>) => void;
  onCreate: () => void;
};

function formatUomOptionLabel(option: UomOption) {
  return option.symbol
    ? `${option.code} (${option.symbol}) — ${option.name}`
    : `${option.code} — ${option.name}`;
}

export function UomGlobalConversionTableToolbar({
  filters,
  uomOptions,
  onFiltersChange,
  onCreate,
}: UomGlobalConversionTableToolbarProps) {
  const {
    value: searchValue,
    setValue: setSearchValue,
    clearValue: clearSearch,
  } = useDebouncedFilterValue(filters.search, (search) =>
    onFiltersChange({ search, page: 1 }),
  );

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.fromUomId !== "all" ||
    filters.toUomId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search conversions..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.fromUomId}
          onValueChange={(value) =>
            onFiltersChange({
              fromUomId: value as UomGlobalConversionFilterInput["fromUomId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="From UOM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All from UOMs</SelectItem>
            {uomOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {formatUomOptionLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.toUomId}
          onValueChange={(value) =>
            onFiltersChange({
              toUomId: value as UomGlobalConversionFilterInput["toUomId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="To UOM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All to UOMs</SelectItem>
            {uomOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {formatUomOptionLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.isActive}
          onValueChange={(value) =>
            onFiltersChange({
              isActive: value as UomGlobalConversionFilterInput["isActive"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              clearSearch();
              onFiltersChange({
                search: "",
                isActive: "all",
                fromUomId: "all",
                toUomId: "all",
                page: 1,
              });
            }}
          >
            <RotateCcwIcon className="size-4" />
            Reset filters
          </Button>
        ) : null}
      </div>

      <Button type="button" onClick={onCreate}>
        <PlusIcon className="size-4" />
        Create conversion
      </Button>
    </TableToolbar>
  );
}
