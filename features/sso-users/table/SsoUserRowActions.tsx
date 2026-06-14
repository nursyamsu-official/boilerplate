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
    setIsDeleting(true);
    toast.promise(
      ssoUserDeleteAction({ id: link.id })
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
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Edit link for ${link.user.name}`}
        onClick={() => onEdit(link)}
      >
        <PencilIcon className="size-4" />
      </Button>

      <AlertDialog>
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
