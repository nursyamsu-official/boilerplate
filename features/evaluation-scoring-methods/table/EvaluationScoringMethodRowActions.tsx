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
  evaluationScoringMethodDeleteAction,
  evaluationScoringMethodToggleStatusAction,
} from "../actions/evaluation-scoring-method-delete.action";
import type { EvaluationScoringMethodTableRow } from "../types/evaluation-scoring-method.type";

type EvaluationScoringMethodRowActionsProps = {
  evaluationScoringMethod: EvaluationScoringMethodTableRow;
  onEdit: (evaluationScoringMethod: EvaluationScoringMethodTableRow) => void;
  onRefresh: () => void;
};

export function EvaluationScoringMethodRowActions({
  evaluationScoringMethod,
  onEdit,
  onRefresh,
}: EvaluationScoringMethodRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      evaluationScoringMethodToggleStatusAction({ id: evaluationScoringMethod.id }).then(() => {
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
      action: () => evaluationScoringMethodDeleteAction({ id: evaluationScoringMethod.id }),
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
        aria-label={`Edit ${evaluationScoringMethod.name}`}
        onClick={() => onEdit(evaluationScoringMethod)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={evaluationScoringMethod.isActive ? "Deactivate" : "Activate"}
        aria-label={
          evaluationScoringMethod.isActive
            ? `Deactivate ${evaluationScoringMethod.name}`
            : `Activate ${evaluationScoringMethod.name}`
        }
        onClick={handleToggleStatus}
      >
        {evaluationScoringMethod.isActive ? (
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
              disabled={evaluationScoringMethod.templateCount > 0}
              aria-label={`Delete ${evaluationScoringMethod.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this scoring method?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{evaluationScoringMethod.name}&quot;. Scoring methods with
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
