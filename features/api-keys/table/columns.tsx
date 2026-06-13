"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { ApiKeyTableRow } from "../types/api-key.type";
import { ApiKeyRowActions } from "./ApiKeyRowActions";

type CreateApiKeyColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onEdit: (row: ApiKeyTableRow) => void;
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

function formatDateTime(value: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function getStatusBadge(apiKey: ApiKeyTableRow) {
  if (apiKey.revokedAt) {
    return <Badge variant="destructive">Revoked</Badge>;
  }

  if (apiKey.expiresAt && apiKey.expiresAt.getTime() <= Date.now()) {
    return <Badge variant="secondary">Expired</Badge>;
  }

  if (!apiKey.isActive) {
    return <Badge variant="secondary">Inactive</Badge>;
  }

  return <Badge variant="default">Active</Badge>;
}

export function createApiKeyColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onEdit,
  onRefresh,
}: CreateApiKeyColumnsOptions): ColumnDef<ApiKeyTableRow>[] {
  return [
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
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {row.original.prefix}_***
          </span>
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "User",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.user.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => getStatusBadge(row.original),
    },
    {
      accessorKey: "lastUsedAt",
      header: () => (
        <SortableHeader
          label="Last used"
          columnId="lastUsedAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => formatDateTime(row.original.lastUsedAt),
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
      cell: ({ row }) => formatDateTime(row.original.expiresAt),
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
        <ApiKeyRowActions
          apiKey={row.original}
          onEdit={onEdit}
          onRefresh={onRefresh}
        />
      ),
    },
  ];
}
