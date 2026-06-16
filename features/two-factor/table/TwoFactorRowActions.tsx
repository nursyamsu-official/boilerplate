"use client";

import { useState } from "react";
import { toast } from "sonner";
import { EyeIcon, ShieldOffIcon } from "lucide-react";

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

import { twoFactorDisableAction } from "../actions/two-factor-disable.action";
import type { TwoFactorTableRow } from "../types/two-factor.type";

type TwoFactorRowActionsProps = {
  record: TwoFactorTableRow;
  onView: (record: TwoFactorTableRow) => void;
  onRefresh: () => void;
};

export function TwoFactorRowActions({
  record,
  onView,
  onRefresh,
}: TwoFactorRowActionsProps) {
  const [isDisabling, setIsDisabling] = useState(false);

  const handleDisable = () => {
    setIsDisabling(true);
    toast.promise(
      twoFactorDisableAction({ userId: record.userId })
        .then(() => onRefresh())
        .finally(() => setIsDisabling(false)),
      {
        loading: "Disabling...",
        success: "Two-factor authentication disabled",
        error: "Failed to disable two-factor authentication",
      },
    );
  };

  return (
    <div className="flex items-center gap-1">
      <IconTooltipButton
        tooltip="View"
        aria-label="View two-factor details"
        onClick={() => onView(record)}
      >
        <EyeIcon className="size-4" />
      </IconTooltipButton>

      <AlertDialog>
        <TooltipIconTrigger tooltip="Disable">
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Disable two-factor authentication"
            >
              <ShieldOffIcon className="size-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
        </TooltipIconTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable two-factor authentication?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove 2FA for {record.user.name}. They will need to set
              it up again from account settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDisabling}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDisabling}
              onClick={handleDisable}
            >
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
