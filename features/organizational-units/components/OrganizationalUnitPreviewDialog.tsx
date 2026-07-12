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

import { groupOrganizationalUnitPreviewByCompany } from "../lib/organizational-unit-tree";
import type { OrganizationalUnitPreviewItem } from "../types/organizational-unit.type";
import { OrganizationalUnitPreviewTree } from "./OrganizationalUnitPreviewTree";

type OrganizationalUnitPreviewDialogProps = {
  open: boolean;
  items: OrganizationalUnitPreviewItem[];
  onOpenChange: (open: boolean) => void;
};

export function OrganizationalUnitPreviewDialog({
  open,
  items,
  onOpenChange,
}: OrganizationalUnitPreviewDialogProps) {
  const companyGroups = useMemo(
    () => groupOrganizationalUnitPreviewByCompany(items),
    [items],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogScrollContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Organizational unit hierarchy preview</DialogTitle>
          <DialogDescription>
            Full unit structure grouped by company with parent-child
            relationships.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          {companyGroups.length === 0 ? (
            <div className="rounded-md border p-3">
              <p className="py-8 text-center text-sm text-muted-foreground">
                No organizational units yet
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
                    <OrganizationalUnitPreviewTree nodes={group.tree} />
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
