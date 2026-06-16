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
  ssoProviderDeleteAction,
  ssoProviderToggleStatusAction,
} from "../actions/sso-provider-delete.action";
import type { SsoProviderTableRow } from "../types/sso-provider.type";

type SsoProviderRowActionsProps = {
  provider: SsoProviderTableRow;
  onEdit: (provider: SsoProviderTableRow) => void;
  onRefresh: () => void;
};

export function SsoProviderRowActions({
  provider,
  onEdit,
  onRefresh,
}: SsoProviderRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      ssoProviderToggleStatusAction({ id: provider.id }).then(() => {
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
      ssoProviderDeleteAction({ id: provider.id })
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
        aria-label={`Edit ${provider.name}`}
        onClick={() => onEdit(provider)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={provider.isActive ? "Deactivate" : "Activate"}
        aria-label={
          provider.isActive
            ? `Deactivate ${provider.name}`
            : `Activate ${provider.name}`
        }
        onClick={handleToggleStatus}
      >
        {provider.isActive ? (
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
              aria-label={`Delete ${provider.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this provider?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{provider.name}&quot; and all linked SSO
              users.
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
