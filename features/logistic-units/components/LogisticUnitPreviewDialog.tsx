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

import { groupLogisticUnitPreviewByCompany } from "../lib/logistic-unit-tree";
import type { LogisticUnitPreviewItem } from "../types/logistic-unit.type";
import { LogisticUnitPreviewTree } from "./LogisticUnitPreviewTree";

type LogisticUnitPreviewDialogProps = {
  open: boolean;
  items: LogisticUnitPreviewItem[];
  onOpenChange: (open: boolean) => void;
};

export function LogisticUnitPreviewDialog({
  open,
  items,
  onOpenChange,
}: LogisticUnitPreviewDialogProps) {
  const companyGroups = useMemo(
    () => groupLogisticUnitPreviewByCompany(items),
    [items],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Logistic Unit hierarchy preview</DialogTitle>
          <DialogDescription>
            Full unit structure grouped by company with parent-child
            relationships.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          {companyGroups.length === 0 ? (
            <div className="rounded-md border p-3">
              <p className="py-8 text-center text-sm text-muted-foreground">
                No Logistic Units yet
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
                    <LogisticUnitPreviewTree nodes={group.tree} />
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
