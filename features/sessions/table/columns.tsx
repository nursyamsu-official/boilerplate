"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format-datetime";

import type { SessionTableRow } from "../types/session.type";
import { SessionRowActions } from "./SessionRowActions";

type CreateSessionColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onRefresh: () => void;
  onView: (row: SessionTableRow) => void;
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

function isExpired(expiresAt: Date) {
  return expiresAt.getTime() <= Date.now();
}

export function createSessionColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onRefresh,
  onView,
}: CreateSessionColumnsOptions): ColumnDef<SessionTableRow>[] {
  return [
    {
      accessorKey: "user",
      header: "User",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.user.email}
          </span>
        </div>
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
    {
      accessorKey: "userAgent",
      header: "User agent",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="block max-w-xs truncate text-muted-foreground">
          {row.original.userAgent ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "expiresAt",
      header: () => (
        <SortableHeader
          label="Expires"
          columnId="expiresAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span
          className={
            isExpired(row.original.expiresAt)
              ? "text-muted-foreground"
              : undefined
          }
        >
          {formatDateTime(row.original.expiresAt)}
        </span>
      ),
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
      enableHiding: false,
      cell: ({ row }) => (
        <SessionRowActions
          session={row.original}
          onView={onView}
          onRefresh={onRefresh}
        />
      ),
    },
  ];
}
