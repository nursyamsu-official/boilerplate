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
  IconTooltipButton,
  TooltipIconTrigger,
} from "@/components/ui/icon-tooltip-button";

import { runRowActionWithToast } from "@/lib/run-row-action-with-toast";

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
    runRowActionWithToast({
      action: () => emailSettingDeleteAction({ id: setting.id }),
      onSuccess: onRefresh,
      toast: {
        loading: "Deleting...",
        success: "Deleted successfully",
        errorFallback: "Failed to delete",
      },
      setPending: setIsDeleting,
    });
  };

  return (
    <div className="flex items-center gap-1">
      <IconTooltipButton
        tooltip="Edit"
        aria-label={`Edit ${setting.name}`}
        onClick={() => onEdit(setting)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      {!setting.isDefault ? (
        <IconTooltipButton
          tooltip="Set as default"
          aria-label={`Set ${setting.name} as default`}
          onClick={handleSetDefault}
        >
          <StarIcon className="size-4" />
        </IconTooltipButton>
      ) : null}

      <IconTooltipButton
        tooltip={setting.isActive ? "Deactivate" : "Activate"}
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
      </IconTooltipButton>

      <AlertDialog>
        <TooltipIconTrigger tooltip="Delete">
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
        </TooltipIconTrigger>
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
