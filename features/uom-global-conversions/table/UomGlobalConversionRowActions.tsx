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
  uomGlobalConversionDeleteAction,
  uomGlobalConversionToggleStatusAction,
} from "../actions/uom-global-conversion-delete.action";
import type { UomGlobalConversionTableRow } from "../types/uom-global-conversion.type";

type UomGlobalConversionRowActionsProps = {
  conversion: UomGlobalConversionTableRow;
  onEdit: (conversion: UomGlobalConversionTableRow) => void;
  onRefresh: () => void;
};

export function UomGlobalConversionRowActions({
  conversion,
  onEdit,
  onRefresh,
}: UomGlobalConversionRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      uomGlobalConversionToggleStatusAction({ id: conversion.id }).then(() => {
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
      action: () => uomGlobalConversionDeleteAction({ id: conversion.id }),
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
        aria-label={`Edit conversion ${conversion.fromUomCode} to ${conversion.toUomCode}`}
        onClick={() => onEdit(conversion)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={conversion.isActive ? "Deactivate" : "Activate"}
        aria-label={
          conversion.isActive
            ? `Deactivate conversion ${conversion.fromUomCode} to ${conversion.toUomCode}`
            : `Activate conversion ${conversion.fromUomCode} to ${conversion.toUomCode}`
        }
        onClick={handleToggleStatus}
      >
        {conversion.isActive ? (
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
              disabled={isDeleting}
              aria-label={`Delete conversion ${conversion.fromUomCode} to ${conversion.toUomCode}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this conversion?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the conversion from{" "}
              {conversion.fromUomName} to {conversion.toUomName}. This action
              cannot be undone.
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
