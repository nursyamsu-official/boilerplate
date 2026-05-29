"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIconDisplay } from "@/lib/lucide-icon-display";

import type { MenuTableRow } from "../types/menu.type";
import { MenuRowActions } from "./MenuRowActions";

type CreateMenuColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onEdit: (menu: MenuTableRow) => void;
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
  const nextOrder = isActive && sortOrder === "asc" ? "desc" : "asc";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-2 h-8 px-2"
      onClick={() => onSortChange(columnId)}
      aria-label={`Sort by ${label} ${nextOrder}`}
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

export function createMenuColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onEdit,
  onRefresh,
}: CreateMenuColumnsOptions): ColumnDef<MenuTableRow>[] {
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
      accessorKey: "label",
      header: () => (
        <SortableHeader
          label="Label"
          columnId="label"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
    },
    {
      id: "parent",
      header: "Parent",
      enableSorting: false,
      cell: ({ row }) => row.original.parentLabel ?? "—",
    },
    {
      accessorKey: "path",
      header: "Path",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="block max-w-48 truncate text-muted-foreground">
          {row.original.path ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "icon",
      header: "Icon",
      enableSorting: false,
      cell: ({ row }) => (
        <LucideIconDisplay
          name={row.original.icon}
          className="size-4"
          fallback={
            row.original.icon ? (
              <span className="text-xs text-muted-foreground" title={row.original.icon}>
                {row.original.icon}
              </span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )
          }
        />
      ),
    },
    {
      accessorKey: "sortOrder",
      header: () => (
        <SortableHeader
          label="Sort"
          columnId="sortOrder"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
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
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <MenuRowActions menu={row.original} onEdit={onEdit} onRefresh={onRefresh} />
      ),
    },
  ];
}
