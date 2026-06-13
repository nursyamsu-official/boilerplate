"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { LoginHistoryTableRow } from "../types/login-history.type";

type LoginHistoryDetailDialogProps = {
  open: boolean;
  record: LoginHistoryTableRow | null;
  onOpenChange: (open: boolean) => void;
};

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
  }).format(value);
}

function DetailField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm wrap-break-word">{value}</dd>
    </div>
  );
}

export function LoginHistoryDetailDialog({
  open,
  record,
  onOpenChange,
}: LoginHistoryDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Login attempt details</DialogTitle>
          <DialogDescription>
            Read-only view of the selected login history record.
          </DialogDescription>
        </DialogHeader>

        {record ? (
          <dl className="grid gap-4">
            <DetailField label="ID" value={record.id} />
            <DetailField label="User ID" value={record.userId ?? "—"} />
            <DetailField
              label="Linked user"
              value={
                record.user ? `${record.user.name} (${record.user.email})` : "—"
              }
            />
            <DetailField label="Email" value={record.email} />
            <DetailField
              label="Status"
              value={
                <Badge
                  variant={
                    record.status === "SUCCESS" ? "default" : "destructive"
                  }
                >
                  {record.status === "SUCCESS" ? "Success" : "Failed"}
                </Badge>
              }
            />
            <DetailField
              label="Failure reason"
              value={record.failureReason ?? "—"}
            />
            <DetailField
              label="IP address"
              value={
                record.ipAddress ? (
                  <span className="font-mono text-xs">{record.ipAddress}</span>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="User agent"
              value={
                record.userAgent ? (
                  <pre className="max-h-40 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {record.userAgent}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="Created at"
              value={formatDateTime(record.createdAt)}
            />
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
