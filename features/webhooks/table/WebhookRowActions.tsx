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
  webhookDeleteAction,
  webhookToggleStatusAction,
} from "../actions/webhook-delete.action";
import type { WebhookTableRow } from "../types/webhook.type";

type WebhookRowActionsProps = {
  webhook: WebhookTableRow;
  onEdit: (webhook: WebhookTableRow) => void;
  onRefresh: () => void;
};

export function WebhookRowActions({
  webhook,
  onEdit,
  onRefresh,
}: WebhookRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      webhookToggleStatusAction({ id: webhook.id }).then(() => {
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
      action: () => webhookDeleteAction({ id: webhook.id }),
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
        aria-label={`Edit ${webhook.name}`}
        onClick={() => onEdit(webhook)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={webhook.isActive ? "Deactivate" : "Activate"}
        aria-label={
          webhook.isActive
            ? `Deactivate ${webhook.name}`
            : `Activate ${webhook.name}`
        }
        onClick={handleToggleStatus}
      >
        {webhook.isActive ? (
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
              aria-label={`Delete ${webhook.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this webhook?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{webhook.name}&quot; and its delivery logs.
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
