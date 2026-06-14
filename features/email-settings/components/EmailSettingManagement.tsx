"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { emailSettingGetByIdAction } from "../actions/email-setting-update.action";
import { buildEmailSettingListUrl } from "../lib/email-setting-filter-url";
import { mapEmailSettingDetailToFormValues } from "../lib/email-setting-form-defaults";
import type { EmailSettingFilterInput } from "../schemas/email-setting-filter.schema";
import type {
  EmailSettingFormValues,
  EmailSettingListResult,
  EmailSettingTableRow,
} from "../types/email-setting.type";
import { EmailSettingTable } from "../table/EmailSettingTable";
import { EmailSettingCreateDialog } from "./EmailSettingCreateDialog";
import { EmailSettingEditDialog } from "./EmailSettingEditDialog";

type EmailSettingManagementProps = {
  initialData: EmailSettingListResult;
  initialFilters: EmailSettingFilterInput;
};

type EditDialogState = {
  settingId: string;
  defaultValues: EmailSettingFormValues;
  hasPassword: boolean;
  hasApiKey: boolean;
};

export function EmailSettingManagement({
  initialData,
  initialFilters,
}: EmailSettingManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleFiltersChange = useCallback(
    (partial: Partial<EmailSettingFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEmailSettingListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (setting: EmailSettingTableRow) => {
    setIsEditLoading(true);

    try {
      const detail = await emailSettingGetByIdAction({ id: setting.id });
      setEditDialogState({
        settingId: setting.id,
        defaultValues: mapEmailSettingDetailToFormValues(detail),
        hasPassword: detail.hasPassword,
        hasApiKey: detail.hasApiKey,
      });
    } catch {
      toast.error("Failed to load email setting");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Email Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure SMTP and API-based email providers.
        </p>
      </div>

      <EmailSettingTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <EmailSettingCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <EmailSettingEditDialog
        open={editDialogState !== null}
        settingId={editDialogState?.settingId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        hasPassword={editDialogState?.hasPassword ?? false}
        hasApiKey={editDialogState?.hasApiKey ?? false}
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
