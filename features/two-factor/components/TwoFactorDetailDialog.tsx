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

import type { TwoFactorTableRow } from "../types/two-factor.type";

type TwoFactorDetailDialogProps = {
  open: boolean;
  record: TwoFactorTableRow | null;
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

export function TwoFactorDetailDialog({
  open,
  record,
  onOpenChange,
}: TwoFactorDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Two-factor details</DialogTitle>
          <DialogDescription>
            Read-only view. Secrets and backup codes are never shown.
          </DialogDescription>
        </DialogHeader>

        {record ? (
          <dl className="grid gap-4">
            <DetailField label="Record ID" value={record.id} />
            <DetailField
              label="User"
              value={`${record.user.name} (${record.user.email})`}
            />
            <DetailField
              label="Account 2FA"
              value={
                <Badge
                  variant={
                    record.user.twoFactorEnabled ? "default" : "secondary"
                  }
                >
                  {record.user.twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
              }
            />
            <DetailField
              label="Verified"
              value={
                <Badge variant={record.verified ? "default" : "outline"}>
                  {record.verified ? "Verified" : "Pending"}
                </Badge>
              }
            />
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
