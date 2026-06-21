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

import { ssoUserDeleteAction } from "../actions/sso-user-delete.action";
import type { SsoUserTableRow } from "../types/sso-user.type";

type SsoUserRowActionsProps = {
  link: SsoUserTableRow;
  onEdit: (link: SsoUserTableRow) => void;
  onRefresh: () => void;
};

export function SsoUserRowActions({
  link,
  onEdit,
  onRefresh,
}: SsoUserRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    runRowActionWithToast({
      action: () => ssoUserDeleteAction({ id: link.id }),
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
        aria-label={`Edit link for ${link.user.name}`}
        onClick={() => onEdit(link)}
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
              aria-label={`Delete link for ${link.user.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this SSO link?</AlertDialogTitle>
            <AlertDialogDescription>
              This will unlink {link.user.name} from {link.provider.name}.
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
