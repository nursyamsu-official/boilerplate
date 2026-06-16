"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from "lucide-react";

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

import {
  permissionModuleDeleteAction,
  permissionModuleToggleStatusAction,
} from "../actions/permission-module-delete.action";
import type { PermissionModuleTableRow } from "../types/permission-module.type";

type PermissionModuleRowActionsProps = {
  module: PermissionModuleTableRow;
  onEdit: (module: PermissionModuleTableRow) => void;
  onRefresh: () => void;
};

export function PermissionModuleRowActions({
  module,
  onEdit,
  onRefresh,
}: PermissionModuleRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      permissionModuleToggleStatusAction({ id: module.id }).then(() => {
        onRefresh();
      }),
      {
        loading: "Updating...",
        success: "Status updated",
        error: "Failed to update status",
      },
    );
  };

  const handleDelete = () => {
    setIsDeleting(true);
    toast.promise(
      permissionModuleDeleteAction({ id: module.id })
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
      <IconTooltipButton
        tooltip="Edit"
        aria-label={`Edit ${module.name}`}
        onClick={() => onEdit(module)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={module.isActive ? "Deactivate" : "Activate"}
        aria-label={
          module.isActive ? `Deactivate ${module.name}` : `Activate ${module.name}`
        }
        onClick={handleToggleStatus}
      >
        {module.isActive ? (
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
              disabled={module.isSystem}
              aria-label={`Delete ${module.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this module?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{module.name}&quot;. Modules with
              permissions cannot be deleted.
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
