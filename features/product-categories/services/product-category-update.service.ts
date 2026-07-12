import {
  productCategoryGetByCodeRepository,
  productCategoryGetByIdRepository,
} from "../repositories/product-category-create.repository";
import {
  productCategoryToggleStatusRepository,
  productCategoryUpdateRepository,
} from "../repositories/product-category-update.repository";
import type { ProductCategoryUpdateInput } from "../schemas/product-category-create.schema";

export async function productCategoryUpdateService(input: ProductCategoryUpdateInput) {
  const country = await productCategoryGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Product category not found");
  }

  const existing = await productCategoryGetByCodeRepository(input.groupId, input.code, input.id);
  if (existing) {
    throw new Error("Product category code already exists");
  }

  return productCategoryUpdateRepository(input);
}

export async function productCategoryToggleStatusService(id: string) {
  const country = await productCategoryGetByIdRepository(id);
  if (!country) {
    throw new Error("Product category not found");
  }

  return productCategoryToggleStatusRepository(id);
}
