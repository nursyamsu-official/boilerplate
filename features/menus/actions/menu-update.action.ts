"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { menuUpdateSchema } from "../schemas/menu-update.schema";
import { menuUpdateService } from "../services/menu-update.service";

export async function menuUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = menuUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid menu data");
  }

  return menuUpdateService(parsed.data);
}
