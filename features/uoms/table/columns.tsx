"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format-datetime";

import { UOM_TYPE_LABELS } from "../constants/uom.constants";
import type { UomTableRow } from "../types/uom.type";
import { UomRowActions } from "./UomRowActions";

type CreateUomColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onEdit: (uom: UomTableRow) => void;
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

export function createUomColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onEdit,
  onRefresh,
}: CreateUomColumnsOptions): ColumnDef<UomTableRow>[] {
  return [
    {
      accessorKey: "code",
      header: () => (
        <SortableHeader
          label="Code"
          columnId="code"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.code}</span>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <SortableHeader
          label="Name"
          columnId="name"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.symbol ? (
          <span className="font-mono text-xs">{row.original.symbol}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "uomType",
      header: () => (
        <SortableHeader
          label="Type"
          columnId="uomType"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">{UOM_TYPE_LABELS[row.original.uomType]}</Badge>
      ),
    },
    {
      accessorKey: "decimalPlaces",
      header: "Decimals",
      enableSorting: false,
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
      id: "conversions",
      header: "Conversions",
      enableSorting: false,
      cell: ({ row }) => row.original.conversionCount,
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
        <UomRowActions uom={row.original} onEdit={onEdit} onRefresh={onRefresh} />
      ),
    },
  ];
}
