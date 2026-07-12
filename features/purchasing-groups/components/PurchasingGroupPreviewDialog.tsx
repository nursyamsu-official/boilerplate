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

import { groupPurchasingGroupPreviewByCompany } from "../lib/purchasing-group-tree";
import type { PurchasingGroupPreviewItem } from "../types/purchasing-group.type";
import { PurchasingGroupPreviewTree } from "./PurchasingGroupPreviewTree";

type PurchasingGroupPreviewDialogProps = {
  open: boolean;
  items: PurchasingGroupPreviewItem[];
  onOpenChange: (open: boolean) => void;
};

export function PurchasingGroupPreviewDialog({
  open,
  items,
  onOpenChange,
}: PurchasingGroupPreviewDialogProps) {
  const companyGroups = useMemo(
    () => groupPurchasingGroupPreviewByCompany(items),
    [items],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Purchasing Group hierarchy preview</DialogTitle>
          <DialogDescription>
            Full unit structure grouped by company with parent-child
            relationships.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          {companyGroups.length === 0 ? (
            <div className="rounded-md border p-3">
              <p className="py-8 text-center text-sm text-muted-foreground">
                No Purchasing Groups yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {companyGroups.map((group) => (
                <section
                  key={group.companyId}
                  className="rounded-md border p-3"
                >
                  <h3 className="mb-2 text-sm font-semibold">
                    {group.companyName}
                  </h3>
                  {group.tree.length === 0 ? (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                      No units for this company
                    </p>
                  ) : (
                    <PurchasingGroupPreviewTree nodes={group.tree} />
                  )}
                </section>
              ))}
            </div>
          )}
        </DialogBody>
      </DialogScrollContent>
    </Dialog>
  );
}
