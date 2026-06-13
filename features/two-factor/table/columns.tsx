"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { TwoFactorTableRow } from "../types/two-factor.type";
import { TwoFactorRowActions } from "./TwoFactorRowActions";

type CreateTwoFactorColumnsOptions = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onRefresh: () => void;
  onView: (row: TwoFactorTableRow) => void;
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

export function createTwoFactorColumns({
  sortBy,
  sortOrder,
  onSortChange,
  onRefresh,
  onView,
}: CreateTwoFactorColumnsOptions): ColumnDef<TwoFactorTableRow>[] {
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
      accessorKey: "twoFactorEnabled",
      header: "Account 2FA",
      enableSorting: false,
      cell: ({ row }) => (
        <Badge
          variant={row.original.user.twoFactorEnabled ? "default" : "secondary"}
        >
          {row.original.user.twoFactorEnabled ? "Enabled" : "Disabled"}
        </Badge>
      ),
    },
    {
      accessorKey: "verified",
      header: () => (
        <SortableHeader
          label="Verified"
          columnId="verified"
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ),
      cell: ({ row }) => (
        <Badge variant={row.original.verified ? "default" : "outline"}>
          {row.original.verified ? "Verified" : "Pending"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <TwoFactorRowActions
          record={row.original}
          onView={onView}
          onRefresh={onRefresh}
        />
      ),
    },
  ];
}
