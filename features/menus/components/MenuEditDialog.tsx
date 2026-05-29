"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { menuUpdateAction } from "../actions/menu-update.action";
import { mapFormValuesToUpdateInput } from "../lib/menu-form-mapper";
import type { MenuFormValues, MenuParentOption } from "../types/menu.type";
import { MenuForm } from "./MenuForm";

type MenuEditDialogProps = {
  open: boolean;
  menuId: string | null;
  defaultValues: MenuFormValues | null;
  parentOptions: MenuParentOption[];
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export function MenuEditDialog({
  open,
  menuId,
  defaultValues,
  parentOptions,
  onOpenChange,
  onSuccess,
}: MenuEditDialogProps) {
  const handleSubmit = async (values: MenuFormValues) => {
    if (!menuId) return;

    await toast.promise(
      menuUpdateAction(mapFormValuesToUpdateInput(menuId, values)).then(() => {
        onOpenChange(false);
        onSuccess();
      }),
      {
        loading: "Updating...",
        success: "Updated successfully",
        error: "Failed to save",
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit menu</DialogTitle>
          <DialogDescription>
            Update menu details and hierarchy.
          </DialogDescription>
        </DialogHeader>

        {defaultValues && menuId ? (
          <MenuForm
            key={menuId}
            defaultValues={defaultValues}
            parentOptions={parentOptions}
            submitLabel="Update"
            pendingLabel="Updating..."
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Loading form...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
