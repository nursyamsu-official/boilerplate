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
  purchasingGroupDeleteAction,
  purchasingGroupToggleStatusAction,
} from "../actions/purchasing-group-delete.action";
import type { PurchasingGroupTableRow } from "../types/purchasing-group.type";

type PurchasingGroupRowActionsProps = {
  unit: PurchasingGroupTableRow;
  onEdit: (unit: PurchasingGroupTableRow) => void;
  onRefresh: () => void;
};

export function PurchasingGroupRowActions({
  unit,
  onEdit,
  onRefresh,
}: PurchasingGroupRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      purchasingGroupToggleStatusAction({ id: unit.id }).then(() => {
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
      action: () => purchasingGroupDeleteAction({ id: unit.id }),
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
        aria-label={`Edit ${unit.name}`}
        onClick={() => onEdit(unit)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={unit.isActive ? "Deactivate" : "Activate"}
        aria-label={
          unit.isActive ? `Deactivate ${unit.name}` : `Activate ${unit.name}`
        }
        onClick={handleToggleStatus}
      >
        {unit.isActive ? (
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
              disabled={unit.childCount > 0}
              aria-label={`Delete ${unit.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this Purchasing Group?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{unit.name}&quot;. Units with child units
              cannot be deleted.
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
