"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  BanIcon,
  CheckIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconTooltipButton,
  TooltipIconTrigger,
} from "@/components/ui/icon-tooltip-button";

import { runRowActionWithToast } from "@/lib/run-row-action-with-toast";

import {
  userDeleteAction,
  userSetStatusAction,
} from "../actions/user-delete.action";
import type { UserTableRow } from "../types/user.type";

type UserRowActionsProps = {
  user: UserTableRow;
  onEdit: (user: UserTableRow) => void;
  onRefresh: () => void;
};

export function UserRowActions({
  user,
  onEdit,
  onRefresh,
}: UserRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSetStatus = (status: "ACTIVE" | "INACTIVE" | "BANNED") => {
    if (user.status === status) return;

    toast.promise(
      userSetStatusAction({ id: user.id, status }).then(() => {
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
      action: () => userDeleteAction({ id: user.id }),
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
        aria-label={`Edit ${user.name}`}
        onClick={() => onEdit(user)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <DropdownMenu>
        <TooltipIconTrigger tooltip="More actions">
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Set status for ${user.name}`}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipIconTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Set status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={user.status === "ACTIVE"}
            onClick={() => handleSetStatus("ACTIVE")}
          >
            <CheckIcon className="size-4" />
            Activate
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={user.status === "INACTIVE"}
            onClick={() => handleSetStatus("INACTIVE")}
          >
            <XIcon className="size-4" />
            Deactivate
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={user.status === "BANNED"}
            onClick={() => handleSetStatus("BANNED")}
          >
            <BanIcon className="size-4" />
            Ban
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog>
        <TooltipIconTrigger tooltip="Delete">
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${user.name}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove &quot;{user.name}&quot; and all
              associated data.
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
