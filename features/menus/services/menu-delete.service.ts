import { menuDeleteRepository } from "../repositories/menu-delete.repository";
import { menuGetByIdRepository } from "../repositories/menu-get-by-id.repository";

export async function menuDeleteService(id: string) {
  const existing = await menuGetByIdRepository(id);
  if (!existing) {
    throw new Error("Menu not found");
  }

  return menuDeleteRepository(id);
}
