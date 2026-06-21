"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogBody,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTimeLong } from "@/lib/format-datetime";

import { formatAuditLogJson } from "../lib/audit-log-filter-url";
import type { AuditLogTableRow } from "../types/audit-log.type";

type AuditLogDetailDialogProps = {
  open: boolean;
  record: AuditLogTableRow | null;
  onOpenChange: (open: boolean) => void;
};

function DetailField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm wrap-break-word">{value}</dd>
    </div>
  );
}

export function AuditLogDetailDialog({
  open,
  record,
  onOpenChange,
}: AuditLogDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Audit log details</DialogTitle>
          <DialogDescription>
            Read-only view of the selected audit log record.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
        {record ? (
          <dl className="grid gap-4">
            <DetailField label="ID" value={record.id} />
            <DetailField
              label="Actor"
              value={
                record.actor
                  ? `${record.actor.name} (${record.actor.email})`
                  : "—"
              }
            />
            <DetailField
              label="Action"
              value={<Badge variant="outline">{record.action}</Badge>}
            />
            <DetailField label="Entity" value={record.entity} />
            <DetailField label="Entity ID" value={record.entityId ?? "—"} />
            <DetailField label="Summary" value={record.summary ?? "—"} />
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
                  <pre className="max-h-32 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {record.userAgent}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="Old values"
              value={
                <pre className="max-h-48 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                  {formatAuditLogJson(record.oldValues)}
                </pre>
              }
            />
            <DetailField
              label="New values"
              value={
                <pre className="max-h-48 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                  {formatAuditLogJson(record.newValues)}
                </pre>
              }
            />
            <DetailField
              label="Created at"
              value={formatDateTimeLong(record.createdAt)}
            />
          </dl>
        ) : null}
        </DialogBody>
      </DialogScrollContent>
    </Dialog>
  );
}
