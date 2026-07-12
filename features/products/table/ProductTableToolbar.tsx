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
import type { ProductCategoryOption } from "@/features/product-categories";
import type { ProductGroupOption } from "@/features/product-groups";
import type { ProductTypeOption } from "@/features/product-types";

import type { ProductFilterInput } from "../schemas/product-filter.schema";

type ProductTableToolbarProps = {
  filters: ProductFilterInput;
  typeOptions: ProductTypeOption[];
  groupOptions: ProductGroupOption[];
  categoryOptions: ProductCategoryOption[];
  onFiltersChange: (filters: Partial<ProductFilterInput>) => void;
  onCreate: () => void;
};

export function ProductTableToolbar({
  filters,
  typeOptions,
  groupOptions,
  categoryOptions,
  onFiltersChange,
  onCreate,
}: ProductTableToolbarProps) {
  const {
    value: searchValue,
    setValue: setSearchValue,
    clearValue: clearSearch,
  } = useDebouncedFilterValue(filters.search, (search) =>
    onFiltersChange({ search, page: 1 }),
  );

  const filteredCategoryOptions =
    filters.productGroupId === "all"
      ? categoryOptions
      : categoryOptions.filter(
          (option) => option.groupId === filters.productGroupId,
        );

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.isActive !== "all" ||
    filters.productTypeId !== "all" ||
    filters.productGroupId !== "all" ||
    filters.productCategoryId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search products..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.productTypeId}
          onValueChange={(value) =>
            onFiltersChange({
              productTypeId: value as ProductFilterInput["productTypeId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44" size="sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {typeOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.productGroupId}
          onValueChange={(value) => {
            const nextGroupId = value as ProductFilterInput["productGroupId"];
            const nextCategoryId =
              filters.productCategoryId !== "all" &&
              !categoryOptions.some(
                (option) =>
                  option.id === filters.productCategoryId &&
                  option.groupId === nextGroupId,
              )
                ? "all"
                : filters.productCategoryId;

            onFiltersChange({
              productGroupId: nextGroupId,
              productCategoryId: nextCategoryId,
              page: 1,
            });
          }}
        >
          <SelectTrigger className="w-full sm:w-44" size="sm">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All groups</SelectItem>
            {groupOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.productCategoryId}
          onValueChange={(value) =>
            onFiltersChange({
              productCategoryId: value as ProductFilterInput["productCategoryId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44" size="sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {filteredCategoryOptions.map((option) => (
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
              isActive: value as ProductFilterInput["isActive"],
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
                productTypeId: "all",
                productGroupId: "all",
                productCategoryId: "all",
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
        Create product
      </Button>
    </TableToolbar>
  );
}
