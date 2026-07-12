import {
  productGroupGetByCodeRepository,
  productGroupGetByIdRepository,
} from "../repositories/product-group-create.repository";
import {
  productGroupToggleStatusRepository,
  productGroupUpdateRepository,
} from "../repositories/product-group-update.repository";
import type { ProductGroupUpdateInput } from "../schemas/product-group-create.schema";

export async function productGroupUpdateService(input: ProductGroupUpdateInput) {
  const country = await productGroupGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Product Group not found");
  }

  const existing = await productGroupGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Product group code already exists");
  }

  return productGroupUpdateRepository(input);
}

export async function productGroupToggleStatusService(id: string) {
  const country = await productGroupGetByIdRepository(id);
  if (!country) {
    throw new Error("Product Group not found");
  }

  return productGroupToggleStatusRepository(id);
}
