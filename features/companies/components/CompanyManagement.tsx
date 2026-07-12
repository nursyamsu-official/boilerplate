"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { OrganizationNav } from "@/features/organization";

import { companyGetByIdAction } from "../actions/company-update.action";
import { buildCompanyListUrl } from "../lib/company-filter-url";
import { mapCompanyDetailToFormValues } from "../lib/company-form-defaults";
import type { CompanyFilterInput } from "../schemas/company-filter.schema";
import type {
  CompanyFormValues,
  CompanyListResult,
  CompanyTableRow,
} from "../types/company.type";
import { CompanyTable } from "../table/CompanyTable";
import { CompanyCreateDialog } from "./CompanyCreateDialog";
import { CompanyEditDialog } from "./CompanyEditDialog";

type CompanyManagementProps = {
  initialData: CompanyListResult;
  initialFilters: CompanyFilterInput;
};

type EditDialogState = {
  companyId: string;
  defaultValues: CompanyFormValues | null;
};

export function CompanyManagement({
  initialData,
  initialFilters,
}: CompanyManagementProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState<EditDialogState | null>(
    null,
  );
  const isEditLoading =
    editDialogState !== null && editDialogState.defaultValues === null;

  const handleFiltersChange = useCallback(
    (partial: Partial<CompanyFilterInput>) => {
      const nextFilters = { ...initialFilters, ...partial };
      router.push(buildCompanyListUrl(nextFilters));
    },
    [initialFilters, router],
  );

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleEdit = useCallback(async (company: CompanyTableRow) => {
    setEditDialogState({
      companyId: company.id,
      defaultValues: null,
    });

    try {
      const detail = await companyGetByIdAction({ id: company.id });
      setEditDialogState({
        companyId: company.id,
        defaultValues: mapCompanyDetailToFormValues(detail),
      });
    } catch {
      toast.error("Failed to load company");
      setEditDialogState(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <OrganizationNav />

      <div>
        <h2 className="text-xl font-semibold">Companies</h2>
        <p className="text-sm text-muted-foreground">
          Manage companies in your organization structure.
        </p>
      </div>

      <CompanyTable
        data={initialData}
        filters={initialFilters}
        isEditLoading={isEditLoading}
        onFiltersChange={handleFiltersChange}
        onEdit={handleEdit}
        onCreate={() => setIsCreateOpen(true)}
        onRefresh={handleRefresh}
      />

      <CompanyCreateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleRefresh}
      />

      <CompanyEditDialog
        open={editDialogState !== null}
        companyId={editDialogState?.companyId ?? null}
        defaultValues={editDialogState?.defaultValues ?? null}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogState(null);
          }
        }}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
