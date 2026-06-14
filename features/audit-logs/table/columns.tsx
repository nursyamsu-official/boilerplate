"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format-datetime";

import type { AuditLogTableRow } from "../types/audit-log.type";

type CreateAuditLogColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
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

export function createAuditLogColumns({
  sortBy,
  sortOrder,
  onSortChange,
}: CreateAuditLogColumnsOptions): ColumnDef<AuditLogTableRow>[] {
  return [
    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader
          label="Created at"
          columnId="createdAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => formatDateTime(row.original.createdAt),
    },
    {
      accessorKey: "actor",
      header: "Actor",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.actor
          ? `${row.original.actor.name} (${row.original.actor.email})`
          : "—",
    },
    {
      accessorKey: "action",
      header: "Action",
      enableSorting: false,
      cell: ({ row }) => <Badge variant="outline">{row.original.action}</Badge>,
    },
    {
      accessorKey: "entity",
      header: "Entity",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.entity}</span>
      ),
    },
    {
      accessorKey: "entityId",
      header: "Entity ID",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="max-w-[10rem] truncate font-mono text-xs">
          {row.original.entityId ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "summary",
      header: "Summary",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="max-w-xs truncate text-muted-foreground">
          {row.original.summary ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "ipAddress",
      header: "IP address",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.original.ipAddress ?? "—"}
        </span>
      ),
    },
  ];
}
