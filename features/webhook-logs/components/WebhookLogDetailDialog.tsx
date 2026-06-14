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

import type { WebhookLogTableRow } from "../types/webhook-log.type";

type WebhookLogDetailDialogProps = {
  open: boolean;
  record: WebhookLogTableRow | null;
  onOpenChange: (open: boolean) => void;
};

function formatDateTime(value: Date | null) {
  if (!value) return "—";
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

export function WebhookLogDetailDialog({
  open,
  record,
  onOpenChange,
}: WebhookLogDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Webhook log details</DialogTitle>
          <DialogDescription>
            Read-only view of the selected delivery record.
          </DialogDescription>
        </DialogHeader>

        {record ? (
          <dl className="grid gap-4">
            <DetailField label="ID" value={record.id} />
            <DetailField
              label="Webhook"
              value={`${record.webhook.name} (${record.webhook.url})`}
            />
            <DetailField
              label="Status"
              value={
                <Badge variant={getStatusVariant(record.status)}>
                  {record.status}
                </Badge>
              }
            />
            <DetailField label="Event" value={record.event} />
            <DetailField
              label="Response status"
              value={record.responseStatus ?? "—"}
            />
            <DetailField label="Attempts" value={record.attempts} />
            <DetailField
              label="Payload"
              value={
                <pre className="max-h-48 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                  {record.payload}
                </pre>
              }
            />
            <DetailField
              label="Request headers"
              value={
                record.requestHeaders ? (
                  <pre className="max-h-32 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {record.requestHeaders}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="Response body"
              value={
                record.responseBody ? (
                  <pre className="max-h-32 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {record.responseBody}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
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
              label="Next retry at"
              value={formatDateTime(record.nextRetryAt)}
            />
            <DetailField
              label="Delivered at"
              value={formatDateTime(record.deliveredAt)}
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
