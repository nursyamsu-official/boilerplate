"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import type { WebhookOption } from "@/features/webhooks";

import { buildWebhookLogListUrl } from "../lib/webhook-log-filter-url";
import type { WebhookLogFilterInput } from "../schemas/webhook-log-filter.schema";
import type {
  WebhookLogListResult,
  WebhookLogTableRow,
} from "../types/webhook-log.type";
import { WebhookLogTable } from "../table/WebhookLogTable";
import { WebhookLogDetailDialog } from "./WebhookLogDetailDialog";

type WebhookLogManagementProps = {
  initialData: WebhookLogListResult;
  initialFilters: WebhookLogFilterInput;
  webhookOptions: WebhookOption[];
};

export function WebhookLogManagement({
  initialData,
  initialFilters,
  webhookOptions,
}: WebhookLogManagementProps) {
  const router = useRouter();
  const [selectedRecord, setSelectedRecord] =
    useState<WebhookLogTableRow | null>(null);

  const handleFiltersChange = useCallback(
    (partial: Partial<WebhookLogFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildWebhookLogListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Webhook Logs</h2>
        <p className="text-sm text-muted-foreground">
          Review webhook delivery history and failures.
        </p>
      </div>

      <WebhookLogTable
        data={initialData}
        filters={initialFilters}
        webhookOptions={webhookOptions}
        onFiltersChange={handleFiltersChange}
        onRowClick={setSelectedRecord}
      />

      <WebhookLogDetailDialog
        open={selectedRecord !== null}
        record={selectedRecord}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRecord(null);
          }
        }}
      />
    </div>
  );
}
