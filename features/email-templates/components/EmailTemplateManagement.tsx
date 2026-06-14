"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { emailTemplateGetByIdAction } from "../actions/email-template-update.action";
import { buildEmailTemplateListUrl } from "../lib/email-template-filter-url";
import { mapEmailTemplateDetailToFormValues } from "../lib/email-template-form-defaults";
import type { EmailTemplateFilterInput } from "../schemas/email-template-filter.schema";
import type {
  EmailTemplateFormValues,
  EmailTemplateListResult,
  EmailTemplateTableRow,
} from "../types/email-template.type";
import { EmailTemplateTable } from "../table/EmailTemplateTable";
import { EmailTemplateCreateDialog } from "./EmailTemplateCreateDialog";
import { EmailTemplateEditDialog } from "./EmailTemplateEditDialog";

type EmailTemplateManagementProps = {
  initialData: EmailTemplateListResult;
  initialFilters: EmailTemplateFilterInput;
};

type EditDialogState = {
  templateId: string;
  defaultValues: EmailTemplateFormValues;
  isSystem: boolean;
};

export function EmailTemplateManagement({
  initialData,
  initialFilters,
}: EmailTemplateManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleFiltersChange = useCallback(
    (partial: Partial<EmailTemplateFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildEmailTemplateListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (template: EmailTemplateTableRow) => {
    setIsEditLoading(true);

    try {
      const detail = await emailTemplateGetByIdAction({ id: template.id });
      setEditDialogState({
        templateId: template.id,
        defaultValues: mapEmailTemplateDetailToFormValues(detail),
        isSystem: detail.isSystem,
      });
    } catch {
      toast.error("Failed to load template");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Email Templates</h2>
        <p className="text-sm text-muted-foreground">
          Manage reusable email content for notifications and workflows.
        </p>
      </div>

      <EmailTemplateTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <EmailTemplateCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <EmailTemplateEditDialog
        open={editDialogState !== null}
        templateId={editDialogState?.templateId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        isSystem={editDialogState?.isSystem ?? false}
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
