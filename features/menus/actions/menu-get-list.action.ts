"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { menuFilterSchema } from "../schemas/menu-filter.schema";
import { menuGetListService } from "../services/menu-get-list.service";
import type { MenuListResult } from "../types/menu.type";

export async function menuGetListAction(
  input: unknown,
): Promise<MenuListResult> {
  await requireSessionUserId();

  const parsed = menuFilterSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid filter parameters");
  }

  return menuGetListService(parsed.data);
}
