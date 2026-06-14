"use client";

import { RotateCcwIcon, SearchIcon } from "lucide-react";

import { useDebouncedFilterValue } from "@/components/data-table/use-debounced-filter-value";

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

import type { AuditLogFilterInput } from "../schemas/audit-log-filter.schema";

type AuditLogTableToolbarProps = {
  filters: AuditLogFilterInput;
  onFiltersChange: (filters: Partial<AuditLogFilterInput>) => void;
};

export function AuditLogTableToolbar({
  filters,
  onFiltersChange,
}: AuditLogTableToolbarProps) {
  const {
    value: searchValue,
    setValue: setSearchValue,
    clearValue: clearSearch,
  } = useDebouncedFilterValue(filters.search, (search) =>
    onFiltersChange({ search, page: 1 }),
  );
  const {
    value: entityValue,
    setValue: setEntityValue,
    clearValue: clearEntity,
  } = useDebouncedFilterValue(filters.entity, (entity) =>
    onFiltersChange({ entity, page: 1 }),
  );

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.entity.length > 0 ||
    filters.action !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search summary, entity, actor..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Input
          value={entityValue}
          placeholder="Filter by entity"
          className="w-full sm:w-44"
          onChange={(event) => setEntityValue(event.target.value)}
        />

        <Select
          value={filters.action}
          onValueChange={(value) =>
            onFiltersChange({
              action: value as AuditLogFilterInput["action"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-40" size="sm">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
            <SelectItem value="LOGIN">Login</SelectItem>
            <SelectItem value="LOGOUT">Logout</SelectItem>
            <SelectItem value="EXPORT">Export</SelectItem>
            <SelectItem value="IMPORT">Import</SelectItem>
            <SelectItem value="ASSIGN">Assign</SelectItem>
            <SelectItem value="REVOKE">Revoke</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              clearSearch();
              clearEntity();
              onFiltersChange({
                search: "",
                entity: "",
                action: "all",
                page: 1,
              });
            }}
          >
            <RotateCcwIcon className="size-4" />
            Reset filters
          </Button>
        ) : null}
      </div>
    </TableToolbar>
  );
}
