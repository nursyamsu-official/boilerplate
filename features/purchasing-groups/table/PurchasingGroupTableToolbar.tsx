"use client";

import { EyeIcon, PlusIcon, RotateCcwIcon, SearchIcon } from "lucide-react";

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
import type { CompanyOption } from "@/features/companies";

import type { PurchasingGroupFilterInput } from "../schemas/purchasing-group-filter.schema";

type PurchasingGroupTableToolbarProps = {
  filters: PurchasingGroupFilterInput;
  companyOptions: CompanyOption[];
  onFiltersChange: (filters: Partial<PurchasingGroupFilterInput>) => void;
  onCreate: () => void;
  onPreview: () => void;
};

export function PurchasingGroupTableToolbar({
  filters,
  companyOptions,
  onFiltersChange,
  onCreate,
  onPreview,
}: PurchasingGroupTableToolbarProps) {
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
    filters.companyId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search Purchasing Groups..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.companyId}
          onValueChange={(value) =>
            onFiltersChange({
              companyId: value as PurchasingGroupFilterInput["companyId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All companies</SelectItem>
            {companyOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.isActive}
          onValueChange={(value) =>
            onFiltersChange({
              isActive: value as PurchasingGroupFilterInput["isActive"],
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
                companyId: "all",
                page: 1,
              });
            }}
          >
            <RotateCcwIcon className="size-4" />
            Reset filters
          </Button>
        ) : null}
      </div>

      <Button type="button" variant="outline" onClick={onPreview}>
        <EyeIcon className="size-4" />
        Preview
      </Button>

      <Button type="button" onClick={onCreate}>
        <PlusIcon className="size-4" />
        Create unit
      </Button>
    </TableToolbar>
  );
}
