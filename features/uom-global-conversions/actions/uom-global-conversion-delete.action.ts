"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { uomGlobalConversionDeleteSchema } from "../schemas/uom-global-conversion-create.schema";
import { uomGlobalConversionDeleteService } from "../services/uom-global-conversion-delete.service";
import { uomGlobalConversionToggleStatusService } from "../services/uom-global-conversion-update.service";

export async function uomGlobalConversionDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof uomGlobalConversionDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = uomGlobalConversionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid conversion id" };
  }

  return runAction(() => uomGlobalConversionDeleteService(parsed.data.id));
}

export async function uomGlobalConversionToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = uomGlobalConversionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid conversion id");
  }

  return uomGlobalConversionToggleStatusService(parsed.data.id);
}
