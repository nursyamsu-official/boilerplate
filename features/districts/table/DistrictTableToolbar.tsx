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
import type { CountryOption } from "@/features/countries";
import type { ProvinceOption } from "@/features/provinces";

import type { DistrictFilterInput } from "../schemas/district-filter.schema";

type DistrictTableToolbarProps = {
  filters: DistrictFilterInput;
  countryOptions: CountryOption[];
  provinceOptions: ProvinceOption[];
  onFiltersChange: (filters: Partial<DistrictFilterInput>) => void;
  onCreate: () => void;
};

export function DistrictTableToolbar({
  filters,
  countryOptions,
  provinceOptions,
  onFiltersChange,
  onCreate,
}: DistrictTableToolbarProps) {
  const {
    value: searchValue,
    setValue: setSearchValue,
    clearValue: clearSearch,
  } = useDebouncedFilterValue(filters.search, (search) =>
    onFiltersChange({ search, page: 1 }),
  );

  const filteredProvinceOptions =
    filters.countryId === "all"
      ? provinceOptions
      : provinceOptions.filter(
          (option) => option.countryId === filters.countryId,
        );

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.countryId !== "all" ||
    filters.provinceId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search districts..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.countryId}
          onValueChange={(value) =>
            onFiltersChange({
              countryId: value as DistrictFilterInput["countryId"],
              provinceId: "all",
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countryOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.provinceId}
          onValueChange={(value) =>
            onFiltersChange({
              provinceId: value as DistrictFilterInput["provinceId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48" size="sm">
            <SelectValue placeholder="Province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All provinces</SelectItem>
            {filteredProvinceOptions.map((option) => (
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
              isActive: value as DistrictFilterInput["isActive"],
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
                countryId: "all",
                provinceId: "all",
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
        Create district
      </Button>
    </TableToolbar>
  );
}
