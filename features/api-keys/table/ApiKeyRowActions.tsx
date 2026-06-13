"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BanIcon, PencilIcon, TrashIcon } from "lucide-react";

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
  apiKeyDeleteAction,
  apiKeyRevokeAction,
} from "../actions/api-key.action";
import type { ApiKeyTableRow } from "../types/api-key.type";

type ApiKeyRowActionsProps = {
  apiKey: ApiKeyTableRow;
  onEdit: (apiKey: ApiKeyTableRow) => void;
  onRefresh: () => void;
};

export function ApiKeyRowActions({
  apiKey,
  onEdit,
  onRefresh,
}: ApiKeyRowActionsProps) {
  const [isRevoking, setIsRevoking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRevoke = () => {
    setIsRevoking(true);
    toast.promise(
      apiKeyRevokeAction({ id: apiKey.id })
        .then(() => onRefresh())
        .finally(() => setIsRevoking(false)),
      {
        loading: "Revoking...",
        success: "API key revoked",
        error: "Failed to revoke API key",
      },
    );
  };

  const handleDelete = () => {
    setIsDeleting(true);
    toast.promise(
      apiKeyDeleteAction({ id: apiKey.id })
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
        aria-label={`Edit ${apiKey.name}`}
        disabled={Boolean(apiKey.revokedAt)}
        onClick={() => onEdit(apiKey)}
      >
        <PencilIcon className="size-4" />
      </Button>

      {!apiKey.revokedAt ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Revoke ${apiKey.name}`}
            >
              <BanIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke this API key?</AlertDialogTitle>
              <AlertDialogDescription>
                This will disable &quot;{apiKey.name}&quot; immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isRevoking}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={isRevoking}
                onClick={handleRevoke}
              >
                Revoke
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${apiKey.name}`}
          >
            <TrashIcon className="size-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this API key?</AlertDialogTitle>
            <AlertDialogDescription>
              Active keys must be revoked before deletion.
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
