import {
  productTypeGetByCodeRepository,
  productTypeGetByIdRepository,
} from "../repositories/product-type-create.repository";
import {
  productTypeToggleStatusRepository,
  productTypeUpdateRepository,
} from "../repositories/product-type-update.repository";
import type { ProductTypeUpdateInput } from "../schemas/product-type-create.schema";

export async function productTypeUpdateService(input: ProductTypeUpdateInput) {
  const country = await productTypeGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Product Type not found");
  }

  const existing = await productTypeGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Product type code already exists");
  }

  return productTypeUpdateRepository(input);
}

export async function productTypeToggleStatusService(id: string) {
  const country = await productTypeGetByIdRepository(id);
  if (!country) {
    throw new Error("Product Type not found");
  }

  return productTypeToggleStatusRepository(id);
}
