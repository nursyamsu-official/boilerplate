"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format-datetime";

import type { UomGlobalConversionTableRow } from "../types/uom-global-conversion.type";
import { UomGlobalConversionRowActions } from "./UomGlobalConversionRowActions";

type CreateUomGlobalConversionColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onEdit: (conversion: UomGlobalConversionTableRow) => void;
  onRefresh: () => void;
};

function SortableHeader({
  label,
  columnId,
  sortBy,
  sortOrder,
  onSortChange,
}: {
  label: string;
  columnId: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
}) {
  const isActive = sortBy === columnId;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-2 h-8 px-2"
      onClick={() => onSortChange(columnId)}
      aria-label={`Sort by ${label}`}
    >
      {label}
      {isActive ? (
        sortOrder === "asc" ? (
          <ArrowUpIcon className="size-3.5" />
        ) : (
          <ArrowDownIcon className="size-3.5" />
        )
      ) : null}
    </Button>
  );
}

function formatUomLabel(code: string, name: string) {
  return `${code} — ${name}`;
}

export function createUomGlobalConversionColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onEdit,
  onRefresh,
}: CreateUomGlobalConversionColumnsOptions): ColumnDef<UomGlobalConversionTableRow>[] {
  return [
    {
      id: "fromUom",
      header: "From",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {formatUomLabel(row.original.fromUomCode, row.original.fromUomName)}
        </span>
      ),
    },
    {
      id: "toUom",
      header: "To",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {formatUomLabel(row.original.toUomCode, row.original.toUomName)}
        </span>
      ),
    },
    {
      accessorKey: "conversionFactor",
      header: () => (
        <SortableHeader
          label="Factor"
          columnId="conversionFactor"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.original.conversionFactor.toLocaleString(undefined, {
            maximumFractionDigits: 6,
          })}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.description ? (
          <span
            className="block max-w-48 truncate text-muted-foreground"
            title={row.original.description}
          >
            {row.original.description}
          </span>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: () => (
        <SortableHeader
          label="Updated"
          columnId="updatedAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => formatDateTime(row.original.updatedAt),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <UomGlobalConversionRowActions
          conversion={row.original}
          onEdit={onEdit}
          onRefresh={onRefresh}
        />
      ),
    },
  ];
}
