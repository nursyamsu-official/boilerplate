"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { UserOption } from "@/features/users";

import { apiKeyGetByIdAction } from "../actions/api-key.action";
import { buildApiKeyListUrl, mapApiKeyDetailToFormValues } from "../lib/api-key-form";
import type { ApiKeyFilterInput } from "../schemas/api-key.schema";
import type {
  ApiKeyFormValues,
  ApiKeyListResult,
  ApiKeyTableRow,
} from "../types/api-key.type";
import { ApiKeyTable } from "../table/ApiKeyTable";
import { ApiKeyCreateDialog } from "./ApiKeyCreateDialog";
import { ApiKeyEditDialog } from "./ApiKeyEditDialog";

type ApiKeyManagementProps = {
  initialData: ApiKeyListResult;
  initialFilters: ApiKeyFilterInput;
  userOptions: UserOption[];
};

type EditDialogState = {
  apiKeyId: string;
  defaultValues: ApiKeyFormValues;
};

export function ApiKeyManagement({
  initialData,
  initialFilters,
  userOptions,
}: ApiKeyManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleFiltersChange = useCallback(
    (partial: Partial<ApiKeyFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildApiKeyListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (apiKey: ApiKeyTableRow) => {
    setIsEditLoading(true);

    try {
      const detail = await apiKeyGetByIdAction({ id: apiKey.id });
      setEditDialogState({
        apiKeyId: apiKey.id,
        defaultValues: mapApiKeyDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load API key");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">API Keys</h2>
        <p className="text-sm text-muted-foreground">
          Create and manage API keys for platform integrations.
        </p>
      </div>

      <ApiKeyTable
        data={initialData}
        filters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onCreateClick={() => setIsCreateOpen(true)}
        onEdit={handleEdit}
        onRefresh={handleRefresh}
      />

      <ApiKeyCreateDialog
        open={isCreateOpen}
        userOptions={userOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      {editDialogState ? (
        <ApiKeyEditDialog
          open
          apiKeyId={editDialogState.apiKeyId}
          defaultValues={editDialogState.defaultValues}
          userOptions={userOptions}
          onOpenChange={(open) => {
            if (!open) {
              setEditDialogState(null);
            }
          }}
          onSuccess={handleRefresh}
        />
      ) : null}

      {isEditLoading ? (
        <p className="sr-only" aria-live="polite">
          Loading API key details...
        </p>
      ) : null}
    </div>
  );
}
