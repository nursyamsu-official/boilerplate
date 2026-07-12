import { organizationalUnitPreviewListRepository } from "../repositories/organizational-unit-preview-list.repository";
import type { OrganizationalUnitPreviewItem } from "../types/organizational-unit.type";

export async function organizationalUnitGetPreviewListService(): Promise<
  OrganizationalUnitPreviewItem[]
> {
  return organizationalUnitPreviewListRepository();
}
