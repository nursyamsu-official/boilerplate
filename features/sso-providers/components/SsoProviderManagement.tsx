"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { RoleOption } from "@/features/roles";

import { ssoProviderGetByIdAction } from "../actions/sso-provider-update.action";
import { buildSsoProviderListUrl } from "../lib/sso-provider-filter-url";
import { mapSsoProviderDetailToFormValues } from "../lib/sso-provider-form-defaults";
import type { SsoProviderFilterInput } from "../schemas/sso-provider-filter.schema";
import type {
  SsoProviderFormValues,
  SsoProviderListResult,
  SsoProviderTableRow,
} from "../types/sso-provider.type";
import { SsoProviderTable } from "../table/SsoProviderTable";
import { SsoProviderCreateDialog } from "./SsoProviderCreateDialog";
import { SsoProviderEditDialog } from "./SsoProviderEditDialog";

type SsoProviderManagementProps = {
  initialData: SsoProviderListResult;
  initialFilters: SsoProviderFilterInput;
  roleOptions: RoleOption[];
};

type EditDialogState = {
  providerId: string;
  defaultValues: SsoProviderFormValues | null;
  hasClientSecret: boolean;
};

export function SsoProviderManagement({
  initialData,
  initialFilters,
  roleOptions,
}: SsoProviderManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] =
    useState<EditDialogState | null>(null);
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<SsoProviderFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildSsoProviderListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (provider: SsoProviderTableRow) => {
    setEditDialogState({
      providerId: provider.id,
      defaultValues: null,
      hasClientSecret: false,
    });

    try {
      const detail = await ssoProviderGetByIdAction({ id: provider.id });
      setEditDialogState({
        providerId: provider.id,
        defaultValues: mapSsoProviderDetailToFormValues(detail),
        hasClientSecret: detail.hasClientSecret,
      });
    } catch {
      toast.error("Failed to load SSO provider");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">SSO Providers</h2>
        <p className="text-sm text-muted-foreground">
          Configure OIDC, OAuth2, and SAML identity providers.
        </p>
      </div>

      <SsoProviderTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <SsoProviderCreateDialog
        open={isCreateOpen}
        roleOptions={roleOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <SsoProviderEditDialog
        open={editDialogState !== null}
        providerId={editDialogState?.providerId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        roleOptions={roleOptions}
        hasClientSecret={editDialogState?.hasClientSecret}
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
