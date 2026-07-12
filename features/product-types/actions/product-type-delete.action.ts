"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productTypeDeleteSchema } from "../schemas/product-type-create.schema";
import { productTypeDeleteService } from "../services/product-type-delete.service";
import { productTypeToggleStatusService } from "../services/product-type-update.service";

export async function productTypeDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productTypeDeleteService>>>> {
  await requireSessionUserId();

  const parsed = productTypeDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid product type id" };
  }

  return runAction(() => productTypeDeleteService(parsed.data.id));
}

export async function productTypeToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productTypeDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product type id");
  }

  return productTypeToggleStatusService(parsed.data.id);
}
