"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { menuCreateAction } from "../actions/menu-create.action";
import { defaultMenuFormValues } from "../lib/menu-form-defaults";
import { mapFormValuesToCreateInput } from "../lib/menu-form-mapper";
import type { MenuFormValues, MenuParentOption } from "../types/menu.type";
import { MenuForm } from "./MenuForm";

type MenuCreateDialogProps = {
  open: boolean;
  parentOptions: MenuParentOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function MenuCreateDialog({
  open,
  parentOptions,
  onOpenChange,
  onSuccess,
}: MenuCreateDialogProps) {
  const handleSubmit = async (values: MenuFormValues) => {
    await toast.promise(
      menuCreateAction(mapFormValuesToCreateInput(values)).then(() => {
        onOpenChange(false);
        onSuccess();
      }),
      {
        loading: "Creating...",
        success: "Created successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create menu</DialogTitle>
          <DialogDescription>
            Add a new navigation menu item for role-based access.
          </DialogDescription>
        </DialogHeader>

        <MenuForm
          defaultValues={defaultMenuFormValues}
          parentOptions={parentOptions}
          submitLabel="Create"
          pendingLabel="Creating..."
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
