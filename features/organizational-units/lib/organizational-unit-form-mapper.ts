import type { OrganizationalUnitCreateInput } from "../schemas/organizational-unit-create.schema";
import type { OrganizationalUnitFormValues } from "../types/organizational-unit.type";

export function mapFormValuesToOrganizationalUnitCreateInput(
  values: OrganizationalUnitFormValues,
): OrganizationalUnitCreateInput {
  return {
    companyId: values.companyId,
    code: values.code,
    name: values.name,
    description: values.description,
    parentId: values.parentId,
    sortOrder: values.sortOrder,
    isActive: values.isActive,
  };
}

export function mapFormValuesToOrganizationalUnitUpdateInput(
  id: string,
  values: OrganizationalUnitFormValues,
) {
  return {
    id,
    ...mapFormValuesToOrganizationalUnitCreateInput(values),
  };
}
