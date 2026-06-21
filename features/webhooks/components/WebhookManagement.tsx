"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { UserOption } from "@/features/users";

import { webhookGetByIdAction } from "../actions/webhook-update.action";
import { buildWebhookListUrl } from "../lib/webhook-filter-url";
import { mapWebhookDetailToFormValues } from "../lib/webhook-form-defaults";
import type { WebhookFilterInput } from "../schemas/webhook-filter.schema";
import type {
  WebhookFormValues,
  WebhookListResult,
  WebhookTableRow,
} from "../types/webhook.type";
import { WebhookTable } from "../table/WebhookTable";
import { WebhookCreateDialog } from "./WebhookCreateDialog";
import { WebhookEditDialog } from "./WebhookEditDialog";

type WebhookManagementProps = {
  initialData: WebhookListResult;
  initialFilters: WebhookFilterInput;
  userOptions: UserOption[];
};

type EditDialogState = {
  webhookId: string;
  defaultValues: WebhookFormValues | null;
  hasSecret: boolean;
};

export function WebhookManagement({
  initialData,
  initialFilters,
  userOptions,
}: WebhookManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<WebhookFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildWebhookListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (webhook: WebhookTableRow) => {
    setEditDialogState({
      webhookId: webhook.id,
      defaultValues: null,
      hasSecret: false,
    });

    try {
      const detail = await webhookGetByIdAction({ id: webhook.id });
      setEditDialogState({
        webhookId: webhook.id,
        defaultValues: mapWebhookDetailToFormValues(detail),
        hasSecret: detail.hasSecret,
      });
    } catch {
      toast.error("Failed to load webhook");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Webhooks</h2>
        <p className="text-sm text-muted-foreground">
          Configure outbound webhook endpoints and event subscriptions.
        </p>
      </div>

      <WebhookTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <WebhookCreateDialog
        open={isCreateOpen}
        userOptions={userOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <WebhookEditDialog
        open={editDialogState !== null}
        webhookId={editDialogState?.webhookId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        userOptions={userOptions}
        hasSecret={editDialogState?.hasSecret}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogState(null);
          }
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
