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
  menuDeleteAction,
  menuToggleStatusAction,
} from "../actions/menu-delete.action";
import type { MenuTableRow } from "../types/menu.type";

type MenuRowActionsProps = {
  menu: MenuTableRow;
  onEdit: (menu: MenuTableRow) => void;
  onRefresh: () => void;
};

export function MenuRowActions({
  menu,
  onEdit,
  onRefresh,
}: MenuRowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = () => {
    toast.promise(
      menuToggleStatusAction({ id: menu.id }).then(() => {
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
      menuDeleteAction({ id: menu.id })
        .then(() => {
          onRefresh();
        })
        .finally(() => {
          setIsDeleting(false);
        }),
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
        aria-label={`Edit ${menu.label}`}
        onClick={() => onEdit(menu)}
      >
        <PencilIcon className="size-4" />
      </IconTooltipButton>

      <IconTooltipButton
        tooltip={menu.isActive ? "Deactivate" : "Activate"}
        aria-label={
          menu.isActive ? `Deactivate ${menu.label}` : `Activate ${menu.label}`
        }
        onClick={handleToggleStatus}
      >
        {menu.isActive ? (
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
              aria-label={`Delete ${menu.label}`}
            >
              <TrashIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this menu?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{menu.label}&quot;. Child menus will become
              root items.
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
