"use client";

import { useState } from "react";
import { toast } from "sonner";
import { EyeIcon, MoreHorizontalIcon, TrashIcon, UserXIcon } from "lucide-react";

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

import {
  sessionRevokeAction,
  sessionRevokeUserSessionsAction,
} from "../actions/session-revoke.action";
import type { SessionTableRow } from "../types/session.type";

type SessionRowActionsProps = {
  session: SessionTableRow;
  onView: (session: SessionTableRow) => void;
  onRefresh: () => void;
};

export function SessionRowActions({
  session,
  onView,
  onRefresh,
}: SessionRowActionsProps) {
  const [isRevoking, setIsRevoking] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  const handleRevoke = () => {
    setIsRevoking(true);
    toast.promise(
      sessionRevokeAction({ id: session.id })
        .then(() => onRefresh())
        .finally(() => setIsRevoking(false)),
      {
        loading: "Revoking...",
        success: "Session revoked",
        error: "Failed to revoke session",
      },
    );
  };

  const handleRevokeAllForUser = () => {
    setIsRevokingAll(true);
    toast.promise(
      sessionRevokeUserSessionsAction({ userId: session.userId })
        .then(() => onRefresh())
        .finally(() => setIsRevokingAll(false)),
      {
        loading: "Revoking sessions...",
        success: "All user sessions revoked",
        error: "Failed to revoke sessions",
      },
    );
  };

  return (
    <div className="flex items-center gap-1">
      <IconTooltipButton
        tooltip="View"
        aria-label="View session details"
        onClick={() => onView(session)}
      >
        <EyeIcon className="size-4" />
      </IconTooltipButton>

      <DropdownMenu>
        <TooltipIconTrigger tooltip="More actions">
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Session actions"
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipIconTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onView(session)}>
            <EyeIcon className="size-4" />
            View details
          </DropdownMenuItem>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <TrashIcon className="size-4 text-destructive" />
                Revoke session
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Revoke this session?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will sign out the user from this device immediately.
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <UserXIcon className="size-4 text-destructive" />
                Revoke all for user
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Revoke all sessions for this user?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will sign out {session.user.name} from every active session.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isRevokingAll}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={isRevokingAll}
                  onClick={handleRevokeAllForUser}
                >
                  Revoke all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
