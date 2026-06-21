"use client";

import { FormDialogSkeleton } from "@/components/form/form-dialog-skeleton";
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { menuUpdateAction } from "../actions/menu-update.action";
import { mapFormValuesToUpdateInput } from "../lib/menu-form-mapper";
import { menuFormFieldsSchema } from "../schemas/menu-create.schema";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
            layout="dialog"
            onCancel={() => onOpenChange(false)}
            submitConfig={{
              schema: menuFormFieldsSchema,
              action: menuUpdateAction,
              mapInput: (values) => mapFormValuesToUpdateInput(menuId, values),
              toast: {
                loading: "Updating...",
                success: "Updated successfully",
                errorFallback: "Failed to save",
              },
              onSuccess: () => {
                onOpenChange(false);
                onSuccess();
              },
            }}
          />
        ) : (
          <FormDialogSkeleton fields={7} />
        )}
      </DialogScrollContent>
    </Dialog>
  );
}
