"use client";

import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogScrollContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type ApiKeyRevealDialogProps = {
  open: boolean;
  rawKey: string | null;
  name: string;
  onOpenChange: (open: boolean) => void;
};

export function ApiKeyRevealDialog({
  open,
  rawKey,
  name,
  onOpenChange,
}: ApiKeyRevealDialogProps) {
  const handleCopy = async () => {
    if (!rawKey) return;

    await navigator.clipboard.writeText(rawKey);
    toast.success("API key copied");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Save your API key</DialogTitle>
          <DialogDescription>
            Copy the key for &quot;{name}&quot; now. You will not be able to see
            it again.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="flex gap-2">
            <Input readOnly value={rawKey ?? ""} className="font-mono text-xs" />
            <Button type="button" variant="outline" onClick={handleCopy}>
              <CopyIcon className="size-4" />
              Copy
            </Button>
          </div>
        </DialogBody>

        <DialogFooter className="shrink-0 border-t pt-4">
          <Button type="button" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogScrollContent>
    </Dialog>
  );
}
