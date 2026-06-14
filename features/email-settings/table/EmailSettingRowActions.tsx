"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  CheckIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  emailSettingDeleteAction,
  emailSettingSetDefaultAction,
  emailSettingToggleStatusAction,
} from "../actions/email-setting-delete.action";
import type { EmailSettingTableRow } from "../types/email-setting.type";

type EmailSettingRowActionsProps = {
  setting: EmailSettingTableRow;
  onEdit: (setting: EmailSettingTableRow) => void;
  onRefresh: () => void;
};

export function EmailSettingRowActions({
  setting,
  onEdit,
  onRefresh,
}: EmailSettingRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      emailSettingToggleStatusAction({ id: setting.id }).then(() => {
        onRefresh();
      }),
      {
        loading: "Updating...",
        success: "Status updated",
        error: "Failed to update status",
      },
    );
  };

  const handleSetDefault = () => {
    toast.promise(
      emailSettingSetDefaultAction({ id: setting.id }).then(() => {
        onRefresh();
      }),
      {
        loading: "Updating...",
        success: "Default setting updated",
        error: "Failed to update default",
      },
    );
  };

  const handleDelete = () => {
    setIsDeleting(true);
    toast.promise(
      emailSettingDeleteAction({ id: setting.id })
        .then(() => onRefresh())
        .finally(() => setIsDeleting(false)),
      {
        loading: "Deleting...",
        success: "Deleted successfully",
        error: "Failed to delete",
      },
    );
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Edit ${setting.name}`}
        onClick={() => onEdit(setting)}
      >
        <PencilIcon className="size-4" />
      </Button>

      {!setting.isDefault ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Set ${setting.name} as default`}
          onClick={handleSetDefault}
        >
          <StarIcon className="size-4" />
        </Button>
      ) : null}

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={
          setting.isActive
            ? `Deactivate ${setting.name}`
            : `Activate ${setting.name}`
        }
        onClick={handleToggleStatus}
      >
        {setting.isActive ? (
          <XIcon className="size-4" />
        ) : (
          <CheckIcon className="size-4" />
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={setting.isDefault}
            aria-label={`Delete ${setting.name}`}
          >
            <TrashIcon className="size-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this setting?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{setting.name}&quot;. Default settings
              must be reassigned before deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
