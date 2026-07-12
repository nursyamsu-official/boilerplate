"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format-datetime";

import type { CountryTableRow } from "../types/country.type";
import { CountryRowActions } from "./CountryRowActions";

type CreateCountryColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onEdit: (country: CountryTableRow) => void;
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

export function createCountryColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onEdit,
  onRefresh,
}: CreateCountryColumnsOptions): ColumnDef<CountryTableRow>[] {
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
      id: "provinces",
      header: "Provinces",
      enableSorting: false,
      cell: ({ row }) => row.original.provinceCount,
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader
          label="Created"
          columnId="createdAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => formatDateTime(row.original.createdAt),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <CountryRowActions
          country={row.original}
          onEdit={onEdit}
          onRefresh={onRefresh}
        />
      ),
    },
  ];
}
