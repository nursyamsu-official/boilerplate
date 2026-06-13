"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { RoleOption } from "@/features/roles";

import { userGetByIdAction } from "../actions/user-update.action";
import { buildUserListUrl } from "../lib/user-filter-url";
import { mapUserDetailToFormValues } from "../lib/user-form-defaults";
import type { UserFilterInput } from "../schemas/user-filter.schema";
import type {
  UserFormValues,
  UserListResult,
  UserTableRow,
} from "../types/user.type";
import { UserTable } from "../table/UserTable";
import { UserCreateDialog } from "./UserCreateDialog";
import { UserEditDialog } from "./UserEditDialog";

type UserManagementProps = {
  initialData: UserListResult;
  initialFilters: UserFilterInput;
  roleOptions: RoleOption[];
};

type EditDialogState = {
  userId: string;
  defaultValues: UserFormValues;
};

export function UserManagement({
  initialData,
  initialFilters,
  roleOptions,
}: UserManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleFiltersChange = useCallback(
    (partial: Partial<UserFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildUserListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (user: UserTableRow) => {
    setIsEditLoading(true);

    try {
      const detail = await userGetByIdAction({ id: user.id });
      setEditDialogState({
        userId: user.id,
        defaultValues: mapUserDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load user");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Users</h2>
        <p className="text-sm text-muted-foreground">
          Manage user accounts, status, and role assignments.
        </p>
      </div>

      <UserTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <UserCreateDialog
        open={isCreateOpen}
        roleOptions={roleOptions}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <UserEditDialog
        open={editDialogState !== null}
        userId={editDialogState?.userId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        roleOptions={roleOptions}
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
