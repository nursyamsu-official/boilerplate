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
import type { EvaluationMethodOption } from "@/features/evaluation-methods";
import type { EvaluationScoringMethodOption } from "@/features/evaluation-scoring-methods";

import type { EvaluationTemplateFilterInput } from "../schemas/evaluation-template-filter.schema";

type EvaluationTemplateTableToolbarProps = {
  filters: EvaluationTemplateFilterInput;
  methodOptions: EvaluationMethodOption[];
  scoringMethodOptions: EvaluationScoringMethodOption[];
  onFiltersChange: (filters: Partial<EvaluationTemplateFilterInput>) => void;
  onCreate: () => void;
};

export function EvaluationTemplateTableToolbar({
  filters,
  methodOptions,
  scoringMethodOptions,
  onFiltersChange,
  onCreate,
}: EvaluationTemplateTableToolbarProps) {
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
    filters.evaluationMethodId !== "all" ||
    filters.evaluationScoringMethodId !== "all";

  return (
    <TableToolbar>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            placeholder="Search templates..."
            className="pl-8"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <Select
          value={filters.evaluationMethodId}
          onValueChange={(value) =>
            onFiltersChange({
              evaluationMethodId: value as EvaluationTemplateFilterInput["evaluationMethodId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44" size="sm">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All methods</SelectItem>
            {methodOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.evaluationScoringMethodId}
          onValueChange={(value) =>
            onFiltersChange({
              evaluationScoringMethodId:
                value as EvaluationTemplateFilterInput["evaluationScoringMethodId"],
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-44" size="sm">
            <SelectValue placeholder="Scoring method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All scoring methods</SelectItem>
            {scoringMethodOptions.map((option) => (
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
              isActive: value as EvaluationTemplateFilterInput["isActive"],
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
                evaluationMethodId: "all",
                evaluationScoringMethodId: "all",
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
        Create evaluation template
      </Button>
    </TableToolbar>
  );
}
