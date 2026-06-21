"use client";

import { useMemo } from "react";

import {
  Dialog,
  DialogBody,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { buildMenuTree } from "../lib/menu-tree";
import type { MenuPreviewItem } from "../types/menu.type";
import { MenuPreviewTree } from "./MenuPreviewTree";

type MenuPreviewDialogProps = {
  open: boolean;
  items: MenuPreviewItem[];
  onOpenChange: (open: boolean) => void;
};

export function MenuPreviewDialog({
  open,
  items,
  onOpenChange,
}: MenuPreviewDialogProps) {
  const tree = useMemo(() => buildMenuTree(items), [items]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Menu hierarchy preview</DialogTitle>
          <DialogDescription>
            Full navigation structure with parent-child relationships.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="rounded-md border p-3">
            {tree.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No menus yet
              </p>
            ) : (
              <MenuPreviewTree nodes={tree} />
            )}
          </div>
        </DialogBody>
      </DialogScrollContent>
    </Dialog>
  );
}
