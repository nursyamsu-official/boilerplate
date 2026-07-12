"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productGroupDeleteSchema } from "../schemas/product-group-create.schema";
import { productGroupDeleteService } from "../services/product-group-delete.service";
import { productGroupToggleStatusService } from "../services/product-group-update.service";

export async function productGroupDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productGroupDeleteService>>>> {
  await requireSessionUserId();

  const parsed = productGroupDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid product group id" };
  }

  return runAction(() => productGroupDeleteService(parsed.data.id));
}

export async function productGroupToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productGroupDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product group id");
  }

  return productGroupToggleStatusService(parsed.data.id);
}
