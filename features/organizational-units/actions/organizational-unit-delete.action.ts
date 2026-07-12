"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  organizationalUnitDeleteSchema,
  organizationalUnitGetParentOptionsSchema,
  organizationalUnitToggleStatusSchema,
} from "../schemas/organizational-unit-create.schema";
import { organizationalUnitDeleteService } from "../services/organizational-unit-delete.service";
import { organizationalUnitGetParentOptionsService } from "../services/organizational-unit-get-by-id.service";
import { organizationalUnitToggleStatusService } from "../services/organizational-unit-update.service";
import type { OrganizationalUnitParentOption } from "../types/organizational-unit.type";

export async function organizationalUnitDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof organizationalUnitDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = organizationalUnitDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid organizational unit id" };
  }

  return runAction(() => organizationalUnitDeleteService(parsed.data.id));
}

export async function organizationalUnitToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = organizationalUnitToggleStatusSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid organizational unit id");
  }

  return organizationalUnitToggleStatusService(parsed.data.id);
}

export async function organizationalUnitGetParentOptionsAction(
  input: unknown,
): Promise<OrganizationalUnitParentOption[]> {
  await requireSessionUserId();

  const parsed = organizationalUnitGetParentOptionsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid parent options request");
  }

  return organizationalUnitGetParentOptionsService(
    parsed.data.companyId,
    parsed.data.excludeUnitId,
  );
}
