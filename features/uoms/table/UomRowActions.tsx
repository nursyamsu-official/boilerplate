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
import { runRowActionWithToast } from "@/lib/run-row-action-with-toast";

import {
  uomDeleteAction,
  uomToggleStatusAction,
} from "../actions/uom-delete.action";
import type { UomTableRow } from "../types/uom.type";

type UomRowActionsProps = {
  uom: UomTableRow;
  onEdit: (uom: UomTableRow) => void;
  onRefresh: () => void;
};

export function UomRowActions({ uom, onEdit, onRefresh }: UomRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      uomToggleStatusAction({ id: uom.id }).then(() => {
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
    runRowActionWithToast({
      action: () => uomDeleteAction({ id: uom.id }),
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
        aria-label={`Edit ${uom.name}`}
        onClick={() => onEdit(uom)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={uom.isActive ? "Deactivate" : "Activate"}
        aria-label={
          uom.isActive ? `Deactivate ${uom.name}` : `Activate ${uom.name}`
        }
        onClick={handleToggleStatus}
      >
        {uom.isActive ? (
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
              disabled={isDeleting || uom.conversionCount > 0}
              aria-label={`Delete ${uom.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this UOM?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{uom.name}&quot;. UOMs used in global
              conversions cannot be deleted.
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
