"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { EmailLogTableRow } from "../types/email-log.type";

type CreateEmailLogColumnsOptions = {
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

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function getStatusVariant(status: EmailLogTableRow["status"]) {
  switch (status) {
    case "SENT":
      return "default" as const;
    case "FAILED":
    case "BOUNCED":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}

export function createEmailLogColumns({
  sortBy,
  sortOrder,
  onSortChange,
}: CreateEmailLogColumnsOptions): ColumnDef<EmailLogTableRow>[] {
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
      accessorKey: "toEmail",
      header: () => (
        <SortableHeader
          label="To"
          columnId="toEmail"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="max-w-xs truncate">{row.original.subject}</span>
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
      id: "template",
      header: "Template",
      enableSorting: false,
      cell: ({ row }) =>
        row.original.template ? row.original.template.name : "—",
    },
    {
      accessorKey: "sentAt",
      header: () => (
        <SortableHeader
          label="Sent at"
          columnId="sentAt"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) =>
        row.original.sentAt ? formatDateTime(row.original.sentAt) : "—",
    },
    {
      accessorKey: "attempts",
      header: "Attempts",
      enableSorting: false,
    },
  ];
}
