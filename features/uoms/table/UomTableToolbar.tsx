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

import {
  UOM_TYPE_LABELS,
  UOM_TYPE_VALUES,
} from "../constants/uom.constants";
import type { UomFilterInput } from "../schemas/uom-filter.schema";

type UomTableToolbarProps = {
  filters: UomFilterInput;
  onFiltersChange: (filters: Partial<UomFilterInput>) => void;
  onCreate: () => void;
};

export function UomTableToolbar({
  filters,
  onFiltersChange,
  onCreate,
}: UomTableToolbarProps) {
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
    filters.uomType !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search UOMs..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.uomType}
          onValueChange={(value) =>
            onFiltersChange({
              uomType: value as UomFilterInput["uomType"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {UOM_TYPE_VALUES.map((type) => (
              <SelectItem key={type} value={type}>
                {UOM_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.isActive}
          onValueChange={(value) =>
            onFiltersChange({
              isActive: value as UomFilterInput["isActive"],
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
                uomType: "all",
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
        Create UOM
      </Button>
    </TableToolbar>
  );
}
