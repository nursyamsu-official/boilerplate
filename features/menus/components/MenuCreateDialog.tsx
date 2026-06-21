"use client";

import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { menuCreateAction } from "../actions/menu-create.action";
import { defaultMenuFormValues } from "../lib/menu-form-defaults";
import { mapFormValuesToCreateInput } from "../lib/menu-form-mapper";
import { menuFormFieldsSchema } from "../schemas/menu-create.schema";
import type { MenuParentOption } from "../types/menu.type";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-lg">
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
          layout="dialog"
          onCancel={() => onOpenChange(false)}
          submitConfig={{
            schema: menuFormFieldsSchema,
            action: menuCreateAction,
            mapInput: mapFormValuesToCreateInput,
            toast: {
              loading: "Creating...",
              success: "Created successfully",
              errorFallback: "Failed to save",
            },
            onSuccess: () => {
              onOpenChange(false);
              onSuccess();
            },
          }}
        />
      </DialogScrollContent>
    </Dialog>
  );
}
