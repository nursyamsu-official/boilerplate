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

import type { EmailLogTableRow } from "../types/email-log.type";

type EmailLogDetailDialogProps = {
  open: boolean;
  record: EmailLogTableRow | null;
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

export function EmailLogDetailDialog({
  open,
  record,
  onOpenChange,
}: EmailLogDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email log details</DialogTitle>
          <DialogDescription>
            Read-only view of the selected delivery record.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
        {record ? (
          <dl className="grid gap-4">
            <DetailField label="ID" value={record.id} />
            <DetailField
              label="Status"
              value={
                <Badge variant={getStatusVariant(record.status)}>
                  {record.status}
                </Badge>
              }
            />
            <DetailField label="To" value={record.toEmail} />
            <DetailField label="CC" value={record.ccEmail ?? "—"} />
            <DetailField label="BCC" value={record.bccEmail ?? "—"} />
            <DetailField label="Subject" value={record.subject} />
            <DetailField
              label="Template"
              value={
                record.template
                  ? `${record.template.name} (${record.template.code})`
                  : "—"
              }
            />
            <DetailField label="Attempts" value={record.attempts} />
            <DetailField
              label="Error"
              value={
                record.error ? (
                  <pre className="max-h-32 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {record.error}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="HTML body"
              value={
                record.bodyHtml ? (
                  <pre className="max-h-48 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {record.bodyHtml}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="Sent at"
              value={formatDateTimeLong(record.sentAt)}
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
