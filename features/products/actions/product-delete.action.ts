"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productDeleteSchema } from "../schemas/product-create.schema";
import { productDeleteService } from "../services/product-delete.service";
import { productToggleStatusService } from "../services/product-update.service";

export async function productDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productDeleteService>>>> {
  await requireSessionUserId();

  const parsed = productDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid product id" };
  }

  return runAction(() => productDeleteService(parsed.data.id));
}

export async function productToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product id");
  }

  return productToggleStatusService(parsed.data.id);
}
