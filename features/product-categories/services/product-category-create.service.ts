import {
  productCategoryCreateRepository,
  productCategoryGetByCodeRepository,
} from "../repositories/product-category-create.repository";
import type { ProductCategoryCreateInput } from "../schemas/product-category-create.schema";

export async function productCategoryCreateService(input: ProductCategoryCreateInput) {
  const existing = await productCategoryGetByCodeRepository(input.groupId, input.code);
  if (existing) {
    throw new Error("Product category code already exists");
  }

  return productCategoryCreateRepository(input);
}
