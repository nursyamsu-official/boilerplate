"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogBody,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTimeLong } from "@/lib/format-datetime";

import type { SessionTableRow } from "../types/session.type";

type SessionDetailDialogProps = {
  open: boolean;
  session: SessionTableRow | null;
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

export function SessionDetailDialog({
  open,
  session,
  onOpenChange,
}: SessionDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Session details</DialogTitle>
          <DialogDescription>
            Read-only view of the selected session.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
        {session ? (
          <dl className="grid gap-4">
            <DetailField label="Session ID" value={session.id} />
            <DetailField
              label="User"
              value={`${session.user.name} (${session.user.email})`}
            />
            <DetailField
              label="IP address"
              value={
                session.ipAddress ? (
                  <span className="font-mono text-xs">{session.ipAddress}</span>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="User agent"
              value={
                session.userAgent ? (
                  <pre className="max-h-40 overflow-auto rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">
                    {session.userAgent}
                  </pre>
                ) : (
                  "—"
                )
              }
            />
            <DetailField
              label="Created at"
              value={formatDateTimeLong(session.createdAt)}
            />
            <DetailField
              label="Last active"
              value={formatDateTimeLong(session.updatedAt)}
            />
            <DetailField
              label="Expires at"
              value={formatDateTimeLong(session.expiresAt)}
            />
          </dl>
        ) : null}
        </DialogBody>
      </DialogScrollContent>
    </Dialog>
  );
}
