"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { menuFilterSchema } from "../schemas/menu-filter.schema";
import { menuGetListService } from "../services/menu-get-list.service";
import type { MenuListResult } from "../types/menu.type";

async function requireSessionUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  return session.user.id;
}

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
