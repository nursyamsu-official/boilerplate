"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PencilIcon, TrashIcon } from "lucide-react";

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

import { permissionDeleteAction } from "../actions/permission-delete.action";
import type { PermissionTableRow } from "../types/permission.type";

type PermissionRowActionsProps = {
  permission: PermissionTableRow;
  onEdit: (permission: PermissionTableRow) => void;
  onRefresh: () => void;
};

export function PermissionRowActions({
  permission,
  onEdit,
  onRefresh,
}: PermissionRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    runRowActionWithToast({
      action: () => permissionDeleteAction({ id: permission.id }),
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
        aria-label={`Edit ${permission.name}`}
        onClick={() => onEdit(permission)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <AlertDialog>
        <TooltipIconTrigger tooltip="Delete">
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={permission.isSystem}
              aria-label={`Delete ${permission.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this permission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{permission.name}&quot;. System
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
