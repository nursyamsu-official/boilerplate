"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { permissionModuleDeleteSchema } from "../schemas/permission-module-create.schema";
import { permissionModuleDeleteService } from "../services/permission-module-delete.service";
import { permissionModuleToggleStatusService } from "../services/permission-module-update.service";

export async function permissionModuleDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionModuleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid module id");
  }

  return permissionModuleDeleteService(parsed.data.id);
}

export async function permissionModuleToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionModuleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid module id");
  }

  return permissionModuleToggleStatusService(parsed.data.id);
}
