"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  organizationalUnitGetByIdSchema,
  organizationalUnitUpdateSchema,
} from "../schemas/organizational-unit-create.schema";
import { organizationalUnitGetByIdService } from "../services/organizational-unit-get-by-id.service";
import { organizationalUnitUpdateService } from "../services/organizational-unit-update.service";
import type { OrganizationalUnitDetail } from "../types/organizational-unit.type";

export async function organizationalUnitUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof organizationalUnitUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = organizationalUnitUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid organizational unit data" };
  }

  return runAction(() => organizationalUnitUpdateService(parsed.data));
}

export async function organizationalUnitGetByIdAction(
  input: unknown,
): Promise<OrganizationalUnitDetail> {
  await requireSessionUserId();

  const parsed = organizationalUnitGetByIdSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid organizational unit id");
  }

  return organizationalUnitGetByIdService(parsed.data.id);
}
