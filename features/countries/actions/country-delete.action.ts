"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { countryDeleteSchema } from "../schemas/country-create.schema";
import { countryDeleteService } from "../services/country-delete.service";
import { countryToggleStatusService } from "../services/country-update.service";

export async function countryDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof countryDeleteService>>>> {
  await requireSessionUserId();

  const parsed = countryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid country id" };
  }

  return runAction(() => countryDeleteService(parsed.data.id));
}

export async function countryToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = countryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid country id");
  }

  return countryToggleStatusService(parsed.data.id);
}
