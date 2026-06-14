"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format-datetime";

import type { WebhookLogTableRow } from "../types/webhook-log.type";

type CreateWebhookLogColumnsOptions = {
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

function getStatusVariant(status: WebhookLogTableRow["status"]) {
  switch (status) {
    case "SUCCESS":
      return "default" as const;
    case "FAILED":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}

export function createWebhookLogColumns({
  sortBy,
  sortOrder,
  onSortChange,
}: CreateWebhookLogColumnsOptions): ColumnDef<WebhookLogTableRow>[] {
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
      id: "webhook",
      header: "Webhook",
      enableSorting: false,
      cell: ({ row }) => row.original.webhook.name,
    },
    {
      accessorKey: "event",
      header: () => (
        <SortableHeader
          label="Event"
          columnId="event"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => (
        <Badge variant={getStatusVariant(row.original.status)}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "responseStatus",
      header: "Response",
      enableSorting: false,
      cell: ({ row }) => row.original.responseStatus ?? "—",
    },
    {
      accessorKey: "attempts",
      header: "Attempts",
      enableSorting: false,
    },
    {
      accessorKey: "deliveredAt",
      header: () => (
        <SortableHeader
          label="Delivered at"
          columnId="deliveredAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => formatDateTime(row.original.deliveredAt),
    },
  ];
}
