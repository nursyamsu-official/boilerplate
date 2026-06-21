"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { SsoProviderOption } from "@/features/sso-providers";
import type { UserOption } from "@/features/users";

import { ssoUserGetByIdAction } from "../actions/sso-user-update.action";
import { buildSsoUserListUrl } from "../lib/sso-user-filter-url";
import { mapSsoUserDetailToFormValues } from "../lib/sso-user-form-defaults";
import type { SsoUserFilterInput } from "../schemas/sso-user-filter.schema";
import type {
  SsoUserFormValues,
  SsoUserListResult,
  SsoUserTableRow,
} from "../types/sso-user.type";
import { SsoUserTable } from "../table/SsoUserTable";
import { SsoUserCreateDialog } from "./SsoUserCreateDialog";
import { SsoUserEditDialog } from "./SsoUserEditDialog";

type SsoUserManagementProps = {
  initialData: SsoUserListResult;
  initialFilters: SsoUserFilterInput;
  userOptions: UserOption[];
  providerOptions: SsoProviderOption[];
};

type EditDialogState = {
  linkId: string;
  defaultValues: SsoUserFormValues | null;
};

export function SsoUserManagement({
  initialData,
  initialFilters,
  userOptions,
  providerOptions,
}: SsoUserManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<SsoUserFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildSsoUserListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (link: SsoUserTableRow) => {
    setEditDialogState({ linkId: link.id, defaultValues: null });

    try {
      const detail = await ssoUserGetByIdAction({ id: link.id });
      setEditDialogState({
        linkId: link.id,
        defaultValues: mapSsoUserDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load SSO user link");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">SSO Users</h2>
        <p className="text-sm text-muted-foreground">
          Manage links between local users and external SSO identities.
        </p>
      </div>

      <SsoUserTable
        data={initialData}
        filters={initialFilters}
        providerOptions={providerOptions}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <SsoUserCreateDialog
        open={isCreateOpen}
        userOptions={userOptions}
        providerOptions={providerOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <SsoUserEditDialog
        open={editDialogState !== null}
        linkId={editDialogState?.linkId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        userOptions={userOptions}
        providerOptions={providerOptions}
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
