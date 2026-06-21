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
  emailTemplateDeleteAction,
  emailTemplateToggleStatusAction,
} from "../actions/email-template-delete.action";
import type { EmailTemplateTableRow } from "../types/email-template.type";

type EmailTemplateRowActionsProps = {
  template: EmailTemplateTableRow;
  onEdit: (template: EmailTemplateTableRow) => void;
  onRefresh: () => void;
};

export function EmailTemplateRowActions({
  template,
  onEdit,
  onRefresh,
}: EmailTemplateRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      emailTemplateToggleStatusAction({ id: template.id }).then(() => {
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
      action: () => emailTemplateDeleteAction({ id: template.id }),
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
        aria-label={`Edit ${template.name}`}
        onClick={() => onEdit(template)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={template.isActive ? "Deactivate" : "Activate"}
        aria-label={
          template.isActive
            ? `Deactivate ${template.name}`
            : `Activate ${template.name}`
        }
        onClick={handleToggleStatus}
      >
        {template.isActive ? (
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
              disabled={template.isSystem}
              aria-label={`Delete ${template.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this template?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{template.name}&quot;. System templates
              and templates with logs cannot be deleted.
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
