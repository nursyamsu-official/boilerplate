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
  evaluationMethodDeleteAction,
  evaluationMethodToggleStatusAction,
} from "../actions/evaluation-method-delete.action";
import type { EvaluationMethodTableRow } from "../types/evaluation-method.type";

type EvaluationMethodRowActionsProps = {
  evaluationMethod: EvaluationMethodTableRow;
  onEdit: (evaluationMethod: EvaluationMethodTableRow) => void;
  onRefresh: () => void;
};

export function EvaluationMethodRowActions({
  evaluationMethod,
  onEdit,
  onRefresh,
}: EvaluationMethodRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      evaluationMethodToggleStatusAction({ id: evaluationMethod.id }).then(() => {
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
      action: () => evaluationMethodDeleteAction({ id: evaluationMethod.id }),
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
        aria-label={`Edit ${evaluationMethod.name}`}
        onClick={() => onEdit(evaluationMethod)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={evaluationMethod.isActive ? "Deactivate" : "Activate"}
        aria-label={
          evaluationMethod.isActive
            ? `Deactivate ${evaluationMethod.name}`
            : `Activate ${evaluationMethod.name}`
        }
        onClick={handleToggleStatus}
      >
        {evaluationMethod.isActive ? (
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
              disabled={evaluationMethod.templateCount > 0}
              aria-label={`Delete ${evaluationMethod.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this evaluation method?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{evaluationMethod.name}&quot;. Evaluation methods with
              templates cannot be deleted.
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
