"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { formatEventsForForm } from "../lib/webhook-form-defaults";
import type { WebhookTableRow } from "../types/webhook.type";
import { WebhookRowActions } from "./WebhookRowActions";

type CreateWebhookColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onEdit: (webhook: WebhookTableRow) => void;
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

function getDeliveryStatusVariant(status: WebhookTableRow["lastDeliveryStatus"]) {
  switch (status) {
    case "SUCCESS":
      return "default" as const;
    case "FAILED":
      return "destructive" as const;
    case "RETRYING":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export function createWebhookColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onEdit,
  onRefresh,
}: CreateWebhookColumnsOptions): ColumnDef<WebhookTableRow>[] {
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
    },
    {
      accessorKey: "url",
      header: () => (
        <SortableHeader
          label="URL"
          columnId="url"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <span className="block max-w-xs truncate" title={row.original.url}>
          {row.original.url}
        </span>
      ),
    },
    {
      accessorKey: "events",
      header: "Events",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="block max-w-xs truncate" title={row.original.events}>
          {formatEventsForForm(row.original.events)}
        </span>
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
      accessorKey: "lastDeliveryStatus",
      header: "Last delivery",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.lastDeliveryStatus ? (
          <Badge variant={getDeliveryStatusVariant(row.original.lastDeliveryStatus)}>
            {row.original.lastDeliveryStatus}
          </Badge>
        ) : (
          "—"
        ),
    },
    {
      accessorKey: "lastDeliveryAt",
      header: () => (
        <SortableHeader
          label="Last delivered"
          columnId="lastDeliveryAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => formatDateTime(row.original.lastDeliveryAt),
    },
    {
      accessorKey: "failureCount",
      header: "Failures",
      enableSorting: false,
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
        <WebhookRowActions
          webhook={row.original}
          onEdit={onEdit}
          onRefresh={onRefresh}
        />
      ),
    },
  ];
}
